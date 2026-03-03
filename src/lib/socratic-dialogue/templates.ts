/**
 * Socratic Question Templates
 * 
 * Pre-defined question templates organized by move type and subject.
 */

import { SocraticMove, QuestionTemplate, DialoguePhase } from './types'

// ============================================================================
// Template Definitions
// ============================================================================

export const QUESTION_TEMPLATES: QuestionTemplate[] = [
  // ============= CLARIFYING QUESTIONS =============
  {
    move: 'clarifying_question',
    subject: 'all',
    template: "Can you explain what you mean by that?",
    placeholders: [],
    appropriatePhases: ['setup', 'exploration', 'challenge', 'scaffolding'],
    studentUnderstandingRange: [0, 1],
    frustrationThreshold: 0.9
  },
  {
    move: 'clarifying_question',
    subject: 'all',
    template: "What specifically is confusing you about this?",
    placeholders: [],
    appropriatePhases: ['exploration', 'scaffolding'],
    studentUnderstandingRange: [0, 0.4],
    frustrationThreshold: 0.7
  },
  {
    move: 'clarifying_question',
    subject: 'math',
    template: "What do you think the first step should be?",
    placeholders: [],
    appropriatePhases: ['setup', 'exploration'],
    studentUnderstandingRange: [0, 0.5],
    frustrationThreshold: 0.8
  },
  {
    move: 'clarifying_question',
    subject: 'reading',
    template: "Which part of the text are you focusing on?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.1, 0.7],
    frustrationThreshold: 0.8
  },
  {
    move: 'clarifying_question',
    subject: 'latin',
    template: "Which word or phrase are you trying to understand?",
    placeholders: [],
    appropriatePhases: ['exploration', 'scaffolding'],
    studentUnderstandingRange: [0, 0.5],
    frustrationThreshold: 0.8
  },
  {
    move: 'clarifying_question',
    subject: 'greek',
    template: "What form do you think this word is in?",
    placeholders: [],
    appropriatePhases: ['exploration', 'scaffolding'],
    studentUnderstandingRange: [0.1, 0.6],
    frustrationThreshold: 0.8
  },
  
  // ============= PROBING QUESTIONS =============
  {
    move: 'probing_question',
    subject: 'all',
    template: "Why do you think that's the answer?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.2, 0.8],
    frustrationThreshold: 0.7
  },
  {
    move: 'probing_question',
    subject: 'all',
    template: "What led you to that conclusion?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge', 'discovery'],
    studentUnderstandingRange: [0.3, 0.9],
    frustrationThreshold: 0.8
  },
  {
    move: 'probing_question',
    subject: 'math',
    template: "How did you get from that step to the next one?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.3, 0.8],
    frustrationThreshold: 0.7
  },
  {
    move: 'probing_question',
    subject: 'reading',
    template: "What words in the text support your interpretation?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.3, 0.8],
    frustrationThreshold: 0.8
  },
  {
    move: 'probing_question',
    subject: 'logic',
    template: "What rule of inference are you applying here?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.2, 0.7],
    frustrationThreshold: 0.7
  },
  
  // ============= ASSUMPTION CHECK =============
  {
    move: 'assumption_check',
    subject: 'all',
    template: "What are you assuming to be true here?",
    placeholders: [],
    appropriatePhases: ['challenge'],
    studentUnderstandingRange: [0.2, 0.7],
    frustrationThreshold: 0.6
  },
  {
    move: 'assumption_check',
    subject: 'math',
    template: "Are there any conditions or constraints you might be overlooking?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.3, 0.8],
    frustrationThreshold: 0.7
  },
  {
    move: 'assumption_check',
    subject: 'reading',
    template: "What assumptions are you making about the author's intent?",
    placeholders: [],
    appropriatePhases: ['challenge'],
    studentUnderstandingRange: [0.4, 0.8],
    frustrationThreshold: 0.7
  },
  
  // ============= IMPLICATION QUESTIONS =============
  {
    move: 'implication_question',
    subject: 'all',
    template: "If that's true, what would follow from it?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.4, 0.9],
    frustrationThreshold: 0.7
  },
  {
    move: 'implication_question',
    subject: 'math',
    template: "What would that tell us about the solution?",
    placeholders: [],
    appropriatePhases: ['discovery'],
    studentUnderstandingRange: [0.5, 0.9],
    frustrationThreshold: 0.8
  },
  {
    move: 'implication_question',
    subject: 'logic',
    template: "If your premise is true, what can we necessarily conclude?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.3, 0.8],
    frustrationThreshold: 0.7
  },
  
  // ============= COUNTEREXAMPLE =============
  {
    move: 'counterexample',
    subject: 'all',
    template: "What if we tried a different case? Would your approach still work?",
    placeholders: [],
    appropriatePhases: ['challenge'],
    studentUnderstandingRange: [0.3, 0.7],
    frustrationThreshold: 0.5
  },
  {
    move: 'counterexample',
    subject: 'math',
    template: "What happens if we use a simpler example to test your method?",
    placeholders: [],
    appropriatePhases: ['challenge', 'scaffolding'],
    studentUnderstandingRange: [0.2, 0.6],
    frustrationThreshold: 0.6
  },
  
  // ============= SCAFFOLDED HINTS =============
  {
    move: 'scaffolded_hint',
    subject: 'all',
    template: "Let's break this down. What's the very first thing we need to figure out?",
    placeholders: [],
    appropriatePhases: ['scaffolding'],
    studentUnderstandingRange: [0, 0.4],
    frustrationThreshold: 1.0
  },
  {
    move: 'scaffolded_hint',
    subject: 'math',
    template: "Try looking at just this part of the problem first. What operation would you use?",
    placeholders: [],
    appropriatePhases: ['scaffolding'],
    studentUnderstandingRange: [0, 0.3],
    frustrationThreshold: 1.0
  },
  {
    move: 'scaffolded_hint',
    subject: 'latin',
    template: "Start by identifying the verb. What ending does it have?",
    placeholders: [],
    appropriatePhases: ['scaffolding'],
    studentUnderstandingRange: [0, 0.4],
    frustrationThreshold: 1.0
  },
  {
    move: 'scaffolded_hint',
    subject: 'greek',
    template: "Let's look at the root of the word first. Do you recognize it?",
    placeholders: [],
    appropriatePhases: ['scaffolding'],
    studentUnderstandingRange: [0, 0.4],
    frustrationThreshold: 1.0
  },
  {
    move: 'scaffolded_hint',
    subject: 'reading',
    template: "Try reading just this sentence again. What's the main idea?",
    placeholders: [],
    appropriatePhases: ['scaffolding'],
    studentUnderstandingRange: [0, 0.4],
    frustrationThreshold: 1.0
  },
  
  // ============= GUIDED DISCOVERY =============
  {
    move: 'guided_discovery',
    subject: 'all',
    template: "You're on the right track. What would be the next logical step?",
    placeholders: [],
    appropriatePhases: ['scaffolding', 'discovery'],
    studentUnderstandingRange: [0.3, 0.7],
    frustrationThreshold: 0.8
  },
  {
    move: 'guided_discovery',
    subject: 'math',
    template: "You've got part of it. Now, how does that connect to finding the answer?",
    placeholders: [],
    appropriatePhases: ['discovery'],
    studentUnderstandingRange: [0.4, 0.8],
    frustrationThreshold: 0.8
  },
  {
    move: 'guided_discovery',
    subject: 'all',
    template: "Think about what you already know. How can you use that here?",
    placeholders: [],
    appropriatePhases: ['scaffolding', 'discovery'],
    studentUnderstandingRange: [0.2, 0.6],
    frustrationThreshold: 0.9
  },
  
  // ============= METACOGNITIVE PROMPTS =============
  {
    move: 'metacognitive_prompt',
    subject: 'all',
    template: "What strategy are you using to approach this problem?",
    placeholders: [],
    appropriatePhases: ['setup', 'exploration', 'consolidation'],
    studentUnderstandingRange: [0.2, 1],
    frustrationThreshold: 0.7
  },
  {
    move: 'metacognitive_prompt',
    subject: 'all',
    template: "Is there another way you could think about this?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.3, 0.7],
    frustrationThreshold: 0.6
  },
  {
    move: 'metacognitive_prompt',
    subject: 'all',
    template: "How would you check if your answer is correct?",
    placeholders: [],
    appropriatePhases: ['discovery', 'consolidation'],
    studentUnderstandingRange: [0.6, 1],
    frustrationThreshold: 0.8
  },
  
  // ============= ENCOURAGEMENT =============
  {
    move: 'encouragement',
    subject: 'all',
    template: "You're making good progress! Take your time.",
    placeholders: [],
    appropriatePhases: ['setup', 'exploration', 'scaffolding', 'discovery', 'consolidation', 'resolution'],
    studentUnderstandingRange: [0, 1],
    frustrationThreshold: 1.0
  },
  {
    move: 'encouragement',
    subject: 'all',
    template: "That's a great observation! Can you build on that?",
    placeholders: [],
    appropriatePhases: ['exploration', 'discovery'],
    studentUnderstandingRange: [0.3, 0.8],
    frustrationThreshold: 1.0
  },
  {
    move: 'encouragement',
    subject: 'all',
    template: "You're thinking about this the right way. Keep going!",
    placeholders: [],
    appropriatePhases: ['scaffolding', 'discovery'],
    studentUnderstandingRange: [0.2, 0.7],
    frustrationThreshold: 1.0
  },
  
  // ============= SYNTHESIS PROMPTS =============
  {
    move: 'synthesis_prompt',
    subject: 'all',
    template: "How does this connect to what you've learned before?",
    placeholders: [],
    appropriatePhases: ['discovery', 'consolidation'],
    studentUnderstandingRange: [0.5, 1],
    frustrationThreshold: 0.8
  },
  {
    move: 'synthesis_prompt',
    subject: 'all',
    template: "Can you see a pattern here that might help with similar problems?",
    placeholders: [],
    appropriatePhases: ['consolidation'],
    studentUnderstandingRange: [0.7, 1],
    frustrationThreshold: 0.8
  },
  
  // ============= SUMMARY REQUEST =============
  {
    move: 'summary_request',
    subject: 'all',
    template: "Can you explain in your own words what you've figured out?",
    placeholders: [],
    appropriatePhases: ['consolidation', 'resolution'],
    studentUnderstandingRange: [0.6, 1],
    frustrationThreshold: 0.9
  },
  {
    move: 'summary_request',
    subject: 'all',
    template: "What would you tell someone else who was stuck on this problem?",
    placeholders: [],
    appropriatePhases: ['resolution'],
    studentUnderstandingRange: [0.8, 1],
    frustrationThreshold: 0.9
  },
  
  // ============= REDIRECT =============
  {
    move: 'redirect',
    subject: 'all',
    template: "Let's come back to the main question. What are we trying to find?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge', 'scaffolding'],
    studentUnderstandingRange: [0, 0.7],
    frustrationThreshold: 0.8
  },
  {
    move: 'redirect',
    subject: 'all',
    template: "That's interesting, but how does it help us with this specific problem?",
    placeholders: [],
    appropriatePhases: ['exploration', 'challenge'],
    studentUnderstandingRange: [0.2, 0.6],
    frustrationThreshold: 0.7
  },
  
  // ============= EVIDENCE REQUEST =============
  {
    move: 'evidence_request',
    subject: 'reading',
    template: "What specific words or phrases in the text support that idea?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.4, 0.8],
    frustrationThreshold: 0.7
  },
  {
    move: 'evidence_request',
    subject: 'all',
    template: "How can you prove that your answer is correct?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery', 'consolidation'],
    studentUnderstandingRange: [0.5, 1],
    frustrationThreshold: 0.7
  },
  
  // ============= PERSPECTIVE PROMPT =============
  {
    move: 'perspective_prompt',
    subject: 'all',
    template: "How might someone else approach this differently?",
    placeholders: [],
    appropriatePhases: ['challenge', 'consolidation'],
    studentUnderstandingRange: [0.4, 0.9],
    frustrationThreshold: 0.6
  },
  {
    move: 'perspective_prompt',
    subject: 'reading',
    template: "How do you think the author wanted readers to understand this?",
    placeholders: [],
    appropriatePhases: ['challenge', 'discovery'],
    studentUnderstandingRange: [0.4, 0.8],
    frustrationThreshold: 0.7
  }
]

// ============================================================================
// Template Access Functions
// ============================================================================

/**
 * Get templates for a specific move and subject
 */
export function getTemplatesForMove(
  move: SocraticMove,
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
): QuestionTemplate[] {
  return QUESTION_TEMPLATES.filter(
    t => t.move === move && (t.subject === subject || t.subject === 'all')
  )
}

/**
 * Get templates appropriate for a dialogue phase
 */
export function getTemplatesForPhase(
  phase: DialoguePhase,
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
): QuestionTemplate[] {
  return QUESTION_TEMPLATES.filter(
    t => t.appropriatePhases.includes(phase) && 
         (t.subject === subject || t.subject === 'all')
  )
}

/**
 * Get a random template for a move
 */
export function getRandomTemplate(
  move: SocraticMove,
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic',
  studentUnderstanding: number,
  frustrationLevel: number
): QuestionTemplate | null {
  const templates = getTemplatesForMove(move, subject).filter(t => {
    const [minU, maxU] = t.studentUnderstandingRange
    return studentUnderstanding >= minU &&
           studentUnderstanding <= maxU &&
           frustrationLevel <= t.frustrationThreshold
  })
  
  if (templates.length === 0) return null
  
  return templates[Math.floor(Math.random() * templates.length)]
}
