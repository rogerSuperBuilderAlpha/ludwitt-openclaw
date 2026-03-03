/**
 * @deprecated Use authenticateRequest from '@/lib/api/auth-middleware' instead.
 *
 * API Authentication Middleware
 * Simple admin email check approach
 */

import { NextRequest } from 'next/server'
import { auth, db } from '@/lib/firebase/admin'
import { isAdminEmail } from '@/config/auth'
import { logger } from '@/lib/logger'

export class UnauthorizedError extends Error {
  status = 401
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  status = 403
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

/**
 * Get authenticated user from request
 * Validates token and returns decoded user with email
 */
export async function getAuthUser(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No authorization token provided')
  }
  
  const token = authHeader.substring(7)
  
  try {
    const decodedToken = await auth.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    logger.error('Auth', 'Token verification failed', { error })
    throw new UnauthorizedError('Invalid or expired token')
  }
}

/**
 * Require authentication
 * Returns decoded token with user info
 */
export async function requireAuth(req: NextRequest) {
  return await getAuthUser(req)
}

/**
 * Require admin role
 * Simple email check against hardcoded admin email
 */
export async function requireAdmin(req: NextRequest) {
  const user = await getAuthUser(req)
  
  if (!isAdminEmail(user.email)) {
    throw new ForbiddenError('Admin access required')
  }
  
  return user
}

/**
 * Require developer role
 * Checks if user has an active, verified developer profile
 */
export async function requireDeveloper(req: NextRequest) {
  const user = await getAuthUser(req)
  
  // Check if they have an active developer profile
  const profileDoc = await db.collection('developerProfiles').doc(user.uid).get()
  
  if (!profileDoc.exists) {
    throw new ForbiddenError('Developer profile not found')
  }
  
  const profileData = profileDoc.data()
  
  if (!profileData?.isActive || !profileData?.isVerified) {
    throw new ForbiddenError('Developer access requires an active, verified profile')
  }
  
  return user
}

/**
 * Optional auth - returns user if authenticated, null otherwise
 * Useful for public endpoints that have different behavior for authenticated users
 */
export async function optionalAuth(req: NextRequest) {
  try {
    return await getAuthUser(req)
  } catch (error) {
    return null
  }
}

