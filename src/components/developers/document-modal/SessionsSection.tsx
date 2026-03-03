'use client'

import type { DateFormatter } from '@/lib/types/common'
import type { FirestoreTimestamp } from '@/lib/types/timestamp'

interface Session {
  id: string
  accomplishments: string
  sessionDate: FirestoreTimestamp
  addedBy: string
  nextSteps?: string
  timeSpentMinutes?: number
}

interface SessionsSectionProps {
  sessions: Session[]
  documentId: string
  assignedTo?: string
  userId?: string | null
  sessionAccomplishments: string
  setSessionAccomplishments: (s: string) => void
  sessionNextSteps: string
  setSessionNextSteps: (s: string) => void
  sessionTimeSpent: string
  setSessionTimeSpent: (s: string) => void
  addingSessionId: string | null
  onAddSession: () => void
  formatDateTime: DateFormatter
}

export function SessionsSection({
  sessions,
  documentId,
  assignedTo,
  userId,
  sessionAccomplishments,
  setSessionAccomplishments,
  sessionNextSteps,
  setSessionNextSteps,
  sessionTimeSpent,
  setSessionTimeSpent,
  addingSessionId,
  onAddSession,
  formatDateTime,
}: SessionsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Work Sessions</h3>
      {assignedTo === userId && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <textarea
            value={sessionAccomplishments}
            onChange={(e) => setSessionAccomplishments(e.target.value)}
            placeholder="What did you accomplish?"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
          />
          <textarea
            value={sessionNextSteps}
            onChange={(e) => setSessionNextSteps(e.target.value)}
            placeholder="Next steps (optional)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
          />
          <input
            type="number"
            min="0"
            value={sessionTimeSpent}
            onChange={(e) => setSessionTimeSpent(e.target.value)}
            placeholder="Time spent (minutes)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
          />
          <button
            onClick={onAddSession}
            disabled={
              !sessionAccomplishments.trim() || addingSessionId === documentId
            }
            className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {addingSessionId === documentId ? 'Logging...' : 'Log Session'}
          </button>
        </div>
      )}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-3 bg-white rounded-lg border border-gray-200 text-sm"
          >
            <p className="text-gray-900 mb-1">{session.accomplishments}</p>
            {session.nextSteps && (
              <p className="text-gray-600 text-xs mb-1">{session.nextSteps}</p>
            )}
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span>{formatDateTime(session.sessionDate)}</span>
              {session.timeSpentMinutes && (
                <>
                  <span>•</span>
                  <span className="font-medium text-blue-600">
                    {session.timeSpentMinutes} min
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="text-sm text-gray-500 italic text-center py-4">
            No sessions logged yet
          </p>
        )}
      </div>
    </div>
  )
}
