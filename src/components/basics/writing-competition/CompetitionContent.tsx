'use client'

import { SpinnerGap } from '@phosphor-icons/react'
import {
  WritingCompetition,
  WritingSubmission,
} from '@/lib/types/writing-competition'
import {
  LeaderboardEntry,
  CompetitionWinner,
} from '@/lib/types/writing-competition'
import { CompetitionPrompt } from './CompetitionPrompt'
import { DraftEditor } from './DraftEditor'
import { SubmissionFlow } from './SubmissionFlow'
import { LeaderboardView } from './LeaderboardView'

interface CompetitionContentProps {
  isLoading: boolean
  error: string | null
  activeTab: 'write' | 'leaderboard'
  competition: WritingCompetition | null
  userSubmission: WritingSubmission | null
  essay: string
  setEssay: (essay: string) => void
  timeRemaining: number
  setTypingTime: (fn: number | ((prev: number) => number)) => void
  submissionResult: { success: boolean; feedback: string } | null
  currentUserSubmission: LeaderboardEntry | null
  userGradeLevel: number
  totalParticipants: number
  pastWinners: CompetitionWinner[]
  onUpdateAvatar: () => void
  onRetry: () => void
}

export function CompetitionContent({
  isLoading,
  error,
  activeTab,
  competition,
  userSubmission,
  essay,
  setEssay,
  timeRemaining,
  setTypingTime,
  submissionResult,
  currentUserSubmission,
  userGradeLevel,
  totalParticipants,
  pastWinners,
  onUpdateAvatar,
  onRetry,
}: CompetitionContentProps) {
  return (
    <div className="flex-1 overflow-y-auto b-p-xl">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap size={32} className="b-text-logic b-animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="b-text-danger">{error}</p>
          <button onClick={onRetry} className="b-mt-lg b-btn b-btn-logic">
            Try Again
          </button>
        </div>
      ) : activeTab === 'write' ? (
        <>
          {competition && <CompetitionPrompt competition={competition} />}
          <SubmissionFlow
            submissionResult={submissionResult}
            currentUserSubmission={currentUserSubmission}
            onUpdateAvatar={onUpdateAvatar}
          />
          <DraftEditor
            userSubmission={userSubmission}
            essay={essay}
            setEssay={setEssay}
            timeRemaining={timeRemaining}
            onTypingTimeUpdate={(s) => setTypingTime((p) => p + s)}
          />
        </>
      ) : (
        <LeaderboardView
          userGradeLevel={userGradeLevel}
          totalParticipants={totalParticipants}
          userSubmission={userSubmission}
          currentUserSubmission={currentUserSubmission}
          pastWinners={pastWinners}
          onUpdateAvatar={onUpdateAvatar}
        />
      )}
    </div>
  )
}
