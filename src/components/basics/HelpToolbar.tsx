'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  Lightbulb,
  Sparkle,
  Lock,
  Check,
} from '@phosphor-icons/react'
import { XP_COSTS } from '@/lib/basics/xp-config'
import { logger } from '@/lib/logger'

interface HelpToolbarProps {
  problemId: string
  problemTopic: string
  userId: string
  hint?: string
  onStudyClick: () => void
  onHintPurchased: (hint: string) => void
  onAITutorClick: () => void
  hintPurchased?: boolean
  aiTutorUsed?: boolean
  savedAIResponse?: string
  studyXpCost?: number
  hintXpCost?: number
  /** @deprecated Use onCostIncurred instead - costs now reduce earnings */
  onXpSpent?: (amount: number) => void
  /** Called when a cost is incurred - will be deducted from XP earned when problem is completed */
  onCostIncurred?: (amount: number) => void
  fetchApi: (url: string, options?: RequestInit) => Promise<unknown>
  disabled?: boolean
}

interface ProblemHelpHistory {
  hintPurchased: boolean
  hintText?: string
  aiTutorUsed: boolean
  aiTutorResponse?: string
}

export function HelpToolbar({
  problemId,
  problemTopic,
  userId,
  hint,
  onStudyClick,
  onHintPurchased,
  onAITutorClick,
  hintPurchased = false,
  aiTutorUsed = false,
  studyXpCost = 5,
  hintXpCost = XP_COSTS.HINT_PURCHASE,
  onXpSpent,
  onCostIncurred,
  fetchApi,
  disabled = false,
}: HelpToolbarProps) {
  const [loadingHint, setLoadingHint] = useState(false)
  const [localHintPurchased, setLocalHintPurchased] = useState(hintPurchased)
  const [localAIUsed, setLocalAIUsed] = useState(aiTutorUsed)

  useEffect(() => {
    setLocalHintPurchased(hintPurchased)
    setLocalAIUsed(aiTutorUsed)
  }, [hintPurchased, aiTutorUsed])

  useEffect(() => {
    if (userId && problemId) {
      try {
        const saved = localStorage.getItem(
          `help_history_${userId}_${problemId}`
        )
        if (saved) {
          const data: ProblemHelpHistory = JSON.parse(saved)
          if (data.hintPurchased) setLocalHintPurchased(true)
          if (data.aiTutorUsed) setLocalAIUsed(true)
        }
      } catch (e) {
        logger.error('HelpToolbar', 'Failed to load help history', { error: e })
      }
    }
  }, [userId, problemId])

  const saveHelpHistory = (update: Partial<ProblemHelpHistory>) => {
    if (userId && problemId) {
      try {
        const key = `help_history_${userId}_${problemId}`
        const existing = localStorage.getItem(key)
        const current: ProblemHelpHistory = existing
          ? JSON.parse(existing)
          : { hintPurchased: false, aiTutorUsed: false }
        localStorage.setItem(key, JSON.stringify({ ...current, ...update }))
      } catch (e) {
        logger.error('HelpToolbar', 'Failed to save help history', { error: e })
      }
    }
  }

  const handleHintClick = async () => {
    if (localHintPurchased && hint) {
      onHintPurchased(hint)
      return
    }

    if (!hint) {
      logger.warn('HelpToolbar', 'No hint available for this problem')
      return
    }

    setLoadingHint(true)

    try {
      await fetchApi('/api/basics/purchase-hint', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          problemId,
          xpCost: hintXpCost,
        }),
      })

      setLocalHintPurchased(true)
      saveHelpHistory({ hintPurchased: true, hintText: hint })

      // Track cost to be deducted from XP earned when problem is completed
      if (onCostIncurred) {
        onCostIncurred(hintXpCost)
      } else if (onXpSpent) {
        // Fallback for legacy usage
        onXpSpent(hintXpCost)
      }

      onHintPurchased(hint)
    } catch (error) {
      logger.error('HelpToolbar', 'Failed to purchase hint', { error })
      onHintPurchased(hint)
    } finally {
      setLoadingHint(false)
    }
  }

  const handleAITutorClick = () => {
    onAITutorClick()
  }

  return (
    <div className="b-card b-card-flat b-p-lg">
      <h3 className="b-text-sm b-font-semibold b-text-secondary b-mb-md text-center">
        NEED HELP?
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {/* Study Topic Button */}
        <button
          onClick={onStudyClick}
          disabled={disabled}
          className="b-card b-card-interactive b-p-lg flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="relative">
            <BookOpen
              size={28}
              weight="duotone"
              className="b-text-math group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="b-text-sm b-font-medium b-text-primary">
            Study Topic
          </span>
          <span className="b-text-xs b-text-math b-font-semibold flex items-center gap-1">
            <Lock size={10} weight="bold" />
            {studyXpCost} XP
          </span>
        </button>

        {/* Hint Button */}
        <button
          onClick={handleHintClick}
          disabled={disabled || loadingHint || !hint}
          className={`b-card b-card-interactive b-p-lg flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group ${
            localHintPurchased ? 'b-card-reading' : ''
          }`}
        >
          <div className="relative">
            <Lightbulb
              size={28}
              weight={localHintPurchased ? 'fill' : 'duotone'}
              className={`group-hover:scale-110 transition-transform ${
                localHintPurchased ? 'b-text-reading' : 'b-text-warning'
              }`}
            />
            {localHintPurchased && (
              <Check
                size={14}
                weight="bold"
                className="absolute -top-1 -right-1 b-text-reading b-bg-elevated b-rounded-full"
              />
            )}
          </div>
          <span className="b-text-sm b-font-medium b-text-primary">
            {localHintPurchased ? 'View Hint' : 'Hint'}
          </span>
          <span
            className={`b-text-xs b-font-semibold flex items-center gap-1 ${
              localHintPurchased ? 'b-text-reading' : 'b-text-warning'
            }`}
          >
            {loadingHint ? (
              <span className="b-animate-pulse">Loading...</span>
            ) : localHintPurchased ? (
              <>
                <Check size={10} weight="bold" />
                FREE
              </>
            ) : (
              <>
                <Lock size={10} weight="bold" />
                {hintXpCost} XP
              </>
            )}
          </span>
        </button>

        {/* AI Tutor Button */}
        <button
          onClick={handleAITutorClick}
          disabled={disabled}
          className={`b-card b-card-interactive b-p-lg flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group ${
            localAIUsed ? 'b-card-reading' : ''
          }`}
        >
          <div className="relative">
            <Sparkle
              size={28}
              weight={localAIUsed ? 'fill' : 'duotone'}
              className={`group-hover:scale-110 transition-transform ${
                localAIUsed ? 'b-text-reading' : 'b-text-logic'
              }`}
            />
            {localAIUsed && (
              <Check
                size={14}
                weight="bold"
                className="absolute -top-1 -right-1 b-text-reading b-bg-elevated b-rounded-full"
              />
            )}
          </div>
          <span className="b-text-sm b-font-medium b-text-primary">
            {localAIUsed ? 'View AI' : 'AI Tutor'}
          </span>
          <span
            className={`b-text-xs b-font-semibold flex items-center gap-1 ${
              localAIUsed ? 'b-text-reading' : 'b-text-logic'
            }`}
          >
            {localAIUsed ? (
              <>
                <Check size={10} weight="bold" />
                FREE
              </>
            ) : (
              <>
                <Lock size={10} weight="bold" />
                1-10 XP
              </>
            )}
          </span>
        </button>
      </div>

      {/* Topic indicator */}
      <p className="b-text-xs b-text-muted text-center b-mt-md">
        Topic:{' '}
        <span className="b-font-medium">{problemTopic || 'General Math'}</span>
      </p>
    </div>
  )
}

// Export helper to mark AI as used from parent component
export function useHelpHistory(userId: string, problemId: string) {
  const markAIUsed = (response?: string) => {
    if (userId && problemId) {
      try {
        const key = `help_history_${userId}_${problemId}`
        const existing = localStorage.getItem(key)
        const current = existing
          ? JSON.parse(existing)
          : { hintPurchased: false, aiTutorUsed: false }
        localStorage.setItem(
          key,
          JSON.stringify({
            ...current,
            aiTutorUsed: true,
            aiTutorResponse: response,
          })
        )
      } catch (e) {
        logger.error('HelpToolbar', 'Failed to save AI usage', { error: e })
      }
    }
  }

  const getHistory = (): ProblemHelpHistory | null => {
    if (userId && problemId) {
      try {
        const saved = localStorage.getItem(
          `help_history_${userId}_${problemId}`
        )
        return saved ? JSON.parse(saved) : null
      } catch (e) {
        return null
      }
    }
    return null
  }

  return { markAIUsed, getHistory }
}
