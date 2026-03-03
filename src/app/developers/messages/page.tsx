/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  ChatCircle,
  MagnifyingGlass,
  EnvelopeSimple,
  EnvelopeOpen,
  FileText,
  Circle,
} from '@phosphor-icons/react'
import {
  DevCard,
  DevButton,
  DevSkeleton,
  DevBadge,
  DevEmptyState,
} from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import Link from 'next/link'

interface Message {
  id: string
  documentId: string
  documentTitle: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhotoURL?: string
  content: string
  createdAt: string
  read: boolean
  type: 'comment' | 'note' | 'system'
}

/**
 * Messages/Inbox Page - Unified customer communications
 */
export default function MessagesPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return
      setLoading(true)

      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/developers/messages', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Failed to fetch messages')

        const json = await res.json()
        if (json.success) {
          setMessages(json.data.messages)
        } else {
          throw new Error(json.error || 'Failed to fetch messages')
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [user])

  // Filter messages
  const filteredMessages = useMemo(() => {
    let result = [...messages]

    // Filter by read status
    if (filter === 'unread') {
      result = result.filter((m) => !m.read)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (m) =>
          m.customerName.toLowerCase().includes(searchLower) ||
          m.content.toLowerCase().includes(searchLower) ||
          m.documentTitle.toLowerCase().includes(searchLower)
      )
    }

    return result
  }, [messages, search, filter])

  // Group messages by document
  const groupedMessages = useMemo(() => {
    const groups: Record<string, Message[]> = {}

    filteredMessages.forEach((m) => {
      if (!groups[m.documentId]) {
        groups[m.documentId] = []
      }
      groups[m.documentId].push(m)
    })

    return groups
  }, [filteredMessages])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Unknown'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'Unknown'
    const now = new Date()
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays === 0) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(date)
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date)
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

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
        <div style={{ flex: 1, display: 'flex' }}>
          <div
            style={{
              width: 350,
              borderRight: '1px solid var(--dev-border-subtle)',
              padding: 'var(--dev-space-4)',
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <DevSkeleton key={i} height={80} style={{ marginBottom: 8 }} />
            ))}
          </div>
          <div style={{ flex: 1, padding: 'var(--dev-space-4)' }}>
            <DevSkeleton height={300} />
          </div>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-3)',
          }}
        >
          <h1
            style={{
              fontSize: 'var(--dev-text-xl)',
              fontWeight: 'var(--dev-font-semibold)',
            }}
          >
            Messages
          </h1>
          {unreadCount > 0 && (
            <DevBadge variant="primary" size="sm">
              {unreadCount} unread
            </DevBadge>
          )}
        </div>

        <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
          <DevButton
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </DevButton>
          <DevButton
            variant={filter === 'unread' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </DevButton>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Message List */}
        <div
          style={{
            width: 380,
            borderRight: '1px solid var(--dev-border-subtle)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search */}
          <div
            style={{
              padding: 'var(--dev-space-3)',
              borderBottom: '1px solid var(--dev-border-subtle)',
            }}
          >
            <div style={{ position: 'relative' }}>
              <MagnifyingGlass
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--dev-text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="dev-input"
                style={{ paddingLeft: 36, width: '100%' }}
              />
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {filteredMessages.length === 0 ? (
              <div
                style={{ padding: 'var(--dev-space-8)', textAlign: 'center' }}
              >
                <ChatCircle
                  size={32}
                  style={{
                    color: 'var(--dev-text-muted)',
                    marginBottom: 'var(--dev-space-2)',
                  }}
                />
                <p
                  style={{
                    color: 'var(--dev-text-muted)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  {search ? 'No messages found' : 'No messages yet'}
                </p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  style={{
                    padding: 'var(--dev-space-3) var(--dev-space-4)',
                    borderBottom: '1px solid var(--dev-border-subtle)',
                    cursor: 'pointer',
                    background:
                      selectedMessage?.id === message.id
                        ? 'var(--dev-bg-hover)'
                        : 'transparent',
                    display: 'flex',
                    gap: 'var(--dev-space-3)',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: message.customerPhotoURL
                        ? `url(${message.customerPhotoURL}) center/cover`
                        : 'var(--dev-accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'var(--dev-font-semibold)',
                      fontSize: 'var(--dev-text-xs)',
                      flexShrink: 0,
                    }}
                  >
                    {!message.customerPhotoURL &&
                      message.customerName.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--dev-space-2)',
                        marginBottom: 2,
                      }}
                    >
                      {!message.read && (
                        <Circle
                          size={8}
                          weight="fill"
                          style={{ color: 'var(--dev-accent-primary)' }}
                        />
                      )}
                      <span
                        style={{
                          fontWeight: message.read
                            ? 'var(--dev-font-normal)'
                            : 'var(--dev-font-semibold)',
                          fontSize: 'var(--dev-text-sm)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {message.customerName}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--dev-text-xs)',
                          color: 'var(--dev-text-muted)',
                          marginLeft: 'auto',
                          flexShrink: 0,
                        }}
                      >
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--dev-text-xs)',
                        color: 'var(--dev-text-muted)',
                        marginBottom: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <FileText size={10} />
                      {message.documentTitle}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--dev-text-sm)',
                        color: 'var(--dev-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {message.content.slice(0, 60)}...
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div
                style={{
                  padding: 'var(--dev-space-4)',
                  borderBottom: '1px solid var(--dev-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--dev-space-3)',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: selectedMessage.customerPhotoURL
                        ? `url(${selectedMessage.customerPhotoURL}) center/cover`
                        : 'var(--dev-accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    {!selectedMessage.customerPhotoURL &&
                      selectedMessage.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--dev-font-semibold)' }}>
                      {selectedMessage.customerName}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--dev-text-xs)',
                        color: 'var(--dev-text-muted)',
                      }}
                    >
                      {selectedMessage.customerEmail}
                    </div>
                  </div>
                </div>

                <Link href={`/customers/${selectedMessage.customerId}`}>
                  <DevButton variant="secondary" size="sm">
                    <FileText size={14} style={{ marginRight: 4 }} />
                    View Document
                  </DevButton>
                </Link>
              </div>

              {/* Message Content */}
              <div
                style={{
                  flex: 1,
                  padding: 'var(--dev-space-5)',
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    padding: 'var(--dev-space-4)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-lg)',
                    marginBottom: 'var(--dev-space-4)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                      marginBottom: 'var(--dev-space-2)',
                    }}
                  >
                    Re: {selectedMessage.documentTitle}
                  </div>
                  <p
                    style={{
                      fontSize: 'var(--dev-text-base)',
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedMessage.content}
                  </p>
                </div>

                <div
                  style={{
                    fontSize: 'var(--dev-text-xs)',
                    color: 'var(--dev-text-muted)',
                    textAlign: 'center',
                  }}
                >
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Reply (placeholder) */}
              <div
                style={{
                  padding: 'var(--dev-space-4)',
                  borderTop: '1px solid var(--dev-border-subtle)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-lg)',
                    color: 'var(--dev-text-muted)',
                    fontSize: 'var(--dev-text-sm)',
                    textAlign: 'center',
                  }}
                >
                  Reply functionality coming soon...
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 'var(--dev-space-3)',
                color: 'var(--dev-text-muted)',
              }}
            >
              <EnvelopeOpen size={48} />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
