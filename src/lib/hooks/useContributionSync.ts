'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface ContributionSyncResult {
  sync: () => Promise<void>
  isSyncing: boolean
  error: string | null
}

export function useContributionSync(onSuccess?: () => Promise<void>): ContributionSyncResult {
  const { user } = useAuth()
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sync = useCallback(async () => {
    if (!user) return

    setIsSyncing(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/contributions/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to sync contributions')
        return
      }

      // Trigger parent refetch to update the UI
      if (onSuccess) await onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync contributions')
    } finally {
      setIsSyncing(false)
    }
  }, [user, onSuccess])

  return { sync, isSyncing, error }
}
