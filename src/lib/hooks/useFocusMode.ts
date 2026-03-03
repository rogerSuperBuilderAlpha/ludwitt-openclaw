'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { logger } from '@/lib/logger'

// ============================================================================
// Types
// ============================================================================

export type FocusModeSubject = 'math' | 'reading'

export interface FocusModeState {
  isActive: boolean
  subject: FocusModeSubject | null
  timeRemaining: number // in seconds
  xpEarned: number
  problemsCompleted: number
  startTime: number | null
}

export interface FocusModeReturn {
  // State
  state: FocusModeState
  isWarningOpen: boolean
  pendingSubject: FocusModeSubject | null
  
  // Actions
  requestFocusMode: (subject: FocusModeSubject) => void
  confirmFocusMode: () => void
  cancelFocusMode: () => void
  addXP: (amount: number) => void
  addProblemCompleted: () => void
  endSession: () => void
  
  // Computed
  canUseFocusMode: (subject: FocusModeSubject) => boolean
  getNextAvailableTime: (subject: FocusModeSubject) => Date | null
  formatTimeRemaining: () => string
  getXPMultiplier: () => number
  
  // Session complete
  isSessionComplete: boolean
  sessionResults: FocusModeState | null
  clearSessionResults: () => void
}

// ============================================================================
// Constants
// ============================================================================

const FOCUS_MODE_DURATION = 10 * 60 // 10 minutes in seconds
const XP_MULTIPLIER = 3
const STORAGE_KEY_PREFIX = 'focus_mode_last_used_'
const SESSION_STORAGE_KEY_PREFIX = 'focus_mode_session_'

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get midnight EST for today
 */
function getMidnightEST(): Date {
  const now = new Date()
  // Convert to EST (UTC-5)
  const estOffset = -5 * 60 // minutes
  const localOffset = now.getTimezoneOffset()
  const diffMinutes = estOffset - (-localOffset)
  
  const estNow = new Date(now.getTime() + diffMinutes * 60 * 1000)
  
  // Set to next midnight EST
  const midnight = new Date(estNow)
  midnight.setHours(24, 0, 0, 0) // Next midnight
  
  // Convert back to local time
  const localMidnight = new Date(midnight.getTime() - diffMinutes * 60 * 1000)
  return localMidnight
}

/**
 * Check if the last usage was before today's midnight EST
 */
function canUseToday(lastUsedTimestamp: number | null): boolean {
  if (!lastUsedTimestamp) return true
  
  const now = new Date()
  const lastUsed = new Date(lastUsedTimestamp)
  
  // Get today's midnight EST in local time
  const estOffset = -5 * 60
  const localOffset = now.getTimezoneOffset()
  const diffMinutes = estOffset - (-localOffset)
  
  // Convert both times to EST
  const nowEST = new Date(now.getTime() + diffMinutes * 60 * 1000)
  const lastUsedEST = new Date(lastUsed.getTime() + diffMinutes * 60 * 1000)
  
  // Check if they're on different days
  const nowDay = nowEST.toDateString()
  const lastUsedDay = lastUsedEST.toDateString()
  
  return nowDay !== lastUsedDay
}

// ============================================================================
// Hook
// ============================================================================

export function useFocusMode(userId?: string): FocusModeReturn {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [state, setState] = useState<FocusModeState>({
    isActive: false,
    subject: null,
    timeRemaining: FOCUS_MODE_DURATION,
    xpEarned: 0,
    problemsCompleted: 0,
    startTime: null
  })
  
  const [isWarningOpen, setIsWarningOpen] = useState(false)
  const [pendingSubject, setPendingSubject] = useState<FocusModeSubject | null>(null)
  const [isSessionComplete, setIsSessionComplete] = useState(false)
  const [sessionResults, setSessionResults] = useState<FocusModeState | null>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  // ---------------------------------------------------------------------------
  // Storage Key Helpers
  // ---------------------------------------------------------------------------
  const getStorageKey = useCallback((subject: FocusModeSubject) => {
    return `${STORAGE_KEY_PREFIX}${userId || 'anonymous'}_${subject}`
  }, [userId])
  
  const getSessionStorageKey = useCallback(() => {
    return `${SESSION_STORAGE_KEY_PREFIX}${userId || 'anonymous'}`
  }, [userId])
  
  // ---------------------------------------------------------------------------
  // Session Persistence Functions
  // ---------------------------------------------------------------------------
  const saveSessionToStorage = useCallback((sessionState: FocusModeState) => {
    try {
      localStorage.setItem(getSessionStorageKey(), JSON.stringify(sessionState))
    } catch (error) {
      logger.error('UseFocusMode', 'Failed to save focus mode session', { error })
    }
  }, [getSessionStorageKey])
  
  const loadSessionFromStorage = useCallback((): FocusModeState | null => {
    try {
      const saved = localStorage.getItem(getSessionStorageKey())
      if (!saved) return null
      return JSON.parse(saved) as FocusModeState
    } catch (error) {
      logger.error('UseFocusMode', 'Failed to load focus mode session', { error })
      return null
    }
  }, [getSessionStorageKey])
  
  const clearSessionFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(getSessionStorageKey())
    } catch (error) {
      logger.error('UseFocusMode', 'Failed to clear focus mode session', { error })
    }
  }, [getSessionStorageKey])
  
  // ---------------------------------------------------------------------------
  // Load Session on Mount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!userId) return
    
    const savedSession = loadSessionFromStorage()
    if (!savedSession || !savedSession.isActive || !savedSession.startTime) return
    
    // Calculate time remaining based on when the session started
    const elapsed = Math.floor((Date.now() - savedSession.startTime) / 1000)
    const remaining = FOCUS_MODE_DURATION - elapsed
    
    if (remaining <= 0) {
      // Session has expired - show results
      clearSessionFromStorage()
      setIsSessionComplete(true)
      setSessionResults({
        ...savedSession,
        timeRemaining: 0
      })
    } else {
      // Session still active - restore it
      setState({
        ...savedSession,
        timeRemaining: remaining
      })
    }
  }, [userId, loadSessionFromStorage, clearSessionFromStorage])
  
  // ---------------------------------------------------------------------------
  // Check if focus mode can be used for a subject
  // ---------------------------------------------------------------------------
  const canUseFocusMode = useCallback((subject: FocusModeSubject): boolean => {
    if (state.isActive) return false
    
    const storageKey = getStorageKey(subject)
    const lastUsed = localStorage.getItem(storageKey)
    
    if (!lastUsed) return true
    
    return canUseToday(parseInt(lastUsed, 10))
  }, [state.isActive, getStorageKey])
  
  // ---------------------------------------------------------------------------
  // Get next available time
  // ---------------------------------------------------------------------------
  const getNextAvailableTime = useCallback((subject: FocusModeSubject): Date | null => {
    const storageKey = getStorageKey(subject)
    const lastUsed = localStorage.getItem(storageKey)
    
    if (!lastUsed) return null
    if (canUseToday(parseInt(lastUsed, 10))) return null
    
    return getMidnightEST()
  }, [getStorageKey])
  
  // ---------------------------------------------------------------------------
  // Request Focus Mode (shows warning)
  // ---------------------------------------------------------------------------
  const requestFocusMode = useCallback((subject: FocusModeSubject) => {
    if (!canUseFocusMode(subject)) return
    
    setPendingSubject(subject)
    setIsWarningOpen(true)
  }, [canUseFocusMode])
  
  // ---------------------------------------------------------------------------
  // Cancel Focus Mode Request
  // ---------------------------------------------------------------------------
  const cancelFocusMode = useCallback(() => {
    setIsWarningOpen(false)
    setPendingSubject(null)
  }, [])
  
  // ---------------------------------------------------------------------------
  // Confirm and Start Focus Mode
  // ---------------------------------------------------------------------------
  const confirmFocusMode = useCallback(() => {
    if (!pendingSubject) return
    
    // Save usage timestamp (for daily limit)
    const storageKey = getStorageKey(pendingSubject)
    localStorage.setItem(storageKey, Date.now().toString())
    
    // Create and start the session
    const newSession: FocusModeState = {
      isActive: true,
      subject: pendingSubject,
      timeRemaining: FOCUS_MODE_DURATION,
      xpEarned: 0,
      problemsCompleted: 0,
      startTime: Date.now()
    }
    
    setState(newSession)
    saveSessionToStorage(newSession) // Persist to localStorage
    
    setIsWarningOpen(false)
    setPendingSubject(null)
  }, [pendingSubject, getStorageKey, saveSessionToStorage])
  
  // ---------------------------------------------------------------------------
  // Add XP (will be multiplied at session end)
  // ---------------------------------------------------------------------------
  const addXP = useCallback((amount: number) => {
    if (!state.isActive) return
    
    setState(prev => {
      const updated = {
        ...prev,
        xpEarned: prev.xpEarned + amount
      }
      saveSessionToStorage(updated) // Persist update
      return updated
    })
  }, [state.isActive, saveSessionToStorage])
  
  // ---------------------------------------------------------------------------
  // Add Problem Completed
  // ---------------------------------------------------------------------------
  const addProblemCompleted = useCallback(() => {
    if (!state.isActive) return
    
    setState(prev => {
      const updated = {
        ...prev,
        problemsCompleted: prev.problemsCompleted + 1
      }
      saveSessionToStorage(updated) // Persist update
      return updated
    })
  }, [state.isActive, saveSessionToStorage])
  
  // ---------------------------------------------------------------------------
  // Format Time Remaining
  // ---------------------------------------------------------------------------
  const formatTimeRemaining = useCallback(() => {
    const minutes = Math.floor(state.timeRemaining / 60)
    const seconds = state.timeRemaining % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [state.timeRemaining])
  
  // ---------------------------------------------------------------------------
  // Get XP Multiplier
  // ---------------------------------------------------------------------------
  const getXPMultiplier = useCallback(() => {
    return state.isActive ? XP_MULTIPLIER : 1
  }, [state.isActive])
  
  // ---------------------------------------------------------------------------
  // Clear Session Results
  // ---------------------------------------------------------------------------
  const clearSessionResults = useCallback(() => {
    setIsSessionComplete(false)
    setSessionResults(null)
  }, [])
  
  // ---------------------------------------------------------------------------
  // End Session Manually (for V2 modal close button)
  // ---------------------------------------------------------------------------
  const endSession = useCallback(() => {
    if (!state.isActive) return
    
    // Clear from storage
    clearSessionFromStorage()
    
    // Show session complete modal with current results
    setIsSessionComplete(true)
    setSessionResults({
      subject: state.subject,
      xpEarned: state.xpEarned,
      problemsCompleted: state.problemsCompleted,
      timeRemaining: state.timeRemaining,
      startTime: state.startTime,
      isActive: false
    })
    
    // Reset state
    setState({
      isActive: false,
      subject: null,
      timeRemaining: FOCUS_MODE_DURATION,
      xpEarned: 0,
      problemsCompleted: 0,
      startTime: null
    })
  }, [state, clearSessionFromStorage])
  
  // ---------------------------------------------------------------------------
  // Timer Effect
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!state.isActive || !state.startTime) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (!prev.startTime) return prev
        
        // Calculate time remaining based on start time (handles page refresh)
        const elapsed = Math.floor((Date.now() - prev.startTime) / 1000)
        const remaining = FOCUS_MODE_DURATION - elapsed
        
        if (remaining <= 0) {
          // Session complete - clear from storage
          clearSessionFromStorage()
          setIsSessionComplete(true)
          setSessionResults({ ...prev, timeRemaining: 0 })
          
          return {
            isActive: false,
            subject: null,
            timeRemaining: FOCUS_MODE_DURATION,
            xpEarned: 0,
            problemsCompleted: 0,
            startTime: null
          }
        }
        
        return {
          ...prev,
          timeRemaining: remaining
        }
      })
    }, 1000)
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.isActive, state.startTime, clearSessionFromStorage])
  
  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------
  return {
    state,
    isWarningOpen,
    pendingSubject,
    requestFocusMode,
    confirmFocusMode,
    cancelFocusMode,
    addXP,
    addProblemCompleted,
    endSession,
    canUseFocusMode,
    getNextAvailableTime,
    formatTimeRemaining,
    getXPMultiplier,
    isSessionComplete,
    sessionResults,
    clearSessionResults
  }
}

