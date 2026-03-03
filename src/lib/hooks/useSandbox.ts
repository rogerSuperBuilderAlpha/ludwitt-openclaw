'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { SandboxTemplate, SandboxSubmission, SandboxFile } from '@/lib/types/university'

export function useSandbox(courseId?: string, deliverableId?: string) {
  const { user } = useAuth()
  const [templates, setTemplates] = useState<SandboxTemplate[]>([])
  const [submission, setSubmission] = useState<SandboxSubmission | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fetchData = useCallback(async () => {
    if (!user || !courseId || !deliverableId) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const params = new URLSearchParams({ courseId, deliverableId })
      const response = await fetch(`/api/university/sandbox?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load sandbox data')
        return
      }

      setTemplates(json.data.templates)
      setSubmission(json.data.submission)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sandbox data')
    } finally {
      setLoading(false)
    }
  }, [user, courseId, deliverableId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const saveWork = useCallback(
    async (files: SandboxFile[]) => {
      if (!user || !courseId || !deliverableId) return

      setIsSaving(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/sandbox', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId, deliverableId, files }),
        })
        const json = await response.json()

        if (!response.ok || !json.success) {
          setError(json.error || 'Failed to save work')
          return
        }

        // Refresh data
        await fetchData()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save work')
      } finally {
        setIsSaving(false)
      }
    },
    [user, courseId, deliverableId, fetchData]
  )

  return { templates, submission, loading, error, saveWork, isSaving }
}
