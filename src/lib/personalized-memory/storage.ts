/**
 * Personalized Memory Storage
 * 
 * Firestore operations for memory models and observations.
 */

import { db } from '@/lib/firebase/admin'
import {
  PersonalMemoryModel,
  PersonalizedHalfLife,
  MemoryObservation,
  MemoryModelDoc,
  MemoryObservationDoc,
  GlobalMemoryParams,
  SubjectMemoryModifier,
  MEMORY_COLLECTIONS,
  MEMORY_CONFIG
} from './types'

// ============================================================================
// Memory Model Storage
// ============================================================================

/**
 * Get a user's memory model
 */
export async function getMemoryModel(
  userId: string
): Promise<PersonalMemoryModel | null> {
  const doc = await db
    .collection(MEMORY_COLLECTIONS.MODELS)
    .doc(userId)
    .get()
  
  if (!doc.exists) {
    return null
  }
  
  const data = doc.data() as MemoryModelDoc
  
  // Convert array back to Map
  const conceptModels = new Map<string, PersonalizedHalfLife>()
  for (const { conceptId, data: halfLifeData } of data.conceptModels) {
    conceptModels.set(conceptId, {
      ...halfLifeData,
      conceptId,
      observations: [], // Not stored in main doc
      predictionHistory: [] // Not stored in main doc
    } as PersonalizedHalfLife)
  }
  
  return {
    userId: data.userId,
    lastUpdated: toDate(data.lastUpdated),
    conceptModels,
    globalParams: data.globalParams,
    subjectModifiers: data.subjectModifiers
  }
}

/**
 * Store a user's memory model
 */
export async function storeMemoryModel(
  model: PersonalMemoryModel
): Promise<void> {
  // Convert Map to array for Firestore
  const conceptModelsArray = Array.from(model.conceptModels.entries()).map(
    ([conceptId, halfLife]) => ({
      conceptId,
      data: {
        conceptId: halfLife.conceptId,
        conceptName: halfLife.conceptName,
        subject: halfLife.subject,
        halfLifeSeconds: halfLife.halfLifeSeconds,
        halfLifeUncertainty: halfLife.halfLifeUncertainty,
        baseHalfLife: halfLife.baseHalfLife,
        learningRate: halfLife.learningRate,
        decayMultiplier: halfLife.decayMultiplier,
        totalReviews: halfLife.totalReviews,
        totalRecalls: halfLife.totalRecalls,
        lastReview: halfLife.lastReview,
        calibrationScore: halfLife.calibrationScore,
        createdAt: halfLife.createdAt,
        updatedAt: halfLife.updatedAt
        // observations and predictionHistory stored separately
      }
    })
  )
  
  const modelDoc: MemoryModelDoc = {
    userId: model.userId,
    lastUpdated: model.lastUpdated,
    conceptModels: conceptModelsArray,
    globalParams: model.globalParams,
    subjectModifiers: model.subjectModifiers
  }
  
  await db
    .collection(MEMORY_COLLECTIONS.MODELS)
    .doc(model.userId)
    .set(modelDoc)
}

/**
 * Create a new memory model for a user
 */
export async function createMemoryModel(
  userId: string
): Promise<PersonalMemoryModel> {
  const model: PersonalMemoryModel = {
    userId,
    lastUpdated: new Date(),
    conceptModels: new Map(),
    globalParams: {
      avgHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      avgLearningRate: MEMORY_CONFIG.DEFAULT_LEARNING_RATE,
      avgDecayMultiplier: 1.0,
      halfLifeVariance: 0,
      overallCalibration: 0.5
    },
    subjectModifiers: {}
  }
  
  await storeMemoryModel(model)
  return model
}

/**
 * Update a single concept in the memory model
 */
export async function updateConceptModel(
  userId: string,
  halfLife: PersonalizedHalfLife
): Promise<void> {
  const model = await getMemoryModel(userId)
  
  if (!model) {
    // Create new model with this concept
    const newModel: PersonalMemoryModel = {
      userId,
      lastUpdated: new Date(),
      conceptModels: new Map([[halfLife.conceptId, halfLife]]),
      globalParams: {
        avgHalfLife: halfLife.halfLifeSeconds,
        avgLearningRate: halfLife.learningRate,
        avgDecayMultiplier: 1.0,
        halfLifeVariance: 0,
        overallCalibration: halfLife.calibrationScore
      },
      subjectModifiers: {}
    }
    await storeMemoryModel(newModel)
    return
  }
  
  // Update existing model
  model.conceptModels.set(halfLife.conceptId, halfLife)
  model.lastUpdated = new Date()
  
  // Update global params
  model.globalParams = calculateGlobalParams(model)
  
  await storeMemoryModel(model)
}

// ============================================================================
// Memory Observation Storage
// ============================================================================

/**
 * Store a memory observation
 */
export async function storeObservation(
  userId: string,
  observation: MemoryObservation
): Promise<void> {
  const observationDoc: MemoryObservationDoc = {
    userId,
    conceptId: observation.conceptId,
    timestamp: observation.timestamp,
    observation
  }
  
  await db
    .collection(MEMORY_COLLECTIONS.OBSERVATIONS)
    .add(observationDoc)
}

/**
 * Get recent observations for a concept
 */
export async function getConceptObservations(
  userId: string,
  conceptId: string,
  limit: number = 20
): Promise<MemoryObservation[]> {
  const snapshot = await db
    .collection(MEMORY_COLLECTIONS.OBSERVATIONS)
    .where('userId', '==', userId)
    .where('conceptId', '==', conceptId)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as MemoryObservationDoc
    return {
      ...data.observation,
      timestamp: toDate(data.observation.timestamp)
    }
  })
}

/**
 * Get all recent observations for a user
 */
export async function getUserObservations(
  userId: string,
  limit: number = 100
): Promise<MemoryObservation[]> {
  const snapshot = await db
    .collection(MEMORY_COLLECTIONS.OBSERVATIONS)
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as MemoryObservationDoc
    return {
      ...data.observation,
      timestamp: toDate(data.observation.timestamp)
    }
  })
}

// ============================================================================
// Analytics Queries
// ============================================================================

/**
 * Get memory statistics for a user
 */
export async function getMemoryStats(
  userId: string
): Promise<{
  totalConcepts: number
  avgRetention: number
  conceptsNeedingReview: number
  avgHalfLife: number
  strongestSubject: string | null
  weakestSubject: string | null
}> {
  const model = await getMemoryModel(userId)
  
  if (!model || model.conceptModels.size === 0) {
    return {
      totalConcepts: 0,
      avgRetention: 1,
      conceptsNeedingReview: 0,
      avgHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      strongestSubject: null,
      weakestSubject: null
    }
  }
  
  const now = new Date()
  let totalRetention = 0
  let needingReview = 0
  const subjectHalfLives: Record<string, number[]> = {}
  
  for (const [_, halfLife] of model.conceptModels) {
    const timeSinceReview = (now.getTime() - halfLife.lastReview.getTime()) / 1000
    const retention = Math.pow(2, -timeSinceReview / halfLife.halfLifeSeconds)
    
    totalRetention += retention
    if (retention < MEMORY_CONFIG.DEFAULT_TARGET_RETENTION) {
      needingReview++
    }
    
    if (!subjectHalfLives[halfLife.subject]) {
      subjectHalfLives[halfLife.subject] = []
    }
    subjectHalfLives[halfLife.subject].push(halfLife.halfLifeSeconds)
  }
  
  // Find strongest and weakest subjects by average half-life
  let strongestSubject: string | null = null
  let weakestSubject: string | null = null
  let maxAvg = -Infinity
  let minAvg = Infinity
  
  for (const [subject, halfLives] of Object.entries(subjectHalfLives)) {
    const avg = halfLives.reduce((a, b) => a + b, 0) / halfLives.length
    if (avg > maxAvg) {
      maxAvg = avg
      strongestSubject = subject
    }
    if (avg < minAvg) {
      minAvg = avg
      weakestSubject = subject
    }
  }
  
  return {
    totalConcepts: model.conceptModels.size,
    avgRetention: totalRetention / model.conceptModels.size,
    conceptsNeedingReview: needingReview,
    avgHalfLife: model.globalParams.avgHalfLife,
    strongestSubject,
    weakestSubject
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

function toDate(value: unknown): Date {
  if (value instanceof Date) {
    return value
  }
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate()
  }
  if (typeof value === 'string') {
    return new Date(value)
  }
  return new Date()
}

function calculateGlobalParams(model: PersonalMemoryModel): GlobalMemoryParams {
  const concepts = Array.from(model.conceptModels.values())
  
  if (concepts.length === 0) {
    return {
      avgHalfLife: MEMORY_CONFIG.DEFAULT_HALF_LIFE_SECONDS,
      avgLearningRate: MEMORY_CONFIG.DEFAULT_LEARNING_RATE,
      avgDecayMultiplier: 1.0,
      halfLifeVariance: 0,
      overallCalibration: 0.5
    }
  }
  
  const halfLives = concepts.map(c => c.halfLifeSeconds)
  const learningRates = concepts.map(c => c.learningRate)
  const calibrations = concepts.map(c => c.calibrationScore)
  
  const avgHalfLife = halfLives.reduce((a, b) => a + b, 0) / halfLives.length
  const avgLearningRate = learningRates.reduce((a, b) => a + b, 0) / learningRates.length
  const avgCalibration = calibrations.reduce((a, b) => a + b, 0) / calibrations.length
  
  // Calculate variance
  const squaredDiffs = halfLives.map(h => Math.pow(h - avgHalfLife, 2))
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / halfLives.length
  
  return {
    avgHalfLife,
    avgLearningRate,
    avgDecayMultiplier: 1.0, // Would need more data to estimate
    halfLifeVariance: variance,
    overallCalibration: avgCalibration
  }
}
