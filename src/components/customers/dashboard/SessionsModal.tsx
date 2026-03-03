import { X, Clock } from 'lucide-react'
import { CustomerDocument } from '@/lib/types/customer'
import type { DateFormatter } from '@/lib/types/common'

type SessionsModalProps = {
  isOpen: boolean
  onClose: () => void
  document: CustomerDocument
  formatDate: DateFormatter
}

export function SessionsModal({
  isOpen,
  onClose,
  document,
  formatDate,
}: SessionsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Sessions"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Work Sessions ({document.sessions?.length || 0})
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {document.sessions && document.sessions.length > 0 ? (
            <div className="space-y-4">
              {document.sessions.map((session: any) => (
                <div
                  key={session.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                      Accomplishments
                    </p>
                    <p className="text-gray-900 text-base">
                      {session.accomplishments}
                    </p>
                  </div>
                  {session.nextSteps && (
                    <div className="mb-3 pl-4 border-l-2 border-purple-300">
                      <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                        Next Steps
                      </p>
                      <p className="text-gray-900 text-base">
                        {session.nextSteps}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(session.sessionDate)}</span>
                    <span>•</span>
                    <span className="font-medium">{session.addedBy}</span>
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
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No work sessions recorded yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
