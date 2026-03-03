'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Trophy,
  Medal,
  Star,
  Lightning,
  Fire,
  Target,
  Clock,
  CheckCircle,
  CurrencyCircleDollar,
  Lock,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevSkeleton,
  DevBadge,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { toDate } from '@/lib/utils/timestamp'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'completions' | 'streaks' | 'speed' | 'revenue' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  requirement: number
  progress: number
  unlocked: boolean
  unlockedAt?: string
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  completionDates: string[]
  totalCompletions: number
}

const ACHIEVEMENT_COLORS = {
  common: {
    bg: 'rgba(156, 163, 175, 0.2)',
    border: '#9CA3AF',
    text: '#9CA3AF',
  },
  rare: { bg: 'rgba(59, 130, 246, 0.2)', border: '#3B82F6', text: '#3B82F6' },
  epic: { bg: 'rgba(139, 92, 246, 0.2)', border: '#8B5CF6', text: '#8B5CF6' },
  legendary: {
    bg: 'rgba(245, 158, 11, 0.2)',
    border: '#F59E0B',
    text: '#F59E0B',
  },
}

/**
 * Achievements Page - Gamification badges and progress
 */
export default function AchievementsPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [streakLoading, setStreakLoading] = useState(true)

  // Fetch streak data
  useEffect(() => {
    const fetchStreaks = async () => {
      if (!user) return
      setStreakLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/streaks', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()
        if (json.success && json.data) {
          setStreakData(json.data)
        }
      } catch {
        // Silent fail
      } finally {
        setStreakLoading(false)
      }
    }

    fetchStreaks()
  }, [user])

  // Calculate achievements based on real data
  const achievements = useMemo(() => {
    // Count my completions
    const myCompleted = submissions.filter(
      (s) =>
        s.status === 'completed' && (isAdminView || s.assignedTo === user?.uid)
    )
    const completionCount = myCompleted.length

    // Count active documents
    const activeCount = submissions.filter(
      (s) =>
        s.status === 'in-progress' &&
        (isAdminView || s.assignedTo === user?.uid)
    ).length

    // Calculate revenue (sum of actualCostCents * 3 margin)
    const totalRevenueCents = myCompleted.reduce((sum, s) => {
      const cost = s.actualCostCents || 0
      return sum + cost * 3 // 3x markup
    }, 0)
    const totalRevenue = totalRevenueCents / 100

    // Get streak info
    const currentStreak = streakData?.currentStreak || 0
    const longestStreak = streakData?.longestStreak || 0
    const completionDates = streakData?.completionDates || []

    // Calculate completions this week
    const now = new Date()
    const weekAgo = new Date(now)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekAgoStr = weekAgo.toISOString().split('T')[0]
    const completionsThisWeek = completionDates.filter(
      (d) => d >= weekAgoStr
    ).length

    // Calculate completions today
    const todayStr = now.toISOString().split('T')[0]
    const completionsToday = completionDates.filter(
      (d) => d === todayStr
    ).length

    // Check for early bird / night owl (check completion times)
    let hasEarlyBird = false
    let hasNightOwl = false
    myCompleted.forEach((s) => {
      const completedAt = s.completedAt
        ? toDate(s.completedAt)
        : s.approvedAt
          ? toDate(s.approvedAt)
          : null
      if (completedAt) {
        const hour = completedAt.getHours()
        if (hour < 8) hasEarlyBird = true
        if (hour >= 0 && hour < 5) hasNightOwl = true
      }
    })

    // Define all achievements
    const allAchievements: Achievement[] = [
      // Completion achievements
      {
        id: 'first-completion',
        title: 'First Steps',
        description: 'Complete your first document',
        icon: <CheckCircle size={24} />,
        category: 'completions',
        rarity: 'common',
        requirement: 1,
        progress: completionCount,
        unlocked: completionCount >= 1,
      },
      {
        id: 'ten-completions',
        title: 'Getting Started',
        description: 'Complete 10 documents',
        icon: <Target size={24} />,
        category: 'completions',
        rarity: 'common',
        requirement: 10,
        progress: completionCount,
        unlocked: completionCount >= 10,
      },
      {
        id: 'fifty-completions',
        title: 'Prolific',
        description: 'Complete 50 documents',
        icon: <Star size={24} />,
        category: 'completions',
        rarity: 'rare',
        requirement: 50,
        progress: completionCount,
        unlocked: completionCount >= 50,
      },
      {
        id: 'century-club',
        title: 'Century Club',
        description: 'Complete 100 documents',
        icon: <Trophy size={24} />,
        category: 'completions',
        rarity: 'epic',
        requirement: 100,
        progress: completionCount,
        unlocked: completionCount >= 100,
      },
      {
        id: 'document-master',
        title: 'Document Master',
        description: 'Complete 500 documents',
        icon: <Medal size={24} />,
        category: 'completions',
        rarity: 'legendary',
        requirement: 500,
        progress: completionCount,
        unlocked: completionCount >= 500,
      },

      // Streak achievements (using real streak data)
      {
        id: 'three-day-streak',
        title: 'On a Roll',
        description: 'Maintain a 3-day completion streak',
        icon: <Fire size={24} />,
        category: 'streaks',
        rarity: 'common',
        requirement: 3,
        progress: Math.max(currentStreak, longestStreak),
        unlocked: longestStreak >= 3,
      },
      {
        id: 'week-streak',
        title: 'Consistent',
        description: 'Maintain a 7-day completion streak',
        icon: <Fire size={24} />,
        category: 'streaks',
        rarity: 'rare',
        requirement: 7,
        progress: Math.max(currentStreak, longestStreak),
        unlocked: longestStreak >= 7,
      },
      {
        id: 'two-week-streak',
        title: 'Dedicated',
        description: 'Maintain a 14-day completion streak',
        icon: <Fire size={24} />,
        category: 'streaks',
        rarity: 'epic',
        requirement: 14,
        progress: Math.max(currentStreak, longestStreak),
        unlocked: longestStreak >= 14,
      },
      {
        id: 'month-streak',
        title: 'Unstoppable',
        description: 'Maintain a 30-day completion streak',
        icon: <Fire size={24} />,
        category: 'streaks',
        rarity: 'legendary',
        requirement: 30,
        progress: Math.max(currentStreak, longestStreak),
        unlocked: longestStreak >= 30,
      },

      // Speed achievements
      {
        id: 'quick-finisher',
        title: 'Quick Finisher',
        description: 'Complete 3 documents in one day',
        icon: <Lightning size={24} />,
        category: 'speed',
        rarity: 'rare',
        requirement: 3,
        progress: completionsToday,
        unlocked: completionsToday >= 3,
      },
      {
        id: 'speed-demon',
        title: 'Speed Demon',
        description: 'Complete 10 documents in one week',
        icon: <Lightning size={24} />,
        category: 'speed',
        rarity: 'epic',
        requirement: 10,
        progress: completionsThisWeek,
        unlocked: completionsThisWeek >= 10,
      },
      {
        id: 'multitasker',
        title: 'Multitasker',
        description: 'Have 5 documents in progress at once',
        icon: <Clock size={24} />,
        category: 'speed',
        rarity: 'rare',
        requirement: 5,
        progress: activeCount,
        unlocked: activeCount >= 5,
      },

      // Revenue achievements
      {
        id: 'first-thousand',
        title: 'First Thousand',
        description: 'Earn $1,000 in revenue',
        icon: <CurrencyCircleDollar size={24} />,
        category: 'revenue',
        rarity: 'common',
        requirement: 1000,
        progress: Math.round(totalRevenue),
        unlocked: totalRevenue >= 1000,
      },
      {
        id: 'five-thousand',
        title: 'Revenue Driver',
        description: 'Earn $5,000 in revenue',
        icon: <CurrencyCircleDollar size={24} />,
        category: 'revenue',
        rarity: 'rare',
        requirement: 5000,
        progress: Math.round(totalRevenue),
        unlocked: totalRevenue >= 5000,
      },
      {
        id: 'ten-thousand',
        title: 'Revenue Champion',
        description: 'Earn $10,000 in revenue',
        icon: <CurrencyCircleDollar size={24} />,
        category: 'revenue',
        rarity: 'epic',
        requirement: 10000,
        progress: Math.round(totalRevenue),
        unlocked: totalRevenue >= 10000,
      },
      {
        id: 'fifty-thousand',
        title: 'Revenue Legend',
        description: 'Earn $50,000 in revenue',
        icon: <Trophy size={24} />,
        category: 'revenue',
        rarity: 'legendary',
        requirement: 50000,
        progress: Math.round(totalRevenue),
        unlocked: totalRevenue >= 50000,
      },

      // Special achievements
      {
        id: 'early-bird',
        title: 'Early Bird',
        description: 'Complete a document before 8 AM',
        icon: <Star size={24} />,
        category: 'special',
        rarity: 'rare',
        requirement: 1,
        progress: hasEarlyBird ? 1 : 0,
        unlocked: hasEarlyBird,
      },
      {
        id: 'night-owl',
        title: 'Night Owl',
        description: 'Complete a document after midnight',
        icon: <Star size={24} />,
        category: 'special',
        rarity: 'rare',
        requirement: 1,
        progress: hasNightOwl ? 1 : 0,
        unlocked: hasNightOwl,
      },
    ]

    return allAchievements
  }, [submissions, user?.uid, isAdminView, streakData])

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => {
      const points = { common: 10, rare: 25, epic: 50, legendary: 100 }
      return sum + points[a.rarity]
    }, 0)

  // Group by category
  const categories = [
    {
      id: 'completions',
      label: 'Completions',
      icon: <CheckCircle size={16} />,
    },
    { id: 'streaks', label: 'Streaks', icon: <Fire size={16} /> },
    { id: 'speed', label: 'Speed & Efficiency', icon: <Lightning size={16} /> },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: <CurrencyCircleDollar size={16} />,
    },
    { id: 'special', label: 'Special', icon: <Star size={16} /> },
  ]

  if (loading || streakLoading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 'var(--dev-space-4) var(--dev-space-5)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--dev-space-4)',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <DevSkeleton key={i} height={120} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--dev-text-xl)',
            fontWeight: 'var(--dev-font-semibold)',
            marginBottom: 'var(--dev-space-1)',
          }}
        >
          Achievements
        </h1>
        <p
          style={{
            color: 'var(--dev-text-muted)',
            fontSize: 'var(--dev-text-sm)',
          }}
        >
          Track your progress and unlock badges • Current streak:{' '}
          {streakData?.currentStreak || 0} days
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Summary */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--dev-space-4)',
            marginBottom: 'var(--dev-space-6)',
          }}
        >
          <DevCard padding="md" style={{ textAlign: 'center' }}>
            <Trophy
              size={32}
              style={{ color: '#F59E0B', marginBottom: 'var(--dev-space-2)' }}
            />
            <div
              style={{
                fontSize: 'var(--dev-text-2xl)',
                fontWeight: 'var(--dev-font-bold)',
              }}
            >
              {unlockedCount}
            </div>
            <div
              style={{
                fontSize: 'var(--dev-text-sm)',
                color: 'var(--dev-text-muted)',
              }}
            >
              of {achievements.length} Unlocked
            </div>
          </DevCard>
          <DevCard padding="md" style={{ textAlign: 'center' }}>
            <Star
              size={32}
              style={{ color: '#6366F1', marginBottom: 'var(--dev-space-2)' }}
            />
            <div
              style={{
                fontSize: 'var(--dev-text-2xl)',
                fontWeight: 'var(--dev-font-bold)',
              }}
            >
              {totalPoints}
            </div>
            <div
              style={{
                fontSize: 'var(--dev-text-sm)',
                color: 'var(--dev-text-muted)',
              }}
            >
              Total Points
            </div>
          </DevCard>
          <DevCard padding="md" style={{ textAlign: 'center' }}>
            <Fire
              size={32}
              style={{ color: '#EF4444', marginBottom: 'var(--dev-space-2)' }}
            />
            <div
              style={{
                fontSize: 'var(--dev-text-2xl)',
                fontWeight: 'var(--dev-font-bold)',
              }}
            >
              {streakData?.longestStreak || 0}
            </div>
            <div
              style={{
                fontSize: 'var(--dev-text-sm)',
                color: 'var(--dev-text-muted)',
              }}
            >
              Longest Streak
            </div>
          </DevCard>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 'var(--dev-space-6)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--dev-space-2)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--dev-text-sm)',
                color: 'var(--dev-text-secondary)',
              }}
            >
              Overall Progress
            </span>
            <span
              style={{
                fontSize: 'var(--dev-text-sm)',
                fontWeight: 'var(--dev-font-medium)',
              }}
            >
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </span>
          </div>
          <DevProgress
            value={(unlockedCount / achievements.length) * 100}
            size="lg"
            color="primary"
          />
        </div>

        {/* Achievements by Category */}
        {categories.map((category) => {
          const categoryAchievements = achievements.filter(
            (a) => a.category === category.id
          )
          if (categoryAchievements.length === 0) return null

          return (
            <div
              key={category.id}
              style={{ marginBottom: 'var(--dev-space-6)' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-2)',
                  marginBottom: 'var(--dev-space-3)',
                  color: 'var(--dev-text-secondary)',
                }}
              >
                {category.icon}
                <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>
                  {category.label}
                </span>
                <DevBadge variant="default" size="sm">
                  {categoryAchievements.filter((a) => a.unlocked).length}/
                  {categoryAchievements.length}
                </DevBadge>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--dev-space-3)',
                }}
              >
                {categoryAchievements.map((achievement) => {
                  const colors = ACHIEVEMENT_COLORS[achievement.rarity]
                  const progressPercent = Math.min(
                    (achievement.progress / achievement.requirement) * 100,
                    100
                  )

                  return (
                    <DevCard
                      key={achievement.id}
                      padding="md"
                      style={{
                        opacity: achievement.unlocked ? 1 : 0.6,
                        border: achievement.unlocked
                          ? `2px solid ${colors.border}`
                          : undefined,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--dev-space-3)',
                        }}
                      >
                        {/* Icon */}
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 'var(--dev-radius-lg)',
                            background: achievement.unlocked
                              ? colors.bg
                              : 'var(--dev-bg-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: achievement.unlocked
                              ? colors.text
                              : 'var(--dev-text-muted)',
                            flexShrink: 0,
                            position: 'relative',
                          }}
                        >
                          {achievement.unlocked ? (
                            achievement.icon
                          ) : (
                            <Lock size={24} />
                          )}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--dev-space-2)',
                              marginBottom: 2,
                            }}
                          >
                            <span
                              style={{
                                fontWeight: 'var(--dev-font-semibold)',
                                fontSize: 'var(--dev-text-sm)',
                              }}
                            >
                              {achievement.title}
                            </span>
                            <DevBadge
                              variant={
                                achievement.rarity === 'legendary'
                                  ? 'warning'
                                  : achievement.rarity === 'epic'
                                    ? 'primary'
                                    : achievement.rarity === 'rare'
                                      ? 'info'
                                      : 'default'
                              }
                              size="sm"
                            >
                              {achievement.rarity}
                            </DevBadge>
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--dev-text-xs)',
                              color: 'var(--dev-text-muted)',
                              marginBottom: 'var(--dev-space-2)',
                            }}
                          >
                            {achievement.description}
                          </div>

                          {/* Progress bar */}
                          {!achievement.unlocked && (
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  fontSize: 'var(--dev-text-2xs)',
                                  color: 'var(--dev-text-muted)',
                                  marginBottom: 2,
                                }}
                              >
                                <span>Progress</span>
                                <span>
                                  {achievement.category === 'revenue'
                                    ? `$${achievement.progress.toLocaleString()}/$${achievement.requirement.toLocaleString()}`
                                    : `${achievement.progress}/${achievement.requirement}`}
                                </span>
                              </div>
                              <DevProgress value={progressPercent} size="sm" />
                            </div>
                          )}

                          {achievement.unlocked && (
                            <div
                              style={{
                                fontSize: 'var(--dev-text-xs)',
                                color: 'var(--dev-accent-success)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              <CheckCircle size={12} weight="fill" />
                              Unlocked!
                            </div>
                          )}
                        </div>
                      </div>
                    </DevCard>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
