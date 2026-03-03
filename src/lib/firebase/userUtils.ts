import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './config'
import { User } from 'firebase/auth'
import { logger } from '@/lib/logger'

/**
 * Generate verification code for a user (must match backend logic)
 */
export function generateVerificationCode(uid: string): string {
  const hash = uid.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  const part1 = Math.abs(hash).toString(36).substring(0, 4).toUpperCase()
  const part2 = Math.abs(hash * 7).toString(36).substring(0, 4).toUpperCase()
  const part3 = Math.abs(hash * 13).toString(36).substring(0, 4).toUpperCase()
  return `PITCH-${part1}-${part2}-${part3}`
}

/**
 * Initialize user data in Firestore on first login
 * This ensures the user document exists and verification code lookup is created
 */
export async function initializeUserData(user: User): Promise<void> {
  try {
    const userRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userRef)

    // Only initialize if user doesn't exist
    if (!userDoc.exists()) {
      const verificationCode = generateVerificationCode(user.uid)
      
      // Create user document
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        verificationCode,
        role: 'student',
        createdAt: new Date().toISOString(),
        cursorVerified: false,
      })
      
      // Note: verificationCodeLookup collection will be populated by the backend
      // when the user makes their first verification attempt, or can be done via
      // a Firebase Cloud Function trigger
    }
  } catch (error) {
    logger.error('Initializeuserdata', 'Failed', { error: error })
  }
}


