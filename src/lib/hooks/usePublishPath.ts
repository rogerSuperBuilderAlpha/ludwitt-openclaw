'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export function usePublishPath() {
  const { user } = useAuth()
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const publishPath = useCallback(
    async (pathId: string, options?: { anonymous?: boolean }): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsPublishing(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/publish-path', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pathId, anonymous: options?.anonymous }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to publish path'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsPublishing(false)
      }
    },
    [user]
  )

  return { publishPath, isPublishing, error }
}
