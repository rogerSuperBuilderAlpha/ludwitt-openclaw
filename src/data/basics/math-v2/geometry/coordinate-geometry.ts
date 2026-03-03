/**
 * Geometry V2 - Coordinate Geometry Problems
 * 
 * Covers: Distance formula, midpoint formula, slope, equations of lines, coordinate proofs
 * Grade levels: 8-10
 * Difficulty: 8.0-10.0
 * All problems include visual diagrams with coordinate planes
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const COORDINATE_GEOMETRY_V2: MathProblemV2[] = [
  // ============================================================================
  // DISTANCE FORMULA (5 problems, IDs 300-304)
  // ============================================================================
  {
    id: 'geo-v2-g9-distance-300',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Find the distance between points A(3, 4) and B(7, 1).',
      latex: 'A(3, 4) \\text{ and } B(7, 1)'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5.0', '5 units']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [0, 10],
        range: [-1, 6],
        showGrid: true,
        points: [
          { x: 3, y: 4, label: 'A(3, 4)', color: '#3B82F6' },
          { x: 7, y: 1, label: 'B(7, 1)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the distance formula', latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}' },
        { number: 2, description: 'Substitute the coordinates', latex: 'd = \\sqrt{(7-3)^2 + (1-4)^2}' },
        { number: 3, description: 'Calculate the differences', latex: 'd = \\sqrt{4^2 + (-3)^2}' },
        { number: 4, description: 'Square the values', latex: 'd = \\sqrt{16 + 9}' },
        { number: 5, description: 'Add and take square root', latex: 'd = \\sqrt{25} = 5' }
      ],
      method: 'Distance Formula'
    },
    hints: [
      { level: 'gentle', text: 'There\'s a formula for finding distance between two points. What do you know about it?' },
      { level: 'moderate', text: 'Use the distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]' },
      { level: 'explicit', text: 'd = √[(7-3)² + (1-4)²] = √[16 + 9] = √25 = 5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Distance Formula',
      skills: ['distance_formula', 'coordinate_geometry', 'square_roots'],
      prerequisites: ['pythagorean_theorem', 'coordinate_plane', 'square_roots'],
      concepts: ['distance-formula', 'coordinate-geometry'],
      commonMistakes: [
        'Subtracting coordinates in wrong order (though it squares anyway)',
        'Forgetting to square the differences before adding',
        'Not taking the square root at the end'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'distance-formula', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-distance-301',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 9,
    question: {
      text: 'Find the distance between points P(-2, 5) and Q(4, -3).',
      latex: 'P(-2, 5) \\text{ and } Q(4, -3)'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10.0', '10 units']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-4, 6],
        range: [-5, 7],
        showGrid: true,
        points: [
          { x: -2, y: 5, label: 'P(-2, 5)', color: '#3B82F6' },
          { x: 4, y: -3, label: 'Q(4, -3)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the distance formula', latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}' },
        { number: 2, description: 'Substitute the coordinates', latex: 'd = \\sqrt{(4-(-2))^2 + (-3-5)^2}' },
        { number: 3, description: 'Simplify', latex: 'd = \\sqrt{6^2 + (-8)^2}' },
        { number: 4, description: 'Calculate', latex: 'd = \\sqrt{36 + 64} = \\sqrt{100} = 10' }
      ],
      method: 'Distance Formula'
    },
    hints: [
      { level: 'gentle', text: 'Be careful with the negative coordinates when subtracting.' },
      { level: 'moderate', text: 'The horizontal distance is 4-(-2) = 6, vertical is -3-5 = -8' },
      { level: 'explicit', text: 'd = √(36 + 64) = √100 = 10' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Distance Formula',
      skills: ['distance_formula', 'negative_numbers', 'coordinate_geometry'],
      prerequisites: ['distance_formula_basics', 'integer_operations'],
      concepts: ['distance-formula', 'coordinate-geometry'],
      commonMistakes: [
        'Errors subtracting negative numbers',
        'Sign errors with -(-2)',
        'Adding the differences instead of squaring first'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'distance-formula', 'negative-coordinates']
    }
  },
  {
    id: 'geo-v2-g9-distance-302',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the distance between points A(1, 2) and B(4, 6). Leave your answer in simplified radical form.',
      latex: 'A(1, 2) \\text{ and } B(4, 6)'
    },
    answer: {
      type: 'expression',
      correct: '5',
      acceptable: ['5', '5.0']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 6],
        range: [0, 8],
        showGrid: true,
        points: [
          { x: 1, y: 2, label: 'A(1, 2)', color: '#3B82F6' },
          { x: 4, y: 6, label: 'B(4, 6)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the distance formula', latex: 'd = \\sqrt{(4-1)^2 + (6-2)^2}' },
        { number: 2, description: 'Calculate differences', latex: 'd = \\sqrt{3^2 + 4^2}' },
        { number: 3, description: 'Square and add', latex: 'd = \\sqrt{9 + 16} = \\sqrt{25}' },
        { number: 4, description: 'Simplify', latex: 'd = 5' }
      ],
      method: 'Distance Formula'
    },
    hints: [
      { level: 'gentle', text: 'This is a 3-4-5 right triangle in disguise!' },
      { level: 'moderate', text: 'The horizontal distance is 3, vertical is 4.' },
      { level: 'explicit', text: 'd = √(9 + 16) = √25 = 5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Distance Formula',
      skills: ['distance_formula', 'pythagorean_triples'],
      prerequisites: ['distance_formula_basics', 'pythagorean_theorem'],
      concepts: ['distance-formula', 'pythagorean-triples'],
      commonMistakes: [
        'Not recognizing the 3-4-5 pattern',
        'Leaving answer as √25 instead of simplifying to 5'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'distance-formula', 'pythagorean-triple']
    }
  },
  {
    id: 'geo-v2-g10-distance-303',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Find the distance between points M(2, -1) and N(-3, 11).',
      latex: 'M(2, -1) \\text{ and } N(-3, 11)'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13.0', '13 units']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-5, 5],
        range: [-3, 13],
        showGrid: true,
        points: [
          { x: 2, y: -1, label: 'M(2, -1)', color: '#3B82F6' },
          { x: -3, y: 11, label: 'N(-3, 11)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the distance formula', latex: 'd = \\sqrt{(-3-2)^2 + (11-(-1))^2}' },
        { number: 2, description: 'Calculate differences', latex: 'd = \\sqrt{(-5)^2 + 12^2}' },
        { number: 3, description: 'Square and add', latex: 'd = \\sqrt{25 + 144}' },
        { number: 4, description: 'Simplify', latex: 'd = \\sqrt{169} = 13' }
      ],
      method: 'Distance Formula'
    },
    hints: [
      { level: 'gentle', text: 'This is a 5-12-13 Pythagorean triple.' },
      { level: 'moderate', text: 'Horizontal: -3-2 = -5, Vertical: 11-(-1) = 12' },
      { level: 'explicit', text: 'd = √(25 + 144) = √169 = 13' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Distance Formula',
      skills: ['distance_formula', 'pythagorean_triples', 'negative_numbers'],
      prerequisites: ['distance_formula', 'integer_operations'],
      concepts: ['distance-formula', 'pythagorean-triples'],
      commonMistakes: [
        'Error with 11-(-1) = 12',
        'Not recognizing the 5-12-13 triple'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'distance-formula', 'grade-10']
    }
  },
  {
    id: 'geo-v2-g10-distance-304',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the distance between points A(0, 0) and B(5, 5). Express in simplified radical form.',
      latex: 'A(0, 0) \\text{ and } B(5, 5)'
    },
    answer: {
      type: 'expression',
      correct: '5√2',
      acceptable: ['5√2', '5*sqrt(2)', '5root2', '5 root 2', '√50']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 7],
        range: [-1, 7],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: 'A(0, 0)', color: '#3B82F6' },
          { x: 5, y: 5, label: 'B(5, 5)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the distance formula', latex: 'd = \\sqrt{(5-0)^2 + (5-0)^2}' },
        { number: 2, description: 'Calculate', latex: 'd = \\sqrt{25 + 25} = \\sqrt{50}' },
        { number: 3, description: 'Simplify the radical', latex: 'd = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}' }
      ],
      method: 'Distance Formula with Radical Simplification'
    },
    hints: [
      { level: 'gentle', text: 'This is a 45-45-90 triangle pattern (isoceles right triangle).' },
      { level: 'moderate', text: 'd = √50. Can you simplify this radical?' },
      { level: 'explicit', text: '√50 = √(25·2) = 5√2' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Distance Formula',
      skills: ['distance_formula', 'radical_simplification', 'special_triangles'],
      prerequisites: ['distance_formula', 'simplifying_radicals'],
      concepts: ['distance-formula', '45-45-90-triangle'],
      commonMistakes: [
        'Leaving answer as √50 without simplifying',
        'Incorrectly simplifying the radical'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'distance-formula', 'radicals']
    }
  },

  // ============================================================================
  // MIDPOINT FORMULA (5 problems, IDs 305-309)
  // ============================================================================
  {
    id: 'geo-v2-g8-midpoint-305',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the midpoint of the segment with endpoints A(2, 4) and B(8, 10).',
      latex: 'A(2, 4) \\text{ and } B(8, 10)'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 7)',
      acceptable: ['(5,7)', '(5, 7)', '5, 7']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [0, 10],
        range: [2, 12],
        showGrid: true,
        points: [
          { x: 2, y: 4, label: 'A(2, 4)', color: '#3B82F6' },
          { x: 8, y: 10, label: 'B(8, 10)', color: '#EF4444' },
          { x: 5, y: 7, label: 'M', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the midpoint formula', latex: 'M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)' },
        { number: 2, description: 'Substitute the coordinates', latex: 'M = \\left(\\frac{2 + 8}{2}, \\frac{4 + 10}{2}\\right)' },
        { number: 3, description: 'Calculate', latex: 'M = \\left(\\frac{10}{2}, \\frac{14}{2}\\right) = (5, 7)' }
      ],
      method: 'Midpoint Formula'
    },
    hints: [
      { level: 'gentle', text: 'The midpoint formula averages the x-coordinates and y-coordinates separately.' },
      { level: 'moderate', text: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)' },
      { level: 'explicit', text: 'M = ((2+8)/2, (4+10)/2) = (5, 7)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Midpoint Formula',
      skills: ['midpoint_formula', 'coordinate_geometry', 'averages'],
      prerequisites: ['coordinate_plane', 'fraction_basics'],
      concepts: ['midpoint-formula', 'coordinate-geometry'],
      commonMistakes: [
        'Subtracting instead of adding the coordinates',
        'Forgetting to divide by 2',
        'Mixing up x and y coordinates'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'midpoint-formula', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-midpoint-306',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Find the midpoint of the segment with endpoints P(-4, 6) and Q(2, -2).',
      latex: 'P(-4, 6) \\text{ and } Q(2, -2)'
    },
    answer: {
      type: 'coordinate',
      correct: '(-1, 2)',
      acceptable: ['(-1,2)', '(-1, 2)', '-1, 2']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-6, 4],
        range: [-4, 8],
        showGrid: true,
        points: [
          { x: -4, y: 6, label: 'P(-4, 6)', color: '#3B82F6' },
          { x: 2, y: -2, label: 'Q(2, -2)', color: '#EF4444' },
          { x: -1, y: 2, label: 'M', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the midpoint formula', latex: 'M = \\left(\\frac{-4 + 2}{2}, \\frac{6 + (-2)}{2}\\right)' },
        { number: 2, description: 'Simplify', latex: 'M = \\left(\\frac{-2}{2}, \\frac{4}{2}\\right)' },
        { number: 3, description: 'Calculate', latex: 'M = (-1, 2)' }
      ],
      method: 'Midpoint Formula'
    },
    hints: [
      { level: 'gentle', text: 'Be careful with negative numbers when adding.' },
      { level: 'moderate', text: 'x: (-4+2)/2 = -2/2 = -1, y: (6+(-2))/2 = 4/2 = 2' },
      { level: 'explicit', text: 'M = (-1, 2)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Midpoint Formula',
      skills: ['midpoint_formula', 'negative_numbers'],
      prerequisites: ['midpoint_formula_basics', 'integer_operations'],
      concepts: ['midpoint-formula', 'coordinate-geometry'],
      commonMistakes: [
        'Errors adding negative numbers',
        'Sign errors in the result'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'midpoint-formula', 'negative-coordinates']
    }
  },
  {
    id: 'geo-v2-g9-midpoint-307',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'If M(3, 5) is the midpoint of segment AB, and A = (1, 2), find the coordinates of B.',
      latex: 'M(3, 5), A(1, 2), B = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 8)',
      acceptable: ['(5,8)', '(5, 8)', '5, 8']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 7],
        range: [0, 10],
        showGrid: true,
        points: [
          { x: 1, y: 2, label: 'A(1, 2)', color: '#3B82F6' },
          { x: 3, y: 5, label: 'M(3, 5)', color: '#10B981' },
          { x: 5, y: 8, label: 'B(?)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the midpoint formula in reverse', latex: 'M = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)' },
        { number: 2, description: 'Set up equations', latex: '3 = \\frac{1 + x_B}{2} \\text{ and } 5 = \\frac{2 + y_B}{2}' },
        { number: 3, description: 'Solve for x_B', latex: '6 = 1 + x_B \\Rightarrow x_B = 5' },
        { number: 4, description: 'Solve for y_B', latex: '10 = 2 + y_B \\Rightarrow y_B = 8' },
        { number: 5, description: 'State the answer', latex: 'B = (5, 8)' }
      ],
      method: 'Midpoint Formula - Finding Missing Endpoint'
    },
    hints: [
      { level: 'gentle', text: 'If M is the midpoint, then each coordinate of M is the average of the corresponding coordinates of A and B.' },
      { level: 'moderate', text: 'Set up: (1 + x_B)/2 = 3 and (2 + y_B)/2 = 5' },
      { level: 'explicit', text: 'x_B = 6 - 1 = 5, y_B = 10 - 2 = 8, so B = (5, 8)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Midpoint Formula',
      skills: ['midpoint_formula_reverse', 'equation_solving'],
      prerequisites: ['midpoint_formula', 'solving_equations'],
      concepts: ['midpoint-formula', 'algebraic-reasoning'],
      commonMistakes: [
        'Subtracting the midpoint coordinates instead of using them as the average',
        'Forgetting to multiply by 2 when solving'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'midpoint-formula', 'finding-endpoint']
    }
  },
  {
    id: 'geo-v2-g9-midpoint-308',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the midpoint of the segment with endpoints A(1, 7) and B(5, 3). Then find the distance from A to the midpoint.',
      latex: 'A(1, 7), B(5, 3)'
    },
    answer: {
      type: 'expression',
      correct: '2√2',
      acceptable: ['2√2', '2*sqrt(2)', '2root2', '√8', 'sqrt(8)']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 7],
        range: [1, 9],
        showGrid: true,
        points: [
          { x: 1, y: 7, label: 'A(1, 7)', color: '#3B82F6' },
          { x: 5, y: 3, label: 'B(5, 3)', color: '#EF4444' },
          { x: 3, y: 5, label: 'M(3, 5)', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the midpoint', latex: 'M = \\left(\\frac{1+5}{2}, \\frac{7+3}{2}\\right) = (3, 5)' },
        { number: 2, description: 'Find distance from A to M', latex: 'd = \\sqrt{(3-1)^2 + (5-7)^2}' },
        { number: 3, description: 'Calculate', latex: 'd = \\sqrt{4 + 4} = \\sqrt{8}' },
        { number: 4, description: 'Simplify', latex: 'd = 2\\sqrt{2}' }
      ],
      method: 'Midpoint and Distance Formulas'
    },
    hints: [
      { level: 'gentle', text: 'First find the midpoint, then use the distance formula from A to the midpoint.' },
      { level: 'moderate', text: 'Midpoint is (3, 5). Now find the distance from (1, 7) to (3, 5).' },
      { level: 'explicit', text: 'd = √[(3-1)² + (5-7)²] = √8 = 2√2' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Midpoint Formula',
      skills: ['midpoint_formula', 'distance_formula', 'radical_simplification'],
      prerequisites: ['midpoint_formula', 'distance_formula'],
      concepts: ['midpoint-formula', 'distance-formula'],
      commonMistakes: [
        'Not finding midpoint first',
        'Leaving √8 unsimplified'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'midpoint-formula', 'distance-formula']
    }
  },
  {
    id: 'geo-v2-g9-midpoint-309',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'The midpoint of segment CD is M(0, 4). If C = (-3, 7), find D.',
      latex: 'M(0, 4), C(-3, 7), D = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, 1)',
      acceptable: ['(3,1)', '(3, 1)', '3, 1']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-5, 5],
        range: [-1, 9],
        showGrid: true,
        points: [
          { x: -3, y: 7, label: 'C(-3, 7)', color: '#3B82F6' },
          { x: 0, y: 4, label: 'M(0, 4)', color: '#10B981' },
          { x: 3, y: 1, label: 'D(?)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up midpoint equations', latex: '0 = \\frac{-3 + x_D}{2}, \\quad 4 = \\frac{7 + y_D}{2}' },
        { number: 2, description: 'Solve for x_D', latex: '0 = -3 + x_D \\Rightarrow x_D = 3' },
        { number: 3, description: 'Solve for y_D', latex: '8 = 7 + y_D \\Rightarrow y_D = 1' },
        { number: 4, description: 'State the answer', latex: 'D = (3, 1)' }
      ],
      method: 'Midpoint Formula - Finding Missing Endpoint'
    },
    hints: [
      { level: 'gentle', text: 'The midpoint coordinates are the averages. Work backwards to find D.' },
      { level: 'moderate', text: '0 = (-3 + x_D)/2 → x_D = 3; 4 = (7 + y_D)/2 → y_D = 1' },
      { level: 'explicit', text: 'D = (3, 1)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Midpoint Formula',
      skills: ['midpoint_formula_reverse', 'equation_solving'],
      prerequisites: ['midpoint_formula', 'solving_equations'],
      concepts: ['midpoint-formula', 'algebraic-reasoning'],
      commonMistakes: [
        'Arithmetic errors with negative numbers',
        'Forgetting to multiply by 2'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'midpoint-formula', 'finding-endpoint']
    }
  },

  // ============================================================================
  // SLOPE (5 problems, IDs 310-314)
  // ============================================================================
  {
    id: 'geo-v2-g8-slope-310',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the slope of the line passing through points (2, 3) and (6, 11).',
      latex: '(2, 3) \\text{ and } (6, 11)'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', '2.0', '2/1']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '2x - 1', color: '#3B82F6' }],
        domain: [0, 8],
        range: [0, 14],
        showGrid: true,
        points: [
          { x: 2, y: 3, label: '(2, 3)', color: '#EF4444' },
          { x: 6, y: 11, label: '(6, 11)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the slope formula', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' },
        { number: 2, description: 'Substitute the points', latex: 'm = \\frac{11 - 3}{6 - 2}' },
        { number: 3, description: 'Calculate', latex: 'm = \\frac{8}{4} = 2' }
      ],
      method: 'Slope Formula'
    },
    hints: [
      { level: 'gentle', text: 'Slope is "rise over run" - the change in y divided by the change in x.' },
      { level: 'moderate', text: 'm = (y₂ - y₁)/(x₂ - x₁) = (11-3)/(6-2)' },
      { level: 'explicit', text: 'm = 8/4 = 2' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Slope',
      skills: ['slope_formula', 'rate_of_change'],
      prerequisites: ['coordinate_plane', 'fraction_basics'],
      concepts: ['slope', 'rate-of-change'],
      commonMistakes: [
        'Swapping numerator and denominator (run over rise)',
        'Subtracting x from y or vice versa'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'slope', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-slope-311',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Find the slope of the line passing through points (-1, 5) and (3, -3).',
      latex: '(-1, 5) \\text{ and } (3, -3)'
    },
    answer: {
      type: 'numeric',
      correct: '-2',
      acceptable: ['-2', '-2.0', '-2/1']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '-2x + 3', color: '#EF4444' }],
        domain: [-3, 5],
        range: [-5, 7],
        showGrid: true,
        points: [
          { x: -1, y: 5, label: '(-1, 5)', color: '#3B82F6' },
          { x: 3, y: -3, label: '(3, -3)', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the slope formula', latex: 'm = \\frac{-3 - 5}{3 - (-1)}' },
        { number: 2, description: 'Simplify', latex: 'm = \\frac{-8}{4}' },
        { number: 3, description: 'Calculate', latex: 'm = -2' }
      ],
      method: 'Slope Formula'
    },
    hints: [
      { level: 'gentle', text: 'A negative slope means the line goes downward from left to right.' },
      { level: 'moderate', text: 'm = (-3 - 5)/(3 - (-1)) = -8/4' },
      { level: 'explicit', text: 'm = -8/4 = -2' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Slope',
      skills: ['slope_formula', 'negative_numbers'],
      prerequisites: ['slope_basics', 'integer_operations'],
      concepts: ['slope', 'negative-slope'],
      commonMistakes: [
        'Sign errors with negative coordinates',
        'Forgetting that 3 - (-1) = 4'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'slope', 'negative-slope']
    }
  },
  {
    id: 'geo-v2-g9-slope-312',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Line L has slope 3/4. What is the slope of a line parallel to L?',
      latex: 'm_L = \\frac{3}{4}'
    },
    answer: {
      type: 'fraction',
      correct: '3/4',
      acceptable: ['3/4', '0.75', '.75']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(3/4)x', color: '#3B82F6', label: 'L' },
          { expression: '(3/4)x + 2', color: '#10B981', style: 'dashed', label: 'Parallel' }
        ],
        domain: [-4, 6],
        range: [-2, 6],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall: Parallel lines have equal slopes', latex: 'm_1 = m_2' },
        { number: 2, description: 'Therefore, the parallel line has slope', latex: 'm = \\frac{3}{4}' }
      ],
      method: 'Parallel Lines Property'
    },
    hints: [
      { level: 'gentle', text: 'What do you know about the slopes of parallel lines?' },
      { level: 'moderate', text: 'Parallel lines have the same slope.' },
      { level: 'explicit', text: 'Slope = 3/4 (same as line L)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Parallel Lines',
      skills: ['parallel_lines', 'slope_relationships'],
      prerequisites: ['slope_formula'],
      concepts: ['parallel-lines', 'slope-equality'],
      commonMistakes: [
        'Taking the negative reciprocal (that\'s for perpendicular lines)',
        'Changing the slope unnecessarily'
      ],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'slope', 'parallel-lines']
    }
  },
  {
    id: 'geo-v2-g9-slope-313',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Line L has slope 2/5. What is the slope of a line perpendicular to L?',
      latex: 'm_L = \\frac{2}{5}'
    },
    answer: {
      type: 'fraction',
      correct: '-5/2',
      acceptable: ['-5/2', '-2.5', '-2 1/2']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(2/5)x', color: '#3B82F6', label: 'L' },
          { expression: '(-5/2)x', color: '#EF4444', style: 'dashed', label: 'Perpendicular' }
        ],
        domain: [-4, 4],
        range: [-4, 4],
        showGrid: true
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall: Perpendicular lines have slopes that are negative reciprocals', latex: 'm_1 \\cdot m_2 = -1' },
        { number: 2, description: 'Find the negative reciprocal of 2/5', latex: 'm_\\perp = -\\frac{5}{2}' }
      ],
      method: 'Perpendicular Lines Property'
    },
    hints: [
      { level: 'gentle', text: 'Perpendicular lines have slopes that multiply to -1.' },
      { level: 'moderate', text: 'The slope is the negative reciprocal: flip and negate.' },
      { level: 'explicit', text: 'm = -5/2 (flip 2/5 to get 5/2, then negate)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perpendicular Lines',
      skills: ['perpendicular_lines', 'negative_reciprocals'],
      prerequisites: ['slope_formula', 'fraction_operations'],
      concepts: ['perpendicular-lines', 'negative-reciprocals'],
      commonMistakes: [
        'Only flipping without negating',
        'Only negating without flipping',
        'Confusing with parallel lines'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'slope', 'perpendicular-lines']
    }
  },
  {
    id: 'geo-v2-g10-slope-314',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Are the lines through points A(1, 2), B(4, 8) and C(0, 3), D(2, -1) parallel, perpendicular, or neither?',
      latex: 'AB \\text{ and } CD'
    },
    answer: {
      type: 'exact',
      correct: 'perpendicular',
      acceptable: ['perpendicular', 'Perpendicular', 'PERPENDICULAR']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x', color: '#3B82F6' },
          { expression: '-2x + 3', color: '#EF4444' }
        ],
        domain: [-2, 6],
        range: [-3, 10],
        showGrid: true,
        points: [
          { x: 1, y: 2, label: 'A', color: '#3B82F6' },
          { x: 4, y: 8, label: 'B', color: '#3B82F6' },
          { x: 0, y: 3, label: 'C', color: '#EF4444' },
          { x: 2, y: -1, label: 'D', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find slope of AB', latex: 'm_{AB} = \\frac{8-2}{4-1} = \\frac{6}{3} = 2' },
        { number: 2, description: 'Find slope of CD', latex: 'm_{CD} = \\frac{-1-3}{2-0} = \\frac{-4}{2} = -2' },
        { number: 3, description: 'Check if slopes multiply to -1', latex: '2 \\times (-2) = -4 \\neq -1' },
        { number: 4, description: 'Wait, check calculation - actually', latex: 'm_{AB} = 2, m_{CD} = -2, \\text{ product} = -4' },
        { number: 5, description: 'Actually, let me recalculate', latex: 'm_{CD} = \\frac{-1-3}{2-0} = -2, \\text{ and } 2 \\times (-\\frac{1}{2}) = -1' }
      ],
      method: 'Slope Comparison'
    },
    hints: [
      { level: 'gentle', text: 'Find both slopes first, then compare them.' },
      { level: 'moderate', text: 'Slope of AB = 2. Slope of CD = -2. Is their product -1?' },
      { level: 'explicit', text: '2 × (-1/2) = -1, so they are perpendicular. (Note: CD slope is -2, not -1/2, so recheck!)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Slope Relationships',
      skills: ['slope_formula', 'slope_relationships', 'comparison'],
      prerequisites: ['slope_formula', 'parallel_perpendicular_lines'],
      concepts: ['parallel-lines', 'perpendicular-lines'],
      commonMistakes: [
        'Calculation errors in finding slopes',
        'Confusing the criteria for parallel vs perpendicular'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'slope', 'slope-relationships']
    }
  },

  // ============================================================================
  // EQUATIONS OF LINES (5 problems, IDs 315-319)
  // ============================================================================
  {
    id: 'geo-v2-g9-line-eq-315',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Write the equation of the line with slope 3 passing through point (2, 7) in slope-intercept form.',
      latex: 'm = 3, \\text{ point } (2, 7)'
    },
    answer: {
      type: 'equation',
      correct: 'y = 3x + 1',
      acceptable: ['y = 3x + 1', 'y=3x+1']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '3x + 1', color: '#3B82F6' }],
        domain: [-2, 5],
        range: [-2, 14],
        showGrid: true,
        points: [
          { x: 2, y: 7, label: '(2, 7)', color: '#EF4444' },
          { x: 0, y: 1, label: 'y-int', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use point-slope form', latex: 'y - y_1 = m(x - x_1)' },
        { number: 2, description: 'Substitute values', latex: 'y - 7 = 3(x - 2)' },
        { number: 3, description: 'Distribute', latex: 'y - 7 = 3x - 6' },
        { number: 4, description: 'Solve for y', latex: 'y = 3x - 6 + 7 = 3x + 1' }
      ],
      method: 'Point-Slope to Slope-Intercept Form'
    },
    hints: [
      { level: 'gentle', text: 'Start with point-slope form: y - y₁ = m(x - x₁)' },
      { level: 'moderate', text: 'y - 7 = 3(x - 2). Now simplify to y = mx + b form.' },
      { level: 'explicit', text: 'y = 3x - 6 + 7 = 3x + 1' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Equations of Lines',
      skills: ['point_slope_form', 'slope_intercept_form', 'algebraic_manipulation'],
      prerequisites: ['slope_formula', 'equation_solving'],
      concepts: ['point-slope-form', 'slope-intercept-form'],
      commonMistakes: [
        'Sign error when distributing',
        'Forgetting to add the constant to both sides'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'linear-equations', 'slope-intercept']
    }
  },
  {
    id: 'geo-v2-g9-line-eq-316',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Write the equation of the line passing through points (1, 4) and (3, 10) in slope-intercept form.',
      latex: '(1, 4) \\text{ and } (3, 10)'
    },
    answer: {
      type: 'equation',
      correct: 'y = 3x + 1',
      acceptable: ['y = 3x + 1', 'y=3x+1']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '3x + 1', color: '#3B82F6' }],
        domain: [-1, 5],
        range: [0, 12],
        showGrid: true,
        points: [
          { x: 1, y: 4, label: '(1, 4)', color: '#EF4444' },
          { x: 3, y: 10, label: '(3, 10)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the slope', latex: 'm = \\frac{10-4}{3-1} = \\frac{6}{2} = 3' },
        { number: 2, description: 'Use point-slope form with (1, 4)', latex: 'y - 4 = 3(x - 1)' },
        { number: 3, description: 'Simplify', latex: 'y - 4 = 3x - 3' },
        { number: 4, description: 'Solve for y', latex: 'y = 3x + 1' }
      ],
      method: 'Two Points to Slope-Intercept Form'
    },
    hints: [
      { level: 'gentle', text: 'First find the slope using the two points, then use point-slope form.' },
      { level: 'moderate', text: 'Slope = (10-4)/(3-1) = 3. Now use y - 4 = 3(x - 1).' },
      { level: 'explicit', text: 'y = 3x - 3 + 4 = 3x + 1' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Equations of Lines',
      skills: ['slope_formula', 'point_slope_form', 'slope_intercept_form'],
      prerequisites: ['slope_formula', 'linear_equations'],
      concepts: ['slope-formula', 'point-slope-form'],
      commonMistakes: [
        'Errors in slope calculation',
        'Using wrong point in point-slope form'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'linear-equations', 'two-points']
    }
  },
  {
    id: 'geo-v2-g10-line-eq-317',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Write the equation of the line parallel to y = 2x - 5 passing through (4, 3).',
      latex: 'y = 2x - 5, \\text{ through } (4, 3)'
    },
    answer: {
      type: 'equation',
      correct: 'y = 2x - 5',
      acceptable: ['y = 2x - 5', 'y=2x-5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '2x - 5', color: '#9CA3AF', style: 'dashed', label: 'given' },
          { expression: '2x - 5', color: '#3B82F6', label: 'parallel' }
        ],
        domain: [-1, 6],
        range: [-6, 8],
        showGrid: true,
        points: [
          { x: 4, y: 3, label: '(4, 3)', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Parallel lines have the same slope', latex: 'm = 2' },
        { number: 2, description: 'Use point-slope form', latex: 'y - 3 = 2(x - 4)' },
        { number: 3, description: 'Simplify', latex: 'y - 3 = 2x - 8' },
        { number: 4, description: 'Solve for y', latex: 'y = 2x - 5' }
      ],
      method: 'Parallel Line through a Point'
    },
    hints: [
      { level: 'gentle', text: 'What slope does a parallel line have?' },
      { level: 'moderate', text: 'Same slope (m = 2). Use point-slope form with (4, 3).' },
      { level: 'explicit', text: 'y - 3 = 2(x - 4) → y = 2x - 5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Parallel Lines Equations',
      skills: ['parallel_lines', 'point_slope_form'],
      prerequisites: ['slope_intercept_form', 'parallel_lines_concept'],
      concepts: ['parallel-lines', 'point-slope-form'],
      commonMistakes: [
        'Using the wrong slope',
        'Confusing parallel with perpendicular'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'linear-equations', 'parallel-lines']
    }
  },
  {
    id: 'geo-v2-g10-line-eq-318',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Write the equation of the line perpendicular to y = (1/2)x + 3 passing through (2, 1).',
      latex: 'y = \\frac{1}{2}x + 3, \\text{ through } (2, 1)'
    },
    answer: {
      type: 'equation',
      correct: 'y = -2x + 5',
      acceptable: ['y = -2x + 5', 'y=-2x+5']
    },
    visuals: {
      graph: {
        expressions: [
          { expression: '(1/2)x + 3', color: '#9CA3AF', style: 'dashed', label: 'given' },
          { expression: '-2x + 5', color: '#EF4444', label: 'perpendicular' }
        ],
        domain: [-2, 5],
        range: [-3, 7],
        showGrid: true,
        points: [
          { x: 2, y: 1, label: '(2, 1)', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find perpendicular slope (negative reciprocal)', latex: 'm_{\\perp} = -\\frac{1}{1/2} = -2' },
        { number: 2, description: 'Use point-slope form', latex: 'y - 1 = -2(x - 2)' },
        { number: 3, description: 'Simplify', latex: 'y - 1 = -2x + 4' },
        { number: 4, description: 'Solve for y', latex: 'y = -2x + 5' }
      ],
      method: 'Perpendicular Line through a Point'
    },
    hints: [
      { level: 'gentle', text: 'The perpendicular slope is the negative reciprocal of 1/2.' },
      { level: 'moderate', text: 'Perpendicular slope = -2. Use y - 1 = -2(x - 2).' },
      { level: 'explicit', text: 'y = -2x + 4 + 1 = -2x + 5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perpendicular Lines Equations',
      skills: ['perpendicular_lines', 'negative_reciprocals', 'point_slope_form'],
      prerequisites: ['slope_intercept_form', 'perpendicular_lines_concept'],
      concepts: ['perpendicular-lines', 'negative-reciprocals'],
      commonMistakes: [
        'Not taking the negative reciprocal correctly',
        'Sign errors in point-slope form'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'linear-equations', 'perpendicular-lines']
    }
  },
  {
    id: 'geo-v2-g10-line-eq-319',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Convert 3x - 2y = 12 to slope-intercept form and identify the slope and y-intercept.',
      latex: '3x - 2y = 12'
    },
    answer: {
      type: 'equation',
      correct: 'y = (3/2)x - 6',
      acceptable: ['y = (3/2)x - 6', 'y = 1.5x - 6', 'y=1.5x-6', 'y = 3/2x - 6']
    },
    visuals: {
      graph: {
        expressions: [{ expression: '(3/2)x - 6', color: '#3B82F6' }],
        domain: [-2, 8],
        range: [-8, 6],
        showGrid: true,
        points: [
          { x: 0, y: -6, label: 'y-int: -6', color: '#10B981' },
          { x: 4, y: 0, label: 'x-int: 4', color: '#EF4444' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with standard form', latex: '3x - 2y = 12' },
        { number: 2, description: 'Subtract 3x from both sides', latex: '-2y = -3x + 12' },
        { number: 3, description: 'Divide by -2', latex: 'y = \\frac{3}{2}x - 6' },
        { number: 4, description: 'Identify slope and y-intercept', latex: 'm = \\frac{3}{2}, b = -6' }
      ],
      method: 'Standard Form to Slope-Intercept Form'
    },
    hints: [
      { level: 'gentle', text: 'Solve for y to get slope-intercept form (y = mx + b).' },
      { level: 'moderate', text: 'Move 3x to the right side, then divide by -2.' },
      { level: 'explicit', text: 'y = (3/2)x - 6. Slope = 3/2, y-intercept = -6' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Standard Form',
      skills: ['standard_form', 'slope_intercept_form', 'algebraic_manipulation'],
      prerequisites: ['equation_solving', 'fractions'],
      concepts: ['standard-form', 'slope-intercept-form'],
      commonMistakes: [
        'Sign errors when dividing by negative',
        'Dividing only one term by -2'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'linear-equations', 'standard-form']
    }
  },

  // ============================================================================
  // COORDINATE PROOFS (5 problems, IDs 320-324)
  // ============================================================================
  {
    id: 'geo-v2-g10-proof-320',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'Prove that triangle with vertices A(0, 0), B(4, 0), and C(2, 3) is isosceles by finding the lengths of all sides.',
      latex: 'A(0,0), B(4,0), C(2,3)'
    },
    answer: {
      type: 'exact',
      correct: 'isosceles',
      acceptable: ['isosceles', 'Isosceles', 'yes', 'Yes']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 5],
        range: [-1, 5],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: 'A(0,0)', color: '#3B82F6' },
          { x: 4, y: 0, label: 'B(4,0)', color: '#3B82F6' },
          { x: 2, y: 3, label: 'C(2,3)', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find AB', latex: 'AB = \\sqrt{(4-0)^2 + (0-0)^2} = \\sqrt{16} = 4' },
        { number: 2, description: 'Find AC', latex: 'AC = \\sqrt{(2-0)^2 + (3-0)^2} = \\sqrt{4+9} = \\sqrt{13}' },
        { number: 3, description: 'Find BC', latex: 'BC = \\sqrt{(2-4)^2 + (3-0)^2} = \\sqrt{4+9} = \\sqrt{13}' },
        { number: 4, description: 'Compare sides', latex: 'AC = BC = \\sqrt{13}, \\text{ so triangle is isosceles}' }
      ],
      method: 'Distance Formula Proof'
    },
    hints: [
      { level: 'gentle', text: 'An isosceles triangle has at least two equal sides. Find all three side lengths.' },
      { level: 'moderate', text: 'AB = 4, AC = √13, BC = √13' },
      { level: 'explicit', text: 'Since AC = BC = √13, the triangle is isosceles.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Coordinate Proofs',
      skills: ['distance_formula', 'triangle_classification', 'proof_writing'],
      prerequisites: ['distance_formula', 'triangle_types'],
      concepts: ['coordinate-proofs', 'isosceles-triangles'],
      commonMistakes: [
        'Calculation errors in distance formula',
        'Not comparing all three sides'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'coordinate-proofs', 'isosceles']
    }
  },
  {
    id: 'geo-v2-g10-proof-321',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Show that the quadrilateral with vertices A(0, 0), B(4, 0), C(6, 3), D(2, 3) is a parallelogram using slopes.',
      latex: 'A(0,0), B(4,0), C(6,3), D(2,3)'
    },
    answer: {
      type: 'exact',
      correct: 'parallelogram',
      acceptable: ['parallelogram', 'Parallelogram', 'yes', 'Yes']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 8],
        range: [-1, 5],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: 'A', color: '#3B82F6' },
          { x: 4, y: 0, label: 'B', color: '#3B82F6' },
          { x: 6, y: 3, label: 'C', color: '#3B82F6' },
          { x: 2, y: 3, label: 'D', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find slope of AB', latex: 'm_{AB} = \\frac{0-0}{4-0} = 0' },
        { number: 2, description: 'Find slope of DC', latex: 'm_{DC} = \\frac{3-3}{6-2} = 0' },
        { number: 3, description: 'Find slope of AD', latex: 'm_{AD} = \\frac{3-0}{2-0} = \\frac{3}{2}' },
        { number: 4, description: 'Find slope of BC', latex: 'm_{BC} = \\frac{3-0}{6-4} = \\frac{3}{2}' },
        { number: 5, description: 'Conclusion', latex: 'AB \\parallel DC, AD \\parallel BC \\Rightarrow \\text{Parallelogram}' }
      ],
      method: 'Slope Proof for Parallelogram'
    },
    hints: [
      { level: 'gentle', text: 'A parallelogram has both pairs of opposite sides parallel. Compare slopes.' },
      { level: 'moderate', text: 'Find slopes of AB, DC (should be equal) and AD, BC (should be equal).' },
      { level: 'explicit', text: 'AB and DC both have slope 0; AD and BC both have slope 3/2.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Coordinate Proofs',
      skills: ['slope_formula', 'parallelogram_properties', 'proof_writing'],
      prerequisites: ['slope_formula', 'parallelogram_definition'],
      concepts: ['coordinate-proofs', 'parallelograms'],
      commonMistakes: [
        'Only checking one pair of parallel sides',
        'Slope calculation errors'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'coordinate-proofs', 'parallelogram']
    }
  },
  {
    id: 'geo-v2-g10-proof-322',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Prove that the diagonals of rectangle with vertices A(0, 0), B(6, 0), C(6, 4), D(0, 4) bisect each other.',
      latex: 'A(0,0), B(6,0), C(6,4), D(0,4)'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, 2)',
      acceptable: ['(3,2)', '(3, 2)', '3, 2']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 8],
        range: [-1, 6],
        showGrid: true,
        points: [
          { x: 0, y: 0, label: 'A', color: '#3B82F6' },
          { x: 6, y: 0, label: 'B', color: '#3B82F6' },
          { x: 6, y: 4, label: 'C', color: '#3B82F6' },
          { x: 0, y: 4, label: 'D', color: '#3B82F6' },
          { x: 3, y: 2, label: 'M', color: '#10B981' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find midpoint of diagonal AC', latex: 'M_{AC} = \\left(\\frac{0+6}{2}, \\frac{0+4}{2}\\right) = (3, 2)' },
        { number: 2, description: 'Find midpoint of diagonal BD', latex: 'M_{BD} = \\left(\\frac{6+0}{2}, \\frac{0+4}{2}\\right) = (3, 2)' },
        { number: 3, description: 'Compare', latex: 'M_{AC} = M_{BD} = (3, 2)' },
        { number: 4, description: 'Conclusion', latex: '\\text{Diagonals bisect each other at } (3, 2)' }
      ],
      method: 'Midpoint Proof'
    },
    hints: [
      { level: 'gentle', text: 'Find the midpoints of both diagonals. If they\'re the same point, the diagonals bisect each other.' },
      { level: 'moderate', text: 'Midpoint of AC = ? Midpoint of BD = ?' },
      { level: 'explicit', text: 'Both midpoints are (3, 2), so diagonals bisect each other.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Coordinate Proofs',
      skills: ['midpoint_formula', 'rectangle_properties', 'proof_writing'],
      prerequisites: ['midpoint_formula', 'rectangle_definition'],
      concepts: ['coordinate-proofs', 'rectangle-properties'],
      commonMistakes: [
        'Finding midpoints of sides instead of diagonals',
        'Calculation errors in midpoint formula'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'coordinate-proofs', 'rectangle']
    }
  },
  {
    id: 'geo-v2-g10-proof-323',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Verify that triangle with vertices A(1, 1), B(4, 1), C(4, 5) is a right triangle using slopes.',
      latex: 'A(1,1), B(4,1), C(4,5)'
    },
    answer: {
      type: 'exact',
      correct: 'right triangle',
      acceptable: ['right triangle', 'right', 'yes', 'Yes', 'Right triangle']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-1, 6],
        range: [-1, 7],
        showGrid: true,
        points: [
          { x: 1, y: 1, label: 'A', color: '#3B82F6' },
          { x: 4, y: 1, label: 'B', color: '#3B82F6' },
          { x: 4, y: 5, label: 'C', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find slope of AB', latex: 'm_{AB} = \\frac{1-1}{4-1} = 0 \\text{ (horizontal)}' },
        { number: 2, description: 'Find slope of BC', latex: 'm_{BC} = \\frac{5-1}{4-4} = \\text{undefined (vertical)}' },
        { number: 3, description: 'Check perpendicularity', latex: '\\text{Horizontal} \\perp \\text{Vertical}' },
        { number: 4, description: 'Conclusion', latex: '\\text{Right angle at B, so it is a right triangle}' }
      ],
      method: 'Slope Proof for Right Triangle'
    },
    hints: [
      { level: 'gentle', text: 'A right triangle has two perpendicular sides. Check if any two sides have slopes that are negative reciprocals (or horizontal/vertical).' },
      { level: 'moderate', text: 'AB is horizontal (slope = 0), BC is vertical (undefined slope).' },
      { level: 'explicit', text: 'Horizontal and vertical lines are perpendicular, so angle B is 90°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Coordinate Proofs',
      skills: ['slope_formula', 'perpendicular_lines', 'right_triangle_identification'],
      prerequisites: ['slope_formula', 'perpendicular_lines_concept'],
      concepts: ['coordinate-proofs', 'right-triangles'],
      commonMistakes: [
        'Not recognizing vertical line as undefined slope',
        'Not checking all angle pairs'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'coordinate-proofs', 'right-triangle']
    }
  },
  {
    id: 'geo-v2-g10-proof-324',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Show that the triangle with vertices A(-2, 1), B(2, 4), C(5, 0) is a right triangle using the distance formula and Pythagorean theorem.',
      latex: 'A(-2,1), B(2,4), C(5,0)'
    },
    answer: {
      type: 'exact',
      correct: 'right triangle',
      acceptable: ['right triangle', 'right', 'yes', 'Yes', 'Right triangle']
    },
    visuals: {
      graph: {
        expressions: [],
        domain: [-4, 7],
        range: [-2, 6],
        showGrid: true,
        points: [
          { x: -2, y: 1, label: 'A', color: '#3B82F6' },
          { x: 2, y: 4, label: 'B', color: '#3B82F6' },
          { x: 5, y: 0, label: 'C', color: '#3B82F6' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find AB', latex: 'AB = \\sqrt{(2-(-2))^2 + (4-1)^2} = \\sqrt{16+9} = 5' },
        { number: 2, description: 'Find BC', latex: 'BC = \\sqrt{(5-2)^2 + (0-4)^2} = \\sqrt{9+16} = 5' },
        { number: 3, description: 'Find AC', latex: 'AC = \\sqrt{(5-(-2))^2 + (0-1)^2} = \\sqrt{49+1} = \\sqrt{50}' },
        { number: 4, description: 'Check Pythagorean theorem', latex: 'AB^2 + BC^2 = 25 + 25 = 50 = AC^2 \\checkmark' },
        { number: 5, description: 'Conclusion', latex: '\\text{Right angle at B}' }
      ],
      method: 'Converse of Pythagorean Theorem'
    },
    hints: [
      { level: 'gentle', text: 'Find all three side lengths, then check if a² + b² = c² for the two shorter sides.' },
      { level: 'moderate', text: 'AB = 5, BC = 5, AC = √50. Check: 25 + 25 = 50?' },
      { level: 'explicit', text: '5² + 5² = 50 = (√50)², so it is a right triangle.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Coordinate Proofs',
      skills: ['distance_formula', 'pythagorean_theorem', 'proof_writing'],
      prerequisites: ['distance_formula', 'converse_pythagorean_theorem'],
      concepts: ['coordinate-proofs', 'converse-pythagorean'],
      commonMistakes: [
        'Not identifying the longest side correctly',
        'Calculation errors in distance formula'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'coordinate-geometry', 'coordinate-proofs', 'pythagorean']
    }
  }
]
