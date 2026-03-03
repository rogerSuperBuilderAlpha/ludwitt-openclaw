'use client'

/**
 * DueForReview Component
 *
 * Dashboard widget that shows concepts due for review today.
 * Makes the spaced repetition system VISIBLE to users, addressing
 * the learning science finding that invisible algorithms undermine trust.
 *
 * Features:
 * - Shows count of concepts due today by subject
 * - Displays review streak
 * - Quick access to start a review session
 * - Visual urgency for overdue items
 */

import { useState, useEffect } from 'react'
import {
  Brain,
  ArrowRight,
  Fire,
  Clock,
  CheckCircle,
  Calculator,
  BookOpen,
  Columns,
  Flask,
  PuzzlePiece,
  Calendar,
} from '@phosphor-icons/react'
import { Subject } from '@/lib/types/spaced-repetition'

interface DueReviewData {
  dueToday: Array<{
    id: string
    conceptName: string
    subject: Subject
    masteryLevel: string
  }>
  overdueCount: number
  totalDue: number
  bySubject: {
    [key in Subject]?: {
      count: number
    }
  }
  reviewStreak: number
  // New: Upcoming reviews with specific dates
  upcomingReviews?: Array<{
    date: string // e.g., "Jan 15"
    count: number
    concepts: string[]
  }>
}

interface DueForReviewProps {
  userId: string
  onStartReview?: () => void
  onViewSchedule?: () => void
  compact?: boolean
}

const SUBJECT_CONFIG: Record<
  Subject,
  { icon: React.ReactNode; color: string; label: string }
> = {
  math: {
    icon: <Calculator size={16} weight="fill" />,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    label: 'Math',
  },
  reading: {
    icon: <BookOpen size={16} weight="fill" />,
    color: 'text-green-600 bg-green-50 border-green-200',
    label: 'Reading',
  },
  latin: {
    icon: <Columns size={16} weight="fill" />,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    label: 'Latin',
  },
  greek: {
    icon: <Flask size={16} weight="fill" />,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    label: 'Greek',
  },
  logic: {
    icon: <PuzzlePiece size={16} weight="fill" />,
    color: 'text-red-600 bg-red-50 border-red-200',
    label: 'Logic',
  },
}

export function DueForReview({
  userId,
  onStartReview,
  onViewSchedule,
  compact = false,
}: DueForReviewProps) {
  const [data, setData] = useState<DueReviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDueReviews() {
      try {
        setLoading(true)
        const response = await fetch('/api/basics/spaced-repetition/due', {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch due reviews')
        }

        const result = await response.json()
        if (result.success) {
          setData(result.data)
        } else {
          throw new Error(result.error || 'Unknown error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load')
        // Set empty data for new users
        setData({
          dueToday: [],
          overdueCount: 0,
          totalDue: 0,
          bySubject: {},
          reviewStreak: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchDueReviews()
    }
  }, [userId])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-16 bg-gray-100 rounded mb-3"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    )
  }

  // Generate sample upcoming reviews for demonstration
  // In production, this would come from the API
  const getUpcomingReviews = () => {
    const today = new Date()
    const upcoming = []
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const monthDay = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      // Simulate some reviews scheduled
      if (i <= 3) {
        upcoming.push({
          date: monthDay,
          count: Math.max(1, 4 - i),
          concepts:
            i === 1
              ? ['Algebraic Equations', 'Verb Conjugation']
              : i === 2
                ? ['Reading Inference']
                : ['Greek Vocabulary'],
        })
      }
    }
    return upcoming
  }

  const upcomingReviews = data?.upcomingReviews || getUpcomingReviews()

  // No reviews tracked yet - show compact onboarding message
  if (!data || data.totalDue === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={18} weight="fill" className="text-purple-600" />
            <h3 className="font-semibold text-gray-900 text-sm">
              Due for Review
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <CheckCircle size={16} className="text-purple-500" />
              <span className="text-xs">
                {data?.reviewStreak === 0
                  ? 'No concepts yet'
                  : 'All caught up!'}
              </span>
            </div>
            {data && data.reviewStreak > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-full">
                <Fire size={12} weight="fill" className="text-orange-500" />
                <span className="text-xs font-medium text-orange-600">
                  {data.reviewStreak}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const subjectsWithDue = Object.entries(data.bySubject).filter(
    ([, val]) => val && val.count > 0
  ) as [Subject, { count: number }][]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm mb-4">
      {/* Header with due count inline */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Brain size={18} weight="fill" className="text-purple-600" />
          <h3 className="font-semibold text-gray-900 text-sm">
            Due for Review
          </h3>
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
              data.overdueCount > 0 ? 'bg-red-50' : 'bg-purple-50'
            }`}
          >
            {data.overdueCount > 0 && (
              <Clock size={12} className="text-red-500" />
            )}
            <span
              className={`text-sm font-bold ${
                data.overdueCount > 0 ? 'text-red-600' : 'text-purple-600'
              }`}
            >
              {data.totalDue}
            </span>
            <span className="text-xs text-gray-600">due</span>
          </div>
        </div>

        {/* Streak badge */}
        {data.reviewStreak > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-full">
            <Fire size={12} weight="fill" className="text-orange-500" />
            <span className="text-xs font-bold text-orange-600">
              {data.reviewStreak}
            </span>
          </div>
        )}
      </div>

      {/* Subject breakdown + action in one row */}
      <div className="flex items-center justify-between gap-2">
        {/* Subject badges */}
        <div className="flex flex-wrap gap-1.5">
          {subjectsWithDue.map(([subject, val]) => {
            const config = SUBJECT_CONFIG[subject]
            return (
              <div
                key={subject}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-xs ${config.color}`}
              >
                {config.icon}
                <span className="font-medium">{val.count}</span>
              </div>
            )
          })}
          {data.overdueCount > 0 && (
            <span className="text-xs text-red-600">
              {data.overdueCount} overdue
            </span>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={onStartReview}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Brain size={14} weight="fill" />
          Review
        </button>
      </div>
    </div>
  )
}
