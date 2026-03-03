import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError, serviceUnavailableError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { validateRequiredFields } from '@/lib/api/validators'
import { updateUserFields } from '@/lib/utils/user-helpers'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { apiLogger } from '@/lib/logger'

/**
 * @deprecated Use /api/stripe/create-subscription instead.
 *
 * POST /api/user/subscription/create-checkout
 * Create a Stripe Checkout Link for subscription
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return badRequestError('Valid email is required')
    }

    // Check if Stripe is configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      apiLogger.apiError('create-checkout', 'Stripe not configured')
      return serviceUnavailableError('Payment processing not available')
    }

    // Use Stripe Checkout Links (pre-created in Stripe Dashboard)
    // To create a checkout link:
    // 1. Go to Stripe Dashboard > Products > Create product
    // 2. Set up recurring pricing (e.g., $9.99/month)
    // 3. Create a Payment Link for the product
    // 4. Add the link to your .env.local as STRIPE_CHECKOUT_LINK
    const checkoutLink = process.env.STRIPE_CHECKOUT_LINK
    
    if (!checkoutLink) {
      apiLogger.apiError('create-checkout', 'Stripe Checkout Link not configured')
      return serviceUnavailableError('Checkout link not configured. Please contact support.')
    }

    // Store checkout session reference in user document
    await updateUserFields(userId, {
      'subscription.checkoutSessionCreatedAt': createISOTimestamp(),
      'subscription.checkoutEmail': email
    })

    apiLogger.success('create-checkout', 'Checkout link created', { userId })

    return successResponse({
      checkoutUrl: checkoutLink
    })

  } catch (error) {
    apiLogger.apiError('create-checkout', 'Failed to create checkout', error)
    return serverError(error, 'Failed to create checkout session')
  }
}

