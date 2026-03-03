/**
 * Socratic Dialogue Engine
 * 
 * An adaptive dialogue system that guides students through problem-solving
 * using the Socratic method - strategic questioning rather than direct instruction.
 */

export * from './types'

// Templates
export {
  QUESTION_TEMPLATES,
  getTemplatesForMove,
  getTemplatesForPhase,
  getRandomTemplate
} from './templates'

// Move selection
export {
  selectMove,
  classifyResponse
} from './move-selector'

// Dialogue management
export {
  createDialogue,
  generateOpeningTurn,
  processStudentResponse,
  analyzeDialogue
} from './dialogue-controller'
