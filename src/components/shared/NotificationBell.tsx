'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Check, CheckCheck, X } from 'lucide-react'
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

interface NotificationBellProps {
  className?: string
  isDark?: boolean
}

export function NotificationBell({
  className = '',
  isDark = false,
}: NotificationBellProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Real-time listener for notifications
  useEffect(() => {
    if (!user?.uid || !db) {
      setLoading(false)
      return
    }

    // Query for user's notifications (most recent 20)
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('recipientId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(20)
    )

    const unsubscribe = onSnapshot(
      notificationsQuery,
      (snapshot) => {
        const notifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Notification[]

        setNotifications(notifs)
        setUnreadCount(notifs.filter((n) => !n.read).length)
        setLoading(false)
      },
      (error) => {
        logger.error('NotificationBell', 'Error listening to notifications', {
          error,
        })
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user?.uid])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const token = await user?.getIdToken()
      const response = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationId }),
      })

      if (!response.ok) {
        logger.error('NotificationBell', 'Failed to mark notification as read')
      }
    } catch (error) {
      logger.error('NotificationBell', 'Error marking notification as read', {
        error,
      })
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      const token = await user?.getIdToken()
      const response = await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ markAllAsRead: true }),
      })

      if (!response.ok) {
        logger.error(
          'NotificationBell',
          'Failed to mark all notifications as read'
        )
      }
    } catch (error) {
      logger.error(
        'NotificationBell',
        'Error marking all notifications as read',
        { error }
      )
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      // Developer/customer types
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
      // University types
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
      case 'course_announcement':
        return '📢'
      default:
        return '🔔'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return isDark
          ? 'border-l-4 border-red-400'
          : 'border-l-4 border-red-500'
      case 'high':
        return isDark
          ? 'border-l-4 border-orange-400'
          : 'border-l-4 border-orange-500'
      case 'normal':
      default:
        return isDark
          ? 'border-l-4 border-blue-400'
          : 'border-l-4 border-blue-500'
    }
  }

  if (!user) return null

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
          isDark
            ? 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-96 rounded-lg shadow-xl border z-50 max-h-[600px] flex flex-col ${
            isDark
              ? 'bg-[#1a1a1b] border-[#333] text-gray-200'
              : 'bg-white border-gray-200 text-gray-700'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 border-b ${
              isDark ? 'border-[#333]' : 'border-gray-200'
            }`}
          >
            <h3
              className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
            >
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className={`text-xs flex items-center gap-1 ${
                    isDark
                      ? 'text-blue-400 hover:text-blue-300'
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={
                  isDark
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
                }
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-8 text-center">
                <div
                  className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto ${
                    isDark ? 'border-blue-400' : 'border-blue-600'
                  }`}
                ></div>
                <p
                  className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Loading...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell
                  className={`w-12 h-12 mx-auto mb-2 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}
                />
                <p
                  className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  No notifications yet
                </p>
              </div>
            ) : (
              <div
                className={`divide-y ${isDark ? 'divide-[#333]' : 'divide-gray-100'}`}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    role="button"
                    tabIndex={0}
                    className={`p-4 transition-colors cursor-pointer ${
                      !notification.read
                        ? isDark
                          ? 'bg-blue-500/10'
                          : 'bg-blue-50'
                        : ''
                    } ${
                      isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    } ${getPriorityColor(notification.priority)}`}
                    onClick={() => {
                      if (!notification.read) {
                        handleMarkAsRead(notification.id)
                      }
                      if (notification.actionUrl) {
                        setIsOpen(false)
                        router.push(notification.actionUrl)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!notification.read) {
                          handleMarkAsRead(notification.id)
                        }
                        if (notification.actionUrl) {
                          setIsOpen(false)
                          router.push(notification.actionUrl)
                        }
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="text-xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          {notification.message}
                        </p>
                        {notification.documentTitle && (
                          <p
                            className={`text-xs mt-1 truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                          >
                            📄 {notification.documentTitle}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                          >
                            {formatDate(notification.createdAt)}
                          </span>
                          {notification.actorName && (
                            <>
                              <span
                                className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
                              >
                                •
                              </span>
                              <span
                                className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                              >
                                from {notification.actorName}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Mark as Read Button */}
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMarkAsRead(notification.id)
                          }}
                          className={`flex-shrink-0 p-1 transition-colors ${
                            isDark
                              ? 'text-gray-500 hover:text-blue-400'
                              : 'text-gray-400 hover:text-blue-600'
                          }`}
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

          {/* Footer */}
          {notifications.length > 0 && (
            <div
              className={`p-3 border-t text-center ${isDark ? 'border-[#333]' : 'border-gray-200'}`}
            >
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push('/account/notifications')
                }}
                className={`text-sm font-medium ${
                  isDark
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
