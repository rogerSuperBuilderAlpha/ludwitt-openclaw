/**
 * Document Approval Confirmation Modal
 * Provides a professional confirmation dialog before approving documents for development
 */

'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle, FileText, Send, X } from 'lucide-react'

interface DocumentApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  document: {
    id: string
    googleDocTitle: string
    googleDocUrl: string
    projectTitle?: string
  }
  /** When 'after_add', show tracking line and copy focused on approving to send to developer */
  source?: 'after_add' | 'existing'
}

export function DocumentApprovalModal({
  isOpen,
  onClose,
  onConfirm,
  document,
  source = 'existing',
}: DocumentApprovalModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isAfterAdd = source === 'after_add'

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      await onConfirm()
      // Success - modal will be closed by parent component
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to notify developer'
      )
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full"
        role="dialog"
        aria-modal="true"
        aria-label="Document approval"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isAfterAdd
                  ? 'Approve & send to developer'
                  : 'Notify Development Team'}
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                {isAfterAdd
                  ? 'One more step so your developer can start work'
                  : 'Confirm document approval'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Tracking line - after add: show where they are in the flow */}
          {isAfterAdd && (
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className="font-medium text-green-700 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Document added
              </span>
              <span className="text-gray-400">→</span>
              <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Pending your approval
              </span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-500">
                Developer notified when you approve
              </span>
            </div>
          )}

          {isAfterAdd && (
            <p className="text-gray-700 text-sm">
              Your document is in your dashboard.{' '}
              <strong>Approve it below</strong> to notify your developer so they
              can start work. Until you approve, they won’t see it in their
              queue.
            </p>
          )}

          {/* Document Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {document.googleDocTitle}
                </h3>
                {document.projectTitle && (
                  <p className="text-sm text-gray-600 mb-2">
                    Project: {document.projectTitle}
                  </p>
                )}
                <a
                  href={document.googleDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Document in Google Drive →
                </a>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              What happens next?
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">1.</span>
                <span>
                  The development team will be notified via email immediately
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">2.</span>
                <span>
                  A developer will review your document and start planning the
                  work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">3.</span>
                <span>
                  You&apos;ll see progress updates, requirements, and work
                  sessions in your dashboard
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">4.</span>
                <span>
                  You can communicate with the developer through project
                  messages
                </span>
              </li>
            </ul>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">
                  Before you approve:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Make sure your document is complete and detailed</li>
                  <li>
                    Verify that the Google Doc link has proper sharing
                    permissions
                  </li>
                  <li>
                    Double-check that all requirements are clearly explained
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-800 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Notifying...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {isAfterAdd
                  ? 'Approve & send to developer'
                  : 'Confirm & Notify Developer'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
