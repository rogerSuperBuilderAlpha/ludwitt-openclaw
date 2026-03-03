'use client'

import { ExternalLink } from 'lucide-react'
import type { DateFormatter } from '@/lib/types/common'
import type { FirestoreTimestamp } from '@/lib/types/timestamp'

interface SubmissionHeaderProps {
  googleDocTitle: string
  googleDocUrl: string
  status?: 'pending' | 'in-progress' | 'completed' | 'archived'
  category?: string
  customerDisplayName: string
  customerEmail: string
  customerAssignedCount?: number
  approvedAt: FirestoreTimestamp
  assignedToName?: string
  formatDate: DateFormatter
}

export function SubmissionHeader({
  googleDocTitle,
  googleDocUrl,
  status,
  category,
  customerDisplayName,
  customerEmail,
  customerAssignedCount,
  approvedAt,
  assignedToName,
  formatDate,
}: SubmissionHeaderProps) {
  return (
    <div className="p-4 sm:p-6 border-b">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-3 mb-3">
        <div className="flex-1 w-full">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 min-w-0 break-words">
              {googleDocTitle}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                  status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : status === 'archived'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {status === 'in-progress'
                  ? 'In Progress'
                  : status
                    ? status.charAt(0).toUpperCase() + status.slice(1)
                    : 'Pending'}
              </span>
              {category && (
                <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full whitespace-nowrap">
                  {category}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{customerDisplayName}</span>
              {customerAssignedCount && customerAssignedCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                  {customerAssignedCount} other
                </span>
              )}
            </div>
            <span className="hidden sm:inline">•</span>
            <span className="break-all">{customerEmail}</span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">
              Approved: {formatDate(approvedAt)}
            </span>
          </div>
          {assignedToName && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Assigned to:</span> {assignedToName}
            </div>
          )}
        </div>
        <a
          href={googleDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors min-h-[44px]"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Doc</span>
        </a>
      </div>
    </div>
  )
}
