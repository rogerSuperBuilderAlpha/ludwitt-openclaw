'use client'

import { Plus, Calendar } from 'lucide-react'
import { Markdown } from '@/components/ui/Markdown'
import type { DateFormatter } from '@/lib/types/common'
import type { FirestoreTimestamp } from '@/lib/types/timestamp'

interface Session {
  id: string
  accomplishments: string
  sessionDate: FirestoreTimestamp
  addedBy: string
  nextSteps?: string
}

interface SessionsSectionProps {
  sessions: Session[]
  submissionId: string
  activeSubmission: string | null
  showSessionForm: boolean
  sessionAccomplishments: string
  sessionNextSteps: string
  addingSession: boolean
  setActiveSubmission: (id: string) => void
  setShowSessionForm: (show: boolean) => void
  setShowRequirementForm: (show: boolean) => void
  setSessionAccomplishments: (text: string) => void
  setSessionNextSteps: (text: string) => void
  handleAddSession: () => void
  handleOpenModal: (type: 'sessions') => void
  formatDateTime: DateFormatter
}

export function SessionsSection({
  sessions,
  submissionId,
  activeSubmission,
  showSessionForm,
  sessionAccomplishments,
  sessionNextSteps,
  addingSession,
  setActiveSubmission,
  setShowSessionForm,
  setShowRequirementForm,
  setSessionAccomplishments,
  setSessionNextSteps,
  handleAddSession,
  handleOpenModal,
  formatDateTime,
}: SessionsSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Development Sessions
        </h4>
        {activeSubmission !== submissionId || !showSessionForm ? (
          <button
            onClick={() => {
              // Clear form state if switching to a different submission
              if (activeSubmission !== submissionId) {
                setSessionAccomplishments('')
                setSessionNextSteps('')
              }
              setActiveSubmission(submissionId)
              setShowSessionForm(true)
              setShowRequirementForm(false)
            }}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        ) : null}
      </div>

      {/* Add Session Form */}
      {activeSubmission === submissionId && showSessionForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={sessionAccomplishments}
            onChange={(e) => setSessionAccomplishments(e.target.value)}
            placeholder="What was accomplished in this session?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <textarea
            value={sessionNextSteps}
            onChange={(e) => setSessionNextSteps(e.target.value)}
            placeholder="Next steps (optional)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddSession}
              disabled={addingSession || !sessionAccomplishments.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {addingSession ? 'Adding...' : 'Add Session'}
            </button>
            <button
              onClick={() => {
                setShowSessionForm(false)
                setSessionAccomplishments('')
                setSessionNextSteps('')
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Sessions List */}
      <div className="space-y-3">
        {sessions.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No sessions recorded yet
          </p>
        ) : (
          <>
            {sessions.slice(0, 4).map((session) => (
              <button
                key={session.id}
                onClick={() => handleOpenModal('sessions')}
                className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="mb-1">
                  <Markdown
                    content={session.accomplishments}
                    className="text-sm line-clamp-2"
                  />
                </div>
                {session.nextSteps && (
                  <div className="mb-1">
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Next Steps:
                    </p>
                    <Markdown
                      content={session.nextSteps}
                      className="text-xs line-clamp-1"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatDateTime(session.sessionDate)}</span>
                </div>
              </button>
            ))}
            {sessions.length > 4 && (
              <button
                onClick={() => handleOpenModal('sessions')}
                className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View All {sessions.length} Sessions →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
