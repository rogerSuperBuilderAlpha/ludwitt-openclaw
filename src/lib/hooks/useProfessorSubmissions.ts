'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorSubmissionRow } from '@/lib/types/university'

export function useProfessorSubmissions() {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState<ProfessorSubmissionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubmissions = useCallback(async () => {
    if (!user) {
      setSubmissions([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch submissions')
        setSubmissions([])
      } else {
        setSubmissions(json.data.submissions)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions')
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  return { submissions, loading, error, refetch: fetchSubmissions }
}
