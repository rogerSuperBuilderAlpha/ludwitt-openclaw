'use client'

/**
 * ReadingHints Component
 *
 * Progressive hint system for reading exercises.
 * Features:
 * - 3 levels of hints (gentle, moderate, explicit)
 * - Reading-specific scaffolding
 * - First hint FREE (learning science: scaffolding shouldn't be punitive)
 * - XP cost for subsequent hints
 */

import { useState, useEffect } from 'react'
import {
  Lightbulb,
  MagnifyingGlass,
  BookOpen,
  CaretDown,
  CaretUp,
  Lock,
  Sparkle,
  TextAa,
} from '@phosphor-icons/react'

export type ReadingHintLevel = 'gentle' | 'moderate' | 'explicit'

export interface ReadingHint {
  level: ReadingHintLevel
  text: string
  paragraphRef?: number // Which paragraph to look at
  textEvidence?: string // Actual quote from text
}

interface ReadingHintsProps {
  /** Array of hints for the current exercise */
  hints: ReadingHint[]
  /** Array of hint levels that have been revealed */
  hintsUsed: ReadingHintLevel[]
  /** Callback when a hint is revealed */
  onHintReveal: (level: ReadingHintLevel) => void
  /** Whether first hint should be free */
  firstHintFree?: boolean
  /** Optional custom class name */
  className?: string
}

// Free hint configuration
const HINT_CONFIG: Record<
  ReadingHintLevel,
  { xpCost: number; firstFree: boolean }
> = {
  gentle: { xpCost: 0, firstFree: true }, // Always free - encourages reflection
  moderate: { xpCost: 5, firstFree: true }, // First free, then costs XP
  explicit: { xpCost: 10, firstFree: false }, // Always costs XP - direct answer hint
}

/**
 * Get hint level metadata
 */
function getHintLevelMeta(level: ReadingHintLevel) {
  switch (level) {
    case 'gentle':
      return {
        label: 'Reflection Prompt',
        icon: <Sparkle size={16} weight="fill" />,
        color: 'var(--b-logic)',
        bgColor: 'var(--b-logic-light)',
        borderColor: 'var(--b-logic-border)',
        description: 'Think about what the text is saying',
      }
    case 'moderate':
      return {
        label: 'Text Guide',
        icon: <MagnifyingGlass size={16} weight="fill" />,
        color: 'var(--b-reading)',
        bgColor: 'var(--b-reading-light)',
        borderColor: 'var(--b-reading-border)',
        description: 'Points you to the right section',
      }
    case 'explicit':
      return {
        label: 'Evidence Highlight',
        icon: <TextAa size={16} weight="fill" />,
        color: 'var(--b-writing)',
        bgColor: 'var(--b-writing-light)',
        borderColor: 'var(--b-writing-border)',
        description: 'Shows the key text evidence',
      }
    default:
      return {
        label: 'Hint',
        icon: <Lightbulb size={16} weight="fill" />,
        color: 'var(--b-text-secondary)',
        bgColor: 'var(--b-bg-muted)',
        borderColor: 'var(--b-border-default)',
        description: '',
      }
  }
}

/**
 * Order of hint levels for progression
 */
const HINT_ORDER: ReadingHintLevel[] = ['gentle', 'moderate', 'explicit']

/**
 * Individual hint card component
 */
function HintCard({
  hint,
  isRevealed,
  isLocked,
  onReveal,
  isFree = false,
  xpCost = 0,
}: {
  hint: ReadingHint
  isRevealed: boolean
  isLocked: boolean
  onReveal: () => void
  isFree?: boolean
  xpCost?: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const meta = getHintLevelMeta(hint.level)

  // Auto-expand when first revealed
  useEffect(() => {
    if (isRevealed && !isExpanded) {
      setIsExpanded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRevealed])

  const handleClick = () => {
    if (isLocked) return

    if (!isRevealed) {
      onReveal()
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      className={`rounded-lg transition-all duration-200 ${
        isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{
        border: `1px solid ${isRevealed ? meta.borderColor : 'var(--b-border-default)'}`,
        background: isRevealed ? meta.bgColor : 'var(--b-bg-card)',
      }}
    >
      {/* Hint Header */}
      <button
        onClick={handleClick}
        disabled={isLocked}
        className="w-full flex items-center justify-between p-3 text-left"
        aria-expanded={isRevealed && isExpanded}
        aria-label={`${meta.label}: ${isRevealed ? 'Click to toggle' : 'Click to reveal'}`}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full"
            style={{
              background: isRevealed ? meta.color : 'var(--b-bg-muted)',
              color: isRevealed ? 'white' : 'var(--b-text-muted)',
            }}
          >
            {isLocked ? <Lock size={14} weight="bold" /> : meta.icon}
          </span>

          {/* Label */}
          <div>
            <span
              className="font-semibold text-sm"
              style={{
                color: isRevealed ? meta.color : 'var(--b-text-secondary)',
              }}
            >
              {meta.label}
            </span>
            {!isLocked &&
              !isRevealed &&
              (isFree ? (
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: 'var(--b-success-light, #dcfce7)',
                    color: 'var(--b-success, #16a34a)',
                  }}
                >
                  FREE
                </span>
              ) : xpCost > 0 ? (
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: 'var(--b-bg-muted)',
                    color: 'var(--b-text-muted)',
                  }}
                >
                  -{xpCost} XP
                </span>
              ) : null)}
          </div>
        </div>

        {/* Expand/Collapse Arrow */}
        {isRevealed && (
          <span style={{ color: meta.color }}>
            {isExpanded ? (
              <CaretUp size={16} weight="bold" />
            ) : (
              <CaretDown size={16} weight="bold" />
            )}
          </span>
        )}

        {/* Locked indicator */}
        {isLocked && (
          <span className="text-xs b-text-muted">
            Reveal previous hint first
          </span>
        )}

        {/* Not yet revealed indicator */}
        {!isRevealed && !isLocked && (
          <span className="text-xs font-medium" style={{ color: meta.color }}>
            Click to reveal
          </span>
        )}
      </button>

      {/* Hint Content */}
      {isRevealed && isExpanded && (
        <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2 duration-200">
          {/* Divider */}
          <div className="h-px mb-3" style={{ background: meta.borderColor }} />

          {/* Hint Text */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--b-text-primary)' }}
          >
            {hint.text}
          </p>

          {/* Paragraph Reference */}
          {hint.paragraphRef !== undefined && (
            <div
              className="mt-2 flex items-center gap-2 text-xs"
              style={{ color: meta.color }}
            >
              <BookOpen size={14} weight="fill" />
              <span>Look at paragraph {hint.paragraphRef}</span>
            </div>
          )}

          {/* Text Evidence Quote */}
          {hint.textEvidence && (
            <div
              className="mt-3 p-3 rounded-lg border-l-4"
              style={{
                background: 'rgba(0,0,0,0.03)',
                borderLeftColor: meta.color,
              }}
            >
              <p
                className="text-sm italic"
                style={{ color: 'var(--b-text-secondary)' }}
              >
                &ldquo;{hint.textEvidence}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ReadingHints({
  hints,
  hintsUsed,
  onHintReveal,
  firstHintFree = true,
  className = '',
}: ReadingHintsProps) {
  // Sort hints by level order
  const sortedHints = [...hints].sort((a, b) => {
    const aIndex = HINT_ORDER.indexOf(a.level)
    const bIndex = HINT_ORDER.indexOf(b.level)
    return aIndex - bIndex
  })

  // Determine which hints are locked (must reveal in order)
  const getIsLocked = (index: number): boolean => {
    if (index === 0) return false
    // Check if previous hint has been revealed
    const previousHint = sortedHints[index - 1]
    return !hintsUsed.includes(previousHint.level)
  }

  // Determine if a hint should be free
  const getIsFree = (level: ReadingHintLevel): boolean => {
    if (!firstHintFree) return false
    const config = HINT_CONFIG[level]
    if (!config) return false

    // Gentle is always free
    if (level === 'gentle') return true

    // First use of moderate is free
    if (level === 'moderate' && config.firstFree) {
      return !hintsUsed.includes('moderate')
    }

    return false
  }

  // Get XP cost for a hint
  const getXpCost = (level: ReadingHintLevel): number => {
    const isFree = getIsFree(level)
    if (isFree) return 0
    return HINT_CONFIG[level]?.xpCost || 0
  }

  // Count hints
  const hintsCount = hints.length
  const hintsUsedCount = hintsUsed.length

  if (hints.length === 0) return null

  return (
    <div className={`reading-hints ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb
          size={18}
          weight="fill"
          style={{ color: 'var(--b-reading)' }}
        />
        <h3 className="text-sm font-semibold b-text-secondary">Need Help?</h3>
        <span className="text-xs b-text-muted">
          ({hintsUsedCount}/{hintsCount} hints used)
        </span>
        {firstHintFree && hintsUsedCount === 0 && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full font-medium"
            style={{
              background: 'var(--b-success-light, #dcfce7)',
              color: 'var(--b-success, #16a34a)',
            }}
          >
            First hint FREE!
          </span>
        )}
      </div>

      {/* Hint Cards */}
      <div className="space-y-2">
        {sortedHints.map((hint, index) => (
          <HintCard
            key={hint.level}
            hint={hint}
            isRevealed={hintsUsed.includes(hint.level)}
            isLocked={getIsLocked(index)}
            onReveal={() => onHintReveal(hint.level)}
            isFree={getIsFree(hint.level)}
            xpCost={getXpCost(hint.level)}
          />
        ))}
      </div>

      {/* Usage note */}
      {hintsUsedCount > 0 && (
        <p className="mt-3 text-xs b-text-muted text-center">
          Hints help you learn - don&apos;t be afraid to use them!
        </p>
      )}
    </div>
  )
}

/**
 * Generate default reading hints for an exercise
 * These can be customized per exercise or generated dynamically
 */
export function generateDefaultReadingHints(
  questionType: string = 'comprehension',
  paragraphCount: number = 1
): ReadingHint[] {
  const hints: ReadingHint[] = [
    {
      level: 'gentle',
      text: 'Before answering, ask yourself: What is the main point the author is making? What evidence from the text supports your thinking?',
    },
    {
      level: 'moderate',
      text: `Re-read the passage carefully, paying special attention to ${paragraphCount > 1 ? 'the key paragraphs' : 'the details'}. Look for words or phrases that directly relate to the question.`,
      paragraphRef:
        paragraphCount > 1 ? Math.ceil(paragraphCount / 2) : undefined,
    },
    {
      level: 'explicit',
      text: 'The answer can be found by looking closely at specific words or phrases the author uses. Focus on the most important sentence in the passage.',
    },
  ]

  // Customize based on question type
  if (questionType === 'vocabulary') {
    hints[0].text =
      'Look at the words around the vocabulary word. What clues do they give about its meaning?'
    hints[1].text =
      'Think about words you already know that might be similar. Does the word have a prefix or suffix you recognize?'
    hints[2].text =
      'Consider how the word is used in the sentence. What feeling or meaning does it add?'
  } else if (questionType === 'inference') {
    hints[0].text =
      'What is the author not saying directly, but hinting at? Read between the lines.'
    hints[1].text =
      "Look for clues in the characters' actions, dialogue, or the setting. What do these details suggest?"
    hints[2].text =
      'Combine what the text says with what you already know. What conclusion makes the most sense?'
  }

  return hints
}
