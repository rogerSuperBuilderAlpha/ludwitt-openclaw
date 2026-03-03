'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface SetDeadlineParams {
  courseId: string
  deliverableId: string
  deadline: string
}

export function useSetDeadline() {
  const { user } = useAuth()
  const [isSettingDeadline, setIsSettingDeadline] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function setDeadline({ courseId, deliverableId, deadline }: SetDeadlineParams) {
    if (!user || isSettingDeadline) return
    setIsSettingDeadline(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/university/set-deadline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId, deliverableId, deadline }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to set deadline')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
    } finally {
      setIsSettingDeadline(false)
    }
  }

  return { setDeadline, isSettingDeadline, error }
}
