'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PathActivityStats } from '@/lib/types/university'

export function usePathActivityStats(pathId?: string) {
  const { user } = useAuth()
  const [stats, setStats] = useState<PathActivityStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!user || !pathId) {
      setStats(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/path-stats?pathId=${encodeURIComponent(pathId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch activity stats')
        setStats(null)
      } else {
        setStats(json.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activity stats')
      setStats(null)
    } finally {
      setLoading(false)
    }
  }, [user, pathId])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error }
}
