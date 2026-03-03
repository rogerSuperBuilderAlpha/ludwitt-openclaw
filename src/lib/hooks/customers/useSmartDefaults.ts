import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'

interface SmartDefaults {
  lastSelectedProjectId?: string
  preferredDocumentTitle?: string
  preferredPriority?: string
  lastUsedFilters?: {
    status?: string
    priority?: string
    project?: string
  }
  viewMode?: 'flat' | 'projects'
}

const STORAGE_KEY = 'customer-smart-defaults'

export function useSmartDefaults(customerId?: string) {
  const [defaults, setDefaults] = useState<SmartDefaults>({})
  const [isLoaded, setIsLoaded] = useState(false)

  // Load defaults from localStorage on mount
  useEffect(() => {
    if (!customerId) return

    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${customerId}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        setDefaults(parsed)
      }
    } catch (error) {
      logger.error('Usesmartdefaults', 'Failed to load smart defaults', { error: error })
    } finally {
      setIsLoaded(true)
    }
  }, [customerId])

  // Save defaults to localStorage
  const saveDefaults = (newDefaults: Partial<SmartDefaults>) => {
    if (!customerId) return

    const updated = { ...defaults, ...newDefaults }
    setDefaults(updated)

    try {
      localStorage.setItem(`${STORAGE_KEY}-${customerId}`, JSON.stringify(updated))
    } catch (error) {
      logger.error('Usesmartdefaults', 'Failed to save smart defaults', { error: error })
    }
  }

  // Specific setters for common use cases
  const updateLastSelectedProject = (projectId: string) => {
    saveDefaults({ lastSelectedProjectId: projectId })
  }

  const updatePreferredDocumentTitle = (title: string) => {
    saveDefaults({ preferredDocumentTitle: title })
  }

  const updatePreferredPriority = (priority: string) => {
    saveDefaults({ preferredPriority: priority })
  }

  const updateLastUsedFilters = (filters: SmartDefaults['lastUsedFilters']) => {
    saveDefaults({ lastUsedFilters: filters })
  }

  const updateViewMode = (viewMode: 'flat' | 'projects') => {
    saveDefaults({ viewMode })
  }

  // Smart suggestions based on history
  const getSuggestedProjectId = (availableProjects: Array<{ id: string }>) => {
    if (!defaults.lastSelectedProjectId) return ''
    
    // Check if the last selected project still exists
    const projectExists = availableProjects.some(p => p.id === defaults.lastSelectedProjectId)
    return projectExists ? defaults.lastSelectedProjectId : ''
  }

  const getSuggestedDocumentTitle = () => {
    if (!defaults.preferredDocumentTitle) {
      // Generate a title based on current date
      const today = new Date()
      const dateStr = today.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
      return `Project Notes - ${dateStr}`
    }
    return defaults.preferredDocumentTitle
  }

  const getSuggestedPriority = () => {
    return defaults.preferredPriority || 'medium'
  }

  const getSuggestedFilters = () => {
    return defaults.lastUsedFilters || {
      status: 'all',
      priority: 'all',
      project: 'all'
    }
  }

  const getSuggestedViewMode = () => {
    return defaults.viewMode || 'flat'
  }

  // Generate smart form defaults
  const getFormDefaults = (availableProjects: Array<{ id: string }>) => {
    return {
      projectId: getSuggestedProjectId(availableProjects),
      title: getSuggestedDocumentTitle(),
      priority: getSuggestedPriority(),
      notes: ''
    }
  }

  return {
    defaults,
    isLoaded,
    saveDefaults,
    updateLastSelectedProject,
    updatePreferredDocumentTitle,
    updatePreferredPriority,
    updateLastUsedFilters,
    updateViewMode,
    getSuggestedProjectId,
    getSuggestedDocumentTitle,
    getSuggestedPriority,
    getSuggestedFilters,
    getSuggestedViewMode,
    getFormDefaults
  }
}
