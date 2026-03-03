import { useState } from 'react'
import { DocumentSort } from '@/app/customers/dashboard/types'

export function useDocumentFiltersState() {
  const [documentSearch, setDocumentSearch] = useState('')
  const [documentSort, setDocumentSort] = useState<DocumentSort>('date-desc')
  const [documentStatusFilter, setDocumentStatusFilter] = useState<string>('all')
  const [documentPriorityFilter, setDocumentPriorityFilter] = useState<string>('all')
  const [documentProjectFilter, setDocumentProjectFilter] = useState<string>('all')

  return {
    documentSearch,
    setDocumentSearch,
    documentSort,
    setDocumentSort,
    documentStatusFilter,
    setDocumentStatusFilter,
    documentPriorityFilter,
    setDocumentPriorityFilter,
    documentProjectFilter,
    setDocumentProjectFilter,
  }
}


