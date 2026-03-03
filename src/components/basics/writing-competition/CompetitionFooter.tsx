'use client'

import {
  Clock,
  CheckCircle,
  PaperPlaneTilt,
  SpinnerGap,
} from '@phosphor-icons/react'
import {
  WritingCompetition,
  WritingDraft,
  WritingSubmission,
} from '@/lib/types/writing-competition'
import { formatTimeRemaining } from './types'

interface CompetitionFooterProps {
  competition: WritingCompetition | null
  timeRemaining: number
  isSaving: boolean
  userDraft: WritingDraft | null
  userSubmission: WritingSubmission | null
  activeTab: 'write' | 'leaderboard'
  canSubmit: boolean
  isSubmitting: boolean
  onSubmit: () => void
}

export function CompetitionFooter({
  competition,
  timeRemaining,
  isSaving,
  userDraft,
  userSubmission,
  activeTab,
  canSubmit,
  isSubmitting,
  onSubmit,
}: CompetitionFooterProps) {
  return (
    <div className="flex-shrink-0 b-border-t b-p-lg b-bg-muted">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {competition && (
            <div className="flex items-center gap-2 b-text-secondary">
              <Clock size={18} />
              <span
                className={`b-text-sm ${
                  timeRemaining <= 3600 ? 'b-text-danger b-font-medium' : ''
                }`}
              >
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
          )}
          {isSaving && (
            <div className="flex items-center gap-1 b-text-muted b-text-sm">
              <SpinnerGap size={14} className="b-animate-spin" />
              Saving...
            </div>
          )}
          {!isSaving && userDraft && !userSubmission && (
            <div className="b-text-muted b-text-sm">Auto-saved</div>
          )}
        </div>
        {activeTab === 'write' && !userSubmission && (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={`b-btn b-btn-lg ${
              canSubmit
                ? 'b-btn-logic'
                : 'b-btn-secondary opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <SpinnerGap size={18} className="b-animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <PaperPlaneTilt size={18} weight="bold" />
                Submit Essay
              </>
            )}
          </button>
        )}
        {userSubmission && (
          <div className="flex items-center gap-2 b-text-reading b-font-medium">
            <CheckCircle size={20} weight="fill" />
            Submitted
          </div>
        )}
      </div>
    </div>
  )
}
