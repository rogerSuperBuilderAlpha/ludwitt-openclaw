'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { PublicPortfolio, PortfolioSettings } from '@/lib/types/university'

export function usePortfolio(): {
  portfolio: PublicPortfolio | null
  loading: boolean
  error: string | null
  updateSettings: (settings: Partial<PortfolioSettings>) => Promise<void>
  isUpdating: boolean
} {
  const { user } = useAuth()
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchPortfolio = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()

      if (!response.ok || !json.success) {
        setError(json.error || 'Failed to load portfolio')
        return
      }

      setPortfolio(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  const updateSettings = useCallback(
    async (settings: Partial<PortfolioSettings>) => {
      if (!user) return

      setIsUpdating(true)
      setError(null)

      try {
        const token = await user.getIdToken()

        // Merge with existing settings so we always send a full payload
        const merged: PortfolioSettings = {
          isPublic: false,
          username: '',
          showPeerReviews: true,
          showSkills: true,
          showDegreeProgress: true,
          ...portfolio?.settings,
          ...settings,
        }

        const response = await fetch('/api/university/portfolio', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(merged),
        })
        const json = await response.json()

        if (!response.ok || !json.success) {
          setError(json.error || 'Failed to update settings')
          return
        }

        // Refresh portfolio data after settings change
        await fetchPortfolio()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update settings')
      } finally {
        setIsUpdating(false)
      }
    },
    [user, portfolio, fetchPortfolio]
  )

  return { portfolio, loading, error, updateSettings, isUpdating }
}

export function usePublicPortfolio(username: string): {
  portfolio: PublicPortfolio | null
  loading: boolean
  error: string | null
} {
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) return

    let cancelled = false

    const fetchPublicPortfolio = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/university/portfolio/public/${encodeURIComponent(username)}`)
        const json = await response.json()

        if (cancelled) return

        if (!response.ok || !json.success) {
          setError(json.error || 'Portfolio not found')
          return
        }

        setPortfolio(json.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load portfolio')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPublicPortfolio()

    return () => {
      cancelled = true
    }
  }, [username])

  return { portfolio, loading, error }
}
