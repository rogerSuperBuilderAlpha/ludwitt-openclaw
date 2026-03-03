'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export interface AvailableSlotWithProfessor {
  date: string
  startTime: string
  endTime: string
  professorId: string
  professorName: string
}

export function useAllAvailableSlots(month: number, year: number) {
  const { user } = useAuth()
  const [slots, setSlots] = useState<AvailableSlotWithProfessor[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSlots = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      const token = await user.getIdToken()
      const res = await fetch(`/api/university/all-available-slots?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setSlots(data.data?.slots || [])
      }
    } catch {
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [user, month, year])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  return { slots, loading, refetch: fetchSlots }
}
