/**
 * useCreateBusinessIdea Hook
 * Mutation hook for POST /api/university/create-business-idea
 */

'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  CreateBusinessIdeaRequest,
  CreateBusinessIdeaResponse,
} from '@/lib/types/university'

export function useCreateBusinessIdea() {
  const { user } = useAuth()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createIdea = useCallback(
    async (request: CreateBusinessIdeaRequest): Promise<{ data: CreateBusinessIdeaResponse | null; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { data: null, error: msg }
      }

      setIsCreating(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/create-business-idea', {
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

        const data = json.data as CreateBusinessIdeaResponse
        return { data, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create business idea'
        setError(message)
        return { data: null, error: message }
      } finally {
        setIsCreating(false)
      }
    },
    [user]
  )

  return { createIdea, isCreating, error }
}
