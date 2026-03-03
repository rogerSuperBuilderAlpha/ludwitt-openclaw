'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PeerReview } from '@/lib/types/university'

export function usePeerReviewQueue() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<PeerReview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQueue = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/peer-reviews/queue', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load review queue')
        return
      }

      setReviews(json.data.reviews)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load review queue')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchQueue()
  }, [fetchQueue])

  return { reviews, loading, error, refetch: fetchQueue }
}
