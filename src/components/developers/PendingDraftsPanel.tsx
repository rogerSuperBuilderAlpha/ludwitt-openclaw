'use client'

import { CheckCircle, Clock, Mail } from 'lucide-react'
import type { DateFormatter } from '@/lib/types/common'

interface PendingDraft {
  id: string
  customerId: string
  projectId?: string
  projectTitle?: string | null
  googleDocTitle: string
  googleDocUrl: string
  addedAt: any
  notes?: string
  lastNudgedAt?: string
  nudgeCount?: number
  customer: {
    email: string
    displayName: string
  }
}

interface PendingDraftsPanelProps {
  pendingDrafts: PendingDraft[]
  formatDateTime: DateFormatter
  nudgingDocId: string | null
  approvingDocId: string | null
  onNudge: (documentId: string) => void
  onApprove: (documentId: string) => void
}

export function PendingDraftsPanel({
  pendingDrafts,
  formatDateTime,
  nudgingDocId,
  approvingDocId,
  onNudge,
  onApprove,
}: PendingDraftsPanelProps) {
  return (
    <div className="bg-white rounded-lg border border-amber-200 overflow-hidden">
      <div className="px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
        <h3 className="font-semibold text-amber-800">
          Unsubmitted (Customer Drafts)
        </h3>
        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
          {pendingDrafts.length}
        </span>
      </div>
      <div className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pendingDrafts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500 text-sm">
            No unsubmitted drafts at the moment
          </div>
        ) : (
          pendingDrafts.map((d) => (
            <div
              key={d.id}
              className="border border-amber-200 rounded p-3 bg-amber-25"
            >
              <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                {d.googleDocTitle}
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                {d.customer.displayName || d.customer.email}
              </p>
              {d.projectTitle && (
                <p className="text-xs text-gray-500 mb-2">
                  Project: {d.projectTitle}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Clock className="w-3 h-3" />
                <span>{formatDateTime(d.addedAt)}</span>
              </div>
              {d.nudgeCount && d.nudgeCount > 0 && (
                <div className="flex items-center gap-2 text-xs text-orange-600 mb-2 bg-orange-50 px-2 py-1 rounded">
                  <Mail className="w-3 h-3" />
                  <span>
                    Nudged {d.nudgeCount}x
                    {d.lastNudgedAt &&
                      ` (last: ${new Date(d.lastNudgedAt).toLocaleDateString()})`}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <a
                  href={d.googleDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white text-center"
                >
                  View Doc
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onApprove(d.id)
                  }}
                  disabled={approvingDocId === d.id}
                  className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs font-medium text-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  {approvingDocId === d.id ? 'Approving...' : 'Approve'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNudge(d.id)
                  }}
                  disabled={nudgingDocId === d.id}
                  className="px-2 py-1 bg-amber-600 text-white rounded text-xs font-medium text-center hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {nudgingDocId === d.id ? 'Sending...' : 'Nudge'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
