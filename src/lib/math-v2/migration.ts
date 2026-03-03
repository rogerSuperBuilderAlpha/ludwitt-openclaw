/**
 * Math Problem Migration (V1 to V2)
 *
 * Converts legacy MathProblem format to the new MathProblemV2 schema.
 * Handles missing fields with sensible defaults.
 */

import {
  MathProblem,
  MathProblemType,
  MathDiagram,
  DiagramType,
} from '@/lib/types/math'
import {
  MathProblemV2,
  MathProblemTypeV2,
  AnswerType,
  ScaffoldingLevel,
  HintLevel,
  Hint,
  SolutionStep,
  DiagramV2,
  DiagramTypeV2,
} from '@/lib/types/math-v2'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Try to extract an answer from a LaTeX string
 * Looks for patterns like "= 60" or "= 60 cm³"
 */
function extractAnswerFromLatex(latex?: string): string | null {
  if (!latex) return null

  // Look for patterns like "= 60", "= 60 cm³", "= x + 2"
  const patterns = [
    /=\s*([0-9]+(?:\.[0-9]+)?)\s*(?:\\text\{[^}]*\}|cm[³²]?|m[³²]?|units?)?$/i,
    /=\s*([0-9]+(?:\.[0-9]+)?)/,
    /=\s*(\d+)\s*$/,
  ]

  for (const pattern of patterns) {
    const match = latex.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

// ============================================================================
// Type Mapping
// ============================================================================

/**
 * Maps V1 problem types to V2 types (mostly 1:1)
 */
function mapProblemType(v1Type: MathProblemType): MathProblemTypeV2 {
  // All V1 types exist in V2
  const typeMap: Record<MathProblemType, MathProblemTypeV2> = {
    arithmetic: 'arithmetic',
    'pre-algebra': 'pre-algebra',
    algebra: 'algebra',
    geometry: 'geometry',
    'word-problem': 'word-problem',
    statistics: 'statistics',
    trigonometry: 'trigonometry',
    precalculus: 'precalculus',
    calculus: 'calculus',
    'linear-algebra': 'linear-algebra',
    'discrete-math': 'discrete-math',
  }
  return typeMap[v1Type] || 'arithmetic'
}

/**
 * Maps V1 diagram types to V2 types
 */
function mapDiagramType(v1Type: DiagramType): DiagramTypeV2 {
  const typeMap: Record<DiagramType, DiagramTypeV2> = {
    geometry: 'geometry',
    graph: 'graph',
    'number-line': 'number-line',
    'bar-model': 'bar-model',
    'pie-chart': 'pie-chart',
    'bar-chart': 'bar-chart',
    table: 'table',
    tree: 'tree',
    venn: 'venn',
    'custom-svg': 'custom-svg',
    'box-plot': 'box-plot',
    histogram: 'histogram',
    'scatter-plot': 'scatter-plot',
    pictograph: 'pictograph',
    'probability-tree': 'probability-tree',
    grid: 'grid',
    custom: 'custom-svg',
  }
  return typeMap[v1Type] || 'custom-svg'
}

/**
 * Infers answer type from the answer content
 */
function inferAnswerType(answer: string): AnswerType {
  // Check for fraction pattern (e.g., "3/4")
  if (/^-?\d+\/\d+$/.test(answer.trim())) {
    return 'fraction'
  }

  // Check for coordinate pattern (e.g., "(3, 4)")
  if (/^\(-?\d+\.?\d*,\s*-?\d+\.?\d*\)$/.test(answer.trim())) {
    return 'coordinate'
  }

  // Check for interval notation (e.g., "[0, 5)")
  if (/^[\[\(]-?\d+\.?\d*,\s*-?\d+\.?\d*[\]\)]$/.test(answer.trim())) {
    return 'interval'
  }

  // Check if it's a pure number
  if (!isNaN(parseFloat(answer)) && isFinite(parseFloat(answer))) {
    return 'numeric'
  }

  // Check for equation pattern (contains =)
  if (answer.includes('=')) {
    return 'equation'
  }

  // Check for expression with variables
  if (/[a-zA-Z]/.test(answer)) {
    return 'expression'
  }

  // Default to exact match
  return 'exact'
}

/**
 * Determines scaffolding level based on available content
 */
function determineScaffoldingLevel(v1: MathProblem): ScaffoldingLevel {
  let score = 0

  // Has hint
  if (v1.hint) score += 1

  // Has explanation
  if (v1.explanation && v1.explanation.length > 100) score += 1

  // Has prerequisite skills
  if (v1.prerequisiteSkills && v1.prerequisiteSkills.length > 0) score += 1

  // Has common mistakes
  if (v1.commonMistakes && v1.commonMistakes.length > 0) score += 1

  if (score >= 3) return 'extensive'
  if (score >= 1) return 'moderate'
  return 'minimal'
}

/**
 * Converts a V1 diagram to V2 format
 */
function migrateDiagram(v1Diagram: MathDiagram): DiagramV2 {
  return {
    type: mapDiagramType(v1Diagram.type),
    width: v1Diagram.width,
    height: v1Diagram.height,
    elements: v1Diagram.elements?.map((el) => ({
      type: el.type,
      props: el.props,
      label: el.label,
    })),
    svg: v1Diagram.svg,
    description: v1Diagram.description,
    labels: v1Diagram.labels,
    interactive: false,
  }
}

/**
 * Generates default hints from available content
 */
function generateDefaultHints(v1: MathProblem): Hint[] {
  const hints: Hint[] = []

  // Gentle hint - general approach
  hints.push({
    level: 'gentle',
    text:
      v1.hint ||
      `Think about what the question is asking. Focus on the ${v1.topic} concepts.`,
  })

  // Moderate hint - more specific guidance
  hints.push({
    level: 'moderate',
    text: v1.subTopic
      ? `This problem involves ${v1.subTopic}. ${v1.hint || 'Think step by step.'}`
      : `Break the problem down into smaller parts. ${v1.hint || ''}`,
  })

  // Explicit hint - nearly gives the answer
  hints.push({
    level: 'explicit',
    text: v1.hint
      ? `${v1.hint} The answer format should be similar to: ${v1.correctAnswer.charAt(0)}...`
      : `The answer involves finding ${v1.topic}. Check your work carefully.`,
  })

  return hints
}

/**
 * Generates solution steps from explanation
 */
function generateSolutionSteps(v1: MathProblem): SolutionStep[] {
  const explanation = v1.explanation || ''

  // Try to split explanation into logical steps
  const sentences = explanation
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0)

  if (sentences.length === 0) {
    // Fallback: single step
    return [
      {
        number: 1,
        description: `Solve for the answer: ${v1.correctAnswer}`,
        latex: v1.latex,
      },
    ]
  }

  // Create steps from sentences
  return sentences.slice(0, 5).map((sentence, index) => ({
    number: index + 1,
    description: sentence.trim(),
    latex: index === sentences.length - 1 ? v1.latex : undefined,
  }))
}

// ============================================================================
// Main Migration Function
// ============================================================================

export interface MigrationOptions {
  /** Preserve original ID or generate new one */
  preserveId?: boolean
  /** Override source field */
  source?: 'manual' | 'ai-generated' | 'imported' | 'community'
  /** Additional tags to add */
  additionalTags?: string[]
}

export interface MigrationResult {
  success: boolean
  problem?: MathProblemV2
  errors?: string[]
  warnings?: string[]
}

/**
 * Migrates a legacy MathProblem to MathProblemV2 format
 *
 * @param v1Problem - The legacy problem to migrate
 * @param options - Migration options
 * @returns MigrationResult with the new problem or errors
 */
export function migrateProblemToV2(
  v1Problem: MathProblem,
  options: MigrationOptions = {}
): MigrationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate minimum required fields - be lenient and provide defaults where possible
  if (!v1Problem.id) {
    // Generate an ID if missing
    v1Problem = {
      ...v1Problem,
      id: `auto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    warnings.push('Generated ID for problem without ID')
  }
  if (!v1Problem.question) {
    errors.push('Source problem missing question')
  }
  if (!v1Problem.correctAnswer) {
    // Try to extract answer from other fields
    const possibleAnswer =
      (v1Problem as unknown as Record<string, string>).answer ||
      (v1Problem as unknown as Record<string, string>).correct_answer ||
      extractAnswerFromLatex(v1Problem.latex)
    if (possibleAnswer) {
      v1Problem = { ...v1Problem, correctAnswer: possibleAnswer }
      warnings.push('Extracted correctAnswer from alternative field')
    } else {
      errors.push('Source problem missing correctAnswer')
    }
  }
  if (!v1Problem.type) {
    // Default to arithmetic if no type
    v1Problem = { ...v1Problem, type: 'arithmetic' }
    warnings.push('Defaulted problem type to arithmetic')
  }

  if (errors.length > 0) {
    return { success: false, errors }
  }

  // Warn about missing recommended fields
  if (!v1Problem.explanation) {
    warnings.push(
      'No explanation provided - generated placeholder solution steps'
    )
  }
  if (!v1Problem.hint) {
    warnings.push('No hint provided - generated default hints')
  }
  if (!v1Problem.skillIds || v1Problem.skillIds.length === 0) {
    warnings.push('No skill IDs provided - skills array will be empty')
  }

  try {
    const v2Problem: MathProblemV2 = {
      id: options.preserveId ? v1Problem.id : `v2-${v1Problem.id}`,
      version: 2,
      type: mapProblemType(v1Problem.type),
      difficulty: v1Problem.difficulty,
      gradeLevel: Math.round(v1Problem.difficulty),

      question: {
        text: v1Problem.question,
        latex: v1Problem.latex,
      },

      answer: {
        type: inferAnswerType(v1Problem.correctAnswer),
        correct: v1Problem.correctAnswer,
        acceptable: v1Problem.acceptableAnswers,
      },

      visuals: v1Problem.diagram
        ? {
            diagram: migrateDiagram(v1Problem.diagram),
          }
        : undefined,

      solution: {
        steps: generateSolutionSteps(v1Problem),
        method: undefined,
      },

      pedagogy: {
        topic: v1Problem.topic || v1Problem.type || 'General Math',
        subTopic: v1Problem.subTopic,
        skills: v1Problem.skillIds || [],
        prerequisites: v1Problem.prerequisiteSkills || [],
        concepts: v1Problem.conceptsCovered || [],
        commonMistakes: v1Problem.commonMistakes || [],
        scaffoldingLevel: determineScaffoldingLevel(v1Problem),
        timeEstimate: v1Problem.timeEstimate || 60,
      },

      hints: generateDefaultHints(v1Problem),

      metadata: {
        source: options.source || 'imported',
        createdAt: new Date().toISOString(),
        tags: [
          ...(v1Problem.tags || []),
          ...(options.additionalTags || []),
          'migrated-from-v1',
        ],
      },
    }

    return {
      success: true,
      problem: v2Problem,
      warnings: warnings.length > 0 ? warnings : undefined,
    }
  } catch (error) {
    return {
      success: false,
      errors: [
        `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
    }
  }
}

/**
 * Batch migrate multiple problems
 */
export function migrateProblemsToV2(
  problems: MathProblem[],
  options: MigrationOptions = {}
): {
  successful: MathProblemV2[]
  failed: { id: string; errors: string[] }[]
  totalWarnings: number
} {
  const successful: MathProblemV2[] = []
  const failed: { id: string; errors: string[] }[] = []
  let totalWarnings = 0

  for (const problem of problems) {
    const result = migrateProblemToV2(problem, options)

    if (result.success && result.problem) {
      successful.push(result.problem)
      if (result.warnings) {
        totalWarnings += result.warnings.length
      }
    } else {
      failed.push({
        id: problem.id || 'unknown',
        errors: result.errors || ['Unknown migration error'],
      })
    }
  }

  return { successful, failed, totalWarnings }
}

/**
 * Checks if a problem is already in V2 format
 */
export function isV2Problem(problem: unknown): problem is MathProblemV2 {
  return (
    typeof problem === 'object' &&
    problem !== null &&
    'version' in problem &&
    (problem as { version: unknown }).version === 2
  )
}

/**
 * Gets migration stats for a batch of problems
 */
export function getMigrationStats(problems: MathProblem[]): {
  total: number
  withHints: number
  withExplanations: number
  withSkills: number
  withDiagrams: number
  averageDifficulty: number
} {
  const total = problems.length
  let withHints = 0
  let withExplanations = 0
  let withSkills = 0
  let withDiagrams = 0
  let totalDifficulty = 0

  for (const p of problems) {
    if (p.hint) withHints++
    if (p.explanation) withExplanations++
    if (p.skillIds && p.skillIds.length > 0) withSkills++
    if (p.diagram) withDiagrams++
    totalDifficulty += p.difficulty
  }

  return {
    total,
    withHints,
    withExplanations,
    withSkills,
    withDiagrams,
    averageDifficulty: total > 0 ? totalDifficulty / total : 0,
  }
}
