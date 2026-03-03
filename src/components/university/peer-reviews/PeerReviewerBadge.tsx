'use client'

import { Medal } from '@phosphor-icons/react'
import type { PeerReviewBadgeType } from '@/lib/types/university'

interface PeerReviewerBadgeProps {
  badgeType: PeerReviewBadgeType
  size?: number
}

const BADGE_CONFIG: Record<PeerReviewBadgeType, { label: string; color: string }> = {
  'peer-reviewer-bronze': { label: 'Bronze Reviewer', color: 'text-amber-700' },
  'peer-reviewer-silver': { label: 'Silver Reviewer', color: 'text-gray-400' },
  'peer-reviewer-gold': { label: 'Gold Reviewer', color: 'text-yellow-500' },
}

export function PeerReviewerBadge({ badgeType, size = 16 }: PeerReviewerBadgeProps) {
  const config = BADGE_CONFIG[badgeType]

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${config.color}`} title={config.label}>
      <Medal size={size} weight="fill" />
      {config.label}
    </span>
  )
}
