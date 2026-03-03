'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  ClockCountdown, 
  Play,
  Calendar,
  FileText,
  TrendUp,
} from '@phosphor-icons/react'
import { DevCard, DevSkeleton, DevStatCard, DevEmptyState, DevBadge } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface WorkSession {
  id: string
  documentId: string
  documentTitle: string
  startTime: Date
  duration: number // in seconds
  notes?: string
}

interface ApiSession {
  id: string
  documentId: string
  documentTitle: string
  accomplishments: string
  timeSpentMinutes: number
  sessionDate: string
  addedAt: string
}

/**
 * Work Sessions Page - Log and review work sessions
 */
export default function SessionsPage() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<WorkSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return
      setLoading(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/sessions?limit=50', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()

        if (json.success && json.data?.sessions) {
          const apiSessions: ApiSession[] = json.data.sessions
          const mapped: WorkSession[] = apiSessions.map(s => ({
            id: s.id,
            documentId: s.documentId,
            documentTitle: s.documentTitle || 'Untitled Document',
            startTime: new Date(s.sessionDate || s.addedAt),
            duration: (s.timeSpentMinutes || 0) * 60, // convert to seconds
            notes: s.accomplishments,
          }))
          setSessions(mapped)
        } else {
          setError(json.error || 'Failed to load sessions')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load sessions'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [user])

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todaySessions = sessions.filter(s => s.startTime >= today)
    const todayDuration = todaySessions.reduce((sum, s) => sum + s.duration, 0)
    
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekSessions = sessions.filter(s => s.startTime >= weekAgo)
    const weekDuration = weekSessions.reduce((sum, s) => sum + s.duration, 0)
    
    return {
      todaySessions: todaySessions.length,
      todayDuration,
      weekSessions: weekSessions.length,
      weekDuration,
      totalSessions: sessions.length,
    }
  }, [sessions])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatTime = (date: Date) => {
    if (!date || isNaN(date.getTime()) || !isFinite(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    if (!date || isNaN(date.getTime()) || !isFinite(date.getTime())) return ''
    
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    }
    
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
    }).format(date)
  }

  // Group sessions by date
  const groupedSessions = useMemo(() => {
    const groups: Record<string, WorkSession[]> = {}
    
    sessions.forEach(session => {
      const dateKey = session.startTime.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(session)
    })
    
    // Sort sessions within each group by start time (desc)
    Object.values(groups).forEach(group => {
      group.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    })
    
    return groups
  }, [sessions])

  // Get sorted date keys
  const sortedDateKeys = Object.keys(groupedSessions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3].map(i => <DevSkeleton key={i} height={80} style={{ marginBottom: 12 }} />)}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
      }}>
        <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
          Work Sessions
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Log and review your work sessions
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Error Display */}
        {error && (
          <div style={{ 
            padding: 'var(--dev-space-4)',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: 'var(--dev-radius-lg)',
            color: 'var(--dev-accent-danger)',
            marginBottom: 'var(--dev-space-4)',
          }}>
            {error}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--dev-space-4)', marginBottom: 'var(--dev-space-5)' }}>
          <DevStatCard
            title="Today"
            value={formatDuration(stats.todayDuration)}
            icon={<ClockCountdown size={20} />}
          />
          <DevStatCard
            title="This Week"
            value={formatDuration(stats.weekDuration)}
            icon={<Calendar size={20} />}
          />
          <DevStatCard
            title="Sessions Today"
            value={stats.todaySessions}
            icon={<Play size={20} />}
          />
          <DevStatCard
            title="Avg/Session"
            value={stats.totalSessions > 0 
              ? formatDuration(Math.round(stats.weekDuration / stats.weekSessions || 0))
              : '0m'}
            icon={<TrendUp size={20} />}
          />
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <DevEmptyState
            icon={<ClockCountdown size={32} />}
            title="No sessions logged"
            description="Start a focus session or track time to see your sessions here"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-5)' }}>
            {sortedDateKeys.map(dateKey => {
              const daySessions = groupedSessions[dateKey]
              const dayTotal = daySessions.reduce((sum, s) => sum + s.duration, 0)
              const displayDate = formatDate(new Date(dateKey))
              
              return (
                <div key={dateKey}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--dev-space-3)',
                  }}>
                    <span style={{ 
                      fontSize: 'var(--dev-text-sm)', 
                      fontWeight: 'var(--dev-font-semibold)',
                      color: 'var(--dev-text-secondary)',
                    }}>
                      {displayDate}
                    </span>
                    <DevBadge variant="default" size="sm">
                      {formatDuration(dayTotal)}
                    </DevBadge>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
                    {daySessions.map(session => (
                      <DevCard key={session.id} padding="sm">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dev-space-3)' }}>
                          <FileText size={20} style={{ color: 'var(--dev-text-muted)', marginTop: 2, flexShrink: 0 }} />
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              fontWeight: 'var(--dev-font-medium)',
                              marginBottom: 2,
                            }}>
                              {session.documentTitle}
                            </div>
                            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                              {formatTime(session.startTime)}
                            </div>
                            {session.notes && (
                              <div style={{ 
                                fontSize: 'var(--dev-text-xs)', 
                                color: 'var(--dev-text-secondary)',
                                marginTop: 4,
                                fontStyle: 'italic',
                              }}>
                                {session.notes}
                              </div>
                            )}
                          </div>
                          
                          <div style={{ 
                            fontSize: 'var(--dev-text-sm)',
                            fontWeight: 'var(--dev-font-semibold)',
                            fontFamily: 'var(--dev-font-mono)',
                            color: 'var(--dev-accent-primary)',
                            flexShrink: 0,
                          }}>
                            {formatDuration(session.duration)}
                          </div>
                        </div>
                      </DevCard>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
