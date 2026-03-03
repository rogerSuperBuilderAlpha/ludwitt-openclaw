'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { Wallet, AlertTriangle, TrendingDown } from 'lucide-react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

interface BalanceData {
  balance: number
  balanceFormatted: string
  canUseAI: boolean
  isLowBalance: boolean
  isAtDebtLimit: boolean
  debtLimitFormatted: string
}

interface BalanceDisplayProps {
  onAddFunds?: () => void
  compact?: boolean
  className?: string
}

export function BalanceDisplay({
  onAddFunds,
  compact = false,
  className = '',
}: BalanceDisplayProps) {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const [balance, setBalance] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const loadBalance = async () => {
      try {
        const data = await fetchApi<BalanceData>('/api/credits/balance')
        setBalance(data)
      } catch (error) {
        logger.error('BalanceDisplay', 'Failed to load balance', { error })
      } finally {
        setLoading(false)
      }
    }

    loadBalance()
  }, [user, fetchApi])

  if (loading) {
    return (
      <div
        className={`animate-pulse b-bg-muted b-rounded-lg h-8 w-20 ${className}`}
      />
    )
  }

  if (!balance) {
    return null
  }

  const getStatusColor = () => {
    if (balance.isAtDebtLimit)
      return 'b-text-error b-bg-error-light b-border-error'
    if (balance.isLowBalance)
      return 'b-text-warning b-bg-warning-light b-border-warning'
    return 'b-text-success b-bg-success-light b-border-success'
  }

  const getIcon = () => {
    if (balance.isAtDebtLimit) return <AlertTriangle className="w-4 h-4" />
    if (balance.isLowBalance) return <TrendingDown className="w-4 h-4" />
    return <Wallet className="w-4 h-4" />
  }

  if (compact) {
    return (
      <button
        onClick={onAddFunds}
        className={`flex items-center gap-1.5 px-2 py-1 b-rounded-lg b-border b-text-sm b-font-medium transition-colors hover:opacity-80 ${getStatusColor()} ${className}`}
        title={
          balance.isAtDebtLimit
            ? 'Add funds to continue using AI features'
            : 'Click to add funds'
        }
      >
        {getIcon()}
        <span>{balance.balanceFormatted}</span>
      </button>
    )
  }

  return (
    <div
      className={`b-rounded-xl b-border b-p-lg ${getStatusColor()} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="b-font-medium">Credit Balance</span>
        </div>
        <span className="b-text-xl b-font-bold">
          {balance.balanceFormatted}
        </span>
      </div>

      {balance.isAtDebtLimit && (
        <div className="b-mt-md b-text-sm">
          <p className="b-font-medium">
            You&apos;ve reached the {balance.debtLimitFormatted} debt limit.
          </p>
          <p className="b-text-secondary">
            Add funds to continue using AI features.
          </p>
        </div>
      )}

      {balance.isLowBalance && !balance.isAtDebtLimit && (
        <div className="b-mt-md b-text-sm">
          <p>Your balance is running low. Consider adding funds soon.</p>
        </div>
      )}

      {onAddFunds && (
        <button
          onClick={onAddFunds}
          className="b-mt-md w-full py-2 px-4 b-bg-elevated b-border b-rounded-lg b-font-medium hover:b-bg-muted transition-colors"
        >
          Add Funds
        </button>
      )}
    </div>
  )
}
