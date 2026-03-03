'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorPublicProfile } from '@/lib/types/university'

export function useProfessorPublicProfile(professorId: string) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfessorPublicProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !professorId) return
    setLoading(true)
    setError(null)
    user.getIdToken().then(token => {
      fetch(`/api/professors/${professorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setProfile(json.data?.profile || null)
          } else {
            setError(json.error || 'Failed to load professor profile')
          }
        })
        .catch(() => setError('Failed to load professor profile'))
        .finally(() => setLoading(false))
    })
  }, [user, professorId])

  return { profile, loading, error }
}
