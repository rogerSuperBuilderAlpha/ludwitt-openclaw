'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export function useStartDeliverable() {
  const { user } = useAuth()
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startDeliverable = useCallback(
    async (courseId: string, deliverableId: string): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsStarting(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/start-deliverable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courseId, deliverableId }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to start deliverable'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsStarting(false)
      }
    },
    [user]
  )

  return { startDeliverable, isStarting, error }
}
