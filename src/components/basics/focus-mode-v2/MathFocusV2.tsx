'use client'

/**
 * MathFocusV2 Component
 *
 * Full-screen immersive math focus mode layout.
 * - Problem + visualization on left side
 * - Answer input on right side (stacked on mobile)
 * - Progressive hints system
 * - 3x XP multiplier display
 */

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, XCircle, Lightbulb, Eye } from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { MathProblemV2, Hint } from '@/lib/types/math-v2'
import { SubjectProgressDisplay } from '@/lib/types/basics'

// Math V2 Components
import { MathInputV2, AIFeedback } from '@/components/basics/math-v2/MathInput'
import { DiagramRenderer } from '@/components/basics/math-v2/Visualization'
import { GraphRenderer } from '@/components/basics/math-v2/Visualization'
import { logger } from '@/lib/logger'
import { MathLatex, MixedLatexText } from '@/components/basics/MathLatex'

interface MathFocusV2Props {
  /** The math problem to display */
  problem: MathProblemV2
  /** User's current progress */
  progress: SubjectProgressDisplay
  /** Called when problem is completed (correct or skipped) */
  onComplete: (
    nextProblem: MathProblemV2,
    updatedProgress: SubjectProgressDisplay,
    xpEarned?: number,
    userAnswer?: string
  ) => void
  /** Called when XP is earned */
  onXPEarned: (amount: number) => void
  /** Called when a problem is completed */
  onProblemCompleted: () => void
  /** Called when streak updates */
  onStreakUpdate?: (streak: number) => void
  /** Current streak count */
  currentStreak?: number
  /** XP multiplier (default 3 for focus mode) */
  xpMultiplier?: number
}

// Store next problem for continue flow
interface PendingContinue {
  nextProblem: MathProblemV2
  updatedProgress: SubjectProgressDisplay
  xpEarned: number
  userAnswer: string
}

/**
 * Extract just the instruction portion of a question text when LaTeX handles the math.
 * E.g., "Solve the system by substitution: y = 2x − 1 3x + y = 14" → "Solve the system by substitution:"
 *
 * This prevents showing duplicate content when LaTeX is displayed separately.
 */
function extractInstructionText(text: string): string {
  // If text contains newlines with equations (= signs), take only the first part
  const lines = text.split('\n')
  if (lines.length > 1) {
    // Check if subsequent lines look like equations (contain = or similar math patterns)
    const hasEquationLines = lines
      .slice(1)
      .some((line) => /[=<>≤≥]/.test(line) && /[a-zA-Z]/.test(line))
    if (hasEquationLines) {
      // Return only the instruction line (first line)
      return lines[0].trim()
    }
  }

  // Check for inline equations after a colon
  // Pattern: instruction text followed by equations in same line
  const colonMatch = text.match(/^(.+?:)\s*[\w\d].*[=<>≤≥]/)
  if (colonMatch) {
    return colonMatch[1].trim()
  }

  // No pattern matched, return original text
  return text
}

export function MathFocusV2({
  problem,
  progress,
  onComplete,
  onXPEarned,
  onProblemCompleted,
  onStreakUpdate,
  currentStreak = 0,
  xpMultiplier = 3,
}: MathFocusV2Props) {
  const { user } = useAuth()

  // Input state
  const [answer, setAnswer] = useState('')
  const [workShown, setWorkShown] = useState('')

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [pendingContinue, setPendingContinue] =
    useState<PendingContinue | null>(null)

  // Hints state
  const [hintsRevealed, setHintsRevealed] = useState<number>(0)

  // Reset state when problem changes
  useEffect(() => {
    setAnswer('')
    setWorkShown('')
    setFeedback(null)
    setPendingContinue(null)
    setHintsRevealed(0)
  }, [problem.id])

  // Get available hints
  const hints: Hint[] = problem.hints || []
  const canRevealMoreHints = hintsRevealed < hints.length

  // Reveal next hint
  const handleRevealHint = useCallback(() => {
    if (canRevealMoreHints) {
      setHintsRevealed((prev) => prev + 1)
    }
  }, [canRevealMoreHints])

  // Handle answer submission
  const handleSubmit = useCallback(async () => {
    if (!answer.trim() || isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      const token = await user.getIdToken()

      // Use AI grading for accurate evaluation
      const aiResponse = await fetch('/api/basics/ai-grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: 'math',
          question: {
            text: problem.question.text,
            latex: problem.question.latex,
            type: problem.type,
            difficulty: problem.difficulty,
            correctAnswer: problem.answer.correct,
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
      const multipliedXp = baseXpEarned * xpMultiplier

      // Update streak
      if (isCorrect) {
        if (onStreakUpdate) {
          onStreakUpdate(currentStreak + 1)
        }
      } else {
        if (onStreakUpdate) {
          onStreakUpdate(0)
        }
      }

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
          (isCorrect ? 'Great job!' : 'Not quite right, but keep trying!'),
        workBonus: workBonus
          ? {
              bonus: workBonus.bonus,
              feedback: workBonus.feedback,
              improvements: workBonus.improvements || [],
              whatWentWell: workBonus.whatWentWell || null,
            }
          : undefined,
        whatWentWell:
          workBonus?.whatWentWell || aiFeedback.strengths?.[0] || null,
        improvements: workBonus?.improvements?.length
          ? workBonus.improvements
          : aiFeedback.improvements || [],
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
      logger.error('MathFocusV2', 'Submit error', { error })

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
    xpMultiplier,
    currentStreak,
    onStreakUpdate,
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

      // Reset streak on skip
      if (onStreakUpdate) {
        onStreakUpdate(0)
      }

      // Set feedback with new format
      setFeedback({
        isCorrect: false,
        xpEarned: 0,
        summary: 'Problem skipped',
        alternativeApproach: `The correct answer was: ${problem.answer.correct}`,
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
      logger.error('MathFocusV2', 'Skip error', { error })
      setFeedback({
        isCorrect: false,
        xpEarned: 0,
        summary: 'Error skipping problem. Please try again.',
        improvements: ['Check your internet connection'],
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isSubmitting,
    user,
    problem,
    progress,
    onProblemCompleted,
    onStreakUpdate,
  ])

  // Render visualization if present
  const renderVisualization = () => {
    if (!problem.visuals) return null

    if (problem.visuals.graph) {
      return (
        <div
          className="b-rounded-lg overflow-hidden b-border b-border-math"
          style={{ height: 280 }}
        >
          <GraphRenderer config={problem.visuals.graph} height={280} />
        </div>
      )
    }

    if (problem.visuals.diagram) {
      return (
        <div className="b-rounded-lg overflow-hidden b-border b-border-light b-p-md b-bg-elevated">
          <DiagramRenderer diagram={problem.visuals.diagram} />
        </div>
      )
    }

    if (problem.visuals.image) {
      return (
        <div className="b-rounded-lg overflow-hidden b-border b-border-light">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={problem.visuals.image.url}
            alt={problem.visuals.image.alt}
            className="w-full h-auto max-h-64 object-contain"
          />
        </div>
      )
    }

    return null
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-0 relative overflow-hidden">
      {/* Left Column - Problem Display */}
      <div className="flex-1 flex flex-col overflow-hidden b-border-r lg:max-w-[55%]">
        <div className="b-focus-mode-col-header flex items-center justify-between">
          <span>Problem</span>
          <span className="b-badge b-badge-math">
            {problem.type} • Level {problem.difficulty}
          </span>
        </div>

        <div className="b-focus-mode-col-body flex-1 overflow-y-auto">
          {/* Question Display */}
          <div className="b-mb-xl">
            <div className="b-text-xl b-leading-relaxed b-text-primary">
              {problem.question.latex &&
              !problem.question.text.includes('$') ? (
                // When we have separate LaTeX, show only the instruction part of text
                // (text before any equation content like newlines with = signs)
                <p>{extractInstructionText(problem.question.text)}</p>
              ) : problem.question.latex ? (
                <MixedLatexText text={problem.question.text} />
              ) : (
                <p>{problem.question.text}</p>
              )}
            </div>

            {/* LaTeX Display (if separate from text) */}
            {problem.question.latex && !problem.question.text.includes('$') && (
              <div className="b-mt-lg b-p-lg b-bg-math-light b-rounded-lg">
                <MathLatex latex={problem.question.latex} displayMode />
              </div>
            )}
          </div>

          {/* Visualization */}
          {problem.visuals && (
            <div className="b-mb-xl">{renderVisualization()}</div>
          )}

          {/* Hints Section */}
          <div className="flex flex-col gap-3">
            {/* Revealed Hints */}
            {hints.slice(0, hintsRevealed).map((hint, index) => (
              <div
                key={index}
                className="b-card b-p-md b-animate-slide-up"
                style={{
                  background: 'var(--b-logic-light)',
                  borderColor: 'var(--b-logic-border)',
                }}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb
                    size={18}
                    weight="fill"
                    className="b-text-logic mt-0.5"
                  />
                  <div>
                    <span className="b-text-xs b-font-semibold b-text-logic-dark uppercase">
                      Hint {index + 1}
                    </span>
                    <p className="b-text-sm b-text-secondary b-mt-xs">
                      {hint.latex ? (
                        <MixedLatexText text={hint.text} />
                      ) : (
                        hint.text
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reveal Hint Button */}
            {canRevealMoreHints && (
              <button
                onClick={handleRevealHint}
                className="b-btn b-btn-sm b-btn-logic-soft self-start"
                disabled={isSubmitting}
              >
                <Eye size={16} weight="bold" />
                Show Hint {hintsRevealed + 1} of {hints.length}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Answer Input */}
      <div className="flex-1 flex flex-col overflow-hidden b-bg-elevated lg:max-w-[45%]">
        <div className="b-focus-mode-col-header">Your Answer</div>

        <div className="b-focus-mode-col-body flex-1 overflow-y-auto">
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
            feedback={feedback}
            onContinue={handleContinue}
          />

          {/* Quick Actions Hint - only show when not displaying feedback */}
          {!feedback && (
            <div className="b-mt-xl b-pt-lg b-border-t flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 b-text-sm b-text-muted">
                <span>Press</span>
                <kbd className="b-px-sm b-py-xs b-bg-muted b-rounded-sm b-font-mono b-text-xs">
                  Enter
                </kbd>
                <span>to submit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
