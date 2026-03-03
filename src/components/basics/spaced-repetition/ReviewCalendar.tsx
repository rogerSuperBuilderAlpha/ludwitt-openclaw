'use client'

/**
 * ReviewCalendar Component
 *
 * Shows a 7-day calendar view of upcoming spaced repetition reviews.
 * Makes the review schedule VISIBLE to users, addressing the learning
 * science finding that invisible spaced repetition is ineffective.
 *
 * Features:
 * - Weekly calendar showing upcoming reviews
 * - Color-coded by subject
 * - Shows streak and on-time rate
 * - Click to view day's reviews
 */

import { useState, useEffect } from 'react'
import {
  Calendar,
  Fire,
  TrendUp,
  Clock,
  CheckCircle,
  Calculator,
  BookOpen,
  Columns,
  Flask,
  PuzzlePiece,
  X,
} from '@phosphor-icons/react'
import {
  Subject,
  ReviewSchedule,
  DailyReviewSummary,
} from '@/lib/types/spaced-repetition'
import { Portal } from '../Portal'
import { logger } from '@/lib/logger'

interface ReviewCalendarProps {
  userId?: string
  isOpen?: boolean
  onClose?: () => void
  /** If true, renders inline without modal wrapper */
  inline?: boolean
}

const SUBJECT_ICONS: Record<Subject, React.ReactNode> = {
  math: <Calculator size={12} weight="fill" />,
  reading: <BookOpen size={12} weight="fill" />,
  latin: <Columns size={12} weight="fill" />,
  greek: <Flask size={12} weight="fill" />,
  logic: <PuzzlePiece size={12} weight="fill" />,
}

const SUBJECT_COLORS: Record<Subject, string> = {
  math: 'bg-blue-500',
  reading: 'bg-green-500',
  latin: 'bg-amber-500',
  greek: 'bg-purple-500',
  logic: 'bg-red-500',
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getDayName(dateStr: string): string {
  const date = new Date(dateStr)
  return DAY_NAMES[date.getDay() === 0 ? 6 : date.getDay() - 1]
}

function getDayNumber(dateStr: string): string {
  return new Date(dateStr).getDate().toString()
}

function isToday(dateStr: string): boolean {
  return dateStr === formatDate(new Date())
}

export function ReviewCalendar({
  userId,
  isOpen = true,
  onClose,
  inline = false,
}: ReviewCalendarProps) {
  const [schedule, setSchedule] = useState<ReviewSchedule | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<DailyReviewSummary | null>(
    null
  )

  useEffect(() => {
    async function fetchSchedule() {
      if (!isOpen) return

      try {
        setLoading(true)
        const response = await fetch('/api/basics/spaced-repetition/schedule', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        })

        if (!response.ok) throw new Error('Failed to fetch schedule')

        const result = await response.json()
        if (result.success) {
          setSchedule(result.data)
        }
      } catch (err) {
        logger.error('ReviewCalendar', 'Failed to load review schedule', {
          error: err,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [isOpen, userId])

  if (!isOpen) return null

  // Content to render (shared between modal and inline)
  const calendarContent = (
    <>
      {loading ? (
        <div className="space-y-4">
          <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ) : schedule ? (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Fire size={18} weight="fill" className="text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {schedule.reviewStreak}
              </div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendUp size={18} weight="fill" className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(schedule.onTimeReviewRate * 100)}%
              </div>
              <div className="text-xs text-gray-600">On-Time</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle
                  size={18}
                  weight="fill"
                  className="text-purple-500"
                />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {schedule.totalConceptsTracked}
              </div>
              <div className="text-xs text-gray-600">Concepts</div>
            </div>
          </div>

          {/* Mastery Breakdown */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Mastery Levels
            </h4>
            <div className="flex gap-2">
              <div className="flex-1 bg-blue-100 rounded px-2 py-1 text-center">
                <div className="text-sm font-bold text-blue-700">
                  {schedule.conceptsByMastery.new}
                </div>
                <div className="text-[10px] text-blue-600">New</div>
              </div>
              <div className="flex-1 bg-amber-100 rounded px-2 py-1 text-center">
                <div className="text-sm font-bold text-amber-700">
                  {schedule.conceptsByMastery.learning}
                </div>
                <div className="text-[10px] text-amber-600">Learning</div>
              </div>
              <div className="flex-1 bg-purple-100 rounded px-2 py-1 text-center">
                <div className="text-sm font-bold text-purple-700">
                  {schedule.conceptsByMastery.reviewing}
                </div>
                <div className="text-[10px] text-purple-600">Reviewing</div>
              </div>
              <div className="flex-1 bg-green-100 rounded px-2 py-1 text-center">
                <div className="text-sm font-bold text-green-700">
                  {schedule.conceptsByMastery.mastered}
                </div>
                <div className="text-[10px] text-green-600">Mastered</div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Next 7 Days
          </h4>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {schedule.upcomingByDay.map((day, index) => {
              const today = isToday(day.date)
              const hasReviews = day.dueCount > 0
              const subjects = Object.keys(day.subjects) as Subject[]

              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day)}
                  className={`
                          p-2 rounded-lg border transition-all text-center
                          ${
                            today
                              ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-200'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                          ${selectedDay?.date === day.date ? 'ring-2 ring-purple-400' : ''}
                        `}
                >
                  <div className="text-[10px] text-gray-500 mb-0.5">
                    {getDayName(day.date)}
                  </div>
                  <div
                    className={`text-lg font-bold mb-1 ${
                      today ? 'text-purple-600' : 'text-gray-900'
                    }`}
                  >
                    {getDayNumber(day.date)}
                  </div>

                  {hasReviews ? (
                    <>
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        {day.dueCount}
                      </div>
                      <div className="flex justify-center gap-0.5 flex-wrap">
                        {subjects.slice(0, 3).map((subject) => (
                          <div
                            key={subject}
                            className={`w-2 h-2 rounded-full ${SUBJECT_COLORS[subject]}`}
                            title={subject}
                          />
                        ))}
                        {subjects.length > 3 && (
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-400">-</div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected Day Details */}
          {selectedDay && selectedDay.dueCount > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {isToday(selectedDay.date)
                  ? 'Today'
                  : getDayName(selectedDay.date)}
                &apos;s Reviews
              </h4>
              <div className="space-y-2">
                {(
                  Object.entries(selectedDay.subjects) as [
                    Subject,
                    { dueCount: number; completedCount: number },
                  ][]
                ).map(([subject, counts]) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between bg-white rounded px-3 py-2 border border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${SUBJECT_COLORS[subject].replace('bg-', 'bg-').replace('500', '100')}`}
                      >
                        {SUBJECT_ICONS[subject]}
                      </div>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {subject}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {counts.dueCount} concept
                      {counts.dueCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tip */}
          <p className="text-xs text-gray-500 text-center mt-4">
            💡 Reviewing on schedule optimizes your long-term memory retention
          </p>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No review schedule available yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Complete problems to build your review schedule.
          </p>
        </div>
      )}
    </>
  )

  // Inline rendering (for embedding in ProgressAnalytics)
  if (inline) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} weight="fill" className="text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">Review Schedule</h3>
        </div>
        {calendarContent}
      </div>
    )
  }

  // Modal rendering (original)
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
          style={{ background: '#ffffff' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar size={24} weight="fill" className="text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Review Schedule
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto flex-1">{calendarContent}</div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </Portal>
  )
}
