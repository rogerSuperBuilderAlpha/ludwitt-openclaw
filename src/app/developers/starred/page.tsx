'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Star,
  StarHalf,
  MagnifyingGlass,
  FolderOpen,
  Files,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevBadge,
  DevEmptyState,
  DevInput,
  DevAvatar,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'
import type { Submission } from '@/lib/types/submission'
import { logger } from '@/lib/logger'

/**
 * Starred Items Page
 *
 * Shows documents and projects that the user has starred for quick access
 */
export default function StarredPage() {
  const { user } = useAuth()
  const { isAdminView, openModal, selectDocument } = useDevPortalStore()
  const { submissions, loading } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [starredIds, setStarredIds] = useState<string[]>([])
  const [loadingStarred, setLoadingStarred] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch starred items from API
  useEffect(() => {
    const fetchStarred = async () => {
      if (!user) return
      setError(null)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/starred', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setStarredIds(data.data?.starredItems || [])
          } else {
            setError(data.error || 'Failed to load starred items')
          }
        } else {
          setError('Failed to load starred items')
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load starred items'
        setError(errorMessage)
      } finally {
        setLoadingStarred(false)
      }
    }

    fetchStarred()
  }, [user])

  // Filter submissions to only show starred ones
  const starredSubmissions = useMemo(() => {
    let starred = submissions.filter((sub) => starredIds.includes(sub.id))

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      starred = starred.filter(
        (sub) =>
          sub.googleDocTitle?.toLowerCase().includes(q) ||
          sub.customer?.displayName?.toLowerCase().includes(q)
      )
    }

    return starred
  }, [submissions, starredIds, searchQuery])

  const handleCardClick = (doc: Submission) => {
    selectDocument(doc.id)
    openModal('document-detail')
  }

  const handleUnstar = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation()
    if (!user) return

    try {
      const token = await user.getIdToken()
      const newStarredIds = starredIds.filter((id) => id !== docId)

      await fetch('/api/developers/starred', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ starredItems: newStarredIds }),
      })

      setStarredIds(newStarredIds)
    } catch (err) {
      logger.error('StarredPage', 'Failed to unstar', { error: err })
    }
  }

  const formatDate = (
    dateValue: Date | string | number | { seconds: number } | null
  ) => {
    if (!dateValue) return ''
    let date: Date
    if (dateValue instanceof Date) {
      date = dateValue
    } else if (typeof dateValue === 'string') {
      date = new Date(dateValue)
    } else if (typeof dateValue === 'number') {
      date = new Date(dateValue)
    } else if ('seconds' in dateValue && dateValue.seconds) {
      date = new Date(dateValue.seconds * 1000)
    } else {
      return ''
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'completed':
        return 'var(--dev-status-done)'
      case 'in-progress':
        return 'var(--dev-status-in-progress)'
      case 'archived':
        return 'var(--dev-status-archived)'
      default:
        return 'var(--dev-status-available)'
    }
  }

  if (loading || loadingStarred) {
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--dev-space-4)',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="dev-skeleton" style={{ height: 140 }} />
            ))}
          </div>
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
              Starred
            </h1>
            <p
              style={{
                color: 'var(--dev-text-muted)',
                fontSize: 'var(--dev-text-sm)',
              }}
            >
              Quick access to your pinned items
            </p>
          </div>

          {starredSubmissions.length > 0 && (
            <DevInput
              placeholder="Search starred..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputSize="sm"
              leftIcon={<MagnifyingGlass size={16} />}
              style={{ width: 200 }}
            />
          )}
        </div>

        {starredSubmissions.length > 0 && (
          <div
            style={{
              fontSize: 'var(--dev-text-xs)',
              color: 'var(--dev-text-muted)',
            }}
          >
            <strong style={{ color: 'var(--dev-text-primary)' }}>
              {starredSubmissions.length}
            </strong>{' '}
            starred items
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Error Display */}
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
        {starredSubmissions.length === 0 ? (
          <DevEmptyState
            icon={<Star size={32} />}
            title="No starred items"
            description="Star documents and projects to access them quickly from here. Click the star icon on any document to add it."
            action={{
              label: 'Browse Documents',
              onClick: () => (window.location.href = '/developers'),
            }}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--dev-space-4)',
            }}
          >
            {starredSubmissions.map((doc) => (
              <DevCard
                key={doc.id}
                interactive
                padding="md"
                onClick={() => handleCardClick(doc)}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--dev-space-3)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--dev-radius-md)',
                      background: 'var(--dev-bg-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Files
                      size={16}
                      style={{ color: 'var(--dev-text-muted)' }}
                    />
                  </div>
                  <button
                    onClick={(e) => handleUnstar(e, doc.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                      borderRadius: 'var(--dev-radius-sm)',
                      color: 'var(--dev-accent-warning)',
                      transition: 'opacity 0.15s ease',
                    }}
                    title="Remove from starred"
                  >
                    <Star size={18} weight="fill" />
                  </button>
                </div>

                {/* Title */}
                <h3
                  className="dev-truncate"
                  style={{
                    fontSize: 'var(--dev-text-sm)',
                    fontWeight: 'var(--dev-font-semibold)',
                    marginBottom: 'var(--dev-space-2)',
                  }}
                >
                  {doc.googleDocTitle || 'Untitled'}
                </h3>

                {/* Customer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--dev-space-2)',
                    marginBottom: 'var(--dev-space-3)',
                  }}
                >
                  <DevAvatar
                    name={doc.customer?.displayName || 'Unknown'}
                    size="xs"
                  />
                  <span
                    style={{
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    {doc.customer?.displayName}
                  </span>
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--dev-space-2)',
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: getStatusColor(doc.status),
                      }}
                    />
                    <span
                      style={{
                        fontSize: 'var(--dev-text-2xs)',
                        color: 'var(--dev-text-muted)',
                        textTransform: 'capitalize',
                      }}
                    >
                      {doc.status?.replace('-', ' ') || 'Available'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 'var(--dev-text-2xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    {formatDate(doc.approvedAt)}
                  </span>
                </div>
              </DevCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
