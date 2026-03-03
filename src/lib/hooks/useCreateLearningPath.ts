/**
 * useCreateLearningPath Hook
 * Mutation hook for POST /api/university/create-path
 */

'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  CreateLearningPathRequest,
  CreateLearningPathResponse,
} from '@/lib/types/university'

export function useCreateLearningPath() {
  const { user } = useAuth()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<CreateLearningPathResponse | null>(null)

  const createPath = useCallback(
    async (request: CreateLearningPathRequest): Promise<{ data: CreateLearningPathResponse | null; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { data: null, error: msg }
      }

      setIsCreating(true)
      setError(null)
      setResult(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/create-path', {
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

        const data = json.data as CreateLearningPathResponse
        setResult(data)
        return { data, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create learning path'
        setError(message)
        return { data: null, error: message }
      } finally {
        setIsCreating(false)
      }
    },
    [user]
  )

  return { createPath, isCreating, error, result }
}
