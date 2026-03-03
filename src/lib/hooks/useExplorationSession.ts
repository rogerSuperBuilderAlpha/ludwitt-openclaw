'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ExplorationSession } from '@/lib/types/university'

export function useExplorationSession(sessionId: string | undefined) {
  const { user } = useAuth()
  const [session, setSession] = useState<ExplorationSession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSession = useCallback(async () => {
    if (!user || !sessionId) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/exploration/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load session')
        return
      }

      setSession(json.data.session)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load session')
    } finally {
      setLoading(false)
    }
  }, [user, sessionId])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return { session, loading, error, setSession }
}
