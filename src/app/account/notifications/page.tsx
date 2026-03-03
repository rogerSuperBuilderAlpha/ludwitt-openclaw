/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Check, CheckCheck, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/components/auth/ClientProvider'
import { db } from '@/lib/firebase/config'
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore'
import { Notification } from '@/lib/types/notifications'
import { formatDate } from '@/lib/utils/timestamp'
import { logger } from '@/lib/logger'

type FilterTab = 'all' | 'unread'

const INITIAL_LIMIT = 50
const LOAD_MORE_INCREMENT = 50

function getNotificationIcon(type: string) {
  switch (type) {
    case 'new_message':
      return '💬'
    case 'status_change':
      return '🔄'
    case 'assignment':
      return '👤'
    case 'requirement_added':
    case 'requirement_updated':
      return '✅'
    case 'session_logged':
      return '⏱️'
    case 'document_approved':
      return '🎉'
    case 'document_archived':
      return '📦'
    case 'deliverable_submitted':
      return '📤'
    case 'deliverable_reviewed':
      return '✅'
    case 'deliverable_comment':
      return '💬'
    case 'booking_created':
      return '📅'
    case 'booking_cancelled':
      return '❌'
    case 'peer_review_assigned':
      return '📋'
    case 'peer_review_submitted':
      return '📝'
    case 'peer_review_endorsed':
      return '⭐'
    case 'badge_earned':
      return '🏆'
    case 'idea_comment':
      return '💡'
    case 'professor_document':
      return '📄'
    case 'student_joined_path':
      return '🎓'
    case 'booking_reminder':
      return '⏰'
    default:
      return '🔔'
  }
}

function getPriorityColor(priority?: string) {
  switch (priority) {
    case 'urgent':
      return 'border-l-4 border-red-500'
    case 'high':
      return 'border-l-4 border-orange-500'
    case 'normal':
    default:
      return 'border-l-4 border-blue-500'
  }
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterTab>('all')
  const [queryLimit, setQueryLimit] = useState(INITIAL_LIMIT)

  // Real-time listener
  useEffect(() => {
    if (!user?.uid || !db) {
      setLoading(false)
      return
    }

    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('recipientId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(queryLimit)
    )

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const notifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Notification[]

        setNotifications(notifs)
        setLoading(false)
      },
      (error) => {
        logger.error('NotificationsPage', 'Error listening to notifications', {
          error,
        })
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user?.uid, queryLimit])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const token = await user?.getIdToken()
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationId }),
      })
    } catch (error) {
      logger.error('NotificationsPage', 'Error marking notification as read', {
        error,
      })
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const token = await user?.getIdToken()
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ markAllAsRead: true }),
      })
    } catch (error) {
      logger.error(
        'NotificationsPage',
        'Error marking all notifications as read',
        { error }
      )
    }
  }

  const filtered =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please sign in to view notifications.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-4 border-b border-gray-200">
          {(['all', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === tab
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab === 'all'
                ? 'All'
                : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-3 text-sm text-gray-500">
                Loading notifications...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                {filter === 'unread'
                  ? 'No unread notifications'
                  : 'No notifications yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  } ${getPriorityColor(notification.priority)}`}
                  onClick={() => {
                    if (!notification.read) {
                      handleMarkAsRead(notification.id)
                    }
                    if (notification.actionUrl) {
                      router.push(notification.actionUrl)
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      {notification.documentTitle && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          📄 {notification.documentTitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.createdAt)}
                        </span>
                        {notification.actorName && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              from {notification.actorName}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMarkAsRead(notification.id)
                        }}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filtered.length >= queryLimit && (
          <div className="mt-4 text-center">
            <button
              onClick={() =>
                setQueryLimit((prev) => prev + LOAD_MORE_INCREMENT)
              }
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
