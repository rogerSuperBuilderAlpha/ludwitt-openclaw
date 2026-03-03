/**
 * useDiscussions Hooks
 *
 * Real-time listeners and mutation hooks for course discussion threads and replies.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import type { DiscussionThread, DiscussionReply } from '@/lib/types/university'
import { logger } from '@/lib/logger'

// ---------------------------------------------------------------------------
// Timestamp helper (same pattern as useBusinessIdeas)
// ---------------------------------------------------------------------------

function toISO(ts: unknown): string {
  if (!ts) return new Date().toISOString()
  if (typeof ts === 'string') return ts
  if (typeof ts === 'object' && ts !== null && 'toDate' in ts) {
    return (ts as { toDate: () => Date }).toDate().toISOString()
  }
  return new Date().toISOString()
}

function toThread(doc: { id: string; data: () => Record<string, unknown> }): DiscussionThread {
  const d = doc.data()
  return {
    id: doc.id,
    courseId: d.courseId as string,
    ...(d.deliverableId ? { deliverableId: d.deliverableId as string } : {}),
    learningPathId: d.learningPathId as string,
    authorId: d.authorId as string,
    authorName: d.authorName as string,
    title: d.title as string,
    body: d.body as string,
    isPinned: (d.isPinned as boolean) ?? false,
    isAccepted: (d.isAccepted as boolean) ?? false,
    upvotes: (d.upvotes as string[]) ?? [],
    replyCount: (d.replyCount as number) ?? 0,
    lastActivityAt: toISO(d.lastActivityAt),
    createdAt: toISO(d.createdAt),
  }
}

function toReply(doc: { id: string; data: () => Record<string, unknown> }): DiscussionReply {
  const d = doc.data()
  return {
    id: doc.id,
    threadId: d.threadId as string,
    authorId: d.authorId as string,
    authorName: d.authorName as string,
    body: d.body as string,
    isAccepted: (d.isAccepted as boolean) ?? false,
    upvotes: (d.upvotes as string[]) ?? [],
    createdAt: toISO(d.createdAt),
  }
}

// ---------------------------------------------------------------------------
// useDiscussionThreads — real-time listener
// ---------------------------------------------------------------------------

export function useDiscussionThreads(courseId: string | undefined, deliverableId?: string) {
  const [threads, setThreads] = useState<DiscussionThread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) {
      setThreads([])
      setLoading(false)
      return
    }

    const constraints = [
      where('courseId', '==', courseId),
      ...(deliverableId ? [where('deliverableId', '==', deliverableId)] : []),
      orderBy('lastActivityAt', 'desc'),
    ]

    const q = query(collection(db, 'discussionThreads'), ...constraints)

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => toThread(doc as unknown as { id: string; data: () => Record<string, unknown> }))

        // Sort: pinned first, then by lastActivityAt desc
        results.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
        })

        setThreads(results)
        setLoading(false)
      },
      (err) => {
        logger.error('Usediscussions', 'Error fetching discussion threads', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [courseId, deliverableId])

  return { threads, loading, error }
}

// ---------------------------------------------------------------------------
// useDiscussionReplies — real-time listener
// ---------------------------------------------------------------------------

export function useDiscussionReplies(threadId: string | undefined) {
  const [replies, setReplies] = useState<DiscussionReply[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!threadId) {
      setReplies([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'discussionReplies'),
      where('threadId', '==', threadId),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => toReply(doc as unknown as { id: string; data: () => Record<string, unknown> }))
        setReplies(results)
        setLoading(false)
      },
      (err) => {
        logger.error('Usediscussions', 'Error fetching discussion replies', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [threadId])

  return { replies, loading, error }
}

// ---------------------------------------------------------------------------
// useCreateThread — mutation hook
// ---------------------------------------------------------------------------

export function useCreateThread() {
  const { user } = useAuth()
  const [creating, setCreating] = useState(false)

  const createThread = useCallback(
    async (params: {
      courseId: string
      deliverableId?: string
      learningPathId: string
      title: string
      body: string
    }) => {
      if (!user) return { error: 'Not authenticated' }

      setCreating(true)
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/discussions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          return { error: json.error || 'Failed to create thread' }
        }

        return { thread: json.data.thread as DiscussionThread }
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Failed to create thread' }
      } finally {
        setCreating(false)
      }
    },
    [user]
  )

  return { createThread, creating }
}

// ---------------------------------------------------------------------------
// useCreateReply — mutation hook
// ---------------------------------------------------------------------------

export function useCreateReply() {
  const { user } = useAuth()
  const [replying, setReplying] = useState(false)

  const createReply = useCallback(
    async (params: { threadId: string; body: string }) => {
      if (!user) return { error: 'Not authenticated' }

      setReplying(true)
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/discussions/replies', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          return { error: json.error || 'Failed to create reply' }
        }

        return { reply: json.data.reply as DiscussionReply }
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Failed to create reply' }
      } finally {
        setReplying(false)
      }
    },
    [user]
  )

  return { createReply, replying }
}

// ---------------------------------------------------------------------------
// useUpvote — mutation hook
// ---------------------------------------------------------------------------

export function useUpvote() {
  const { user } = useAuth()
  const [toggling, setToggling] = useState(false)

  const toggleUpvote = useCallback(
    async (targetId: string, targetType: 'thread' | 'reply') => {
      if (!user) return { error: 'Not authenticated' }

      setToggling(true)
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/discussions/upvote', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ targetId, targetType }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          return { error: json.error || 'Failed to toggle upvote' }
        }

        return { upvoted: json.data.upvoted as boolean }
      } catch (err) {
        return { error: err instanceof Error ? err.message : 'Failed to toggle upvote' }
      } finally {
        setToggling(false)
      }
    },
    [user]
  )

  return { toggleUpvote, toggling }
}
