'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorDocument, AssignmentScope } from '@/lib/types/university'

export function useProfessorDocuments(sourcePathId?: string) {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<ProfessorDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchDocuments = useCallback(async () => {
    if (!user) {
      setDocuments([])
      return
    }

    setLoading(true)

    try {
      const token = await user.getIdToken()
      const params = sourcePathId ? `?sourcePathId=${sourcePathId}` : ''
      const response = await fetch(`/api/professors/documents${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await response.json()

      if (response.ok && json.success) {
        setDocuments(json.data.documents || [])
      } else {
        setDocuments([])
      }
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }, [user, sourcePathId])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const uploadDocument = useCallback(async (body: {
    sourcePathId: string
    title: string
    url: string
    description?: string
    scope: AssignmentScope
    studentIds?: string[]
  }) => {
    if (!user) return { error: 'Not authenticated' }
    setActionLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/documents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to upload document' }
      }
      await fetchDocuments()
      return { data: json.data }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to upload document' }
    } finally {
      setActionLoading(false)
    }
  }, [user, fetchDocuments])

  const deleteDocument = useCallback(async (documentId: string) => {
    if (!user) return { error: 'Not authenticated' }
    setActionLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/professors/documents', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      })
      const json = await response.json()
      if (!response.ok || !json.success) {
        return { error: json.error || 'Failed to delete document' }
      }
      await fetchDocuments()
      return {}
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to delete document' }
    } finally {
      setActionLoading(false)
    }
  }, [user, fetchDocuments])

  return { documents, loading, actionLoading, uploadDocument, deleteDocument, refetch: fetchDocuments }
}
