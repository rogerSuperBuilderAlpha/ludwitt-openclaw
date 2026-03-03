'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  User,
  Envelope,
  Calendar,
  Trophy,
  Fire,
  CheckCircle,
  Clock,
  Star,
  PencilSimple,
  Camera,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevSkeleton,
  DevBadge,
  DevButton,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { toDate } from '@/lib/utils/timestamp'

interface DeveloperStats {
  totalCompleted: number
  activeDocuments: number
  completedThisWeek: number
  currentStreak: number
  longestStreak: number
  avgCompletionTime: string
  totalRevenue: number
  memberSince: string
}

/**
 * Profile Page - Developer profile and stats overview
 */
export default function ProfilePage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName)
    }
  }, [user?.displayName])

  // Calculate stats from submissions
  const stats: DeveloperStats = useMemo(() => {
    const mySubmissions = submissions.filter(
      (s) => isAdminView || s.assignedTo === user?.uid
    )

    const completed = mySubmissions.filter((s) => s.status === 'completed')
    const active = mySubmissions.filter((s) => s.status === 'in-progress')

    // Calculate this week's completions
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const completedThisWeek = completed.filter((s) => {
      const completedAt = s.completedAt ? toDate(s.completedAt) : null
      return completedAt && completedAt >= weekAgo
    })

    // Calculate total revenue
    const totalRevenue = completed.reduce((sum, s) => {
      return sum + (s.actualCostCents || 0)
    }, 0)

    return {
      totalCompleted: completed.length,
      activeDocuments: active.length,
      completedThisWeek: completedThisWeek.length,
      currentStreak: 0, // Would need daily tracking
      longestStreak: 0,
      avgCompletionTime: '2.5 days',
      totalRevenue,
      memberSince: (() => {
        if (!user?.metadata?.creationTime) return 'Unknown'
        const date = new Date(user.metadata.creationTime)
        if (isNaN(date.getTime()) || !isFinite(date.getTime())) return 'Unknown'
        return date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      })(),
    }
  }, [submissions, user?.uid, isAdminView, user?.metadata?.creationTime])

  // Calculate level and XP
  const xpInfo = useMemo(() => {
    const xpPerCompletion = 100
    const totalXp = stats.totalCompleted * xpPerCompletion
    const level = Math.floor(totalXp / 1000) + 1
    const xpInLevel = totalXp % 1000
    const xpNeeded = 1000

    return {
      totalXp,
      level,
      xpInLevel,
      xpNeeded,
      progress: (xpInLevel / xpNeeded) * 100,
    }
  }, [stats.totalCompleted])

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
          <DevSkeleton width={200} height={32} />
        </div>
        <div className="flex-1 p-[var(--dev-space-5)]">
          <DevSkeleton height={200} className="mb-5" />
          <DevSkeleton height={100} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
        <h1 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-1)]">
          Profile
        </h1>
        <p className="text-[var(--dev-text-muted)] text-[length:var(--dev-text-sm)]">
          Your developer profile and statistics
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-[var(--dev-space-5)]">
        {/* Profile Card */}
        <DevCard padding="lg" className="mb-[var(--dev-space-5)]">
          <div className="flex gap-[var(--dev-space-5)] flex-wrap">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-white text-[length:var(--dev-text-3xl)] font-[var(--dev-font-bold)]"
                style={{
                  background: user?.photoURL
                    ? `url(${user.photoURL}) center/cover`
                    : 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                }}
              >
                {!user?.photoURL &&
                  (user?.displayName?.charAt(0).toUpperCase() || 'D')}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--dev-bg-elevated)] border-2 border-[var(--dev-bg-primary)] flex items-center justify-center cursor-pointer">
                <Camera size={14} />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-[var(--dev-space-2)] mb-[var(--dev-space-2)]">
                {editing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)] bg-[var(--dev-bg-muted)] border border-[var(--dev-border-default)] rounded-[var(--dev-radius-md)] px-2 py-1 text-[var(--dev-text-primary)]"
                  />
                ) : (
                  <h2 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]">
                    {user?.displayName || 'Developer'}
                  </h2>
                )}
                <button
                  onClick={() => setEditing(!editing)}
                  className="bg-none border-none cursor-pointer text-[var(--dev-text-muted)] p-1"
                >
                  <PencilSimple size={14} />
                </button>
                <DevBadge variant="primary">Level {xpInfo.level}</DevBadge>
              </div>

              <div className="flex flex-col gap-[var(--dev-space-1)] text-[var(--dev-text-secondary)] text-[length:var(--dev-text-sm)]">
                <div className="flex items-center gap-[var(--dev-space-2)]">
                  <Envelope size={14} />
                  {user?.email}
                </div>
                <div className="flex items-center gap-[var(--dev-space-2)]">
                  <Calendar size={14} />
                  Member since {stats.memberSince}
                </div>
              </div>

              {/* XP Progress */}
              <div className="mt-[var(--dev-space-4)]">
                <div className="flex justify-between mb-1 text-[length:var(--dev-text-xs)]">
                  <span className="text-[var(--dev-text-muted)]">
                    Level {xpInfo.level}
                  </span>
                  <span className="text-[var(--dev-text-muted)]">
                    {xpInfo.xpInLevel} / {xpInfo.xpNeeded} XP
                  </span>
                </div>
                <DevProgress
                  value={xpInfo.progress}
                  size="md"
                  color="primary"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-[var(--dev-space-4)] pl-[var(--dev-space-5)] border-l border-[var(--dev-border-subtle)]">
              <div className="text-center">
                <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)] text-[var(--dev-accent-success)]">
                  {stats.totalCompleted}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)] text-[var(--dev-accent-primary)]">
                  {stats.activeDocuments}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Active
                </div>
              </div>
              <div className="text-center">
                <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)] text-[var(--dev-status-available)]">
                  {stats.currentStreak}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Day Streak
                </div>
              </div>
              <div className="text-center">
                <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)]">
                  ${(stats.totalRevenue / 100).toFixed(0)}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Revenue
                </div>
              </div>
            </div>
          </div>
        </DevCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[var(--dev-space-4)] mb-[var(--dev-space-5)]">
          <DevCard padding="md">
            <div className="flex items-center gap-[var(--dev-space-3)]">
              <div className="w-11 h-11 rounded-[var(--dev-radius-lg)] bg-[rgba(34,197,94,0.15)] flex items-center justify-center text-[var(--dev-accent-success)]">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]">
                  {stats.completedThisWeek}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Completed This Week
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div className="flex items-center gap-[var(--dev-space-3)]">
              <div className="w-11 h-11 rounded-[var(--dev-radius-lg)] bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[var(--dev-status-available)]">
                <Fire size={24} />
              </div>
              <div>
                <div className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]">
                  {stats.longestStreak} days
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Longest Streak
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div className="flex items-center gap-[var(--dev-space-3)]">
              <div className="w-11 h-11 rounded-[var(--dev-radius-lg)] bg-[rgba(99,102,241,0.15)] flex items-center justify-center text-[var(--dev-accent-primary)]">
                <Clock size={24} />
              </div>
              <div>
                <div className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]">
                  {stats.avgCompletionTime}
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Avg Completion Time
                </div>
              </div>
            </div>
          </DevCard>

          <DevCard padding="md">
            <div className="flex items-center gap-[var(--dev-space-3)]">
              <div className="w-11 h-11 rounded-[var(--dev-radius-lg)] bg-[rgba(139,92,246,0.15)] flex items-center justify-center text-[#8B5CF6]">
                <Trophy size={24} />
              </div>
              <div>
                <div className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]">
                  {xpInfo.totalXp} XP
                </div>
                <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                  Total Experience
                </div>
              </div>
            </div>
          </DevCard>
        </div>

        {/* Recent Achievements */}
        <DevCard padding="md">
          <div className="flex justify-between items-center mb-[var(--dev-space-4)]">
            <h3 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)]">
              Recent Achievements
            </h3>
            <DevButton
              variant="ghost"
              size="sm"
              href="/developers/achievements"
            >
              View All
            </DevButton>
          </div>

          {stats.totalCompleted === 0 ? (
            <div className="text-center p-[var(--dev-space-6)] text-[var(--dev-text-muted)]">
              <Trophy
                size={32}
                className="mb-[var(--dev-space-2)] opacity-50"
              />
              <p className="text-[length:var(--dev-text-sm)]">
                Complete documents to unlock achievements!
              </p>
            </div>
          ) : (
            <div className="flex gap-[var(--dev-space-4)] flex-wrap">
              {stats.totalCompleted >= 1 && (
                <div className="flex items-center gap-[var(--dev-space-2)] py-[var(--dev-space-2)] px-[var(--dev-space-3)] bg-[rgba(156,163,175,0.15)] rounded-[var(--dev-radius-lg)] border border-[#9CA3AF]">
                  <CheckCircle size={20} className="text-[#9CA3AF]" />
                  <span className="text-[length:var(--dev-text-sm)]">
                    First Steps
                  </span>
                </div>
              )}
              {stats.totalCompleted >= 10 && (
                <div className="flex items-center gap-[var(--dev-space-2)] py-[var(--dev-space-2)] px-[var(--dev-space-3)] bg-[rgba(156,163,175,0.15)] rounded-[var(--dev-radius-lg)] border border-[#9CA3AF]">
                  <Star size={20} className="text-[#9CA3AF]" />
                  <span className="text-[length:var(--dev-text-sm)]">
                    Getting Started
                  </span>
                </div>
              )}
              {stats.totalCompleted >= 50 && (
                <div className="flex items-center gap-[var(--dev-space-2)] py-[var(--dev-space-2)] px-[var(--dev-space-3)] bg-[rgba(59,130,246,0.15)] rounded-[var(--dev-radius-lg)] border border-[#3B82F6]">
                  <Trophy size={20} className="text-[#3B82F6]" />
                  <span className="text-[length:var(--dev-text-sm)]">
                    Prolific
                  </span>
                </div>
              )}
            </div>
          )}
        </DevCard>
      </div>
    </div>
  )
}
