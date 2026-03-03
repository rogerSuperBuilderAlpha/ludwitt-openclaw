'use client'

/**
 * Logic Feedback Component
 * Displays AI grading feedback and next button
 */

import { Check, X, ArrowRight } from '@phosphor-icons/react'

interface AIFeedback {
  summary: string
  strengths: string[]
  improvements: string[]
  detailedExplanation: string
  correctAnswer?: string
  score: number
  grade: string
}

interface LogicFeedbackProps {
  feedback: 'correct' | 'incorrect'
  aiFeedback: AIFeedback | null
  onNext: () => void
}

export function LogicFeedback({
  feedback,
  aiFeedback,
  onNext,
}: LogicFeedbackProps) {
  const isCorrect = feedback === 'correct'

  return (
    <>
      {/* Result Banner */}
      <div
        className={`b-p-lg b-rounded-xl b-mb-md b-border ${
          isCorrect
            ? 'b-bg-reading-light b-border-reading'
            : 'b-bg-latin-light b-border-latin'
        }`}
        style={{
          backgroundColor: isCorrect
            ? 'var(--b-reading-light)'
            : 'var(--b-latin-light)',
          borderColor: isCorrect ? 'var(--b-reading)' : 'var(--b-latin)',
        }}
      >
        <div className="flex items-center gap-3 b-mb-sm">
          {isCorrect ? (
            <Check size={22} weight="bold" className="b-text-reading-dark" />
          ) : (
            <X size={22} weight="bold" className="b-text-latin-dark" />
          )}
          <span
            className={`b-font-bold b-text-base ${isCorrect ? 'b-text-reading-dark' : 'b-text-latin-dark'}`}
          >
            {aiFeedback
              ? `${aiFeedback.grade} (${aiFeedback.score}%)`
              : isCorrect
                ? 'Correct!'
                : 'Incorrect'}
          </span>
        </div>
        {aiFeedback?.summary && (
          <p className="m-0 b-text-secondary b-text-sm">{aiFeedback.summary}</p>
        )}
      </div>

      {/* Detailed Feedback */}
      {aiFeedback && (
        <div className="flex-1 overflow-y-auto">
          {/* Strengths */}
          {aiFeedback.strengths.length > 0 && (
            <div className="b-mb-md">
              <p className="b-text-xs b-font-semibold b-text-reading-dark b-mb-xs">
                ✓ Strengths:
              </p>
              <ul className="m-0 pl-4 b-text-xs b-text-secondary">
                {aiFeedback.strengths.map((s, i) => (
                  <li key={i} className="b-mb-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {aiFeedback.improvements.length > 0 && (
            <div className="b-mb-md">
              <p className="b-text-xs b-font-semibold b-text-latin-dark b-mb-xs">
                → To Improve:
              </p>
              <ul className="m-0 pl-4 b-text-xs b-text-secondary">
                {aiFeedback.improvements.map((s, i) => (
                  <li key={i} className="b-mb-xs">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Explanation */}
          {aiFeedback.detailedExplanation && (
            <div className="b-p-md b-bg-muted b-rounded-lg b-mb-md">
              <p className="b-text-xs b-text-secondary m-0 leading-relaxed">
                {aiFeedback.detailedExplanation}
              </p>
            </div>
          )}

          {/* Correct Answer */}
          {aiFeedback.correctAnswer && !isCorrect && (
            <p className="b-text-xs b-text-muted">
              Correct answer:{' '}
              <strong className="b-text-reading-dark font-mono">
                {aiFeedback.correctAnswer}
              </strong>
            </p>
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={onNext}
        className="b-btn b-btn-lg b-btn-logic w-full mt-auto cursor-pointer"
      >
        Next Problem
        <ArrowRight size={18} weight="bold" />
      </button>
    </>
  )
}
