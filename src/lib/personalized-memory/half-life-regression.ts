/**
 * Half-Life Regression Algorithm
 * 
 * Implements personalized forgetting curve estimation using
 * half-life regression (inspired by Duolingo's research).
 * 
 * The model: P(recall) = 2^(-Δt / h)
 * Where:
 *   - P(recall) = probability of successful recall
 *   - Δt = time since last review
 *   - h = half-life (time until 50% retention probability)
 */

import {
  PersonalizedHalfLife,
  MemoryObservation,
  MEMORY_CONFIG
} from './types'

// ============================================================================
// Core Algorithm
// ============================================================================

/**
 * Create a new half-life model for a concept
 */
export function createHalfLifeModel(
  conceptId: string,
  conceptName: string,
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
  initialHalfLife?: number
): PersonalizedHalfLife {
  return {
    conceptId,
    conceptName,
    subject,
    halfLifeSeconds: initialHalfLife || MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
    halfLifeUncertainty: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS * 0.5, // 50% uncertainty initially
    baseHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
    learningRate: MEMORY_CONFIG.DEFAULT_LEARNING_RATE,
    decayMultiplier: 1.0,
    observations: [],
    totalReviews: 0,
    totalRecalls: 0,
    lastReview: new Date(0),
    predictionHistory: [],
    calibrationScore: 0.5, // Neutral starting calibration
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * Update half-life model after a recall attempt
 */
export function updateHalfLife(
  model: PersonalizedHalfLife,
  observation: MemoryObservation
): PersonalizedHalfLife {
  const updated = { ...model }
  updated.updatedAt = new Date()
  
  // Add observation
  updated.observations = [
    ...model.observations.slice(-(MEMORY_CONFIG.MAX_OBSERVATIONS_PER_CONCEPT - 1)),
    observation
  ]
  
  // Update counts
  updated.totalReviews += 1
  if (observation.recalled) {
    updated.totalRecalls += 1
  }
  updated.lastReview = observation.timestamp
  
  // Record prediction accuracy
  const predictedRetention = predictRetention(model, observation.timeSinceLastReviewMs / 1000)
  updated.predictionHistory = [
    ...model.predictionHistory.slice(-(MEMORY_CONFIG.MAX_PREDICTION_HISTORY - 1)),
    {
      predictedRetention,
      actualRecall: observation.recalled,
      timestamp: observation.timestamp
    }
  ]
  
  // Update calibration score
  updated.calibrationScore = calculateCalibration(updated.predictionHistory)
  
  // Update half-life using gradient descent-like approach
  updated.halfLifeSeconds = updateHalfLifeEstimate(
    model,
    observation,
    predictedRetention
  )
  
  // Update learning rate based on observation
  updated.learningRate = updateLearningRate(model, observation)
  
  // Update uncertainty (decreases with more observations)
  updated.halfLifeUncertainty = calculateUncertainty(updated)
  
  // Clamp half-life to valid range
  updated.halfLifeSeconds = Math.max(
    MEMORY_CONFIG.MIN_HALF_LIFE_SECONDS,
    Math.min(updated.halfLifeSeconds, MEMORY_CONFIG.MAX_HALF_LIFE_SECONDS)
  )
  
  return updated
}

/**
 * Predict retention probability at a given time
 */
export function predictRetention(
  model: PersonalizedHalfLife,
  secondsSinceReview: number
): number {
  // Exponential decay: P(recall) = 2^(-Δt / h)
  return Math.pow(2, -secondsSinceReview / model.halfLifeSeconds)
}

/**
 * Calculate optimal review time to maintain target retention
 */
export function getOptimalReviewTime(
  model: PersonalizedHalfLife,
  targetRetention: number = MEMORY_CONFIG.DEFAULT_TARGET_RETENTION
): number {
  // Solve for t in: targetRetention = 2^(-t / h)
  // t = -h * log2(targetRetention)
  return -model.halfLifeSeconds * Math.log2(targetRetention)
}

/**
 * Get expected retention at a future time
 */
export function getRetentionAtTime(
  model: PersonalizedHalfLife,
  futureDate: Date
): number {
  const secondsSinceReview = (futureDate.getTime() - model.lastReview.getTime()) / 1000
  return predictRetention(model, secondsSinceReview)
}

// ============================================================================
// Internal Update Functions
// ============================================================================

/**
 * Update half-life estimate based on observation
 */
function updateHalfLifeEstimate(
  model: PersonalizedHalfLife,
  observation: MemoryObservation,
  predictedRetention: number
): number {
  const { recalled, timeSinceLastReviewMs, confidence } = observation
  const timeSinceLastReviewSeconds = timeSinceLastReviewMs / 1000
  
  // Calculate error between prediction and actual outcome
  const actualOutcome = recalled ? 1 : 0
  const error = actualOutcome - predictedRetention
  
  // Adjust half-life based on error
  // If recalled when we predicted forgetting → increase half-life
  // If forgot when we predicted remembering → decrease half-life
  
  let adjustment: number
  
  if (recalled) {
    // Successful recall - memory is stronger than estimated
    // Increase half-life proportionally to how surprising this was
    const surprise = 1 - predictedRetention // Higher surprise if we predicted low retention
    adjustment = 1 + (model.learningRate * surprise)
    
    // Bonus for high confidence recalls
    if (confidence > 0.8) {
      adjustment *= 1.1
    }
    
    // Extra bonus for recalls after long delays
    const delayRatio = timeSinceLastReviewSeconds / model.halfLifeSeconds
    if (delayRatio > 1) {
      adjustment *= (1 + 0.1 * Math.min(delayRatio, 3))
    }
  } else {
    // Failed recall - memory is weaker than estimated
    // Decrease half-life proportionally to how surprising this was
    const surprise = predictedRetention // Higher surprise if we predicted high retention
    adjustment = 1 - (model.learningRate * 0.5 * surprise)
    
    // Never reduce below 50% in one step
    adjustment = Math.max(0.5, adjustment)
  }
  
  return model.halfLifeSeconds * adjustment
}

/**
 * Update learning rate based on observation patterns
 */
function updateLearningRate(
  model: PersonalizedHalfLife,
  observation: MemoryObservation
): number {
  // Learning rate should decrease as we get more confident in the estimate
  // But increase if observations are inconsistent
  
  const baseRate = model.learningRate
  const totalObs = model.observations.length
  
  if (totalObs < MEMORY_CONFIG.MIN_OBSERVATIONS_FOR_PERSONALIZATION) {
    // Keep high learning rate early on
    return Math.min(MEMORY_CONFIG.MAX_LEARNING_RATE, baseRate)
  }
  
  // Check consistency of recent observations
  const recentObs = model.observations.slice(-5)
  const recallRate = recentObs.filter(o => o.recalled).length / recentObs.length
  
  // If recall rate is very high or very low, we can be more confident
  if (recallRate > 0.8 || recallRate < 0.2) {
    return Math.max(MEMORY_CONFIG.MIN_LEARNING_RATE, baseRate * 0.9)
  }
  
  // If recall rate is variable, keep learning rate higher
  return baseRate
}

/**
 * Calculate uncertainty in half-life estimate
 */
function calculateUncertainty(model: PersonalizedHalfLife): number {
  const totalObs = model.observations.length
  
  if (totalObs === 0) {
    return model.halfLifeSeconds * 0.5
  }
  
  // Uncertainty decreases with more observations
  const baseFactor = 0.5 / Math.sqrt(totalObs)
  
  // Uncertainty increases if calibration is poor
  const calibrationPenalty = (1 - model.calibrationScore) * 0.3
  
  return model.halfLifeSeconds * (baseFactor + calibrationPenalty)
}

/**
 * Calculate calibration score from prediction history
 */
function calculateCalibration(
  predictions: PersonalizedHalfLife['predictionHistory']
): number {
  if (predictions.length < 3) {
    return 0.5 // Neutral calibration with insufficient data
  }
  
  // Bin predictions by confidence level
  const bins: { predicted: number[]; actual: boolean[] }[] = [
    { predicted: [], actual: [] }, // 0-0.2
    { predicted: [], actual: [] }, // 0.2-0.4
    { predicted: [], actual: [] }, // 0.4-0.6
    { predicted: [], actual: [] }, // 0.6-0.8
    { predicted: [], actual: [] }  // 0.8-1.0
  ]
  
  for (const p of predictions) {
    const binIndex = Math.min(4, Math.floor(p.predictedRetention * 5))
    bins[binIndex].predicted.push(p.predictedRetention)
    bins[binIndex].actual.push(p.actualRecall)
  }
  
  // Calculate calibration error for each bin
  let totalError = 0
  let totalWeight = 0
  
  for (const bin of bins) {
    if (bin.predicted.length > 0) {
      const avgPredicted = bin.predicted.reduce((a, b) => a + b, 0) / bin.predicted.length
      const actualRate = bin.actual.filter(a => a).length / bin.actual.length
      const error = Math.abs(avgPredicted - actualRate)
      
      totalError += error * bin.predicted.length
      totalWeight += bin.predicted.length
    }
  }
  
  // Convert error to score (1 = perfect, 0 = worst)
  const avgError = totalWeight > 0 ? totalError / totalWeight : 0.5
  return 1 - avgError
}

// ============================================================================
// Batch Operations
// ============================================================================

/**
 * Estimate initial half-life from performance data
 */
export function estimateInitialHalfLife(
  successRate: number,
  avgTimeBetweenReviewsSeconds: number
): number {
  // If success rate is high with long intervals, half-life is long
  // If success rate is low even with short intervals, half-life is short
  
  if (successRate >= 0.9) {
    // Very high retention - half-life is at least 2x the interval
    return avgTimeBetweenReviewsSeconds * 2
  } else if (successRate >= 0.7) {
    // Good retention - half-life is about the interval
    return avgTimeBetweenReviewsSeconds
  } else if (successRate >= 0.5) {
    // Moderate retention - half-life is less than interval
    return avgTimeBetweenReviewsSeconds * 0.5
  } else {
    // Poor retention - half-life is much less than interval
    return avgTimeBetweenReviewsSeconds * 0.25
  }
}

/**
 * Merge multiple half-life models (for aggregating across concepts)
 */
export function aggregateHalfLifes(
  models: PersonalizedHalfLife[]
): {
  avgHalfLife: number
  minHalfLife: number
  maxHalfLife: number
  avgCalibration: number
} {
  if (models.length === 0) {
    return {
      avgHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      minHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      maxHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      avgCalibration: 0.5
    }
  }
  
  const halfLives = models.map(m => m.halfLifeSeconds)
  const calibrations = models.map(m => m.calibrationScore)
  
  return {
    avgHalfLife: halfLives.reduce((a, b) => a + b, 0) / halfLives.length,
    minHalfLife: Math.min(...halfLives),
    maxHalfLife: Math.max(...halfLives),
    avgCalibration: calibrations.reduce((a, b) => a + b, 0) / calibrations.length
  }
}
