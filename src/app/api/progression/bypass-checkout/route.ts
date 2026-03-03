/**
 * API Route: POST /api/progression/bypass-checkout
 *
 * Creates a Stripe Checkout Session for a $10,000 gate bypass purchase.
 * Two bypass types: 'alc' (skips Math 12 + Reading 12) and 'developer' (skips 5 Projects + Deployment).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { stripe } from '@/lib/stripe/server'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

const BYPASS_PRICE_CENTS = 1_000_000 // $10,000

const BYPASS_META: Record<string, { name: string; successPath: string }> = {
  alc: {
    name: 'ALC Gate Bypass',
    successPath: '/alc',
  },
  developer: {
    name: 'Developer Gate Bypass',
    successPath: '/developers',
  },
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId, decodedToken } = authResult

    const body = await request.json()
    const { targetSection } = body as { targetSection: string }

    // Validate target section
    if (!targetSection || !BYPASS_META[targetSection]) {
      return badRequestError('Invalid targetSection. Must be "alc" or "developer".')
    }

    // Check if bypass already purchased
    const userDoc = await db.collection('users').doc(userId).get()
    const bypasses = userDoc.exists ? userDoc.data()?.gateBypassesPurchased || {} : {}

    if (bypasses[targetSection]) {
      return badRequestError('Bypass already purchased for this section.')
    }

    // Get or create Stripe customer (same pattern as credit deposits)
    const email = decodedToken.email || ''
    let stripeCustomerId: string | undefined

    if (userDoc.exists) {
      stripeCustomerId = userDoc.data()?.stripeCustomerId
    }

    if (!stripeCustomerId && email) {
      const existingCustomers = await stripe.customers.list({ email, limit: 1 })

      if (existingCustomers.data.length > 0) {
        stripeCustomerId = existingCustomers.data[0].id
      } else {
        const customer = await stripe.customers.create({
          email,
          name: decodedToken.name || null,
          metadata: { userId, firebaseUID: userId },
        })
        stripeCustomerId = customer.id
      }

      await db.collection('users').doc(userId).set({
        stripeCustomerId,
        updatedAt: new Date().toISOString(),
      }, { merge: true })
    }

    // Validate origin
    const ALLOWED_ORIGINS = [
      'https://your-domain.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ]
    const requestOrigin = request.headers.get('origin')
    const origin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : (process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com')

    const meta = BYPASS_META[targetSection]

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      customer_email: !stripeCustomerId ? email : undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: meta.name,
              description: 'Permanent gate bypass — $200/week maintenance fee applies if weekly XP not met.',
            },
            unit_amount: BYPASS_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}${meta.successPath}?bypass=success`,
      cancel_url: `${origin}${meta.successPath}?bypass=canceled`,
      metadata: {
        userId,
        type: 'gate_bypass',
        targetSection,
      },
      payment_intent_data: {
        metadata: {
          userId,
          type: 'gate_bypass',
          targetSection,
        },
      },
    })

    apiLogger.success('progression/bypass-checkout', 'Bypass checkout session created', {
      data: { userId, targetSection, sessionId: session.id },
    })

    return successResponse({ sessionId: session.id, url: session.url })
  } catch (error) {
    apiLogger.apiError('progression/bypass-checkout', 'Failed to create bypass checkout session', error)
    return serverError(error, 'Failed to create bypass checkout session')
  }
}
