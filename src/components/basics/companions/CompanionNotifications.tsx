'use client'

/**
 * Companion Notifications Dropdown
 * Shows alerts about companions needing attention
 */

import { useState, useRef, useEffect } from 'react'
import { Bell, Cookie, Heart, Lightning, Star, X } from '@phosphor-icons/react'
import {
  SubjectCompanion,
  Subject,
  SUBJECT_INFO,
  getMood,
} from '@/data/companions/attributes'

interface CompanionNotification {
  id: string
  subject: Subject
  companionName: string
  emoji: string
  type: 'hungry' | 'unhappy' | 'tired' | 'evolve'
  message: string
  priority: number // 1 = highest
}

interface CompanionNotificationsProps {
  companions: Record<Subject, SubjectCompanion | null>
  onCompanionClick: (subject: Subject) => void
  onEvolveClick: (subject: Subject) => void
}

export function CompanionNotifications({
  companions,
  onCompanionClick,
  onEvolveClick,
}: CompanionNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generate notifications from companion states
  const notifications: CompanionNotification[] = []

  Object.entries(companions).forEach(([subject, companion]) => {
    if (!companion) return
    const subj = subject as Subject

    // Check for evolution
    if (companion.pendingEvolution) {
      notifications.push({
        id: `${subject}-evolve`,
        subject: subj,
        companionName: companion.name,
        emoji: companion.currentEmoji,
        type: 'evolve',
        message: `${companion.name} is ready to evolve!`,
        priority: 1,
      })
    }

    // Check hunger
    if (companion.hunger < 30) {
      notifications.push({
        id: `${subject}-hungry`,
        subject: subj,
        companionName: companion.name,
        emoji: companion.currentEmoji,
        type: 'hungry',
        message: `${companion.name} is hungry!`,
        priority: companion.hunger < 15 ? 2 : 3,
      })
    }

    // Check happiness
    if (companion.happiness < 30) {
      notifications.push({
        id: `${subject}-unhappy`,
        subject: subj,
        companionName: companion.name,
        emoji: companion.currentEmoji,
        type: 'unhappy',
        message: `${companion.name} wants to play!`,
        priority: companion.happiness < 15 ? 2 : 3,
      })
    }

    // Check energy (low energy = tired, needs rest)
    if (companion.energy < 20) {
      notifications.push({
        id: `${subject}-tired`,
        subject: subj,
        companionName: companion.name,
        emoji: companion.currentEmoji,
        type: 'tired',
        message: `${companion.name} is tired`,
        priority: 4,
      })
    }
  })

  // Sort by priority
  notifications.sort((a, b) => a.priority - b.priority)

  const hasNotifications = notifications.length > 0
  const hasUrgent = notifications.some((n) => n.priority <= 2)

  const getNotificationIcon = (type: CompanionNotification['type']) => {
    switch (type) {
      case 'hungry':
        return (
          <Cookie
            size={14}
            weight="fill"
            style={{ color: 'var(--b-warning)' }}
          />
        )
      case 'unhappy':
        return (
          <Heart size={14} weight="fill" style={{ color: 'var(--b-latin)' }} />
        )
      case 'tired':
        return <Lightning size={14} style={{ color: 'var(--b-text-muted)' }} />
      case 'evolve':
        return (
          <Star size={14} weight="fill" style={{ color: 'var(--b-writing)' }} />
        )
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all relative ${
          isOpen ? 'b-bg-muted' : 'hover:b-bg-muted'
        }`}
        aria-label="Companion notifications"
      >
        <Bell
          size={22}
          weight={hasNotifications ? 'fill' : 'regular'}
          className={
            hasUrgent ? 'text-b-warning animate-pulse' : 'b-text-secondary'
          }
        />

        {/* Badge */}
        {hasNotifications && (
          <span
            className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-xs font-bold rounded-full text-white ${
              hasUrgent ? 'animate-bounce' : ''
            }`}
            style={{
              backgroundColor: hasUrgent ? 'var(--b-danger)' : 'var(--b-logic)',
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 max-h-96 overflow-y-auto rounded-xl shadow-b-modal border b-border z-50"
          style={{ backgroundColor: 'var(--b-bg-elevated)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b b-border">
            <h3 className="font-bold b-text-primary">Companion Alerts</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:b-bg-muted rounded"
            >
              <X size={16} className="b-text-muted" />
            </button>
          </div>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <span className="text-3xl block mb-2">🎉</span>
              <p className="b-text-secondary text-sm">
                All companions are happy!
              </p>
            </div>
          ) : (
            <div className="divide-y b-border">
              {notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => {
                    if (notif.type === 'evolve') {
                      onEvolveClick(notif.subject)
                    } else {
                      onCompanionClick(notif.subject)
                    }
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:b-bg-muted transition-colors text-left"
                >
                  <span className="text-2xl">{notif.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notif.type)}
                      <span className="text-sm font-medium b-text-primary truncate">
                        {notif.message}
                      </span>
                    </div>
                    <span className="text-xs b-text-muted">
                      {SUBJECT_INFO[notif.subject].name}
                    </span>
                  </div>
                  {notif.type === 'evolve' && (
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full text-white"
                      style={{
                        background:
                          'linear-gradient(to right, var(--b-writing), var(--b-logic))',
                      }}
                    >
                      ✨
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
