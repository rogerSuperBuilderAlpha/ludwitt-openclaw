'use client'

import {
  Brain,
  XCircle,
  Play,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'

interface SRSProgressPanelProps {
  totalCompleted: number
  progressToNextSRS: {
    current: number
    target: number
    percentage: number
    isReady: boolean
    sessionsCompleted: number
  }
  questionsRemaining: number
  questionsPerTrigger: number
  recentProblemsCount: number
  canStartReview: boolean
  isGenerating: boolean
  generationError: string | null
  onDismissError: () => void
  onStartSession: () => void
}

export function SRSProgressPanel({
  totalCompleted,
  progressToNextSRS,
  questionsRemaining,
  questionsPerTrigger,
  recentProblemsCount,
  canStartReview,
  isGenerating,
  generationError,
  onDismissError,
  onStartSession,
}: SRSProgressPanelProps) {
  return (
    <div className="b-bg-card rounded-lg border b-border p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Brain size={24} className="b-text-logic" />
        <div>
          <h4 className="font-medium b-text-primary">Spaced Repetition</h4>
          <p className="text-xs b-text-muted">
            Review previous skills every 20 questions
          </p>
        </div>
      </div>

      {/* Error state */}
      {generationError && (
        <div className="b-bg-latin-light border b-border-latin rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle size={16} className="b-text-latin" />
            <span className="text-sm font-medium b-text-latin">Error</span>
          </div>
          <p className="text-xs b-text-latin">{generationError}</p>
          <button
            onClick={onDismissError}
            className="text-xs b-text-latin underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Progress towards next SRS session */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="b-text-secondary font-medium">
            Progress to Next Review
          </span>
          {progressToNextSRS.isReady ? (
            <span className="b-text-reading font-bold">Ready!</span>
          ) : (
            <span className="b-text-logic font-bold">
              {progressToNextSRS.current}/{questionsPerTrigger}
            </span>
          )}
        </div>
        <div className="w-full bg-b-border rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              progressToNextSRS.isReady
                ? 'b-bg-reading'
                : 'bg-gradient-to-r from-b-logic to-b-greek'
            }`}
            style={{ width: `${progressToNextSRS.percentage}%` }}
          />
        </div>
        <p className="text-xs b-text-muted mt-2">
          {progressToNextSRS.isReady
            ? 'Review session unlocked! Click the button below to start.'
            : totalCompleted === 0
              ? 'Start answering questions to build towards your first review session'
              : `Complete ${questionsRemaining} more question${questionsRemaining !== 1 ? 's' : ''} to unlock a review session`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="b-bg-muted rounded-lg p-2 text-center">
          <div className="text-lg font-bold b-text-primary">
            {totalCompleted}
          </div>
          <div className="text-[10px] b-text-muted">Total Done</div>
        </div>
        <div className="b-bg-logic-light rounded-lg p-2 text-center">
          <div className="text-lg font-bold b-text-logic">
            {progressToNextSRS.sessionsCompleted}
          </div>
          <div className="text-[10px] b-text-muted">Reviews Done</div>
        </div>
        <div className="b-bg-math-light rounded-lg p-2 text-center">
          <div className="text-lg font-bold b-text-math">
            {recentProblemsCount}
          </div>
          <div className="text-[10px] b-text-muted">Tracked</div>
        </div>
      </div>

      {/* How it works - only show for new users */}
      {totalCompleted < questionsPerTrigger && (
        <div className="border-t border-b-border-muted pt-3">
          <p className="text-xs b-text-secondary mb-2 font-medium">
            How it works:
          </p>
          <div className="space-y-1.5 text-xs b-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full b-bg-logic-light b-text-logic flex items-center justify-center text-[10px] font-bold">
                1
              </div>
              <span>Complete 20 questions in Math or Reading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full b-bg-logic-light b-text-logic flex items-center justify-center text-[10px] font-bold">
                2
              </div>
              <span>AI generates 5 review questions from your topics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full b-bg-logic-light b-text-logic flex items-center justify-center text-[10px] font-bold">
                3
              </div>
              <span>Reinforce learning and earn bonus XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Manual trigger button (only if ready) */}
      {canStartReview && (
        <button
          onClick={onStartSession}
          disabled={isGenerating}
          className="w-full mt-4 b-bg-reading hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <ArrowCounterClockwise size={18} className="animate-spin" />
              Generating Review...
            </>
          ) : (
            <>
              <Play size={18} weight="fill" />
              Start Review Session (5 questions)
            </>
          )}
        </button>
      )}

      {/* Show why button is not available */}
      {!canStartReview && totalCompleted > 0 && (
        <div className="mt-4 p-3 b-bg-muted border b-border rounded-lg text-xs b-text-secondary">
          {totalCompleted < questionsPerTrigger ? (
            <p>
              Complete {questionsPerTrigger - totalCompleted} more questions to
              unlock your first review session.
            </p>
          ) : recentProblemsCount < 5 ? (
            <p>
              <strong>Almost ready!</strong> Need {5 - recentProblemsCount} more
              tracked problems. Keep answering questions.
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}
