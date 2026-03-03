import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { getUserCredits, addCredits } from '@/lib/credits/balance'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { apiLogger } from '@/lib/logger'

/** Trial credit amount: $1 = 100 cents */
const TRIAL_CREDIT_AMOUNT_CENTS = 100

/**
 * Onboarding status structure stored in user document
 */
interface OnboardingStatus {
  introCompletedAt: string | null
  profileCompletedAt: string | null
  profileSkippedAt: string | null
  profileSkipCount: number
  creditPromptSeenAt: string | null
  lastPromptedAt: string | null
  trialCreditsGrantedAt: string | null
}

/**
 * API Route: GET /api/basics/onboarding-status
 * Get user's onboarding status
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get user document
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()
    
    // Get onboarding data
    const onboarding: OnboardingStatus = userData?.onboarding || {
      introCompletedAt: null,
      profileCompletedAt: null,
      profileSkippedAt: null,
      profileSkipCount: 0,
      creditPromptSeenAt: null,
      lastPromptedAt: null,
      trialCreditsGrantedAt: null
    }

    // Check avatar/profile completion from existing field
    const avatar = userData?.avatar
    const profileCompleted = avatar && avatar.isCompleted === true

    // Provision trial credits for new users (one-time)
    let trialCreditsJustGranted = false
    if (!onboarding.trialCreditsGrantedAt) {
      try {
        const timestamp = createISOTimestamp()
        
        // Grant $1 trial credits
        await addCredits(userId, TRIAL_CREDIT_AMOUNT_CENTS, {
          source: 'trial',
          reason: 'Welcome trial credits for new Basics user'
        })
        
        // Mark trial credits as granted
        await db.collection('users').doc(userId).set({
          onboarding: {
            ...onboarding,
            trialCreditsGrantedAt: timestamp
          },
          updatedAt: timestamp
        }, { merge: true })
        
        onboarding.trialCreditsGrantedAt = timestamp
        trialCreditsJustGranted = true
        
        apiLogger.success('onboarding-status', 'Trial credits granted', {
          data: { userId, amount: TRIAL_CREDIT_AMOUNT_CENTS }
        })
      } catch (creditError) {
        apiLogger.apiError('onboarding-status', 'Failed to grant trial credits', {
          userId,
          error: creditError
        })
        // Don't fail the request, just log the error
      }
    }

    // Get credit balance (after potential trial credit grant)
    const credits = await getUserCredits(userId)
    
    // Check if at Basics debt limit ($1)
    const basicsMinimum = CREDIT_CONSTANTS.BASICS_MINIMUM_BALANCE_CENTS ?? -100
    const isAtBasicsLimit = credits.balance <= basicsMinimum

    // Determine if we should re-prompt for profile
    // Re-prompt if: skipped more than 7 days ago OR after every 10 problems solved
    let shouldRepromptProfile = false
    if (!profileCompleted && onboarding.profileSkippedAt) {
      const skippedDate = new Date(onboarding.profileSkippedAt)
      const daysSinceSkip = (Date.now() - skippedDate.getTime()) / (1000 * 60 * 60 * 24)
      shouldRepromptProfile = daysSinceSkip >= 7
    }

    return successResponse({
      // Intro wizard status
      introCompleted: !!onboarding.introCompletedAt,
      introCompletedAt: onboarding.introCompletedAt,
      
      // Profile status
      profileCompleted,
      profileSkippedAt: onboarding.profileSkippedAt,
      profileSkipCount: onboarding.profileSkipCount,
      shouldRepromptProfile,
      
      // Credit prompt status
      creditPromptSeen: !!onboarding.creditPromptSeenAt,
      creditPromptSeenAt: onboarding.creditPromptSeenAt,
      
      // Trial credits status
      trialCreditsGranted: !!onboarding.trialCreditsGrantedAt,
      trialCreditsJustGranted,
      
      // Current credit status
      currentBalance: credits.balance,
      isAtBasicsLimit,
      basicsDebtLimit: basicsMinimum
    })

  } catch (error) {
    return serverError(error, 'Failed to get onboarding status')
  }
}

/**
 * API Route: POST /api/basics/onboarding-status
 * Update user's onboarding status
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const body = await request.json()
    const { 
      action 
    }: { 
      action: 'complete_intro' | 'complete_profile' | 'skip_profile' | 'see_credit_prompt' 
    } = body

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Missing action parameter' },
        { status: 400 }
      )
    }

    const timestamp = createISOTimestamp()
    const userRef = db.collection('users').doc(userId)
    
    // Get current onboarding status
    const userDoc = await userRef.get()
    const currentOnboarding: OnboardingStatus = userDoc.data()?.onboarding || {
      introCompletedAt: null,
      profileCompletedAt: null,
      profileSkippedAt: null,
      profileSkipCount: 0,
      creditPromptSeenAt: null,
      lastPromptedAt: null,
      trialCreditsGrantedAt: null
    }

    let updateData: Partial<OnboardingStatus> = {}

    switch (action) {
      case 'complete_intro':
        updateData = { introCompletedAt: timestamp }
        break
      case 'complete_profile':
        updateData = { 
          profileCompletedAt: timestamp,
          profileSkippedAt: null // Clear skip status when completed
        }
        break
      case 'skip_profile':
        updateData = { 
          profileSkippedAt: timestamp,
          profileSkipCount: (currentOnboarding.profileSkipCount || 0) + 1,
          lastPromptedAt: timestamp
        }
        break
      case 'see_credit_prompt':
        updateData = { creditPromptSeenAt: timestamp }
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update user document
    await userRef.set({
      onboarding: {
        ...currentOnboarding,
        ...updateData
      },
      updatedAt: timestamp
    }, { merge: true })

    return successResponse({
      action,
      timestamp,
      onboarding: {
        ...currentOnboarding,
        ...updateData
      }
    })

  } catch (error) {
    return serverError(error, 'Failed to update onboarding status')
  }
}
