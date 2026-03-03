'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { JoinLearningPathResponse } from '@/lib/types/university'

export function useJoinPath() {
  const { user } = useAuth()
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const joinPath = useCallback(
    async (pathId: string): Promise<{ data: JoinLearningPathResponse | null; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { data: null, error: msg }
      }

      setIsJoining(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/join-path', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pathId }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { data: null, error: errMsg }
        }

        return { data: json.data as JoinLearningPathResponse, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to join path'
        setError(message)
        return { data: null, error: message }
      } finally {
        setIsJoining(false)
      }
    },
    [user]
  )

  return { joinPath, isJoining, error }
}
