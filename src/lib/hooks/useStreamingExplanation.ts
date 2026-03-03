'use client'

/**
 * useStreamingExplanation Hook
 *
 * Manages streaming AI explanation lifecycle: cache load/save,
 * authenticated streaming API calls, and SSE event parsing.
 * AUTH: Uses user.getIdToken() for /api/basics/ai-explanation.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { logger } from '@/lib/logger'
import {
  loadStoredExplanation,
  saveExplanation,
  type UsageInfo,
} from '@/lib/utils/explanationCache'

export type UnderstandingLevel = 'confused' | 'partial' | 'stuck'

interface StreamingExplanationParams {
  problemId: string
  problemText: string
  subject: string
  difficulty: number
  currentAnswer?: string
  onXpSpent?: (amount: number) => void
  onCreditsUsed?: () => void
}

interface StreamingExplanationState {
  explanation: string
  isLoading: boolean
  error: string | null
  hasRequested: boolean
  actualCostCharged: number | null
  newBalance: number | null
  usageInfo: UsageInfo | null
  loadedFromStorage: boolean
  progressReport: string
  whatTried: string
  understandingLevel: UnderstandingLevel
  showProgressForm: boolean
}

interface StreamingExplanationActions {
  setProgressReport: (value: string) => void
  setWhatTried: (value: string) => void
  setUnderstandingLevel: (value: UnderstandingLevel) => void
  setShowProgressForm: (value: boolean) => void
  setError: (value: string | null) => void
  handleRequestExplanation: () => Promise<void>
}

export type UseStreamingExplanationReturn = StreamingExplanationState &
  StreamingExplanationActions

export function useStreamingExplanation({
  problemId,
  problemText,
  subject,
  difficulty,
  currentAnswer,
  onXpSpent,
  onCreditsUsed,
}: StreamingExplanationParams): UseStreamingExplanationReturn {
  const { user } = useAuth()
  const { requireAuth } = useRequireAuth()

  const [explanation, setExplanation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasRequested, setHasRequested] = useState(false)
  const [xpNotified, setXpNotified] = useState(false)
  const [actualCostCharged, setActualCostCharged] = useState<number | null>(
    null
  )
  const [newBalance, setNewBalance] = useState<number | null>(null)
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null)
  const [loadedFromStorage, setLoadedFromStorage] = useState(false)

  // Progress report form fields
  const [showProgressForm, setShowProgressForm] = useState(false)
  const [progressReport, setProgressReport] = useState('')
  const [whatTried, setWhatTried] = useState('')
  const [understandingLevel, setUnderstandingLevel] =
    useState<UnderstandingLevel>('stuck')

  // Load stored explanation on mount
  useEffect(() => {
    if (user?.uid && problemId) {
      const stored = loadStoredExplanation(user.uid, problemId)
      if (stored) {
        setExplanation(stored.explanation)
        setActualCostCharged(stored.costCharged)
        setNewBalance(stored.newBalance)
        setUsageInfo(stored.usage)
        setProgressReport(stored.progressReport)
        setWhatTried(stored.whatTried)
        setUnderstandingLevel(stored.understandingLevel as UnderstandingLevel)
        setHasRequested(true)
        setLoadedFromStorage(true)
      }
    }
  }, [user?.uid, problemId])

  // Save explanation after streaming is complete
  useEffect(() => {
    if (
      user?.uid &&
      problemId &&
      explanation &&
      actualCostCharged !== null &&
      usageInfo &&
      !isLoading &&
      hasRequested &&
      !loadedFromStorage
    ) {
      saveExplanation(user.uid, problemId, {
        explanation,
        costCharged: actualCostCharged,
        newBalance: newBalance ?? 0,
        usage: usageInfo,
        progressReport,
        whatTried,
        understandingLevel,
        timestamp: Date.now(),
      })
    }
  }, [
    user?.uid,
    problemId,
    explanation,
    actualCostCharged,
    usageInfo,
    isLoading,
    hasRequested,
    loadedFromStorage,
    newBalance,
    progressReport,
    whatTried,
    understandingLevel,
  ])

  const handleRequestExplanation = useCallback(async () => {
    if (isLoading || hasRequested) return

    requireAuth(async () => {
      // Validate progress report fields
      if (!progressReport.trim() || !whatTried.trim()) {
        setError('Please complete your progress report before requesting help')
        return
      }

      setIsLoading(true)
      setError(null)
      setHasRequested(true)

      try {
        // AUTH: Use user.getIdToken() for authenticated streaming fetch
        const token = await user!.getIdToken()
        const response = await fetch('/api/basics/ai-explanation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            problemId,
            problemText,
            subject,
            difficulty,
            currentAnswer,
            progressReport,
            whatTried,
            understandingLevel,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.error || 'Failed to generate explanation')
          setIsLoading(false)
          return
        }

        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          setError('Failed to read response')
          setIsLoading(false)
          return
        }

        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              try {
                const parsed = JSON.parse(data)
                if (parsed.error) {
                  setError(parsed.error)
                  setIsLoading(false)
                } else if (parsed.content) {
                  setExplanation((prev) => prev + parsed.content)
                } else if (parsed.costCharged !== undefined) {
                  // Handle the cost and usage notification
                  const cost = parsed.costCharged
                  setActualCostCharged(cost)
                  setNewBalance(parsed.newBalance)
                  if (parsed.usage) {
                    setUsageInfo(parsed.usage)
                  }
                  if (!xpNotified) {
                    onXpSpent?.(cost)
                    setXpNotified(true)
                  }
                  // Refresh credits in the UI
                  onCreditsUsed?.()
                } else if (parsed.done) {
                  setIsLoading(false)
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        setIsLoading(false)
      } catch (err) {
        logger.error('AIExplanation', 'Failed to get AI explanation', {
          error: err,
        })
        setError(
          getErrorMessage(
            err,
            'Failed to generate explanation. Please try again.'
          )
        )
        setIsLoading(false)
      }
    })
  }, [
    isLoading,
    hasRequested,
    requireAuth,
    progressReport,
    whatTried,
    user,
    problemId,
    problemText,
    subject,
    difficulty,
    currentAnswer,
    understandingLevel,
    xpNotified,
    onXpSpent,
    onCreditsUsed,
  ])

  return {
    explanation,
    isLoading,
    error,
    hasRequested,
    actualCostCharged,
    newBalance,
    usageInfo,
    loadedFromStorage,
    progressReport,
    whatTried,
    understandingLevel,
    showProgressForm,
    setProgressReport,
    setWhatTried,
    setUnderstandingLevel,
    setShowProgressForm,
    setError,
    handleRequestExplanation,
  }
}
