/**
 * Unified Inbox Component
 * Shows all messages and notifications in one place
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  or,
  getDocs,
} from 'firebase/firestore'
import {
  MessageSquare,
  Bell,
  FileText,
  FolderOpen,
  Search,
  Filter,
  X,
} from 'lucide-react'
import { formatDistance } from 'date-fns'
import { EmptyState } from '@/components/ui/EmptyState'
import { logger } from '@/lib/logger'

interface InboxItem {
  id: string
  type: 'message' | 'notification'
  projectId?: string
  projectTitle?: string
  documentId?: string
  documentTitle?: string
  content: string
  senderName?: string
  senderType?: 'customer' | 'developer' | 'admin'
  read: boolean
  createdAt: string
  title?: string
}

interface UnifiedInboxProps {
  role: 'customer' | 'developer'
  onClose?: () => void
}

export function UnifiedInbox({ role, onClose }: UnifiedInboxProps) {
  const { user } = useAuth()
  const [items, setItems] = useState<InboxItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'messages' | 'notifications'>(
    'all'
  )
  const [readFilter, setReadFilter] = useState<'all' | 'unread'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!user?.uid || !db) {
      setLoading(false)
      return
    }

    const unsubscribers: (() => void)[] = []

    // Listen to messages where user is a participant
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    )

    const unsubMessages = onSnapshot(messagesQuery, async (snapshot) => {
      try {
        const messagesData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data()

            // Check if user is part of this conversation (either through project or as sender)
            if (
              data.senderId === user.uid ||
              (await isUserInProject(data.projectId, user.uid))
            ) {
              // Fetch project details
              let projectTitle = 'Unknown Project'
              if (data.projectId) {
                const projectDoc = await getDocs(
                  query(
                    collection(db, 'projects'),
                    where('__name__', '==', data.projectId)
                  )
                )
                if (!projectDoc.empty) {
                  projectTitle = projectDoc.docs[0].data().title
                }
              }

              return {
                id: doc.id,
                type: 'message' as const,
                projectId: data.projectId,
                projectTitle,
                content: data.content,
                senderName: data.senderName,
                senderType: data.senderType,
                read: data.readBy?.includes(user.uid) || false,
                createdAt: data.createdAt?.toDate?.()
                  ? data.createdAt.toDate().toISOString()
                  : new Date().toISOString(),
              }
            }
            return null
          })
        )

        const validMessages = messagesData.filter(Boolean) as InboxItem[]

        // Listen to document communications where user is a participant
        const commsQuery = query(
          collection(db, 'documentCommunications'),
          where('participantIds', 'array-contains', user.uid),
          orderBy('sentAt', 'desc')
        )

        const unsubComms = onSnapshot(commsQuery, async (commsSnapshot) => {
          const commsData = await Promise.all(
            commsSnapshot.docs.map(async (doc) => {
              const data = doc.data()

              // Check if user is involved in this communication
              if (data.customerId === user.uid || data.sentBy === user.email) {
                // Fetch document details
                let documentTitle = 'Unknown Document'
                if (data.documentId) {
                  const docDoc = await getDocs(
                    query(
                      collection(db, 'customerDocuments'),
                      where('__name__', '==', data.documentId)
                    )
                  )
                  if (!docDoc.empty) {
                    documentTitle = docDoc.docs[0].data().googleDocTitle
                  }
                }

                return {
                  id: doc.id,
                  type: 'message' as const,
                  documentId: data.documentId,
                  documentTitle,
                  content: data.message,
                  senderName: data.sentBy,
                  senderType: data.sentByRole,
                  read: data.readBy?.includes(user.uid) || false,
                  createdAt: data.sentAt?.toDate?.()
                    ? data.sentAt.toDate().toISOString()
                    : new Date().toISOString(),
                }
              }
              return null
            })
          )

          const validComms = commsData.filter(Boolean) as InboxItem[]

          // Listen to notifications
          const notificationsQuery = query(
            collection(db, 'notifications'),
            where('recipientId', '==', user.uid),
            orderBy('createdAt', 'desc')
          )

          const unsubNotifications = onSnapshot(
            notificationsQuery,
            (notifSnapshot) => {
              const notificationsData = notifSnapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                  id: doc.id,
                  type: 'notification' as const,
                  projectId: data.projectId,
                  documentId: data.documentId,
                  documentTitle: data.documentTitle,
                  content: data.details || data.message || '',
                  title: data.type?.replace(/_/g, ' '),
                  read: data.read || false,
                  createdAt: data.createdAt?.toDate?.()
                    ? data.createdAt.toDate().toISOString()
                    : new Date().toISOString(),
                  senderName: data.actorName,
                }
              })

              // Combine all items
              setItems([...validMessages, ...validComms, ...notificationsData])
              setLoading(false)
            }
          )

          unsubscribers.push(unsubNotifications)
        })

        unsubscribers.push(unsubComms)
      } catch (err) {
        logger.error('UnifiedInbox', 'Error fetching inbox items', {
          error: err,
        })
        setLoading(false)
      }
    })

    unsubscribers.push(unsubMessages)

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [user?.uid, user?.email])

  // Helper function to check if user is in a project
  const isUserInProject = async (
    projectId: string | undefined,
    userId: string
  ): Promise<boolean> => {
    if (!projectId) return false

    try {
      const projectDoc = await getDocs(
        query(collection(db, 'projects'), where('__name__', '==', projectId))
      )

      if (projectDoc.empty) return false

      const project = projectDoc.docs[0].data()
      return (
        project.customerId === userId ||
        project.assignedDeveloperId === userId ||
        project.assignedDeveloperIds?.includes(userId)
      )
    } catch (err) {
      logger.error('UnifiedInbox', 'Error checking project membership', {
        error: err,
      })
      return false
    }
  }

  // Filtered items
  const filteredItems = useMemo(() => {
    let filtered = [...items]

    // Filter by type
    if (filter === 'messages') {
      filtered = filtered.filter((item) => item.type === 'message')
    } else if (filter === 'notifications') {
      filtered = filtered.filter((item) => item.type === 'notification')
    }

    // Filter by read status
    if (readFilter === 'unread') {
      filtered = filtered.filter((item) => !item.read)
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.content.toLowerCase().includes(query) ||
          item.projectTitle?.toLowerCase().includes(query) ||
          item.documentTitle?.toLowerCase().includes(query) ||
          item.senderName?.toLowerCase().includes(query)
      )
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })

    return filtered
  }, [items, filter, readFilter, searchQuery])

  const unreadCount = items.filter((item) => !item.read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Inbox</h2>
          <p className="text-sm text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('messages')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
              filter === 'messages'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Messages
          </button>
          <button
            onClick={() => setFilter('notifications')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
              filter === 'notifications'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button
            onClick={() =>
              setReadFilter(readFilter === 'all' ? 'unread' : 'all')
            }
            className={`ml-auto px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              readFilter === 'unread'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {readFilter === 'unread' ? 'Unread Only' : 'Show All'}
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={
              filter === 'messages' ? (
                <MessageSquare className="w-8 h-8 text-gray-400" />
              ) : (
                <Bell className="w-8 h-8 text-gray-400" />
              )
            }
            title={
              readFilter === 'unread' ? 'No unread items' : 'No items found'
            }
            description={
              searchQuery
                ? 'Try adjusting your search'
                : readFilter === 'unread'
                  ? "You're all caught up!"
                  : 'Items will appear here as they arrive'
            }
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !item.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'message' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}
                  >
                    {item.type === 'message' ? (
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-purple-600" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === 'notification' && item.title && (
                        <span className="text-sm font-semibold text-gray-900 capitalize">
                          {item.title}
                        </span>
                      )}
                      {item.senderName && (
                        <span className="text-sm font-medium text-gray-900">
                          {item.senderName}
                        </span>
                      )}
                      {!item.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>

                    <p className="text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.content}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {item.projectTitle && (
                        <>
                          <FolderOpen className="w-3 h-3" />
                          <span>{item.projectTitle}</span>
                          <span>•</span>
                        </>
                      )}
                      {item.documentTitle && (
                        <>
                          <FileText className="w-3 h-3" />
                          <span>{item.documentTitle}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>
                        {formatDistance(new Date(item.createdAt), new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
