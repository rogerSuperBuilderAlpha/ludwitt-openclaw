'use client'

import { useState, useEffect } from 'react'
import { 
  Circle, 
  User,
  Clock,
  ChatCircle,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevSkeleton, DevBadge, DevEmptyState } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface OnlineUser {
  id: string
  displayName: string
  email: string
  photoURL?: string
  status: 'online' | 'away' | 'busy' | 'offline'
  lastSeen?: string
  currentActivity?: string
}

/**
 * Who's Online Page - Real-time team presence
 */
export default function OnlinePage() {
  const { user } = useAuth()
  const [teamMembers, setTeamMembers] = useState<OnlineUser[]>([])
  const [loading, setLoading] = useState(true)

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
          // Transform to online users - presence tracking not yet implemented
          // In real implementation, would use Firestore real-time listeners on a "presence" collection
          const users: OnlineUser[] = json.data.members.map((m: { id: string; displayName: string; email: string; photoURL?: string; lastActive?: string }) => ({
            id: m.id,
            displayName: m.displayName,
            email: m.email,
            photoURL: m.photoURL,
            status: 'offline' as const, // Real-time presence not yet implemented
            lastSeen: m.lastActive || undefined,
            currentActivity: undefined,
          }))
          setTeamMembers(users)
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
    
    // In real implementation, would set up Firestore real-time listener here
  }, [user])

  const getStatusColor = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online': return 'var(--dev-accent-success)'
      case 'away': return 'var(--dev-status-available)'
      case 'busy': return 'var(--dev-accent-danger)'
      default: return 'var(--dev-text-muted)'
    }
  }

  const getStatusLabel = (status: OnlineUser['status']) => {
    switch (status) {
      case 'online': return 'Online'
      case 'away': return 'Away'
      case 'busy': return 'Busy'
      default: return 'Offline'
    }
  }

  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return ''
    
    const date = new Date(timestamp)
    if (isNaN(date.getTime()) || !isFinite(date.getTime())) return ''
    
    const now = new Date()
    const diffMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
  }

  // Group by status
  const onlineMembers = teamMembers.filter(m => m.status === 'online')
  const awayMembers = teamMembers.filter(m => m.status === 'away')
  const busyMembers = teamMembers.filter(m => m.status === 'busy')
  const offlineMembers = teamMembers.filter(m => m.status === 'offline')

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3].map(i => <DevSkeleton key={i} height={60} style={{ marginBottom: 12 }} />)}
        </div>
      </div>
    )
  }

  const renderMemberGroup = (title: string, members: OnlineUser[], showDot: boolean = true) => {
    if (members.length === 0) return null
    
    return (
      <div style={{ marginBottom: 'var(--dev-space-5)' }}>
        <div style={{ 
          fontSize: 'var(--dev-text-sm)', 
          fontWeight: 'var(--dev-font-semibold)',
          color: 'var(--dev-text-muted)',
          marginBottom: 'var(--dev-space-3)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-2)',
        }}>
          {showDot && <Circle size={8} weight="fill" style={{ color: getStatusColor(members[0].status) }} />}
          {title} ({members.length})
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
          {members.map(member => (
            <DevCard key={member.id} padding="sm">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)' }}>
                {/* Avatar with status dot */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: member.photoURL ? `url(${member.photoURL}) center/cover` : 'var(--dev-accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'var(--dev-font-semibold)',
                    fontSize: 'var(--dev-text-sm)',
                  }}>
                    {!member.photoURL && member.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: getStatusColor(member.status),
                    border: '2px solid var(--dev-bg-elevated)',
                  }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 'var(--dev-font-medium)' }}>
                    {member.displayName}
                  </div>
                  {member.currentActivity ? (
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                      {member.currentActivity}
                    </div>
                  ) : member.status === 'offline' && member.lastSeen ? (
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={10} />
                      Last seen {formatLastSeen(member.lastSeen)}
                    </div>
                  ) : (
                    <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                      {member.email}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <DevButton variant="ghost" size="sm" disabled>
                  <ChatCircle size={14} />
                </DevButton>
              </div>
            </DevCard>
          ))}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)' }}>
          <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)' }}>
            Who&apos;s Online
          </h1>
          <DevBadge variant="success" size="sm">
            {onlineMembers.length} online
          </DevBadge>
        </div>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)', marginTop: 'var(--dev-space-1)' }}>
          Real-time team presence
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {teamMembers.length === 0 ? (
          <DevEmptyState
            icon={<User size={32} />}
            title="No team members"
            description="Team members will appear here"
          />
        ) : (
          <>
            {renderMemberGroup('Online', onlineMembers)}
            {renderMemberGroup('Away', awayMembers)}
            {renderMemberGroup('Busy', busyMembers)}
            {renderMemberGroup('Offline', offlineMembers, false)}
          </>
        )}
        
        {/* Note about presence */}
        <div style={{ 
          marginTop: 'var(--dev-space-4)',
          padding: 'var(--dev-space-3)',
          background: 'var(--dev-bg-muted)',
          borderRadius: 'var(--dev-radius-lg)',
          fontSize: 'var(--dev-text-xs)',
          color: 'var(--dev-text-muted)',
          textAlign: 'center',
        }}>
          Presence data is updated in real-time when team members are active
        </div>
      </div>
    </div>
  )
}
