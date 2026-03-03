'use client'

import { useState, useEffect, useCallback } from 'react'
import { MathProblem, SubjectProgressDisplay } from '@/lib/types/basics'
import { useAuth } from '@/components/auth/ClientProvider'
import { MathInputV2, AIFeedback } from '../math-v2/MathInput'
import { logger } from '@/lib/logger'

interface MathFocusProps {
  problem: MathProblem
  progress: SubjectProgressDisplay
  onComplete: (
    nextProblem: MathProblem,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  onXPEarned: (amount: number) => void
  onProblemCompleted: () => void
}

// Store next problem for continue flow
interface PendingContinue {
  nextProblem: MathProblem
  updatedProgress: SubjectProgressDisplay
  xpEarned: number
  userAnswer: string
}

export function MathFocus({
  problem,
  progress,
  onComplete,
  onXPEarned,
  onProblemCompleted,
}: MathFocusProps) {
  const { user } = useAuth()
  const [answer, setAnswer] = useState('')
  const [workShown, setWorkShown] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [pendingContinue, setPendingContinue] =
    useState<PendingContinue | null>(null)

  // Reset state when problem changes
  useEffect(() => {
    setAnswer('')
    setWorkShown('')
    setFeedback(null)
    setPendingContinue(null)
  }, [problem.id])

  const handleSubmit = useCallback(async () => {
    if (!answer.trim() || isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      const token = await user.getIdToken()

      // First, use AI grading for accurate evaluation
      const aiResponse = await fetch('/api/basics/ai-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: 'math',
          question: {
            text: problem.question,
            type: problem.type,
            difficulty: problem.difficulty,
            correctAnswer: problem.correctAnswer,
          },
          userAnswer: answer.trim(),
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
      const baseXpEarned = gradeData.xpEarned || 0
      const multipliedXp = baseXpEarned * 3 // 3x for focus mode

      // Update progress with check-answer (includes work evaluation)
      const checkResponse = await fetch('/api/basics/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          subject: 'math',
          problemId: problem.id,
          userAnswer: answer.trim(),
          workShown: workShown.trim() || undefined,
          timeSpent: 30,
        }),
      })

      const checkResultRaw = await checkResponse.json()
      const checkResult = checkResultRaw.data || checkResultRaw

      // Build comprehensive AI feedback
      const aiFeedback = gradeData.feedback || {}
      const workBonus = checkResult.workBonus || null

      const enhancedFeedback: AIFeedback = {
        isCorrect,
        xpEarned: multipliedXp + (workBonus?.bonus || 0),
        summary:
          aiFeedback.summary ||
          (isCorrect
            ? 'Correct! Great job!'
            : 'Not quite right, but keep trying!'),
        workBonus: workBonus
          ? {
              bonus: workBonus.bonus,
              feedback: workBonus.feedback,
            }
          : undefined,
        whatWentWell: aiFeedback.strengths?.[0] || null,
        improvements: aiFeedback.improvements || [],
        nextTimeAdvice: aiFeedback.detailedExplanation
          ? aiFeedback.detailedExplanation.split('.').slice(0, 2).join('.') +
            '.'
          : null,
        alternativeApproach: aiFeedback.correctAnswer || null,
        scores: checkResult.workBonus?.scores || undefined,
      }

      setFeedback(enhancedFeedback)

      // Store next problem for continue button
      if (checkResult.nextProblem) {
        const updatedProgress = checkResult.progressUpdate
          ? { ...progress, ...checkResult.progressUpdate }
          : progress
        setPendingContinue({
          nextProblem: checkResult.nextProblem,
          updatedProgress,
          xpEarned: baseXpEarned,
          userAnswer: answer,
        })
      }

      if (baseXpEarned > 0) {
        onXPEarned(baseXpEarned)
      }
      onProblemCompleted()
    } catch (error: unknown) {
      logger.error('MathFocus', 'Submit error', { error })

      // Extract specific error message from the error
      let errorMessage = 'Error grading your answer. Please try again.'
      let improvements: string[] = [
        'Check your internet connection and try again',
      ]

      const errorText = error instanceof Error ? error.message : String(error)

      if (
        errorText.includes('Insufficient credits') ||
        errorText.includes('INSUFFICIENT_CREDITS')
      ) {
        errorMessage = 'Insufficient credits to grade this answer.'
        improvements = [
          'Add credits to your account to continue using AI grading',
          'Go to Account → Credits to add funds',
        ]
      } else if (
        errorText.includes('Rate limit') ||
        errorText.includes('rate limit') ||
        errorText.includes('429')
      ) {
        errorMessage = 'Too many requests. Please wait a moment.'
        improvements = [
          'Wait 30 seconds before trying again',
          'AI grading is limited to 20 requests per minute',
        ]
      } else if (
        errorText.includes('Unauthorized') ||
        errorText.includes('401')
      ) {
        errorMessage = 'Session expired. Please refresh the page.'
        improvements = ['Refresh the page to sign in again']
      } else if (
        errorText.includes('Service unavailable') ||
        errorText.includes('503')
      ) {
        errorMessage = 'AI service is temporarily unavailable.'
        improvements = [
          'The AI service is down - please try again in a few minutes',
        ]
      } else if (
        errorText.includes('Failed to grade') ||
        errorText.includes('500')
      ) {
        errorMessage = 'AI grading failed. Please try again.'
        improvements = [
          'There was a problem with the AI grading service',
          'Try submitting your answer again',
        ]
      }

      setFeedback({
        isCorrect: false,
        xpEarned: 0,
        summary: errorMessage,
        improvements,
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [
    answer,
    workShown,
    isSubmitting,
    user,
    problem,
    progress,
    onXPEarned,
    onProblemCompleted,
  ])

  // Handle continue to next problem
  const handleContinue = useCallback(() => {
    if (pendingContinue) {
      setFeedback(null)
      onComplete(
        pendingContinue.nextProblem,
        pendingContinue.updatedProgress,
        pendingContinue.xpEarned,
        pendingContinue.userAnswer
      )
      setPendingContinue(null)
    }
  }, [pendingContinue, onComplete])

  // Handle skip
  const handleSkip = useCallback(async () => {
    if (isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      const token = await user.getIdToken()

      const response = await fetch('/api/basics/skip-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.uid,
          subject: 'math',
          problemId: problem.id,
        }),
      })

      const result = await response.json()
      const data = result.data || result

      // Set feedback with skip info
      setFeedback({
        isCorrect: false,
        xpEarned: 0,
        summary: 'Problem skipped',
        alternativeApproach: `The correct answer was: ${problem.correctAnswer}`,
        nextTimeAdvice:
          'Try working through similar problems to build your skills!',
      })

      // Store next problem for continue
      if (data.nextProblem) {
        setPendingContinue({
          nextProblem: data.nextProblem,
          updatedProgress: progress,
          xpEarned: 0,
          userAnswer: '',
        })
      }

      onProblemCompleted()
    } catch (error) {
      logger.error('MathFocus', 'Skip error', { error })
      setFeedback({
        isCorrect: false,
        xpEarned: 0,
        summary: 'Error skipping problem. Please try again.',
        improvements: ['Check your internet connection'],
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, user, problem, progress, onProblemCompleted])

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col b-p-xl overflow-y-auto">
        <MathInputV2
          answer={answer}
          onAnswerChange={setAnswer}
          workShown={workShown}
          onWorkChange={setWorkShown}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          skipXpCost={5}
          placeholder="Enter your answer..."
          workBonusText="Up to 2x XP (3× in Focus Mode!)"
          feedback={feedback}
          onContinue={handleContinue}
        />
      </div>
    </div>
  )
}
