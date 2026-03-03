/**
 * Personalized Memory Model Types
 * 
 * Types for learning individual forgetting curves for each student
 * and concept, replacing population-average spaced repetition schedules.
 */

// ============================================================================
// Memory Observation Types
// ============================================================================

export interface MemoryObservation {
  conceptId: string
  timestamp: Date
  
  // Recall attempt
  recalled: boolean
  responseTimeMs: number
  confidence: number          // 0-1, how confident the student was
  
  // Context
  timeSinceLastReviewMs: number
  reviewNumber: number        // How many times this has been reviewed
  
  // Review type
  reviewType: 'initial' | 'spaced' | 'remediation' | 'test'
}

// ============================================================================
// Half-Life Regression Model
// ============================================================================

export interface PersonalizedHalfLife {
  conceptId: string
  conceptName: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  
  // Core half-life estimate
  halfLifeSeconds: number     // Time until 50% retention probability
  halfLifeUncertainty: number // Standard deviation of estimate
  
  // Model parameters
  baseHalfLife: number        // Initial estimate before personalization
  learningRate: number        // How much each review strengthens
  decayMultiplier: number     // Individual decay speed (1.0 = average)
  
  // History
  observations: MemoryObservation[]
  totalReviews: number
  totalRecalls: number
  lastReview: Date
  
  // Prediction accuracy
  predictionHistory: Array<{
    predictedRetention: number
    actualRecall: boolean
    timestamp: Date
  }>
  calibrationScore: number    // How accurate predictions have been
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

// ============================================================================
// User Memory Model
// ============================================================================

export interface PersonalMemoryModel {
  userId: string
  lastUpdated: Date
  
  // Per-concept models
  conceptModels: Map<string, PersonalizedHalfLife>
  
  // Global parameters (learned across all concepts)
  globalParams: GlobalMemoryParams
  
  // Subject-specific modifiers
  subjectModifiers: Record<string, SubjectMemoryModifier>
  
  // Time-of-day effects (optional)
  timeOfDayModifiers?: number[]  // 24 values, one per hour
}

export interface GlobalMemoryParams {
  // Average learning characteristics
  avgHalfLife: number
  avgLearningRate: number
  avgDecayMultiplier: number
  
  // Variability
  halfLifeVariance: number
  
  // Calibration
  overallCalibration: number  // How well predictions match reality
}

export interface SubjectMemoryModifier {
  subject: string
  halfLifeMultiplier: number  // > 1 means longer retention in this subject
  learningRateMultiplier: number
}

// ============================================================================
// Review Scheduling Types
// ============================================================================

export interface ReviewSchedule {
  userId: string
  generatedAt: Date
  validUntil: Date
  
  // Scheduled reviews
  items: ScheduledReview[]
  
  // Summary stats
  totalDueNow: number
  totalDueSoon: number        // Due in next 24 hours
  estimatedTimeMinutes: number
}

export interface ScheduledReview {
  conceptId: string
  conceptName: string
  subject: string
  
  // Scheduling
  optimalReviewTime: Date
  dueStatus: 'overdue' | 'due_now' | 'due_soon' | 'not_due'
  priority: number            // 0-1, higher = more urgent
  
  // Current state
  currentRetention: number    // Estimated current retention (0-1)
  targetRetention: number     // What we're aiming for
  
  // Problem recommendation
  suggestedProblemId?: string
}

export interface ReviewPriority {
  conceptId: string
  priority: number
  
  // Factors contributing to priority
  factors: {
    retentionUrgency: number  // How close to forgetting
    overdueness: number       // How past due date
    difficulty: number        // Harder concepts get priority
    importance: number        // Core vs peripheral concept
  }
}

// ============================================================================
// Retention Prediction Types
// ============================================================================

export interface RetentionPrediction {
  conceptId: string
  predictedRetention: number  // 0-1
  confidence: number          // 0-1
  
  // Time to target retention
  timeToTarget: {
    target90: number          // Seconds until 90% retention
    target80: number
    target70: number
    target50: number
  }
}

// ============================================================================
// Optimization Types
// ============================================================================

export interface ScheduleOptimization {
  // Given available study time, what's the best schedule?
  availableTimeMinutes: number
  
  // Constraints
  maxNewConcepts: number
  focusSubjects?: string[]
  
  // Optimization result
  optimizedSchedule: ScheduledReview[]
  expectedRetentionGain: number
  conceptsCovered: number
}

// ============================================================================
// Firestore Document Types
// ============================================================================

export interface MemoryModelDoc {
  userId: string
  lastUpdated: Date
  
  // Store as array for Firestore
  conceptModels: Array<{
    conceptId: string
    data: Omit<PersonalizedHalfLife, 'observations' | 'predictionHistory'>
  }>
  
  globalParams: GlobalMemoryParams
  subjectModifiers: Record<string, SubjectMemoryModifier>
}

export interface MemoryObservationDoc {
  userId: string
  conceptId: string
  timestamp: Date
  observation: MemoryObservation
}

// ============================================================================
// Collection Constants
// ============================================================================

export const MEMORY_COLLECTIONS = {
  MODELS: 'userMemoryModels',
  OBSERVATIONS: 'memoryObservations',
  SCHEDULES: 'reviewSchedules',
} as const

export const MEMORY_CONFIG = {
  // Default half-life parameters
  DEFAULT_HALF_LIFE_SECONDS: 7 * 24 * 60 * 60,  // 7 days
  MIN_HALF_LIFE_SECONDS: 60 * 60,               // 1 hour minimum
  MAX_HALF_LIFE_SECONDS: 90 * 24 * 60 * 60,     // 90 days maximum
  
  // Learning rate
  DEFAULT_LEARNING_RATE: 0.1,
  MIN_LEARNING_RATE: 0.01,
  MAX_LEARNING_RATE: 0.5,
  
  // Retention targets
  DEFAULT_TARGET_RETENTION: 0.9,
  MIN_REVIEW_RETENTION: 0.5,    // Don't let retention drop below 50%
  
  // Observation limits
  MAX_OBSERVATIONS_PER_CONCEPT: 50,
  MAX_PREDICTION_HISTORY: 20,
  
  // Update frequency
  MIN_OBSERVATIONS_FOR_PERSONALIZATION: 3,
} as const
