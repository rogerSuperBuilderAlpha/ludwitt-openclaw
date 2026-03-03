/**
 * API Route: GET/POST /api/developers/starred
 *
 * Manages starred items for developers (documents and projects)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase/admin'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { isDeveloper, isAdmin } from '@/config/developers'
import { apiLogger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

/**
 * GET - Retrieve starred items for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { decodedToken } = authResult

    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    const userId = decodedToken.uid
    const prefsDoc = await db
      .collection('developerPreferences')
      .doc(userId)
      .get()

    if (!prefsDoc.exists) {
      return successResponse({ starredItems: [] })
    }

    const data = prefsDoc.data()
    return successResponse({
      starredItems: data?.starredItems || [],
    })
  } catch (error: unknown) {
    apiLogger.apiError(
      'developers/starred',
      'Failed to get starred items',
      error
    )
    return serverError(error, 'Failed to retrieve starred items')
  }
}

/**
 * POST - Update starred items for the current user
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { decodedToken } = authResult

    const email = decodedToken.email || ''
    if (!isDeveloper(email) && !isAdmin(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { starredItems } = body

    if (!Array.isArray(starredItems)) {
      return NextResponse.json(
        { success: false, error: 'starredItems must be an array' },
        { status: 400 }
      )
    }

    const userId = decodedToken.uid
    await db.collection('developerPreferences').doc(userId).set(
      {
        starredItems,
        updatedAt: new Date(),
      },
      { merge: true }
    )

    apiLogger.success('developers/starred', 'Starred items updated', {
      count: starredItems.length,
    })

    return successResponse({ starredItems })
  } catch (error: unknown) {
    apiLogger.apiError(
      'developers/starred',
      'Failed to update starred items',
      error
    )
    return serverError(error, 'Failed to update starred items')
  }
}
