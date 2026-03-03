/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Trophy,
  Medal,
  TrendUp,
  TrendDown,
  CaretDown,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface Customer {
  id: string
  email: string
  displayName: string
  photoURL?: string
  totalDocuments: number
  completedDocuments: number
  totalSpentCents: number
  lastActivityAt: string | null
  createdAt: string | null
}

type Period = 'all' | 'month' | 'week'

/**
 * Top Customers Page - High-value customer rankings
 */
export default function TopCustomersPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<Period>('all')
  const [showPeriodMenu, setShowPeriodMenu] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/customers', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch customers')

        const json = await res.json()
        if (json.success) {
          setCustomers(json.data.customers)
        } else {
          throw new Error(json.error || 'Failed to fetch customers')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [user])

  // Sort by revenue and take top 10
  const topCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.totalSpentCents - a.totalSpentCents)
      .slice(0, 10)
  }, [customers])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700' // Gold
      case 2:
        return '#C0C0C0' // Silver
      case 3:
        return '#CD7F32' // Bronze
      default:
        return 'var(--dev-text-muted)'
    }
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return null
    }
  }

  const periodOptions: { key: Period; label: string }[] = [
    { key: 'all', label: 'All Time' },
    { key: 'month', label: 'This Month' },
    { key: 'week', label: 'This Week' },
  ]

  // Calculate total revenue from top customers
  const totalTopRevenue = topCustomers.reduce(
    (sum, c) => sum + c.totalSpentCents,
    0
  )

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 'var(--dev-space-4) var(--dev-space-5)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <DevSkeleton key={i} height={80} style={{ marginBottom: 12 }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 'var(--dev-text-xl)',
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-1)',
            }}
          >
            Top Customers
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Highest revenue customers ranked
          </p>
        </div>

        {/* Period Selector */}
        <div style={{ position: 'relative' }}>
          <DevButton
            variant="secondary"
            size="sm"
            onClick={() => setShowPeriodMenu(!showPeriodMenu)}
          >
            {periodOptions.find((o) => o.key === period)?.label}
            <CaretDown size={12} style={{ marginLeft: 4 }} />
          </DevButton>
          {showPeriodMenu && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={() => setShowPeriodMenu(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 4,
                  background: 'var(--dev-bg-elevated)',
                  border: '1px solid var(--dev-border-default)',
                  borderRadius: 'var(--dev-radius-lg)',
                  boxShadow: 'var(--dev-shadow-lg)',
                  zIndex: 50,
                  overflow: 'hidden',
                  minWidth: 120,
                }}
              >
                {periodOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setPeriod(option.key)
                      setShowPeriodMenu(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--dev-space-2) var(--dev-space-3)',
                      textAlign: 'left',
                      background:
                        period === option.key
                          ? 'var(--dev-bg-hover)'
                          : 'transparent',
                      border: 'none',
                      color: 'var(--dev-text-primary)',
                      fontSize: 'var(--dev-text-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {error && (
          <div
            style={{
              padding: 'var(--dev-space-4)',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 'var(--dev-radius-lg)',
              color: 'var(--dev-accent-danger)',
              marginBottom: 'var(--dev-space-4)',
            }}
          >
            {error}
          </div>
        )}

        {/* Summary */}
        <DevCard padding="md" style={{ marginBottom: 'var(--dev-space-5)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-4)',
            }}
          >
            <Trophy size={32} style={{ color: '#FFD700' }} />
            <div>
              <div
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  color: 'var(--dev-text-muted)',
                }}
              >
                Top 10 Customer Revenue
              </div>
              <div
                style={{
                  fontSize: 'var(--dev-text-2xl)',
                  fontWeight: 'var(--dev-font-bold)',
                  color: 'var(--dev-accent-success)',
                }}
              >
                {formatCurrency(totalTopRevenue)}
              </div>
            </div>
          </div>
        </DevCard>

        {topCustomers.length === 0 ? (
          <DevEmptyState
            icon={<Trophy size={32} />}
            title="No customers yet"
            description="Customer rankings will appear once there is revenue data"
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--dev-space-3)',
            }}
          >
            {topCustomers.map((customer, index) => {
              const rank = index + 1
              const emoji = getRankEmoji(rank)

              return (
                <DevCard
                  key={customer.id}
                  padding="md"
                  style={{
                    border:
                      rank <= 3 ? `2px solid ${getRankColor(rank)}` : undefined,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--dev-space-4)',
                    }}
                  >
                    {/* Rank */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background:
                          rank <= 3
                            ? `${getRankColor(rank)}20`
                            : 'var(--dev-bg-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'var(--dev-font-bold)',
                        fontSize: emoji
                          ? 'var(--dev-text-xl)'
                          : 'var(--dev-text-lg)',
                        color: getRankColor(rank),
                      }}
                    >
                      {emoji || `#${rank}`}
                    </div>

                    {/* Customer info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--dev-space-2)',
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: customer.photoURL
                              ? `url(${customer.photoURL}) center/cover`
                              : 'var(--dev-accent-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'var(--dev-font-semibold)',
                            fontSize: 'var(--dev-text-xs)',
                          }}
                        >
                          {!customer.photoURL &&
                            customer.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div
                            style={{ fontWeight: 'var(--dev-font-semibold)' }}
                          >
                            {customer.displayName}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--dev-text-xs)',
                              color: 'var(--dev-text-muted)',
                            }}
                          >
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 'var(--dev-text-xl)',
                          fontWeight: 'var(--dev-font-bold)',
                          color: 'var(--dev-accent-success)',
                        }}
                      >
                        {formatCurrency(customer.totalSpentCents)}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--dev-text-xs)',
                          color: 'var(--dev-text-muted)',
                        }}
                      >
                        {customer.completedDocuments} documents completed
                      </div>
                    </div>
                  </div>
                </DevCard>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
