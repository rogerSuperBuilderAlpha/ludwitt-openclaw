import { useCallback, useState } from 'react'
import { Project } from '@/lib/types/project'
import { CustomerDocument } from '@/lib/types/customer'
import { ViewMode, CreateProjectData } from '@/app/customers/dashboard/types'

type CreateProjectFn = (projectData: CreateProjectData) => Promise<Project>

export function useCustomerDashboardUI(params?: { createProject?: CreateProjectFn }) {
  const createProject = params?.createProject

  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('flat')

  // Projects list modal
  const [showProjectsListModal, setShowProjectsListModal] = useState(false)

  // Project create modal
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentProject, setPaymentProject] = useState<Project | null>(null)

  // Inbox modal
  const [showInboxModal, setShowInboxModal] = useState(false)

  // Developer work modals
  const [showRequirementsModal, setShowRequirementsModal] = useState(false)
  const [showSessionsModal, setShowSessionsModal] = useState(false)
  const [selectedDocForModal, setSelectedDocForModal] = useState<CustomerDocument | null>(null)

  // History modal
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [documentForHistory, setDocumentForHistory] = useState<CustomerDocument | null>(null)

  // Expanded doc state
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null)

  // UI helpers
  const openCreateProject = useCallback(() => setShowProjectModal(true), [])

  const openPayFor = useCallback((project: Project) => {
    setPaymentProject(project)
    setShowPaymentModal(true)
  }, [])

  const handleCreateProject = useCallback(async (projectData: CreateProjectData) => {
    if (!createProject) return
    await createProject(projectData)
    setShowProjectModal(false)
  }, [createProject])

  return {
    // view
    viewMode,
    setViewMode,
    // lists/projects
    showProjectsListModal,
    setShowProjectsListModal,
    showProjectModal,
    setShowProjectModal,
    selectedProject,
    setSelectedProject,
    // payments
    showPaymentModal,
    setShowPaymentModal,
    paymentProject,
    setPaymentProject,
    // inbox
    showInboxModal,
    setShowInboxModal,
    // dev work
    showRequirementsModal,
    setShowRequirementsModal,
    showSessionsModal,
    setShowSessionsModal,
    selectedDocForModal,
    setSelectedDocForModal,
    // history
    showHistoryModal,
    setShowHistoryModal,
    documentForHistory,
    setDocumentForHistory,
    // expanded doc
    expandedDocId,
    setExpandedDocId,
    // helpers
    openCreateProject,
    openPayFor,
    handleCreateProject,
  }
}


