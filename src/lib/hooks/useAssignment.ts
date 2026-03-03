/**
 * useAssignment Hook
 * For admin to assign/reassign work to developers
 */

'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

export function useAssignment() {
  const { user } = useAuth()
  const [isAssigning, setIsAssigning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const assignWork = async (
    itemType: 'project' | 'document',
    itemId: string,
    developerId: string | null,
    reason?: string
  ) => {
    setIsAssigning(true)
    setError(null)

    try {
      const token = await user?.getIdToken()
      const response = await fetch('/api/developers/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemType,
          itemId,
          developerId,
          reason,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to assign work')
      }

      return data.assignment
    } catch (err: unknown) {
      logger.error('Useassignment', 'Assignment error', { error: err })
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      throw err
    } finally {
      setIsAssigning(false)
    }
  }

  return {
    assignWork,
    isAssigning,
    error,
  }
}
