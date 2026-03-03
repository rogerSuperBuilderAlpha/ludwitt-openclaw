'use client'

/**
 * StudentModeView
 *
 * Student-facing view for the Near Peer Tutor feature.
 * Shows the student's active request with incoming tutor offers,
 * or a form to create a new help request.
 */

import { CurrencyDollar, User } from '@phosphor-icons/react'
import { TutorRequest } from '@/lib/types/tutor'
import { CreditBalance } from '@/lib/hooks/useCredits'

interface StudentModeViewProps {
  myRequest: TutorRequest | null
  description: string
  onDescriptionChange: (desc: string) => void
  creditsOffer: number
  onCreditsOfferChange: (amount: number) => void
  balance: CreditBalance | null
  loading: boolean
  onCreateRequest: () => void
  onAcceptTutor: (tutorId: string) => void
}

export function StudentModeView({
  myRequest,
  description,
  onDescriptionChange,
  creditsOffer,
  onCreditsOfferChange,
  balance,
  loading,
  onCreateRequest,
  onAcceptTutor,
}: StudentModeViewProps) {
  if (myRequest) {
    return (
      <div className="space-y-4">
        <div className="b-bg-math-light rounded-lg p-4 border b-border-math">
          <h3 className="font-medium b-text-primary mb-2">
            Your Active Request
          </h3>
          <p className="b-text-secondary mb-2">{myRequest.description}</p>
          <div className="flex items-center gap-4 text-sm b-text-secondary">
            <span className="flex items-center gap-1">
              <CurrencyDollar size={16} />$
              {(myRequest.creditsOffered / 100).toFixed(2)} offered
            </span>
            <span className="px-2 py-0.5 b-bg-math-light b-text-math rounded-full text-xs font-medium">
              {myRequest.status}
            </span>
          </div>
        </div>

        {myRequest.potentialTutors.length > 0 && (
          <div>
            <h4 className="font-medium b-text-primary mb-3">
              Tutors Who Can Help ({myRequest.potentialTutors.length})
            </h4>
            <div className="space-y-3">
              {myRequest.potentialTutors.map((tutor) => (
                <div
                  key={tutor.tutorId}
                  className="b-bg-card border b-border rounded-lg p-4 hover:b-border-math transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 b-bg-math-light rounded-full flex items-center justify-center">
                        <User size={20} className="b-text-math" />
                      </div>
                      <div>
                        <p className="font-medium b-text-primary">
                          {tutor.tutorDisplayName}
                        </p>
                        <p className="text-sm b-text-muted">
                          Grade {tutor.tutorGrade}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAcceptTutor(tutor.tutorId)}
                      className="px-4 py-2 b-bg-math text-white rounded-lg hover:b-bg-math transition-colors text-sm font-medium"
                    >
                      Accept
                    </button>
                  </div>
                  {tutor.message && (
                    <p className="mt-2 text-sm b-text-secondary b-bg-muted rounded p-2">
                      &quot;{tutor.message}&quot;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {myRequest.potentialTutors.length === 0 && (
          <p className="text-center b-text-muted py-4">
            Waiting for tutors to offer help...
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium b-text-primary">Request Help</h3>

      <div>
        <label
          htmlFor="tutor-description"
          className="block text-sm font-medium b-text-secondary mb-2"
        >
          What do you need help with?
        </label>
        <textarea
          id="tutor-description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe the math problem or concept you're struggling with..."
          className="w-full px-4 py-3 border b-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium b-text-secondary mb-2">
          Credits to offer: ${(creditsOffer / 100).toFixed(2)}
        </label>
        <input
          type="range"
          min={10}
          max={500}
          step={10}
          value={creditsOffer}
          onChange={(e) => onCreditsOfferChange(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs b-text-muted mt-1">
          <span>$0.10</span>
          <span>$5.00</span>
        </div>
        {balance && (
          <p className="text-sm b-text-muted mt-2">
            Your balance: {balance.balanceFormatted}
          </p>
        )}
      </div>

      <button
        onClick={onCreateRequest}
        disabled={loading || description.length < 10}
        className="w-full py-3 b-bg-math text-white rounded-lg hover:b-bg-math disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Post Help Request
      </button>
    </div>
  )
}
