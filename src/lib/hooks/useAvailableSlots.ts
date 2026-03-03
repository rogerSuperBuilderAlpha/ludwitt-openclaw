'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { AvailableSlot } from '@/lib/types/university'

export function useAvailableSlots(professorId: string | undefined) {
  const { user } = useAuth()
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSlots = useCallback(async () => {
    if (!user || !professorId) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/available-slots?professorId=${professorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load available slots')
        return
      }

      setSlots(json.data.slots)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load available slots')
    } finally {
      setLoading(false)
    }
  }, [user, professorId])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  return { slots, loading, error, refetch: fetchSlots }
}
