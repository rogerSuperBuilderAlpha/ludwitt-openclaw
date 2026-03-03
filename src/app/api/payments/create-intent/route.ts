/**
 * Create Payment Intent API
 * Creates a Stripe payment intent for a project
 */

import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent, getOrCreateStripeCustomer } from '@/lib/stripe/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    // Rate limit
    const rl = await checkRateLimit('strict', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    // Parse request body
    const { projectId, amount, description } = await request.json()

    if (!projectId || !amount) {
      return badRequestError('projectId and amount are required')
    }

    // Get project details
    const projectDoc = await db.collection('projects').doc(projectId).get()

    if (!projectDoc.exists) {
      return notFoundError('Project not found')
    }

    const project = projectDoc.data()!

    // Verify user is the customer
    if (project.customerId !== decodedToken.uid) {
      return forbiddenError('You can only pay for your own projects')
    }

    // Get or create Stripe customer
    const stripeCustomer = await getOrCreateStripeCustomer({
      email: project.customerEmail,
      name: project.customerName,
      metadata: { customerId: project.customerId },
    })

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount,
      currency: project.currency || 'usd',
      metadata: {
        projectId,
        customerId: project.customerId,
        customerEmail: project.customerEmail,
        description: description || `Payment for ${project.title}`,
      },
    })

    // Update project with payment intent ID
    await db.collection('projects').doc(projectId).update({
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: 'pending',
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      stripeCustomerId: stripeCustomer.id,
    })
  } catch (error) {
    apiLogger.apiError('payments/create-intent', 'Failed to create payment intent', error)
    return serverError(error, 'Failed to create payment intent')
  }
}
