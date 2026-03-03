'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Queue,
  ArrowsDownUp,
  MagnifyingGlass,
  Clock,
  CheckCircle,
  Play,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevBadge,
  DevProgress,
  DevEmptyState,
  DevInput,
  DevAvatar,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import type { Submission } from '@/lib/types/submission'
import { toDate, toTimestamp } from '@/lib/utils/timestamp'

/**
 * My Queue Page
 *
 * Shows documents assigned to the current user, sorted by priority
 */
export default function QueuePage() {
  const { user } = useAuth()
  const { isAdminView, openModal, selectDocument } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'customer'>('date')

  // Filter to only show documents assigned to current user
  const myQueue = useMemo(() => {
    let queue = submissions.filter((sub) => sub.assignedTo === user?.uid)

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      queue = queue.filter(
        (sub) =>
          sub.googleDocTitle?.toLowerCase().includes(q) ||
          sub.customer?.displayName?.toLowerCase().includes(q)
      )
    }

    // Sort
    queue.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
          return (
            (priorityOrder[a.priority as keyof typeof priorityOrder] || 4) -
            (priorityOrder[b.priority as keyof typeof priorityOrder] || 4)
          )
        case 'customer':
          return (a.customer?.displayName || '').localeCompare(
            b.customer?.displayName || ''
          )
        default:
          // Date - newest first
          const dateA = toTimestamp(a.approvedAt)
          const dateB = toTimestamp(b.approvedAt)
          return dateB - dateA
      }
    })

    return queue
  }, [submissions, user?.uid, searchQuery, sortBy])

  const handleCardClick = (doc: Submission) => {
    selectDocument(doc.id)
    openModal('document-detail')
  }

  const formatDate = (
    dateValue: Date | string | number | { seconds: number } | null
  ) => {
    if (!dateValue) return ''
    const date: Date = toDate(dateValue)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  // Stats
  const stats = {
    total: myQueue.length,
    inProgress: myQueue.filter((d) => d.status === 'in-progress').length,
    pending: myQueue.filter(
      (d) => d.status === 'approved' || d.status === 'pending' || !d.status
    ).length,
  }

  if (loading) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 'var(--dev-space-4) var(--dev-space-5)',
            borderBottom: '1px solid var(--dev-border-subtle)',
          }}
        >
          <div className="dev-skeleton" style={{ width: 200, height: 32 }} />
        </div>
        <div style={{ flex: 1, padding: 'var(--dev-space-5)' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="dev-skeleton"
              style={{ height: 80, marginBottom: 'var(--dev-space-3)' }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <div
        style={{
          padding: 'var(--dev-space-4) var(--dev-space-5)',
          borderBottom: '1px solid var(--dev-border-subtle)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--dev-space-3)',
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
              My Queue
            </h1>
            <p
              style={{
                color: 'var(--dev-text-muted)',
                fontSize: 'var(--dev-text-sm)',
              }}
            >
              Documents assigned to you
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'var(--dev-space-3)',
              alignItems: 'center',
            }}
          >
            <DevInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputSize="sm"
              leftIcon={<MagnifyingGlass size={16} />}
              style={{ width: 200 }}
            />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'date' | 'priority' | 'customer')
              }
              className="dev-input dev-input-sm"
              style={{ width: 120 }}
            >
              <option value="date">By Date</option>
              <option value="priority">By Priority</option>
              <option value="customer">By Customer</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--dev-space-4)',
            fontSize: 'var(--dev-text-xs)',
            color: 'var(--dev-text-muted)',
          }}
        >
          <span>
            <strong style={{ color: 'var(--dev-text-primary)' }}>
              {stats.total}
            </strong>{' '}
            total
          </span>
          <span>
            <strong style={{ color: 'var(--dev-status-in-progress)' }}>
              {stats.inProgress}
            </strong>{' '}
            in progress
          </span>
          <span>
            <strong style={{ color: 'var(--dev-status-available)' }}>
              {stats.pending}
            </strong>{' '}
            not started
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {myQueue.length === 0 ? (
          <DevEmptyState
            icon={<Queue size={32} />}
            title="Your queue is empty"
            description="Documents assigned to you will appear here. Go claim some work!"
            action={{
              label: 'View Available Documents',
              onClick: () => (window.location.href = '/developers'),
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--dev-space-3)',
            }}
          >
            {myQueue.map((doc) => (
              <DevCard
                key={doc.id}
                interactive
                onClick={() => handleCardClick(doc)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dev-space-4)',
                }}
              >
                {/* Status indicator */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background:
                      doc.status === 'in-progress'
                        ? 'var(--dev-status-in-progress)'
                        : 'var(--dev-status-available)',
                  }}
                />

                {/* Title & Customer */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className="dev-truncate"
                    style={{
                      fontWeight: 'var(--dev-font-medium)',
                      marginBottom: 2,
                    }}
                  >
                    {doc.googleDocTitle || 'Untitled'}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    {doc.customer?.displayName}
                  </div>
                </div>

                {/* Priority */}
                {doc.priority && (
                  <DevBadge variant={doc.priority} size="sm">
                    {doc.priority}
                  </DevBadge>
                )}

                {/* Progress */}
                <div style={{ width: 100 }}>
                  {doc.progressPercentage !== undefined && (
                    <DevProgress
                      value={doc.progressPercentage}
                      size="sm"
                      showLabel
                    />
                  )}
                </div>

                {/* Status Badge */}
                <DevBadge
                  variant={doc.status === 'in-progress' ? 'info' : 'warning'}
                  size="sm"
                >
                  {doc.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                </DevBadge>

                {/* Date */}
                <div
                  style={{
                    width: 60,
                    textAlign: 'right',
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                  }}
                >
                  {formatDate(doc.approvedAt)}
                </div>
              </DevCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
