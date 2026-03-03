'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorTimeSlot, SaveTimeSlotsRequest } from '@/lib/types/university'

export function useTimeSlots() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveTimeSlots = useCallback(
    async (timeSlots: SaveTimeSlotsRequest['timeSlots']): Promise<{ success: boolean; data?: ProfessorTimeSlot[]; error: string | null }> => {
      if (!user) {
        const msg = 'Authentication required'
        setError(msg)
        return { success: false, error: msg }
      }

      setIsSaving(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/professors/time-slots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ timeSlots }),
        })

        const json = await response.json()

        if (!response.ok || !json.success) {
          const errMsg = json.error || 'Failed to save time slots'
          setError(errMsg)
          return { success: false, error: errMsg }
        }

        return { success: true, data: json.data.timeSlots, error: null }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save time slots'
        setError(message)
        return { success: false, error: message }
      } finally {
        setIsSaving(false)
      }
    },
    [user]
  )

  return { saveTimeSlots, isSaving, error }
}
