/**
 * Admin Users API
 * Manage platform users (admin only)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db, auth } from '@/lib/firebase/admin'
import { isAdmin } from '@/config/developers'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import {
  forbiddenError,
  badRequestError,
  serverError,
} from '@/lib/api/error-responses'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const rl = await checkRateLimit('strict', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    // Check if user is admin
    if (!isAdmin(decodedToken.email)) {
      return forbiddenError('Admin access required')
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // Optional filter by role
    const limit = parseInt(searchParams.get('limit') || '100')

    // Get users from Firestore
    let usersQuery = db
      .collection('users')
      .orderBy('createdAt', 'desc')
      .limit(limit)

    if (role) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firestore query builder type narrowing limitation
      usersQuery = usersQuery.where('role', '==', role) as any
    }

    const usersSnapshot = await usersQuery.get()

    const users = usersSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        email: data.email,
        displayName: data.displayName,
        role: data.role || 'customer',
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
        emailVerified: data.emailVerified || false,
        photoURL: data.photoURL,
        disabled: data.disabled || false,
      }
    })

    // Get user counts by role
    const customerCount = users.filter((u) => u.role === 'customer').length
    const developerCount = users.filter((u) => u.role === 'developer').length
    const mentorCount = users.filter((u) => u.role === 'mentor').length
    const adminCount = users.filter((u) => u.role === 'admin').length

    return NextResponse.json({
      users,
      total: users.length,
      counts: {
        customer: customerCount,
        developer: developerCount,
        mentor: mentorCount,
        admin: adminCount,
      },
    })
  } catch (error) {
    apiLogger.apiError('admin/users', 'Failed to list users', error)
    return serverError(error, 'Failed to list users')
  }
}

// POST - Update user (disable, change role, etc.)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const decodedToken = authResult.decodedToken

    const rl = await checkRateLimit('strict', decodedToken.uid)
    if (!rl.success) return rateLimitedResponse(rl)

    // Check if user is admin
    if (!isAdmin(decodedToken.email)) {
      return forbiddenError('Admin access required')
    }

    const { userId, action, role } = await request.json()

    if (!userId || !action) {
      return badRequestError('userId and action are required')
    }

    switch (action) {
      case 'disable':
        await auth.updateUser(userId, { disabled: true })
        await db.collection('users').doc(userId).update({
          disabled: true,
          disabledAt: new Date().toISOString(),
          disabledBy: decodedToken.uid,
        })
        break

      case 'enable':
        await auth.updateUser(userId, { disabled: false })
        await db.collection('users').doc(userId).update({
          disabled: false,
          enabledAt: new Date().toISOString(),
          enabledBy: decodedToken.uid,
        })
        break

      case 'changeRole':
        if (!role) {
          return badRequestError('role is required for changeRole action')
        }
        await db.collection('users').doc(userId).update({
          role,
          roleChangedAt: new Date().toISOString(),
          roleChangedBy: decodedToken.uid,
        })
        break

      case 'delete':
        // Delete user from Firebase Auth
        await auth.deleteUser(userId)
        // Delete user document
        await db.collection('users').doc(userId).delete()
        break

      default:
        return badRequestError('Invalid action')
    }

    return NextResponse.json({
      success: true,
      message: `User ${action} successful`,
    })
  } catch (error) {
    apiLogger.apiError('admin/users', 'Failed to update user', error)
    return serverError(error, 'Failed to update user')
  }
}
