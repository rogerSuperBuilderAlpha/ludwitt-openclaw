'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { vercelDeploymentSteps } from '@/data/steps/vercelDeploymentSteps'
import { useToast } from '@/components/ui/Toast'
import { logger } from '@/lib/logger'

const allSteps = vercelDeploymentSteps

/** Build a record marking every step as completed. */
function buildAllStepsComplete(): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  allSteps.forEach((step) => {
    result[step.id] = true
  })
  return result
}

interface UseVercelProgressOptions {
  onProgressChange?: (current: number, total: number) => void
  onComplete?: () => void
}

export function useVercelProgress({
  onProgressChange,
  onComplete,
}: UseVercelProgressOptions = {}) {
  const { user } = useAuth()
  const {
    success: toastSuccess,
    info: toastInfo,
    error: toastError,
  } = useToast()
  const [expanded, setExpanded] = useState(false)
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({})
  const [openPopup, setOpenPopup] = useState<string | null>(null)
  const [vercelUrl, setVercelUrl] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [showCopyToast, setShowCopyToast] = useState(false)
  const isLoadingRef = useRef(false)

  // Report progress whenever checkedSteps changes
  useEffect(() => {
    if (onProgressChange) {
      onProgressChange(
        Object.values(checkedSteps).filter(Boolean).length,
        allSteps.length
      )
    }
  }, [checkedSteps, onProgressChange])

  // Load progress from Firebase when user is authenticated (ONLY ONCE)
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return
      isLoadingRef.current = true
      try {
        const progressDoc = await getDoc(
          doc(db, 'vercelDeploymentProgress', user.uid)
        )
        if (progressDoc.exists()) {
          const data = progressDoc.data()
          const loadedSteps = data.checkedSteps || {}
          setCheckedSteps(loadedSteps)
          setVercelUrl(data.vercelUrl || '')
          setSuccess(data.verified || false)
          if (Object.keys(loadedSteps).length > 0) setExpanded(true)
        }
      } catch (err) {
        logger.error('VercelDeploymentGuide', 'Failed to load progress', {
          error: err,
        })
      } finally {
        setTimeout(() => {
          isLoadingRef.current = false
        }, 100)
      }
    }
    loadProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  // Save progress to Firebase whenever it changes (debounced)
  useEffect(() => {
    if (isLoadingRef.current || !user || Object.keys(checkedSteps).length === 0)
      return
    if (success) return // Don't save if already completed to prevent loops
    const timeoutId = setTimeout(async () => {
      try {
        await setDoc(
          doc(db, 'vercelDeploymentProgress', user.uid),
          {
            checkedSteps,
            vercelUrl,
            verified: false,
            completed: false,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        )
      } catch (err) {
        logger.error('VercelDeploymentGuide', 'Failed to save progress', {
          error: err,
        })
      }
    }, 300)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedSteps, vercelUrl, user?.uid])

  /** Shared logic for marking all steps complete, updating Firestore, and notifying parent. */
  const finalizeCompletion = useCallback(
    async (uid: string, url: string, verified: boolean) => {
      const allComplete = buildAllStepsComplete()
      const now = new Date().toISOString()
      await setDoc(
        doc(db, 'vercelDeploymentProgress', uid),
        {
          checkedSteps: allComplete,
          vercelUrl: url,
          completed: true,
          verified,
          verifiedAt: now,
          updatedAt: now,
        },
        { merge: true }
      )

      const userUpdate: Record<string, string | boolean> = {
        vercelDeploymentComplete: true,
        vercelVerifiedAt: now,
      }
      if (url) userUpdate.vercelUrl = url
      await setDoc(doc(db, 'users', uid), userUpdate, { merge: true })

      setCheckedSteps(allComplete)
      setSuccess(true)
      onProgressChange?.(allSteps.length, allSteps.length)
      onComplete?.()
      return allComplete
    },
    [onProgressChange, onComplete]
  )

  const toggleStep = useCallback((stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }))
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 3000)
    } catch (err) {
      logger.error('VercelDeploymentGuide', 'Failed to copy', { error: err })
    }
  }, [])

  const handleVerify = useCallback(async () => {
    if (!vercelUrl.trim()) {
      setError('Please enter your Vercel URL')
      return
    }
    setIsVerifying(true)
    setError('')
    try {
      // CRITICAL: Preserve auth — use user.getIdToken() for Bearer token
      const token = await user?.getIdToken()
      if (!token) {
        setError('Please log in to continue')
        return
      }

      const response = await fetch('/api/verify-vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vercelUrl }),
      })
      const data = await response.json()

      if (data.success) {
        if (!user) {
          setError('User session expired. Please log in again.')
          return
        }
        await finalizeCompletion(user.uid, vercelUrl.trim(), true)
        toastSuccess('Deployment verified! Your dashboard will unlock shortly.')
      } else {
        setError(
          data.error ||
            'Verification failed. Please check your URL and try again.'
        )
        toastInfo(
          'If the unlock does not appear, click "Mark Vercel as Complete" below to proceed.'
        )
      }
    } catch (err) {
      logger.error('VercelDeploymentGuide', 'Failed to verify deployment', {
        error: err,
      })
      setError('Failed to verify. Please try again.')
      toastInfo(
        'If verification continues to fail, you can mark Vercel as complete below.'
      )
    } finally {
      setIsVerifying(false)
    }
  }, [vercelUrl, user, finalizeCompletion, toastSuccess, toastInfo])

  const handleManualComplete = useCallback(async () => {
    if (!user) {
      setError('Please log in to continue')
      return
    }
    setIsCompleting(true)
    setError('')
    try {
      await finalizeCompletion(user.uid, vercelUrl.trim(), success)
      toastSuccess('Vercel marked as complete. Welcome to the full dashboard!')
    } catch (e) {
      logger.error('VercelDeploymentGuide', 'Manual complete failed', {
        error: e,
      })
      setError('Could not mark Vercel as complete. Please try again.')
      toastError('Could not mark as complete. Please try again.')
    } finally {
      setIsCompleting(false)
    }
  }, [user, vercelUrl, success, finalizeCompletion, toastSuccess, toastError])

  const clearProgress = useCallback(async () => {
    if (!user) return
    try {
      await setDoc(doc(db, 'vercelDeploymentProgress', user.uid), {
        checkedSteps: {},
        vercelUrl: '',
        verified: false,
        updatedAt: new Date().toISOString(),
      })
      setCheckedSteps({})
      setVercelUrl('')
      setSuccess(false)
    } catch (err) {
      logger.error('VercelDeploymentGuide', 'Failed to clear progress', {
        error: err,
      })
    }
  }, [user])

  // Computed values
  const completedSteps = allSteps.filter((step) => checkedSteps[step.id])
  const currentStepIndex = allSteps.findIndex((step) => !checkedSteps[step.id])
  const currentStep =
    currentStepIndex !== -1 ? allSteps[currentStepIndex] : null

  return {
    user,
    expanded,
    setExpanded,
    checkedSteps,
    openPopup,
    setOpenPopup,
    vercelUrl,
    setVercelUrl,
    isVerifying,
    error,
    success,
    isCompleting,
    showCopyToast,
    allSteps,
    completedSteps,
    currentStep,
    allStepsChecked: currentStepIndex === -1,
    toggleStep,
    copyToClipboard,
    handleVerify,
    handleManualComplete,
    clearProgress,
  }
}
