import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCustomerAuth } from '@/lib/hooks/useCustomerAuth'
import { useProjects } from '@/lib/hooks/useProjects'
import { useCustomerDocuments } from '@/lib/hooks/customers/useCustomerDocuments'
import { useCustomerAnalytics } from '@/lib/hooks/customers/useCustomerAnalytics'
import { useFilteredDocuments } from '@/lib/hooks/customers/useDocumentFilters'
import { useDocumentFiltersState } from '@/lib/hooks/customers/useDocumentFiltersState'
import { useFilteredProjects } from '@/lib/hooks/customers/useProjectFilters'
import { useExpandedProjects } from '@/lib/hooks/customers/useExpandedProjects'
import { useAddDocumentForm } from '@/lib/hooks/customers/useAddDocumentForm'
import { useDocumentMessaging } from '@/lib/hooks/customers/useDocumentMessaging'
import { useApprovalFlow } from '@/lib/hooks/customers/useApprovalFlow'
import { useDocumentMutations } from '@/lib/hooks/customers/useDocumentMutations'
import { useCustomerDashboardUI } from '@/lib/hooks/customers/useCustomerDashboardUI'
import { useToasts } from '@/components/customers/dashboard/ConfirmationToast'
import { useSmartDefaults } from '@/lib/hooks/customers/useSmartDefaults'
import { handleLogout as doLogout } from '@/lib/customers/dashboard/handlers'
import { Project } from '@/lib/types/project'
import { CustomerDocument } from '@/lib/types/customer'
import {
  ViewMode,
  DocumentFilters,
  ProjectFilters,
  ModalState,
  SelectedEntities,
  LoadingState,
  AddDocumentFormState,
  DashboardContextValue
} from '../types'

export interface UseCustomerDashboardOptions {
  setShowQuickForm?: (show: boolean) => void
}

export function useCustomerDashboard(options?: UseCustomerDashboardOptions): DashboardContextValue {
  const setShowQuickForm = options?.setShowQuickForm
  const router = useRouter()
  const { user, customer, loading: authLoading } = useCustomerAuth()
  const { projects, loading: projectsLoading, createProject } = useProjects(user?.uid, { role: 'customer' })
  const { documents, loading, error, setDocuments, setError } = useCustomerDocuments(user?.uid)

  // Toast notifications
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToasts()

  // Smart defaults
  const smartDefaults = useSmartDefaults(user?.uid)

  // UI/Modal state from custom hook
  const {
    viewMode,
    setViewMode,
    showProjectsListModal,
    setShowProjectsListModal,
    showProjectModal,
    setShowProjectModal,
    selectedProject,
    setSelectedProject,
    showPaymentModal,
    setShowPaymentModal,
    paymentProject,
    setPaymentProject,
    showInboxModal,
    setShowInboxModal,
    showRequirementsModal,
    setShowRequirementsModal,
    showSessionsModal,
    setShowSessionsModal,
    selectedDocForModal,
    setSelectedDocForModal,
    showHistoryModal,
    setShowHistoryModal,
    documentForHistory,
    setDocumentForHistory,
    expandedDocId,
    setExpandedDocId,
    openCreateProject,
    openPayFor,
    handleCreateProject,
  } = useCustomerDashboardUI({ createProject })

  // Additional modal states
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Document approval modal state (must be declared before modal sync effect)
  const {
    showApprovalModal,
    setShowApprovalModal,
    documentToApprove,
    setDocumentToApprove,
    approvalSource,
    approvingId,
    openApprovalFor,
    openApprovalForNewlyAdded,
    confirmApproval: handleConfirmApproval,
  } = useApprovalFlow({ setError: (m?: string) => setError(m ?? null) })

  // When customer adds a document, close quick form (if open) and open approval modal
  const onAddDocumentSuccess = useCallback(
    (doc: { id: string; googleDocTitle: string; googleDocUrl: string; projectId?: string | null }) => {
      setShowQuickForm?.(false)
      openApprovalForNewlyAdded({
        id: doc.id,
        googleDocTitle: doc.googleDocTitle,
        googleDocUrl: doc.googleDocUrl,
        projectTitle: undefined,
        status: 'pending',
      } as unknown as CustomerDocument)
    },
    [openApprovalForNewlyAdded, setShowQuickForm]
  )

  // Consolidated modal state
  const [modals, setModals] = useState<ModalState>({
    showProjectsListModal: false,
    showProjectModal: false,
    showPaymentModal: false,
    showInboxModal: false,
    showRequirementsModal: false,
    showSessionsModal: false,
    showHistoryModal: false,
    showApprovalModal: false,
    showAddForm: false,
    showOnboarding: false,
  })

  // Sync individual modal states with consolidated state
  useEffect(() => {
    setModals(prev => ({
      ...prev,
      showProjectsListModal,
      showProjectModal,
      showPaymentModal,
      showInboxModal,
      showRequirementsModal,
      showSessionsModal,
      showHistoryModal,
      showOnboarding,
      showApprovalModal,
    }))
  }, [
    showProjectsListModal,
    showProjectModal,
    showPaymentModal,
    showInboxModal,
    showRequirementsModal,
    showSessionsModal,
    showHistoryModal,
    showOnboarding,
    showApprovalModal,
  ])

  // Documents search, sort, filter
  const {
    documentSearch,
    setDocumentSearch,
    documentSort,
    setDocumentSort,
    documentStatusFilter,
    setDocumentStatusFilter,
    documentPriorityFilter,
    setDocumentPriorityFilter,
    documentProjectFilter,
    setDocumentProjectFilter,
  } = useDocumentFiltersState()

  // Consolidated document filters
  const [documentFilters, setDocumentFilters] = useState<DocumentFilters>({
    documentSearch: '',
    documentSort: 'date-desc',
    documentStatusFilter: 'all',
    documentPriorityFilter: 'all',
    documentProjectFilter: 'all',
  })

  // Sync individual filters with consolidated state
  useEffect(() => {
    setDocumentFilters({
      documentSearch,
      documentSort,
      documentStatusFilter,
      documentPriorityFilter,
      documentProjectFilter,
    })
  }, [documentSearch, documentSort, documentStatusFilter, documentPriorityFilter, documentProjectFilter])

  // Projects search, sort, filter
  const [projectFilters, setProjectFilters] = useState<ProjectFilters>({
    projectSearch: '',
    projectSort: 'date-desc',
    projectStatusFilter: 'all',
  })

  // Add document form
  const {
    showAddForm,
    setShowAddForm,
    shareUrl,
    setShareUrl,
    docTitle,
    setDocTitle,
    docNotes,
    setDocNotes,
    selectedProjectId,
    setSelectedProjectId,
    estimatedCostCents,
    setEstimatedCostCents,
    estimateMarkup,
    setEstimateMarkup,
    isAdding,
    addError,
    setAddError,
    submit: handleAddDocument,
  } = useAddDocumentForm({ onAddSuccess: onAddDocumentSuccess })

  // Consolidated add document form state
  const [addDocumentForm, setAddDocumentForm] = useState<AddDocumentFormState>({
    shareUrl: '',
    docTitle: '',
    docNotes: '',
    selectedProjectId: '',
    addError: null,
  })

  // Sync add document form state
  useEffect(() => {
    setAddDocumentForm({
      shareUrl,
      docTitle,
      docNotes,
      selectedProjectId,
      addError,
    })
  }, [shareUrl, docTitle, docNotes, selectedProjectId, addError])

  // Messaging state
  const { messageText, setMessageText, sendingMessageId, sendMessage: handleSendMessage } = useDocumentMessaging({
    setError: (m: string) => setError(m)
  })

  const { expandedProjectIds, toggleProjectExpansion } = useExpandedProjects()

  // Consolidated selected entities
  const [selectedEntities, setSelectedEntities] = useState<SelectedEntities>({
    selectedProject: null,
    selectedDocForModal: null,
    documentForHistory: null,
    documentToApprove: null,
    paymentProject: null,
  })

  // Sync selected entities
  useEffect(() => {
    setSelectedEntities({
      selectedProject,
      selectedDocForModal,
      documentForHistory,
      documentToApprove,
      paymentProject,
    })
  }, [selectedProject, selectedDocForModal, documentForHistory, documentToApprove, paymentProject])

  // Loading states for actions
  const [acceptingId, setAcceptingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadingState: LoadingState = {
    approvingId,
    acceptingId,
    deletingId,
    sendingMessageId,
  }

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/customers/dashboard')
    }
  }, [user, authLoading, router])

  // Check if user should see onboarding
  useEffect(() => {
    if (user && documents.length === 0 && projects.length === 0 && !loading && !projectsLoading) {
      const hasSeenOnboarding = localStorage.getItem(`onboarding-completed-${user.uid}`)
      if (!hasSeenOnboarding) {
        setShowOnboarding(true)
      }
    }
  }, [user, documents.length, projects.length, loading, projectsLoading])

  // Handle approve action
  const handleApprove = useCallback((documentId: string) => {
    const doc = documents.find(d => d.id === documentId)
    if (!doc) return
    openApprovalFor(doc)
  }, [documents, openApprovalFor])

  // Approve all pending documents
  const pendingDocs = documents.filter(doc => doc.status === 'pending')
  const handleApproveAll = useCallback(async () => {
    if (pendingDocs.length === 0) return

    try {
      for (const doc of pendingDocs) {
        await handleConfirmApproval()
      }

      showSuccess(
        `Approved ${pendingDocs.length} documents!`,
        'Your developer has been notified and will begin review within 24 hours.',
        {
          label: 'View activity',
          onClick: () => setShowInboxModal(true)
        }
      )
    } catch (error) {
      showError('Failed to approve documents', 'Please try approving them individually.')
    }
  }, [pendingDocs, handleConfirmApproval, showSuccess, showError, setShowInboxModal])

  // Start next iteration
  const handleStartNextIteration = useCallback((projectId: string | undefined) => {
    if (projectId) {
      setSelectedProjectId(projectId)
    }
    setShowAddForm(true)
    showInfo(
      'Starting next iteration',
      'Add your next requirements document to continue the development cycle.'
    )
  }, [setSelectedProjectId, setShowAddForm, showInfo])

  // Accept completed work
  const handleAcceptWork = useCallback(async (documentId: string) => {
    if (!user) return

    setAcceptingId(documentId)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/customers/documents/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ documentId })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to accept work')
      }

      setDocuments(prev => prev.map(doc =>
        doc.id === documentId ? { ...doc, status: 'accepted' as const } : doc
      ))

      showSuccess(
        'Work accepted!',
        'You\'ve successfully accepted this iteration. The work is now complete.',
        {
          label: 'Start next',
          onClick: () => {
            const doc = documents.find(d => d.id === documentId)
            if (doc?.projectId) {
              handleStartNextIteration(doc.projectId)
            }
          }
        }
      )
    } catch (err) {
      showError('Failed to accept work', err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setAcceptingId(null)
    }
  }, [user, setDocuments, showSuccess, showError, documents, handleStartNextIteration])

  // Delete document
  const handleDeleteDocument = useCallback(async (documentId: string) => {
    if (!user) return

    setDeletingId(documentId)
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/customers/documents/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ documentId })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete document')
      }

      setDocuments(prev => prev.filter(doc => doc.id !== documentId))

      showSuccess(
        'Document deleted',
        'The document and all related data have been permanently deleted.'
      )
    } catch (err) {
      showError('Failed to delete document', err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setDeletingId(null)
    }
  }, [user, setDocuments, showSuccess, showError])

  // Document mutations
  const {
    updateProject: handleUpdateDocumentProject,
    updatePriority: handleUpdateDocumentPriority
  } = useDocumentMutations({ setDocuments, setError })

  // Logout handler
  const handleLogout = async () => doLogout(router)

  // Pay now handler
  const handlePayNow = useCallback((project: Project) => openPayFor(project), [openPayFor])

  // Analytics
  const analytics = useCustomerAnalytics(projects, documents)

  // Filtered and sorted documents
  const filteredDocuments = useFilteredDocuments(documents, {
    documentSearch,
    documentStatusFilter,
    documentPriorityFilter,
    documentProjectFilter,
    documentSort
  })

  // Filtered and sorted projects
  const filteredProjects = useFilteredProjects(projects, {
    projectSearch: projectFilters.projectSearch,
    projectStatusFilter: projectFilters.projectStatusFilter,
    projectSort: projectFilters.projectSort
  })

  return {
    // Auth & Data
    user,
    customer,
    projects,
    documents,
    filteredDocuments,
    filteredProjects,
    analytics,

    // Loading States
    authLoading,
    loading,
    projectsLoading,

    // Error State
    error,
    setError,

    // UI State
    viewMode,
    setViewMode,
    expandedDocId,
    setExpandedDocId,
    expandedProjectIds,
    toggleProjectExpansion,

    // Modal State
    modals,
    setModals,

    // Selected Entities
    selectedEntities,
    setSelectedEntities,

    // Loading Actions
    loadingState,

    // Filters
    documentFilters,
    setDocumentFilters,
    projectFilters,
    setProjectFilters,

    // Add Document Form
    addDocumentForm,
    setAddDocumentForm,
    setShareUrl,
    setDocTitle,
    setDocNotes,
    setSelectedProjectId,
    setAddError,
    setEstimatedCostCents,
    setEstimateMarkup,
    closeAddForm: () => {
      setShowAddForm(false)
      setShareUrl('')
      setDocTitle('')
      setDocNotes('')
      setSelectedProjectId('')
      setEstimatedCostCents(0)
      setEstimateMarkup(3)
      setAddError(null)
    },
    isAdding,

    // Message State
    messageText,
    setMessageText,

    // Actions
    handleApprove,
    handleApproveAll,
    handleAcceptWork,
    handleDeleteDocument,
    handleStartNextIteration,
    handleUpdateDocumentProject,
    handleUpdateDocumentPriority,
    handleSendMessage,
    handleAddDocument,
    handleCreateProject,
    handlePayNow,
    handleLogout,

    // Modal Actions
    openCreateProject,
    openPayFor,
    openApprovalFor,
    handleConfirmApproval,
    approvalSource,

    // Toast Notifications
    toasts,
    removeToast,
    showSuccess,
    showError,
    showInfo,

    // Other
    setDocuments,
    createProject,
  }
}
