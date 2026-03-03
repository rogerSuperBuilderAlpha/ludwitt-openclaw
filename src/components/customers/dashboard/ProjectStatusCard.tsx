'use client'

import { useMemo } from 'react'
import {
  Activity,
  CheckCircle,
  Clock,
  Loader2,
  FileText,
  ArrowRight,
} from 'lucide-react'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'
import { toDate } from '@/lib/utils/timestamp'

interface ProjectStatusCardProps {
  documents: CustomerDocument[]
  projects: Project[]
  className?: string
  onViewPending?: () => void
  onViewInProgress?: () => void
  onViewCompleted?: () => void
}

export function ProjectStatusCard({
  documents,
  projects,
  className = '',
  onViewPending,
  onViewInProgress,
  onViewCompleted,
}: ProjectStatusCardProps) {
  const stats = useMemo(() => {
    const pending = documents.filter((d) => d.status === 'pending')
    const inProgress = documents.filter(
      (d) => d.status === 'approved' || d.status === 'in-progress'
    )
    const completed = documents.filter((d) => d.status === 'completed')
    const accepted = documents.filter((d) => d.status === 'accepted')

    // Find last activity (most recent document action)
    let lastActivityDate: Date | null = null
    let lastActivityType: string = ''

    documents.forEach((doc) => {
      const addedDate = doc.addedAt ? toDate(doc.addedAt) : null
      const approvedDate = doc.approvedAt ? toDate(doc.approvedAt) : null

      if (
        approvedDate &&
        (!lastActivityDate || approvedDate > lastActivityDate)
      ) {
        lastActivityDate = approvedDate
        lastActivityType = 'approved'
      }
      if (addedDate && (!lastActivityDate || addedDate > lastActivityDate)) {
        lastActivityDate = addedDate
        lastActivityType = 'submitted'
      }
    })

    return {
      pending: pending.length,
      inProgress: inProgress.length,
      completed: completed.length,
      accepted: accepted.length,
      total: documents.length,
      lastActivityDate,
      lastActivityType,
    }
  }, [documents])

  const getRelativeTime = (date: Date | null) => {
    if (!date) return null

    const now = new Date()
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    )

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`

    return date.toLocaleDateString()
  }

  // Empty state
  if (documents.length === 0 && projects.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-5 ${className}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Project Status</h3>
        </div>
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm">No projects yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Create a project to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Project Status</h3>
          </div>
          {stats.total > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {stats.total} total
            </span>
          )}
        </div>
      </div>

      {/* Status Grid */}
      <div className="p-4 space-y-3">
        {/* Needs Your Action */}
        {stats.pending > 0 && (
          <button
            onClick={onViewPending}
            className="w-full flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-amber-900">
                  {stats.pending} awaiting your approval
                </p>
                <p className="text-xs text-amber-700">
                  Approve to start development
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}

        {/* In Development */}
        {stats.inProgress > 0 && (
          <button
            onClick={onViewInProgress}
            className="w-full flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-purple-900">
                  {stats.inProgress} in development
                </p>
                <p className="text-xs text-purple-700">
                  Developer is working on these
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}

        {/* Ready for Review */}
        {stats.completed > 0 && (
          <button
            onClick={onViewCompleted}
            className="w-full flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-green-900">
                  {stats.completed} ready for review
                </p>
                <p className="text-xs text-green-700">
                  Review and accept completed work
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}

        {/* Iterations Complete */}
        {stats.accepted > 0 && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">
                {stats.accepted} iteration{stats.accepted > 1 ? 's' : ''}{' '}
                complete
              </p>
              <p className="text-xs text-blue-700">Great progress!</p>
            </div>
          </div>
        )}

        {/* All clear state */}
        {stats.pending === 0 &&
          stats.inProgress === 0 &&
          stats.completed === 0 &&
          stats.accepted === 0 &&
          documents.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Add requirements to begin development
              </p>
            </div>
          )}
      </div>

      {/* Footer with last activity */}
      <div className="px-4 pb-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              System active
            </span>
          </div>
          {stats.lastActivityDate && (
            <p className="text-xs text-gray-500 mt-1">
              Last activity: Document {stats.lastActivityType}{' '}
              {getRelativeTime(stats.lastActivityDate)}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Typical response time: 4 hours during business days
          </p>
        </div>
      </div>
    </div>
  )
}
