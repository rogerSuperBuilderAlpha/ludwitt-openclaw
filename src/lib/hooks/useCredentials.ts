'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { DigitalCredential, CredentialType } from '@/lib/types/university'

export function useCredentials() {
  const { user } = useAuth()
  const [credentials, setCredentials] = useState<DigitalCredential[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isIssuing, setIsIssuing] = useState(false)

  const fetchCredentials = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/credentials', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load credentials')
        return
      }

      setCredentials(json.data.credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load credentials')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCredentials()
  }, [fetchCredentials])

  const issueCredential = useCallback(
    async (params: { type: CredentialType; pathId?: string }) => {
      if (!user) return

      setIsIssuing(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/credentials', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })
        const json = await response.json()

        if (!response.ok || !json.success) {
          setError(json.error || 'Failed to issue credential')
          return
        }

        // Refresh the credentials list
        await fetchCredentials()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to issue credential')
      } finally {
        setIsIssuing(false)
      }
    },
    [user, fetchCredentials]
  )

  return { credentials, loading, error, issueCredential, isIssuing }
}
