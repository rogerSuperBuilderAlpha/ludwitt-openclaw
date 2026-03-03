/**
 * Dialogue Controller
 * 
 * Manages the flow of Socratic dialogues, including state transitions,
 * turn management, and outcome tracking.
 */

import {
  DialogueState,
  DialogueTurn,
  DialoguePhase,
  StudentResponseType,
  SocraticMove,
  SelectedMove,
  DialogueAnalysis,
  SocraticConfig,
  DEFAULT_SOCRATIC_CONFIG
} from './types'
import { selectMove, classifyResponse } from './move-selector'

// ============================================================================
// Dialogue Creation
// ============================================================================

/**
 * Create a new dialogue session
 */
export function createDialogue(params: {
  userId: string
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  problemText: string
  correctAnswer: string
  keyConceptsToElicit: string[]
  commonMisconceptions?: string[]
  maxHints?: number
}): DialogueState {
  const dialogueId = `dlg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  return {
    dialogueId,
    userId: params.userId,
    problemId: params.problemId,
    subject: params.subject,
    difficulty: params.difficulty,
    problemText: params.problemText,
    correctAnswer: params.correctAnswer,
    keyConceptsToElicit: params.keyConceptsToElicit,
    commonMisconceptions: params.commonMisconceptions || [],
    phase: 'setup',
    turns: [],
    currentTurnNumber: 0,
    studentUnderstanding: 0.1,  // Start with low understanding
    detectedMisconceptions: [],
    expressedConfusion: [],
    correctInsights: [],
    startedAt: new Date(),
    lastActivity: new Date(),
    totalDurationMs: 0,
    hintsUsed: 0,
    maxHintsAllowed: params.maxHints || DEFAULT_SOCRATIC_CONFIG.maxHints,
    status: 'active'
  }
}

// ============================================================================
// Turn Management
// ============================================================================

/**
 * Generate the system's opening turn
 */
export function generateOpeningTurn(state: DialogueState): DialogueState {
  const openingMessage = generateOpeningMessage(state)
  
  const turn: DialogueTurn = {
    turnNumber: 1,
    role: 'system',
    content: openingMessage,
    move: 'clarifying_question',
    timestamp: new Date()
  }
  
  return {
    ...state,
    turns: [turn],
    currentTurnNumber: 1,
    lastActivity: new Date()
  }
}

/**
 * Process a student response and generate the next system turn
 */
export function processStudentResponse(
  state: DialogueState,
  studentResponse: string,
  config: SocraticConfig = DEFAULT_SOCRATIC_CONFIG
): DialogueState {
  let updatedState = { ...state }
  
  // Record student turn
  const responseType = classifyResponse(studentResponse, state.correctAnswer, state)
  const studentTurn: DialogueTurn = {
    turnNumber: state.currentTurnNumber + 1,
    role: 'student',
    content: studentResponse,
    responseType,
    timestamp: new Date(),
    annotations: {
      emotionalTone: estimateEmotionalTone(studentResponse),
      progressIndicator: estimateProgress(responseType, state.studentUnderstanding)
    }
  }
  
  updatedState.turns = [...state.turns, studentTurn]
  updatedState.currentTurnNumber += 1
  
  // Update understanding based on response
  updatedState = updateUnderstanding(updatedState, responseType)
  
  // Update misconceptions tracking
  if (responseType === 'incorrect_misconception') {
    updatedState = trackMisconception(updatedState, studentResponse)
  }
  
  // Check for phase transition
  updatedState = checkPhaseTransition(updatedState, config)
  
  // Check for dialogue completion
  if (shouldEndDialogue(updatedState, config)) {
    return endDialogue(updatedState, responseType)
  }
  
  // Select and execute next move
  const turnsWithoutProgress = countTurnsWithoutProgress(updatedState)
  const frustrationLevel = estimateFrustration(updatedState)
  
  const moveContext = {
    dialogueState: updatedState,
    lastStudentResponse: studentResponse,
    lastResponseType: responseType,
    turnsWithoutProgress,
    studentFrustrationLevel: frustrationLevel
  }
  
  const selectedMove = selectMove(moveContext)
  
  // Generate system response
  const systemTurn: DialogueTurn = {
    turnNumber: updatedState.currentTurnNumber + 1,
    role: 'system',
    content: selectedMove.question,
    move: selectedMove.move,
    timestamp: new Date()
  }
  
  // Track hint usage
  if (selectedMove.move === 'scaffolded_hint') {
    updatedState.hintsUsed += 1
  }
  
  updatedState.turns = [...updatedState.turns, systemTurn]
  updatedState.currentTurnNumber += 1
  updatedState.lastActivity = new Date()
  updatedState.totalDurationMs = new Date().getTime() - updatedState.startedAt.getTime()
  
  return updatedState
}

// ============================================================================
// State Updates
// ============================================================================

function updateUnderstanding(
  state: DialogueState,
  responseType: StudentResponseType
): DialogueState {
  let delta = 0
  
  switch (responseType) {
    case 'correct_complete':
      delta = 0.3
      break
    case 'correct_partial':
      delta = 0.15
      break
    case 'incorrect_misconception':
      delta = -0.05
      break
    case 'incorrect_careless':
      delta = 0
      break
    case 'confused':
      delta = -0.05
      break
    case 'question':
      delta = 0.05  // Asking questions shows engagement
      break
    case 'guess':
      delta = 0
      break
    case 'stuck':
      delta = -0.1
      break
    case 'silent':
      delta = -0.05
      break
    case 'off_topic':
      delta = 0
      break
  }
  
  const newUnderstanding = Math.max(0, Math.min(1, state.studentUnderstanding + delta))
  
  return {
    ...state,
    studentUnderstanding: newUnderstanding
  }
}

function trackMisconception(
  state: DialogueState,
  response: string
): DialogueState {
  // Simple heuristic - in production would use more sophisticated detection
  const detected = state.commonMisconceptions.filter(m => 
    response.toLowerCase().includes(m.toLowerCase())
  )
  
  return {
    ...state,
    detectedMisconceptions: [...new Set([...state.detectedMisconceptions, ...detected])]
  }
}

// ============================================================================
// Phase Transitions
// ============================================================================

function checkPhaseTransition(
  state: DialogueState,
  config: SocraticConfig
): DialogueState {
  for (const rule of config.phaseTransitionRules) {
    if (state.phase !== rule.fromPhase) continue
    
    let shouldTransition = false
    
    switch (rule.condition) {
      case 'understanding_above':
        shouldTransition = state.studentUnderstanding > (rule.threshold || 0.5)
        break
      case 'understanding_below':
        shouldTransition = state.studentUnderstanding < (rule.threshold || 0.3)
        break
      case 'turns_exceeded':
        const turnsInPhase = countTurnsInPhase(state)
        shouldTransition = turnsInPhase >= (rule.threshold || 3)
        break
      case 'frustration_high':
        shouldTransition = estimateFrustration(state) > (rule.threshold || config.frustrationThreshold)
        break
      case 'breakthrough':
        shouldTransition = hasBreakthrough(state)
        break
    }
    
    if (shouldTransition) {
      return { ...state, phase: rule.toPhase }
    }
  }
  
  return state
}

function countTurnsInPhase(state: DialogueState): number {
  // Count turns since last phase change
  // Simplified: count from start or look for phase-changing moves
  return state.turns.length / 2  // Rough estimate
}

function hasBreakthrough(state: DialogueState): boolean {
  const recentTurns = state.turns.slice(-4)
  const studentTurns = recentTurns.filter(t => t.role === 'student')
  
  // Breakthrough if recent student responses show sudden improvement
  const correctResponses = studentTurns.filter(t => 
    t.responseType === 'correct_complete' || t.responseType === 'correct_partial'
  )
  
  return correctResponses.length >= 2
}

// ============================================================================
// Dialogue Completion
// ============================================================================

function shouldEndDialogue(
  state: DialogueState,
  config: SocraticConfig
): boolean {
  // Max turns reached
  if (state.currentTurnNumber >= config.maxTurns * 2) {
    return true
  }
  
  // High understanding achieved
  if (state.studentUnderstanding >= 0.9) {
    return true
  }
  
  // In resolution phase
  if (state.phase === 'resolution') {
    const turnsInResolution = countTurnsInPhase(state)
    if (turnsInResolution >= 2) {
      return true
    }
  }
  
  // Timeout
  if (state.totalDurationMs > config.timeoutMinutes * 60 * 1000) {
    return true
  }
  
  return false
}

function endDialogue(
  state: DialogueState,
  lastResponseType: StudentResponseType
): DialogueState {
  let outcome: DialogueState['finalOutcome']
  
  if (state.studentUnderstanding >= 0.8) {
    outcome = 'success'
  } else if (state.studentUnderstanding >= 0.5) {
    outcome = 'partial_success'
  } else {
    outcome = 'failure'
  }
  
  return {
    ...state,
    status: 'completed',
    finalOutcome: outcome,
    learningGain: state.studentUnderstanding - 0.1  // Gain from initial understanding
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function generateOpeningMessage(state: DialogueState): string {
  const openings: Record<string, string> = {
    math: "Let's work through this problem together. What's your first thought when you look at it?",
    reading: "I'd like to explore this passage with you. What stands out to you first?",
    latin: "Let's translate this together. What do you notice about the sentence structure?",
    greek: "Let's work through this Greek text. What words do you recognize?",
    logic: "Let's analyze this argument step by step. What's the main claim being made?"
  }
  
  return openings[state.subject] || "Let's work through this together. What are you thinking?"
}

function estimateEmotionalTone(response: string): 'positive' | 'neutral' | 'negative' | 'frustrated' {
  const lower = response.toLowerCase()
  
  if (lower.includes('!') && (lower.includes('great') || lower.includes('yes') || lower.includes('got it'))) {
    return 'positive'
  }
  
  if (lower.includes('can\'t') || lower.includes('impossible') || lower.includes('give up')) {
    return 'frustrated'
  }
  
  if (lower.includes('don\'t') || lower.includes('confused') || lower.includes('stuck')) {
    return 'negative'
  }
  
  return 'neutral'
}

function estimateProgress(responseType: StudentResponseType, currentUnderstanding: number): number {
  const progressMap: Record<StudentResponseType, number> = {
    correct_complete: 0.95,
    correct_partial: Math.min(currentUnderstanding + 0.2, 0.8),
    incorrect_misconception: currentUnderstanding,
    incorrect_careless: currentUnderstanding + 0.05,
    confused: currentUnderstanding - 0.05,
    off_topic: currentUnderstanding,
    question: currentUnderstanding + 0.05,
    guess: currentUnderstanding,
    stuck: currentUnderstanding - 0.1,
    silent: currentUnderstanding - 0.05
  }
  
  return Math.max(0, Math.min(1, progressMap[responseType]))
}

function countTurnsWithoutProgress(state: DialogueState): number {
  let count = 0
  
  for (let i = state.turns.length - 1; i >= 0; i--) {
    const turn = state.turns[i]
    if (turn.role === 'student') {
      const progress = turn.annotations?.progressIndicator || 0
      if (progress < state.studentUnderstanding - 0.05) {
        count++
      } else {
        break
      }
    }
  }
  
  return count
}

function estimateFrustration(state: DialogueState): number {
  let frustration = 0
  
  // Factor: Many turns without progress
  frustration += Math.min(0.3, countTurnsWithoutProgress(state) * 0.1)
  
  // Factor: Recent negative emotional tones
  const recentTurns = state.turns.slice(-6).filter(t => t.role === 'student')
  const negativeTurns = recentTurns.filter(t => 
    t.annotations?.emotionalTone === 'negative' || 
    t.annotations?.emotionalTone === 'frustrated'
  )
  frustration += (negativeTurns.length / Math.max(1, recentTurns.length)) * 0.3
  
  // Factor: Many hints used
  frustration += (state.hintsUsed / state.maxHintsAllowed) * 0.2
  
  // Factor: Low understanding after many turns
  if (state.turns.length > 10 && state.studentUnderstanding < 0.3) {
    frustration += 0.2
  }
  
  return Math.min(1, frustration)
}

// ============================================================================
// Analysis Functions
// ============================================================================

/**
 * Analyze a completed dialogue session
 */
export function analyzeDialogue(state: DialogueState): DialogueAnalysis {
  const systemTurns = state.turns.filter(t => t.role === 'system')
  
  // Count moves used
  const movesUsed: Record<SocraticMove, number> = {} as Record<SocraticMove, number>
  for (const turn of systemTurns) {
    if (turn.move) {
      movesUsed[turn.move] = (movesUsed[turn.move] || 0) + 1
    }
  }
  
  // Calculate phase durations (simplified)
  const phaseDurations: Record<DialoguePhase, number> = {
    setup: 0,
    exploration: 0,
    challenge: 0,
    scaffolding: 0,
    discovery: 0,
    consolidation: 0,
    resolution: 0
  }
  
  // Calculate progress curve
  const studentProgressCurve = state.turns
    .filter(t => t.role === 'student')
    .map(t => t.annotations?.progressIndicator || 0)
  
  // Find breakthrough turn
  let breakthroughTurn: number | undefined
  for (let i = 1; i < studentProgressCurve.length; i++) {
    if (studentProgressCurve[i] - studentProgressCurve[i - 1] > 0.2) {
      breakthroughTurn = i * 2 + 1  // Approximate turn number
      break
    }
  }
  
  // Identify effective/ineffective moves (simplified)
  const effectiveMoves = Object.entries(movesUsed)
    .filter(([_, count]) => count > 0)
    .map(([move]) => move as SocraticMove)
    .slice(0, 3)
  
  return {
    dialogueId: state.dialogueId,
    totalTurns: state.turns.length,
    avgTurnDuration: state.totalDurationMs / state.turns.length,
    movesUsed,
    phaseDurations,
    studentProgressCurve,
    breakthroughTurn,
    effectiveMoves,
    ineffectiveMoves: [],
    misconceptionsAddressed: state.detectedMisconceptions,
    misconceptionsPersisting: []
  }
}
