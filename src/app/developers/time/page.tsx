'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Timer, 
  Play,
  Stop,
  Clock,
  CalendarBlank,
} from '@phosphor-icons/react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts'
import { DevCard, DevButton, DevSkeleton, DevStatCard, DevEmptyState } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'

interface TimeEntry {
  id: string
  documentId: string
  documentTitle: string
  startTime: Date
  endTime?: Date
  duration: number // in seconds
}

/**
 * Time Tracking Page - Track time spent on documents
 */
export default function TimePage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({ 
    userId: user?.uid || null, 
    isAdmin: isAdminView 
  })

  // Timer state
  const [isTracking, setIsTracking] = useState(false)
  const [currentDocId, setCurrentDocId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  
  // Time entries (in-memory for now, would be persisted to Firestore)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  // Get in-progress documents
  const inProgressDocs = useMemo(() => {
    return submissions.filter(s => 
      s.status === 'in-progress' && 
      (isAdminView || s.assignedTo === user?.uid)
    )
  }, [submissions, user?.uid, isAdminView])

  const currentDoc = useMemo(() => {
    return inProgressDocs.find(d => d.id === currentDocId)
  }, [inProgressDocs, currentDocId])

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime.getTime()) / 1000))
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, startTime])

  const startTracking = (docId: string) => {
    setCurrentDocId(docId)
    setStartTime(new Date())
    setElapsedSeconds(0)
    setIsTracking(true)
  }

  const stopTracking = () => {
    if (currentDocId && startTime) {
      const endTime = new Date()
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      
      const entry: TimeEntry = {
        id: `entry-${Date.now()}`,
        documentId: currentDocId,
        documentTitle: currentDoc?.googleDocTitle || 'Untitled',
        startTime,
        endTime,
        duration,
      }
      
      setTimeEntries(prev => [entry, ...prev])
    }
    
    setIsTracking(false)
    setCurrentDocId(null)
    setStartTime(null)
    setElapsedSeconds(0)
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    } else if (mins > 0) {
      return `${mins}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate daily totals for chart
  const dailyData = useMemo(() => {
    const now = new Date()
    const data: { day: string; hours: number }[] = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateKey = date.toISOString().split('T')[0]
      const dayEntries = timeEntries.filter(e => 
        e.startTime.toISOString().split('T')[0] === dateKey
      )
      const totalSeconds = dayEntries.reduce((sum, e) => sum + e.duration, 0)
      
      data.push({
        day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        hours: Math.round((totalSeconds / 3600) * 10) / 10,
      })
    }
    
    return data
  }, [timeEntries])

  // Today's total
  const todayTotal = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayEntries = timeEntries.filter(e => 
      e.startTime.toISOString().split('T')[0] === today
    )
    return todayEntries.reduce((sum, e) => sum + e.duration, 0)
  }, [timeEntries])

  // This week's total
  const weekTotal = useMemo(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weekEntries = timeEntries.filter(e => e.startTime >= weekAgo)
    return weekEntries.reduce((sum, e) => sum + e.duration, 0)
  }, [timeEntries])

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          <DevSkeleton height={200} />
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
          Time Tracking
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Track time spent on documents
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Active Timer */}
        <DevCard padding="lg" style={{ marginBottom: 'var(--dev-space-5)' }}>
          {isTracking && currentDoc ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)', marginBottom: 'var(--dev-space-2)' }}>
                Currently tracking
              </div>
              <div style={{ fontSize: 'var(--dev-text-lg)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
                {currentDoc.googleDocTitle || 'Untitled'}
              </div>
              <div style={{ 
                fontSize: '3rem', 
                fontWeight: 'var(--dev-font-bold)', 
                fontFamily: 'var(--dev-font-mono)',
                color: 'var(--dev-accent-primary)',
                marginBottom: 'var(--dev-space-4)',
              }}>
                {formatTime(elapsedSeconds)}
              </div>
              <DevButton variant="danger" onClick={stopTracking}>
                <Stop size={16} style={{ marginRight: 8 }} />
                Stop Tracking
              </DevButton>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 'var(--dev-text-base)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-3)' }}>
                Start tracking time
              </div>
              {inProgressDocs.length === 0 ? (
                <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
                  No active documents to track
                </p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dev-space-2)' }}>
                  {inProgressDocs.map(doc => (
                    <DevButton 
                      key={doc.id}
                      variant="secondary" 
                      size="sm"
                      onClick={() => startTracking(doc.id)}
                    >
                      <Play size={12} style={{ marginRight: 4 }} />
                      {(doc.googleDocTitle || 'Untitled').slice(0, 30)}
                    </DevButton>
                  ))}
                </div>
              )}
            </div>
          )}
        </DevCard>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--dev-space-4)', marginBottom: 'var(--dev-space-5)' }}>
          <DevStatCard
            title="Today"
            value={formatDuration(todayTotal)}
            icon={<Clock size={20} />}
          />
          <DevStatCard
            title="This Week"
            value={formatDuration(weekTotal)}
            icon={<CalendarBlank size={20} />}
          />
          <DevStatCard
            title="Entries"
            value={timeEntries.length}
            icon={<Timer size={20} />}
          />
        </div>

        {/* Chart */}
        <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <h2 style={{ fontSize: 'var(--dev-text-base)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
            Daily Time (Last 7 Days)
          </h2>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--dev-border-subtle)" />
                <XAxis dataKey="day" stroke="var(--dev-text-muted)" fontSize={12} />
                <YAxis stroke="var(--dev-text-muted)" fontSize={12} tickFormatter={(v) => `${v}h`} />
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--dev-bg-elevated)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 8,
                  }}
                  formatter={(value: number) => [`${value} hours`, 'Time']}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DevCard>

        {/* Recent Entries */}
        <DevCard padding="md">
          <h2 style={{ fontSize: 'var(--dev-text-base)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
            Recent Time Entries
          </h2>
          {timeEntries.length === 0 ? (
            <DevEmptyState
              icon={<Timer size={24} />}
              title="No time entries yet"
              description="Start tracking time on a document"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
              {timeEntries.slice(0, 10).map(entry => (
                <div 
                  key={entry.id}
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'var(--dev-font-medium)', fontSize: 'var(--dev-text-sm)' }}>
                      {entry.documentTitle}
                    </div>
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                      {entry.startTime.toLocaleTimeString()} - {entry.endTime?.toLocaleTimeString() || 'Now'}
                    </div>
                  </div>
                  <div style={{ 
                    fontWeight: 'var(--dev-font-semibold)', 
                    fontFamily: 'var(--dev-font-mono)',
                    fontSize: 'var(--dev-text-sm)',
                  }}>
                    {formatDuration(entry.duration)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DevCard>
      </div>
    </div>
  )
}
