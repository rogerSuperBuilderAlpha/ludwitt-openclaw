'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export interface GoogleCalendarEvent {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  isAllDay: boolean
  location?: string
}

export function useGoogleCalendarEvents(month: number, year: number, connected: boolean) {
  const { user } = useAuth()
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([])
  const [loading, setLoading] = useState(false)

  const fetchEvents = useCallback(async () => {
    if (!user || !connected) {
      setEvents([])
      return
    }

    setLoading(true)
    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/university/calendar/events?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setEvents(data.data?.events || [])
      }
    } catch {
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [user, month, year, connected])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return { events, loading, refetch: fetchEvents }
}
