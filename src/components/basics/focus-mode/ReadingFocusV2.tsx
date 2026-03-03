'use client'

/**
 * Reading Focus V2 Component
 *
 * Full V2 reading experience for focus mode with:
 * - V2 exercise types and question format
 * - AI grading integration
 * - Skill-based feedback
 * - All question types supported
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  CheckCircle,
  XCircle,
  BookOpen,
  Sparkle,
  ArrowRight,
} from '@phosphor-icons/react'
import { ReadingExerciseV2, ReadingQuestionV2 } from '@/lib/types/reading-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

// V2 shared components
import { QuestionRenderer } from '../reading-v2/shared/QuestionRenderer'
import { WordLookup } from '../WordLookup'

interface ReadingFocusV2Props {
  exercise: ReadingExerciseV2
  progress: SubjectProgressDisplay
  onComplete: (
    nextExercise: ReadingExerciseV2 | null,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  onXPEarned: (amount: number) => void
  onProblemCompleted: () => void
}

interface FeedbackState {
  correct: boolean
  message: string
  xpEarned: number
  explanation?: string
}

export function ReadingFocusV2({
  exercise,
  progress,
  onComplete,
  onXPEarned,
  onProblemCompleted,
}: ReadingFocusV2Props) {
  const { user } = useAuth()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
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

  // Handle answer change
  const handleAnswerChange = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
    },
    []
  )

  // Get exercise type display name
  const getExerciseTypeName = (): string => {
    const typeNames: Record<string, string> = {
      'phonological-awareness': 'Phonological Awareness',
      'phonics-decoding': 'Phonics & Decoding',
      'fluency-practice': 'Fluency Practice',
      'word-study': 'Word Study',
      'vocabulary-context': 'Vocabulary in Context',
      'vocabulary-direct': 'Vocabulary',
      morphology: 'Word Structure',
      'word-relationships': 'Word Relationships',
      'comprehension-literal': 'Reading Comprehension',
      'comprehension-inferential': 'Inferential Reading',
      'comprehension-critical': 'Critical Analysis',
      'text-structure': 'Text Structure',
      'close-reading': 'Close Reading',
      'reciprocal-teaching': 'Strategic Reading',
      'disciplinary-literacy': 'Content Area Reading',
    }
    return typeNames[exercise.type] || 'Reading Exercise'
  }

  // Handle submit
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
        xpEarned: 0,
      })
      setTimeout(() => setFeedback(null), 2000)
      return
    }

    setIsSubmitting(true)

    try {
      const token = await user.getIdToken()

      // Format question context for AI grading (V2 format)
      const questionContext = exercise.questions
        .map(
          (q) =>
            `Q: ${q.question}\nType: ${q.type}\nSkill: ${q.skill}\nDOK: ${q.depthOfKnowledge}\nUser Answer: ${answers[q.id] || 'No answer'}`
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
            type: exercise.type,
            difficulty: exercise.difficulty,
            primarySkill: exercise.primarySkill,
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

      setFeedback({
        correct: isCorrect,
        message: feedbackMessage,
        xpEarned,
        explanation: gradeData.feedback?.detailedExplanation,
      })

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
      logger.error('ReadingFocusV2', 'Submit error', { error })

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

      setFeedback({
        correct: false,
        message: errorMessage,
        xpEarned: 0,
      })
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

  const allQuestionsAnswered = exercise.questions.every((q) =>
    answers[q.id]?.trim()
  )

  return (
    <div className="h-full flex flex-col relative">
      {/* Feedback Overlay */}
      {feedback && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center ${
            feedback.correct ? 'b-bg-reading-light' : 'b-bg-danger-light'
          }`}
          style={{ opacity: 0.95 }}
        >
          <div
            className={`b-p-xl b-rounded-2xl b-border ${
              feedback.correct
                ? 'b-bg-reading-light b-border-reading'
                : 'b-bg-danger-light b-border-latin'
            }`}
            style={{ borderWidth: '2px', maxWidth: '400px' }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              {feedback.correct ? (
                <CheckCircle
                  size={48}
                  weight="fill"
                  className="b-text-reading"
                />
              ) : (
                <XCircle size={48} weight="fill" className="b-text-danger" />
              )}
              <span
                className={`b-text-lg b-font-semibold ${
                  feedback.correct ? 'b-text-reading-dark' : 'b-text-latin-dark'
                }`}
              >
                {feedback.message}
              </span>
              {feedback.explanation && !feedback.correct && (
                <p className="b-text-sm b-text-secondary mt-2">
                  {feedback.explanation}
                </p>
              )}

              {/* Continue Button - appears after delay */}
              {showContinue && pendingContinueRef.current && (
                <button
                  onClick={handleContinue}
                  className="b-btn b-btn-lg b-btn-reading flex items-center gap-2 mt-4"
                >
                  <span>Continue to Next Exercise</span>
                  <ArrowRight size={20} weight="bold" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Exercise Type Badge */}
      <div className="flex items-center gap-2 b-px-lg b-py-md b-border-b">
        <BookOpen size={16} style={{ color: 'var(--b-reading)' }} />
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--b-reading-dark)' }}
        >
          {getExerciseTypeName()}
        </span>
        {exercise.primarySkill && (
          <span className="text-xs b-text-muted ml-2">
            • {exercise.primarySkill.replace(/-/g, ' ')}
          </span>
        )}
        {exercise.lexileScore && (
          <span className="text-xs b-text-muted ml-auto">
            Lexile: {exercise.lexileScore}L
          </span>
        )}
      </div>

      {/* Questions */}
      <div className="flex-1 overflow-y-auto b-p-lg">
        <div
          className={`space-y-4 ${isSubmitting ? 'opacity-75 pointer-events-none' : ''}`}
        >
          {exercise.questions.map((question, idx) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              questionNumber={idx + 1}
              value={answers[question.id] || ''}
              onChange={(value) => handleAnswerChange(question.id, value)}
              disabled={isSubmitting}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="b-px-lg b-py-md b-border-t flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !allQuestionsAnswered}
          className="b-btn b-btn-primary w-full flex items-center justify-center gap-2"
          style={{
            backgroundColor: allQuestionsAnswered
              ? 'var(--b-reading)'
              : undefined,
            opacity: !allQuestionsAnswered ? 0.5 : 1,
          }}
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent" />
          )}
          {isSubmitting ? 'Analyzing...' : 'Submit Answers'}
        </button>
        {!allQuestionsAnswered && !isSubmitting && (
          <p className="text-xs text-center b-text-muted mt-2">
            Answer all questions to submit
          </p>
        )}
      </div>
    </div>
  )
}
