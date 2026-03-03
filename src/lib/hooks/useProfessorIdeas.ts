'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

export interface ProfessorIdeaRow {
  id: string
  collection: 'business' | 'thesis'
  title: string
  description?: string
  status: string
  documents: { title: string; url: string | null }[]
  userId: string
  userName: string
  userEmail: string
  createdAt: string
  updatedAt: string
  commentCount: number
}

export function useProfessorIdeas() {
  const { user } = useAuth()
  const [businessIdeas, setBusinessIdeas] = useState<ProfessorIdeaRow[]>([])
  const [thesisIdeas, setThesisIdeas] = useState<ProfessorIdeaRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIdeas = useCallback(async () => {
    if (!user) {
      setBusinessIdeas([])
      setThesisIdeas([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/ideas', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to fetch ideas')
        setBusinessIdeas([])
        setThesisIdeas([])
      } else {
        setBusinessIdeas(json.data.businessIdeas || [])
        setThesisIdeas(json.data.thesisIdeas || [])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ideas')
      setBusinessIdeas([])
      setThesisIdeas([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchIdeas()
  }, [fetchIdeas])

  return { businessIdeas, thesisIdeas, loading, error, refetch: fetchIdeas }
}
