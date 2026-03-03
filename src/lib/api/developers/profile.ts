/**
 * Developer Profile Business Logic
 * Handles CRUD operations for developer profiles
 */

import { db } from '@/lib/firebase/admin'
import { DeveloperProfile } from '@/lib/types/developer'
import { Timestamp, FieldValue } from 'firebase-admin/firestore'
import { logger } from '@/lib/logger'

/**
 * Get developer profile by user ID
 */
export async function getDeveloperProfile(
  userId: string
): Promise<DeveloperProfile | null> {
  try {
    const docRef = db.collection('developerProfiles').doc(userId)
    const doc = await docRef.get()

    if (!doc.exists) {
      return null
    }

    return { id: doc.id, ...doc.data() } as DeveloperProfile
  } catch (error) {
    logger.error('DeveloperProfile', 'Error getting developer profile', {
      error,
    })
    throw new Error('Failed to get developer profile')
  }
}

/**
 * Create a new developer profile
 */
export async function createDeveloperProfile(data: {
  userId: string
  email: string
  displayName: string
  customPageSettings?: Partial<DeveloperProfile['customPageSettings']>
}): Promise<DeveloperProfile> {
  try {
    // Check if profile already exists
    const existing = await getDeveloperProfile(data.userId)
    if (existing) {
      throw new Error('Developer profile already exists')
    }

    // FieldValue.serverTimestamp() is resolved by Firestore on write; cast needed for type compatibility
    const profile: Omit<DeveloperProfile, 'id'> = {
      userId: data.userId,
      email: data.email,
      displayName: data.displayName,
      isActive: true,
      isVerified: false, // Admin must verify
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FieldValue.serverTimestamp() resolved on write, not compatible with client Timestamp type
      createdAt: FieldValue.serverTimestamp() as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FieldValue.serverTimestamp() resolved on write, not compatible with client Timestamp type
      updatedAt: FieldValue.serverTimestamp() as any,
      customPageSettings: {
        isEnabled: true,
        showBio: false,
        showPhoto: false,
        showCustomWelcome: false,
        ...data.customPageSettings,
      },
      stats: {
        totalAssignedProjects: 0,
        totalCompletedProjects: 0,
        totalActiveProjects: 0,
        totalAssignedDocuments: 0,
        totalCompletedDocuments: 0,
        totalActiveDocuments: 0,
      },
      metadata: {},
    }

    await db.collection('developerProfiles').doc(data.userId).set(profile)

    return { id: data.userId, ...profile }
  } catch (error) {
    logger.error('DeveloperProfile', 'Error creating developer profile', {
      error,
    })
    throw error
  }
}

/**
 * Update developer profile
 */
export async function updateDeveloperProfile(
  userId: string,
  updates: Partial<DeveloperProfile>
): Promise<DeveloperProfile> {
  try {
    const docRef = db.collection('developerProfiles').doc(userId)

    // Remove fields that shouldn't be updated by user
    const sanitizedUpdates = { ...updates }
    delete sanitizedUpdates.id
    delete sanitizedUpdates.userId
    delete sanitizedUpdates.isActive
    delete sanitizedUpdates.isVerified
    delete sanitizedUpdates.verifiedAt
    delete sanitizedUpdates.stats
    delete sanitizedUpdates.createdAt

    await docRef.update({
      ...sanitizedUpdates,
      updatedAt: FieldValue.serverTimestamp(),
    })

    const updated = await getDeveloperProfile(userId)
    if (!updated) {
      throw new Error('Profile not found after update')
    }

    return updated
  } catch (error) {
    logger.error('DeveloperProfile', 'Error updating developer profile', {
      error,
    })
    throw error
  }
}

/**
 * Admin: Update any fields including verification status
 */
export async function adminUpdateDeveloperProfile(
  userId: string,
  updates: Partial<DeveloperProfile>
): Promise<DeveloperProfile> {
  try {
    const docRef = db.collection('developerProfiles').doc(userId)

    // Admin can update everything except id and userId
    const sanitizedUpdates = { ...updates }
    delete sanitizedUpdates.id
    delete sanitizedUpdates.userId

    await docRef.update({
      ...sanitizedUpdates,
      updatedAt: FieldValue.serverTimestamp(),
    })

    const updated = await getDeveloperProfile(userId)
    if (!updated) {
      throw new Error('Profile not found after update')
    }

    return updated
  } catch (error) {
    logger.error('DeveloperProfile', 'Error admin updating developer profile', {
      error,
    })
    throw error
  }
}

/**
 * Get all active, verified developers
 */
export async function getActiveDevelopers(): Promise<DeveloperProfile[]> {
  try {
    const snapshot = await db
      .collection('developerProfiles')
      .where('isActive', '==', true)
      .where('isVerified', '==', true)
      .orderBy('displayName', 'asc')
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DeveloperProfile[]
  } catch (error) {
    logger.error('DeveloperProfile', 'Error getting active developers', {
      error,
    })
    throw error
  }
}

/**
 * Get all developers (admin only)
 */
export async function getAllDevelopers(): Promise<DeveloperProfile[]> {
  try {
    const snapshot = await db
      .collection('developerProfiles')
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DeveloperProfile[]
  } catch (error) {
    logger.error('DeveloperProfile', 'Error getting all developers', { error })
    throw error
  }
}

/**
 * Delete developer profile (admin only)
 */
export async function deleteDeveloperProfile(userId: string): Promise<void> {
  try {
    await db.collection('developerProfiles').doc(userId).delete()
  } catch (error) {
    logger.error('DeveloperProfile', 'Error deleting developer profile', {
      error,
    })
    throw error
  }
}
