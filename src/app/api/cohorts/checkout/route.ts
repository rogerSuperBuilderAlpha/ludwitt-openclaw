import { NextRequest, NextResponse } from 'next/server'
import { db, auth } from '@/lib/firebase/admin'
import Stripe from 'stripe'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    })
  : null

interface CheckoutRequest {
  cohortId: string
  quantity?: number
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { success: false, error: 'Payment service not configured' },
        { status: 503 }
      )
    }

    // Verify Firebase Auth token
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    const decodedToken = authResult.decodedToken

    const body: CheckoutRequest = await request.json()
    const { cohortId, quantity = 1 } = body

    if (!cohortId) {
      return NextResponse.json(
        { success: false, error: 'Missing cohort ID' },
        { status: 400 }
      )
    }

    // Validate quantity
    if (quantity < 1 || quantity > 100) {
      return NextResponse.json(
        { success: false, error: 'Invalid quantity. Must be between 1 and 100.' },
        { status: 400 }
      )
    }

    // Get cohort details
    const cohortDoc = await db.collection('cohorts').doc(cohortId).get()

    if (!cohortDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Cohort not found' },
        { status: 404 }
      )
    }

    const cohort = cohortDoc.data()

    // Check if cohort is still open
    if (cohort?.status !== 'open') {
      return NextResponse.json(
        { success: false, error: 'Cohort is no longer accepting members' },
        { status: 400 }
      )
    }

    // Check if there are enough spots available
    const spotsAvailable = cohort.targetSize - cohort.currentSize
    if (quantity > spotsAvailable) {
      return NextResponse.json(
        { success: false, error: `Only ${spotsAvailable} spot(s) available in this cohort` },
        { status: 400 }
      )
    }

    // Check membership and get user info in parallel
    const [existingMembership, userRecord] = await Promise.all([
      db.collection('cohortMembers')
        .where('cohortId', '==', cohortId)
        .where('userId', '==', decodedToken.uid)
        .get(),
      auth.getUser(decodedToken.uid)
    ])

    if (!existingMembership.empty) {
      return NextResponse.json(
        { success: false, error: 'You are already a member of this cohort' },
        { status: 400 }
      )
    }

    const userEmail = userRecord.email || ''

    // Calculate total amount
    const totalAmount = cohort.pricePerPerson * quantity

    // Determine base URL for redirects (support local development)
    const origin = request.headers.get('origin') || request.headers.get('referer')
    const baseUrl = origin ? new URL(origin).origin : process.env.NEXT_PUBLIC_APP_URL

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${cohort.name} - ${quantity} Seat${quantity > 1 ? 's' : ''}`,
              description: quantity > 1
                ? `Join the ${cohort.name} cohort with ${quantity} seats - 6 weeks of guided learning with a professional mentor`
                : `Join the ${cohort.name} cohort - 6 weeks of guided learning with a professional mentor`,
            },
            unit_amount: Math.round(cohort.pricePerPerson * 100), // Convert to cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/basics/cohorts?success=true&cohortId=${cohortId}`,
      cancel_url: `${baseUrl}/basics/cohorts?canceled=true`,
      customer_email: userEmail,
      metadata: {
        cohortId,
        userId: decodedToken.uid,
        userName: userRecord.displayName || userEmail || 'Anonymous',
        pricePerPerson: cohort.pricePerPerson.toString(),
        quantity: quantity.toString(),
        totalAmount: totalAmount.toString(),
      },
    })

    apiLogger.success('cohorts/checkout', `Checkout session created for user ${decodedToken.uid} to purchase ${quantity} seat(s) in cohort ${cohortId}`)

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })

  } catch (error) {
    apiLogger.apiError('cohorts/checkout', 'Failed to create checkout session', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to create checkout session' },
    { status: 405 }
  )
}
