/**
 * useApiKeyStatus Hook
 * 
 * Provides API key status for the current user
 * Caches status to avoid duplicate API calls
 */

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from './useApiFetch'

export interface ApiKeyStatus {
  hasKeys: boolean
  hasAnthropic: boolean
  hasDid: boolean
}

export function useApiKeyStatus() {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const [status, setStatus] = useState<ApiKeyStatus | null>(null)
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
        const data = await fetchApi<{ hasKeys: boolean; keys: Record<string, { hasKey: boolean }> }>('/api/user/api-keys')
        if (!cancelled) {
          setStatus({
            hasKeys: data.hasKeys,
            hasAnthropic: data.keys?.anthropic?.hasKey ?? false,
            hasDid: data.keys?.did?.hasKey ?? false
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load API key status')
          setStatus({
            hasKeys: false,
            hasAnthropic: false,
            hasDid: false
          })
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
    status,
    loading,
    error,
    hasKeys: status?.hasKeys ?? false,
    hasAnthropic: status?.hasAnthropic ?? false,
    hasDid: status?.hasDid ?? false,
    refresh: async () => {
      if (user) {
        setLoading(true)
        try {
          const data = await fetchApi<{ hasKeys: boolean; keys: Record<string, { hasKey: boolean }> }>('/api/user/api-keys')
          setStatus({
            hasKeys: data.hasKeys,
            hasAnthropic: data.keys?.anthropic?.hasKey ?? false,
            hasDid: data.keys?.did?.hasKey ?? false
          })
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to refresh')
        } finally {
          setLoading(false)
        }
      }
    }
  }
}

