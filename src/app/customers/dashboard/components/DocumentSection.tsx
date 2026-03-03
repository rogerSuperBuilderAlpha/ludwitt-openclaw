'use client'

import React from 'react'
import { Project } from '@/lib/types/project'
import { CustomerDocument } from '@/lib/types/customer'
import { formatDate } from '@/lib/utils/timestamp'
import { getPriorityConfig } from '@/lib/customers/dashboard/ui'
import { AddDocumentForm } from '@/components/customers/dashboard/AddDocumentForm'
import { DocumentsFlatList } from '@/components/customers/dashboard/DocumentsFlatList'
import { DocumentsByProject } from '@/components/customers/dashboard/DocumentsByProject'
import { DocumentsToolbar } from '@/components/customers/dashboard/DocumentsToolbar'
import { ViewModeToggle } from '@/components/customers/dashboard/ViewModeToggle'
import {
  NoDocumentsYet,
  NoDocumentsFound,
} from '@/components/customers/dashboard/DocumentsEmptyStates'
import { ErrorAlert } from '@/components/common/ErrorAlert'
import { ViewMode, DocumentSort } from '../types'

interface DocumentSectionProps {
  // Data
  documents: CustomerDocument[]
  filteredDocuments: CustomerDocument[]
  projects: Project[]

  // View state
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void

  // Filters
  documentSearch: string
  setDocumentSearch: (search: string) => void
  documentSort: DocumentSort
  setDocumentSort: (sort: DocumentSort) => void
  documentStatusFilter: string
  setDocumentStatusFilter: (filter: string) => void
  documentPriorityFilter: string
  setDocumentPriorityFilter: (filter: string) => void
  documentProjectFilter: string
  setDocumentProjectFilter: (filter: string) => void

  // Add form state
  showAddForm: boolean
  setShowAddForm: (show: boolean) => void
  shareUrl: string
  setShareUrl: (url: string) => void
  docTitle: string
  setDocTitle: (title: string) => void
  docNotes: string
  setDocNotes: (notes: string) => void
  selectedProjectId: string
  setSelectedProjectId: (id: string) => void
  isAdding: boolean
  addError: string | null
  setAddError: (error: string | null) => void
  setEstimatedCostCents?: (cents: number) => void
  setEstimateMarkup?: (markup: number) => void
  handleAddDocument: (e: React.FormEvent) => Promise<void>
  openCreateProject: () => void

  // Document interactions
  expandedDocId: string | null
  setExpandedDocId: (id: string | null) => void
  expandedProjectIds: Set<string>
  toggleProjectExpansion: (id: string) => void

  // Document actions
  approvingId: string | null
  acceptingId: string | null
  deletingId: string | null
  sendingMessageId: string | null
  messageText: Record<string, string>
  setMessageText: React.Dispatch<React.SetStateAction<Record<string, string>>>
  handleApprove: (documentId: string) => void
  handleUpdateDocumentProject: (
    documentId: string,
    newProjectId: string
  ) => Promise<void>
  handleUpdateDocumentPriority: (
    documentId: string,
    newPriority: string
  ) => Promise<void>
  handleSendMessage: (documentId: string, text: string) => Promise<void>
  handleAcceptWork: (documentId: string) => Promise<void>
  handleStartNextIteration: (projectId: string | undefined) => void
  handleDeleteDocument: (documentId: string) => Promise<void>

  // Modals
  setSelectedDocForModal: (doc: CustomerDocument | null) => void
  setShowRequirementsModal: (show: boolean) => void
  setShowSessionsModal: (show: boolean) => void
  setDocumentForHistory: (doc: CustomerDocument | null) => void
  setShowHistoryModal: (show: boolean) => void

  // Error
  error: string | null
}

export default function DocumentSection(props: DocumentSectionProps) {
  const {
    documents,
    filteredDocuments,
    projects,
    viewMode,
    setViewMode,
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
    isAdding,
    addError,
    setAddError,
    setEstimatedCostCents,
    setEstimateMarkup,
    handleAddDocument,
    openCreateProject,
    expandedDocId,
    setExpandedDocId,
    expandedProjectIds,
    toggleProjectExpansion,
    approvingId,
    acceptingId,
    deletingId,
    sendingMessageId,
    messageText,
    setMessageText,
    handleApprove,
    handleUpdateDocumentProject,
    handleUpdateDocumentPriority,
    handleSendMessage,
    handleAcceptWork,
    handleStartNextIteration,
    handleDeleteDocument,
    setSelectedDocForModal,
    setShowRequirementsModal,
    setShowSessionsModal,
    setDocumentForHistory,
    setShowHistoryModal,
    error,
  } = props

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-medium text-gray-900">Requirements</h2>
          {projects.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-600">
                {projects.length} project{projects.length > 1 ? 's' : ''} •{' '}
                {documents.length} documents
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">
                  ~$100 per iteration
                </span>
              </div>
            </div>
          )}
        </div>
        <ViewModeToggle
          value={viewMode}
          onChange={(mode: ViewMode) => setViewMode(mode)}
        />
      </div>

      {documents.length > 0 && !showAddForm && (
        <DocumentsToolbar
          documentsCount={filteredDocuments.length}
          totalCount={documents.length}
          documentSearch={documentSearch}
          setDocumentSearch={setDocumentSearch}
          documentSort={documentSort}
          setDocumentSort={(sort: DocumentSort) => setDocumentSort(sort)}
          documentStatusFilter={documentStatusFilter}
          setDocumentStatusFilter={setDocumentStatusFilter}
          documentPriorityFilter={documentPriorityFilter}
          setDocumentPriorityFilter={setDocumentPriorityFilter}
          documentProjectFilter={documentProjectFilter}
          setDocumentProjectFilter={setDocumentProjectFilter}
          projects={projects}
        />
      )}

      {/* Add Document Form */}
      {showAddForm && (
        <AddDocumentForm
          shareUrl={shareUrl}
          docTitle={docTitle}
          docNotes={docNotes}
          selectedProjectId={selectedProjectId}
          isAdding={isAdding}
          addError={addError}
          projects={projects}
          onClose={() => {
            setShowAddForm(false)
            setShareUrl('')
            setDocTitle('')
            setDocNotes('')
            setAddError(null)
          }}
          onSubmit={handleAddDocument}
          setShareUrl={setShareUrl}
          setDocTitle={setDocTitle}
          setDocNotes={setDocNotes}
          setSelectedProjectId={setSelectedProjectId}
          setAddError={setAddError}
          setEstimatedCostCents={setEstimatedCostCents}
          setEstimateMarkup={setEstimateMarkup}
          onCreateFirstProject={() => {
            setShowAddForm(false)
            openCreateProject()
          }}
        />
      )}

      {/* Error Message */}
      {error && <ErrorAlert message={error} />}

      {/* Documents List */}
      {documents.length === 0 && !showAddForm ? (
        <NoDocumentsYet />
      ) : filteredDocuments.length === 0 ? (
        <NoDocumentsFound />
      ) : viewMode === 'projects' ? (
        <DocumentsByProject
          projects={projects}
          documents={filteredDocuments}
          formatDate={formatDate}
          approvingId={approvingId}
          expandedDocId={expandedDocId}
          expandedProjectIds={expandedProjectIds}
          getPriorityConfig={getPriorityConfig}
          toggleProjectExpansion={toggleProjectExpansion}
          setExpandedDocId={setExpandedDocId}
          handleApprove={handleApprove}
        />
      ) : (
        <DocumentsFlatList
          documents={filteredDocuments}
          projects={projects}
          formatDate={formatDate}
          approvingId={approvingId}
          expandedDocId={expandedDocId}
          messageText={messageText}
          sendingMessageId={sendingMessageId}
          archivingId={acceptingId}
          getPriorityConfig={getPriorityConfig}
          setExpandedDocId={setExpandedDocId}
          setMessageText={setMessageText}
          setSelectedDocForModal={setSelectedDocForModal}
          setShowRequirementsModal={setShowRequirementsModal}
          setShowSessionsModal={setShowSessionsModal}
          setDocumentForHistory={setDocumentForHistory}
          setShowHistoryModal={setShowHistoryModal}
          handleApprove={handleApprove}
          handleUpdateDocumentProject={handleUpdateDocumentProject}
          handleUpdateDocumentPriority={handleUpdateDocumentPriority}
          handleSendMessage={handleSendMessage}
          handleAcceptWork={handleAcceptWork}
          handleStartNextIteration={handleStartNextIteration}
          handleDeleteDocument={handleDeleteDocument}
          deletingId={deletingId}
        />
      )}
    </div>
  )
}
