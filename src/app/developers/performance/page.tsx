'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  TrendUp,
  Clock,
  CheckCircle,
  Trophy,
  Lightning,
} from '@phosphor-icons/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import {
  DevStatCard,
  DevCard,
  DevSkeleton,
  DevBadge,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { toDate } from '@/lib/utils/timestamp'

/**
 * Performance Metrics Page
 */
export default function PerformancePage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  // Calculate performance metrics
  const metrics = useMemo(() => {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Filter to user's completed documents
    const myCompleted = submissions.filter(
      (s) =>
        s.status === 'completed' && (isAdminView || s.assignedTo === user?.uid)
    )

    // Completions this week/month
    const completedThisWeek = myCompleted.filter((s) => {
      const date = s.approvedAt ? toDate(s.approvedAt) : null
      return date && date >= sevenDaysAgo
    }).length

    const completedThisMonth = myCompleted.filter((s) => {
      const date = s.approvedAt ? toDate(s.approvedAt) : null
      return date && date >= thirtyDaysAgo
    }).length

    // Daily completions for chart (last 14 days)
    const dailyCompletions: { date: string; count: number }[] = []
    for (let i = 13; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateKey = date.toISOString().split('T')[0]
      const count = myCompleted.filter((s) => {
        if (!s.approvedAt) return false
        const completedDate = toDate(s.approvedAt)
        return completedDate.toISOString().split('T')[0] === dateKey
      }).length
      dailyCompletions.push({ date: dateKey, count })
    }

    // Current in-progress
    const inProgress = submissions.filter(
      (s) =>
        s.status === 'in-progress' &&
        (isAdminView || s.assignedTo === user?.uid)
    ).length

    // Calculate average progress
    const progressDocs = submissions.filter(
      (s) =>
        s.progressPercentage !== undefined &&
        s.progressPercentage > 0 &&
        (isAdminView || s.assignedTo === user?.uid)
    )
    const avgProgress =
      progressDocs.length > 0
        ? progressDocs.reduce(
            (sum, s) => sum + (s.progressPercentage || 0),
            0
          ) / progressDocs.length
        : 0

    return {
      completedThisWeek,
      completedThisMonth,
      inProgress,
      avgProgress: Math.round(avgProgress),
      dailyCompletions,
      totalCompleted: myCompleted.length,
    }
  }, [submissions, user?.uid, isAdminView])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  // Personal bests / achievements
  const achievements = useMemo(() => {
    const items = []

    if (metrics.totalCompleted >= 100) {
      items.push({
        icon: '🏆',
        title: 'Century Club',
        desc: '100+ documents completed',
      })
    } else if (metrics.totalCompleted >= 50) {
      items.push({
        icon: '⭐',
        title: 'Prolific',
        desc: '50+ documents completed',
      })
    } else if (metrics.totalCompleted >= 10) {
      items.push({
        icon: '🎯',
        title: 'Getting Started',
        desc: '10+ documents completed',
      })
    }

    if (metrics.completedThisWeek >= 10) {
      items.push({
        icon: '🔥',
        title: 'On Fire',
        desc: '10+ completions this week',
      })
    } else if (metrics.completedThisWeek >= 5) {
      items.push({
        icon: '⚡',
        title: 'Productive Week',
        desc: '5+ completions this week',
      })
    }

    return items
  }, [metrics])

  if (loading) {
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
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--dev-space-4)',
              marginBottom: 'var(--dev-space-6)',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <DevSkeleton key={i} height={100} />
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
          Performance
        </h1>
        <p
          style={{
            color: 'var(--dev-text-muted)',
            fontSize: 'var(--dev-text-sm)',
          }}
        >
          Track your productivity and achievements
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Summary Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--dev-space-4)',
            marginBottom: 'var(--dev-space-6)',
          }}
        >
          <DevStatCard
            title="Completed This Week"
            value={metrics.completedThisWeek}
            icon={<CheckCircle size={20} />}
            color="success"
          />
          <DevStatCard
            title="Completed This Month"
            value={metrics.completedThisMonth}
            icon={<TrendUp size={20} />}
          />
          <DevStatCard
            title="Currently Active"
            value={metrics.inProgress}
            icon={<Clock size={20} />}
            color="info"
          />
          <DevStatCard
            title="Avg Progress"
            value={`${metrics.avgProgress}%`}
            icon={<Lightning size={20} />}
            color="warning"
          />
        </div>

        {/* Completions Chart */}
        <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Daily Completions (Last 14 Days)
          </h2>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.dailyCompletions}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--dev-border-subtle)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--dev-bg-elevated)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 8,
                  }}
                  formatter={(value: number) => [value, 'Completed']}
                  labelFormatter={formatDate}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DevCard>

        {/* Achievements */}
        <DevCard padding="md">
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Achievements
          </h2>
          {achievements.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 'var(--dev-space-3)',
              }}
            >
              {achievements.map((achievement, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'var(--dev-space-4)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--dev-space-3)',
                  }}
                >
                  <div style={{ fontSize: 24 }}>{achievement.icon}</div>
                  <div>
                    <div
                      style={{
                        fontWeight: 'var(--dev-font-semibold)',
                        fontSize: 'var(--dev-text-sm)',
                      }}
                    >
                      {achievement.title}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--dev-text-xs)',
                        color: 'var(--dev-text-muted)',
                      }}
                    >
                      {achievement.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--dev-space-8)',
                color: 'var(--dev-text-muted)',
              }}
            >
              <Trophy
                size={48}
                style={{ marginBottom: 'var(--dev-space-3)', opacity: 0.5 }}
              />
              <p>Complete more documents to unlock achievements!</p>
            </div>
          )}
        </DevCard>
      </div>
    </div>
  )
}
