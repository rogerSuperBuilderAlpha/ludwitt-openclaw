'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface CalendarStatus {
  connected: boolean
  email?: string
}

export function useUniversityCalendarStatus() {
  const { user } = useAuth()
  const [status, setStatus] = useState<CalendarStatus>({ connected: false })
  const [loading, setLoading] = useState(true)

  const fetchStatus = useCallback(async () => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/university/calendar/status', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setStatus({ connected: !!data.connected, email: data.email })
    } catch {
      setStatus({ connected: false })
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const connectCalendar = useCallback(async () => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/university/calendar/connect', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.authUrl) {
        const popup = window.open(data.authUrl, 'google-calendar-connect', 'width=500,height=600')

        const handleMessage = (event: MessageEvent) => {
          if (event.data?.type === 'university-calendar-connected' && event.data?.success) {
            window.removeEventListener('message', handleMessage)
            popup?.close()
            setStatus({ connected: true, email: undefined })
            fetchStatus()
          }
        }
        window.addEventListener('message', handleMessage)
      }
    } catch {
      // silently fail
    }
  }, [user, fetchStatus])

  return { ...status, loading, connectCalendar, refetch: fetchStatus }
}
