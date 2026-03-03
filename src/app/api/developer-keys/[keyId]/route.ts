/**
 * Individual API Key Management
 * 
 * GET - Get a single key
 * PATCH - Revoke a key
 * DELETE - Delete a key permanently
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { getApiKey, revokeApiKey, deleteApiKey } from '@/lib/api-keys/service'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ keyId: string }>
}

/**
 * GET /api/developer-keys/[keyId]
 * Get a single API key
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { keyId } = await params

    const key = await getApiKey(keyId, userId)
    
    if (!key) {
      return NextResponse.json(
        { success: false, error: 'API key not found' },
        { status: 404 }
      )
    }
    
    return successResponse({ key })
  } catch (error) {
    return serverError(error, 'Failed to get API key')
  }
}

/**
 * PATCH /api/developer-keys/[keyId]
 * Revoke an API key (soft delete - key still exists but can't be used)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { keyId } = await params

    // Get revoke reason from body
    let reason: string | undefined
    try {
      const body = await request.json()
      reason = body.reason
    } catch {
      // No body, that's fine
    }

    const success = await revokeApiKey(keyId, userId, reason)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'API key not found or already revoked' },
        { status: 404 }
      )
    }
    
    return successResponse({ message: 'API key revoked successfully' })
  } catch (error) {
    return serverError(error, 'Failed to revoke API key')
  }
}

/**
 * DELETE /api/developer-keys/[keyId]
 * Delete an API key permanently
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const { keyId } = await params

    const success = await deleteApiKey(keyId, userId)
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'API key not found' },
        { status: 404 }
      )
    }
    
    return successResponse({ message: 'API key deleted successfully' })
  } catch (error) {
    return serverError(error, 'Failed to delete API key')
  }
}
