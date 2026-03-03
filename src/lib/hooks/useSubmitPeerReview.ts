'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { SubmitPeerReviewRequest } from '@/lib/types/university'

export function useSubmitPeerReview() {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitReview = useCallback(
    async (data: SubmitPeerReviewRequest): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsSubmitting(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/peer-reviews/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to submit review'
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit review'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsSubmitting(false)
      }
    },
    [user]
  )

  return { submitReview, isSubmitting, error }
}
