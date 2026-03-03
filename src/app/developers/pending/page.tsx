'use client'

import { useState } from 'react'
import { Clock, Bell, Check, CaretRight } from '@phosphor-icons/react'
import { DevButton, DevCard, DevBadge, DevAvatar, DevInput } from '@/components/developers/v2/ui'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useAuth } from '@/components/auth/ClientProvider'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import { logger } from '@/lib/logger'

/**
 * Pending Review Page
 * 
 * Admin view of documents pending customer submission or approval.
 * Enables nudging customers and approving documents.
 */
export default function PendingPage() {
  const { user } = useAuth()
  const { openModal, selectDocument } = useDevPortalStore()
  const { pendingDrafts, loading } = useSubmissions({ userId: user?.uid || null, isAdmin: true })
  const [nudgingId, setNudgingId] = useState<string | null>(null)
  const [approvingId, setApprovingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter pending drafts
  const filteredDrafts = pendingDrafts.filter((draft: { googleDocTitle?: string; customerName?: string }) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      draft.googleDocTitle?.toLowerCase().includes(query) ||
      draft.customerName?.toLowerCase().includes(query)
    )
  })

  const handleNudge = async (docId: string) => {
    setNudgingId(docId)
    try {
      // Nudge API not yet implemented — tracked as a planned feature
      logger.warn('PendingPage', 'Nudge API not yet implemented for document', { data: { docId } })
      await new Promise(resolve => setTimeout(resolve, 500))
    } finally {
      setNudgingId(null)
    }
  }

  const handleApprove = async (docId: string) => {
    setApprovingId(docId)
    try {
      // Approve API not yet implemented — tracked as a planned feature
      logger.warn('PendingPage', 'Approve API not yet implemented for document', { data: { docId } })
      await new Promise(resolve => setTimeout(resolve, 500))
    } finally {
      setApprovingId(null)
    }
  }

  const handleViewDetails = (docId: string) => {
    selectDocument(docId)
    openModal('document-detail')
  }

  const formatDate = (dateValue: Date | string | { seconds: number } | undefined) => {
    if (!dateValue) return 'Unknown'
    
    let date: Date
    if (dateValue instanceof Date) {
      date = dateValue
    } else if (typeof dateValue === 'string') {
      date = new Date(dateValue)
    } else if ('seconds' in dateValue) {
      date = new Date(dateValue.seconds * 1000)
    } else {
      return 'Unknown'
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  if (loading) {
    return (
      <div style={{ padding: 'var(--dev-space-6)' }}>
        <div className="dev-skeleton" style={{ width: 200, height: 32, marginBottom: 24 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="dev-skeleton" style={{ height: 80 }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 'var(--dev-space-6)', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--dev-space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-3)', marginBottom: 'var(--dev-space-2)' }}>
          <Clock size={24} weight="duotone" style={{ color: 'var(--dev-accent-warning)' }} />
          <h1 style={{ 
            fontSize: 'var(--dev-text-2xl)', 
            fontWeight: 'var(--dev-font-semibold)',
          }}>
            Pending Review
          </h1>
          {pendingDrafts.length > 0 && (
            <DevBadge variant="warning">{pendingDrafts.length}</DevBadge>
          )}
        </div>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Documents awaiting customer submission or admin approval
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--dev-space-4)' }}>
        <DevInput
          placeholder="Search pending documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Documents List */}
      {filteredDrafts.length === 0 ? (
        <DevCard style={{ textAlign: 'center', padding: 'var(--dev-space-12)' }}>
          <Clock size={48} weight="duotone" style={{ color: 'var(--dev-text-muted)', marginBottom: 16 }} />
          <h3 style={{ fontWeight: 'var(--dev-font-semibold)', marginBottom: 8 }}>
            No pending documents
          </h3>
          <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
            All documents have been submitted or approved
          </p>
        </DevCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dev-space-2)' }}>
          {filteredDrafts.map((draft: { id: string; customerName?: string; googleDocTitle?: string; submittedAt?: Date | string | { seconds: number } }) => (
            <DevCard 
              key={draft.id} 
              interactive
              onClick={() => handleViewDetails(draft.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--dev-space-4)',
              }}
            >
              <DevAvatar name={draft.customerName || 'Customer'} size="md" />
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div 
                  className="dev-truncate"
                  style={{ 
                    fontWeight: 'var(--dev-font-medium)', 
                    marginBottom: 'var(--dev-space-1)',
                  }}
                >
                  {draft.googleDocTitle || 'Untitled Document'}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--dev-space-3)',
                  fontSize: 'var(--dev-text-xs)',
                  color: 'var(--dev-text-muted)',
                }}>
                  <span>{draft.customerName}</span>
                  <span>•</span>
                  <span>Submitted {formatDate(draft.submittedAt)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)' }}>
                <DevButton
                  variant="ghost"
                  size="sm"
                  leftIcon={<Bell size={14} />}
                  onClick={(e) => { e.stopPropagation(); handleNudge(draft.id) }}
                  loading={nudgingId === draft.id}
                >
                  Nudge
                </DevButton>
                <DevButton
                  variant="primary"
                  size="sm"
                  leftIcon={<Check size={14} weight="bold" />}
                  onClick={(e) => { e.stopPropagation(); handleApprove(draft.id) }}
                  loading={approvingId === draft.id}
                >
                  Approve
                </DevButton>
                <CaretRight size={16} style={{ color: 'var(--dev-text-muted)' }} />
              </div>
            </DevCard>
          ))}
        </div>
      )}
    </div>
  )
}
