/**
 * Slack OAuth Authorization
 * 
 * GET - Get the Slack authorization URL
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getSlackAuthUrl } from '@/lib/integrations/providers/slack'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const authUrl = await getSlackAuthUrl(userId)

    return successResponse({ authUrl })
  } catch (error) {
    return serverError(error, 'Failed to generate Slack auth URL')
  }
}
