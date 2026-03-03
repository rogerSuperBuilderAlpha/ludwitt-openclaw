/**
 * XP Helper Utilities - SERVER ONLY
 * 
 * Legacy helpers for pronunciation/reading-aloud scoring.
 * 
 * ⚠️ DEPRECATED: For new code, use xp-service.ts awardXP()
 * 
 * For client-safe utilities, import from './xp-helpers' instead.
 */

import { Timestamp } from 'firebase-admin/firestore'
import { XPUpdateResult } from './xp-helpers'

/**
 * Get XP update fields for Firestore transaction
 * SERVER-ONLY: Uses firebase-admin Timestamp
 * 
 * @deprecated Use awardXP from xp-service.ts for new code
 */
export function getXPUpdateFields(
  subject: 'math' | 'reading',
  result: XPUpdateResult
): Record<string, any> {
  return {
    [`${subject}.totalXP`]: result.newSubjectXP,
    'totalXP': result.newTotalXP,
    'dailyXP': result.newDailyXP,
    'lastActiveDate': result.todayDate,
    [`${subject}.lastActivity`]: Timestamp.now(),
    'updatedAt': Timestamp.now(),
    [`xpHistory.${result.todayDate}`]: result.newDailyXP
  }
}
