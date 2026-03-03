/**
 * Server-side Progression Gate Checking
 *
 * Uses Firebase Admin SDK to evaluate gates in API routes.
 */

import { db } from '@/lib/firebase/admin'
import { getMondayOfCurrentWeek } from '@/lib/utils/date-helpers'
import { evaluateProgression } from './gates'
import type { ProgressionData, ProgressionStage, ProgressionGatesStatus } from './types'

/**
 * Get the Monday of the previous week
 */
function getMondayOfLastWeek(): Date {
  const monday = getMondayOfCurrentWeek()
  monday.setDate(monday.getDate() - 7)
  return monday
}

function getSundayOfLastWeek(): Date {
  const monday = getMondayOfCurrentWeek()
  const sunday = new Date(monday)
  sunday.setMilliseconds(-1)
  return sunday
}

function sumXPInRange(
  xpHistory: Record<string, number> | undefined,
  start: Date,
  end: Date
): number {
  if (!xpHistory) return 0
  let total = 0
  for (const [dateStr, xp] of Object.entries(xpHistory)) {
    const date = new Date(dateStr + 'T00:00:00')
    if (date >= start && date <= end) {
      total += xp
    }
  }
  return total
}

function sumSubjectXPInRange(
  xpHistoryBySubject: Record<string, Record<string, number>> | undefined,
  subject: string,
  start: Date,
  end: Date
): number {
  if (!xpHistoryBySubject?.[subject]) return 0
  const subjectHistory = xpHistoryBySubject[subject]
  let total = 0
  for (const [dateStr, xp] of Object.entries(subjectHistory)) {
    const date = new Date(dateStr + 'T00:00:00')
    if (date >= start && date <= end) {
      total += xp
    }
  }
  return total
}

/**
 * Fetch all progression data for a user server-side
 */
export async function getProgressionData(userId: string, email: string | null): Promise<ProgressionData> {
  // Fetch bypass status from user document
  const userDoc = await db.collection('users').doc(userId).get()
  const bypasses = userDoc.exists ? userDoc.data()?.gateBypassesPurchased || {} : {}

  // Fetch userBasicsProgress
  const progressDoc = await db.collection('userBasicsProgress').doc(userId).get()
  const progressData = progressDoc.exists ? progressDoc.data() : null

  const mathDifficulty = progressData?.math?.currentDifficulty ?? 0
  const readingDifficulty = progressData?.reading?.currentDifficulty ?? 0

  // Fetch completed projects
  const projectsSnapshot = await db.collection('projects')
    .where('userId', '==', userId)
    .where('completed', '==', true)
    .get()
  const projectsCompleted = projectsSnapshot.size

  // Check deployment
  const deploymentDoc = await db.collection('vercelDeploymentProgress').doc(userId).get()
  const deploymentVerified = deploymentDoc.exists && deploymentDoc.data()?.completed === true

  // Weekly XP
  const xpHistory = progressData?.xpHistory as Record<string, number> | undefined
  const xpHistoryBySubject = progressData?.xpHistoryBySubject as Record<string, Record<string, number>> | undefined

  const weekStart = getMondayOfCurrentWeek()
  const now = new Date()
  const lastWeekStart = getMondayOfLastWeek()
  const lastWeekEnd = getSundayOfLastWeek()

  const currentWeekXP = sumXPInRange(xpHistory, weekStart, now)
  const lastWeekXP = sumXPInRange(xpHistory, lastWeekStart, lastWeekEnd)
  const logicXP = sumSubjectXPInRange(xpHistoryBySubject, 'logic', weekStart, now)
  const writingXP = sumSubjectXPInRange(xpHistoryBySubject, 'writing', weekStart, now)

  return {
    email,
    mathDifficulty,
    readingDifficulty,
    projectsCompleted,
    deploymentVerified,
    currentWeekXP,
    lastWeekXP,
    logicXP,
    writingXP,
    alcBypassPurchased: !!bypasses.alc,
    developerBypassPurchased: !!bypasses.developer,
  }
}

/**
 * Check if a user has access to a required stage.
 * Returns the full status for richer error responses.
 */
export async function requireStage(
  userId: string,
  requiredStage: ProgressionStage,
  email: string | null
): Promise<{ allowed: boolean; status: ProgressionGatesStatus }> {
  const data = await getProgressionData(userId, email)
  const status = evaluateProgression(data)

  let allowed = false
  switch (requiredStage) {
    case 'basics':
      allowed = status.canAccessBasics
      break
    case 'alc':
      allowed = status.canAccessALC
      break
    case 'developer':
      allowed = status.canAccessDeveloper
      break
  }

  return { allowed, status }
}
