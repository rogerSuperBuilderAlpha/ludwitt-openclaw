/**
 * Spaced Repetition Components
 *
 * These components make the spaced repetition system VISIBLE to users,
 * addressing the learning science finding that invisible algorithms
 * undermine student trust and self-regulation.
 */

export { DueForReview } from './DueForReview'
export { ReviewCalendar } from './ReviewCalendar'
export { ReviewScheduleMessage } from './ReviewScheduleMessage'

// Re-export types for convenience
export type {
  ConceptReviewItem,
  ReviewSchedule,
  ReviewScheduleMessage as ReviewScheduleMessageType,
  Subject,
  MasteryLevel,
} from '@/lib/types/spaced-repetition'
