/**
 * Technical Moat Systems Integration
 * 
 * Integrates all advanced learning science systems into the existing
 * answer checking flow WITHOUT requiring any frontend changes.
 * 
 * This is called from check-answer and ai-grade APIs, running in the
 * background (fire-and-forget) so it doesn't slow down responses.
 */

import { apiLogger } from '@/lib/logger'
import type { MemoryObservation, PersonalizedHalfLife } from '@/lib/personalized-memory/types'
import type { UserTransferProfile, ConceptMastery } from '@/lib/transfer-learning/types'

// ============================================================================
// Types
// ============================================================================

export interface MoatUpdateContext {
  userId: string
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  problemType: string
  problemText: string
  difficulty: number
  
  // Answer info
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  
  // Timing
  timeSpentMs: number
  
  // Optional context
  skills?: string[]
  explanation?: string
}

// ============================================================================
// Main Integration Function
// ============================================================================

/**
 * Update all moat systems after an answer submission.
 * Runs in the background - does not block the API response.
 */
export async function updateMoatSystems(context: MoatUpdateContext): Promise<void> {
  // Run all updates in parallel, catching errors individually
  // so one failure doesn't prevent others from running
  await Promise.allSettled([
    updateMisconceptionProfile(context).catch(logError('misconception')),
    updatePersonalizedMemory(context).catch(logError('memory')),
    updateTransferProfile(context).catch(logError('transfer')),
    updateCognitiveLoadProfile(context).catch(logError('cognitive-load'))
  ])
}

/**
 * Trigger moat updates without awaiting (fire-and-forget).
 * Use this in API routes to avoid blocking the response.
 */
export function triggerMoatUpdates(context: MoatUpdateContext): void {
  // Fire and forget - don't await
  updateMoatSystems(context).catch(err => {
    apiLogger.apiError('moat-systems', 'Background update failed', err)
  })
}

// ============================================================================
// Misconception Detection
// ============================================================================

async function updateMisconceptionProfile(context: MoatUpdateContext): Promise<void> {
  // Only detect misconceptions on wrong answers
  if (context.isCorrect) return
  
  // Skip for very short answers (likely skips or empty)
  if (context.userAnswer.length < 2) return
  
  try {
    const { detectMisconceptions } = await import('@/lib/misconceptions/detector')
    const { getMisconceptionProfile, storeMisconceptionProfile, storeErrorRecord } = await import('@/lib/misconceptions/storage')
    const { updateMisconceptionProfile: updateProfile } = await import('@/lib/misconceptions/fingerprinter')
    
    // Build detection input
    const detectionInput = {
      userId: context.userId,
      problemId: context.problemId,
      studentAnswer: context.userAnswer,
      correctAnswer: context.correctAnswer,
      problemType: context.problemType,
      subject: context.subject,
      difficulty: context.difficulty,
      skills: context.skills || [],
      problemText: context.problemText
    }
    
    // Detect misconceptions
    const result = detectMisconceptions(detectionInput)
    
    if (result.detected && result.misconceptions.length > 0) {
      // Get or create profile
      const existingProfile = await getMisconceptionProfile(context.userId)
      
      // Update profile with new detections
      const update = {
        userId: context.userId,
        detections: result.misconceptions,
        problemId: context.problemId,
        subject: context.subject as 'math' | 'reading' | 'latin' | 'greek' | 'logic'
      }
      
      const updatedProfile = updateProfile(existingProfile, update)
      await storeMisconceptionProfile(updatedProfile)
      
      // Store error record for future analysis
      const errorFeatures = result.misconceptions[0]?.evidence 
        ? {} // Would extract from analysis
        : {}
      
      await storeErrorRecord(
        detectionInput,
        errorFeatures,
        result.misconceptions.map(m => m.misconception.id)
      )
      
      apiLogger.debug('moat-misconception', `Detected ${result.misconceptions.length} misconception(s) for user ${context.userId}`)
    }
  } catch (error) {
    // Log but don't throw - this is non-critical
    apiLogger.apiError('moat-misconception', 'Failed to update misconception profile', error)
  }
}

// ============================================================================
// Personalized Memory (Forgetting Curves)
// ============================================================================

async function updatePersonalizedMemory(context: MoatUpdateContext): Promise<void> {
  try {
    const { getMemoryModel, updateConceptModel, storeObservation } = await import('@/lib/personalized-memory/storage')
    const { createHalfLifeModel, updateHalfLife } = await import('@/lib/personalized-memory/half-life-regression')
    
    // Get or create memory model
    const model = await getMemoryModel(context.userId)
    
    // Map problem to concept (simplified - use problem type as concept)
    const conceptId = `${context.subject}_${context.problemType}`.replace(/[^a-z0-9_]/gi, '_').toLowerCase()
    const conceptName = `${context.subject} - ${context.problemType}`.replace(/_/g, ' ')
    
    // Get or create half-life for this concept
    let halfLife: PersonalizedHalfLife | undefined = model?.conceptModels.get(conceptId)
    
    if (!halfLife) {
      halfLife = createHalfLifeModel(conceptId, conceptName, context.subject)
    }
    
    // Calculate time since last review
    const now = new Date()
    const timeSinceLastReviewMs = halfLife.lastReview.getTime() === 0
      ? 0
      : now.getTime() - halfLife.lastReview.getTime()
    
    // Create observation
    const observation: MemoryObservation = {
      conceptId,
      timestamp: now,
      recalled: context.isCorrect,
      responseTimeMs: context.timeSpentMs,
      confidence: context.isCorrect ? 0.8 : 0.3,
      timeSinceLastReviewMs,
      reviewNumber: halfLife.totalReviews + 1,
      reviewType: 'spaced'
    }
    
    // Update half-life model
    const updatedHalfLife = updateHalfLife(halfLife, observation)
    
    // Store observation
    await storeObservation(context.userId, observation)
    
    // Update concept model
    await updateConceptModel(context.userId, updatedHalfLife)
    
    apiLogger.debug('moat-memory', `Updated memory model for concept ${conceptId}`)
  } catch (error) {
    apiLogger.apiError('moat-memory', 'Failed to update memory model', error)
  }
}

// ============================================================================
// Transfer Learning
// ============================================================================

async function updateTransferProfile(context: MoatUpdateContext): Promise<void> {
  try {
    const { updateConceptMastery, createTransferProfile } = await import('@/lib/transfer-learning/predictor')
    
    // Map problem to learning concept
    const conceptId = mapProblemToConcept(context.subject, context.problemType, context.difficulty)
    
    if (!conceptId) return // No matching concept
    
    // Get or create transfer profile
    let profile: UserTransferProfile | null = await getTransferProfile(context.userId)
    
    if (!profile) {
      profile = createTransferProfile(context.userId)
    }
    
    // Update concept mastery
    // isTransferApplication would be true if this problem tests transfer from another concept
    const isTransferApplication = false // Would need more context to determine
    
    profile = updateConceptMastery(profile, conceptId, context.isCorrect, isTransferApplication)
    
    // Store updated profile
    await storeTransferProfileLocal(profile)
    
    apiLogger.debug('moat-transfer', `Updated transfer profile for concept ${conceptId}`)
  } catch (error) {
    apiLogger.apiError('moat-transfer', 'Failed to update transfer profile', error)
  }
}

/**
 * Map a problem to a learning concept ID
 */
function mapProblemToConcept(
  subject: string,
  problemType: string,
  difficulty: number
): string | null {
  // Simple mapping based on problem type
  const typeToConceptMap: Record<string, Record<string, string>> = {
    math: {
      'addition': 'math_addition',
      'subtraction': 'math_subtraction',
      'multiplication': 'math_multiplication',
      'division': 'math_division',
      'fractions': 'math_fractions',
      'decimals': 'math_percentages',
      'percentages': 'math_percentages',
      'algebra': 'math_equations',
      'equations': 'math_equations',
      'variables': 'math_variables',
      'word_problem': 'math_patterns'
    },
    reading: {
      'comprehension': 'reading_inference',
      'vocabulary': 'reading_vocabulary',
      'main_idea': 'reading_main_idea',
      'inference': 'reading_inference',
      'analysis': 'reading_analysis'
    },
    latin: {
      'vocabulary': 'latin_alphabet',
      'declension': 'latin_noun_declensions',
      'conjugation': 'latin_verb_conjugations',
      'translation': 'latin_sentence_structure'
    },
    greek: {
      'vocabulary': 'greek_alphabet',
      'declension': 'greek_noun_declensions',
      'conjugation': 'greek_verb_system',
      'translation': 'greek_verb_system'
    },
    logic: {
      'proposition': 'logic_propositions',
      'connective': 'logic_connectives',
      'deduction': 'logic_deduction',
      'fallacy': 'logic_fallacies'
    }
  }
  
  const subjectMap = typeToConceptMap[subject] || {}
  
  // Try exact match first
  if (subjectMap[problemType]) {
    return subjectMap[problemType]
  }
  
  // Try partial match
  for (const [key, conceptId] of Object.entries(subjectMap)) {
    if (problemType.toLowerCase().includes(key)) {
      return conceptId
    }
  }
  
  return null
}

// ============================================================================
// Cognitive Load Profile
// ============================================================================

async function updateCognitiveLoadProfile(context: MoatUpdateContext): Promise<void> {
  try {
    const { analyzeProblemComplexity } = await import('@/lib/cognitive-load/load-estimator')
    const { updateCognitiveProfile, createCognitiveProfile } = await import('@/lib/cognitive-load/optimizer')
    const { COGNITIVE_LOAD_COLLECTIONS } = await import('@/lib/cognitive-load/types')
    const { db } = await import('@/lib/firebase/admin')
    
    // Analyze problem complexity
    const complexity = analyzeProblemComplexity(
      context.problemId,
      context.problemText,
      context.problemType,
      context.subject,
      context.difficulty
    )
    
    // Get or create cognitive profile
    let profile = await getCognitiveProfileLocal(context.userId)
    
    if (!profile) {
      profile = createCognitiveProfile(context.userId)
    }
    
    // Create a synthetic load estimate for the update
    // In a full integration, this would come from real-time telemetry
    const estimatedLoad = {
      totalLoad: complexity.intrinsicLoadEstimate,
      intrinsicLoad: complexity.intrinsicLoadEstimate,
      extraneousLoad: 0.1,
      germaneLoad: complexity.intrinsicLoadEstimate * 0.3,
      confidence: 0.6,
      signals: [],
      isOverloaded: complexity.intrinsicLoadEstimate > 0.8,
      isUnderloaded: complexity.intrinsicLoadEstimate < 0.3,
      recommendation: 'maintain_current' as const
    }
    
    // Update profile based on observation
    profile = updateCognitiveProfile(profile, {
      loadEstimate: estimatedLoad,
      responseTimeMs: context.timeSpentMs,
      correct: context.isCorrect,
      complexity
    })
    
    // Store updated profile
    await storeCognitiveProfileLocal(profile)
    
    apiLogger.debug('moat-cognitive', 'Updated cognitive load profile')
  } catch (error) {
    apiLogger.apiError('moat-cognitive', 'Failed to update cognitive load profile', error)
  }
}

// ============================================================================
// Storage Helpers (local to avoid circular imports)
// ============================================================================

async function getTransferProfile(userId: string): Promise<UserTransferProfile | null> {
  const { db } = await import('@/lib/firebase/admin')
  const { TRANSFER_COLLECTIONS } = await import('@/lib/transfer-learning/types')
  
  const doc = await db.collection(TRANSFER_COLLECTIONS.PROFILES).doc(userId).get()
  
  if (!doc.exists) return null
  
  const data = doc.data()
  if (!data) return null
  
  // Convert to UserTransferProfile with Map
  const conceptMastery = new Map<string, ConceptMastery>()
  if (data.conceptMastery && Array.isArray(data.conceptMastery)) {
    for (const item of data.conceptMastery) {
      conceptMastery.set(item.conceptId, {
        conceptId: item.conceptId,
        masteryLevel: item.data.masteryLevel,
        lastPracticed: toDate(item.data.lastPracticed),
        totalAttempts: item.data.totalAttempts,
        recentAccuracy: item.data.recentAccuracy,
        transferReadiness: item.data.transferReadiness
      })
    }
  }
  
  return {
    userId: data.userId,
    lastUpdated: toDate(data.lastUpdated),
    conceptMastery,
    transferHistory: (data.transferHistory as Array<Record<string, unknown>> || []).map((e) => ({
      sourceConceptId: e.sourceConceptId as string,
      targetConceptId: e.targetConceptId as string,
      successful: e.successful as boolean,
      evidenceType: e.evidenceType as 'spontaneous' | 'prompted' | 'scaffolded',
      notes: e.notes as string | undefined,
      timestamp: toDate(e.timestamp)
    })),
    transferTendencies: data.transferTendencies || {
      nearTransferAbility: 0.5,
      farTransferAbility: 0.3,
      analogicalThinking: 0.4,
      abstractionCapacity: 0.4
    },
    strongTransferPaths: data.strongTransferPaths || [],
    weakTransferPaths: data.weakTransferPaths || []
  }
}

async function storeTransferProfileLocal(profile: UserTransferProfile): Promise<void> {
  const { db } = await import('@/lib/firebase/admin')
  const { TRANSFER_COLLECTIONS } = await import('@/lib/transfer-learning/types')
  
  const conceptMasteryArray: Array<{ conceptId: string; data: Omit<ConceptMastery, 'conceptId'> }> = []
  profile.conceptMastery.forEach((mastery, conceptId) => {
    conceptMasteryArray.push({
      conceptId,
      data: {
        masteryLevel: mastery.masteryLevel,
        lastPracticed: mastery.lastPracticed,
        totalAttempts: mastery.totalAttempts,
        recentAccuracy: mastery.recentAccuracy,
        transferReadiness: mastery.transferReadiness
      }
    })
  })
  
  await db.collection(TRANSFER_COLLECTIONS.PROFILES).doc(profile.userId).set({
    userId: profile.userId,
    lastUpdated: profile.lastUpdated,
    conceptMastery: conceptMasteryArray,
    transferHistory: profile.transferHistory,
    transferTendencies: profile.transferTendencies,
    strongTransferPaths: profile.strongTransferPaths,
    weakTransferPaths: profile.weakTransferPaths
  })
}

async function getCognitiveProfileLocal(userId: string): Promise<any | null> {
  const { db } = await import('@/lib/firebase/admin')
  const { COGNITIVE_LOAD_COLLECTIONS } = await import('@/lib/cognitive-load/types')
  
  const doc = await db.collection(COGNITIVE_LOAD_COLLECTIONS.PROFILES).doc(userId).get()
  
  if (!doc.exists) return null
  
  const data = doc.data()
  if (!data) return null
  
  return {
    ...data,
    lastUpdated: toDate(data.lastUpdated)
  }
}

async function storeCognitiveProfileLocal(profile: Record<string, unknown>): Promise<void> {
  const { db } = await import('@/lib/firebase/admin')
  const { COGNITIVE_LOAD_COLLECTIONS } = await import('@/lib/cognitive-load/types')
  
  await db.collection(COGNITIVE_LOAD_COLLECTIONS.PROFILES).doc(profile.userId as string).set(profile)
}

function toDate(value: unknown): Date {
  if (value instanceof Date) return value
  if (value && typeof value === 'object' && 'toDate' in value) {
    const obj = value as { toDate: () => Date }
    if (typeof obj.toDate === 'function') return obj.toDate()
  }
  if (typeof value === 'string') return new Date(value)
  return new Date()
}

function logError(system: string) {
  return (error: unknown) => {
    apiLogger.apiError(`moat-${system}`, 'Update failed', error)
  }
}
