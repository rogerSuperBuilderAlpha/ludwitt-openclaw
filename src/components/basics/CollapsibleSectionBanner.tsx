'use client'

/**
 * Collapsible Section Banner
 *
 * A unified section wrapper with consistent styling from the Basics design system.
 * Features collapsible content, progress tracking, and subject-specific theming.
 */

import { useState, ReactNode } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

// ============================================================================
// Types
// ============================================================================

interface SubjectProgress {
  name: string
  progress: number
  color: string
  grade?: number
  totalCompleted?: number
  currentStreak?: number
  accuracy?: number
  xp?: number
}

type AccentColor =
  | 'math'
  | 'reading'
  | 'writing'
  | 'logic'
  | 'latin'
  | 'greek'
  | 'neutral'

interface CollapsibleSectionBannerProps {
  title: string
  icon: string
  progress?: number
  subjects?: SubjectProgress[]
  children: ReactNode
  defaultExpanded?: boolean
  accentColor?: AccentColor
}

// ============================================================================
// Component
// ============================================================================

export function CollapsibleSectionBanner({
  title,
  icon,
  progress,
  subjects,
  children,
  defaultExpanded = false,
  accentColor = 'neutral',
}: CollapsibleSectionBannerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const sectionClass =
    accentColor === 'neutral'
      ? 'b-section'
      : `b-section b-section-${accentColor}`

  return (
    <div className={`${sectionClass} b-mb-xl`}>
      {/* Header - Clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full b-section-header"
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <span className="b-text-xl">{icon}</span>

          {/* Title and Subject Stats */}
          <div className="text-left">
            <h2 className="b-text-base b-font-semibold b-text-primary">
              {title}
            </h2>

            {/* Subject Progress Chips */}
            {subjects && subjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 b-mt-sm">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {/* Subject name and grade */}
                    <div className="flex items-center gap-1">
                      <span className="b-text-xs b-font-semibold b-text-primary">
                        {subject.name}
                      </span>
                      {subject.grade !== undefined && (
                        <span className="b-text-xs b-text-muted">
                          G{subject.grade}
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div
                      className="b-progress b-progress-sm"
                      style={{ width: '48px' }}
                    >
                      <div
                        className={`b-progress-bar ${subject.color}`}
                        style={{ width: `${Math.min(100, subject.progress)}%` }}
                      />
                    </div>
                    <span className="b-text-xs b-text-muted b-font-medium">
                      {Math.round(subject.progress)}%
                    </span>

                    {/* Stats chips */}
                    <div className="flex items-center gap-1">
                      {subject.totalCompleted !== undefined &&
                        subject.totalCompleted > 0 && (
                          <span className="b-badge b-badge-default b-badge-sm">
                            {subject.totalCompleted} done
                          </span>
                        )}
                      {subject.currentStreak !== undefined &&
                        subject.currentStreak > 0 && (
                          <span className="b-badge b-badge-warning b-badge-sm">
                            🔥 {subject.currentStreak}
                          </span>
                        )}
                      {subject.accuracy !== undefined &&
                        subject.accuracy > 0 && (
                          <span className="b-badge b-badge-success b-badge-sm">
                            {Math.round(subject.accuracy)}% acc
                          </span>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Progress badge and caret */}
        <div className="flex items-center gap-3">
          {progress !== undefined && (
            <span
              className={`b-badge b-badge-${accentColor === 'neutral' ? 'default' : accentColor}`}
            >
              {Math.round(progress)}%
            </span>
          )}
          {isExpanded ? (
            <CaretUp size={18} weight="bold" className="b-text-muted" />
          ) : (
            <CaretDown size={18} weight="bold" className="b-text-muted" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="b-section-body b-bg-muted">{children}</div>
      )}
    </div>
  )
}
