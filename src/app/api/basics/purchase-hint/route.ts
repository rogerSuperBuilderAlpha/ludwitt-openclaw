import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

const DEFAULT_HINT_COST = 10

export async function POST(request: NextRequest) {
  try {
    // Authenticate request - CRITICAL: Use authenticated userId, not from body
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { problemId } = body
    
    // SECURITY: Always use server-defined cost, never accept from client
    const xpCost = DEFAULT_HINT_COST

    if (!problemId) {
      return NextResponse.json(
        { error: 'problemId is required' },
        { status: 400 }
      )
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }
    
    // Check if hint was already purchased for this problem
    const helpHistoryRef = db
      .collection('users')
      .doc(userId)
      .collection('helpHistory')
      .doc(problemId)
    
    const existingHistory = await helpHistoryRef.get()
    
    if (existingHistory.exists) {
      const data = existingHistory.data()
      if (data?.hintPurchased) {
        // Already purchased - return success without charging
        return NextResponse.json({
          success: true,
          alreadyPurchased: true,
          xpCharged: 0,
          message: 'Hint already purchased for this problem'
        })
      }
    }

    // Check user's XP balance
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const currentXp = userData?.xp || 0

    if (currentXp < xpCost) {
      return NextResponse.json(
        { 
          error: 'Insufficient XP',
          required: xpCost,
          available: currentXp
        },
        { status: 400 }
      )
    }

    // Deduct XP and record purchase
    const batch = db.batch()

    // Deduct XP from user
    batch.update(userRef, {
      xp: FieldValue.increment(-xpCost),
      totalXpSpent: FieldValue.increment(xpCost)
    })

    // Record hint purchase in help history
    batch.set(helpHistoryRef, {
      problemId,
      hintPurchased: true,
      hintPurchasedAt: FieldValue.serverTimestamp(),
      xpSpentOnHint: xpCost,
      // Initialize other fields
      aiTutorUsed: existingHistory.exists ? existingHistory.data()?.aiTutorUsed || false : false,
      aiTutorResponse: existingHistory.exists ? existingHistory.data()?.aiTutorResponse : undefined
    }, { merge: true })

    await batch.commit()

    apiLogger.success('purchase-hint', 'Hint purchased', { userId, problemId, xpCost })

    return NextResponse.json({
      success: true,
      alreadyPurchased: false,
      xpCharged: xpCost,
      newXpBalance: currentXp - xpCost,
      message: 'Hint purchased successfully'
    })

  } catch (error) {
    apiLogger.apiError('purchase-hint', 'Failed to purchase hint', error)
    return NextResponse.json(
      { error: 'Failed to purchase hint' },
      { status: 500 }
    )
  }
}
