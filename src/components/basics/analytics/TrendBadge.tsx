'use client'

/**
 * TrendBadge
 *
 * Displays a colored badge indicating whether a skill is improving, stable, or declining.
 */

import { TrendUp, TrendDown } from '@phosphor-icons/react'

interface TrendBadgeProps {
  trend: 'improving' | 'stable' | 'declining'
}

export function TrendBadge({ trend }: TrendBadgeProps) {
  if (trend === 'improving') {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
        <TrendUp size={12} weight="bold" />
        Improving
      </span>
    )
  }
  if (trend === 'declining') {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
        <TrendDown size={12} weight="bold" />
        Needs Focus
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
      Stable
    </span>
  )
}
