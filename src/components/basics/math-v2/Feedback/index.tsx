'use client'

/**
 * FeedbackDisplayV2 Component
 *
 * Comprehensive feedback display for Math V2 system combining:
 * - ResultBanner: Success/error with XP display
 * - StepByStepSolution: Expandable solution steps
 * - MistakeAnalysis: For incorrect answers
 *
 * Also provides:
 * - Continue to Next button
 * - Try Similar and Review Last actions
 *
 * For incorrect answers, requires a brief review period before
 * the Continue button becomes available.
 */

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowsClockwise,
  BookOpen,
  Lightbulb,
  Timer,
} from '@phosphor-icons/react'
import { ResultBanner } from './ResultBanner'
import { StepByStepSolution } from './StepByStepSolution'
import { MistakeAnalysis } from './MistakeAnalysis'
import { ReviewScheduleMessage } from '@/components/basics/spaced-repetition'
import { SolutionStep } from '@/lib/types/math-v2'
import { ReviewScheduleMessage as ReviewScheduleMessageType } from '@/lib/types/spaced-repetition'

/** Review period in seconds for incorrect answers before Continue is available */
const REVIEW_PERIOD_SECONDS = 5

// Re-export sub-components for individual use
export { ResultBanner } from './ResultBanner'
export { StepByStepSolution } from './StepByStepSolution'
export { MistakeAnalysis } from './MistakeAnalysis'

interface WorkBonus {
  bonus: number
  feedback?: string
}

interface FeedbackDisplayV2Props {
  /** Whether the answer was correct */
  isCorrect: boolean
  /** Feedback message */
  message: string
  /** XP earned */
  xpEarned: number
  /** Work bonus details */
  workBonus?: WorkBonus | null
  /** User's submitted answer */
  userAnswer?: string
  /** The correct answer */
  correctAnswer: string
  /** Correct answer in LaTeX format */
  correctAnswerLatex?: string
  /** Solution steps */
  solutionSteps?: SolutionStep[]
  /** Solution method name */
  solutionMethod?: string
  /** Alternative solution methods */
  alternativeMethods?: string[]
  /** Common mistake that was detected */
  commonMistake?: string
  /** Remediation suggestions */
  remediationSuggestions?: string[]
  /** Explanation of the mistake */
  mistakeExplanation?: string
  /** Concepts the student should review */
  conceptsToReview?: string[]
  /** Number of incorrect attempts */
  incorrectAttempts?: number
  /** Whether there's a next problem ready */
  hasNextProblem: boolean
  /** Callback for continue button */
  onContinue: () => void
  /** Callback for try similar button */
  onTrySimilar: () => void
  /** Callback for review last button */
  onReviewLast?: () => void
  /** Callback for explain another way button */
  onExplainAnother?: () => void
  /** Whether alternate explanation is loading */
  loadingAlternate?: boolean
  /** Alternate explanation text */
  alternateExplanation?: string | null
  /** Review schedule message for spaced repetition visibility */
  reviewScheduleMessage?: ReviewScheduleMessageType | null
  /** Callback when user wants to view full schedule */
  onViewSchedule?: () => void
  /** Optional custom class name */
  className?: string
}

export function FeedbackDisplayV2({
  isCorrect,
  message,
  xpEarned,
  workBonus,
  userAnswer,
  correctAnswer,
  correctAnswerLatex,
  solutionSteps,
  solutionMethod,
  alternativeMethods,
  commonMistake,
  remediationSuggestions,
  mistakeExplanation,
  conceptsToReview,
  incorrectAttempts = 0,
  hasNextProblem,
  onContinue,
  onTrySimilar,
  onReviewLast,
  onExplainAnother,
  loadingAlternate = false,
  alternateExplanation,
  reviewScheduleMessage,
  onViewSchedule,
  className = '',
}: FeedbackDisplayV2Props) {
  const [showScheduleMessage, setShowScheduleMessage] = useState(true)
  // For incorrect answers, require a brief review period before Continue becomes available
  const [reviewSecondsLeft, setReviewSecondsLeft] = useState(
    isCorrect ? 0 : REVIEW_PERIOD_SECONDS
  )
  const hasCompletedReview = isCorrect || reviewSecondsLeft === 0

  // Countdown timer for review period
  useEffect(() => {
    if (isCorrect || reviewSecondsLeft === 0) return

    const timer = setInterval(() => {
      setReviewSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isCorrect, reviewSecondsLeft])

  // Reset review timer when feedback changes
  useEffect(() => {
    setReviewSecondsLeft(isCorrect ? 0 : REVIEW_PERIOD_SECONDS)
  }, [isCorrect, userAnswer])

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Result Banner - Always shown */}
      <ResultBanner
        isCorrect={isCorrect}
        message={message}
        xpEarned={xpEarned}
        workBonus={workBonus}
      />

      {/* Mistake Analysis - Only for incorrect answers */}
      {!isCorrect && userAnswer && (
        <MistakeAnalysis
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
          correctAnswerLatex={correctAnswerLatex}
          commonMistake={commonMistake}
          remediationSuggestions={remediationSuggestions}
          explanation={mistakeExplanation}
          conceptsToReview={conceptsToReview}
        />
      )}

      {/* Step-by-Step Solution */}
      {solutionSteps && solutionSteps.length > 0 && (
        <StepByStepSolution
          steps={solutionSteps}
          method={solutionMethod}
          alternativeMethods={alternativeMethods}
          initiallyExpanded={!isCorrect}
        />
      )}

      {/* Alternate Explanation */}
      {alternateExplanation && (
        <div className="b-card b-p-lg b-animate-slide-up">
          <div className="flex items-center gap-2 b-mb-md">
            <Lightbulb
              size={20}
              weight="fill"
              className="b-text-logic b-animate-pulse"
            />
            <h3 className="b-font-semibold b-text-logic-dark">
              Another Way to Think About It
            </h3>
          </div>
          <p className="b-text-sm b-text-secondary leading-relaxed">
            {alternateExplanation}
          </p>
        </div>
      )}

      {/* Spaced Repetition Schedule Message - Makes learning visible */}
      {isCorrect && showScheduleMessage && reviewScheduleMessage && (
        <ReviewScheduleMessage
          message={reviewScheduleMessage}
          onDismiss={() => setShowScheduleMessage(false)}
          onViewSchedule={onViewSchedule}
          variant="card"
        />
      )}

      {/* Action Buttons */}
      <div
        className="b-card b-p-lg b-animate-fade-in"
        style={{
          background: 'var(--b-bg-elevated)',
          boxShadow: 'var(--b-shadow-md)',
        }}
      >
        {/* Review Notice - Only for incorrect answers during review period */}
        {!isCorrect && !hasCompletedReview && (
          <div className="flex items-center gap-3 b-mb-md p-3 rounded-lg b-bg-math-light border b-border-math">
            <Timer
              size={20}
              weight="fill"
              className="b-text-math flex-shrink-0"
            />
            <p className="b-text-sm b-text-math-dark">
              Review the solution above. Continue available in{' '}
              <strong>{reviewSecondsLeft}s</strong>
            </p>
          </div>
        )}

        {/* Primary Action - Continue */}
        {hasNextProblem && hasCompletedReview && (
          <button
            onClick={onContinue}
            className="b-btn b-btn-lg b-btn-primary b-btn-full group b-mb-md"
          >
            <span>Continue to Next Problem</span>
            <ArrowRight
              size={20}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        )}

        {/* Loading state when waiting for next problem */}
        {!hasNextProblem && !isCorrect && hasCompletedReview && (
          <div className="flex items-center justify-center gap-2 b-mb-md p-3 rounded-lg b-bg-muted">
            <div className="w-4 h-4 border-2 b-border-math border-t-transparent rounded-full b-animate-spin" />
            <span className="b-text-sm b-text-secondary">
              Loading next problem...
            </span>
          </div>
        )}

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-2">
          {/* Try Similar - For incorrect answers */}
          {!isCorrect && (
            <button
              onClick={onTrySimilar}
              className="b-btn b-btn-sm b-btn-reading-soft group flex-1 sm:flex-none"
            >
              <ArrowsClockwise
                size={16}
                weight="bold"
                className="transition-transform group-hover:rotate-180"
              />
              Try Similar
            </button>
          )}

          {/* Review Last - If callback provided */}
          {onReviewLast && (
            <button
              onClick={onReviewLast}
              className="b-btn b-btn-sm b-btn-math-soft group flex-1 sm:flex-none"
            >
              <BookOpen
                size={16}
                weight="bold"
                className="transition-transform group-hover:scale-110"
              />
              Review Last
            </button>
          )}

          {/* Explain Another Way - After multiple incorrect attempts */}
          {!isCorrect && onExplainAnother && incorrectAttempts >= 2 && (
            <button
              onClick={onExplainAnother}
              disabled={loadingAlternate}
              className="b-btn b-btn-sm b-btn-logic-soft group flex-1 sm:flex-none"
            >
              <Lightbulb
                size={16}
                weight="fill"
                className={`transition-transform group-hover:scale-110 ${loadingAlternate ? 'b-animate-pulse' : ''}`}
              />
              {loadingAlternate ? 'Loading...' : 'Explain Another Way'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
