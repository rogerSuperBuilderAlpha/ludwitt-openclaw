import type { Submission } from '@/lib/types/submission'

export type ModalView = 'details' | 'progress' | 'complete'

export interface DocumentDetailActions {
  handleClaim: () => Promise<void>
  handleAssign: () => void
  handleStartWork: () => Promise<void>
  handleUpdateProgress: () => Promise<void>
  handleComplete: () => Promise<void>
  handleArchive: () => Promise<void>
  handleSendMessage: () => Promise<void>
}

export interface DocumentDetailState {
  view: ModalView
  setView: (view: ModalView) => void
  claiming: boolean
  completing: boolean
  updating: boolean

  // Progress form
  progressPercentage: number
  setProgressPercentage: (value: number) => void
  progressNote: string
  setProgressNote: (value: string) => void

  // Completion form
  completionCategory: string
  setCompletionCategory: (value: string) => void
  completionCostCents: number
  setCompletionCostCents: (value: number) => void
  completionNotes: string
  setCompletionNotes: (value: string) => void

  // Messages
  messageText: string
  setMessageText: (value: string) => void
  sendingMessage: boolean
}

export interface DocumentPermissions {
  isAssignedToMe: boolean
  isUnassigned: boolean
  canClaim: boolean
  canComplete: boolean
  canStart: boolean
  isAdminView: boolean
}

export interface DocumentDetailHeaderProps {
  document: Submission
  view: ModalView
  setView: (view: ModalView) => void
  closeModal: () => void
  formatDateTime: (dateValue: unknown) => string
}

export interface DocumentDetailsViewProps {
  document: Submission
  permissions: DocumentPermissions
  actions: DocumentDetailActions
  state: DocumentDetailState
  formatDateTime: (dateValue: unknown) => string
}

export interface DocumentProgressViewProps {
  state: DocumentDetailState
  actions: DocumentDetailActions
}

export interface DocumentCompleteViewProps {
  state: DocumentDetailState
  actions: DocumentDetailActions
}
