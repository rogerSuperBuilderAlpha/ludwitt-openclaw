/**
 * Payment Form Component
 * Stripe Elements payment form for project payments
 */

'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiMutation } from '@/lib/hooks/useApiQuery'

interface PaymentFormProps {
  projectId: string
  amount: number
  currency?: string
  description?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function PaymentForm({
  projectId,
  amount,
  currency = 'usd',
  description,
  onSuccess,
  onError,
}: PaymentFormProps) {
  const { user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  // Mutation hook for creating payment intent
  const { mutate: createPaymentIntent, loading } = useApiMutation<{
    clientSecret: string
    paymentIntentId: string
  }>('/api/payments/create-intent')

  const handlePayment = async () => {
    if (!user) {
      setError('You must be logged in to make a payment')
      return
    }

    setError(null)

    const result = await createPaymentIntent({
      projectId,
      amount,
      description,
    })

    if (!result) {
      const errorMessage = 'Failed to create payment'
      setError(errorMessage)
      onError?.(errorMessage)
      return
    }

    // For now, we'll use a simple redirect approach
    // In production, you would use Stripe Elements for a better UX
    const stripe = await import('@/lib/stripe/client').then((m) =>
      m.getStripe()
    )

    if (!stripe) {
      const errorMessage = 'Stripe failed to load'
      setError(errorMessage)
      onError?.(errorMessage)
      return
    }

    // Redirect to Stripe Checkout or show payment form
    // For simplicity, we'll show a message with the payment intent
    setPaymentUrl(
      `https://dashboard.stripe.com/test/payments/${result.paymentIntentId}`
    )

    onSuccess?.()
  }

  if (paymentUrl) {
    return (
      <div className="b-feedback b-feedback-success b-p-xl text-center">
        <div className="b-mb-lg b-text-4xl">✓</div>
        <h3 className="b-mb-sm b-text-lg b-font-semibold">Payment Initiated</h3>
        <p className="b-mb-lg b-text-sm">
          Your payment has been created successfully. In production, you would
          be redirected to Stripe Checkout.
        </p>
        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="b-text-sm b-text-logic hover:underline"
        >
          View in Stripe Dashboard →
        </a>
      </div>
    )
  }

  return (
    <div className="b-card b-p-xl">
      <h3 className="b-mb-lg b-text-lg b-font-semibold b-text-primary">
        Payment Details
      </h3>

      <div className="b-mb-xl space-y-2">
        <div className="flex justify-between b-text-sm">
          <span className="b-text-secondary">Amount:</span>
          <span className="b-font-semibold b-text-primary">
            ${amount.toFixed(2)} {currency.toUpperCase()}
          </span>
        </div>
        {description && (
          <div className="flex justify-between b-text-sm">
            <span className="b-text-secondary">Description:</span>
            <span className="b-text-primary">{description}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="b-mb-lg b-feedback b-feedback-error b-text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="b-btn b-btn-logic b-btn-full b-btn-lg"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <p className="b-mt-lg text-center b-text-xs b-text-muted">
        Powered by Stripe • Secure payment processing
      </p>
    </div>
  )
}
