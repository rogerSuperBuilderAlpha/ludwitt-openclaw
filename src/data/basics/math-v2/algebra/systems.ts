/**
 * Systems of Equations - MathProblemV2 Format
 * 
 * Topics covered:
 * - Elimination method (G8-9)
 * - Substitution method (G8-9)
 * - Graphical interpretation (G9)
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const SYSTEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // ELIMINATION METHOD (Grade 8-9)
  // ============================================================================
  {
    id: 'alg-v2-g9-sys-001',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve the system of equations:\n2x + y = 11\nx − y = 1',
      latex: '\\begin{cases} 2x + y = 11 \\\\ x - y = 1 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 4, y = 3',
      acceptable: ['(4, 3)', 'x=4, y=3', 'x = 4 and y = 3', '4, 3']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-2*x + 11', color: '#3B82F6', label: 'y = -2x + 11' },
          { expression: 'x - 1', color: '#EF4444', label: 'y = x - 1' }
        ],
        domain: [-1, 7],
        range: [-2, 12],
        showGrid: true,
        points: [
          { x: 4, y: 3, label: 'Intersection (4, 3)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the two equations to eliminate y', latex: '(2x + y) + (x - y) = 11 + 1' },
        { number: 2, description: 'Simplify', latex: '3x = 12' },
        { number: 3, description: 'Solve for x', latex: 'x = 4' },
        { number: 4, description: 'Substitute x = 4 into the second equation', latex: '4 - y = 1' },
        { number: 5, description: 'Solve for y', latex: 'y = 3' }
      ],
      method: 'Elimination'
    },
    hints: [
      { level: 'gentle', text: 'Try adding the two equations together. What happens to y?' },
      { level: 'moderate', text: 'Adding gives 3x = 12, so x = 4.' },
      { level: 'explicit', text: 'x = 4. Substitute into x - y = 1: 4 - y = 1, so y = 3.' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'linear-equations'],
      concepts: ['elimination', 'intersection', 'solving-systems'],
      commonMistakes: ['Substitution error', 'Sign error when adding', 'Wrong variable solved first'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'elimination', 'multi-step']
    }
  },
  {
    id: 'alg-v2-g8-sys-001',
    version: 2,
    type: 'algebra',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Solve the system of equations:\nx + y = 7\nx − y = 3',
      latex: '\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 5, y = 2',
      acceptable: ['(5, 2)', 'x=5, y=2', 'x = 5 and y = 2', '5, 2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '-x + 7', color: '#3B82F6', label: 'y = -x + 7' },
          { expression: 'x - 3', color: '#EF4444', label: 'y = x - 3' }
        ],
        domain: [0, 8],
        range: [-2, 8],
        showGrid: true,
        points: [
          { x: 5, y: 2, label: 'Intersection (5, 2)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the two equations to eliminate y', latex: '(x + y) + (x - y) = 7 + 3' },
        { number: 2, description: 'Simplify', latex: '2x = 10' },
        { number: 3, description: 'Solve for x', latex: 'x = 5' },
        { number: 4, description: 'Substitute x = 5 into the first equation', latex: '5 + y = 7' },
        { number: 5, description: 'Solve for y', latex: 'y = 2' }
      ],
      method: 'Elimination'
    },
    hints: [
      { level: 'gentle', text: 'Adding the equations will eliminate y.' },
      { level: 'moderate', text: '2x = 10, so x = 5' },
      { level: 'explicit', text: '5 + y = 7, so y = 2. Answer: (5, 2)' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination method',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'linear-equations'],
      concepts: ['elimination', 'intersection'],
      commonMistakes: ['Substitution error', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'elimination']
    }
  },

  // ============================================================================
  // SUBSTITUTION METHOD (Grade 8-9)
  // ============================================================================
  {
    id: 'alg-v2-g8-sys-002',
    version: 2,
    type: 'algebra',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Solve the system by substitution:\ny = 2x − 1\n3x + y = 14',
      latex: '\\begin{cases} y = 2x - 1 \\\\ 3x + y = 14 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 3, y = 5',
      acceptable: ['(3, 5)', 'x=3, y=5', 'x = 3 and y = 5', '3, 5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2*x - 1', color: '#3B82F6', label: 'y = 2x - 1' },
          { expression: '-3*x + 14', color: '#EF4444', label: 'y = -3x + 14' }
        ],
        domain: [-1, 6],
        range: [-3, 15],
        showGrid: true,
        points: [
          { x: 3, y: 5, label: 'Intersection (3, 5)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute y = 2x - 1 into the second equation', latex: '3x + (2x - 1) = 14' },
        { number: 2, description: 'Simplify', latex: '5x - 1 = 14' },
        { number: 3, description: 'Add 1 to both sides', latex: '5x = 15' },
        { number: 4, description: 'Solve for x', latex: 'x = 3' },
        { number: 5, description: 'Substitute back to find y', latex: 'y = 2(3) - 1 = 5' }
      ],
      method: 'Substitution'
    },
    hints: [
      { level: 'gentle', text: 'Since y is already isolated, substitute 2x - 1 for y in the second equation.' },
      { level: 'moderate', text: '3x + (2x - 1) = 14 simplifies to 5x = 15' },
      { level: 'explicit', text: 'x = 3, then y = 2(3) - 1 = 5' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution method',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'linear-equations'],
      concepts: ['substitution', 'solving-systems'],
      commonMistakes: ['Substitution error', 'Not substituting back correctly'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'substitution']
    }
  },
  {
    id: 'alg-v2-g9-sys-002',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve the system:\n2x + 3y = 12\nx = y + 1',
      latex: '\\begin{cases} 2x + 3y = 12 \\\\ x = y + 1 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 3, y = 2',
      acceptable: ['(3, 2)', 'x=3, y=2', 'x = 3 and y = 2', '3, 2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(-2*x + 12)/3', color: '#3B82F6', label: '2x + 3y = 12' },
          { expression: 'x - 1', color: '#EF4444', label: 'y = x - 1' }
        ],
        domain: [-1, 7],
        range: [-2, 5],
        showGrid: true,
        points: [
          { x: 3, y: 2, label: 'Intersection (3, 2)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute x = y + 1 into the first equation', latex: '2(y + 1) + 3y = 12' },
        { number: 2, description: 'Distribute', latex: '2y + 2 + 3y = 12' },
        { number: 3, description: 'Combine like terms', latex: '5y + 2 = 12' },
        { number: 4, description: 'Solve for y', latex: '5y = 10 \\Rightarrow y = 2' },
        { number: 5, description: 'Substitute back to find x', latex: 'x = 2 + 1 = 3' }
      ],
      method: 'Substitution'
    },
    hints: [
      { level: 'gentle', text: 'Substitute x = y + 1 into the first equation.' },
      { level: 'moderate', text: '2(y + 1) + 3y = 12 simplifies to 5y = 10' },
      { level: 'explicit', text: 'y = 2, then x = 2 + 1 = 3' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution method',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics', 'distributive-property'],
      concepts: ['substitution', 'solving-systems'],
      commonMistakes: ['Distribution error', 'Substitution error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'substitution']
    }
  },
  {
    id: 'alg-v2-g9-sys-003',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve the system:\n4x - 2y = 10\n3x + y = 11',
      latex: '\\begin{cases} 4x - 2y = 10 \\\\ 3x + y = 11 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 3.2, y = 1.4',
      acceptable: ['(3.2, 1.4)', 'x=16/5, y=7/5', '(16/5, 7/5)', 'x = 3.2, y = 1.4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(4*x - 10)/2', color: '#3B82F6', label: '4x - 2y = 10' },
          { expression: '-3*x + 11', color: '#EF4444', label: '3x + y = 11' }
        ],
        domain: [0, 5],
        range: [-2, 12],
        showGrid: true,
        points: [
          { x: 3.2, y: 1.4, label: 'Intersection (3.2, 1.4)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Multiply the second equation by 2', latex: '6x + 2y = 22' },
        { number: 2, description: 'Add to the first equation', latex: '(4x - 2y) + (6x + 2y) = 10 + 22' },
        { number: 3, description: 'Simplify', latex: '10x = 32 \\Rightarrow x = 3.2' },
        { number: 4, description: 'Substitute into second equation', latex: '3(3.2) + y = 11' },
        { number: 5, description: 'Solve for y', latex: '9.6 + y = 11 \\Rightarrow y = 1.4' }
      ],
      method: 'Elimination by multiplication'
    },
    hints: [
      { level: 'gentle', text: 'Multiply one equation so that y terms cancel when added.' },
      { level: 'moderate', text: 'Multiply equation 2 by 2, then add: 10x = 32' },
      { level: 'explicit', text: 'x = 3.2, y = 1.4' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination with multiplication',
      skills: ['advanced_algebra'],
      prerequisites: ['elimination-basic', 'algebra_basics'],
      concepts: ['elimination', 'multiplication-to-eliminate'],
      commonMistakes: ['Multiplication error', 'Not multiplying all terms'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'elimination', 'advanced']
    }
  },
  {
    id: 'alg-v2-g9-sys-004',
    version: 2,
    type: 'algebra',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Solve:\ny = x + 2\n2x + y = 8',
      latex: '\\begin{cases} y = x + 2 \\\\ 2x + y = 8 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 2, y = 4',
      acceptable: ['(2, 4)', 'x=2, y=4', '2, 4']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: 'x + 2', color: '#3B82F6', label: 'y = x + 2' },
          { expression: '-2*x + 8', color: '#EF4444', label: 'y = -2x + 8' }
        ],
        domain: [-1, 5],
        range: [0, 10],
        showGrid: true,
        points: [
          { x: 2, y: 4, label: 'Intersection (2, 4)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Substitute y = x + 2 into second equation', latex: '2x + (x + 2) = 8' },
        { number: 2, description: 'Combine like terms', latex: '3x + 2 = 8' },
        { number: 3, description: 'Solve for x', latex: '3x = 6 \\Rightarrow x = 2' },
        { number: 4, description: 'Find y', latex: 'y = 2 + 2 = 4' }
      ],
      method: 'Substitution'
    },
    hints: [
      { level: 'gentle', text: 'y is already solved for. Substitute into the second equation.' },
      { level: 'moderate', text: '2x + (x + 2) = 8 gives 3x = 6' },
      { level: 'explicit', text: 'x = 2, y = 4' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Substitution',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['substitution', 'solving-systems'],
      commonMistakes: ['Arithmetic error', 'Substitution error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'substitution']
    }
  },
  {
    id: 'alg-v2-g9-sys-005',
    version: 2,
    type: 'algebra',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Solve the system:\n3x + 2y = 7\n5x - 2y = 9',
      latex: '\\begin{cases} 3x + 2y = 7 \\\\ 5x - 2y = 9 \\end{cases}'
    },
    answer: {
      type: 'coordinate',
      correct: 'x = 2, y = 0.5',
      acceptable: ['(2, 0.5)', 'x=2, y=1/2', '(2, 1/2)', 'x = 2, y = 0.5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(-3*x + 7)/2', color: '#3B82F6', label: '3x + 2y = 7' },
          { expression: '(5*x - 9)/2', color: '#EF4444', label: '5x - 2y = 9' }
        ],
        domain: [0, 4],
        range: [-2, 4],
        showGrid: true,
        points: [
          { x: 2, y: 0.5, label: 'Intersection (2, 0.5)', color: '#10B981', size: 8 }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Notice that 2y terms have opposite signs - add equations', latex: '(3x + 2y) + (5x - 2y) = 7 + 9' },
        { number: 2, description: 'Simplify', latex: '8x = 16' },
        { number: 3, description: 'Solve for x', latex: 'x = 2' },
        { number: 4, description: 'Substitute into first equation', latex: '3(2) + 2y = 7' },
        { number: 5, description: 'Solve for y', latex: '6 + 2y = 7 \\Rightarrow y = 0.5' }
      ],
      method: 'Elimination'
    },
    hints: [
      { level: 'gentle', text: 'The y terms are opposites. Add the equations.' },
      { level: 'moderate', text: 'Adding gives 8x = 16, so x = 2' },
      { level: 'explicit', text: 'x = 2, then 6 + 2y = 7, so y = 0.5' }
    ],
    pedagogy: {
      topic: 'Systems of Equations',
      subTopic: 'Elimination',
      skills: ['advanced_algebra'],
      prerequisites: ['algebra_basics'],
      concepts: ['elimination', 'solving-systems'],
      commonMistakes: ['Not noticing opposite terms', 'Arithmetic error'],
      scaffoldingLevel: 'moderate'
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['systems', 'elimination']
    }
  }
]
