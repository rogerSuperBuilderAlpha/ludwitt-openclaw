import { NextRequest, NextResponse } from 'next/server'
import {
  validateApiKey,
  hasPermission,
  logApiUsage,
} from '@/lib/api/apiKeyManager'
import type { ApiKey, ApiPermission, ApiResponse } from '@/lib/api/types'
import { API_ERRORS } from '@/lib/api/types'
import { checkRateLimit } from '@/lib/rate-limit/client'

/**
 * API authentication middleware
 */
export async function authenticateRequest(
  request: NextRequest,
  requiredPermissions: ApiPermission[] = []
): Promise<{ apiKey: ApiKey } | NextResponse> {
  // Get API key from header
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return createErrorResponse(
      API_ERRORS.INVALID_API_KEY,
      'Missing or invalid API key',
      401
    )
  }

  const apiKeyString = authHeader.replace('Bearer ', '')

  // Validate API key
  const apiKey = await validateApiKey(apiKeyString)
  if (!apiKey) {
    return createErrorResponse(
      API_ERRORS.INVALID_API_KEY,
      'Invalid or expired API key',
      401
    )
  }

  // Check permissions
  if (
    requiredPermissions.length > 0 &&
    !hasPermission(apiKey, requiredPermissions)
  ) {
    return createErrorResponse(
      API_ERRORS.INSUFFICIENT_PERMISSIONS,
      'Insufficient permissions for this endpoint',
      403
    )
  }

  // Rate limiting
  const rateLimitKey = `api:${apiKey.id}`
  const isAllowed = checkRateLimit(rateLimitKey, 'API_GENERAL')
  if (!isAllowed) {
    return createErrorResponse(
      API_ERRORS.RATE_LIMIT_EXCEEDED,
      'Rate limit exceeded. Please try again later.',
      429
    )
  }

  return { apiKey }
}

/**
 * Log API request after processing
 */
export async function logRequest(
  request: NextRequest,
  apiKeyId: string,
  statusCode: number
): Promise<void> {
  const endpoint = request.nextUrl.pathname
  const method = request.method
  const ipAddress =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
  const userAgent = request.headers.get('user-agent')

  await logApiUsage(
    apiKeyId,
    endpoint,
    method,
    statusCode,
    ipAddress || undefined,
    userAgent || undefined
  )
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  meta?: { page?: number; limit?: number; total?: number }
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta,
  }

  return NextResponse.json(response, { status })
}

/**
 * Create error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  status: number = 400
): NextResponse {
  const response: ApiResponse = {
    success: false,
    error: {
      code,
      message,
    },
  }

  return NextResponse.json(response, { status })
}

/**
 * Validate pagination parameters
 */
export function getPaginationParams(request: NextRequest): {
  page: number
  limit: number
} {
  const searchParams = request.nextUrl.searchParams
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') || '20'))
  )

  return { page, limit }
}
