'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { BookSlotRequest } from '@/lib/types/university'

export function useBookSlot() {
  const { user } = useAuth()
  const [isBooking, setIsBooking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bookSlot = useCallback(
    async (data: BookSlotRequest): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsBooking(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/book-slot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to book slot'
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to book slot'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsBooking(false)
      }
    },
    [user]
  )

  return { bookSlot, isBooking, error }
}
