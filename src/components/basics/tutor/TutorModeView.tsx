'use client'

/**
 * TutorModeView
 *
 * Tutor-facing view for the Near Peer Tutor feature.
 * Shows available help requests from students that the tutor
 * can browse and offer help on.
 */

import { GraduationCap, CurrencyDollar } from '@phosphor-icons/react'
import { TutorRequest } from '@/lib/types/tutor'

interface TutorModeViewProps {
  userGrade: number
  availableRequests: TutorRequest[]
  offerMessage: string
  onOfferMessageChange: (msg: string) => void
  onOfferHelp: (requestId: string) => void
}

export function TutorModeView({
  userGrade,
  availableRequests,
  offerMessage,
  onOfferMessageChange,
  onOfferHelp,
}: TutorModeViewProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm b-text-secondary">
        Help students 1-3 grades below you (Grade {Math.max(1, userGrade - 3)} -{' '}
        {userGrade - 1})
      </p>

      {availableRequests.length > 0 ? (
        <div className="space-y-3">
          {availableRequests.map((request) => (
            <div
              key={request.id}
              className="b-bg-card border b-border rounded-lg p-4 hover:b-border-math transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium b-text-primary">
                    {request.studentDisplayName}
                  </p>
                  <p className="text-sm b-text-muted">
                    Grade {request.studentGrade}
                  </p>
                </div>
                <span className="flex items-center gap-1 b-text-reading font-medium">
                  <CurrencyDollar size={16} />$
                  {(request.creditsOffered / 100).toFixed(2)}
                </span>
              </div>
              <p className="b-text-secondary mb-3">{request.description}</p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Optional message..."
                  value={offerMessage}
                  onChange={(e) => onOfferMessageChange(e.target.value)}
                  className="flex-1 px-3 py-2 border b-border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => onOfferHelp(request.id)}
                  className="px-4 py-2 b-bg-math text-white rounded-lg hover:b-bg-math transition-colors text-sm font-medium"
                >
                  Offer Help
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap size={48} className="b-text-muted mx-auto mb-3" />
          <p className="b-text-muted">No students need help right now</p>
          <p className="text-sm b-text-muted mt-1">Check back later!</p>
        </div>
      )}
    </div>
  )
}
