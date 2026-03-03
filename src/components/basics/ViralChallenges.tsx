/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
/**
 * Viral Challenges Component
 * Displays and manages viral learning challenges like #30DayMathChallenge
 */

'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import { useApiQuery, useApiMutation } from '@/lib/hooks/useApiQuery'
import { Portal } from './Portal'
import { logger } from '@/lib/logger'

export interface ViralChallenge {
  id: string
  title: string
  hashtag: string
  description: string
  duration: number // days
  startDate: string
  endDate: string
  goal: {
    type: 'problems' | 'streak' | 'accuracy' | 'xp'
    target: number
    subject?: 'math' | 'reading' | 'both'
  }
  rewards: {
    completion: string
    leaderboard: string[]
  }
  participants: number
  icon: string
  color: string
  status: 'upcoming' | 'active' | 'completed'
}

interface ViralChallengesProps {
  userProgress?: {
    math: SubjectProgressDisplay | null
    reading: SubjectProgressDisplay | null
  }
  onOpenChallenge?: (challenge: ViralChallenge) => void
}

// Generate dynamic challenge data with real dates and participant counts
function generateCurrentChallenges(): ViralChallenge[] {
  const now = new Date()
  const today = now.toISOString().split('T')[0]

  // Math Challenge: Always active, rolling 30-day window
  const mathStartDate = new Date(now)
  mathStartDate.setDate(mathStartDate.getDate() - 15) // Started 15 days ago
  const mathEndDate = new Date(mathStartDate)
  mathEndDate.setDate(mathEndDate.getDate() + 30)

  // Reading Challenge: Always active, rolling 21-day window
  const readingStartDate = new Date(now)
  readingStartDate.setDate(readingStartDate.getDate() - 7) // Started 7 days ago
  const readingEndDate = new Date(readingStartDate)
  readingEndDate.setDate(readingEndDate.getDate() + 21)

  // Accuracy Challenge: Monthly challenge
  const accuracyStartDate = new Date(now.getFullYear(), now.getMonth(), 1)
  const accuracyEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  // Real participant counts will be loaded from API
  // Default to 0 until loaded
  const baseParticipants = {
    math: 0,
    reading: 0,
    accuracy: 0,
  }

  return [
    {
      id: 'math_30_day',
      title: '30-Day Math Challenge',
      hashtag: '#30DayMathChallenge',
      description: 'Complete 5 math problems daily for 30 days straight',
      duration: 30,
      startDate: mathStartDate.toISOString().split('T')[0],
      endDate: mathEndDate.toISOString().split('T')[0],
      goal: { type: 'problems', target: 150, subject: 'math' }, // 5 problems × 30 days
      rewards: {
        completion: 'Math Champion Badge + $10 Gift Card',
        leaderboard: [
          'Math Champion Badge',
          'Top Achiever Certificate',
          'Excellence Medal',
        ],
      },
      participants: baseParticipants.math,
      icon: '🧮',
      color: 'from-b-math to-b-math-dark',
      status: 'active',
    },
    {
      id: 'reading_21_day',
      title: '21-Day Reading Sprint',
      hashtag: '#21DayReading',
      description:
        'Read and complete exercises daily for 21 days to build the habit',
      duration: 21,
      startDate: readingStartDate.toISOString().split('T')[0],
      endDate: readingEndDate.toISOString().split('T')[0],
      goal: { type: 'streak', target: 21, subject: 'reading' },
      rewards: {
        completion: 'Reading Champion Badge + $5 Gift Card',
        leaderboard: [
          'Reading Streak Badge',
          'Literacy Champion Certificate',
          'Bookworm Award',
        ],
      },
      participants: baseParticipants.reading,
      icon: '📖',
      color: 'from-b-reading to-b-reading-dark',
      status: 'active',
    },
    {
      id: 'monthly_perfectionist',
      title: 'Monthly Perfectionist',
      hashtag: '#MonthlyPerfectionist',
      description: 'Achieve 85%+ accuracy in both subjects this month',
      duration: 30,
      startDate: accuracyStartDate.toISOString().split('T')[0],
      endDate: accuracyEndDate.toISOString().split('T')[0],
      goal: { type: 'accuracy', target: 85, subject: 'both' },
      rewards: {
        completion: 'Perfectionist Badge + Progress Certificate',
        leaderboard: [
          'Accuracy Master Badge',
          'Precision Award',
          'Excellence Recognition',
        ],
      },
      participants: baseParticipants.accuracy,
      icon: '🎯',
      color: 'from-b-logic to-b-logic-dark',
      status:
        now >= accuracyStartDate && now <= accuracyEndDate
          ? 'active'
          : 'upcoming',
    },
  ]
}

const CURRENT_CHALLENGES = generateCurrentChallenges()

export function ViralChallenges({
  userProgress,
  onOpenChallenge,
}: ViralChallengesProps) {
  const { user } = useAuth()
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([])
  const [selectedChallenge, setSelectedChallenge] =
    useState<ViralChallenge | null>(null)
  const [participantCounts, setParticipantCounts] = useState<
    Record<string, number>
  >({})

  // Fetch user's joined challenges
  const { data: userChallengesData } = useApiQuery<{ challengeIds: string[] }>(
    '/api/basics/user-challenges',
    { skip: !user }
  )

  // Mutation hook for joining challenges
  const { mutate: joinChallenge } = useApiMutation('/api/basics/join-challenge')

  // Update joined challenges when data loads
  useEffect(() => {
    if (userChallengesData?.challengeIds) {
      setJoinedChallenges(userChallengesData.challengeIds)
    }
  }, [userChallengesData])

  // Load real participant counts for each challenge
  useEffect(() => {
    const loadParticipantCounts = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken()
        const challenges = CURRENT_CHALLENGES
        const counts: Record<string, number> = {}

        // Fetch all counts in parallel
        const countPromises = challenges.map(async (challenge) => {
          const countResponse = await fetch(
            `/api/basics/challenge-participants?challengeId=${challenge.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          if (countResponse.ok) {
            const countData = await countResponse.json()
            return { id: challenge.id, count: countData.count || 0 }
          }
          return { id: challenge.id, count: 0 }
        })

        const results = await Promise.all(countPromises)
        results.forEach((r) => {
          counts[r.id] = r.count
        })

        setParticipantCounts(counts)
      } catch (error) {
        logger.error('ViralChallenges', 'Failed to load participant counts', {
          error,
        })
      }
    }

    loadParticipantCounts()
  }, [user])

  const handleJoinChallenge = async (challenge: ViralChallenge) => {
    if (!user) {
      logger.error('ViralChallenges', 'No user logged in')
      return
    }

    const result = await joinChallenge({
      challengeId: challenge.id,
      userId: user.uid,
    })

    if (result) {
      setJoinedChallenges((prev) => [...prev, challenge.id])

      // Update participant count locally
      setParticipantCounts((prev) => ({
        ...prev,
        [challenge.id]: (prev[challenge.id] || 0) + 1,
      }))

      // Show success message (could add toast notification here)
      alert(
        `🎉 Successfully joined ${challenge.title}! Your progress will now be tracked.`
      )

      // Auto-share challenge join
      const shareText = `🚀 Just joined the ${challenge.title}! ${challenge.description}\n\nWho's with me? ${challenge.hashtag} #LearningChallenge #PitchRise`

      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        try {
          await navigator.share({
            title: challenge.title,
            text: shareText,
            url: window.location.href,
          })
        } catch {
          // User cancelled or share not supported
        }
      }
    } else {
      alert('Failed to join challenge. Please try again.')
    }
  }

  const getProgressInChallenge = (challenge: ViralChallenge) => {
    if (!userProgress) return 0

    switch (challenge.goal.type) {
      case 'problems':
        if (challenge.goal.subject === 'math') {
          return userProgress.math?.totalCompleted || 0
        }
        if (challenge.goal.subject === 'reading') {
          return userProgress.reading?.totalCompleted || 0
        }
        return (
          (userProgress.math?.totalCompleted || 0) +
          (userProgress.reading?.totalCompleted || 0)
        )

      case 'streak':
        if (challenge.goal.subject === 'math') {
          return userProgress.math?.currentStreak || 0
        }
        if (challenge.goal.subject === 'reading') {
          return userProgress.reading?.currentStreak || 0
        }
        // For both subjects, use the higher streak
        return Math.max(
          userProgress.math?.currentStreak || 0,
          userProgress.reading?.currentStreak || 0
        )

      case 'accuracy':
        const mathAcc = (userProgress.math?.accuracyRate || 0) * 100
        const readingAcc = (userProgress.reading?.accuracyRate || 0) * 100

        if (challenge.goal.subject === 'math') {
          return Math.round(mathAcc)
        }
        if (challenge.goal.subject === 'reading') {
          return Math.round(readingAcc)
        }
        // For both subjects, need both to meet the target
        return Math.min(Math.round(mathAcc), Math.round(readingAcc))

      case 'xp':
        if (challenge.goal.subject === 'math') {
          return userProgress.math?.totalXP || 0
        }
        if (challenge.goal.subject === 'reading') {
          return userProgress.reading?.totalXP || 0
        }
        return (
          (userProgress.math?.totalXP || 0) +
          (userProgress.reading?.totalXP || 0)
        )

      default:
        return 0
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold b-text-primary"
          style={{
            fontFamily:
              'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          Viral Challenges
        </h3>
        <div className="text-xs b-text-secondary">Limited Time</div>
      </div>

      {CURRENT_CHALLENGES.filter((c) => c.status === 'active')
        .slice(0, 2)
        .map((challenge) => {
          const userProgress = getProgressInChallenge(challenge)
          const progressPercent = Math.min(
            100,
            (userProgress / challenge.goal.target) * 100
          )
          const isJoined = joinedChallenges.includes(challenge.id)
          const participantCount = participantCounts[challenge.id] ?? 0

          return (
            <div
              key={challenge.id}
              className="bg-b-bg-card border b-border p-3 rounded-lg relative cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (onOpenChallenge) {
                  onOpenChallenge(challenge)
                } else {
                  setSelectedChallenge(challenge)
                }
              }}
            >
              <div className="absolute top-2 right-2 text-lg b-text-muted">
                {challenge.icon}
              </div>

              <div className="relative z-10">
                <div
                  className="font-bold text-sm mb-1 b-text-primary"
                  style={{
                    fontFamily:
                      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
                  }}
                >
                  {challenge.title}
                </div>
                <div className="text-xs b-text-secondary mb-2">
                  {challenge.hashtag}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="b-text-secondary">
                    {participantCount === 0
                      ? 'Be the first to join!'
                      : `${participantCount} ${participantCount === 1 ? 'person' : 'people'} joined`}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: 'var(--b-logic)',
                      color: 'white',
                    }}
                  >
                    View Details
                  </span>
                </div>

                {isJoined && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="b-text-secondary">Your Progress</span>
                      <span className="b-text-primary font-medium">
                        {userProgress}/{challenge.goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-b-border rounded-full h-1">
                      <div
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: 'var(--b-logic)',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

      {/* Challenge Detail Modal - Full Screen */}
      {!onOpenChallenge && selectedChallenge && (
        <Portal>
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedChallenge(null)}
          >
            <div
              className="b-bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`bg-gradient-to-r ${selectedChallenge.color} p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{selectedChallenge.icon}</div>
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="text-white/80 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {selectedChallenge.title}
                </h2>
                <p className="text-lg opacity-90 mb-4">
                  {selectedChallenge.hashtag}
                </p>
                <p className="text-sm opacity-80">
                  {selectedChallenge.description}
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Challenge Description */}
                <div>
                  <h3 className="font-semibold b-text-primary mb-3">
                    📋 Challenge Details
                  </h3>
                  <div className="b-bg-muted rounded-lg p-4">
                    <p className="b-text-secondary mb-4">
                      {selectedChallenge.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="b-text-secondary">Duration:</span>
                        <span className="font-medium ml-2">
                          {selectedChallenge.duration} days
                        </span>
                      </div>
                      <div>
                        <span className="b-text-secondary">Goal:</span>
                        <span className="font-medium ml-2">
                          {selectedChallenge.goal.target}{' '}
                          {selectedChallenge.goal.type}
                        </span>
                      </div>
                      <div>
                        <span className="b-text-secondary">Subject:</span>
                        <span className="font-medium ml-2">
                          {selectedChallenge.goal.subject || 'Both'}
                        </span>
                      </div>
                      <div>
                        <span className="b-text-secondary">Participants:</span>
                        <span className="font-medium ml-2">
                          {selectedChallenge.participants.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold b-text-primary mb-2">
                    🏆 Challenge Rewards
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="b-bg-math-light border b-border-math rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <span className="b-text-math">Completion Reward:</span>
                        <span className="font-medium b-text-math">
                          {selectedChallenge.rewards.completion}
                        </span>
                      </div>
                    </div>

                    <div className="b-bg-logic-light border b-border-logic rounded-lg p-3">
                      <div className="b-text-logic font-medium mb-2">
                        Leaderboard Recognition:
                      </div>
                      <ul className="space-y-1">
                        {selectedChallenge.rewards.leaderboard.map(
                          (prize, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between text-xs b-text-logic"
                            >
                              <span>#{idx + 1}</span>
                              <span className="font-medium">{prize}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="b-text-secondary">Participants:</span>
                  <span className="font-bold">
                    {(participantCounts[selectedChallenge.id] ?? 0) === 0
                      ? 'Be the first!'
                      : (
                          participantCounts[selectedChallenge.id] ?? 0
                        ).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="b-text-secondary">Duration:</span>
                  <span className="font-medium">
                    {selectedChallenge.duration} days
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {!joinedChallenges.includes(selectedChallenge.id) ? (
                    <>
                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          try {
                            await handleJoinChallenge(selectedChallenge)
                            // Modal stays open to show success state
                          } catch {
                            // Join failed, error already handled in handleJoinChallenge
                          }
                        }}
                        className={`w-full bg-gradient-to-r ${selectedChallenge.color} text-white py-4 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity text-lg shadow-lg hover:shadow-xl`}
                      >
                        🚀 Join Challenge
                      </button>
                      <div className="text-center text-xs b-text-muted">
                        Join now to track your progress and earn rewards!
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="b-bg-reading-light border b-border-reading rounded-lg p-4">
                        <div className="b-text-reading font-bold text-lg mb-2">
                          ✅ Challenge Joined!
                        </div>
                        <div className="text-sm b-text-reading mb-3">
                          Your progress is being tracked. Keep solving problems
                          to reach your goal!
                        </div>
                        <div className="text-xs b-text-reading">
                          Complete the challenge to earn your reward!
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress Tracking (if joined) */}
                  {joinedChallenges.includes(selectedChallenge.id) && (
                    <div className="b-bg-math-light border b-border-math rounded-lg p-4">
                      <h4 className="font-medium b-text-math mb-3">
                        Your Challenge Progress
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="b-text-math">Goal Progress:</span>
                          <span className="font-bold b-text-math">
                            {getProgressInChallenge(selectedChallenge)}/
                            {selectedChallenge.goal.target}
                          </span>
                        </div>
                        <div className="w-full b-bg-math-light rounded-full h-3">
                          <div
                            className="b-bg-math h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, (getProgressInChallenge(selectedChallenge) / selectedChallenge.goal.target) * 100)}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs b-text-math">
                          Keep going! You&apos;re{' '}
                          {Math.round(
                            (getProgressInChallenge(selectedChallenge) /
                              selectedChallenge.goal.target) *
                              100
                          )}
                          % of the way there.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
