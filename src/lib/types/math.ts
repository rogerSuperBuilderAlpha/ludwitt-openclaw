/**
 * Math Problem Type Definitions
 */

import { Timestamp } from 'firebase-admin/firestore'

// ============================================================================
// Math Problem Types
// ============================================================================

export type MathProblemType =
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

// Diagram types for visual math problems
export type DiagramType =
  | 'geometry'         // Shapes, angles, triangles
  | 'graph'            // Coordinate plane, function graphs
  | 'number-line'      // Number lines
  | 'bar-model'        // Singapore math bar models
  | 'pie-chart'        // Circle/pie charts
  | 'bar-chart'        // Bar graphs
  | 'table'            // Data tables
  | 'tree'             // Probability trees, factor trees
  | 'venn'             // Venn diagrams
  | 'custom-svg'       // Custom SVG markup
  | 'box-plot'         // Box and whisker plots
  | 'histogram'        // Histograms
  | 'scatter-plot'     // Scatter plots
  | 'pictograph'       // Pictographs with symbols
  | 'probability-tree' // Probability decision trees
  | 'grid'             // Grid-based diagrams
  | 'custom'           // Generic custom diagrams

export interface DiagramElement {
  type: 'line' | 'circle' | 'rectangle' | 'polygon' | 'arc' | 'text' | 'point' | 'angle' | 'arrow'
  props: Record<string, string | number>
  label?: string
}

export interface MathDiagram {
  type: DiagramType
  width?: number                   // Default: 400
  height?: number                  // Default: 300
  elements?: DiagramElement[]      // For structured diagrams
  svg?: string                     // Raw SVG markup (for custom-svg type)
  description: string              // Alt text for accessibility
  labels?: Record<string, string>  // Named labels (e.g., { "A": "Point A", "x": "unknown" })
}

export interface MathProblem {
  id: string
  type: MathProblemType
  difficulty: number // 1.0 to 12.0 (grade level)
  question: string
  correctAnswer: string
  acceptableAnswers?: string[]
  hint?: string
  explanation: string
  topic: string
  subTopic?: string
  timeEstimate: number // seconds

  // Visual/graphical content
  diagram?: MathDiagram            // Optional diagram for the problem
  latex?: string                   // LaTeX/KaTeX formatted question (optional)

  // Optional enhancement properties for advanced features
  skillIds?: string[]              // Maps to skill tree nodes
  tags?: string[]                  // Categorization tags (e.g., 'word-problem', 'multi-step')
  conceptsCovered?: string[]       // Detailed concept list
  commonMistakes?: string[]        // Typical student errors
  prerequisiteSkills?: string[]    // Skills needed before attempting
  relatedProblemIds?: string[]     // Similar/follow-up problems
  difficultyFactors?: {            // Multi-dimensional difficulty
    computation?: number           // 1-5
    reasoning?: number             // 1-5
    vocabulary?: number            // 1-5
  }
}

export interface MathProblemCache extends MathProblem {
  // Analytics fields
  usageCount: number
  totalAttempts: number
  correctAttempts: number
  averageTimeSpent: number

  generatedBy: 'ai' | 'manual'
  createdAt: Timestamp
  lastUsed: Timestamp
}

// ============================================================================
// Problem Generation Types
// ============================================================================

export interface GeneratedMathProblem {
  question: string
  correctAnswer: string
  acceptableAnswers?: string[]
  explanation: string
  hint?: string
  topic: string
  subTopic?: string
}




