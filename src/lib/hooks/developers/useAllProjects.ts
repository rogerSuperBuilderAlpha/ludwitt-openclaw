'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Project } from '@/lib/types/project'
import { normalizeFirestoreData } from '@/lib/utils/timestamp'

/**
 * Hook to fetch ALL projects (for admin/developer dashboards).
 * For user-specific projects with CRUD operations, use useProjects instead.
 */
export function useAllProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) {
      setIsLoading(false)
      setError('Database not available')
      return
    }

    setIsLoading(true)
    const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      projectsQuery, 
      (snapshot) => {
        try {
          const projectsData = snapshot.docs.map(doc => {
            const rawData = doc.data()
            const normalizedData = normalizeFirestoreData(rawData)
            return {
              id: doc.id,
              ...(normalizedData as Record<string, unknown>)
            }
          }) as Project[]
          setProjects(projectsData)
          setError(null)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          setError(errorMessage)
        } finally {
          setIsLoading(false)
        }
      },
      (err) => {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load projects'
        setError(errorMessage)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { projects, isLoading, error }
}

