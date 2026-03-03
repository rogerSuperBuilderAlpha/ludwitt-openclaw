/**
 * Date Helper Utilities
 * 
 * Common date formatting and manipulation functions
 */

// EST timezone identifier
const EST_TIMEZONE = 'America/New_York'

/**
 * Get today's date in YYYY-MM-DD format (EST timezone)
 * Daily XP resets at midnight EST
 */
export function getTodayDate(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: EST_TIMEZONE })
}

/**
 * Get milliseconds until midnight EST
 * Used for countdown timer on daily XP reset
 */
export function getMillisUntilMidnightEST(): number {
  const now = new Date()
  
  // Get current time in EST
  const estNow = new Date(now.toLocaleString('en-US', { timeZone: EST_TIMEZONE }))
  
  // Calculate midnight EST (next day)
  const midnightEST = new Date(estNow)
  midnightEST.setDate(midnightEST.getDate() + 1)
  midnightEST.setHours(0, 0, 0, 0)
  
  // Convert midnight EST back to local time for accurate diff
  // Get the offset between local and EST
  const estMidnightStr = midnightEST.toLocaleString('en-US', { timeZone: EST_TIMEZONE })
  const estMidnightDate = new Date(estMidnightStr)
  
  // Calculate remaining time
  const diff = midnightEST.getTime() - estNow.getTime()
  return Math.max(0, diff)
}

/**
 * Format milliseconds to HH:MM:SS countdown string
 */
export function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Get start of day for a given date
 */
export function getStartOfDay(date: Date = new Date()): Date {
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  return start
}

/**
 * Get start of week (Sunday) for a given date
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  const start = getStartOfDay(date)
  const dayOfWeek = start.getDay()
  start.setDate(start.getDate() - dayOfWeek)
  return start
}

/**
 * Get start of month for a given date
 */
export function getStartOfMonth(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get start of year for a given date
 */
export function getStartOfYear(date: Date = new Date()): Date {
  return new Date(date.getFullYear(), 0, 1)
}

/**
 * Get date N days ago from today
 */
export function getDateDaysAgo(days: number): Date {
  const result = new Date()
  result.setDate(result.getDate() - days)
  return result
}

/**
 * Format date to YYYY-MM-DD string (ISO format)
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

/** @deprecated Use formatDateISO instead */
export const formatDate = formatDateISO

/**
 * Calculate date range for a period
 */
export function getDateRangeForPeriod(period: 'day' | 'week' | 'month' | 'year' | 'all-time'): {
  start: Date
  end: Date
} {
  const now = new Date()
  let start: Date

  switch (period) {
    case 'day':
      start = getStartOfDay(now)
      break
    case 'week':
      start = getStartOfWeek(now)
      break
    case 'month':
      start = getStartOfMonth(now)
      break
    case 'year':
      start = getStartOfYear(now)
      break
    case 'all-time':
    default:
      start = new Date(0) // Beginning of time
      break
  }

  return { start, end: now }
}

/**
 * Get the Monday of the current week (Week starts on Monday, ends on Sunday)
 */
export function getMondayOfCurrentWeek(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ...
  // If today is Sunday (0), we need to go back 6 days. Otherwise go back (dayOfWeek - 1) days.
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(today)
  monday.setDate(today.getDate() - daysToMonday)
  monday.setHours(0, 0, 0, 0)
  return monday
}

/**
 * Get the first day of the current month
 */
export function getFirstOfCurrentMonth(): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
}

/**
 * Get date range info for XP display tooltips
 */
export function getXPDateRangeInfo(): {
  weekStart: Date
  weekEnd: Date
  monthStart: Date
  monthEnd: Date
  yearStart: Date
  yearEnd: Date
} {
  const today = new Date()
  const weekStart = getMondayOfCurrentWeek()
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6) // Sunday
  
  const monthStart = getFirstOfCurrentMonth()
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0) // Last day of month
  
  const yearStart = new Date(today.getFullYear(), 0, 1)
  const yearEnd = new Date(today.getFullYear(), 11, 31)
  
  return { weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd }
}

/**
 * Format a date as "Jan 5" or "Jan 5, 2026"
 */
export function formatDateShort(date: Date, includeYear = false): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  if (includeYear) {
    options.year = 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

