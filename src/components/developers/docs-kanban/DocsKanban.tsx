'use client'

import { useMemo } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Tag,
  Users,
} from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Submission } from '@/lib/types/submission'
import type { DateFormatter } from '@/lib/types/common'
import type { FirestoreTimestamp } from '@/lib/types/timestamp'

type TabType = 'docs' | 'projects' | 'all'

interface DocsKanbanProps {
  submissions: Submission[]
  userId?: string | null
  userIsAdmin: boolean
  adminViewMode: 'developer' | 'admin'
  searchQuery: string
  customerFilter: string
  assignedFilter: string
  formatDateTime: DateFormatter
  toTimestamp: (
    d: FirestoreTimestamp | Date | string | number | { seconds: number }
  ) => number
  onAssignToMe: (id: string) => void
  assigningId: string | null
  onOpenAssignModal?: (submission: Submission) => void
  onStartWork: (id: string) => void
  onMarkComplete: (id: string, title: string) => void
  onUpdateStatus: (id: string, status: string) => void
  updatingStatusId: string | null
  onOpenDetails: (submission: Submission) => void
}

function getPriorityConfig(priority?: string) {
  switch (priority) {
    case 'urgent':
      return {
        label: 'Urgent',
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200',
      }
    case 'high':
      return {
        label: 'High',
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        border: 'border-orange-200',
      }
    case 'medium':
      return {
        label: 'Medium',
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
      }
    case 'low':
      return {
        label: 'Low',
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
      }
    default:
      return null
  }
}

export function DocsKanban({
  submissions,
  userId,
  userIsAdmin,
  adminViewMode,
  searchQuery,
  customerFilter,
  assignedFilter,
  formatDateTime,
  toTimestamp,
  onAssignToMe,
  assigningId,
  onOpenAssignModal,
  onStartWork,
  onMarkComplete,
  onUpdateStatus,
  updatingStatusId,
  onOpenDetails,
}: DocsKanbanProps) {
  const columns = useMemo(() => {
    let filtered = [...submissions]

    if (userIsAdmin && adminViewMode === 'developer' && userId) {
      filtered = filtered.filter(
        (s) => !s.assignedTo || s.assignedTo === userId
      )
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.googleDocTitle.toLowerCase().includes(q) ||
          s.customer.displayName?.toLowerCase().includes(q) ||
          s.customer.email.toLowerCase().includes(q) ||
          s.projectTitle?.toLowerCase().includes(q)
      )
    }

    if (customerFilter !== 'all') {
      filtered = filtered.filter((s) => s.customerId === customerFilter)
    }

    if (assignedFilter !== 'all') {
      filtered =
        assignedFilter === 'unassigned'
          ? filtered.filter((s) => !s.assignedTo)
          : filtered.filter((s) => s.assignedTo === assignedFilter)
    }

    // Available: unassigned documents with status 'approved' or 'pending' (ready to claim)
    const available = filtered.filter(
      (s) =>
        !s.assignedTo &&
        (s.status === 'approved' || s.status === 'pending' || !s.status)
    )
    // In Progress: assigned documents that are being worked on
    const inProgress = filtered.filter(
      (s) =>
        s.assignedTo &&
        (s.status === 'approved' ||
          s.status === 'pending' ||
          s.status === 'in-progress' ||
          !s.status)
    )
    const review = filtered.filter((s) => s.status === 'completed')
    const done = filtered.filter((s) => s.status === 'archived')

    const sortByDate = (a: Submission, b: Submission) =>
      toTimestamp(b.approvedAt) - toTimestamp(a.approvedAt)

    return {
      available: available.sort(sortByDate),
      inProgress: inProgress.sort(sortByDate),
      review: review.sort(sortByDate),
      done: done.sort(sortByDate),
    }
  }, [
    submissions,
    searchQuery,
    customerFilter,
    assignedFilter,
    userIsAdmin,
    adminViewMode,
    userId,
    toTimestamp,
  ])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Available */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white">
            <div className="flex items-center justify-between mb-1">
              <span>
                Available {userIsAdmin && adminViewMode === 'admin' && '(All)'}
              </span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">
                {columns.available.length}
              </span>
            </div>
            <p className="text-xs font-normal text-white/80">
              Ready to claim or assign
            </p>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.available.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No available documents
            </p>
          ) : (
            columns.available.map((s) => (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetails(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenDetails(s)
                }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {s.googleDocTitle}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {s.customer.displayName || s.customer.email}
                </p>
                {s.priority && getPriorityConfig(s.priority) && (
                  <span
                    className={`inline-block px-2 py-0.5 ${getPriorityConfig(s.priority)?.bg} ${getPriorityConfig(s.priority)?.text} text-xs font-medium rounded mb-2`}
                  >
                    {getPriorityConfig(s.priority)?.label}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>{s.requirements.length} reqs</span>
                  <span>•</span>
                  <span>{formatDateTime(s.approvedAt)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onAssignToMe(s.id)
                    }}
                    disabled={assigningId === s.id}
                    className="flex-1 px-3 py-1.5 bg-amber-600 text-white rounded text-xs font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors"
                  >
                    {assigningId === s.id ? 'Assigning...' : 'Claim'}
                  </button>
                  {userIsAdmin &&
                    adminViewMode === 'admin' &&
                    onOpenAssignModal && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenAssignModal(s)
                        }}
                        className="px-3 py-1.5 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors"
                        title="Assign to Developer"
                      >
                        Assign
                      </button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white">
            <div className="flex items-center justify-between mb-1">
              <span>In Progress</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">
                {columns.inProgress.length}
              </span>
            </div>
            <p className="text-xs font-normal text-white/80">
              Actively being worked on
            </p>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.inProgress.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No documents in progress
            </p>
          ) : (
            columns.inProgress.map((s) => (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetails(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenDetails(s)
                }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {s.googleDocTitle}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {s.customer.displayName || s.customer.email}
                </p>
                {s.progressPercentage !== undefined && (
                  <ProgressBar
                    percentage={s.progressPercentage}
                    size="sm"
                    showLabel={false}
                  />
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 mt-2">
                  <span>{s.requirements.length} reqs</span>
                  <span>•</span>
                  <span>{s.sessions.length} sessions</span>
                </div>
                <div className="flex gap-1">
                  {(!s.status || s.status === 'pending') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onStartWork(s.id)
                      }}
                      className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                    >
                      Start
                    </button>
                  )}
                  {s.status === 'in-progress' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkComplete(s.id, s.googleDocTitle)
                      }}
                      disabled={updatingStatusId === s.id}
                      className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 disabled:opacity-50"
                    >
                      Complete
                    </button>
                  )}
                  <a
                    href={s.googleDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white">
            <div className="flex items-center justify-between mb-1">
              <span>Review</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">
                {columns.review.length}
              </span>
            </div>
            <p className="text-xs font-normal text-white/80">
              Completed work ready to archive
            </p>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.review.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No documents in review
            </p>
          ) : (
            columns.review.map((s) => (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetails(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenDetails(s)
                }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {s.googleDocTitle}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {s.customer.displayName || s.customer.email}
                </p>
                {s.category && (
                  <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded mb-2">
                    {s.category}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>
                    Completed{' '}
                    {formatDateTime(s.progressUpdatedAt || s.approvedAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={s.googleDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                  >
                    View
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onUpdateStatus(s.id, 'archived')
                    }}
                    disabled={updatingStatusId === s.id}
                    className="px-3 py-1 bg-gray-700 text-white rounded text-xs font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    title="Archive and move to Done"
                  >
                    {updatingStatusId === s.id ? '...' : '📦 Archive'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Done */}
      <div className="bg-white rounded-lg border-2 border-gray-200">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 rounded-t-lg">
          <h3 className="font-bold text-white">
            <div className="flex items-center justify-between mb-1">
              <span>Done</span>
              <span className="bg-white/20 px-2 py-1 rounded text-sm">
                {columns.done.length}
              </span>
            </div>
            <p className="text-xs font-normal text-white/80">
              Archived & finished
            </p>
          </h3>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {columns.done.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No archived documents
            </p>
          ) : (
            columns.done.map((s) => (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenDetails(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenDetails(s)
                }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all opacity-75 cursor-pointer"
              >
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {s.googleDocTitle}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {s.customer.displayName || s.customer.email}
                </p>
                {s.category && (
                  <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">
                    {s.category}
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>Archived</span>
                </div>
                <a
                  href={s.googleDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block w-full px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                >
                  View Document
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
