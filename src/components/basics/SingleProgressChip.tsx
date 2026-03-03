/**
 * Single Progress Chip
 * Compact display for individual subject progress
 *
 * Layout: Header → Progress Bar → Stats
 */

'use client'

import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  MathOperations,
  BookOpen,
  Fire,
  Check,
  Scroll,
  Columns,
  Lock,
  Sparkle,
} from '@phosphor-icons/react'
import { GradeProgressBarInline } from './GradeProgressBar'

type SubjectType = 'Math' | 'Reading' | 'Latin' | 'Greek'

interface SingleProgressChipProps {
  subject: SubjectType
  progress: SubjectProgressDisplay
  size?: 'sm' | 'md' | 'lg'
  dailyXPMet?: boolean
}

const subjectConfig: Record<
  SubjectType,
  {
    icon: typeof MathOperations
    colorKey: 'math' | 'reading' | 'writing' | 'logic'
  }
> = {
  Math: { icon: MathOperations, colorKey: 'math' },
  Reading: { icon: BookOpen, colorKey: 'reading' },
  Latin: { icon: Scroll, colorKey: 'writing' },
  Greek: { icon: Columns, colorKey: 'logic' },
}

export function SingleProgressChip({
  subject,
  progress,
  size = 'md',
  dailyXPMet = false,
}: SingleProgressChipProps) {
  const config = subjectConfig[subject]
  const Icon = config.icon
  const colorKey = config.colorKey
  const isLocked = !dailyXPMet
  const isReadyToAdvance = dailyXPMet && progress.progressToNextLevel >= 95
  const accuracyRate =
    progress.accuracyRate > 0
      ? progress.accuracyRate
      : progress.totalCorrect !== undefined && progress.totalCompleted > 0
        ? progress.totalCorrect / progress.totalCompleted
        : progress.accuracyRate

  const sizeClasses = {
    sm: {
      container: 'b-px-sm b-py-xs',
      icon: 14,
      title: 'b-text-xs',
      grade: 'b-text-xs b-px-xs b-py-xs',
      stats: 'b-text-xs gap-1',
      fire: 14,
      check: 12,
    },
    md: {
      container: 'b-p-md',
      icon: 18,
      title: 'b-text-sm',
      grade: 'b-text-xs b-px-sm b-py-xs',
      stats: 'b-text-xs gap-2',
      fire: 16,
      check: 14,
    },
    lg: {
      container: 'b-p-lg',
      icon: 22,
      title: 'b-text-base',
      grade: 'b-text-sm b-px-md b-py-xs',
      stats: 'b-text-sm gap-3',
      fire: 20,
      check: 16,
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div
      className={`
      b-card b-card-${colorKey} b-card-interactive ${sizes.container}
    `}
    >
      {/* Header: Icon, Subject, Grade */}
      <div className="flex items-center gap-2 b-text-primary b-mb-sm">
        <Icon
          size={sizes.icon}
          weight="bold"
          className="transition-transform group-hover:scale-110"
        />
        <span
          className={`b-font-semibold ${sizes.title}`}
          style={{
            fontFamily:
              'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          {subject}
        </span>
        <span
          className={`${sizes.grade} b-font-medium b-bg-elevated b-rounded-sm b-shadow-xs flex items-center gap-1`}
        >
          {progress.currentLevel}
          {isLocked && progress.progressToNextLevel >= 95 && (
            <Lock size={10} weight="fill" className="b-text-warning" />
          )}
          {isReadyToAdvance && (
            <Sparkle size={10} weight="fill" className="b-text-warning" />
          )}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="b-mb-sm">
        <GradeProgressBarInline
          progress={progress.progressToNextLevel}
          isLocked={isLocked}
          subject={
            colorKey === 'math'
              ? 'blue'
              : colorKey === 'reading'
                ? 'green'
                : colorKey === 'writing'
                  ? 'amber'
                  : 'purple'
          }
        />
      </div>

      {/* Stats */}
      <div
        className={`flex items-center ${sizes.stats} b-text-${colorKey}-dark`}
      >
        <div className="flex items-center gap-0.5 group">
          <Fire
            size={sizes.fire}
            weight="fill"
            className="b-text-warning transition-transform group-hover:scale-110"
          />
          <span className="b-font-medium">{progress.currentStreak}</span>
        </div>
        <div className="flex items-center gap-0.5 group">
          <Check
            size={sizes.check}
            weight="bold"
            className="transition-transform group-hover:scale-110"
          />
          <span className="b-font-medium">
            {Math.round(accuracyRate * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="b-font-medium">{progress.totalCompleted}</span>
          <span className="b-text-muted">done</span>
        </div>
      </div>
    </div>
  )
}
