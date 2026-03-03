/**
 * useSubscriptionStatus Hook
 * 
 * Provides subscription status for the current user
 * Caches status to avoid duplicate API calls
 */

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from './useApiFetch'
import type { SubscriptionStatus } from '@/lib/utils/subscription-helpers'

// Type for API response (may have slightly different shape)
type SubscriptionStatusResponse = {
  isActive: boolean
  plan?: string | null
  currentPeriodEnd?: string | null
  cancelAtPeriodEnd?: boolean
  stripeCustomerId?: string | null
}

export function useSubscriptionStatus() {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const [status, setStatus] = useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setStatus(null)
      setLoading(false)
      return
    }

    let cancelled = false

    const loadStatus = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchApi<SubscriptionStatusResponse>('/api/user/subscription/status')
        if (!cancelled) {
          setStatus(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load subscription status')
        // Default to inactive on error
        setStatus(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStatus()

    return () => {
      cancelled = true
    }
  }, [user, fetchApi])

  return {
    status: status as SubscriptionStatus | null,
    loading,
    error,
    isActive: status?.isActive ?? false,
    refresh: async () => {
      // Trigger reload
      if (user) {
        setLoading(true)
        try {
          const data = await fetchApi<SubscriptionStatusResponse>('/api/user/subscription/status')
          setStatus(data)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to refresh')
        } finally {
          setLoading(false)
        }
      }
    }
  }
}

