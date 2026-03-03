'use client'

import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FolderOpen } from '@phosphor-icons/react'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { CreditsBadge } from '@/components/customers/dashboard/CreditsBadge'
import { ToastProvider } from '@/components/ui/Toast'
import { SidebarAnalytics } from '@/components/customers/dashboard/SidebarAnalytics'
import { SidebarHeader } from '@/components/customers/dashboard/SidebarHeader'
import { SidebarFooter } from '@/components/customers/dashboard/SidebarFooter'
import { TransactionHistory } from '@/components/customers/dashboard/TransactionHistory'
import { ProjectStatusCard } from '@/components/customers/dashboard/ProjectStatusCard'
import { ProjectProgressCards } from '@/components/customers/dashboard/ProjectProgressCards'
import { HeroAction } from '@/components/customers/dashboard/HeroAction'
import { SmartNudge } from '@/components/customers/dashboard/SmartNudge'
import { QuickSubmitForm } from '@/components/customers/dashboard/QuickSubmitForm'
import '@/components/customers/dashboard/animations.css'
import { useCustomerDashboard } from './hooks/useCustomerDashboard'
import DashboardHeader from './components/DashboardHeader'
import DocumentSection from './components/DocumentSection'
import CustomerModals from './components/CustomerModals'

export default function CustomerDashboardPage() {
  const router = useRouter()
  const [showQuickForm, setShowQuickForm] = useState(true)
  const dashboard = useCustomerDashboard({ setShowQuickForm })

  const {
    user,
    customer,
    projects,
    documents,
    filteredDocuments,
    filteredProjects,
    analytics,
    authLoading,
    loading,
    projectsLoading,
    error,
    setError,
    viewMode,
    setViewMode,
    expandedDocId,
    setExpandedDocId,
    expandedProjectIds,
    toggleProjectExpansion,
    modals,
    setModals,
    selectedEntities,
    setSelectedEntities,
    loadingState,
    documentFilters,
    setDocumentFilters,
    projectFilters,
    setProjectFilters,
    addDocumentForm,
    setAddDocumentForm,
    setShareUrl,
    setDocTitle,
    setDocNotes,
    setSelectedProjectId,
    setAddError,
    setEstimatedCostCents,
    setEstimateMarkup,
    closeAddForm,
    isAdding,
    messageText,
    setMessageText,
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
    openCreateProject,
    openPayFor,
    openApprovalFor,
    handleConfirmApproval,
    approvalSource,
    toasts,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    setDocuments,
    createProject,
  } = dashboard

  // Enhanced action handlers with notifications
  const handleAddDocumentWithNotification = useCallback(() => {
    setShareUrl('')
    setModals((prev) => ({ ...prev, showAddForm: true }))
    showInfo(
      'Pro tip',
      'Make sure your Google Doc is set to "Anyone with the link" can view.'
    )
  }, [setShareUrl, setModals, showInfo])

  const handleMessageDeveloper = useCallback(() => {
    setModals((prev) => ({ ...prev, showInboxModal: true }))
    showInfo(
      'Direct line to your developer',
      'Messages typically get responses within 4 hours during business days.'
    )
  }, [setModals, showInfo])

  const handleScheduleCall = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_BOOKING_URL || '', '_blank')
    showInfo(
      'Calendar opened',
      'Book a time that works for you - all meetings include screen sharing.'
    )
  }, [showInfo])

  const handleOnboardingComplete = () => {
    if (user) {
      localStorage.setItem(`onboarding-completed-${user.uid}`, 'true')
      showSuccess(
        'Welcome aboard!',
        'Your portal is ready. Your developer will be notified when you approve documents.',
        {
          label: 'Got it',
          onClick: () => {},
        }
      )
    }
  }

  const pendingDocs = documents.filter((doc) => doc.status === 'pending')

  if (authLoading || loading) {
    return <LoadingScreen />
  }

  // Show quick submit form first
  if (showQuickForm) {
    return (
      <ToastProvider>
        <QuickSubmitForm
          projects={projects}
          shareUrl={addDocumentForm.shareUrl}
          setShareUrl={setShareUrl}
          docTitle={addDocumentForm.docTitle}
          setDocTitle={setDocTitle}
          docNotes={addDocumentForm.docNotes}
          setDocNotes={setDocNotes}
          selectedProjectId={addDocumentForm.selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          setEstimatedCostCents={setEstimatedCostCents}
          setEstimateMarkup={setEstimateMarkup}
          isSubmitting={isAdding}
          onSubmit={handleAddDocument}
          onContinueToDashboard={() => setShowQuickForm(false)}
          onCreateProject={() => {
            setShowQuickForm(false)
            setModals((prev) => ({ ...prev, showProjectModal: true }))
          }}
          error={addDocumentForm.addError}
        />
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <main className="min-h-screen bg-gray-50/30">
        {/* Desktop Layout */}
        <div className="hidden md:flex min-h-screen">
          {/* Left Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
            <SidebarHeader
              title="Customer Portal"
              subtitle={customer?.displayName || customer?.email || ''}
            />
            <SidebarAnalytics
              analytics={analytics}
              onCreateCohort={() => router.push('/basics/cohorts?tab=create')}
            />

            {/* Project Status & Progress in Sidebar */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <ProjectStatusCard
                documents={documents}
                projects={projects}
                className="border-0 shadow-none bg-transparent"
                onViewPending={() =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentStatusFilter: 'pending',
                  }))
                }
                onViewInProgress={() =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentStatusFilter: 'in-progress',
                  }))
                }
                onViewCompleted={() =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentStatusFilter: 'completed',
                  }))
                }
              />

              {projects.length > 0 && (
                <ProjectProgressCards
                  projects={projects}
                  documents={documents}
                  onSelectProject={(projectId) =>
                    setDocumentFilters((prev) => ({
                      ...prev,
                      documentProjectFilter: projectId,
                    }))
                  }
                />
              )}

              {/* Transaction History */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <TransactionHistory limit={10} showFilters={false} compact />
              </div>
            </div>

            <SidebarFooter
              onOpenInbox={handleMessageDeveloper}
              onBookMeetingUrl={process.env.NEXT_PUBLIC_BOOKING_URL || ''}
              onLogout={handleLogout}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto p-8">
              {/* Hero Action - Context-aware primary CTA */}
              <HeroAction
                projects={projects}
                documents={documents}
                onCreateProject={() =>
                  setModals((prev) => ({ ...prev, showProjectModal: true }))
                }
                onAddDocument={handleAddDocumentWithNotification}
                onApproveAll={handleApproveAll}
                onViewInProgress={() =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentStatusFilter: 'in-progress',
                  }))
                }
                onAcceptWork={(docId) => {
                  const doc = documents.find((d) => d.id === docId)
                  if (doc) {
                    setExpandedDocId(docId)
                  }
                }}
                onStartNextIteration={() => handleAddDocumentWithNotification()}
              />

              {/* Smart Nudge - Contextual guidance */}
              {user && (
                <div className="mb-6">
                  <SmartNudge
                    userId={user.uid}
                    pendingCount={
                      documents.filter((d) => d.status === 'pending').length
                    }
                    inProgressCount={
                      documents.filter(
                        (d) =>
                          d.status === 'approved' || d.status === 'in-progress'
                      ).length
                    }
                    completedCount={
                      documents.filter((d) => d.status === 'completed').length
                    }
                    acceptedCount={
                      documents.filter((d) => d.status === 'accepted').length
                    }
                    totalDocs={documents.length}
                    totalProjects={projects.length}
                    onApproveAll={handleApproveAll}
                    onAddDocument={handleAddDocumentWithNotification}
                    onCreateProject={() =>
                      setModals((prev) => ({ ...prev, showProjectModal: true }))
                    }
                  />
                </div>
              )}

              {/* Secondary Actions */}
              <DashboardHeader
                projectsCount={projects.length}
                pendingDocsCount={pendingDocs.length}
                projects={projects}
                documents={documents}
                onOpenProjects={() =>
                  setModals((prev) => ({
                    ...prev,
                    showProjectsListModal: true,
                  }))
                }
                onOpenAddDocument={handleAddDocumentWithNotification}
                onCreateProject={() =>
                  setModals((prev) => ({ ...prev, showProjectModal: true }))
                }
                onApproveAll={handleApproveAll}
                onMessageDeveloper={handleMessageDeveloper}
                onScheduleCall={handleScheduleCall}
              />

              {/* Documents Section */}
              <DocumentSection
                documents={documents}
                filteredDocuments={filteredDocuments}
                projects={projects}
                viewMode={viewMode}
                setViewMode={setViewMode}
                documentSearch={documentFilters.documentSearch}
                setDocumentSearch={(search) =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentSearch: search,
                  }))
                }
                documentSort={documentFilters.documentSort}
                setDocumentSort={(sort) =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentSort: sort,
                  }))
                }
                documentStatusFilter={documentFilters.documentStatusFilter}
                setDocumentStatusFilter={(filter) =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentStatusFilter: filter,
                  }))
                }
                documentPriorityFilter={documentFilters.documentPriorityFilter}
                setDocumentPriorityFilter={(filter) =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentPriorityFilter: filter,
                  }))
                }
                documentProjectFilter={documentFilters.documentProjectFilter}
                setDocumentProjectFilter={(filter) =>
                  setDocumentFilters((prev) => ({
                    ...prev,
                    documentProjectFilter: filter,
                  }))
                }
                showAddForm={modals.showAddForm}
                setShowAddForm={(show) =>
                  setModals((prev) => ({ ...prev, showAddForm: show }))
                }
                shareUrl={addDocumentForm.shareUrl}
                setShareUrl={setShareUrl}
                docTitle={addDocumentForm.docTitle}
                setDocTitle={setDocTitle}
                docNotes={addDocumentForm.docNotes}
                setDocNotes={setDocNotes}
                selectedProjectId={addDocumentForm.selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
                isAdding={isAdding}
                addError={addDocumentForm.addError}
                setAddError={setAddError}
                setEstimatedCostCents={setEstimatedCostCents}
                setEstimateMarkup={setEstimateMarkup}
                handleAddDocument={handleAddDocument}
                openCreateProject={openCreateProject}
                expandedDocId={expandedDocId}
                setExpandedDocId={setExpandedDocId}
                expandedProjectIds={expandedProjectIds}
                toggleProjectExpansion={toggleProjectExpansion}
                approvingId={loadingState.approvingId}
                acceptingId={loadingState.acceptingId}
                deletingId={loadingState.deletingId}
                sendingMessageId={loadingState.sendingMessageId}
                messageText={messageText}
                setMessageText={setMessageText}
                handleApprove={handleApprove}
                handleUpdateDocumentProject={handleUpdateDocumentProject}
                handleUpdateDocumentPriority={handleUpdateDocumentPriority}
                handleSendMessage={handleSendMessage}
                handleAcceptWork={handleAcceptWork}
                handleStartNextIteration={handleStartNextIteration}
                handleDeleteDocument={handleDeleteDocument}
                setSelectedDocForModal={(doc) =>
                  setSelectedEntities((prev) => ({
                    ...prev,
                    selectedDocForModal: doc,
                  }))
                }
                setShowRequirementsModal={(show) =>
                  setModals((prev) => ({
                    ...prev,
                    showRequirementsModal: show,
                  }))
                }
                setShowSessionsModal={(show) =>
                  setModals((prev) => ({ ...prev, showSessionsModal: show }))
                }
                setDocumentForHistory={(doc) =>
                  setSelectedEntities((prev) => ({
                    ...prev,
                    documentForHistory: doc,
                  }))
                }
                setShowHistoryModal={(show) =>
                  setModals((prev) => ({ ...prev, showHistoryModal: show }))
                }
                error={error}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden min-h-screen pb-24">
          {/* Mobile Header with Status */}
          <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  Your Projects
                </h1>
                <p className="text-xs text-gray-500">
                  {customer?.displayName || customer?.email || ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Compact Credits Badge for Mobile */}
                <CreditsBadge compact />
                <button
                  onClick={handleMessageDeveloper}
                  className="p-2.5 bg-purple-50 rounded-xl text-purple-600 active:bg-purple-100 touch-manipulation"
                  aria-label="Message developer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setModals((prev) => ({
                      ...prev,
                      showProjectsListModal: true,
                    }))
                  }
                  className="p-2.5 bg-gray-100 rounded-xl text-gray-600 active:bg-gray-200 touch-manipulation"
                  aria-label="View projects"
                >
                  <FolderOpen className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Status Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {pendingDocs.length > 0 && (
                <button
                  onClick={() =>
                    setDocumentFilters((prev) => ({
                      ...prev,
                      documentStatusFilter: 'pending',
                    }))
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium whitespace-nowrap active:bg-amber-200 touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  {pendingDocs.length} needs approval
                </button>
              )}
              {documents.filter(
                (d) => d.status === 'approved' || d.status === 'in-progress'
              ).length > 0 && (
                <button
                  onClick={() =>
                    setDocumentFilters((prev) => ({
                      ...prev,
                      documentStatusFilter: 'in-progress',
                    }))
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium whitespace-nowrap active:bg-purple-200 touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                  {
                    documents.filter(
                      (d) =>
                        d.status === 'approved' || d.status === 'in-progress'
                    ).length
                  }{' '}
                  in progress
                </button>
              )}
              {documents.filter((d) => d.status === 'completed').length > 0 && (
                <button
                  onClick={() =>
                    setDocumentFilters((prev) => ({
                      ...prev,
                      documentStatusFilter: 'completed',
                    }))
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium whitespace-nowrap active:bg-green-200 touch-manipulation"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  {documents.filter((d) => d.status === 'completed').length} to
                  review
                </button>
              )}
              {documents.filter((d) => d.status === 'accepted').length > 0 && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap">
                  ✓ {documents.filter((d) => d.status === 'accepted').length}{' '}
                  done
                </span>
              )}
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-4">
            {/* Mobile Documents Section */}
            <DocumentSection
              documents={documents}
              filteredDocuments={filteredDocuments}
              projects={projects}
              viewMode={viewMode}
              setViewMode={setViewMode}
              documentSearch={documentFilters.documentSearch}
              setDocumentSearch={(search) =>
                setDocumentFilters((prev) => ({
                  ...prev,
                  documentSearch: search,
                }))
              }
              documentSort={documentFilters.documentSort}
              setDocumentSort={(sort) =>
                setDocumentFilters((prev) => ({ ...prev, documentSort: sort }))
              }
              documentStatusFilter={documentFilters.documentStatusFilter}
              setDocumentStatusFilter={(filter) =>
                setDocumentFilters((prev) => ({
                  ...prev,
                  documentStatusFilter: filter,
                }))
              }
              documentPriorityFilter={documentFilters.documentPriorityFilter}
              setDocumentPriorityFilter={(filter) =>
                setDocumentFilters((prev) => ({
                  ...prev,
                  documentPriorityFilter: filter,
                }))
              }
              documentProjectFilter={documentFilters.documentProjectFilter}
              setDocumentProjectFilter={(filter) =>
                setDocumentFilters((prev) => ({
                  ...prev,
                  documentProjectFilter: filter,
                }))
              }
              showAddForm={modals.showAddForm}
              setShowAddForm={(show) =>
                setModals((prev) => ({ ...prev, showAddForm: show }))
              }
              shareUrl={addDocumentForm.shareUrl}
              setShareUrl={setShareUrl}
              docTitle={addDocumentForm.docTitle}
              setDocTitle={setDocTitle}
              docNotes={addDocumentForm.docNotes}
              setDocNotes={setDocNotes}
              selectedProjectId={addDocumentForm.selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
              isAdding={isAdding}
              addError={addDocumentForm.addError}
              setAddError={setAddError}
              setEstimatedCostCents={setEstimatedCostCents}
              setEstimateMarkup={setEstimateMarkup}
              handleAddDocument={handleAddDocument}
              openCreateProject={openCreateProject}
              expandedDocId={expandedDocId}
              setExpandedDocId={setExpandedDocId}
              expandedProjectIds={expandedProjectIds}
              toggleProjectExpansion={toggleProjectExpansion}
              approvingId={loadingState.approvingId}
              acceptingId={loadingState.acceptingId}
              deletingId={loadingState.deletingId}
              sendingMessageId={loadingState.sendingMessageId}
              messageText={messageText}
              setMessageText={setMessageText}
              handleApprove={handleApprove}
              handleUpdateDocumentProject={handleUpdateDocumentProject}
              handleUpdateDocumentPriority={handleUpdateDocumentPriority}
              handleSendMessage={handleSendMessage}
              handleAcceptWork={handleAcceptWork}
              handleStartNextIteration={handleStartNextIteration}
              handleDeleteDocument={handleDeleteDocument}
              setSelectedDocForModal={(doc) =>
                setSelectedEntities((prev) => ({
                  ...prev,
                  selectedDocForModal: doc,
                }))
              }
              setShowRequirementsModal={(show) =>
                setModals((prev) => ({ ...prev, showRequirementsModal: show }))
              }
              setShowSessionsModal={(show) =>
                setModals((prev) => ({ ...prev, showSessionsModal: show }))
              }
              setDocumentForHistory={(doc) =>
                setSelectedEntities((prev) => ({
                  ...prev,
                  documentForHistory: doc,
                }))
              }
              setShowHistoryModal={(show) =>
                setModals((prev) => ({ ...prev, showHistoryModal: show }))
              }
              error={error}
            />
          </div>

          {/* Mobile Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={handleAddDocumentWithNotification}
              className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center active:bg-blue-700 active:scale-95 transition-all touch-manipulation"
              aria-label="Add document"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modals */}
        <CustomerModals
          showOnboarding={modals.showOnboarding}
          setShowOnboarding={(show) =>
            setModals((prev) => ({ ...prev, showOnboarding: show }))
          }
          onOnboardingComplete={handleOnboardingComplete}
          onAddDocument={handleAddDocumentWithNotification}
          onCreateProject={openCreateProject}
          showProjectsListModal={modals.showProjectsListModal}
          setShowProjectsListModal={(show) =>
            setModals((prev) => ({ ...prev, showProjectsListModal: show }))
          }
          projects={projects}
          projectsLoading={projectsLoading}
          projectSearch={projectFilters.projectSearch}
          setProjectSearch={(search) =>
            setProjectFilters((prev) => ({ ...prev, projectSearch: search }))
          }
          projectSort={projectFilters.projectSort}
          setProjectSort={(sort) =>
            setProjectFilters((prev) => ({ ...prev, projectSort: sort }))
          }
          projectStatusFilter={projectFilters.projectStatusFilter}
          setProjectStatusFilter={(filter) =>
            setProjectFilters((prev) => ({
              ...prev,
              projectStatusFilter: filter,
            }))
          }
          filteredProjects={filteredProjects}
          showProjectModal={modals.showProjectModal}
          setShowProjectModal={(show) =>
            setModals((prev) => ({ ...prev, showProjectModal: show }))
          }
          handleCreateProject={handleCreateProject}
          selectedProject={selectedEntities.selectedProject}
          setSelectedProject={(project) =>
            setSelectedEntities((prev) => ({
              ...prev,
              selectedProject: project,
            }))
          }
          selectedDocForModal={selectedEntities.selectedDocForModal}
          documentForHistory={selectedEntities.documentForHistory}
          setDocumentForHistory={(doc) =>
            setSelectedEntities((prev) => ({
              ...prev,
              documentForHistory: doc,
            }))
          }
          documentToApprove={selectedEntities.documentToApprove}
          setDocumentToApprove={(doc) =>
            setSelectedEntities((prev) => ({ ...prev, documentToApprove: doc }))
          }
          paymentProject={selectedEntities.paymentProject}
          setPaymentProject={(project) =>
            setSelectedEntities((prev) => ({
              ...prev,
              paymentProject: project,
            }))
          }
          showPaymentModal={modals.showPaymentModal}
          setShowPaymentModal={(show) =>
            setModals((prev) => ({ ...prev, showPaymentModal: show }))
          }
          handlePayNow={handlePayNow}
          showInboxModal={modals.showInboxModal}
          setShowInboxModal={(show) =>
            setModals((prev) => ({ ...prev, showInboxModal: show }))
          }
          showRequirementsModal={modals.showRequirementsModal}
          setShowRequirementsModal={(show) =>
            setModals((prev) => ({ ...prev, showRequirementsModal: show }))
          }
          showSessionsModal={modals.showSessionsModal}
          setShowSessionsModal={(show) =>
            setModals((prev) => ({ ...prev, showSessionsModal: show }))
          }
          showHistoryModal={modals.showHistoryModal}
          setShowHistoryModal={(show) =>
            setModals((prev) => ({ ...prev, showHistoryModal: show }))
          }
          showApprovalModal={modals.showApprovalModal}
          setShowApprovalModal={(show) =>
            setModals((prev) => ({ ...prev, showApprovalModal: show }))
          }
          handleConfirmApproval={handleConfirmApproval}
          approvalSource={approvalSource}
          toasts={toasts}
          removeToast={removeToast}
        />
      </main>
    </ToastProvider>
  )
}
