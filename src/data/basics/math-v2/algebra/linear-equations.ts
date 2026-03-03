/**
 * Linear Equations - MathProblemV2 Format
 * 
 * Topics covered:
 * - One-step equations (G6)
 * - Two-step equations (G7)
 * - Variables on both sides (G7)
 * - Multi-step with distribution (G8)
 * - Equations with fractions (G8)
 * - Word problems (G8)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const LINEAR_EQUATIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // ONE-STEP EQUATIONS (Grade 6)
  // ============================================================================
  {
    id: 'alg-v2-g6-linear-001',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Solve for x: x + 5 = 12',
      latex: 'x + 5 = 12'
    },
    answer: {
      type: 'numeric',
      correct: '7',
      acceptable: ['7', 'x = 7', 'x=7']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x + 5', color: '#3B82F6', label: 'y = x + 5' },
          { expression: '12', color: '#EF4444', label: 'y = 12' }
        ],
        domain: [-2, 10],
        range: [0, 15],
        showGrid: true,
        points: [{ x: 7, y: 12, label: 'Solution (7, 12)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: 'x + 5 = 12' },
        { number: 2, description: 'Subtract 5 from both sides to isolate x', latex: 'x + 5 - 5 = 12 - 5' },
        { number: 3, description: 'Simplify both sides', latex: 'x = 7' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'What operation undoes addition?' },
      { level: 'moderate', text: 'Subtract 5 from both sides of the equation.' },
      { level: 'explicit', text: 'x + 5 - 5 = 12 - 5, so x = 7' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'One-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable'],
      commonMistakes: ['Forgetting to apply operation to both sides', 'Using wrong inverse operation'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'one-step', 'addition']
    }
  },
  {
    id: 'alg-v2-g6-linear-002',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Solve for x: x - 8 = 15',
      latex: 'x - 8 = 15'
    },
    answer: {
      type: 'numeric',
      correct: '23',
      acceptable: ['23', 'x = 23', 'x=23']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x - 8', color: '#3B82F6', label: 'y = x - 8' },
          { expression: '15', color: '#EF4444', label: 'y = 15' }
        ],
        domain: [0, 30],
        range: [-5, 25],
        showGrid: true,
        points: [{ x: 23, y: 15, label: 'Solution (23, 15)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: 'x - 8 = 15' },
        { number: 2, description: 'Add 8 to both sides to isolate x', latex: 'x - 8 + 8 = 15 + 8' },
        { number: 3, description: 'Simplify both sides', latex: 'x = 23' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'What operation undoes subtraction?' },
      { level: 'moderate', text: 'Add 8 to both sides of the equation.' },
      { level: 'explicit', text: 'x - 8 + 8 = 15 + 8, so x = 23' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'One-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable'],
      commonMistakes: ['Subtracting instead of adding', 'Sign errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'one-step', 'subtraction']
    }
  },
  {
    id: 'alg-v2-g6-linear-003',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Solve for x: 4x = 24',
      latex: '4x = 24'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', 'x = 6', 'x=6']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '4x', color: '#3B82F6', label: 'y = 4x' },
          { expression: '24', color: '#EF4444', label: 'y = 24' }
        ],
        domain: [-1, 8],
        range: [0, 30],
        showGrid: true,
        points: [{ x: 6, y: 24, label: 'Solution (6, 24)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '4x = 24' },
        { number: 2, description: 'Divide both sides by 4 to isolate x', latex: '\\frac{4x}{4} = \\frac{24}{4}' },
        { number: 3, description: 'Simplify both sides', latex: 'x = 6' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'What operation undoes multiplication?' },
      { level: 'moderate', text: 'Divide both sides by 4.' },
      { level: 'explicit', text: '24 ÷ 4 = 6, so x = 6' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'One-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic', 'multiplication'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable'],
      commonMistakes: ['Multiplying instead of dividing', 'Division errors'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'one-step', 'multiplication']
    }
  },
  {
    id: 'alg-v2-g6-linear-004',
    version: 2,
    type: 'algebra',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Solve for x: x/3 = 7',
      latex: '\\frac{x}{3} = 7'
    },
    answer: {
      type: 'numeric',
      correct: '21',
      acceptable: ['21', 'x = 21', 'x=21']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x/3', color: '#3B82F6', label: 'y = x/3' },
          { expression: '7', color: '#EF4444', label: 'y = 7' }
        ],
        domain: [0, 25],
        range: [0, 10],
        showGrid: true,
        points: [{ x: 21, y: 7, label: 'Solution (21, 7)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '\\frac{x}{3} = 7' },
        { number: 2, description: 'Multiply both sides by 3 to isolate x', latex: '3 \\cdot \\frac{x}{3} = 3 \\cdot 7' },
        { number: 3, description: 'Simplify both sides', latex: 'x = 21' }
      ],
      method: 'Inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'What operation undoes division?' },
      { level: 'moderate', text: 'Multiply both sides by 3.' },
      { level: 'explicit', text: '7 × 3 = 21, so x = 21' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'One-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['arithmetic', 'fractions'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable'],
      commonMistakes: ['Dividing instead of multiplying', 'Fraction confusion'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'one-step', 'division']
    }
  },

  // ============================================================================
  // TWO-STEP EQUATIONS (Grade 7)
  // ============================================================================
  {
    id: 'alg-v2-g7-linear-001',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 2x + 3 = 11',
      latex: '2x + 3 = 11'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4', 'x=4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x + 3', color: '#3B82F6', label: 'y = 2x + 3' },
          { expression: '11', color: '#EF4444', label: 'y = 11' }
        ],
        domain: [-2, 6],
        range: [0, 15],
        showGrid: true,
        points: [
          { x: 0, y: 3, label: 'y-intercept (0, 3)', color: '#8B5CF6' },
          { x: 4, y: 11, label: 'Solution (4, 11)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '2x + 3 = 11' },
        { number: 2, description: 'Subtract 3 from both sides', latex: '2x + 3 - 3 = 11 - 3' },
        { number: 3, description: 'Simplify', latex: '2x = 8' },
        { number: 4, description: 'Divide both sides by 2', latex: '\\frac{2x}{2} = \\frac{8}{2}' },
        { number: 5, description: 'Simplify to get the answer', latex: 'x = 4' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'First, isolate the term with x by dealing with the constant.' },
      { level: 'moderate', text: 'Subtract 3 from both sides to get 2x = 8.' },
      { level: 'explicit', text: '2x = 8, then divide by 2: x = 4' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Two-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations', 'arithmetic'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable', 'order-of-operations'],
      commonMistakes: ['Operating in wrong order', 'Sign errors', 'Forgetting to apply to both sides'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'two-step', 'solve-for-x']
    }
  },
  {
    id: 'alg-v2-g7-linear-002',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 5x - 7 = 18',
      latex: '5x - 7 = 18'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', 'x = 5', 'x=5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '5x - 7', color: '#3B82F6', label: 'y = 5x - 7' },
          { expression: '18', color: '#EF4444', label: 'y = 18' }
        ],
        domain: [-1, 7],
        range: [-10, 25],
        showGrid: true,
        points: [
          { x: 0, y: -7, label: 'y-intercept (0, -7)', color: '#8B5CF6' },
          { x: 5, y: 18, label: 'Solution (5, 18)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '5x - 7 = 18' },
        { number: 2, description: 'Add 7 to both sides', latex: '5x - 7 + 7 = 18 + 7' },
        { number: 3, description: 'Simplify', latex: '5x = 25' },
        { number: 4, description: 'Divide both sides by 5', latex: 'x = 5' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'First, deal with the subtraction of 7.' },
      { level: 'moderate', text: 'Add 7 to both sides to get 5x = 25.' },
      { level: 'explicit', text: '5x = 25, then divide by 5: x = 5' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Two-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations', 'arithmetic'],
      concepts: ['inverse-operations', 'equation-balance', 'isolating-variable'],
      commonMistakes: ['Subtracting instead of adding', 'Division errors'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'two-step', 'solve-for-x']
    }
  },
  {
    id: 'alg-v2-g7-linear-003',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: x/4 + 2 = 6',
      latex: '\\frac{x}{4} + 2 = 6'
    },
    answer: {
      type: 'numeric',
      correct: '16',
      acceptable: ['16', 'x = 16', 'x=16']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x/4 + 2', color: '#3B82F6', label: 'y = x/4 + 2' },
          { expression: '6', color: '#EF4444', label: 'y = 6' }
        ],
        domain: [-5, 20],
        range: [0, 8],
        showGrid: true,
        points: [{ x: 16, y: 6, label: 'Solution (16, 6)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '\\frac{x}{4} + 2 = 6' },
        { number: 2, description: 'Subtract 2 from both sides', latex: '\\frac{x}{4} = 4' },
        { number: 3, description: 'Multiply both sides by 4', latex: 'x = 16' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'First, subtract 2 from both sides.' },
      { level: 'moderate', text: 'After subtracting, you get x/4 = 4.' },
      { level: 'explicit', text: 'Multiply 4 × 4 = 16, so x = 16' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Two-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations', 'fractions'],
      concepts: ['inverse-operations', 'equation-balance', 'fractions'],
      commonMistakes: ['Order of operations error', 'Fraction manipulation error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'two-step', 'fractions']
    }
  },
  {
    id: 'alg-v2-g7-linear-004',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 3(x - 2) = 15',
      latex: '3(x - 2) = 15'
    },
    answer: {
      type: 'numeric',
      correct: '7',
      acceptable: ['7', 'x = 7', 'x=7']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3(x - 2)', color: '#3B82F6', label: 'y = 3(x - 2)' },
          { expression: '15', color: '#EF4444', label: 'y = 15' }
        ],
        domain: [-1, 10],
        range: [-10, 20],
        showGrid: true,
        points: [{ x: 7, y: 15, label: 'Solution (7, 15)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '3(x - 2) = 15' },
        { number: 2, description: 'Divide both sides by 3', latex: 'x - 2 = 5' },
        { number: 3, description: 'Add 2 to both sides', latex: 'x = 7' }
      ],
      alternativeMethods: ['Distribute first: 3x - 6 = 15, then solve'],
      method: 'Divide first, then add'
    },
    hints: [
      { level: 'gentle', text: 'You can divide by 3 first, or distribute first.' },
      { level: 'moderate', text: 'Dividing by 3: x - 2 = 5' },
      { level: 'explicit', text: 'x - 2 = 5, add 2: x = 7' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Equations with parentheses',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations', 'distributive-property'],
      concepts: ['inverse-operations', 'parentheses', 'distribution'],
      commonMistakes: ['Distribution error', 'Sign error with parentheses'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'parentheses', 'solve-for-x']
    }
  },
  {
    id: 'alg-v2-g7-linear-005',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 3x + 8 = 23',
      latex: '3x + 8 = 23'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', 'x = 5', 'x=5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3x + 8', color: '#3B82F6', label: 'y = 3x + 8' },
          { expression: '23', color: '#EF4444', label: 'y = 23' }
        ],
        domain: [-2, 8],
        range: [0, 30],
        showGrid: true,
        points: [{ x: 5, y: 23, label: 'Solution (5, 23)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '3x + 8 = 23' },
        { number: 2, description: 'Subtract 8 from both sides', latex: '3x = 15' },
        { number: 3, description: 'Divide both sides by 3', latex: 'x = 5' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'First isolate the term with x.' },
      { level: 'moderate', text: 'Subtract 8: 3x = 15' },
      { level: 'explicit', text: 'Divide 15 by 3: x = 5' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Two-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations'],
      concepts: ['inverse-operations', 'equation-balance'],
      commonMistakes: ['Wrong order of operations', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'two-step']
    }
  },

  // ============================================================================
  // VARIABLES ON BOTH SIDES (Grade 7-8)
  // ============================================================================
  {
    id: 'alg-v2-g7-linear-006',
    version: 2,
    type: 'algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 4x + 3 = 2x + 11',
      latex: '4x + 3 = 2x + 11'
    },
    answer: {
      type: 'numeric',
      correct: '4',
      acceptable: ['4', 'x = 4', 'x=4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '4x + 3', color: '#3B82F6', label: 'y = 4x + 3' },
          { expression: '2x + 11', color: '#EF4444', label: 'y = 2x + 11' }
        ],
        domain: [-1, 6],
        range: [0, 25],
        showGrid: true,
        points: [{ x: 4, y: 19, label: 'Intersection (4, 19)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '4x + 3 = 2x + 11' },
        { number: 2, description: 'Subtract 2x from both sides', latex: '2x + 3 = 11' },
        { number: 3, description: 'Subtract 3 from both sides', latex: '2x = 8' },
        { number: 4, description: 'Divide both sides by 2', latex: 'x = 4' }
      ],
      method: 'Collect variables on one side'
    },
    hints: [
      { level: 'gentle', text: 'Get all x terms on one side of the equation.' },
      { level: 'moderate', text: 'Subtract 2x from both sides to get 2x + 3 = 11' },
      { level: 'explicit', text: '2x = 8, divide by 2: x = 4' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Variables on both sides',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['combining-like-terms', 'equation-balance', 'inverse-operations'],
      commonMistakes: ['Sign error when moving terms', 'Combining unlike terms'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'variables-both-sides']
    }
  },
  {
    id: 'alg-v2-g7-linear-007',
    version: 2,
    type: 'algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Solve for x: 6x - 5 = 3x + 10',
      latex: '6x - 5 = 3x + 10'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', 'x = 5', 'x=5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '6x - 5', color: '#3B82F6', label: 'y = 6x - 5' },
          { expression: '3x + 10', color: '#EF4444', label: 'y = 3x + 10' }
        ],
        domain: [-1, 7],
        range: [-10, 35],
        showGrid: true,
        points: [{ x: 5, y: 25, label: 'Intersection (5, 25)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '6x - 5 = 3x + 10' },
        { number: 2, description: 'Subtract 3x from both sides', latex: '3x - 5 = 10' },
        { number: 3, description: 'Add 5 to both sides', latex: '3x = 15' },
        { number: 4, description: 'Divide both sides by 3', latex: 'x = 5' }
      ],
      method: 'Collect variables on one side'
    },
    hints: [
      { level: 'gentle', text: 'Move all x terms to one side.' },
      { level: 'moderate', text: 'Subtract 3x: 3x - 5 = 10' },
      { level: 'explicit', text: 'Add 5: 3x = 15, divide: x = 5' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Variables on both sides',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['combining-like-terms', 'equation-balance'],
      commonMistakes: ['Sign errors', 'Wrong subtraction'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'variables-both-sides']
    }
  },
  {
    id: 'alg-v2-g7-linear-008',
    version: 2,
    type: 'algebra',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Solve for y: 2y − 7 = 3y + 1',
      latex: '2y - 7 = 3y + 1'
    },
    answer: {
      type: 'numeric',
      correct: '-8',
      acceptable: ['-8', 'y = -8', 'y=-8']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x - 7', color: '#3B82F6', label: 'y = 2x - 7' },
          { expression: '3x + 1', color: '#EF4444', label: 'y = 3x + 1' }
        ],
        domain: [-12, 2],
        range: [-30, 10],
        showGrid: true,
        points: [{ x: -8, y: -23, label: 'Intersection (-8, -23)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '2y - 7 = 3y + 1' },
        { number: 2, description: 'Subtract 2y from both sides', latex: '-7 = y + 1' },
        { number: 3, description: 'Subtract 1 from both sides', latex: '-8 = y' }
      ],
      method: 'Collect variables on one side'
    },
    hints: [
      { level: 'gentle', text: 'Move the y terms to one side.' },
      { level: 'moderate', text: 'Subtract 2y from both sides: -7 = y + 1' },
      { level: 'explicit', text: 'Subtract 1: y = -8' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Variables on both sides',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations'],
      concepts: ['combining-like-terms', 'negative-numbers'],
      commonMistakes: ['Sign error with negatives', 'Direction of subtraction'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'variables-both-sides', 'negative']
    }
  },

  // ============================================================================
  // MULTI-STEP WITH DISTRIBUTION (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-linear-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve for x: 2(3x + 4) = 5x + 15',
      latex: '2(3x + 4) = 5x + 15'
    },
    answer: {
      type: 'numeric',
      correct: '7',
      acceptable: ['7', 'x = 7', 'x=7']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2(3x + 4)', color: '#3B82F6', label: 'y = 6x + 8' },
          { expression: '5x + 15', color: '#EF4444', label: 'y = 5x + 15' }
        ],
        domain: [0, 10],
        range: [0, 55],
        showGrid: true,
        points: [{ x: 7, y: 50, label: 'Solution (7, 50)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '2(3x + 4) = 5x + 15' },
        { number: 2, description: 'Distribute the 2', latex: '6x + 8 = 5x + 15' },
        { number: 3, description: 'Subtract 5x from both sides', latex: 'x + 8 = 15' },
        { number: 4, description: 'Subtract 8 from both sides', latex: 'x = 7' }
      ],
      method: 'Distribute then collect terms'
    },
    hints: [
      { level: 'gentle', text: 'Start by distributing the 2.' },
      { level: 'moderate', text: '2(3x + 4) = 6x + 8' },
      { level: 'explicit', text: '6x + 8 = 5x + 15 → x = 7' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Multi-step with distribution',
      skills: ['algebra_basics'],
      prerequisites: ['distributive-property', 'variables-both-sides'],
      concepts: ['distribution', 'combining-like-terms', 'equation-balance'],
      commonMistakes: ['Distribution error', 'Sign error', 'Not distributing to all terms'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'distribution', 'multi-step']
    }
  },
  {
    id: 'alg-v2-g8-linear-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve for x: 3(x - 4) = 2(x + 5)',
      latex: '3(x - 4) = 2(x + 5)'
    },
    answer: {
      type: 'numeric',
      correct: '22',
      acceptable: ['22', 'x = 22', 'x=22']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3(x - 4)', color: '#3B82F6', label: 'y = 3x - 12' },
          { expression: '2(x + 5)', color: '#EF4444', label: 'y = 2x + 10' }
        ],
        domain: [0, 25],
        range: [-15, 60],
        showGrid: true,
        points: [{ x: 22, y: 54, label: 'Solution (22, 54)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '3(x - 4) = 2(x + 5)' },
        { number: 2, description: 'Distribute on both sides', latex: '3x - 12 = 2x + 10' },
        { number: 3, description: 'Subtract 2x from both sides', latex: 'x - 12 = 10' },
        { number: 4, description: 'Add 12 to both sides', latex: 'x = 22' }
      ],
      method: 'Distribute then collect terms'
    },
    hints: [
      { level: 'gentle', text: 'Distribute on both sides first.' },
      { level: 'moderate', text: '3x - 12 = 2x + 10' },
      { level: 'explicit', text: 'Subtract 2x, add 12: x = 22' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Multi-step with distribution',
      skills: ['algebra_basics'],
      prerequisites: ['distributive-property', 'variables-both-sides'],
      concepts: ['distribution', 'combining-like-terms'],
      commonMistakes: ['Distribution sign error', 'Forgetting to distribute to second term'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'distribution', 'both-sides']
    }
  },
  {
    id: 'alg-v2-g8-linear-003',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve for x: 5(x − 2) = 3x + 8',
      latex: '5(x - 2) = 3x + 8'
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9', 'x = 9', 'x=9']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '5(x - 2)', color: '#3B82F6', label: 'y = 5x - 10' },
          { expression: '3x + 8', color: '#EF4444', label: 'y = 3x + 8' }
        ],
        domain: [0, 12],
        range: [-15, 45],
        showGrid: true,
        points: [{ x: 9, y: 35, label: 'Solution (9, 35)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '5(x - 2) = 3x + 8' },
        { number: 2, description: 'Distribute the 5', latex: '5x - 10 = 3x + 8' },
        { number: 3, description: 'Subtract 3x from both sides', latex: '2x - 10 = 8' },
        { number: 4, description: 'Add 10 to both sides', latex: '2x = 18' },
        { number: 5, description: 'Divide by 2', latex: 'x = 9' }
      ],
      method: 'Distribute then collect terms'
    },
    hints: [
      { level: 'gentle', text: 'First distribute the 5.' },
      { level: 'moderate', text: '5x - 10 = 3x + 8, now collect like terms' },
      { level: 'explicit', text: '2x = 18, so x = 9' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Multi-step with distribution',
      skills: ['algebra_basics'],
      prerequisites: ['distributive-property', 'variables-both-sides'],
      concepts: ['distribution', 'combining-like-terms', 'equation-balance'],
      commonMistakes: ['Distribution error', 'Sign error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'distribution']
    }
  },

  // ============================================================================
  // EQUATIONS WITH FRACTIONS (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-linear-004',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve for x: (x + 3)/2 = 8',
      latex: '\\frac{x + 3}{2} = 8'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13', 'x = 13', 'x=13']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(x + 3)/2', color: '#3B82F6', label: 'y = (x + 3)/2' },
          { expression: '8', color: '#EF4444', label: 'y = 8' }
        ],
        domain: [-5, 20],
        range: [0, 12],
        showGrid: true,
        points: [{ x: 13, y: 8, label: 'Solution (13, 8)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '\\frac{x + 3}{2} = 8' },
        { number: 2, description: 'Multiply both sides by 2', latex: 'x + 3 = 16' },
        { number: 3, description: 'Subtract 3 from both sides', latex: 'x = 13' }
      ],
      method: 'Clear the fraction first'
    },
    hints: [
      { level: 'gentle', text: 'Multiply both sides by 2 to clear the fraction.' },
      { level: 'moderate', text: 'After multiplying: x + 3 = 16' },
      { level: 'explicit', text: 'Subtract 3: x = 13' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Equations with fractions',
      skills: ['algebra_basics'],
      prerequisites: ['two-step-equations', 'fractions'],
      concepts: ['clearing-fractions', 'equation-balance'],
      commonMistakes: ['Not multiplying entire numerator', 'Fraction error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'fractions']
    }
  },
  {
    id: 'alg-v2-g8-linear-005',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve for x: 2x + 5 = 17',
      latex: '2x + 5 = 17'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', 'x = 6', 'x=6']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x + 5', color: '#3B82F6', label: 'y = 2x + 5' },
          { expression: '17', color: '#EF4444', label: 'y = 17' }
        ],
        domain: [-2, 10],
        range: [0, 25],
        showGrid: true,
        points: [
          { x: 0, y: 5, label: 'y-intercept', color: '#8B5CF6' },
          { x: 6, y: 17, label: 'Solution (6, 17)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '2x + 5 = 17' },
        { number: 2, description: 'Subtract 5 from both sides', latex: '2x = 12' },
        { number: 3, description: 'Divide both sides by 2', latex: 'x = 6' }
      ],
      method: 'Two-step inverse operations'
    },
    hints: [
      { level: 'gentle', text: 'Isolate the x term first.' },
      { level: 'moderate', text: 'Subtract 5: 2x = 12' },
      { level: 'explicit', text: 'Divide by 2: x = 6' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Two-step equations',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations'],
      concepts: ['inverse-operations', 'equation-balance'],
      commonMistakes: ['Wrong order of operations', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'two-step']
    }
  },

  // ============================================================================
  // NEGATIVE COEFFICIENTS (Grade 7-8)
  // ============================================================================
  {
    id: 'alg-v2-g7-linear-009',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve: -3x = 18',
      latex: '-3x = 18'
    },
    answer: {
      type: 'numeric',
      correct: '-6',
      acceptable: ['-6', 'x = -6', 'x=-6']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-3x', color: '#3B82F6', label: 'y = -3x' },
          { expression: '18', color: '#EF4444', label: 'y = 18' }
        ],
        domain: [-10, 4],
        range: [-10, 30],
        showGrid: true,
        points: [{ x: -6, y: 18, label: 'Solution (-6, 18)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '-3x = 18' },
        { number: 2, description: 'Divide both sides by -3', latex: 'x = \\frac{18}{-3}' },
        { number: 3, description: 'Simplify', latex: 'x = -6' }
      ],
      method: 'Division by negative'
    },
    hints: [
      { level: 'gentle', text: 'Divide both sides by -3.' },
      { level: 'moderate', text: 'Positive ÷ negative = negative' },
      { level: 'explicit', text: '18 ÷ (-3) = -6' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Negative coefficients',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations', 'negative-numbers'],
      concepts: ['division-with-negatives', 'sign-rules'],
      commonMistakes: ['Sign error', 'Forgetting negative'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'negative', 'one-step']
    }
  },
  {
    id: 'alg-v2-g7-linear-010',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve: x/-4 = 5',
      latex: '\\frac{x}{-4} = 5'
    },
    answer: {
      type: 'numeric',
      correct: '-20',
      acceptable: ['-20', 'x = -20', 'x=-20']
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the equation', latex: '\\frac{x}{-4} = 5' },
        { number: 2, description: 'Multiply both sides by -4', latex: 'x = 5 \\times (-4)' },
        { number: 3, description: 'Simplify', latex: 'x = -20' }
      ],
      method: 'Multiply by negative'
    },
    hints: [
      { level: 'gentle', text: 'Multiply both sides by -4.' },
      { level: 'moderate', text: 'Positive × negative = negative' },
      { level: 'explicit', text: '5 × (-4) = -20' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Negative coefficients',
      skills: ['algebra_basics'],
      prerequisites: ['one-step-equations', 'negative-numbers'],
      concepts: ['multiplication-with-negatives', 'sign-rules'],
      commonMistakes: ['Sign error', 'Forgetting negative'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'negative', 'one-step']
    }
  },

  // ============================================================================
  // WORD PROBLEMS (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-word-001',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Five more than twice a number is 17. What is the number?',
      latex: '2x + 5 = 17'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', 'x = 6', 'x=6', 'the number is 6']
    },
    solution: {
      steps: [
        { number: 1, description: 'Translate to equation: "twice a number" = 2x', latex: '2x' },
        { number: 2, description: '"Five more than" means add 5', latex: '2x + 5' },
        { number: 3, description: 'Set equal to 17', latex: '2x + 5 = 17' },
        { number: 4, description: 'Subtract 5 from both sides', latex: '2x = 12' },
        { number: 5, description: 'Divide by 2', latex: 'x = 6' }
      ],
      method: 'Translate and solve'
    },
    hints: [
      { level: 'gentle', text: 'First, write an equation. "Twice a number" means 2x.' },
      { level: 'moderate', text: 'The equation is 2x + 5 = 17' },
      { level: 'explicit', text: '2x = 12, so x = 6' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Word problems',
      skills: ['algebra_basics', 'word_problems'],
      prerequisites: ['two-step-equations'],
      concepts: ['translating-words-to-algebra', 'equation-solving'],
      commonMistakes: ['Incorrect translation', 'Order of operations in translation'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['word-problem', 'linear', 'translation']
    }
  },
  {
    id: 'alg-v2-g8-word-002',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'The sum of three consecutive integers is 51. What are the integers?',
      latex: 'x + (x+1) + (x+2) = 51'
    },
    answer: {
      type: 'set',
      correct: '16, 17, 18',
      acceptable: ['16, 17, 18', '16,17,18', '16 17 18']
    },
    solution: {
      steps: [
        { number: 1, description: 'Let the first integer be x', latex: 'x' },
        { number: 2, description: 'Consecutive integers are x, x+1, x+2', latex: 'x, x+1, x+2' },
        { number: 3, description: 'Set up the equation', latex: 'x + (x+1) + (x+2) = 51' },
        { number: 4, description: 'Combine like terms', latex: '3x + 3 = 51' },
        { number: 5, description: 'Subtract 3 and divide by 3', latex: 'x = 16' },
        { number: 6, description: 'The integers are 16, 17, 18', latex: '16, 17, 18' }
      ],
      method: 'Consecutive integer formula'
    },
    hints: [
      { level: 'gentle', text: 'Let x be the first integer. What are the next two?' },
      { level: 'moderate', text: 'x + (x+1) + (x+2) = 51, so 3x + 3 = 51' },
      { level: 'explicit', text: '3x = 48, x = 16. The integers are 16, 17, 18' }
    ],
    pedagogy: {
      topic: 'Linear Equations',
      subTopic: 'Consecutive integer problems',
      skills: ['algebra_basics', 'word_problems'],
      prerequisites: ['two-step-equations'],
      concepts: ['consecutive-integers', 'translating-words-to-algebra'],
      commonMistakes: ['Setting up wrong expression', 'Forgetting to find all integers'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['word-problem', 'consecutive', 'linear']
    }
  },

  // ============================================================================
  // SLOPE AND LINEAR FUNCTIONS (Grade 8)
  // ============================================================================
  {
    id: 'alg-v2-g8-slope-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the slope of the line passing through points (2, 5) and (6, 13).',
      latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', 'm = 2', 'm=2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x + 1', color: '#3B82F6', label: 'Line through points' }
        ],
        domain: [0, 8],
        range: [0, 16],
        showGrid: true,
        points: [
          { x: 2, y: 5, label: '(2, 5)', color: '#10B981' },
          { x: 6, y: 13, label: '(6, 13)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the slope formula', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' },
        { number: 2, description: 'Substitute the points', latex: 'm = \\frac{13 - 5}{6 - 2}' },
        { number: 3, description: 'Calculate', latex: 'm = \\frac{8}{4} = 2' }
      ],
      method: 'Slope formula'
    },
    hints: [
      { level: 'gentle', text: 'Use the slope formula: m = (y₂ - y₁)/(x₂ - x₁)' },
      { level: 'moderate', text: 'Substitute: (13 - 5)/(6 - 2)' },
      { level: 'explicit', text: '8/4 = 2' }
    ],
    pedagogy: {
      topic: 'Linear Functions',
      subTopic: 'Slope',
      skills: ['algebra_basics'],
      prerequisites: ['coordinate-plane', 'fractions'],
      concepts: ['slope-formula', 'rate-of-change'],
      commonMistakes: ['Reversing coordinates', 'Subtraction order error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['slope', 'linear', 'coordinate-geometry']
    }
  },
  {
    id: 'alg-v2-g8-graph-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What is the y-intercept of y = 3x - 7?',
      latex: 'y = 3x - 7'
    },
    answer: {
      type: 'numeric',
      correct: '-7',
      acceptable: ['-7', '(0, -7)', 'b = -7']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3x - 7', color: '#3B82F6', label: 'y = 3x - 7' }
        ],
        domain: [-2, 5],
        range: [-10, 8],
        showGrid: true,
        points: [
          { x: 0, y: -7, label: 'y-intercept (0, -7)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify slope-intercept form', latex: 'y = mx + b' },
        { number: 2, description: 'Compare with given equation', latex: 'y = 3x - 7' },
        { number: 3, description: 'The y-intercept is b', latex: 'b = -7' }
      ],
      method: 'Reading from slope-intercept form'
    },
    hints: [
      { level: 'gentle', text: 'In y = mx + b, what does b represent?' },
      { level: 'moderate', text: 'Compare y = 3x - 7 to y = mx + b' },
      { level: 'explicit', text: 'b = -7, so the y-intercept is -7' }
    ],
    pedagogy: {
      topic: 'Linear Functions',
      subTopic: 'Slope-intercept form',
      skills: ['algebra_basics'],
      prerequisites: ['linear-equations'],
      concepts: ['y-intercept', 'slope-intercept-form'],
      commonMistakes: ['Confusing slope and y-intercept', 'Sign error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['y-intercept', 'slope-intercept', 'linear']
    }
  },
  {
    id: 'alg-v2-g8-graph-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What is the slope of y = -2x + 5?',
      latex: 'y = -2x + 5'
    },
    answer: {
      type: 'numeric',
      correct: '-2',
      acceptable: ['-2', 'm = -2', 'm=-2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-2x + 5', color: '#3B82F6', label: 'y = -2x + 5' }
        ],
        domain: [-2, 5],
        range: [-5, 10],
        showGrid: true,
        points: [
          { x: 0, y: 5, label: 'y-intercept', color: '#8B5CF6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify slope-intercept form', latex: 'y = mx + b' },
        { number: 2, description: 'Compare with given equation', latex: 'y = -2x + 5' },
        { number: 3, description: 'The slope is m', latex: 'm = -2' }
      ],
      method: 'Reading from slope-intercept form'
    },
    hints: [
      { level: 'gentle', text: 'In y = mx + b, what does m represent?' },
      { level: 'moderate', text: 'Compare y = -2x + 5 to y = mx + b' },
      { level: 'explicit', text: 'm = -2, so the slope is -2' }
    ],
    pedagogy: {
      topic: 'Linear Functions',
      subTopic: 'Slope-intercept form',
      skills: ['algebra_basics'],
      prerequisites: ['linear-equations'],
      concepts: ['slope', 'slope-intercept-form'],
      commonMistakes: ['Confusing slope and y-intercept', 'Missing negative sign'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['slope', 'slope-intercept', 'linear']
    }
  },
  {
    id: 'alg-v2-g8-lineq-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Write the equation of a line with slope 4 and y-intercept -3.',
      latex: 'y = mx + b'
    },
    answer: {
      type: 'equation',
      correct: 'y = 4x - 3',
      acceptable: ['y = 4x - 3', 'y=4x-3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '4x - 3', color: '#3B82F6', label: 'y = 4x - 3' }
        ],
        domain: [-2, 3],
        range: [-10, 10],
        showGrid: true,
        points: [
          { x: 0, y: -3, label: 'y-intercept (0, -3)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use slope-intercept form', latex: 'y = mx + b' },
        { number: 2, description: 'Substitute m = 4 and b = -3', latex: 'y = 4x + (-3)' },
        { number: 3, description: 'Simplify', latex: 'y = 4x - 3' }
      ],
      method: 'Slope-intercept form'
    },
    hints: [
      { level: 'gentle', text: 'Use the form y = mx + b where m is slope and b is y-intercept.' },
      { level: 'moderate', text: 'm = 4 and b = -3' },
      { level: 'explicit', text: 'y = 4x + (-3) = 4x - 3' }
    ],
    pedagogy: {
      topic: 'Linear Functions',
      subTopic: 'Writing equations',
      skills: ['algebra_basics'],
      prerequisites: ['slope-intercept-form'],
      concepts: ['slope-intercept-form', 'writing-equations'],
      commonMistakes: ['Mixing up m and b', 'Sign error'],
      scaffoldingLevel: 'extensive'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['linear', 'writing-equations', 'slope-intercept']
    }
  },

  // ============================================================================
  // PROPORTIONS (Grade 7)
  // ============================================================================
  {
    id: 'alg-v2-g7-proportion-001',
    version: 2,
    type: 'algebra',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Solve the proportion: x/4 = 15/20',
      latex: '\\frac{x}{4} = \\frac{15}{20}'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', 'x = 3', 'x=3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Cross multiply', latex: '20x = 4 \\times 15' },
        { number: 2, description: 'Calculate', latex: '20x = 60' },
        { number: 3, description: 'Divide both sides by 20', latex: 'x = 3' }
      ],
      alternativeMethods: ['Simplify 15/20 to 3/4, then x/4 = 3/4 gives x = 3'],
      method: 'Cross multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Cross multiply: multiply diagonally.' },
      { level: 'moderate', text: '20x = 60' },
      { level: 'explicit', text: 'x = 60/20 = 3' }
    ],
    pedagogy: {
      topic: 'Proportions',
      subTopic: 'Solving proportions',
      skills: ['algebra_basics'],
      prerequisites: ['fractions', 'multiplication'],
      concepts: ['cross-multiplication', 'equivalent-fractions'],
      commonMistakes: ['Wrong cross multiplication', 'Division error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['proportion', 'cross-multiply']
    }
  }
]
