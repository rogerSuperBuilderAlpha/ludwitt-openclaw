'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export function useCancelBooking() {
  const { user } = useAuth()
  const [isCancelling, setIsCancelling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelBooking = useCallback(
    async (bookingId: string): Promise<{ success: boolean; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsCancelling(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/cancel-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookingId }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to cancel booking'
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to cancel booking'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsCancelling(false)
      }
    },
    [user]
  )

  return { cancelBooking, isCancelling, error }
}
