import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { StudentAnalytics } from '@/lib/types/university'

export function useStudentAnalytics(learningPathId?: string) {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<StudentAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch_ = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const params = learningPathId ? `?learningPathId=${learningPathId}` : ''
      const res = await fetch(`/api/university/analytics/student${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json.success) {
        setAnalytics(json.data)
      } else {
        setError(json.error || 'Failed to load analytics')
      }
    } catch {
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }, [user, learningPathId])

  useEffect(() => { fetch_() }, [fetch_])

  return { analytics, loading, error }
}
