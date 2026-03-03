/**
 * useAssignedWork Hook
 * Fetches all work assigned to a developer in real-time
 */

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { normalizeFirestoreData } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

export function useAssignedWork(developerId?: string) {
  const [documents, setDocuments] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!developerId) {
      setLoading(false)
      return
    }

    // Query assigned documents
    const docsQuery = query(
      collection(db, 'customerDocuments'),
      where('assignedDeveloperId', '==', developerId),
      orderBy('assignedAt', 'desc')
    )

    const unsubDocs = onSnapshot(
      docsQuery,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...normalizeFirestoreData<Record<string, any>>(doc.data()),
        }))
        setDocuments(docs)
      },
      (err) => {
        logger.error('Useassignedwork', 'Error fetching assigned documents', {
          error: err,
        })
        setError(err.message)
      }
    )

    // Query assigned projects
    const projectsQuery = query(
      collection(db, 'projects'),
      where('assignedDeveloperId', '==', developerId),
      orderBy('assignedAt', 'desc')
    )

    const unsubProjects = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const projs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...normalizeFirestoreData<Record<string, any>>(doc.data()),
        }))
        setProjects(projs)
        setLoading(false)
      },
      (err) => {
        logger.error('Useassignedwork', 'Error fetching assigned projects', {
          error: err,
        })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => {
      unsubDocs()
      unsubProjects()
    }
  }, [developerId])

  // Calculate stats
  const stats = {
    totalDocuments: documents.length,
    totalProjects: projects.length,
    activeDocuments: documents.filter((d: Record<string, unknown>) =>
      ['approved', 'in-progress'].includes(d.status as string)
    ).length,
    activeProjects: projects.filter((p: Record<string, unknown>) =>
      ['intake', 'discovery', 'in-progress'].includes(p.status as string)
    ).length,
    completedDocuments: documents.filter(
      (d: Record<string, unknown>) => d.status === 'completed'
    ).length,
    completedProjects: projects.filter(
      (p: Record<string, unknown>) => p.status === 'completed'
    ).length,
  }

  return {
    documents,
    projects,
    loading,
    error,
    stats,
  }
}
