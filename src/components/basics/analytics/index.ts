/**
 * Learning Analytics Components
 *
 * These components make learning progress visible to students,
 * addressing the gap where students don't see improvement trends.
 */

export { LearningTrends } from './LearningTrends'

// Sub-components (available for standalone use if needed)
export { HistoricalTrendChart } from './HistoricalTrendChart'
export { InsightBanner } from './InsightBanner'
export { MasteryBadge } from './MasteryBadge'
export { MiniTrendChart } from './MiniTrendChart'
export { SkillDetail } from './SkillDetail'
export { SkillList } from './SkillList'
export { TrendBadge } from './TrendBadge'
export { WeeklyProgressFooter } from './WeeklyProgressFooter'

// Hook
export { useLearningTrendsData } from './useLearningTrendsData'

// Types
export type {
  SkillTrend,
  HistoricalDataPoint,
  LearningTrendsProps,
  TimeRange,
  InsightType,
  InsightMessage,
} from './types'
