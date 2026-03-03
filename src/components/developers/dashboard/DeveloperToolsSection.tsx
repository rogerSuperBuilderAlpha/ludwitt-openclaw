/**
 * DeveloperToolsSection Component
 * Complete section for developers showing their assigned work and shareable link
 */

'use client'

import { useState } from 'react'
import { useAssignedWork } from '@/lib/hooks/useAssignedWork'
import { ShareableLinkCard } from './ShareableLinkCard'
import { AssignmentBadge, SourceBadge, StatusBadge } from '@/components/shared'
import {
  FileText,
  FolderOpen,
  ExternalLink,
  Filter,
  Search,
} from 'lucide-react'
import { Alert } from '@/components/ui/Alert'

interface DeveloperToolsSectionProps {
  userId: string
  displayName: string
}

export function DeveloperToolsSection({
  userId,
  displayName,
}: DeveloperToolsSectionProps) {
  const { documents, projects, loading, error, stats } = useAssignedWork(userId)
  const [filter, setFilter] = useState<'all' | 'documents' | 'projects'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- useAssignedWork returns any[]
  const filteredDocuments = documents.filter((doc: any) => {
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    const matchesSearch =
      !searchTerm ||
      doc.googleDocTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const filteredProjects = projects.filter((proj: any) => {
    const matchesStatus = statusFilter === 'all' || proj.status === statusFilter
    const matchesSearch =
      !searchTerm ||
      proj.title?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const showDocuments = filter === 'all' || filter === 'documents'
  const showProjects = filter === 'all' || filter === 'projects'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your assigned work...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <Alert type="error">Error loading assigned work: {error}</Alert>
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900">
            {stats.totalDocuments}
          </div>
          <div className="text-sm text-blue-700">Total Documents</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-900">
            {stats.totalProjects}
          </div>
          <div className="text-sm text-purple-700">Total Projects</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-900">
            {stats.activeDocuments + stats.activeProjects}
          </div>
          <div className="text-sm text-green-700">Active Items</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {stats.completedDocuments + stats.completedProjects}
          </div>
          <div className="text-sm text-gray-700">Completed</div>
        </div>
      </div>

      {/* Shareable Link */}
      <ShareableLinkCard developerId={userId} displayName={displayName} />

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'documents' | 'projects')
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Items</option>
            <option value="documents">Documents Only</option>
            <option value="projects">Projects Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Assigned Work List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Assigned Work</h3>

        {documents.length === 0 && projects.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No Assigned Work Yet
            </h4>
            <p className="text-gray-600 mb-4">
              Share your customer link above to start receiving project
              submissions!
            </p>
          </div>
        ) : (
          <>
            {/* Documents */}
            {showDocuments && filteredDocuments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Documents ({filteredDocuments.length})
                </h4>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any -- useAssignedWork returns any[] */}
                {filteredDocuments.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 truncate mb-2">
                          {doc.googleDocTitle}
                        </h5>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <StatusBadge status={doc.status} size="sm" />
                          <SourceBadge
                            source={doc.submittedVia}
                            developerName={doc.submittedViaDeveloperName}
                            size="sm"
                          />
                          <AssignmentBadge
                            assignedDeveloper={{
                              id: doc.assignedDeveloperId,
                              name: doc.assignedDeveloperName,
                              email: doc.assignedDeveloperEmail,
                            }}
                            assignedBy={doc.assignedBy}
                            assignedAt={doc.assignedAt}
                            size="sm"
                          />
                        </div>
                        {doc.notes && (
                          <p className="text-sm text-gray-600">{doc.notes}</p>
                        )}
                      </div>
                      <a
                        href={doc.googleDocUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-gray-600" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {showProjects && filteredProjects.length > 0 && (
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-purple-600" />
                  Projects ({filteredProjects.length})
                </h4>
                {filteredProjects.map((proj: any) => (
                  <div
                    key={proj.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {proj.title}
                        </h5>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <StatusBadge status={proj.status} size="sm" />
                          <SourceBadge
                            source={proj.submittedVia}
                            developerName={proj.submittedViaDeveloperName}
                            size="sm"
                          />
                          <AssignmentBadge
                            assignedDeveloper={{
                              id: proj.assignedDeveloperId,
                              name: proj.assignedDeveloperName,
                              email: proj.assignedDeveloperEmail,
                            }}
                            assignedBy={proj.assignedBy}
                            assignedAt={proj.assignedAt}
                            size="sm"
                          />
                        </div>
                        {proj.description && (
                          <p className="text-sm text-gray-600">
                            {proj.description}
                          </p>
                        )}
                        {proj.totalCost && (
                          <p className="text-sm font-medium text-gray-900 mt-2">
                            Budget: ${proj.totalCost.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredDocuments.length === 0 &&
              filteredProjects.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <p className="text-gray-600">No items match your filters</p>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  )
}
