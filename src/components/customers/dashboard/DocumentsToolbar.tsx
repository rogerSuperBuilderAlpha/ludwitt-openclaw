import { Search } from 'lucide-react'
import { DocumentSort } from '@/app/customers/dashboard/types'

type DocumentsToolbarProps = {
  documentsCount: number
  totalCount: number
  documentSearch: string
  setDocumentSearch: (v: string) => void
  documentSort: DocumentSort
  setDocumentSort: (v: DocumentSort) => void
  documentStatusFilter: string
  setDocumentStatusFilter: (v: string) => void
  documentPriorityFilter: string
  setDocumentPriorityFilter: (v: string) => void
  documentProjectFilter: string
  setDocumentProjectFilter: (v: string) => void
  projects: { id: string; title: string }[]
}

export function DocumentsToolbar(props: DocumentsToolbarProps) {
  const {
    documentsCount,
    totalCount,
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
    projects,
  } = props

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={documentSearch}
              onChange={(e) => setDocumentSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div>
          <select
            value={documentSort}
            onChange={(e) => setDocumentSort(e.target.value as DocumentSort)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="priority-desc">Highest Priority</option>
            <option value="priority-asc">Lowest Priority</option>
          </select>
        </div>

        <div>
          <select
            value={documentStatusFilter}
            onChange={(e) => setDocumentStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <select
          value={documentPriorityFilter}
          onChange={(e) => setDocumentPriorityFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="none">No Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={documentProjectFilter}
          onChange={(e) => setDocumentProjectFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="all">All Projects</option>
          <option value="none">No Project</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Showing {documentsCount} of {totalCount} documents
      </div>
    </div>
  )
}
