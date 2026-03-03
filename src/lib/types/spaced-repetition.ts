/**
 * Spaced Repetition Types for User-Facing Visibility
 * 
 * These types support making the spaced repetition system visible to users,
 * addressing the learning science finding that "invisible" learning algorithms
 * undermine student trust and self-regulation.
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Core Review Item Types
// ============================================================================

export type Subject = 'math' | 'reading' | 'latin' | 'greek' | 'logic'

export type MasteryLevel = 
  | 'new'           // First encounter
  | 'learning'      // < 3 successful reviews
  | 'reviewing'     // 3-7 successful reviews
  | 'mastered'      // 7+ successful reviews with high ease factor

export interface ConceptReviewItem {
  id: string
  userId: string
  subject: Subject
  conceptId: string
  conceptName: string
  conceptDescription?: string
  
  // SM-2 Algorithm Data
  easeFactor: number       // 1.3-2.5, adjusted by performance
  interval: number         // Days until next review
  repetitions: number      // Total successful reviews
  
  // Timing
  lastReviewedAt: Date
  nextReviewAt: Date
  createdAt: Date
  updatedAt: Date
  
  // Performance tracking
  totalAttempts: number
  correctAttempts: number
  averageResponseTime: number // seconds
  lastPerformanceScore: number // 0-1
  
  // Mastery tracking
  masteryLevel: MasteryLevel
  consecutiveCorrect: number
  
  // Problem association
  relatedProblemIds: string[]
  skillTags: string[]
}

// ============================================================================
// Review Schedule Types
// ============================================================================

export interface DailyReviewSummary {
  date: string // YYYY-MM-DD
  dueCount: number
  completedCount: number
  subjects: {
    [key in Subject]?: {
      dueCount: number
      completedCount: number
    }
  }
}

export interface ReviewSchedule {
  userId: string
  
  // Today's reviews
  dueToday: ConceptReviewItem[]
  overdueCount: number
  
  // Upcoming schedule (next 7 days)
  upcomingByDay: DailyReviewSummary[]
  
  // Stats
  totalConceptsTracked: number
  conceptsByMastery: {
    new: number
    learning: number
    reviewing: number
    mastered: number
  }
  
  // Streak tracking
  reviewStreak: number
  lastReviewDate: string | null // YYYY-MM-DD
  longestStreak: number
  
  // On-time rate
  onTimeReviewRate: number // 0-1, % of reviews done on or before due date
  
  updatedAt: Date
}

// ============================================================================
// Calendar View Types
// ============================================================================

export interface CalendarDay {
  date: string // YYYY-MM-DD
  isToday: boolean
  isPast: boolean
  isFuture: boolean
  
  // Review data
  dueItems: CalendarReviewItem[]
  completedItems: CalendarReviewItem[]
  
  // Summary
  totalDue: number
  totalCompleted: number
  subjectBreakdown: {
    [key in Subject]?: number
  }
}

export interface CalendarReviewItem {
  conceptId: string
  conceptName: string
  subject: Subject
  masteryLevel: MasteryLevel
  isOverdue: boolean
  daysOverdue?: number
}

export interface WeeklyCalendar {
  weekStart: string // YYYY-MM-DD (Monday)
  weekEnd: string   // YYYY-MM-DD (Sunday)
  days: CalendarDay[]
  
  // Week summary
  totalDueThisWeek: number
  totalCompletedThisWeek: number
  projectedCompletionRate: number // Based on current pace
}

// ============================================================================
// Post-Problem Scheduling Types
// ============================================================================

export interface ReviewScheduleMessage {
  conceptId: string
  conceptName: string
  subject: Subject
  nextReviewDate: Date
  daysUntilReview: number
  message: string // Human-readable message
  isFirstReview: boolean
}

// ============================================================================
// API Response Types
// ============================================================================

export interface GetDueReviewsResponse {
  success: boolean
  data?: {
    dueToday: ConceptReviewItem[]
    overdueCount: number
    totalDue: number
    bySubject: {
      [key in Subject]?: {
        items: ConceptReviewItem[]
        count: number
      }
    }
    reviewStreak: number
  }
  error?: string
}

export interface GetReviewScheduleResponse {
  success: boolean
  data?: ReviewSchedule
  error?: string
}

export interface GetReviewCalendarResponse {
  success: boolean
  data?: WeeklyCalendar
  error?: string
}

export interface RecordReviewResponse {
  success: boolean
  data?: {
    updatedItem: ConceptReviewItem
    xpEarned: number
    nextReviewDate: Date
    scheduleMessage: ReviewScheduleMessage
    streakUpdated: boolean
    newStreak?: number
  }
  error?: string
}

// ============================================================================
// Firestore Document Types
// ============================================================================

export interface UserSpacedRepetitionDoc {
  userId: string
  
  // Streak tracking
  reviewStreak: number
  longestStreak: number
  lastReviewDate: string | null // YYYY-MM-DD
  
  // Performance stats
  totalReviewsCompleted: number
  totalConceptsTracked: number
  onTimeReviewCount: number
  lateReviewCount: number
  
  // Settings
  dailyReviewGoal: number // Target reviews per day
  reminderEnabled: boolean
  reminderTime?: string // HH:MM format
  
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Subcollection: spacedRepetition/{userId}/concepts/{conceptId}
export interface ConceptReviewDoc {
  conceptId: string
  conceptName: string
  conceptDescription?: string
  subject: Subject
  
  // SM-2 data
  easeFactor: number
  interval: number
  repetitions: number
  
  // Timing (stored as Timestamps in Firestore)
  lastReviewedAt: Timestamp
  nextReviewAt: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
  
  // Performance
  totalAttempts: number
  correctAttempts: number
  averageResponseTime: number
  lastPerformanceScore: number
  
  // Mastery
  masteryLevel: MasteryLevel
  consecutiveCorrect: number
  
  // Relations
  relatedProblemIds: string[]
  skillTags: string[]
}
