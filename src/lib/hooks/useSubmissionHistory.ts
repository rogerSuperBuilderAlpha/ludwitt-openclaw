'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { SubmissionHistoryEvent } from '@/lib/types/university'

export function useSubmissionHistory(courseId: string, deliverableId: string) {
  const { user } = useAuth()
  const [events, setEvents] = useState<SubmissionHistoryEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !courseId || !deliverableId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchHistory() {
      try {
        const token = await user!.getIdToken()
        const res = await fetch(
          `/api/university/submission-history?courseId=${encodeURIComponent(courseId)}&deliverableId=${encodeURIComponent(deliverableId)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error('Failed to fetch history')
        const data = await res.json()
        if (!cancelled) {
          setEvents(data.data?.events || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchHistory()
    return () => { cancelled = true }
  }, [user, courseId, deliverableId])

  return { events, loading, error }
}
