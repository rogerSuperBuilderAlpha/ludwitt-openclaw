/**
 * SubjectCard Component
 *
 * A comprehensive card displaying subject progress including:
 * - Header with emoji, name, and grade badge
 * - Progress visualization
 * - Stats
 * - Expandable curriculum view
 */

'use client'

import { SubjectCardProps, ColorClasses } from './types'
import { GradeSelector } from './GradeSelector'
import { ProgressDisplay } from './ProgressDisplay'
import { CurriculumView } from './CurriculumView'

const COLOR_CLASSES: Record<string, ColorClasses> = {
  blue: {
    bg: 'b-bg-math-light',
    border: 'b-border-math',
    badge: 'b-bg-math-light b-text-math',
    bar: 'b-bg-math',
    light: 'b-bg-math-light',
  },
  green: {
    bg: 'b-bg-reading-light',
    border: 'b-border-reading',
    badge: 'b-bg-reading-light b-text-reading',
    bar: 'b-bg-reading',
    light: 'b-bg-reading-light',
  },
  amber: {
    bg: 'b-bg-writing-light',
    border: 'b-border-writing',
    badge: 'b-bg-writing-light b-text-writing',
    bar: 'b-bg-writing',
    light: 'b-bg-writing-light',
  },
  purple: {
    bg: 'b-bg-logic-light',
    border: 'b-border-logic',
    badge: 'b-bg-logic-light b-text-logic',
    bar: 'b-bg-logic',
    light: 'b-bg-logic-light',
  },
  indigo: {
    bg: 'b-bg-greek-light',
    border: 'b-border-greek',
    badge: 'b-bg-greek-light b-text-greek',
    bar: 'b-bg-greek',
    light: 'b-bg-greek-light',
  },
}

export function SubjectCard({
  name,
  emoji,
  grade,
  progress,
  questionsToNext,
  totalCompleted,
  accuracy,
  streak,
  xp,
  curriculum,
  color,
  isLocked,
}: SubjectCardProps) {
  const colors = COLOR_CLASSES[color]

  return (
    <div className={`rounded-xl border-2 ${colors.border} overflow-hidden`}>
      {/* Header */}
      <div className={`${colors.bg} p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <span className="font-bold b-text-primary text-lg">{name}</span>
          </div>
          <GradeSelector grade={grade} progress={progress} isLocked={isLocked} badgeColor={colors.badge} />
        </div>

        <ProgressDisplay
          grade={grade}
          progress={progress}
          questionsToNext={questionsToNext}
          barColor={colors.bar}
        />
      </div>

      {/* Stats Row */}
      <div className="px-4 py-3 b-bg-card border-t border-b-border-light grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-bold b-text-primary">{totalCompleted}</div>
          <div className="text-xs b-text-muted">Completed</div>
        </div>
        <div>
          <div className="text-lg font-bold text-b-reading">
            {accuracy !== undefined ? `${Math.round(accuracy * 100)}%` : `${xp} XP`}
          </div>
          <div className="text-xs b-text-muted">{accuracy !== undefined ? 'Accuracy' : 'Earned'}</div>
        </div>
        <div>
          <div className="text-lg font-bold text-b-writing">
            {streak !== undefined ? streak : Math.floor(xp / 100) + 1}
          </div>
          <div className="text-xs b-text-muted">{streak !== undefined ? 'Streak' : 'Level'}</div>
        </div>
      </div>

      {/* Curriculum View */}
      <CurriculumView grade={grade} curriculum={curriculum} lightColor={colors.light} />
    </div>
  )
}
