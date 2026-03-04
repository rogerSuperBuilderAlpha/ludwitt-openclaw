/**
 * Standardized Error Response Utilities
 *
 * Provides consistent error response formats across API routes
 */

import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'

const VERSION_PAYLOAD = {
  apiVersion: LUDWITT_API_VERSION,
  updateInstructions: UPDATE_INSTRUCTIONS,
}

/**
 * Return a standardized unauthorized error response
 */
export function unauthorizedError(
  message: string = 'Unauthorized'
): NextResponse {
  return NextResponse.json(
    { success: false, error: message, ...VERSION_PAYLOAD },
    { status: 401 }
  )
}

/**
 * Return a standardized bad request error response
 */
export function badRequestError(message: string): NextResponse {
  return NextResponse.json(
    { success: false, error: message, ...VERSION_PAYLOAD },
    { status: 400 }
  )
}

/**
 * Return a standardized not found error response
 */
export function notFoundError(message: string): NextResponse {
  return NextResponse.json(
    { success: false, error: message, ...VERSION_PAYLOAD },
    { status: 404 }
  )
}

/**
 * Return a standardized forbidden error response
 */
export function forbiddenError(message: string = 'Forbidden'): NextResponse {
  return NextResponse.json(
    { success: false, error: message, ...VERSION_PAYLOAD },
    { status: 403 }
  )
}

/**
 * Return a standardized server error response
 *
 * SECURITY: Never expose raw error messages to clients as they may contain
 * sensitive implementation details (file paths, database structure, etc.)
 * Always use the defaultMessage for client responses, log the actual error server-side.
 */
export function serverError(
  error: unknown,
  defaultMessage: string = 'Internal server error'
): NextResponse {
  // Log the full error server-side for debugging
  logger.error('ServerError', defaultMessage, { error })

  // Always return the generic defaultMessage to clients to prevent info leakage
  return NextResponse.json(
    { success: false, error: defaultMessage, ...VERSION_PAYLOAD },
    { status: 500 }
  )
}

/**
 * Return a standardized service unavailable error response
 */
export function serviceUnavailableError(
  message: string = 'Service temporarily unavailable'
): NextResponse {
  return NextResponse.json(
    { success: false, error: message, ...VERSION_PAYLOAD },
    { status: 503 }
  )
}
