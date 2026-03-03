/**
 * GradeSelector Component
 *
 * Displays the current grade level badge with lock/advancement indicators
 */

import { Lock, Sparkle } from '@phosphor-icons/react'

interface GradeSelectorProps {
  grade: number
  progress: number
  isLocked: boolean
  badgeColor: string
}

export function GradeSelector({ grade, progress, isLocked, badgeColor }: GradeSelectorProps) {
  return (
    <div className={`px-3 py-1 rounded-full text-sm font-bold ${badgeColor} flex items-center gap-1`}>
      Grade {grade}
      {isLocked && progress >= 95 && <Lock size={14} weight="fill" className="text-b-warning" />}
      {!isLocked && progress >= 95 && (
        <Sparkle size={14} weight="fill" className="text-b-writing animate-pulse" />
      )}
    </div>
  )
}
