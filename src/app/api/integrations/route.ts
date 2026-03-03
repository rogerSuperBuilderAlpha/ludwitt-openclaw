/**
 * Integrations API
 * 
 * GET - List all integrations for the current user
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getUserIntegrations } from '@/lib/integrations/service'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const integrations = await getUserIntegrations(userId)

    return successResponse({ integrations })
  } catch (error) {
    return serverError(error, 'Failed to fetch integrations')
  }
}
