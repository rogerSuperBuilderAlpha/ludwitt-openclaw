'use client'

import { ProgressBar } from '@/components/ui/ProgressBar'
import { RequirementsSection } from '@/components/developers/document-modal/RequirementsSection'
import { SessionsSection } from '@/components/developers/document-modal/SessionsSection'
import { CommunicationsSection } from '@/components/developers/document-modal/CommunicationsSection'
import type { DateFormatter } from '@/lib/types/common'
import type { SubmissionLike } from '@/components/developers/document-modal/types'

interface DetailsContentProps {
  document: SubmissionLike
  formatDateTime: DateFormatter
  onOpenProgress: () => void
  onOpenCategory: () => void
  userId?: string | null
  requirementText: string
  setRequirementText: (s: string) => void
  requirementNotes: string
  setRequirementNotes: (s: string) => void
  addingRequirementId: string | null
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

export function DetailsContent({
  document,
  formatDateTime,
  ...rest
}: DetailsContentProps) {
  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {document.status && (
          <span
            className={`px-3 py-1 text-sm font-medium rounded ${
              document.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : document.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : document.status === 'archived'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {document.status.charAt(0).toUpperCase() +
              document.status.slice(1).replace('-', ' ')}
          </span>
        )}
        {document.category && (
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
            {document.category}
          </span>
        )}
      </div>

      {document.progressPercentage !== undefined && (
        <div>
          <ProgressBar
            percentage={document.progressPercentage}
            size="md"
            showLabel={true}
          />
          {document.progressNote && (
            <p className="text-sm text-gray-600 mt-2 italic">
              &quot;{document.progressNote}&quot;
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <a
          href={document.googleDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Document →
        </a>
        <button
          onClick={rest.onOpenProgress}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          Update Progress
        </button>
        <button
          onClick={rest.onOpenCategory}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Mark Complete
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RequirementsSection
          requirements={document.requirements}
          documentId={document.id}
          assignedTo={document.assignedTo}
          userId={rest.userId}
          requirementText={rest.requirementText}
          setRequirementText={rest.setRequirementText}
          requirementNotes={rest.requirementNotes}
          setRequirementNotes={rest.setRequirementNotes}
          addingRequirementId={rest.addingRequirementId}
          onAddRequirement={rest.onAddRequirement}
          updatingRequirementId={rest.updatingRequirementId}
          onUpdateRequirementStatus={rest.onUpdateRequirementStatus}
        />
        <SessionsSection
          sessions={document.sessions}
          documentId={document.id}
          assignedTo={document.assignedTo}
          userId={rest.userId}
          sessionAccomplishments={rest.sessionAccomplishments}
          setSessionAccomplishments={rest.setSessionAccomplishments}
          sessionNextSteps={rest.sessionNextSteps}
          setSessionNextSteps={rest.setSessionNextSteps}
          sessionTimeSpent={rest.sessionTimeSpent}
          setSessionTimeSpent={rest.setSessionTimeSpent}
          addingSessionId={rest.addingSessionId}
          onAddSession={rest.onAddSession}
          formatDateTime={formatDateTime}
        />
      </div>

      <CommunicationsSection
        communications={document.communications}
        assignedTo={document.assignedTo}
        userId={rest.userId}
        messageText={rest.messageText}
        setMessageText={rest.setMessageText}
        sendingMessage={rest.sendingMessage}
        onSendMessage={rest.onSendMessage}
        formatDateTime={formatDateTime}
      />
    </>
  )
}
