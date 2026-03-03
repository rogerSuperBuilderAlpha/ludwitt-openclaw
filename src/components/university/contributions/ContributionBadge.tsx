'use client'

import { GitFork } from '@phosphor-icons/react'
import type { ContributionBadgeType } from '@/lib/types/university'

interface ContributionBadgeProps {
  badgeType: ContributionBadgeType
  size?: number
}

const BADGE_CONFIG: Record<ContributionBadgeType, { label: string; color: string }> = {
  'contributor-bronze': { label: 'Bronze Contributor', color: 'text-amber-700' },
  'contributor-silver': { label: 'Silver Contributor', color: 'text-gray-400' },
  'contributor-gold': { label: 'Gold Contributor', color: 'text-yellow-500' },
}

export function ContributionBadge({ badgeType, size = 16 }: ContributionBadgeProps) {
  const config = BADGE_CONFIG[badgeType]

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${config.color}`} title={config.label}>
      <GitFork size={size} weight="fill" />
      {config.label}
    </span>
  )
}
