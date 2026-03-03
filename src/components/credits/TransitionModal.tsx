'use client'

import {
  Gift,
  Sparkle,
  CurrencyDollar,
  Lightning,
  CreditCard,
  ArrowRight,
  Wallet,
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { useCredits } from '@/lib/hooks/useCredits'
import { UnifiedModal } from '@/components/basics/UnifiedModal'

interface TransitionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransitionModal({ isOpen, onClose }: TransitionModalProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { balance } = useCredits()

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`credit_transition_seen_${user.uid}`, 'true')
    }
    onClose()
  }

  const handleGoToCredits = () => {
    handleClose()
    router.push('/account/credits')
  }

  const hasCredits = balance && balance.balance > 0

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Welcome to Credits!"
      subtitle="Pay-as-you-go AI features"
      icon={<Sparkle size={20} weight="fill" />}
      size="md"
    >
      <div className="space-y-5">
        {/* Hero Banner */}
        <div className="relative overflow-hidden b-rounded-xl b-bg-logic b-p-xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative">
            <h3 className="b-text-xl b-font-bold b-text-inverse b-mb-sm">
              Simple, Transparent Pricing
            </h3>
            <p className="b-text-inverse opacity-80">
              Pay only for what you use • No subscriptions required
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="b-bg-muted b-rounded-xl b-p-lg space-y-4">
          <h3 className="b-font-semibold b-text-primary flex items-center gap-2">
            <CurrencyDollar
              size={20}
              className="b-text-reading"
              weight="fill"
            />
            How Credits Work
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 b-rounded-full b-bg-math-light b-text-math-dark flex items-center justify-center flex-shrink-0 b-text-xs b-font-bold">
                1
              </div>
              <div>
                <p className="b-font-medium b-text-primary">Purchase Credits</p>
                <p className="b-text-sm b-text-secondary">
                  Add funds starting from just $5
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 b-rounded-full b-bg-math-light b-text-math-dark flex items-center justify-center flex-shrink-0 b-text-xs b-font-bold">
                2
              </div>
              <div>
                <p className="b-font-medium b-text-primary">Use AI Features</p>
                <p className="b-text-sm b-text-secondary">
                  Get explanations, hints, grading feedback, and more
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 b-rounded-full b-bg-math-light b-text-math-dark flex items-center justify-center flex-shrink-0 b-text-xs b-font-bold">
                3
              </div>
              <div>
                <p className="b-font-medium b-text-primary">
                  Pay Only for Usage
                </p>
                <p className="b-text-sm b-text-secondary">
                  Credits are deducted based on actual AI usage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3">
          <div className="b-bg-reading-light b-rounded-xl b-p-md text-center b-border b-border-reading">
            <Lightning
              size={24}
              className="b-text-reading-dark mx-auto b-mb-sm"
              weight="fill"
            />
            <p className="b-text-sm b-font-medium b-text-reading-dark">
              No Subscriptions
            </p>
            <p className="b-text-xs b-text-reading-text">
              Pay only when you use AI
            </p>
          </div>
          <div className="b-bg-math-light b-rounded-xl b-p-md text-center b-border b-border-math">
            <Wallet
              size={24}
              className="b-text-math-dark mx-auto b-mb-sm"
              weight="fill"
            />
            <p className="b-text-sm b-font-medium b-text-math-dark">
              Credits Never Expire
            </p>
            <p className="b-text-xs b-text-math-text">Use at your own pace</p>
          </div>
        </div>

        {/* Current Balance or Get Started */}
        {hasCredits ? (
          <div className="b-bg-reading-light b-border b-border-reading b-rounded-xl b-p-lg text-center">
            <p className="b-font-semibold b-text-reading-dark">Your Balance</p>
            <p className="b-text-2xl b-font-bold b-text-reading-dark b-mt-sm">
              {balance?.balanceFormatted || '$0.00'}
            </p>
            <p className="b-text-xs b-text-reading-text b-mt-md">
              You&apos;re all set! Use AI features to enhance your learning.
            </p>
          </div>
        ) : (
          <div className="b-bg-writing-light b-border b-border-writing b-rounded-xl b-p-lg">
            <div className="flex items-start gap-3">
              <Gift
                size={24}
                className="b-text-writing-dark flex-shrink-0"
                weight="fill"
              />
              <div>
                <p className="b-font-medium b-text-writing-dark">
                  Get Started with $5
                </p>
                <p className="b-text-sm b-text-writing-text b-mt-sm">
                  Purchase your first credits to unlock AI-powered explanations,
                  personalized hints, and intelligent feedback on your work.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleGoToCredits}
          className="b-btn b-btn-lg b-btn-reading b-btn-full"
        >
          <CreditCard size={20} weight="fill" />
          {hasCredits ? 'Manage Credits' : 'Get Credits'}
          <ArrowRight size={18} weight="bold" />
        </button>

        {/* What's included free */}
        <div className="b-bg-muted b-rounded-lg b-p-md">
          <p className="b-text-xs b-text-secondary text-center">
            <strong>Practice is always free!</strong> Math problems, reading
            exercises, Latin & Greek translations, and Logic practice don&apos;t
            require credits. Credits are only used for AI-powered features.
          </p>
        </div>
      </div>
    </UnifiedModal>
  )
}
