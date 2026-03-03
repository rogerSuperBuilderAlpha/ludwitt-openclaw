/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
'use client'

import { useState } from 'react'
import {
  X,
  CircleNotch,
  CreditCard,
  Wallet,
  Coins,
} from '@phosphor-icons/react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { CREDIT_CONSTANTS } from '@/lib/credits/types'
import { UnifiedModal } from '@/components/basics/UnifiedModal'
import { WalletProvider } from '@/components/web3/WalletProvider'
import { MorStakingDeposit } from './MorStakingDeposit'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

type PaymentMethod = 'card' | 'mor'

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000]

function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export function DepositModal({
  isOpen,
  onClose,
  onSuccess,
}: DepositModalProps) {
  const fetchApi = useApiFetch()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [selectedAmount, setSelectedAmount] = useState<number>(1000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [showCustom, setShowCustom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAmountCents = (): number => {
    if (showCustom && customAmount) {
      const dollars = parseFloat(customAmount)
      if (!isNaN(dollars) && dollars >= 5) {
        return Math.round(dollars * 100)
      }
    }
    return selectedAmount
  }

  const amountCents = getAmountCents()
  const isValidAmount =
    amountCents >= CREDIT_CONSTANTS.MINIMUM_DEPOSIT_CENTS &&
    amountCents <= CREDIT_CONSTANTS.MAXIMUM_DEPOSIT_CENTS

  const handleCheckout = async () => {
    if (!isValidAmount) return

    setIsLoading(true)
    setError(null)

    try {
      const { url } = await fetchApi<{ url: string }>('/api/credits/deposit', {
        method: 'POST',
        body: JSON.stringify({ amountCents }),
      })

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
      setIsLoading(false)
    }
  }

  const handleMorSuccess = (claimedAmount: number) => {
    // Close modal and notify parent of success
    onClose()
    // Pass the claimed amount for toast display
    if (onSuccess) {
      // Store the claimed amount in sessionStorage so the parent can show a toast
      sessionStorage.setItem(
        'morClaimSuccess',
        JSON.stringify({ amount: claimedAmount })
      )
      onSuccess()
    }
  }

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Credits"
      subtitle="Choose a payment method"
      icon={<Wallet size={20} weight="fill" />}
      size="md"
    >
      <div className="space-y-6">
        {/* Payment Method Tabs */}
        <div className="flex b-bg-muted b-rounded-xl p-1">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 b-rounded-lg b-text-sm b-font-medium transition-all ${
              paymentMethod === 'card'
                ? 'b-bg-surface b-shadow-sm b-text-primary'
                : 'b-text-secondary hover:b-text-primary'
            }`}
          >
            <CreditCard
              size={18}
              weight={paymentMethod === 'card' ? 'fill' : 'regular'}
            />
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('mor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 b-rounded-lg b-text-sm b-font-medium transition-all ${
              paymentMethod === 'mor'
                ? 'b-bg-surface b-shadow-sm b-text-primary'
                : 'b-text-secondary hover:b-text-primary'
            }`}
          >
            <Coins
              size={18}
              weight={paymentMethod === 'mor' ? 'fill' : 'regular'}
            />
            MOR Staking
          </button>
        </div>

        {/* Card Payment */}
        {paymentMethod === 'card' && (
          <div className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block b-text-sm b-font-medium b-text-secondary b-mb-md">
                Select amount
              </label>
              <div className="grid grid-cols-3 gap-2 b-mb-md">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount)
                      setShowCustom(false)
                    }}
                    className={`py-3 px-2 b-text-sm b-font-medium b-rounded-lg transition-all ${
                      !showCustom && selectedAmount === amount
                        ? 'b-bg-math-light b-border b-border-math b-text-math-dark'
                        : 'b-bg-muted b-border b-text-secondary hover:b-border-medium'
                    }`}
                  >
                    {formatCents(amount)}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              {showCustom ? (
                <div className="flex items-center b-bg-math-light b-border b-border-math b-rounded-lg overflow-hidden">
                  <span className="pl-4 b-text-muted b-font-medium">$</span>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount (min $5)"
                    className="flex-1 py-3 px-2 bg-transparent outline-none b-text-primary"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustom(false)
                      setCustomAmount('')
                    }}
                    className="px-3 b-text-muted hover:b-text-secondary"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCustom(true)}
                  className="w-full py-3 b-text-sm b-font-medium b-rounded-lg b-bg-muted b-text-secondary hover:b-text-primary transition-colors"
                  style={{ border: '2px dashed var(--b-border-medium)' }}
                >
                  Enter custom amount
                </button>
              )}
            </div>

            {/* Summary */}
            <div className="b-bg-muted b-rounded-xl b-p-lg">
              <div className="flex justify-between items-center">
                <span className="b-text-secondary">Total</span>
                <span className="b-text-2xl b-font-bold b-text-primary">
                  {formatCents(amountCents)}
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="b-feedback b-feedback-error">
                <span>{error}</span>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || !isValidAmount}
              className="b-btn b-btn-lg b-btn-math b-btn-full"
            >
              {isLoading ? (
                <>
                  <CircleNotch size={18} className="b-animate-spin" />
                  Redirecting to checkout...
                </>
              ) : (
                <>
                  <CreditCard size={18} weight="fill" />
                  Continue to Payment
                </>
              )}
            </button>

            <p className="b-text-xs b-text-muted text-center">
              Secured by Stripe • Instant credit delivery
            </p>
          </div>
        )}

        {/* MOR Staking Payment */}
        {paymentMethod === 'mor' && (
          <WalletProvider>
            <MorStakingDeposit onSuccess={handleMorSuccess} />
          </WalletProvider>
        )}
      </div>
    </UnifiedModal>
  )
}
