'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorListItem } from '@/lib/types/university'

export function useProfessors() {
  const { user } = useAuth()
  const [professors, setProfessors] = useState<ProfessorListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    user.getIdToken().then(token => {
      fetch('/api/university/professors', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setProfessors(json.data?.professors || [])
          } else {
            setError(json.error || 'Failed to load professors')
          }
        })
        .catch(() => setError('Failed to load professors'))
        .finally(() => setLoading(false))
    })
  }, [user])

  return { professors, loading, error }
}
