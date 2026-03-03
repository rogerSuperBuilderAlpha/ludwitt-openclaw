'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { DeliverableComment } from '@/lib/types/university'

export function useDeliverableComments(courseId: string | undefined, deliverableId: string | undefined) {
  const { user } = useAuth()
  const [comments, setComments] = useState<DeliverableComment[]>([])
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)

  const fetchComments = useCallback(async () => {
    if (!user || !courseId || !deliverableId) {
      setComments([])
      return
    }

    setLoading(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch(
        `/api/professors/deliverable-comments?courseId=${courseId}&deliverableId=${deliverableId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const json = await response.json()

      if (response.ok && json.success) {
        setComments(json.data.comments || [])
      } else {
        setComments([])
      }
    } catch {
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [user, courseId, deliverableId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const postComment = useCallback(async (text: string) => {
    if (!user || !courseId || !deliverableId) return { error: 'Missing data' }

    setPosting(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/deliverable-comments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, deliverableId, text }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to post comment' }
      }

      const newComment = json.data.comment as DeliverableComment
      setComments(prev => [...prev, newComment])
      return {}
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to post comment' }
    } finally {
      setPosting(false)
    }
  }, [user, courseId, deliverableId])

  return { comments, loading, posting, postComment, refetch: fetchComments }
}
