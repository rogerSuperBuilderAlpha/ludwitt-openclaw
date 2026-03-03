/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { Briefcase, CheckCircle2, Clock, DollarSign } from 'lucide-react'
import { Project } from '@/lib/types/project'

interface ProjectsKanbanProps {
  projects: Project[]
  userIsAdmin: boolean
  adminViewMode: 'developer' | 'admin'
  userId?: string | null
  searchQuery: string
  updatingProjectId: string | null
  onUpdateProjectStatus: (projectId: string, status: string) => void
  onOpenDetails: (project: Project) => void
}

export function ProjectsKanban({
  projects,
  userIsAdmin,
  adminViewMode,
  userId,
  searchQuery,
  updatingProjectId,
  onUpdateProjectStatus,
  onOpenDetails,
}: ProjectsKanbanProps) {
  // Filter according to admin view and search
  let filtered = [...projects]
  if (userIsAdmin && adminViewMode === 'developer' && userId) {
    filtered = filtered.filter(
      (p) => !p.assignedDeveloperId || p.assignedDeveloperId === userId
    )
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.customerName || '').toLowerCase().includes(q) ||
        p.customerEmail.toLowerCase().includes(q)
    )
  }

  const newLeads = filtered.filter(
    (p) => p.status === 'intake' || p.status === 'discovery'
  )
  const active = filtered.filter(
    (p) => p.status === 'in-progress' || p.status === 'revision'
  )
  const review = filtered.filter((p) => p.status === 'review')
  const completed = filtered.filter(
    (p) =>
      p.status === 'completed' ||
      p.status === 'paused' ||
      p.status === 'cancelled'
  )

  const sortByDate = (a: Project, b: Project) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

  const columns = {
    newLeads: newLeads.sort(sortByDate),
    active: active.sort(sortByDate),
    review: review.sort(sortByDate),
    completed: completed.sort(sortByDate),
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* New Leads */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white flex items-center justify-between">
            <span>New Leads</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {columns.newLeads.length}
            </span>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.newLeads.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No new leads
            </p>
          ) : (
            columns.newLeads.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <div
                  onClick={() => onOpenDetails(project)}
                  className="cursor-pointer mb-2"
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {project.customerName}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
                    {project.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <DollarSign className="w-3 h-3" />
                  <span>${project.totalCost.toLocaleString()}</span>
                </div>
                <select
                  value={project.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateProjectStatus(project.id, e.target.value)
                  }}
                  disabled={updatingProjectId === project.id}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2 focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                >
                  <option value="intake">Intake</option>
                  <option value="discovery">Discovery</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="revision">Revision</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <a
                  href={`mailto:${project.customerEmail}?subject=Regarding your project: ${encodeURIComponent(project.title)}`}
                  className="block w-full px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 text-center"
                >
                  Contact Customer
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Active */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white flex items-center justify-between">
            <span>Active</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {columns.active.length}
            </span>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.active.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No active projects
            </p>
          ) : (
            columns.active.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div
                  onClick={() => onOpenDetails(project)}
                  className="cursor-pointer mb-2"
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {project.customerName}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {project.paymentStatus && (
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        project.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : project.paymentStatus === 'partial'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.paymentStatus === 'paid'
                        ? 'Paid'
                        : project.paymentStatus === 'partial'
                          ? 'Partial'
                          : 'Pending'}
                    </span>
                  )}
                </div>
                {project.estimatedCompletionDate && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>
                      Due{' '}
                      {new Date(
                        project.estimatedCompletionDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <select
                  value={project.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateProjectStatus(project.id, e.target.value)
                  }}
                  disabled={updatingProjectId === project.id}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="intake">Intake</option>
                  <option value="discovery">Discovery</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="revision">Revision</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <a
                  href={`mailto:${project.customerEmail}?subject=Regarding your project: ${encodeURIComponent(project.title)}`}
                  className="block w-full px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                >
                  Contact Customer
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white flex items-center justify-between">
            <span>Review</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {columns.review.length}
            </span>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.review.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No projects in review
            </p>
          ) : (
            columns.review.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <div
                  onClick={() => onOpenDetails(project)}
                  className="cursor-pointer mb-2"
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {project.customerName}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded">
                    {project.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <DollarSign className="w-3 h-3" />
                  <span>${project.totalCost.toLocaleString()}</span>
                </div>
                <select
                  value={project.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateProjectStatus(project.id, e.target.value)
                  }}
                  disabled={updatingProjectId === project.id}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
                >
                  <option value="intake">Intake</option>
                  <option value="discovery">Discovery</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="revision">Revision</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <a
                  href={`mailto:${project.customerEmail}?subject=Regarding your project: ${encodeURIComponent(project.title)}`}
                  className="block w-full px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                >
                  Contact Customer
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white flex items-center justify-between">
            <span>Completed</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">
              {columns.completed.length}
            </span>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.completed.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No completed projects
            </p>
          ) : (
            columns.completed.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all opacity-75"
              >
                <div
                  onClick={() => onOpenDetails(project)}
                  className="cursor-pointer mb-2"
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {project.customerName}
                  </p>
                </div>
                {project.actualCompletionDate && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>
                      Completed{' '}
                      {new Date(
                        project.actualCompletionDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <select
                  value={project.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    onUpdateProjectStatus(project.id, e.target.value)
                  }}
                  disabled={updatingProjectId === project.id}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded mb-2 focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                >
                  <option value="intake">Intake</option>
                  <option value="discovery">Discovery</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="revision">Revision</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <a
                  href={`mailto:${project.customerEmail}?subject=Regarding your project: ${encodeURIComponent(project.title)}`}
                  className="block w-full px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                >
                  Contact Customer
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
