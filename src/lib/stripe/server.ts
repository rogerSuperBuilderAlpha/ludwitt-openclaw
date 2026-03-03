/**
 * Stripe Server-Side Integration
 * Handle payment intents, invoices, and webhook processing
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

// Initialize Stripe with API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

/**
 * Create a payment intent for a project
 */
export async function createPaymentIntent({
  amount,
  currency = 'usd',
  metadata,
}: {
  amount: number
  currency?: string
  metadata: {
    projectId: string
    customerId: string
    customerEmail: string
    description: string
  }
}): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.retrieve(paymentIntentId)
}

/**
 * Update payment intent amount
 */
export async function updatePaymentIntent(
  paymentIntentId: string,
  amount: number
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.update(paymentIntentId, {
    amount: Math.round(amount * 100),
  })
}

/**
 * Cancel a payment intent
 */
export async function cancelPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.cancel(paymentIntentId)
}

/**
 * Create or retrieve a Stripe customer
 */
export async function getOrCreateStripeCustomer({
  email,
  name,
  metadata,
}: {
  email: string
  name: string
  metadata?: { customerId: string }
}): Promise<Stripe.Customer> {
  // Try to find existing customer by email
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0]
  }

  // Create new customer
  return await stripe.customers.create({
    email,
    name,
    metadata,
  })
}

/**
 * Create an invoice for a project
 */
export async function createInvoice({
  customerId,
  stripeCustomerId,
  amount,
  currency = 'usd',
  description,
  metadata,
  dueDate,
}: {
  customerId: string
  stripeCustomerId: string
  amount: number
  currency?: string
  description: string
  metadata: {
    projectId: string
    customerId: string
    invoiceId?: string
  }
  dueDate?: Date
}): Promise<Stripe.Invoice> {
  // Create an invoice item
  await stripe.invoiceItems.create({
    customer: stripeCustomerId,
    amount: Math.round(amount * 100),
    currency,
    description,
    metadata,
  })

  // Create the invoice
  const invoice = await stripe.invoices.create({
    customer: stripeCustomerId,
    collection_method: 'send_invoice',
    days_until_due: dueDate
      ? Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 30,
    metadata,
    auto_advance: true,
  })

  // Finalize the invoice
  return await stripe.invoices.finalizeInvoice(invoice.id)
}

/**
 * Send an invoice to the customer
 */
export async function sendInvoice(invoiceId: string): Promise<Stripe.Invoice> {
  return await stripe.invoices.sendInvoice(invoiceId)
}

/**
 * Retrieve an invoice
 */
export async function getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
  return await stripe.invoices.retrieve(invoiceId)
}

/**
 * Mark an invoice as paid
 */
export async function markInvoicePaid(
  invoiceId: string
): Promise<Stripe.Invoice> {
  return await stripe.invoices.pay(invoiceId)
}

/**
 * Construct webhook event from request
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

/**
 * Get payment method details
 */
export async function getPaymentMethod(
  paymentMethodId: string
): Promise<Stripe.PaymentMethod> {
  return await stripe.paymentMethods.retrieve(paymentMethodId)
}

/**
 * Refund a payment
 */
export async function createRefund({
  paymentIntentId,
  amount,
  reason,
}: {
  paymentIntentId: string
  amount?: number
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
}): Promise<Stripe.Refund> {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined,
    reason,
  })
}
