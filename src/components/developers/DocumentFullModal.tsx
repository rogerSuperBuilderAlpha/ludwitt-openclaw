'use client'

import { ArrowLeft, Users } from 'lucide-react'
import { ProgressView } from '@/components/developers/document-modal/ProgressView'
import { CategoryView } from '@/components/developers/document-modal/CategoryView'
import { DetailsContent } from '@/components/developers/document-modal/DetailsContent'
import type { DateFormatter } from '@/lib/types/common'
import type {
  SubmissionLike,
  View,
} from '@/components/developers/document-modal/types'

export type { SubmissionLike }

interface DocumentFullModalProps {
  isOpen: boolean
  document: SubmissionLike | null
  view: View
  onClose: () => void
  onBackToDetails: () => void
  onOpenProgress: () => void
  onOpenCategory: () => void
  progressPercentage: number
  setProgressPercentage: (n: number) => void
  progressNote: string
  setProgressNote: (s: string) => void
  isUpdatingProgress: boolean
  onSubmitProgress: () => void
  completionCategory: string
  setCompletionCategory: (s: string) => void
  completionCostCents: number
  setCompletionCostCents: (n: number) => void
  onSubmitCategory: () => void
  formatDateTime: DateFormatter
  userId?: string | null
  addingRequirementId: string | null
  requirementText: string
  setRequirementText: (s: string) => void
  requirementNotes: string
  setRequirementNotes: (s: string) => void
  onAddRequirement: () => void
  updatingRequirementId: string | null
  onUpdateRequirementStatus: (reqId: string, newStatus: string) => void
  sessionAccomplishments: string
  setSessionAccomplishments: (s: string) => void
  sessionNextSteps: string
  setSessionNextSteps: (s: string) => void
  sessionTimeSpent: string
  setSessionTimeSpent: (s: string) => void
  addingSessionId: string | null
  onAddSession: () => void
  messageText: string
  setMessageText: (s: string) => void
  sendingMessage: boolean
  onSendMessage: () => void
}

export function DocumentFullModal(props: DocumentFullModalProps) {
  const { isOpen, document, view, onClose, onBackToDetails, formatDateTime } =
    props

  if (!isOpen || !document) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="button"
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClose()
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Document details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
          <div className="flex-1">
            {view !== 'details' && (
              <button
                onClick={onBackToDetails}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Details
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {view === 'progress' && (
                <span className="inline-block mr-2 text-blue-600">
                  Update Progress
                </span>
              )}
              {view === 'category' && (
                <span className="inline-block mr-2 text-purple-600">
                  Mark Complete
                </span>
              )}
              {view === 'details' && document.googleDocTitle}
            </h2>
            {view === 'details' && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {document.customer.displayName || document.customer.email}
                </span>
                <span>&bull;</span>
                <span>{formatDateTime(document.approvedAt)}</span>
                {document.assignedToName && (
                  <>
                    <span>&bull;</span>
                    <span>Assigned to: {document.assignedToName}</span>
                  </>
                )}
              </div>
            )}
            {(view === 'progress' || view === 'category') && (
              <p className="text-sm text-gray-600">
                Document: {document.googleDocTitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {view === 'progress' && (
            <ProgressView
              progressPercentage={props.progressPercentage}
              setProgressPercentage={props.setProgressPercentage}
              progressNote={props.progressNote}
              setProgressNote={props.setProgressNote}
              isUpdatingProgress={props.isUpdatingProgress}
              onSubmitProgress={props.onSubmitProgress}
              onBackToDetails={onBackToDetails}
            />
          )}

          {view === 'category' && (
            <CategoryView
              completionCategory={props.completionCategory}
              setCompletionCategory={props.setCompletionCategory}
              completionCostCents={props.completionCostCents}
              setCompletionCostCents={props.setCompletionCostCents}
              onSubmitCategory={props.onSubmitCategory}
              onBackToDetails={onBackToDetails}
            />
          )}

          {view === 'details' && (
            <DetailsContent
              document={document}
              formatDateTime={formatDateTime}
              onOpenProgress={props.onOpenProgress}
              onOpenCategory={props.onOpenCategory}
              userId={props.userId}
              requirementText={props.requirementText}
              setRequirementText={props.setRequirementText}
              requirementNotes={props.requirementNotes}
              setRequirementNotes={props.setRequirementNotes}
              addingRequirementId={props.addingRequirementId}
              onAddRequirement={props.onAddRequirement}
              updatingRequirementId={props.updatingRequirementId}
              onUpdateRequirementStatus={props.onUpdateRequirementStatus}
              sessionAccomplishments={props.sessionAccomplishments}
              setSessionAccomplishments={props.setSessionAccomplishments}
              sessionNextSteps={props.sessionNextSteps}
              setSessionNextSteps={props.setSessionNextSteps}
              sessionTimeSpent={props.sessionTimeSpent}
              setSessionTimeSpent={props.setSessionTimeSpent}
              addingSessionId={props.addingSessionId}
              onAddSession={props.onAddSession}
              messageText={props.messageText}
              setMessageText={props.setMessageText}
              sendingMessage={props.sendingMessage}
              onSendMessage={props.onSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
