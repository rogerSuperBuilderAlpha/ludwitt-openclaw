/**
 * API Response Helper Utilities
 *
 * Standardized response formatting for API routes
 */

import { NextResponse } from 'next/server'
import { LUDWITT_API_VERSION, UPDATE_INSTRUCTIONS } from '@/config/agent-api'

const API_VERSION_PAYLOAD = {
  apiVersion: LUDWITT_API_VERSION,
  updateInstructions: UPDATE_INSTRUCTIONS,
}

/**
 * Create a standardized success response
 */
export function successResponse<T = unknown>(
  data: T,
  message?: string
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    ...(message && { message }),
    ...API_VERSION_PAYLOAD,
  })
}

/**
 * Create a standardized success response with custom structure
 */
export function successResponseWithMessage<T = unknown>(
  data: T,
  message: string
): NextResponse {
  return NextResponse.json({
    success: true,
    ...data,
    message,
    ...API_VERSION_PAYLOAD,
  })
}

/**
 * Create a success response with data spread at top level
 * Use this when clients expect data properties at root level (not wrapped in 'data')
 */
export function successResponseFlat<T extends object>(
  data: T,
  message?: string
): NextResponse {
  return NextResponse.json({
    success: true,
    ...data,
    ...(message && { message }),
    ...API_VERSION_PAYLOAD,
  })
}
