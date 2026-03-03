/**
 * Unit Tests for Leaderboard Helper Utilities
 */

import {
  aggregateEngagementData,
  formatLeaderboardEntry,
} from '../leaderboard-helpers'

// ---------------------------------------------------------------------------
// Helpers to create mock Firestore document snapshots
// ---------------------------------------------------------------------------

function makeMockDoc(
  data: Record<string, unknown>
): FirebaseFirestore.QueryDocumentSnapshot {
  return {
    data: () => data,
  } as unknown as FirebaseFirestore.QueryDocumentSnapshot
}

// ---------------------------------------------------------------------------
// aggregateEngagementData
// ---------------------------------------------------------------------------

describe('aggregateEngagementData', () => {
  test('returns zeroes for empty array', () => {
    const result = aggregateEngagementData([])
    expect(result).toEqual({
      totalPoints: 0,
      totalCorrect: 0,
      totalAttempted: 0,
      maxStreak: 0,
    })
  })

  test('aggregates single document correctly', () => {
    const docs = [
      makeMockDoc({
        confirmedPoints: 100,
        correctAnswers: 8,
        problemsAttempted: 10,
        currentStreak: 5,
      }),
    ]
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(100)
    expect(result.totalCorrect).toBe(8)
    expect(result.totalAttempted).toBe(10)
    expect(result.maxStreak).toBe(5)
  })

  test('sums points, correct, attempted across multiple documents', () => {
    const docs = [
      makeMockDoc({
        confirmedPoints: 50,
        correctAnswers: 4,
        problemsAttempted: 5,
        currentStreak: 3,
      }),
      makeMockDoc({
        confirmedPoints: 75,
        correctAnswers: 6,
        problemsAttempted: 8,
        currentStreak: 6,
      }),
      makeMockDoc({
        confirmedPoints: 25,
        correctAnswers: 2,
        problemsAttempted: 3,
        currentStreak: 2,
      }),
    ]
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(150)
    expect(result.totalCorrect).toBe(12)
    expect(result.totalAttempted).toBe(16)
  })

  test('takes max streak across documents', () => {
    const docs = [
      makeMockDoc({
        confirmedPoints: 10,
        correctAnswers: 1,
        problemsAttempted: 1,
        currentStreak: 3,
      }),
      makeMockDoc({
        confirmedPoints: 10,
        correctAnswers: 1,
        problemsAttempted: 1,
        currentStreak: 7,
      }),
      makeMockDoc({
        confirmedPoints: 10,
        correctAnswers: 1,
        problemsAttempted: 1,
        currentStreak: 5,
      }),
    ]
    const result = aggregateEngagementData(docs)
    expect(result.maxStreak).toBe(7)
  })

  test('handles missing fields gracefully (defaults to 0)', () => {
    const docs = [
      makeMockDoc({}), // all fields missing
    ]
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(0)
    expect(result.totalCorrect).toBe(0)
    expect(result.totalAttempted).toBe(0)
    expect(result.maxStreak).toBe(0)
  })

  test('handles partially missing fields', () => {
    const docs = [
      makeMockDoc({ confirmedPoints: 100 }), // other fields missing
    ]
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(100)
    expect(result.totalCorrect).toBe(0)
    expect(result.totalAttempted).toBe(0)
    expect(result.maxStreak).toBe(0)
  })

  test('handles zero values', () => {
    const docs = [
      makeMockDoc({
        confirmedPoints: 0,
        correctAnswers: 0,
        problemsAttempted: 0,
        currentStreak: 0,
      }),
    ]
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(0)
    expect(result.totalCorrect).toBe(0)
    expect(result.totalAttempted).toBe(0)
    expect(result.maxStreak).toBe(0)
  })

  test('handles large number of documents', () => {
    const docs = Array.from({ length: 100 }, (_, i) =>
      makeMockDoc({
        confirmedPoints: 10,
        correctAnswers: 1,
        problemsAttempted: 2,
        currentStreak: i % 10,
      })
    )
    const result = aggregateEngagementData(docs)
    expect(result.totalPoints).toBe(1000)
    expect(result.totalCorrect).toBe(100)
    expect(result.totalAttempted).toBe(200)
    expect(result.maxStreak).toBe(9)
  })
})

// ---------------------------------------------------------------------------
// formatLeaderboardEntry
// ---------------------------------------------------------------------------

describe('formatLeaderboardEntry', () => {
  test('returns formatted entry when points > 0', () => {
    const result = formatLeaderboardEntry('user-123', {
      pointsEarned: 500,
      correctAnswers: 40,
      problemsAttempted: 50,
      currentStreak: 7,
    })
    expect(result).toEqual({
      userId: 'user-123',
      pointsEarned: 500,
      correctAnswers: 40,
      problemsAttempted: 50,
      currentStreak: 7,
    })
  })

  test('returns null when points are 0', () => {
    const result = formatLeaderboardEntry('user-123', {
      pointsEarned: 0,
      correctAnswers: 0,
      problemsAttempted: 10,
      currentStreak: 0,
    })
    expect(result).toBeNull()
  })

  test('returns null when points are negative', () => {
    const result = formatLeaderboardEntry('user-123', {
      pointsEarned: -5,
      correctAnswers: 0,
      problemsAttempted: 5,
      currentStreak: 0,
    })
    expect(result).toBeNull()
  })

  test('returns entry when points are exactly 1', () => {
    const result = formatLeaderboardEntry('user-123', {
      pointsEarned: 1,
      correctAnswers: 1,
      problemsAttempted: 1,
      currentStreak: 1,
    })
    expect(result).not.toBeNull()
    expect(result!.pointsEarned).toBe(1)
  })

  test('preserves all fields from metrics', () => {
    const metrics = {
      pointsEarned: 999,
      correctAnswers: 100,
      problemsAttempted: 120,
      currentStreak: 15,
    }
    const result = formatLeaderboardEntry('abc', metrics)
    expect(result).not.toBeNull()
    expect(result!.userId).toBe('abc')
    expect(result!.pointsEarned).toBe(999)
    expect(result!.correctAnswers).toBe(100)
    expect(result!.problemsAttempted).toBe(120)
    expect(result!.currentStreak).toBe(15)
  })

  test('does not include extra fields beyond the defined interface', () => {
    const result = formatLeaderboardEntry('user', {
      pointsEarned: 10,
      correctAnswers: 5,
      problemsAttempted: 8,
      currentStreak: 3,
    })
    const keys = Object.keys(result!)
    expect(keys.sort()).toEqual(
      [
        'userId',
        'pointsEarned',
        'correctAnswers',
        'problemsAttempted',
        'currentStreak',
      ].sort()
    )
  })
})
