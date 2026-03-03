'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ReviewVerdict } from '@/lib/types/university'

export function useReviewDeliverable() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const review = useCallback(async (body: {
    courseId: string
    deliverableId: string
    verdict: ReviewVerdict
    feedback?: string
  }) => {
    if (!user) return { error: 'Not authenticated' }
    setLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/review-deliverable', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to review' }
      }
      return { data: json.data }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to review' }
    } finally {
      setLoading(false)
    }
  }, [user])

  return { review, loading }
}
