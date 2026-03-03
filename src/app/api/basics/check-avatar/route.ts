import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getUserData } from '@/lib/utils/user-helpers'

/**
 * API Route: GET /api/basics/check-avatar
 * Checks if user has completed avatar setup and returns full avatar data
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Get user data
    const userData = await getUserData(userId)

    if (!userData) {
      // New user, needs avatar
      return successResponse({
        hasAvatar: false,
        hasCompletedSetup: false,
        avatarData: null
      })
    }

    const avatar = userData.avatar

    // Check if avatar is completed
    const hasAvatar = avatar && avatar.isCompleted === true

    return successResponse({
      hasAvatar,
      hasCompletedSetup: hasAvatar,
      avatarType: avatar?.type || null,
      // Return full avatar data for settings page
      avatarData: hasAvatar ? {
        avatar: avatar,
        region: userData.region || '',
        country: userData.country || '',
        ageVerification: userData.ageVerification || null
      } : null
    })

  } catch (error) {
    return serverError(error, 'Failed to check avatar')
  }
}

