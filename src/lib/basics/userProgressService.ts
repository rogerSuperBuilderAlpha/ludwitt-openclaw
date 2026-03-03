/**
 * User Progress Service
 * 
 * Handles user progress management for the Basics Dashboard,
 * including CRUD operations on Firebase documents.
 */

import { db } from '@/lib/firebase/admin'
import {
  UserBasicsProgress,
  SubjectProgress,
  SubjectProgressDisplay,
  Attempt
} from '@/lib/types/basics'
import {
  calculateNextDifficulty,
  calculateProgressToNextLevel,
  getGradeLevelString,
  calculateAccuracyRate,
  checkDailyStreak
} from './adaptation'
import { getTodayDate } from '@/lib/utils/date-helpers'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'

/**
 * Get or create user progress document
 */
export async function getOrCreateUserProgress(userId: string): Promise<UserBasicsProgress> {
  const docRef = db.collection('userBasicsProgress').doc(userId)
  const doc = await docRef.get()

  if (doc.exists) {
    const data = doc.data() as UserBasicsProgress
    
    // Migrate old users with dailyGoal < 1000 to the new goal
    if (!data.dailyGoal || data.dailyGoal < 1000) {
      await docRef.update({ dailyGoal: 1000 })
      data.dailyGoal = 1000
    }
    
    return data
  }

  // Create new progress document
  const now = Timestamp.now()
  const initialProgress: UserBasicsProgress = {
    userId,
    math: {
      currentDifficulty: 5.0,
      totalCompleted: 0,
      totalCorrect: 0,
      accuracyRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      recentAttempts: [],
      lastActivity: now,
      problemsSeen: []
    },
    reading: {
      currentDifficulty: 5.0,
      totalCompleted: 0,
      totalCorrect: 0,
      accuracyRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      recentAttempts: [],
      lastActivity: now,
      exercisesSeen: []
    },
    dailyStreak: 1,
    lastActiveDate: getTodayDate(),
    totalXP: 0,
    dailyXP: 0,
    dailyGoal: 1000, // Daily goal required before allowing grade progression
    createdAt: now,
    updatedAt: now
  }

  await docRef.set(initialProgress)
  return initialProgress
}

/**
 * Update user progress after an attempt
 */
export async function updateUserProgress(
  userId: string,
  subject: 'math' | 'reading',
  attemptData: {
    problemId: string
    difficulty: number
    type: string
    correct: boolean
    timeSpent: number
    xpEarned: number
  }
): Promise<{
  newDifficulty: number
  currentStreak: number
  longestStreak: number
  totalXP: number
  totalCompleted: number
  totalCorrect: number
  accuracyRate: number
  progressToNextLevel: number
  levelUp: boolean
  problemsSeen: string[]
  exercisesSeen: string[]
} | null> {
  const docRef = db.collection('userBasicsProgress').doc(userId)

  // Use a Firestore transaction to prevent race conditions from concurrent submissions.
  // Without this, two simultaneous answers could read the same state and overwrite each other.
  // The idempotency check also lives inside the transaction so two concurrent requests
  // for the same problemId are serialized — only the first one commits.
  return db.runTransaction(async (transaction) => {
    const doc = await transaction.get(docRef)

    if (!doc.exists) {
      throw new Error('User progress not found')
    }

    const progress = doc.data() as UserBasicsProgress
    const subjectProgress = progress[subject]

    // Idempotency: reject if ANY recent attempt matches this problemId within 30 seconds.
    // Scanning all entries (not just index 0) catches delayed duplicates that arrive
    // after an intervening attempt for a different problem. The transaction serializes
    // concurrent requests so the second one always sees the first's committed write.
    const DEDUP_WINDOW_MS = 30_000
    const now = Date.now()
    if (subjectProgress.recentAttempts?.length > 0) {
      const isDuplicate = subjectProgress.recentAttempts.some(attempt => {
        if (attempt.problemId !== attemptData.problemId) return false
        const attemptMs = attempt.timestamp?.toMillis?.()
          ?? (attempt.timestamp?.seconds ? attempt.timestamp.seconds * 1000 : 0)
        return attemptMs && (now - attemptMs) < DEDUP_WINDOW_MS
      })
      if (isDuplicate) {
        return null // duplicate — caller should return 400
      }
    }

    // Create new attempt
    const attempt: Attempt = {
      problemId: attemptData.problemId,
      difficulty: attemptData.difficulty,
      type: attemptData.type,
      correct: attemptData.correct,
      timeSpent: attemptData.timeSpent,
      timestamp: Timestamp.now(),
      xpEarned: attemptData.xpEarned
    }

    // Update recent attempts (keep last 10)
    const updatedAttempts = [attempt, ...subjectProgress.recentAttempts].slice(0, 10)

    // Check daily streak and reset daily XP if new day
    const todayDate = getTodayDate()
    const isNewDay = progress.lastActiveDate !== todayDate
    const currentDailyXP = isNewDay ? attemptData.xpEarned : (progress.dailyXP || 0) + attemptData.xpEarned
    const dailyGoal = progress.dailyGoal || 50

    // Calculate new difficulty - pass dailyXP to enforce quota requirement for grade progression
    const oldDifficulty = subjectProgress.currentDifficulty
    const newDifficulty = calculateNextDifficulty(updatedAttempts, oldDifficulty, currentDailyXP, dailyGoal)

    // Update streak
    const newStreak = attemptData.correct ? subjectProgress.currentStreak + 1 : 0

    // Update totals
    const newTotalCompleted = subjectProgress.totalCompleted + 1
    const newTotalCorrect = subjectProgress.totalCorrect + (attemptData.correct ? 1 : 0)
    const newAccuracyRate = calculateAccuracyRate(newTotalCorrect, newTotalCompleted)

    // Update XP
    const newTotalXP = subjectProgress.totalXP + attemptData.xpEarned

    // Check for level up
    const levelUp = Math.floor(newDifficulty) > Math.floor(oldDifficulty)

    // Update problems/exercises seen with smart management
    const seenKey = subject === 'math' ? 'problemsSeen' : 'exercisesSeen'
    const currentSeen = subjectProgress[seenKey as keyof typeof subjectProgress] as string[]

    // Add new problem ID if not already seen
    let updatedSeen = currentSeen
    if (!currentSeen.includes(attemptData.problemId)) {
      updatedSeen = [...currentSeen, attemptData.problemId]
    }

    // Smart pruning: keep more recent problems but allow older ones to be reused
    const maxRecentProblems = 100
    if (updatedSeen.length > maxRecentProblems) {
      updatedSeen = updatedSeen.slice(-maxRecentProblems)
    }

    // Check daily streak
    const streakResult = checkDailyStreak(progress.lastActiveDate, todayDate, progress.dailyStreak)

    const newDailyXP = currentDailyXP

    // Update Firestore within transaction — progress + xpHistory in one atomic write
    transaction.update(docRef, {
      [`${subject}.currentDifficulty`]: newDifficulty,
      [`${subject}.recentAttempts`]: updatedAttempts,
      [`${subject}.totalCompleted`]: newTotalCompleted,
      [`${subject}.totalCorrect`]: newTotalCorrect,
      [`${subject}.accuracyRate`]: newAccuracyRate,
      [`${subject}.currentStreak`]: newStreak,
      [`${subject}.longestStreak`]: Math.max(newStreak, subjectProgress.longestStreak),
      [`${subject}.totalXP`]: newTotalXP,
      [`${subject}.lastActivity`]: Timestamp.now(),
      [`${subject}.${seenKey}`]: updatedSeen,
      dailyStreak: streakResult.newStreak,
      lastActiveDate: todayDate,
      totalXP: progress.totalXP + attemptData.xpEarned,
      dailyXP: newDailyXP,
      dailyGoal: progress.dailyGoal || 1000,
      // xpHistory for time-range totals — atomic with progress so they can't drift
      [`xpHistory.${todayDate}`]: FieldValue.increment(attemptData.xpEarned),
      updatedAt: Timestamp.now()
    })

    // XP transaction record — also inside the Firestore transaction for atomicity
    const xpTxnRef = db.collection('xpTransactions').doc()
    transaction.create(xpTxnRef, {
      userId,
      source: subject,
      baseXP: attemptData.xpEarned,
      costsApplied: 0,
      netXP: attemptData.xpEarned,
      problemId: attemptData.problemId,
      timestamp: new Date().toISOString(),
      details: {
        isCorrect: attemptData.correct,
        timeSpent: attemptData.timeSpent
      }
    })

    return {
      newDifficulty,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, subjectProgress.longestStreak),
      totalXP: newTotalXP,
      totalCompleted: newTotalCompleted,
      totalCorrect: newTotalCorrect,
      accuracyRate: newAccuracyRate,
      progressToNextLevel: calculateProgressToNextLevel(newDifficulty),
      levelUp,
      problemsSeen: subject === 'math' ? updatedSeen : progress.math.problemsSeen,
      exercisesSeen: subject === 'reading' ? updatedSeen : progress.reading.exercisesSeen
    }
  })
}

/**
 * Format subject progress for frontend display
 */
export function formatSubjectProgress(progress: SubjectProgress): SubjectProgressDisplay {
  return {
    currentDifficulty: progress.currentDifficulty,
    currentLevel: getGradeLevelString(progress.currentDifficulty),
    totalCompleted: progress.totalCompleted,
    totalCorrect: progress.totalCorrect,
    accuracyRate: progress.accuracyRate,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    totalXP: progress.totalXP,
    progressToNextLevel: calculateProgressToNextLevel(progress.currentDifficulty)
  }
}

/**
 * Check if user needs to advance to next grade level
 * This prevents students from getting stuck on a single grade for too long
 */
export function shouldAdvanceGradeLevel(
  subjectProgress: SubjectProgress,
  currentGrade: number
): boolean {
  const problemsAtCurrentGrade = subjectProgress.recentAttempts.filter(
    attempt => Math.floor(attempt.difficulty) === currentGrade
  ).length

  const accuracyAtCurrentGrade = subjectProgress.recentAttempts
    .filter(attempt => Math.floor(attempt.difficulty) === currentGrade)
    .reduce((acc, attempt, _, arr) => {
      const correct = arr.filter(a => a.correct).length
      return correct / arr.length
    }, 0)

  // Advance if:
  // 1. Completed 20+ problems at current grade with 70%+ accuracy, OR
  // 2. Completed 50+ problems at current grade regardless of accuracy (prevent getting stuck)
  return (problemsAtCurrentGrade >= 20 && accuracyAtCurrentGrade >= 0.7) ||
         problemsAtCurrentGrade >= 50
}

/**
 * Get optimal difficulty for next problem considering grade progression
 */
export function getOptimalDifficulty(
  subjectProgress: SubjectProgress,
  baseDifficulty: number
): number {
  const currentGrade = Math.floor(baseDifficulty)
  
  // Check if should advance to next grade
  if (shouldAdvanceGradeLevel(subjectProgress, currentGrade)) {
    const nextGrade = Math.min(currentGrade + 1, 12) // Cap at grade 12
    return nextGrade + 0.1 // Start slightly above the grade level
  }

  return baseDifficulty
}




