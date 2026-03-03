/**
 * useProgressAnalytics Hook
 *
 * Provides helper functions and utilities for progress analytics calculations
 */

export function useProgressAnalytics() {
  // Calculate estimated questions to next grade
  // Assuming ~7-10 perfect answers to advance (0.15 progress per perfect = ~7 answers for 1.0)
  const getQuestionsToNext = (progress: number): number => {
    const remaining = 100 - progress
    return Math.ceil(remaining / 12) // ~12% per good answer average
  }

  // For Latin/Greek/Logic, estimate grade from XP
  const getGradeFromXP = (xp: number): number => Math.min(12, Math.floor(xp / 100) + 1)

  // Get progress percentage from XP (within current grade level)
  const getProgressFromXP = (xp: number): number => xp % 100

  return {
    getQuestionsToNext,
    getGradeFromXP,
    getProgressFromXP,
  }
}
