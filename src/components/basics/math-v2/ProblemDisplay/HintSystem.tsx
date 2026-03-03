'use client'

/**
 * HintSystem Component
 *
 * Progressive hint system for MathProblemV2 format.
 * Features:
 * - 3 levels of hints (gentle, moderate, explicit)
 * - Expandable hint cards
 * - Cost tracking integration
 * - LaTeX support in hints
 */

import { useState, useEffect, useRef } from 'react'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { Hint, HintLevel } from '@/lib/types/math-v2'
import { DiagramRenderer } from '../Visualization'
import {
  Lightbulb,
  Eye,
  CaretDown,
  CaretUp,
  Lock,
  Sparkle,
} from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface HintSystemProps {
  /** Array of hints from the problem */
  hints: Hint[]
  /** Array of hint levels that have been revealed */
  hintsUsed: HintLevel[]
  /** Callback when a hint is revealed */
  onHintReveal: (level: HintLevel) => void
  /** Callback when AI Tutor (Big Reveal) is requested */
  onAITutorRequest?: () => void
  /** Optional custom class name */
  className?: string
  /** Whether first hint of each type should be free this problem */
  firstHintFree?: boolean
}

// Free hint configuration - first hint of each type is free per problem
const FREE_HINT_CONFIG = {
  gentle: { firstFree: true, regularCost: 0 }, // Always free
  moderate: { firstFree: true, regularCost: 5 }, // First free, then 5 XP
  explicit: { firstFree: false, regularCost: 0 }, // Uses credits
}

/**
 * Get hint level metadata
 */
function getHintLevelMeta(level: HintLevel) {
  switch (level) {
    case 'gentle':
      return {
        label: 'Gentle Nudge',
        icon: <Sparkle size={16} weight="fill" />,
        color: 'var(--b-logic)',
        bgColor: 'var(--b-logic-light)',
        borderColor: 'var(--b-logic-border)',
        xpCost: 5,
        description: 'A small push in the right direction',
      }
    case 'moderate':
      return {
        label: 'Helpful Hint',
        icon: <Lightbulb size={16} weight="fill" />,
        color: 'var(--b-writing)',
        bgColor: 'var(--b-writing-light)',
        borderColor: 'var(--b-writing-border)',
        xpCost: 10,
        description: 'More specific guidance',
      }
    case 'explicit':
      return {
        label: 'AI Tutor',
        icon: <Sparkle size={16} weight="fill" />,
        color: 'var(--b-greek)',
        bgColor: 'var(--b-greek-light)',
        borderColor: 'var(--b-greek-border)',
        xpCost: 0, // Uses credits instead
        usesCredits: true,
        description: 'Chat with AI for personalized help',
      }
    default:
      return {
        label: 'Hint',
        icon: <Lightbulb size={16} weight="fill" />,
        color: 'var(--b-text-secondary)',
        bgColor: 'var(--b-bg-muted)',
        borderColor: 'var(--b-border-default)',
        xpCost: 5,
        description: '',
      }
  }
}

/**
 * Order of hint levels for progression
 */
const HINT_ORDER: HintLevel[] = ['gentle', 'moderate', 'explicit']

/**
 * Individual hint card component
 */
function HintCard({
  hint,
  isRevealed,
  isLocked,
  onReveal,
  isAITutor = false,
  onAITutorClick,
  isFree = false,
}: {
  hint: Hint
  isRevealed: boolean
  isLocked: boolean
  onReveal: () => void
  isAITutor?: boolean
  onAITutorClick?: () => void
  isFree?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const meta = getHintLevelMeta(hint.level)

  // Auto-expand when first revealed
  useEffect(() => {
    if (isRevealed && !isExpanded && !isAITutor) {
      setIsExpanded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRevealed, isAITutor])

  // Trigger MathJax rendering when content changes
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const win = window as unknown as {
        MathJax?: { typesetPromise?: (elements?: Element[]) => Promise<void> }
      }
      if (typeof window !== 'undefined' && win.MathJax?.typesetPromise) {
        win.MathJax.typesetPromise([contentRef.current]).catch((err: unknown) =>
          logger.error('HintSystem', 'MathJax typeset failed', { error: err })
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hint.latex])

  const handleClick = () => {
    if (isLocked) return

    // For AI Tutor, always call the AI tutor click handler
    if (isAITutor && onAITutorClick) {
      onAITutorClick()
      return
    }

    if (!isRevealed) {
      onReveal()
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div
      className={`hint-card rounded-lg transition-all duration-200 ${
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
              !isAITutor &&
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
              ) : meta.xpCost > 0 ? (
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: 'var(--b-bg-muted)',
                    color: 'var(--b-text-muted)',
                  }}
                >
                  -{meta.xpCost} XP
                </span>
              ) : null)}
            {isAITutor && (
              <span
                className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  background: 'var(--b-greek-light)',
                  color: 'var(--b-greek)',
                }}
              >
                Uses Credits
              </span>
            )}
          </div>
        </div>

        {/* Expand/Collapse Arrow - not shown for AI Tutor */}
        {isRevealed && !isAITutor && (
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

        {/* AI Tutor always shows "Click to chat" */}
        {isAITutor && !isLocked && (
          <span className="text-xs font-medium" style={{ color: meta.color }}>
            Click to chat →
          </span>
        )}

        {/* Not yet revealed indicator */}
        {!isRevealed && !isLocked && !isAITutor && (
          <span className="text-xs font-medium" style={{ color: meta.color }}>
            Click to reveal
          </span>
        )}
      </button>

      {/* Hint Content */}
      {isRevealed && isExpanded && (
        <div
          ref={contentRef}
          className="hint-content px-4 pb-4 pt-0 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Divider */}
          <div className="h-px mb-3" style={{ background: meta.borderColor }} />

          {/* Hint Text */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--b-text-primary)' }}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                hint.text
                  .replace(/\$\$(.+?)\$\$/g, '\\[$1\\]')
                  .replace(/\$(.+?)\$/g, '\\($1\\)')
              ),
            }}
          />

          {/* LaTeX Display */}
          {hint.latex && (
            <div
              className="mt-3 p-3 rounded-lg text-center"
              style={{ background: 'rgba(0,0,0,0.03)' }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(`\\[${hint.latex}\\]`),
              }}
            />
          )}

          {/* Diagram */}
          {hint.diagram && (
            <div className="mt-3">
              <DiagramRenderer diagram={hint.diagram} className="mx-auto" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function HintSystem({
  hints,
  hintsUsed,
  onHintReveal,
  onAITutorRequest,
  className = '',
  firstHintFree = true,
}: HintSystemProps) {
  // Sort hints by level order
  const sortedHints = [...hints].sort((a, b) => {
    const aIndex = HINT_ORDER.indexOf(a.level)
    const bIndex = HINT_ORDER.indexOf(b.level)
    return aIndex - bIndex
  })

  // Determine which hints are locked (AI Tutor requires previous hints)
  const getIsLocked = (index: number): boolean => {
    if (index === 0) return false
    // Check if previous hint has been revealed
    const previousHint = sortedHints[index - 1]
    return !hintsUsed.includes(previousHint.level)
  }

  // Determine if a hint should be free (first hint of each regular type)
  const getIsFree = (level: HintLevel): boolean => {
    if (!firstHintFree) return false
    const config = FREE_HINT_CONFIG[level]
    if (!config) return false
    // Gentle nudge is always free
    if (level === 'gentle') return true
    // First use of moderate hint is free
    if (level === 'moderate' && config.firstFree) {
      return !hintsUsed.includes('moderate')
    }
    return false
  }

  // Count regular hints (not AI Tutor)
  const regularHintsCount = hints.filter((h) => h.level !== 'explicit').length
  const regularHintsUsed = hintsUsed.filter((h) => h !== 'explicit').length

  if (hints.length === 0) return null

  return (
    <div className={`hint-system ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={18} weight="fill" className="text-b-writing" />
        <h3 className="text-sm font-semibold b-text-secondary">Need Help?</h3>
        <span className="text-xs b-text-muted">
          ({regularHintsUsed}/{regularHintsCount} hints used)
        </span>
        {firstHintFree && regularHintsUsed === 0 && (
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
        {sortedHints.map((hint, index) => {
          const isAITutor = hint.level === 'explicit'
          return (
            <HintCard
              key={hint.level}
              hint={hint}
              isRevealed={hintsUsed.includes(hint.level)}
              isLocked={getIsLocked(index)}
              onReveal={() => onHintReveal(hint.level)}
              isAITutor={isAITutor}
              onAITutorClick={isAITutor ? onAITutorRequest : undefined}
              isFree={getIsFree(hint.level)}
            />
          )
        })}
      </div>

      {/* Usage warning - only show if hints cost XP */}
      {regularHintsUsed > 1 && (
        <p className="mt-3 text-xs b-text-muted text-center">
          Using hints reduces XP earned for this problem
        </p>
      )}
    </div>
  )
}
