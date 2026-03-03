'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PeerReview } from '@/lib/types/university'

export function usePeerReviewsForDeliverable(deliverableId: string | undefined) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<PeerReview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    if (!user || !deliverableId) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/peer-reviews/${deliverableId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load peer reviews')
        return
      }

      setReviews(json.data.reviews)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load peer reviews')
    } finally {
      setLoading(false)
    }
  }, [user, deliverableId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return { reviews, loading, error }
}
