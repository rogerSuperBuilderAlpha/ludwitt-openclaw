/**
 * Telemetry Collector
 * 
 * Client-side hook for collecting interaction events during problem-solving.
 * Designed to be lightweight and non-intrusive while capturing rich behavioral data.
 */

'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { logger } from '@/lib/logger'
import {
  InteractionEvent,
  SessionTelemetry,
  SessionSignals,
  SessionOutcome,
  TELEMETRY_CONFIG
} from './types'

// ============================================================================
// Types
// ============================================================================

interface TelemetryCollectorOptions {
  problemId: string
  userId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'writing'
  difficulty: number
  skills: string[]
  
  // Optional callbacks
  onFlush?: (session: SessionTelemetry) => Promise<void>
  /** Optional function to get auth token for API calls */
  getToken?: () => Promise<string>
  
  // Configuration overrides
  maxEvents?: number
  pauseThresholdMs?: number
}

interface TelemetryCollectorState {
  isCollecting: boolean
  eventCount: number
  elapsedMs: number
  lastActivityMs: number
}

interface TelemetryCollectorReturn {
  // Event tracking methods
  trackKeystroke: (keyType: 'char' | 'backspace' | 'delete' | 'enter' | 'tab' | 'arrow' | 'other') => void
  trackRevision: (changeType: 'insert' | 'delete' | 'replace', charCount: number) => void
  trackFocusChange: (hasFocus: boolean) => void
  trackScroll: (scrollDepth: number) => void
  trackHintRequest: () => void
  trackHintView: () => void
  trackAnswerChange: (answerLength: number, changeFromPrevious: number) => void
  trackDictionaryLookup: (word: string) => void
  
  // Session control
  start: () => void
  pause: () => void
  resume: () => void
  flush: (outcome: SessionOutcome) => Promise<void>
  
  // State
  state: TelemetryCollectorState
  
  // Get current signals (for struggle detection)
  getCurrentSignals: () => Partial<SessionSignals>
  
  // Get raw events (for analysis)
  getEvents: () => InteractionEvent[]
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useTelemetryCollector(
  options: TelemetryCollectorOptions
): TelemetryCollectorReturn {
  const {
    problemId,
    userId,
    subject,
    difficulty,
    skills,
    onFlush,
    getToken,
    maxEvents = TELEMETRY_CONFIG.MAX_EVENTS_PER_SESSION,
    pauseThresholdMs = TELEMETRY_CONFIG.PAUSE_THRESHOLD_MS
  } = options
  
  // Refs for mutable state that shouldn't trigger re-renders
  const eventsRef = useRef<InteractionEvent[]>([])
  const startTimeRef = useRef<number>(Date.now())
  const lastActivityRef = useRef<number>(Date.now())
  const isPausedRef = useRef<boolean>(false)
  const pauseStartRef = useRef<number | null>(null)
  const totalPauseTimeRef = useRef<number>(0)
  
  // State for external visibility
  const [state, setState] = useState<TelemetryCollectorState>({
    isCollecting: true,
    eventCount: 0,
    elapsedMs: 0,
    lastActivityMs: 0
  })
  
  // Session ID (unique per problem attempt)
  const sessionIdRef = useRef<string>(
    `${userId}-${problemId}-${Date.now()}`
  )
  
  // ============================================================================
  // Helper Functions
  // ============================================================================
  
  const getTimestamp = useCallback(() => {
    return Date.now() - startTimeRef.current
  }, [])
  
  const addEvent = useCallback((event: InteractionEvent) => {
    if (isPausedRef.current) return
    if (eventsRef.current.length >= maxEvents) return
    
    eventsRef.current.push(event)
    lastActivityRef.current = Date.now()
    
    // Update state periodically (not on every event for performance)
    if (eventsRef.current.length % 10 === 0) {
      setState(prev => ({
        ...prev,
        eventCount: eventsRef.current.length,
        elapsedMs: Date.now() - startTimeRef.current,
        lastActivityMs: Date.now() - lastActivityRef.current
      }))
    }
  }, [maxEvents])
  
  const detectPauses = useCallback(() => {
    const now = Date.now()
    const timeSinceLastActivity = now - lastActivityRef.current
    
    // If no activity for pause threshold, record a pause
    if (timeSinceLastActivity >= pauseThresholdMs && pauseStartRef.current === null) {
      pauseStartRef.current = lastActivityRef.current
      addEvent({
        type: 'pause_start',
        timestamp: getTimestamp() - timeSinceLastActivity,
        data: {}
      })
    }
  }, [pauseThresholdMs, addEvent, getTimestamp])
  
  const endPauseIfActive = useCallback(() => {
    if (pauseStartRef.current !== null) {
      const pauseDuration = Date.now() - pauseStartRef.current
      totalPauseTimeRef.current += pauseDuration
      
      addEvent({
        type: 'pause_end',
        timestamp: getTimestamp(),
        data: { duration: pauseDuration }
      })
      
      pauseStartRef.current = null
    }
  }, [addEvent, getTimestamp])
  
  // ============================================================================
  // Pause Detection Timer
  // ============================================================================
  
  useEffect(() => {
    const interval = setInterval(() => {
      detectPauses()
      
      // Update elapsed time
      setState(prev => ({
        ...prev,
        elapsedMs: Date.now() - startTimeRef.current
      }))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [detectPauses])
  
  // ============================================================================
  // Event Tracking Methods
  // ============================================================================
  
  const trackKeystroke = useCallback((
    keyType: 'char' | 'backspace' | 'delete' | 'enter' | 'tab' | 'arrow' | 'other'
  ) => {
    endPauseIfActive()
    addEvent({
      type: 'keystroke',
      timestamp: getTimestamp(),
      data: { keyType }
    })
  }, [addEvent, getTimestamp, endPauseIfActive])
  
  const trackRevision = useCallback((
    changeType: 'insert' | 'delete' | 'replace',
    charCount: number
  ) => {
    endPauseIfActive()
    addEvent({
      type: 'revision',
      timestamp: getTimestamp(),
      data: { 
        changeType, 
        charCount,
        position: 'middle' // Could be enhanced to detect actual position
      }
    })
  }, [addEvent, getTimestamp, endPauseIfActive])
  
  const trackFocusChange = useCallback((hasFocus: boolean) => {
    addEvent({
      type: 'focus_change',
      timestamp: getTimestamp(),
      data: { hasFocus }
    })
    
    if (!hasFocus) {
      // Lost focus - this is meaningful for engagement analysis
    } else {
      endPauseIfActive()
    }
  }, [addEvent, getTimestamp, endPauseIfActive])
  
  const trackScroll = useCallback((scrollDepth: number) => {
    // Debounced scroll tracking - only record significant changes
    addEvent({
      type: 'scroll',
      timestamp: getTimestamp(),
      data: { scrollDepth }
    })
  }, [addEvent, getTimestamp])
  
  const trackHintRequest = useCallback(() => {
    endPauseIfActive()
    addEvent({
      type: 'hint_request',
      timestamp: getTimestamp(),
      data: {}
    })
  }, [addEvent, getTimestamp, endPauseIfActive])
  
  const trackHintView = useCallback(() => {
    addEvent({
      type: 'hint_view',
      timestamp: getTimestamp(),
      data: {}
    })
  }, [addEvent, getTimestamp])
  
  const trackAnswerChange = useCallback((
    answerLength: number,
    changeFromPrevious: number
  ) => {
    endPauseIfActive()
    addEvent({
      type: 'answer_change',
      timestamp: getTimestamp(),
      data: {
        answerLength,
        changeFromPrevious,
        containsNumber: false, // Could be enhanced
        containsVariable: false,
        containsOperator: false
      }
    })
  }, [addEvent, getTimestamp, endPauseIfActive])
  
  const trackDictionaryLookup = useCallback((word: string) => {
    addEvent({
      type: 'dictionary_lookup',
      timestamp: getTimestamp(),
      data: { wordLength: word.length }
    })
  }, [addEvent, getTimestamp])
  
  // ============================================================================
  // Session Control
  // ============================================================================
  
  const start = useCallback(() => {
    startTimeRef.current = Date.now()
    lastActivityRef.current = Date.now()
    eventsRef.current = []
    isPausedRef.current = false
    totalPauseTimeRef.current = 0
    pauseStartRef.current = null
    sessionIdRef.current = `${userId}-${problemId}-${Date.now()}`
    
    setState({
      isCollecting: true,
      eventCount: 0,
      elapsedMs: 0,
      lastActivityMs: 0
    })
  }, [userId, problemId])
  
  const pause = useCallback(() => {
    isPausedRef.current = true
    setState(prev => ({ ...prev, isCollecting: false }))
  }, [])
  
  const resume = useCallback(() => {
    isPausedRef.current = false
    lastActivityRef.current = Date.now()
    setState(prev => ({ ...prev, isCollecting: true }))
  }, [])
  
  // ============================================================================
  // Signal Computation
  // ============================================================================
  
  const getCurrentSignals = useCallback((): Partial<SessionSignals> => {
    const events = eventsRef.current
    const now = Date.now()
    const totalTimeMs = now - startTimeRef.current
    const activeTimeMs = totalTimeMs - totalPauseTimeRef.current
    
    // Count events by type
    const keystrokeEvents = events.filter(e => e.type === 'keystroke')
    const revisionEvents = events.filter(e => e.type === 'revision')
    const pauseEndEvents = events.filter(e => e.type === 'pause_end')
    const focusLossEvents = events.filter(e => 
      e.type === 'focus_change' && !e.data.hasFocus
    )
    const hintRequestEvents = events.filter(e => e.type === 'hint_request')
    const hintViewEvents = events.filter(e => e.type === 'hint_view')
    const answerChangeEvents = events.filter(e => e.type === 'answer_change')
    const scrollEvents = events.filter(e => e.type === 'scroll')
    
    // Calculate metrics
    const keystrokeCount = keystrokeEvents.length
    const keystrokeRate = activeTimeMs > 0 
      ? (keystrokeCount / activeTimeMs) * 60000 // Per minute
      : 0
    
    const revisionCount = revisionEvents.length
    const deletionCount = revisionEvents.filter(e => e.data.changeType === 'delete').length
    const deletionRatio = keystrokeCount > 0 ? deletionCount / keystrokeCount : 0
    
    // Pause analysis
    const pauseDurations = pauseEndEvents.map(e => e.data.duration as number)
    const avgPauseLengthMs = pauseDurations.length > 0
      ? pauseDurations.reduce((a, b) => a + b, 0) / pauseDurations.length
      : 0
    const maxPauseLengthMs = pauseDurations.length > 0
      ? Math.max(...pauseDurations)
      : 0
    
    // First keystroke timing
    const firstKeystrokeMs = keystrokeEvents.length > 0
      ? keystrokeEvents[0].timestamp
      : totalTimeMs
    
    // Answer changes
    const lastAnswerChange = answerChangeEvents[answerChangeEvents.length - 1]
    const finalAnswerLength = lastAnswerChange?.data.answerLength as number ?? 0
    
    // Scroll depth
    const scrollDepth = scrollEvents.length > 0
      ? Math.max(...scrollEvents.map(e => e.data.scrollDepth as number))
      : 0
    
    return {
      totalTimeMs,
      activeTimeMs,
      firstKeystrokeMs,
      timeToFirstAttemptMs: 0, // Set on first submit attempt
      keystrokeCount,
      keystrokeRate,
      revisionCount,
      deletionCount,
      deletionRatio,
      majorRevisions: revisionEvents.filter(e => (e.data.charCount as number) > 5).length,
      pauseCount: pauseEndEvents.length,
      avgPauseLengthMs,
      maxPauseLengthMs,
      pausePattern: pauseDurations.slice(-10), // Last 10 pauses
      focusLossCount: focusLossEvents.length,
      scrollCount: scrollEvents.length,
      scrollDepth,
      hintRequests: hintRequestEvents.length,
      hintViews: hintViewEvents.length,
      answerChanges: answerChangeEvents.length,
      finalAnswerLength
    }
  }, [])
  
  const getEvents = useCallback(() => {
    return [...eventsRef.current]
  }, [])
  
  // ============================================================================
  // Flush to Server
  // ============================================================================
  
  const flush = useCallback(async (outcome: SessionOutcome) => {
    const signals = getCurrentSignals() as SessionSignals
    
    const session: SessionTelemetry = {
      sessionId: sessionIdRef.current,
      userId,
      problemId,
      subject,
      difficulty,
      skills,
      startTime: new Date(startTimeRef.current),
      endTime: new Date(),
      events: eventsRef.current,
      signals,
      outcome
    }
    
    // Call custom flush handler if provided
    if (onFlush) {
      await onFlush(session)
    } else {
      // Default: send to API
      try {
        // Build headers with auth token if available
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (getToken) {
          try {
            const token = await getToken()
            if (token) {
              headers['Authorization'] = `Bearer ${token}`
            }
          } catch (tokenError) {
            logger.warn('TelemetryCollector', 'Failed to get auth token for telemetry', { error: tokenError })
          }
        }
        
        await fetch('/api/telemetry/submit', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            sessionId: session.sessionId,
            userId: session.userId,
            problemId: session.problemId,
            subject: session.subject,
            difficulty: session.difficulty,
            skills: session.skills,
            startTime: session.startTime.toISOString(),
            endTime: session.endTime?.toISOString(),
            signals: session.signals,
            outcome: session.outcome,
            // Don't send raw events by default (too much data)
            eventCount: session.events.length
          })
        })
      } catch (error) {
        logger.error('TelemetryCollector', 'Failed to flush telemetry', { error })
      }
    }
    
    // Reset for next session
    start()
  }, [getCurrentSignals, userId, problemId, subject, difficulty, skills, onFlush, getToken, start])
  
  // ============================================================================
  // Return
  // ============================================================================
  
  return {
    // Event tracking
    trackKeystroke,
    trackRevision,
    trackFocusChange,
    trackScroll,
    trackHintRequest,
    trackHintView,
    trackAnswerChange,
    trackDictionaryLookup,
    
    // Session control
    start,
    pause,
    resume,
    flush,
    
    // State
    state,
    
    // Analysis
    getCurrentSignals,
    getEvents
  }
}

// ============================================================================
// Input Wrapper Hook (for easy integration with form inputs)
// ============================================================================

interface TelemetryInputOptions {
  collector: TelemetryCollectorReturn
}

/**
 * Wrap an input element to automatically track telemetry
 */
export function useTelemetryInput({ collector }: TelemetryInputOptions) {
  const previousValueRef = useRef<string>('')
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    let keyType: 'char' | 'backspace' | 'delete' | 'enter' | 'tab' | 'arrow' | 'other'
    
    switch (e.key) {
      case 'Backspace':
        keyType = 'backspace'
        break
      case 'Delete':
        keyType = 'delete'
        break
      case 'Enter':
        keyType = 'enter'
        break
      case 'Tab':
        keyType = 'tab'
        break
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowUp':
      case 'ArrowDown':
        keyType = 'arrow'
        break
      default:
        keyType = e.key.length === 1 ? 'char' : 'other'
    }
    
    collector.trackKeystroke(keyType)
  }, [collector])
  
  const handleChange = useCallback((value: string) => {
    const previousValue = previousValueRef.current
    const changeAmount = Math.abs(value.length - previousValue.length)
    
    if (value.length > previousValue.length) {
      collector.trackRevision('insert', changeAmount)
    } else if (value.length < previousValue.length) {
      collector.trackRevision('delete', changeAmount)
    } else if (value !== previousValue) {
      collector.trackRevision('replace', changeAmount)
    }
    
    // Track answer change
    const editDistance = levenshteinDistance(previousValue, value)
    collector.trackAnswerChange(value.length, editDistance)
    
    previousValueRef.current = value
  }, [collector])
  
  const handleFocus = useCallback(() => {
    collector.trackFocusChange(true)
  }, [collector])
  
  const handleBlur = useCallback(() => {
    collector.trackFocusChange(false)
  }, [collector])
  
  return {
    onKeyDown: handleKeyDown,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calculate Levenshtein edit distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  
  const matrix: number[][] = []
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  return matrix[b.length][a.length]
}
