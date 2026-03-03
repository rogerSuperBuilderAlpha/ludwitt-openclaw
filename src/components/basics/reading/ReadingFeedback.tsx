'use client'

/**
 * Reading Feedback Component
 * Displays AI grading feedback, strengths, improvements, and navigation
 */

import {
  CheckCircle,
  XCircle,
  Sparkle,
  BookOpen,
  ArrowsClockwise,
} from '@phosphor-icons/react'
import { ReadingExercise } from '@/lib/types/basics'

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

interface ReadingFeedbackProps {
  feedback: Feedback
  aiFeedback: AIFeedback | null
  isAiGrading: boolean
  bonusPoints: number
  lastExercise: ReadingExercise | null
  showLastExercise: boolean
  hasNextExercise: boolean
  onContinue: () => void
  onReviewLast: () => void
  onTrySimilar: () => void
}

export function ReadingFeedback({
  feedback,
  aiFeedback,
  isAiGrading,
  bonusPoints,
  lastExercise,
  showLastExercise,
  hasNextExercise,
  onContinue,
  onReviewLast,
  onTrySimilar,
}: ReadingFeedbackProps) {
  return (
    <div
      className={`rounded-lg p-4 transition-all duration-300 animate-[slideIn_0.3s_ease-out] ${
        feedback.correct
          ? 'b-bg-reading-light border b-border-reading'
          : 'b-bg-latin-light border b-border-latin'
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Result Header */}
      <div className="flex items-center gap-3 mb-2">
        {feedback.correct ? (
          <CheckCircle
            size={28}
            weight="fill"
            className="text-b-reading animate-[scaleIn_0.4s_ease-out]"
          />
        ) : (
          <XCircle
            size={28}
            weight="fill"
            className="text-b-latin animate-[shake_0.4s_ease-out]"
          />
        )}
        <span
          className={`font-bold ${feedback.correct ? 'b-text-reading' : 'b-text-latin'}`}
        >
          {feedback.message}
        </span>
      </div>

      {/* XP Earned */}
      {feedback.xpEarned > 0 && (
        <p
          className={`text-sm mb-3 flex items-center gap-2 ${feedback.correct ? 'b-text-reading' : 'b-text-latin'}`}
        >
          <Sparkle size={16} weight="fill" className="text-b-writing" />
          You earned {feedback.xpEarned} XP!
          {bonusPoints > 0 && (
            <span className="ml-2 b-text-logic font-semibold flex items-center gap-1">
              + {bonusPoints} bonus points
              <Sparkle
                size={16}
                weight="fill"
                className="text-b-logic animate-pulse"
              />
            </span>
          )}
        </p>
      )}

      {/* AI Detailed Feedback */}
      {aiFeedback && (
        <div className="b-bg-card border b-border rounded-lg p-4 mb-3 space-y-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkle size={18} weight="fill" className="text-b-logic" />
              <span className="text-sm font-medium b-text-primary">
                AI Tutor Feedback
              </span>
            </div>
            <span
              className={`px-3 py-1 text-sm font-bold rounded-full ${
                aiFeedback.grade === 'A'
                  ? 'b-bg-reading-light b-text-reading'
                  : aiFeedback.grade === 'B'
                    ? 'b-bg-math-light b-text-math'
                    : aiFeedback.grade === 'C'
                      ? 'b-bg-writing-light b-text-writing'
                      : aiFeedback.grade === 'D'
                        ? 'b-bg-latin-light b-text-latin'
                        : 'b-bg-latin-light b-text-latin'
              }`}
            >
              {aiFeedback.grade} ({aiFeedback.score}%)
            </span>
          </div>

          {/* Strengths */}
          {aiFeedback.strengths.length > 0 && (
            <div>
              <p className="text-sm font-medium b-text-reading mb-1">
                ✓ What you did well:
              </p>
              <ul className="text-sm b-text-secondary list-disc list-inside space-y-1">
                {aiFeedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {aiFeedback.improvements.length > 0 && (
            <div>
              <p className="text-sm font-medium b-text-writing mb-1">
                → To improve:
              </p>
              <ul className="text-sm b-text-secondary list-disc list-inside space-y-1">
                {aiFeedback.improvements.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Explanation */}
          {aiFeedback.detailedExplanation && (
            <div className="b-bg-muted rounded-lg p-3 mt-2">
              <p className="text-sm b-text-secondary">
                {aiFeedback.detailedExplanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* AI Grading Loading */}
      {isAiGrading && (
        <div className="b-bg-logic-light border b-border-logic rounded-lg p-4 mb-3 flex items-center gap-3 mt-3">
          <div className="animate-spin">
            <Sparkle size={20} weight="fill" className="text-b-logic" />
          </div>
          <span className="b-text-logic font-medium">
            AI is analyzing your answers...
          </span>
        </div>
      )}

      {feedback.explanation && !aiFeedback && (
        <pre className="b-text-secondary text-sm whitespace-pre-wrap font-sans mt-2">
          {feedback.explanation}
        </pre>
      )}

      {/* Continue Button */}
      {hasNextExercise && (
        <div className="mt-4 pt-4 border-t b-border animate-[fadeIn_0.3s_ease-out]">
          <button
            onClick={onContinue}
            className="w-full b-btn b-btn-lg b-btn-reading flex items-center justify-center gap-2"
          >
            <span>Continue to Next Exercise</span>
            <ArrowsClockwise
              size={18}
              weight="bold"
              className="transition-transform group-hover:rotate-180"
            />
          </button>
        </div>
      )}

      {/* Review Actions for Incorrect */}
      {!feedback.correct && (
        <div className="flex gap-2 mt-4 pt-4 border-t b-border animate-[slideIn_0.3s_ease-out]">
          {lastExercise && (
            <button
              onClick={onReviewLast}
              className="flex items-center gap-2 px-3 py-2 text-sm b-bg-math-light b-text-math rounded-lg hover:b-bg-math-light focus:ring-2 focus:ring-b-math focus:ring-offset-2 focus:outline-none transition-all active:scale-95 group"
            >
              <BookOpen
                size={16}
                weight="bold"
                className="transition-transform group-hover:scale-110"
              />
              {showLastExercise ? 'Hide Last' : 'Review Last'}
            </button>
          )}
          <button
            onClick={onTrySimilar}
            className="flex items-center gap-2 px-3 py-2 text-sm b-bg-reading-light b-text-reading rounded-lg hover:b-bg-reading-light focus:ring-2 focus:ring-b-reading focus:ring-offset-2 focus:outline-none transition-all active:scale-95 group"
          >
            <ArrowsClockwise
              size={16}
              weight="bold"
              className="transition-transform group-hover:rotate-180"
            />
            Try Similar
          </button>
        </div>
      )}
    </div>
  )
}
