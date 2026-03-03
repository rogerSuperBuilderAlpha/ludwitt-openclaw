/**
 * Adaptive Difficulty Algorithm Service
 *
 * Implements the core algorithm that adjusts problem difficulty based on
 * user performance over their last 10 attempts.
 */

import { Attempt } from '@/lib/types/basics'

/**
 * Calculate next difficulty based on recent performance
 * Uses weighted scoring where most recent attempts have higher weight
 * 
 * IMPORTANT: Grade levels can only INCREASE if daily XP quota is met.
 * This creates friction to ensure mastery before progression.
 *
 * @param recentAttempts - Last 10 attempts (most recent first)
 * @param currentDifficulty - Current difficulty level (1.0 to 12.0)
 * @param dailyXP - Current daily XP earned (optional)
 * @param dailyGoal - Daily XP goal required to progress (optional, default 1000)
 * @returns New difficulty level (1.0 to 12.0)
 */
export function calculateNextDifficulty(
  recentAttempts: Attempt[],
  currentDifficulty: number,
  dailyXP?: number,
  dailyGoal: number = 1000
): number {
  if (recentAttempts.length === 0) {
    return currentDifficulty
  }

  // Weights: most recent = highest weight [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  let totalScore = 0
  let totalWeight = 0

  // Calculate weighted performance score
  recentAttempts.slice(0, 10).forEach((attempt, index) => {
    const weight = weights[index] || 1
    const score = attempt.correct ? 1 : 0
    totalScore += score * weight
    totalWeight += weight
  })

  const performanceScore = totalScore / totalWeight // 0 to 1

  // Check if daily quota is met - REQUIRED for grade increases
  const quotaMet = dailyXP !== undefined && dailyXP >= dailyGoal
  
  // Adjustment rules based on performance
  let newDifficulty = currentDifficulty

  if (performanceScore >= 0.8) {
    // Strong performance (80%+) - increase difficulty ONLY if quota is met
    if (quotaMet) {
      newDifficulty = currentDifficulty + 0.5
    } else {
      // Can't increase - cap at current whole number to prevent grade-up
      // Allow fractional progress within current grade
      const currentGrade = Math.floor(currentDifficulty)
      const potentialNew = currentDifficulty + 0.5
      if (Math.floor(potentialNew) > currentGrade) {
        // Would be a grade-up, cap it just below the next grade
        newDifficulty = currentGrade + 0.99
      } else {
        newDifficulty = potentialNew
      }
    }
  } else if (performanceScore >= 0.6) {
    // Good performance (60-79%) - slight increase, check quota for grade-up
    const potentialNew = currentDifficulty + 0.25
    const currentGrade = Math.floor(currentDifficulty)
    if (Math.floor(potentialNew) > currentGrade && !quotaMet) {
      // Would be a grade-up but quota not met
      newDifficulty = currentGrade + 0.99
    } else {
      newDifficulty = potentialNew
    }
  } else if (performanceScore >= 0.4) {
    // Moderate performance (40-59%) - maintain level
    newDifficulty = currentDifficulty
  } else if (performanceScore >= 0.25) {
    // Struggling (25-39%) - slight decrease
    newDifficulty = currentDifficulty - 0.25
  } else {
    // Very struggling (<25%) - significant decrease
    newDifficulty = currentDifficulty - 0.5
  }

  // Clamp between 1.0 and 12.0 (K-12 grade levels)
  return Math.max(1, Math.min(12, newDifficulty))
}

/**
 * Calculate progress to next level (0-100)
 *
 * @param difficulty - Current difficulty (e.g., 5.75)
 * @returns Progress percentage (0-100)
 */
export function calculateProgressToNextLevel(difficulty: number): number {
  const currentLevel = Math.floor(difficulty)
  const progressWithinLevel = difficulty - currentLevel
  return Math.round(progressWithinLevel * 100)
}

/**
 * Get grade level string from difficulty
 *
 * @param difficulty - Difficulty level (1.0 to 12.0)
 * @returns Grade level string (e.g., "Grade 5")
 */
export function getGradeLevelString(difficulty: number): string {
  const grade = Math.floor(difficulty)
  if (grade === 0) return 'Kindergarten'
  return `Grade ${grade}`
}

/**
 * Calculate XP earned for an attempt
 *
 * @param correct - Whether answer was correct
 * @param timeSpent - Time spent on problem (seconds)
 * @param timeEstimate - Estimated time for problem (seconds)
 * @param currentStreak - Current streak count
 * @param costsIncurred - XP costs incurred during this problem (hints, etc.)
 * @returns XP earned (net after costs)
 * 
 * @deprecated Use calculateProblemXP from '@/lib/basics/xp-config' for new code
 */
export { calculateProblemXP } from './xp-config'
import { calculateProblemXP as _calculateProblemXP } from './xp-config'

export function calculateXP(
  correct: boolean,
  timeSpent: number,
  timeEstimate: number,
  currentStreak: number,
  costsIncurred: number = 0
): number {
  return _calculateProblemXP({
    correct,
    timeSpent,
    timeEstimate,
    currentStreak,
    costsIncurred
  })
}

/**
 * Calculate accuracy rate
 *
 * @param totalCorrect - Number of correct attempts
 * @param totalCompleted - Total number of attempts
 * @returns Accuracy rate (0.0 to 1.0)
 */
export function calculateAccuracyRate(
  totalCorrect: number,
  totalCompleted: number
): number {
  if (totalCompleted === 0) return 0
  return totalCorrect / totalCompleted
}

/**
 * Check if daily streak should be maintained or broken
 *
 * @param lastActiveDate - Last active date (YYYY-MM-DD)
 * @param todayDate - Today's date (YYYY-MM-DD)
 * @returns Object with streak status and updated count
 */
export function checkDailyStreak(
  lastActiveDate: string,
  todayDate: string,
  currentStreak: number
): { maintain: boolean; newStreak: number } {
  if (!lastActiveDate) {
    return { maintain: false, newStreak: 1 }
  }

  const lastDate = new Date(lastActiveDate)
  const today = new Date(todayDate)

  // Calculate difference in days
  const diffTime = today.getTime() - lastDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Same day - maintain current streak
    return { maintain: true, newStreak: currentStreak }
  } else if (diffDays === 1) {
    // Consecutive day - increment streak
    return { maintain: true, newStreak: currentStreak + 1 }
  } else {
    // Streak broken - reset to 1
    return { maintain: false, newStreak: 1 }
  }
}
