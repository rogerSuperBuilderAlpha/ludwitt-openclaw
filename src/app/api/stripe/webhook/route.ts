import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/firebase/admin'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'
import { addCredits, refundCredits } from '@/lib/credits/balance'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-12-15.clover',
})

const webhookSecret =
  process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_CREDITS_WEBHOOK_SECRET

// Collection for tracking processed webhook events (idempotency)
const PROCESSED_EVENTS_COLLECTION = 'stripe_processed_events'
// Separate collection for tracking individual refunds (for partial refund handling)
const PROCESSED_REFUNDS_COLLECTION = 'stripe_processed_refunds'

/**
 * Check if a webhook event has already been processed (idempotency check)
 */
async function isEventAlreadyProcessed(eventId: string): Promise<boolean> {
  const doc = await db
    .collection(PROCESSED_EVENTS_COLLECTION)
    .doc(eventId)
    .get()
  return doc.exists
}

/**
 * Mark a webhook event as processed
 */
async function markEventAsProcessed(
  eventId: string,
  eventType: string
): Promise<void> {
  await db.collection(PROCESSED_EVENTS_COLLECTION).doc(eventId).set({
    eventType,
    processedAt: new Date().toISOString(),
  })
}

/**
 * Check if a specific refund has been processed (for partial refund idempotency)
 */
async function isRefundAlreadyProcessed(refundId: string): Promise<boolean> {
  const doc = await db
    .collection(PROCESSED_REFUNDS_COLLECTION)
    .doc(refundId)
    .get()
  return doc.exists
}

/**
 * Mark a specific refund as processed
 */
async function markRefundAsProcessed(
  refundId: string,
  chargeId: string,
  amount: number
): Promise<void> {
  await db.collection(PROCESSED_REFUNDS_COLLECTION).doc(refundId).set({
    chargeId,
    amount,
    processedAt: new Date().toISOString(),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook secret is configured
    if (!webhookSecret) {
      apiLogger.apiError('stripe/webhook', 'Webhook secret not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      apiLogger.apiError(
        'stripe/webhook',
        'Webhook signature verification failed',
        err
      )
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Idempotency check: Skip if event already processed
    if (await isEventAlreadyProcessed(event.id)) {
      apiLogger.debug(
        'stripe/webhook',
        `Event already processed, skipping: ${event.id}`
      )
      return NextResponse.json({ received: true, skipped: 'already_processed' })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Handle credit deposits
        if (session.metadata?.type === 'credit_deposit') {
          const userId = session.metadata.userId
          const amountCents = parseInt(session.metadata.amountCents || '0', 10)

          if (!userId || !amountCents) {
            apiLogger.apiError(
              'stripe/webhook',
              `Missing credit deposit metadata in session: ${session.id}`,
              null
            )
            break
          }

          if (session.payment_status !== 'paid') {
            apiLogger.debug(
              'stripe/webhook',
              `Credit deposit not yet paid: ${session.id}`
            )
            break
          }

          // Get payment intent ID
          const paymentIntentId =
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent?.id || session.id

          const customerId =
            typeof session.customer === 'string'
              ? session.customer
              : session.customer?.id

          // Add credits to user's balance
          const { newBalance, transaction } = await addCredits(
            userId,
            amountCents,
            {
              stripePaymentIntentId: paymentIntentId,
              stripeCustomerId: customerId,
            }
          )

          apiLogger.success(
            'stripe/webhook',
            `Credits added: ${amountCents} cents for user ${userId}, new balance: ${newBalance}`,
            {
              data: { transactionId: transaction.id },
            }
          )
          break
        }

        // Handle gate bypass purchases
        if (session.metadata?.type === 'gate_bypass') {
          const userId = session.metadata.userId
          const targetSection = session.metadata.targetSection // 'alc' | 'developer'

          if (!userId || !targetSection) {
            apiLogger.apiError(
              'stripe/webhook',
              `Missing gate bypass metadata in session: ${session.id}`,
              null
            )
            break
          }

          if (session.payment_status !== 'paid') {
            apiLogger.debug(
              'stripe/webhook',
              `Gate bypass not yet paid: ${session.id}`
            )
            break
          }

          // Set bypass flag in Firestore
          await db
            .collection('users')
            .doc(userId)
            .set(
              {
                gateBypassesPurchased: { [targetSection]: true },
                updatedAt: new Date().toISOString(),
              },
              { merge: true }
            )

          apiLogger.success(
            'stripe/webhook',
            `Gate bypass activated: ${targetSection} for user ${userId}`
          )
          break
        }

        // Handle subscriptions
        if (session.mode === 'subscription') {
          const userId = session.metadata?.firebaseUID
          const tierId = session.metadata?.tierId

          if (!userId || !tierId) {
            apiLogger.apiError(
              'stripe/webhook',
              `Missing metadata in session: ${session.id}`,
              null
            )
            break
          }

          // Get the subscription
          const subscriptionId = session.subscription as string
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId)

          // Save subscription to Firestore
          await db
            .collection('userSubscriptions')
            .doc(userId)
            .set({
              tier: tierId,
              status: subscription.status,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: subscriptionId,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version mismatch: current_period_end exists at runtime
              currentPeriodEnd: new Date(
                (subscription as any).current_period_end * 1000
              ).toISOString(),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              updatedAt: new Date().toISOString(),
            })

          apiLogger.success(
            'stripe/webhook',
            `Subscription created for user ${userId}: ${tierId}`
          )
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.firebaseUID
        const tierId = subscription.metadata?.tierId

        if (!userId || !tierId) {
          apiLogger.apiError(
            'stripe/webhook',
            `Missing metadata in subscription: ${subscription.id}`,
            null
          )
          break
        }

        // Update subscription in Firestore
        await db
          .collection('userSubscriptions')
          .doc(userId)
          .update({
            status: subscription.status,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version mismatch: current_period_end exists at runtime
            currentPeriodEnd: new Date(
              (subscription as any).current_period_end * 1000
            ).toISOString(),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: new Date().toISOString(),
          })

        apiLogger.success(
          'stripe/webhook',
          `Subscription updated for user ${userId}: ${subscription.status}`
        )
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.firebaseUID

        if (!userId) {
          apiLogger.apiError(
            'stripe/webhook',
            `Missing userId in subscription: ${subscription.id}`,
            null
          )
          break
        }

        // Downgrade to free tier
        await db
          .collection('userSubscriptions')
          .doc(userId)
          .set({
            tier: 'free',
            status: 'active',
            stripeCustomerId: subscription.customer as string,
            stripeSubscriptionId: null,
            currentPeriodEnd: null,
            cancelAtPeriodEnd: false,
            updatedAt: new Date().toISOString(),
          })

        apiLogger.success(
          'stripe/webhook',
          `Subscription canceled for user ${userId}`
        )
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version mismatch: subscription field exists at runtime
        const invoiceAny = invoice as any
        const subscriptionId =
          typeof invoiceAny.subscription === 'string'
            ? invoiceAny.subscription
            : invoiceAny.subscription?.id

        if (subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId)
          const userId = subscription.metadata?.firebaseUID

          if (userId) {
            // Update subscription status
            await db
              .collection('userSubscriptions')
              .doc(userId)
              .update({
                status: 'active',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version mismatch: current_period_end exists at runtime
                currentPeriodEnd: new Date(
                  (subscription as any).current_period_end * 1000
                ).toISOString(),
                updatedAt: new Date().toISOString(),
              })

            apiLogger.success(
              'stripe/webhook',
              `Payment succeeded for user ${userId}`
            )
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version mismatch: subscription field exists at runtime
        const failedInvoiceAny = invoice as any
        const subscriptionId =
          typeof failedInvoiceAny.subscription === 'string'
            ? failedInvoiceAny.subscription
            : failedInvoiceAny.subscription?.id

        if (subscriptionId) {
          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId)
          const userId = subscription.metadata?.firebaseUID

          if (userId) {
            // Update subscription status to past_due
            await db.collection('userSubscriptions').doc(userId).update({
              status: 'past_due',
              updatedAt: new Date().toISOString(),
            })

            apiLogger.success(
              'stripe/webhook',
              `Payment failed for user ${userId}`
            )
          }
        }
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Get the payment intent to find the user
        if (!charge.payment_intent) {
          apiLogger.debug(
            'stripe/webhook',
            `No payment intent on refunded charge: ${charge.id}`
          )
          break
        }

        const paymentIntentId =
          typeof charge.payment_intent === 'string'
            ? charge.payment_intent
            : charge.payment_intent.id

        // Retrieve the payment intent to get metadata
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId)

        // Check if this was a credit deposit
        if (paymentIntent.metadata?.type !== 'credit_deposit') {
          apiLogger.debug(
            'stripe/webhook',
            `Refund not for credit deposit: ${charge.id}`
          )
          break
        }

        const userId = paymentIntent.metadata.userId
        if (!userId) {
          apiLogger.apiError(
            'stripe/webhook',
            `Missing userId for refund: ${charge.id}`,
            null
          )
          break
        }

        // Process each individual refund with idempotency
        // This handles partial refunds correctly - each refund is tracked separately
        const refunds = charge.refunds?.data || []
        for (const refund of refunds) {
          // Skip if this specific refund was already processed
          if (await isRefundAlreadyProcessed(refund.id)) {
            apiLogger.debug(
              'stripe/webhook',
              `Refund already processed, skipping: ${refund.id}`
            )
            continue
          }

          const refundAmount = refund.amount
          if (!refundAmount || refundAmount <= 0) {
            continue
          }

          // Deduct the refunded credits for this specific refund
          const { newBalance, transaction } = await refundCredits(
            userId,
            refundAmount,
            {
              stripeRefundId: refund.id,
              stripePaymentIntentId: paymentIntentId,
              stripeChargeId: charge.id,
              reason: refund.reason || 'Stripe refund processed',
            }
          )

          // Mark this specific refund as processed
          await markRefundAsProcessed(refund.id, charge.id, refundAmount)

          apiLogger.success(
            'stripe/webhook',
            `Credits refunded: ${refundAmount} cents for user ${userId}, new balance: ${newBalance}`,
            {
              data: { transactionId: transaction.id, refundId: refund.id },
            }
          )
        }
        break
      }

      default:
        apiLogger.success(
          'stripe/webhook',
          `Unhandled event type: ${event.type}`
        )
    }

    // Mark event as processed to prevent replay attacks
    await markEventAsProcessed(event.id, event.type)

    return NextResponse.json({ received: true })
  } catch (error) {
    apiLogger.apiError('stripe/webhook', 'Webhook handler failed', error)
    return NextResponse.json(
      { error: getErrorMessage(error, 'Webhook handler failed') },
      { status: 500 }
    )
  }
}
