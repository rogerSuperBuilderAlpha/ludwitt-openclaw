/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/label-has-associated-control, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  CaretLeft,
  CaretRight,
  Plus,
  Clock,
  X,
  Trash,
} from '@phosphor-icons/react'
import { DevCard, DevButton } from '@/components/developers/v2/ui'
import { useAuth } from '@/components/auth/ClientProvider'
import { useSubmissions } from '@/lib/hooks/developers/useSubmissions'
import { useDevPortalStore } from '@/lib/store/devPortalStore'

interface ScheduleItem {
  id: string
  title: string
  time?: string
  duration?: number // in minutes
  type: 'task' | 'meeting' | 'focus'
  completed?: boolean
}

const SCHEDULE_STORAGE_KEY = 'dev-schedule-items'

/**
 * Schedule Page - Weekly schedule planning
 */
export default function SchedulePage() {
  const { user } = useAuth()
  const { isAdminView } = useDevPortalStore()
  const { submissions } = useSubmissions({
    userId: user?.uid || null,
    isAdmin: isAdminView,
  })

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    return new Date(today.setDate(diff))
  })

  // Scheduled items state - persisted to localStorage
  const [scheduledItems, setScheduledItems] = useState<
    Record<string, ScheduleItem[]>
  >({})
  const [itemsLoaded, setItemsLoaded] = useState(false)

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({
    title: '',
    time: '',
    type: 'task' as ScheduleItem['type'],
  })

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(SCHEDULE_STORAGE_KEY)
    if (stored) {
      try {
        setScheduledItems(JSON.parse(stored))
      } catch {
        setScheduledItems({})
      }
    }
    setItemsLoaded(true)
  }, [])

  // Save to localStorage
  const saveItems = useCallback((items: Record<string, ScheduleItem[]>) => {
    setScheduledItems(items)
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(items))
  }, [])

  // Get week days
  const weekDays = useMemo(() => {
    const days: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      days.push(date)
    }
    return days
  }, [currentWeekStart])

  // Navigate weeks
  const prevWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() - 7)
    setCurrentWeekStart(newStart)
  }

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() + 7)
    setCurrentWeekStart(newStart)
  }

  const goToToday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    setCurrentWeekStart(new Date(today.setDate(diff)))
  }

  // Check if a day is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Get deadlines for a specific day
  const getDeadlinesForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]

    return submissions.filter((s) => {
      if (!s.dueDate) return false

      let dueDate: Date
      if (typeof s.dueDate === 'object' && 'seconds' in s.dueDate) {
        dueDate = new Date(s.dueDate.seconds * 1000)
      } else if (typeof s.dueDate === 'string') {
        dueDate = new Date(s.dueDate)
      } else {
        return false
      }

      return (
        dueDate.toISOString().split('T')[0] === dateStr &&
        s.status !== 'completed' &&
        s.status !== 'archived'
      )
    })
  }

  const formatDayName = (date: Date) => {
    if (!date || isNaN(date.getTime()) || !isFinite(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
  }

  const formatDayNumber = (date: Date) => {
    if (!date || isNaN(date.getTime())) return ''
    return date.getDate()
  }

  const formatMonthYear = (date: Date) => {
    if (!date || isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  // Add item
  const handleAddItem = () => {
    if (!newItem.title.trim() || !selectedDate) return

    const item: ScheduleItem = {
      id: `item-${Date.now()}`,
      title: newItem.title.trim(),
      time: newItem.time || undefined,
      type: newItem.type,
      completed: false,
    }

    const updated = { ...scheduledItems }
    if (!updated[selectedDate]) updated[selectedDate] = []
    updated[selectedDate].push(item)
    saveItems(updated)

    setNewItem({ title: '', time: '', type: 'task' })
    setShowAddModal(false)
    setSelectedDate(null)
  }

  // Toggle item completion
  const toggleItem = (dateKey: string, itemId: string) => {
    const updated = { ...scheduledItems }
    if (updated[dateKey]) {
      updated[dateKey] = updated[dateKey].map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
      saveItems(updated)
    }
  }

  // Delete item
  const deleteItem = (dateKey: string, itemId: string) => {
    const updated = { ...scheduledItems }
    if (updated[dateKey]) {
      updated[dateKey] = updated[dateKey].filter((item) => item.id !== itemId)
      if (updated[dateKey].length === 0) delete updated[dateKey]
      saveItems(updated)
    }
  }

  // Open add modal for a specific date
  const openAddModal = (dateKey: string) => {
    setSelectedDate(dateKey)
    setShowAddModal(true)
  }

  if (!itemsLoaded) return null

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
            gap: 'var(--dev-space-4)',
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
              Schedule
            </h1>
            <p
              style={{
                color: 'var(--dev-text-muted)',
                fontSize: 'var(--dev-text-sm)',
              }}
            >
              {formatMonthYear(currentWeekStart)}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dev-space-2)',
          }}
        >
          <DevButton variant="ghost" size="sm" onClick={prevWeek}>
            <CaretLeft size={16} />
          </DevButton>
          <DevButton variant="secondary" size="sm" onClick={goToToday}>
            Today
          </DevButton>
          <DevButton variant="ghost" size="sm" onClick={nextWeek}>
            <CaretRight size={16} />
          </DevButton>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-4)' }}>
        {/* Week Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 'var(--dev-space-3)',
            minHeight: 400,
          }}
        >
          {weekDays.map((day) => {
            const deadlines = getDeadlinesForDay(day)
            const dateKey = day.toISOString().split('T')[0]
            const items = scheduledItems[dateKey] || []
            const today = isToday(day)

            return (
              <div
                key={dateKey}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Day Header */}
                <div
                  style={{
                    textAlign: 'center',
                    padding: 'var(--dev-space-2)',
                    borderBottom: '1px solid var(--dev-border-subtle)',
                    marginBottom: 'var(--dev-space-2)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--dev-text-xs)',
                      color: today
                        ? 'var(--dev-accent-primary)'
                        : 'var(--dev-text-muted)',
                      textTransform: 'uppercase',
                      fontWeight: 'var(--dev-font-semibold)',
                    }}
                  >
                    {formatDayName(day)}
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: today
                        ? 'var(--dev-accent-primary)'
                        : 'transparent',
                      color: today ? 'white' : 'var(--dev-text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '4px auto 0',
                      fontWeight: 'var(--dev-font-semibold)',
                      fontSize: 'var(--dev-text-sm)',
                    }}
                  >
                    {formatDayNumber(day)}
                  </div>
                </div>

                {/* Day Content */}
                <div
                  style={{
                    flex: 1,
                    background: today
                      ? 'rgba(99, 102, 241, 0.05)'
                      : 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-md)',
                    padding: 'var(--dev-space-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--dev-space-2)',
                    minHeight: 200,
                  }}
                >
                  {/* Deadlines */}
                  {deadlines.map((d) => (
                    <div
                      key={d.id}
                      style={{
                        padding: 'var(--dev-space-2)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderLeft: '3px solid var(--dev-accent-danger)',
                        borderRadius: 'var(--dev-radius-sm)',
                        fontSize: 'var(--dev-text-xs)',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 'var(--dev-font-medium)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {d.googleDocTitle || 'Untitled'}
                      </div>
                      <div style={{ color: 'var(--dev-accent-danger)' }}>
                        Due
                      </div>
                    </div>
                  ))}

                  {/* Scheduled Items */}
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: 'var(--dev-space-2)',
                        background:
                          item.type === 'focus'
                            ? 'rgba(99, 102, 241, 0.1)'
                            : 'var(--dev-bg-elevated)',
                        borderLeft: `3px solid ${
                          item.type === 'focus'
                            ? 'var(--dev-accent-primary)'
                            : item.type === 'meeting'
                              ? 'var(--dev-status-available)'
                              : 'var(--dev-border-default)'
                        }`,
                        borderRadius: 'var(--dev-radius-sm)',
                        fontSize: 'var(--dev-text-xs)',
                        opacity: item.completed ? 0.5 : 1,
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleItem(dateKey, item.id)}
                    >
                      <div
                        style={{
                          fontWeight: 'var(--dev-font-medium)',
                          textDecoration: item.completed
                            ? 'line-through'
                            : 'none',
                          paddingRight: 20,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.time && (
                        <div
                          style={{
                            color: 'var(--dev-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Clock size={10} />
                          {item.time}
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteItem(dateKey, item.id)
                        }}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--dev-text-muted)',
                          padding: 2,
                        }}
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  ))}

                  {/* Add Item Button */}
                  <button
                    onClick={() => openAddModal(dateKey)}
                    style={{
                      marginTop: 'auto',
                      padding: 'var(--dev-space-2)',
                      border: '1px dashed var(--dev-border-default)',
                      borderRadius: 'var(--dev-radius-sm)',
                      background: 'transparent',
                      color: 'var(--dev-text-muted)',
                      fontSize: 'var(--dev-text-xs)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                    }}
                  >
                    <Plus size={12} />
                    Add
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--dev-space-4)',
            marginTop: 'var(--dev-space-4)',
            padding: 'var(--dev-space-3)',
            background: 'var(--dev-bg-muted)',
            borderRadius: 'var(--dev-radius-lg)',
            fontSize: 'var(--dev-text-xs)',
            color: 'var(--dev-text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 12,
                height: 12,
                background: 'rgba(239, 68, 68, 0.3)',
                borderLeft: '3px solid var(--dev-accent-danger)',
                borderRadius: 2,
              }}
            />
            Deadline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 12,
                height: 12,
                background: 'rgba(99, 102, 241, 0.3)',
                borderLeft: '3px solid var(--dev-accent-primary)',
                borderRadius: 2,
              }}
            />
            Focus Block
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 12,
                height: 12,
                background: 'rgba(245, 158, 11, 0.3)',
                borderLeft: '3px solid var(--dev-status-available)',
                borderRadius: 2,
              }}
            />
            Meeting
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowAddModal(false)}
        >
          <DevCard
            padding="lg"
            style={{
              width: 400,
              background: 'var(--dev-bg-elevated, #1a1a1b)',
              border: '1px solid var(--dev-border-default)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--dev-space-4)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--dev-text-lg)',
                  fontWeight: 'var(--dev-font-semibold)',
                }}
              >
                Add Schedule Item
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--dev-text-muted)',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--dev-space-3)',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--dev-text-sm)',
                    marginBottom: 4,
                    color: 'var(--dev-text-secondary)',
                  }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="What do you need to do?"
                  style={{
                    width: '100%',
                    padding: 'var(--dev-space-2) var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 'var(--dev-radius-md)',
                    color: 'var(--dev-text-primary)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--dev-text-sm)',
                    marginBottom: 4,
                    color: 'var(--dev-text-secondary)',
                  }}
                >
                  Time (optional)
                </label>
                <input
                  type="time"
                  value={newItem.time}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, time: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: 'var(--dev-space-2) var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    border: '1px solid var(--dev-border-default)',
                    borderRadius: 'var(--dev-radius-md)',
                    color: 'var(--dev-text-primary)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 'var(--dev-text-sm)',
                    marginBottom: 4,
                    color: 'var(--dev-text-secondary)',
                  }}
                >
                  Type
                </label>
                <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
                  {(['task', 'focus', 'meeting'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewItem((prev) => ({ ...prev, type }))}
                      style={{
                        flex: 1,
                        padding: 'var(--dev-space-2)',
                        background:
                          newItem.type === type
                            ? 'var(--dev-accent-primary)'
                            : 'var(--dev-bg-muted)',
                        border: '1px solid var(--dev-border-default)',
                        borderRadius: 'var(--dev-radius-md)',
                        color:
                          newItem.type === type
                            ? 'white'
                            : 'var(--dev-text-secondary)',
                        fontSize: 'var(--dev-text-sm)',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--dev-space-2)',
                  marginTop: 'var(--dev-space-2)',
                }}
              >
                <DevButton
                  variant="ghost"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </DevButton>
                <DevButton
                  variant="primary"
                  onClick={handleAddItem}
                  style={{ flex: 1 }}
                >
                  Add Item
                </DevButton>
              </div>
            </div>
          </DevCard>
        </div>
      )}
    </div>
  )
}
