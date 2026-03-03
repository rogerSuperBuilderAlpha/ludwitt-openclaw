/* eslint-disable jsx-a11y/no-autofocus */
'use client'

/**
 * MathInputV2 Component
 *
 * Complete math input component combining:
 * - FormulaEditor for LaTeX input
 * - MathKeyboard for symbol insertion
 * - WorkSection for showing step-by-step work
 * - Submit/Skip action buttons
 *
 * NOTE: The redesigned version (MathInputV2) is exported from MathInputRedesign.tsx
 * and is now the primary export. The old complex version is deprecated.
 */

// Export the NEW simplified, reliable input as the default
export { MathInputV2, type AIFeedback } from './MathInputRedesign'

// Keep old components available for gradual migration
import { useRef, useCallback, useState } from 'react'
import { SkipForward, Warning, Check, ArrowRight } from '@phosphor-icons/react'
import { FormulaEditor, FormulaEditorRef } from './FormulaEditor'
import { MathKeyboardV2 } from './MathKeyboard'
import { WorkSection } from './WorkSection'

// Re-export sub-components for direct use (deprecated - for backwards compatibility)
export { FormulaEditor, type FormulaEditorRef } from './FormulaEditor'
export { MathKeyboardV2 } from './MathKeyboard'
export { WorkSection } from './WorkSection'

interface MathInputV2LegacyProps {
  /** Current answer value (LaTeX) */
  answer: string
  /** Called when answer changes */
  onAnswerChange: (latex: string) => void
  /** Current work shown (LaTeX) */
  workShown?: string
  /** Called when work changes */
  onWorkChange?: (latex: string) => void
  /** Whether work section is visible */
  showWorkSection?: boolean
  /** Toggle work section visibility */
  onToggleWorkSection?: () => void
  /** Whether currently submitting */
  isSubmitting?: boolean
  /** Whether skip confirmation is shown */
  showSkipConfirm?: boolean
  /** Called when submit button is clicked */
  onSubmit: () => void
  /** Called when skip button is clicked */
  onSkipClick?: () => void
  /** Called when skip is confirmed */
  onSkipConfirm?: () => void
  /** Called when skip is cancelled */
  onSkipCancel?: () => void
  /** XP cost for skipping */
  skipXpCost?: number
  /** Whether to show the work section option */
  enableWorkSection?: boolean
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Custom placeholder for answer input */
  placeholder?: string
  /** Button variant */
  variant?: 'default' | 'compact'
}

/** @deprecated Use MathInputV2 from MathInputRedesign instead */
export function MathInputV2Legacy({
  answer,
  onAnswerChange,
  workShown = '',
  onWorkChange,
  showWorkSection = false,
  onToggleWorkSection,
  isSubmitting = false,
  showSkipConfirm = false,
  onSubmit,
  onSkipClick,
  onSkipConfirm,
  onSkipCancel,
  skipXpCost = 5,
  enableWorkSection = true,
  autoFocus = true,
  placeholder = 'Type your answer...',
  variant = 'default',
}: MathInputV2LegacyProps) {
  const editorRef = useRef<FormulaEditorRef>(null)
  const [localShowWork, setLocalShowWork] = useState(showWorkSection)

  // Use provided toggle or local state
  const isWorkExpanded = onToggleWorkSection ? showWorkSection : localShowWork
  const handleToggleWork = useCallback(() => {
    if (onToggleWorkSection) {
      onToggleWorkSection()
    } else {
      setLocalShowWork((prev) => !prev)
    }
  }, [onToggleWorkSection])

  // Insert symbol from keyboard into answer editor
  const handleInsertSymbol = useCallback((latex: string) => {
    if (editorRef.current) {
      editorRef.current.insert(latex)
      editorRef.current.focus()
    }
  }, [])

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (!isSubmitting && answer.trim()) {
      onSubmit()
    }
  }, [isSubmitting, answer, onSubmit])

  // Determine if submit is disabled
  const isSubmitDisabled = isSubmitting || !answer.trim()
  const submitDisabledReason = !answer.trim() ? 'Enter an answer first' : ''

  const isCompact = variant === 'compact'

  return (
    <div className="flex flex-col gap-4">
      {/* Answer Input Section */}
      <div>
        <label
          htmlFor="math-answer-input-v2"
          className="block b-text-sm b-font-medium b-text-primary b-mb-sm"
        >
          Your Answer
        </label>

        {/* Math Keyboard */}
        <MathKeyboardV2 onInsert={handleInsertSymbol} disabled={isSubmitting} />

        {/* Formula Editor */}
        <FormulaEditor
          ref={editorRef}
          value={answer}
          onChange={onAnswerChange}
          placeholder={placeholder}
          disabled={isSubmitting}
          autoFocus={autoFocus}
          onSubmit={handleSubmit}
          size={isCompact ? 'sm' : 'md'}
        />

        <div id="math-instructions-v2" className="sr-only">
          Press Enter to submit your answer. Use the math keyboard above to
          insert symbols.
        </div>
      </div>

      {/* Show Your Work Section */}
      {enableWorkSection && onWorkChange && (
        <WorkSection
          value={workShown}
          onChange={onWorkChange}
          isExpanded={isWorkExpanded}
          onToggle={handleToggleWork}
          disabled={isSubmitting}
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          aria-label={
            isSubmitting ? 'Checking your answer' : 'Check your math answer'
          }
          aria-describedby="math-answer-input-v2"
          title={submitDisabledReason || undefined}
          className={`b-btn b-btn-primary flex-1 ${isCompact ? 'b-btn-md' : 'b-btn-lg'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent b-rounded-full b-animate-spin" />
              Checking...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Check size={18} weight="bold" />
              Check Answer
            </span>
          )}
        </button>

        {onSkipClick && (
          <button
            onClick={onSkipClick}
            disabled={isSubmitting}
            aria-label={`Skip this math problem (-${skipXpCost} XP)`}
            className={`b-btn b-btn-secondary flex items-center gap-2 ${isCompact ? 'b-btn-md' : 'b-btn-lg'}`}
          >
            <SkipForward size={18} weight="bold" />
            <span className="hidden sm:inline">Skip</span>
            <span className="b-text-xs b-text-danger b-font-semibold">
              -{skipXpCost} XP
            </span>
          </button>
        )}
      </div>

      {/* Skip Confirmation Dialog */}
      {showSkipConfirm && onSkipConfirm && onSkipCancel && (
        <div className="b-feedback b-feedback-error b-animate-slide-up">
          <Warning size={24} weight="fill" className="flex-shrink-0" />
          <div className="flex-1">
            <h4 className="b-font-semibold b-mb-xs">Skip this problem?</h4>
            <p className="b-text-sm b-mb-md">
              Skipping will cost you <strong>{skipXpCost} XP</strong>. Are you
              sure?
            </p>
            <div className="flex gap-2">
              <button
                onClick={onSkipConfirm}
                disabled={isSubmitting}
                className="b-btn b-btn-sm b-btn-danger"
              >
                {isSubmitting ? (
                  'Skipping...'
                ) : (
                  <>
                    <ArrowRight size={14} weight="bold" />
                    Yes, Skip (-{skipXpCost} XP)
                  </>
                )}
              </button>
              <button
                onClick={onSkipCancel}
                disabled={isSubmitting}
                className="b-btn b-btn-sm b-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
