/**
 * useApiQuery Hook
 * 
 * A data-fetching hook that handles loading, error states, and authentication.
 * Simplifies the common pattern of fetching data from authenticated API endpoints.
 * 
 * Usage:
 * const { data, loading, error, refetch } = useApiQuery<MyDataType>('/api/my-endpoint')
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

interface UseApiQueryOptions {
  /** Skip the query (useful for conditional fetching) */
  skip?: boolean
  /** Dependencies that trigger a refetch when changed */
  deps?: any[]
  /** Initial data before the query completes */
  initialData?: any
  /** Require authentication (default: true) */
  requireAuth?: boolean
}

interface UseApiQueryResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApiQuery<T = any>(
  endpoint: string,
  options: UseApiQueryOptions = {}
): UseApiQueryResult<T> {
  const { skip = false, deps = [], initialData = null, requireAuth = true } = options
  const { user } = useAuth()

  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(!skip)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (skip) return
    if (requireAuth && !user) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }

      if (user) {
        const token = await user.getIdToken()
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(endpoint, { headers })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Request failed with status ${response.status}`)
      }

      // Handle both { data: T } and direct T responses
      setData(result.data !== undefined ? result.data : result)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data'
      setError(message)
      logger.error('Useapiquery', `Error fetching ${endpoint}`, { error: message })
    } finally {
      setLoading(false)
    }
  }, [endpoint, user, skip, requireAuth])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps])

  return { data, loading, error, refetch: fetchData }
}

/**
 * useApiMutation Hook
 * 
 * A mutation hook for POST/PUT/DELETE operations with loading and error handling.
 * 
 * Usage:
 * const { mutate, loading, error } = useApiMutation<ResponseType>('/api/my-endpoint')
 * await mutate({ myData: 'value' })
 */

interface UseApiMutationOptions {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

interface UseApiMutationResult<T> {
  mutate: (body?: any) => Promise<T | null>
  loading: boolean
  error: string | null
  reset: () => void
}

export function useApiMutation<T = any>(
  endpoint: string,
  options: UseApiMutationOptions = {}
): UseApiMutationResult<T> {
  const { method = 'POST', onSuccess, onError } = options
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(async (body?: any): Promise<T | null> => {
    if (!user) {
      const err = 'Authentication required'
      setError(err)
      onError?.(err)
      return null
    }

    try {
      setLoading(true)
      setError(null)

      const token = await user.getIdToken()
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `Request failed with status ${response.status}`)
      }

      const data = result.data !== undefined ? result.data : result
      onSuccess?.(data)
      return data as T
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Request failed'
      setError(message)
      onError?.(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [endpoint, method, user, onSuccess, onError])

  const reset = useCallback(() => {
    setError(null)
  }, [])

  return { mutate, loading, error, reset }
}
