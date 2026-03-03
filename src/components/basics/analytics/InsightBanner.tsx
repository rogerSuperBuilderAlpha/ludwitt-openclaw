'use client'

/**
 * InsightBanner
 *
 * Displays a personalized insight/recommendation banner
 * based on the student's learning trend analysis.
 */

import { Lightbulb } from '@phosphor-icons/react'
import type { InsightMessage } from './types'

interface InsightBannerProps {
  insight: InsightMessage
}

const STYLE_MAP = {
  celebrate: {
    bg: 'bg-emerald-50 border-b border-emerald-100',
    icon: 'text-emerald-600',
    text: 'text-emerald-700',
  },
  focus: {
    bg: 'bg-amber-50 border-b border-amber-100',
    icon: 'text-amber-600',
    text: 'text-amber-700',
  },
  encourage: {
    bg: 'bg-blue-50 border-b border-blue-100',
    icon: 'text-blue-600',
    text: 'text-blue-700',
  },
} as const

export function InsightBanner({ insight }: InsightBannerProps) {
  const styles = STYLE_MAP[insight.type]

  return (
    <div className={`px-4 py-3 ${styles.bg}`}>
      <div className="flex items-start gap-2">
        <Lightbulb size={18} weight="fill" className={styles.icon} />
        <p className={`text-sm ${styles.text}`}>{insight.message}</p>
      </div>
    </div>
  )
}
