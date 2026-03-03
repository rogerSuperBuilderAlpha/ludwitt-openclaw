/**
 * Math V2 Problem Template
 * 
 * Use this template when generating new MathProblemV2 content.
 * Each problem must follow this exact schema.
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

// =============================================================================
// TEMPLATE STRUCTURE
// =============================================================================

export const MATH_V2_TEMPLATE: MathProblemV2 = {
  // Unique identifier: {category}-v2-g{grade}-{topic}-{number:3}
  // Examples: alg-v2-g8-systems-001, geo-v2-g6-transforms-015
  id: 'category-v2-gX-topic-NNN',
  
  // Always version 2 for V2 problems
  version: 2,
  
  // Problem type - determines UI and grading
  type: 'algebra', // 'arithmetic' | 'pre-algebra' | 'algebra' | 'geometry' | 'calculus' | 'statistics' | 'word-problem'
  
  // Difficulty 1.0-12.0 (corresponds roughly to grade level)
  difficulty: 8.0,
  
  // Target grade level (1-12)
  gradeLevel: 8,
  
  // Question content
  question: {
    // Plain text version (always required)
    text: 'Solve the system of equations using substitution:\nx + y = 10\n2x - y = 5',
    // LaTeX version (optional but recommended for equations)
    latex: '\\begin{cases} x + y = 10 \\\\ 2x - y = 5 \\end{cases}'
  },
  
  // Answer specification
  answer: {
    // Answer type affects validation logic
    type: 'coordinate', // 'numeric' | 'expression' | 'fraction' | 'multiple-choice' | 'coordinate' | 'set'
    // Primary correct answer
    correct: '(5, 5)',
    // Alternative acceptable formats
    acceptable: ['x=5, y=5', 'x = 5, y = 5', '(5,5)', 'x=5 and y=5']
  },
  
  // Visual content (optional but valuable)
  visuals: {
    graph: {
      expressions: [
        { expression: '10 - x', color: '#3B82F6', label: 'x + y = 10' },
        { expression: '2*x - 5', color: '#EF4444', label: '2x - y = 5' }
      ],
      domain: [-2, 12],
      range: [-2, 12],
      showGrid: true,
      points: [{ x: 5, y: 5, label: 'Solution (5, 5)', color: '#10B981' }]
    }
  },
  
  // Step-by-step solution
  solution: {
    steps: [
      { number: 1, description: 'Solve the first equation for y', latex: 'y = 10 - x' },
      { number: 2, description: 'Substitute into the second equation', latex: '2x - (10 - x) = 5' },
      { number: 3, description: 'Simplify and solve for x', latex: '2x - 10 + x = 5 \\Rightarrow 3x = 15 \\Rightarrow x = 5' },
      { number: 4, description: 'Substitute x = 5 back to find y', latex: 'y = 10 - 5 = 5' },
      { number: 5, description: 'State the solution', latex: '(x, y) = (5, 5)' }
    ],
    method: 'Substitution',
    alternativeMethods: ['Elimination', 'Graphing']
  },
  
  // Progressive hints (3 required)
  hints: [
    { level: 'gentle', text: 'Can you solve one equation for one variable?' },
    { level: 'moderate', text: 'From x + y = 10, you can write y = 10 - x. Now substitute this into the second equation.' },
    { level: 'explicit', text: 'After substituting, you get 2x - (10 - x) = 5. Simplify: 3x - 10 = 5, so 3x = 15, x = 5.' }
  ],
  
  // Pedagogical metadata
  pedagogy: {
    topic: 'Systems of Equations',
    subTopic: 'Substitution Method',
    skills: ['systems_solving', 'algebraic_substitution'],
    prerequisites: ['linear_equations', 'simplifying_expressions'],
    concepts: ['substitution', 'systems-of-equations', 'simultaneous-equations'],
    commonMistakes: [
      'Forgetting to distribute the negative sign when substituting',
      'Not checking the solution in both equations',
      'Solving for the wrong variable first'
    ],
    scaffoldingLevel: 'moderate', // 'minimal' | 'moderate' | 'extensive'
    cognitiveLevel: 'apply', // 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
    timeEstimate: 180 // seconds
  },
  
  // Metadata
  metadata: {
    source: 'ai-generated',
    createdAt: new Date().toISOString(),
    tags: ['systems', 'substitution', 'linear', 'two-variable']
  }
}

// =============================================================================
// EXAMPLE PROBLEMS BY TYPE
// =============================================================================

export const EXAMPLE_ARITHMETIC: MathProblemV2 = {
  id: 'arith-v2-g3-mult-001',
  version: 2,
  type: 'arithmetic',
  difficulty: 3.0,
  gradeLevel: 3,
  question: {
    text: 'What is 7 × 8?',
    latex: '7 \\times 8 = ?'
  },
  answer: {
    type: 'numeric',
    correct: '56',
    acceptable: ['56']
  },
  solution: {
    steps: [
      { number: 1, description: 'Use the multiplication table or count by 7s eight times', latex: '7, 14, 21, 28, 35, 42, 49, 56' },
      { number: 2, description: 'The answer is 56', latex: '7 \\times 8 = 56' }
    ],
    method: 'Multiplication facts'
  },
  hints: [
    { level: 'gentle', text: 'Think about adding 7 eight times.' },
    { level: 'moderate', text: '7 × 8 is the same as 8 × 7. Do you know that one?' },
    { level: 'explicit', text: '7 × 8 = 56. This is a key multiplication fact to memorize!' }
  ],
  pedagogy: {
    topic: 'Multiplication',
    subTopic: 'Single-digit multiplication',
    skills: ['multiplication_facts'],
    prerequisites: ['addition_basics'],
    concepts: ['multiplication', 'times-tables'],
    commonMistakes: ['Confusing 7×8 with 6×8 (48) or 7×9 (63)'],
    scaffoldingLevel: 'extensive'
  },
  metadata: {
    source: 'ai-generated',
    createdAt: new Date().toISOString(),
    tags: ['multiplication', 'times-tables', 'single-digit']
  }
}

export const EXAMPLE_GEOMETRY: MathProblemV2 = {
  id: 'geo-v2-g7-area-001',
  version: 2,
  type: 'geometry',
  difficulty: 7.0,
  gradeLevel: 7,
  question: {
    text: 'Find the area of a trapezoid with parallel bases of 8 cm and 12 cm, and a height of 5 cm.',
    latex: 'A = \\frac{1}{2}(b_1 + b_2)h'
  },
  answer: {
    type: 'numeric',
    correct: '50',
    acceptable: ['50', '50 cm²', '50 cm^2', '50 square cm'],
    unit: 'cm²'
  },
  visuals: {
    diagram: {
      type: 'geometry',
      description: 'Trapezoid with parallel sides labeled 8 cm and 12 cm, height 5 cm',
      elements: [
        { type: 'polygon', props: { points: '50,20 150,20 180,80 20,80', fill: '#E0F2FE', stroke: '#3B82F6', strokeWidth: 2 } },
        { type: 'text', props: { x: 100, y: 15, text: '8 cm' } },
        { type: 'text', props: { x: 100, y: 95, text: '12 cm' } },
        { type: 'text', props: { x: 190, y: 50, text: 'h = 5 cm' } }
      ]
    }
  },
  solution: {
    steps: [
      { number: 1, description: 'Identify the formula for area of a trapezoid', latex: 'A = \\frac{1}{2}(b_1 + b_2)h' },
      { number: 2, description: 'Substitute the values', latex: 'A = \\frac{1}{2}(8 + 12)(5)' },
      { number: 3, description: 'Add the bases', latex: 'A = \\frac{1}{2}(20)(5)' },
      { number: 4, description: 'Calculate', latex: 'A = \\frac{1}{2}(100) = 50 \\text{ cm}^2' }
    ],
    method: 'Trapezoid area formula'
  },
  hints: [
    { level: 'gentle', text: 'The area of a trapezoid involves averaging the two parallel bases.' },
    { level: 'moderate', text: 'Use the formula A = ½(b₁ + b₂)h where b₁ and b₂ are the parallel sides.' },
    { level: 'explicit', text: 'A = ½(8 + 12)(5) = ½(20)(5) = ½(100) = 50 cm²' }
  ],
  pedagogy: {
    topic: 'Area',
    subTopic: 'Trapezoid area',
    skills: ['area_calculation', 'formula_application'],
    prerequisites: ['rectangle_area', 'triangle_area'],
    concepts: ['trapezoid', 'area', 'quadrilateral'],
    commonMistakes: [
      'Forgetting to add the bases before multiplying',
      'Forgetting to multiply by ½',
      'Using the wrong height (slant height instead of perpendicular)'
    ],
    scaffoldingLevel: 'moderate'
  },
  metadata: {
    source: 'ai-generated',
    createdAt: new Date().toISOString(),
    tags: ['geometry', 'area', 'trapezoid', 'formula']
  }
}

export const EXAMPLE_WORD_PROBLEM: MathProblemV2 = {
  id: 'word-v2-g5-money-001',
  version: 2,
  type: 'word-problem',
  difficulty: 5.0,
  gradeLevel: 5,
  question: {
    text: 'Sarah has $20. She buys 3 notebooks that cost $4.50 each. How much money does she have left?'
  },
  answer: {
    type: 'numeric',
    correct: '6.50',
    acceptable: ['6.50', '$6.50', '6.5', '$6.5', '6 dollars and 50 cents'],
    unit: 'dollars'
  },
  solution: {
    steps: [
      { number: 1, description: 'Find the total cost of notebooks', latex: '3 \\times \\$4.50 = \\$13.50' },
      { number: 2, description: 'Subtract from the starting amount', latex: '\\$20.00 - \\$13.50 = \\$6.50' }
    ],
    method: 'Multiplication then subtraction'
  },
  hints: [
    { level: 'gentle', text: 'First figure out how much all the notebooks cost together.' },
    { level: 'moderate', text: '3 notebooks at $4.50 each = 3 × $4.50. Then subtract from $20.' },
    { level: 'explicit', text: '3 × $4.50 = $13.50. Then $20.00 - $13.50 = $6.50' }
  ],
  pedagogy: {
    topic: 'Money Word Problems',
    subTopic: 'Making purchases',
    skills: ['decimal_multiplication', 'decimal_subtraction', 'word_problem_solving'],
    prerequisites: ['multiplication_decimals', 'subtraction_decimals'],
    concepts: ['money', 'multiplication', 'subtraction', 'real-world-math'],
    commonMistakes: [
      'Forgetting to multiply by the quantity',
      'Decimal place errors in subtraction'
    ],
    scaffoldingLevel: 'moderate',
    cognitiveLevel: 'apply'
  },
  metadata: {
    source: 'ai-generated',
    createdAt: new Date().toISOString(),
    tags: ['word-problem', 'money', 'multiplication', 'subtraction', 'real-world']
  }
}

// =============================================================================
// ID NAMING CONVENTIONS
// =============================================================================

/**
 * ID Format: {category}-v2-g{grade}-{topic}-{number:3}
 * 
 * Categories:
 * - arith = arithmetic
 * - prealg = pre-algebra
 * - alg = algebra
 * - geo = geometry
 * - calc = calculus
 * - stat = statistics
 * - word = word problems
 * 
 * Examples:
 * - arith-v2-g3-mult-001 (Arithmetic, Grade 3, Multiplication, Problem 1)
 * - alg-v2-g8-systems-015 (Algebra, Grade 8, Systems, Problem 15)
 * - geo-v2-g6-area-042 (Geometry, Grade 6, Area, Problem 42)
 * - word-v2-g5-money-023 (Word Problem, Grade 5, Money, Problem 23)
 */

// =============================================================================
// DIFFICULTY GUIDELINES
// =============================================================================

/**
 * Difficulty 1-2: Grade 1-2 (basic counting, simple addition/subtraction)
 * Difficulty 3-4: Grade 3-4 (multiplication tables, simple fractions)
 * Difficulty 5-6: Grade 5-6 (decimals, basic geometry, ratios)
 * Difficulty 7-8: Grade 7-8 (pre-algebra, complex fractions, basic algebra)
 * Difficulty 9-10: Grade 9-10 (algebra, geometry proofs, functions)
 * Difficulty 11-12: Grade 11-12 (calculus, statistics, advanced algebra)
 */
