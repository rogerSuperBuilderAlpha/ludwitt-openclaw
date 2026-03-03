import { useMemo } from 'react'
import type { DateFormatter } from '@/lib/types/common'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { BudgetTracker } from '@/components/customers/BudgetTracker'
import { calculateBudgetMetrics } from '@/lib/utils/budget'
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  MessageSquare,
  Send,
  Clock,
  History,
  CheckCircle,
  ThumbsUp,
  Plus,
  Trash2,
} from 'lucide-react'
import { PriorityConfig } from '@/lib/customers/dashboard/ui'
import { DocumentKanbanProgress } from './DocumentKanbanProgress'

type DocumentsFlatListProps = {
  documents: CustomerDocument[]
  projects: Project[]
  formatDate: DateFormatter
  approvingId: string | null
  expandedDocId: string | null
  messageText: Record<string, string>
  sendingMessageId: string | null
  archivingId?: string | null
  getPriorityConfig: (priority?: string) => PriorityConfig | null
  setExpandedDocId: (v: string | null) => void
  setMessageText: (
    updater: (prev: Record<string, string>) => Record<string, string>
  ) => void
  setSelectedDocForModal: (doc: CustomerDocument | null) => void
  setShowRequirementsModal: (v: boolean) => void
  setShowSessionsModal: (v: boolean) => void
  setDocumentForHistory: (doc: CustomerDocument | null) => void
  setShowHistoryModal: (v: boolean) => void
  handleApprove: (documentId: string) => void
  handleUpdateDocumentProject: (
    documentId: string,
    projectId: string
  ) => void | Promise<void>
  handleUpdateDocumentPriority: (
    documentId: string,
    priority: string
  ) => void | Promise<void>
  handleSendMessage: (
    documentId: string,
    customerId: string
  ) => void | Promise<void>
  handleAcceptWork?: (documentId: string) => void | Promise<void>
  handleStartNextIteration?: (projectId: string | undefined) => void
  handleDeleteDocument?: (documentId: string) => void | Promise<void>
  deletingId?: string | null
}

export function DocumentsFlatList(props: DocumentsFlatListProps) {
  const {
    documents,
    projects,
    formatDate,
    approvingId,
    expandedDocId,
    messageText,
    sendingMessageId,
    archivingId,
    getPriorityConfig,
    setExpandedDocId,
    setMessageText,
    setSelectedDocForModal,
    setShowRequirementsModal,
    setShowSessionsModal,
    setDocumentForHistory,
    setShowHistoryModal,
    handleApprove,
    handleUpdateDocumentProject,
    handleUpdateDocumentPriority,
    handleSendMessage,
    handleAcceptWork,
    handleStartNextIteration,
    handleDeleteDocument,
    deletingId,
  } = props

  const projectsById = useMemo(
    () => new Map(projects.map((p) => [p.id, p])),
    [projects]
  )

  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const isExpanded = expandedDocId === doc.id
        const projectName = doc.projectId
          ? projectsById.get(doc.projectId)?.title || 'Unknown Project'
          : 'No Project'

        return (
          <div
            key={doc.id}
            className={`bg-white rounded-lg border overflow-hidden transition-all ${
              doc.status === 'pending' || doc.status === 'completed'
                ? 'border-amber-300 shadow-sm shadow-amber-100'
                : 'border-gray-200'
            }`}
          >
            <div
              role="button"
              tabIndex={-1}
              onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  setExpandedDocId(isExpanded ? null : doc.id)
              }}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                doc.status === 'pending' || doc.status === 'completed'
                  ? 'bg-gradient-to-r from-amber-50/50 to-transparent hover:from-amber-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Action Needed Badge */}
              {(doc.status === 'pending' || doc.status === 'completed') && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                    Action
                  </span>
                </div>
              )}

              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate mb-2">
                  {doc.googleDocTitle}
                </h3>
                <div className="max-w-xs">
                  <DocumentKanbanProgress
                    status={doc.status}
                    size="sm"
                    showTooltips={false}
                  />
                </div>
              </div>
              {doc.priority && (
                <div className="flex-shrink-0">
                  {(() => {
                    const priorityConfig = getPriorityConfig(doc.priority)
                    return priorityConfig ? (
                      <span
                        className={`px-2 py-1 ${priorityConfig.bg} ${priorityConfig.text} text-xs font-medium rounded border ${priorityConfig.border}`}
                      >
                        {priorityConfig.label}
                      </span>
                    ) : null
                  })()}
                </div>
              )}
              <div className="flex-shrink-0">
                {doc.status === 'pending' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApprove(doc.id)
                    }}
                    disabled={approvingId === doc.id}
                    className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {approvingId === doc.id ? 'Approving...' : '✓ Approve'}
                  </button>
                ) : doc.status === 'completed' ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (handleAcceptWork) handleAcceptWork(doc.id)
                    }}
                    disabled={archivingId === doc.id}
                    className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {archivingId === doc.id ? 'Accepting...' : '✓ Accept'}
                  </button>
                ) : doc.status === 'approved' || doc.status === 'accepted' ? (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      doc.status === 'accepted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {doc.status === 'accepted' ? '✓ Complete' : 'Approved'}
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                    In Progress
                  </span>
                )}
              </div>
              <div className="flex-shrink-0 hidden md:block">
                <span className="text-sm text-gray-600">{projectName}</span>
              </div>
              <div className="flex-shrink-0 hidden sm:block">
                <span className="text-sm text-gray-500">
                  {formatDate(doc.addedAt)}
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-200 p-6">
                {/* Kanban Progress */}
                <div className="mb-6 bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
                  <h5 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Workflow Progress
                  </h5>
                  <DocumentKanbanProgress status={doc.status} size="md" />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Added: {formatDate(doc.addedAt)}
                  </p>
                  {doc.notes && (
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-700 block mb-1">
                        Notes:
                      </span>
                      <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                        {doc.notes}
                      </p>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-4 flex-wrap">
                    <div>
                      <label
                        htmlFor={`project-${doc.id}`}
                        className="text-xs font-medium text-gray-700 mr-2"
                      >
                        Project:
                      </label>
                      <select
                        id={`project-${doc.id}`}
                        value={doc.projectId || ''}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleUpdateDocumentProject(doc.id, e.target.value)
                        }}
                        className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">No project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`priority-${doc.id}`}
                        className="text-xs font-medium text-gray-700 mr-2"
                      >
                        Priority:
                      </label>
                      <select
                        id={`priority-${doc.id}`}
                        value={doc.priority || ''}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleUpdateDocumentPriority(doc.id, e.target.value)
                        }}
                        className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">None</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>

                {(doc.status === 'approved' ||
                  doc.status === 'completed' ||
                  doc.status === 'in-progress') &&
                  doc.progressPercentage !== undefined && (
                    <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">
                        Development Progress
                      </h5>
                      <ProgressBar
                        percentage={doc.progressPercentage}
                        size="lg"
                        showLabel={true}
                      />
                      {doc.progressNote && (
                        <p className="text-sm text-gray-700 mt-2 italic">
                          &ldquo;{doc.progressNote}&rdquo;
                        </p>
                      )}
                      {doc.progressUpdatedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Last updated: {formatDate(doc.progressUpdatedAt)}
                        </p>
                      )}
                    </div>
                  )}

                {(doc.status === 'approved' ||
                  doc.status === 'completed' ||
                  doc.status === 'in-progress') &&
                  doc.budgetType && (
                    <div className="mb-4">
                      <BudgetTracker
                        metrics={calculateBudgetMetrics(
                          doc,
                          doc.sessions || []
                        )}
                        showDetails={true}
                      />
                    </div>
                  )}

                <div className="flex gap-3 mb-4 flex-wrap">
                  <a
                    href={doc.googleDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Document
                  </a>
                  {doc.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApprove(doc.id)
                      }}
                      disabled={approvingId === doc.id}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {approvingId === doc.id
                        ? 'Notifying...'
                        : 'Notify Developer'}
                    </button>
                  )}
                  {handleDeleteDocument && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (
                          window.confirm(
                            `Are you sure you want to delete "${doc.googleDocTitle}"? This action cannot be undone.`
                          )
                        ) {
                          handleDeleteDocument(doc.id)
                        }
                      }}
                      disabled={deletingId === doc.id}
                      className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === doc.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Customer Acceptance Section */}
                {doc.status === 'completed' && (
                  <div className="border-t pt-4 mt-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            Work Complete - Review & Accept
                          </h4>
                          <p className="text-sm text-gray-700 mb-4">
                            The developer has finished this iteration. Review
                            the work below and accept it to mark this iteration
                            as complete.
                          </p>
                          <div className="flex gap-3 flex-wrap">
                            {handleAcceptWork && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAcceptWork(doc.id)
                                }}
                                disabled={archivingId === doc.id}
                                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                              >
                                {archivingId === doc.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Accepting...</span>
                                  </>
                                ) : (
                                  <>
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Accept Work</span>
                                  </>
                                )}
                              </button>
                            )}
                            {handleStartNextIteration && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStartNextIteration(doc.projectId)
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Start Next Iteration</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(doc.status === 'approved' || doc.status === 'completed') && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      Developer Work
                    </h4>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDocForModal(doc)
                          setShowRequirementsModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">
                          Requirements ({doc.requirements?.length || 0})
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDocForModal(doc)
                          setShowSessionsModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          Work Sessions ({doc.sessions?.length || 0})
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDocumentForHistory(doc)
                          setShowHistoryModal(true)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <History className="w-4 h-4" />
                        <span className="font-medium">History</span>
                      </button>
                    </div>
                  </div>
                )}

                {(doc.status === 'approved' || doc.status === 'completed') && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      <span>Messages with Developer</span>
                    </h4>
                    <div className="mb-4 max-h-64 overflow-y-auto space-y-2">
                      {doc.communications && doc.communications.length > 0 ? (
                        doc.communications.map((comm: any) => (
                          <div
                            key={comm.id}
                            className={`p-3 rounded-lg ${comm.sentByRole === 'customer' ? 'bg-blue-50 ml-8' : 'bg-gray-100 mr-8'}`}
                          >
                            <p className="text-sm text-gray-900 mb-1">
                              {comm.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {comm.sentByRole === 'customer'
                                ? 'You'
                                : comm.sentBy}{' '}
                              • {formatDate(comm.sentAt)}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic py-4 text-center">
                          No messages yet. Start the conversation!
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <textarea
                        value={messageText[doc.id] || ''}
                        onChange={(e) => {
                          e.stopPropagation()
                          setMessageText((prev) => ({
                            ...prev,
                            [doc.id]: e.target.value,
                          }))
                        }}
                        placeholder="Type your message to the developer..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex items-start justify-between mt-3 gap-3">
                        <p className="text-xs text-amber-600 flex-1">
                          ⚠️ The developer will receive an email notification.
                          Please send complete messages one at a time.
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSendMessage(doc.id, doc.customerId)
                          }}
                          disabled={
                            sendingMessageId === doc.id ||
                            !messageText[doc.id]?.trim()
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium whitespace-nowrap"
                        >
                          {sendingMessageId === doc.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
