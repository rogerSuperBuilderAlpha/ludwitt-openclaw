'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ChartBar,
  User,
  Warning,
  Check,
  ArrowRight,
} from '@phosphor-icons/react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
  DevProgress,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import Link from 'next/link'

interface TeamMember {
  id: string
  email: string
  displayName: string
  photoURL?: string
  activeDocuments: number
  completedThisWeek: number
  capacity: number // max docs they should handle
  workloadPercent: number
}

/**
 * Workload Page - Team workload distribution and capacity planning
 */
export default function WorkloadPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/team', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch team')

        const json = await res.json()
        if (json.success) {
          // Add capacity and workload calculations
          const teamWithWorkload: TeamMember[] = json.data.members.map(
            (m: {
              id: string
              email: string
              displayName: string
              photoURL?: string
              activeDocuments: number
              completedThisWeek: number
            }) => {
              const capacity = 10 // Default capacity per developer
              const workloadPercent = Math.round(
                (m.activeDocuments / capacity) * 100
              )
              return {
                ...m,
                capacity,
                workloadPercent: Math.min(workloadPercent, 150), // Cap at 150%
              }
            }
          )
          setMembers(teamWithWorkload)
        } else {
          throw new Error(json.error || 'Failed to fetch team')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [user])

  // Calculate team stats
  const teamStats = useMemo(() => {
    const totalActive = members.reduce((sum, m) => sum + m.activeDocuments, 0)
    const totalCapacity = members.reduce((sum, m) => sum + m.capacity, 0)
    const avgWorkload =
      members.length > 0
        ? Math.round(
            members.reduce((sum, m) => sum + m.workloadPercent, 0) /
              members.length
          )
        : 0
    const overloaded = members.filter((m) => m.workloadPercent > 100).length
    const underutilized = members.filter((m) => m.workloadPercent < 50).length

    return {
      totalActive,
      totalCapacity,
      avgWorkload,
      overloaded,
      underutilized,
    }
  }, [members])

  // Chart data
  const chartData = useMemo(() => {
    return members.map((m) => ({
      name: m.displayName.split(' ')[0],
      active: m.activeDocuments,
      capacity: m.capacity,
    }))
  }, [members])

  const getWorkloadColor = (percent: number) => {
    if (percent >= 100) return 'var(--dev-accent-danger)'
    if (percent >= 75) return 'var(--dev-status-available)'
    if (percent >= 50) return 'var(--dev-accent-success)'
    return 'var(--dev-accent-info)'
  }

  const getWorkloadLabel = (percent: number) => {
    if (percent >= 100) return 'Overloaded'
    if (percent >= 75) return 'High'
    if (percent >= 50) return 'Normal'
    if (percent > 0) return 'Light'
    return 'Available'
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
          <DevSkeleton width={200} height={32} />
        </div>
        <div className="flex-1 p-[var(--dev-space-5)]">
          <DevSkeleton height={200} className="mb-5" />
          {[1, 2, 3].map((i) => (
            <DevSkeleton key={i} height={80} className="mb-3" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-[var(--dev-space-4)] px-[var(--dev-space-5)] border-b border-[var(--dev-border-subtle)]">
        <h1 className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-1)]">
          Workload Distribution
        </h1>
        <p className="text-[var(--dev-text-muted)] text-[length:var(--dev-text-sm)]">
          Monitor team capacity and balance assignments
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-[var(--dev-space-5)]">
        {error && (
          <div className="p-[var(--dev-space-4)] bg-[rgba(239,68,68,0.1)] rounded-[var(--dev-radius-lg)] text-[var(--dev-accent-danger)] mb-[var(--dev-space-4)]">
            {error}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[var(--dev-space-4)] mb-[var(--dev-space-5)]">
          <DevCard padding="md" className="text-center">
            <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)]">
              {teamStats.totalActive}
            </div>
            <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
              Total Active
            </div>
          </DevCard>
          <DevCard padding="md" className="text-center">
            <div className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)]">
              {teamStats.totalCapacity}
            </div>
            <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
              Total Capacity
            </div>
          </DevCard>
          <DevCard padding="md" className="text-center">
            <div
              className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)]"
              style={{ color: getWorkloadColor(teamStats.avgWorkload) }}
            >
              {teamStats.avgWorkload}%
            </div>
            <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
              Avg Workload
            </div>
          </DevCard>
          <DevCard
            padding="md"
            className="text-center"
            style={{
              borderColor:
                teamStats.overloaded > 0
                  ? 'var(--dev-accent-danger)'
                  : undefined,
            }}
          >
            <div
              className="text-[length:var(--dev-text-2xl)] font-[var(--dev-font-bold)]"
              style={{
                color:
                  teamStats.overloaded > 0
                    ? 'var(--dev-accent-danger)'
                    : 'var(--dev-text-primary)',
              }}
            >
              {teamStats.overloaded}
            </div>
            <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
              Overloaded
            </div>
          </DevCard>
        </div>

        {/* Workload Chart */}
        <DevCard padding="md" className="mb-[var(--dev-space-5)]">
          <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-4)]">
            Team Capacity Overview
          </h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--dev-border-subtle)"
                />
                <XAxis
                  type="number"
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  stroke="var(--dev-text-muted)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--dev-bg-elevated)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="active" name="Active" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => {
                    const member = members[index]
                    return (
                      <Cell
                        key={entry.name}
                        fill={getWorkloadColor(member?.workloadPercent || 0)}
                      />
                    )
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DevCard>

        {/* Team Member List */}
        <h2 className="text-[length:var(--dev-text-base)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-3)]">
          Individual Workloads
        </h2>

        {members.length === 0 ? (
          <DevEmptyState
            icon={<ChartBar size={32} />}
            title="No team members"
            description="Team members will appear here"
          />
        ) : (
          <div className="flex flex-col gap-[var(--dev-space-3)]">
            {members
              .sort((a, b) => b.workloadPercent - a.workloadPercent)
              .map((member) => (
                <DevCard
                  key={member.id}
                  padding="md"
                  style={{
                    borderLeft: `4px solid ${getWorkloadColor(member.workloadPercent)}`,
                  }}
                >
                  <div className="flex items-center gap-[var(--dev-space-4)]">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-[var(--dev-font-semibold)] text-[length:var(--dev-text-sm)] shrink-0"
                      style={{
                        background: member.photoURL
                          ? `url(${member.photoURL}) center/cover`
                          : 'var(--dev-accent-primary)',
                      }}
                    >
                      {!member.photoURL &&
                        member.displayName.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[var(--dev-space-2)] mb-1">
                        <span className="font-[var(--dev-font-semibold)]">
                          {member.displayName}
                        </span>
                        <DevBadge
                          variant={
                            member.workloadPercent >= 100
                              ? 'danger'
                              : member.workloadPercent >= 75
                                ? 'warning'
                                : 'success'
                          }
                          size="sm"
                        >
                          {getWorkloadLabel(member.workloadPercent)}
                        </DevBadge>
                        {member.workloadPercent >= 100 && (
                          <Warning
                            size={14}
                            className="text-[var(--dev-accent-danger)]"
                          />
                        )}
                      </div>

                      {/* Workload bar */}
                      <div className="flex items-center gap-[var(--dev-space-3)]">
                        <div className="flex-1">
                          <DevProgress
                            value={Math.min(member.workloadPercent, 100)}
                            size="sm"
                            color={
                              member.workloadPercent >= 100
                                ? 'danger'
                                : member.workloadPercent >= 75
                                  ? 'warning'
                                  : 'success'
                            }
                          />
                        </div>
                        <span className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)] min-w-[80px]">
                          {member.activeDocuments} / {member.capacity} docs
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right shrink-0">
                      <div
                        className="text-[length:var(--dev-text-xl)] font-[var(--dev-font-bold)]"
                        style={{
                          color: getWorkloadColor(member.workloadPercent),
                        }}
                      >
                        {member.workloadPercent}%
                      </div>
                      <div className="text-[length:var(--dev-text-xs)] text-[var(--dev-text-muted)]">
                        workload
                      </div>
                    </div>
                  </div>
                </DevCard>
              ))}
          </div>
        )}

        {/* Recommendations */}
        {(teamStats.overloaded > 0 || teamStats.underutilized > 0) && (
          <DevCard padding="md" className="mt-[var(--dev-space-5)]">
            <h3 className="text-[length:var(--dev-text-sm)] font-[var(--dev-font-semibold)] mb-[var(--dev-space-3)]">
              💡 Recommendations
            </h3>
            <div className="flex flex-col gap-[var(--dev-space-2)] text-[length:var(--dev-text-sm)]">
              {teamStats.overloaded > 0 && (
                <div className="flex items-center gap-[var(--dev-space-2)] text-[var(--dev-accent-danger)]">
                  <Warning size={14} />
                  {teamStats.overloaded} team member
                  {teamStats.overloaded > 1 ? 's are' : ' is'} overloaded.
                  Consider redistributing work.
                </div>
              )}
              {teamStats.underutilized > 0 && (
                <div className="flex items-center gap-[var(--dev-space-2)] text-[var(--dev-accent-info)]">
                  <Check size={14} />
                  {teamStats.underutilized} team member
                  {teamStats.underutilized > 1 ? 's have' : ' has'} capacity for
                  more work.
                </div>
              )}
            </div>
          </DevCard>
        )}
      </div>
    </div>
  )
}
