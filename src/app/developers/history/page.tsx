/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ClockCounterClockwise,
  FileText,
  User,
  Check,
  ArrowsClockwise,
  Download,
  CaretDown,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'

interface HistoryItem {
  id: string
  type:
    | 'created'
    | 'assigned'
    | 'status_changed'
    | 'completed'
    | 'comment_added'
    | 'edited'
  documentId: string
  documentTitle: string
  actorName: string
  actorEmail?: string
  timestamp: string
  details?: string
  previousValue?: string
  newValue?: string
}

type FilterType = 'all' | 'status' | 'assignments' | 'edits'

/**
 * History Page - Audit log of all actions
 */
export default function HistoryPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/activity?limit=200', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch history')

        const json = await res.json()
        if (json.success) {
          // Transform activities to history items
          const items: HistoryItem[] = json.data.activities.map(
            (a: {
              id: string
              type: string
              documentId: string
              documentTitle: string
              actorName: string
              actorEmail?: string
              timestamp: string
              details?: string
            }) => ({
              id: a.id,
              type:
                a.type === 'document_created'
                  ? 'created'
                  : a.type === 'document_claimed'
                    ? 'assigned'
                    : a.type === 'document_completed'
                      ? 'completed'
                      : a.type === 'document_approved'
                        ? 'status_changed'
                        : 'edited',
              documentId: a.documentId,
              documentTitle: a.documentTitle,
              actorName: a.actorName,
              actorEmail: a.actorEmail,
              timestamp: a.timestamp,
              details: a.details,
            })
          )
          setHistory(items)
        } else {
          throw new Error(json.error || 'Failed to fetch history')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [user])

  // Filter and search history
  const filteredHistory = useMemo(() => {
    let result = [...history]

    // Apply type filter
    if (filter !== 'all') {
      result = result.filter((h) => {
        switch (filter) {
          case 'status':
            return (
              h.type === 'status_changed' ||
              h.type === 'completed' ||
              h.type === 'created'
            )
          case 'assignments':
            return h.type === 'assigned'
          case 'edits':
            return h.type === 'edited' || h.type === 'comment_added'
          default:
            return true
        }
      })
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (h) =>
          h.documentTitle.toLowerCase().includes(searchLower) ||
          h.actorName.toLowerCase().includes(searchLower) ||
          (h.details && h.details.toLowerCase().includes(searchLower))
      )
    }

    return result
  }, [history, filter, search])

  const formatDate = (timestamp: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    if (isNaN(date.getTime()) || !isFinite(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const getTypeIcon = (type: HistoryItem['type']) => {
    switch (type) {
      case 'created':
        return (
          <FileText
            size={16}
            style={{ color: 'var(--dev-status-available)' }}
          />
        )
      case 'assigned':
        return (
          <User size={16} style={{ color: 'var(--dev-status-in-progress)' }} />
        )
      case 'completed':
        return <Check size={16} style={{ color: 'var(--dev-status-done)' }} />
      case 'status_changed':
        return (
          <ArrowsClockwise
            size={16}
            style={{ color: 'var(--dev-accent-primary)' }}
          />
        )
      default:
        return <FileText size={16} />
    }
  }

  const getTypeLabel = (type: HistoryItem['type']) => {
    switch (type) {
      case 'created':
        return 'Created'
      case 'assigned':
        return 'Assigned'
      case 'completed':
        return 'Completed'
      case 'status_changed':
        return 'Status Changed'
      case 'comment_added':
        return 'Comment'
      case 'edited':
        return 'Edited'
      default:
        return 'Updated'
    }
  }

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Type', 'Document', 'Actor', 'Details']
    const rows = filteredHistory.map((h) => [
      h.timestamp,
      getTypeLabel(h.type),
      h.documentTitle,
      h.actorName,
      h.details || '',
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `history-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filterOptions: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All Actions' },
    { key: 'status', label: 'Status Changes' },
    { key: 'assignments', label: 'Assignments' },
    { key: 'edits', label: 'Edits & Comments' },
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
          flexWrap: 'wrap',
          gap: 'var(--dev-space-3)',
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
            History
          </h1>
          <p
            style={{
              color: 'var(--dev-text-muted)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Audit log of all actions
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'var(--dev-space-2)',
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <MagnifyingGlass
              size={14}
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--dev-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dev-input"
              style={{ paddingLeft: 32, width: 160 }}
            />
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

          {/* Export */}
          <DevButton variant="ghost" size="sm" onClick={exportToCSV}>
            <Download size={14} style={{ marginRight: 4 }} />
            Export
          </DevButton>
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

        {filteredHistory.length === 0 ? (
          <DevEmptyState
            icon={<ClockCounterClockwise size={32} />}
            title={search ? 'No matching history' : 'No history yet'}
            description={
              search
                ? 'Try a different search term'
                : 'Actions will appear here as they occur'
            }
          />
        ) : (
          <DevCard padding="none">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--dev-bg-muted)' }}>
                  <th
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'left',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    Time
                  </th>
                  <th
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'left',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'left',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    Document
                  </th>
                  <th
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'left',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    Actor
                  </th>
                  <th
                    style={{
                      padding: 'var(--dev-space-3)',
                      textAlign: 'left',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom:
                        index < filteredHistory.length - 1
                          ? '1px solid var(--dev-border-subtle)'
                          : 'none',
                    }}
                  >
                    <td
                      style={{
                        padding: 'var(--dev-space-3)',
                        fontSize: 'var(--dev-text-sm)',
                        color: 'var(--dev-text-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatDate(item.timestamp)}
                    </td>
                    <td style={{ padding: 'var(--dev-space-3)' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--dev-space-2)',
                        }}
                      >
                        {getTypeIcon(item.type)}
                        <span style={{ fontSize: 'var(--dev-text-sm)' }}>
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: 'var(--dev-space-3)',
                        fontSize: 'var(--dev-text-sm)',
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.documentTitle}
                    </td>
                    <td
                      style={{
                        padding: 'var(--dev-space-3)',
                        fontSize: 'var(--dev-text-sm)',
                      }}
                    >
                      {item.actorName}
                    </td>
                    <td
                      style={{
                        padding: 'var(--dev-space-3)',
                        fontSize: 'var(--dev-text-sm)',
                        color: 'var(--dev-text-muted)',
                      }}
                    >
                      {item.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DevCard>
        )}
      </div>
    </div>
  )
}
