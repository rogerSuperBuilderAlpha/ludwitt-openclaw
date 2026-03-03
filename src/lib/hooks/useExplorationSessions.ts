'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ExplorationSession } from '@/lib/types/university'

export function useExplorationSessions(courseId?: string) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<ExplorationSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const url = courseId
        ? `/api/university/exploration/list?courseId=${courseId}`
        : '/api/university/exploration/list'

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load sessions')
        return
      }

      setSessions(json.data.sessions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }, [user, courseId])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  return { sessions, loading, error, refetch: fetchSessions }
}
