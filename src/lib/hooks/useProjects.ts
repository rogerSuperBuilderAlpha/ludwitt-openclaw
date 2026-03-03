import { useState, useEffect, useCallback } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { Project } from '@/lib/types/project'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

interface UseProjectsOptions {
  role?: 'customer' | 'developer'
  status?: string
}

export function useProjects(userId: string | undefined, options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchApi = useApiFetch()

  useEffect(() => {
    if (!userId) {
      setProjects([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const projectsRef = collection(db, 'projects')
      let q = query(projectsRef)

      // Filter by role
      if (options.role === 'developer') {
        q = query(projectsRef, where('assignedDeveloperId', '==', userId))
      } else {
        // Default to customer
        q = query(projectsRef, where('customerId', '==', userId))
      }

      // Filter by status if provided
      if (options.status) {
        q = query(q, where('status', '==', options.status))
      }

      // Order by creation date
      q = query(q, orderBy('createdAt', 'desc'))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const loadedProjects = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[]

          setProjects(loadedProjects)
          setLoading(false)
        },
        (err) => {
          logger.error('UseProjects', 'Error loading projects', { error: err })
          setError('Failed to load projects')
          setLoading(false)
        }
      )

      return unsubscribe
    } catch (err) {
      logger.error('UseProjects', 'Error setting up projects listener', { error: err })
      setError('Failed to load projects')
      setLoading(false)
    }
  }, [userId, options.role, options.status])

  const createProject = useCallback(async (projectData: {
    title: string
    description: string
    type: 'website' | 'app' | 'design' | 'consulting' | 'custom'
    totalCost: number
    estimatedCompletionDate?: string
    milestones?: {
      title: string
      description: string
      dueDate: string
    }[]
  }) => {
    try {
      const data = await fetchApi<{ project: Project }>('/api/projects/create', {
        method: 'POST',
        body: JSON.stringify(projectData),
      })

      return data.project
    } catch (error) {
      logger.error('UseProjects', 'Error creating project', { error })
      throw error
    }
  }, [fetchApi])

  const updateProject = useCallback(async (projectId: string, updates: {
    status?: string
    assignedDeveloperId?: string
    assignedDeveloperName?: string
    paymentStatus?: string
    paidAmount?: number
    notes?: string
    estimatedCompletionDate?: string
    actualCompletionDate?: string
  }) => {
    try {
      await fetchApi('/api/projects/update', {
        method: 'POST',
        body: JSON.stringify({ projectId, ...updates }),
      })
      return { success: true }
    } catch (error) {
      logger.error('UseProjects', 'Error updating project', { error })
      throw error
    }
  }, [fetchApi])

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
  }
}
