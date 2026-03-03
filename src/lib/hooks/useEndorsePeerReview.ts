'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export function useEndorsePeerReview() {
  const { user } = useAuth()
  const [isEndorsing, setIsEndorsing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endorse = useCallback(
    async (reviewId: string): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsEndorsing(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/professors/peer-reviews/endorse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reviewId }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to endorse review'
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to endorse review'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsEndorsing(false)
      }
    },
    [user]
  )

  return { endorse, isEndorsing, error }
}
