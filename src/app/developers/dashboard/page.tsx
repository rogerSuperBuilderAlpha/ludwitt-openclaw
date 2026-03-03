'use client'

import { useState, useEffect } from 'react'
import {
  Files,
  CheckCircle,
  CurrencyCircleDollar,
  Fire,
  ArrowRight,
  Clock,
  TrendUp,
} from '@phosphor-icons/react'
import {
  DevStatCard,
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import Link from 'next/link'

interface DashboardStats {
  totalDocuments: number
  availableCount: number
  inProgressCount: number
  completedCount: number
  archivedCount: number
  totalComputeCostCents: number
  totalCustomerChargeCents: number
  totalComputeCost: string
  totalCustomerCharge: string
  completedThisWeek: number
  documentCosts: {
    id: string
    title: string
    customer: string
    computeCostCents: number
    customerChargeCents: number
    completedAt?: string
  }[]
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
  completionDates: string[]
  totalCompletions: number
}

interface RecentActivity {
  id: string
  type: 'completion' | 'assignment' | 'message' | 'claim'
  title: string
  description: string
  timestamp: string
}

/**
 * Dashboard Overview Page
 *
 * Shows key metrics, recent activity, and quick actions
 */
export default function DashboardPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [streaks, setStreaks] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch dashboard stats and streaks
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        const token = await user.getIdToken()

        // Fetch both in parallel
        const [statsRes, streaksRes] = await Promise.all([
          fetch('/api/developers/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/developers/streaks', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        if (!statsRes.ok) throw new Error('Failed to fetch stats')

        const statsData = await statsRes.json()
        if (statsData.success) {
          setStats(statsData.data)
        } else {
          throw new Error(statsData.error || 'Failed to fetch stats')
        }

        // Streaks are optional, don't fail if they error
        if (streaksRes.ok) {
          const streaksData = await streaksRes.json()
          if (streaksData.success) {
            setStreaks(streaksData.data)
          }
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Mock recent activity for now
  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'completion',
      title: 'Document completed',
      description: 'You marked "API Integration Guide" as complete',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'claim',
      title: 'Document claimed',
      description: 'You claimed "Mobile App Redesign"',
      timestamp: '4 hours ago',
    },
    {
      id: '3',
      type: 'message',
      title: 'New message',
      description: 'Customer replied on "Website Update"',
      timestamp: 'Yesterday',
    },
  ]

  if (loading) {
    return (
      <div className="p-[var(--dev-space-5)]">
        <div className="mb-[var(--dev-space-6)]">
          <DevSkeleton className="w-[300px] h-8 mb-2" />
          <DevSkeleton className="w-[200px] h-5" />
        </div>
        <div className="grid grid-cols-4 gap-[var(--dev-space-4)] mb-[var(--dev-space-6)]">
          {[1, 2, 3, 4].map((i) => (
            <DevSkeleton key={i} className="h-[120px]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
        <h1 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-1)]">
          {getGreeting()}! 👋
        </h1>
        <p className="text-[var(--dev-text-muted)] text-[length:var(--dev-text-sm)]">
          Here&apos;s your overview for today
        </p>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-auto p-[var(--dev-space-5)]">
        {error && (
          <div className="p-[var(--dev-space-4)] bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-[var(--dev-radius-lg)] text-[var(--dev-accent-danger)] mb-[var(--dev-space-4)]">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[var(--dev-space-4)] mb-[var(--dev-space-6)]">
          <DevStatCard
            title="Active Documents"
            value={stats?.inProgressCount || 0}
            icon={<Files size={20} />}
            color="info"
          />
          <DevStatCard
            title="Completed This Week"
            value={stats?.completedThisWeek || 0}
            icon={<CheckCircle size={20} />}
            color="success"
            trend={
              stats?.completedThisWeek
                ? { value: 15, label: 'vs last week' }
                : undefined
            }
          />
          <DevStatCard
            title="Current Streak"
            value={`${streaks?.currentStreak || 0} 🔥`}
            icon={<Fire size={20} />}
            color="warning"
            trend={
              streaks?.longestStreak
                ? { value: streaks.longestStreak, label: 'best' }
                : undefined
            }
          />
          <DevStatCard
            title="Total Revenue"
            value={stats?.totalCustomerCharge || '$0.00'}
            icon={<CurrencyCircleDollar size={20} />}
            color="success"
          />
          <DevStatCard
            title="Available to Claim"
            value={stats?.availableCount || 0}
            icon={<Clock size={20} />}
            color="warning"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-[var(--dev-space-5)]">
          {/* Recent Activity */}
          <DevCard padding="md">
            <div className="flex items-center justify-between mb-[var(--dev-space-4)]">
              <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)]">
                Recent Activity
              </h2>
              <Link href="/developers/activity">
                <DevButton
                  variant="ghost"
                  size="xs"
                  rightIcon={<ArrowRight size={12} />}
                >
                  View all
                </DevButton>
              </Link>
            </div>

            <div className="flex flex-col gap-[var(--dev-space-3)]">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-[var(--dev-space-3)] p-[var(--dev-space-2)] rounded-[var(--dev-radius-md)] transition-[background] duration-150 ease-linear"
                >
                  <div
                    className="w-8 h-8 rounded-[var(--dev-radius-md)] flex items-center justify-center shrink-0"
                    style={{
                      background:
                        activity.type === 'completion'
                          ? 'rgba(34, 197, 94, 0.1)'
                          : activity.type === 'claim'
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'rgba(139, 92, 246, 0.1)',
                    }}
                  >
                    {activity.type === 'completion' && (
                      <CheckCircle
                        size={16}
                        color="var(--dev-accent-success)"
                      />
                    )}
                    {activity.type === 'claim' && (
                      <Files size={16} color="var(--dev-accent-info)" />
                    )}
                    {activity.type === 'message' && (
                      <TrendUp size={16} color="var(--dev-accent-secondary)" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[length:var(--dev-text-sm)] font-[var(--dev-font-medium)] mb-0.5">
                      {activity.title}
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      {activity.description}
                    </div>
                  </div>
                  <span className="text-[length:var(--dev-text-2xs)] text-[var(--dev-text-muted)] whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </DevCard>

          {/* Quick Actions */}
          <DevCard padding="md">
            <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-4)]">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-[var(--dev-space-3)]">
              <Link href="/developers" className="no-underline">
                <div className="flex items-center gap-[var(--dev-space-3)] p-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-lg)] cursor-pointer transition-[background] duration-150 ease-linear">
                  <div className="w-10 h-10 rounded-[var(--dev-radius-md)] bg-[var(--dev-accent-primary)] flex items-center justify-center">
                    <Files size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-[var(--dev-font-medium)] text-[length:var(--dev-text-sm)]">
                      View Documents
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      See all documents in kanban view
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[var(--dev-text-muted)]"
                  />
                </div>
              </Link>

              <Link href="/developers/queue" className="no-underline">
                <div className="flex items-center gap-[var(--dev-space-3)] p-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-lg)] cursor-pointer transition-[background] duration-150 ease-linear">
                  <div className="w-10 h-10 rounded-[var(--dev-radius-md)] bg-[var(--dev-accent-info)] flex items-center justify-center">
                    <Clock size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-[var(--dev-font-medium)] text-[length:var(--dev-text-sm)]">
                      My Queue
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      Documents assigned to you
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[var(--dev-text-muted)]"
                  />
                </div>
              </Link>

              <Link href="/developers/starred" className="no-underline">
                <div className="flex items-center gap-[var(--dev-space-3)] p-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-lg)] cursor-pointer transition-[background] duration-150 ease-linear">
                  <div className="w-10 h-10 rounded-[var(--dev-radius-md)] bg-[var(--dev-accent-warning)] flex items-center justify-center">
                    <Fire size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-[var(--dev-font-medium)] text-[length:var(--dev-text-sm)]">
                      Starred Items
                    </div>
                    <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                      Your pinned documents
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[var(--dev-text-muted)]"
                  />
                </div>
              </Link>
            </div>
          </DevCard>
        </div>

        {/* Revenue Breakdown (if admin) */}
        {isAdminView &&
          stats?.documentCosts &&
          stats.documentCosts.length > 0 && (
            <div className="mt-[var(--dev-space-6)]">
              <DevCard padding="md">
                <div className="flex items-center justify-between mb-[var(--dev-space-4)]">
                  <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)]">
                    Recent Revenue
                  </h2>
                  <Link href="/developers/revenue">
                    <DevButton
                      variant="ghost"
                      size="xs"
                      rightIcon={<ArrowRight size={12} />}
                    >
                      View all
                    </DevButton>
                  </Link>
                </div>

                <div className="flex flex-col gap-[var(--dev-space-2)]">
                  {stats.documentCosts.slice(0, 5).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between py-[var(--dev-space-2)] px-[var(--dev-space-3)] bg-[var(--dev-bg-muted)] rounded-[var(--dev-radius-md)]"
                    >
                      <div>
                        <div className="text-[length:var(--dev-text-sm)] font-[var(--dev-font-medium)]">
                          {doc.title}
                        </div>
                        <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                          {doc.customer}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[length:var(--dev-text-sm)] font-[var(--dev-font-semibold)] text-[var(--dev-accent-success)]">
                          ${(doc.customerChargeCents / 100).toFixed(2)}
                        </div>
                        <div className="text-[length:var(--dev-text-2xs)] text-[var(--dev-text-muted)]">
                          Cost: ${(doc.computeCostCents / 100).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DevCard>
            </div>
          )}
      </div>
    </div>
  )
}
