/**
 * XP Helper Utilities
 * 
 * Legacy helpers for pronunciation/reading-aloud scoring.
 * 
 * ⚠️ DEPRECATED: For new code, use:
 *   - xp-config.ts for calculations
 *   - xp-service.ts for awarding XP
 * 
 * ⚠️ CLIENT-SAFE: This file contains no server-only imports.
 */

import { getTodayDate } from '@/lib/utils/date-helpers'

// Re-export from xp-config for backwards compatibility
export { calculateXPByTimeRange } from './xp-config'

export interface XPUpdateData {
  subject: 'math' | 'reading'
  points: number
  currentSubjectXP: number
  currentTotalXP: number
  currentDailyXP: number
  lastActiveDate: string
}

export interface XPUpdateResult {
  newSubjectXP: number
  newTotalXP: number
  newDailyXP: number
  isNewDay: boolean
  todayDate: string
}

/**
 * Calculate new XP values after adding points
 * @deprecated Use awardXP from xp-service.ts for new code
 */
export function calculateXPUpdate(data: XPUpdateData): XPUpdateResult {
  const todayDate = getTodayDate()
  const isNewDay = data.lastActiveDate !== todayDate
  
  const newSubjectXP = data.currentSubjectXP + data.points
  const newTotalXP = data.currentTotalXP + data.points
  const newDailyXP = isNewDay ? data.points : data.currentDailyXP + data.points
  
  return {
    newSubjectXP,
    newTotalXP,
    newDailyXP,
    isNewDay,
    todayDate
  }
}

/**
 * Calculate XP deduction (for costs)
 * @deprecated Use calculateNetXP from xp-config.ts
 */
export function calculateXPDeduction(
  currentXP: number,
  cost: number
): number {
  return Math.max(0, currentXP - cost)
}
