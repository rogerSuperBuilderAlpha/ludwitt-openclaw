'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface PostAnnouncementParams {
  sourcePathId: string
  title: string
  body: string
}

export function usePostAnnouncement() {
  const { user } = useAuth()
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function postAnnouncement({ sourcePathId, title, body }: PostAnnouncementParams) {
    if (!user || isPosting) return null
    setIsPosting(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/professors/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sourcePathId, title, body }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to post announcement')
      }
      const data = await res.json()
      return data.data?.announcement || null
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      return null
    } finally {
      setIsPosting(false)
    }
  }

  return { postAnnouncement, isPosting, error }
}
