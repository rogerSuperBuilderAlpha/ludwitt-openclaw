/**
 * API Route: POST /api/credits/sync
 * 
 * Recalculates and syncs the user's credit balance from transaction history.
 * Use this when the stored balance doesn't match the calculated balance.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { CREDIT_COLLECTIONS } from '@/lib/credits/types'
import { formatCentsAsDollars } from '@/lib/credits'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Get all transactions for the user
    const transactionsSnapshot = await db
      .collection(CREDIT_COLLECTIONS.TRANSACTIONS)
      .where('userId', '==', userId)
      .get()

    // Calculate totals from transaction history
    let totalDeposited = 0
    let totalUsed = 0
    let lastDepositAt: string | null = null
    let lastUsageAt: string | null = null

    transactionsSnapshot.docs.forEach(doc => {
      const tx = doc.data()
      if (tx.type === 'deposit') {
        totalDeposited += tx.amount
        if (!lastDepositAt || tx.createdAt > lastDepositAt) {
          lastDepositAt = tx.createdAt
        }
      } else if (tx.type === 'usage') {
        totalUsed += Math.abs(tx.amount)
        if (!lastUsageAt || tx.createdAt > lastUsageAt) {
          lastUsageAt = tx.createdAt
        }
      } else if (tx.type === 'refund') {
        // Refunds reduce total deposited
        totalDeposited = Math.max(0, totalDeposited + tx.amount) // tx.amount is negative for refunds
      }
    })

    // Calculate what balance should be
    const calculatedBalance = totalDeposited - totalUsed

    // Get current stored balance for comparison
    const userDoc = await db.collection('users').doc(userId).get()
    const currentCredits = userDoc.data()?.credits || {}
    const storedBalance = currentCredits.balance ?? 0

    // Update user document with correct values
    const timestamp = createISOTimestamp()
    await db.collection('users').doc(userId).set({
      credits: {
        balance: calculatedBalance,
        totalDeposited,
        totalUsed,
        lastDepositAt,
        lastUsageAt,
      },
      updatedAt: timestamp,
    }, { merge: true })

    return successResponse({
      synced: true,
      previousBalance: storedBalance,
      previousBalanceFormatted: formatCentsAsDollars(storedBalance),
      newBalance: calculatedBalance,
      newBalanceFormatted: formatCentsAsDollars(calculatedBalance),
      totalDeposited,
      totalDepositedFormatted: formatCentsAsDollars(totalDeposited),
      totalUsed,
      totalUsedFormatted: formatCentsAsDollars(totalUsed),
      transactionCount: transactionsSnapshot.size,
      balanceChanged: storedBalance !== calculatedBalance,
    })

  } catch (error) {
    return serverError(error, 'Failed to sync balance')
  }
}
