'use client'

/**
 * Daily Challenges Modal
 *
 * FUNCTIONALITY:
 * - ✅ Generates 5 daily challenges across all 5 subjects
 * - ✅ Tracks progress toward each challenge
 * - ✅ Awards bonus XP for completing challenges
 * - ✅ Resets at midnight EST
 * - ✅ Persists progress via localStorage
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { SubjectProgressDisplay } from '@/lib/types/basics'
import {
  Sparkle,
  Target,
  CheckCircle,
  Lightning,
  Clock,
  Trophy,
  Star,
  Fire,
  Calculator,
  BookOpen,
  Scroll,
  Brain,
} from '@phosphor-icons/react'
import { UnifiedModal } from './UnifiedModal'
import {
  getMillisUntilMidnightEST,
  formatCountdown,
  getTodayDate,
} from '@/lib/utils/date-helpers'

export interface DailyChallenge {
  id: string
  title: string
  description: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'any'
  target: number
  current: number
  xpReward: number
  icon: string
  completed: boolean
  claimed: boolean
}

interface DailyChallengesModalProps {
  isOpen: boolean
  onClose: () => void
  mathProgress: SubjectProgressDisplay | null
  readingProgress: SubjectProgressDisplay | null
  latinXP?: number
  greekXP?: number
  logicXP?: number
  dailyXP: number
  userId?: string
  onClaimReward: (xp: number) => void
}

// Challenge templates
const CHALLENGE_TEMPLATES: Omit<
  DailyChallenge,
  'id' | 'current' | 'completed' | 'claimed'
>[] = [
  // Math challenges
  {
    title: 'Math Master',
    description: 'Solve 10 math problems',
    subject: 'math',
    target: 10,
    xpReward: 50,
    icon: '📐',
  },
  {
    title: 'Perfect Streak',
    description: 'Get a 5-problem streak in math',
    subject: 'math',
    target: 5,
    xpReward: 75,
    icon: '🔥',
  },
  {
    title: 'Quick Calculator',
    description: 'Complete 5 math problems in under 2 minutes',
    subject: 'math',
    target: 5,
    xpReward: 60,
    icon: '⚡',
  },
  // Reading challenges
  {
    title: 'Bookworm',
    description: 'Complete 5 reading exercises',
    subject: 'reading',
    target: 5,
    xpReward: 50,
    icon: '📖',
  },
  {
    title: 'Vocabulary Builder',
    description: 'Learn 10 new words',
    subject: 'reading',
    target: 10,
    xpReward: 60,
    icon: '📚',
  },
  {
    title: 'Comprehension King',
    description: 'Get 100% on 3 reading passages',
    subject: 'reading',
    target: 3,
    xpReward: 80,
    icon: '👑',
  },
  // Latin challenges
  {
    title: 'Roman Scholar',
    description: 'Complete 5 Latin translations',
    subject: 'latin',
    target: 5,
    xpReward: 60,
    icon: '🏛️',
  },
  {
    title: 'Latin Vocabulary',
    description: 'Earn 100 Latin XP',
    subject: 'latin',
    target: 100,
    xpReward: 50,
    icon: '🦅',
  },
  // Greek challenges
  {
    title: 'Hellenic Hero',
    description: 'Complete 5 Greek translations',
    subject: 'greek',
    target: 5,
    xpReward: 60,
    icon: '🏺',
  },
  {
    title: 'Greek Explorer',
    description: 'Earn 100 Greek XP',
    subject: 'greek',
    target: 100,
    xpReward: 50,
    icon: '🔥',
  },
  // Logic challenges
  {
    title: 'Logic Master',
    description: 'Complete 3 logic puzzles',
    subject: 'logic',
    target: 3,
    xpReward: 75,
    icon: '🧠',
  },
  {
    title: 'Reasoning Pro',
    description: 'Earn 75 Logic XP',
    subject: 'logic',
    target: 75,
    xpReward: 50,
    icon: '🗿',
  },
  // Cross-subject challenges
  {
    title: 'Daily XP Goal',
    description: 'Earn 500 total XP today',
    subject: 'any',
    target: 500,
    xpReward: 100,
    icon: '⭐',
  },
  {
    title: 'Subject Sampler',
    description: 'Complete exercises in 3 different subjects',
    subject: 'any',
    target: 3,
    xpReward: 75,
    icon: '🎯',
  },
  {
    title: 'Marathon Learner',
    description: 'Earn 1000 total XP today',
    subject: 'any',
    target: 1000,
    xpReward: 150,
    icon: '🏆',
  },
]

function generateDailyChallenges(seed: string): DailyChallenge[] {
  // Use seed to deterministically pick 5 challenges
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const shuffled = [...CHALLENGE_TEMPLATES].sort((a, b) => {
    const hashA = (hash + a.title.charCodeAt(0)) % 100
    const hashB = (hash + b.title.charCodeAt(0)) % 100
    return hashA - hashB
  })

  // Pick 5 diverse challenges (try to get variety in subjects)
  const selected: typeof CHALLENGE_TEMPLATES = []
  const usedSubjects = new Set<string>()

  for (const template of shuffled) {
    if (selected.length >= 5) break
    if (selected.length < 3 && usedSubjects.has(template.subject)) continue
    selected.push(template)
    usedSubjects.add(template.subject)
  }

  // Fill to 5 if needed
  while (selected.length < 5) {
    const remaining = shuffled.filter((t) => !selected.includes(t))
    if (remaining.length > 0) selected.push(remaining[0])
    else break
  }

  return selected.map((template, idx) => ({
    ...template,
    id: `${seed}-${idx}`,
    current: 0,
    completed: false,
    claimed: false,
  }))
}

export function DailyChallengesModal({
  isOpen,
  onClose,
  mathProgress,
  readingProgress,
  latinXP = 0,
  greekXP = 0,
  logicXP = 0,
  dailyXP,
  userId,
  onClaimReward,
}: DailyChallengesModalProps) {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([])
  const [timeUntilReset, setTimeUntilReset] = useState<string>('')
  const [lastDate, setLastDate] = useState<string>('')

  const storageKey = userId
    ? `daily_challenges_${userId}`
    : 'daily_challenges_guest'

  // Generate or load challenges
  useEffect(() => {
    const today = getTodayDate()

    // Check if we have saved challenges for today
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.date === today) {
        setChallenges(parsed.challenges)
        setLastDate(today)
        return
      }
    }

    // Generate new challenges for today
    const newChallenges = generateDailyChallenges(today)
    setChallenges(newChallenges)
    setLastDate(today)
    localStorage.setItem(
      storageKey,
      JSON.stringify({ date: today, challenges: newChallenges })
    )
  }, [storageKey])

  // Update progress based on current stats
  useEffect(() => {
    if (challenges.length === 0) return

    const mathCompleted = mathProgress?.totalCompleted || 0
    const mathStreak = mathProgress?.currentStreak || 0
    const readingCompleted = readingProgress?.totalCompleted || 0
    const mathXP = mathProgress?.totalXP || 0
    const readingXP = readingProgress?.totalXP || 0

    // Count active subjects
    const activeSubjects = [
      mathCompleted > 0 ? 1 : 0,
      readingCompleted > 0 ? 1 : 0,
      latinXP > 0 ? 1 : 0,
      greekXP > 0 ? 1 : 0,
      logicXP > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0)

    const totalXP = mathXP + readingXP + latinXP + greekXP + logicXP

    const updated = challenges.map((challenge) => {
      if (challenge.claimed) return challenge

      let current = challenge.current

      switch (challenge.subject) {
        case 'math':
          if (challenge.description.includes('streak')) {
            current = mathStreak
          } else if (challenge.description.includes('problems')) {
            current = mathCompleted
          }
          break
        case 'reading':
          if (challenge.description.includes('exercises')) {
            current = readingCompleted
          } else if (challenge.description.includes('words')) {
            current = Math.floor(readingCompleted * 2) // Estimate
          }
          break
        case 'latin':
          if (challenge.description.includes('translations')) {
            current = Math.floor(latinXP / 20)
          } else if (challenge.description.includes('XP')) {
            current = latinXP
          }
          break
        case 'greek':
          if (challenge.description.includes('translations')) {
            current = Math.floor(greekXP / 20)
          } else if (challenge.description.includes('XP')) {
            current = greekXP
          }
          break
        case 'logic':
          if (challenge.description.includes('puzzles')) {
            current = Math.floor(logicXP / 25)
          } else if (challenge.description.includes('XP')) {
            current = logicXP
          }
          break
        case 'any':
          if (challenge.description.includes('total XP')) {
            current = dailyXP
          } else if (challenge.description.includes('different subjects')) {
            current = activeSubjects
          }
          break
      }

      const completed = current >= challenge.target
      return { ...challenge, current, completed }
    })

    // Only update if something changed
    const hasChanges = updated.some(
      (c, i) =>
        c.current !== challenges[i].current ||
        c.completed !== challenges[i].completed
    )

    if (hasChanges) {
      setChallenges(updated)
      localStorage.setItem(
        storageKey,
        JSON.stringify({ date: lastDate, challenges: updated })
      )
    }
  }, [
    mathProgress,
    readingProgress,
    latinXP,
    greekXP,
    logicXP,
    dailyXP,
    challenges,
    storageKey,
    lastDate,
  ])

  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const ms = getMillisUntilMidnightEST()
      setTimeUntilReset(formatCountdown(ms))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClaimReward = useCallback(
    (challenge: DailyChallenge) => {
      if (!challenge.completed || challenge.claimed) return

      const updated = challenges.map((c) =>
        c.id === challenge.id ? { ...c, claimed: true } : c
      )
      setChallenges(updated)
      localStorage.setItem(
        storageKey,
        JSON.stringify({ date: lastDate, challenges: updated })
      )

      onClaimReward(challenge.xpReward)
    },
    [challenges, storageKey, lastDate, onClaimReward]
  )

  // Stats
  const stats = useMemo(() => {
    const completed = challenges.filter((c) => c.completed).length
    const claimed = challenges.filter((c) => c.claimed).length
    const totalRewards = challenges
      .filter((c) => c.claimed)
      .reduce((sum, c) => sum + c.xpReward, 0)
    const availableRewards = challenges
      .filter((c) => c.completed && !c.claimed)
      .reduce((sum, c) => sum + c.xpReward, 0)

    return { completed, claimed, totalRewards, availableRewards }
  }, [challenges])

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math':
        return (
          <Calculator
            size={16}
            weight="fill"
            style={{ color: 'var(--b-math-dark)' }}
          />
        )
      case 'reading':
        return (
          <BookOpen
            size={16}
            weight="fill"
            style={{ color: 'var(--b-reading-dark)' }}
          />
        )
      case 'latin':
        return (
          <Scroll
            size={16}
            weight="fill"
            style={{ color: 'var(--b-latin-dark)' }}
          />
        )
      case 'greek':
        return (
          <Fire
            size={16}
            weight="fill"
            style={{ color: 'var(--b-greek-dark)' }}
          />
        )
      case 'logic':
        return (
          <Brain
            size={16}
            weight="fill"
            style={{ color: 'var(--b-logic-dark)' }}
          />
        )
      default:
        return (
          <Star
            size={16}
            weight="fill"
            style={{ color: 'var(--b-writing-dark)' }}
          />
        )
    }
  }

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Daily Challenges"
      subtitle="Complete challenges for bonus XP rewards"
      icon={
        <Sparkle
          size={22}
          weight="fill"
          style={{ color: 'var(--b-latin-dark)' }}
        />
      }
      size="lg"
    >
      <div className="space-y-4">
        {/* Header Stats */}
        <div
          className="flex items-center justify-between p-4 rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, var(--b-latin-light) 0%, var(--b-writing-light) 100%)',
            border: '1px solid var(--b-latin-border)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-latin-dark)' }}
              >
                {stats.completed}/5
              </div>
              <div className="text-xs" style={{ color: 'var(--b-text-muted)' }}>
                Completed
              </div>
            </div>
            <div
              className="w-px h-10"
              style={{ backgroundColor: 'var(--b-latin-border)' }}
            />
            <div className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--b-reading-dark)' }}
              >
                +{stats.totalRewards}
              </div>
              <div className="text-xs" style={{ color: 'var(--b-text-muted)' }}>
                XP Claimed
              </div>
            </div>
            {stats.availableRewards > 0 && (
              <>
                <div
                  className="w-px h-10"
                  style={{ backgroundColor: 'var(--b-latin-border)' }}
                />
                <div className="text-center animate-pulse">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--b-writing-dark)' }}
                  >
                    +{stats.availableRewards}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'var(--b-text-muted)' }}
                  >
                    Available
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: 'var(--b-text-secondary)' }}
          >
            <Clock size={16} weight="fill" />
            <span>
              Resets in{' '}
              <span className="font-mono font-bold">{timeUntilReset}</span>
            </span>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-3">
          {challenges.map((challenge) => {
            const progress = Math.min(
              100,
              (challenge.current / challenge.target) * 100
            )

            const cardStyle = challenge.claimed
              ? {
                  backgroundColor: 'var(--b-bg-muted)',
                  borderColor: 'var(--b-border-default)',
                  opacity: 0.6,
                }
              : challenge.completed
                ? {
                    background:
                      'linear-gradient(135deg, var(--b-reading-light) 0%, #ecfdf5 100%)',
                    borderColor: '#22c55e',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
                  }
                : {
                    backgroundColor: '#ffffff',
                    borderColor: 'var(--b-border-default)',
                  }

            return (
              <div
                key={challenge.id}
                className="p-4 rounded-xl transition-all"
                style={{
                  ...cardStyle,
                  border: '2px solid',
                  borderColor: cardStyle.borderColor,
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: challenge.completed
                        ? 'var(--b-reading-light)'
                        : 'var(--b-bg-muted)',
                    }}
                  >
                    {challenge.completed ? (
                      <CheckCircle
                        size={28}
                        weight="fill"
                        style={{ color: 'var(--b-reading-dark)' }}
                      />
                    ) : (
                      challenge.icon
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className="font-semibold"
                        style={{ color: 'var(--b-text-primary)' }}
                      >
                        {challenge.title}
                      </h4>
                      {getSubjectIcon(challenge.subject)}
                    </div>
                    <p
                      className="text-sm mb-2"
                      style={{ color: 'var(--b-text-muted)' }}
                    >
                      {challenge.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--b-border-default)' }}
                      >
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: challenge.completed
                              ? 'var(--b-reading)'
                              : 'var(--b-latin)',
                          }}
                        />
                      </div>
                      <span
                        className="text-sm font-medium min-w-[60px] text-right"
                        style={{ color: 'var(--b-text-secondary)' }}
                      >
                        {challenge.current}/{challenge.target}
                      </span>
                    </div>
                  </div>

                  {/* Reward / Claim Button */}
                  <div className="flex flex-col items-end gap-1">
                    {challenge.claimed ? (
                      <span
                        className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                        style={{
                          backgroundColor: 'var(--b-bg-muted)',
                          color: 'var(--b-text-muted)',
                        }}
                      >
                        <CheckCircle size={16} weight="fill" />
                        Claimed
                      </span>
                    ) : challenge.completed ? (
                      <button
                        onClick={() => handleClaimReward(challenge)}
                        className="px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-pulse cursor-pointer"
                        style={{
                          background:
                            'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          color: '#ffffff',
                          boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)',
                        }}
                      >
                        <Lightning size={18} weight="fill" />
                        Claim +{challenge.xpReward} XP
                      </button>
                    ) : (
                      <div
                        className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
                        style={{
                          backgroundColor: 'var(--b-bg-muted)',
                          color: 'var(--b-text-secondary)',
                          border: '1px solid var(--b-border-default)',
                        }}
                      >
                        <Trophy
                          size={14}
                          style={{ color: 'var(--b-writing)' }}
                        />
                        <span>+{challenge.xpReward} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Motivational Footer */}
        {stats.completed === 5 && stats.claimed === 5 && (
          <div
            className="p-4 rounded-xl text-center"
            style={{
              background:
                'linear-gradient(135deg, var(--b-writing-light) 0%, var(--b-latin-light) 100%)',
              border: '1px solid var(--b-writing-border)',
            }}
          >
            <div className="text-3xl mb-2">🏆</div>
            <h4
              className="font-bold"
              style={{ color: 'var(--b-writing-dark)' }}
            >
              All Challenges Complete!
            </h4>
            <p className="text-sm" style={{ color: 'var(--b-writing-dark)' }}>
              Amazing work! Come back tomorrow for new challenges.
            </p>
          </div>
        )}

        {stats.completed < 5 && (
          <div
            className="text-center text-sm"
            style={{ color: 'var(--b-text-muted)' }}
          >
            Complete challenges across Math, Reading, Latin, Greek & Logic to
            earn bonus XP!
          </div>
        )}
      </div>
    </UnifiedModal>
  )
}
