/**
 * API Route: POST /api/progression/maintenance-check
 *
 * Checks if a bypass user missed their weekly XP requirement and charges $200 maintenance fee.
 * Called by section layouts on mount. Charges are idempotent per ISO week.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { deductCredits } from '@/lib/credits/balance'
import { getProgressionData } from '@/lib/progression/server'
import { evaluateProgression } from '@/lib/progression/gates'
import { apiLogger } from '@/lib/logger'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

const MAINTENANCE_FEE_CENTS = 20_000 // $200

/**
 * Get the current ISO week string (e.g., "2026-W09")
 */
function getCurrentISOWeek(): string {
  const now = new Date()
  const jan4 = new Date(now.getFullYear(), 0, 4)
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000) + 1
  const weekDay = jan4.getDay() || 7
  const weekNumber = Math.ceil((dayOfYear + weekDay - 1) / 7)
  return `${now.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const body = await request.json()
    const { section } = body as { section: string }

    if (!section || !['alc', 'developer'].includes(section)) {
      return badRequestError('Invalid section. Must be "alc" or "developer".')
    }

    // Read user bypass status
    const userDoc = await db.collection('users').doc(userId).get()
    const bypasses = userDoc.exists ? userDoc.data()?.gateBypassesPurchased || {} : {}

    // If no bypass for this section, no fee applies
    if (!bypasses[section]) {
      return successResponse({ feeCharged: false, reason: 'no_bypass' })
    }

    // Evaluate weekly XP
    const email = decodedToken.email || null
    const progressionData = await getProgressionData(userId, email)
    const status = evaluateProgression(progressionData)

    // If weekly XP is met, no fee
    if (status.weeklyXP.isMet) {
      return successResponse({ feeCharged: false, reason: 'xp_met' })
    }

    // Calculate current ISO week
    const currentWeek = getCurrentISOWeek()

    // Check if already charged this week
    const maintenanceFees = userDoc.exists ? userDoc.data()?.maintenanceFees || {} : {}
    const chargedWeeks: string[] = maintenanceFees.chargedWeeks || []

    if (chargedWeeks.includes(currentWeek)) {
      return successResponse({ feeCharged: false, reason: 'already_charged', week: currentWeek })
    }

    // Charge $200 maintenance fee via credit deduction
    await deductCredits(userId, MAINTENANCE_FEE_CENTS, {
      endpoint: 'maintenance-fee',
      model: 'n/a',
      inputTokens: 0,
      outputTokens: 0,
      rawCostCents: MAINTENANCE_FEE_CENTS,
      chargedCostCents: MAINTENANCE_FEE_CENTS,
    })

    // Track the charged week
    await db.collection('users').doc(userId).set({
      maintenanceFees: {
        chargedWeeks: FieldValue.arrayUnion(currentWeek),
        totalCharged: FieldValue.increment(MAINTENANCE_FEE_CENTS),
        lastChargedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    }, { merge: true })

    apiLogger.success('progression/maintenance-check', `Maintenance fee charged: $200 for user ${userId}, week ${currentWeek}, section ${section}`)

    return successResponse({ feeCharged: true, amount: MAINTENANCE_FEE_CENTS, week: currentWeek })
  } catch (error) {
    apiLogger.apiError('progression/maintenance-check', 'Failed to check maintenance fee', error)
    return serverError(error, 'Failed to check maintenance fee')
  }
}
