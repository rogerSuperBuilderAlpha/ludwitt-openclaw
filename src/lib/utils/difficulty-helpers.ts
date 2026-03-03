/**
 * Difficulty Helper Utilities
 * 
 * Common difficulty calculation and filtering functions
 */

/**
 * Calculate difficulty level (integer floor)
 */
export function getDifficultyLevel(difficulty: number): number {
  return Math.floor(difficulty)
}

/**
 * Check if difficulty is within a band of target
 */
export function isWithinDifficultyBand(
  difficulty: number,
  targetDifficulty: number,
  bandWidth: number = 1.5
): boolean {
  return Math.abs(difficulty - targetDifficulty) <= bandWidth
}

/**
 * Check if difficulty is below target (remediation)
 */
export function isBelowDifficulty(
  difficulty: number,
  targetDifficulty: number,
  threshold: number = 1.5
): boolean {
  return difficulty < targetDifficulty - threshold
}

/**
 * Check if difficulty is above target (challenge)
 */
export function isAboveDifficulty(
  difficulty: number,
  targetDifficulty: number,
  threshold: number = 1.5
): boolean {
  return difficulty > targetDifficulty + threshold
}

/**
 * Calculate difficulty distance from target
 */
export function getDifficultyDistance(difficulty: number, targetDifficulty: number): number {
  return Math.abs(difficulty - targetDifficulty)
}

/**
 * Sort problems by relevance to target difficulty
 */
export function sortByDifficultyRelevance<T extends { difficulty: number }>(
  problems: T[],
  targetDifficulty: number
): T[] {
  return [...problems].sort((a, b) => {
    const diffA = getDifficultyDistance(a.difficulty, targetDifficulty)
    const diffB = getDifficultyDistance(b.difficulty, targetDifficulty)
    if (diffA === diffB) {
      // Prefer slightly more challenging material on ties to encourage growth
      return b.difficulty - a.difficulty
    }
    return diffA - diffB
  })
}

