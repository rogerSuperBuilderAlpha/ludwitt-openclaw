/**
 * Stripe Webhook Handler
 * Process Stripe events for payments and invoices
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { constructWebhookEvent } from '@/lib/stripe/server'
import { adminDb } from '@/lib/firebase/admin'
import Stripe from 'stripe'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not configured' },
        { status: 500 }
      )
    }

    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify webhook signature and construct event
    let event: Stripe.Event

    try {
      event = constructWebhookEvent(body, signature)
    } catch (err: unknown) {
      apiLogger.apiError(
        'payments/webhook',
        'Webhook signature verification failed',
        err
      )
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        )
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(
          event.data.object as Stripe.PaymentIntent
        )
        break

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        apiLogger.success(
          'payments/webhook',
          `Unhandled event type: ${event.type}`
        )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    apiLogger.apiError('payments/webhook', 'Webhook processing failed', error)
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        details: getErrorMessage(error, 'Unknown error'),
      },
      { status: 500 }
    )
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  const projectId = paymentIntent.metadata.projectId
  const amount = paymentIntent.amount / 100 // Convert from cents

  if (!projectId) {
    apiLogger.apiError(
      'payments/webhook',
      'No projectId in payment intent metadata',
      null
    )
    return
  }

  if (!adminDb) {
    apiLogger.apiError(
      'payments/webhook',
      'Firebase Admin not configured',
      null
    )
    return
  }

  // Update project payment status
  await adminDb.collection('projects').doc(projectId).update({
    paymentStatus: 'paid',
    paidAmount: amount,
    stripePaymentIntentId: paymentIntent.id,
    updatedAt: new Date().toISOString(),
  })

  // Create notification for customer
  await createNotification({
    projectId,
    type: 'payment_received',
    title: 'Payment Successful',
    message: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
  })

  apiLogger.success(
    'payments/webhook',
    `Payment succeeded for project ${projectId}: $${amount}`
  )
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const projectId = paymentIntent.metadata.projectId

  if (!projectId) {
    apiLogger.apiError(
      'payments/webhook',
      'No projectId in payment intent metadata',
      null
    )
    return
  }

  if (!adminDb) {
    apiLogger.apiError(
      'payments/webhook',
      'Firebase Admin not configured',
      null
    )
    return
  }

  // Update project payment status
  await adminDb.collection('projects').doc(projectId).update({
    paymentStatus: 'pending',
    updatedAt: new Date().toISOString(),
  })

  // Create notification for customer
  await createNotification({
    projectId,
    type: 'payment_received',
    title: 'Payment Failed',
    message:
      'Your payment failed to process. Please update your payment method and try again.',
  })

  apiLogger.success(
    'payments/webhook',
    `Payment failed for project ${projectId}`
  )
}

/**
 * Handle paid invoice
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const projectId = invoice.metadata?.projectId
  const invoiceId = invoice.metadata?.invoiceId
  const amount = invoice.amount_paid / 100

  if (!projectId || !invoiceId) {
    apiLogger.apiError('payments/webhook', 'Missing metadata in invoice', null)
    return
  }

  if (!adminDb) {
    apiLogger.apiError(
      'payments/webhook',
      'Firebase Admin not configured',
      null
    )
    return
  }

  // Update invoice status in Firestore
  await adminDb.collection('invoices').doc(invoiceId).update({
    status: 'paid',
    paidAt: new Date().toISOString(),
    stripeInvoiceId: invoice.id,
    updatedAt: new Date().toISOString(),
  })

  // Update project payment status
  const projectRef = adminDb.collection('projects').doc(projectId)
  const projectDoc = await projectRef.get()
  const projectData = projectDoc.data()

  if (projectData) {
    const newPaidAmount = (projectData.paidAmount || 0) + amount
    const paymentStatus =
      newPaidAmount >= projectData.totalCost ? 'paid' : 'partial'

    await projectRef.update({
      paymentStatus,
      paidAmount: newPaidAmount,
      updatedAt: new Date().toISOString(),
    })
  }

  // Create notification
  await createNotification({
    projectId,
    type: 'payment_received',
    title: 'Invoice Paid',
    message: `Invoice #${invoice.number} has been paid. Amount: $${amount.toFixed(2)}`,
  })

  apiLogger.success(
    'payments/webhook',
    `Invoice paid for project ${projectId}: $${amount}`
  )
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const projectId = invoice.metadata?.projectId
  const invoiceId = invoice.metadata?.invoiceId

  if (!projectId || !invoiceId) {
    apiLogger.apiError('payments/webhook', 'Missing metadata in invoice', null)
    return
  }

  if (!adminDb) {
    apiLogger.apiError(
      'payments/webhook',
      'Firebase Admin not configured',
      null
    )
    return
  }

  // Update invoice status
  await adminDb.collection('invoices').doc(invoiceId).update({
    status: 'overdue',
    updatedAt: new Date().toISOString(),
  })

  // Create notification
  await createNotification({
    projectId,
    type: 'payment_received',
    title: 'Invoice Payment Failed',
    message: `Payment for invoice #${invoice.number} failed. Please update your payment method.`,
  })

  apiLogger.success(
    'payments/webhook',
    `Invoice payment failed for project ${projectId}`
  )
}

/**
 * Helper to create notification
 */
async function createNotification({
  projectId,
  type,
  title,
  message,
}: {
  projectId: string
  type: string
  title: string
  message: string
}) {
  if (!adminDb) {
    apiLogger.apiError(
      'payments/webhook',
      'Firebase Admin not configured',
      null
    )
    return
  }

  // Get project to get customer ID
  const projectDoc = await adminDb.collection('projects').doc(projectId).get()
  const projectData = projectDoc.data()

  if (!projectData) {
    apiLogger.apiError(
      'payments/webhook',
      `Project not found: ${projectId}`,
      null
    )
    return
  }

  const notification = {
    recipientId: projectData.customerId,
    recipientRole: 'customer',
    projectId,
    type,
    title,
    message,
    entityType: 'project',
    entityId: projectId,
    read: false,
    createdAt: new Date().toISOString(),
  }

  await adminDb.collection('notifications').add(notification)
}
