/**
 * GitHub Disconnect
 * 
 * POST - Disconnect GitHub integration
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { disconnectGitHub } from '@/lib/integrations/providers/github'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const disconnected = await disconnectGitHub(userId)

    if (!disconnected) {
      return NextResponse.json(
        { success: false, error: 'Integration not found' },
        { status: 404 }
      )
    }

    return successResponse({ disconnected: true })
  } catch (error) {
    return serverError(error, 'Failed to disconnect GitHub')
  }
}
