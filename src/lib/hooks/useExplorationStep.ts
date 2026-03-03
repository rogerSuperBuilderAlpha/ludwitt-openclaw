'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ExplorationSession, ExplorationStepRequest } from '@/lib/types/university'

export function useExplorationStep() {
  const { user } = useAuth()
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const advanceStep = useCallback(
    async (data: ExplorationStepRequest): Promise<{ session?: ExplorationSession; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { error: msg }
      }

      setIsAdvancing(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/exploration/step', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to advance step'
          setError(errMsg)
          return { error: errMsg }
        }

        return { session: json.data.session, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to advance step'
        setError(message)
        return { error: message }
      } finally {
        setIsAdvancing(false)
      }
    },
    [user]
  )

  return { advanceStep, isAdvancing, error }
}
