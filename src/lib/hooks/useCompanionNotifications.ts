/**
 * Hook for companion notifications in the header
 * Reads companion states to generate alerts
 */

import { useState, useEffect } from 'react'
import { Subject, SubjectCompanion } from '@/data/companions/attributes'
import { logger } from '@/lib/logger'

export function useCompanionNotifications(userId: string | undefined) {
  const [companions, setCompanions] = useState<Record<Subject, SubjectCompanion | null>>({
    math: null,
    reading: null,
    latin: null,
    greek: null,
    logic: null
  })

  useEffect(() => {
    if (!userId) return

    const loadCompanions = () => {
      try {
        const saved = localStorage.getItem(`subject_companions_v2_${userId}`)
        if (saved) {
          setCompanions(JSON.parse(saved))
        }
      } catch (e) {
        logger.error('Usecompanionnotifications', 'Failed to load companions for notifications', { error: e })
      }
    }

    // Load initially
    loadCompanions()

    // Listen for storage changes (when companions are updated elsewhere)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `subject_companions_v2_${userId}`) {
        loadCompanions()
      }
    }

    // Also poll periodically for same-tab updates
    const interval = setInterval(loadCompanions, 30000) // Every 30 seconds

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [userId])

  return companions
}

