/**
 * Authentication Middleware Utilities
 *
 * Shared authentication logic for API routes to reduce duplication
 *
 * WARNING: When refactoring components that make API calls, always preserve
 * the full `user` object from useAuth() and the user.getIdToken() call.
 * Never replace authenticated fetch with plain fetch() — that drops the
 * Authorization header and causes 401 errors in production.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/admin'
import { DecodedIdToken } from 'firebase-admin/auth'
import { logger } from '@/lib/logger'

export interface AuthenticatedRequest {
  userId: string
  decodedToken: DecodedIdToken
}

/**
 * Authenticate a request and extract user information
 * Returns either authenticated user info or an error response
 */
export async function authenticateRequest(
  request: NextRequest,
  options: {
    requireAuth?: boolean
    errorMessage?: string
  } = {}
): Promise<AuthenticatedRequest | NextResponse> {
  const { requireAuth = true, errorMessage = 'Unauthorized' } = options

  // Check if Firebase Admin is configured
  if (!auth) {
    return NextResponse.json(
      { success: false, error: 'Service temporarily unavailable' },
      { status: 503 }
    )
  }

  // Get authorization header
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (!requireAuth) {
      // Return null-like response that can be checked
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 401 }
    )
  }

  // Extract token
  const token = authHeader.replace('Bearer ', '').trim()

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Invalid authorization token' },
      { status: 401 }
    )
  }

  // Verify token
  try {
    const decodedToken = await auth.verifyIdToken(token)
    return {
      userId: decodedToken.uid,
      decodedToken,
    }
  } catch (error) {
    logger.error('AuthMiddleware', 'Token verification failed', { error })
    return NextResponse.json(
      { success: false, error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}

/**
 * Verify that the authenticated user matches the requested userId
 * Useful for ensuring users can only access their own resources
 */
export function verifyUserMatch(
  authenticatedUserId: string,
  requestedUserId: string
): NextResponse | null {
  if (authenticatedUserId !== requestedUserId) {
    return NextResponse.json(
      {
        success: false,
        error: "Forbidden - Cannot access another user's resources",
      },
      { status: 403 }
    )
  }
  return null
}

export type UserRole =
  | 'admin'
  | 'developer'
  | 'customer'
  | 'mentor'
  | 'student'
  | 'educator'

export interface AuthenticatedUserWithRole extends AuthenticatedRequest {
  userData: {
    role: UserRole
    email?: string
    displayName?: string
    [key: string]: any
  }
}

/**
 * Authenticate request and verify user has one of the required roles
 * Returns user data with role information or error response
 */
export async function authenticateWithRole(
  request: NextRequest,
  db: FirebaseFirestore.Firestore,
  options: {
    allowedRoles?: UserRole[]
    errorMessage?: string
  } = {}
): Promise<AuthenticatedUserWithRole | NextResponse> {
  const { allowedRoles, errorMessage = 'Forbidden' } = options

  // First authenticate the request
  const authResult = await authenticateRequest(request)

  if (authResult instanceof NextResponse) {
    return authResult
  }

  // Fetch user data
  try {
    const userDoc = await db.collection('users').doc(authResult.userId).get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = userDoc.data() as AuthenticatedUserWithRole['userData']

    // Check role if roles are specified
    if (allowedRoles && allowedRoles.length > 0) {
      if (!userData.role || !allowedRoles.includes(userData.role)) {
        return NextResponse.json(
          { success: false, error: errorMessage },
          { status: 403 }
        )
      }
    }

    return {
      ...authResult,
      userData,
    }
  } catch (error) {
    logger.error('AuthMiddleware', 'Failed to fetch user data', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to verify user permissions' },
      { status: 500 }
    )
  }
}

/**
 * Check if user has admin role from userData
 */
export function isAdmin(userData: { role?: string } | undefined): boolean {
  return userData?.role === 'admin'
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(
  userData: { role?: string } | undefined,
  roles: UserRole[]
): boolean {
  return (
    userData?.role !== undefined && roles.includes(userData.role as UserRole)
  )
}
