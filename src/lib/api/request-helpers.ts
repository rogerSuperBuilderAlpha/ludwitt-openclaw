/**
 * Request Helper Utilities
 * 
 * Common request parsing and query parameter extraction
 */

import { NextRequest } from 'next/server'

/**
 * Get query parameter as string
 */
export function getQueryParam(request: NextRequest, key: string): string | null {
  const { searchParams } = new URL(request.url)
  return searchParams.get(key)
}

/**
 * Get query parameter as number
 */
export function getQueryParamAsNumber(request: NextRequest, key: string, defaultValue?: number): number | undefined {
  const value = getQueryParam(request, key)
  if (!value) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Get query parameter as boolean
 */
export function getQueryParamAsBoolean(request: NextRequest, key: string, defaultValue: boolean = false): boolean {
  const value = getQueryParam(request, key)
  if (!value) return defaultValue
  return value === 'true'
}

/**
 * Get query parameter as array (comma-separated)
 */
export function getQueryParamAsArray(request: NextRequest, key: string): string[] {
  const value = getQueryParam(request, key)
  if (!value) return []
  return value.split(',').filter(Boolean)
}

/**
 * Parse request body with error handling
 */
export async function parseRequestBody<T = any>(request: NextRequest): Promise<T> {
  try {
    return await request.json()
  } catch (error) {
    throw new Error('Invalid JSON in request body')
  }
}

