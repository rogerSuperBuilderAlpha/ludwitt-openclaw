/**
 * Socratic Move Selector
 * 
 * Selects the appropriate Socratic move based on dialogue state
 * and student responses.
 */

import {
  SocraticMove,
  StudentResponseType,
  DialoguePhase,
  DialogueState,
  MoveCandidate,
  MoveSelectionContext,
  SelectedMove,
  DEFAULT_SOCRATIC_CONFIG
} from './types'
import { QUESTION_TEMPLATES, getTemplatesForMove } from './templates'

// ============================================================================
// Move Priorities by Phase
// ============================================================================

const PHASE_MOVE_PRIORITIES: Record<DialoguePhase, SocraticMove[]> = {
  setup: ['clarifying_question', 'metacognitive_prompt'],
  exploration: ['probing_question', 'clarifying_question', 'assumption_check'],
  challenge: ['counterexample', 'implication_question', 'perspective_prompt'],
  scaffolding: ['scaffolded_hint', 'guided_discovery', 'clarifying_question'],
  discovery: ['implication_question', 'synthesis_prompt', 'evidence_request'],
  consolidation: ['summary_request', 'perspective_prompt', 'synthesis_prompt'],
  resolution: ['summary_request', 'encouragement', 'metacognitive_prompt']
}

// ============================================================================
// Response-Based Move Selection
// ============================================================================

const RESPONSE_MOVE_MAP: Record<StudentResponseType, SocraticMove[]> = {
  correct_complete: ['encouragement', 'synthesis_prompt', 'metacognitive_prompt'],
  correct_partial: ['probing_question', 'implication_question', 'evidence_request'],
  incorrect_misconception: ['assumption_check', 'counterexample', 'clarifying_question'],
  incorrect_careless: ['clarifying_question', 'metacognitive_prompt'],
  confused: ['scaffolded_hint', 'clarifying_question', 'guided_discovery'],
  off_topic: ['redirect', 'clarifying_question'],
  question: ['clarifying_question', 'guided_discovery'],
  guess: ['probing_question', 'evidence_request', 'metacognitive_prompt'],
  stuck: ['scaffolded_hint', 'guided_discovery', 'encouragement'],
  silent: ['encouragement', 'clarifying_question', 'scaffolded_hint']
}

// ============================================================================
// Main Selection Function
// ============================================================================

/**
 * Select the best Socratic move given the current context
 */
export function selectMove(context: MoveSelectionContext): SelectedMove {
  const { dialogueState, lastResponseType, turnsWithoutProgress, studentFrustrationLevel } = context
  
  // Generate move candidates
  const candidates = generateMoveCandidates(context)
  
  // Score and rank candidates
  const scoredCandidates = candidates.map(candidate => ({
    ...candidate,
    score: scoreCandidate(candidate, context)
  }))
  
  // Sort by score
  scoredCandidates.sort((a, b) => b.score - a.score)
  
  // Select top candidate
  const selected = scoredCandidates[0]
  
  if (!selected) {
    // Fallback to generic encouragement
    return createFallbackMove(dialogueState)
  }
  
  // Generate the actual question from template
  const question = generateQuestion(selected, dialogueState)
  
  return {
    move: selected.move,
    question,
    rationale: selected.rationale,
    fallbackMoves: scoredCandidates.slice(1, 3).map(c => c.move),
    expectedStudentResponses: getExpectedResponses(selected.move)
  }
}

// ============================================================================
// Candidate Generation
// ============================================================================

function generateMoveCandidates(context: MoveSelectionContext): MoveCandidate[] {
  const { dialogueState, lastResponseType, studentFrustrationLevel } = context
  const candidates: MoveCandidate[] = []
  
  // Get phase-appropriate moves
  const phaseMoves = PHASE_MOVE_PRIORITIES[dialogueState.phase] || []
  
  // Get response-appropriate moves
  const responseMoves = lastResponseType 
    ? RESPONSE_MOVE_MAP[lastResponseType] || []
    : []
  
  // Combine and deduplicate
  const allMoves = new Set([...phaseMoves, ...responseMoves])
  
  // Generate candidates
  for (const move of allMoves) {
    const templates = getTemplatesForMove(move, dialogueState.subject)
    
    if (templates.length === 0) continue
    
    // Filter templates by understanding range and frustration
    const applicableTemplates = templates.filter(t => {
      const [minU, maxU] = t.studentUnderstandingRange
      return dialogueState.studentUnderstanding >= minU &&
             dialogueState.studentUnderstanding <= maxU &&
             studentFrustrationLevel <= t.frustrationThreshold
    })
    
    if (applicableTemplates.length === 0) continue
    
    // Pick best template
    const template = applicableTemplates[0]
    
    candidates.push({
      move,
      priority: phaseMoves.indexOf(move) + 1 || 5,
      rationale: generateRationale(move, context),
      questionTemplate: template.template,
      expectedOutcome: getExpectedOutcome(move)
    })
  }
  
  return candidates
}

// ============================================================================
// Candidate Scoring
// ============================================================================

interface ScoredCandidate extends MoveCandidate {
  score: number
}

function scoreCandidate(
  candidate: MoveCandidate,
  context: MoveSelectionContext
): number {
  const { dialogueState, turnsWithoutProgress, studentFrustrationLevel } = context
  let score = 10 - candidate.priority  // Base score from priority
  
  // Boost for moves not recently used
  const recentMoves = dialogueState.turns
    .slice(-5)
    .filter(t => t.role === 'system' && t.move)
    .map(t => t.move)
  
  if (!recentMoves.includes(candidate.move)) {
    score += 2
  }
  
  // Adjust for frustration level
  if (studentFrustrationLevel > 0.5) {
    // Prefer supportive moves
    if (['encouragement', 'scaffolded_hint', 'guided_discovery'].includes(candidate.move)) {
      score += 3
    }
    // Avoid challenging moves
    if (['counterexample', 'assumption_check', 'challenge'].includes(candidate.move)) {
      score -= 3
    }
  }
  
  // Adjust for lack of progress
  if (turnsWithoutProgress > 2) {
    if (['scaffolded_hint', 'guided_discovery'].includes(candidate.move)) {
      score += 2
    }
  }
  
  // Adjust for high understanding
  if (dialogueState.studentUnderstanding > 0.7) {
    if (['synthesis_prompt', 'metacognitive_prompt', 'summary_request'].includes(candidate.move)) {
      score += 2
    }
  }
  
  // Penalty for overusing hints
  if (candidate.move === 'scaffolded_hint' && dialogueState.hintsUsed >= dialogueState.maxHintsAllowed - 1) {
    score -= 5
  }
  
  return score
}

// ============================================================================
// Question Generation
// ============================================================================

function generateQuestion(candidate: MoveCandidate, state: DialogueState): string {
  let question = candidate.questionTemplate
  
  // Replace placeholders
  question = question.replace('{topic}', state.subject)
  question = question.replace('{concept}', state.keyConceptsToElicit[0] || 'this concept')
  question = question.replace('{problem}', 'the problem')
  
  // Subject-specific customization
  if (state.subject === 'math') {
    question = question.replace('{operation}', 'calculation')
    question = question.replace('{answer}', 'solution')
  } else if (state.subject === 'reading') {
    question = question.replace('{operation}', 'analysis')
    question = question.replace('{answer}', 'interpretation')
  } else if (state.subject === 'latin' || state.subject === 'greek') {
    question = question.replace('{operation}', 'translation')
    question = question.replace('{answer}', 'meaning')
  }
  
  return question
}

// ============================================================================
// Helper Functions
// ============================================================================

function generateRationale(move: SocraticMove, context: MoveSelectionContext): string {
  const rationales: Record<SocraticMove, string> = {
    clarifying_question: "Need to understand student's thinking better",
    probing_question: "Explore the reasoning behind their response",
    assumption_check: "Identify potential hidden assumptions",
    implication_question: "Help student see consequences of their thinking",
    perspective_prompt: "Encourage broader thinking",
    evidence_request: "Ground claims in evidence",
    counterexample: "Challenge the current understanding productively",
    synthesis_prompt: "Connect ideas together",
    guided_discovery: "Lead toward insight without giving answer",
    scaffolded_hint: "Provide structured support",
    metacognitive_prompt: "Develop awareness of thinking process",
    encouragement: "Maintain motivation and engagement",
    summary_request: "Consolidate understanding",
    redirect: "Bring focus back to the problem"
  }
  
  return rationales[move] || "Continue the dialogue productively"
}

function getExpectedOutcome(move: SocraticMove): string {
  const outcomes: Record<SocraticMove, string> = {
    clarifying_question: "Student clarifies their thinking",
    probing_question: "Student explains their reasoning",
    assumption_check: "Student identifies assumptions",
    implication_question: "Student recognizes implications",
    perspective_prompt: "Student considers alternatives",
    evidence_request: "Student provides justification",
    counterexample: "Student revises understanding",
    synthesis_prompt: "Student connects concepts",
    guided_discovery: "Student makes progress toward insight",
    scaffolded_hint: "Student gets unstuck",
    metacognitive_prompt: "Student reflects on process",
    encouragement: "Student stays engaged",
    summary_request: "Student articulates understanding",
    redirect: "Student refocuses on problem"
  }
  
  return outcomes[move] || "Dialogue progresses"
}

function getExpectedResponses(move: SocraticMove): string[] {
  const responses: Record<SocraticMove, string[]> = {
    clarifying_question: ["I meant...", "What I'm thinking is..."],
    probing_question: ["Because...", "I think that because..."],
    assumption_check: ["I'm assuming that...", "I didn't think about..."],
    implication_question: ["That would mean...", "Then it would..."],
    perspective_prompt: ["Someone else might think...", "Another way to see it..."],
    evidence_request: ["I know this because...", "The text says..."],
    counterexample: ["Oh, I see...", "But what about..."],
    synthesis_prompt: ["This connects to...", "It's like..."],
    guided_discovery: ["So maybe...", "Could it be..."],
    scaffolded_hint: ["Okay, so...", "That helps, now I can..."],
    metacognitive_prompt: ["I'm trying to...", "My strategy is..."],
    encouragement: ["Thanks!", "I'll keep trying..."],
    summary_request: ["So basically...", "In summary..."],
    redirect: ["Right, so going back to...", "For this problem..."]
  }
  
  return responses[move] || ["(Student response)"]
}

function createFallbackMove(state: DialogueState): SelectedMove {
  return {
    move: 'encouragement',
    question: "You're making progress. What are you thinking about right now?",
    rationale: "Fallback to supportive question",
    fallbackMoves: ['clarifying_question', 'scaffolded_hint'],
    expectedStudentResponses: ["I'm thinking...", "I'm stuck on..."]
  }
}

// ============================================================================
// Response Classification
// ============================================================================

/**
 * Classify a student response (simplified rule-based version)
 */
export function classifyResponse(
  response: string,
  correctAnswer: string,
  dialogueState: DialogueState
): StudentResponseType {
  const responseLower = response.toLowerCase().trim()
  const correctLower = correctAnswer.toLowerCase().trim()
  
  // Check for empty or minimal response
  if (responseLower.length < 3) {
    return 'silent'
  }
  
  // Check for confusion signals
  const confusionSignals = ['i don\'t know', 'confused', 'not sure', 'don\'t understand', 'help']
  if (confusionSignals.some(signal => responseLower.includes(signal))) {
    return 'confused'
  }
  
  // Check for questions
  if (responseLower.includes('?')) {
    return 'question'
  }
  
  // Check for stuck signals
  const stuckSignals = ['stuck', 'can\'t', 'impossible', 'give up']
  if (stuckSignals.some(signal => responseLower.includes(signal))) {
    return 'stuck'
  }
  
  // Check for correct answer
  if (responseLower.includes(correctLower) || correctLower.includes(responseLower)) {
    // Check if complete
    if (responseLower.length > correctLower.length * 0.8) {
      return 'correct_complete'
    }
    return 'correct_partial'
  }
  
  // Check for known misconception patterns
  for (const misconception of dialogueState.commonMisconceptions) {
    if (responseLower.includes(misconception.toLowerCase())) {
      return 'incorrect_misconception'
    }
  }
  
  // Check for off-topic (no relevant keywords)
  const relevantKeywords = dialogueState.keyConceptsToElicit.map(k => k.toLowerCase())
  const hasRelevantContent = relevantKeywords.some(kw => responseLower.includes(kw))
  if (!hasRelevantContent && responseLower.length > 20) {
    return 'off_topic'
  }
  
  // Default to guess/incorrect
  return responseLower.length < 15 ? 'guess' : 'incorrect_careless'
}
