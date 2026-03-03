/**
 * Google Drive OAuth Authorization
 * 
 * GET - Get the Google authorization URL
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getGoogleDriveAuthUrl } from '@/lib/integrations/providers/google-drive'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const authUrl = await getGoogleDriveAuthUrl(userId)

    return successResponse({ authUrl })
  } catch (error) {
    return serverError(error, 'Failed to generate Google auth URL')
  }
}
