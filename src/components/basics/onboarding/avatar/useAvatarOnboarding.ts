'use client'

/**
 * useAvatarOnboarding Hook
 *
 * Manages all state, step navigation, and submission logic for the
 * avatar onboarding flow. Extracted from AvatarOnboarding to keep
 * the main component a thin orchestrator.
 */

import { useState, useEffect, useCallback } from 'react'
import { AVATAR_CHARACTERS } from '@/data/avatars'
import { AvatarCharacter } from '@/lib/types/avatar'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { logger } from '@/lib/logger'
import { Step, MAX_AUTO_RETRIES, RETRY_DELAY_MS } from './constants'

interface UseAvatarOnboardingOptions {
  userId: string
  onComplete: () => void
  onSkip?: () => void
}

export function useAvatarOnboarding({ userId, onComplete, onSkip }: UseAvatarOnboardingOptions) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { requireAuth } = useRequireAuth()

  // Form state
  const [birthDate, setBirthDate] = useState('')
  const [isOver18, setIsOver18] = useState<boolean | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarCharacter | null>(null)
  const [nickname, setNickname] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [avatarType, setAvatarType] = useState<'photo' | 'character' | null>(null)

  // UI state
  const [currentStep, setCurrentStep] = useState<Step>('birthdate')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveAttempts, setSaveAttempts] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  // Calculate age when birth date changes
  useEffect(() => {
    if (birthDate) {
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      if (age >= 0 && age <= 120) {
        setIsOver18(age >= 18)
      }
    }
  }, [birthDate])

  // Get step configuration based on user state
  const getSteps = useCallback((): Step[] => {
    const steps: Step[] = ['birthdate', 'region']

    if (isOver18 === true) {
      steps.push('avatar-type')
      if (avatarType === 'character') {
        steps.push('avatar-pick')
        steps.push('nickname') // Optional for 18+ character users
      }
    } else if (isOver18 === false) {
      steps.push('avatar-pick')
      steps.push('nickname') // Required for under 18
    }

    steps.push('review')
    return steps
  }, [isOver18, avatarType])

  const steps = getSteps()
  let currentStepIndex = steps.indexOf(currentStep)

  // Safeguard: if current step is not in the steps array, reset to a valid step
  if (currentStepIndex === -1) {
    if (currentStep === 'avatar-pick' && !steps.includes('avatar-pick')) {
      currentStepIndex = steps.indexOf('review')
    } else if (currentStep === 'nickname' && !steps.includes('nickname')) {
      currentStepIndex = steps.indexOf('review')
    } else {
      currentStepIndex = 0
    }
  }

  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'birthdate':
        return !!birthDate && isOver18 !== null
      case 'region':
        return !!selectedRegion
      case 'avatar-type':
        return !!avatarType
      case 'avatar-pick':
        return !!selectedAvatar
      case 'nickname':
        // Required for under 18, optional for 18+
        return isOver18 ? true : !!nickname.trim()
      case 'review':
        return true
      default:
        return false
    }
  }

  const goNext = () => {
    setError(null)
    if (canProceed() && currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1])
    }
  }

  const goBack = () => {
    setError(null)
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1])
    }
  }

  // Sleep helper for retry delays
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Core save function with retry logic
  const saveAvatarWithRetry = async (attempt: number = 0): Promise<boolean> => {
    try {
      const finalAvatarType = isOver18 && avatarType === 'photo' ? 'photo' : 'character'
      const finalCharacterId = finalAvatarType === 'character' && selectedAvatar ? selectedAvatar.id : undefined

      await fetchApi('/api/basics/save-avatar', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          birthDate,
          isOver18,
          region: selectedRegion,
          avatarType: finalAvatarType,
          characterId: finalCharacterId,
          nickname: nickname.trim() || undefined
        })
      })

      // Verify save
      const verifyResult = await fetchApi(`/api/basics/check-avatar?userId=${userId}`)

      if (!verifyResult?.hasAvatar) {
        throw new Error('Avatar save verification failed')
      }

      return true
    } catch (err) {
      // Auto-retry with exponential backoff
      if (attempt < MAX_AUTO_RETRIES - 1) {
        setIsRetrying(true)
        await sleep(RETRY_DELAY_MS * (attempt + 1))
        return saveAvatarWithRetry(attempt + 1)
      }
      throw err
    }
  }

  const handleSubmit = async () => {
    setError(null)
    setIsRetrying(false)

    requireAuth(async () => {
      setIsSubmitting(true)
      setSaveAttempts(prev => prev + 1)

      try {
        const success = await saveAvatarWithRetry()
        if (success) {
          // Track profile completion in Firestore
          try {
            await fetchApi('/api/basics/onboarding-status', {
              method: 'POST',
              body: JSON.stringify({ action: 'complete_profile' })
            })
          } catch (trackErr) {
            logger.warn('AvatarOnboarding', 'Failed to track profile completion', { error: trackErr })
          }
          onComplete()
        }
      } catch (err) {
        const errorMessage = getErrorMessage(err, 'Failed to save avatar')

        if (saveAttempts >= 2) {
          setError(`${errorMessage}. We've tried multiple times - you can try again, skip for now, or refresh the page.`)
        } else {
          setError(`${errorMessage}. Please try again.`)
        }
      } finally {
        setIsSubmitting(false)
        setIsRetrying(false)
      }
    })
  }

  // Handle skip - save to Firestore so we can remind them later
  const handleSkipForNow = async () => {
    try {
      await fetchApi('/api/basics/onboarding-status', {
        method: 'POST',
        body: JSON.stringify({ action: 'skip_profile' })
      })
    } catch (err) {
      logger.warn('AvatarOnboarding', 'Failed to track profile skip', { error: err })
    }

    if (onSkip) {
      onSkip()
    }
  }

  const filteredAvatars = selectedCategory === 'all'
    ? AVATAR_CHARACTERS
    : AVATAR_CHARACTERS.filter(a => a.category === selectedCategory)

  return {
    // Auth
    user,
    // Form state
    birthDate,
    setBirthDate,
    isOver18,
    selectedRegion,
    setSelectedRegion,
    selectedAvatar,
    setSelectedAvatar,
    nickname,
    setNickname,
    selectedCategory,
    setSelectedCategory,
    avatarType,
    setAvatarType,
    filteredAvatars,
    // UI state
    currentStep,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    isSubmitting,
    error,
    saveAttempts,
    isRetrying,
    // Actions
    canProceed,
    goNext,
    goBack,
    handleSubmit,
    handleSkipForNow,
  }
}
