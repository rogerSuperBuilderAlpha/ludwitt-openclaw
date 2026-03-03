'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  Target, 
  Play,
  Pause,
  Stop,
  ArrowClockwise,
  CheckCircle,
  Clock,
  Coffee,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevSkeleton, DevBadge, DevEmptyState, DevProgress } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'

type TimerState = 'idle' | 'work' | 'break' | 'paused'

const WORK_DURATION = 25 * 60 // 25 minutes in seconds
const BREAK_DURATION = 5 * 60 // 5 minutes in seconds

/**
 * Focus Mode Page - Distraction-free work with Pomodoro timer
 */
export default function FocusPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({ 
    userId: user?.uid || null, 
    isAdmin: isAdminView 
  })

  // Timer state
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [timeRemaining, setTimeRemaining] = useState(WORK_DURATION)
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  // Get in-progress documents
  const inProgressDocs = useMemo(() => {
    return submissions.filter(s => 
      s.status === 'in-progress' && 
      (isAdminView || s.assignedTo === user?.uid)
    )
  }, [submissions, user?.uid, isAdminView])

  const selectedDoc = useMemo(() => {
    return inProgressDocs.find(d => d.id === selectedDocId)
  }, [inProgressDocs, selectedDocId])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (timerState === 'work' || timerState === 'break') {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Timer completed
            if (timerState === 'work') {
              setCompletedPomodoros(p => p + 1)
              setTimerState('break')
              return BREAK_DURATION
            } else {
              setTimerState('idle')
              return WORK_DURATION
            }
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerState])

  const startWork = useCallback(() => {
    setTimerState('work')
    setTimeRemaining(WORK_DURATION)
  }, [])

  const startBreak = useCallback(() => {
    setTimerState('break')
    setTimeRemaining(BREAK_DURATION)
  }, [])

  const pause = useCallback(() => {
    setTimerState('paused')
  }, [])

  const resume = useCallback(() => {
    setTimerState(prev => prev === 'paused' ? 'work' : prev)
  }, [])

  const reset = useCallback(() => {
    setTimerState('idle')
    setTimeRemaining(WORK_DURATION)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const totalDuration = timerState === 'break' ? BREAK_DURATION : WORK_DURATION
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <DevSkeleton width={300} height={300} style={{ borderRadius: '50%' }} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--dev-bg-primary)' }}>
      {/* Minimal Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)' }}>
          <Target size={24} />
          <h1 style={{ fontSize: 'var(--dev-text-lg)', fontWeight: 'var(--dev-font-semibold)' }}>
            Focus Mode
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}>
          <DevBadge variant="success" size="sm">
            🍅 {completedPomodoros} Pomodoros
          </DevBadge>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 'var(--dev-space-5)',
        gap: 'var(--dev-space-6)',
      }}>
        {/* Document Selector (when idle) */}
        {timerState === 'idle' && !selectedDocId && (
          <DevCard padding="lg" style={{ maxWidth: 500, width: '100%' }}>
            <h2 style={{ fontSize: 'var(--dev-text-base)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-4)' }}>
              Select a document to focus on
            </h2>
            {inProgressDocs.length === 0 ? (
              <DevEmptyState
                icon={<Target size={24} />}
                title="No active documents"
                description="Claim a document to start focusing"
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
                {inProgressDocs.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    style={{
                      padding: 'var(--dev-space-3)',
                      background: 'var(--dev-bg-muted)',
                      border: '1px solid var(--dev-border-default)',
                      borderRadius: 'var(--dev-radius-md)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--dev-space-3)',
                    }}
                  >
                    <Clock size={16} style={{ color: 'var(--dev-status-in-progress)' }} />
                    <span style={{ fontWeight: 'var(--dev-font-medium)' }}>
                      {doc.googleDocTitle || 'Untitled'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </DevCard>
        )}

        {/* Timer Display */}
        {(timerState !== 'idle' || selectedDocId) && (
          <>
            {/* Selected Document */}
            {selectedDoc && (
              <div style={{ textAlign: 'center', marginBottom: 'var(--dev-space-4)' }}>
                <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)', marginBottom: 'var(--dev-space-1)' }}>
                  Focusing on
                </div>
                <div style={{ fontSize: 'var(--dev-text-lg)', fontWeight: 'var(--dev-font-semibold)' }}>
                  {selectedDoc.googleDocTitle || 'Untitled'}
                </div>
              </div>
            )}

            {/* Timer Circle */}
            <div style={{
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: `conic-gradient(
                ${timerState === 'break' ? 'var(--dev-accent-success)' : 'var(--dev-accent-primary)'} ${progress}%,
                var(--dev-bg-muted) ${progress}%
              )`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 250,
                height: 250,
                borderRadius: '50%',
                background: 'var(--dev-bg-elevated)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Status */}
                <div style={{ 
                  fontSize: 'var(--dev-text-sm)', 
                  color: 'var(--dev-text-muted)',
                  marginBottom: 'var(--dev-space-2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-1)',
                }}>
                  {timerState === 'break' ? (
                    <><Coffee size={14} /> Break</>
                  ) : timerState === 'work' ? (
                    <><Target size={14} /> Focus</>
                  ) : timerState === 'paused' ? (
                    <><Pause size={14} /> Paused</>
                  ) : (
                    <><Clock size={14} /> Ready</>
                  )}
                </div>
                
                {/* Time */}
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 'var(--dev-font-bold)',
                  fontFamily: 'var(--dev-font-mono)',
                  letterSpacing: '-0.02em',
                }}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 'var(--dev-space-3)' }}>
              {timerState === 'idle' ? (
                <DevButton variant="primary" size="lg" onClick={startWork}>
                  <Play size={20} style={{ marginRight: 8 }} />
                  Start Focus
                </DevButton>
              ) : timerState === 'paused' ? (
                <>
                  <DevButton variant="primary" size="lg" onClick={resume}>
                    <Play size={20} style={{ marginRight: 8 }} />
                    Resume
                  </DevButton>
                  <DevButton variant="secondary" size="lg" onClick={reset}>
                    <Stop size={20} style={{ marginRight: 8 }} />
                    Stop
                  </DevButton>
                </>
              ) : (
                <>
                  <DevButton variant="secondary" size="lg" onClick={pause}>
                    <Pause size={20} style={{ marginRight: 8 }} />
                    Pause
                  </DevButton>
                  <DevButton variant="ghost" size="lg" onClick={reset}>
                    <ArrowClockwise size={20} style={{ marginRight: 8 }} />
                    Reset
                  </DevButton>
                </>
              )}
            </div>

            {/* Skip to break (when working) */}
            {timerState === 'work' && (
              <DevButton variant="ghost" size="sm" onClick={startBreak}>
                Skip to break
              </DevButton>
            )}

            {/* Change document */}
            {selectedDocId && timerState === 'idle' && (
              <DevButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedDocId(null)}
              >
                Change document
              </DevButton>
            )}
          </>
        )}
      </div>

      {/* Tips */}
      {timerState === 'idle' && selectedDocId && (
        <div style={{ 
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderTop: '1px solid var(--dev-border-subtle)',
          textAlign: 'center',
          color: 'var(--dev-text-muted)',
          fontSize: 'var(--dev-text-sm)',
        }}>
          💡 Tip: Work for 25 minutes, then take a 5 minute break. Repeat 4 times, then take a longer break.
        </div>
      )}
    </div>
  )
}
