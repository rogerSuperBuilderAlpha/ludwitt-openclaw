'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ProfessorDocument } from '@/lib/types/university'

export function usePathDocuments(pathId: string | undefined) {
  const { user } = useAuth()
  const [documents, setDocuments] = useState<ProfessorDocument[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDocuments = useCallback(async () => {
    if (!user || !pathId) {
      setDocuments([])
      return
    }

    setLoading(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch(`/api/university/path-documents?pathId=${pathId}`, {
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
  }, [user, pathId])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  return { documents, loading }
}
