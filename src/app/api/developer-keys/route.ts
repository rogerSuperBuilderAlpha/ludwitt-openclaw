/**
 * API Keys Management Endpoints
 * 
 * POST - Create a new API key
 * GET - List all API keys for the authenticated user
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { createApiKey, listApiKeys, getApiKeyStats } from '@/lib/api-keys/service'
import { ApiKeyCreateRequest, ApiKeyType, API_SCOPES } from '@/lib/types/api-keys'

export const dynamic = 'force-dynamic'

/**
 * POST /api/developer-keys
 * Create a new API key
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    const userEmail = authResult.decodedToken.email || ''

    // Parse request body
    const body: ApiKeyCreateRequest = await request.json()
    
    // Validate name
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Key name is required' },
        { status: 400 }
      )
    }
    
    if (body.name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Key name must be 100 characters or less' },
        { status: 400 }
      )
    }
    
    // Validate type
    if (!body.type || !['live', 'test'].includes(body.type)) {
      return NextResponse.json(
        { success: false, error: 'Key type must be "live" or "test"' },
        { status: 400 }
      )
    }
    
    // Validate expiration
    if (body.expiresInDays !== undefined) {
      if (typeof body.expiresInDays !== 'number' || body.expiresInDays < 1 || body.expiresInDays > 365) {
        return NextResponse.json(
          { success: false, error: 'Expiration must be between 1 and 365 days' },
          { status: 400 }
        )
      }
    }
    
    // Validate scopes
    const validScopes = Object.keys(API_SCOPES)
    if (body.scopes) {
      if (!Array.isArray(body.scopes)) {
        return NextResponse.json(
          { success: false, error: 'Scopes must be an array' },
          { status: 400 }
        )
      }
      
      for (const scope of body.scopes) {
        if (!validScopes.includes(scope)) {
          return NextResponse.json(
            { success: false, error: `Invalid scope: ${scope}` },
            { status: 400 }
          )
        }
      }
    }
    
    // Create the key
    const result = await createApiKey(
      userId,
      userEmail,
      body.name.trim(),
      body.type as ApiKeyType,
      body.expiresInDays,
      body.scopes || []
    )
    
    return successResponse(result)
  } catch (error) {
    return serverError(error, 'Failed to create API key')
  }
}

/**
 * GET /api/developer-keys
 * List all API keys for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Check if stats are requested
    const url = new URL(request.url)
    const includeStats = url.searchParams.get('stats') === 'true'
    
    // Get keys
    const keys = await listApiKeys(userId)
    
    // Optionally include stats
    if (includeStats) {
      const stats = await getApiKeyStats(userId)
      return successResponse({ keys, stats })
    }
    
    return successResponse({ keys })
  } catch (error) {
    return serverError(error, 'Failed to list API keys')
  }
}
