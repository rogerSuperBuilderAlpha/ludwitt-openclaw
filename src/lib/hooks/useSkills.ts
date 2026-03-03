import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { SkillCategory } from '@/lib/types/university'

export function useSkillGraph() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSkills = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/university/skills', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (json.success) {
        setCategories(json.data.categories)
      } else {
        setError(json.error || 'Failed to load skills')
      }
    } catch {
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetchSkills() }, [fetchSkills])

  return { categories, loading, error }
}
