/**
 * API Route: POST /api/credits/deposit
 * 
 * Creates a Stripe Checkout Session for adding credits to user's account
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { stripe } from '@/lib/stripe/server'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body = await request.json()
    const { amountCents } = body as { amountCents: number }

    // Validate amount
    if (!amountCents || typeof amountCents !== 'number') {
      return badRequestError('Amount is required and must be a number')
    }

    if (amountCents < CREDIT_CONSTANTS.MINIMUM_DEPOSIT_CENTS) {
      return badRequestError(`Minimum deposit is $${CREDIT_CONSTANTS.MINIMUM_DEPOSIT_CENTS / 100}`)
    }

    if (amountCents > CREDIT_CONSTANTS.MAXIMUM_DEPOSIT_CENTS) {
      return badRequestError(`Maximum deposit is $${CREDIT_CONSTANTS.MAXIMUM_DEPOSIT_CENTS / 100}`)
    }

    // Get or create Stripe customer
    const email = decodedToken.email || ''
    let stripeCustomerId: string | undefined

    // Check if user already has a Stripe customer ID
    const userDoc = await db.collection('users').doc(userId).get()
    if (userDoc.exists) {
      stripeCustomerId = userDoc.data()?.stripeCustomerId
    }

    if (!stripeCustomerId && email) {
      // Look up existing customer by email or create new one
      const existingCustomers = await stripe.customers.list({
        email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        stripeCustomerId = existingCustomers.data[0].id
      } else {
        // Create new customer
        const customer = await stripe.customers.create({
          email,
          name: decodedToken.name || null,
          metadata: {
            userId,
            firebaseUID: userId,
          },
        })
        stripeCustomerId = customer.id
      }

      // Save Stripe customer ID to user document
      await db.collection('users').doc(userId).set({
        stripeCustomerId,
        updatedAt: new Date().toISOString(),
      }, { merge: true })
    }

    // Get the origin for redirect URLs
    // SECURITY: Validate origin against whitelist to prevent open redirect attacks
    const ALLOWED_ORIGINS = [
      'https://your-domain.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ]
    const requestOrigin = request.headers.get('origin')
    const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : (process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com')

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      customer_email: !stripeCustomerId ? email : undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'PitchRise Credits',
              description: `Add $${(amountCents / 100).toFixed(2)} to your account`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/account/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/account/credits?canceled=true`,
      metadata: {
        userId,
        type: 'credit_deposit',
        amountCents: amountCents.toString(),
      },
      payment_intent_data: {
        metadata: {
          userId,
          type: 'credit_deposit',
          amountCents: amountCents.toString(),
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    apiLogger.success('credits/deposit', 'Checkout session created', {
      data: {
        userId,
        amountCents,
        sessionId: session.id,
        customerId: stripeCustomerId,
      },
    })

    return successResponse({
      sessionId: session.id,
      url: session.url,
    })

  } catch (error) {
    apiLogger.apiError('credits/deposit', 'Failed to create checkout session', error)
    return serverError(error, 'Failed to create checkout session')
  }
}
