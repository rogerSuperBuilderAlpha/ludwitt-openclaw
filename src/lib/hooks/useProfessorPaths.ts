'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorPathSummary, ProfessorAssignment } from '@/lib/types/university'

export function useProfessorPaths() {
  const { user } = useAuth()
  const [paths, setPaths] = useState<ProfessorPathSummary[]>([])
  const [myAssignments, setMyAssignments] = useState<ProfessorAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPaths = useCallback(async () => {
    if (!user) {
      setPaths([])
      setMyAssignments([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/paths', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch paths')
        setPaths([])
        setMyAssignments([])
      } else {
        setPaths(json.data.paths)
        setMyAssignments(json.data.myAssignments || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch paths')
      setPaths([])
      setMyAssignments([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchPaths()
  }, [fetchPaths])

  return { paths, myAssignments, loading, error, refetch: fetchPaths }
}
