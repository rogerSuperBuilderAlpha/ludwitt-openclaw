'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ExplorationSession, StartExplorationRequest } from '@/lib/types/university'

export function useStartExploration() {
  const { user } = useAuth()
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startExploration = useCallback(
    async (data: StartExplorationRequest): Promise<{ session?: ExplorationSession; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { error: msg }
      }

      setIsStarting(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/exploration/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to start exploration'
          setError(errMsg)
          return { error: errMsg }
        }

        return { session: json.data.session, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to start exploration'
        setError(message)
        return { error: message }
      } finally {
        setIsStarting(false)
      }
    },
    [user]
  )

  return { startExploration, isStarting, error }
}
