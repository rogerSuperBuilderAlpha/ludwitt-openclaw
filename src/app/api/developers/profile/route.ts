/**
 * Developer Profile API
 * GET - Get current user's developer profile
 * PATCH - Update current user's developer profile
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getDeveloperProfile, updateDeveloperProfile } from '@/lib/api/developers/profile'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/developers/profile
 * Get current user's developer profile
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await authenticateRequest(req)
    if (authResult instanceof NextResponse) return authResult

    const profile = await getDeveloperProfile(authResult.userId)

    return NextResponse.json({
      success: true,
      profile,
      exists: !!profile
    })
  } catch (error) {
    apiLogger.apiError('developers/profile', 'Failed to fetch developer profile', error)
    return NextResponse.json(
      { success: false, error: getErrorMessage(error, 'Failed to fetch profile') },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/developers/profile
 * Update current user's developer profile
 */
export async function PATCH(req: NextRequest) {
  try {
    const authResult = await authenticateRequest(req)
    if (authResult instanceof NextResponse) return authResult

    const updates = await req.json()

    // Prevent updating protected fields
    if (updates.userId && updates.userId !== authResult.userId) {
      return NextResponse.json(
        { success: false, error: 'Cannot update another user\'s profile' },
        { status: 403 }
      )
    }

    const profile = await updateDeveloperProfile(authResult.userId, updates)

    return NextResponse.json({
      success: true,
      profile
    })
  } catch (error) {
    apiLogger.apiError('developers/profile', 'Failed to update developer profile', error)
    return NextResponse.json(
      { success: false, error: getErrorMessage(error, 'Failed to update profile') },
      { status: 500 }
    )
  }
}

