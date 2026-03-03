/**
 * User Helper Utilities
 * 
 * Common operations for user documents in Firestore and user-related formatting/calculations
 */

import { db } from '@/lib/firebase/admin'
import { Collections } from '@/lib/basics/collections'
import { createISOTimestamp } from './firestore-helpers'
import { DocumentSnapshot } from 'firebase-admin/firestore'

// ============================================================================
// Firestore User Document Operations
// ============================================================================

/**
 * Get user document from Firestore
 * Returns null if document doesn't exist
 */
export async function getUserDocument(userId: string): Promise<DocumentSnapshot | null> {
  const doc = await db.collection(Collections.USERS).doc(userId).get()
  return doc.exists ? doc : null
}

/**
 * Get user data from Firestore
 * Returns null if document doesn't exist or has no data
 */
export async function getUserData(userId: string): Promise<any | null> {
  const doc = await getUserDocument(userId)
  return doc?.data() || null
}

/**
 * Update user document in Firestore
 * Automatically sets updatedAt timestamp
 */
export async function updateUserDocument(
  userId: string,
  data: Record<string, any>,
  options?: { merge?: boolean }
): Promise<void> {
  await db.collection(Collections.USERS).doc(userId).set({
    ...data,
    updatedAt: createISOTimestamp()
  }, { merge: options?.merge ?? true })
}

/**
 * Update specific fields in user document
 * Automatically sets updatedAt timestamp
 */
export async function updateUserFields(
  userId: string,
  fields: Record<string, any>
): Promise<void> {
  await db.collection(Collections.USERS).doc(userId).update({
    ...fields,
    updatedAt: createISOTimestamp()
  })
}

// ============================================================================
// User Display & Formatting
// ============================================================================

/**
 * Format display name from user profile data with fallbacks
 */
export function formatDisplayName(
  profileData: { displayName?: string; email?: string } | null | undefined,
  userId: string
): string {
  if (!profileData) {
    return `User ${userId.slice(0, 8)}`
  }
  
  if (profileData.displayName) {
    return profileData.displayName
  }
  
  if (profileData.email) {
    return profileData.email.split('@')[0]
  }
  
  return `User ${userId.slice(0, 8)}`
}

// ============================================================================
// User Statistics & Calculations
// ============================================================================

/**
 * Calculate accuracy percentage from correct answers and total attempts
 */
export function calculateAccuracy(correct: number, attempted: number): number {
  if (attempted === 0) return 0
  return Math.round((correct / attempted) * 100)
}

/**
 * Generate badge based on user stats
 */
export function generateBadge(streak: number, accuracy: number, points: number): string {
  if (streak >= 30) return '🔥'
  if (streak >= 14) return '⭐'
  if (accuracy >= 90) return '🎯'
  if (points >= 10000) return '🏆'
  if (streak >= 7) return '💪'
  return '🌟'
}

// ============================================================================
// User Display Info (Avatar-based)
// ============================================================================

import { truncateString } from './string-helpers'

/**
 * Format user display information based on avatar settings
 * Handles photo avatars, character avatars, and fallbacks
 */
export function formatUserDisplayInfo(
  userData: any,
  userId: string
): {
  displayName: string
  photoURL?: string
  characterId?: string
} {
  const avatar = userData?.avatar
  
  // No avatar or incomplete setup
  if (!avatar || !avatar.isCompleted) {
    return {
      displayName: formatDisplayName(userData, userId),
      photoURL: userData?.photoURL
    }
  }
  
  // Photo avatar
  if (avatar.type === 'photo' && avatar.photoURL) {
    return {
      displayName: avatar.displayName || userData?.displayName || userData?.email || `User ${userId.slice(0, 8)}`,
      photoURL: avatar.photoURL
    }
  }
  
  // Character avatar
  if (avatar.type === 'character' && avatar.characterId) {
    return {
      displayName: avatar.nickname || `Student ${truncateString(userId, 8)}`,
      photoURL: undefined,
      characterId: avatar.characterId
    }
  }
  
  // Fallback
  return {
    displayName: formatDisplayName(userData, userId),
    photoURL: userData?.photoURL
  }
}

// ============================================================================
// Leaderboard Sorting
// ============================================================================

interface LeaderboardEntry {
  userId?: string
  points: number
  accuracy?: number
  correctAnswers?: number
  problemsCorrect?: number
  [key: string]: any // Allow additional properties
}

/**
 * Sort leaderboard entries by points (descending), then by accuracy (descending)
 */
export function sortByPointsThenAccuracy(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points
    }
    const aAccuracy = a.accuracy ?? 0
    const bAccuracy = b.accuracy ?? 0
    return bAccuracy - aAccuracy
  })
}

/**
 * Sort leaderboard entries by points (descending), then by problems correct (descending)
 */
export function sortByPointsThenCorrect(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points
    }
    const aCorrect = a.correctAnswers ?? a.problemsCorrect ?? 0
    const bCorrect = b.correctAnswers ?? b.problemsCorrect ?? 0
    return bCorrect - aCorrect
  })
}
