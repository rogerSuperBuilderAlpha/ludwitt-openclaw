/**
 * Stripe Client-Side Integration
 * Handle client-side Stripe operations
 */

import { loadStripe, Stripe } from '@stripe/stripe-js'
import { logger } from '@/lib/logger'

let stripePromise: Promise<Stripe | null>

/**
 * Get Stripe.js instance
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      logger.error('Stripe', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
      return Promise.resolve(null)
    }

    stripePromise = loadStripe(publishableKey)
  }

  return stripePromise
}

/**
 * Redirect to Stripe Checkout (deprecated - use payment intents instead)
 */
export async function redirectToCheckout(sessionId: string): Promise<void> {
  // This function is deprecated in newer versions of Stripe
  // Use payment intents with confirmCardPayment instead
  throw new Error('redirectToCheckout is deprecated. Use payment intents instead.')
}

/**
 * Confirm a payment with card element
 */
export async function confirmCardPayment(
  clientSecret: string,
  paymentMethod: any
): Promise<any> {
  const stripe = await getStripe()

  if (!stripe) {
    throw new Error('Stripe failed to load')
  }

  return await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod,
  })
}
