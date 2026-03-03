'use client'

/**
 * useIndependentStudyAccess Hook
 * 
 * Checks if a user has met the prerequisites to unlock Independent Study:
 * - Math Grade 12 (currentDifficulty >= 12)
 * - Reading Grade 12 (currentDifficulty >= 12)
 * - Logic 80%+ completion in all units
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { getProblemsForUnit, getAvailableUnits } from '@/data/basics/logic'
import type { SubjectProgressDisplay } from '@/lib/types/basics'
import type { IndependentStudyUnlockStatus } from '@/lib/types/independent-study'

// Prerequisites thresholds
const MATH_GRADE_REQUIRED = 12
const READING_GRADE_REQUIRED = 12
const LOGIC_MASTERY_REQUIRED = 80 // Percent per unit

interface UseIndependentStudyAccessOptions {
  userId?: string
  // If progress is already loaded (from BasicsProvider), pass it in
  mathProgress?: SubjectProgressDisplay | null
  readingProgress?: SubjectProgressDisplay | null
}

interface UseIndependentStudyAccessReturn extends IndependentStudyUnlockStatus {
  isLoading: boolean
  refetch: () => Promise<void>
}

export function useIndependentStudyAccess({
  userId,
  mathProgress: externalMathProgress,
  readingProgress: externalReadingProgress
}: UseIndependentStudyAccessOptions = {}): UseIndependentStudyAccessReturn {
  const fetchApi = useApiFetch()
  
  const [isLoading, setIsLoading] = useState(true)
  const [logicCompletedIds, setLogicCompletedIds] = useState<Set<string>>(new Set())
  const [fetchedMathProgress, setFetchedMathProgress] = useState<SubjectProgressDisplay | null>(null)
  const [fetchedReadingProgress, setFetchedReadingProgress] = useState<SubjectProgressDisplay | null>(null)
  const hasFetched = useRef(false)
  
  // Use external progress if provided, otherwise use fetched state
  const effectiveMathProgress = externalMathProgress ?? fetchedMathProgress
  const effectiveReadingProgress = externalReadingProgress ?? fetchedReadingProgress
  
  // Available Logic units (those with problems)
  const availableUnits = useMemo(() => getAvailableUnits(), [])
  
  // Calculate Logic mastery
  const logicMastery = useMemo(() => {
    const unitsWithProblems = availableUnits.filter(unit => 
      getProblemsForUnit(unit.id).length > 0
    )
    
    let masteredCount = 0
    let totalCompletionPercent = 0
    
    for (const unit of unitsWithProblems) {
      const problems = getProblemsForUnit(unit.id)
      const completed = problems.filter(p => logicCompletedIds.has(p.id)).length
      const completionRate = problems.length > 0 ? (completed / problems.length) * 100 : 0
      
      totalCompletionPercent += completionRate
      
      if (completionRate >= LOGIC_MASTERY_REQUIRED) {
        masteredCount++
      }
    }
    
    const avgMastery = unitsWithProblems.length > 0 
      ? totalCompletionPercent / unitsWithProblems.length 
      : 0
    
    return {
      masteredUnits: masteredCount,
      totalUnits: unitsWithProblems.length,
      avgMasteryPercent: Math.round(avgMastery),
      isMet: masteredCount >= unitsWithProblems.length && unitsWithProblems.length > 0
    }
  }, [availableUnits, logicCompletedIds])
  
  // Fetch all progress data
  const fetchAllProgress = useCallback(async () => {
    if (!userId) {
      setIsLoading(false)
      return
    }
    
    setIsLoading(true)
    
    try {
      // Fetch Math/Reading progress if not provided externally
      if (!externalMathProgress || !externalReadingProgress) {
        // useApiFetch returns the data directly, not wrapped in { success, data }
        const progressData = await fetchApi('/api/basics/current-problems')
        if (progressData) {
          if (!externalMathProgress && progressData.mathProgress) {
            setFetchedMathProgress(progressData.mathProgress)
          }
          if (!externalReadingProgress && progressData.readingProgress) {
            setFetchedReadingProgress(progressData.readingProgress)
          }
        }
      }
      
      // Fetch Logic progress - API returns { progress: { completedIds: [...] } }
      // useApiFetch returns the data directly, so we get { progress: {...} }
      const logicData = await fetchApi('/api/basics/logic/progress')
      if (logicData?.progress?.completedIds) {
        setLogicCompletedIds(new Set(logicData.progress.completedIds))
      }
    } catch {
      // Silent fail - will show as not unlocked
    } finally {
      setIsLoading(false)
    }
  }, [userId, fetchApi, externalMathProgress, externalReadingProgress])
  
  // Fetch on mount (once per userId)
  useEffect(() => {
    if (userId && !hasFetched.current) {
      hasFetched.current = true
      fetchAllProgress()
    } else if (!userId) {
      setIsLoading(false)
    }
  }, [userId, fetchAllProgress])
  
  // Reset fetch flag when userId changes
  useEffect(() => {
    hasFetched.current = false
  }, [userId])
  
  // Calculate unlock status
  const unlockStatus = useMemo((): IndependentStudyUnlockStatus => {
    const mathGrade = effectiveMathProgress?.currentDifficulty ?? 0
    const readingGrade = effectiveReadingProgress?.currentDifficulty ?? 0
    
    const mathMet = mathGrade >= MATH_GRADE_REQUIRED
    const readingMet = readingGrade >= READING_GRADE_REQUIRED
    const logicMet = logicMastery.isMet
    
    const isUnlocked = mathMet && readingMet && logicMet
    
    // Calculate missing prereqs
    const missingPrereqs: Array<'math' | 'reading' | 'logic'> = []
    if (!mathMet) missingPrereqs.push('math')
    if (!readingMet) missingPrereqs.push('reading')
    if (!logicMet) missingPrereqs.push('logic')
    
    // Calculate overall progress (weighted average)
    // Math and Reading each worth 33%, Logic worth 34%
    const mathProgress = Math.min(100, (mathGrade / MATH_GRADE_REQUIRED) * 100)
    const readingProgress = Math.min(100, (readingGrade / READING_GRADE_REQUIRED) * 100)
    const logicProgress = logicMastery.avgMasteryPercent
    
    const overallProgress = Math.round(
      (mathProgress * 0.33) + (readingProgress * 0.33) + (logicProgress * 0.34)
    )
    
    return {
      isUnlocked,
      isLoading,
      
      mathGrade: Math.floor(mathGrade),
      mathRequired: MATH_GRADE_REQUIRED,
      mathMet,
      
      readingGrade: Math.floor(readingGrade),
      readingRequired: READING_GRADE_REQUIRED,
      readingMet,
      
      logicMasteryPercent: logicMastery.avgMasteryPercent,
      logicMasteredUnits: logicMastery.masteredUnits,
      logicTotalUnits: logicMastery.totalUnits,
      logicRequired: LOGIC_MASTERY_REQUIRED,
      logicMet,
      
      overallProgress,
      missingPrereqs
    }
  }, [effectiveMathProgress, effectiveReadingProgress, logicMastery, isLoading])
  
  return {
    ...unlockStatus,
    refetch: fetchAllProgress
  }
}
