/**
 * Translation Grading Service
 *
 * Business logic for scoring classical language translations.
 * Handles exact/close matching, AI-based grading, parsing bonus
 * calculation, and Firestore progress persistence.
 *
 * Extracted from /api/basics/translation/check/route.ts
 */

import Anthropic from '@anthropic-ai/sdk'
import { FieldValue } from 'firebase-admin/firestore'
import { TranslationFeedback, ClassicalLanguage, SubjectProgressDisplay } from '@/lib/types/basics'
import { calculateProgressToNextLevel, getGradeLevelString } from '@/lib/basics/adaptation'
import { isAIGenerationAvailable } from '@/lib/basics/config'
import { db } from '@/lib/firebase/admin'
import { trackCreditsAfterCall } from '@/lib/credits'
import { getModelForTask, getTaskConfig } from '@/lib/ai/providers'
import {
  XP_REWARDS as CENTRALIZED_XP_REWARDS,
  TRANSLATION_THRESHOLDS,
} from '@/lib/basics/xp-config'
import { awardXP } from '@/lib/basics/xp-service'
import { triggerMoatUpdates } from '@/lib/basics/moat-systems-integration'
import { logger } from '@/lib/logger'
import { buildTranslationGradingPrompt } from '@/lib/ai/grading/prompts'

// ---------------------------------------------------------------------------
// Anthropic client (lazy singleton)
// ---------------------------------------------------------------------------

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

// ---------------------------------------------------------------------------
// XP reward map keyed by quality tier
// ---------------------------------------------------------------------------

const XP_REWARDS: Record<string, number> = {
  perfect: CENTRALIZED_XP_REWARDS.TRANSLATION_PERFECT,
  excellent: CENTRALIZED_XP_REWARDS.TRANSLATION_EXCELLENT,
  good: CENTRALIZED_XP_REWARDS.TRANSLATION_GOOD,
  partial: CENTRALIZED_XP_REWARDS.TRANSLATION_ACCEPTABLE, // 'partial' maps to 'acceptable'
  attempted: CENTRALIZED_XP_REWARDS.TRANSLATION_ATTEMPTED,
}

// ---------------------------------------------------------------------------
// Difficulty change map (per quality tier)
// ---------------------------------------------------------------------------

const DIFFICULTY_CHANGE_BY_TIER: Record<string, number> = {
  perfect: 0.15,
  excellent: 0.12,
  good: 0.08,
  partial: 0.05,
  attempted: 0,
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface CheckTranslationInput {
  exerciseId: string
  userTranslation: string
  wordsLookedUp: string[]
  xpSpentOnLookups: number
  parsingAnswers?: Record<string, string>
  timeSpent: number
  acceptableTranslations: string[]
  sourceText: string
  language: ClassicalLanguage
  parsingElements?: Array<{ word: string; options: string[] }>
  canUseAI: boolean
  userId: string
}

export interface CheckTranslationResult {
  feedback: TranslationFeedback
  creditsCharged: number
  updatedProgress?: SubjectProgressDisplay
  summary: {
    qualityTier: string
    overallScore: number
    xpEarned: number
    xpSpent: number
    netXp: number
    timeSpent: number
  }
}

/**
 * Internal feedback shape returned by scoreTranslation (before XP fields are added).
 */
type ScoringFeedback = Omit<
  TranslationFeedback,
  'xpEarned' | 'xpSpentOnLookups' | 'netXp' | 'acceptableTranslations'
>

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Grade a user's translation, persist progress, award XP, and trigger moat
 * updates.  Returns everything the route needs to send back to the client.
 */
export async function gradeTranslation(
  input: CheckTranslationInput
): Promise<CheckTranslationResult> {
  const {
    exerciseId,
    userTranslation,
    xpSpentOnLookups,
    parsingAnswers,
    timeSpent,
    acceptableTranslations,
    sourceText,
    language,
    parsingElements,
    canUseAI,
    userId,
  } = input

  // 1. Score the translation (exact match, close match, or AI)
  const { feedback: scoringFeedback, creditsCharged } = await scoreTranslation(
    userTranslation,
    acceptableTranslations,
    sourceText,
    language,
    parsingElements,
    parsingAnswers,
    canUseAI ? userId : undefined
  )

  // 2. Calculate final XP
  let baseXp = 0
  if (scoringFeedback.overallScore >= TRANSLATION_THRESHOLDS.MIN_SCORE_FOR_XP) {
    baseXp = XP_REWARDS[scoringFeedback.qualityTier] || 0
  }
  const parsingBonus = scoringFeedback.parsingBonus?.bonusXp || 0
  const totalEarned = baseXp + parsingBonus
  const netXp = totalEarned - xpSpentOnLookups

  // 3. Assemble the full feedback payload
  const fullFeedback: TranslationFeedback = {
    ...scoringFeedback,
    xpEarned: totalEarned,
    xpSpentOnLookups,
    netXp,
    acceptableTranslations,
  }

  // 4. Persist progress + award XP
  const updatedProgress = await updateProgressAndAwardXP({
    userId,
    language,
    exerciseId,
    qualityTier: scoringFeedback.qualityTier,
    overallScore: scoringFeedback.overallScore,
    netXp,
    totalEarned,
    xpSpentOnLookups,
    timeSpent,
  })

  // 5. Trigger moat systems (fire-and-forget)
  const isCorrect = scoringFeedback.qualityTier !== 'attempted'
  triggerMoatUpdates({
    userId,
    problemId: exerciseId,
    subject: language,
    problemType: 'translation',
    problemText: sourceText,
    difficulty: updatedProgress?.currentDifficulty || 1,
    userAnswer: userTranslation,
    correctAnswer: acceptableTranslations[0] || '',
    isCorrect,
    timeSpentMs: timeSpent * 1000,
    skills: [],
    explanation: undefined,
  })

  return {
    feedback: fullFeedback,
    creditsCharged,
    updatedProgress,
    summary: {
      qualityTier: scoringFeedback.qualityTier,
      overallScore: scoringFeedback.overallScore,
      xpEarned: totalEarned,
      xpSpent: xpSpentOnLookups,
      netXp,
      timeSpent,
    },
  }
}

// ---------------------------------------------------------------------------
// Translation scoring (exact match → close match → AI → fallback)
// ---------------------------------------------------------------------------

async function scoreTranslation(
  userTranslation: string,
  acceptableTranslations: string[],
  sourceText: string,
  language: ClassicalLanguage,
  parsingElements?: Array<{ word: string; options: string[] }>,
  parsingAnswers?: Record<string, string>,
  userId?: string
): Promise<{ feedback: ScoringFeedback; creditsCharged: number }> {
  const normalizedUser = userTranslation.toLowerCase().trim().replace(/[.,!?'"]/g, '')

  // --- Exact match ---
  const isExactMatch = acceptableTranslations.some(
    (t) => t.toLowerCase().trim().replace(/[.,!?'"]/g, '') === normalizedUser
  )
  if (isExactMatch) {
    return {
      feedback: {
        overallScore: 100,
        qualityTier: 'perfect',
        categoryScores: { meaning: 25, grammar: 25, vocabulary: 25, english: 25 },
        feedback: 'Excellent translation! Your answer matches perfectly.',
        improvements: [],
      },
      creditsCharged: 0,
    }
  }

  // --- Close match (differs only by articles) ---
  const isCloseMatch = acceptableTranslations.some((t) => {
    const normalizedAcceptable = t.toLowerCase().trim().replace(/[.,!?'"]/g, '')
    const strip = (s: string) =>
      s.replace(/\b(the|a|an)\b/g, '').replace(/\s+/g, ' ').trim()
    return strip(normalizedUser) === strip(normalizedAcceptable)
  })
  if (isCloseMatch) {
    return {
      feedback: {
        overallScore: 95,
        qualityTier: 'excellent',
        categoryScores: { meaning: 25, grammar: 25, vocabulary: 25, english: 20 },
        feedback: 'Excellent translation! Minor differences in articles or word choice.',
        improvements: ['Check article usage (the/a/an) against the model translations.'],
      },
      creditsCharged: 0,
    }
  }

  // --- AI not available / no credits ---
  if (!isAIGenerationAvailable() || !anthropic || !userId) {
    return {
      feedback: {
        overallScore: 50,
        qualityTier: 'partial',
        categoryScores: { meaning: 12, grammar: 12, vocabulary: 12, english: 14 },
        feedback: 'Good attempt. Compare with the model translations.',
        improvements: ['Review the model translations for this sentence.'],
      },
      creditsCharged: 0,
    }
  }

  // --- AI grading ---
  return scoreWithAI(
    userTranslation,
    acceptableTranslations,
    sourceText,
    language,
    parsingElements,
    parsingAnswers,
    userId
  )
}

// ---------------------------------------------------------------------------
// AI-based scoring
// ---------------------------------------------------------------------------

async function scoreWithAI(
  userTranslation: string,
  acceptableTranslations: string[],
  sourceText: string,
  language: ClassicalLanguage,
  parsingElements?: Array<{ word: string; options: string[] }>,
  parsingAnswers?: Record<string, string>,
  userId?: string
): Promise<{ feedback: ScoringFeedback; creditsCharged: number }> {
  const prompt = buildTranslationGradingPrompt(
    language as 'latin' | 'greek',
    sourceText,
    userTranslation,
    acceptableTranslations
  )

  try {
    const model = await getModelForTask(userId!, 'translation')
    const taskConfig = getTaskConfig('translation')

    const response = await anthropic!.messages.create({
      model,
      max_tokens: taskConfig.defaultMaxTokens,
      messages: [{ role: 'user', content: prompt }],
    })

    // Track credits
    const { costCharged } = await trackCreditsAfterCall(
      userId!,
      'translation-grading',
      model,
      response.usage
    )

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    let jsonText = content.text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const result = JSON.parse(jsonText)

    // Score parsing bonus
    const parsingBonus = scoreParsingBonus(parsingElements, parsingAnswers)

    return {
      feedback: {
        overallScore: result.overallScore,
        qualityTier: result.qualityTier,
        categoryScores: result.categoryScores,
        feedback: result.feedback,
        improvements: result.improvements || [],
        parsingBonus,
      },
      creditsCharged: costCharged,
    }
  } catch (error) {
    logger.error('translation-grading', 'AI scoring failed, using simple comparison', { error })

    // Fallback to simple comparison
    const normalized = userTranslation.toLowerCase().trim()
    const isClose = acceptableTranslations.some((t) => {
      const normalizedAcceptable = t.toLowerCase().trim()
      return (
        normalized.includes(normalizedAcceptable.slice(0, 20)) ||
        normalizedAcceptable.includes(normalized.slice(0, 20))
      )
    })

    return {
      feedback: {
        overallScore: isClose ? 70 : 40,
        qualityTier: isClose ? 'good' : 'partial',
        categoryScores: {
          meaning: isClose ? 20 : 10,
          grammar: isClose ? 18 : 10,
          vocabulary: isClose ? 17 : 10,
          english: isClose ? 15 : 10,
        },
        feedback: isClose
          ? 'Good translation! Check the model answers for comparison.'
          : 'Review the original text and try again.',
        improvements: ['Compare your translation with the model answers.'],
      },
      creditsCharged: 0,
    }
  }
}

// ---------------------------------------------------------------------------
// Parsing bonus
// ---------------------------------------------------------------------------

function scoreParsingBonus(
  parsingElements?: Array<{ word: string; options: string[] }>,
  parsingAnswers?: Record<string, string>
): ScoringFeedback['parsingBonus'] {
  if (!parsingElements || !parsingAnswers || Object.keys(parsingAnswers).length === 0) {
    return undefined
  }

  let correctCount = 0
  for (const element of parsingElements) {
    const userAnswer = parsingAnswers[element.word]
    const correctAnswer = element.options[0] // First option is always correct
    if (userAnswer === correctAnswer) {
      correctCount++
    }
  }

  const parsingScore = Math.round((correctCount / parsingElements.length) * 100)
  const multiplier = 1 + parsingScore / 200 // 1.0 to 1.5

  return {
    eligible: true,
    score: parsingScore,
    multiplier,
    bonusXp: Math.round(parsingScore / 20), // 0-5 bonus XP
    feedback:
      parsingScore === 100
        ? 'Perfect parsing!'
        : parsingScore >= 70
          ? 'Good parsing skills!'
          : 'Keep practicing your parsing.',
  }
}

// ---------------------------------------------------------------------------
// Firestore progress persistence + XP award
// ---------------------------------------------------------------------------

interface ProgressUpdateInput {
  userId: string
  language: ClassicalLanguage
  exerciseId: string
  qualityTier: string
  overallScore: number
  netXp: number
  totalEarned: number
  xpSpentOnLookups: number
  timeSpent: number
}

async function updateProgressAndAwardXP(
  input: ProgressUpdateInput
): Promise<SubjectProgressDisplay | undefined> {
  const {
    userId,
    language,
    exerciseId,
    qualityTier,
    overallScore,
    netXp,
    totalEarned,
    xpSpentOnLookups,
    timeSpent,
  } = input

  if (!db || !language) return undefined

  try {
    const progressRef = db
      .collection('users')
      .doc(userId)
      .collection('translation_progress')
      .doc(language)

    const isCorrect = qualityTier !== 'attempted'
    const progressDoc = await progressRef.get()

    let updatedProgress: SubjectProgressDisplay

    if (progressDoc.exists) {
      updatedProgress = await updateExistingProgress(
        progressRef,
        progressDoc.data() || {},
        { exerciseId, qualityTier, isCorrect, netXp }
      )
    } else {
      updatedProgress = await createInitialProgress(progressRef, {
        exerciseId,
        qualityTier,
        isCorrect,
        netXp,
      })
    }

    logger.info('translation-grading', `Updated ${language} progress`, { data: { userId } })

    // Award XP atomically
    if (netXp > 0) {
      await awardXP({
        userId,
        source: language as 'latin' | 'greek',
        baseXP: totalEarned,
        costsIncurred: xpSpentOnLookups,
        problemId: exerciseId,
        details: {
          isCorrect: qualityTier === 'perfect' || qualityTier === 'excellent',
          score: overallScore,
          timeSpent,
        },
      })
    }

    return updatedProgress
  } catch (e) {
    logger.error('translation-grading', 'Failed to update progress', { error: e })
    // Don't fail the request, just log the error
    return undefined
  }
}

// ---------------------------------------------------------------------------
// Progress document helpers
// ---------------------------------------------------------------------------

interface ProgressContext {
  exerciseId: string
  qualityTier: string
  isCorrect: boolean
  netXp: number
}

async function updateExistingProgress(
  progressRef: FirebaseFirestore.DocumentReference,
  currentData: FirebaseFirestore.DocumentData,
  ctx: ProgressContext
): Promise<SubjectProgressDisplay> {
  const newStreak = ctx.isCorrect ? (currentData.currentStreak || 0) + 1 : 0
  const longestStreak = Math.max(currentData.longestStreak || 0, newStreak)
  const totalCompleted = (currentData.totalCompleted || 0) + 1
  const correctCount = (currentData.correctCount || 0) + (ctx.isCorrect ? 1 : 0)
  const accuracyRate = correctCount / totalCompleted

  // Adaptive difficulty
  const currentDifficulty = currentData.currentDifficulty || 1.0
  let difficultyChange = 0
  if (ctx.isCorrect) {
    difficultyChange = DIFFICULTY_CHANGE_BY_TIER[ctx.qualityTier] || 0.05
    difficultyChange += Math.floor(newStreak / 5) * 0.02
  } else {
    difficultyChange = -0.05
  }
  const newDifficulty = Math.max(1.0, Math.min(12.0, currentDifficulty + difficultyChange))

  // Completed exercises dedup (last 100)
  const completedExercises = currentData.completedExercises || []
  if (!completedExercises.includes(ctx.exerciseId)) {
    completedExercises.push(ctx.exerciseId)
    if (completedExercises.length > 100) {
      completedExercises.shift()
    }
  }

  await progressRef.update({
    totalXP: FieldValue.increment(ctx.netXp),
    currentDifficulty: newDifficulty,
    totalCompleted,
    correctCount,
    currentStreak: newStreak,
    longestStreak,
    accuracyRate,
    lastExerciseId: ctx.exerciseId,
    completedExercises,
    lastUpdated: FieldValue.serverTimestamp(),
  })

  return {
    currentDifficulty: newDifficulty,
    currentLevel: getGradeLevelString(newDifficulty),
    progressToNextLevel: calculateProgressToNextLevel(newDifficulty),
    currentStreak: newStreak,
    longestStreak,
    totalXP: (currentData.totalXP || 0) + ctx.netXp,
    totalCompleted,
    accuracyRate,
  }
}

async function createInitialProgress(
  progressRef: FirebaseFirestore.DocumentReference,
  ctx: ProgressContext
): Promise<SubjectProgressDisplay> {
  const initialDifficulty = ctx.isCorrect
    ? 1.0 + (DIFFICULTY_CHANGE_BY_TIER[ctx.qualityTier] || 0.05)
    : 1.0

  await progressRef.set({
    currentDifficulty: initialDifficulty,
    totalXP: ctx.netXp,
    totalCompleted: 1,
    correctCount: ctx.isCorrect ? 1 : 0,
    currentStreak: ctx.isCorrect ? 1 : 0,
    longestStreak: ctx.isCorrect ? 1 : 0,
    accuracyRate: ctx.isCorrect ? 1.0 : 0,
    lastExerciseId: ctx.exerciseId,
    completedExercises: [ctx.exerciseId],
    createdAt: FieldValue.serverTimestamp(),
    lastUpdated: FieldValue.serverTimestamp(),
  })

  return {
    currentDifficulty: initialDifficulty,
    currentLevel: getGradeLevelString(initialDifficulty),
    progressToNextLevel: calculateProgressToNextLevel(initialDifficulty),
    currentStreak: ctx.isCorrect ? 1 : 0,
    longestStreak: ctx.isCorrect ? 1 : 0,
    totalXP: ctx.netXp,
    totalCompleted: 1,
    accuracyRate: ctx.isCorrect ? 1.0 : 0,
  }
}
