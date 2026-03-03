// Admin authentication and authorization utilities

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

export interface AdminUser {
  uid: string
  email: string
  role: 'admin' | 'moderator' | 'superadmin'
  permissions: string[]
}

// Check if user is admin
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (!userDoc.exists()) return false

    const userData = userDoc.data()
    return userData.role === 'admin' || userData.role === 'superadmin'
  } catch (error) {
    logger.error('AdminAuth', 'Failed to check admin status', { error })
    return false
  }
}

// Get admin user details
export async function getAdminUser(userId: string): Promise<AdminUser | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (!userDoc.exists()) return null

    const userData = userDoc.data()
    if (!userData.role || !['admin', 'moderator', 'superadmin'].includes(userData.role)) {
      return null
    }

    return {
      uid: userId,
      email: userData.email,
      role: userData.role,
      permissions: userData.permissions || [],
    }
  } catch (error) {
    logger.error('AdminAuth', 'Failed to get admin user', { error })
    return null
  }
}

// Check if user has specific permission
export async function hasPermission(userId: string, permission: string): Promise<boolean> {
  const adminUser = await getAdminUser(userId)
  if (!adminUser) return false

  // Superadmin has all permissions
  if (adminUser.role === 'superadmin') return true

  return adminUser.permissions.includes(permission)
}
