'use client'

/**
 * SkillList
 *
 * Renders the list of skill trend rows with mini charts,
 * accuracy percentages, and trend badges. Supports expand/collapse.
 */

import { ChartLine } from '@phosphor-icons/react'
import type { SkillTrend } from './types'
import { MiniTrendChart } from './MiniTrendChart'
import { TrendBadge } from './TrendBadge'

interface SkillListProps {
  trends: SkillTrend[]
  displayedTrends: SkillTrend[]
  selectedSkill: string | null
  onSelectSkill: (skillId: string | null) => void
  showAll: boolean
  onShowAll: () => void
}

function getTrendColor(trend: SkillTrend['trend']): string {
  switch (trend) {
    case 'improving':
      return '#10b981'
    case 'declining':
      return '#f59e0b'
    default:
      return '#6b7280'
  }
}

export function SkillList({
  trends,
  displayedTrends,
  selectedSkill,
  onSelectSkill,
  showAll,
  onShowAll,
}: SkillListProps) {
  if (trends.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <ChartLine size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Complete more problems to see your learning trends.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            We&apos;ll show your progress after 5+ attempts per skill.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="space-y-2">
        {displayedTrends.map((trend) => (
          <button
            key={trend.skillId}
            onClick={() =>
              onSelectSkill(selectedSkill === trend.skillId ? null : trend.skillId)
            }
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              selectedSkill === trend.skillId
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-left">
                <div className="font-medium text-gray-900 text-sm">{trend.skillName}</div>
                <div className="text-xs text-gray-500">{trend.totalAttempts} attempts</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MiniTrendChart
                dataPoints={trend.dataPoints}
                color={getTrendColor(trend.trend)}
              />

              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {Math.round(trend.currentAccuracy * 100)}%
                </div>
                <TrendBadge trend={trend.trend} />
              </div>
            </div>
          </button>
        ))}

        {trends.length > 5 && !showAll && (
          <button
            onClick={onShowAll}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Show {trends.length - 5} more skills
          </button>
        )}
      </div>
    </div>
  )
}
