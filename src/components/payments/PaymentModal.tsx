/**
 * Payment Modal Component
 * Modal for making project payments
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import { PaymentForm } from './PaymentForm'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  projectTitle: string
  amount: number
  currency?: string
}

export function PaymentModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  amount,
  currency = 'usd',
}: PaymentModalProps) {
  const [paymentComplete, setPaymentComplete] = useState(false)

  if (!isOpen) return null

  const handleSuccess = () => {
    setPaymentComplete(true)
    setTimeout(() => {
      onClose()
      setPaymentComplete(false)
    }, 2000)
  }

  return (
    <div className="b-modal-backdrop">
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
          className="b-modal b-modal-sm b-p-xl"
        >
          {/* Header */}
          <div className="b-mb-xl flex items-start justify-between">
            <div>
              <h2
                id="payment-modal-title"
                className="b-text-2xl b-font-bold b-text-primary"
              >
                Make Payment
              </h2>
              <p className="b-mt-sm b-text-sm b-text-secondary">
                {projectTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="b-text-muted hover:b-text-secondary transition-colors"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Payment Form */}
          {!paymentComplete ? (
            <PaymentForm
              projectId={projectId}
              amount={amount}
              currency={currency}
              description={`Payment for ${projectTitle}`}
              onSuccess={handleSuccess}
            />
          ) : (
            <div className="b-feedback b-feedback-success b-p-xl text-center">
              <div className="b-mb-lg b-text-5xl">✓</div>
              <h3 className="b-mb-sm b-text-lg b-font-semibold">
                Payment Successful!
              </h3>
              <p className="b-text-sm">Your payment is being processed...</p>
            </div>
          )}
        </div>
      </FocusTrap>
    </div>
  )
}
