/**
 * Work Timer Hook
 *
 * Tracks student work time and triggers break interventions based on:
 * - 20-20-20 rule for eye strain (every 20 minutes)
 * - Pomodoro technique for cognitive load (every 25 minutes)
 * - Physical movement breaks (every 30-40 minutes)
 * - Adaptive intervals based on user behavior
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { logger } from '@/lib/logger'

export interface BreakIntervention {
  type: 'eye' | 'cognitive' | 'physical' | 'long'
  title: string
  message: string
  duration: number // seconds
  action: string
  icon: string
}

export interface WorkTimerState {
  totalWorkTime: number // seconds
  sessionStartTime: number // timestamp
  lastBreakTime: number // timestamp
  consecutiveWorkTime: number // seconds since last break
  breakCount: number
  interventions: BreakIntervention[]
  showIntervention: boolean
  currentIntervention: BreakIntervention | null
  isPaused: boolean // true when mouse inactive for 30+ seconds
  pausedAt: number | null // timestamp when paused
  accumulatedPausedTime: number // total seconds paused
}

// Research-based intervals (in seconds)
const EYE_BREAK_INTERVAL = 20 * 60 // 20 minutes - 20-20-20 rule
const COGNITIVE_BREAK_INTERVAL = 25 * 60 // 25 minutes - Pomodoro
const PHYSICAL_BREAK_INTERVAL = 30 * 60 // 30 minutes - movement
const LONG_BREAK_INTERVAL = 2 * 60 * 60 // 2 hours - extended break

// Behavior tracking thresholds
const SLOW_INTERACTION_THRESHOLD = 30000 // 30 seconds between interactions suggests fatigue
const HIGH_ERROR_RATE_THRESHOLD = 0.4 // 40% error rate suggests cognitive overload
const MOUSE_INACTIVITY_THRESHOLD = 30000 // 30 seconds - pause timer if mouse inactive

interface BehaviorMetrics {
  lastInteractionTime: number
  interactionCount: number
  problemCount: number
  errorCount: number
  averageTimePerProblem: number
  recentErrors: number[]
}

const EYE_BREAKS: BreakIntervention[] = [
  {
    type: 'eye',
    title: '👁️ Eye Break Time',
    message:
      'Follow the 20-20-20 rule: Look at something 20 feet away for 20 seconds',
    duration: 20,
    action: 'Look away and focus on something distant',
    icon: '👁️',
  },
  {
    type: 'eye',
    title: '👀 Rest Your Eyes',
    message: 'Close your eyes for 10 seconds, then blink rapidly a few times',
    duration: 10,
    action: 'Close your eyes and relax',
    icon: '👀',
  },
  {
    type: 'eye',
    title: '🌳 Look Outside',
    message: 'Take 15 seconds to look out a window or at something far away',
    duration: 15,
    action: 'Focus on something in the distance',
    icon: '🌳',
  },
]

const COGNITIVE_BREAKS: BreakIntervention[] = [
  {
    type: 'cognitive',
    title: '🧠 Mental Reset',
    message:
      'Take a 2-minute break. Stand up, stretch, or take a few deep breaths',
    duration: 120,
    action: 'Stand up and move around',
    icon: '🧠',
  },
  {
    type: 'cognitive',
    title: '💭 Mindful Moment',
    message: 'Take 90 seconds to breathe deeply and clear your mind',
    duration: 90,
    action: 'Practice deep breathing',
    icon: '💭',
  },
  {
    type: 'cognitive',
    title: '☕ Quick Refresh',
    message: 'Step away for 2 minutes. Get some water or just walk around',
    duration: 120,
    action: 'Take a short walk',
    icon: '☕',
  },
]

const PHYSICAL_BREAKS: BreakIntervention[] = [
  {
    type: 'physical',
    title: '🏃 Movement Break',
    message:
      'Stand up and do some light stretching or walk around for 3 minutes',
    duration: 180,
    action: 'Stand up and stretch',
    icon: '🏃',
  },
  {
    type: 'physical',
    title: '🤸 Quick Exercise',
    message:
      'Do 10 jumping jacks or some light exercises to get your blood flowing',
    duration: 60,
    action: 'Do some light exercise',
    icon: '🤸',
  },
  {
    type: 'physical',
    title: '🚶 Walk Around',
    message: 'Take a 2-minute walk around your space to prevent stiffness',
    duration: 120,
    action: 'Walk around',
    icon: '🚶',
  },
]

const LONG_BREAKS: BreakIntervention[] = [
  {
    type: 'long',
    title: '🌴 Extended Break',
    message:
      "You've been working hard! Take a 10-15 minute break. Get some fresh air, have a snack, or do something you enjoy",
    duration: 600,
    action: 'Take a longer break',
    icon: '🌴',
  },
]

export function useWorkTimer(userId?: string | null) {
  // Use refs for values that update frequently but don't need to trigger re-renders
  const sessionStartTimeRef = useRef(Date.now())
  const lastBreakTimeRef = useRef(Date.now())
  const consecutiveWorkTimeRef = useRef(0)
  const totalWorkTimeRef = useRef(0)
  const isPausedRef = useRef(false)
  const pausedAtRef = useRef<number | null>(null)
  const accumulatedPausedTimeRef = useRef(0)

  // Only use state for values that MUST trigger re-renders (UI changes)
  const [state, setState] = useState<WorkTimerState>({
    totalWorkTime: 0,
    sessionStartTime: Date.now(),
    lastBreakTime: Date.now(),
    consecutiveWorkTime: 0,
    breakCount: 0,
    interventions: [],
    showIntervention: false,
    currentIntervention: null,
    isPaused: false,
    pausedAt: null,
    accumulatedPausedTime: 0,
  })

  const [behaviorMetrics, setBehaviorMetrics] = useState<BehaviorMetrics>({
    lastInteractionTime: Date.now(),
    interactionCount: 0,
    problemCount: 0,
    errorCount: 0,
    averageTimePerProblem: 0,
    recentErrors: [],
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const interventionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSaveRef = useRef(Date.now())
  const lastMouseMoveRef = useRef(Date.now())
  const pauseCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  // Ref to track showIntervention without causing effect re-runs
  const showInterventionRef = useRef(false)
  // Ref to hold stable triggerIntervention function
  const triggerInterventionRef = useRef<
    ((type?: 'eye' | 'cognitive' | 'physical' | 'long') => void) | null
  >(null)
  // Track ad-hoc setTimeout IDs so they can be cleared on unmount
  const pendingTimeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(
    new Set()
  )

  // Clear all pending timeouts on unmount
  useEffect(() => {
    const timeouts = pendingTimeoutsRef.current
    return () => {
      for (const tid of timeouts) {
        clearTimeout(tid)
      }
      timeouts.clear()
    }
  }, [])

  // Load saved state from localStorage
  useEffect(() => {
    if (!userId) return

    try {
      const saved = localStorage.getItem(`workTimer_${userId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        const now = Date.now()
        const timeSinceLastSave = (now - parsed.lastSave) / 1000

        setState((prev) => ({
          ...prev,
          sessionStartTime: parsed.sessionStartTime || now,
          lastBreakTime: parsed.lastBreakTime || now,
          consecutiveWorkTime: Math.min(
            parsed.consecutiveWorkTime + timeSinceLastSave,
            LONG_BREAK_INTERVAL
          ),
          breakCount: parsed.breakCount || 0,
        }))
      }
    } catch (error) {
      logger.error('UseWorkTimer', 'Failed to load work timer state', { error })
    }
  }, [userId])

  // Save state periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (!userId) return

      try {
        const toSave = {
          sessionStartTime: state.sessionStartTime,
          lastBreakTime: state.lastBreakTime,
          consecutiveWorkTime: state.consecutiveWorkTime,
          breakCount: state.breakCount,
          lastSave: Date.now(),
        }
        localStorage.setItem(`workTimer_${userId}`, JSON.stringify(toSave))
      } catch (error) {
        logger.error('UseWorkTimer', 'Failed to save work timer state', {
          error,
        })
      }
    }, 30000) // Save every 30 seconds

    return () => clearInterval(saveInterval)
  }, [
    userId,
    state.sessionStartTime,
    state.lastBreakTime,
    state.consecutiveWorkTime,
    state.breakCount,
  ])

  // Determine which intervention to show based on time and behavior
  const determineIntervention = useCallback((): BreakIntervention | null => {
    const consecutiveTime = consecutiveWorkTimeRef.current

    // Long break (2+ hours)
    if (consecutiveTime >= LONG_BREAK_INTERVAL) {
      return LONG_BREAKS[0]
    }

    // Physical break (30+ minutes)
    if (consecutiveTime >= PHYSICAL_BREAK_INTERVAL) {
      const index = Math.floor(Math.random() * PHYSICAL_BREAKS.length)
      return PHYSICAL_BREAKS[index]
    }

    // Cognitive break (25+ minutes) - Pomodoro
    if (consecutiveTime >= COGNITIVE_BREAK_INTERVAL) {
      const index = Math.floor(Math.random() * COGNITIVE_BREAKS.length)
      return COGNITIVE_BREAKS[index]
    }

    // Eye break (20+ minutes) - 20-20-20 rule
    if (consecutiveTime >= EYE_BREAK_INTERVAL) {
      const index = Math.floor(Math.random() * EYE_BREAKS.length)
      return EYE_BREAKS[index]
    }

    return null
  }, []) // No dependencies - reads from refs

  // Trigger a specific type of intervention
  const triggerIntervention = useCallback(
    (type?: 'eye' | 'cognitive' | 'physical' | 'long') => {
      if (state.showIntervention) return // Don't interrupt existing break

      let intervention: BreakIntervention | null = null

      if (type) {
        // Force specific type
        switch (type) {
          case 'eye':
            intervention =
              EYE_BREAKS[Math.floor(Math.random() * EYE_BREAKS.length)]
            break
          case 'cognitive':
            intervention =
              COGNITIVE_BREAKS[
                Math.floor(Math.random() * COGNITIVE_BREAKS.length)
              ]
            break
          case 'physical':
            intervention =
              PHYSICAL_BREAKS[
                Math.floor(Math.random() * PHYSICAL_BREAKS.length)
              ]
            break
          case 'long':
            intervention = LONG_BREAKS[0]
            break
        }
      } else {
        // Auto-determine based on time
        intervention = determineIntervention()
      }

      if (intervention) {
        setState((prev) => ({
          ...prev,
          showIntervention: true,
          currentIntervention: intervention,
          interventions: [...prev.interventions, intervention!],
        }))
      }
    },
    [state.showIntervention, determineIntervention]
  )

  // Keep refs in sync with state/callbacks to avoid effect re-runs
  useEffect(() => {
    showInterventionRef.current = state.showIntervention
  }, [state.showIntervention])

  useEffect(() => {
    triggerInterventionRef.current = triggerIntervention
  }, [triggerIntervention])

  // Track mouse movement specifically
  const trackMouseMovement = useCallback(() => {
    const now = Date.now()
    lastMouseMoveRef.current = now

    setBehaviorMetrics((prev) => ({
      ...prev,
      lastInteractionTime: now,
      interactionCount: prev.interactionCount + 1,
    }))

    // Resume timer if it was paused - this will be handled by the pause check interval
    // but we update the ref immediately so the next check sees the movement
  }, [])

  // Track user interactions (non-mouse) - use refs for time checks
  const trackInteraction = useCallback(() => {
    const now = Date.now()

    setBehaviorMetrics((prev) => {
      const timeSinceLastInteraction = now - prev.lastInteractionTime

      // If interaction is slow, might indicate fatigue
      if (
        timeSinceLastInteraction > SLOW_INTERACTION_THRESHOLD &&
        consecutiveWorkTimeRef.current > 15 * 60
      ) {
        // Suggest a break if user seems fatigued
        const tid = setTimeout(() => {
          pendingTimeoutsRef.current.delete(tid)
          triggerIntervention('cognitive')
        }, 100)
        pendingTimeoutsRef.current.add(tid)
      }

      return {
        ...prev,
        lastInteractionTime: now,
        interactionCount: prev.interactionCount + 1,
      }
    })
  }, [triggerIntervention])

  // Track problem completion - use refs for time checks
  const trackProblemComplete = useCallback(
    (wasCorrect: boolean, timeSpent: number) => {
      setBehaviorMetrics((prev) => {
        const newErrorCount = prev.errorCount + (wasCorrect ? 0 : 1)
        const newProblemCount = prev.problemCount + 1

        const recentErrors = [...prev.recentErrors, wasCorrect ? 0 : 1].slice(
          -10
        )
        const recentErrorRate =
          recentErrors.reduce((a, b) => a + b, 0) / recentErrors.length

        // If error rate is high, suggest cognitive break
        if (
          recentErrorRate > HIGH_ERROR_RATE_THRESHOLD &&
          consecutiveWorkTimeRef.current > 10 * 60
        ) {
          const tid = setTimeout(() => {
            pendingTimeoutsRef.current.delete(tid)
            triggerIntervention('cognitive')
          }, 1000)
          pendingTimeoutsRef.current.add(tid)
        }

        return {
          ...prev,
          problemCount: newProblemCount,
          errorCount: newErrorCount,
          averageTimePerProblem:
            (prev.averageTimePerProblem * prev.problemCount + timeSpent) /
            newProblemCount,
          recentErrors,
        }
      })
    },
    [triggerIntervention]
  )

  // Complete the current break
  const completeBreak = useCallback(() => {
    const now = Date.now()
    lastBreakTimeRef.current = now
    consecutiveWorkTimeRef.current = 0
    accumulatedPausedTimeRef.current = 0

    setState((prev) => ({
      ...prev,
      showIntervention: false,
      currentIntervention: null,
      lastBreakTime: now,
      consecutiveWorkTime: 0,
      breakCount: prev.breakCount + 1,
    }))
  }, [])

  // Skip the current break (not recommended, but allow it)
  const skipBreak = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showIntervention: false,
      currentIntervention: null,
    }))
  }, [])

  // Check for mouse inactivity and pause/resume timer - use refs only, no state updates
  useEffect(() => {
    if (!userId) return

    pauseCheckIntervalRef.current = setInterval(() => {
      const now = Date.now()
      const timeSinceLastMouseMove = now - lastMouseMoveRef.current

      // If mouse inactive for 30+ seconds and not already paused
      if (
        timeSinceLastMouseMove >= MOUSE_INACTIVITY_THRESHOLD &&
        !isPausedRef.current
      ) {
        isPausedRef.current = true
        pausedAtRef.current = now
      }

      // If mouse moved and was paused, resume
      if (
        timeSinceLastMouseMove < MOUSE_INACTIVITY_THRESHOLD &&
        isPausedRef.current &&
        pausedAtRef.current
      ) {
        const pausedDuration = (now - pausedAtRef.current) / 1000
        accumulatedPausedTimeRef.current += pausedDuration
        isPausedRef.current = false
        pausedAtRef.current = null
      }
    }, 5000) // Check every 5 seconds instead of every second

    return () => {
      if (pauseCheckIntervalRef.current) {
        clearInterval(pauseCheckIntervalRef.current)
        pauseCheckIntervalRef.current = null
      }
    }
  }, [userId])

  // Main timer - updates refs only, NO state updates for time tracking
  useEffect(() => {
    if (!userId) return

    // Update refs silently (no re-renders)
    timerRef.current = setInterval(() => {
      if (isPausedRef.current) return

      const now = Date.now()
      const baseConsecutiveTime = (now - lastBreakTimeRef.current) / 1000
      consecutiveWorkTimeRef.current = Math.max(
        0,
        baseConsecutiveTime - accumulatedPausedTimeRef.current
      )
      totalWorkTimeRef.current =
        (now - sessionStartTimeRef.current) / 1000 -
        accumulatedPausedTimeRef.current
    }, 1000)

    // Check for interventions - only trigger state update when intervention needed
    // Uses refs to avoid re-creating intervals when showIntervention changes
    const interventionCheckInterval = setInterval(() => {
      if (showInterventionRef.current || isPausedRef.current) return

      const consecutiveTime = consecutiveWorkTimeRef.current

      // Check if we should trigger an intervention
      if (consecutiveTime >= EYE_BREAK_INTERVAL) {
        let interventionType:
          | 'eye'
          | 'cognitive'
          | 'physical'
          | 'long'
          | undefined

        if (consecutiveTime >= LONG_BREAK_INTERVAL) {
          interventionType = 'long'
        } else if (consecutiveTime >= PHYSICAL_BREAK_INTERVAL) {
          interventionType = 'physical'
        } else if (consecutiveTime >= COGNITIVE_BREAK_INTERVAL) {
          interventionType = 'cognitive'
        } else {
          interventionType = 'eye'
        }

        if (interventionType && triggerInterventionRef.current) {
          triggerInterventionRef.current(interventionType)
        }
      }
    }, 10000) // Check every 10 seconds instead of 5

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      clearInterval(interventionCheckInterval)
    }
  }, [userId]) // Only depend on userId - other values accessed via refs

  // Track page visibility to pause timer when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden - pause the refs-based timer
        isPausedRef.current = true
        pausedAtRef.current = Date.now()
      } else {
        // Page is visible - resume
        if (pausedAtRef.current) {
          const pausedDuration = (Date.now() - pausedAtRef.current) / 1000
          accumulatedPausedTimeRef.current += pausedDuration
        }
        isPausedRef.current = false
        pausedAtRef.current = null
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return {
    ...state,
    // Override with ref values for accurate time (but doesn't trigger re-renders)
    totalWorkTime: totalWorkTimeRef.current,
    consecutiveWorkTime: consecutiveWorkTimeRef.current,
    isPaused: isPausedRef.current,
    behaviorMetrics,
    trackInteraction,
    trackMouseMovement,
    trackProblemComplete,
    triggerIntervention,
    completeBreak,
    skipBreak,
    formatTime: (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
  }
}
