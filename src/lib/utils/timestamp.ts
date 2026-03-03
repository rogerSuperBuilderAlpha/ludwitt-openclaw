import { Timestamp } from 'firebase/firestore'
import { logger } from '@/lib/logger'

/** Union of all values that the timestamp utilities accept. */
export type FirestoreTimestampLike =
  | Timestamp
  | Date
  | string
  | number
  | null
  | undefined
  | Record<string, any> // eslint-disable-line

/**
 * Safely converts various timestamp formats to a Date object
 * Handles Firestore Timestamps, _seconds format, serialized timestamps, and string dates
 */
export function toDate(timestamp: FirestoreTimestampLike): Date {
  if (!timestamp) {
    return new Date(0) // Return epoch for null/undefined
  }

  // Already a Date object
  if (timestamp instanceof Date) {
    return timestamp
  }

  // String or number
  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    return new Date(timestamp)
  }

  // Object-shaped timestamps (Firestore Timestamp, _seconds format, serialized)
  const ts = timestamp as Record<string, unknown>

  // Firestore Timestamp with toDate method
  if (typeof ts.toDate === 'function') {
    return (ts.toDate as () => Date)()
  }

  // Firestore Timestamp object with seconds property
  if (typeof ts.seconds === 'number') {
    return new Date(ts.seconds * 1000)
  }

  // Firestore _seconds format (from API)
  if (typeof ts._seconds === 'number') {
    return new Date(ts._seconds * 1000)
  }

  // Serialized timestamp format from API: {_type: "timestamp", value: "ISO string"}
  if (ts._type === 'timestamp' && typeof ts.value === 'string') {
    return new Date(ts.value)
  }

  return new Date(0)
}

/**
 * Safely converts various timestamp formats to Unix timestamp (milliseconds)
 */
export function toTimestamp(timestamp: FirestoreTimestampLike): number {
  return toDate(timestamp).getTime()
}

/**
 * Formats a timestamp to a localized date string
 */
export function formatDate(timestamp: FirestoreTimestampLike): string {
  if (!timestamp) return 'Unknown'
  try {
    const date = toDate(timestamp)
    // Double-check we got a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      logger.error('FormatDate', 'Invalid date conversion', {
        data: { timestamp, date },
      })
      return 'Invalid Date'
    }
    return date.toLocaleDateString()
  } catch (error) {
    logger.error('FormatDate', 'Error formatting timestamp', {
      error,
      data: { timestamp },
    })
    return 'Error'
  }
}

/**
 * Formats a timestamp to a localized date and time string
 */
export function formatDateTime(timestamp: FirestoreTimestampLike): string {
  if (!timestamp) return 'Unknown'
  try {
    const date = toDate(timestamp)
    // Double-check we got a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      logger.error('FormatDateTime', 'Invalid date conversion', {
        data: { timestamp, date },
      })
      return 'Invalid Date'
    }
    return date.toLocaleString()
  } catch (error) {
    logger.error('FormatDateTime', 'Error formatting timestamp', {
      error,
      data: { timestamp },
    })
    return 'Error'
  }
}

/**
 * Formats a timestamp to a relative time string (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: FirestoreTimestampLike): string {
  if (!timestamp) return 'Unknown'

  const date = toDate(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`

  return formatDate(timestamp)
}

/**
 * Formats a date to a relative time string for past dates (e.g., "2 days ago", "Yesterday", "Today")
 */
export function formatRelativePastDate(date?: Date): string {
  if (!date) return 'Never'
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

/**
 * Formats a date to a relative time string for future dates (e.g., "In 2 days", "Tomorrow")
 */
export function formatRelativeFutureDate(date?: Date): string {
  if (!date) return 'Not scheduled'
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Due now'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays < 7) return `In ${diffDays} days`
  if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`
  return `In ${Math.floor(diffDays / 30)} months`
}

/**
 * Calculates the difference between two timestamps in days
 */
export function daysBetween(
  start: FirestoreTimestampLike,
  end: FirestoreTimestampLike
): number {
  const startDate = toDate(start)
  const endDate = toDate(end)
  const diffMs = endDate.getTime() - startDate.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/**
 * Formats seconds to a MM:SS string (for timers and durations)
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Formats seconds to a longer duration string (e.g., "5 minutes", "1 hour 30 min")
 */
export function formatLongDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds`
  }
  const mins = Math.floor(seconds / 60)
  if (mins < 60) {
    return `${mins} minute${mins === 1 ? '' : 's'}`
  }
  const hours = Math.floor(mins / 60)
  const remainingMins = mins % 60
  if (remainingMins === 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }
  return `${hours} hour${hours === 1 ? '' : 's'} ${remainingMins} min${remainingMins === 1 ? '' : 's'}`
}

/**
 * Recursively converts Firestore document values to plain JS values.
 * Handles Timestamps, nested objects, and arrays.
 * Converts all timestamp-like values to ISO strings.
 */
export function normalizeFirestoreData<T = unknown>(value: unknown): T {
  if (value === null || value === undefined) return value as T

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value as T
  }

  if (value instanceof Date) {
    return value.toISOString() as T
  }

  if (typeof value === 'function') {
    return value as T
  }

  if (Array.isArray(value)) {
    return value.map(normalizeFirestoreData) as T
  }

  // At this point, value is a non-null object
  const obj = value as Record<string, unknown>

  // Firestore Timestamp with toDate method
  if (typeof obj.toDate === 'function') {
    try {
      return (obj.toDate as () => Date)().toISOString() as T
    } catch {
      const date = (obj.toDate as () => Date)()
      return (date instanceof Date ? date.toISOString() : value) as T
    }
  }

  // Firestore Timestamp object with seconds/nanoseconds
  if (typeof obj.seconds === 'number' && typeof obj.nanoseconds === 'number') {
    const millis =
      (obj.seconds as number) * 1000 + (obj.nanoseconds as number) / 1_000_000
    return new Date(millis).toISOString() as T
  }

  // Firestore _seconds format (from API)
  if (
    typeof obj._seconds === 'number' &&
    typeof obj._nanoseconds === 'number'
  ) {
    const millis =
      (obj._seconds as number) * 1000 + (obj._nanoseconds as number) / 1_000_000
    return new Date(millis).toISOString() as T
  }

  // Serialized timestamp format from API: {_type: "timestamp", value: "ISO string"}
  if (obj._type === 'timestamp' && typeof obj.value === 'string') {
    return obj.value as T // Already an ISO string
  }

  // Recursively process plain objects
  if (typeof value === 'object') {
    const converted: Record<string, unknown> = {}
    for (const key of Object.keys(obj)) {
      converted[key] = normalizeFirestoreData(obj[key])
    }
    return converted as T
  }

  return value as T
}
