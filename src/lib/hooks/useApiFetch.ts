/**
 * useApiFetch Hook
 * 
 * Provides a standardized way to make authenticated API calls from client components
 * Handles token retrieval, error handling, and response parsing
 */

import { useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'

interface ApiFetchOptions extends RequestInit {
  requireAuth?: boolean
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export function useApiFetch() {
  const { user } = useAuth()

  const fetchApi = useCallback(async <T = any>(
    endpoint: string,
    options: ApiFetchOptions = {}
  ): Promise<T> => {
    const { requireAuth = true, ...fetchOptions } = options

    if (requireAuth && !user) {
      throw new Error('Authentication required')
    }

    // Get auth token if user is available
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      ...fetchOptions.headers,
    }

    if (user) {
      try {
        const token = await user.getIdToken()
        headers = {
          ...headers,
          'Authorization': `Bearer ${token}`,
        }
      } catch (error) {
        throw new Error('Failed to get authentication token')
      }
    }

    // Make the request (disable caching)
    const response = await fetch(endpoint, {
      ...fetchOptions,
      headers,
      cache: 'no-store',
    })

    // Parse response
    let result: ApiResponse<T>
    try {
      result = await response.json()
    } catch (error) {
      throw new Error('Invalid response format')
    }

    // Check for errors
    if (!response.ok || !result.success) {
      throw new Error(result.error || `Request failed with status ${response.status}`)
    }

    // Return data
    return result.data as T
  }, [user])

  return fetchApi
}

