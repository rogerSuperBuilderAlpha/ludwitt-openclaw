'use client'

/**
 * useDueForReview Hook
 * 
 * Fetches due review items from the personalized memory API.
 * Used to show concepts that need to be reviewed on the dashboard.
 * 
 * Part of the Technical Moat integration.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

// ============================================================================
// Types
// ============================================================================

interface DueItem {
  conceptId: string
  conceptName: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  dueStatus: 'overdue' | 'due_now' | 'due_soon' | 'not_due'
  priority: number
  currentRetention: number
  targetRetention: number
  optimalReviewTime: string
}

interface ReviewSchedule {
  items: DueItem[]
  totalDueNow: number
  totalDueSoon: number
  estimatedTimeMinutes: number
}

interface ScheduleSummary {
  totalItems: number
  dueNowCount: number
  dueSoonCount: number
  notDueCount: number
  overdueCount: number
  averageRetention: number
  lowestRetentionConcept?: string
}

interface MemoryStats {
  totalConcepts: number
  averageHalfLife: number
  reviewsCompleted: number
  averageRetention: number
}

interface UseDueForReviewReturn {
  /** Whether a memory model exists for the user */
  hasModel: boolean
  /** Review schedule with due items */
  schedule: ReviewSchedule | null
  /** Summary statistics */
  summary: ScheduleSummary | null
  /** Memory statistics */
  stats: MemoryStats | null
  /** Message (e.g., if no model exists) */
  message: string | null
  /** Items that are due now (urgent) */
  dueNowItems: DueItem[]
  /** Items that are overdue (critical) */
  overdueItems: DueItem[]
  /** Total count of items that need review */
  totalDueCount: number
  /** Loading state */
  isLoading: boolean
  /** Error state */
  error: string | null
  /** Refresh the schedule */
  refresh: () => Promise<void>
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useDueForReview(): UseDueForReviewReturn {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  
  // State
  const [hasModel, setHasModel] = useState(false)
  const [schedule, setSchedule] = useState<ReviewSchedule | null>(null)
  const [summary, setSummary] = useState<ScheduleSummary | null>(null)
  const [stats, setStats] = useState<MemoryStats | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // ============================================================================
  // Fetch Schedule
  // ============================================================================
  
  const fetchSchedule = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetchApi('/api/memory/schedule?maxItems=20', {
        method: 'GET'
      })
      
      if (response) {
        setHasModel(response.hasModel || false)
        setSchedule(response.schedule || null)
        setSummary(response.summary || null)
        setStats(response.stats || null)
        setMessage(response.message || null)
        setError(null)
      } else {
        // No response - treat as no model
        setHasModel(false)
        setSchedule(null)
        setSummary(null)
        setStats(null)
        setMessage('Review schedule not available')
      }
    } catch (err) {
      // Handle errors gracefully - don't show error UI
      logger.error('useDueForReview', 'Error fetching schedule', { error: err })
      setHasModel(false)
      setSchedule(null)
      setSummary(null)
      setStats(null)
      setMessage('Review schedule temporarily unavailable')
      // Don't set error to avoid red UI
    } finally {
      setIsLoading(false)
    }
  }, [user, fetchApi])
  
  // Initial fetch
  useEffect(() => {
    fetchSchedule()
  }, [fetchSchedule])
  
  // ============================================================================
  // Derived State
  // ============================================================================
  
  const dueNowItems = schedule?.items.filter(item => 
    item.dueStatus === 'due_now'
  ) || []
  
  const overdueItems = schedule?.items.filter(item => 
    item.dueStatus === 'overdue'
  ) || []
  
  const totalDueCount = (schedule?.totalDueNow || 0) + overdueItems.length
  
  // ============================================================================
  // Return
  // ============================================================================
  
  return {
    hasModel,
    schedule,
    summary,
    stats,
    message,
    dueNowItems,
    overdueItems,
    totalDueCount,
    isLoading,
    error,
    refresh: fetchSchedule
  }
}
