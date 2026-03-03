'use client'

/**
 * ResultBanner Component
 *
 * Displays the success/error result banner with:
 * - Animated entrance
 * - Success/error icon
 * - XP earned display
 * - Work bonus indicator
 */

import { CheckCircle, XCircle, PencilLine, Star } from '@phosphor-icons/react'

interface ResultBannerProps {
  /** Whether the answer was correct */
  isCorrect: boolean
  /** Message to display */
  message: string
  /** XP earned for this answer */
  xpEarned: number
  /** Work bonus details */
  workBonus?: {
    bonus: number
    feedback?: string
    improvements?: string[]
    whatWentWell?: string | null
  } | null
  /** Optional custom class name */
  className?: string
}

export function ResultBanner({
  isCorrect,
  message,
  xpEarned,
  workBonus,
  className = '',
}: ResultBannerProps) {
  const totalXP = xpEarned + (workBonus?.bonus || 0)

  return (
    <div
      className={`b-feedback ${isCorrect ? 'b-feedback-success' : 'b-feedback-error'} b-animate-slide-up ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Answer feedback"
    >
      {/* Header with Icon and Message */}
      <div className="flex items-center gap-3">
        {isCorrect ? (
          <div className="b-animate-scale-in">
            <CheckCircle size={32} weight="fill" className="b-text-success" />
          </div>
        ) : (
          <XCircle size={32} weight="fill" className="b-text-danger" />
        )}
        <div className="flex-1">
          <h3 className="b-font-bold b-text-lg">{message}</h3>
        </div>
      </div>

      {/* XP Earned Display - Prominent */}
      <div
        className="b-rounded-lg b-p-lg flex items-center justify-between"
        style={{
          background:
            totalXP > 0
              ? 'linear-gradient(135deg, var(--b-reading-light), var(--b-success-light))'
              : 'var(--b-bg-muted)',
          border:
            totalXP > 0
              ? '2px solid var(--b-reading-border)'
              : '1px solid var(--b-border-default)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="b-icon-box b-icon-box-md b-rounded-full"
            style={{
              background:
                totalXP > 0 ? 'var(--b-reading)' : 'var(--b-bg-muted)',
              color: totalXP > 0 ? 'white' : 'var(--b-text-muted)',
            }}
          >
            <Star size={20} weight="fill" />
          </div>
          <div>
            <p className="b-text-xs b-font-medium b-text-muted uppercase tracking-wide">
              XP Earned
            </p>
            <p
              className={`b-text-2xl b-font-bold ${totalXP > 0 ? 'b-text-reading-dark' : 'b-text-muted'}`}
              style={{ fontFamily: 'var(--b-font-mono)' }}
            >
              +{totalXP}
            </p>
          </div>
        </div>

        {/* XP Breakdown */}
        {(xpEarned > 0 || workBonus?.bonus) && (
          <div className="text-right">
            <div className="flex flex-col gap-1">
              {xpEarned > 0 && (
                <span className="b-text-sm b-text-reading-dark">
                  Base: +{xpEarned}
                </span>
              )}
              {workBonus && workBonus.bonus > 0 && (
                <span
                  className="b-text-sm b-font-medium flex items-center gap-1 justify-end"
                  style={{ color: 'var(--b-writing-dark)' }}
                >
                  <PencilLine size={14} weight="bold" />
                  Work: +{workBonus.bonus}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Work Bonus Feedback */}
      {workBonus?.feedback && (
        <div
          className="b-rounded-lg b-p-md flex items-start gap-3"
          style={{
            background: 'var(--b-writing-light)',
            border: '1px solid var(--b-writing-border)',
          }}
        >
          <PencilLine
            size={18}
            weight="bold"
            className="b-text-writing flex-shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <p className="b-text-sm b-font-medium b-text-writing-dark b-mb-xs">
              Work Feedback
            </p>
            <p className="b-text-sm b-text-secondary b-mb-sm">
              {workBonus.feedback}
            </p>

            {/* What Went Well */}
            {workBonus.whatWentWell && (
              <div className="b-mt-sm">
                <p className="b-text-xs b-font-medium b-text-reading b-mb-xs">
                  ✓ Strength:
                </p>
                <p className="b-text-sm b-text-secondary">
                  {workBonus.whatWentWell}
                </p>
              </div>
            )}

            {/* Improvements */}
            {workBonus.improvements && workBonus.improvements.length > 0 && (
              <div className="b-mt-sm">
                <p className="b-text-xs b-font-medium b-text-writing b-mb-xs">
                  → To improve:
                </p>
                <ul className="b-text-sm b-text-secondary list-disc list-inside">
                  {workBonus.improvements.map((improvement, i) => (
                    <li key={i}>{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No XP Hint */}
      {xpEarned === 0 && isCorrect && !workBonus?.bonus && (
        <p className="b-text-xs b-text-muted text-center">
          💡 Show your work next time to earn bonus XP!
        </p>
      )}
    </div>
  )
}
