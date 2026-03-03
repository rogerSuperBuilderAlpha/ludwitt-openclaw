'use client'

import { CheckCircle } from 'lucide-react'
import { SubmissionHeader } from './SubmissionHeader'
import { RequirementsSection } from './RequirementsSection'
import { SessionsSection } from './SessionsSection'
import { ActionButtons } from './ActionButtons'
import { useSubmissionCardForm } from './useSubmissionCardForm'

interface Submission {
  id: string
  customerId: string
  googleDocTitle: string
  googleDocUrl: string
  approvedAt: any
  status?: 'pending' | 'in-progress' | 'completed' | 'archived'
  category?: string
  assignedTo?: string
  assignedToName?: string
  customer: {
    email: string
    displayName: string
    assignedSubmissionsCount?: number
  }
  requirements: Array<{
    id: string
    requirement: string
    status: string
    addedBy: string
    addedAt: any
    notes?: string
  }>
  sessions: Array<{
    id: string
    accomplishments: string
    sessionDate: any
    addedBy: string
    nextSteps?: string
  }>
}

interface SubmissionCardProps {
  submission: Submission
  developers: Array<{
    id: string
    email: string
    displayName: string
    isAdmin: boolean
  }>
  actions: {
    onAddRequirement: (
      submission: Submission,
      text: string,
      notes: string
    ) => Promise<void>
    onAddSession: (
      submission: Submission,
      accomplishments: string,
      nextSteps: string
    ) => Promise<void>
    onSubmitNotification: (submission: Submission) => Promise<void>
    onAssignToMe: (id: string) => Promise<void>
    onAssignToDeveloper: (
      submissionId: string,
      developerId: string
    ) => Promise<void>
    onUpdateStatus: (id: string, status: string) => Promise<void>
    onMarkComplete: (id: string, title: string) => Promise<void>
    onArchive: (id: string, title: string) => Promise<void>
  }
  formatDate: (date: any) => string
  formatDateTime: (date: any) => string
}

export function SubmissionCard({
  submission,
  developers,
  actions,
  formatDate,
  formatDateTime,
}: SubmissionCardProps) {
  const form = useSubmissionCardForm(submission, actions)

  return (
    <div className="bg-white rounded-lg shadow">
      <SubmissionHeader
        googleDocTitle={submission.googleDocTitle}
        googleDocUrl={submission.googleDocUrl}
        status={submission.status}
        category={submission.category}
        customerDisplayName={submission.customer?.displayName}
        customerEmail={submission.customer?.email}
        customerAssignedCount={submission.customer?.assignedSubmissionsCount}
        approvedAt={submission.approvedAt}
        assignedToName={submission.assignedToName}
        formatDate={formatDate}
      />

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <RequirementsSection
          requirements={submission.requirements}
          submissionId={submission.id}
          activeSubmission={submission.id}
          showRequirementForm={form.showRequirementForm}
          requirementText={form.requirementText}
          requirementNotes={form.requirementNotes}
          addingRequirement={form.addingRequirement}
          setActiveSubmission={() => {}}
          setShowRequirementForm={form.setShowRequirementForm}
          setShowSessionForm={form.setShowSessionForm}
          setRequirementText={form.setRequirementText}
          setRequirementNotes={form.setRequirementNotes}
          handleAddRequirement={form.handleAddRequirement}
          handleOpenModal={() => {}}
          formatDate={formatDate}
        />

        <SessionsSection
          sessions={submission.sessions}
          submissionId={submission.id}
          activeSubmission={submission.id}
          showSessionForm={form.showSessionForm}
          sessionAccomplishments={form.sessionAccomplishments}
          sessionNextSteps={form.sessionNextSteps}
          addingSession={form.addingSession}
          setActiveSubmission={() => {}}
          setShowSessionForm={form.setShowSessionForm}
          setShowRequirementForm={form.setShowRequirementForm}
          setSessionAccomplishments={form.setSessionAccomplishments}
          setSessionNextSteps={form.setSessionNextSteps}
          handleAddSession={form.handleAddSession}
          handleOpenModal={() => {}}
          formatDateTime={formatDateTime}
        />
      </div>

      <ActionButtons
        submissionId={submission.id}
        submissionTitle={submission.googleDocTitle}
        status={submission.status}
        assignedTo={submission.assignedTo}
        showAssignDropdown={form.showAssignDropdown ? submission.id : null}
        setShowAssignDropdown={(id) => form.setShowAssignDropdown(!!id)}
        selectedDeveloper={form.selectedDeveloper}
        setSelectedDeveloper={form.setSelectedDeveloper}
        developers={developers}
        assigning={form.assigning ? submission.id : null}
        updatingStatus={form.updatingStatus ? submission.id : null}
        handleAssignToMe={form.handleAssignToMe}
        handleAssignToDeveloper={(_sid, devId) =>
          actions.onAssignToDeveloper(submission.id, devId)
        }
        handleUpdateStatus={(_sid, status) => form.handleUpdateStatus(status)}
        handleMarkComplete={() => form.handleMarkComplete()}
        handleArchiveClick={() => form.handleArchive()}
      />

      {/* Submit Button - Show only if there are both requirements and sessions */}
      {submission.requirements.length > 0 && submission.sessions.length > 0 && (
        <div className="px-6 pb-6">
          <button
            onClick={form.handleSubmitNotification}
            disabled={form.submitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {form.submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending Notification...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Submit & Notify Client
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
