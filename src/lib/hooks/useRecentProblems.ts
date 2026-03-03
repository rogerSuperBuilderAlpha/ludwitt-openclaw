/**
 * useRecentProblems Hook
 * 
 * Tracks recent problems for SRS review generation
 */

import { useState, useCallback, useEffect, useMemo } from 'react'

export interface RecentProblem {
  id: string
  question: string
  topic: string
  difficulty: number
  correct: boolean
  userAnswer: string
  correctAnswer: string
  timestamp?: number
}

interface UseRecentProblemsOptions {
  userId?: string
  maxProblems?: number
  srsInterval?: number // Number of problems before triggering SRS
  onSRSTrigger?: () => void
}

export function useRecentProblems(options: UseRecentProblemsOptions) {
  const { 
    userId, 
    maxProblems = 20,
    srsInterval = 20,
    onSRSTrigger
  } = options
  
  const [recentProblems, setRecentProblems] = useState<RecentProblem[]>([])
  const [lastSRSTriggeredAt, setLastSRSTriggeredAt] = useState(0)
  const [totalCompleted, setTotalCompleted] = useState(0)
  
  // Load from localStorage on mount
  useEffect(() => {
    if (!userId) return
    
    try {
      // Load recent problems
      const savedProblems = localStorage.getItem(`recent_problems_${userId}`)
      if (savedProblems) {
        setRecentProblems(JSON.parse(savedProblems))
      }
      
      // Load last SRS trigger point
      const lastTrigger = localStorage.getItem(`basics_srs_triggered_${userId}`)
      if (lastTrigger) {
        setLastSRSTriggeredAt(parseInt(lastTrigger, 10))
      }
    } catch (e) {
      // Silent fail
    }
  }, [userId])
  
  // Add a problem to recent list
  const addProblem = useCallback((problem: Omit<RecentProblem, 'timestamp'>) => {
    if (!userId) return
    
    const problemWithTimestamp: RecentProblem = {
      ...problem,
      timestamp: Date.now()
    }
    
    setRecentProblems(prev => {
      const updated = [problemWithTimestamp, ...prev].slice(0, maxProblems)
      
      // Persist to localStorage
      try {
        localStorage.setItem(`recent_problems_${userId}`, JSON.stringify(updated))
      } catch (e) {
        // Silent fail
      }
      
      return updated
    })
    
    // Update total completed
    setTotalCompleted(prev => prev + 1)
  }, [userId, maxProblems])
  
  // Check if SRS should be triggered
  const checkSRSTrigger = useCallback((
    newTotalCompleted: number,
    options: { isModalOpen?: boolean; isOnboarding?: boolean } = {}
  ) => {
    const { isModalOpen = false, isOnboarding = false } = options
    
    // Check if we should auto-trigger SRS
    if (
      userId &&
      newTotalCompleted > 0 &&
      newTotalCompleted >= srsInterval &&
      newTotalCompleted % srsInterval === 0 &&
      newTotalCompleted !== lastSRSTriggeredAt &&
      recentProblems.length >= 5 &&
      !isModalOpen &&
      !isOnboarding
    ) {
      // Mark as triggered
      setLastSRSTriggeredAt(newTotalCompleted)
      localStorage.setItem(`basics_srs_triggered_${userId}`, String(newTotalCompleted))
      
      // Trigger callback
      onSRSTrigger?.()
    }
  }, [userId, srsInterval, lastSRSTriggeredAt, recentProblems.length, onSRSTrigger])
  
  // Get problems by correctness
  const incorrectProblems = useMemo(() => {
    return recentProblems.filter(p => !p.correct)
  }, [recentProblems])
  
  const correctProblems = useMemo(() => {
    return recentProblems.filter(p => p.correct)
  }, [recentProblems])
  
  // Get problems by topic
  const getProblemsByTopic = useCallback((topic: string) => {
    return recentProblems.filter(p => p.topic === topic)
  }, [recentProblems])
  
  // Clear all problems
  const clearProblems = useCallback(() => {
    if (!userId) return
    
    setRecentProblems([])
    try {
      localStorage.removeItem(`recent_problems_${userId}`)
    } catch (e) {
      // Silent fail
    }
  }, [userId])
  
  return useMemo(() => ({
    // State
    recentProblems,
    totalCompleted,
    lastSRSTriggeredAt,
    
    // Filtered lists
    incorrectProblems,
    correctProblems,
    
    // Actions
    addProblem,
    checkSRSTrigger,
    getProblemsByTopic,
    clearProblems,
    
    // Stats
    hasProblemsForReview: recentProblems.length >= 5,
    incorrectCount: incorrectProblems.length,
    accuracy: recentProblems.length > 0 
      ? (correctProblems.length / recentProblems.length) * 100 
      : 0
  }), [
    recentProblems,
    totalCompleted,
    lastSRSTriggeredAt,
    incorrectProblems,
    correctProblems,
    addProblem,
    checkSRSTrigger,
    getProblemsByTopic,
    clearProblems
  ])
}

