'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { CheckCircle, XCircle, ArrowRight } from '@phosphor-icons/react'
import { ReadingExercise, SubjectProgressDisplay } from '@/lib/types/basics'
import { useAuth } from '@/components/auth/ClientProvider'
import { ReadingQuestions } from '../reading'
import { logger } from '@/lib/logger'

interface ReadingFocusProps {
  exercise: ReadingExercise
  progress: SubjectProgressDisplay
  onComplete: (
    nextExercise: ReadingExercise | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  onXPEarned: (amount: number) => void
  onProblemCompleted: () => void
}

export function ReadingFocus({
  exercise,
  progress,
  onComplete,
  onXPEarned,
  onProblemCompleted,
}: ReadingFocusProps) {
  const { user } = useAuth()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    message: string
  } | null>(null)
  const [showContinue, setShowContinue] = useState(false)
  const pendingContinueRef = useRef<{
    nextProblem: any
    updatedProgress: SubjectProgressDisplay
    xpEarned: number
  } | null>(null)

  // Reset state when exercise changes
  useEffect(() => {
    setAnswers({})
    setFeedback(null)
    setShowContinue(false)
    pendingContinueRef.current = null
  }, [exercise.id])

  // Handle continue to next exercise
  const handleContinue = useCallback(() => {
    if (pendingContinueRef.current) {
      const { nextProblem, updatedProgress, xpEarned } =
        pendingContinueRef.current
      setFeedback(null)
      setShowContinue(false)
      onComplete(
        nextProblem,
        updatedProgress,
        xpEarned,
        JSON.stringify(answers)
      )
      pendingContinueRef.current = null
    }
  }, [onComplete, answers])

  const handleAnswerChange = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || !user) return

    // Check all questions are answered
    const unansweredQuestions = exercise.questions.filter(
      (q) => !answers[q.id]?.trim()
    )
    if (unansweredQuestions.length > 0) {
      setFeedback({
        correct: false,
        message: 'Please answer all questions before submitting.',
      })
      setTimeout(() => setFeedback(null), 2000)
      return
    }

    setIsSubmitting(true)

    try {
      const token = await user.getIdToken()

      // Format question context for AI grading
      const questionContext = exercise.questions
        .map(
          (q) =>
            `Q: ${q.question}\nType: ${q.type}\nUser Answer: ${answers[q.id] || 'No answer'}${q.options ? `\nOptions: ${q.options.join(', ')}` : ''}`
        )
        .join('\n\n')

      const aiResponse = await fetch('/api/basics/ai-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: 'reading',
          question: {
            text: questionContext,
            passage: exercise.passage,
            type: 'reading-comprehension',
            difficulty: exercise.difficulty,
          },
          userAnswer: JSON.stringify(answers),
          timeTaken: 30,
        }),
      })

      const aiResult = await aiResponse.json()

      if (!aiResponse.ok) {
        throw new Error(
          aiResult.error || aiResult.message || 'Failed to grade answer'
        )
      }

      const gradeData = aiResult.data || aiResult
      const isCorrect = gradeData.isCorrect
      const xpEarned = gradeData.xpEarned || 0

      let feedbackMessage: string
      if (isCorrect) {
        feedbackMessage = `Correct! +${xpEarned * 3} XP (3× bonus)`
      } else {
        const fb = gradeData.feedback
        feedbackMessage =
          fb?.summary ||
          fb?.detailedExplanation ||
          'Incorrect. Keep practicing!'
      }

      setFeedback({ correct: isCorrect, message: feedbackMessage })

      // Update progress with check-answer
      const checkResponse = await fetch('/api/basics/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          subject: 'reading',
          problemId: exercise.id,
          userAnswer: answers,
          timeSpent: 30,
        }),
      })

      const checkResultRaw = await checkResponse.json()
      const checkResult = checkResultRaw.data || checkResultRaw

      if (xpEarned > 0) {
        onXPEarned(xpEarned)
      }
      onProblemCompleted()

      // Store the pending continue data and show the continue button
      if (checkResult.nextProblem) {
        const updatedProgress = checkResult.progressUpdate
          ? { ...progress, ...checkResult.progressUpdate }
          : progress
        pendingContinueRef.current = {
          nextProblem: checkResult.nextProblem,
          updatedProgress,
          xpEarned,
        }

        // Show continue button after a short delay so user can read feedback
        setTimeout(() => {
          setShowContinue(true)
        }, 1000)
      }
    } catch (error: unknown) {
      logger.error('ReadingFocus', 'Submit error', { error })

      // Extract specific error message
      let errorMessage = 'Error grading your answer. Please try again.'
      const errorText = error instanceof Error ? error.message : String(error)

      if (
        errorText.includes('Insufficient credits') ||
        errorText.includes('INSUFFICIENT_CREDITS')
      ) {
        errorMessage = 'Insufficient credits. Add credits to continue.'
      } else if (
        errorText.includes('Rate limit') ||
        errorText.includes('rate limit') ||
        errorText.includes('429')
      ) {
        errorMessage = 'Too many requests. Please wait 30 seconds.'
      } else if (
        errorText.includes('Unauthorized') ||
        errorText.includes('401')
      ) {
        errorMessage = 'Session expired. Please refresh the page.'
      } else if (
        errorText.includes('Service unavailable') ||
        errorText.includes('503')
      ) {
        errorMessage = 'AI service temporarily unavailable. Try again later.'
      } else if (
        errorText.includes('Failed to grade') ||
        errorText.includes('500')
      ) {
        errorMessage = 'AI grading failed. Please try again.'
      }

      setFeedback({ correct: false, message: errorMessage })
      // Keep error visible longer so user can read it
      setTimeout(() => setFeedback(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    answers,
    isSubmitting,
    user,
    exercise,
    progress,
    onXPEarned,
    onProblemCompleted,
  ])

  return (
    <div className="h-full flex flex-col relative">
      {/* Feedback Overlay */}
      {feedback && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center ${feedback.correct ? 'b-bg-reading-light' : 'b-bg-danger-light'}`}
          style={{ opacity: 0.95 }}
        >
          <div
            className={`b-p-xl b-rounded-2xl b-border max-w-md ${feedback.correct ? 'b-bg-reading-light b-border-reading' : 'b-bg-danger-light b-border-latin'}`}
            style={{ borderWidth: '2px' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                {feedback.correct ? (
                  <CheckCircle
                    size={32}
                    weight="fill"
                    className="b-text-reading"
                  />
                ) : (
                  <XCircle size={32} weight="fill" className="b-text-danger" />
                )}
                <span
                  className={`b-text-lg b-font-semibold ${feedback.correct ? 'b-text-reading-dark' : 'b-text-latin-dark'}`}
                >
                  {feedback.message}
                </span>
              </div>

              {/* Continue Button - appears after delay */}
              {showContinue && pendingContinueRef.current && (
                <button
                  onClick={handleContinue}
                  className="b-btn b-btn-lg b-btn-reading flex items-center gap-2 mt-2"
                >
                  <span>Continue to Next Exercise</span>
                  <ArrowRight size={20} weight="bold" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="flex-1 flex flex-col b-p-xl">
        <ReadingQuestions
          exercise={exercise}
          answers={answers}
          isSubmitting={isSubmitting}
          onAnswerChange={handleAnswerChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
