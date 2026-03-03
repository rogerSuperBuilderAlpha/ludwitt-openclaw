/**
 * API Route: GET /api/credits/balance
 * 
 * Returns the user's current credit balance and status
 */

import { NextRequest, NextResponse } from 'next/server'

// Disable caching - balance should always be fresh
export const dynamic = 'force-dynamic'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getUserCredits, isLowBalance, isAtDebtLimit } from '@/lib/credits/balance'
import { formatCentsAsDollars, CREDIT_CONSTANTS } from '@/lib/credits'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Get user credits
    const credits = await getUserCredits(userId)

    return successResponse({
      balance: credits.balance,
      balanceFormatted: formatCentsAsDollars(credits.balance),
      totalDeposited: credits.totalDeposited,
      totalDepositedFormatted: formatCentsAsDollars(credits.totalDeposited),
      totalUsed: credits.totalUsed,
      totalUsedFormatted: formatCentsAsDollars(credits.totalUsed),
      canUseAI: credits.balance >= CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS,
      isLowBalance: isLowBalance(credits.balance),
      isAtDebtLimit: isAtDebtLimit(credits.balance),
      debtLimit: CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS,
      debtLimitFormatted: formatCentsAsDollars(Math.abs(CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS)),
      lastDepositAt: credits.lastDepositAt || null,
      lastUsageAt: credits.lastUsageAt || null,
    })

  } catch (error) {
    return serverError(error, 'Failed to get balance')
  }
}
