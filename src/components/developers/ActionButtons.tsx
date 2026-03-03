'use client'

interface ActionButtonsProps {
  submissionId: string
  submissionTitle: string
  status?: 'pending' | 'in-progress' | 'completed' | 'archived'
  assignedTo?: string
  showAssignDropdown: string | null
  setShowAssignDropdown: (id: string | null) => void
  selectedDeveloper: string
  setSelectedDeveloper: (id: string) => void
  developers: Array<{
    id: string
    email: string
    displayName: string
    isAdmin: boolean
  }>
  assigning: string | null
  updatingStatus: string | null
  handleAssignToMe: (id: string) => void
  handleAssignToDeveloper: (submissionId: string, developerId: string) => void
  handleUpdateStatus: (id: string, status: string) => void
  handleMarkComplete: (id: string, title: string) => void
  handleArchiveClick: (id: string, title: string) => void
}

export function ActionButtons({
  submissionId,
  submissionTitle,
  status,
  assignedTo,
  showAssignDropdown,
  setShowAssignDropdown,
  selectedDeveloper,
  setSelectedDeveloper,
  developers,
  assigning,
  updatingStatus,
  handleAssignToMe,
  handleAssignToDeveloper,
  handleUpdateStatus,
  handleMarkComplete,
  handleArchiveClick,
}: ActionButtonsProps) {
  return (
    <div className="px-4 sm:px-6 pb-4 border-t pt-4">
      <div className="flex gap-2 sm:gap-3 flex-wrap items-stretch">
        {/* Assignment / Reassignment */}
        {showAssignDropdown === submissionId ? (
          <div className="flex gap-2 items-center w-full">
            <select
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Select developer...</option>
              {developers.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.displayName} {dev.isAdmin ? '(Admin)' : ''}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                handleAssignToDeveloper(submissionId, selectedDeveloper)
              }
              disabled={!selectedDeveloper || assigning === submissionId}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {assigning === submissionId && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {assigning === submissionId
                ? 'Assigning...'
                : assignedTo
                  ? 'Reassign'
                  : 'Assign'}
            </button>
            <button
              onClick={() => {
                setShowAssignDropdown(null)
                setSelectedDeveloper('')
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Always show "Assign to Me" as quick action */}
            <button
              onClick={() => handleAssignToMe(submissionId)}
              disabled={assigning === submissionId}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
            >
              {assigning === submissionId && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {assigning === submissionId ? 'Assigning...' : 'Assign to Me'}
            </button>
            {/* Show reassignment dropdown for other developers */}
            {developers.length > 1 && (
              <button
                onClick={() => setShowAssignDropdown(submissionId)}
                className={`px-4 py-2.5 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium min-h-[44px] w-full sm:w-auto ${
                  assignedTo
                    ? 'border-gray-600 text-gray-700'
                    : 'border-blue-600 text-blue-600'
                }`}
              >
                {assignedTo ? 'Reassign to Other' : 'Assign to Other'}
              </button>
            )}
          </div>
        )}

        {/* Mark as In Progress - only show if pending */}
        {(!status || status === 'pending') && (
          <button
            onClick={() => handleUpdateStatus(submissionId, 'in-progress')}
            disabled={updatingStatus === submissionId}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
          >
            {updatingStatus === submissionId && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {updatingStatus === submissionId ? 'Starting...' : 'Start Work'}
          </button>
        )}

        {/* Mark Complete - only show if in progress */}
        {status === 'in-progress' && (
          <button
            onClick={() => handleMarkComplete(submissionId, submissionTitle)}
            className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium min-h-[44px] w-full sm:w-auto"
          >
            Mark Complete
          </button>
        )}

        {/* Archive - only show if completed */}
        {status === 'completed' && (
          <button
            onClick={() => handleArchiveClick(submissionId, submissionTitle)}
            disabled={updatingStatus === submissionId}
            className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto"
          >
            {updatingStatus === submissionId && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {updatingStatus === submissionId ? 'Archiving...' : 'Archive'}
          </button>
        )}
      </div>
    </div>
  )
}
