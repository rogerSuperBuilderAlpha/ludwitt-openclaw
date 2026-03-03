'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Calendar, 
  Clock,
  Warning,
  FileText,
  ArrowRight,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevSkeleton, DevBadge, DevEmptyState } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import Link from 'next/link'

interface DeadlineDoc {
  id: string
  title: string
  dueDate: Date
  customerId: string
  customerName: string
  status: string
  isOverdue: boolean
  daysUntil: number
}

/**
 * Deadlines Page - Calendar view of due dates
 */
export default function DeadlinesPage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({ 
    userId: user?.uid || null, 
    isAdmin: isAdminView 
  })

  // Get documents with deadlines
  const deadlineDocs = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    
    const docs: DeadlineDoc[] = []
    
    submissions.forEach(s => {
      // Skip completed/archived
      if (s.status === 'completed' || s.status === 'archived') return
      
      // Check for due date
      const dueDateRaw = s.dueDate
      if (!dueDateRaw) return
      
      let dueDate: Date
      if (typeof dueDateRaw === 'object' && 'seconds' in dueDateRaw) {
        dueDate = new Date(dueDateRaw.seconds * 1000)
      } else if (typeof dueDateRaw === 'string') {
        dueDate = new Date(dueDateRaw)
      } else {
        return
      }
      
      const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      
      docs.push({
        id: s.id,
        title: s.googleDocTitle || 'Untitled',
        dueDate,
        customerId: s.customerId || '',
        customerName: s.customerDisplayName || 'Unknown',
        status: s.status || 'pending',
        isOverdue: daysUntil < 0,
        daysUntil,
      })
    })
    
    // Sort by due date
    docs.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    
    return docs
  }, [submissions])

  // Group by timeframe
  const groupedDocs = useMemo(() => {
    const groups: Record<string, DeadlineDoc[]> = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      nextWeek: [],
      later: [],
    }
    
    deadlineDocs.forEach(doc => {
      if (doc.daysUntil < 0) {
        groups.overdue.push(doc)
      } else if (doc.daysUntil === 0) {
        groups.today.push(doc)
      } else if (doc.daysUntil === 1) {
        groups.tomorrow.push(doc)
      } else if (doc.daysUntil <= 7) {
        groups.thisWeek.push(doc)
      } else if (doc.daysUntil <= 14) {
        groups.nextWeek.push(doc)
      } else {
        groups.later.push(doc)
      }
    })
    
    return groups
  }, [deadlineDocs])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
    }).format(date)
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil < 0) return 'var(--dev-accent-danger)'
    if (daysUntil === 0) return 'var(--dev-accent-danger)'
    if (daysUntil === 1) return 'var(--dev-status-available)'
    if (daysUntil <= 3) return 'var(--dev-status-available)'
    return 'var(--dev-text-muted)'
  }

  const groupLabels: Record<string, { label: string; color: string }> = {
    overdue: { label: '⚠️ Overdue', color: 'var(--dev-accent-danger)' },
    today: { label: '🔥 Due Today', color: 'var(--dev-accent-danger)' },
    tomorrow: { label: '⏰ Due Tomorrow', color: 'var(--dev-status-available)' },
    thisWeek: { label: '📅 This Week', color: 'var(--dev-text-secondary)' },
    nextWeek: { label: '📆 Next Week', color: 'var(--dev-text-muted)' },
    later: { label: '📋 Later', color: 'var(--dev-text-muted)' },
  }

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--dev-space-4) var(--dev-space-5)', borderBottom: '1px solid var(--dev-border-subtle)' }}>
          <DevSkeleton width={200} height={32} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3].map(i => <DevSkeleton key={i} height={100} style={{ marginBottom: 12 }} />)}
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
          Deadlines
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          {deadlineDocs.length} document{deadlineDocs.length !== 1 ? 's' : ''} with deadlines
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Summary Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: 'var(--dev-space-3)',
          marginBottom: 'var(--dev-space-5)',
        }}>
          <DevCard padding="sm" style={{ borderLeft: `4px solid var(--dev-accent-danger)` }}>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)', color: 'var(--dev-accent-danger)' }}>
              {groupedDocs.overdue.length + groupedDocs.today.length}
            </div>
            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>Urgent</div>
          </DevCard>
          <DevCard padding="sm" style={{ borderLeft: `4px solid var(--dev-status-available)` }}>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)', color: 'var(--dev-status-available)' }}>
              {groupedDocs.tomorrow.length + groupedDocs.thisWeek.length}
            </div>
            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>This Week</div>
          </DevCard>
          <DevCard padding="sm" style={{ borderLeft: `4px solid var(--dev-text-muted)` }}>
            <div style={{ fontSize: 'var(--dev-text-2xl)', fontWeight: 'var(--dev-font-bold)' }}>
              {groupedDocs.nextWeek.length + groupedDocs.later.length}
            </div>
            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>Later</div>
          </DevCard>
        </div>

        {deadlineDocs.length === 0 ? (
          <DevEmptyState
            icon={<Calendar size={32} />}
            title="No deadlines set"
            description="Documents with due dates will appear here"
          />
        ) : (
          Object.entries(groupedDocs)
            .filter(([, docs]) => docs.length > 0)
            .map(([groupKey, docs]) => {
              const { label, color } = groupLabels[groupKey]
              
              return (
                <div key={groupKey} style={{ marginBottom: 'var(--dev-space-5)' }}>
                  <div style={{ 
                    fontSize: 'var(--dev-text-sm)', 
                    fontWeight: 'var(--dev-font-semibold)',
                    color,
                    marginBottom: 'var(--dev-space-3)',
                  }}>
                    {label} ({docs.length})
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
                    {docs.map(doc => (
                      <DevCard 
                        key={doc.id} 
                        padding="sm"
                        style={{
                          borderLeft: `4px solid ${getUrgencyColor(doc.daysUntil)}`,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)' }}>
                          <FileText size={20} style={{ color: 'var(--dev-text-muted)', flexShrink: 0 }} />
                          
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              fontWeight: 'var(--dev-font-medium)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {doc.title}
                            </div>
                            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                              {doc.customerName}
                            </div>
                          </div>
                          
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ 
                              fontSize: 'var(--dev-text-sm)',
                              fontWeight: 'var(--dev-font-medium)',
                              color: getUrgencyColor(doc.daysUntil),
                            }}>
                              {formatDate(doc.dueDate)}
                            </div>
                            <div style={{ fontSize: 'var(--dev-text-xs)', color: 'var(--dev-text-muted)' }}>
                              {doc.isOverdue 
                                ? `${Math.abs(doc.daysUntil)} days overdue`
                                : doc.daysUntil === 0
                                  ? 'Today'
                                  : `${doc.daysUntil} days`
                              }
                            </div>
                          </div>
                          
                          <Link href={`/customers/${doc.customerId}`}>
                            <DevButton variant="ghost" size="sm">
                              <ArrowRight size={14} />
                            </DevButton>
                          </Link>
                        </div>
                      </DevCard>
                    ))}
                  </div>
                </div>
              )
            })
        )}
      </div>
    </div>
  )
}
