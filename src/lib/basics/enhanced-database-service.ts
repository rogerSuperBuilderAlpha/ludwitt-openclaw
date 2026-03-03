/**
 * Enhanced Database Service for Learning Science Systems
 * 
 * Manages Firestore operations for cognitive profiles, spacing schedulers,
 * and enhanced progress tracking with the new learning science features.
 */

import { db } from '@/lib/firebase/admin'
import { Timestamp, Query } from 'firebase-admin/firestore'
import {
  StudentCognitiveProfile,
  SpacingScheduler,
  SkillMasteryState,
  SpacedItem,
  MetacognitiveSession,
  EnhancedUserProgress,
  LearningAnalytics
} from '@/lib/types/enhanced-basics'
import { createSkillMasteryState } from './cognitive-diagnostics'
import { createSpacedItem } from './spaced-repetition'
import { logger } from '@/lib/logger'

/**
 * Get or create cognitive profile for a user
 */
/** Value that can be converted to a Date */
type DateLike = Date | string | number | { toDate: () => Date } | null | undefined

/**
 * Safely convert a Firestore timestamp or date to a Date object
 */
function safeToDate(value: DateLike, fallback: Date = new Date()): Date {
  if (!value) return fallback
  if (value instanceof Date) return value
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate()
  if (typeof value === 'string' || typeof value === 'number') return new Date(value)
  return fallback
}

export async function getOrCreateCognitiveProfile(userId: string): Promise<StudentCognitiveProfile> {
  // Check if db is available
  if (!db) {
    logger.error('Enhanceddb', 'Firestore not available, returning empty profile')
    return {
      userId,
      mathSkills: new Map(),
      readingSkills: new Map(),
      lastUpdated: new Date(),
      learningRate: 0.5,
      persistenceLevel: 0.5,
      metacognitiveLevel: 0.5
    }
  }

  const docRef = db.collection('cognitiveProfiles').doc(userId)
  const doc = await docRef.get()

  if (doc.exists) {
    const data = doc.data() as Record<string, unknown>

    // Convert Maps from Firestore objects
    const mathSkills = new Map<string, SkillMasteryState>()
    const readingSkills = new Map<string, SkillMasteryState>()

    type SkillDataRaw = Record<string, unknown> & {
      lastAssessed?: DateLike
      createdAt?: DateLike
      updatedAt?: DateLike
      recentAttempts?: Array<Record<string, unknown> & { timestamp?: DateLike }>
    }

    if (data.mathSkills && typeof data.mathSkills === 'object') {
      Object.entries(data.mathSkills as Record<string, SkillDataRaw>).forEach(([skillId, skillData]) => {
        try {
          mathSkills.set(skillId, {
            ...skillData,
            lastAssessed: safeToDate(skillData.lastAssessed),
            createdAt: safeToDate(skillData.createdAt),
            updatedAt: safeToDate(skillData.updatedAt),
            recentAttempts: Array.isArray(skillData.recentAttempts)
              ? skillData.recentAttempts.map((attempt) => ({
                  ...attempt,
                  timestamp: safeToDate(attempt.timestamp)
                }))
              : []
          } as SkillMasteryState)
        } catch (e) {
          logger.error('Enhanceddb', `Failed to parse math skill ${skillId}`, { error: e })
        }
      })
    }

    if (data.readingSkills && typeof data.readingSkills === 'object') {
      Object.entries(data.readingSkills as Record<string, SkillDataRaw>).forEach(([skillId, skillData]) => {
        try {
          readingSkills.set(skillId, {
            ...skillData,
            lastAssessed: safeToDate(skillData.lastAssessed),
            createdAt: safeToDate(skillData.createdAt),
            updatedAt: safeToDate(skillData.updatedAt),
            recentAttempts: Array.isArray(skillData.recentAttempts)
              ? skillData.recentAttempts.map((attempt) => ({
                  ...attempt,
                  timestamp: safeToDate(attempt.timestamp)
                }))
              : []
          } as SkillMasteryState)
        } catch (e) {
          logger.error('Enhanceddb', `Failed to parse reading skill ${skillId}`, { error: e })
        }
      })
    }

    return {
      userId,
      mathSkills,
      readingSkills,
      lastUpdated: safeToDate(data.lastUpdated as DateLike),
      learningRate: (data.learningRate as number) || 0.5,
      persistenceLevel: (data.persistenceLevel as number) || 0.5,
      metacognitiveLevel: (data.metacognitiveLevel as number) || 0.5
    }
  }

  // Create new cognitive profile
  const newProfile: StudentCognitiveProfile = {
    userId,
    mathSkills: new Map(),
    readingSkills: new Map(),
    lastUpdated: new Date(),
    learningRate: 0.5,
    persistenceLevel: 0.5,
    metacognitiveLevel: 0.5
  }

  await saveCognitiveProfile(newProfile)
  return newProfile
}

/**
 * Save cognitive profile to Firestore
 */
export async function saveCognitiveProfile(profile: StudentCognitiveProfile): Promise<void> {
  if (!db) {
    logger.error('Enhanceddb', 'Firestore not available, cannot save cognitive profile')
    return
  }
  const docRef = db.collection('cognitiveProfiles').doc(profile.userId)
  
  // Convert Maps to objects for Firestore
  const mathSkillsObj: Record<string, Record<string, unknown>> = {}
  profile.mathSkills.forEach((skill, skillId) => {
    mathSkillsObj[skillId] = {
      ...skill,
      lastAssessed: Timestamp.fromDate(skill.lastAssessed),
      createdAt: Timestamp.fromDate(skill.createdAt),
      updatedAt: Timestamp.fromDate(skill.updatedAt),
      recentAttempts: skill.recentAttempts.map(attempt => ({
        ...attempt,
        timestamp: Timestamp.fromDate(attempt.timestamp)
      }))
    }
  })
  
  const readingSkillsObj: Record<string, Record<string, unknown>> = {}
  profile.readingSkills.forEach((skill, skillId) => {
    readingSkillsObj[skillId] = {
      ...skill,
      lastAssessed: Timestamp.fromDate(skill.lastAssessed),
      createdAt: Timestamp.fromDate(skill.createdAt),
      updatedAt: Timestamp.fromDate(skill.updatedAt),
      recentAttempts: skill.recentAttempts.map(attempt => ({
        ...attempt,
        timestamp: Timestamp.fromDate(attempt.timestamp)
      }))
    }
  })

  const data = {
    userId: profile.userId,
    mathSkills: mathSkillsObj,
    readingSkills: readingSkillsObj,
    lastUpdated: Timestamp.fromDate(profile.lastUpdated),
    learningRate: profile.learningRate,
    persistenceLevel: profile.persistenceLevel,
    metacognitiveLevel: profile.metacognitiveLevel
  }

  await docRef.set(data)
}

/**
 * Get or create spacing scheduler for a user
 */
export async function getOrCreateSpacingScheduler(userId: string): Promise<SpacingScheduler> {
  // Check if db is available
  if (!db) {
    logger.error('Enhanceddb', 'Firestore not available, returning empty scheduler')
    return {
      userId,
      mathItems: new Map(),
      readingItems: new Map(),
      lastUpdated: new Date()
    }
  }

  const docRef = db.collection('spacingSchedulers').doc(userId)
  const doc = await docRef.get()

  if (doc.exists) {
    const data = doc.data() as Record<string, unknown>

    // Convert Maps from Firestore objects
    const mathItems = new Map<string, SpacedItem>()
    const readingItems = new Map<string, SpacedItem>()

    type ItemDataRaw = Record<string, unknown> & {
      lastSeen?: DateLike
      createdAt?: DateLike
      updatedAt?: DateLike
    }

    if (data.mathItems && typeof data.mathItems === 'object') {
      Object.entries(data.mathItems as Record<string, ItemDataRaw>).forEach(([problemId, itemData]) => {
        try {
          mathItems.set(problemId, {
            ...itemData,
            lastSeen: safeToDate(itemData.lastSeen),
            createdAt: safeToDate(itemData.createdAt),
            updatedAt: safeToDate(itemData.updatedAt)
          } as SpacedItem)
        } catch (e) {
          logger.error('Enhanceddb', `Failed to parse math item ${problemId}`, { error: e })
        }
      })
    }

    if (data.readingItems && typeof data.readingItems === 'object') {
      Object.entries(data.readingItems as Record<string, ItemDataRaw>).forEach(([problemId, itemData]) => {
        try {
          readingItems.set(problemId, {
            ...itemData,
            lastSeen: safeToDate(itemData.lastSeen),
            createdAt: safeToDate(itemData.createdAt),
            updatedAt: safeToDate(itemData.updatedAt)
          } as SpacedItem)
        } catch (e) {
          logger.error('Enhanceddb', `Failed to parse reading item ${problemId}`, { error: e })
        }
      })
    }

    return {
      userId,
      mathItems,
      readingItems,
      lastUpdated: safeToDate(data.lastUpdated as DateLike)
    }
  }

  // Create new spacing scheduler
  const newScheduler: SpacingScheduler = {
    userId,
    mathItems: new Map(),
    readingItems: new Map(),
    lastUpdated: new Date()
  }

  await saveSpacingScheduler(newScheduler)
  return newScheduler
}

/**
 * Save spacing scheduler to Firestore
 */
export async function saveSpacingScheduler(scheduler: SpacingScheduler): Promise<void> {
  if (!db) {
    logger.error('Enhanceddb', 'Firestore not available, cannot save spacing scheduler')
    return
  }
  const docRef = db.collection('spacingSchedulers').doc(scheduler.userId)
  
  // Convert Maps to objects for Firestore
  const mathItemsObj: Record<string, Record<string, unknown>> = {}
  scheduler.mathItems.forEach((item, problemId) => {
    mathItemsObj[problemId] = {
      ...item,
      lastSeen: Timestamp.fromDate(item.lastSeen),
      createdAt: Timestamp.fromDate(item.createdAt),
      updatedAt: Timestamp.fromDate(item.updatedAt)
    }
  })
  
  const readingItemsObj: Record<string, Record<string, unknown>> = {}
  scheduler.readingItems.forEach((item, problemId) => {
    readingItemsObj[problemId] = {
      ...item,
      lastSeen: Timestamp.fromDate(item.lastSeen),
      createdAt: Timestamp.fromDate(item.createdAt),
      updatedAt: Timestamp.fromDate(item.updatedAt)
    }
  })

  const data = {
    userId: scheduler.userId,
    mathItems: mathItemsObj,
    readingItems: readingItemsObj,
    lastUpdated: Timestamp.fromDate(scheduler.lastUpdated)
  }

  await docRef.set(data)
}

/**
 * Save metacognitive session data
 */
export async function saveMetacognitiveSession(session: MetacognitiveSession): Promise<void> {
  const docRef = db.collection('metacognitiveSessions').doc()
  
  const data = {
    ...session,
    duringActivityActions: session.duringActivityActions.map(action => ({
      ...action,
      timestamp: Timestamp.fromDate(action.timestamp)
    }))
  }

  await docRef.set(data)
}

/**
 * Save learning analytics data
 */
export async function saveLearningAnalytics(analytics: LearningAnalytics): Promise<void> {
  const docRef = db.collection('learningAnalytics').doc()
  
  const data = {
    ...analytics,
    timestamp: Timestamp.fromDate(analytics.timestamp)
  }

  await docRef.set(data)
}

/**
 * Get recent metacognitive sessions for a user
 */
export async function getRecentMetacognitiveSessions(
  userId: string, 
  limit: number = 10
): Promise<MetacognitiveSession[]> {
  const snapshot = await db.collection('metacognitiveSessions')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()

  return snapshot.docs.map(doc => {
    const data = doc.data() as Record<string, unknown>
    const actions = data.duringActivityActions as Array<Record<string, unknown> & { timestamp?: { toDate: () => Date } }>
    return {
      ...data,
      duringActivityActions: actions.map((action) => ({
        ...action,
        timestamp: action.timestamp?.toDate() ?? new Date()
      }))
    } as MetacognitiveSession
  })
}

/**
 * Get learning analytics for research purposes
 */
export async function getLearningAnalytics(
  userId?: string,
  startDate?: Date,
  endDate?: Date,
  limit: number = 100
): Promise<LearningAnalytics[]> {
  let query: Query = db.collection('learningAnalytics')

  if (userId) {
    query = query.where('userId', '==', userId)
  }

  if (startDate) {
    query = query.where('timestamp', '>=', Timestamp.fromDate(startDate))
  }

  if (endDate) {
    query = query.where('timestamp', '<=', Timestamp.fromDate(endDate))
  }

  const snapshot = await query
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .get()

  return snapshot.docs.map((doc) => {
    const data = doc.data() as Record<string, unknown> & { timestamp?: { toDate: () => Date } }
    return {
      ...data,
      timestamp: data.timestamp?.toDate() ?? new Date()
    } as LearningAnalytics
  })
}

/**
 * Initialize skill mastery states for a user based on their current progress
 */
/** Progress data shape for skill initialization */
interface ProgressData {
  currentDifficulty: number
  accuracyRate: number
}

export async function initializeSkillsFromProgress(
  userId: string,
  subject: 'math' | 'reading',
  currentProgress: ProgressData
): Promise<void> {
  const profile = await getOrCreateCognitiveProfile(userId)
  const skills = subject === 'math' ? profile.mathSkills : profile.readingSkills
  
  // Initialize basic skills based on current difficulty level
  const currentLevel = Math.floor(currentProgress.currentDifficulty)
  
  if (subject === 'math') {
    // Initialize math skills based on grade level
    const mathSkillsByGrade = {
      1: ['counting', 'number-recognition', 'addition-basic', 'subtraction-basic'],
      2: ['place-value', 'addition-regrouping', 'subtraction-regrouping'],
      3: ['multiplication-basic', 'division-basic', 'fractions-basic'],
      4: ['decimals-basic', 'fractions-operations'],
      5: ['decimals-operations', 'percentages'],
      6: ['integers', 'ratios-proportions', 'basic-geometry'],
      7: ['algebraic-thinking', 'statistics'],
      8: ['linear-equations', 'functions'],
      9: ['quadratic-equations', 'trigonometry'],
      10: ['advanced-algebra', 'probability'],
      11: ['precalculus', 'calculus-basics'],
      12: ['advanced-calculus', 'statistics']
    }
    
    for (let grade = 1; grade <= Math.min(currentLevel, 12); grade++) {
      const gradeSkills = mathSkillsByGrade[grade as keyof typeof mathSkillsByGrade] || []
      gradeSkills.forEach(skillId => {
        if (!skills.has(skillId)) {
          // Initialize with moderate mastery for skills below current level
          const initialMastery = grade < currentLevel ? 0.7 : 0.3
          skills.set(skillId, createSkillMasteryState(skillId, initialMastery))
        }
      })
    }
  } else {
    // Initialize reading skills
    const readingSkills = [
      'phonological-awareness', 'phonics', 'sight-words', 'fluency',
      'vocabulary', 'background-knowledge', 'syntactic-awareness', 
      'inference-skills', 'metacomprehension'
    ]
    
    readingSkills.forEach(skillId => {
      if (!skills.has(skillId)) {
        // Initialize based on current accuracy rate
        const initialMastery = currentProgress.accuracyRate * 0.8 // Conservative estimate
        skills.set(skillId, createSkillMasteryState(skillId, initialMastery))
      }
    })
  }
  
  await saveCognitiveProfile(profile)
}

/**
 * Batch update multiple cognitive profiles (for migration)
 */
export async function batchUpdateCognitiveProfiles(
  updates: Array<{ userId: string; updates: Partial<StudentCognitiveProfile> }>
): Promise<void> {
  const batch = db.batch()
  
  updates.forEach(({ userId, updates: profileUpdates }) => {
    const docRef = db.collection('cognitiveProfiles').doc(userId)
    batch.update(docRef, {
      ...profileUpdates,
      lastUpdated: Timestamp.now()
    })
  })
  
  await batch.commit()
}

/**
 * Get skill mastery statistics across all users (for research)
 */
export async function getSkillMasteryStatistics(
  skillId: string,
  subject: 'math' | 'reading'
): Promise<{
  totalStudents: number
  averageMastery: number
  masteryDistribution: { range: string; count: number }[]
}> {
  const snapshot = await db.collection('cognitiveProfiles').get()
  
  const masteryValues: number[] = []
  
  snapshot.docs.forEach(doc => {
    const data = doc.data()
    const skills = subject === 'math' ? data.mathSkills : data.readingSkills
    
    if (skills && skills[skillId]) {
      masteryValues.push(skills[skillId].masteryProbability)
    }
  })
  
  const totalStudents = masteryValues.length
  const averageMastery = totalStudents > 0 
    ? masteryValues.reduce((sum, val) => sum + val, 0) / totalStudents
    : 0
  
  // Create mastery distribution
  const ranges = [
    { range: '0.0-0.2', min: 0.0, max: 0.2 },
    { range: '0.2-0.4', min: 0.2, max: 0.4 },
    { range: '0.4-0.6', min: 0.4, max: 0.6 },
    { range: '0.6-0.8', min: 0.6, max: 0.8 },
    { range: '0.8-1.0', min: 0.8, max: 1.0 }
  ]
  
  const masteryDistribution = ranges.map(({ range, min, max }) => ({
    range,
    count: masteryValues.filter(val => val >= min && val < max).length
  }))
  
  return {
    totalStudents,
    averageMastery,
    masteryDistribution
  }
}
