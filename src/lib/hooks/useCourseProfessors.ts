'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ResolvedCourseProfessor } from '@/lib/types/university'

export function useCourseProfessors(pathId: string | undefined) {
  const { user } = useAuth()
  const [data, setData] = useState<ResolvedCourseProfessor[]>([])
  const [loading, setLoading] = useState(false)

  const fetchProfessors = useCallback(async () => {
    if (!user || !pathId) {
      setData([])
      return
    }

    setLoading(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/my-professors?pathId=${pathId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (response.ok && json.success) {
        setData(json.data.professorsByCourse || [])
      } else {
        setData([])
      }
    } catch {
      setData([])
    } finally {
      setLoading(false)
    }
  }, [user, pathId])

  useEffect(() => {
    fetchProfessors()
  }, [fetchProfessors])

  const professorsByOrder = useMemo(() => {
    const map = new Map<number, { name: string; email: string }[]>()
    for (const item of data) {
      map.set(item.courseOrder, item.professors)
    }
    return map
  }, [data])

  return { professorsByOrder, loading }
}
