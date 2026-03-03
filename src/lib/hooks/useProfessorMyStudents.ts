'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { AssignmentScope } from '@/lib/types/university'

export interface MyStudentRow {
  userId: string
  displayName: string
  email: string
  pathTopic: string
  courseTitle: string
  courseOrder: number
  courseStatus: string
  completedDeliverables: number
  totalDeliverables: number
  scope: AssignmentScope
}

export function useProfessorMyStudents() {
  const { user } = useAuth()
  const [students, setStudents] = useState<MyStudentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = useCallback(async () => {
    if (!user) {
      setStudents([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/my-students', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch students')
        setStudents([])
      } else {
        setStudents(json.data.students)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      setStudents([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  return { students, loading, error, refetch: fetchStudents }
}
