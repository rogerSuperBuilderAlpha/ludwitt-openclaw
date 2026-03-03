import { useMemo } from 'react'
import { Project } from '@/lib/types/project'
import { toTimestamp } from '@/lib/utils/timestamp'

export type ProjectSort = 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'

export function useFilteredProjects(
  projects: Project[],
  options: { projectSearch: string; projectStatusFilter: string; projectSort: ProjectSort }
) {
  const { projectSearch, projectStatusFilter, projectSort } = options

  return useMemo(() => {
    let filtered = [...projects]

    if (projectSearch) {
      const searchLower = projectSearch.toLowerCase()
      filtered = filtered.filter(proj =>
        proj.title.toLowerCase().includes(searchLower) || proj.description?.toLowerCase().includes(searchLower)
      )
    }

    if (projectStatusFilter !== 'all') {
      filtered = filtered.filter(proj => proj.status === projectStatusFilter)
    }

    filtered.sort((a, b) => {
      switch (projectSort) {
        case 'date-desc':
          return toTimestamp(b.createdAt) - toTimestamp(a.createdAt)
        case 'date-asc':
          return toTimestamp(a.createdAt) - toTimestamp(b.createdAt)
        case 'budget-desc':
          return b.totalCost - a.totalCost
        case 'budget-asc':
          return a.totalCost - b.totalCost
        default:
          return 0
      }
    })

    return filtered
  }, [projects, projectSearch, projectStatusFilter, projectSort])
}


