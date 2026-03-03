'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PublishedPathSummary } from '@/lib/types/university'

export function usePublishedPaths() {
  const { user } = useAuth()
  const [publishedPaths, setPublishedPaths] = useState<PublishedPathSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPaths = useCallback(async () => {
    if (!user) {
      setPublishedPaths([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/published-paths', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch published paths')
        setPublishedPaths([])
      } else {
        setPublishedPaths(json.data.paths)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch published paths')
      setPublishedPaths([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchPaths()
  }, [fetchPaths])

  return { publishedPaths, loading, error, refetch: fetchPaths }
}
