/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

/**
 * Logic Answer Input Component
 * Answer field with reasoning and symbol insertion
 */

import { Sparkle, SpinnerGap } from '@phosphor-icons/react'
import { LogicProblem } from '@/data/basics/logic'

// Logic symbols for insertion
const LOGIC_SYMBOLS = [
  '∧',
  '∨',
  '→',
  '↔',
  '¬',
  '∀',
  '∃',
  '⊢',
  '⊨',
  '◇',
  '□',
  '⊥',
  '⊤',
]

interface LogicAnswerInputProps {
  problem: LogicProblem
  userAnswer: string
  userReasoning: string
  isGrading: boolean
  onAnswerChange: (value: string) => void
  onReasoningChange: (value: string) => void
  onSubmit: () => void
}

export function LogicAnswerInput({
  problem,
  userAnswer,
  userReasoning,
  isGrading,
  onAnswerChange,
  onReasoningChange,
  onSubmit,
}: LogicAnswerInputProps) {
  const insertSymbol = (sym: string) => {
    onReasoningChange(userReasoning + sym)
  }

  return (
    <>
      {/* Answer Field */}
      <div className="b-mb-md">
        <label className="b-text-sm b-font-semibold b-text-primary b-mb-sm block">
          Your Answer {problem.options?.length ? '(type the letter)' : ''}:
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder={
            problem.options?.length
              ? 'e.g., A, B, C, or D'
              : 'Enter your answer...'
          }
          className="b-input w-full b-text-base font-mono"
        />
      </div>

      {/* Reasoning Field */}
      <div className="b-mb-md flex-1 flex flex-col">
        <label className="b-text-sm b-font-semibold b-text-primary b-mb-sm block">
          Your Reasoning (for bonus XP):
        </label>
        <textarea
          value={userReasoning}
          onChange={(e) => onReasoningChange(e.target.value)}
          placeholder="Explain your reasoning step by step...&#10;&#10;Example:&#10;1. From premise P → Q...&#10;2. Given P is true...&#10;3. Therefore Q by Modus Ponens"
          className="b-input flex-1 min-h-[150px] resize-none b-text-sm font-mono leading-relaxed"
        />
      </div>

      {/* Symbol Buttons */}
      <div className="flex items-center gap-1 flex-wrap b-mb-md b-p-sm b-bg-muted b-rounded-lg">
        <span className="b-text-xs b-text-muted mr-1">Insert:</span>
        {LOGIC_SYMBOLS.map((sym) => (
          <button
            key={sym}
            type="button"
            onClick={() => insertSymbol(sym)}
            className="b-p-xs b-bg-card b-rounded b-border b-text-logic font-mono b-text-sm cursor-pointer hover:b-bg-muted transition-colors"
            style={{ backgroundColor: 'var(--b-bg-card)' }}
          >
            {sym}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={!userAnswer.trim() || isGrading}
        className={`b-btn b-btn-lg w-full ${
          !userAnswer.trim() || isGrading
            ? 'b-btn-secondary opacity-50 cursor-not-allowed'
            : 'b-btn-logic cursor-pointer'
        }`}
      >
        {isGrading ? (
          <>
            <SpinnerGap size={18} weight="bold" className="b-animate-spin" />
            AI Grading...
          </>
        ) : (
          <>
            <Sparkle size={18} weight="fill" />
            Submit for AI Grading
          </>
        )}
      </button>
    </>
  )
}
