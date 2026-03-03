import { CheckCircle, UserCircle, Gear } from '@phosphor-icons/react'
import { LeaderboardEntry } from '@/lib/types/writing-competition'
import { getAvatarById } from '@/data/avatars'

interface SubmissionFlowProps {
  submissionResult: { success: boolean; feedback: string } | null
  currentUserSubmission: LeaderboardEntry | null
  onUpdateAvatar: () => void
}

export function SubmissionFlow({
  submissionResult,
  currentUserSubmission,
  onUpdateAvatar,
}: SubmissionFlowProps) {
  if (!submissionResult?.success) return null

  return (
    <div className="b-mb-xl b-p-lg b-bg-reading-light b-border b-border-reading b-rounded-xl">
      <div className="flex items-start gap-3">
        <CheckCircle
          size={24}
          weight="fill"
          className="b-text-reading flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="b-font-semibold b-text-reading-dark">
            Essay Submitted!
          </h3>
          <p className="b-text-reading-text b-text-sm b-mt-sm">
            {submissionResult.feedback}
          </p>
          {currentUserSubmission && (
            <div className="b-mt-md flex items-center gap-3 b-p-md b-bg-muted b-rounded-lg">
              <div className="w-10 h-10 b-rounded-full flex items-center justify-center b-bg-card b-border-2 b-border-reading">
                {currentUserSubmission.avatarEmoji ? (
                  <span className="b-text-xl">
                    {currentUserSubmission.avatarEmoji}
                  </span>
                ) : currentUserSubmission.characterId ? (
                  <span className="b-text-xl">
                    {getAvatarById(currentUserSubmission.characterId)?.emoji ||
                      '👤'}
                  </span>
                ) : (
                  <UserCircle size={24} className="b-text-reading" />
                )}
              </div>
              <div className="flex-1">
                <div className="b-font-medium b-text-primary b-text-sm">
                  {currentUserSubmission.displayName}
                </div>
                <div className="b-text-xs b-text-reading-text">
                  Your leaderboard name
                </div>
              </div>
              <button
                onClick={onUpdateAvatar}
                className="flex items-center gap-1 px-2 py-1 b-text-xs b-text-logic hover:b-bg-logic-light b-rounded transition-colors cursor-pointer"
              >
                <Gear size={12} />
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
