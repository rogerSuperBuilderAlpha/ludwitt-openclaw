'use client'

/**
 * SkillDetail
 *
 * Expanded panel showing detailed stats for a selected skill,
 * including current/previous accuracy, change, and a practice button.
 */

import { Target, ArrowRight } from '@phosphor-icons/react'
import type { SkillTrend } from './types'
import { MasteryBadge } from './MasteryBadge'

interface SkillDetailProps {
  trend: SkillTrend
  onPracticeSkill?: (skillId: string) => void
}

export function SkillDetail({ trend, onPracticeSkill }: SkillDetailProps) {
  const change = trend.currentAccuracy - trend.previousAccuracy
  const changeLabel = `${change >= 0 ? '+' : ''}${Math.round(change * 100)}%`

  return (
    <div className="border-t border-gray-100 p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{trend.skillName}</h4>
        <MasteryBadge level={trend.masteryLevel} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Current</div>
          <div className="text-lg font-bold text-gray-900">
            {Math.round(trend.currentAccuracy * 100)}%
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Previous</div>
          <div className="text-lg font-bold text-gray-900">
            {Math.round(trend.previousAccuracy * 100)}%
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Change</div>
          <div
            className={`text-lg font-bold ${
              trend.trend === 'improving'
                ? 'text-emerald-600'
                : trend.trend === 'declining'
                ? 'text-amber-600'
                : 'text-gray-600'
            }`}
          >
            {changeLabel}
          </div>
        </div>
      </div>

      {onPracticeSkill && (
        <button
          onClick={() => onPracticeSkill(trend.skillId)}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Target size={18} weight="fill" />
          Practice This Skill
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  )
}
