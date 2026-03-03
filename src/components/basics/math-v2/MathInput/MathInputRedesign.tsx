/* eslint-disable jsx-a11y/no-autofocus */
'use client'

/**
 * MathInputV2 - Complete Redesign
 *
 * Simple, reliable math input with:
 * - Comprehensive symbol picker with tabbed categories
 * - Symbol picker on BOTH answer and work inputs
 * - No LaTeX visible to users
 * - Clean submit/skip buttons
 */

import { useState, useRef, useCallback } from 'react'
import { Check, SkipForward } from '@phosphor-icons/react'
import { InputWithSymbols } from './InputWithSymbols'
import { FeedbackDisplay } from './FeedbackDisplay'
import { WorkSectionCollapsible } from './WorkSectionCollapsible'

// Re-export AIFeedback for backwards compatibility
export type { AIFeedback } from './FeedbackDisplay'
// Import the type for use in this file
import type { AIFeedback } from './FeedbackDisplay'

// ============ MAIN COMPONENT ============

interface MathInputV2Props {
  answer: string
  onAnswerChange: (value: string) => void
  workShown?: string
  onWorkChange?: (value: string) => void
  isSubmitting?: boolean
  onSubmit: () => void
  onSkip?: () => void
  skipXpCost?: number
  placeholder?: string
  workBonusText?: string
  // AI Feedback display
  feedback?: AIFeedback | null
  onContinue?: () => void
  // Telemetry callbacks (for Technical Moat integration)
  onTelemetryKeyDown?: (
    keyType:
      | 'char'
      | 'backspace'
      | 'delete'
      | 'enter'
      | 'tab'
      | 'arrow'
      | 'other'
  ) => void
  onTelemetryFocus?: () => void
  onTelemetryBlur?: () => void
  onTelemetryAnswerChange?: (
    answerLength: number,
    changeFromPrevious: number
  ) => void
}

export function MathInputV2({
  answer,
  onAnswerChange,
  workShown = '',
  onWorkChange,
  isSubmitting = false,
  onSubmit,
  onSkip,
  skipXpCost = 5,
  placeholder = 'Type your answer...',
  workBonusText = 'Up to 2x XP',
  feedback = null,
  onContinue,
  onTelemetryKeyDown,
  onTelemetryFocus,
  onTelemetryBlur,
  onTelemetryAnswerChange,
}: MathInputV2Props) {
  const [showSkipConfirm, setShowSkipConfirm] = useState(false)
  const previousAnswerLengthRef = useRef(0)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Track telemetry
      if (onTelemetryKeyDown) {
        let keyType:
          | 'char'
          | 'backspace'
          | 'delete'
          | 'enter'
          | 'tab'
          | 'arrow'
          | 'other'
        switch (e.key) {
          case 'Backspace':
            keyType = 'backspace'
            break
          case 'Delete':
            keyType = 'delete'
            break
          case 'Enter':
            keyType = 'enter'
            break
          case 'Tab':
            keyType = 'tab'
            break
          case 'ArrowLeft':
          case 'ArrowRight':
          case 'ArrowUp':
          case 'ArrowDown':
            keyType = 'arrow'
            break
          default:
            keyType = e.key.length === 1 ? 'char' : 'other'
        }
        onTelemetryKeyDown(keyType)
      }

      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !isSubmitting &&
        answer.trim() &&
        !feedback
      ) {
        e.preventDefault()
        onSubmit()
      }
    },
    [isSubmitting, answer, onSubmit, feedback, onTelemetryKeyDown]
  )

  // Track answer changes for telemetry
  const handleAnswerChange = useCallback(
    (value: string) => {
      if (onTelemetryAnswerChange) {
        const changeAmount = Math.abs(
          value.length - previousAnswerLengthRef.current
        )
        onTelemetryAnswerChange(value.length, changeAmount)
      }
      previousAnswerLengthRef.current = value.length
      onAnswerChange(value)
    },
    [onAnswerChange, onTelemetryAnswerChange]
  )

  const canSubmit = !isSubmitting && answer.trim().length > 0 && !feedback

  // If we have feedback, show the feedback display
  if (feedback) {
    return (
      <div className="space-y-4">
        <FeedbackDisplay feedback={feedback} onContinue={onContinue} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Answer Input - No label, placeholder is enough */}
      <InputWithSymbols
        value={answer}
        onChange={handleAnswerChange}
        placeholder={placeholder}
        disabled={isSubmitting}
        onKeyDown={handleKeyDown}
        onFocus={onTelemetryFocus}
        onBlur={onTelemetryBlur}
        autoFocus
      />

      {/* Explain Your Work Section - Collapsed by default for reduced cognitive load */}
      {onWorkChange && (
        <WorkSectionCollapsible
          workShown={workShown}
          onWorkChange={onWorkChange}
          isSubmitting={isSubmitting}
          workBonusText={workBonusText}
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white transition-all ${
            canSubmit
              ? 'bg-gray-900 hover:bg-gray-800 active:scale-[0.98]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Checking...</span>
            </>
          ) : (
            <>
              <Check size={18} weight="bold" />
              <span>Check</span>
            </>
          )}
        </button>

        {onSkip && (
          <>
            {!showSkipConfirm ? (
              <button
                type="button"
                onClick={() => setShowSkipConfirm(true)}
                disabled={isSubmitting}
                className="px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <SkipForward size={18} />
                <span className="hidden sm:inline">Skip</span>
                <span className="text-xs text-red-500 font-medium">
                  -{skipXpCost} XP
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-sm text-red-700">Skip?</span>
                <button
                  onClick={() => {
                    onSkip()
                    setShowSkipConfirm(false)
                  }}
                  className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowSkipConfirm(false)}
                  className="px-2 py-1 text-xs font-medium bg-white text-gray-600 rounded border border-gray-200 hover:bg-gray-50"
                >
                  No
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Removed helper text to reduce cognitive load */}
    </div>
  )
}
