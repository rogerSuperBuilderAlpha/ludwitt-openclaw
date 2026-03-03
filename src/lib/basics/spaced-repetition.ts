/**
 * Spaced Repetition System for Ludwitt Basics
 * 
 * Implements evidence-based spacing algorithms to optimize long-term retention
 * based on the 10-20% retention interval rule and Smolen's MAPK dynamics.
 */

import { Timestamp } from 'firebase-admin/firestore'

export interface SpacedItem {
  problemId: string
  lastSeen: Date
  easinessFactor: number  // 1.3-2.5, adjusted by performance
  interval: number        // days until next review
  consecutiveCorrect: number
  totalReviews: number
  lastPerformance: number // 0-1 accuracy score
  skillTags: string[]     // Associated skills for this problem
  createdAt: Date
  updatedAt: Date
}

export interface SpacingScheduler {
  userId: string
  mathItems: Map<string, SpacedItem>
  readingItems: Map<string, SpacedItem>
  lastUpdated: Date
}

/**
 * Calculate optimal spacing interval using modified SM-2 algorithm
 * with neuroscience-based adjustments for the 10-20% retention rule
 */
export function calculateOptimalSpacing(
  item: SpacedItem,
  performanceScore: number,
  targetRetentionDays: number = 30
): SpacedItem {
  const updatedItem = { ...item }
  updatedItem.lastPerformance = performanceScore
  updatedItem.totalReviews += 1
  updatedItem.lastSeen = new Date()
  updatedItem.updatedAt = new Date()

  // Performance thresholds based on learning science research
  const EXCELLENT_THRESHOLD = 0.9
  const GOOD_THRESHOLD = 0.7
  const STRUGGLING_THRESHOLD = 0.5

  if (performanceScore >= EXCELLENT_THRESHOLD) {
    // Excellent performance - increase interval significantly
    updatedItem.consecutiveCorrect += 1
    updatedItem.easinessFactor = Math.min(2.5, updatedItem.easinessFactor + 0.15)
    
    // For first few reviews, use conservative but progressive spacing
    if (updatedItem.totalReviews === 1) {
      updatedItem.interval = 2 // First excellent performance gets 2-day interval
    } else if (updatedItem.totalReviews === 2) {
      updatedItem.interval = 4 // Second excellent performance gets 4-day interval
    } else {
      // Apply 10-20% rule: optimal spacing = 10-20% of target retention interval
      const optimalSpacingRatio = 0.15 // 15% midpoint
      updatedItem.interval = Math.max(
        updatedItem.interval * updatedItem.easinessFactor,
        targetRetentionDays * optimalSpacingRatio
      )
    }
  } else if (performanceScore >= GOOD_THRESHOLD) {
    // Good performance - moderate increase
    updatedItem.consecutiveCorrect += 1
    updatedItem.easinessFactor = Math.min(2.5, updatedItem.easinessFactor + 0.05)
    updatedItem.interval = Math.max(1, updatedItem.interval * 1.2)
  } else if (performanceScore >= STRUGGLING_THRESHOLD) {
    // Struggling - reset with shorter interval
    updatedItem.consecutiveCorrect = 0
    updatedItem.easinessFactor = Math.max(1.3, updatedItem.easinessFactor - 0.15)
    updatedItem.interval = Math.max(1, updatedItem.interval * 0.6)
  } else {
    // Poor performance - significant reset
    updatedItem.consecutiveCorrect = 0
    updatedItem.easinessFactor = Math.max(1.3, updatedItem.easinessFactor - 0.25)
    updatedItem.interval = 1 // Review tomorrow
  }

  // Cap maximum interval to prevent problems from disappearing
  updatedItem.interval = Math.min(updatedItem.interval, 90) // Max 3 months

  return updatedItem
}

/**
 * Determine if a spaced item is due for review
 */
export function isItemDueForReview(item: SpacedItem): boolean {
  const daysSinceLastSeen = (Date.now() - item.lastSeen.getTime()) / (1000 * 60 * 60 * 24)
  return daysSinceLastSeen >= item.interval
}

/**
 * Get items due for review, sorted by priority
 */
export function getItemsDueForReview(
  items: Map<string, SpacedItem>,
  maxItems: number = 10
): SpacedItem[] {
  const dueItems = Array.from(items.values())
    .filter(isItemDueForReview)
    .sort((a, b) => {
      // Priority factors:
      // 1. How overdue (days past due date)
      // 2. Lower ease factor (struggling items)
      // 3. Fewer consecutive correct (needs more practice)
      
      const aDaysOverdue = (Date.now() - a.lastSeen.getTime()) / (1000 * 60 * 60 * 24) - a.interval
      const bDaysOverdue = (Date.now() - b.lastSeen.getTime()) / (1000 * 60 * 60 * 24) - b.interval
      
      // First sort by how overdue
      if (Math.abs(aDaysOverdue - bDaysOverdue) > 1) {
        return bDaysOverdue - aDaysOverdue // More overdue first
      }
      
      // Then by ease factor (lower = more struggling)
      if (Math.abs(a.easinessFactor - b.easinessFactor) > 0.1) {
        return a.easinessFactor - b.easinessFactor // Lower ease first
      }
      
      // Finally by consecutive correct (fewer = needs more practice)
      return a.consecutiveCorrect - b.consecutiveCorrect
    })

  return dueItems.slice(0, maxItems)
}

/**
 * Create a new spaced item for a problem
 */
export function createSpacedItem(
  problemId: string,
  skillTags: string[] = []
): SpacedItem {
  return {
    problemId,
    lastSeen: new Date(0), // Never seen before
    easinessFactor: 2.0,   // Starting ease factor
    interval: 1,           // Review tomorrow initially
    consecutiveCorrect: 0,
    totalReviews: 0,
    lastPerformance: 0,
    skillTags,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * Update spaced repetition after a problem attempt
 */
export function updateSpacedRepetition(
  scheduler: SpacingScheduler,
  subject: 'math' | 'reading',
  problemId: string,
  correct: boolean,
  timeSpent: number,
  skillTags: string[] = []
): SpacingScheduler {
  const items = subject === 'math' ? scheduler.mathItems : scheduler.readingItems
  
  // Get or create spaced item
  let item = items.get(problemId)
  if (!item) {
    item = createSpacedItem(problemId, skillTags)
  }

  // Calculate performance score based on correctness and time
  // Fast correct answers get higher scores than slow correct answers
  let performanceScore = correct ? 1 : 0
  
  if (correct && timeSpent > 0) {
    // Adjust for response time - faster responses indicate better mastery
    // This is a simple heuristic that can be refined based on problem type
    const expectedTime = 60 // 60 seconds baseline
    const timeMultiplier = Math.max(0.5, Math.min(1.0, expectedTime / timeSpent))
    performanceScore *= timeMultiplier
  }

  // Update the spaced item
  const updatedItem = calculateOptimalSpacing(item, performanceScore)
  items.set(problemId, updatedItem)

  return {
    ...scheduler,
    lastUpdated: new Date()
  }
}

/**
 * Get recommended problems for spaced repetition practice
 */
export function getSpacedRepetitionRecommendations(
  scheduler: SpacingScheduler,
  subject: 'math' | 'reading',
  count: number = 3
): string[] {
  const items = subject === 'math' ? scheduler.mathItems : scheduler.readingItems
  const dueItems = getItemsDueForReview(items, count)
  return dueItems.map(item => item.problemId)
}

