'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { uploadFile } from '@/lib/firebase/storage'
import type { ProfessorProfile } from '@/lib/types/university'

export function useProfessorProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfessorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    user.getIdToken().then(token => {
      fetch('/api/professors/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setProfile(json.data?.profile || null)
          } else {
            setError(json.error || 'Failed to load profile')
          }
        })
        .catch(() => setError('Failed to load profile'))
        .finally(() => setLoading(false))
    })
  }, [user])

  const saveProfile = useCallback(
    async (data: Partial<Omit<ProfessorProfile, 'professorId' | 'email' | 'updatedAt'>> & { displayName: string }) => {
      if (!user) return
      setSaving(true)
      setError(null)
      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/professors/profile', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const json = await res.json()
        if (json.success) {
          setProfile(json.data?.profile || null)
        } else {
          setError(json.error || 'Failed to save profile')
        }
      } catch {
        setError('Failed to save profile')
      } finally {
        setSaving(false)
      }
    },
    [user]
  )

  const uploadPhoto = useCallback(
    async (file: File): Promise<string | null> => {
      if (!user) return null
      if (!file.type.startsWith('image/')) {
        setError('File must be an image')
        return null
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be under 5MB')
        return null
      }
      setError(null)
      try {
        const ext = file.name.split('.').pop() || 'jpg'
        const path = `profile-photos/${user.uid}/professor.${ext}`
        const url = await uploadFile(path, file)
        return url
      } catch {
        setError('Failed to upload photo')
        return null
      }
    },
    [user]
  )

  return { profile, loading, saving, error, saveProfile, uploadPhoto }
}
