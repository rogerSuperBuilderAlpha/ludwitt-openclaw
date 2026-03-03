'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { CodeReviewComment } from '@/lib/types/university'

export function useCodeReviews(submissionId?: string) {
  const { user } = useAuth()
  const [comments, setComments] = useState<CodeReviewComment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = useCallback(async () => {
    if (!user || !submissionId) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const params = new URLSearchParams({ submissionId })
      const response = await fetch(`/api/university/sandbox/reviews?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load review comments')
        return
      }

      setComments(json.data.comments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load review comments')
    } finally {
      setLoading(false)
    }
  }, [user, submissionId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const addComment = useCallback(
    async (params: { fileName: string; lineNumber: number; body: string }) => {
      if (!user || !submissionId) return

      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/sandbox/reviews', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sandboxSubmissionId: submissionId,
            ...params,
          }),
        })
        const json = await response.json()

        if (!response.ok || !json.success) {
          setError(json.error || 'Failed to add comment')
          return
        }

        // Refresh comments
        await fetchComments()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add comment')
      }
    },
    [user, submissionId, fetchComments]
  )

  return { comments, loading, error, addComment }
}
