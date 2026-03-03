'use client'

/**
 * useReadingExercise Hook
 * Manages reading exercise state, answers, and submission
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useRequireAuth } from '@/lib/hooks/useRequireAuth'
import { useApiMutation } from '@/lib/hooks/useApiQuery'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { EngagementState } from '@/lib/hooks/useEngagementTracking'

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

interface UseReadingExerciseOptions {
  exercise: ReadingExercise | null
  progress: SubjectProgressDisplay | null
  engagement: EngagementState
  onExerciseComplete: (nextExercise: ReadingExercise, updatedProgress: SubjectProgressDisplay, xpEarned?: number) => void
  onSkip: () => void
  onBonusEarned?: (points: number) => void
}

interface UseReadingExerciseReturn {
  // State
  answers: Record<string, string>
  isSubmitting: boolean
  feedback: Feedback | null
  aiFeedback: AIFeedback | null
  isAiGrading: boolean
  lastExercise: ReadingExercise | null
  showLastExercise: boolean
  nextExerciseData: { exercise: ReadingExercise; progress: SubjectProgressDisplay; xp: number } | null
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
}

export function useReadingExercise({
  exercise,
  progress,
  engagement,
  onExerciseComplete,
  onSkip,
  onBonusEarned
}: UseReadingExerciseOptions): UseReadingExerciseReturn {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { requireAuth } = useRequireAuth()
  const { mutate: getSimilarProblem } = useApiMutation('/api/basics/similar-problem')

  // State
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null)
  const [isAiGrading, setIsAiGrading] = useState(false)
  const [startTime] = useState(Date.now())
  const [lastExercise, setLastExercise] = useState<ReadingExercise | null>(null)
  const [showLastExercise, setShowLastExercise] = useState(false)
  const [nextExerciseData, setNextExerciseData] = useState<{ exercise: ReadingExercise; progress: SubjectProgressDisplay; xp: number } | null>(null)
  const [bonusPoints, setBonusPoints] = useState(0)

  // Load saved answers from localStorage on exercise change
  useEffect(() => {
    if (exercise && exercise.id !== lastExercise?.id) {
      setLastExercise(exercise)
    }

    if (exercise) {
      const savedAnswersKey = `reading_answers_${exercise.id}`
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
  }, [exercise?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save answers to localStorage
  useEffect(() => {
    if (exercise && Object.keys(answers).length > 0) {
      const savedAnswersKey = `reading_answers_${exercise.id}`
      try {
        localStorage.setItem(savedAnswersKey, JSON.stringify(answers))
      } catch {
        // Ignore
      }
    }
  }, [answers, exercise])

  const clearSavedAnswers = useCallback((exerciseId: string) => {
    try {
      localStorage.removeItem(`reading_answers_${exerciseId}`)
    } catch {
      // Ignore
    }
  }, [])

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const handleCheckboxChange = useCallback((questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId] || ''
      const currentOptions = current ? current.split(',') : []

      if (checked) {
        return { ...prev, [questionId]: [...currentOptions, option].join(',') }
      } else {
        return { ...prev, [questionId]: currentOptions.filter(o => o !== option).join(',') }
      }
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!exercise) return

    const result = requireAuth(async () => {
      const unansweredQuestions = exercise.questions.filter(q => !answers[q.id]?.trim())
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
        const questionContext = exercise.questions.map(q =>
          `Q: ${q.question}\nType: ${q.type}\nSkill: ${q.skill}\nUser Answer: ${answers[q.id] || 'No answer'}${q.options ? `\nOptions: ${q.options.join(', ')}` : ''}`
        ).join('\n\n')

        const aiResult = await fetchApi('/api/basics/ai-grade', {
          method: 'POST',
          body: JSON.stringify({
            subject: 'reading',
            question: {
              text: questionContext,
              passage: exercise.passage,
              type: 'reading-comprehension',
              difficulty: exercise.difficulty,
              context: `Genre: ${exercise.genre || 'General'}. Content Area: ${exercise.contentArea || 'General'}. Type: ${exercise.type || 'passage'}`
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
          message: aiResult?.feedback?.summary || (isCorrect ? 'Correct!' : 'Incorrect'),
          explanation: aiResult?.feedback?.detailedExplanation || '',
          xpEarned
        })

        const checkResult = await fetchApi('/api/basics/check-answer', {
          method: 'POST',
          body: JSON.stringify({
            userId: user!.uid,
            subject: 'reading',
            problemId: exercise.id,
            userAnswer: answers,
            timeSpent
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
          message: getErrorMessage(error, 'Failed to check answer. Please try again.'),
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
  }, [exercise, answers, user, fetchApi, progress, engagement, requireAuth, clearSavedAnswers, startTime])

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
            onExerciseComplete(nextExercise, { ...progress!, ...result.progressUpdate })
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
  }, [exercise, user, fetchApi, progress, onExerciseComplete, onSkip, requireAuth, clearSavedAnswers])

  const handleReviewLast = useCallback(() => {
    setShowLastExercise(prev => !prev)
  }, [])

  const handleTrySimilar = useCallback(async () => {
    if (!exercise || !user) return

    const result = await getSimilarProblem({
      subject: 'reading',
      difficulty: exercise.difficulty,
      type: exercise.type,
      excludeId: exercise.id
    })

    if (result?.problem) {
      alert('Found a similar reading exercise! (This would normally load a new exercise)')
    } else {
      alert('Could not find a similar exercise at this time.')
    }
  }, [exercise, user, getSimilarProblem])

  const handleBonusEarned = useCallback((points: number) => {
    setBonusPoints(prev => prev + points)
    onBonusEarned?.(points)

    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `🎉 +${points} Bonus Points!`
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }, [onBonusEarned])

  const handleWordLearned = useCallback((word: string, points: number) => {
    setBonusPoints(prev => prev + points)
    onBonusEarned?.(points)

    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `📚 Learned "${word}"! +${points} points`
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }, [onBonusEarned])

  const handleContinue = useCallback(() => {
    if (!nextExerciseData) return
    setAnswers({})
    setFeedback(null)
    setAiFeedback(null)
    onExerciseComplete(nextExerciseData.exercise, nextExerciseData.progress, nextExerciseData.xp)
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
    handleContinue
  }
}




