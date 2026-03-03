import {
  Trophy,
  Medal,
  User,
  CheckCircle,
  UserCircle,
  Gear,
} from '@phosphor-icons/react'
import {
  CompetitionWinner,
  WritingSubmission,
  LeaderboardEntry,
} from '@/lib/types/writing-competition'
import { getAvatarById } from '@/data/avatars'

interface LeaderboardViewProps {
  userGradeLevel: number
  totalParticipants: number
  userSubmission: WritingSubmission | null
  currentUserSubmission: LeaderboardEntry | null
  pastWinners: CompetitionWinner[]
  onUpdateAvatar: () => void
}

export function LeaderboardView({
  userGradeLevel,
  totalParticipants,
  userSubmission,
  currentUserSubmission,
  pastWinners,
  onUpdateAvatar,
}: LeaderboardViewProps) {
  return (
    <div>
      {/* Competition Stats */}
      <div className="b-mb-xl b-p-lg b-bg-logic-light b-border b-border-logic b-rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="b-font-semibold b-text-logic-dark">
              Grade {userGradeLevel} Competition
            </h3>
            <p className="b-text-logic-text b-text-sm">
              <span className="b-font-bold">{totalParticipants}</span>{' '}
              submission
              {totalParticipants !== 1 ? 's' : ''} this week
            </p>
          </div>
          <div className="text-right">
            <div className="b-text-2xl b-font-bold b-text-logic-dark">$50</div>
            <div className="b-text-xs b-text-logic-text">Weekly Prize</div>
          </div>
        </div>
      </div>

      {/* Your Submission */}
      {(userSubmission || currentUserSubmission) && (
        <div className="b-mb-xl b-p-lg b-bg-reading-light b-border b-border-reading b-rounded-xl">
          <div className="flex items-center justify-between b-mb-md">
            <h3 className="b-font-semibold b-text-reading-dark flex items-center gap-2">
              <CheckCircle size={18} weight="fill" />
              Your Submission
            </h3>
            <button
              onClick={onUpdateAvatar}
              className="flex items-center gap-1.5 px-3 py-1.5 b-text-xs b-font-medium b-text-logic hover:b-bg-logic-light b-rounded-lg transition-colors cursor-pointer"
            >
              <Gear size={14} />
              Update Profile
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 b-rounded-full flex items-center justify-center b-bg-card b-border-2 b-border-reading shadow-sm">
              {currentUserSubmission?.avatarEmoji ? (
                <span className="b-text-2xl">
                  {currentUserSubmission.avatarEmoji}
                </span>
              ) : currentUserSubmission?.characterId ? (
                <span className="b-text-2xl">
                  {getAvatarById(currentUserSubmission.characterId)?.emoji ||
                    '👤'}
                </span>
              ) : (
                <UserCircle size={28} className="b-text-reading" />
              )}
            </div>
            <div className="flex-1">
              <div className="b-font-medium b-text-primary">
                {currentUserSubmission?.displayName ||
                  userSubmission?.userDisplayName ||
                  'You'}
              </div>
              <div className="b-text-sm b-text-reading-text">
                Submitted • Good luck!
              </div>
            </div>
            {currentUserSubmission?.rank && (
              <div className="px-3 py-1 b-bg-reading-light b-rounded-full">
                <span className="b-text-sm b-font-bold b-text-reading-dark">
                  #{currentUserSubmission.rank}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Past Winners */}
      <h3 className="b-font-semibold b-text-primary b-mb-md flex items-center gap-2">
        <Medal size={20} className="b-text-writing" />
        Recent Winners
      </h3>
      {pastWinners.length > 0 ? (
        <div className="space-y-3">
          {pastWinners.map((winner, index) => (
            <div
              key={`${winner.competitionId}-${winner.userId}`}
              className="b-p-lg b-bg-card b-border b-rounded-xl hover:b-border-logic transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 b-rounded-full flex items-center justify-center ${
                      index === 0
                        ? 'b-bg-writing-light b-text-writing-dark'
                        : 'b-bg-muted b-text-secondary'
                    }`}
                  >
                    {index === 0 ? (
                      <Trophy size={20} weight="fill" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div>
                    <div className="b-font-medium b-text-primary">
                      {winner.displayName}
                    </div>
                    <div className="b-text-sm b-text-muted">
                      Week {winner.weekNumber}, {winner.year}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="b-text-sm b-font-medium b-text-reading">
                    $50 Won
                  </div>
                  <div className="b-text-xs b-text-muted">
                    Grade {winner.gradeLevel}
                  </div>
                </div>
              </div>
              <p className="b-mt-sm b-text-sm b-text-secondary italic">
                &ldquo;{winner.essayExcerpt}&rdquo;
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 b-text-muted">
          <Trophy size={48} className="mx-auto b-mb-md b-text-muted" />
          <p>No winners yet in your grade level.</p>
          <p className="b-text-sm">Be the first to win!</p>
        </div>
      )}
    </div>
  )
}
