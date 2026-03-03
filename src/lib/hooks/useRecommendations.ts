'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { RecommendationsResponse } from '@/lib/types/university'

export function useRecommendations(): {
  recommendations: RecommendationsResponse | null
  loading: boolean
  error: string | null
  refresh: () => void
} {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = useCallback(async () => {
    if (!user) {
      setRecommendations(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/recommendations', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch recommendations')
        setRecommendations(null)
      } else {
        setRecommendations(json.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recommendations')
      setRecommendations(null)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchRecommendations()
  }, [fetchRecommendations])

  return { recommendations, loading, error, refresh: fetchRecommendations }
}
