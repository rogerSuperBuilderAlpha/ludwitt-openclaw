/**
 * Independent Study Skip Prerequisites API
 * 
 * POST - Pay 100 credits ($1) to skip prerequisites and unlock Independent Study
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponseFlat } from '@/lib/api/response-helpers'
import { checkBasicsBalance, deductCredits } from '@/lib/credits'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

export const dynamic = 'force-dynamic'

const SKIP_PREREQS_COST = 10000 // 10,000 credits = $100.00

/**
 * POST - Skip prerequisites by paying 100 credits
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/basics/independent-study/skip-prereqs'
  
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    if (!db) {
      return serverError(new Error('Database unavailable'), 'Database unavailable')
    }

    // Check if user already has skip access
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()
    const userData = userDoc.data()

    if (userData?.independentStudyUnlocked) {
      return successResponseFlat({
        message: 'Independent Study already unlocked',
        alreadyUnlocked: true
      })
    }

    // Check credits balance
    const creditCheck = await checkBasicsBalance(userId)
    if (!creditCheck.allowed || creditCheck.currentBalance < SKIP_PREREQS_COST) {
      return NextResponse.json({
        success: false,
        error: 'Insufficient credits',
        required: SKIP_PREREQS_COST,
        available: creditCheck.currentBalance,
        message: `You need ${SKIP_PREREQS_COST.toLocaleString()} credits ($100) to skip prerequisites. You have ${creditCheck.currentBalance} credits.`
      }, { status: 402 })
    }

    // Deduct credits (using usage metadata format with 0 tokens since this is a flat fee)
    const { newBalance } = await deductCredits(userId, SKIP_PREREQS_COST, {
      endpoint,
      model: 'flat_fee',
      inputTokens: 0,
      outputTokens: 0,
      rawCostCents: SKIP_PREREQS_COST,
      chargedCostCents: SKIP_PREREQS_COST,
      source: 'ai_call' // Using existing source type
    })

    // Mark user as having skipped prerequisites
    await userRef.set({
      independentStudyUnlocked: true,
      independentStudyUnlockedAt: FieldValue.serverTimestamp(),
      independentStudyUnlockMethod: 'paid_skip' // vs 'completed_prereqs'
    }, { merge: true })

    return successResponseFlat({
      message: 'Independent Study unlocked!',
      creditsCharged: SKIP_PREREQS_COST,
      newBalance
    })

  } catch (error) {
    return serverError(error, 'Failed to process skip payment')
  }
}

/**
 * GET - Check if user has skipped prerequisites
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    if (!db) {
      return successResponseFlat({ hasSkipped: false })
    }

    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()

    return successResponseFlat({
      hasSkipped: userData?.independentStudyUnlocked === true,
      unlockMethod: userData?.independentStudyUnlockMethod || null
    })

  } catch (error) {
    return serverError(error, 'Failed to check skip status')
  }
}
