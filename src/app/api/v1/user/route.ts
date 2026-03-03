import { NextRequest } from 'next/server'
import { db } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {
  authenticateRequest,
  createSuccessResponse,
  createErrorResponse,
  logRequest,
} from '../middleware'
import { API_ERRORS } from '@/lib/api/types'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/v1/user - Get authenticated user's profile
 */
export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request, ['read:user'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth

  try {
    // Get user data
    const userDoc = await getDoc(doc(db, 'users', apiKey.userId))

    if (!userDoc.exists()) {
      await logRequest(request, apiKey.id, 404)
      return createErrorResponse(API_ERRORS.RESOURCE_NOT_FOUND, 'User not found', 404)
    }

    const userData: any = {
      id: userDoc.id,
      ...userDoc.data(),
    }

    // Remove sensitive fields
    const { emailVerified, lastLogin, ...publicData } = userData

    await logRequest(request, apiKey.id, 200)
    return createSuccessResponse(publicData)
  } catch (error) {
    apiLogger.apiError('v1/user', 'Failed to get user profile', error)
    await logRequest(request, apiKey.id, 500)
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 'Internal server error', 500)
  }
}

/**
 * PATCH /api/v1/user - Update user profile
 */
export async function PATCH(request: NextRequest) {
  const auth = await authenticateRequest(request, ['write:user'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth

  try {
    const updates = await request.json()

    // Whitelist of allowed fields
    const allowedFields = ['displayName', 'bio', 'location', 'website', 'githubUsername']
    const filteredUpdates: any = {}

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field]
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      await logRequest(request, apiKey.id, 400)
      return createErrorResponse(
        API_ERRORS.INVALID_REQUEST,
        'No valid fields to update',
        400
      )
    }

    // Update user
    const userRef = doc(db, 'users', apiKey.userId)
    await updateDoc(userRef, filteredUpdates)

    // Get updated data
    const userDoc = await getDoc(userRef)
    const userData: any = {
      id: userDoc.id,
      ...userDoc.data(),
    }

    await logRequest(request, apiKey.id, 200)
    return createSuccessResponse(userData)
  } catch (error) {
    apiLogger.apiError('v1/user', 'Failed to update user profile', error)
    await logRequest(request, apiKey.id, 500)
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 'Internal server error', 500)
  }
}
