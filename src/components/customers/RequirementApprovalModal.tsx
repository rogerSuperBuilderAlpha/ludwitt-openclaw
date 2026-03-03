/**
 * Requirement Approval Modal
 * Allows customers to approve or reject requirements from developers
 */

'use client'

import { useState } from 'react'
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { logger } from '@/lib/logger'

interface RequirementApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  requirement: {
    id: string
    requirement: string
    notes?: string
    addedBy: string
    addedAt: any
  }
  documentTitle: string
  onApprove: (requirementId: string, feedback?: string) => Promise<void>
  onReject: (requirementId: string, feedback: string) => Promise<void>
}

export function RequirementApprovalModal({
  isOpen,
  onClose,
  requirement,
  documentTitle,
  onApprove,
  onReject,
}: RequirementApprovalModalProps) {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!action) return
    if (action === 'reject' && !feedback.trim()) {
      alert('Please provide feedback when rejecting a requirement')
      return
    }

    setIsSubmitting(true)
    try {
      if (action === 'approve') {
        await onApprove(requirement.id, feedback || undefined)
      } else {
        await onReject(requirement.id, feedback)
      }
      onClose()
    } catch (error) {
      logger.error(
        'RequirementApprovalModal',
        'Error submitting requirement approval',
        { error }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Requirement approval"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Review Requirement
            </h3>
            <p className="text-sm text-gray-600">{documentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Requirement Details */}
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Requirement
              </h4>
              <p className="text-gray-900 mb-3">{requirement.requirement}</p>

              {requirement.notes && (
                <>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Developer Notes
                  </h4>
                  <p className="text-gray-700 text-sm">{requirement.notes}</p>
                </>
              )}

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Added by {requirement.addedBy}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 font-medium mb-1">
                    Review This Requirement
                  </p>
                  <p className="text-sm text-blue-800">
                    Please review this requirement carefully. Approving it
                    allows the developer to proceed with implementation. If
                    something is unclear or needs changes, you can reject it
                    with feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Selection */}
          {!action && (
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setAction('approve')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    Approve Requirement
                  </p>
                  <p className="text-sm text-gray-600">
                    This requirement looks good, developer can proceed
                  </p>
                </div>
              </button>

              <button
                onClick={() => setAction('reject')}
                className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
              >
                <XCircle className="w-6 h-6 text-red-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Request Changes</p>
                  <p className="text-sm text-gray-600">
                    This needs clarification or modification
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Feedback Form */}
          {action && (
            <div className="space-y-4">
              <div
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: action === 'approve' ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${action === 'approve' ? '#86efac' : '#fca5a5'}`,
                }}
              >
                {action === 'approve' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <p
                  className="font-medium"
                  style={{
                    color: action === 'approve' ? '#166534' : '#991b1b',
                  }}
                >
                  {action === 'approve'
                    ? 'Approving Requirement'
                    : 'Requesting Changes'}
                </p>
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {action === 'approve'
                    ? 'Feedback (Optional)'
                    : 'What needs to change? (Required)'}
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    action === 'approve'
                      ? 'Add any comments or feedback...'
                      : 'Please explain what needs to be changed or clarified...'
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                />
              </div>

              <button
                onClick={() => setAction(null)}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                ← Change decision
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          {action && (
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting || (action === 'reject' && !feedback.trim())
              }
              className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                action === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSubmitting
                ? 'Submitting...'
                : action === 'approve'
                  ? 'Approve Requirement'
                  : 'Request Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
