'use client'

/**
 * MasteryBadge
 *
 * Displays a colored badge indicating skill mastery level.
 */

interface MasteryBadgeProps {
  level: 'struggling' | 'learning' | 'proficient' | 'mastered'
}

const MASTERY_CONFIG = {
  struggling: { bg: 'bg-red-100', text: 'text-red-700', label: 'Struggling' },
  learning: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Learning' },
  proficient: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Proficient' },
  mastered: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Mastered' },
} as const

export function MasteryBadge({ level }: MasteryBadgeProps) {
  const { bg, text, label } = MASTERY_CONFIG[level]

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${bg} ${text}`}>
      {label}
    </span>
  )
}
