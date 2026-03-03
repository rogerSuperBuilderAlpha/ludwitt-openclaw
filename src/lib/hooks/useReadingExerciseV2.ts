'use client'

/**
 * useReadingExerciseV2 Hook
 * 
 * Manages reading exercise state, answers, and submission for the V2 reading module.
 * Enhanced to support:
 * - All new exercise types
 * - Skill-based progress tracking
 * - Morphology and text structure exercises
 * - Fluency scoring integration
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { useApiMutation } from '@/lib/hooks/useApiQuery'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { ReadingExerciseV2, ReadingFeedbackV2 } from '@/lib/types/reading-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'
import { useTelemetryCollector } from '@/lib/telemetry/collector'
import { logger } from '@/lib/logger'
import { useStruggleDetection } from '@/lib/hooks/useStruggleDetection'
import { useTransferChallenge } from '@/lib/hooks/useTransferChallenge'

interface AIFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  detailedExplanation: string
  correctAnswer?: string
  score: number
  grade: string
}

interface Feedback {
  correct: boolean
  message: string
  explanation: string
  xpEarned: number
}

interface UseReadingExerciseV2Options {
  exercise: ReadingExerciseV2 | null
  progress: SubjectProgressDisplay | null
  engagement: EngagementState
  onExerciseComplete: (
    nextExercise: ReadingExerciseV2,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number
  ) => void
  onSkip: () => void
  onBonusEarned?: (points: number) => void
}

interface UseReadingExerciseV2Return {
  // State
  answers: Record<string, string>
  isSubmitting: boolean
  feedback: Feedback | null
  aiFeedback: AIFeedback | null
  isAiGrading: boolean
  lastExercise: ReadingExerciseV2 | null
  showLastExercise: boolean
  nextExerciseData: {
    exercise: ReadingExerciseV2
    progress: SubjectProgressDisplay
    xp: number
  } | null
  bonusPoints: number

  // Actions
  handleAnswerChange: (questionId: string, value: string) => void
  handleCheckboxChange: (questionId: string, option: string, checked: boolean) => void
  handleSubmit: () => Promise<void>
  handleSkip: () => Promise<void>
  handleReviewLast: () => void
  handleTrySimilar: () => Promise<void>
  handleBonusEarned: (points: number) => void
  handleWordLearned: (word: string, points: number) => void
  handleContinue: () => void
  
  // Telemetry (for wiring to input components)
  telemetry: ReturnType<typeof useTelemetryCollector>
  
  // Struggle Detection (for proactive interventions)
  struggleDetection: ReturnType<typeof useStruggleDetection>
  
  // Transfer Challenges (for cross-context practice)
  transferChallenge: ReturnType<typeof useTransferChallenge>
}

export function useReadingExerciseV2({
  exercise,
  progress,
  engagement,
  onExerciseComplete,
  onSkip,
  onBonusEarned
}: UseReadingExerciseV2Options): UseReadingExerciseV2Return {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { requireAuth } = useRequireAuth()
  const { mutate: getSimilarProblem } = useApiMutation('/api/basics/similar-problem')

  const sessionStartRef = useRef<number>(Date.now())

  // State
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null)
  const [isAiGrading, setIsAiGrading] = useState(false)
  const [startTime] = useState(Date.now())
  const [lastExercise, setLastExercise] = useState<ReadingExerciseV2 | null>(null)
  const [showLastExercise, setShowLastExercise] = useState(false)
  const [nextExerciseData, setNextExerciseData] = useState<{
    exercise: ReadingExerciseV2
    progress: SubjectProgressDisplay
    xp: number
  } | null>(null)
  const [bonusPoints, setBonusPoints] = useState(0)

  // Telemetry for Technical Moat integration
  const telemetry = useTelemetryCollector({
    problemId: exercise?.id || 'unknown',
    userId: user?.uid || 'anonymous',
    subject: 'reading',
    difficulty: exercise?.difficulty || 5,
    skills: exercise?.primarySkill ? [exercise.primarySkill, ...(exercise.secondarySkills || [])] : [],
    getToken: user ? () => user.getIdToken() : undefined
  })
  
  // Struggle Detection for proactive interventions
  const struggleDetection = useStruggleDetection({
    problemId: exercise?.id || 'unknown',
    subject: 'reading',
    difficulty: exercise?.difficulty || 5,
    problemType: exercise?.type,
    problemText: exercise?.passage?.slice(0, 200),
    getCurrentSignals: telemetry.getCurrentSignals,
    pollIntervalMs: 10000,
    enabled: !!exercise && !feedback
  })
  
  // Transfer Challenges for cross-context practice
  const transferChallenge = useTransferChallenge()

  // Load saved answers from localStorage on exercise change
  useEffect(() => {
    if (exercise && exercise.id !== lastExercise?.id) {
      setLastExercise(exercise)
    }

    if (exercise) {
      const savedAnswersKey = `reading_v2_answers_${exercise.id}`
      try {
        const savedAnswers = localStorage.getItem(savedAnswersKey)
        if (savedAnswers) {
          setAnswers(JSON.parse(savedAnswers))
        } else {
          setAnswers({})
        }
      } catch {
        setAnswers({})
      }
    } else {
      setAnswers({})
    }

    setFeedback(null)
    setAiFeedback(null)
    setShowLastExercise(false)
    setNextExerciseData(null)
    setBonusPoints(0)
    // Reset telemetry for new exercise
    telemetry.start()
    sessionStartRef.current = Date.now()
  }, [exercise?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save answers to localStorage
  useEffect(() => {
    if (exercise && Object.keys(answers).length > 0) {
      const savedAnswersKey = `reading_v2_answers_${exercise.id}`
      try {
        localStorage.setItem(savedAnswersKey, JSON.stringify(answers))
      } catch {
        // Ignore
      }
    }
  }, [answers, exercise])

  const clearSavedAnswers = useCallback((exerciseId: string) => {
    try {
      localStorage.removeItem(`reading_v2_answers_${exerciseId}`)
    } catch {
      // Ignore
    }
  }, [])

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => {
      const oldValue = prev[questionId] || ''
      const delta = Math.abs(value.length - oldValue.length)
      telemetry.trackAnswerChange(value.length, delta)
      return { ...prev, [questionId]: value }
    })
  }, [telemetry])

  const handleCheckboxChange = useCallback(
    (questionId: string, option: string, checked: boolean) => {
      setAnswers((prev) => {
        const current = prev[questionId] || ''
        const currentOptions = current ? current.split(',') : []

        if (checked) {
          return { ...prev, [questionId]: [...currentOptions, option].join(',') }
        } else {
          return {
            ...prev,
            [questionId]: currentOptions.filter((o) => o !== option).join(',')
          }
        }
      })
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    if (!exercise) return

    const result = requireAuth(async () => {
      const unansweredQuestions = exercise.questions.filter(
        (q) => !answers[q.id]?.trim()
      )
      if (unansweredQuestions.length > 0) {
        setFeedback({
          correct: false,
          message: 'Please answer all questions before submitting.',
          explanation: '',
          xpEarned: 0
        })
        return
      }

      setIsSubmitting(true)
      setIsAiGrading(true)
      setAiFeedback(null)
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      try {
        // Build context for AI grading based on exercise type
        // Include correct answers so the AI can properly validate
        const questionContext = exercise.questions
          .map(
            (q) =>
              `Q: ${q.question}\nType: ${q.type}\nSkill: ${q.skill}\nDOK: ${q.depthOfKnowledge}\nUser Answer: ${
                answers[q.id] || 'No answer'
              }${q.options ? `\nOptions: ${q.options.join(', ')}` : ''}${
                q.correctAnswer ? `\nCorrect Answer: ${Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' OR ') : q.correctAnswer}` : ''
              }${q.acceptableAnswers ? `\nAcceptable Answers: ${q.acceptableAnswers.join(', ')}` : ''}`
          )
          .join('\n\n')

        // Include morphology focus if applicable
        let additionalContext = ''
        if (exercise.morphologyFocus && exercise.morphologyFocus.length > 0) {
          additionalContext = `\n\nMorphology Focus:\n${exercise.morphologyFocus
            .map((m) => `${m.element} (${m.type}): ${m.meaning}`)
            .join('\n')}`
        }

        // Include text structure if applicable
        if (exercise.textStructure) {
          additionalContext += `\n\nText Structure: ${exercise.textStructure}`
        }

        // Build correct answers array for explicit validation
        const correctAnswers = exercise.questions.map(q => ({
          questionId: q.id,
          correctAnswer: q.correctAnswer,
          acceptableAnswers: q.acceptableAnswers
        }))

        const aiResult = await fetchApi('/api/basics/ai-grade', {
          method: 'POST',
          body: JSON.stringify({
            subject: 'reading',
            question: {
              text: questionContext + additionalContext,
              passage: exercise.passage,
              type: exercise.type,
              difficulty: exercise.difficulty,
              primarySkill: exercise.primarySkill,
              context: `Genre: ${exercise.genre || 'General'}. Content Area: ${
                exercise.contentArea || 'General'
              }. Exercise Type: ${exercise.type}.`,
              // Pass correct answers for proper validation
              correctAnswers
            },
            userAnswer: JSON.stringify(answers),
            timeTaken: timeSpent
          })
        })

        setIsAiGrading(false)

        if (aiResult) {
          setAiFeedback({
            summary: aiResult.feedback?.summary || '',
            strengths: aiResult.feedback?.strengths || [],
            improvements: aiResult.feedback?.improvements || [],
            detailedExplanation: aiResult.feedback?.detailedExplanation || '',
            correctAnswer: aiResult.feedback?.correctAnswer,
            score: aiResult.score || 0,
            grade: aiResult.grade || 'F'
          })
        }

        const isCorrect = aiResult?.isCorrect || false
        const xpEarned = aiResult?.xpEarned || 0

        setFeedback({
          correct: isCorrect,
          message:
            aiResult?.feedback?.summary ||
            (isCorrect ? 'Correct!' : 'Incorrect'),
          explanation: aiResult?.feedback?.detailedExplanation || '',
          xpEarned
        })
        
        // Flush telemetry with outcome
        telemetry.flush({
          correct: isCorrect,
          finalAnswer: JSON.stringify(answers),
          attemptCount: 1,
          skipped: false,
          timeToCorrectMs: isCorrect ? Date.now() - sessionStartRef.current : undefined
        }).catch(err => logger.error('UseReadingExerciseV2', 'Telemetry flush error', { error: err }))
        
        // Check for transfer challenge trigger on correct answers
        // Check for transfer challenge trigger on correct answers
        // Note: Transfer challenges are AI-generated and cost credits
        if (isCorrect && exercise && !transferChallenge.state.isLoading) {
          const shouldTransfer = transferChallenge.checkForTransferTrigger(
            { topic: exercise.primarySkill || 'reading', difficulty: exercise.difficulty },
            true,
            'reading'
          )
          if (shouldTransfer) {
            const firstAnswer = exercise.questions[0]?.correctAnswer
            const answerString = Array.isArray(firstAnswer) ? firstAnswer[0] : (firstAnswer || '')
            // Generate challenge synchronously
            const challenge = transferChallenge.generateTransferChallenge(
              {
                topic: exercise.primarySkill || 'reading',
                difficulty: exercise.difficulty,
                question: exercise.questions[0]?.question || '',
                correctAnswer: answerString
              },
              'reading'
            )
            if (challenge) {
              transferChallenge.showTransferChallenge(challenge)
            }
          }
        }

        // Update progress
        const checkResult = await fetchApi('/api/basics/check-answer', {
          method: 'POST',
          body: JSON.stringify({
            userId: user!.uid,
            subject: 'reading',
            problemId: exercise.id,
            userAnswer: answers,
            timeSpent,
            // V2-specific fields
            exerciseType: exercise.type,
            primarySkill: exercise.primarySkill,
            secondarySkills: exercise.secondarySkills
          })
        })

        if (isCorrect) {
          await engagement.confirmPoints()
        }

        clearSavedAnswers(exercise.id)

        setNextExerciseData({
          exercise: checkResult.nextProblem,
          progress: { ...progress!, ...checkResult.progressUpdate },
          xp: xpEarned
        })
      } catch (error) {
        setIsAiGrading(false)
        setFeedback({
          correct: false,
          message: getErrorMessage(
            error,
            'Failed to check answer. Please try again.'
          ),
          explanation: '',
          xpEarned: 0
        })
      } finally {
        setIsSubmitting(false)
      }
    })

    if (!result) {
      setFeedback({
        correct: false,
        message: 'You must be logged in to submit answers.',
        explanation: '',
        xpEarned: 0
      })
    }
  }, [
    exercise,
    answers,
    user,
    fetchApi,
    progress,
    engagement,
    requireAuth,
    clearSavedAnswers,
    startTime,
    telemetry,
    transferChallenge
  ])

  const handleSkip = useCallback(async () => {
    requireAuth(async () => {
      setIsSubmitting(true)

      try {
        if (!exercise || !exercise.id) {
          onSkip()
          return
        }

        const result = await fetchApi('/api/basics/check-answer', {
          method: 'POST',
          body: JSON.stringify({
            userId: user!.uid,
            subject: 'reading',
            problemId: exercise.id,
            userAnswer: { __SKIPPED__: 'true' },
            timeSpent: 0
          })
        })

        if (result?.nextProblem) {
          const nextExercise = result.nextProblem
          if (nextExercise?.id && nextExercise?.passage) {
            clearSavedAnswers(exercise.id)
            setAnswers({})
            onExerciseComplete(nextExercise, {
              ...progress!,
              ...result.progressUpdate
            })
          } else {
            clearSavedAnswers(exercise.id)
            setAnswers({})
            onSkip()
          }
        } else {
          if (exercise) clearSavedAnswers(exercise.id)
          setAnswers({})
          onSkip()
        }
      } catch {
        if (exercise) clearSavedAnswers(exercise.id)
        setAnswers({})
        onSkip()
      } finally {
        setIsSubmitting(false)
      }
    })
  }, [
    exercise,
    user,
    fetchApi,
    progress,
    onExerciseComplete,
    onSkip,
    requireAuth,
    clearSavedAnswers
  ])

  const handleReviewLast = useCallback(() => {
    setShowLastExercise((prev) => !prev)
  }, [])

  const handleTrySimilar = useCallback(async () => {
    if (!exercise || !user) return

    const result = await getSimilarProblem({
      subject: 'reading',
      difficulty: exercise.difficulty,
      type: exercise.type,
      primarySkill: exercise.primarySkill,
      excludeId: exercise.id
    })

    if (result?.problem) {
      alert(
        'Found a similar reading exercise! (This would normally load a new exercise)'
      )
    } else {
      alert('Could not find a similar exercise at this time.')
    }
  }, [exercise, user, getSimilarProblem])

  const handleBonusEarned = useCallback(
    (points: number) => {
      setBonusPoints((prev) => prev + points)
      onBonusEarned?.(points)

      // Show notification
      const notification = document.createElement('div')
      notification.className =
        'fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `🎉 +${points} Bonus Points!`
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    },
    [onBonusEarned]
  )

  const handleWordLearned = useCallback(
    (word: string, points: number) => {
      setBonusPoints((prev) => prev + points)
      onBonusEarned?.(points)

      // Show notification
      const notification = document.createElement('div')
      notification.className =
        'fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `📚 Learned "${word}"! +${points} points`
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    },
    [onBonusEarned]
  )

  const handleContinue = useCallback(() => {
    if (!nextExerciseData) return
    setAnswers({})
    setFeedback(null)
    setAiFeedback(null)
    onExerciseComplete(
      nextExerciseData.exercise,
      nextExerciseData.progress,
      nextExerciseData.xp
    )
    setNextExerciseData(null)
  }, [nextExerciseData, onExerciseComplete])

  return {
    answers,
    isSubmitting,
    feedback,
    aiFeedback,
    isAiGrading,
    lastExercise,
    showLastExercise,
    nextExerciseData,
    bonusPoints,
    handleAnswerChange,
    handleCheckboxChange,
    handleSubmit,
    handleSkip,
    handleReviewLast,
    handleTrySimilar,
    handleBonusEarned,
    handleWordLearned,
    handleContinue,
    telemetry,
    struggleDetection,
    transferChallenge
  }
}
