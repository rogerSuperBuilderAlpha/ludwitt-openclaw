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
    const { subscriptionId } = body

    if (!subscriptionId) {
      return NextResponse.json(
        { success: false, error: 'Subscription ID required' },
        { status: 400 }
      )
    }

    // Verify the subscription belongs to this user
    const userSubDoc = await db.collection('userSubscriptions').doc(userId).get()
    const userData = userSubDoc.data()
    
    if (!userData || userData.stripeSubscriptionId !== subscriptionId) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found or does not belong to this user' },
        { status: 403 }
      )
    }

    // Cancel the subscription at period end
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    // Update Firestore
    await db.collection('userSubscriptions').doc(userId).set(
      {
        cancelAtPeriodEnd: true,
        canceledAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })
  } catch (error) {
    apiLogger.apiError('stripe/cancel-subscription', 'Failed to cancel subscription', error)
    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error, 'Failed to cancel subscription'),
      },
      { status: 500 }
    )
  }
}
