/**
 * Shared types for Learning Trends analytics components.
 */

export interface SkillTrend {
  skillId: string
  skillName: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  dataPoints: {
    date: string // YYYY-MM-DD
    accuracy: number // 0-1
    problemCount: number
  }[]
  currentAccuracy: number
  previousAccuracy: number
  trend: 'improving' | 'stable' | 'declining'
  totalAttempts: number
  masteryLevel: 'struggling' | 'learning' | 'proficient' | 'mastered'
}

/** Historical data for long-term trend visualization */
export interface HistoricalDataPoint {
  date: string // YYYY-MM-DD
  accuracy: number // 0-1
  problemCount: number
  xpEarned: number
}

export interface LearningTrendsProps {
  trends?: SkillTrend[]
  overallAccuracy?: number
  previousOverallAccuracy?: number
  streak?: number
  onPracticeSkill?: (skillId: string) => void
  /** Historical data for long-term trends (30-day, 90-day, all-time) */
  historicalData?: {
    thirtyDay: HistoricalDataPoint[]
    ninetyDay: HistoricalDataPoint[]
    allTime: HistoricalDataPoint[]
  }
  /** Date when user started learning */
  learningStartDate?: string
  /** Total problems attempted all-time */
  totalProblemsAllTime?: number
  /** Best streak achieved */
  bestStreak?: number
}

export type TimeRange = '7d' | '30d' | '90d' | 'all'

export type InsightType = 'focus' | 'celebrate' | 'encourage'

export interface InsightMessage {
  type: InsightType
  message: string
}
