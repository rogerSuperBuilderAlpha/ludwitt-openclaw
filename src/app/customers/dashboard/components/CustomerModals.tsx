'use client'

import React from 'react'
import { Project } from '@/lib/types/project'
import { CustomerDocument } from '@/lib/types/customer'
import { DashboardModals } from '@/components/customers/dashboard/DashboardModals'
import { OnboardingWizard } from '@/components/customers/dashboard/OnboardingWizard'
import { ConfirmationToast } from '@/components/customers/dashboard/ConfirmationToast'
import { formatDate } from '@/lib/utils/timestamp'
import { getPaymentStatusColor } from '@/lib/customers/dashboard/ui'
import { getProjectTitleById } from '@/lib/customers/dashboard/utils'
import { ProjectSort, Toast, CreateProjectData } from '../types'

interface CustomerModalsProps {
  // Onboarding
  showOnboarding: boolean
  setShowOnboarding: (show: boolean) => void
  onOnboardingComplete: () => void
  onAddDocument: () => void
  onCreateProject: () => void

  // Projects List Modal
  showProjectsListModal: boolean
  setShowProjectsListModal: (show: boolean) => void
  projects: Project[]
  projectsLoading: boolean
  projectSearch: string
  setProjectSearch: (search: string) => void
  projectSort: ProjectSort
  setProjectSort: (sort: ProjectSort) => void
  projectStatusFilter: string
  setProjectStatusFilter: (filter: string) => void
  filteredProjects: Project[]

  // Project Modal
  showProjectModal: boolean
  setShowProjectModal: (show: boolean) => void
  handleCreateProject: (data: CreateProjectData) => Promise<void>

  // Selected entities
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  selectedDocForModal: CustomerDocument | null
  documentForHistory: CustomerDocument | null
  setDocumentForHistory: (doc: CustomerDocument | null) => void
  documentToApprove: CustomerDocument | null
  setDocumentToApprove: (doc: CustomerDocument | null) => void
  paymentProject: Project | null
  setPaymentProject: (project: Project | null) => void

  // Payment Modal
  showPaymentModal: boolean
  setShowPaymentModal: (show: boolean) => void
  handlePayNow: (project: Project) => void

  // Inbox Modal
  showInboxModal: boolean
  setShowInboxModal: (show: boolean) => void

  // Requirements Modal
  showRequirementsModal: boolean
  setShowRequirementsModal: (show: boolean) => void

  // Sessions Modal
  showSessionsModal: boolean
  setShowSessionsModal: (show: boolean) => void

  // History Modal
  showHistoryModal: boolean
  setShowHistoryModal: (show: boolean) => void

  // Approval Modal
  showApprovalModal: boolean
  setShowApprovalModal: (show: boolean) => void
  handleConfirmApproval: () => Promise<void>
  approvalSource?: 'after_add' | 'existing'

  // Toasts
  toasts: Toast[]
  removeToast: (id: string) => void
}

export default function CustomerModals(props: CustomerModalsProps) {
  const {
    showOnboarding,
    setShowOnboarding,
    onOnboardingComplete,
    onAddDocument,
    onCreateProject,
    showProjectsListModal,
    setShowProjectsListModal,
    projects,
    projectsLoading,
    projectSearch,
    setProjectSearch,
    projectSort,
    setProjectSort,
    projectStatusFilter,
    setProjectStatusFilter,
    filteredProjects,
    showProjectModal,
    setShowProjectModal,
    handleCreateProject,
    selectedProject,
    setSelectedProject,
    selectedDocForModal,
    documentForHistory,
    setDocumentForHistory,
    documentToApprove,
    setDocumentToApprove,
    paymentProject,
    setPaymentProject,
    showPaymentModal,
    setShowPaymentModal,
    handlePayNow,
    showInboxModal,
    setShowInboxModal,
    showRequirementsModal,
    setShowRequirementsModal,
    showSessionsModal,
    setShowSessionsModal,
    showHistoryModal,
    setShowHistoryModal,
    showApprovalModal,
    setShowApprovalModal,
    handleConfirmApproval,
    approvalSource,
    toasts,
    removeToast,
  } = props

  return (
    <>
      {/* Onboarding Wizard */}
      <OnboardingWizard
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={onOnboardingComplete}
        onAddDocument={onAddDocument}
        onCreateProject={onCreateProject}
      />

      {/* Toast Notifications */}
      <ConfirmationToast toasts={toasts} onRemove={removeToast} />

      {/* Dashboard Modals */}
      <DashboardModals
        showProjectsListModal={showProjectsListModal}
        setShowProjectsListModal={setShowProjectsListModal}
        projects={projects}
        projectsLoading={projectsLoading}
        projectSearch={projectSearch}
        setProjectSearch={setProjectSearch}
        projectSort={projectSort}
        setProjectSort={setProjectSort}
        projectStatusFilter={projectStatusFilter}
        setProjectStatusFilter={setProjectStatusFilter}
        filteredProjects={filteredProjects}
        getPaymentStatusColor={getPaymentStatusColor}
        handlePayNow={handlePayNow}
        setSelectedProject={setSelectedProject}
        setShowProjectModal={setShowProjectModal}
        showInboxModal={showInboxModal}
        setShowInboxModal={setShowInboxModal}
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        paymentProject={paymentProject}
        setPaymentProject={setPaymentProject}
        showApprovalModal={showApprovalModal}
        setShowApprovalModal={setShowApprovalModal}
        documentToApprove={documentToApprove}
        setDocumentToApprove={setDocumentToApprove}
        handleConfirmApproval={handleConfirmApproval}
        approvalSource={approvalSource}
        projectsByIdTitle={(id?: string) => getProjectTitleById(projects, id)}
        showHistoryModal={showHistoryModal}
        setShowHistoryModal={setShowHistoryModal}
        documentForHistory={documentForHistory}
        setDocumentForHistory={setDocumentForHistory}
        showRequirementsModal={showRequirementsModal}
        setShowRequirementsModal={setShowRequirementsModal}
        showSessionsModal={showSessionsModal}
        setShowSessionsModal={setShowSessionsModal}
        selectedDocForModal={selectedDocForModal}
        formatDate={formatDate}
        showProjectModal={showProjectModal}
        onCreateProject={handleCreateProject}
      />
    </>
  )
}
