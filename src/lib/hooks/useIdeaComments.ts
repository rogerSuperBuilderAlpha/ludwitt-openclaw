'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { IdeaComment } from '@/lib/types/university'

export function useIdeaComments(ideaId: string | undefined, ideaCollection: 'business' | 'thesis' | undefined) {
  const { user } = useAuth()
  const [comments, setComments] = useState<IdeaComment[]>([])
  const [loading, setLoading] = useState(false)
  const [posting, setPosting] = useState(false)

  const fetchComments = useCallback(async () => {
    if (!user || !ideaId || !ideaCollection) {
      setComments([])
      return
    }

    setLoading(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch(
        `/api/professors/ideas/comments?ideaId=${ideaId}&collection=${ideaCollection}`,
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
  }, [user, ideaId, ideaCollection])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const postComment = useCallback(async (text: string) => {
    if (!user || !ideaId || !ideaCollection) return { error: 'Missing data' }

    setPosting(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/ideas/comments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ideaId, ideaCollection, text }),
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to post comment' }
      }

      // Append the new comment optimistically
      const newComment = json.data.comment as IdeaComment
      setComments(prev => [...prev, newComment])
      return {}
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to post comment' }
    } finally {
      setPosting(false)
    }
  }, [user, ideaId, ideaCollection])

  return { comments, loading, posting, postComment, refetch: fetchComments }
}
