'use client'

/**
 * useTranslationSubmission Hook
 *
 * Handles translation grading submission and next-exercise fetching.
 * Owns the grading animation stages, feedback state, and attempt tracking.
 */

import { useState, useEffect, useCallback } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  TranslationExercise,
  TranslationFeedback,
  ClassicalLanguage,
  SubjectProgressDisplay,
} from '@/lib/types/basics'
import { logger } from '@/lib/logger'

// ---------------------------------------------------------------------------
// Grading stages for animated feedback
// ---------------------------------------------------------------------------

export const GRADING_STAGES = [
  'Analyzing your translation...',
  'Checking vocabulary usage...',
  'Evaluating grammar accuracy...',
  'Comparing to accepted translations...',
] as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WordLookupState {
  [word: string]: boolean
}

interface TranslationSubmissionDeps {
  userId: string | undefined
  language: ClassicalLanguage
  exercise: TranslationExercise | null
  translation: string
  showParsing: boolean
  parsing: Record<string, string>
  wordsLookedUp: WordLookupState
  xpSpentOnLookups: number
  startTime: number
  onExerciseComplete: (
    nextExercise: TranslationExercise,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  onXpChange: (delta: number) => void
  /** Flush telemetry with the submission outcome */
  flushTelemetry: (outcome: {
    correct: boolean
    finalAnswer: string
    attemptCount: number
    skipped: boolean
    timeToCorrectMs?: number
  }) => Promise<void>
  sessionStartRef: React.RefObject<number>
  /** Transfer challenge helpers */
  transferChallenge: {
    state: { isLoading: boolean }
    checkForTransferTrigger: (
      problem: { topic: string; difficulty: number },
      isCorrect: boolean,
      subject: ClassicalLanguage
    ) => boolean
    generateTransferChallenge: (
      problem: {
        topic: string
        difficulty: number
        question: string
        correctAnswer: string
      },
      subject: ClassicalLanguage
    ) => any
    showTransferChallenge: (challenge: any) => void
  }
}

interface TranslationSubmissionReturn {
  feedback: TranslationFeedback | null
  setFeedback: React.Dispatch<React.SetStateAction<TranslationFeedback | null>>
  isSubmitting: boolean
  attemptCount: number
  setAttemptCount: React.Dispatch<React.SetStateAction<number>>
  gradingStage: number
  handleSubmit: () => Promise<void>
  handleNext: () => Promise<void>
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTranslationSubmission(
  deps: TranslationSubmissionDeps
): TranslationSubmissionReturn {
  const {
    userId,
    language,
    exercise,
    translation,
    showParsing,
    parsing,
    wordsLookedUp,
    xpSpentOnLookups,
    startTime,
    onExerciseComplete,
    onXpChange,
    flushTelemetry,
    sessionStartRef,
    transferChallenge,
  } = deps

  const fetchApi = useApiFetch()

  // State
  const [feedback, setFeedback] = useState<TranslationFeedback | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [gradingStage, setGradingStage] = useState(0)

  // Animate through grading stages while submitting
  useEffect(() => {
    if (isSubmitting) {
      setGradingStage(0)
      const interval = setInterval(() => {
        setGradingStage((prev) => (prev + 1) % GRADING_STAGES.length)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [isSubmitting])

  // Handle translation submission
  const handleSubmit = useCallback(async () => {
    if (!exercise || !userId || !translation.trim()) return

    setIsSubmitting(true)

    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const currentAttempt = attemptCount + 1

      const response = await fetchApi<{
        feedback: TranslationFeedback
        updatedProgress?: SubjectProgressDisplay
        summary?: {
          qualityTier:
            | 'perfect'
            | 'excellent'
            | 'good'
            | 'partial'
            | 'attempted'
          overallScore: number
          xpEarned: number
          xpSpent: number
          netXp: number
          timeSpent: number
        }
      }>('/api/basics/translation/check', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          language,
          exerciseId: exercise.id,
          userTranslation: translation.trim(),
          parsing: showParsing ? parsing : undefined,
          timeSpent,
          wordsLookedUp: Object.keys(wordsLookedUp).filter(
            (w) => wordsLookedUp[w]
          ),
          xpSpentOnLookups,
        }),
      })

      if (response.feedback || response.summary) {
        const mergedFeedback = {
          ...response.feedback,
          qualityTier:
            response.summary?.qualityTier ||
            response.feedback?.qualityTier ||
            'attempted',
          overallScore:
            response.summary?.overallScore ||
            response.feedback?.overallScore ||
            0,
          xpEarned: response.summary?.xpEarned || 0,
          xpSpent: response.summary?.xpSpent || 0,
          netXp: response.summary?.netXp || 0,
          timeSpent: response.summary?.timeSpent || 0,
        }
        setFeedback(mergedFeedback)
        setAttemptCount((prev) => prev + 1)

        // Flush telemetry with outcome
        const isCorrect =
          mergedFeedback.qualityTier === 'perfect' ||
          mergedFeedback.qualityTier === 'excellent'
        flushTelemetry({
          correct: isCorrect,
          finalAnswer: translation,
          attemptCount: currentAttempt,
          skipped: false,
          timeToCorrectMs: isCorrect
            ? Date.now() - (sessionStartRef.current ?? Date.now())
            : undefined,
        }).catch((err) =>
          logger.error('Usetranslationsubmission', 'Telemetry flush error', {
            error: err,
          })
        )

        // Check for transfer challenge trigger on correct answers
        if (isCorrect && exercise && !transferChallenge.state.isLoading) {
          const shouldTransfer = transferChallenge.checkForTransferTrigger(
            {
              topic: exercise.grammarTopic || language,
              difficulty: exercise.difficulty,
            },
            true,
            language
          )
          if (shouldTransfer) {
            const challenge = transferChallenge.generateTransferChallenge(
              {
                topic: exercise.grammarTopic || language,
                difficulty: exercise.difficulty,
                question: exercise.sourceText,
                correctAnswer:
                  exercise.acceptableTranslations?.[0] || translation,
              },
              language
            )
            if (challenge) {
              transferChallenge.showTransferChallenge(challenge)
            }
          }
        }

        const netXp = response.summary?.netXp || response.feedback?.netXp || 0
        if (netXp > 0) {
          onXpChange(netXp)
        }

        if (response.updatedProgress) {
          onExerciseComplete(exercise, response.updatedProgress)
        }
      }
    } catch (error: unknown) {
      logger.error('Translationsection', 'Error checking translation', {
        error: error,
      })

      let errorMessage = 'Error grading your translation. Please try again.'
      const errorText = error instanceof Error ? error.message : String(error)

      if (
        errorText.includes('Insufficient credits') ||
        errorText.includes('INSUFFICIENT_CREDITS')
      ) {
        errorMessage =
          'Insufficient credits to grade this translation. Add credits to continue.'
      } else if (
        errorText.includes('Rate limit') ||
        errorText.includes('rate limit') ||
        errorText.includes('429')
      ) {
        errorMessage =
          'Too many requests. Please wait 30 seconds and try again.'
      } else if (
        errorText.includes('Unauthorized') ||
        errorText.includes('401')
      ) {
        errorMessage = 'Session expired. Please refresh the page.'
      } else if (
        errorText.includes('Service unavailable') ||
        errorText.includes('503')
      ) {
        errorMessage =
          'AI service temporarily unavailable. Try again in a few minutes.'
      } else if (
        errorText.includes('Failed to grade') ||
        errorText.includes('500')
      ) {
        errorMessage = 'AI grading failed. Please try submitting again.'
      }

      setFeedback({
        qualityTier: 'attempted',
        overallScore: 0,
        feedback: errorMessage,
        improvements: [
          'Check your internet connection',
          'Try submitting again',
        ],
        acceptableTranslations: [],
        categoryScores: {
          meaning: 0,
          grammar: 0,
          vocabulary: 0,
          english: 0,
        },
        xpEarned: 0,
        xpSpentOnLookups: 0,
        netXp: 0,
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [
    exercise,
    userId,
    translation,
    startTime,
    attemptCount,
    fetchApi,
    language,
    showParsing,
    parsing,
    wordsLookedUp,
    xpSpentOnLookups,
    flushTelemetry,
    sessionStartRef,
    transferChallenge,
    onXpChange,
    onExerciseComplete,
  ])

  // Handle next exercise
  const handleNext = useCallback(async () => {
    if (!exercise || !userId) return

    try {
      const response = await fetchApi<{
        exercise: TranslationExercise
        progress: SubjectProgressDisplay
      }>(`/api/basics/translation/exercise?language=${language}`, {
        method: 'GET',
      })

      if (response.exercise) {
        onExerciseComplete(response.exercise, response.progress, 0)
        setFeedback(null)
      }
    } catch (error) {
      logger.error('Translationsection', 'Error getting next exercise', {
        error: error,
      })
    }
  }, [exercise, userId, fetchApi, language, onExerciseComplete])

  return {
    feedback,
    setFeedback,
    isSubmitting,
    attemptCount,
    setAttemptCount,
    gradingStage,
    handleSubmit,
    handleNext,
  }
}
