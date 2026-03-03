import { useMemo } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { toTimestamp } from '@/lib/utils/timestamp'
import { DocumentSort } from '@/app/customers/dashboard/types'

export type { DocumentSort }

export function useFilteredDocuments(
  documents: CustomerDocument[],
  options: {
    documentSearch: string
    documentStatusFilter: string
    documentPriorityFilter: string
    documentProjectFilter: string
    documentSort: DocumentSort
  }
) {
  const { documentSearch, documentStatusFilter, documentPriorityFilter, documentProjectFilter, documentSort } = options

  return useMemo(() => {
    let filtered = [...documents]

    if (documentSearch) {
      const searchLower = documentSearch.toLowerCase()
      filtered = filtered.filter(doc =>
        doc.googleDocTitle.toLowerCase().includes(searchLower) || doc.notes?.toLowerCase().includes(searchLower)
      )
    }

    if (documentStatusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === documentStatusFilter)
    }

    if (documentPriorityFilter !== 'all') {
      if (documentPriorityFilter === 'none') {
        filtered = filtered.filter(doc => !doc.priority)
      } else {
        filtered = filtered.filter(doc => doc.priority === documentPriorityFilter)
      }
    }

    if (documentProjectFilter !== 'all') {
      if (documentProjectFilter === 'none') {
        filtered = filtered.filter(doc => !doc.projectId)
      } else {
        filtered = filtered.filter(doc => doc.projectId === documentProjectFilter)
      }
    }

    filtered.sort((a, b) => {
      switch (documentSort) {
        case 'date-desc':
          return toTimestamp(b.addedAt) - toTimestamp(a.addedAt)
        case 'date-asc':
          return toTimestamp(a.addedAt) - toTimestamp(b.addedAt)
        case 'title-asc':
          return a.googleDocTitle.localeCompare(b.googleDocTitle)
        case 'title-desc':
          return b.googleDocTitle.localeCompare(a.googleDocTitle)
        case 'priority-desc': {
          const priorityOrder: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 }
          const aVal = a.priority ? priorityOrder[a.priority] || 0 : 0
          const bVal = b.priority ? priorityOrder[b.priority] || 0 : 0
          return bVal - aVal
        }
        case 'priority-asc': {
          const priorityOrder: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 }
          const aVal = a.priority ? priorityOrder[a.priority] || 0 : 0
          const bVal = b.priority ? priorityOrder[b.priority] || 0 : 0
          return aVal - bVal
        }
        default:
          return 0
      }
    })

    return filtered
  }, [documents, documentSearch, documentStatusFilter, documentPriorityFilter, documentProjectFilter, documentSort])
}


