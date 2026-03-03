/**
 * Telemetry Storage
 * 
 * Server-side storage operations for telemetry data in Firestore.
 */

import { db } from '@/lib/firebase/admin'
import {
  SessionTelemetry,
  TelemetryProfile,
  TelemetrySessionDoc,
  TelemetryProfileDoc,
  TELEMETRY_COLLECTIONS
} from './types'
import { updateTelemetryProfile } from './aggregator'

// ============================================================================
// Session Storage
// ============================================================================

/**
 * Store a completed telemetry session
 */
export async function storeTelemetrySession(
  session: SessionTelemetry
): Promise<void> {
  const sessionDoc: TelemetrySessionDoc = {
    sessionId: session.sessionId,
    userId: session.userId,
    problemId: session.problemId,
    subject: session.subject,
    difficulty: session.difficulty,
    skills: session.skills,
    startTime: session.startTime,
    endTime: session.endTime || new Date(),
    signals: session.signals,
    outcome: session.outcome!
    // Note: Raw events not stored for privacy/size
  }
  
  await db
    .collection(TELEMETRY_COLLECTIONS.SESSIONS)
    .doc(session.sessionId)
    .set(sessionDoc)
}

/**
 * Get recent sessions for a user
 */
export async function getRecentSessions(
  userId: string,
  limit: number = 50
): Promise<TelemetrySessionDoc[]> {
  const snapshot = await db
    .collection(TELEMETRY_COLLECTIONS.SESSIONS)
    .where('userId', '==', userId)
    .orderBy('endTime', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => doc.data() as TelemetrySessionDoc)
}

/**
 * Get sessions for a specific problem
 */
export async function getSessionsForProblem(
  problemId: string,
  limit: number = 100
): Promise<TelemetrySessionDoc[]> {
  const snapshot = await db
    .collection(TELEMETRY_COLLECTIONS.SESSIONS)
    .where('problemId', '==', problemId)
    .orderBy('endTime', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => doc.data() as TelemetrySessionDoc)
}

// ============================================================================
// Profile Storage
// ============================================================================

/**
 * Get a user's telemetry profile
 */
export async function getTelemetryProfile(
  userId: string
): Promise<TelemetryProfile | null> {
  const doc = await db
    .collection(TELEMETRY_COLLECTIONS.PROFILES)
    .doc(userId)
    .get()
  
  if (!doc.exists) {
    return null
  }
  
  const data = doc.data() as TelemetryProfileDoc
  
  return {
    userId: data.userId,
    lastUpdated: data.lastUpdated instanceof Date 
      ? data.lastUpdated 
      : (data.lastUpdated as { toDate(): Date }).toDate(),
    totalSessions: data.totalSessions,
    sessionsBySubject: data.sessionsBySubject,
    rollingStats: data.rollingStats,
    patterns: data.patterns,
    metrics: data.metrics
  }
}

/**
 * Store a user's telemetry profile
 */
export async function storeTelemetryProfile(
  profile: TelemetryProfile
): Promise<void> {
  const profileDoc: TelemetryProfileDoc = {
    userId: profile.userId,
    lastUpdated: profile.lastUpdated,
    totalSessions: profile.totalSessions,
    sessionsBySubject: profile.sessionsBySubject,
    rollingStats: profile.rollingStats,
    patterns: profile.patterns,
    metrics: profile.metrics
  }
  
  await db
    .collection(TELEMETRY_COLLECTIONS.PROFILES)
    .doc(profile.userId)
    .set(profileDoc)
}

/**
 * Process a new session: store it and update the user's profile
 */
export async function processTelemetrySession(
  session: SessionTelemetry
): Promise<TelemetryProfile> {
  // Store the session
  await storeTelemetrySession(session)
  
  // Get existing profile
  const existingProfile = await getTelemetryProfile(session.userId)
  
  // Update profile with new session data
  const updatedProfile = updateTelemetryProfile(existingProfile, session)
  
  // Store updated profile
  await storeTelemetryProfile(updatedProfile)
  
  return updatedProfile
}

// ============================================================================
// Analytics Queries
// ============================================================================

/**
 * Get aggregated telemetry stats for a subject
 */
export async function getSubjectStats(
  subject: string,
  difficultyRange?: [number, number]
): Promise<{
  totalSessions: number
  avgTimeMs: number
  avgAccuracy: number
  avgHintUsage: number
}> {
  let query = db
    .collection(TELEMETRY_COLLECTIONS.SESSIONS)
    .where('subject', '==', subject)
  
  if (difficultyRange) {
    query = query
      .where('difficulty', '>=', difficultyRange[0])
      .where('difficulty', '<=', difficultyRange[1])
  }
  
  const snapshot = await query.limit(1000).get()
  
  if (snapshot.empty) {
    return {
      totalSessions: 0,
      avgTimeMs: 0,
      avgAccuracy: 0,
      avgHintUsage: 0
    }
  }
  
  let totalTime = 0
  let correctCount = 0
  let totalHints = 0
  
  snapshot.docs.forEach(doc => {
    const session = doc.data() as TelemetrySessionDoc
    totalTime += session.signals.totalTimeMs
    if (session.outcome.correct) correctCount++
    totalHints += session.signals.hintViews
  })
  
  const count = snapshot.docs.length
  
  return {
    totalSessions: count,
    avgTimeMs: totalTime / count,
    avgAccuracy: correctCount / count,
    avgHintUsage: totalHints / count
  }
}

/**
 * Get problem difficulty calibration data
 */
export async function getProblemDifficultyData(
  problemId: string
): Promise<{
  attemptCount: number
  successRate: number
  avgTimeMs: number
  suggestedDifficulty: number | null
}> {
  const sessions = await getSessionsForProblem(problemId, 100)
  
  if (sessions.length === 0) {
    return {
      attemptCount: 0,
      successRate: 0,
      avgTimeMs: 0,
      suggestedDifficulty: null
    }
  }
  
  let totalTime = 0
  let correctCount = 0
  
  sessions.forEach(session => {
    totalTime += session.signals.totalTimeMs
    if (session.outcome.correct) correctCount++
  })
  
  const successRate = correctCount / sessions.length
  const avgTime = totalTime / sessions.length
  
  // Suggest difficulty based on success rate and time
  // Target: 70% success rate
  let suggestedDifficulty: number | null = null
  
  if (sessions.length >= 10) {
    const currentDifficulty = sessions[0].difficulty
    
    if (successRate > 0.85) {
      suggestedDifficulty = currentDifficulty + 0.5
    } else if (successRate < 0.55) {
      suggestedDifficulty = currentDifficulty - 0.5
    } else {
      suggestedDifficulty = currentDifficulty
    }
  }
  
  return {
    attemptCount: sessions.length,
    successRate,
    avgTimeMs: avgTime,
    suggestedDifficulty
  }
}
