/**
 * Progress Helper Utilities
 * 
 * Common progress calculation and aggregation functions
 */

/**
 * Calculate total XP across math and reading subjects
 */
export function calculateTotalXP(mathProgress: { totalXP?: number }, readingProgress: { totalXP?: number }): number {
  return (mathProgress.totalXP || 0) + (readingProgress.totalXP || 0)
}

/**
 * Calculate total completed problems across math and reading subjects
 */
export function calculateTotalCompleted(
  mathProgress: { totalCompleted?: number },
  readingProgress: { totalCompleted?: number }
): number {
  return (mathProgress.totalCompleted || 0) + (readingProgress.totalCompleted || 0)
}

/**
 * Calculate total correct answers across math and reading subjects
 */
export function calculateTotalCorrect(
  mathProgress: { totalCorrect?: number },
  readingProgress: { totalCorrect?: number }
): number {
  return (mathProgress.totalCorrect || 0) + (readingProgress.totalCorrect || 0)
}

/**
 * Get maximum streak across math and reading subjects
 */
export function getMaxStreak(
  mathProgress: { currentStreak?: number },
  readingProgress: { currentStreak?: number }
): number {
  return Math.max(mathProgress.currentStreak || 0, readingProgress.currentStreak || 0)
}

/**
 * Calculate average accuracy across math and reading subjects
 */
export function calculateAverageAccuracy(
  mathProgress: { accuracyRate?: number },
  readingProgress: { accuracyRate?: number }
): number {
  const mathAccuracy = mathProgress.accuracyRate || 0
  const readingAccuracy = readingProgress.accuracyRate || 0
  return (mathAccuracy + readingAccuracy) / 2
}

