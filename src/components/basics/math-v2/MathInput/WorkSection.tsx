'use client'

/**
 * WorkSection Component
 *
 * Collapsible "Show Your Work" accordion that allows students to
 * show step-by-step work for bonus XP. Uses FormulaEditor for
 * rich mathematical input.
 */

import { useRef, useCallback } from 'react'
import {
  PencilLine,
  CaretDown,
  CaretUp,
  Lightbulb,
} from '@phosphor-icons/react'
import { FormulaEditor, FormulaEditorRef } from './FormulaEditor'
import { MathKeyboardV2 } from './MathKeyboard'

interface WorkSectionProps {
  /** Current work content (LaTeX) */
  value: string
  /** Called when work changes */
  onChange: (latex: string) => void
  /** Whether the section is expanded */
  isExpanded: boolean
  /** Toggle expanded state */
  onToggle: () => void
  /** Whether input is disabled */
  disabled?: boolean
  /** XP multiplier to display */
  xpMultiplier?: string
  /** Custom placeholder */
  placeholder?: string
}

export function WorkSection({
  value,
  onChange,
  isExpanded,
  onToggle,
  disabled = false,
  xpMultiplier = 'Up to 2x XP',
  placeholder,
}: WorkSectionProps) {
  const editorRef = useRef<FormulaEditorRef>(null)

  // Insert symbol from keyboard into work editor
  const handleInsertSymbol = useCallback((latex: string) => {
    if (editorRef.current) {
      editorRef.current.insert(latex)
      editorRef.current.focus()
    }
  }, [])

  return (
    <div className="b-card b-card-flat overflow-hidden">
      {/* Header Toggle */}
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className="
          w-full flex items-center justify-between 
          b-px-lg b-py-md 
          b-bg-writing-light 
          hover:opacity-90 
          transition-opacity
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <div className="flex items-center gap-2">
          <PencilLine size={18} weight="bold" className="b-text-writing" />
          <span className="b-font-medium b-text-primary">Show Your Work</span>
          <span className="b-badge b-badge-warning b-badge-sm b-font-semibold">
            {xpMultiplier}
          </span>
        </div>
        {isExpanded ? (
          <CaretUp size={18} className="b-text-muted" />
        ) : (
          <CaretDown size={18} className="b-text-muted" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="b-p-lg b-bg-elevated b-border-t b-animate-slide-up">
          <p className="b-text-sm b-text-secondary b-mb-md">
            Show your step-by-step solution to earn bonus XP! The AI will
            evaluate your work.
          </p>

          {/* Primary: Multi-line plain text textarea (Shift+Enter for newline, Enter to submit) */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              // Allow Shift+Enter for newlines (default behavior)
              // Regular Enter does nothing in textarea (natural multiline)
            }}
            placeholder={`Show each step of your work:

Step 1: Write out the formula
Step 2: Substitute the values
Step 3: Calculate the result
...`}
            disabled={disabled}
            rows={6}
            className="b-input b-textarea b-bg-muted w-full resize-y"
            style={{
              fontFamily: 'var(--b-font-mono)',
              lineHeight: '1.6',
              minHeight: '120px',
            }}
          />
          <p className="b-text-xs b-text-muted b-mt-sm">
            Press Enter or Shift+Enter to add new lines
          </p>

          {/* Optional: Math formula input */}
          <details className="b-mt-md">
            <summary className="b-text-xs b-text-muted cursor-pointer hover:b-text-secondary">
              Need to type math formulas?
            </summary>
            <div className="b-mt-sm">
              <MathKeyboardV2
                onInsert={handleInsertSymbol}
                disabled={disabled}
                compact
              />
              <FormulaEditor
                ref={editorRef}
                value={value}
                onChange={onChange}
                placeholder="Type LaTeX formulas here..."
                disabled={disabled}
                size="md"
                className="b-bg-muted"
              />
            </div>
          </details>

          {/* Tips */}
          <div className="flex items-start gap-2 b-mt-md b-p-md b-bg-info-light b-rounded-md">
            <Lightbulb
              size={16}
              weight="fill"
              className="b-text-info flex-shrink-0 mt-0.5"
            />
            <p className="b-text-xs b-text-info-dark">
              <strong>Tip:</strong> More detailed and accurate work = more bonus
              XP! Show each step clearly, and don&apos;t skip intermediate
              calculations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
