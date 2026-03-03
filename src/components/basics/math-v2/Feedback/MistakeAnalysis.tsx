'use client'

/**
 * MistakeAnalysis Component
 *
 * Shows analysis of user's mistake including:
 * - User answer vs correct answer comparison
 * - Highlighted differences
 * - Common mistake detection feedback
 * - Remediation suggestions
 */

import {
  XCircle,
  CheckCircle,
  Warning,
  Lightbulb,
  ArrowRight,
} from '@phosphor-icons/react'
import { MathLatex } from '@/components/basics/MathLatex'

interface MistakeAnalysisProps {
  /** The user's submitted answer */
  userAnswer: string
  /** The correct answer */
  correctAnswer: string
  /** The correct answer in LaTeX format (optional) */
  correctAnswerLatex?: string
  /** Common mistake that was detected (optional) */
  commonMistake?: string
  /** Remediation suggestions (optional) */
  remediationSuggestions?: string[]
  /** Explanation of what went wrong (optional) */
  explanation?: string
  /** Concepts the student should review (optional) */
  conceptsToReview?: string[]
  /** Optional custom class name */
  className?: string
}

/**
 * Attempts to detect and highlight differences between user and correct answer
 */
function AnswerComparison({
  userAnswer,
  correctAnswer,
}: {
  userAnswer: string
  correctAnswer: string
}) {
  // Simple difference detection - highlights if answers differ
  const answersMatch =
    userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()

  return (
    <div className="flex flex-col gap-3">
      {/* User's Answer */}
      <div
        className="b-rounded-lg b-p-md"
        style={{
          background: 'var(--b-danger-light)',
          border: '2px solid var(--b-danger-border)',
        }}
      >
        <div className="flex items-center gap-2 b-mb-xs">
          <XCircle size={16} weight="fill" className="b-text-danger" />
          <p className="b-text-xs b-font-medium b-text-muted uppercase tracking-wide">
            Your Answer
          </p>
        </div>
        <p
          className="b-text-lg b-font-bold b-text-danger-dark"
          style={{ fontFamily: 'var(--b-font-mono)' }}
        >
          {userAnswer || '(no answer)'}
        </p>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <ArrowRight size={20} className="b-text-muted transform rotate-90" />
      </div>

      {/* Correct Answer */}
      <div
        className="b-rounded-lg b-p-md"
        style={{
          background: 'var(--b-reading-light)',
          border: '2px solid var(--b-reading-border)',
        }}
      >
        <div className="flex items-center gap-2 b-mb-xs">
          <CheckCircle size={16} weight="fill" className="b-text-success" />
          <p className="b-text-xs b-font-medium b-text-muted uppercase tracking-wide">
            Correct Answer
          </p>
        </div>
        <p
          className="b-text-lg b-font-bold b-text-reading-dark"
          style={{ fontFamily: 'var(--b-font-mono)' }}
        >
          {correctAnswer}
        </p>
      </div>
    </div>
  )
}

export function MistakeAnalysis({
  userAnswer,
  correctAnswer,
  correctAnswerLatex,
  commonMistake,
  remediationSuggestions,
  explanation,
  conceptsToReview,
  className = '',
}: MistakeAnalysisProps) {
  return (
    <div className={`b-card ${className}`}>
      {/* Header */}
      <div
        className="b-p-lg b-border-b"
        style={{
          borderColor: 'var(--b-border-light)',
          background: 'var(--b-danger-light)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="b-icon-box b-icon-box-md b-rounded-full"
            style={{
              background: 'var(--b-danger)',
              color: 'white',
            }}
          >
            <Warning size={20} weight="fill" />
          </div>
          <div>
            <h3 className="b-font-semibold b-text-danger-dark">
              Review Your Answer
            </h3>
            <p className="b-text-sm b-text-muted">
              Understanding mistakes helps you learn
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="b-p-lg"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--b-space-xl)',
        }}
      >
        {/* Answer Comparison */}
        <AnswerComparison
          userAnswer={userAnswer}
          correctAnswer={correctAnswer}
        />

        {/* Correct Answer in LaTeX (if provided) */}
        {correctAnswerLatex && (
          <div
            className="b-rounded-lg b-p-md b-bg-muted text-center"
            style={{ borderLeft: '4px solid var(--b-reading)' }}
          >
            <p className="b-text-xs b-font-medium b-text-muted b-mb-sm uppercase tracking-wide">
              Formatted Answer
            </p>
            <MathLatex
              latex={correctAnswerLatex}
              displayMode
              className="text-xl"
            />
          </div>
        )}

        {/* Common Mistake Detection */}
        {commonMistake && (
          <div
            className="b-rounded-lg b-p-md"
            style={{
              background: 'var(--b-warning-light)',
              border: '1px solid var(--b-warning-border)',
            }}
          >
            <div className="flex items-start gap-3">
              <Warning
                size={18}
                weight="fill"
                className="b-text-warning flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="b-text-sm b-font-medium b-text-warning-dark b-mb-xs">
                  Common Mistake Detected
                </p>
                <p className="b-text-sm b-text-secondary">{commonMistake}</p>
              </div>
            </div>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <div
            className="b-rounded-lg b-p-md b-bg-muted"
            style={{ borderLeft: '4px solid var(--b-math)' }}
          >
            <p className="b-text-sm b-text-secondary leading-relaxed">
              {explanation}
            </p>
          </div>
        )}

        {/* Remediation Suggestions */}
        {remediationSuggestions && remediationSuggestions.length > 0 && (
          <div
            className="b-rounded-lg b-p-md"
            style={{
              background: 'var(--b-logic-light)',
              border: '1px solid var(--b-logic-border)',
            }}
          >
            <div className="flex items-start gap-3">
              <Lightbulb
                size={18}
                weight="fill"
                className="b-text-logic flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="b-text-sm b-font-medium b-text-logic-dark b-mb-sm">
                  Tips to Improve
                </p>
                <ul
                  className="b-text-sm b-text-secondary"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--b-space-xs)',
                  }}
                >
                  {remediationSuggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="b-text-logic">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Concepts to Review */}
        {conceptsToReview && conceptsToReview.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="b-text-xs b-text-muted b-font-medium">
              Review:
            </span>
            {conceptsToReview.map((concept, idx) => (
              <span key={idx} className="b-badge b-badge-math">
                {concept}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
