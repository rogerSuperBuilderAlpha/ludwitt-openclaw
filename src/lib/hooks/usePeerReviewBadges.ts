'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PeerReviewBadge } from '@/lib/types/university'

export function usePeerReviewBadges() {
  const { user } = useAuth()
  const [badges, setBadges] = useState<PeerReviewBadge[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBadges = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/peer-reviews/badges', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load badges')
        return
      }

      setBadges(json.data.badges)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load badges')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchBadges()
  }, [fetchBadges])

  return { badges, loading, error }
}
