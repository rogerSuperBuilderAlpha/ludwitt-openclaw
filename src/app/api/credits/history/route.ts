/**
 * API Route: GET /api/credits/history
 * 
 * Returns the user's credit transaction history
 */

import { NextRequest, NextResponse } from 'next/server'

// Disable caching - history should always be fresh
export const dynamic = 'force-dynamic'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getTransactionHistory, getTransactionCount } from '@/lib/credits/balance'
import { formatCentsAsDollars } from '@/lib/credits/pricing'
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

    // Get query params
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)

    // Get transaction history and total count in parallel
    const [transactions, totalCount] = await Promise.all([
      getTransactionHistory(userId, limit),
      getTransactionCount(userId)
    ])

    // Format transactions for display
    const formattedTransactions = transactions.map(tx => ({
      ...tx,
      amountFormatted: formatCentsAsDollars(Math.abs(tx.amount)),
      balanceAfterFormatted: formatCentsAsDollars(tx.balanceAfter),
      isDebit: tx.amount < 0,
    }))

    return successResponse({
      transactions: formattedTransactions,
      count: formattedTransactions.length,
      totalCount, // Actual total number of transactions (may be higher than returned count)
    })

  } catch (error) {
    return serverError(error, 'Failed to get transaction history')
  }
}
