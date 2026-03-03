import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getUserData } from '@/lib/utils/user-helpers'
import { getSubscriptionStatus } from '@/lib/utils/subscription-helpers'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/user/subscription/status
 * Get user's subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Use subscription helper utility
    const subscriptionStatus = await getSubscriptionStatus(userId)

    return successResponse({
      isActive: subscriptionStatus.isActive,
      plan: subscriptionStatus.plan,
      currentPeriodEnd: subscriptionStatus.currentPeriodEnd,
      cancelAtPeriodEnd: subscriptionStatus.cancelAtPeriodEnd,
      stripeCustomerId: subscriptionStatus.stripeCustomerId
    })

  } catch (error) {
    apiLogger.apiError('subscription-status', 'Failed to get subscription status', error)
    return serverError(error, 'Failed to get subscription status')
  }
}

