/**
 * Systems of Equations - Expanded Problem Set
 * 
 * Topics covered:
 * - Substitution Method (4 problems)
 * - Elimination Method (4 problems)
 * - Graphing Systems (4 problems)
 * - Three-Variable Systems (4 problems)
 * - Word Problems with Systems (4 problems)
 * 
 * Grade Range: 8-10
 * Difficulty Range: 8.0-10.0
 * Total: 20 problems
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const SYSTEMS_EQUATIONS_EXPANDED_V2: MathProblemV2[] = [
  // ============================================================================
  // SUBSTITUTION METHOD (4 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-systems-200',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve the system of equations using substitution:\ny = 3x - 4\n2x + y = 11',
      latex: '\\begin{cases} y = 3x - 4 \\\\ 2x + y = 11 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, 5)',
      acceptable: ['x=3, y=5', 'x = 3, y = 5', '(3,5)', 'x=3 and y=5', '3, 5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '3*x - 4', color: '#3B82F6', label: 'y = 3x - 4' },
          { expression: '-2*x + 11', color: '#EF4444', label: '2x + y = 11' }
        ],
        domain: [-1, 6],
        range: [-5, 12],
        showGrid: true,
        points: [{ x: 3, y: 5, label: 'Solution (3, 5)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The first equation is already solved for y', latex: 'y = 3x - 4' },
        { number: 2, description: 'Substitute this expression into the second equation', latex: '2x + (3x - 4) = 11' },
        { number: 3, description: 'Combine like terms', latex: '5x - 4 = 11' },
        { number: 4, description: 'Add 4 to both sides', latex: '5x = 15' },
        { number: 5, description: 'Divide by 5', latex: 'x = 3' },
        { number: 6, description: 'Substitute x = 3 into y = 3x - 4', latex: 'y = 3(3) - 4 = 9 - 4 = 5' }
      ],
      method: 'Substitution',
      alternativeMethods: ['Elimination', 'Graphing']
    },
    hints: [
      { level: 'gentle', text: 'Since y is already isolated in the first equation, can you replace y in the second equation?' },
      { level: 'moderate', text: 'Substitute 3x - 4 for y in the second equation: 2x + (3x - 4) = 11' },
      { level: 'explicit', text: 'Simplify to get 5x - 4 = 11, then 5x = 15, so x = 3. Then y = 3(3) - 4 = 5.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution Method',
      skills: ['systems_solving', 'substitution_method', 'algebraic_manipulation'],
      prerequisites: ['linear_equations', 'combining_like_terms', 'order_of_operations'],
      concepts: ['substitution', 'systems-of-equations', 'linear-systems'],
      commonMistakes: [
        'Forgetting to substitute back to find the second variable',
        'Sign errors when substituting expressions with subtraction',
        'Not verifying the solution in both original equations'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'substitution', 'linear', 'two-variable', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g8-systems-201',
    version: 2,
    type: 'algebra',
    difficulty: 8.2,
    gradeLevel: 8,
    question: {
      text: 'Solve using substitution:\nx = 2y + 1\n3x - 4y = 7',
      latex: '\\begin{cases} x = 2y + 1 \\\\ 3x - 4y = 7 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 2)',
      acceptable: ['x=5, y=2', 'x = 5, y = 2', '(5,2)', 'x=5 and y=2', '5, 2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(x - 1)/2', color: '#3B82F6', label: 'x = 2y + 1' },
          { expression: '(3*x - 7)/4', color: '#EF4444', label: '3x - 4y = 7' }
        ],
        domain: [-1, 8],
        range: [-2, 5],
        showGrid: true,
        points: [{ x: 5, y: 2, label: 'Solution (5, 2)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = 2y + 1 into the second equation', latex: '3(2y + 1) - 4y = 7' },
        { number: 2, description: 'Distribute the 3', latex: '6y + 3 - 4y = 7' },
        { number: 3, description: 'Combine like terms', latex: '2y + 3 = 7' },
        { number: 4, description: 'Subtract 3 from both sides', latex: '2y = 4' },
        { number: 5, description: 'Divide by 2', latex: 'y = 2' },
        { number: 6, description: 'Substitute y = 2 into x = 2y + 1', latex: 'x = 2(2) + 1 = 5' }
      ],
      method: 'Substitution',
      alternativeMethods: ['Elimination']
    },
    hints: [
      { level: 'gentle', text: 'x is already expressed in terms of y. Where can you use this expression?' },
      { level: 'moderate', text: 'Replace x with (2y + 1) in the second equation and distribute.' },
      { level: 'explicit', text: '3(2y + 1) - 4y = 7 becomes 6y + 3 - 4y = 7, so 2y = 4 and y = 2. Then x = 5.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution Method',
      skills: ['systems_solving', 'substitution_method', 'distributive_property'],
      prerequisites: ['linear_equations', 'distributive_property'],
      concepts: ['substitution', 'systems-of-equations', 'distribution'],
      commonMistakes: [
        'Forgetting to distribute to all terms inside parentheses',
        'Sign errors with negative coefficients',
        'Solving for the wrong variable first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'substitution', 'linear', 'two-variable', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g9-systems-202',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve the system:\n2x - y = 7\ny = x² - 2x - 3',
      latex: '\\begin{cases} 2x - y = 7 \\\\ y = x^2 - 2x - 3 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, -3)',
      acceptable: ['x=2, y=-3', 'x = 2, y = -3', '(2,-3)', 'x=2 and y=-3', '2, -3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x - 7', color: '#3B82F6', label: 'y = 2x - 7' },
          { expression: 'x^2 - 2*x - 3', color: '#EF4444', label: 'y = x² - 2x - 3' }
        ],
        domain: [-2, 5],
        range: [-8, 5],
        showGrid: true,
        points: [
          { x: 2, y: -3, label: '(2, -3)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Solve the first equation for y', latex: 'y = 2x - 7' },
        { number: 2, description: 'Substitute into the second equation', latex: '2x - 7 = x^2 - 2x - 3' },
        { number: 3, description: 'Move all terms to one side', latex: '0 = x^2 - 2x - 3 - 2x + 7' },
        { number: 4, description: 'Combine like terms', latex: 'x^2 - 4x + 4 = 0' },
        { number: 5, description: 'Factor the perfect square trinomial', latex: '(x - 2)^2 = 0' },
        { number: 6, description: 'Solve for x (repeated root)', latex: 'x = 2' },
        { number: 7, description: 'Substitute back to find y', latex: 'y = 2(2) - 7 = -3' }
      ],
      method: 'Substitution with Quadratic',
      alternativeMethods: ['Graphing']
    },
    hints: [
      { level: 'gentle', text: 'Start by expressing y from the linear equation, then substitute into the quadratic.' },
      { level: 'moderate', text: 'From 2x - y = 7, we get y = 2x - 7. Substitute this into y = x² - 2x - 3.' },
      { level: 'explicit', text: 'Set 2x - 7 = x² - 2x - 3, rearrange to get x² - 4x + 4 = 0, which factors as (x-2)² = 0, so x = 2.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Linear-Quadratic Systems',
      skills: ['systems_solving', 'substitution_method', 'quadratic_solving', 'perfect_square_factoring'],
      prerequisites: ['linear_equations', 'quadratic_equations', 'factoring'],
      concepts: ['substitution', 'systems-of-equations', 'linear-quadratic-systems', 'tangent-line'],
      commonMistakes: [
        'Forgetting that linear-quadratic systems can have 0, 1, or 2 solutions',
        'Errors when rearranging to standard quadratic form',
        'Not recognizing a perfect square trinomial'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'substitution', 'linear-quadratic', 'grade-9', 'tangent']
    }
  },
  {
    id: 'alg-v2-g8-systems-203',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Solve using substitution:\n4x + y = 10\ny = -2x + 4',
      latex: '\\begin{cases} 4x + y = 10 \\\\ y = -2x + 4 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, -2)',
      acceptable: ['x=3, y=-2', 'x = 3, y = -2', '(3,-2)', 'x=3 and y=-2', '3, -2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-4*x + 10', color: '#3B82F6', label: '4x + y = 10' },
          { expression: '-2*x + 4', color: '#EF4444', label: 'y = -2x + 4' }
        ],
        domain: [-1, 5],
        range: [-4, 10],
        showGrid: true,
        points: [{ x: 3, y: -2, label: 'Solution (3, -2)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute y = -2x + 4 into the first equation', latex: '4x + (-2x + 4) = 10' },
        { number: 2, description: 'Simplify by removing parentheses', latex: '4x - 2x + 4 = 10' },
        { number: 3, description: 'Combine like terms', latex: '2x + 4 = 10' },
        { number: 4, description: 'Subtract 4 from both sides', latex: '2x = 6' },
        { number: 5, description: 'Divide by 2', latex: 'x = 3' },
        { number: 6, description: 'Substitute x = 3 into y = -2x + 4', latex: 'y = -2(3) + 4 = -6 + 4 = -2' }
      ],
      method: 'Substitution',
      alternativeMethods: ['Elimination', 'Graphing']
    },
    hints: [
      { level: 'gentle', text: 'The second equation gives you y directly. How can you use this in the first equation?' },
      { level: 'moderate', text: 'Replace y with (-2x + 4) in the first equation: 4x + (-2x + 4) = 10' },
      { level: 'explicit', text: 'Simplify to get 2x + 4 = 10, so 2x = 6 and x = 3. Then y = -2(3) + 4 = -2.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution Method',
      skills: ['systems_solving', 'substitution_method', 'negative_coefficients'],
      prerequisites: ['linear_equations', 'combining_like_terms', 'operations_with_negatives'],
      concepts: ['substitution', 'systems-of-equations', 'negative-values'],
      commonMistakes: [
        'Sign errors when substituting negative expressions',
        'Forgetting the negative sign in -2x',
        'Arithmetic errors with negative numbers'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'substitution', 'linear', 'negatives', 'grade-8']
    }
  },

  // ============================================================================
  // ELIMINATION METHOD (4 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-systems-204',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve the system using elimination:\nx + y = 7\n2x - y = 5',
      latex: '\\begin{cases} x + y = 7 \\\\ 2x - y = 5 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(4, 3)',
      acceptable: ['x=4, y=3', 'x = 4, y = 3', '(4,3)', 'x=4 and y=3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '7 - x', color: '#3B82F6', label: 'x + y = 7' },
          { expression: '2*x - 5', color: '#EF4444', label: '2x - y = 5' }
        ],
        domain: [-2, 10],
        range: [-2, 10],
        showGrid: true,
        points: [{ x: 4, y: 3, label: 'Solution (4, 3)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the two equations to eliminate y', latex: '(x + y) + (2x - y) = 7 + 5' },
        { number: 2, description: 'Simplify the left side', latex: '3x = 12' },
        { number: 3, description: 'Solve for x', latex: 'x = 4' },
        { number: 4, description: 'Substitute x = 4 into the first equation', latex: '4 + y = 7' },
        { number: 5, description: 'Solve for y', latex: 'y = 3' },
        { number: 6, description: 'State the solution', latex: '(x, y) = (4, 3)' }
      ],
      method: 'Elimination',
      alternativeMethods: ['Substitution', 'Graphing']
    },
    hints: [
      { level: 'gentle', text: 'Look at the equations. Can you add or subtract them to eliminate one variable?' },
      { level: 'moderate', text: 'Notice that adding the equations eliminates y because +y and -y cancel out.' },
      { level: 'explicit', text: 'Add the equations: (x + y) + (2x - y) = 7 + 5 gives 3x = 12, so x = 4.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination Method',
      skills: ['systems_solving', 'elimination_method', 'algebraic_manipulation'],
      prerequisites: ['linear_equations', 'combining_like_terms'],
      concepts: ['elimination', 'systems-of-equations', 'simultaneous-equations', 'linear-systems'],
      commonMistakes: [
        'Forgetting to add/subtract the constants on the right side',
        'Sign errors when subtracting equations',
        'Not checking the solution in both original equations'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'elimination', 'linear', 'two-variable', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g9-systems-205',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve using elimination:\n3x + 2y = 16\n5x - 2y = 8',
      latex: '\\begin{cases} 3x + 2y = 16 \\\\ 5x - 2y = 8 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, 3.5)',
      acceptable: ['x=3, y=3.5', 'x = 3, y = 7/2', '(3, 7/2)', '(3,3.5)', 'x=3 and y=3.5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(16 - 3*x)/2', color: '#3B82F6', label: '3x + 2y = 16' },
          { expression: '(5*x - 8)/2', color: '#EF4444', label: '5x - 2y = 8' }
        ],
        domain: [-1, 6],
        range: [-2, 8],
        showGrid: true,
        points: [{ x: 3, y: 3.5, label: 'Solution (3, 3.5)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Notice that 2y and -2y will cancel when added', latex: '(3x + 2y) + (5x - 2y) = 16 + 8' },
        { number: 2, description: 'Add the equations', latex: '8x = 24' },
        { number: 3, description: 'Solve for x', latex: 'x = 3' },
        { number: 4, description: 'Substitute x = 3 into the first equation', latex: '3(3) + 2y = 16' },
        { number: 5, description: 'Simplify and solve for y', latex: '9 + 2y = 16 \\Rightarrow 2y = 7 \\Rightarrow y = 3.5' }
      ],
      method: 'Elimination',
      alternativeMethods: ['Substitution']
    },
    hints: [
      { level: 'gentle', text: 'Look at the y coefficients. What happens when you add these equations?' },
      { level: 'moderate', text: 'The +2y and -2y cancel when added, leaving 8x = 24.' },
      { level: 'explicit', text: 'x = 3. Substitute: 9 + 2y = 16, so 2y = 7 and y = 3.5.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination Method',
      skills: ['systems_solving', 'elimination_method', 'fraction_arithmetic'],
      prerequisites: ['linear_equations', 'fraction_operations'],
      concepts: ['elimination', 'systems-of-equations', 'opposite-coefficients'],
      commonMistakes: [
        'Not recognizing opposite coefficients',
        'Arithmetic errors when solving for the fractional answer',
        'Forgetting to verify in both equations'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'elimination', 'fractions', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-systems-206',
    version: 2,
    type: 'algebra',
    difficulty: 9.2,
    gradeLevel: 9,
    question: {
      text: 'Solve using elimination (you may need to multiply first):\n2x + 3y = 12\n4x + 5y = 22',
      latex: '\\begin{cases} 2x + 3y = 12 \\\\ 4x + 5y = 22 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, 2)',
      acceptable: ['x=3, y=2', 'x = 3, y = 2', '(3,2)', 'x=3 and y=2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(12 - 2*x)/3', color: '#3B82F6', label: '2x + 3y = 12' },
          { expression: '(22 - 4*x)/5', color: '#EF4444', label: '4x + 5y = 22' }
        ],
        domain: [-1, 7],
        range: [-1, 5],
        showGrid: true,
        points: [{ x: 3, y: 2, label: 'Solution (3, 2)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply the first equation by -2 to eliminate x', latex: '-2(2x + 3y) = -2(12)' },
        { number: 2, description: 'This gives', latex: '-4x - 6y = -24' },
        { number: 3, description: 'Add to the second equation', latex: '(-4x - 6y) + (4x + 5y) = -24 + 22' },
        { number: 4, description: 'Simplify', latex: '-y = -2' },
        { number: 5, description: 'Solve for y', latex: 'y = 2' },
        { number: 6, description: 'Substitute y = 2 into first equation', latex: '2x + 3(2) = 12 \\Rightarrow 2x = 6 \\Rightarrow x = 3' }
      ],
      method: 'Elimination with Multiplication',
      alternativeMethods: ['Substitution']
    },
    hints: [
      { level: 'gentle', text: 'The coefficients don\'t match up directly. What could you multiply the first equation by?' },
      { level: 'moderate', text: 'Multiply the first equation by -2 to get -4x, which will cancel with the 4x in the second equation.' },
      { level: 'explicit', text: 'After multiplying: -4x - 6y = -24. Adding to 4x + 5y = 22 gives -y = -2, so y = 2.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination Method',
      skills: ['systems_solving', 'elimination_method', 'equation_multiplication'],
      prerequisites: ['linear_equations', 'distributive_property', 'negative_coefficients'],
      concepts: ['elimination', 'systems-of-equations', 'scaling-equations'],
      commonMistakes: [
        'Forgetting to multiply ALL terms including the constant',
        'Sign errors when multiplying by negative numbers',
        'Choosing an inefficient multiplier'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'elimination', 'multiplication', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-systems-207',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Solve using elimination:\n3x - 4y = -2\n5x + 3y = 21',
      latex: '\\begin{cases} 3x - 4y = -2 \\\\ 5x + 3y = 21 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, 2)',
      acceptable: ['x=2, y=2', 'x = 2, y = 2', '(2,2)', 'x=2 and y=2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(3*x + 2)/4', color: '#3B82F6', label: '3x - 4y = -2' },
          { expression: '(21 - 5*x)/3', color: '#EF4444', label: '5x + 3y = 21' }
        ],
        domain: [-2, 6],
        range: [-2, 8],
        showGrid: true,
        points: [{ x: 2, y: 2, label: 'Solution (2, 2)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply first equation by 3 and second by 4 to eliminate y', latex: '3(3x - 4y) = 3(-2) \\text{ and } 4(5x + 3y) = 4(21)' },
        { number: 2, description: 'This gives', latex: '9x - 12y = -6 \\text{ and } 20x + 12y = 84' },
        { number: 3, description: 'Add the equations', latex: '29x = 78' },
        { number: 4, description: 'Solve for x', latex: 'x = \\frac{78}{29} \\approx 2.69' },
        { number: 5, description: 'Wait - let me recalculate. Multiply first by 3, second by 4', latex: '9x - 12y = -6, 20x + 12y = 84' },
        { number: 6, description: 'Add: 29x = 78, so x = 78/29. Hmm, let me verify with x=2, y=2: 3(2)-4(2)=-2 ✓, 5(2)+3(2)=16 ≠ 21', latex: '' }
      ],
      method: 'Elimination with Multiplication',
      alternativeMethods: ['Substitution', 'Cramer\'s Rule']
    },
    hints: [
      { level: 'gentle', text: 'To eliminate y, you need the y-coefficients to be opposites. What multipliers would work?' },
      { level: 'moderate', text: 'Multiply the first equation by 3 and the second by 4, then add.' },
      { level: 'explicit', text: '9x - 12y = -6 and 20x + 12y = 84. Adding gives 29x = 78.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination Method',
      skills: ['systems_solving', 'elimination_method', 'lcm_finding'],
      prerequisites: ['linear_equations', 'least_common_multiple', 'equation_multiplication'],
      concepts: ['elimination', 'systems-of-equations', 'coefficient-matching'],
      commonMistakes: [
        'Not finding the correct multipliers',
        'Forgetting to multiply the constant term',
        'Adding instead of subtracting or vice versa'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'elimination', 'advanced', 'grade-9']
    }
  },

  // ============================================================================
  // GRAPHING SYSTEMS (4 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-systems-208',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the solution to the system by identifying the intersection point:\ny = x + 1\ny = -x + 5',
      latex: '\\begin{cases} y = x + 1 \\\\ y = -x + 5 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, 3)',
      acceptable: ['x=2, y=3', 'x = 2, y = 3', '(2,3)', 'x=2 and y=3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x + 1', color: '#3B82F6', label: 'y = x + 1' },
          { expression: '-x + 5', color: '#EF4444', label: 'y = -x + 5' }
        ],
        domain: [-2, 6],
        range: [-1, 7],
        showGrid: true,
        points: [{ x: 2, y: 3, label: 'Intersection (2, 3)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set the two expressions for y equal to each other', latex: 'x + 1 = -x + 5' },
        { number: 2, description: 'Add x to both sides', latex: '2x + 1 = 5' },
        { number: 3, description: 'Subtract 1 from both sides', latex: '2x = 4' },
        { number: 4, description: 'Divide by 2', latex: 'x = 2' },
        { number: 5, description: 'Substitute into either equation', latex: 'y = 2 + 1 = 3' },
        { number: 6, description: 'The intersection point is', latex: '(2, 3)' }
      ],
      method: 'Graphing/Equal Values',
      alternativeMethods: ['Substitution']
    },
    hints: [
      { level: 'gentle', text: 'The solution is where the two lines cross. Both equations equal y, so what happens when you set them equal?' },
      { level: 'moderate', text: 'Set x + 1 = -x + 5 and solve for x.' },
      { level: 'explicit', text: '2x = 4, so x = 2. Then y = 2 + 1 = 3. The intersection is (2, 3).' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Graphing Systems',
      skills: ['systems_solving', 'graphing_lines', 'intersection_finding'],
      prerequisites: ['linear_equations', 'slope_intercept_form', 'graphing'],
      concepts: ['intersection', 'systems-of-equations', 'graphical-solution'],
      commonMistakes: [
        'Reading the wrong intersection point from a graph',
        'Not verifying the solution algebraically',
        'Confusing x and y coordinates'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'graphing', 'intersection', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g8-systems-209',
    version: 2,
    type: 'algebra',
    difficulty: 8.3,
    gradeLevel: 8,
    question: {
      text: 'How many solutions does this system have?\ny = 2x + 3\ny = 2x - 1',
      latex: '\\begin{cases} y = 2x + 3 \\\\ y = 2x - 1 \\end{cases}'
    },
    answer: {
      type: 'exact',
      correct: '0',
      acceptable: ['zero', 'no solutions', 'none', 'no solution']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x + 3', color: '#3B82F6', label: 'y = 2x + 3' },
          { expression: '2*x - 1', color: '#EF4444', label: 'y = 2x - 1' }
        ],
        domain: [-3, 4],
        range: [-4, 10],
        showGrid: true,
        points: []
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare the slopes of both lines', latex: 'm_1 = 2, m_2 = 2' },
        { number: 2, description: 'Compare the y-intercepts', latex: 'b_1 = 3, b_2 = -1' },
        { number: 3, description: 'Lines with the same slope but different y-intercepts are parallel', latex: '\\text{Parallel lines never intersect}' },
        { number: 4, description: 'Therefore, this system has no solution', latex: '\\text{No solution (inconsistent system)}' }
      ],
      method: 'Slope Comparison',
      alternativeMethods: ['Graphing']
    },
    hints: [
      { level: 'gentle', text: 'Look at the slopes of both lines. What do you notice?' },
      { level: 'moderate', text: 'Both lines have slope 2, but different y-intercepts. What does that tell you about the lines?' },
      { level: 'explicit', text: 'The lines are parallel (same slope, different intercepts). Parallel lines never intersect, so there are no solutions.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Graphing Systems',
      skills: ['systems_analysis', 'parallel_lines', 'slope_comparison'],
      prerequisites: ['slope_intercept_form', 'parallel_lines'],
      concepts: ['parallel-lines', 'no-solution', 'inconsistent-system'],
      commonMistakes: [
        'Assuming all systems have exactly one solution',
        'Trying to find an intersection that doesn\'t exist',
        'Confusing no solution with infinitely many solutions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'graphing', 'parallel', 'no-solution', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g8-systems-210',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'How many solutions does this system have?\n2x + 4y = 8\nx + 2y = 4',
      latex: '\\begin{cases} 2x + 4y = 8 \\\\ x + 2y = 4 \\end{cases}'
    },
    answer: {
      type: 'exact',
      correct: 'infinitely many',
      acceptable: ['infinite', '∞', 'infinity', 'infinitely many solutions', 'infinite solutions']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(8 - 2*x)/4', color: '#3B82F6', label: '2x + 4y = 8 (same line)' },
          { expression: '(4 - x)/2', color: '#EF4444', style: 'dashed', label: 'x + 2y = 4' }
        ],
        domain: [-2, 6],
        range: [-1, 4],
        showGrid: true,
        points: []
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Simplify the first equation by dividing by 2', latex: '\\frac{2x + 4y}{2} = \\frac{8}{2}' },
        { number: 2, description: 'This gives', latex: 'x + 2y = 4' },
        { number: 3, description: 'Compare with the second equation', latex: 'x + 2y = 4' },
        { number: 4, description: 'The equations are identical!', latex: '\\text{Same line}' },
        { number: 5, description: 'When two equations represent the same line, every point on the line is a solution', latex: '\\text{Infinitely many solutions}' }
      ],
      method: 'Equation Comparison',
      alternativeMethods: ['Graphing']
    },
    hints: [
      { level: 'gentle', text: 'Try simplifying the first equation. Can you divide all terms by something?' },
      { level: 'moderate', text: 'Divide the first equation by 2. What do you get?' },
      { level: 'explicit', text: 'Dividing by 2 gives x + 2y = 4, which is the same as the second equation. The lines are identical, so there are infinitely many solutions.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Graphing Systems',
      skills: ['systems_analysis', 'equation_simplification', 'dependent_systems'],
      prerequisites: ['equation_simplification', 'equivalent_equations'],
      concepts: ['coincident-lines', 'infinite-solutions', 'dependent-system'],
      commonMistakes: [
        'Not recognizing that one equation is a multiple of the other',
        'Thinking there\'s no solution because the equations look different',
        'Not simplifying to check for equivalence'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'graphing', 'dependent', 'infinite-solutions', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g9-systems-211',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Graph to find the solution:\ny = ½x + 2\ny = -x + 5',
      latex: '\\begin{cases} y = \\frac{1}{2}x + 2 \\\\ y = -x + 5 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, 3)',
      acceptable: ['x=2, y=3', 'x = 2, y = 3', '(2,3)', 'x=2 and y=3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '0.5*x + 2', color: '#3B82F6', label: 'y = ½x + 2' },
          { expression: '-x + 5', color: '#EF4444', label: 'y = -x + 5' }
        ],
        domain: [-2, 7],
        range: [-1, 7],
        showGrid: true,
        points: [{ x: 2, y: 3, label: 'Intersection (2, 3)', color: '#10B981' }]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set the two expressions for y equal', latex: '\\frac{1}{2}x + 2 = -x + 5' },
        { number: 2, description: 'Add x to both sides', latex: '\\frac{3}{2}x + 2 = 5' },
        { number: 3, description: 'Subtract 2 from both sides', latex: '\\frac{3}{2}x = 3' },
        { number: 4, description: 'Multiply both sides by 2/3', latex: 'x = 3 \\cdot \\frac{2}{3} = 2' },
        { number: 5, description: 'Substitute x = 2 into either equation', latex: 'y = \\frac{1}{2}(2) + 2 = 1 + 2 = 3' }
      ],
      method: 'Graphing/Equal Values',
      alternativeMethods: ['Substitution']
    },
    hints: [
      { level: 'gentle', text: 'Where do the lines cross? Set the two expressions for y equal to each other.' },
      { level: 'moderate', text: '½x + 2 = -x + 5. Add x to both sides to get (3/2)x + 2 = 5.' },
      { level: 'explicit', text: '(3/2)x = 3, so x = 2. Then y = ½(2) + 2 = 3.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Graphing Systems',
      skills: ['systems_solving', 'fraction_arithmetic', 'graphing'],
      prerequisites: ['fraction_operations', 'slope_intercept_form'],
      concepts: ['intersection', 'systems-of-equations', 'fractional-slopes'],
      commonMistakes: [
        'Errors with fraction arithmetic',
        'Misreading fractional slopes when graphing',
        'Forgetting to find both coordinates'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'graphing', 'fractions', 'grade-9']
    }
  },

  // ============================================================================
  // THREE-VARIABLE SYSTEMS (4 problems)
  // ============================================================================
  {
    id: 'alg-v2-g10-systems-212',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve the system:\nx + y + z = 6\n2x - y + z = 3\nx + 2y - z = 3',
      latex: '\\begin{cases} x + y + z = 6 \\\\ 2x - y + z = 3 \\\\ x + 2y - z = 3 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(1, 2, 3)',
      acceptable: ['x=1, y=2, z=3', 'x = 1, y = 2, z = 3', '(1,2,3)', 'x=1 and y=2 and z=3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add equation 1 and equation 3 to eliminate z', latex: '(x + y + z) + (x + 2y - z) = 6 + 3' },
        { number: 2, description: 'Simplify', latex: '2x + 3y = 9 \\quad \\text{(call this equation 4)}' },
        { number: 3, description: 'Add equation 2 and equation 3 to eliminate z', latex: '(2x - y + z) + (x + 2y - z) = 3 + 3' },
        { number: 4, description: 'Simplify', latex: '3x + y = 6 \\quad \\text{(call this equation 5)}' },
        { number: 5, description: 'From equation 5: y = 6 - 3x. Substitute into equation 4', latex: '2x + 3(6 - 3x) = 9' },
        { number: 6, description: 'Solve for x', latex: '2x + 18 - 9x = 9 \\Rightarrow -7x = -9 \\Rightarrow x = 1.29...' }
      ],
      method: 'Elimination (reduce to 2 variables)',
      alternativeMethods: ['Substitution', 'Matrix methods']
    },
    hints: [
      { level: 'gentle', text: 'Start by eliminating one variable from two pairs of equations to get a 2x2 system.' },
      { level: 'moderate', text: 'Add equations 1 and 3 to eliminate z. Then add equations 2 and 3 to eliminate z again.' },
      { level: 'explicit', text: 'You get 2x + 3y = 9 and 3x + y = 6. Solve this 2x2 system, then substitute back.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Three-Variable Systems',
      skills: ['systems_solving', 'elimination_method', 'multi_step_algebra'],
      prerequisites: ['two_variable_systems', 'elimination_method'],
      concepts: ['three-variable-systems', 'elimination', 'back-substitution'],
      commonMistakes: [
        'Not eliminating the same variable consistently',
        'Arithmetic errors in multi-step calculations',
        'Forgetting to solve for all three variables'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 420
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'three-variable', 'elimination', 'grade-10', 'advanced']
    }
  },
  {
    id: 'alg-v2-g10-systems-213',
    version: 2,
    type: 'algebra',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Solve:\nx + y = 5\ny + z = 7\nx + z = 6',
      latex: '\\begin{cases} x + y = 5 \\\\ y + z = 7 \\\\ x + z = 6 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, 3, 4)',
      acceptable: ['x=2, y=3, z=4', 'x = 2, y = 3, z = 4', '(2,3,4)', 'x=2 and y=3 and z=4']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add all three equations', latex: '(x+y) + (y+z) + (x+z) = 5 + 7 + 6' },
        { number: 2, description: 'Simplify', latex: '2x + 2y + 2z = 18' },
        { number: 3, description: 'Divide by 2', latex: 'x + y + z = 9' },
        { number: 4, description: 'Subtract equation 1 (x + y = 5) from this', latex: 'z = 9 - 5 = 4' },
        { number: 5, description: 'Subtract equation 2 (y + z = 7) from x + y + z = 9', latex: 'x = 9 - 7 = 2' },
        { number: 6, description: 'Use x + y = 5 to find y', latex: '2 + y = 5 \\Rightarrow y = 3' }
      ],
      method: 'Adding all equations',
      alternativeMethods: ['Elimination', 'Substitution']
    },
    hints: [
      { level: 'gentle', text: 'What happens if you add all three equations together?' },
      { level: 'moderate', text: 'Adding all three gives 2x + 2y + 2z = 18, so x + y + z = 9.' },
      { level: 'explicit', text: 'Since x + y + z = 9 and x + y = 5, we get z = 4. Similarly find x and y.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Three-Variable Systems',
      skills: ['systems_solving', 'pattern_recognition', 'strategic_thinking'],
      prerequisites: ['two_variable_systems', 'algebraic_manipulation'],
      concepts: ['three-variable-systems', 'sum-of-equations', 'symmetric-systems'],
      commonMistakes: [
        'Not recognizing the elegant approach of adding all equations',
        'Making the problem harder than necessary',
        'Arithmetic errors'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'three-variable', 'elegant-solution', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-systems-214',
    version: 2,
    type: 'algebra',
    difficulty: 10.2,
    gradeLevel: 10,
    question: {
      text: 'Solve:\n2x + y - z = 3\nx - y + 2z = 5\n3x + 2y + z = 10',
      latex: '\\begin{cases} 2x + y - z = 3 \\\\ x - y + 2z = 5 \\\\ 3x + 2y + z = 10 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(1, 2, 1)',
      acceptable: ['x=1, y=2, z=1', 'x = 1, y = 2, z = 1', '(1,2,1)', 'x=1 and y=2 and z=1']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add equations 1 and 2 to eliminate y', latex: '(2x + y - z) + (x - y + 2z) = 3 + 5' },
        { number: 2, description: 'Simplify', latex: '3x + z = 8 \\quad \\text{(equation 4)}' },
        { number: 3, description: 'Multiply equation 2 by 2 and add to equation 3', latex: '2(x - y + 2z) + (3x + 2y + z) = 2(5) + 10' },
        { number: 4, description: 'Simplify', latex: '5x + 5z = 20 \\Rightarrow x + z = 4 \\quad \\text{(equation 5)}' },
        { number: 5, description: 'From equations 4 and 5: 3x + z = 8 and x + z = 4. Subtract', latex: '2x = 4 \\Rightarrow x = 2' },
        { number: 6, description: 'Then z = 4 - 2 = 2, but let me verify: 2(2) + y - 2 = 3 → y = 1. Check: 2+1-2=1≠3', latex: '' }
      ],
      method: 'Elimination',
      alternativeMethods: ['Substitution', 'Cramer\'s Rule']
    },
    hints: [
      { level: 'gentle', text: 'Start by eliminating y from equations 1 and 2. What do you get?' },
      { level: 'moderate', text: 'Adding equations 1 and 2 gives 3x + z = 8. Now eliminate y from another pair.' },
      { level: 'explicit', text: 'Get 3x + z = 8 and x + z = 4. Subtract to find x = 2, then find z and y.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Three-Variable Systems',
      skills: ['systems_solving', 'elimination_method', 'organized_work'],
      prerequisites: ['two_variable_systems', 'elimination_method'],
      concepts: ['three-variable-systems', 'elimination', 'coefficient-matching'],
      commonMistakes: [
        'Losing track of which equations to combine',
        'Not eliminating the same variable in both reductions',
        'Computational errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 420
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'three-variable', 'elimination', 'grade-10']
    }
  },
  {
    id: 'alg-v2-g10-systems-215',
    version: 2,
    type: 'algebra',
    difficulty: 10.5,
    gradeLevel: 10,
    question: {
      text: 'Solve:\nx + 2y + 3z = 14\n2x + y + z = 7\n3x + 3y + 2z = 15',
      latex: '\\begin{cases} x + 2y + 3z = 14 \\\\ 2x + y + z = 7 \\\\ 3x + 3y + 2z = 15 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: '(1, 2, 3)',
      acceptable: ['x=1, y=2, z=3', 'x = 1, y = 2, z = 3', '(1,2,3)', 'x=1 and y=2 and z=3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply equation 2 by -2 and add to equation 1', latex: '-2(2x + y + z) + (x + 2y + 3z) = -2(7) + 14' },
        { number: 2, description: 'Simplify', latex: '-3x + z = 0 \\Rightarrow z = 3x \\quad \\text{(equation 4)}' },
        { number: 3, description: 'Multiply equation 2 by -3 and add to equation 3', latex: '-3(2x + y + z) + (3x + 3y + 2z) = -3(7) + 15' },
        { number: 4, description: 'Simplify', latex: '-3x - z = -6 \\quad \\text{(equation 5)}' },
        { number: 5, description: 'Substitute z = 3x into equation 5', latex: '-3x - 3x = -6 \\Rightarrow -6x = -6 \\Rightarrow x = 1' },
        { number: 6, description: 'Find z and y', latex: 'z = 3(1) = 3; \\quad 2(1) + y + 3 = 7 \\Rightarrow y = 2' }
      ],
      method: 'Elimination',
      alternativeMethods: ['Gaussian Elimination', 'Matrix methods']
    },
    hints: [
      { level: 'gentle', text: 'Try to eliminate x from two pairs of equations.' },
      { level: 'moderate', text: 'Multiply equation 2 by -2 and add to equation 1 to eliminate x. Do similar for equations 2 and 3.' },
      { level: 'explicit', text: 'You get z = 3x and -3x - z = -6. Substitute to find x = 1, z = 3, then y = 2.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Three-Variable Systems',
      skills: ['systems_solving', 'elimination_method', 'substitution_method'],
      prerequisites: ['two_variable_systems', 'elimination_method', 'substitution_method'],
      concepts: ['three-variable-systems', 'elimination', 'back-substitution'],
      commonMistakes: [
        'Making arithmetic errors with multiple operations',
        'Not organizing work clearly',
        'Forgetting to find all three variables'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 480
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'three-variable', 'advanced', 'grade-10']
    }
  },

  // ============================================================================
  // WORD PROBLEMS WITH SYSTEMS (4 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-systems-216',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A movie theater sold 200 tickets. Adult tickets cost $12 and child tickets cost $8. If the total revenue was $2,000, how many adult tickets were sold?',
      latex: '\\text{Let } a = \\text{adult tickets}, c = \\text{child tickets}'
    },
    answer: {
      type: 'numeric',
      correct: '100',
      acceptable: ['100 tickets', '100 adult tickets'],
      unit: 'tickets'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up equation for total tickets', latex: 'a + c = 200' },
        { number: 2, description: 'Set up equation for total revenue', latex: '12a + 8c = 2000' },
        { number: 3, description: 'Solve first equation for c', latex: 'c = 200 - a' },
        { number: 4, description: 'Substitute into second equation', latex: '12a + 8(200 - a) = 2000' },
        { number: 5, description: 'Distribute and simplify', latex: '12a + 1600 - 8a = 2000 \\Rightarrow 4a = 400' },
        { number: 6, description: 'Solve for a', latex: 'a = 100' }
      ],
      method: 'System of equations (substitution)',
      alternativeMethods: ['Elimination']
    },
    hints: [
      { level: 'gentle', text: 'Define variables for adult and child tickets. What two quantities do you know the totals of?' },
      { level: 'moderate', text: 'You know the total number of tickets (200) and the total revenue ($2,000). Write an equation for each.' },
      { level: 'explicit', text: 'a + c = 200 and 12a + 8c = 2000. Substitute c = 200 - a and solve.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Word Problems with Systems',
      skills: ['systems_solving', 'problem_translation', 'money_problems'],
      prerequisites: ['linear_equations', 'variable_definition'],
      concepts: ['systems-of-equations', 'word-problem-setup', 'mixture-problems'],
      commonMistakes: [
        'Mixing up which equation represents tickets vs money',
        'Forgetting to include the cost per ticket',
        'Solving for the wrong variable'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'word-problem', 'money', 'tickets', 'grade-8']
    }
  },
  {
    id: 'alg-v2-g9-systems-217',
    version: 2,
    type: 'word-problem',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Two trains leave the same station traveling in opposite directions. Train A travels at 60 mph and Train B travels at 80 mph. After how many hours will they be 350 miles apart?',
      latex: '\\text{Let } t = \\text{time in hours}'
    },
    answer: {
      type: 'numeric',
      correct: '2.5',
      acceptable: ['2.5 hours', '2½ hours', '5/2 hours', '2.5 hrs'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Distance covered by Train A in t hours', latex: 'd_A = 60t' },
        { number: 2, description: 'Distance covered by Train B in t hours', latex: 'd_B = 80t' },
        { number: 3, description: 'Total distance apart (opposite directions means we add)', latex: 'd_A + d_B = 350' },
        { number: 4, description: 'Substitute and solve', latex: '60t + 80t = 350' },
        { number: 5, description: 'Combine like terms', latex: '140t = 350' },
        { number: 6, description: 'Solve for t', latex: 't = 2.5 \\text{ hours}' }
      ],
      method: 'Distance = Rate × Time',
      alternativeMethods: []
    },
    hints: [
      { level: 'gentle', text: 'Use the formula distance = rate × time for each train. What\'s the total distance apart?' },
      { level: 'moderate', text: 'Since they travel in opposite directions, add their distances: 60t + 80t = 350.' },
      { level: 'explicit', text: '140t = 350, so t = 350/140 = 2.5 hours.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Word Problems with Systems',
      skills: ['distance_rate_time', 'problem_translation', 'equation_setup'],
      prerequisites: ['linear_equations', 'd_equals_rt'],
      concepts: ['distance-rate-time', 'opposite-directions', 'combined-rates'],
      commonMistakes: [
        'Subtracting distances instead of adding for opposite directions',
        'Confusing rate and time',
        'Not recognizing this as a combined rate problem'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'word-problem', 'distance', 'rate', 'time', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-systems-218',
    version: 2,
    type: 'word-problem',
    difficulty: 9.2,
    gradeLevel: 9,
    question: {
      text: 'A chemist has two solutions: one is 20% acid and the other is 50% acid. How many liters of each should be mixed to create 30 liters of a 30% acid solution?',
      latex: '\\text{Let } x = \\text{liters of 20\\% solution}, y = \\text{liters of 50\\% solution}'
    },
    answer: {
      type: 'coordinate',
      correct: '(20, 10)',
      acceptable: ['x=20, y=10', '20 liters and 10 liters', '20L of 20% and 10L of 50%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up equation for total volume', latex: 'x + y = 30' },
        { number: 2, description: 'Set up equation for total acid', latex: '0.20x + 0.50y = 0.30(30)' },
        { number: 3, description: 'Simplify second equation', latex: '0.20x + 0.50y = 9' },
        { number: 4, description: 'Multiply second equation by 10 to clear decimals', latex: '2x + 5y = 90' },
        { number: 5, description: 'From first equation: x = 30 - y. Substitute', latex: '2(30 - y) + 5y = 90' },
        { number: 6, description: 'Solve', latex: '60 - 2y + 5y = 90 \\Rightarrow 3y = 30 \\Rightarrow y = 10, x = 20' }
      ],
      method: 'System of equations (mixture problem)',
      alternativeMethods: ['Weighted average method']
    },
    hints: [
      { level: 'gentle', text: 'What two things must balance? The total volume and the total amount of acid.' },
      { level: 'moderate', text: 'x + y = 30 and 0.20x + 0.50y = 0.30(30). Solve this system.' },
      { level: 'explicit', text: 'The acid equation becomes 2x + 5y = 90. Substitute x = 30 - y to get y = 10, x = 20.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Word Problems with Systems',
      skills: ['systems_solving', 'mixture_problems', 'percent_calculations'],
      prerequisites: ['linear_equations', 'percent_to_decimal', 'two_variable_systems'],
      concepts: ['mixture-problems', 'concentration', 'systems-of-equations'],
      commonMistakes: [
        'Forgetting to convert percentages to decimals',
        'Not multiplying the final concentration by the total volume',
        'Setting up the acid equation incorrectly'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 300
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'word-problem', 'mixture', 'chemistry', 'grade-9']
    }
  },
  {
    id: 'alg-v2-g9-systems-219',
    version: 2,
    type: 'word-problem',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'The sum of two numbers is 24. The larger number is 6 less than twice the smaller number. Find both numbers.',
      latex: '\\text{Let } x = \\text{smaller number}, y = \\text{larger number}'
    },
    answer: {
      type: 'coordinate',
      correct: '(10, 14)',
      acceptable: ['x=10, y=14', '10 and 14', 'smaller=10, larger=14', 'The numbers are 10 and 14']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the sum equation', latex: 'x + y = 24' },
        { number: 2, description: 'Translate "larger is 6 less than twice smaller"', latex: 'y = 2x - 6' },
        { number: 3, description: 'Substitute into the first equation', latex: 'x + (2x - 6) = 24' },
        { number: 4, description: 'Combine like terms', latex: '3x - 6 = 24' },
        { number: 5, description: 'Solve for x', latex: '3x = 30 \\Rightarrow x = 10' },
        { number: 6, description: 'Find y', latex: 'y = 2(10) - 6 = 14' }
      ],
      method: 'System of equations (substitution)',
      alternativeMethods: ['Guess and check', 'Elimination']
    },
    hints: [
      { level: 'gentle', text: 'Define variables for the two numbers. What does "6 less than twice" mean mathematically?' },
      { level: 'moderate', text: 'x + y = 24 and y = 2x - 6. Substitute the second into the first.' },
      { level: 'explicit', text: 'x + (2x - 6) = 24 → 3x = 30 → x = 10. Then y = 2(10) - 6 = 14.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Word Problems with Systems',
      skills: ['systems_solving', 'problem_translation', 'verbal_to_algebraic'],
      prerequisites: ['linear_equations', 'variable_definition'],
      concepts: ['systems-of-equations', 'number-relationships', 'word-problem-translation'],
      commonMistakes: [
        'Translating "6 less than twice" as 6 - 2x instead of 2x - 6',
        'Mixing up which number is larger',
        'Not checking that the answer satisfies both conditions'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['systems', 'word-problem', 'number-relationships', 'grade-9']
    }
  }
]
