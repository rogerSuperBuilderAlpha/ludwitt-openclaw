import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import Stripe from 'stripe'
import { apiLogger } from '@/lib/logger'

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    })
  : null

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    if (!db || !stripe) {
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 503 }
      )
    }

    // Get the raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      apiLogger.apiError('cohorts/webhook', 'No Stripe signature found', null)
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      apiLogger.apiError('cohorts/webhook', 'Webhook signature verification failed', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    apiLogger.success('cohorts/webhook', `Webhook received: ${event.type}`)

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract metadata
      const cohortId = session.metadata?.cohortId
      const userId = session.metadata?.userId
      const userName = session.metadata?.userName
      const pricePerPerson = parseFloat(session.metadata?.pricePerPerson || '0')
      const quantity = parseInt(session.metadata?.quantity || '1')
      const totalAmount = parseFloat(session.metadata?.totalAmount || '0')

      if (!cohortId || !userId) {
        apiLogger.apiError('cohorts/webhook', 'Missing metadata in checkout session', null)
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
      }

      apiLogger.success('cohorts/webhook', `Processing payment for user ${userId} purchasing ${quantity} seat(s) in cohort ${cohortId}`)

      // Add the purchaser as a member (first seat)
      const purchaserMember = {
        cohortId,
        userId,
        userEmail: session.customer_email || '',
        userName: userName || 'Anonymous',
        joinedAt: new Date().toISOString(),
        paidAmount: pricePerPerson,
        paymentStatus: 'completed',
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        isPurchaser: true,
        seatNumber: 1,
      }

      await db.collection('cohortMembers').add(purchaserMember)

      // Create placeholder members for additional seats purchased
      if (quantity > 1) {
        const additionalSeats = []
        for (let i = 2; i <= quantity; i++) {
          additionalSeats.push({
            cohortId,
            userId, // Same userId so purchaser can manage these seats
            userEmail: session.customer_email || '',
            userName: `${userName || 'Anonymous'} - Seat ${i}`,
            joinedAt: new Date().toISOString(),
            paidAmount: pricePerPerson,
            paymentStatus: 'completed',
            paymentIntentId: session.payment_intent,
            sessionId: session.id,
            isPurchaser: false,
            seatNumber: i,
            isPlaceholder: true, // Can be assigned to someone else later
          })
        }

        // Batch add additional seats
        const batch = db.batch()
        additionalSeats.forEach((seat) => {
          const seatRef = db.collection('cohortMembers').doc()
          batch.set(seatRef, seat)
        })
        await batch.commit()

        apiLogger.success('cohorts/webhook', `Created ${quantity - 1} additional seat(s) for purchaser ${userId}`)
      }

      // Increment cohort currentSize by the quantity purchased
      const cohortRef = db.collection('cohorts').doc(cohortId)
      await cohortRef.update({
        currentSize: FieldValue.increment(quantity),
      })

      // Check if cohort is now full
      const cohortDoc = await cohortRef.get()
      const cohort = cohortDoc.data()

      if (cohort && cohort.currentSize >= cohort.targetSize) {
        apiLogger.success('cohorts/webhook', `Cohort ${cohortId} is now FULL!`)

        // Update cohort status
        await cohortRef.update({
          status: 'full',
          filledAt: new Date().toISOString(),
        })

        // Distribute creator bonus
        await distributeCreatorBonus(cohortId, cohort.creatorId)
      }

      apiLogger.success('cohorts/webhook', `User ${userId} successfully added to cohort ${cohortId}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    apiLogger.apiError('cohorts/webhook', 'Error processing webhook', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function distributeCreatorBonus(cohortId: string, creatorId: string) {
  if (!db) return

  const bonusAmount = 2000
  const creatorRef = db.collection('cohortCreators').doc(creatorId)

  try {
    const creatorDoc = await creatorRef.get()

    if (creatorDoc.exists) {
      const currentData = creatorDoc.data()
      const newEarning = {
        cohortId,
        amount: bonusAmount,
        earnedAt: new Date().toISOString(),
        status: 'pending' as const,
      }

      await creatorRef.update({
        cohortsCompleted: FieldValue.increment(1),
        pendingEarnings: FieldValue.increment(bonusAmount),
        earnings: FieldValue.arrayUnion(newEarning),
        updatedAt: new Date().toISOString(),
      })

      apiLogger.success('cohorts/webhook', `Creator bonus of $${bonusAmount} added to pending earnings for ${creatorId}`)

      // Payout is tracked in the database; Stripe Connect payout is a planned feature

    } else {
      // Creator record doesn't exist (shouldn't happen, but handle it)
      await creatorRef.set({
        cohortsCreated: 1,
        cohortsCompleted: 1,
        totalEarnings: 0,
        pendingEarnings: bonusAmount,
        earnings: [{
          cohortId,
          amount: bonusAmount,
          earnedAt: new Date().toISOString(),
          status: 'pending',
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    apiLogger.apiError('cohorts/webhook', 'Error distributing creator bonus', error)
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Stripe webhook endpoint' },
    { status: 200 }
  )
}
