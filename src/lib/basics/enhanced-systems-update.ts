/**
 * Enhanced Learning Science Systems Update
 * 
 * Consolidated utility for updating cognitive profiles, spacing schedulers,
 * and learning analytics after problem attempts.
 */

import {
  getOrCreateCognitiveProfile,
  getOrCreateSpacingScheduler,
  saveCognitiveProfile,
  saveSpacingScheduler,
  saveLearningAnalytics,
  saveMetacognitiveSession
} from './enhanced-database-service'
import { updateCognitiveProfile, mapProblemToSkills } from './cognitive-diagnostics'
import { updateSpacedRepetition } from './spaced-repetition'
import { SupportLevel } from './scaffolding-system'
import type { LearningAnalytics, MetacognitiveSession } from '@/lib/types/enhanced-basics'
import { logger } from '@/lib/logger'

export interface EnhancedSystemsUpdateOptions {
  /** Support level used during problem solving */
  supportLevel?: SupportLevel
  /** Strategies used by the student */
  strategiesUsed?: string[]
  /** Number of hints used */
  hintsUsed?: number
  /** Metacognitive responses from the student */
  metacognitiveResponses?: {
    preActivity?: Record<string, unknown>
    duringActivity?: Array<{ timestamp: Date | number; action: string; response?: unknown }>
    postActivity?: Record<string, unknown>
  }
  /** Self-assessment data */
  selfAssessment?: {
    difficultyRating?: number
    confidenceLevel?: number
    strategyEffectiveness?: Record<string, number>
    wouldDoAgain?: string[]
  }
}

export interface EnhancedSystemsUpdateResult {
  enhanced: boolean
  skillUpdates?: Array<{
    skillId: string
    skillName: string
    newMastery: number
    recommendation: string
  }>
  spacingUpdate?: {
    nextReviewDate: string
    interval: number
    easinessFactor: number
  }
  /** Visible schedule message for post-problem display */
  reviewScheduleMessage?: {
    conceptId: string
    conceptName: string
    subject: string
    nextReviewDate: string
    daysUntilReview: number
    message: string
    isFirstReview: boolean
  }
  learningInsights?: string[]
  error?: string
}

/**
 * Update enhanced learning science systems after answer submission
 */
/** Problem with required fields for enhanced systems update */
interface ProblemData {
  id: string
  type: string
  difficulty: number
  topic?: string
}

export async function updateEnhancedSystems(
  userId: string,
  subject: 'math' | 'reading',
  problem: ProblemData,
  correct: boolean,
  timeSpent: number,
  options: EnhancedSystemsUpdateOptions = {}
): Promise<EnhancedSystemsUpdateResult> {
  try {
    const {
      supportLevel = SupportLevel.INDEPENDENT,
      strategiesUsed = [],
      hintsUsed = 0,
      metacognitiveResponses = {},
      selfAssessment
    } = options

    // Get current systems
    let cognitiveProfile = await getOrCreateCognitiveProfile(userId)
    let spacingScheduler = await getOrCreateSpacingScheduler(userId)

    // Map problem to skills
    const problemSkills = mapProblemToSkills(problem.id, problem.type, problem.difficulty)

    // Update cognitive diagnostic model
    cognitiveProfile = updateCognitiveProfile(
      cognitiveProfile,
      subject,
      problem.id,
      problemSkills,
      correct,
      timeSpent
    )

    // Update spaced repetition scheduler
    spacingScheduler = updateSpacedRepetition(
      spacingScheduler,
      subject,
      problem.id,
      correct,
      timeSpent,
      problemSkills
    )

    // Save updated systems (run in parallel)
    await Promise.all([
      saveCognitiveProfile(cognitiveProfile),
      saveSpacingScheduler(spacingScheduler)
    ])

    // Create learning analytics record
    const analytics: LearningAnalytics = {
      userId,
      sessionId: `session_${Date.now()}`,
      timestamp: new Date(),
      subject,
      problemId: problem.id,
      problemType: problem.type,
      difficulty: problem.difficulty,
      requiredSkills: problemSkills,
      correct,
      timeSpent,
      hintsUsed,
      errorsBeforeSuccess: correct ? 0 : 1,
      supportLevel,
      strategiesUsed,
      metacognitiveResponses: (metacognitiveResponses.postActivity || {}) as Record<string, string>,
      frustrationIndicators: hintsUsed > 2 ? 1 : (timeSpent > 300 ? 1 : 0),
      engagementLevel: timeSpent > 15 && timeSpent < 180 ? 1 : 0.5,
      confidenceRating: selfAssessment?.confidenceLevel || 3,
      sessionLength: timeSpent,
      problemsInSession: 1,
      cognitiveLoadLevel: Math.ceil(problem.difficulty / 3)
    }

    // Save analytics (don't await to avoid slowing response for basic version)
    const analyticsPromise = saveLearningAnalytics(analytics)
    if (Object.keys(metacognitiveResponses).length > 0) {
      // For enhanced version, await analytics before creating metacognitive session
      await analyticsPromise
    } else {
      // For basic version, don't await to avoid slowing response
      analyticsPromise.catch(() => {
        // Analytics save failed, non-critical
      })
    }

    // Create metacognitive session record if responses provided
    if (Object.keys(metacognitiveResponses).length > 0) {
      const preActivity = (metacognitiveResponses.preActivity || {}) as Record<string, string>
      const postActivity = (metacognitiveResponses.postActivity || {}) as Record<string, string>
      
      const metacognitiveSession: MetacognitiveSession = {
        userId,
        problemId: problem.id,
        subject,
        preActivityResponses: preActivity,
        duringActivityActions: (metacognitiveResponses.duringActivity || []).map((action) => ({
          timestamp: action.timestamp instanceof Date ? action.timestamp : new Date(action.timestamp as number),
          action: action.action,
          response: action.response as string | undefined
        })),
        postActivityReflection: postActivity,
        strategiesUsed,
        selfAssessment: {
          difficultyRating: selfAssessment?.difficultyRating ?? 3,
          confidenceLevel: selfAssessment?.confidenceLevel ?? 3,
          strategyEffectiveness: selfAssessment?.strategyEffectiveness ?? {},
          wouldDoAgain: selfAssessment?.wouldDoAgain ?? strategiesUsed
        },
        metacognitiveGrowth: {
          planningQuality: Object.keys(preActivity).length > 0 ? 0.7 : 0.3,
          monitoringFrequency: (metacognitiveResponses.duringActivity || []).length > 0 ? 0.8 : 0.2,
          reflectionDepth: Object.keys(postActivity).length > 1 ? 0.8 : 0.4
        }
      }

      await saveMetacognitiveSession(metacognitiveSession)
    }

    // Generate skill updates for response
    const skillUpdates = problemSkills.map(skillId => {
      const skills = subject === 'math' ? cognitiveProfile.mathSkills : cognitiveProfile.readingSkills
      const skill = skills.get(skillId)
      
      if (skill) {
        return {
          skillId,
          skillName: skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          newMastery: Math.round(skill.masteryProbability * 100) / 100,
          recommendation: skill.masteryProbability < 0.3 
            ? 'Needs more practice with scaffolding'
            : skill.masteryProbability < 0.7
            ? 'Continue practicing'
            : 'Well mastered - ready for spaced review'
        }
      }
      return null
    }).filter(Boolean) as Array<{
      skillId: string
      skillName: string
      newMastery: number
      recommendation: string
    }>

    // Generate spacing update info
    const spacingItems = subject === 'math' ? spacingScheduler.mathItems : spacingScheduler.readingItems
    const spacedItem = spacingItems.get(problem.id)
    const nextReviewDateMs = Date.now() + (spacedItem?.interval || 1) * 24 * 60 * 60 * 1000
    const spacingUpdate = spacedItem ? {
      nextReviewDate: new Date(nextReviewDateMs).toISOString(),
      interval: spacedItem.interval,
      easinessFactor: Math.round(spacedItem.easinessFactor * 100) / 100
    } : undefined
    
    // Generate visible review schedule message for user feedback
    const daysUntilReview = Math.ceil((spacedItem?.interval || 1))
    const problemName = problem.topic || problem.type || 'This concept'
    const isFirstReview = spacedItem?.totalReviews === 1
    let scheduleMessageText: string
    
    if (daysUntilReview <= 0) {
      scheduleMessageText = `Great work! We'll reinforce "${problemName}" again soon.`
    } else if (daysUntilReview === 1) {
      scheduleMessageText = `We'll remind you to review "${problemName}" tomorrow to strengthen your memory.`
    } else if (daysUntilReview <= 3) {
      scheduleMessageText = `We'll remind you to review "${problemName}" in ${daysUntilReview} days. Studies show spaced practice improves retention by 200%!`
    } else if (daysUntilReview <= 7) {
      scheduleMessageText = `"${problemName}" is scheduled for review in ${daysUntilReview} days. You're building long-term mastery!`
    } else {
      scheduleMessageText = `Excellent! "${problemName}" is moving to your long-term memory. Next review in ${daysUntilReview} days.`
    }
    
    const reviewScheduleMessage = spacedItem ? {
      conceptId: problem.id,
      conceptName: problemName,
      subject,
      nextReviewDate: new Date(nextReviewDateMs).toISOString(),
      daysUntilReview,
      message: scheduleMessageText,
      isFirstReview
    } : undefined

    // Generate learning insights
    const learningInsights: string[] = []
    if (correct && timeSpent < 30) {
      learningInsights.push('Excellent speed and accuracy!')
    } else if (correct && timeSpent > 120) {
      learningInsights.push('Correct! Try to work a bit faster next time.')
    } else if (!correct && timeSpent < 30) {
      learningInsights.push('Take more time to read the problem carefully.')
    }

    if (skillUpdates.some(s => s.newMastery >= 0.8)) {
      learningInsights.push('You\'re mastering key skills!')
    }

    if (spacedItem && spacedItem.interval > 7) {
      learningInsights.push('This problem is scheduled for long-term review.')
    }

    return {
      enhanced: true,
      skillUpdates,
      spacingUpdate,
      reviewScheduleMessage,
      learningInsights
    }
  } catch (error) {
    logger.error('EnhancedSystemsUpdate', 'Enhanced systems update failed', { error: error })
    return {
      enhanced: false,
      error: 'Enhanced features temporarily unavailable'
    }
  }
}

