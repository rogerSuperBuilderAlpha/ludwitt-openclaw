/**
 * Review Scheduler
 * 
 * Generates optimal review schedules based on personalized
 * half-life models.
 */

import {
  PersonalMemoryModel,
  PersonalizedHalfLife,
  ReviewSchedule,
  ScheduledReview,
  ReviewPriority,
  ScheduleOptimization,
  MEMORY_CONFIG
} from './types'
import { predictRetention, getOptimalReviewTime } from './half-life-regression'

// ============================================================================
// Schedule Generation
// ============================================================================

/**
 * Generate a review schedule for a user
 */
export function generateReviewSchedule(
  model: PersonalMemoryModel,
  options?: {
    maxItems?: number
    targetRetention?: number
    includeNotDue?: boolean
  }
): ReviewSchedule {
  const now = new Date()
  const maxItems = options?.maxItems ?? 20
  const targetRetention = options?.targetRetention ?? MEMORY_CONFIG.DEFAULT_TARGET_RETENTION
  const includeNotDue = options?.includeNotDue ?? false
  
  // Calculate priority for each concept
  const priorities: ReviewPriority[] = []
  
  for (const [conceptId, halfLife] of model.conceptModels) {
    const priority = calculatePriority(halfLife, targetRetention, now)
    priorities.push(priority)
  }
  
  // Sort by priority
  priorities.sort((a, b) => b.priority - a.priority)
  
  // Filter to due items (or all if includeNotDue)
  const filteredPriorities = includeNotDue 
    ? priorities 
    : priorities.filter(p => p.factors.overdueness >= 0)
  
  // Take top N items
  const topPriorities = filteredPriorities.slice(0, maxItems)
  
  // Convert to scheduled reviews
  const items: ScheduledReview[] = topPriorities.map(priority => {
    const halfLife = model.conceptModels.get(priority.conceptId)!
    return createScheduledReview(halfLife, priority, targetRetention, now)
  })
  
  // Calculate summary stats
  const dueNow = items.filter(i => i.dueStatus === 'due_now' || i.dueStatus === 'overdue').length
  const dueSoon = items.filter(i => i.dueStatus === 'due_soon').length
  
  // Estimate time (2 minutes per item average)
  const estimatedTimeMinutes = items.length * 2
  
  return {
    userId: model.userId,
    generatedAt: now,
    validUntil: new Date(now.getTime() + 60 * 60 * 1000), // Valid for 1 hour
    items,
    totalDueNow: dueNow,
    totalDueSoon: dueSoon,
    estimatedTimeMinutes
  }
}

/**
 * Calculate priority for a concept
 */
function calculatePriority(
  halfLife: PersonalizedHalfLife,
  targetRetention: number,
  now: Date
): ReviewPriority {
  const timeSinceReview = (now.getTime() - halfLife.lastReview.getTime()) / 1000
  const currentRetention = predictRetention(halfLife, timeSinceReview)
  const optimalReviewTime = getOptimalReviewTime(halfLife, targetRetention)
  const overdueness = (timeSinceReview - optimalReviewTime) / optimalReviewTime
  
  // Factor 1: Retention urgency (lower retention = higher priority)
  const retentionUrgency = 1 - currentRetention
  
  // Factor 2: How overdue (positive = overdue, negative = not due yet)
  const overduenessFactor = Math.max(0, overdueness)
  
  // Factor 3: Difficulty (shorter half-life = harder = higher priority)
  const difficultyFactor = 1 - (halfLife.halfLifeSeconds / MEMORY_CONFIG.MAX_HALF_LIFE_SECONDS)
  
  // Factor 4: Importance (based on total reviews - more reviewed = more important)
  const importanceFactor = Math.min(1, halfLife.totalReviews / 20)
  
  // Combine factors with weights
  const priority = 
    retentionUrgency * 0.4 +
    overduenessFactor * 0.3 +
    difficultyFactor * 0.2 +
    importanceFactor * 0.1
  
  return {
    conceptId: halfLife.conceptId,
    priority,
    factors: {
      retentionUrgency,
      overdueness,
      difficulty: difficultyFactor,
      importance: importanceFactor
    }
  }
}

/**
 * Create a scheduled review item
 */
function createScheduledReview(
  halfLife: PersonalizedHalfLife,
  priority: ReviewPriority,
  targetRetention: number,
  now: Date
): ScheduledReview {
  const timeSinceReview = (now.getTime() - halfLife.lastReview.getTime()) / 1000
  const currentRetention = predictRetention(halfLife, timeSinceReview)
  const optimalReviewTime = getOptimalReviewTime(halfLife, targetRetention)
  const optimalReviewDate = new Date(halfLife.lastReview.getTime() + optimalReviewTime * 1000)
  
  // Determine due status
  let dueStatus: ScheduledReview['dueStatus']
  const hourInSeconds = 3600
  const dayInSeconds = 86400
  
  if (timeSinceReview > optimalReviewTime + dayInSeconds) {
    dueStatus = 'overdue'
  } else if (timeSinceReview > optimalReviewTime - hourInSeconds) {
    dueStatus = 'due_now'
  } else if (timeSinceReview > optimalReviewTime - dayInSeconds) {
    dueStatus = 'due_soon'
  } else {
    dueStatus = 'not_due'
  }
  
  return {
    conceptId: halfLife.conceptId,
    conceptName: halfLife.conceptName,
    subject: halfLife.subject,
    optimalReviewTime: optimalReviewDate,
    dueStatus,
    priority: priority.priority,
    currentRetention,
    targetRetention
  }
}

// ============================================================================
// Schedule Optimization
// ============================================================================

/**
 * Optimize a schedule given time constraints
 */
export function optimizeSchedule(
  model: PersonalMemoryModel,
  constraints: Omit<ScheduleOptimization, 'optimizedSchedule' | 'expectedRetentionGain' | 'conceptsCovered'>
): ScheduleOptimization {
  const { availableTimeMinutes, maxNewConcepts, focusSubjects } = constraints
  
  // Generate full schedule
  const fullSchedule = generateReviewSchedule(model, { 
    includeNotDue: true,
    maxItems: 100 
  })
  
  // Filter by subject if specified
  let candidates = fullSchedule.items
  if (focusSubjects && focusSubjects.length > 0) {
    candidates = candidates.filter(item => focusSubjects.includes(item.subject))
  }
  
  // Estimate time per item based on subject
  const timePerItem: Record<string, number> = {
    math: 2,
    reading: 3,
    latin: 2.5,
    greek: 2.5,
    logic: 2
  }
  
  // Greedy selection within time budget
  const selected: ScheduledReview[] = []
  let totalTime = 0
  let newConceptCount = 0
  
  for (const item of candidates) {
    const itemTime = timePerItem[item.subject] || 2
    
    // Check time constraint
    if (totalTime + itemTime > availableTimeMinutes) {
      break
    }
    
    // Check new concept constraint
    const halfLife = model.conceptModels.get(item.conceptId)
    const isNew = halfLife && halfLife.totalReviews < 3
    if (isNew) {
      if (maxNewConcepts !== undefined && newConceptCount >= maxNewConcepts) {
        continue // Skip this new concept
      }
      newConceptCount++
    }
    
    selected.push(item)
    totalTime += itemTime
  }
  
  // Calculate expected retention gain
  let totalRetentionGain = 0
  for (const item of selected) {
    // Reviewing will boost retention to ~0.95
    const gain = 0.95 - item.currentRetention
    totalRetentionGain += gain
  }
  
  return {
    availableTimeMinutes,
    maxNewConcepts,
    focusSubjects,
    optimizedSchedule: selected,
    expectedRetentionGain: totalRetentionGain,
    conceptsCovered: selected.length
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get concepts due for review
 */
export function getDueConcepts(
  model: PersonalMemoryModel,
  threshold: number = MEMORY_CONFIG.MIN_REVIEW_RETENTION
): PersonalizedHalfLife[] {
  const now = new Date()
  const dueConcepts: PersonalizedHalfLife[] = []
  
  for (const [_, halfLife] of model.conceptModels) {
    const timeSinceReview = (now.getTime() - halfLife.lastReview.getTime()) / 1000
    const currentRetention = predictRetention(halfLife, timeSinceReview)
    
    if (currentRetention <= threshold) {
      dueConcepts.push(halfLife)
    }
  }
  
  // Sort by retention (lowest first)
  return dueConcepts.sort((a, b) => {
    const timeA = (now.getTime() - a.lastReview.getTime()) / 1000
    const timeB = (now.getTime() - b.lastReview.getTime()) / 1000
    return predictRetention(a, timeA) - predictRetention(b, timeB)
  })
}

/**
 * Estimate when a concept will drop below target retention
 */
export function estimateDropTime(
  halfLife: PersonalizedHalfLife,
  targetRetention: number = MEMORY_CONFIG.MIN_REVIEW_RETENTION
): Date {
  const optimalSeconds = getOptimalReviewTime(halfLife, targetRetention)
  return new Date(halfLife.lastReview.getTime() + optimalSeconds * 1000)
}

/**
 * Get schedule summary statistics
 */
export function getScheduleSummary(schedule: ReviewSchedule): {
  bySubject: Record<string, number>
  byStatus: Record<string, number>
  avgPriority: number
  avgRetention: number
} {
  const bySubject: Record<string, number> = {}
  const byStatus: Record<string, number> = {}
  let totalPriority = 0
  let totalRetention = 0
  
  for (const item of schedule.items) {
    bySubject[item.subject] = (bySubject[item.subject] || 0) + 1
    byStatus[item.dueStatus] = (byStatus[item.dueStatus] || 0) + 1
    totalPriority += item.priority
    totalRetention += item.currentRetention
  }
  
  return {
    bySubject,
    byStatus,
    avgPriority: schedule.items.length > 0 ? totalPriority / schedule.items.length : 0,
    avgRetention: schedule.items.length > 0 ? totalRetention / schedule.items.length : 1
  }
}
