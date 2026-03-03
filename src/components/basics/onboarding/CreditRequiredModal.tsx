'use client'

import { useRouter } from 'next/navigation'
import {
  Coin,
  CreditCard,
  ArrowRight,
  Lightning,
  BookOpen,
  Brain,
  Sparkle,
  X,
} from '@phosphor-icons/react'
import FocusTrap from 'focus-trap-react'
import { Portal } from '../Portal'
import { formatCentsAsDollars } from '@/lib/credits/pricing'

interface CreditRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number
  onContinueWithoutAI?: () => void
}

export function CreditRequiredModal({
  isOpen,
  onClose,
  currentBalance,
  onContinueWithoutAI,
}: CreditRequiredModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleAddCredits = () => {
    onClose()
    router.push('/account/credits')
  }

  const handleContinue = () => {
    if (onContinueWithoutAI) {
      onContinueWithoutAI()
    }
    onClose()
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="credit-required-modal-title"
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close"
              >
                <X size={20} className="text-gray-400" weight="bold" />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl b-bg-writing-light b-border b-border-writing mb-4">
                  <Coin
                    size={32}
                    className="b-text-writing-dark"
                    weight="fill"
                  />
                </div>
                <h2
                  id="credit-required-modal-title"
                  className="b-text-xl b-font-bold b-text-primary"
                >
                  Credits Required
                </h2>
                <p className="b-text-secondary b-mt-sm">
                  You&apos;ve used your $1 trial credit
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 space-y-5">
              {/* Current Balance */}
              <div className="b-bg-danger-light b-border b-border-danger b-rounded-xl b-p-lg text-center">
                <p className="b-text-sm b-text-danger-dark">Current Balance</p>
                <p className="b-text-2xl b-font-bold b-text-danger-dark">
                  {formatCentsAsDollars(currentBalance)}
                </p>
              </div>

              {/* What you unlock */}
              <div className="b-bg-muted b-rounded-xl b-p-lg">
                <p className="b-font-semibold b-text-primary b-mb-md flex items-center gap-2">
                  <Sparkle size={18} className="b-text-writing" weight="fill" />
                  Add credits to unlock:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 b-rounded-full b-bg-math-light flex items-center justify-center flex-shrink-0">
                      <Lightning
                        size={16}
                        className="b-text-math-dark"
                        weight="fill"
                      />
                    </div>
                    <div>
                      <p className="b-text-sm b-font-medium b-text-primary">
                        Smart Hints
                      </p>
                      <p className="b-text-xs b-text-secondary">
                        Get nudges without spoilers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 b-rounded-full b-bg-reading-light flex items-center justify-center flex-shrink-0">
                      <BookOpen
                        size={16}
                        className="b-text-reading-dark"
                        weight="fill"
                      />
                    </div>
                    <div>
                      <p className="b-text-sm b-font-medium b-text-primary">
                        AI Explanations
                      </p>
                      <p className="b-text-xs b-text-secondary">
                        Understand concepts deeply
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 b-rounded-full b-bg-logic-light flex items-center justify-center flex-shrink-0">
                      <Brain
                        size={16}
                        className="b-text-logic-dark"
                        weight="fill"
                      />
                    </div>
                    <div>
                      <p className="b-text-sm b-font-medium b-text-primary">
                        Socratic Tutor
                      </p>
                      <p className="b-text-xs b-text-secondary">
                        Guided problem-solving
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing info */}
              <div className="b-bg-reading-light b-border b-border-reading b-rounded-xl b-p-md">
                <div className="flex items-center gap-3">
                  <CreditCard
                    size={24}
                    className="b-text-reading-dark"
                    weight="fill"
                  />
                  <div>
                    <p className="b-font-medium b-text-reading-dark">
                      Start with just $5
                    </p>
                    <p className="b-text-xs b-text-reading-text">
                      Credits never expire
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddCredits}
                  className="b-btn b-btn-lg b-btn-reading b-btn-full"
                >
                  <CreditCard size={20} weight="fill" />
                  Add Credits
                  <ArrowRight size={18} weight="bold" />
                </button>

                {onContinueWithoutAI && (
                  <button
                    onClick={handleContinue}
                    className="b-btn b-btn-lg b-btn-secondary b-btn-full"
                  >
                    Continue Without AI
                  </button>
                )}
              </div>

              {/* Free practice note */}
              <p className="b-text-xs b-text-secondary text-center">
                Practice problems are always free—only AI features require
                credits.
              </p>
            </div>
          </div>
        </FocusTrap>
      </div>
    </Portal>
  )
}
