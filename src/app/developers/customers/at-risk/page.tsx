'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Warning, 
  Clock,
  CurrencyCircleDollar,
  EnvelopeSimple,
  FileText,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevSkeleton, DevBadge, DevEmptyState } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import Link from 'next/link'

interface Customer {
  id: string
  email: string
  displayName: string
  photoURL?: string
  totalDocuments: number
  activeDocuments: number
  creditBalanceCents: number
  lastActivityAt: string | null
  hasOverdueDoc: boolean
  lowCreditBalance: boolean
  daysSinceActivity: number | null
}

type RiskLevel = 'critical' | 'warning' | 'watch'

interface AtRiskCustomer extends Customer {
  riskLevel: RiskLevel
  riskReasons: string[]
}

/**
 * At-Risk Customers Page - Customers needing attention
 */
export default function AtRiskCustomersPage() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [user])

  // Filter and categorize at-risk customers
  const atRiskCustomers = useMemo(() => {
    const result: AtRiskCustomer[] = []
    
    customers.forEach(customer => {
      const riskReasons: string[] = []
      let riskLevel: RiskLevel = 'watch'
      
      // Check for overdue documents (critical)
      if (customer.hasOverdueDoc) {
        riskReasons.push('Has overdue document')
        riskLevel = 'critical'
      }
      
      // Check for low credit balance
      if (customer.lowCreditBalance) {
        riskReasons.push('Low credit balance')
        if (riskLevel !== 'critical') riskLevel = 'warning'
      }
      
      // Check for inactivity (14+ days)
      if (customer.daysSinceActivity !== null && customer.daysSinceActivity >= 14) {
        if (customer.daysSinceActivity >= 30) {
          riskReasons.push(`No activity in ${customer.daysSinceActivity} days`)
          if (riskLevel === 'watch') riskLevel = 'warning'
        } else {
          riskReasons.push(`Inactive for ${customer.daysSinceActivity} days`)
        }
      }
      
      // Only include if there are risk reasons
      if (riskReasons.length > 0) {
        result.push({
          ...customer,
          riskLevel,
          riskReasons,
        })
      }
    })
    
    // Sort by risk level (critical first)
    const levelOrder: Record<RiskLevel, number> = { critical: 0, warning: 1, watch: 2 }
    result.sort((a, b) => levelOrder[a.riskLevel] - levelOrder[b.riskLevel])
    
    return result
  }, [customers])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'critical': return 'var(--dev-accent-danger)'
      case 'warning': return 'var(--dev-status-available)'
      case 'watch': return 'var(--dev-text-muted)'
    }
  }

  const getRiskBadgeVariant = (level: RiskLevel): 'danger' | 'warning' | 'default' => {
    switch (level) {
      case 'critical': return 'danger'
      case 'warning': return 'warning'
      case 'watch': return 'default'
    }
  }

  // Count by risk level
  const riskCounts = useMemo(() => {
    return atRiskCustomers.reduce(
      (acc, c) => {
        acc[c.riskLevel]++
        return acc
      },
      { critical: 0, warning: 0, watch: 0 }
    )
  }, [atRiskCustomers])

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3, 4].map(i => <DevSkeleton key={i} height={100} style={{ marginBottom: 12 }} />)}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
      }}>
        <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
          At-Risk Customers
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Customers needing attention
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {error && (
          <div style={{ 
            padding: 'var(--dev-space-4)',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: 'var(--dev-radius-lg)',
            color: 'var(--dev-accent-danger)',
            marginBottom: 'var(--dev-space-4)',
          }}>
            {error}
          </div>
        )}

        {/* Summary cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 'var(--dev-space-4)',
          marginBottom: 'var(--dev-space-5)',
        }}>
          <DevCard padding="md" style={{ borderLeft: `4px solid var(--dev-accent-danger)` }}>
            <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>Critical</div>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)', color: 'var(--dev-accent-danger)' }}>
              {riskCounts.critical}
            </div>
          </DevCard>
          <DevCard padding="md" style={{ borderLeft: `4px solid var(--dev-status-available)` }}>
            <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>Warning</div>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)', color: 'var(--dev-status-available)' }}>
              {riskCounts.warning}
            </div>
          </DevCard>
          <DevCard padding="md" style={{ borderLeft: `4px solid var(--dev-text-muted)` }}>
            <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>Watch</div>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)' }}>
              {riskCounts.watch}
            </div>
          </DevCard>
        </div>

        {atRiskCustomers.length === 0 ? (
          <DevEmptyState
            icon={<Warning size={32} />}
            title="No at-risk customers"
            description="All customers are in good standing! 🎉"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-3)' }}>
            {atRiskCustomers.map(customer => (
              <DevCard 
                key={customer.id} 
                padding="md"
                style={{
                  borderLeft: `4px solid ${getRiskColor(customer.riskLevel)}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--dev-space-4)' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: customer.photoURL ? `url(${customer.photoURL}) center/cover` : 'var(--dev-accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'var(--dev-font-semibold)',
                    fontSize: 'var(--dev-text-sm)',
                    flexShrink: 0,
                  }}>
                    {!customer.photoURL && customer.displayName.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', marginBottom: 'var(--dev-space-1)' }}>
                      <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>
                        {customer.displayName}
                      </span>
                      <DevBadge variant={getRiskBadgeVariant(customer.riskLevel)} size="sm">
                        {customer.riskLevel.toUpperCase()}
                      </DevBadge>
                    </div>
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', marginBottom: 'var(--dev-space-2)' }}>
                      {customer.email}
                    </div>
                    
                    {/* Risk reasons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dev-space-2)' }}>
                      {customer.riskReasons.map((reason, i) => (
                        <div 
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 'var(--dev-text-xs)',
                            padding: '2px 8px',
                            background: 'var(--dev-bg-muted)',
                            borderRadius: 'var(--dev-radius-sm)',
                            color: 'var(--dev-text-secondary)',
                          }}
                        >
                          {reason.includes('overdue') && <Clock size={10} />}
                          {reason.includes('credit') && <CurrencyCircleDollar size={10} />}
                          {reason.includes('activity') && <Warning size={10} />}
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 'var(--dev-space-2)', flexShrink: 0 }}>
                    <Link href={`/customers/${customer.id}`}>
                      <DevButton variant="secondary" size="sm">
                        <FileText size={14} style={{ marginRight: 4 }} />
                        View
                      </DevButton>
                    </Link>
                    <DevButton variant="ghost" size="sm" disabled>
                      <EnvelopeSimple size={14} style={{ marginRight: 4 }} />
                      Nudge
                    </DevButton>
                  </div>
                </div>
              </DevCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
