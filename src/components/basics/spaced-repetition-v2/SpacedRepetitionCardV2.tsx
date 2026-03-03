'use client'

/**
 * Spaced Repetition Card V2
 *
 * A compact card component showing the user's progress toward their next
 * spaced repetition session. Designed for dashboard sidebar placement.
 */

import { useMemo } from 'react'
import {
  Brain,
  Lightning,
  Fire,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react'

// ============================================================================
// Types
// ============================================================================

interface SpacedRepetitionCardV2Props {
  /** Number of problems completed in current cycle */
  problemsCompleted: number
  /** Problems required to trigger review (default: 20) */
  triggerThreshold?: number
  /** Whether a review session is available */
  canStartReview: boolean
  /** Number of problems in the review queue */
  reviewQueueCount?: number
  /** Callback when user clicks to start review */
  onStartReview: () => void
  /** Optional: Time until next scheduled review */
  nextReviewTime?: Date | null
  /** Optional: Current streak of perfect reviews */
  perfectStreak?: number
  /** Compact mode for smaller spaces */
  compact?: boolean
}

// ============================================================================
// Component
// ============================================================================

export function SpacedRepetitionCardV2({
  problemsCompleted,
  triggerThreshold = 20,
  canStartReview,
  reviewQueueCount = 0,
  onStartReview,
  nextReviewTime,
  perfectStreak = 0,
  compact = false,
}: SpacedRepetitionCardV2Props) {
  const progress = useMemo(() => {
    return Math.min((problemsCompleted / triggerThreshold) * 100, 100)
  }, [problemsCompleted, triggerThreshold])

  const remainingProblems = Math.max(0, triggerThreshold - problemsCompleted)

  // Format next review time
  const formattedNextReview = useMemo(() => {
    if (!nextReviewTime) return null
    const now = new Date()
    const diff = nextReviewTime.getTime() - now.getTime()
    if (diff < 0) return 'Now'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days}d`
    }
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }, [nextReviewTime])

  if (compact) {
    return (
      <button
        onClick={canStartReview ? onStartReview : undefined}
        disabled={!canStartReview}
        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
        style={{
          background: canStartReview
            ? 'linear-gradient(135deg, var(--b-greek-light) 0%, rgba(139, 92, 246, 0.05) 100%)'
            : 'var(--b-bg-muted)',
          border: `1px solid ${canStartReview ? 'var(--b-greek)' : 'var(--b-border-default)'}`,
          cursor: canStartReview ? 'pointer' : 'default',
          opacity: canStartReview ? 1 : 0.7,
        }}
      >
        <div
          className="p-2 rounded-lg"
          style={{
            background: canStartReview
              ? 'var(--b-greek)'
              : 'var(--b-border-default)',
          }}
        >
          <Brain
            size={18}
            weight="bold"
            className={canStartReview ? 'text-white' : 'b-text-muted'}
          />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium b-text-primary">
            {canStartReview ? 'Review Ready!' : 'Spaced Repetition'}
          </p>
          <p className="text-xs b-text-secondary">
            {canStartReview
              ? `${reviewQueueCount} problems to review`
              : `${remainingProblems} more to unlock`}
          </p>
        </div>
        {canStartReview && (
          <ArrowRight size={18} style={{ color: 'var(--b-greek)' }} />
        )}
      </button>
    )
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--b-bg-card)',
        border: '1px solid var(--b-border-default)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{
          background:
            'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)',
        }}
      >
        <Brain size={20} weight="bold" className="text-white" />
        <span className="font-semibold text-white">Spaced Repetition</span>
        {perfectStreak > 0 && (
          <div
            className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <Fire size={14} weight="fill" className="text-orange-300" />
            <span className="text-xs text-white font-medium">
              {perfectStreak}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm b-text-secondary">
              {problemsCompleted} / {triggerThreshold} problems
            </span>
            <span className="text-xs b-text-muted">
              {remainingProblems > 0 ? `${remainingProblems} to go` : 'Ready!'}
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--b-border-default)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background:
                  progress >= 100
                    ? 'linear-gradient(90deg, var(--b-reading) 0%, #16a34a 100%)'
                    : 'linear-gradient(90deg, var(--b-greek) 0%, #7c3aed 100%)',
              }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-center">
          {reviewQueueCount > 0 && (
            <div
              className="flex-1 py-2 rounded-lg"
              style={{ background: 'var(--b-bg-muted)' }}
            >
              <p
                className="text-lg font-bold"
                style={{ color: 'var(--b-greek)' }}
              >
                {reviewQueueCount}
              </p>
              <p className="text-xs b-text-secondary">In Queue</p>
            </div>
          )}
          {formattedNextReview && (
            <div
              className="flex-1 py-2 rounded-lg"
              style={{ background: 'var(--b-bg-muted)' }}
            >
              <p className="text-lg font-bold flex items-center justify-center gap-1 b-text-primary">
                <Clock size={16} />
                {formattedNextReview}
              </p>
              <p className="text-xs b-text-secondary">Next Review</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onStartReview}
          disabled={!canStartReview}
          className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          style={{
            background: canStartReview
              ? 'linear-gradient(135deg, var(--b-greek) 0%, #7c3aed 100%)'
              : 'var(--b-border-default)',
            color: canStartReview ? 'white' : 'var(--b-text-muted)',
            cursor: canStartReview ? 'pointer' : 'not-allowed',
          }}
        >
          {canStartReview ? (
            <>
              <Lightning size={18} weight="fill" />
              Start Review Session
            </>
          ) : (
            <>
              <Brain size={18} />
              {remainingProblems} Problems to Unlock
            </>
          )}
        </button>

        {/* Info Text */}
        <p className="text-xs text-center b-text-muted">
          Spaced repetition helps reinforce learning by reviewing concepts at
          optimal intervals.
        </p>
      </div>
    </div>
  )
}
