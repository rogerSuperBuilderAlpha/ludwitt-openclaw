'use client'

import { useState, useEffect } from 'react'
import { 
  UsersThree, 
  Circle,
  TrendUp,
  CurrencyCircleDollar,
} from '@phosphor-icons/react'
import { DevCard, DevSkeleton, DevBadge, DevEmptyState, DevProgress } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface TeamMember {
  id: string
  email: string
  displayName: string
  photoURL?: string
  role: 'admin' | 'developer'
  activeDocuments: number
  completedThisWeek: number
  completedAllTime: number
  totalRevenue: number
}

/**
 * Team Page - Team members and workloads
 */
export default function TeamPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      if (!user) return
      setLoading(true)
      
      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/team', {
          headers: { Authorization: `Bearer ${token}` },
        })
        
        if (!res.ok) throw new Error('Failed to fetch team')
        
        const json = await res.json()
        if (json.success) {
          setMembers(json.data.members)
        } else {
          throw new Error(json.error || 'Failed to fetch team')
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [user])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }

  // Calculate max for progress bars
  const maxActive = Math.max(...members.map(m => m.activeDocuments), 1)
  const maxCompleted = Math.max(...members.map(m => m.completedThisWeek), 1)

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3].map(i => <DevSkeleton key={i} height={120} style={{ marginBottom: 12 }} />)}
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
          Team
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          {members.length} team member{members.length !== 1 ? 's' : ''}
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

        {members.length === 0 ? (
          <DevEmptyState
            icon={<UsersThree size={32} />}
            title="No team members"
            description="Team members will appear here"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-4)' }}>
            {members.map(member => (
              <DevCard key={member.id} padding="md">
                <div style={{ display: 'flex', gap: 'var(--dev-space-4)' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: member.photoURL ? `url(${member.photoURL}) center/cover` : 'var(--dev-accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'var(--dev-font-bold)',
                    fontSize: 'var(--dev-text-lg)',
                    flexShrink: 0,
                  }}>
                    {!member.photoURL && member.displayName.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', marginBottom: 'var(--dev-space-1)' }}>
                      <span style={{ fontWeight: 'var(--dev-font-semibold)', fontSize: 'var(--dev-text-base)' }}>
                        {member.displayName}
                      </span>
                      <DevBadge 
                        variant={member.role === 'admin' ? 'primary' : 'default'} 
                        size="sm"
                      >
                        {member.role}
                      </DevBadge>
                    </div>
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', marginBottom: 'var(--dev-space-3)' }}>
                      {member.email}
                    </div>

                    {/* Workload bars */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dev-space-3)' }}>
                      <div>
                        <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', marginBottom: 4 }}>
                          Active ({member.activeDocuments})
                        </div>
                        <DevProgress 
                          value={(member.activeDocuments / maxActive) * 100} 
                          size="sm"
                          color="primary"
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', marginBottom: 4 }}>
                          This Week ({member.completedThisWeek})
                        </div>
                        <DevProgress 
                          value={(member.completedThisWeek / maxCompleted) * 100} 
                          size="sm"
                          color="success"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end',
                    gap: 'var(--dev-space-2)',
                    flexShrink: 0,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TrendUp size={14} style={{ color: 'var(--dev-text-muted)' }} />
                      <span style={{ fontSize: 'var(--dev-text-sm)' }}>
                        {member.completedAllTime} completed
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CurrencyCircleDollar size={14} style={{ color: 'var(--dev-accent-success)' }} />
                      <span style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-accent-success)', fontWeight: 'var(--dev-font-semibold)' }}>
                        {formatCurrency(member.totalRevenue)}
                      </span>
                    </div>
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
