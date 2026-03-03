/**
 * useCredits Hook
 * 
 * Provides credit balance information and refresh functionality
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from './useApiFetch'

export interface CreditBalance {
  balance: number
  balanceFormatted: string
  totalDeposited: number
  totalDepositedFormatted: string
  totalUsed: number
  totalUsedFormatted: string
  canUseAI: boolean
  isLowBalance: boolean
  isAtDebtLimit: boolean
  debtLimit: number
  debtLimitFormatted: string
  lastDepositAt: string | null
  lastUsageAt: string | null
}

interface UseCreditsResult {
  balance: CreditBalance | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useCredits(): UseCreditsResult {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const [balance, setBalance] = useState<CreditBalance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBalance = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await fetchApi<CreditBalance>('/api/credits/balance')
      setBalance(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load balance')
    } finally {
      setLoading(false)
    }
  }, [user, fetchApi])

  useEffect(() => {
    loadBalance()
  }, [loadBalance])

  return {
    balance,
    loading,
    error,
    refresh: loadBalance,
  }
}
