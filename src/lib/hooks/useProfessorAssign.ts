'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { AssignmentScope } from '@/lib/types/university'

interface AssignBody {
  sourcePathId: string
  courseOrder: number
  scope: AssignmentScope
  studentIds?: string[]
}

export function useProfessorAssign() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const assign = useCallback(async (body: AssignBody) => {
    if (!user) return { error: 'Not authenticated' }
    setLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/assignments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to assign' }
      }
      return { data: json.data }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to assign' }
    } finally {
      setLoading(false)
    }
  }, [user])

  const unassign = useCallback(async (assignmentId: string) => {
    if (!user) return { error: 'Not authenticated' }
    setLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/assignments', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignmentId }),
      })
      const json = await response.json()
      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to unassign' }
      }
      return { data: json.data }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to unassign' }
    } finally {
      setLoading(false)
    }
  }, [user])

  return { assign, unassign, loading }
}
