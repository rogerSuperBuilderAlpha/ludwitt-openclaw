/**
 * Document Detail Modal
 * Shows full details of a document with requirements, sessions, and communication
 */

'use client'

import { X, FileText, ListChecks, Clock, MessageSquare } from 'lucide-react'
import { Submission } from '@/lib/types/submission'
import { toDate, formatDateTime } from '@/lib/utils/timestamp'

interface DocumentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  document: Submission | null
  view: 'details' | 'progress' | 'category'
  onViewChange: (view: 'details' | 'progress' | 'category') => void
}

export function DocumentDetailModal({
  isOpen,
  onClose,
  document,
  view,
  onViewChange,
}: DocumentDetailModalProps) {
  if (!isOpen || !document) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Document details"
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-bold">{document.googleDocTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 flex gap-1">
          <button
            onClick={() => onViewChange('details')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              view === 'details'
                ? 'text-gray-900 bg-white border-t-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Details
            </div>
          </button>
          <button
            onClick={() => onViewChange('progress')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              view === 'progress'
                ? 'text-gray-900 bg-white border-t-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Progress
            </div>
          </button>
          <button
            onClick={() => onViewChange('category')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              view === 'category'
                ? 'text-gray-900 bg-white border-t-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              Category
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Customer:</span>
                <p className="text-gray-900">{document.customer.displayName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <p className="text-gray-900">{document.customer.email}</p>
              </div>
              {document.projectTitle && (
                <div className="col-span-2">
                  <span className="font-medium text-gray-700">Project:</span>
                  <p className="text-gray-900">{document.projectTitle}</p>
                </div>
              )}
            </div>
          </div>

          {/* Requirements Section */}
          {document.requirements && document.requirements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ListChecks className="w-5 h-5" />
                Requirements ({document.requirements.length})
              </h3>
              <div className="space-y-2">
                {document.requirements.map((req) => (
                  <div
                    key={req.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <p className="text-gray-900 mb-2">{req.requirement}</p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Added by: {req.addedBy}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          req.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : req.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sessions Section */}
          {document.sessions && document.sessions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Sessions ({document.sessions.length})
              </h3>
              <div className="space-y-3">
                {document.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900">
                        {formatDateTime(session.sessionDate)}
                      </p>
                      {session.timeSpentMinutes && (
                        <span className="text-xs text-gray-600">
                          {session.timeSpentMinutes} min
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {session.accomplishments}
                    </p>
                    {session.nextSteps && (
                      <p className="text-xs text-gray-600">
                        Next: {session.nextSteps}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communications Section */}
          {document.communications && document.communications.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communications ({document.communications.length})
              </h3>
              <div className="space-y-3">
                {document.communications.map((comm) => (
                  <div
                    key={comm.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {comm.sentBy}
                      </span>
                      <span className="text-xs text-gray-600">
                        {toDate(comm.sentAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comm.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-between items-center">
          <a
            href={document.googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Open Document →
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
