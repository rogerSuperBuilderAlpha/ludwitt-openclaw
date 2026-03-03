'use client'

import { DocumentFullModal } from '@/components/developers/DocumentFullModal'
import { AddDocumentModal } from '@/components/developers/AddDocumentModal'
import { ChangeOwnerModal } from '@/components/developers/ChangeOwnerModal'
import { AssignDeveloperModal } from '@/components/admin/AssignDeveloperModal'
import { ProjectDetailModal } from '@/components/developers/ProjectDetailModal'
import { Submission } from '@/lib/types/submission'
import { Project } from '@/lib/types/project'
import type { DateFormatter } from '@/lib/types/common'

interface ModalsHostProps {
  // Document full modal
  selectedDocument: Submission | null
  documentModalView: 'details' | 'progress' | 'category'
  onCloseDocument: () => void
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
  onAddRequirement: (doc: Submission) => void
  updatingRequirementId: string | null
  onUpdateRequirementStatus: (reqId: string, status: string) => void
  sessionAccomplishments: string
  setSessionAccomplishments: (s: string) => void
  sessionNextSteps: string
  setSessionNextSteps: (s: string) => void
  sessionTimeSpent: string
  setSessionTimeSpent: (s: string) => void
  addingSessionId: string | null
  onAddSession: (doc: Submission) => void
  messageTextByDoc: string
  setMessageTextForDoc: (s: string) => void
  sendingMessage: boolean
  onSendMessage: () => void

  // Add Document
  showAddDocModal: boolean
  onCloseAddDocument: () => void
  onAddDocument: (data: {
    shareUrl: string
    title: string
    notes: string
    projectId: string
    customerId: string
    status: 'pending' | 'approved'
  }) => Promise<void>

  // Change owner
  changeOwnerDocument: Submission | null
  showChangeOwnerModal: boolean
  onCloseChangeOwner: () => void
  onSubmitChangeOwner: (newCustomerId: string) => Promise<void>

  // Assign developer
  documentToAssign: Submission | null
  showAssignModal: boolean
  onCloseAssign: () => void
  onAssignToDeveloper: (
    developerId: string,
    developerName: string
  ) => Promise<void>

  // Project Detail
  selectedProject: Project | null
  onCloseProject: () => void
}

export function ModalsHost(props: ModalsHostProps) {
  const {
    selectedDocument,
    documentModalView,
    onCloseDocument,
    onBackToDetails,
    onOpenProgress,
    onOpenCategory,
    progressPercentage,
    setProgressPercentage,
    progressNote,
    setProgressNote,
    isUpdatingProgress,
    onSubmitProgress,
    completionCategory,
    setCompletionCategory,
    onSubmitCategory,
    formatDateTime,
    userId,
    addingRequirementId,
    requirementText,
    setRequirementText,
    requirementNotes,
    setRequirementNotes,
    onAddRequirement,
    updatingRequirementId,
    onUpdateRequirementStatus,
    sessionAccomplishments,
    setSessionAccomplishments,
    sessionNextSteps,
    setSessionNextSteps,
    sessionTimeSpent,
    setSessionTimeSpent,
    addingSessionId,
    onAddSession,
    messageTextByDoc,
    setMessageTextForDoc,
    sendingMessage,
    onSendMessage,
    showAddDocModal,
    onCloseAddDocument,
    onAddDocument,
    changeOwnerDocument,
    showChangeOwnerModal,
    onCloseChangeOwner,
    onSubmitChangeOwner,
    documentToAssign,
    showAssignModal,
    onCloseAssign,
    onAssignToDeveloper,
  } = props

  return (
    <>
      {selectedDocument && (
        <DocumentFullModal
          isOpen={Boolean(selectedDocument)}
          document={selectedDocument}
          view={documentModalView}
          onClose={onCloseDocument}
          onBackToDetails={onBackToDetails}
          onOpenProgress={onOpenProgress}
          onOpenCategory={onOpenCategory}
          progressPercentage={progressPercentage}
          setProgressPercentage={setProgressPercentage}
          progressNote={progressNote}
          setProgressNote={setProgressNote}
          isUpdatingProgress={isUpdatingProgress}
          onSubmitProgress={onSubmitProgress}
          completionCategory={completionCategory}
          setCompletionCategory={setCompletionCategory}
          completionCostCents={props.completionCostCents}
          setCompletionCostCents={props.setCompletionCostCents}
          onSubmitCategory={onSubmitCategory}
          formatDateTime={formatDateTime}
          userId={userId}
          addingRequirementId={addingRequirementId}
          requirementText={requirementText}
          setRequirementText={setRequirementText}
          requirementNotes={requirementNotes}
          setRequirementNotes={setRequirementNotes}
          onAddRequirement={() => onAddRequirement(selectedDocument)}
          updatingRequirementId={updatingRequirementId}
          onUpdateRequirementStatus={(reqId, status) =>
            onUpdateRequirementStatus(reqId, status)
          }
          sessionAccomplishments={sessionAccomplishments}
          setSessionAccomplishments={setSessionAccomplishments}
          sessionNextSteps={sessionNextSteps}
          setSessionNextSteps={setSessionNextSteps}
          sessionTimeSpent={sessionTimeSpent}
          setSessionTimeSpent={setSessionTimeSpent}
          addingSessionId={addingSessionId}
          onAddSession={() => onAddSession(selectedDocument)}
          messageText={messageTextByDoc}
          setMessageText={setMessageTextForDoc}
          sendingMessage={sendingMessage}
          onSendMessage={onSendMessage}
        />
      )}

      <AddDocumentModal
        isOpen={showAddDocModal}
        onClose={onCloseAddDocument}
        onSubmit={onAddDocument}
      />

      {changeOwnerDocument && (
        <ChangeOwnerModal
          isOpen={showChangeOwnerModal}
          onClose={onCloseChangeOwner}
          currentCustomerId={changeOwnerDocument.customerId}
          currentCustomerName={
            changeOwnerDocument.customer.displayName ||
            changeOwnerDocument.customer.email
          }
          documentTitle={changeOwnerDocument.googleDocTitle}
          onSubmit={onSubmitChangeOwner}
        />
      )}

      {documentToAssign && (
        <AssignDeveloperModal
          isOpen={showAssignModal}
          onClose={onCloseAssign}
          documentId={documentToAssign.id}
          documentTitle={documentToAssign.googleDocTitle}
          onAssign={onAssignToDeveloper}
        />
      )}

      {props.selectedProject && (
        <ProjectDetailModal
          project={props.selectedProject}
          onClose={props.onCloseProject}
        />
      )}
    </>
  )
}
