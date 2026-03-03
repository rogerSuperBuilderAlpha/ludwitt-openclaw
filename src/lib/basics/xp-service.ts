/**
 * XP Service
 * 
 * Centralized service for all XP operations:
 * - Awarding XP from AI grading
 * - Applying costs (hints, lookups, etc.)
 * - Updating all XP state (daily, WTD, MTD, YTD, allTime)
 * - Creating history records
 * 
 * All XP changes should flow through this service.
 */

import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { getTodayDate, getMondayOfCurrentWeek, getFirstOfCurrentMonth } from '@/lib/utils/date-helpers'
import { apiLogger } from '@/lib/logger'
import { logger } from '@/lib/logger'

// =============================================================================
// Types
// =============================================================================

export type XPSource =
  | 'math'
  | 'reading'
  | 'logic'
  | 'latin'
  | 'greek'
  | 'writing'
  | 'review'
  | 'challenge'
  | 'bonus'
  | 'focus-mode'

export interface XPTransaction {
  id?: string
  userId: string
  source: XPSource
  baseXP: number           // XP from AI grading
  costsApplied: number     // Costs deducted (hints, lookups, etc.)
  netXP: number            // Final XP earned (baseXP - costsApplied)
  focusModeMultiplier?: number  // If in focus mode
  problemId?: string       // Reference to the problem
  timestamp: string
  details?: {
    isCorrect?: boolean
    score?: number
    grade?: string
    timeSpent?: number
  }
}

export interface XPAwardResult {
  success: boolean
  netXP: number
  newDailyXP: number
  newAllTimeXP: number
  transactionId?: string
  error?: string
}

export interface AwardXPParams {
  userId: string
  source: XPSource
  baseXP: number
  costsIncurred?: number
  focusModeMultiplier?: number
  problemId?: string
  details?: XPTransaction['details']
}

// =============================================================================
// XP Service Functions
// =============================================================================

/**
 * Award XP to a user
 * This is the main entry point for all XP awards.
 * 
 * @param params - XP award parameters
 * @returns Result with new XP totals
 */
export async function awardXP(params: AwardXPParams): Promise<XPAwardResult> {
  const {
    userId,
    source,
    baseXP,
    costsIncurred = 0,
    focusModeMultiplier = 1,
    problemId,
    details
  } = params

  apiLogger.debug('xp-service', 'Award XP start', {
    data: { userId, source, baseXP, costsIncurred, focusModeMultiplier, problemId }
  })

  try {
    // Calculate net XP (pure math, before transaction)
    let netXP = Math.max(0, baseXP - costsIncurred)
    if (focusModeMultiplier > 1) {
      netXP = Math.round(netXP * focusModeMultiplier)
    }

    // Nothing to record
    if (netXP <= 0 && baseXP <= 0) {
      return { success: true, netXP: 0, newDailyXP: 0, newAllTimeXP: 0 }
    }

    const today = getTodayDate()
    const timestamp = new Date().toISOString()
    const subjectXPField = getSubjectXPField(source)

    // Run everything in a single Firestore transaction so balance updates,
    // xpHistory, subject XP, and the xpTransaction record are atomic.
    // This eliminates stale-read issues and ensures callers get accurate totals.
    const result = await db.runTransaction(async (txn) => {
      const userProgressRef = db.collection('userBasicsProgress').doc(userId)
      const userProgressDoc = await txn.get(userProgressRef)

      let newDailyXP: number
      let newTotalXP: number

      if (userProgressDoc.exists) {
        const data = userProgressDoc.data()!
        const isNewDay = data.lastActiveDate !== today

        // Compute new totals from the consistent transaction snapshot
        newDailyXP = isNewDay ? netXP : (data.dailyXP || 0) + netXP
        newTotalXP = (data.totalXP || 0) + netXP

        const updateData: Record<string, unknown> = {
          totalXP: newTotalXP,
          dailyXP: newDailyXP,
          lastActiveDate: today,
          [`xpHistory.${today}`]: FieldValue.increment(netXP),
          updatedAt: FieldValue.serverTimestamp()
        }
        if (subjectXPField) {
          updateData[subjectXPField] = FieldValue.increment(netXP)
        }
        // Track per-subject daily XP for bonus multiplier calculations
        if (subjectXPField) {
          updateData[`xpHistoryBySubject.${source}.${today}`] = FieldValue.increment(netXP)
        }

        txn.update(userProgressRef, updateData)
      } else {
        // Brand-new user — create the document
        newDailyXP = netXP
        newTotalXP = netXP
        txn.set(userProgressRef, {
          userId,
          dailyXP: netXP,
          totalXP: netXP,
          lastActiveDate: today,
          xpHistory: { [today]: netXP },
          xpHistoryBySubject: subjectXPField ? { [source]: { [today]: netXP } } : {},
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
          ...(subjectXPField ? { [subjectXPField]: netXP } : {})
        })
      }

      // XP transaction record — atomic with the balance update
      const txnRef = db.collection('xpTransactions').doc()
      txn.create(txnRef, {
        userId,
        source,
        baseXP,
        costsApplied: costsIncurred,
        netXP,
        focusModeMultiplier: focusModeMultiplier > 1 ? focusModeMultiplier : undefined,
        problemId,
        timestamp,
        details
      })

      return { newDailyXP, newTotalXP, transactionId: txnRef.id }
    })

    apiLogger.success('xp-service', 'XP awarded', {
      data: { netXP, newDailyXP: result.newDailyXP, newTotalXP: result.newTotalXP, transactionId: result.transactionId }
    })

    return {
      success: true,
      netXP,
      newDailyXP: result.newDailyXP,
      newAllTimeXP: result.newTotalXP,
      transactionId: result.transactionId
    }
  } catch (error) {
    logger.error('XpService', '========== AWARD XP FAILED ==========')
    logger.error('XpService', 'Error', { error: error })
    return {
      success: false,
      netXP: 0,
      newDailyXP: 0,
      newAllTimeXP: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get XP history for a user within a date range
 */
export async function getXPHistory(
  userId: string,
  startDate?: Date,
  endDate?: Date,
  limit: number = 50
): Promise<XPTransaction[]> {
  try {
    let query = db.collection('xpTransactions')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(limit)

    if (startDate) {
      query = query.where('timestamp', '>=', startDate.toISOString())
    }
    if (endDate) {
      query = query.where('timestamp', '<=', endDate.toISOString())
    }

    const snapshot = await query.get()
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as XPTransaction))
  } catch (error) {
    logger.error('XpService', 'Failed to get XP history', { error: error })
    return []
  }
}

/**
 * Get XP totals by time range for a user
 */
export async function getXPTotals(userId: string): Promise<{
  dailyXP: number
  wtdXP: number
  mtdXP: number
  ytdXP: number
  allTimeXP: number
}> {
  try {
    const userProgressRef = db.collection('userBasicsProgress').doc(userId)
    const doc = await userProgressRef.get()

    if (!doc.exists) {
      return { dailyXP: 0, wtdXP: 0, mtdXP: 0, ytdXP: 0, allTimeXP: 0 }
    }

    const data = doc.data()!
    const today = getTodayDate()
    const xpHistory = data.xpHistory || {}

    // Check if last active was today
    const dailyXP = data.lastActiveDate === today ? (data.dailyXP || 0) : 0
    const allTimeXP = data.totalXP || 0

    // Calculate time-ranged XP from history
    const weekStart = getMondayOfCurrentWeek()
    const monthStart = getFirstOfCurrentMonth()
    const yearStart = new Date(new Date().getFullYear(), 0, 1)

    let wtdXP = 0
    let mtdXP = 0
    let ytdXP = 0

    for (const [dateStr, xp] of Object.entries(xpHistory)) {
      const date = new Date(dateStr + 'T00:00:00')
      const xpAmount = xp as number

      if (date >= weekStart) wtdXP += xpAmount
      if (date >= monthStart) mtdXP += xpAmount
      if (date >= yearStart) ytdXP += xpAmount
    }

    return { dailyXP, wtdXP, mtdXP, ytdXP, allTimeXP }
  } catch (error) {
    logger.error('XpService', 'Failed to get XP totals', { error: error })
    return { dailyXP: 0, wtdXP: 0, mtdXP: 0, ytdXP: 0, allTimeXP: 0 }
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

function getSubjectXPField(source: XPSource): string | null {
  switch (source) {
    case 'math':
      return 'mathXP'
    case 'reading':
      return 'readingXP'
    case 'latin':
      return 'latinXP'
    case 'greek':
      return 'greekXP'
    case 'logic':
      return 'logicXP'
    case 'writing':
      return 'writingXP'
    default:
      return null
  }
}

/**
 * Calculate net XP after costs and multipliers
 * This is a pure function that can be used client-side for display
 */
export function calculateNetXP(
  baseXP: number,
  costsIncurred: number = 0,
  focusModeMultiplier: number = 1
): number {
  let netXP = Math.max(0, baseXP - costsIncurred)
  if (focusModeMultiplier > 1) {
    netXP = Math.round(netXP * focusModeMultiplier)
  }
  return netXP
}

