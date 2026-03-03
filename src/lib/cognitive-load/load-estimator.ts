/**
 * Cognitive Load Estimator
 * 
 * Real-time estimation of cognitive load from behavioral signals
 * and problem characteristics.
 */

import {
  CognitiveLoadEstimate,
  LoadSignal,
  LoadSignalSource,
  LoadRecommendation,
  ProblemComplexity,
  CognitiveProfile,
  CognitiveLoadConfig,
  DEFAULT_COGNITIVE_LOAD_CONFIG,
  RepresentationType
} from './types'
import { SessionSignals } from '@/lib/telemetry/types'

// ============================================================================
// Main Estimation Function
// ============================================================================

/**
 * Estimate current cognitive load from available signals
 */
export function estimateCognitiveLoad(
  input: EstimationInput,
  profile?: CognitiveProfile,
  config: CognitiveLoadConfig = DEFAULT_COGNITIVE_LOAD_CONFIG
): CognitiveLoadEstimate {
  const signals: LoadSignal[] = []
  
  // Extract signals from telemetry
  if (input.telemetrySignals) {
    signals.push(...extractTelemetrySignals(input.telemetrySignals, config))
  }
  
  // Add problem complexity signal
  if (input.problemComplexity) {
    signals.push(createComplexitySignal(input.problemComplexity, config))
  }
  
  // Add prerequisite mastery signal
  if (input.prerequisiteMastery !== undefined) {
    signals.push(createMasterySignal(input.prerequisiteMastery, config))
  }
  
  // Add working memory load signal
  if (input.problemComplexity) {
    signals.push(createWorkingMemorySignal(input.problemComplexity, profile, config))
  }
  
  // Calculate weighted total
  let totalLoad = 0
  let totalWeight = 0
  
  for (const signal of signals) {
    totalLoad += signal.value * signal.weight
    totalWeight += signal.weight
  }
  
  totalLoad = totalWeight > 0 ? totalLoad / totalWeight : 0.5
  
  // Estimate load types
  const { intrinsicLoad, extraneousLoad, germaneLoad } = 
    estimateLoadComponents(signals, input.problemComplexity, totalLoad)
  
  // Personalize thresholds
  const overloadThreshold = profile?.optimalLoadMax ?? config.overloadThreshold
  const underloadThreshold = profile?.optimalLoadMin ?? config.underloadThreshold
  
  // Determine state and recommendation
  const isOverloaded = totalLoad > overloadThreshold
  const isUnderloaded = totalLoad < underloadThreshold
  const recommendation = selectRecommendation(
    totalLoad, 
    intrinsicLoad, 
    extraneousLoad, 
    signals,
    isOverloaded,
    isUnderloaded
  )
  
  // Calculate confidence based on signal count and consistency
  const confidence = calculateConfidence(signals)
  
  return {
    totalLoad,
    intrinsicLoad,
    extraneousLoad,
    germaneLoad,
    confidence,
    signals,
    isOverloaded,
    isUnderloaded,
    recommendation
  }
}

// ============================================================================
// Signal Extraction
// ============================================================================

export interface EstimationInput {
  telemetrySignals?: Partial<SessionSignals>
  problemComplexity?: ProblemComplexity
  prerequisiteMastery?: number
  problemDifficulty?: number
  timeElapsedMs?: number
  expectedTimeMs?: number
}

function extractTelemetrySignals(
  telemetry: Partial<SessionSignals>,
  config: CognitiveLoadConfig
): LoadSignal[] {
  const signals: LoadSignal[] = []
  
  // Response time signal
  if (telemetry.totalTimeMs !== undefined && telemetry.totalTimeMs > 0) {
    // Normalize against expected time (if we had it, use 60s as default)
    const expectedTime = 60000
    const timeRatio = telemetry.totalTimeMs / expectedTime
    
    // Longer time = higher load (but cap at reasonable value)
    const loadValue = Math.min(1, timeRatio * 0.5)
    
    signals.push({
      source: 'response_time',
      value: loadValue,
      weight: config.signalWeights.response_time,
      interpretation: timeRatio > 1.5 
        ? 'Taking significantly longer than expected'
        : timeRatio < 0.5 
          ? 'Responding quickly' 
          : 'Normal response time'
    })
  }
  
  // Revision frequency
  if (telemetry.revisionCount !== undefined || telemetry.majorRevisions !== undefined) {
    const revisions = (telemetry.revisionCount || 0) + (telemetry.majorRevisions || 0) * 2
    const loadValue = Math.min(1, revisions * 0.1)
    
    signals.push({
      source: 'revision_frequency',
      value: loadValue,
      weight: config.signalWeights.revision_frequency,
      interpretation: revisions > 5 
        ? 'Frequent answer revisions' 
        : revisions > 0 
          ? 'Some revisions' 
          : 'No revisions'
    })
  }
  
  // Pause pattern
  if (telemetry.pauseCount !== undefined && telemetry.avgPauseLengthMs !== undefined) {
    // Many long pauses = higher cognitive load
    const pauseScore = (telemetry.pauseCount / 10) * (telemetry.avgPauseLengthMs / 5000)
    const loadValue = Math.min(1, pauseScore)
    
    signals.push({
      source: 'pause_pattern',
      value: loadValue,
      weight: config.signalWeights.pause_pattern,
      interpretation: pauseScore > 0.5 
        ? 'Extended pauses indicating deep processing' 
        : 'Normal pause pattern'
    })
  }
  
  // Hint usage
  if (telemetry.hintRequests !== undefined || telemetry.hintViews !== undefined) {
    const hints = (telemetry.hintRequests || 0) + (telemetry.hintViews || 0)
    const loadValue = Math.min(1, hints * 0.3)
    
    signals.push({
      source: 'hint_usage',
      value: loadValue,
      weight: config.signalWeights.hint_usage,
      interpretation: hints > 2 
        ? 'Heavy reliance on hints' 
        : hints > 0 
          ? 'Used hints' 
          : 'No hints needed'
    })
  }
  
  // Scroll behavior
  if (telemetry.scrollCount !== undefined) {
    // Excessive scrolling = re-reading = higher load
    const loadValue = Math.min(1, telemetry.scrollCount * 0.05)
    
    signals.push({
      source: 'scroll_behavior',
      value: loadValue,
      weight: config.signalWeights.scroll_behavior,
      interpretation: telemetry.scrollCount > 10 
        ? 'Frequent re-reading' 
        : 'Minimal scrolling'
    })
  }
  
  // Keystroke dynamics
  if (telemetry.keystrokeRate !== undefined) {
    // Low keystroke rate with activity = struggling
    // High deletion ratio = uncertainty
    const deletionRatio = telemetry.deletionRatio || 0
    const loadValue = deletionRatio * 0.5 + (telemetry.keystrokeRate < 1 ? 0.3 : 0)
    
    signals.push({
      source: 'keystroke_dynamics',
      value: Math.min(1, loadValue),
      weight: config.signalWeights.keystroke_dynamics,
      interpretation: deletionRatio > 0.3 
        ? 'High deletion rate indicates uncertainty' 
        : 'Normal typing pattern'
    })
  }
  
  return signals
}

function createComplexitySignal(
  complexity: ProblemComplexity,
  config: CognitiveLoadConfig
): LoadSignal {
  return {
    source: 'problem_complexity',
    value: complexity.intrinsicLoadEstimate,
    weight: config.signalWeights.problem_complexity,
    interpretation: `Problem complexity: ${Math.round(complexity.intrinsicLoadEstimate * 100)}%`
  }
}

function createMasterySignal(
  masteryLevel: number,
  config: CognitiveLoadConfig
): LoadSignal {
  // Lower mastery = higher load
  const loadValue = 1 - masteryLevel
  
  return {
    source: 'prerequisite_mastery',
    value: loadValue * 0.7, // Scale down
    weight: config.signalWeights.prerequisite_mastery,
    interpretation: masteryLevel > 0.7 
      ? 'Strong prerequisite knowledge' 
      : masteryLevel > 0.4 
        ? 'Moderate prerequisite knowledge' 
        : 'Weak prerequisite knowledge increases load'
  }
}

function createWorkingMemorySignal(
  complexity: ProblemComplexity,
  profile: CognitiveProfile | undefined,
  config: CognitiveLoadConfig
): LoadSignal {
  // Compare interacting elements to estimated capacity
  const capacity = profile?.estimatedElementLimit ?? 7
  const elements = complexity.interactingElementCount
  
  const loadValue = Math.min(1, elements / capacity)
  
  return {
    source: 'working_memory_load',
    value: loadValue,
    weight: config.signalWeights.working_memory_load,
    interpretation: elements > capacity 
      ? `${elements} elements exceed working memory capacity (${capacity})`
      : `${elements} elements within working memory capacity`
  }
}

// ============================================================================
// Load Component Estimation
// ============================================================================

function estimateLoadComponents(
  signals: LoadSignal[],
  complexity: ProblemComplexity | undefined,
  totalLoad: number
): { intrinsicLoad: number; extraneousLoad: number; germaneLoad: number } {
  // Intrinsic load - from problem complexity
  let intrinsicLoad = complexity?.intrinsicLoadEstimate ?? totalLoad * 0.4
  
  // Extraneous load - from presentation issues (indicated by scroll, revision)
  const scrollSignal = signals.find(s => s.source === 'scroll_behavior')
  const revisionSignal = signals.find(s => s.source === 'revision_frequency')
  
  let extraneousLoad = 0
  if (scrollSignal) extraneousLoad += scrollSignal.value * 0.5
  if (revisionSignal) extraneousLoad += revisionSignal.value * 0.3
  extraneousLoad = Math.min(0.4, extraneousLoad)
  
  // Germane load - the productive part (total - intrinsic - extraneous)
  let germaneLoad = Math.max(0, totalLoad - intrinsicLoad - extraneousLoad)
  
  // Normalize so they sum to totalLoad
  const sum = intrinsicLoad + extraneousLoad + germaneLoad
  if (sum > 0) {
    const scale = totalLoad / sum
    intrinsicLoad *= scale
    extraneousLoad *= scale
    germaneLoad *= scale
  }
  
  return { intrinsicLoad, extraneousLoad, germaneLoad }
}

// ============================================================================
// Recommendation Selection
// ============================================================================

function selectRecommendation(
  totalLoad: number,
  intrinsicLoad: number,
  extraneousLoad: number,
  signals: LoadSignal[],
  isOverloaded: boolean,
  isUnderloaded: boolean
): LoadRecommendation {
  // Underloaded - increase challenge
  if (isUnderloaded) {
    return 'increase_challenge'
  }
  
  // Not overloaded - maintain
  if (!isOverloaded) {
    return 'maintain_current'
  }
  
  // Overloaded - determine best intervention
  
  // If extraneous load is high, reduce distractions
  if (extraneousLoad > 0.2) {
    return 'reduce_distractions'
  }
  
  // Check specific signals for targeted recommendations
  const hintSignal = signals.find(s => s.source === 'hint_usage')
  if (hintSignal && hintSignal.value > 0.5) {
    return 'provide_worked_example'
  }
  
  const wmSignal = signals.find(s => s.source === 'working_memory_load')
  if (wmSignal && wmSignal.value > 0.7) {
    return 'split_problem'
  }
  
  const timeSignal = signals.find(s => s.source === 'response_time')
  if (timeSignal && timeSignal.value > 0.8) {
    // Very long time - might need a break
    return 'take_break'
  }
  
  // Default for high intrinsic load
  if (intrinsicLoad > 0.5) {
    return 'add_scaffolding'
  }
  
  return 'reduce_complexity'
}

// ============================================================================
// Confidence Calculation
// ============================================================================

function calculateConfidence(signals: LoadSignal[]): number {
  if (signals.length === 0) return 0.3
  
  // More signals = higher confidence
  let confidence = Math.min(0.9, 0.4 + signals.length * 0.1)
  
  // Check signal consistency
  const values = signals.map(s => s.value)
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length
  
  // High variance = lower confidence
  if (variance > 0.1) {
    confidence -= variance * 0.3
  }
  
  return Math.max(0.3, Math.min(0.95, confidence))
}

// ============================================================================
// Problem Complexity Analysis
// ============================================================================

/**
 * Analyze problem to estimate complexity
 */
export function analyzeProblemComplexity(
  problemId: string,
  problemText: string,
  problemType: string,
  subject: string,
  difficulty: number
): ProblemComplexity {
  // Count elements in problem
  const elementCount = countElements(problemText, problemType, subject)
  const interactingElementCount = estimateInteractingElements(problemText, problemType, subject)
  
  // Estimate structural complexity
  const steps = estimateSteps(problemType, difficulty)
  const branches = countBranches(problemText)
  
  // Identify representations
  const representations = identifyRepresentations(problemText)
  const translationRequired = representations.length > 1
  
  // Calculate element interactivity (0-1)
  const elementInteractivity = interactingElementCount / Math.max(1, elementCount)
  
  // Calculate intrinsic load
  const intrinsicLoadEstimate = calculateIntrinsicLoad(
    elementInteractivity,
    steps,
    difficulty,
    translationRequired
  )
  
  return {
    problemId,
    elementCount,
    interactingElementCount,
    elementInteractivity,
    steps,
    branches,
    dependencies: Math.floor(interactingElementCount * 0.7),
    representations,
    translationRequired,
    requiredSchemas: [],
    novelElements: Math.floor(difficulty * 0.5),
    intrinsicLoadEstimate
  }
}

function countElements(text: string, problemType: string, subject: string): number {
  let count = 0
  
  // Count numbers
  const numbers = text.match(/\d+/g) || []
  count += numbers.length
  
  // Count variables
  const variables = text.match(/[a-zA-Z](?=\s*[+\-*/=^])/g) || []
  count += variables.length
  
  // Count operations
  const operations = text.match(/[+\-*/^=]/g) || []
  count += operations.length * 0.5
  
  // Count words for reading/language subjects
  if (subject === 'reading' || subject === 'latin' || subject === 'greek') {
    const words = text.split(/\s+/).length
    count += Math.floor(words / 5) // 1 element per 5 words
  }
  
  return Math.max(1, Math.ceil(count))
}

function estimateInteractingElements(text: string, problemType: string, subject: string): number {
  const total = countElements(text, problemType, subject)
  
  // Most elements in math problems interact
  if (subject === 'math') {
    return Math.ceil(total * 0.8)
  }
  
  // Reading has lower element interaction
  if (subject === 'reading') {
    return Math.ceil(total * 0.4)
  }
  
  // Language learning has medium interaction
  return Math.ceil(total * 0.6)
}

function estimateSteps(problemType: string, difficulty: number): number {
  // Base steps by problem type
  const baseSteps: Record<string, number> = {
    'arithmetic': 1,
    'algebra': 3,
    'geometry': 4,
    'word_problem': 4,
    'reading_comprehension': 2,
    'translation': 3,
    'vocabulary': 1,
    'logic': 4
  }
  
  const base = baseSteps[problemType] ?? 2
  return Math.ceil(base + difficulty * 0.3)
}

function countBranches(text: string): number {
  // Count decision points indicated by "if", "when", "or"
  const branchWords = text.match(/\b(if|when|or|either|whether)\b/gi) || []
  return branchWords.length
}

function identifyRepresentations(text: string): RepresentationType[] {
  const reps: RepresentationType[] = []
  
  // Check for numbers/equations
  if (/\d/.test(text) || /[+\-*/=]/.test(text)) {
    reps.push('symbolic')
  }
  
  // Check for significant text
  if (text.length > 50) {
    reps.push('verbal')
  }
  
  // Would check for images/graphs in real implementation
  
  return reps.length > 0 ? reps : ['verbal']
}

function calculateIntrinsicLoad(
  elementInteractivity: number,
  steps: number,
  difficulty: number,
  translationRequired: boolean
): number {
  let load = 0
  
  // Element interactivity contributes most
  load += elementInteractivity * 0.4
  
  // Steps contribute
  load += Math.min(0.3, steps * 0.05)
  
  // Difficulty contributes
  load += difficulty / 10 * 0.2
  
  // Translation adds load
  if (translationRequired) {
    load += 0.1
  }
  
  return Math.min(1, load)
}
