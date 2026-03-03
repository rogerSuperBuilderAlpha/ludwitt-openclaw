/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Pulse,
  FileText,
  User,
  Check,
  Clock,
  CaretDown,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import Link from 'next/link'

interface ActivityItem {
  id: string
  type:
    | 'document_created'
    | 'document_claimed'
    | 'document_completed'
    | 'document_approved'
    | 'comment_added'
  documentId: string
  documentTitle: string
  actorName: string
  actorEmail?: string
  timestamp: string
  details?: string
}

type FilterType = 'all' | 'created' | 'claimed' | 'completed'

/**
 * Activity Feed Page - Real-time activity across all documents
 */
export default function ActivityPage() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/activity?limit=100', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch activity')

        const json = await res.json()
        if (json.success) {
          setActivities(json.data.activities)
        } else {
          throw new Error(json.error || 'Failed to fetch activity')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [user])

  // Filter activities
  const filteredActivities = useMemo(() => {
    if (filter === 'all') return activities

    return activities.filter((a) => {
      switch (filter) {
        case 'created':
          return a.type === 'document_created'
        case 'claimed':
          return a.type === 'document_claimed'
        case 'completed':
          return a.type === 'document_completed'
        default:
          return true
      }
    })
  }, [activities, filter])

  // Group by date
  const groupedActivities = useMemo(() => {
    const groups: Record<string, ActivityItem[]> = {}

    filteredActivities.forEach((activity) => {
      if (!activity.timestamp) {
        if (!groups['Unknown']) groups['Unknown'] = []
        groups['Unknown'].push(activity)
        return
      }
      const date = new Date(activity.timestamp)
      if (isNaN(date.getTime())) {
        if (!groups['Unknown']) groups['Unknown'] = []
        groups['Unknown'].push(activity)
        return
      }
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      let groupKey: string
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Today'
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Yesterday'
      } else {
        groupKey = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
        }).format(date)
      }

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(activity)
    })

    return groups
  }, [filteredActivities])

  const formatTime = (timestamp: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'document_created':
        return (
          <FileText
            size={16}
            style={{ color: 'var(--dev-status-available)' }}
          />
        )
      case 'document_claimed':
        return (
          <User size={16} style={{ color: 'var(--dev-status-in-progress)' }} />
        )
      case 'document_completed':
        return <Check size={16} style={{ color: 'var(--dev-status-done)' }} />
      case 'document_approved':
        return (
          <Check size={16} style={{ color: 'var(--dev-accent-success)' }} />
        )
      default:
        return <Clock size={16} />
    }
  }

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'document_created':
        return 'submitted a new document'
      case 'document_claimed':
        return 'claimed'
      case 'document_completed':
        return 'completed'
      case 'document_approved':
        return 'approved'
      default:
        return activity.details || 'updated'
    }
  }

  const filterOptions: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Activity' },
    { key: 'created', label: 'New Documents' },
    { key: 'claimed', label: 'Claims' },
    { key: 'completed', label: 'Completions' },
  ]

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
            <DevSkeleton key={i} height={60} style={{ marginBottom: 8 }} />
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
            Activity Feed
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Real-time activity across all documents
          </p>
        </div>

        {/* Filter */}
        <div style={{ position: 'relative' }}>
          <DevButton
            variant="secondary"
            size="sm"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            {filterOptions.find((o) => o.key === filter)?.label}
            <CaretDown size={12} style={{ marginLeft: 4 }} />
          </DevButton>
          {showFilterMenu && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                onClick={() => setShowFilterMenu(false)}
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
                  minWidth: 160,
                }}
              >
                {filterOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setFilter(option.key)
                      setShowFilterMenu(false)
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--dev-space-2) var(--dev-space-3)',
                      textAlign: 'left',
                      background:
                        filter === option.key
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

        {filteredActivities.length === 0 ? (
          <DevEmptyState
            icon={<Pulse size={32} />}
            title="No activity yet"
            description="Activity will appear here as documents are created and updated"
          />
        ) : (
          Object.entries(groupedActivities).map(([date, items]) => (
            <div key={date} style={{ marginBottom: 'var(--dev-space-5)' }}>
              <div
                style={{
                  fontSize: 'var(--dev-text-sm)',
                  fontWeight: 'var(--dev-font-semibold)',
                  color: 'var(--dev-text-muted)',
                  marginBottom: 'var(--dev-space-3)',
                }}
              >
                {date}
              </div>
              <div
                style={{
                  borderLeft: '2px solid var(--dev-border-subtle)',
                  paddingLeft: 'var(--dev-space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--dev-space-3)',
                }}
              >
                {items.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--dev-space-3)',
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: -28,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'var(--dev-bg-elevated)',
                        border: '2px solid var(--dev-border-default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--dev-text-sm)' }}>
                        <strong>{activity.actorName}</strong>{' '}
                        {getActivityText(activity)}{' '}
                        <Link
                          href={`/customers/${activity.documentId}`}
                          style={{
                            color: 'var(--dev-accent-primary)',
                            textDecoration: 'none',
                          }}
                        >
                          {activity.documentTitle}
                        </Link>
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--dev-text-xs)',
                          color: 'var(--dev-text-muted)',
                          marginTop: 2,
                        }}
                      >
                        {formatTime(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
