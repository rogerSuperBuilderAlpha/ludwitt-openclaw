/**
 * Socratic Dialogue Engine Types
 * 
 * Type definitions for the adaptive dialogue system that guides
 * students through problem-solving via strategic questioning.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Types of Socratic moves the system can make
 */
export type SocraticMove =
  | 'clarifying_question'    // "What do you mean by...?"
  | 'probing_question'       // "Why do you think that?"
  | 'assumption_check'       // "What are you assuming here?"
  | 'implication_question'   // "What would follow from that?"
  | 'perspective_prompt'     // "How might someone else see this?"
  | 'evidence_request'       // "What evidence supports that?"
  | 'counterexample'         // "What about this case...?"
  | 'synthesis_prompt'       // "How does this connect to...?"
  | 'guided_discovery'       // Lead toward insight
  | 'scaffolded_hint'        // Structured help
  | 'metacognitive_prompt'   // "What strategy are you using?"
  | 'encouragement'          // Emotional support
  | 'summary_request'        // "Can you summarize...?"
  | 'redirect'               // Steer back on track

/**
 * Student response classification
 */
export type StudentResponseType =
  | 'correct_complete'       // Full correct answer
  | 'correct_partial'        // Partially correct
  | 'incorrect_misconception' // Wrong due to misconception
  | 'incorrect_careless'     // Careless error
  | 'confused'               // Expresses confusion
  | 'off_topic'              // Unrelated to problem
  | 'question'               // Asked a question
  | 'guess'                  // Random guess
  | 'stuck'                  // No progress
  | 'silent'                 // No response

/**
 * Dialogue state phases
 */
export type DialoguePhase =
  | 'setup'          // Introducing the problem
  | 'exploration'    // Initial student engagement
  | 'challenge'      // Questioning assumptions
  | 'scaffolding'    // Providing structured help
  | 'discovery'      // Guiding to insight
  | 'consolidation'  // Reinforcing learning
  | 'resolution'     // Wrapping up

// ============================================================================
// Dialogue State
// ============================================================================

export interface DialogueTurn {
  turnNumber: number
  role: 'system' | 'student'
  content: string
  move?: SocraticMove          // For system turns
  responseType?: StudentResponseType  // For student turns
  timestamp: Date
  annotations?: {
    confidence?: number
    emotionalTone?: 'positive' | 'neutral' | 'negative' | 'frustrated'
    progressIndicator?: number  // 0-1 how close to solution
  }
}

export interface DialogueState {
  dialogueId: string
  userId: string
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  
  // Problem context
  problemText: string
  correctAnswer: string
  keyConceptsToElicit: string[]
  commonMisconceptions: string[]
  
  // Dialogue tracking
  phase: DialoguePhase
  turns: DialogueTurn[]
  currentTurnNumber: number
  
  // Student state
  studentUnderstanding: number  // 0-1 estimated understanding
  detectedMisconceptions: string[]
  expressedConfusion: string[]
  correctInsights: string[]
  
  // Session metadata
  startedAt: Date
  lastActivity: Date
  totalDurationMs: number
  hintsUsed: number
  maxHintsAllowed: number
  
  // Outcome
  status: 'active' | 'completed' | 'abandoned' | 'timeout'
  finalOutcome?: 'success' | 'partial_success' | 'failure'
  learningGain?: number
}

// ============================================================================
// Move Selection
// ============================================================================

export interface MoveCandidate {
  move: SocraticMove
  priority: number
  rationale: string
  questionTemplate: string
  expectedOutcome: string
}

export interface MoveSelectionContext {
  dialogueState: DialogueState
  lastStudentResponse?: string
  lastResponseType?: StudentResponseType
  turnsWithoutProgress: number
  studentFrustrationLevel: number  // 0-1
  remainingTime?: number
}

export interface SelectedMove {
  move: SocraticMove
  question: string
  rationale: string
  fallbackMoves: SocraticMove[]
  expectedStudentResponses: string[]
}

// ============================================================================
// Question Templates
// ============================================================================

export interface QuestionTemplate {
  move: SocraticMove
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'all'
  template: string
  placeholders: string[]
  appropriatePhases: DialoguePhase[]
  studentUnderstandingRange: [number, number]  // [min, max]
  frustrationThreshold: number  // Max frustration level
  successRate?: number  // Historical success rate
}

// ============================================================================
// LLM Integration
// ============================================================================

export interface DialogueLLMRequest {
  dialogueState: DialogueState
  selectedMove: SocraticMove
  contextForLLM: string
  constraints: {
    maxTokens: number
    tone: 'encouraging' | 'neutral' | 'challenging'
    complexity: 'simple' | 'moderate' | 'advanced'
    avoidPhrases: string[]
  }
}

export interface DialogueLLMResponse {
  generatedQuestion: string
  alternativeQuestions: string[]
  estimatedDifficulty: number
  modelConfidence: number
}

// ============================================================================
// Session Analysis
// ============================================================================

export interface DialogueAnalysis {
  dialogueId: string
  totalTurns: number
  avgTurnDuration: number
  movesUsed: Record<SocraticMove, number>
  phaseDurations: Record<DialoguePhase, number>
  studentProgressCurve: number[]
  breakthroughTurn?: number  // Turn where understanding jumped
  effectiveMoves: SocraticMove[]
  ineffectiveMoves: SocraticMove[]
  misconceptionsAddressed: string[]
  misconceptionsPersisting: string[]
}

// ============================================================================
// Configuration
// ============================================================================

export interface SocraticConfig {
  maxTurns: number
  maxHints: number
  timeoutMinutes: number
  minTurnsBeforeHint: number
  frustrationThreshold: number
  progressThreshold: number  // Min progress to continue
  phaseTransitionRules: PhaseTransitionRule[]
}

export interface PhaseTransitionRule {
  fromPhase: DialoguePhase
  toPhase: DialoguePhase
  condition: 'understanding_above' | 'understanding_below' | 
             'turns_exceeded' | 'frustration_high' | 'breakthrough'
  threshold?: number
}

export const DEFAULT_SOCRATIC_CONFIG: SocraticConfig = {
  maxTurns: 20,
  maxHints: 3,
  timeoutMinutes: 10,
  minTurnsBeforeHint: 3,
  frustrationThreshold: 0.7,
  progressThreshold: 0.1,
  phaseTransitionRules: [
    { fromPhase: 'setup', toPhase: 'exploration', condition: 'turns_exceeded', threshold: 2 },
    { fromPhase: 'exploration', toPhase: 'challenge', condition: 'understanding_above', threshold: 0.3 },
    { fromPhase: 'exploration', toPhase: 'scaffolding', condition: 'understanding_below', threshold: 0.2 },
    { fromPhase: 'challenge', toPhase: 'discovery', condition: 'understanding_above', threshold: 0.6 },
    { fromPhase: 'challenge', toPhase: 'scaffolding', condition: 'frustration_high' },
    { fromPhase: 'scaffolding', toPhase: 'discovery', condition: 'breakthrough' },
    { fromPhase: 'discovery', toPhase: 'consolidation', condition: 'understanding_above', threshold: 0.85 },
    { fromPhase: 'consolidation', toPhase: 'resolution', condition: 'turns_exceeded', threshold: 2 }
  ]
}

// ============================================================================
// Storage Types
// ============================================================================

export interface DialogueStateDoc extends Omit<DialogueState, 'startedAt' | 'lastActivity' | 'turns'> {
  startedAt: Date | FirestoreTimestamp
  lastActivity: Date | FirestoreTimestamp
  turns: Array<Omit<DialogueTurn, 'timestamp'> & { timestamp: Date | FirestoreTimestamp }>
}

interface FirestoreTimestamp {
  toDate(): Date
}

export const DIALOGUE_COLLECTIONS = {
  SESSIONS: 'socraticDialogues',
  TEMPLATES: 'socraticTemplates',
  ANALYTICS: 'socraticAnalytics'
}
