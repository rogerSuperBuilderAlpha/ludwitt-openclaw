/**
 * ProgressDisplay Component
 *
 * Displays progress visualization including:
 * - Progress bar with percentage
 * - Questions needed to advance
 */

import { Target } from '@phosphor-icons/react'

interface ProgressDisplayProps {
  grade: number
  progress: number
  questionsToNext: number
  barColor: string
}

export function ProgressDisplay({
  grade,
  progress,
  questionsToNext,
  barColor,
}: ProgressDisplayProps) {
  const nextGrade = Math.min(grade + 1, 12)

  return (
    <>
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium b-text-secondary">Progress to Grade {nextGrade}</span>
          <span className="font-bold b-text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-b-border rounded-full overflow-hidden">
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Questions to Next */}
      <div className="flex items-center gap-2 text-sm b-text-secondary">
        <Target size={16} className="b-text-muted" />
        <span>
          {progress >= 100 ? (
            <span className="text-b-reading font-medium">Ready to advance! Complete daily XP goal.</span>
          ) : (
            <>~<strong>{questionsToNext}</strong> more correct answers to Grade {nextGrade}</>
          )}
        </span>
      </div>
    </>
  )
}
