import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getUserProgressData, createTimestamp } from '@/lib/utils/firestore-helpers'
import { generateDocumentId, generateDocumentIdWithPrefix } from '@/lib/utils/id-helpers'
import { calculateTotalXP, getMaxStreak, calculateAverageAccuracy, calculateTotalCompleted } from '@/lib/utils/progress-helpers'
import { getDifficultyLevel } from '@/lib/utils/difficulty-helpers'
import { Collections } from '@/lib/basics/collections'
import { db } from '@/lib/firebase/admin'

/**
 * Claim Reward API
 * Handles claiming of gift cards, badges, and other rewards
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const body = await request.json()
    const { rewardId } = body

    if (!rewardId) {
      return badRequestError('Reward ID required')
    }

    // Check if reward was already claimed
    const existingClaim = await db.collection(Collections.CLAIMED_REWARDS)
      .where('userId', '==', userId)
      .where('rewardId', '==', rewardId)
      .get()

    if (!existingClaim.empty) {
      return badRequestError('Reward already claimed')
    }

    // Get user's current progress to verify eligibility
    const progress = await getUserProgressData(userId)
    if (!progress) {
      return notFoundError('User progress not found')
    }

    // Verify reward eligibility (simplified - would use full reward definition)
    const totalXP = calculateTotalXP(progress.math, progress.reading)
    const maxStreak = getMaxStreak(progress.math, progress.reading)
    const avgAccuracy = calculateAverageAccuracy(progress.math, progress.reading)

    let eligible = false
    let rewardDetails: { type: string; provider: string; value: number } = {
      type: '',
      provider: '',
      value: 0
    }

    switch (rewardId) {
      case 'amazon_10':
        eligible = totalXP >= 5000
        rewardDetails = { type: 'gift_card', provider: 'Amazon', value: 10 }
        break
      case 'amazon_25':
        eligible = getDifficultyLevel(progress.math.currentDifficulty) >= 8 && 
                   getDifficultyLevel(progress.reading.currentDifficulty) >= 8
        rewardDetails = { type: 'gift_card', provider: 'Amazon', value: 25 }
        break
      case 'streak_master_badge':
        eligible = maxStreak >= 30
        rewardDetails = { type: 'badge', provider: 'PitchRise', value: 0 }
        break
      case 'perfectionist_badge':
        eligible = avgAccuracy >= 0.95 && calculateTotalCompleted(progress.math, progress.reading) >= 100
        rewardDetails = { type: 'badge', provider: 'PitchRise', value: 0 }
        break
      case 'local_pizza_voucher':
        eligible = totalXP >= 500 // Weekly goal
        rewardDetails = { type: 'voucher', provider: 'Local Partners', value: 5 }
        break
      default:
        return badRequestError('Invalid reward ID')
    }

    if (!eligible) {
      return badRequestError('Requirements not met for this reward')
    }

    // Record the claim and related operations atomically using batch write
    // This ensures all operations succeed or fail together (no partial state)
    const claimId = generateDocumentId(userId, rewardId)
    const now = createTimestamp()

    const batch = db.batch()

    // Record the claim
    const claimRef = db.collection(Collections.CLAIMED_REWARDS).doc(claimId)
    batch.set(claimRef, {
      userId,
      rewardId,
      ...rewardDetails,
      claimedAt: now,
      status: 'pending_fulfillment',
      email: decodedToken.email || null
    })

    // Create notification
    const notificationRef = db.collection(Collections.NOTIFICATIONS).doc(generateDocumentIdWithPrefix('reward', claimId))
    batch.set(notificationRef, {
      userId,
      type: 'reward_claimed',
      title: `Reward Claimed: ${rewardId}`,
      message: `You've successfully claimed your reward!`,
      read: false,
      createdAt: now
    })

    // For gift cards, add fulfillment task
    if (rewardDetails.type === 'gift_card') {
      const fulfillmentRef = db.collection(Collections.REWARD_FULFILLMENT_TASKS).doc(claimId)
      batch.set(fulfillmentRef, {
        userId,
        email: decodedToken.email,
        rewardType: 'gift_card',
        provider: rewardDetails.provider,
        value: rewardDetails.value,
        status: 'pending',
        createdAt: now
      })
    }

    // Execute all operations atomically
    await batch.commit()

    return successResponse({
      claimId,
      fulfillmentInfo: rewardDetails.type === 'gift_card' 
        ? 'Gift card will be emailed within 24 hours'
        : 'Reward added to your profile'
    }, 'Reward claimed successfully')

  } catch (error) {
    return serverError(error, 'Failed to claim reward')
  }
}
