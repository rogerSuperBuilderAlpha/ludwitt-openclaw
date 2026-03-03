'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LeaderboardEntry, LeaderboardPeriod, GetLeaderboardResponse } from '@/lib/types/leaderboard'
import { getAvatarById } from '@/data/avatars'
import { CaretLeft, Trophy, Calendar, CalendarBlank, Globe, MapPin } from '@phosphor-icons/react'

// Region configuration with flags
const REGIONS = [
  { id: 'all', name: 'Global', flag: '🌍', description: 'All Regions' },
  { id: 'Trinidad and Tobago', name: 'Trinidad & Tobago', flag: '🇹🇹', description: 'Trinidad and Tobago' },
  { id: 'United States', name: 'United States', flag: '🇺🇸', description: 'United States' },
  { id: 'United Kingdom', name: 'United Kingdom', flag: '🇬🇧', description: 'United Kingdom' },
  { id: 'Canada', name: 'Canada', flag: '🇨🇦', description: 'Canada' },
  { id: 'India', name: 'India', flag: '🇮🇳', description: 'India' },
  { id: 'Nigeria', name: 'Nigeria', flag: '🇳🇬', description: 'Nigeria' },
  { id: 'Jamaica', name: 'Jamaica', flag: '🇯🇲', description: 'Jamaica' },
  { id: 'Barbados', name: 'Barbados', flag: '🇧🇧', description: 'Barbados' },
  { id: 'Other', name: 'Other', flag: '🏴', description: 'Other Countries' },
] as const

export default function BasicsLeaderboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time')
  const [region, setRegion] = useState<string>('all')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return

    const loadLeaderboard = async () => {
      setLoading(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        
        const url = new URL('/api/basics/leaderboard', window.location.origin)
        url.searchParams.set('period', period)
        url.searchParams.set('limit', '50')
        if (region && region !== 'all') {
          url.searchParams.set('region', region)
        }
        
        const response = await fetch(url.toString(), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const result: GetLeaderboardResponse = await response.json()

        if (result.success && result.data) {
          setEntries(result.data.entries)
          setCurrentUserEntry(result.data.stats.currentUserEntry || null)
        } else {
          setError(result.error || 'Failed to load leaderboard')
        }
      } catch {
        setError('Failed to load leaderboard. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [user, period, region])

  const getPeriodLabel = (p: LeaderboardPeriod): string => {
    switch (p) {
      case 'day': return 'Today'
      case 'week': return 'This Week'
      case 'month': return 'This Month'
      case 'year': return 'This Year'
      case 'all-time': return 'All Time'
    }
  }

  const getPeriodIcon = (p: LeaderboardPeriod): string => {
    switch (p) {
      case 'day': return '☀️'
      case 'week': return '📅'
      case 'month': return '📆'
      case 'year': return '🗓️'
      case 'all-time': return '🏆'
    }
  }

  const getRankDisplay = (rank: number): string => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRegionFlag = (region?: string): string | null => {
    if (!region) return null
    const regionConfig = REGIONS.find(r => r.id === region)
    return regionConfig?.flag || null
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 mx-auto b-mb-lg" style={{ borderColor: 'var(--b-writing)' }}></div>
          <p className="b-text-secondary">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen b-bg-page">
      {/* Header */}
      <div className="b-bg-card b-border-b" style={{ backgroundColor: 'var(--b-bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between b-mb-lg">
            <Link
              href="/"
              className="flex items-center gap-2 b-text-secondary hover:b-text-primary transition-colors"
            >
              <CaretLeft size={20} weight="bold" />
              <span className="b-font-medium">Back to Basics</span>
            </Link>
            {currentUserEntry && (
              <div className="text-right">
                <p className="b-text-sm b-text-secondary">Your Rank</p>
                <p className="b-text-2xl b-font-bold b-text-primary">{getRankDisplay(currentUserEntry.rank)}</p>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 b-mb-sm">
              <Trophy size={32} weight="fill" className="b-text-writing" />
              <h1 className="b-text-3xl b-font-bold b-text-primary">
                Basics Leaderboard
              </h1>
            </div>
            <p className="b-text-secondary">
              Top students by problems solved and points earned
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Leaderboard Type Tabs */}
        <div className="flex gap-2 mb-6">
          <span className="flex-1 min-w-0 py-3 px-4 b-rounded-lg b-font-medium text-center b-bg-writing text-white" style={{ backgroundColor: 'var(--b-writing)' }}>
            Overall
          </span>
          <Link href="/basics/leaderboard/logic" className="flex-1 min-w-0 py-3 px-4 b-rounded-lg b-font-medium text-center b-bg-muted b-text-secondary hover:b-text-primary transition-colors">
            Logic
          </Link>
          <Link href="/basics/leaderboard/writing" className="flex-1 min-w-0 py-3 px-4 b-rounded-lg b-font-medium text-center b-bg-muted b-text-secondary hover:b-text-primary transition-colors">
            Writing
          </Link>
        </div>

        {/* Time Period Selector */}
        <div className="b-card b-p-lg b-mb-lg">
          <h3 className="b-text-sm b-font-semibold b-text-secondary b-mb-md flex items-center gap-2">
            <Calendar size={18} weight="fill" />
            Time Period
          </h3>
          <div className="flex flex-wrap gap-2">
            {(['day', 'week', 'month', 'year', 'all-time'] as LeaderboardPeriod[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 min-w-[100px] py-3 px-4 b-rounded-lg b-font-medium transition-all ${
                  period === p
                    ? 'b-bg-writing b-text-inverse'
                    : 'b-bg-muted b-text-secondary hover:b-text-primary'
                }`}
                style={period === p ? { backgroundColor: 'var(--b-writing)', color: 'white' } : {}}
              >
                <div className="text-xl b-mb-xs">{getPeriodIcon(p)}</div>
                <div className="b-text-sm">{getPeriodLabel(p)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Region Selector */}
        <div className="b-card b-p-lg b-mb-lg b-bg-math-light b-border b-border-math">
          <h3 className="b-text-sm b-font-semibold b-text-math-dark b-mb-md flex items-center gap-2">
            <Globe size={18} weight="fill" />
            Filter by Region
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`py-3 px-3 b-rounded-lg b-font-medium transition-all text-center ${
                  region === r.id
                    ? 'b-bg-math b-text-inverse transform scale-105'
                    : 'b-bg-card b-text-secondary hover:b-bg-muted b-border'
                }`}
                style={region === r.id ? { backgroundColor: 'var(--b-math)', color: 'white' } : { backgroundColor: 'var(--b-bg-card)' }}
                title={r.description}
              >
                <div className="text-2xl b-mb-xs">{r.flag}</div>
                <div className="b-text-xs b-font-semibold truncate">{r.name}</div>
              </button>
            ))}
          </div>
          {region !== 'all' && (
            <div className="b-mt-md text-center">
              <span className="inline-flex items-center gap-2 b-bg-math-light b-text-math-dark px-3 py-1 b-rounded-full b-text-sm b-font-medium b-border b-border-math">
                <MapPin size={14} weight="fill" />
                <span>Showing: {REGIONS.find(r => r.id === region)?.name}</span>
                <button
                  onClick={() => setRegion('all')}
                  className="hover:opacity-70 b-font-bold"
                  title="Clear filter"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="b-feedback b-feedback-error b-mb-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="b-font-semibold">Error</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current User Card (if not in top 50) */}
        {currentUserEntry && currentUserEntry.rank > 50 && (
          <div className="b-card b-p-lg b-mb-lg b-bg-logic-light b-border-2 b-border-logic">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 b-bg-logic b-rounded-full flex items-center justify-center b-text-inverse b-text-xl b-font-bold">
                {currentUserEntry.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="b-font-semibold b-text-primary">Your Rank: {getRankDisplay(currentUserEntry.rank)}</p>
                <p className="b-text-sm b-text-secondary">{currentUserEntry.displayName}</p>
              </div>
              <div className="text-right">
                <p className="b-text-2xl b-font-bold b-text-logic">{currentUserEntry.totalPoints.toLocaleString()}</p>
                <p className="b-text-xs b-text-secondary">{currentUserEntry.problemsCorrect} correct</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="b-card overflow-hidden">
          {/* Table Header */}
          <div className="b-bg-writing b-p-lg" style={{ backgroundColor: 'var(--b-writing)' }}>
            <h2 className="b-text-lg b-font-bold b-text-inverse">
              Top 50 - {getPeriodLabel(period)}
            </h2>
            <p className="b-text-sm b-text-inverse opacity-80">
              Ranked by total engagement points earned
            </p>
          </div>

          {/* Table Body */}
          <div className="divide-y" style={{ borderColor: 'var(--b-border-light)' }}>
            {entries.length === 0 ? (
              <div className="b-p-xl text-center">
                <div className="text-6xl b-mb-lg">📚</div>
                <h3 className="b-text-xl b-font-bold b-text-primary b-mb-sm">No data yet</h3>
                <p className="b-text-secondary b-mb-lg">
                  Be the first to start learning and climb the leaderboard!
                </p>
                <Link
                  href="/"
                  className="b-btn b-btn-writing b-btn-lg"
                >
                  Start Learning
                </Link>
              </div>
            ) : (
              entries.map((entry) => {
                const isCurrentUser = entry.isCurrentUser
                const isTopThree = entry.rank <= 3

                return (
                  <div
                    key={entry.userId}
                    className={`b-p-lg flex items-center gap-4 transition-colors ${
                      isCurrentUser
                        ? 'b-bg-logic-light'
                        : isTopThree
                        ? 'b-bg-writing-light'
                        : 'hover:b-bg-muted'
                    }`}
                    style={isCurrentUser ? { borderLeft: '4px solid var(--b-logic)' } : isTopThree ? { backgroundColor: 'var(--b-writing-light)' } : {}}
                  >
                    {/* Rank Badge */}
                    <div
                      className={`w-16 h-16 b-rounded-full flex items-center justify-center b-font-bold b-text-xl shadow-sm ${
                        entry.rank === 1
                          ? 'b-bg-writing b-text-inverse'
                          : entry.rank === 2
                          ? 'b-bg-muted b-text-primary'
                          : entry.rank === 3
                          ? 'b-bg-latin-light b-text-latin-dark'
                          : 'b-bg-muted b-text-secondary'
                      }`}
                      style={entry.rank === 1 ? { backgroundColor: 'var(--b-writing)' } : entry.rank === 3 ? { backgroundColor: 'var(--b-latin-light)' } : {}}
                    >
                      {getRankDisplay(entry.rank)}
                    </div>

                    {/* User Avatar & Name */}
                    <div className="flex-1 min-w-0 flex items-center gap-3">
                      {entry.characterId ? (
                        // Character avatar for under-18 users
                        <div 
                          className="w-12 h-12 b-rounded-full flex items-center justify-center text-3xl shadow-sm border-2"
                          style={{ 
                            backgroundColor: getAvatarById(entry.characterId)?.colorScheme + '20',
                            borderColor: getAvatarById(entry.characterId)?.colorScheme
                          }}
                        >
                          {getAvatarById(entry.characterId)?.emoji || '🎭'}
                        </div>
                      ) : entry.photoURL ? (
                        // Real photo for 18+ users
                        <Image
                          src={entry.photoURL}
                          alt={entry.displayName}
                          width={48}
                          height={48}
                          className="w-12 h-12 b-rounded-full object-cover"
                        />
                      ) : (
                        // Fallback initial
                        <div className="w-12 h-12 b-bg-logic b-rounded-full flex items-center justify-center b-text-inverse b-text-lg b-font-bold">
                          {entry.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="b-font-semibold b-text-primary truncate flex items-center gap-2">
                          {entry.displayName}
                          {getRegionFlag(entry.region) && (
                            <span className="b-text-lg" title={entry.region}>
                              {getRegionFlag(entry.region)}
                            </span>
                          )}
                          {isCurrentUser && (
                            <span className="b-badge b-badge-logic">
                              You
                            </span>
                          )}
                        </p>
                        <p className="b-text-sm b-text-secondary">
                          {entry.problemsCorrect} problem{entry.problemsCorrect !== 1 ? 's' : ''} correct
                        </p>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <p className="b-text-2xl b-font-bold b-text-primary">
                        {entry.totalPoints.toLocaleString()}
                      </p>
                      <p className="b-text-xs b-text-muted">points</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Motivational Message */}
        {entries.length > 0 && (!currentUserEntry || currentUserEntry.rank > 10) && (
          <div className="b-mt-xl b-card b-p-lg b-bg-reading-light b-border b-border-reading">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💪</span>
              <div>
                <h3 className="b-font-semibold b-text-reading-dark b-mb-sm">Keep Learning!</h3>
                <p className="b-text-reading-text b-text-sm">
                  Stay active, answer questions correctly, and watch your rank climb. Every point counts!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
