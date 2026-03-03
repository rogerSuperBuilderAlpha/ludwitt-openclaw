import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/firebase/admin'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-12-15.clover',
})

export async function POST(req: NextRequest) {
  try {
    // Verify Firebase Auth token
    const authResult = await authenticateRequest(req)
    if (authResult instanceof NextResponse) return authResult
    const userId = authResult.decodedToken.uid

    const body = await req.json()
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'Customer ID required' },
        { status: 400 }
      )
    }

    // Verify the customer ID belongs to this user
    const userSubDoc = await db.collection('userSubscriptions').doc(userId).get()
    const userData = userSubDoc.data()
    
    if (!userData || userData.stripeCustomerId !== customerId) {
      return NextResponse.json(
        { success: false, error: 'Customer not found or does not belong to this user' },
        { status: 403 }
      )
    }

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/subscription`,
    })

    return NextResponse.json({
      success: true,
      url: session.url,
    })
  } catch (error) {
    apiLogger.apiError('stripe/create-portal-session', 'Failed to create portal session', error)
    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error, 'Failed to create portal session'),
      },
      { status: 500 }
    )
  }
}
