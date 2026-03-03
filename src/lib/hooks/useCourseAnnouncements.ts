'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { CourseAnnouncement } from '@/lib/types/university'

export function useCourseAnnouncements(sourcePathId: string | undefined) {
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !sourcePathId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchAnnouncements() {
      try {
        const token = await user!.getIdToken()
        const res = await fetch(
          `/api/university/announcements?sourcePathId=${encodeURIComponent(sourcePathId!)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!res.ok) throw new Error('Failed to fetch announcements')
        const data = await res.json()
        if (!cancelled) {
          setAnnouncements(data.data?.announcements || [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAnnouncements()
    return () => { cancelled = true }
  }, [user, sourcePathId])

  return { announcements, loading, error }
}
