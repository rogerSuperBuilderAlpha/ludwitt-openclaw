'use client'

/**
 * useLearningTrendsData Hook
 *
 * Encapsulates all data transformation and state management
 * for the LearningTrends component.
 */

import { useState, useMemo } from 'react'
import type { SkillTrend, HistoricalDataPoint, TimeRange, InsightMessage } from './types'
import { DEFAULT_TRENDS, DEFAULT_HISTORICAL_DATA } from './constants'

interface UseLearningTrendsDataParams {
  trends?: SkillTrend[]
  overallAccuracy?: number
  previousOverallAccuracy?: number
  historicalData?: {
    thirtyDay: HistoricalDataPoint[]
    ninetyDay: HistoricalDataPoint[]
    allTime: HistoricalDataPoint[]
  }
}

interface UseLearningTrendsDataReturn {
  /** The resolved trends array (defaults applied) */
  resolvedTrends: SkillTrend[]
  /** Trends sorted by priority (declining first) */
  sortedTrends: SkillTrend[]
  /** Trends currently displayed (respects showAll toggle) */
  displayedTrends: SkillTrend[]
  /** Overall trend direction */
  overallTrend: 'improving' | 'stable' | 'declining'
  /** Skills needing attention */
  skillsNeedingFocus: SkillTrend[]
  /** Skills showing improvement */
  improvingSkills: SkillTrend[]
  /** Personalized insight message */
  insightMessage: InsightMessage
  /** Currently selected skill ID */
  selectedSkill: string | null
  /** Set the selected skill */
  setSelectedSkill: (skillId: string | null) => void
  /** The full SkillTrend for the selected skill */
  selectedTrend: SkillTrend | undefined
  /** Whether all skills are shown */
  showAll: boolean
  /** Toggle showing all skills */
  setShowAll: (show: boolean) => void
  /** Currently selected historical time range */
  historicalTimeRange: TimeRange
  /** Set the historical time range */
  setHistoricalTimeRange: (range: TimeRange) => void
  /** Whether the historical chart is expanded */
  showHistorical: boolean
  /** Toggle the historical chart */
  setShowHistorical: (show: boolean) => void
  /** Historical data to render (resolved from props or defaults) */
  historicalDataToUse: HistoricalDataPoint[]
}

export function useLearningTrendsData({
  trends,
  overallAccuracy = 0.72,
  previousOverallAccuracy = 0.65,
  historicalData,
}: UseLearningTrendsDataParams): UseLearningTrendsDataReturn {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [historicalTimeRange, setHistoricalTimeRange] = useState<TimeRange>('30d')
  const [showHistorical, setShowHistorical] = useState(false)

  const resolvedTrends = trends ?? DEFAULT_TRENDS
  const historicalDataToUse = historicalData?.allTime ?? DEFAULT_HISTORICAL_DATA

  const overallTrend = useMemo(() => {
    const diff = overallAccuracy - previousOverallAccuracy
    if (diff > 0.05) return 'improving' as const
    if (diff < -0.05) return 'declining' as const
    return 'stable' as const
  }, [overallAccuracy, previousOverallAccuracy])

  const sortedTrends = useMemo(() => {
    return [...resolvedTrends].sort((a, b) => {
      const priorityOrder = { declining: 0, stable: 1, improving: 2 }
      return priorityOrder[a.trend] - priorityOrder[b.trend]
    })
  }, [resolvedTrends])

  const displayedTrends = showAll ? sortedTrends : sortedTrends.slice(0, 5)

  const skillsNeedingFocus = useMemo(
    () => resolvedTrends.filter(t => t.trend === 'declining' || t.masteryLevel === 'struggling'),
    [resolvedTrends]
  )

  const improvingSkills = useMemo(
    () => resolvedTrends.filter(t => t.trend === 'improving'),
    [resolvedTrends]
  )

  const insightMessage = useMemo((): InsightMessage => {
    if (skillsNeedingFocus.length > 0) {
      const skill = skillsNeedingFocus[0]
      return {
        type: 'focus',
        message: `Focus on "${skill.skillName}" – your accuracy dropped from ${Math.round(skill.previousAccuracy * 100)}% to ${Math.round(skill.currentAccuracy * 100)}%. Practice makes perfect!`
      }
    }
    if (improvingSkills.length > 0) {
      const skill = improvingSkills[0]
      const improvement = Math.round((skill.currentAccuracy - skill.previousAccuracy) * 100)
      return {
        type: 'celebrate',
        message: `Great progress on "${skill.skillName}"! Your accuracy improved by ${improvement}%. Keep it up!`
      }
    }
    if (overallAccuracy >= 0.85) {
      return {
        type: 'celebrate',
        message: `Excellent work! Your overall accuracy is ${Math.round(overallAccuracy * 100)}%. You're mastering this material!`
      }
    }
    return {
      type: 'encourage',
      message: `Keep practicing! Every problem you solve strengthens your understanding.`
    }
  }, [skillsNeedingFocus, improvingSkills, overallAccuracy])

  const selectedTrend = resolvedTrends.find(t => t.skillId === selectedSkill)

  return {
    resolvedTrends,
    sortedTrends,
    displayedTrends,
    overallTrend,
    skillsNeedingFocus,
    improvingSkills,
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
  }
}
