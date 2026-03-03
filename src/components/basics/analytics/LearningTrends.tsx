'use client'

/**
 * LearningTrends Component
 *
 * Shows historical accuracy trends and learning progress over time.
 * Addresses the learning science gap: students don't see their improvement.
 *
 * Features:
 * - Accuracy chart showing improvement over time
 * - Skill-specific trend analysis
 * - Personalized insights and recommendations
 * - Celebrates improvement to boost motivation
 */

import {
  ChartLine,
  Fire,
  CalendarBlank,
  ArrowRight,
} from '@phosphor-icons/react'
import type { LearningTrendsProps } from './types'
import { useLearningTrendsData } from './useLearningTrendsData'
import { TrendBadge } from './TrendBadge'
import { InsightBanner } from './InsightBanner'
import { SkillList } from './SkillList'
import { SkillDetail } from './SkillDetail'
import { HistoricalTrendChart } from './HistoricalTrendChart'
import { WeeklyProgressFooter } from './WeeklyProgressFooter'

export function LearningTrends({
  trends,
  overallAccuracy = 0.72,
  previousOverallAccuracy = 0.65,
  streak = 3,
  onPracticeSkill,
  historicalData,
  learningStartDate = '2025-12-01',
  totalProblemsAllTime = 217,
  bestStreak = 7,
}: LearningTrendsProps) {
  const {
    resolvedTrends,
    displayedTrends,
    overallTrend,
    insightMessage,
    selectedSkill,
    setSelectedSkill,
    selectedTrend,
    showAll,
    setShowAll,
    showHistorical,
    setShowHistorical,
    historicalTimeRange,
    setHistoricalTimeRange,
    historicalDataToUse,
  } = useLearningTrendsData({
    trends,
    overallAccuracy,
    previousOverallAccuracy,
    historicalData,
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChartLine size={22} weight="fill" className="text-blue-600" />
            <h3 className="font-bold text-gray-900">Your Learning Trends</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Overall Accuracy</div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-gray-900">
                  {Math.round(overallAccuracy * 100)}%
                </span>
                <TrendBadge trend={overallTrend} />
              </div>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full">
                <Fire size={16} weight="fill" className="text-orange-500" />
                <span className="text-sm font-bold text-orange-600">
                  {streak} day streak
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <InsightBanner insight={insightMessage} />

      {/* Skills List */}
      <SkillList
        trends={resolvedTrends}
        displayedTrends={displayedTrends}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkill}
        showAll={showAll}
        onShowAll={() => setShowAll(true)}
      />

      {/* Expanded Skill Detail */}
      {selectedTrend && (
        <SkillDetail trend={selectedTrend} onPracticeSkill={onPracticeSkill} />
      )}

      {/* Historical Trends Toggle */}
      <div className="px-4 py-3 border-t border-gray-100">
        <button
          onClick={() => setShowHistorical(!showHistorical)}
          className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <CalendarBlank size={18} weight="fill" className="text-blue-600" />
            <span className="font-medium text-gray-700">
              View Historical Progress
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              30-day, 90-day, all-time
            </span>
            <ArrowRight
              size={16}
              className={`text-gray-400 transition-transform ${showHistorical ? 'rotate-90' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Historical Trend Chart (expandable) */}
      {showHistorical && (
        <div className="px-4 pb-4">
          <HistoricalTrendChart
            data={historicalDataToUse}
            timeRange={historicalTimeRange}
            onTimeRangeChange={setHistoricalTimeRange}
            learningStartDate={learningStartDate}
            totalProblems={totalProblemsAllTime}
            bestStreak={bestStreak}
          />
        </div>
      )}

      {/* Footer */}
      <WeeklyProgressFooter
        overallAccuracy={overallAccuracy}
        previousOverallAccuracy={previousOverallAccuracy}
      />
    </div>
  )
}

// Preserve default export for backward compatibility with existing imports
