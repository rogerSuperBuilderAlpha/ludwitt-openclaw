'use client'

/**
 * WeeklyProgressFooter
 *
 * Footer banner showing the weekly accuracy improvement with a motivational message.
 */

import { TrendUp } from '@phosphor-icons/react'

interface WeeklyProgressFooterProps {
  overallAccuracy: number
  previousOverallAccuracy: number
}

export function WeeklyProgressFooter({
  overallAccuracy,
  previousOverallAccuracy,
}: WeeklyProgressFooterProps) {
  const improvement = Math.round((overallAccuracy - previousOverallAccuracy) * 100)

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-gray-100">
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">This Week:</span>
          <span className="text-lg font-bold text-gray-400 line-through">
            {Math.round(previousOverallAccuracy * 100)}%
          </span>
          <TrendUp size={20} weight="bold" className="text-emerald-500" />
          <span className="text-lg font-bold text-emerald-600">
            {Math.round(overallAccuracy * 100)}%
          </span>
        </div>
        <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
          +{improvement}%
        </span>
      </div>
      <p className="text-xs text-gray-500 text-center mt-1">
        Your hard work is paying off! Keep practicing to maintain your streak.
      </p>
    </div>
  )
}
