'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { OfficeHoursBooking } from '@/lib/types/university'

export function useMyBookings(role: 'student' | 'professor') {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<OfficeHoursBooking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBookings = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const endpoint = role === 'professor'
        ? '/api/professors/my-bookings'
        : '/api/university/my-bookings'

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load bookings')
        return
      }

      setBookings(json.data.bookings)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }, [user, role])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return { bookings, loading, error, refetch: fetchBookings }
}
