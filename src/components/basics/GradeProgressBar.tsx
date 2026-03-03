'use client'

/**
 * Grade Progress Bar Component
 *
 * Shows progress towards graduating to the next grade level.
 * Progress is gated by daily XP requirements - users cannot advance
 * grades until they've met their daily XP goal.
 */

import { Lock, Sparkle, TrendUp } from '@phosphor-icons/react'

type SubjectColor = 'blue' | 'green' | 'amber' | 'purple' | 'gray'

// Map old color names to design system classes
const subjectToDesign: Record<SubjectColor, string> = {
  blue: 'math',
  green: 'reading',
  amber: 'writing',
  purple: 'logic',
  gray: 'neutral',
}

interface GradeProgressBarProps {
  progress: number
  isLocked: boolean
  subject?: SubjectColor
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showStatus?: boolean
}

const sizeConfig = {
  sm: { height: 'h-1.5', text: 'b-text-xs', icon: 12, gap: 'gap-1' },
  md: { height: 'h-2', text: 'b-text-xs', icon: 14, gap: 'gap-1.5' },
  lg: { height: 'h-3', text: 'b-text-sm', icon: 16, gap: 'gap-2' },
}

export function GradeProgressBar({
  progress,
  isLocked,
  subject = 'gray',
  size = 'md',
  showLabel = true,
  showStatus = false,
}: GradeProgressBarProps) {
  const sizes = sizeConfig[size]
  const designSubject = subjectToDesign[subject]

  const displayProgress = isLocked ? Math.min(progress, 99) : progress
  const isReadyToAdvance = !isLocked && progress >= 95
  const isFullAndLocked = isLocked && progress >= 95

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          {/* Background Track */}
          <div
            className={`${sizes.height} b-bg-muted b-rounded-full overflow-hidden`}
          >
            {/* Progress Fill */}
            <div
              className={`
                ${sizes.height} b-rounded-full transition-all duration-500 ease-out
                ${isLocked ? 'opacity-60' : ''}
                ${isReadyToAdvance ? 'b-animate-pulse b-shadow-lg' : ''}
              `}
              style={{
                width: `${displayProgress}%`,
                background:
                  designSubject === 'neutral'
                    ? 'var(--b-text-secondary)'
                    : `var(--b-${designSubject})`,
              }}
            />
          </div>

          {/* Glow effect for ready state */}
          {isReadyToAdvance && (
            <div
              className={`absolute inset-0 ${sizes.height} b-rounded-full opacity-30 blur-sm b-animate-pulse`}
              style={{
                width: `${displayProgress}%`,
                background:
                  designSubject === 'neutral'
                    ? 'var(--b-text-secondary)'
                    : `var(--b-${designSubject})`,
              }}
            />
          )}
        </div>

        {/* Percentage and Status Icon */}
        {showLabel && (
          <div
            className={`flex items-center ${sizes.gap} ${sizes.text} b-font-medium min-w-[50px] justify-end`}
          >
            <span className={isLocked ? 'b-text-muted' : 'b-text-secondary'}>
              {Math.round(displayProgress)}%
            </span>
            {isFullAndLocked ? (
              <Lock
                size={sizes.icon}
                weight="fill"
                className="b-text-warning"
              />
            ) : isReadyToAdvance ? (
              <Sparkle
                size={sizes.icon}
                weight="fill"
                className="b-text-warning b-animate-pulse"
              />
            ) : null}
          </div>
        )}
      </div>

      {/* Status Message */}
      {showStatus && (
        <div className={`b-mt-xs ${sizes.text}`}>
          {isFullAndLocked ? (
            <span className="b-text-writing flex items-center gap-1">
              <Lock size={sizes.icon} weight="bold" />
              Complete daily XP goal to advance
            </span>
          ) : isReadyToAdvance ? (
            <span className="b-text-reading flex items-center gap-1">
              <TrendUp size={sizes.icon} weight="bold" />
              Ready to level up! Answer correctly to advance
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

/**
 * Compact inline version for chips
 */
export function GradeProgressBarInline({
  progress,
  isLocked,
  subject = 'gray',
}: {
  progress: number
  isLocked: boolean
  subject?: SubjectColor
}) {
  const designSubject = subjectToDesign[subject]
  const displayProgress = isLocked ? Math.min(progress, 99) : progress
  const isReadyToAdvance = !isLocked && progress >= 95

  return (
    <div className="w-full h-1 b-bg-muted b-rounded-full overflow-hidden">
      <div
        className={`
          h-full b-rounded-full transition-all duration-500
          ${isLocked ? 'opacity-60' : ''}
          ${isReadyToAdvance ? 'b-animate-pulse' : ''}
        `}
        style={{
          width: `${displayProgress}%`,
          background:
            designSubject === 'neutral'
              ? 'var(--b-text-secondary)'
              : `var(--b-${designSubject})`,
        }}
      />
    </div>
  )
}
