/**
 * useUpdateIdea Hook
 * Mutation hook for POST /api/university/update-idea
 * Used for both saving draft progress and submitting ideas.
 */

'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { UpdateIdeaRequest, UpdateIdeaResponse } from '@/lib/types/university'

export function useUpdateIdea() {
  const { user } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateIdea = useCallback(
    async (request: UpdateIdeaRequest): Promise<{ data: UpdateIdeaResponse | null; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { data: null, error: msg }
      }

      setIsUpdating(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/update-idea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || `Request failed with status ${response.status}`
          setError(errMsg)
          return { data: null, error: errMsg }
        }

        const data = json.data as UpdateIdeaResponse
        return { data, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update idea'
        setError(message)
        return { data: null, error: message }
      } finally {
        setIsUpdating(false)
      }
    },
    [user]
  )

  return { updateIdea, isUpdating, error }
}
