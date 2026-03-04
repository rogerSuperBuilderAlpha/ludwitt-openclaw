/**
 * Firestore Helper Utilities
 *
 * Common Firestore operations and helpers
 */

import { db } from '@/lib/firebase/admin'
import {
  Timestamp,
  DocumentSnapshot,
  DocumentReference,
} from 'firebase-admin/firestore'

const COLLECTIONS = {
  USER_BASICS_PROGRESS: 'userBasicsProgress',
  BASICS_ENGAGEMENT: 'basicsEngagement',
  USERS: 'users',
} as const

/**
 * Get user progress document
 */
export async function getUserProgressDoc(
  userId: string
): Promise<DocumentSnapshot> {
  return await db.collection(COLLECTIONS.USER_BASICS_PROGRESS).doc(userId).get()
}

/**
 * Get user progress data with existence check
 * Returns null if document doesn't exist or has no data
 */
export async function getUserProgressData(userId: string): Promise<any | null> {
  const doc = await getUserProgressDoc(userId)
  if (!doc.exists) {
    return null
  }
  return doc.data() || null
}

/**
 * Get daily engagement document reference
 */
export function getDailyEngagementRef(
  userId: string,
  date: string
): DocumentReference {
  return db
    .collection(COLLECTIONS.BASICS_ENGAGEMENT)
    .doc(userId)
    .collection('daily')
    .doc(date)
}

/**
 * Get or create daily engagement document
 * Returns the document snapshot
 */
export async function getOrCreateDailyEngagement(
  userId: string,
  date: string,
  initialData?: Record<string, any>
): Promise<DocumentSnapshot> {
  const docRef = getDailyEngagementRef(userId, date)
  const doc = await docRef.get()

  if (!doc.exists && initialData) {
    await docRef.set({
      date,
      confirmedPoints: 0,
      sessionsCompleted: 0,
      correctAnswers: 0,
      totalTimeActive: 0,
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
      ...initialData,
    })
    return await docRef.get()
  }

  return doc
}

/**
 * Create timestamp for Firestore
 */
export function createTimestamp(): Timestamp {
  return Timestamp.now()
}

/**
 * Create ISO string timestamp
 */
export function createISOTimestamp(): string {
  return new Date().toISOString()
}

/**
 * Create date object
 */
export function createDate(): Date {
  return new Date()
}

/**
 * Convert Firestore timestamp to Date
 */
export function toDate(
  timestamp: Timestamp | Date | string | number | null | undefined
): Date | undefined {
  if (!timestamp) return undefined
  if (timestamp instanceof Date) return timestamp

  // Handle Firestore Timestamp objects (they have a toDate method)
  if (
    typeof timestamp === 'object' &&
    'toDate' in timestamp &&
    typeof timestamp.toDate === 'function'
  ) {
    return timestamp.toDate()
  }

  // Handle string or number timestamps
  const date = new Date(timestamp as string | number)
  return isNaN(date.getTime()) ? undefined : date
}

/**
 * Convert Date to Firestore timestamp
 */
export function toFirestoreTimestamp(
  date: Date | null | undefined
): Timestamp | undefined {
  if (!date) return undefined
  const { Timestamp } = require('firebase-admin/firestore')
  return Timestamp.fromDate(date)
}

/**
 * Batch fetch user profiles efficiently
 * Fetches in batches of 10 to avoid Firestore limits
 */
export async function batchFetchUserProfiles(
  userIds: string[]
): Promise<Map<string, any>> {
  const profileMap = new Map<string, any>()

  // Process in batches of 10
  for (let i = 0; i < userIds.length; i += 10) {
    const batch = userIds.slice(i, i + 10)
    const profilePromises = batch.map((userId) =>
      db
        .collection(COLLECTIONS.USERS)
        .doc(userId)
        .get()
        .then((doc) => ({
          userId,
          data: doc.exists ? doc.data() : null,
        }))
    )

    const profiles = await Promise.all(profilePromises)
    profiles.forEach(({ userId, data }) => {
      if (data) {
        profileMap.set(userId, data)
      }
    })
  }

  return profileMap
}
