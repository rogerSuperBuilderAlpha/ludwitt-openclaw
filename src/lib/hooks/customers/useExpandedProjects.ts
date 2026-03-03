import { useState } from 'react'

export function useExpandedProjects() {
  const [expandedProjectIds, setExpandedProjectIds] = useState<Set<string>>(new Set())

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjectIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) newSet.delete(projectId)
      else newSet.add(projectId)
      return newSet
    })
  }

  return { expandedProjectIds, toggleProjectExpansion }
}


