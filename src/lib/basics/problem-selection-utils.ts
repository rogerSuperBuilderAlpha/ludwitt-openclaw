/**
 * Problem Selection Utilities
 * 
 * Shared utilities for selecting problems with fallback strategies
 * and formatting problems for client consumption.
 */

import { MathProblem, ReadingExercise, TranslationExercise, ClassicalLanguage, ReadingQuestion } from '@/lib/types/basics'
import { selectMathProblemV2, selectReadingExercise, selectTranslationExercise } from './localStore'
import { getProblemWithGeneration, getTranslationWithGeneration } from './services'
import { logger } from '@/lib/logger'

// ============================================================================
// Client-facing types (without correct answers)
// ============================================================================

/** Math problem formatted for client (no answers) */
export interface MathProblemClient {
  id: string
  type: string
  difficulty: number
  question: string
  hint?: string
  timeEstimate: number
  latex?: string
  topic: string
  diagram?: MathProblem['diagram']
}

/** Reading question formatted for client (no answers) */
export interface ReadingQuestionClient {
  id: string
  question: string
  type: string
  options?: string[]
  skill: string
}

/** Reading exercise formatted for client (no answers) */
export interface ReadingExerciseClient {
  id: string
  type: string
  difficulty: number
  passage?: string
  questions: ReadingQuestionClient[]
  timeEstimate: number
}

/** Translation exercise formatted for client (no answers) */
export interface TranslationExerciseClient {
  id: string
  language: string
  difficulty: number
  sourceText: string
  romanization?: string
  words: Array<Record<string, unknown>>
  grammarTopic?: string
  grammarSubtopic?: string
  parsingElements?: Array<{ word: string; options: unknown[] }>
  timeEstimate: number
  sourceAuthor?: string
}

/** Metacognitive prompt item */
export interface MetacognitivePromptItem {
  id: string
  prompt: string
  purpose?: string
}

/** Metacognitive prompts collection */
export interface MetacognitivePromptsClient {
  preActivity: MetacognitivePromptItem[]
  duringActivity: MetacognitivePromptItem[]
  postActivity: MetacognitivePromptItem[]
}

// ============================================================================
// Prerequisite Skills Filtering (Backward Compatible)
// ============================================================================

/**
 * Configuration for prerequisite filtering behavior
 */
export interface PrerequisiteFilterConfig {
  /** Whether to enable prerequisite filtering (default: true) */
  enabled?: boolean
  /** If true, problems without prerequisiteSkills are always shown (default: true) */
  allowMissingPrerequisites?: boolean
  /** If true, uses lenient mode (show if user has ANY prerequisite) (default: false) */
  lenientMode?: boolean
}

const DEFAULT_PREREQ_CONFIG: PrerequisiteFilterConfig = {
  enabled: true,
  allowMissingPrerequisites: true,
  lenientMode: false
}

/**
 * Filter problems by prerequisite skills (backward compatible)
 * 
 * This function is designed to be backward compatible:
 * - Problems without prerequisiteSkills are ALWAYS shown (unless explicitly configured otherwise)
 * - If user has no mastered skills, all problems are shown
 * - Filtering can be disabled entirely via config
 * 
 * @param problems - Array of problems to filter
 * @param userMasteredSkills - Set or array of skill IDs the user has mastered
 * @param config - Optional configuration for filtering behavior
 * @returns Filtered array of problems the user is ready for
 */
export function filterByPrerequisites<T extends MathProblem | ReadingExercise>(
  problems: T[],
  userMasteredSkills: Set<string> | string[] | undefined | null,
  config: PrerequisiteFilterConfig = DEFAULT_PREREQ_CONFIG
): T[] {
  const { enabled = true, allowMissingPrerequisites = true, lenientMode = false } = config
  
  // If filtering is disabled, return all problems
  if (!enabled) {
    return problems
  }
  
  // Convert to Set for O(1) lookups
  const masteredSet = userMasteredSkills instanceof Set 
    ? userMasteredSkills 
    : new Set(userMasteredSkills || [])
  
  // If user has no mastered skills data, return all problems (backward compatible)
  if (masteredSet.size === 0) {
    return problems
  }
  
  return problems.filter(problem => {
    // Check if problem has prerequisiteSkills field
    const prereqs = (problem as MathProblem).prerequisiteSkills
    
    // Backward compatible: problems without prerequisites are always available
    if (!prereqs || prereqs.length === 0) {
      return allowMissingPrerequisites
    }
    
    // Lenient mode: user needs ANY of the prerequisites
    if (lenientMode) {
      return prereqs.some(prereq => masteredSet.has(prereq))
    }
    
    // Strict mode (default): user needs ALL prerequisites
    return prereqs.every(prereq => masteredSet.has(prereq))
  })
}

/**
 * Check if a user is ready for a specific problem based on prerequisites
 * 
 * @param problem - The problem to check
 * @param userMasteredSkills - Skills the user has mastered
 * @returns Object with readiness status and missing prerequisites
 */
export function checkProblemReadiness(
  problem: MathProblem,
  userMasteredSkills: Set<string> | string[]
): { isReady: boolean; missingPrerequisites: string[] } {
  const prereqs = problem.prerequisiteSkills
  
  // No prerequisites = always ready
  if (!prereqs || prereqs.length === 0) {
    return { isReady: true, missingPrerequisites: [] }
  }
  
  const masteredSet = userMasteredSkills instanceof Set 
    ? userMasteredSkills 
    : new Set(userMasteredSkills)
  
  const missing = prereqs.filter(prereq => !masteredSet.has(prereq))
  
  return {
    isReady: missing.length === 0,
    missingPrerequisites: missing
  }
}

/**
 * Get prerequisite coverage statistics for a set of problems
 * Useful for analytics and debugging
 */
export function getPrerequisiteCoverage(problems: MathProblem[]): {
  total: number
  withPrerequisites: number
  withoutPrerequisites: number
  coveragePercent: number
} {
  const withPrereqs = problems.filter(p => 
    p.prerequisiteSkills && p.prerequisiteSkills.length > 0
  ).length
  
  return {
    total: problems.length,
    withPrerequisites: withPrereqs,
    withoutPrerequisites: problems.length - withPrereqs,
    coveragePercent: problems.length > 0 
      ? Math.round((withPrereqs / problems.length) * 100) 
      : 0
  }
}

// ============================================================================
// Problem Selection Strategies
// ============================================================================

/**
 * Fallback strategy for problem selection
 */
export interface ProblemSelectionStrategy {
  /** Target difficulty level */
  targetDifficulty: number
  /** IDs to exclude */
  excludeIds: string[]
  /** Whether to allow generation if no cached problems found */
  allowGeneration?: boolean
}

/**
 * Result from problem selection with optional usage tracking
 */
export interface ProblemSelectionResult {
  problem: MathProblem | ReadingExercise | null
  wasGenerated: boolean
  generationType?: 'template' | 'ai'
  usage?: {
    input_tokens: number
    output_tokens: number
    model: string
  }
}

/**
 * Try template-based generation for math problems (free, no AI cost)
 */
async function tryTemplateGeneration(
  targetDifficulty: number
): Promise<MathProblem | null> {
  try {
    const { generateProblem } = await import('@/lib/problem-generation/generator')
    
    const result = generateProblem({
      subject: 'math',
      targetDifficulty,
      includeExplanation: true
    })
    
    if (result.success && result.problem) {
      // Convert GeneratedProblem to MathProblem format
      const generatedProblem = result.problem
      
      // Determine topic from template category if available
      const topic = generatedProblem.skills?.length 
        ? generatedProblem.skills[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : 'Arithmetic'
      
      const mathProblem: MathProblem = {
        id: generatedProblem.id,
        type: 'arithmetic', // Template generator mainly does arithmetic
        difficulty: generatedProblem.difficulty,
        question: generatedProblem.problemText,
        correctAnswer: generatedProblem.answer,
        acceptableAnswers: generatedProblem.alternativeAnswers,
        hint: undefined,
        explanation: generatedProblem.explanation || 'Solution computed via verified template.',
        topic,
        subTopic: undefined,
        timeEstimate: Math.round(30 + (generatedProblem.difficulty * 10)), // 40s at difficulty 1, 150s at difficulty 12
        skillIds: generatedProblem.skills,
        tags: ['template-generated'],
        conceptsCovered: generatedProblem.skills,
        commonMistakes: undefined
      }
      return mathProblem
    }
  } catch (error) {
    logger.warn('Trytemplategeneration', 'Template generation failed', { error: error })
  }
  return null
}

/**
 * Select a problem with progressive fallback strategy
 * Tries multiple strategies in order until one succeeds
 */
export async function selectProblemWithFallback(
  subject: 'math' | 'reading',
  strategy: ProblemSelectionStrategy
): Promise<MathProblem | ReadingExercise | null> {
  const result = await selectProblemWithFallbackAndUsage(subject, strategy)
  return result.problem
}

/**
 * Select a problem with progressive fallback strategy and usage tracking
 * Returns usage info when AI generation was used for credit tracking
 */
export async function selectProblemWithFallbackAndUsage(
  subject: 'math' | 'reading',
  strategy: ProblemSelectionStrategy
): Promise<ProblemSelectionResult> {
  const { targetDifficulty, excludeIds, allowGeneration = true } = strategy
  
  // Strategy 1: Try exact difficulty with exclusions
  // Note: Math uses V2 problems now
  let problem: MathProblem | ReadingExercise | null = subject === 'math'
    ? selectMathProblemV2(targetDifficulty, excludeIds) as unknown as MathProblem
    : selectReadingExercise(targetDifficulty, excludeIds)
  
  if (problem) return { problem, wasGenerated: false }
  
  // Strategy 2: Try with broader difficulty range (floor of target)
  const fallbackDifficulty = Math.max(1, Math.floor(targetDifficulty))
  if (fallbackDifficulty !== Math.floor(targetDifficulty)) {
    problem = subject === 'math'
      ? selectMathProblemV2(fallbackDifficulty, excludeIds) as unknown as MathProblem
      : selectReadingExercise(fallbackDifficulty, excludeIds)
    
    if (problem) return { problem, wasGenerated: false }
  }
  
  // Strategy 3: Try without exclusions at target difficulty
  problem = subject === 'math'
    ? selectMathProblemV2(targetDifficulty, []) as unknown as MathProblem
    : selectReadingExercise(targetDifficulty, [])
  
  if (problem) return { problem, wasGenerated: false }
  
  // Strategy 4: Try without exclusions at fallback difficulty
  if (fallbackDifficulty !== targetDifficulty) {
    problem = subject === 'math'
      ? selectMathProblemV2(fallbackDifficulty, []) as unknown as MathProblem
      : selectReadingExercise(fallbackDifficulty, [])
    
    if (problem) return { problem, wasGenerated: false }
  }
  
  // Strategy 5: Try template-based generation for math (FREE - no AI cost)
  if (allowGeneration && subject === 'math') {
    const templateProblem = await tryTemplateGeneration(targetDifficulty)
    if (templateProblem) {
      return { problem: templateProblem, wasGenerated: true, generationType: 'template' }
    }
  }
  
  // Strategy 6: Try AI generation if allowed (COSTS CREDITS)
  if (allowGeneration && process.env.ANTHROPIC_API_KEY) {
    try {
      const { getProblemWithGenerationAndUsage } = await import('./services')
      const result = await getProblemWithGenerationAndUsage(
        subject,
        targetDifficulty,
        excludeIds,
        true
      )
      return {
        // Cast is safe: this function only handles math/reading subjects
        problem: result.problem as MathProblem | ReadingExercise,
        wasGenerated: true,
        generationType: 'ai',
        usage: result.usage
      }
    } catch (error) {
      logger.warn('Selectproblemwithfallback', `AI generation failed for ${subject}`, { error: error })
      // Continue to return null
    }
  }
  
  return { problem: null, wasGenerated: false }
}

/**
 * Format math problem for client (removes correct answers)
 */
export function formatMathProblemForClient(problem: MathProblem | null): MathProblemClient | null {
  if (!problem) return null
  
  return {
    id: problem.id,
    type: problem.type,
    difficulty: problem.difficulty,
    question: problem.question,
    hint: problem.hint,
    timeEstimate: problem.timeEstimate,
    // Include formatting fields for proper display
    latex: problem.latex,
    topic: problem.topic,
    diagram: problem.diagram,
  }
}

/**
 * Format reading exercise for client (removes correct answers)
 */
export function formatReadingExerciseForClient(exercise: ReadingExercise | MathProblem | null): ReadingExerciseClient | null {
  if (!exercise) return null
  
  // Type guard: check if it's a reading exercise (has 'passage' property)
  if ('passage' in exercise) {
    const readingEx = exercise as ReadingExercise
    return {
      id: readingEx.id,
      type: readingEx.type,
      difficulty: readingEx.difficulty,
      passage: readingEx.passage,
      questions: readingEx.questions.map((q: ReadingQuestion) => ({
        id: q.id,
        question: q.question,
        type: q.type,
        options: q.options,
        skill: q.skill
        // Note: correctAnswer and explanation are NOT sent to client
      })),
      timeEstimate: readingEx.timeEstimate
    }
  }
  
  return null
}

/** Input prompts structure */
interface MetacognitivePromptsInput {
  preActivity?: MetacognitivePromptItem[]
  duringActivity?: MetacognitivePromptItem[]
  postActivity?: MetacognitivePromptItem[]
}

/**
 * Format metacognitive prompts for client
 */
export function formatMetacognitivePromptsForClient(prompts: MetacognitivePromptsInput | null | undefined): MetacognitivePromptsClient | null {
  if (!prompts) return null
  
  const mapPrompt = (p: MetacognitivePromptItem) => ({
    id: p.id,
    prompt: p.prompt,
    purpose: p.purpose
  })
  
  return {
    preActivity: prompts.preActivity?.map(mapPrompt) || [],
    duringActivity: prompts.duringActivity?.map(mapPrompt) || [],
    postActivity: prompts.postActivity?.map(mapPrompt) || []
  }
}

/**
 * Fallback strategy for translation selection
 */
export interface TranslationSelectionStrategy {
  /** Target language (latin or greek) */
  language: ClassicalLanguage
  /** Target difficulty level */
  targetDifficulty: number
  /** IDs to exclude */
  excludeIds: string[]
  /** Whether to allow AI generation if no cached exercises found */
  allowGeneration?: boolean
}

/**
 * Result from translation selection with optional usage tracking
 */
export interface TranslationSelectionResult {
  exercise: TranslationExercise | null
  wasGenerated: boolean
  usage?: {
    input_tokens: number
    output_tokens: number
    model: string
  }
}

/**
 * Select a translation exercise with progressive fallback strategy
 * Tries local store first, then falls back to AI generation if allowed
 */
export async function selectTranslationWithFallback(
  strategy: TranslationSelectionStrategy
): Promise<TranslationExercise | null> {
  const result = await selectTranslationWithFallbackAndUsage(strategy)
  return result.exercise
}

/**
 * Select a translation exercise with progressive fallback strategy and usage tracking
 * Returns usage info when AI generation was used for credit tracking
 */
export async function selectTranslationWithFallbackAndUsage(
  strategy: TranslationSelectionStrategy
): Promise<TranslationSelectionResult> {
  const { language, targetDifficulty, excludeIds, allowGeneration = true } = strategy
  
  // Strategy 1: Try exact difficulty with exclusions
  let exercise = selectTranslationExercise(language, targetDifficulty, excludeIds)
  
  if (exercise) return { exercise, wasGenerated: false }
  
  // Strategy 2: Try with broader difficulty range
  const fallbackDifficulty = Math.max(1, Math.floor(targetDifficulty))
  if (fallbackDifficulty !== Math.floor(targetDifficulty)) {
    exercise = selectTranslationExercise(language, fallbackDifficulty, excludeIds)
    
    if (exercise) return { exercise, wasGenerated: false }
  }
  
  // Strategy 3: Try without exclusions at target difficulty
  exercise = selectTranslationExercise(language, targetDifficulty, [])
  
  if (exercise) return { exercise, wasGenerated: false }
  
  // Strategy 4: Try without exclusions at fallback difficulty
  if (fallbackDifficulty !== targetDifficulty) {
    exercise = selectTranslationExercise(language, fallbackDifficulty, [])
    
    if (exercise) return { exercise, wasGenerated: false }
  }
  
  // Strategy 5: Try AI generation if allowed (COSTS CREDITS)
  if (allowGeneration && process.env.ANTHROPIC_API_KEY) {
    try {
      const { getTranslationWithGenerationAndUsage } = await import('./services')
      const result = await getTranslationWithGenerationAndUsage(
        language,
        targetDifficulty,
        excludeIds,
        true
      )
      return {
        exercise: result.exercise,
        wasGenerated: true,
        usage: result.usage
      }
    } catch (error) {
      logger.warn('Selecttranslationwithfallback', `Generation failed for ${language}`, { error: error })
      // Continue to return null
    }
  }
  
  return { exercise: null, wasGenerated: false }
}

/**
 * Format translation exercise for client (removes acceptable translations)
 */
export function formatTranslationExerciseForClient(exercise: TranslationExercise | null): TranslationExerciseClient | null {
  if (!exercise) return null
  
  return {
    id: exercise.id,
    language: exercise.language,
    difficulty: exercise.difficulty,
    sourceText: exercise.sourceText,
    romanization: exercise.romanization,
    // Send full word data - client handles XP-gating the reveal
    words: exercise.words.map(w => ({
      word: w.word,
      romanization: w.romanization,
      lemma: w.lemma,
      partOfSpeech: w.partOfSpeech,
      meaning: w.meaning,
      grammaticalInfo: w.grammaticalInfo,
      functionInSentence: w.functionInSentence,
      principalParts: w.principalParts,
      derivatives: w.derivatives,
      relatedWords: w.relatedWords,
      pronunciation: w.pronunciation
    })),
    grammarTopic: exercise.grammarTopic,
    grammarSubtopic: exercise.grammarSubtopic,
    // Parsing elements for bonus XP (options included)
    parsingElements: exercise.parsingElements?.map(p => ({
      word: p.word,
      options: p.options
      // Don't include expectedParsing - that's server-side
    })) || [],
    timeEstimate: exercise.timeEstimate,
    sourceAuthor: exercise.sourceAuthor
    // Note: acceptableTranslations is NOT sent to client
  }
}

