/**
 * Engagement Tracking Hook
 *
 * Tracks student engagement for points system:
 * - 1 point earned every 5 seconds of active engagement
 * - Requires page visibility + mouse movement
 * - Points pending until correct answer within 10 minutes
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { debugLog } from '../basics/config'
import { logger } from '@/lib/logger'

export interface EngagementState {
  // Points
  confirmedPoints: number // Points saved to DB
  pendingPoints: number // Points at risk (not yet confirmed)
  dailyTotal: number // Today's total confirmed points
  dailyGoal: number // 1000 points/day

  // Timer
  timeUntilExpiry: number // Seconds until pending points expire (600 = 10 min)
  timerWarningLevel: 'none' | 'low' | 'medium' | 'high' | 'critical'

  // Activity
  isActive: boolean // Page visible + recent mouse movement
  lastActivity: number // Timestamp of last activity

  // Actions
  confirmPoints: () => Promise<void> // Call when answer is correct
  forfeitPoints: () => void // Call when timer expires
  resetTimer: () => void // Reset 10-minute timer
}

const POINT_INTERVAL = 5000 // 5 seconds = 1 point
const TIMER_MAX = 600 // 10 minutes in seconds
const DAILY_GOAL = 1000 // Points needed per day
const ACTIVITY_TIMEOUT = 3000 // 3 seconds without movement = inactive
const DEBOUNCE_DELAY = 300 // 300ms debounce for activity signals
const PERSIST_INTERVAL = 10000 // Persist session every 10 seconds

export function useEngagementTracking() {
  const { user } = useAuth()

  // State - only use state for values that MUST trigger re-renders when displayed
  const [confirmedPoints, setConfirmedPoints] = useState(0)
  const [pendingPoints, setPendingPoints] = useState(0)
  const [dailyTotal, setDailyTotal] = useState(0)
  const [isPageVisible, setIsPageVisible] = useState(true)
  
  // Use refs for timer values that don't need to trigger re-renders on every tick
  const timeUntilExpiryRef = useRef(TIMER_MAX)
  const lastMouseMoveRef = useRef(Date.now())
  
  // Only update this state every 10 seconds for UI display, not every second
  const [displayTimeUntilExpiry, setDisplayTimeUntilExpiry] = useState(TIMER_MAX)

  // Refs
  const pointIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const persistIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef(Date.now())
  const sessionDataRef = useRef({
    sessionStart: Date.now(),
    totalPoints: 0,
    lastPersist: Date.now()
  })

  // Use a ref for isActive to avoid recalculating on every render
  const isActiveRef = useRef(true)

  // Calculate warning level based on time remaining
  const getWarningLevel = (seconds: number): EngagementState['timerWarningLevel'] => {
    if (seconds > 300) return 'none' // > 5 min
    if (seconds > 120) return 'low' // > 2 min
    if (seconds > 60) return 'medium' // > 1 min
    if (seconds > 30) return 'high' // > 30 sec
    return 'critical' // <= 30 sec
  }

  // Persist session data to prevent loss on page unload
  const persistSession = useCallback(async () => {
    if (!user) return

    const sessionData = sessionDataRef.current
    const now = Date.now()
    
    // Only persist if there are actual points to save (API requires positive totalPoints)
    const hasPointsToSave = sessionData.totalPoints > 0 || pendingPoints > 0 || confirmedPoints > 0
    if (!hasPointsToSave) {
      debugLog('No points to persist, skipping')
      return
    }
    
    // Calculate total points including pending/confirmed from this session
    const totalPointsToSave = Math.max(1, sessionData.totalPoints + pendingPoints + confirmedPoints)
    
    try {
      const response = await fetch('/api/basics/persist-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          sessionStart: sessionData.sessionStart,
          sessionEnd: now,
          totalPoints: totalPointsToSave,
          pendingPoints,
          confirmedPoints
        })
      })

      if (response.ok) {
        sessionData.lastPersist = now
        debugLog('Session persisted successfully')
      }
    } catch (error) {
      debugLog('Failed to persist session:', error)
    }
  }, [user, pendingPoints, confirmedPoints])

  // Activity handler - just update refs, no state updates needed
  const handleActivity = useCallback(() => {
    const now = Date.now()
    lastActivityRef.current = now
    lastMouseMoveRef.current = now
    isActiveRef.current = true // User is active
    // No state update = no re-render!
  }, [])

  // Handle page visibility and persistence
  useEffect(() => {
    const handleVisibilityChange = () => {
      const wasVisible = isPageVisible
      const isNowVisible = !document.hidden
      setIsPageVisible(isNowVisible)
      
      // Persist session when page becomes hidden
      if (wasVisible && !isNowVisible) {
        persistSession()
      }
    }

    const handleBeforeUnload = () => {
      // Persist session before page unload
      persistSession()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isPageVisible, persistSession])

  // Handle mouse movement and keyboard activity
  useEffect(() => {
    debugLog('[useEngagementTracking] Setting up mouse/keyboard listeners')
    
    window.addEventListener('mousemove', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity, { passive: true })
    window.addEventListener('click', handleActivity, { passive: true })
    window.addEventListener('scroll', handleActivity, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('scroll', handleActivity)
    }
  }, [handleActivity])

  // Load daily total from Firestore on mount
  useEffect(() => {
    if (!user) return

    const loadDailyPoints = async () => {
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/basics/engagement/daily-points', {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (response.ok) {
          const data = await response.json()
          setDailyTotal(data.points || 0)
          setConfirmedPoints(0) // Start fresh session
        }
      } catch (error) {
        logger.error('Useengagementtracking', 'Failed to load daily points', { error: error })
      }
    }

    loadDailyPoints()
  }, [user])

  // Point accumulation interval (every 5 seconds) - use refs to avoid dependency cascade
  useEffect(() => {
    if (!user) {
      return
    }

    pointIntervalRef.current = setInterval(() => {
      // Read current values from refs, not state
      const activeNow = !document.hidden && (Date.now() - lastMouseMoveRef.current < ACTIVITY_TIMEOUT)
      isActiveRef.current = activeNow // Update the ref

      if (activeNow && timeUntilExpiryRef.current > 0) {
        setPendingPoints(prev => prev + 1)
      }
    }, POINT_INTERVAL)

    return () => {
      if (pointIntervalRef.current) {
        clearInterval(pointIntervalRef.current)
      }
    }
  }, [user]) // Only depend on user - interval reads from refs

  // Timer countdown (every second) - update ref, only update display state every 10 seconds
  useEffect(() => {
    if (!user) return

    let tickCount = 0
    timerIntervalRef.current = setInterval(() => {
      // Decrement ref (no re-render)
      if (timeUntilExpiryRef.current <= 0) {
        // Timer expired - forfeit pending points
        setPendingPoints(prev => {
          if (prev > 0) {
            debugLog(`Timer expired: ${prev} pending points forfeited`)
          }
          return 0
        })
        timeUntilExpiryRef.current = TIMER_MAX
      } else {
        timeUntilExpiryRef.current -= 1
      }
      
      // Only update display state every 10 ticks (10 seconds) to reduce re-renders
      tickCount++
      if (tickCount >= 10) {
        tickCount = 0
        setDisplayTimeUntilExpiry(timeUntilExpiryRef.current)
      }
    }, 1000)

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [user]) // Only depend on user

  // Periodic session persistence (every 10 seconds)
  useEffect(() => {
    if (!user) return

    persistIntervalRef.current = setInterval(() => {
      persistSession()
    }, PERSIST_INTERVAL)

    return () => {
      if (persistIntervalRef.current) {
        clearInterval(persistIntervalRef.current)
      }
    }
  }, [user, persistSession])

  // Confirm points (call when answer is correct)
  const confirmPoints = useCallback(async () => {
    if (!user || pendingPoints === 0) {
      return
    }

    try {
      const pointsToConfirm = pendingPoints
      const token = await user.getIdToken()

      const response = await fetch('/api/basics/engagement/confirm-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ points: pointsToConfirm })
      })

      const result = await response.json()

      if (response.ok) {
        // Move pending to confirmed
        setConfirmedPoints(prev => prev + pointsToConfirm)
        setDailyTotal(prev => prev + pointsToConfirm)
        setPendingPoints(0)
        timeUntilExpiryRef.current = TIMER_MAX // Reset timer ref
        setDisplayTimeUntilExpiry(TIMER_MAX) // Update display
        
        // Update session data
        sessionDataRef.current.totalPoints += pointsToConfirm
      } else {
        logger.error('Useengagementtracking', 'Failed to confirm points', { error: result })
      }
    } catch (error) {
      logger.error('Useengagementtracking', 'Error confirming points', { error: error })
    }
  }, [user, pendingPoints])

  // Forfeit points (call when timer expires)
  const forfeitPoints = useCallback(() => {
    if (pendingPoints > 0) {
      setPendingPoints(0)
    }
    timeUntilExpiryRef.current = TIMER_MAX
    setDisplayTimeUntilExpiry(TIMER_MAX)
  }, [pendingPoints])

  // Reset timer
  const resetTimer = useCallback(() => {
    timeUntilExpiryRef.current = TIMER_MAX
    setDisplayTimeUntilExpiry(TIMER_MAX)
  }, [])

  // Memoize the return object to prevent creating new object on every render
  return useMemo(() => ({
    confirmedPoints,
    pendingPoints,
    dailyTotal,
    dailyGoal: DAILY_GOAL,
    timeUntilExpiry: displayTimeUntilExpiry,
    timerWarningLevel: getWarningLevel(displayTimeUntilExpiry),
    isActive: isActiveRef.current, // Read from ref
    lastActivity: lastActivityRef.current,
    confirmPoints,
    forfeitPoints,
    resetTimer
  }), [confirmedPoints, pendingPoints, dailyTotal, displayTimeUntilExpiry, confirmPoints, forfeitPoints, resetTimer])
}
