import { User } from 'firebase/auth'
import { Project, ProjectType } from '@/lib/types/project'
import { CustomerDocument, Customer } from '@/lib/types/customer'

export type ViewMode = 'flat' | 'projects'

export type DocumentSort = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'priority-desc' | 'priority-asc'

export type ProjectSort = 'date-desc' | 'date-asc' | 'budget-desc' | 'budget-asc'

export interface CustomerAnalytics {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalValue: number
  totalSubmitted: number
  approvedCount: number
  pendingCount: number
  avgTurnaroundDays: number
}

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  duration?: number
  action?: ToastAction
}

export interface CreateProjectData {
  title: string
  description: string
  type: ProjectType
  totalCost: number
  currency?: string
  estimatedCompletionDate?: string
  milestones?: { title: string; description: string; dueDate: string }[]
}

export interface DocumentFilters {
  documentSearch: string
  documentSort: DocumentSort
  documentStatusFilter: string
  documentPriorityFilter: string
  documentProjectFilter: string
}

export interface ProjectFilters {
  projectSearch: string
  projectSort: ProjectSort
  projectStatusFilter: string
}

export interface ModalState {
  showProjectsListModal: boolean
  showProjectModal: boolean
  showPaymentModal: boolean
  showInboxModal: boolean
  showRequirementsModal: boolean
  showSessionsModal: boolean
  showHistoryModal: boolean
  showApprovalModal: boolean
  showAddForm: boolean
  showOnboarding: boolean
}

export interface SelectedEntities {
  selectedProject: Project | null
  selectedDocForModal: CustomerDocument | null
  documentForHistory: CustomerDocument | null
  documentToApprove: CustomerDocument | null
  paymentProject: Project | null
}

export interface LoadingState {
  approvingId: string | null
  acceptingId: string | null
  deletingId: string | null
  sendingMessageId: string | null
}

export interface AddDocumentFormState {
  shareUrl: string
  docTitle: string
  docNotes: string
  selectedProjectId: string
  addError: string | null
}

export interface DashboardContextValue {
  // Auth & Data
  user: User | null
  customer: Customer | null
  projects: Project[]
  documents: CustomerDocument[]
  filteredDocuments: CustomerDocument[]
  filteredProjects: Project[]
  analytics: CustomerAnalytics

  // Loading States
  authLoading: boolean
  loading: boolean
  projectsLoading: boolean

  // Error State
  error: string | null
  setError: (error: string | null) => void

  // UI State
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  expandedDocId: string | null
  setExpandedDocId: (id: string | null) => void
  expandedProjectIds: Set<string>
  toggleProjectExpansion: (id: string) => void

  // Modal State
  modals: ModalState
  setModals: React.Dispatch<React.SetStateAction<ModalState>>

  // Selected Entities
  selectedEntities: SelectedEntities
  setSelectedEntities: React.Dispatch<React.SetStateAction<SelectedEntities>>

  // Loading Actions
  loadingState: LoadingState

  // Filters
  documentFilters: DocumentFilters
  setDocumentFilters: React.Dispatch<React.SetStateAction<DocumentFilters>>
  projectFilters: ProjectFilters
  setProjectFilters: React.Dispatch<React.SetStateAction<ProjectFilters>>

  // Add Document Form
  addDocumentForm: AddDocumentFormState
  setAddDocumentForm: React.Dispatch<React.SetStateAction<AddDocumentFormState>>
  setShareUrl: (url: string) => void
  setDocTitle: (title: string) => void
  setDocNotes: (notes: string) => void
  setSelectedProjectId: (id: string) => void
  setAddError: (error: string | null) => void
  setEstimatedCostCents: (cents: number) => void
  setEstimateMarkup: (markup: number) => void
  closeAddForm: () => void
  isAdding: boolean

  // Message State
  messageText: Record<string, string>
  setMessageText: React.Dispatch<React.SetStateAction<Record<string, string>>>

  // Actions
  handleApprove: (documentId: string) => void
  handleApproveAll: () => Promise<void>
  handleAcceptWork: (documentId: string) => Promise<void>
  handleDeleteDocument: (documentId: string) => Promise<void>
  handleStartNextIteration: (projectId: string | undefined) => void
  handleUpdateDocumentProject: (documentId: string, newProjectId: string) => Promise<void>
  handleUpdateDocumentPriority: (documentId: string, newPriority: string) => Promise<void>
  handleSendMessage: (documentId: string, text: string) => Promise<void>
  handleAddDocument: (e: React.FormEvent) => Promise<void>
  handleCreateProject: (data: CreateProjectData) => Promise<void>
  handlePayNow: (project: Project) => void
  handleLogout: () => Promise<void>

  // Modal Actions
  openCreateProject: () => void
  openPayFor: (project: Project) => void
  openApprovalFor: (doc: CustomerDocument) => void
  handleConfirmApproval: () => Promise<void>
  approvalSource: 'after_add' | 'existing'

  // Toast Notifications
  toasts: Toast[]
  removeToast: (id: string) => void
  showSuccess: (title: string, message: string, action?: ToastAction) => void
  showError: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void

  // Other
  setDocuments: React.Dispatch<React.SetStateAction<CustomerDocument[]>>
  createProject: (data: CreateProjectData) => Promise<Project>
}
