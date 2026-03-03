/**
 * Problem Generation Service
 *
 * Uses Anthropic Claude API to generate math problems and reading exercises
 * at specified difficulty levels.
 */

import Anthropic from '@anthropic-ai/sdk'
import { 
  MathProblem, 
  ReadingExercise, 
  TranslationExercise,
  ClassicalLanguage,
  TranslationWord,
  ParsingElement,
  ReadingQuestionType
} from '@/lib/types/basics'
import { LogicProblem, LogicProblemType, LOGIC_UNITS } from '@/data/basics/logic/types'
import { verifyMathProblem } from './review'
import { isAIGenerationAvailable, debugLog } from './config'
import {
  generateId,
  selectMathType,
  selectReadingType,
  getPassageLengthForGrade,
  estimateTimeForDifficulty,
  estimateReadingTime,
  parseJsonResponse,
  getGrammarTopicForGrade,
  getLogicSymbolsForUnit,
  getLogicProblemTypesForUnit
} from './generationUtils'
import {
  getMathPrompt,
  getReadingPrompt,
  getTranslationPrompt,
  getLogicPrompt
} from './generationPrompts'
import { getDefaultModelForTier, getTaskConfig } from '@/lib/ai/providers'

/**
 * Usage info returned from generation functions for credit tracking
 */
export interface GenerationUsage {
  input_tokens: number
  output_tokens: number
  model: string
}

/**
 * Result wrapper that includes usage info for credit tracking
 */
export interface GenerationResult<T> {
  result: T
  usage: GenerationUsage
}

// Re-export utilities for backward compatibility
export { generateId, selectMathType, selectReadingType, getPassageLengthForGrade, estimateTimeForDifficulty, estimateReadingTime }

// Only initialize Anthropic if API key is available
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

// ============================================================================
// Math Problem Generation
// ============================================================================

/**
 * Generate a math problem using Claude API
 * Returns the problem along with usage info for credit tracking
 */
export async function generateMathProblemWithUsage(
  difficulty: number,
  excludeIds: string[] = []
): Promise<GenerationResult<MathProblem>> {
  const gradeLevel = Math.floor(difficulty)
  const problemType = selectMathType(difficulty)

  if (!isAIGenerationAvailable() || !anthropic) {
    throw new Error('AI generation not available - ANTHROPIC_API_KEY not configured or AI disabled')
  }

  const prompt = getMathPrompt(gradeLevel, problemType, difficulty)
  
  // Use generation task defaults (no user context in generation functions)
  const taskConfig = getTaskConfig('generation')
  const model = getDefaultModelForTier(taskConfig.recommendedTier)
  
  const response = await anthropic.messages.create({
    model: model.id,
    max_tokens: taskConfig.defaultMaxTokens,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const problemData = parseJsonResponse(content.text) as {
    question: string
    correctAnswer: string
    acceptableAnswers?: string[]
    hint?: string
    explanation: string
    topic: string
    subTopic?: string
    skillIds?: string[]
    tags?: string[]
    conceptsCovered?: string[]
    commonMistakes?: string[]
  }

  const problem: MathProblem = {
    id: generateId(),
    type: problemType,
    difficulty,
    question: problemData.question,
    correctAnswer: problemData.correctAnswer,
    acceptableAnswers: problemData.acceptableAnswers || [],
    hint: problemData.hint || undefined,
    explanation: problemData.explanation,
    topic: problemData.topic,
    subTopic: problemData.subTopic || undefined,
    timeEstimate: estimateTimeForDifficulty(difficulty),
    skillIds: problemData.skillIds || undefined,
    tags: problemData.tags || undefined,
    conceptsCovered: problemData.conceptsCovered || undefined,
    commonMistakes: problemData.commonMistakes || undefined
  }

  // Track total usage including verification
  let totalInputTokens = response.usage.input_tokens
  let totalOutputTokens = response.usage.output_tokens

  // Optional self-verification - tokens are now included in total usage
  try {
    if (process.env.BASICS_VERIFY_MATH !== 'false') {
      const review = await verifyMathProblem(problem)
      if (!review.isCorrect) {
        problem.correctAnswer = review.computedAnswer
        problem.explanation = review.explanation
      }
      // Add verification tokens to total
      if (review.usage) {
        totalInputTokens += review.usage.input_tokens
        totalOutputTokens += review.usage.output_tokens
      }
    }
  } catch {
    // If verification fails, proceed with original
  }

  return {
    result: problem,
    usage: {
      input_tokens: totalInputTokens,
      output_tokens: totalOutputTokens,
      model: model.id
    }
  }
}

/**
 * Generate a math problem using Claude API (legacy wrapper)
 * @deprecated Use generateMathProblemWithUsage for credit tracking
 */
export async function generateMathProblem(
  difficulty: number,
  excludeIds: string[] = []
): Promise<MathProblem> {
  const { result } = await generateMathProblemWithUsage(difficulty, excludeIds)
  return result
}

// ============================================================================
// Reading Exercise Generation
// ============================================================================

/**
 * Generate a reading exercise using Claude API
 * Returns the exercise along with usage info for credit tracking
 */
export async function generateReadingExerciseWithUsage(
  difficulty: number,
  excludeIds: string[] = []
): Promise<GenerationResult<ReadingExercise>> {
  const gradeLevel = Math.floor(difficulty)
  const exerciseType = selectReadingType(difficulty)
  const passageLength = getPassageLengthForGrade(gradeLevel)

  if (!isAIGenerationAvailable() || !anthropic) {
    throw new Error('AI generation not available - ANTHROPIC_API_KEY not configured or AI disabled')
  }

  const prompt = getReadingPrompt(gradeLevel, passageLength)
  
  // Use generation task defaults
  const readingTaskConfig = getTaskConfig('generation')
  const readingModel = getDefaultModelForTier(readingTaskConfig.recommendedTier)
  
  const response = await anthropic.messages.create({
    model: readingModel.id,
    max_tokens: 2500, // Reading needs more tokens
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const exerciseData = parseJsonResponse(content.text) as {
    passage: string
    lexileScore?: number
    questions: Array<{ question: string; type: string; options?: string[]; correctAnswer: string; explanation: string; skill: string }>
    skillIds?: string[]
    tags?: string[]
    genre?: 'fiction' | 'non-fiction' | 'informational' | 'poetry' | 'literature'
    contentArea?: 'science' | 'history' | 'literature' | 'general'
    thematicElements?: string[]
    vocabularyLevel?: 'basic' | 'intermediate' | 'advanced'
    comprehensionSkills?: string[]
  }

  const exercise: ReadingExercise = {
    id: generateId(),
    type: exerciseType,
    difficulty,
    passage: exerciseData.passage,
    lexileScore: exerciseData.lexileScore,
    questions: exerciseData.questions.map((q) => ({
      id: generateId(),
      question: q.question,
      type: q.type as ReadingQuestionType,
      options: q.options || undefined,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      skill: q.skill
    })),
    timeEstimate: estimateReadingTime(exerciseData.passage, exerciseData.questions.length),
    skillIds: exerciseData.skillIds || undefined,
    tags: exerciseData.tags || undefined,
    genre: exerciseData.genre || undefined,
    contentArea: exerciseData.contentArea || undefined,
    thematicElements: exerciseData.thematicElements || undefined,
    vocabularyLevel: exerciseData.vocabularyLevel || undefined,
    comprehensionSkills: exerciseData.comprehensionSkills || undefined
  }

  return {
    result: exercise,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      model: readingModel.id
    }
  }
}

/**
 * Generate a reading exercise using Claude API (legacy wrapper)
 * @deprecated Use generateReadingExerciseWithUsage for credit tracking
 */
export async function generateReadingExercise(
  difficulty: number,
  excludeIds: string[] = []
): Promise<ReadingExercise> {
  const { result } = await generateReadingExerciseWithUsage(difficulty, excludeIds)
  return result
}

// ============================================================================
// Batch Generation
// ============================================================================

/**
 * Generate multiple problems in batch (for caching)
 */
export async function batchGenerateMathProblems(
  difficulty: number,
  count: number = 5
): Promise<MathProblem[]> {
  const promises = []
  for (let i = 0; i < count; i++) {
    promises.push(generateMathProblem(difficulty))
  }
  return Promise.all(promises)
}

/**
 * Generate multiple reading exercises in batch (for caching)
 */
export async function batchGenerateReadingExercises(
  difficulty: number,
  count: number = 3
): Promise<ReadingExercise[]> {
  const promises = []
  for (let i = 0; i < count; i++) {
    promises.push(generateReadingExercise(difficulty))
  }
  return Promise.all(promises)
}

// ============================================================================
// Classical Language Translation Generation
// ============================================================================

/**
 * Generate a translation exercise using Claude API
 * Returns the exercise along with usage info for credit tracking
 */
export async function generateTranslationExerciseWithUsage(
  language: ClassicalLanguage,
  difficulty: number,
  excludeIds: string[] = []
): Promise<GenerationResult<TranslationExercise>> {
  const gradeLevel = Math.floor(difficulty)
  const grammarInfo = getGrammarTopicForGrade(language, gradeLevel)

  if (!isAIGenerationAvailable() || !anthropic) {
    throw new Error('AI generation not available - ANTHROPIC_API_KEY not configured')
  }

  const prompt = getTranslationPrompt(language, gradeLevel, grammarInfo.topic, grammarInfo.description)
  
  // Use generation task defaults
  const translationTaskConfig = getTaskConfig('generation')
  const translationModel = getDefaultModelForTier(translationTaskConfig.recommendedTier)
  
  const response = await anthropic.messages.create({
    model: translationModel.id,
    max_tokens: 3000, // Translation needs more tokens
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const exerciseData = parseJsonResponse(content.text) as {
    sourceText: string
    romanization?: string
    words: Array<Partial<TranslationWord> & { word: string }>
    grammarTopic: string
    grammarSubtopic?: string
    acceptableTranslations: string[]
    parsingElements?: Array<{ word: string; expectedParsing: { partOfSpeech?: string; grammaticalFunction?: string; morphology?: string }; options?: string[] }>
    timeEstimate?: number
    sourceAuthor?: string
  }

  const exercise: TranslationExercise = {
    id: `${language}-gen-${generateId()}`,
    language,
    difficulty,
    sourceText: exerciseData.sourceText,
    romanization: exerciseData.romanization || undefined,
    words: exerciseData.words.map((w): TranslationWord => ({
      word: w.word,
      romanization: w.romanization || undefined,
      lemma: w.lemma || w.word,
      partOfSpeech: w.partOfSpeech || 'unknown',
      meaning: w.meaning || '',
      grammaticalInfo: w.grammaticalInfo || undefined,
      functionInSentence: w.functionInSentence || '',
      principalParts: w.principalParts || undefined,
      derivatives: w.derivatives || []
    })),
    grammarTopic: exerciseData.grammarTopic,
    grammarSubtopic: exerciseData.grammarSubtopic || undefined,
    acceptableTranslations: exerciseData.acceptableTranslations,
    parsingElements: exerciseData.parsingElements?.map((p): ParsingElement => ({
      word: p.word,
      expectedParsing: {
        partOfSpeech: p.expectedParsing?.partOfSpeech || '',
        grammaticalFunction: p.expectedParsing?.grammaticalFunction || '',
        morphology: p.expectedParsing?.morphology || ''
      },
      options: p.options || []
    })) || [],
    timeEstimate: exerciseData.timeEstimate || 90,
    sourceAuthor: exerciseData.sourceAuthor || undefined
  }

  debugLog(`Generated ${language} translation exercise: ${exercise.id}`)
  
  return {
    result: exercise,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      model: translationModel.id
    }
  }
}

/**
 * Generate a translation exercise using Claude API (legacy wrapper)
 * @deprecated Use generateTranslationExerciseWithUsage for credit tracking
 */
export async function generateTranslationExercise(
  language: ClassicalLanguage,
  difficulty: number,
  excludeIds: string[] = []
): Promise<TranslationExercise> {
  const { result } = await generateTranslationExerciseWithUsage(language, difficulty, excludeIds)
  return result
}

/**
 * Generate multiple translation exercises in batch
 */
export async function batchGenerateTranslationExercises(
  language: ClassicalLanguage,
  difficulty: number,
  count: number = 5
): Promise<TranslationExercise[]> {
  const promises = []
  for (let i = 0; i < count; i++) {
    promises.push(generateTranslationExercise(language, difficulty))
  }
  return Promise.all(promises)
}

// ============================================================================
// Logic Problem Generation
// ============================================================================

/**
 * Generate a logic problem using Claude API
 * Returns the problem along with usage info for credit tracking
 */
export async function generateLogicProblemWithUsage(
  unitId: number,
  options: {
    difficulty?: number
    topic?: string
    problemType?: LogicProblemType
  } = {}
): Promise<GenerationResult<LogicProblem>> {
  const unit = LOGIC_UNITS.find(u => u.id === unitId)
  if (!unit) {
    throw new Error(`Invalid unit ID: ${unitId}`)
  }

  const targetDifficulty = options.difficulty ?? unit.difficulty
  const relevantSymbols = getLogicSymbolsForUnit(unitId)
  const problemTypes = getLogicProblemTypesForUnit(unitId)
  const selectedType = options.problemType || problemTypes[Math.floor(Math.random() * problemTypes.length)]
  const selectedTopic = options.topic || unit.topics[Math.floor(Math.random() * unit.topics.length)]

  if (!isAIGenerationAvailable() || !anthropic) {
    throw new Error('AI generation not available - ANTHROPIC_API_KEY not configured')
  }

  const prompt = getLogicPrompt(unit.name, selectedTopic, selectedType, targetDifficulty, relevantSymbols)
  
  // Use generation task defaults
  const logicTaskConfig = getTaskConfig('generation')
  const logicModel = getDefaultModelForTier(logicTaskConfig.recommendedTier)
  
  const response = await anthropic.messages.create({
    model: logicModel.id,
    max_tokens: logicTaskConfig.defaultMaxTokens,
    messages: [{ role: 'user', content: prompt }]
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const problemData = parseJsonResponse(content.text) as {
    topic?: string
    subTopic?: string
    difficulty?: number
    problemType?: string
    question: string
    description?: string
    options?: Array<{ label: string; text: string }>
    correctAnswer: string
    hint?: string
    explanation: string
    symbols?: string[]
    proofSteps?: string[]
  }

  const problem: LogicProblem = {
    id: `logic-gen-${unitId}-${generateId()}`,
    unit: unitId,
    unitName: unit.name,
    topic: problemData.topic || selectedTopic,
    subTopic: problemData.subTopic,
    difficulty: problemData.difficulty || targetDifficulty,
    problemType: (problemData.problemType as LogicProblemType) || selectedType,
    question: problemData.question,
    description: problemData.description,
    options: problemData.options?.map((opt: { label: string; text: string }) => ({
      label: opt.label,
      text: opt.text,
      isCorrect: opt.label === problemData.correctAnswer
    })),
    correctAnswer: String(problemData.correctAnswer),
    hint: problemData.hint || 'Think about the logical structure.',
    explanation: problemData.explanation,
    symbols: problemData.symbols || relevantSymbols,
    proofSteps: problemData.proofSteps,
    tags: [unit.shortName.toLowerCase()]
  }

  debugLog(`Generated logic problem: ${problem.id}`)
  
  return {
    result: problem,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      model: logicModel.id
    }
  }
}

/**
 * Generate a logic problem using Claude API (legacy wrapper)
 * @deprecated Use generateLogicProblemWithUsage for credit tracking
 */
export async function generateLogicProblem(
  unitId: number,
  options: {
    difficulty?: number
    topic?: string
    problemType?: LogicProblemType
  } = {}
): Promise<LogicProblem> {
  const { result } = await generateLogicProblemWithUsage(unitId, options)
  return result
}

/**
 * Generate multiple logic problems in batch
 */
export async function batchGenerateLogicProblems(
  unitId: number,
  count: number = 5,
  options: {
    difficulty?: number
    topics?: string[]
  } = {}
): Promise<LogicProblem[]> {
  const unit = LOGIC_UNITS.find(u => u.id === unitId)
  if (!unit) {
    throw new Error(`Invalid unit ID: ${unitId}`)
  }

  const promises: Promise<LogicProblem>[] = []
  const topics = options.topics || unit.topics

  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length]
    promises.push(generateLogicProblem(unitId, {
      difficulty: options.difficulty,
      topic
    }))
  }

  return Promise.all(promises)
}
