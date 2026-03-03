import { useState, useEffect, useCallback } from 'react'
import { useCustomerAuth } from '@/lib/hooks/useCustomerAuth'
import { Project } from '@/lib/types/project'
import { CreateProjectData } from '@/app/customers/dashboard/types'
import { logger } from '@/lib/logger'

export function useCustomerProjects(customerId?: string) {
  const { user } = useCustomerAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    if (!user || !customerId) return

    try {
      setLoading(true)
      setError(null)
      
      const token = await user.getIdToken()
      const response = await fetch('/api/customers/projects/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setProjects(data.projects || [])
      } else {
        setError(data.error || 'Failed to load projects')
      }
    } catch (err) {
      logger.error('Usecustomerprojects', 'Error loading projects', { error: err })
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [user, customerId])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(async (projectData: CreateProjectData) => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/customers/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (response.ok) {
        setProjects(prev => [data.project, ...prev])
        return data.project
      } else {
        throw new Error(data.error || 'Failed to create project')
      }
    } catch (err) {
      logger.error('Usecustomerprojects', 'Error creating project', { error: err })
      throw err
    }
  }, [user])

  return {
    projects,
    loading,
    error,
    createProject,
    refetchProjects: fetchProjects,
  }
}
