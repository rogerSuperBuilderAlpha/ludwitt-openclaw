/**
 * Leaderboard Helper Utilities
 * 
 * Common aggregation and processing functions for leaderboard calculations
 */

/**
 * Aggregate engagement data from daily subcollection documents
 */
export function aggregateEngagementData(
  docs: FirebaseFirestore.QueryDocumentSnapshot[]
): {
  totalPoints: number
  totalCorrect: number
  totalAttempted: number
  maxStreak: number
} {
  let totalPoints = 0
  let totalCorrect = 0
  let totalAttempted = 0
  let maxStreak = 0

  docs.forEach(doc => {
    const data = doc.data()
    totalPoints += data.confirmedPoints || 0
    totalCorrect += data.correctAnswers || 0
    totalAttempted += data.problemsAttempted || 0
    maxStreak = Math.max(maxStreak, data.currentStreak || 0)
  })

  return {
    totalPoints,
    totalCorrect,
    totalAttempted,
    maxStreak
  }
}

/**
 * Format user data for leaderboard entry
 */
export function formatLeaderboardEntry(
  userId: string,
  metrics: {
    pointsEarned: number
    correctAnswers: number
    problemsAttempted: number
    currentStreak: number
  }
): {
  userId: string
  pointsEarned: number
  correctAnswers: number
  problemsAttempted: number
  currentStreak: number
} | null {
  if (metrics.pointsEarned <= 0) {
    return null
  }

  return {
    userId,
    pointsEarned: metrics.pointsEarned,
    correctAnswers: metrics.correctAnswers,
    problemsAttempted: metrics.problemsAttempted,
    currentStreak: metrics.currentStreak
  }
}

