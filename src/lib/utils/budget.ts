/**
 * Budget Tracking Utilities
 * Calculate burn rate, budget usage, and provide warnings
 */

import { CustomerDocument, DevelopmentSession } from '@/lib/types/customer'

export interface BudgetMetrics {
  budgetType: 'hours' | 'fixed' | 'none'

  // Hours tracking
  budgetHours: number
  actualHours: number
  remainingHours: number
  hoursUsedPercentage: number

  // Amount tracking
  budgetAmount: number
  actualAmount: number
  remainingAmount: number
  amountUsedPercentage: number

  // Hourly rate
  hourlyRate: number

  // Status
  isOverBudget: boolean
  isNearingBudget: boolean // Within warning threshold
  warningThreshold: number

  // Burn rate (hours per day)
  burnRateHoursPerDay: number
  estimatedDaysRemaining: number
}

/**
 * Calculate actual hours spent from sessions
 */
export function calculateActualHours(sessions: DevelopmentSession[]): number {
  return (
    sessions.reduce((total, session) => {
      return total + (session.timeSpentMinutes || 0)
    }, 0) / 60
  ) // Convert minutes to hours
}

/**
 * Calculate budget metrics for a document
 */
export function calculateBudgetMetrics(
  document: CustomerDocument,
  sessions: DevelopmentSession[]
): BudgetMetrics {
  const actualHours = calculateActualHours(sessions)
  const hourlyRate = document.hourlyRate || 0
  const warningThreshold = document.budgetWarningThreshold || 80

  // Determine budget type
  const budgetType = document.budgetType || 'none'

  // Initialize metrics
  let budgetHours = 0
  let budgetAmount = 0

  if (budgetType === 'hours' && document.budgetHours) {
    budgetHours = document.budgetHours
    budgetAmount = budgetHours * hourlyRate
  } else if (budgetType === 'fixed' && document.budgetAmount) {
    budgetAmount = document.budgetAmount
    budgetHours = hourlyRate > 0 ? budgetAmount / hourlyRate : 0
  }

  const actualAmount = actualHours * hourlyRate
  const remainingHours = Math.max(0, budgetHours - actualHours)
  const remainingAmount = Math.max(0, budgetAmount - actualAmount)

  const hoursUsedPercentage =
    budgetHours > 0 ? (actualHours / budgetHours) * 100 : 0
  const amountUsedPercentage =
    budgetAmount > 0 ? (actualAmount / budgetAmount) * 100 : 0

  const isOverBudget = hoursUsedPercentage > 100 || amountUsedPercentage > 100
  const isNearingBudget =
    (hoursUsedPercentage >= warningThreshold && hoursUsedPercentage <= 100) ||
    (amountUsedPercentage >= warningThreshold && amountUsedPercentage <= 100)

  // Calculate burn rate (hours per day)
  const burnRateHoursPerDay = calculateBurnRate(document, sessions)
  const estimatedDaysRemaining =
    burnRateHoursPerDay > 0 ? remainingHours / burnRateHoursPerDay : Infinity

  return {
    budgetType,
    budgetHours,
    actualHours,
    remainingHours,
    hoursUsedPercentage: Math.round(hoursUsedPercentage * 10) / 10,
    budgetAmount,
    actualAmount,
    remainingAmount,
    amountUsedPercentage: Math.round(amountUsedPercentage * 10) / 10,
    hourlyRate,
    isOverBudget,
    isNearingBudget,
    warningThreshold,
    burnRateHoursPerDay,
    estimatedDaysRemaining,
  }
}

/**
 * Calculate burn rate (average hours per day)
 */
export function calculateBurnRate(
  document: CustomerDocument,
  sessions: DevelopmentSession[]
): number {
  if (sessions.length === 0) return 0

  const totalMinutes = sessions.reduce((total, session) => {
    return total + (session.timeSpentMinutes || 0)
  }, 0)

  // Get date range
  const approvedAt = document.approvedAt
  if (!approvedAt) return 0

  const startDate = approvedAt.toDate
    ? approvedAt.toDate()
    : new Date((approvedAt as unknown as { seconds: number }).seconds * 1000)
  const today = new Date()
  const daysSinceStart = Math.max(
    1,
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  )

  const totalHours = totalMinutes / 60
  return totalHours / daysSinceStart
}

/**
 * Get budget status color for UI
 */
export function getBudgetStatusColor(
  percentage: number,
  threshold: number = 80
): {
  bg: string
  text: string
  border: string
} {
  if (percentage >= 100) {
    return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
  } else if (percentage >= threshold) {
    return {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
    }
  } else if (percentage >= 50) {
    return {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
    }
  } else {
    return {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
    }
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format hours
 */
export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`
  }
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  if (minutes === 0) {
    return `${wholeHours}h`
  }
  return `${wholeHours}h ${minutes}m`
}
