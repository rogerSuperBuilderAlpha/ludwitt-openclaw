/**
 * Compositional Problem Generation Types
 * 
 * Type definitions for generating problems by composing
 * verified components rather than pure LLM generation.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * A problem template that can be instantiated with variables
 */
export interface ProblemTemplate {
  id: string
  name: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  category: string
  
  // Template structure
  structure: TemplateStructure
  
  // Difficulty parameters
  difficultyRange: [number, number]
  difficultyFactors: DifficultyFactor[]
  
  // Required skills
  requiredSkills: string[]
  
  // Validation rules
  validationRules: ValidationRule[]
  
  // Metadata
  createdAt: Date
  usageCount: number
  successRate: number
}

export interface TemplateStructure {
  type: 'arithmetic' | 'algebraic' | 'word_problem' | 'sequence' | 'geometry' | 
        'comprehension' | 'translation' | 'vocabulary' | 'logic_proof'
  
  // The template with placeholders
  template: string
  
  // Variable definitions
  variables: VariableDefinition[]
  
  // How to compute the answer
  answerFormula: string
  
  // Optional explanation template
  explanationTemplate?: string
}

export interface VariableDefinition {
  name: string
  type: 'integer' | 'decimal' | 'fraction' | 'string' | 'expression'
  
  // Constraints
  min?: number
  max?: number
  exclude?: number[]
  choices?: string[]
  
  // Dependencies on other variables
  dependsOn?: string
  formula?: string
  
  // Difficulty influence
  difficultyWeight?: number
}

export interface DifficultyFactor {
  name: string
  type: 'numeric_range' | 'operation_count' | 'variable_count' | 
        'negative_numbers' | 'decimals' | 'word_count' | 'vocabulary_level'
  weight: number
  description: string
}

// ============================================================================
// Validation
// ============================================================================

export interface ValidationRule {
  type: 'numeric_bounds' | 'integer_result' | 'positive_result' | 
        'no_division_by_zero' | 'unique_answer' | 'solvable' | 'custom'
  
  // For custom rules
  expression?: string
  errorMessage: string
}

export interface GenerationResult {
  success: boolean
  problem?: GeneratedProblem
  error?: string
  validationErrors?: string[]
  attempts?: number
}

export interface GeneratedProblem {
  id: string
  templateId: string
  
  // The actual problem
  problemText: string
  answer: string
  alternativeAnswers?: string[]
  
  // Explanation
  explanation?: string
  steps?: string[]
  
  // Metadata
  difficulty: number
  skills: string[]
  variables: Record<string, string | number>
  
  // Verification
  verified: boolean
  verificationMethod: 'formula' | 'symbolic' | 'manual'
  
  generatedAt: Date
}

// ============================================================================
// Generation Parameters
// ============================================================================

export interface GenerationParams {
  templateId?: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  category?: string
  targetDifficulty: number
  difficultyTolerance?: number
  
  // Constraints
  requiredSkills?: string[]
  excludeSkills?: string[]
  
  // Problem characteristics
  maxLength?: number
  includeExplanation?: boolean
  
  // User context for personalization
  userMisconceptions?: string[]
  recentProblemIds?: string[]
}

// ============================================================================
// IRT (Item Response Theory) Integration
// ============================================================================

/**
 * IRT parameters for a problem
 */
export interface IRTParameters {
  // 3-Parameter Logistic Model
  difficulty: number       // b parameter (-3 to 3 typically)
  discrimination: number   // a parameter (0.5 to 2.5 typically)
  guessing: number         // c parameter (0 to 0.25 typically)
  
  // Confidence in estimates
  confidence: number
  observationCount: number
}

/**
 * Estimate probability of correct response
 */
export function estimateCorrectProbability(
  studentAbility: number,
  irt: IRTParameters
): number {
  const { difficulty, discrimination, guessing } = irt
  const exponent = discrimination * (studentAbility - difficulty)
  return guessing + (1 - guessing) * (1 / (1 + Math.exp(-exponent)))
}

// ============================================================================
// Template Library
// ============================================================================

export interface TemplateCategory {
  id: string
  name: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  templates: ProblemTemplate[]
  description: string
}

// ============================================================================
// Configuration
// ============================================================================

export interface GenerationConfig {
  maxAttempts: number
  targetSuccessRate: number
  difficultyCalibrationRate: number
  cacheEnabled: boolean
  cacheTTLSeconds: number
}

export const DEFAULT_GENERATION_CONFIG: GenerationConfig = {
  maxAttempts: 10,
  targetSuccessRate: 0.7,
  difficultyCalibrationRate: 0.1,
  cacheEnabled: true,
  cacheTTLSeconds: 3600
}

// ============================================================================
// Storage Types
// ============================================================================

export interface TemplateDoc extends Omit<ProblemTemplate, 'createdAt'> {
  createdAt: Date | FirestoreTimestamp
}

export interface GeneratedProblemDoc extends Omit<GeneratedProblem, 'generatedAt'> {
  generatedAt: Date | FirestoreTimestamp
  userId?: string
}

interface FirestoreTimestamp {
  toDate(): Date
}

export const GENERATION_COLLECTIONS = {
  TEMPLATES: 'problemTemplates',
  GENERATED: 'generatedProblems',
  IRT_PARAMS: 'irtParameters'
}
