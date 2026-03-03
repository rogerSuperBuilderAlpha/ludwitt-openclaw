/**
 * Misconception Storage
 * 
 * Firestore operations for misconception profiles and error records.
 */

import { db } from '@/lib/firebase/admin'
import {
  UserMisconceptionProfile,
  MisconceptionProfileDoc,
  ErrorRecordDoc,
  ErrorFeatures,
  MISCONCEPTION_COLLECTIONS
} from './types'
import { DetectionInput } from './detector'

// ============================================================================
// Profile Storage
// ============================================================================

/**
 * Get a user's misconception profile
 */
export async function getMisconceptionProfile(
  userId: string
): Promise<UserMisconceptionProfile | null> {
  const doc = await db
    .collection(MISCONCEPTION_COLLECTIONS.USER_PROFILES)
    .doc(userId)
    .get()
  
  if (!doc.exists) {
    return null
  }
  
  const data = doc.data() as MisconceptionProfileDoc
  
  // Convert Firestore timestamps to Dates
  return {
    userId: data.userId,
    lastUpdated: toDate(data.lastUpdated),
    activeMisconceptions: data.activeMisconceptions.map(m => ({
      ...m,
      firstDetected: toDate(m.firstDetected),
      lastObserved: toDate(m.lastObserved),
      remediationStarted: m.remediationStarted ? toDate(m.remediationStarted) : undefined,
      resolvedAt: m.resolvedAt ? toDate(m.resolvedAt) : undefined,
      evidence: m.evidence.map(e => ({
        ...e,
        timestamp: toDate(e.timestamp)
      }))
    })),
    resolvedMisconceptions: data.resolvedMisconceptions.map(m => ({
      ...m,
      firstDetected: toDate(m.firstDetected),
      lastObserved: toDate(m.lastObserved),
      remediationStarted: m.remediationStarted ? toDate(m.remediationStarted) : undefined,
      resolvedAt: m.resolvedAt ? toDate(m.resolvedAt) : undefined,
      evidence: m.evidence.map(e => ({
        ...e,
        timestamp: toDate(e.timestamp)
      }))
    })),
    stats: data.stats
  }
}

/**
 * Store a user's misconception profile
 */
export async function storeMisconceptionProfile(
  profile: UserMisconceptionProfile
): Promise<void> {
  const profileDoc: MisconceptionProfileDoc = {
    userId: profile.userId,
    lastUpdated: profile.lastUpdated,
    activeMisconceptions: profile.activeMisconceptions,
    resolvedMisconceptions: profile.resolvedMisconceptions,
    stats: profile.stats
  }
  
  await db
    .collection(MISCONCEPTION_COLLECTIONS.USER_PROFILES)
    .doc(profile.userId)
    .set(profileDoc)
}

// ============================================================================
// Error Record Storage
// ============================================================================

/**
 * Store an error record for misconception analysis
 */
export async function storeErrorRecord(
  input: DetectionInput,
  errorFeatures: Partial<ErrorFeatures>,
  detectedMisconceptions: string[]
): Promise<string> {
  const errorRecord: ErrorRecordDoc = {
    userId: input.userId,
    problemId: input.problemId,
    timestamp: new Date(),
    subject: input.subject,
    problemType: input.problemType,
    difficulty: input.difficulty,
    skills: input.skills,
    studentAnswer: input.studentAnswer,
    correctAnswer: input.correctAnswer,
    errorFeatures,
    detectedMisconceptions,
    detectionConfidences: []
  }
  
  const docRef = await db
    .collection(MISCONCEPTION_COLLECTIONS.ERROR_RECORDS)
    .add(errorRecord)
  
  return docRef.id
}

/**
 * Get recent error records for a user
 */
export async function getRecentErrorRecords(
  userId: string,
  limit: number = 50
): Promise<ErrorRecordDoc[]> {
  const snapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.ERROR_RECORDS)
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as ErrorRecordDoc
    return {
      ...data,
      timestamp: toDate(data.timestamp)
    }
  })
}

/**
 * Get error records for a specific misconception
 */
export async function getErrorRecordsForMisconception(
  userId: string,
  misconceptionId: string,
  limit: number = 20
): Promise<ErrorRecordDoc[]> {
  const snapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.ERROR_RECORDS)
    .where('userId', '==', userId)
    .where('detectedMisconceptions', 'array-contains', misconceptionId)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as ErrorRecordDoc
    return {
      ...data,
      timestamp: toDate(data.timestamp)
    }
  })
}

/**
 * Get error records for a specific subject
 */
export async function getErrorRecordsBySubject(
  userId: string,
  subject: string,
  limit: number = 50
): Promise<ErrorRecordDoc[]> {
  const snapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.ERROR_RECORDS)
    .where('userId', '==', userId)
    .where('subject', '==', subject)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as ErrorRecordDoc
    return {
      ...data,
      timestamp: toDate(data.timestamp)
    }
  })
}

// ============================================================================
// Analytics Queries
// ============================================================================

/**
 * Get misconception prevalence across all users
 */
export async function getMisconceptionPrevalence(
  misconceptionId: string
): Promise<{
  totalOccurrences: number
  affectedUsers: number
  avgConfidence: number
}> {
  // Query all profiles with this misconception
  const activeSnapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.USER_PROFILES)
    .where('activeMisconceptions', 'array-contains-any', [{ misconceptionId }])
    .limit(1000)
    .get()
  
  const resolvedSnapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.USER_PROFILES)
    .where('resolvedMisconceptions', 'array-contains-any', [{ misconceptionId }])
    .limit(1000)
    .get()
  
  let totalOccurrences = 0
  let totalConfidence = 0
  let confidenceCount = 0
  const affectedUserIds = new Set<string>()
  
  const processProfile = (data: MisconceptionProfileDoc) => {
    const allMisconceptions = [...data.activeMisconceptions, ...data.resolvedMisconceptions]
    for (const m of allMisconceptions) {
      if (m.misconceptionId === misconceptionId) {
        totalOccurrences += m.occurrenceCount
        totalConfidence += m.confidence
        confidenceCount++
        affectedUserIds.add(data.userId)
      }
    }
  }
  
  activeSnapshot.docs.forEach(doc => processProfile(doc.data() as MisconceptionProfileDoc))
  resolvedSnapshot.docs.forEach(doc => processProfile(doc.data() as MisconceptionProfileDoc))
  
  return {
    totalOccurrences,
    affectedUsers: affectedUserIds.size,
    avgConfidence: confidenceCount > 0 ? totalConfidence / confidenceCount : 0
  }
}

/**
 * Get common misconception patterns for a difficulty range
 */
export async function getCommonMisconceptions(
  subject: string,
  difficultyMin: number,
  difficultyMax: number,
  limit: number = 10
): Promise<Array<{ misconceptionId: string; count: number }>> {
  // Get error records in the difficulty range
  const snapshot = await db
    .collection(MISCONCEPTION_COLLECTIONS.ERROR_RECORDS)
    .where('subject', '==', subject)
    .where('difficulty', '>=', difficultyMin)
    .where('difficulty', '<=', difficultyMax)
    .limit(1000)
    .get()
  
  // Count misconception occurrences
  const counts = new Map<string, number>()
  
  snapshot.docs.forEach(doc => {
    const data = doc.data() as ErrorRecordDoc
    for (const id of data.detectedMisconceptions) {
      counts.set(id, (counts.get(id) || 0) + 1)
    }
  })
  
  // Sort by count and return top N
  return Array.from(counts.entries())
    .map(([misconceptionId, count]) => ({ misconceptionId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

// ============================================================================
// Utility Functions
// ============================================================================

function toDate(value: unknown): Date {
  if (value instanceof Date) {
    return value
  }
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate()
  }
  if (typeof value === 'string') {
    return new Date(value)
  }
  return new Date()
}
