/**
 * Intervention Selector
 * 
 * Selects and constructs appropriate interventions based on
 * struggle prediction and context.
 */

import {
  StrugglePrediction,
  Intervention,
  InterventionType,
  StruggleSignalType,
  InterventionOutcome,
  MonitoringConfig,
  DEFAULT_MONITORING_CONFIG
} from './types'

// ============================================================================
// Types
// ============================================================================

export interface InterventionContext {
  problemId: string
  problemText?: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  previousInterventions: Intervention[]
  userPreferences?: {
    preferHints: boolean
    preferExamples: boolean
    preferEasierProblems: boolean
  }
}

// ============================================================================
// Intervention Templates
// ============================================================================

const ENCOURAGEMENT_MESSAGES = [
  "You're making progress! Take your time.",
  "Don't worry, this is a tricky one. Keep going!",
  "You've got this! Think through it step by step.",
  "It's okay to take a moment to think.",
  "You're doing great - persistence pays off!"
]

const GENTLE_HINT_TEMPLATES = {
  math: [
    "What's the first step you need to take?",
    "Have you tried breaking this into smaller parts?",
    "What information do you already know?",
    "Can you identify what type of problem this is?"
  ],
  reading: [
    "Try re-reading the key sentence.",
    "What's the main idea of this passage?",
    "Look for context clues around the answer.",
    "What words give you hints about the meaning?"
  ],
  latin: [
    "Check the ending of the word carefully.",
    "What case is the noun in?",
    "Look at the verb - what tense is it?",
    "Consider the word order in this sentence."
  ],
  greek: [
    "Pay attention to the accent marks.",
    "What's the root of this word?",
    "Check the verb ending for person and number.",
    "Look for connecting words that show relationships."
  ],
  logic: [
    "What premises do you have?",
    "Try working backwards from the conclusion.",
    "Can you identify any logical fallacies?",
    "What's the relationship between the statements?"
  ]
}

const SCAFFOLD_TEMPLATES = {
  math: {
    step1: "First, identify what you're solving for.",
    step2: "Write down the information given.",
    step3: "Choose the right formula or approach.",
    step4: "Substitute and solve step by step."
  },
  reading: {
    step1: "Read the question carefully.",
    step2: "Find the relevant part of the text.",
    step3: "Look for key words that match the question.",
    step4: "Formulate your answer in your own words."
  },
  latin: {
    step1: "Identify the verb and its subject.",
    step2: "Find the main clause structure.",
    step3: "Parse each noun for case and function.",
    step4: "Put it together in natural order."
  },
  greek: {
    step1: "Find the verb and identify its tense.",
    step2: "Identify the subject (often in the verb ending).",
    step3: "Parse the nouns for case.",
    step4: "Translate according to Greek word order rules."
  },
  logic: {
    step1: "List all the premises clearly.",
    step2: "Identify the logical structure.",
    step3: "Apply the relevant rules of inference.",
    step4: "Check if your conclusion follows validly."
  }
}

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Select and construct an intervention
 */
export function selectIntervention(
  prediction: StrugglePrediction,
  context: InterventionContext
): Intervention | null {
  const { suggestedIntervention, signals } = prediction
  
  // Check if we should intervene at all
  if (suggestedIntervention === 'none') {
    return null
  }
  
  // Check intervention history to avoid repetition
  const recentTypes = context.previousInterventions
    .slice(-3)
    .map(i => i.type)
  
  // If suggested intervention was recently used, try alternatives
  let interventionType: InterventionType = suggestedIntervention
  if (recentTypes.includes(suggestedIntervention)) {
    interventionType = getAlternativeIntervention(suggestedIntervention, recentTypes, prediction.level)
  }
  
  // Construct the intervention (type is never 'none' here due to early return above)
  return constructIntervention(interventionType, context, signals)
}

/**
 * Get alternative intervention type
 */
function getAlternativeIntervention(
  suggested: InterventionType,
  recentTypes: InterventionType[],
  level: string
): InterventionType {
  const alternatives: Record<InterventionType, InterventionType[]> = {
    'none': ['none'],
    'encouragement': ['gentle_hint', 'encouragement'],
    'gentle_hint': ['specific_hint', 'scaffolded_steps', 'encouragement'],
    'specific_hint': ['scaffolded_steps', 'worked_example'],
    'scaffolded_steps': ['specific_hint', 'worked_example'],
    'worked_example': ['easier_problem', 'scaffolded_steps'],
    'easier_problem': ['worked_example', 'break_suggestion'],
    'break_suggestion': ['easier_problem', 'worked_example'],
    'concept_review': ['worked_example', 'scaffolded_steps']
  }
  
  const options = alternatives[suggested] || [suggested]
  
  // Find first alternative not recently used
  for (const option of options) {
    if (!recentTypes.includes(option)) {
      return option
    }
  }
  
  // Default to suggested if all alternatives were recently used
  return suggested
}

/**
 * Construct a complete intervention
 */
function constructIntervention(
  type: InterventionType,
  context: InterventionContext,
  signals: StrugglePrediction['signals']
): Intervention {
  const interventionId = generateInterventionId()
  const triggeredBy = signals.map(s => s.type)
  
  const base: Omit<Intervention, 'message' | 'hintContent' | 'steps' | 'problemId'> = {
    type,
    severity: getSeverity(type),
    interventionId,
    triggeredBy,
    timestamp: new Date()
  }
  
  switch (type) {
    case 'encouragement':
      return {
        ...base,
        message: getRandomItem(ENCOURAGEMENT_MESSAGES)
      }
    
    case 'gentle_hint':
      return {
        ...base,
        message: "Here's something to consider:",
        hintContent: getRandomItem(GENTLE_HINT_TEMPLATES[context.subject])
      }
    
    case 'specific_hint':
      return {
        ...base,
        message: "Try this approach:",
        hintContent: generateSpecificHint(context)
      }
    
    case 'scaffolded_steps':
      const steps = SCAFFOLD_TEMPLATES[context.subject]
      return {
        ...base,
        message: "Let's break this down step by step:",
        steps: Object.values(steps)
      }
    
    case 'worked_example':
      return {
        ...base,
        message: "Here's a similar problem worked out:",
        hintContent: "A worked example would be shown here with step-by-step solution."
      }
    
    case 'easier_problem':
      return {
        ...base,
        message: "This one's challenging! Want to try a simpler problem first?",
        problemId: undefined // Would be filled by problem selection logic
      }
    
    case 'break_suggestion':
      return {
        ...base,
        message: "You've been working hard! Taking a short break can help clear your mind."
      }
    
    case 'concept_review':
      return {
        ...base,
        message: "Let's review the key concept:",
        hintContent: generateConceptReview(context)
      }
    
    case 'none':
      // Shouldn't reach here as 'none' is handled earlier, but needed for exhaustiveness
      return {
        ...base,
        type: 'encouragement',
        message: "Keep going, you can do this!"
      }
    
    default:
      return {
        ...base,
        message: "Keep going, you can do this!"
      }
  }
}

/**
 * Generate a specific hint based on problem context
 */
function generateSpecificHint(context: InterventionContext): string {
  // This would ideally use the problem text to generate a contextual hint
  // For now, return a subject-specific template
  const templates = GENTLE_HINT_TEMPLATES[context.subject]
  return getRandomItem(templates)
}

/**
 * Generate concept review content
 */
function generateConceptReview(context: InterventionContext): string {
  // This would pull from a concept library based on problem skills
  return `Review the core concepts needed for this ${context.subject} problem at difficulty ${context.difficulty}.`
}

// ============================================================================
// Utility Functions
// ============================================================================

function getSeverity(type: InterventionType): Intervention['severity'] {
  const severities: Record<InterventionType, Intervention['severity']> = {
    'none': 'subtle',
    'encouragement': 'subtle',
    'gentle_hint': 'moderate',
    'specific_hint': 'moderate',
    'scaffolded_steps': 'significant',
    'worked_example': 'significant',
    'easier_problem': 'significant',
    'break_suggestion': 'moderate',
    'concept_review': 'significant'
  }
  return severities[type] || 'moderate'
}

function generateInterventionId(): string {
  return `int_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// ============================================================================
// Intervention Tracking
// ============================================================================

/**
 * Record intervention outcome for learning
 */
export function recordInterventionOutcome(
  intervention: Intervention,
  accepted: boolean,
  resultedInCorrect: boolean,
  timeToOutcome: number,
  helpfulness?: 1 | 2 | 3 | 4 | 5
): InterventionOutcome {
  return {
    interventionId: intervention.interventionId,
    accepted,
    resultedInCorrect,
    timeToOutcome,
    helpfulness
  }
}

/**
 * Analyze intervention effectiveness
 */
export function analyzeInterventionEffectiveness(
  outcomes: InterventionOutcome[]
): {
  acceptanceRate: number
  successRate: number
  avgTimeToOutcome: number
  avgHelpfulness: number
} {
  if (outcomes.length === 0) {
    return {
      acceptanceRate: 0,
      successRate: 0,
      avgTimeToOutcome: 0,
      avgHelpfulness: 0
    }
  }
  
  const accepted = outcomes.filter(o => o.accepted)
  const successful = outcomes.filter(o => o.resultedInCorrect)
  const withHelpfulness = outcomes.filter(o => o.helpfulness !== undefined)
  
  return {
    acceptanceRate: accepted.length / outcomes.length,
    successRate: successful.length / outcomes.length,
    avgTimeToOutcome: outcomes.reduce((sum, o) => sum + o.timeToOutcome, 0) / outcomes.length,
    avgHelpfulness: withHelpfulness.length > 0
      ? withHelpfulness.reduce((sum, o) => sum + (o.helpfulness || 0), 0) / withHelpfulness.length
      : 0
  }
}

// ============================================================================
// Monitoring Configuration
// ============================================================================

/**
 * Check if we should deliver an intervention based on configuration
 */
export function shouldDeliverIntervention(
  prediction: StrugglePrediction,
  previousInterventions: Intervention[],
  config: MonitoringConfig = DEFAULT_MONITORING_CONFIG
): boolean {
  // Check probability threshold
  if (prediction.probability < config.interventionThreshold) {
    return false
  }
  
  // Check max interventions
  if (previousInterventions.length >= config.maxInterventions) {
    return false
  }
  
  // Check cooldown
  if (previousInterventions.length > 0) {
    const lastIntervention = previousInterventions[previousInterventions.length - 1]
    const timeSinceLastMs = Date.now() - lastIntervention.timestamp.getTime()
    
    if (timeSinceLastMs < config.interventionCooldownMs) {
      return false
    }
  }
  
  return true
}
