'use client'

/**
 * useProgressionGates Hook
 *
 * Client-side hook that evaluates progression gates for the current user.
 * Accepts optional pre-loaded data to avoid duplicate Firestore reads.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { getMondayOfCurrentWeek } from '@/lib/utils/date-helpers'
import { evaluateProgression } from './gates'
import type { ProgressionData, ProgressionGatesStatus } from './types'
import { logger } from '@/lib/logger'

interface UseProgressionGatesOptions {
  /** Pre-loaded math difficulty to avoid refetching */
  mathDifficulty?: number
  /** Pre-loaded reading difficulty to avoid refetching */
  readingDifficulty?: number
  /** Pre-loaded projects completed count */
  projectsCompleted?: number
}

const LOADING_STATE: ProgressionGatesStatus = {
  currentStage: 'basics',
  isAdmin: false,
  canAccessBasics: true,
  canAccessALC: false,
  canAccessDeveloper: false,
  mathGate: { isMet: false, label: 'Math Grade 12', current: 0, required: 12, progressPercent: 0 },
  readingGate: { isMet: false, label: 'Reading Grade 12', current: 0, required: 12, progressPercent: 0 },
  projectsGate: { isMet: false, label: '5 ALC Projects', current: 0, required: 5, progressPercent: 0 },
  deploymentGate: { isMet: false, label: 'Deployment Verified', current: 0, required: 1, progressPercent: 0 },
  weeklyXP: { rawXP: 0, effectiveXP: 0, required: 5000, isMet: false, gracePeriodActive: false, logicXP: 0, writingXP: 0, bonusXP: 0 },
  alcBypassPurchased: false,
  developerBypassPurchased: false,
  isLoading: true,
}

/**
 * Get the Monday of the previous week
 */
function getMondayOfLastWeek(): Date {
  const monday = getMondayOfCurrentWeek()
  monday.setDate(monday.getDate() - 7)
  return monday
}

/**
 * Get the Sunday that ends the previous week (23:59:59)
 */
function getSundayOfLastWeek(): Date {
  const monday = getMondayOfCurrentWeek()
  const sunday = new Date(monday)
  sunday.setMilliseconds(-1) // 1ms before this Monday = end of last Sunday
  return sunday
}

/**
 * Sum XP from xpHistory entries within a date range
 */
function sumXPInRange(
  xpHistory: Record<string, number> | undefined,
  start: Date,
  end: Date
): number {
  if (!xpHistory) return 0
  let total = 0
  for (const [dateStr, xp] of Object.entries(xpHistory)) {
    const date = new Date(dateStr + 'T00:00:00')
    if (date >= start && date <= end) {
      total += xp
    }
  }
  return total
}

/**
 * Sum subject-specific XP from xpHistoryBySubject within a date range
 */
function sumSubjectXPInRange(
  xpHistoryBySubject: Record<string, Record<string, number>> | undefined,
  subject: string,
  start: Date,
  end: Date
): number {
  if (!xpHistoryBySubject?.[subject]) return 0
  const subjectHistory = xpHistoryBySubject[subject]
  let total = 0
  for (const [dateStr, xp] of Object.entries(subjectHistory)) {
    const date = new Date(dateStr + 'T00:00:00')
    if (date >= start && date <= end) {
      total += xp
    }
  }
  return total
}

export function useProgressionGates(
  options: UseProgressionGatesOptions = {}
): ProgressionGatesStatus {
  const { user } = useAuth()
  const [progressionData, setProgressionData] = useState<ProgressionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasFetched = useRef(false)

  const fetchData = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return
    }

    try {
      const uid = user.uid
      const email = user.email || null

      // Fetch bypass status from user document
      const userDoc = await getDoc(doc(db, 'users', uid))
      const bypasses = userDoc.exists() ? userDoc.data()?.gateBypassesPurchased || {} : {}

      // Fetch userBasicsProgress for difficulties + XP history
      const progressDoc = await getDoc(doc(db, 'userBasicsProgress', uid))
      const progressData = progressDoc.exists() ? progressDoc.data() : null

      const mathDifficulty = options.mathDifficulty ?? progressData?.math?.currentDifficulty ?? 0
      const readingDifficulty = options.readingDifficulty ?? progressData?.reading?.currentDifficulty ?? 0

      // Fetch projects completed count (if not provided)
      let projectsCompleted = options.projectsCompleted ?? 0
      if (options.projectsCompleted === undefined) {
        const projectsRef = collection(db, 'projects')
        const completedQuery = query(
          projectsRef,
          where('userId', '==', uid),
          where('completed', '==', true)
        )
        const completedSnapshot = await getDocs(completedQuery)
        projectsCompleted = completedSnapshot.size
      }

      // Check deployment status
      const deploymentDoc = await getDoc(doc(db, 'vercelDeploymentProgress', uid))
      const deploymentVerified = deploymentDoc.exists() && deploymentDoc.data()?.completed === true

      // Calculate weekly XP from xpHistory
      const xpHistory = progressData?.xpHistory as Record<string, number> | undefined
      const xpHistoryBySubject = progressData?.xpHistoryBySubject as Record<string, Record<string, number>> | undefined

      const weekStart = getMondayOfCurrentWeek()
      const now = new Date()
      const lastWeekStart = getMondayOfLastWeek()
      const lastWeekEnd = getSundayOfLastWeek()

      const currentWeekXP = sumXPInRange(xpHistory, weekStart, now)
      const lastWeekXP = sumXPInRange(xpHistory, lastWeekStart, lastWeekEnd)

      // Subject-specific XP for current week (for bonus calculation)
      const logicXP = sumSubjectXPInRange(xpHistoryBySubject, 'logic', weekStart, now)
      const writingXP = sumSubjectXPInRange(xpHistoryBySubject, 'writing', weekStart, now)

      setProgressionData({
        email,
        mathDifficulty,
        readingDifficulty,
        projectsCompleted,
        deploymentVerified,
        currentWeekXP,
        lastWeekXP,
        logicXP,
        writingXP,
        alcBypassPurchased: !!bypasses.alc,
        developerBypassPurchased: !!bypasses.developer,
      })
    } catch (error) {
      logger.error('UseProgressionGates', 'Failed to fetch data', { error })
    } finally {
      setIsLoading(false)
    }
  }, [user, options.mathDifficulty, options.readingDifficulty, options.projectsCompleted])

  useEffect(() => {
    if (user && !hasFetched.current) {
      hasFetched.current = true
      fetchData()
    } else if (!user) {
      setIsLoading(false)
    }
  }, [user, fetchData])

  // Reset when user changes
  useEffect(() => {
    hasFetched.current = false
  }, [user?.uid])

  const status = useMemo((): ProgressionGatesStatus => {
    if (isLoading || !progressionData) {
      return LOADING_STATE
    }
    return evaluateProgression(progressionData)
  }, [isLoading, progressionData])

  return status
}
