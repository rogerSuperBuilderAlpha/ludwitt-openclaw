/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * CreditsBadge Component
 *
 * Displays the user's current credit balance with visual indicators
 * for low balance and at-debt-limit states. Links to the credits page
 * for deposits.
 */

import { useState } from 'react'
import Link from 'next/link'
import { useCredits } from '@/lib/hooks/useCredits'
import {
  Wallet,
  Plus,
  Warning,
  CaretDown,
  ArrowRight,
} from '@phosphor-icons/react'

interface CreditsBadgeProps {
  /** Show compact version (icon + amount only) */
  compact?: boolean
  /** Additional CSS classes */
  className?: string
}

export function CreditsBadge({
  compact = false,
  className = '',
}: CreditsBadgeProps) {
  const { balance, loading, error } = useCredits()
  const [showDropdown, setShowDropdown] = useState(false)

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse" />
      </div>
    )
  }

  if (error || !balance) {
    return null // Silently fail - credits aren't critical for basic functionality
  }

  const { balanceFormatted, isLowBalance, isAtDebtLimit, canUseAI } = balance

  // Determine visual state
  const getStateStyles = () => {
    if (isAtDebtLimit) {
      return {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        iconColor: 'text-red-500',
        label: 'Add funds required',
      }
    }
    if (isLowBalance) {
      return {
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-700',
        iconColor: 'text-amber-500',
        label: 'Low balance',
      }
    }
    return {
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-500',
      label: 'Credits available',
    }
  }

  const styles = getStateStyles()

  if (compact) {
    return (
      <Link
        href="/account/credits"
        className={`
          inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
          ${styles.bgColor} ${styles.borderColor} border
          hover:opacity-80 transition-opacity
          ${className}
        `}
        title={`${balanceFormatted} credits - Click to manage`}
      >
        <Wallet weight="fill" className={`w-4 h-4 ${styles.iconColor}`} />
        <span className={`text-sm font-semibold ${styles.textColor}`}>
          {balanceFormatted}
        </span>
        {(isLowBalance || isAtDebtLimit) && (
          <Warning weight="fill" className="w-3.5 h-3.5 text-amber-500" />
        )}
      </Link>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl
          ${styles.bgColor} ${styles.borderColor} border
          hover:opacity-90 transition-all w-full
        `}
      >
        <div className={`p-1.5 rounded-lg ${styles.bgColor}`}>
          <Wallet weight="fill" className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className={`text-base font-bold ${styles.textColor}`}>
              {balanceFormatted}
            </span>
            {(isLowBalance || isAtDebtLimit) && (
              <Warning weight="fill" className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <span className="text-xs text-gray-500">{styles.label}</span>
        </div>
        <CaretDown
          weight="bold"
          className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute left-0 right-0 mt-2 p-3 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
            {/* Balance Summary */}
            <div className="mb-3 pb-3 border-b border-gray-100">
              <div className="text-xs text-gray-500 mb-1">
                Available Balance
              </div>
              <div className={`text-2xl font-bold ${styles.textColor}`}>
                {balanceFormatted}
              </div>
              {!canUseAI && (
                <p className="text-xs text-red-600 mt-1">
                  Add credits to continue using AI features
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-xs text-gray-500">Total Deposited</div>
                <div className="text-sm font-semibold text-gray-900">
                  {balance.totalDepositedFormatted}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-xs text-gray-500">Total Used</div>
                <div className="text-sm font-semibold text-gray-900">
                  {balance.totalUsedFormatted}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                href="/account/credits"
                className="flex items-center justify-between w-full px-3 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <span className="flex items-center gap-2">
                  <Plus weight="bold" className="w-4 h-4" />
                  <span className="font-medium">Add Credits</span>
                </span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </Link>

              <Link
                href="/account/credits"
                className="flex items-center justify-center w-full px-3 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                View transaction history
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
