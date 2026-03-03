'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { ContributionPR, ContributionBadge } from '@/lib/types/university'

interface ContributionsData {
  connected: boolean
  username: string | null
  avatarUrl: string | null
  prs: ContributionPR[]
  badges: ContributionBadge[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useContributions(): ContributionsData {
  const { user } = useAuth()
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [prs, setPrs] = useState<ContributionPR[]>([])
  const [badges, setBadges] = useState<ContributionBadge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContributions = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/contributions', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load contributions')
        return
      }

      setConnected(json.data.connected)
      setUsername(json.data.username)
      setAvatarUrl(json.data.avatarUrl)
      setPrs(json.data.prs)
      setBadges(json.data.badges)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contributions')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchContributions()
  }, [fetchContributions])

  return { connected, username, avatarUrl, prs, badges, loading, error, refetch: fetchContributions }
}
