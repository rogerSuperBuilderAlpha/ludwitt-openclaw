/**
 * Math Problem V2 Type Definitions
 * 
 * Enhanced math problem schema with:
 * - Rich visual support (diagrams, graphs, images)
 * - Pedagogical metadata (skills, prerequisites, concepts)
 * - Progressive hints system
 * - Solution steps for guided learning
 * - Integration with mathlive, mafs, and compute-engine
 */

// ============================================================================
// Math Problem Types (V2)
// ============================================================================

export type MathProblemTypeV2 =
  | 'arithmetic'
  | 'pre-algebra'
  | 'algebra'
  | 'geometry'
  | 'word-problem'
  | 'statistics'
  | 'trigonometry'
  | 'precalculus'
  | 'calculus'
  | 'linear-algebra'
  | 'discrete-math'
  | 'number-theory'
  | 'probability'
  | 'measurement'
  | 'data-analysis'

export type AnswerType =
  | 'exact'           // Must match exactly (e.g., "42")
  | 'numeric'         // Numeric with tolerance (e.g., 3.14159 ± 0.001)
  | 'expression'      // Algebraic expression (e.g., "2x + 3")
  | 'fraction'        // Fraction (e.g., "3/4")
  | 'multiple-choice' // One of several options
  | 'multi-select'    // Multiple correct options
  | 'ordered-list'    // Ordered sequence
  | 'set'             // Unordered collection
  | 'interval'        // Range notation (e.g., "[0, 5)")
  | 'coordinate'      // Point (e.g., "(3, 4)")
  | 'matrix'          // Matrix answer
  | 'text'            // Free-form text answer
  | 'equation'        // Full equation (e.g., "y = 2x + 1")

export type HintLevel = 'gentle' | 'moderate' | 'explicit'

export type ScaffoldingLevel = 'minimal' | 'moderate' | 'extensive'

export type DiagramTypeV2 =
  | 'geometry'
  | 'graph'
  | 'number-line'
  | 'bar-model'
  | 'pie-chart'
  | 'bar-chart'
  | 'table'
  | 'tree'
  | 'venn'
  | 'box-plot'
  | 'histogram'
  | 'scatter-plot'
  | 'pictograph'
  | 'probability-tree'
  | 'grid'
  | 'coordinate-plane'
  | 'unit-circle'
  | 'custom-svg'

// ============================================================================
// Graph Configuration (for Mafs integration)
// ============================================================================

export interface GraphExpression {
  /** The mathematical expression (e.g., "x^2", "sin(x)") */
  expression: string
  /** Display color */
  color?: string
  /** Line style */
  style?: 'solid' | 'dashed' | 'dotted'
  /** Line width */
  strokeWidth?: number
  /** Label for the function */
  label?: string
}

export interface GraphPoint {
  x: number
  y: number
  label?: string
  color?: string
  size?: number
}

export interface GraphConfig {
  /** Mathematical expressions to plot */
  expressions: GraphExpression[]
  /** X-axis domain [min, max] */
  domain: [number, number]
  /** Y-axis range [min, max] */
  range: [number, number]
  /** Show grid lines */
  showGrid?: boolean
  /** Show axis labels */
  showAxisLabels?: boolean
  /** Points to highlight */
  points?: GraphPoint[]
  /** Areas to shade */
  shadedRegions?: {
    expression: string
    color?: string
    opacity?: number
  }[]
  /** Asymptotes to show */
  asymptotes?: {
    x?: number[]
    y?: number[]
  }
}

// ============================================================================
// Diagram Types (V2)
// ============================================================================

export interface DiagramElementV2 {
  type: 'line' | 'circle' | 'rectangle' | 'polygon' | 'arc' | 'text' | 'point' | 'angle' | 'arrow' | 'triangle' | 'ellipse'
  props: Record<string, string | number | boolean>
  label?: string
  id?: string
}

export interface DiagramV2 {
  type: DiagramTypeV2
  width?: number
  height?: number
  elements?: DiagramElementV2[]
  svg?: string
  description: string
  labels?: Record<string, string>
  interactive?: boolean
}

// ============================================================================
// Question Structure
// ============================================================================

export interface QuestionPart {
  /** Part identifier (e.g., "a", "b", "1") */
  id: string
  /** Question text for this part */
  text: string
  /** LaTeX for this part */
  latex?: string
  /** Answer for this part */
  answer: AnswerSchema
}

export interface QuestionSchema {
  /** Plain text question */
  text: string
  /** LaTeX-formatted question (optional) */
  latex?: string
  /** Multi-part question parts */
  parts?: QuestionPart[]
}

// ============================================================================
// Answer Structure
// ============================================================================

export interface AnswerSchema {
  /** Type of answer expected */
  type: AnswerType
  /** The correct answer */
  correct: string | string[] | number
  /** Alternative acceptable answers */
  acceptable?: string[]
  /** Unit for measurement answers */
  unit?: string
  /** Precision for numeric answers (decimal places or significant figures) */
  precision?: number
  /** For multiple choice: the options */
  choices?: {
    id: string
    text: string
    latex?: string
  }[]
  /** Tolerance for numeric comparison (e.g., 0.01 for 1% tolerance) */
  tolerance?: number
}

// ============================================================================
// Visual Content
// ============================================================================

export interface VisualsSchema {
  /** Static or interactive diagram */
  diagram?: DiagramV2
  /** Function graph configuration (for Mafs) */
  graph?: GraphConfig
  /** External image URL */
  image?: {
    url: string
    alt: string
    width?: number
    height?: number
  }
}

// ============================================================================
// Solution Steps
// ============================================================================

export interface SolutionStep {
  /** Step number (1-indexed) */
  number: number
  /** Text description of what to do */
  description: string
  /** LaTeX showing the mathematical work */
  latex?: string
  /** Optional diagram for this step */
  diagram?: DiagramV2
  /** Compute Engine expression for validation */
  expression?: string
}

export interface SolutionSchema {
  /** Step-by-step solution */
  steps: SolutionStep[]
  /** Solution method name */
  method?: string
  /** Alternative solution methods */
  alternativeMethods?: string[]
}

// ============================================================================
// Hints System
// ============================================================================

export interface Hint {
  /** Hint level (progressive disclosure) */
  level: HintLevel
  /** Hint text */
  text: string
  /** LaTeX for mathematical hints */
  latex?: string
  /** Optional visual aid */
  diagram?: DiagramV2
}

// ============================================================================
// Pedagogy Metadata
// ============================================================================

export interface PedagogySchema {
  /** Main topic (e.g., "Algebra", "Geometry") */
  topic: string
  /** Specific sub-topic (e.g., "Quadratic Equations") */
  subTopic?: string
  /** Skill IDs this problem covers */
  skills: string[]
  /** Prerequisites needed before attempting */
  prerequisites: string[]
  /** Mathematical concepts covered */
  concepts: string[]
  /** Common mistakes students make */
  commonMistakes: string[]
  /** Level of scaffolding provided */
  scaffoldingLevel: ScaffoldingLevel
  /** Grade level appropriateness */
  gradeRange?: {
    min: number
    max: number
  }
  /** Bloom's taxonomy level */
  cognitiveLevel?: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  /** Estimated time in seconds */
  timeEstimate?: number
}

// ============================================================================
// Metadata
// ============================================================================

export interface MetadataSchema {
  /** Source of the problem */
  source: 'manual' | 'ai-generated' | 'imported' | 'community'
  /** Creation timestamp (ISO string) */
  createdAt: string
  /** Last updated timestamp (ISO string) */
  updatedAt?: string
  /** Author ID if applicable */
  authorId?: string
  /** Tags for categorization */
  tags?: string[]
  /** Version history */
  revisions?: number
}

// ============================================================================
// Main MathProblemV2 Interface
// ============================================================================

export interface MathProblemV2 {
  /** Unique identifier */
  id: string
  
  /** Schema version - always 2 for V2 problems */
  version: 2
  
  /** Problem type category */
  type: MathProblemTypeV2
  
  /** Difficulty level (1.0 to 12.0, representing grade levels) */
  difficulty: number
  
  /** Target grade level */
  gradeLevel: number
  
  /** Question content */
  question: QuestionSchema
  
  /** Answer specification */
  answer: AnswerSchema
  
  /** Optional visual content */
  visuals?: VisualsSchema
  
  /** Solution with steps */
  solution: SolutionSchema
  
  /** Pedagogical metadata */
  pedagogy: PedagogySchema
  
  /** Progressive hints (3 levels) */
  hints: Hint[]
  
  /** Administrative metadata */
  metadata: MetadataSchema
}

// ============================================================================
// Cache/Analytics Extension
// ============================================================================

export interface MathProblemV2Cache extends MathProblemV2 {
  /** Number of times this problem has been served */
  usageCount: number
  /** Total attempts across all users */
  totalAttempts: number
  /** Number of correct attempts */
  correctAttempts: number
  /** Average time spent in seconds */
  averageTimeSpent: number
  /** Last time the problem was used */
  lastUsed: string
  /** Success rate (0-1) */
  successRate: number
  /** Difficulty adjustment based on performance */
  calibratedDifficulty?: number
}

// ============================================================================
// Validation Result Types
// ============================================================================

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

// ============================================================================
// Type Guards
// ============================================================================

export function isMathProblemV2(obj: unknown): obj is MathProblemV2 {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'version' in obj &&
    (obj as MathProblemV2).version === 2 &&
    'id' in obj &&
    'question' in obj &&
    'answer' in obj
  )
}

export function isGraphConfig(obj: unknown): obj is GraphConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'expressions' in obj &&
    'domain' in obj &&
    'range' in obj &&
    Array.isArray((obj as GraphConfig).expressions) &&
    Array.isArray((obj as GraphConfig).domain) &&
    Array.isArray((obj as GraphConfig).range)
  )
}
