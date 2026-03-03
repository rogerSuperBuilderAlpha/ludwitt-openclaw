'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export function useToggleCreatorAnonymous() {
  const { user } = useAuth()
  const [isToggling, setIsToggling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleAnonymous = useCallback(
    async (pathId: string, creatorAnonymous: boolean): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsToggling(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/toggle-creator-anonymous', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pathId, creatorAnonymous }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to toggle anonymity'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsToggling(false)
      }
    },
    [user]
  )

  return { toggleAnonymous, isToggling, error }
}
