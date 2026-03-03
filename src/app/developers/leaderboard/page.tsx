/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Trophy,
  Medal,
  Lightning,
  TrendUp,
  Fire,
  CaretDown,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface TeamMember {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'developer'
  activeDocuments: number
  completedThisWeek: number
  completedAllTime: number
  totalRevenue: number
}

type SortKey = 'completions' | 'revenue' | 'thisWeek' | 'active'

/**
 * Leaderboard Page - Team rankings and competitions
 */
export default function LeaderboardPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortKey>('completions')
  const [showSortMenu, setShowSortMenu] = useState(false)

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
          setMembers(json.data.members)
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

  // Sort members
  const rankedMembers = useMemo(() => {
    const sorted = [...members]

    switch (sortBy) {
      case 'completions':
        sorted.sort((a, b) => b.completedAllTime - a.completedAllTime)
        break
      case 'revenue':
        sorted.sort((a, b) => b.totalRevenue - a.totalRevenue)
        break
      case 'thisWeek':
        sorted.sort((a, b) => b.completedThisWeek - a.completedThisWeek)
        break
      case 'active':
        sorted.sort((a, b) => b.activeDocuments - a.activeDocuments)
        break
    }

    return sorted
  }, [members, sortBy])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  const getRankDisplay = (rank: number) => {
    switch (rank) {
      case 1:
        return { emoji: '🥇', color: '#FFD700', bg: 'rgba(255, 215, 0, 0.15)' }
      case 2:
        return {
          emoji: '🥈',
          color: '#C0C0C0',
          bg: 'rgba(192, 192, 192, 0.15)',
        }
      case 3:
        return { emoji: '🥉', color: '#CD7F32', bg: 'rgba(205, 127, 50, 0.15)' }
      default:
        return {
          emoji: `#${rank}`,
          color: 'var(--dev-text-muted)',
          bg: 'var(--dev-bg-muted)',
        }
    }
  }

  const getMetricValue = (member: TeamMember) => {
    switch (sortBy) {
      case 'completions':
        return { value: member.completedAllTime, label: 'completed' }
      case 'revenue':
        return { value: formatCurrency(member.totalRevenue), label: 'earned' }
      case 'thisWeek':
        return { value: member.completedThisWeek, label: 'this week' }
      case 'active':
        return { value: member.activeDocuments, label: 'active' }
    }
  }

  const sortOptions: { key: SortKey; label: string; icon: React.ReactNode }[] =
    [
      {
        key: 'completions',
        label: 'Most Completions',
        icon: <Trophy size={14} />,
      },
      { key: 'revenue', label: 'Highest Revenue', icon: <TrendUp size={14} /> },
      { key: 'thisWeek', label: 'This Week', icon: <Fire size={14} /> },
      { key: 'active', label: 'Most Active', icon: <Lightning size={14} /> },
    ]

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
          {[1, 2, 3].map((i) => (
            <DevSkeleton key={i} height={80} style={{ marginBottom: 12 }} />
          ))}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--dev-text-xl)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-1)',
            }}
          >
            Leaderboard
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Team rankings and competitions
          </p>
        </div>

        {/* Sort Selector */}
        <div style={{ position: 'relative' }}>
          <DevButton
            variant="secondary"
            size="sm"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            {sortOptions.find((o) => o.key === sortBy)?.icon}
            <span style={{ marginLeft: 4 }}>
              {sortOptions.find((o) => o.key === sortBy)?.label}
            </span>
            <CaretDown size={12} style={{ marginLeft: 4 }} />
          </DevButton>
          {showSortMenu && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={() => setShowSortMenu(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 4,
                  background: 'var(--dev-bg-elevated)',
                  border: '1px solid var(--dev-border-default)',
                  borderRadius: 'var(--dev-radius-lg)',
                  boxShadow: 'var(--dev-shadow-lg)',
                  zIndex: 50,
                  overflow: 'hidden',
                  minWidth: 180,
                }}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSortBy(option.key)
                      setShowSortMenu(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      padding: 'var(--dev-space-2) var(--dev-space-3)',
                      textAlign: 'left',
                      background:
                        sortBy === option.key
                          ? 'var(--dev-bg-hover)'
                          : 'transparent',
                      border: 'none',
                      color: 'var(--dev-text-primary)',
                      fontSize: 'var(--dev-text-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {error && (
          <div
            style={{
              padding: 'var(--dev-space-4)',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 'var(--dev-radius-lg)',
              color: 'var(--dev-accent-danger)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            {error}
          </div>
        )}

        {rankedMembers.length === 0 ? (
          <DevEmptyState
            icon={<Trophy size={32} />}
            title="No rankings yet"
            description="Complete documents to appear on the leaderboard"
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--dev-space-3)',
            }}
          >
            {rankedMembers.map((member, index) => {
              const rank = index + 1
              const rankDisplay = getRankDisplay(rank)
              const metric = getMetricValue(member)

              return (
                <DevCard
                  key={member.id}
                  padding="md"
                  style={{
                    borderLeft:
                      rank <= 3 ? `4px solid ${rankDisplay.color}` : undefined,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--dev-space-4)',
                    }}
                  >
                    {/* Rank */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: rankDisplay.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'var(--dev-font-bold)',
                        fontSize:
                          rank <= 3
                            ? 'var(--dev-text-xl)'
                            : 'var(--dev-text-base)',
                        color: rankDisplay.color,
                      }}
                    >
                      {rankDisplay.emoji}
                    </div>

                    {/* Member info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--dev-space-3)',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: member.photoURL
                            ? `url(${member.photoURL}) center/cover`
                            : 'var(--dev-accent-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'var(--dev-font-semibold)',
                          fontSize: 'var(--dev-text-sm)',
                          flexShrink: 0,
                        }}
                      >
                        {!member.photoURL &&
                          member.displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'var(--dev-font-semibold)' }}>
                          {member.displayName}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--dev-text-xs)',
                            color: 'var(--dev-text-muted)',
                          }}
                        >
                          {member.email}
                        </div>
                      </div>
                    </div>

                    {/* Metric */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 'var(--dev-text-2xl)',
                          fontWeight: 'var(--dev-font-bold)',
                          color:
                            rank === 1 ? '#FFD700' : 'var(--dev-text-primary)',
                        }}
                      >
                        {metric.value}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--dev-text-xs)',
                          color: 'var(--dev-text-muted)',
                        }}
                      >
                        {metric.label}
                      </div>
                    </div>
                  </div>
                </DevCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
