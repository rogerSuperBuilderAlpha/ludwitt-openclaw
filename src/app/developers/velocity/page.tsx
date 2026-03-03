'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Lightning,
  TrendUp,
  TrendDown,
  ArrowRight,
  Target,
} from '@phosphor-icons/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import {
  DevStatCard,
  DevCard,
  DevSkeleton,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { toDate } from '@/lib/utils/timestamp'

/**
 * Velocity Tracking Page
 */
export default function VelocityPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  // Calculate velocity metrics
  const velocityData = useMemo(() => {
    const now = new Date()

    // Get completed docs with dates
    const completedDocs = submissions
      .filter(
        (s) =>
          s.status === 'completed' &&
          (isAdminView || s.assignedTo === user?.uid)
      )
      .map((s) => {
        let completedDate: Date | null = null
        if (s.approvedAt) {
          completedDate = toDate(s.approvedAt)
        }
        return { ...s, completedDate }
      })
      .filter((s) => s.completedDate !== null)

    // Calculate weekly velocity for last 8 weeks
    const weeklyVelocity: { week: string; count: number; weekNum: number }[] =
      []
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(
        now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000
      )
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)

      const count = completedDocs.filter(
        (s) =>
          s.completedDate &&
          s.completedDate >= weekStart &&
          s.completedDate < weekEnd
      ).length

      const weekLabel = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(weekStart)
      weeklyVelocity.push({ week: weekLabel, count, weekNum: 8 - i })
    }

    // Current week velocity
    const thisWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const currentWeekVelocity = completedDocs.filter(
      (s) => s.completedDate && s.completedDate >= thisWeekStart
    ).length

    // Last week velocity
    const lastWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const lastWeekVelocity = completedDocs.filter(
      (s) =>
        s.completedDate &&
        s.completedDate >= lastWeekStart &&
        s.completedDate < thisWeekStart
    ).length

    // Calculate trend
    const trend =
      lastWeekVelocity > 0
        ? ((currentWeekVelocity - lastWeekVelocity) / lastWeekVelocity) * 100
        : currentWeekVelocity > 0
          ? 100
          : 0

    // Average velocity
    const totalVelocity = weeklyVelocity.reduce((sum, w) => sum + w.count, 0)
    const avgVelocity =
      weeklyVelocity.length > 0 ? totalVelocity / weeklyVelocity.length : 0

    // Funnel data - conversion from available to completed
    const available = submissions.filter(
      (s) =>
        (s.status === 'approved' || s.status === 'pending' || !s.status) &&
        !s.assignedTo
    ).length
    const inProgress = submissions.filter(
      (s) =>
        s.status === 'in-progress' ||
        (s.assignedTo && s.status !== 'completed' && s.status !== 'archived')
    ).length
    const completed = completedDocs.length

    return {
      weeklyVelocity,
      currentWeekVelocity,
      lastWeekVelocity,
      trend: Math.round(trend),
      avgVelocity: Math.round(avgVelocity * 10) / 10,
      funnel: { available, inProgress, completed },
      totalCompleted: completedDocs.length,
    }
  }, [submissions, user?.uid, isAdminView])

  // Velocity target (could be configurable)
  const velocityTarget = 5 // docs per week

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
          Velocity
        </h1>
        <p
          style={{
            color: 'var(--dev-text-muted)',
            fontSize: 'var(--dev-text-sm)',
          }}
        >
          Track your completion speed and throughput
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
            title="This Week"
            value={velocityData.currentWeekVelocity}
            icon={<Lightning size={20} />}
            color={
              velocityData.currentWeekVelocity >= velocityTarget
                ? 'success'
                : 'warning'
            }
            trend={
              velocityData.trend !== 0
                ? { value: velocityData.trend, label: 'vs last week' }
                : undefined
            }
          />
          <DevStatCard
            title="Last Week"
            value={velocityData.lastWeekVelocity}
            icon={<TrendUp size={20} />}
          />
          <DevStatCard
            title="Avg Velocity"
            value={`${velocityData.avgVelocity}/week`}
            icon={<Target size={20} />}
          />
          <DevStatCard title="All Time" value={velocityData.totalCompleted} />
        </div>

        {/* Velocity Chart */}
        <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Weekly Velocity (Last 8 Weeks)
          </h2>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData.weeklyVelocity}>
                <defs>
                  <linearGradient
                    id="colorVelocity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--dev-border-subtle)"
                />
                <XAxis
                  dataKey="week"
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
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorVelocity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DevCard>

        {/* Completion Funnel */}
        <DevCard padding="md">
          <h2
            style={{
              fontSize: 'var(--dev-text-base)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            Document Pipeline
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--dev-space-4)',
              padding: 'var(--dev-space-4)',
            }}
          >
            {/* Available */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '3px solid var(--dev-status-available)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--dev-space-2)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--dev-text-2xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {velocityData.funnel.available}
                </span>
              </div>
              <div
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  color: 'var(--dev-text-muted)',
                }}
              >
                Available
              </div>
            </div>

            <ArrowRight size={24} style={{ color: 'var(--dev-text-muted)' }} />

            {/* In Progress */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '3px solid var(--dev-status-in-progress)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--dev-space-2)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--dev-text-2xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {velocityData.funnel.inProgress}
                </span>
              </div>
              <div
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  color: 'var(--dev-text-muted)',
                }}
              >
                In Progress
              </div>
            </div>

            <ArrowRight size={24} style={{ color: 'var(--dev-text-muted)' }} />

            {/* Completed */}
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.2)',
                  border: '3px solid var(--dev-status-done)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--dev-space-2)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--dev-text-2xl)',
                    fontWeight: 'var(--dev-font-bold)',
                  }}
                >
                  {velocityData.funnel.completed}
                </span>
              </div>
              <div
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  color: 'var(--dev-text-muted)',
                }}
              >
                Completed
              </div>
            </div>
          </div>

          {/* Velocity Goal */}
          <div
            style={{
              marginTop: 'var(--dev-space-4)',
              padding: 'var(--dev-space-4)',
              background: 'var(--dev-bg-muted)',
              borderRadius: 'var(--dev-radius-lg)',
            }}
          >
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
                Weekly Goal Progress
              </span>
              <span
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  fontWeight: 'var(--dev-font-medium)',
                }}
              >
                {velocityData.currentWeekVelocity} / {velocityTarget}
              </span>
            </div>
            <DevProgress
              value={Math.min(
                (velocityData.currentWeekVelocity / velocityTarget) * 100,
                100
              )}
              size="lg"
              color={
                velocityData.currentWeekVelocity >= velocityTarget
                  ? 'success'
                  : 'primary'
              }
            />
          </div>
        </DevCard>
      </div>
    </div>
  )
}
