import { useMemo } from 'react'
import { CustomerDocument } from '@/lib/types/customer'
import { Project } from '@/lib/types/project'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { MessageThread } from '@/components/messages/MessageThread'
import { ChevronDown, ChevronRight, ExternalLink, FileText } from 'lucide-react'
import { PriorityConfig } from '@/lib/customers/dashboard/ui'
import type { DateFormatter } from '@/lib/types/common'

type DocumentsByProjectProps = {
  projects: Project[]
  documents: CustomerDocument[]
  formatDate: DateFormatter
  approvingId: string | null
  expandedDocId: string | null
  expandedProjectIds: Set<string>
  getPriorityConfig: (priority?: string) => PriorityConfig | null
  toggleProjectExpansion: (projectId: string) => void
  setExpandedDocId: (v: string | null) => void
  handleApprove: (documentId: string) => void
}

export function DocumentsByProject(props: DocumentsByProjectProps) {
  const {
    projects,
    documents,
    formatDate,
    approvingId,
    expandedDocId,
    expandedProjectIds,
    getPriorityConfig,
    toggleProjectExpansion,
    setExpandedDocId,
    handleApprove,
  } = props

  const documentsByProject = useMemo(() => {
    const grouped: { [projectId: string]: CustomerDocument[] } = {}
    const unassigned: CustomerDocument[] = []
    documents.forEach((doc) => {
      if (doc.projectId) {
        if (!grouped[doc.projectId]) grouped[doc.projectId] = []
        grouped[doc.projectId].push(doc)
      } else {
        unassigned.push(doc)
      }
    })
    return { grouped, unassigned }
  }, [documents])

  const getProjectMetrics = (projectId: string) => {
    const projectDocs = documentsByProject.grouped[projectId] || []
    const totalDocs = projectDocs.length
    const completedDocs = projectDocs.filter(
      (d) => d.status === 'completed'
    ).length
    const docsWithProgress = projectDocs.filter(
      (d) => d.progressPercentage !== undefined
    )
    const avgProgress =
      docsWithProgress.length > 0
        ? Math.round(
            docsWithProgress.reduce(
              (sum, d) => sum + (d.progressPercentage || 0),
              0
            ) / docsWithProgress.length
          )
        : 0
    return { totalDocs, completedDocs, avgProgress }
  }

  return (
    <div className="space-y-4">
      {projects
        .filter((project) => documentsByProject.grouped[project.id]?.length > 0)
        .map((project) => {
          const projectDocs = documentsByProject.grouped[project.id] || []
          const isExpanded = expandedProjectIds.has(project.id)
          const metrics = getProjectMetrics(project.id)

          return (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div
                role="button"
                tabIndex={-1}
                onClick={() => toggleProjectExpansion(project.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    toggleProjectExpansion(project.id)
                }}
                className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    <p className="text-xs text-gray-600">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">
                        {metrics.totalDocs}
                      </div>
                      <div className="text-xs text-gray-500">Docs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">
                        {metrics.completedDocs}
                      </div>
                      <div className="text-xs text-gray-500">Done</div>
                    </div>
                    {metrics.avgProgress > 0 && (
                      <div className="w-24">
                        <div className="text-xs text-gray-500 mb-1">
                          Avg Progress
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${metrics.avgProgress}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-700 font-medium mt-1">
                          {metrics.avgProgress}%
                        </div>
                      </div>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : project.status === 'review'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 space-y-2">
                  {projectDocs.map((doc) => {
                    const isDocExpanded = expandedDocId === doc.id
                    return (
                      <div
                        key={doc.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <div
                          role="button"
                          tabIndex={-1}
                          onClick={() =>
                            setExpandedDocId(isDocExpanded ? null : doc.id)
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              setExpandedDocId(isDocExpanded ? null : doc.id)
                          }}
                          className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex-shrink-0">
                            {isDocExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm truncate">
                              {doc.googleDocTitle}
                            </h4>
                          </div>
                          {doc.priority &&
                            (() => {
                              const priorityConfig = getPriorityConfig(
                                doc.priority
                              )
                              return priorityConfig ? (
                                <span
                                  className={`px-2 py-0.5 ${priorityConfig.bg} ${priorityConfig.text} text-xs font-medium rounded border ${priorityConfig.border}`}
                                >
                                  {priorityConfig.label}
                                </span>
                              ) : null
                            })()}
                          <div className="flex-shrink-0">
                            {doc.status === 'approved' ||
                            doc.status === 'completed' ? (
                              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                {doc.status === 'completed'
                                  ? 'Done'
                                  : 'Approved'}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                Pending
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 hidden sm:block">
                            {formatDate(doc.addedAt)}
                          </span>
                        </div>

                        {isDocExpanded && (
                          <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="mb-3">
                              <p className="text-xs text-gray-600 mb-1">
                                Added: {formatDate(doc.addedAt)}
                              </p>
                              {doc.notes && (
                                <div className="mb-2">
                                  <span className="text-xs font-medium text-gray-700 block mb-1">
                                    Notes:
                                  </span>
                                  <p className="text-xs text-gray-800 bg-white p-2 rounded">
                                    {doc.notes}
                                  </p>
                                </div>
                              )}
                            </div>

                            {(doc.status === 'approved' ||
                              doc.status === 'completed' ||
                              doc.status === 'in-progress') &&
                              doc.progressPercentage !== undefined && (
                                <div className="mb-3 bg-blue-50 p-3 rounded border border-blue-100">
                                  <h5 className="text-xs font-semibold text-gray-900 mb-2">
                                    Development Progress
                                  </h5>
                                  <ProgressBar
                                    percentage={doc.progressPercentage}
                                    size="sm"
                                    showLabel={true}
                                  />
                                  {doc.progressNote && (
                                    <p className="text-xs text-gray-700 mt-1 italic">
                                      &ldquo;{doc.progressNote}&rdquo;
                                    </p>
                                  )}
                                </div>
                              )}

                            <div className="flex gap-2">
                              <a
                                href={doc.googleDocUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3" />
                                View
                              </a>
                              {doc.status === 'pending' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleApprove(doc.id)
                                  }}
                                  disabled={approvingId === doc.id}
                                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                  {approvingId === doc.id
                                    ? 'Notifying...'
                                    : 'Notify Dev'}
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <h5 className="text-sm font-semibold text-gray-900 mb-3">
                      Project Messages
                    </h5>
                    <MessageThread
                      projectId={project.id}
                      projectTitle={project.title}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}

      {documentsByProject.unassigned.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div
            role="button"
            tabIndex={-1}
            onClick={() => toggleProjectExpansion('unassigned')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ')
                toggleProjectExpansion('unassigned')
            }}
            className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {expandedProjectIds.has('unassigned') ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">
                  Unassigned Documents
                </h3>
                <p className="text-xs text-gray-600">
                  Documents not linked to any project
                </p>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {documentsByProject.unassigned.length}
                </div>
                <div className="text-xs text-gray-500">Docs</div>
              </div>
            </div>
          </div>

          {expandedProjectIds.has('unassigned') && (
            <div className="p-4 space-y-2">
              {documentsByProject.unassigned.map((doc) => {
                const isDocExpanded = expandedDocId === doc.id
                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div
                      role="button"
                      tabIndex={-1}
                      onClick={() =>
                        setExpandedDocId(isDocExpanded ? null : doc.id)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          setExpandedDocId(isDocExpanded ? null : doc.id)
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {isDocExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {doc.googleDocTitle}
                        </h4>
                      </div>
                      {doc.priority &&
                        (() => {
                          const priorityConfig = getPriorityConfig(doc.priority)
                          return priorityConfig ? (
                            <span
                              className={`px-2 py-0.5 ${priorityConfig.bg} ${priorityConfig.text} text-xs font-medium rounded border ${priorityConfig.border}`}
                            >
                              {priorityConfig.label}
                            </span>
                          ) : null
                        })()}
                      <div className="flex-shrink-0">
                        {doc.status === 'approved' ||
                        doc.status === 'completed' ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {doc.status === 'completed' ? 'Done' : 'Approved'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    {isDocExpanded && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">
                            Added: {formatDate(doc.addedAt)}
                          </p>
                          {doc.notes && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-700 block mb-1">
                                Notes:
                              </span>
                              <p className="text-xs text-gray-800 bg-white p-2 rounded">
                                {doc.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={doc.googleDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
