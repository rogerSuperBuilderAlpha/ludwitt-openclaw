/**
 * Geometry V2 - Pythagorean Theorem Problems
 * 
 * Covers: Pythagorean theorem, finding hypotenuse, finding legs, applications
 * Grade levels: 8-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const PYTHAGOREAN_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // BASIC PYTHAGOREAN - FINDING HYPOTENUSE (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-pyth-001',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the hypotenuse of a right triangle with legs 3 and 4.',
      latex: 'c = ?'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', '5 units']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 250,
        description: 'Right triangle with legs 3 and 4, and unknown hypotenuse',
        elements: [
          { type: 'polygon', props: { points: '50,200 200,200 50,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'rectangle', props: { x: 50, y: 180, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 125, y: 220, text: '4', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 30, y: 125, text: '3', fontSize: 16, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 110, text: 'c = ?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 245, text: 'a² + b² = c²', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the Pythagorean theorem', latex: 'a^2 + b^2 = c^2' },
        { number: 2, description: 'Substitute the leg values', latex: '3^2 + 4^2 = c^2' },
        { number: 3, description: 'Calculate the squares', latex: '9 + 16 = c^2' },
        { number: 4, description: 'Add and take square root', latex: 'c^2 = 25 \\Rightarrow c = \\sqrt{25} = 5' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Use the Pythagorean theorem: a² + b² = c²' },
      { level: 'moderate', text: '3² + 4² = 9 + 16 = 25. Now find √25' },
      { level: 'explicit', text: '√25 = 5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Pythagorean Theorem',
      skills: ['theorem-application', 'square-roots'],
      prerequisites: ['squares', 'square-roots'],
      concepts: ['pythagorean-theorem', 'right-triangles'],
      commonMistakes: ['Adding instead of squaring', 'Forgetting to take square root'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'right-triangles', 'hypotenuse']
    }
  },
  {
    id: 'geom-v2-g8-pyth-002',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the hypotenuse of a right triangle with legs 6 and 8.',
      latex: 'c = ?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '10 units']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 240,
        description: 'Right triangle with legs 6 and 8 (a 6-8-10 triangle)',
        elements: [
          { type: 'polygon', props: { points: '40,190 240,190 240,50', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'rectangle', props: { x: 220, y: 170, width: 20, height: 20, stroke: '#16a34a', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 140, y: 210, text: '8', fontSize: 16, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 255, y: 120, text: '6', fontSize: 16, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 125, y: 110, text: 'c = ?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 235, text: '6-8-10 (scaled 3-4-5)', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the Pythagorean theorem', latex: 'a^2 + b^2 = c^2' },
        { number: 2, description: 'Substitute values', latex: '6^2 + 8^2 = c^2' },
        { number: 3, description: 'Calculate', latex: '36 + 64 = 100 = c^2' },
        { number: 4, description: 'Take square root', latex: 'c = \\sqrt{100} = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is a scaled version of the 3-4-5 triangle (×2)' },
      { level: 'moderate', text: '6² + 8² = 36 + 64 = 100' },
      { level: 'explicit', text: '√100 = 10' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Pythagorean Theorem',
      skills: ['theorem-application', 'square-roots'],
      prerequisites: ['squares', 'square-roots'],
      concepts: ['pythagorean-triples', 'scaling'],
      commonMistakes: ['Calculation errors', 'Forgetting to square first'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'right-triangles', 'pythagorean-triples']
    }
  },
  // ============================================================================
  // FINDING A LEG (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-pyth-003',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A right triangle has hypotenuse 13 and one leg 5. Find the other leg.',
      latex: 'b = ?'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 units']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 240,
        description: 'Right triangle with hypotenuse 13, one leg 5, and unknown leg',
        elements: [
          { type: 'polygon', props: { points: '40,190 240,190 240,30', stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'rectangle', props: { x: 220, y: 170, width: 20, height: 20, stroke: '#d97706', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 140, y: 210, text: 'b = ?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 255, y: 110, text: '5', fontSize: 16, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 100, text: '13', fontSize: 16, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 235, text: '5-12-13 Triangle', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with Pythagorean theorem', latex: 'a^2 + b^2 = c^2' },
        { number: 2, description: 'Substitute known values', latex: '5^2 + b^2 = 13^2' },
        { number: 3, description: 'Calculate the squares', latex: '25 + b^2 = 169' },
        { number: 4, description: 'Solve for b²', latex: 'b^2 = 169 - 25 = 144' },
        { number: 5, description: 'Take square root', latex: 'b = \\sqrt{144} = 12' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'To find a leg: b² = c² - a²' },
      { level: 'moderate', text: 'b² = 13² - 5² = 169 - 25 = 144' },
      { level: 'explicit', text: '√144 = 12' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Finding a Leg',
      skills: ['theorem-application', 'equation-solving'],
      prerequisites: ['pythagorean-theorem', 'square-roots'],
      concepts: ['finding-leg', 'pythagorean-triples'],
      commonMistakes: ['Adding instead of subtracting', 'Subtracting wrong values'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'right-triangles', 'finding-leg']
    }
  },
  // ============================================================================
  // VERIFYING RIGHT TRIANGLES (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-pyth-004',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Is a triangle with sides 7, 24, and 25 a right triangle?'
    },
    answer: {
      type: 'exact',
      correct: 'Yes',
      acceptable: ['yes', 'Yes', 'YES', 'true', 'True']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 220,
        description: 'A triangle with sides labeled 7, 24, and 25',
        elements: [
          { type: 'polygon', props: { points: '40,180 270,180 270,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'text', props: { x: 155, y: 200, text: '24', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 280, y: 115, text: '7', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 100, text: '25', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 270, y: 180, text: '?', fontSize: 18, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 155, y: 215, text: 'Check: 7² + 24² = 25² ?', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the converse of Pythagorean theorem', latex: '\\text{If } a^2 + b^2 = c^2, \\text{ it\'s a right triangle}' },
        { number: 2, description: 'The largest side (25) would be the hypotenuse', latex: 'c = 25' },
        { number: 3, description: 'Check: 7² + 24² = 25²?', latex: '49 + 576 = 625 \\checkmark' },
        { number: 4, description: 'Since equality holds, it is a right triangle', latex: '625 = 625 \\text{ } \\rightarrow \\text{ Yes!}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Check if a² + b² = c² (where c is the longest side)' },
      { level: 'moderate', text: '7² + 24² = 49 + 576 = 625. Is 25² = 625?' },
      { level: 'explicit', text: 'Yes! 7² + 24² = 49 + 576 = 625 = 25². It is a right triangle.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Converse of Pythagorean Theorem',
      skills: ['theorem-verification', 'logical-reasoning'],
      prerequisites: ['pythagorean-theorem', 'squares'],
      concepts: ['converse-pythagorean', 'verification'],
      commonMistakes: ['Not identifying the largest side as hypotenuse', 'Calculation errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'converse', 'verification']
    }
  },
  // ============================================================================
  // REAL-WORLD APPLICATIONS (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-pyth-005',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A ladder is 10 feet long and leans against a wall. The base is 6 feet from the wall. How high up the wall does it reach?',
      latex: 'h = ?'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8 feet', '8 ft', '8'],
      unit: 'feet'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A ladder leaning against a wall, forming a right triangle',
        elements: [
          { type: 'rectangle', props: { x: 200, y: 40, width: 20, height: 200, stroke: '#6b7280', strokeWidth: 2, fill: '#e5e7eb' } },
          { type: 'line', props: { x1: 50, y1: 240, x2: 200, y2: 60, stroke: '#d97706', strokeWidth: 4 } },
          { type: 'line', props: { x1: 50, y1: 240, x2: 200, y2: 240, stroke: '#374151', strokeWidth: 2 } },
          { type: 'line', props: { x1: 200, y1: 60, x2: 200, y2: 240, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'rectangle', props: { x: 185, y: 225, width: 15, height: 15, stroke: '#374151', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 125, y: 260, text: '6 ft', fontSize: 14, fill: '#374151', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 215, y: 150, text: 'h = ?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 105, y: 140, text: '10 ft', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 55, y: 45, text: '🪜', fontSize: 20 } },
          { type: 'text', props: { x: 140, y: 275, text: 'Ladder = hypotenuse', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the triangle', latex: '\\text{Ladder = hypotenuse (10), ground = leg (6), wall = leg (h)}' },
        { number: 2, description: 'Apply Pythagorean theorem', latex: '6^2 + h^2 = 10^2' },
        { number: 3, description: 'Calculate', latex: '36 + h^2 = 100' },
        { number: 4, description: 'Solve for h', latex: 'h^2 = 64 \\Rightarrow h = 8 \\text{ feet}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The ladder is the hypotenuse, the ground and wall are the legs.' },
      { level: 'moderate', text: 'h² = 10² - 6² = 100 - 36 = 64' },
      { level: 'explicit', text: '√64 = 8 feet' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Real-World Applications',
      skills: ['problem-solving', 'pythagorean-application'],
      prerequisites: ['pythagorean-theorem'],
      concepts: ['practical-applications', 'modeling'],
      commonMistakes: ['Confusing which side is the hypotenuse', 'Setting up wrong equation'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'real-world', 'ladders']
    }
  },
  {
    id: 'geom-v2-g8-pyth-006',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the diagonal of a rectangle with length 12 cm and width 5 cm.',
      latex: 'd = ?'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13 cm', '13'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 220,
        description: 'A rectangle with diagonal drawn, length 12 cm and width 5 cm',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 50, width: 200, height: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 50, y1: 150, x2: 250, y2: 50, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 150, y: 175, text: '12 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 270, y: 100, text: '5 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 170, y: 90, text: 'd = ?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 205, text: 'Diagonal creates a right triangle', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The diagonal forms a right triangle with the sides', latex: 'd^2 = l^2 + w^2' },
        { number: 2, description: 'Substitute the dimensions', latex: 'd^2 = 12^2 + 5^2' },
        { number: 3, description: 'Calculate', latex: 'd^2 = 144 + 25 = 169' },
        { number: 4, description: 'Take square root', latex: 'd = \\sqrt{169} = 13 \\text{ cm}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The diagonal forms the hypotenuse of a right triangle.' },
      { level: 'moderate', text: 'd² = 12² + 5² = 144 + 25 = 169' },
      { level: 'explicit', text: '√169 = 13 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Diagonals of Rectangles',
      skills: ['pythagorean-application', 'problem-solving'],
      prerequisites: ['pythagorean-theorem', 'rectangles'],
      concepts: ['diagonals', 'right-triangles'],
      commonMistakes: ['Using area formula', 'Adding instead of using Pythagorean'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'rectangles', 'diagonals']
    }
  },
  // ============================================================================
  // ADVANCED APPLICATIONS (G9)
  // ============================================================================
  {
    id: 'geom-v2-g9-pyth-007',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the length of the space diagonal of a rectangular box with dimensions 3 × 4 × 12.',
      latex: 'd = ?'
    },
    answer: {
      type: 'numeric',
      correct: '13',
      acceptable: ['13', '13 units']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 280,
        description: 'A 3D rectangular box with space diagonal shown',
        elements: [
          { type: 'polygon', props: { points: '60,200 180,200 220,160 100,160', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '180,200 220,160 220,60 180,100', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '100,160 220,160 220,60 100,60', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'line', props: { x1: 60, y1: 200, x2: 60, y2: 100, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 100, y2: 60, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 180, y2: 100, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 200, x2: 220, y2: 60, stroke: '#dc2626', strokeWidth: 3 } },
          { type: 'text', props: { x: 120, y: 220, text: '4', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 230, y: 115, text: '12', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 45, y: 150, text: '3', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 120, text: 'd = ?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'd² = l² + w² + h²', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the 3D space diagonal formula', latex: 'd = \\sqrt{l^2 + w^2 + h^2}' },
        { number: 2, description: 'Substitute dimensions', latex: 'd = \\sqrt{3^2 + 4^2 + 12^2}' },
        { number: 3, description: 'Calculate squares', latex: 'd = \\sqrt{9 + 16 + 144}' },
        { number: 4, description: 'Add and take root', latex: 'd = \\sqrt{169} = 13' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'For a 3D diagonal, use d² = l² + w² + h²' },
      { level: 'moderate', text: 'd² = 9 + 16 + 144 = 169' },
      { level: 'explicit', text: '√169 = 13' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: '3D Pythagorean Applications',
      skills: ['3d-geometry', 'extension-of-pythagorean'],
      prerequisites: ['pythagorean-theorem', '3d-shapes'],
      concepts: ['space-diagonals', '3d-extension'],
      commonMistakes: ['Only using two dimensions', 'Formula confusion'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', '3d', 'space-diagonal']
    }
  },
  {
    id: 'geom-v2-g9-pyth-008',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'In a 30-60-90 triangle, the shortest side is 5. Find the hypotenuse.',
      latex: 'c = ?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '10 units']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 260,
        description: 'A 30-60-90 triangle with the shortest side labeled 5',
        elements: [
          { type: 'polygon', props: { points: '40,200 260,200 260,50', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'rectangle', props: { x: 240, y: 180, width: 20, height: 20, stroke: '#16a34a', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 60, y: 190, text: '30°', fontSize: 14, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 245, y: 85, text: '60°', fontSize: 14, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 270, y: 130, text: '5', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 220, text: '5√3', fontSize: 14, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 135, y: 115, text: 'c = ?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 250, text: '30-60-90: x : x√3 : 2x', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall 30-60-90 side ratios', latex: '\\text{Sides: } x : x\\sqrt{3} : 2x' },
        { number: 2, description: 'The shortest side (opposite 30°) is x', latex: 'x = 5' },
        { number: 3, description: 'The hypotenuse is 2x', latex: 'c = 2x = 2 \\times 5 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'In a 30-60-90 triangle, the sides are in ratio x : x√3 : 2x' },
      { level: 'moderate', text: 'The shortest side is x = 5. The hypotenuse is 2x.' },
      { level: 'explicit', text: '2 × 5 = 10' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Special Right Triangles',
      skills: ['ratio-application', 'special-triangles'],
      prerequisites: ['30-60-90-basics', 'ratios'],
      concepts: ['30-60-90-triangle', 'side-ratios'],
      commonMistakes: ['Using wrong ratio', 'Confusing which side is x'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'special-triangles', '30-60-90']
    }
  },
  {
    id: 'geom-v2-g9-pyth-009',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'In a 45-45-90 triangle, the legs are 7 each. Find the hypotenuse. Express as a simplified radical.',
      latex: 'c = ?'
    },
    answer: {
      type: 'expression',
      correct: '7√2',
      acceptable: ['7√2', '7*sqrt(2)', '7root2', '7 root 2']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'A 45-45-90 triangle with legs of 7 each',
        elements: [
          { type: 'polygon', props: { points: '50,200 200,200 200,50', stroke: '#7c3aed', strokeWidth: 2.5, fill: '#ede9fe' } },
          { type: 'rectangle', props: { x: 180, y: 180, width: 20, height: 20, stroke: '#7c3aed', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 75, y: 190, text: '45°', fontSize: 14, fill: '#6d28d9', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 90, text: '45°', fontSize: 14, fill: '#6d28d9', fontWeight: 'bold' } },
          { type: 'text', props: { x: 125, y: 220, text: '7', fontSize: 16, fill: '#6d28d9', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 215, y: 130, text: '7', fontSize: 16, fill: '#6d28d9', fontWeight: 'bold' } },
          { type: 'text', props: { x: 110, y: 110, text: 'c = ?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 250, text: '45-45-90: x : x : x√2', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall 45-45-90 side ratios', latex: '\\text{Sides: } x : x : x\\sqrt{2}' },
        { number: 2, description: 'The legs are both x = 7', latex: 'x = 7' },
        { number: 3, description: 'The hypotenuse is x√2', latex: 'c = x\\sqrt{2} = 7\\sqrt{2}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'In a 45-45-90 triangle, the sides are in ratio x : x : x√2' },
      { level: 'moderate', text: 'Both legs are x = 7. The hypotenuse is x√2.' },
      { level: 'explicit', text: 'c = 7√2 ≈ 9.9' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Special Right Triangles',
      skills: ['ratio-application', 'radical-expressions'],
      prerequisites: ['45-45-90-basics', 'radicals'],
      concepts: ['45-45-90-triangle', 'side-ratios'],
      commonMistakes: ['Multiplying by 2 instead of √2', 'Simplifying incorrectly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'special-triangles', '45-45-90', 'radicals']
    }
  },
  {
    id: 'geom-v2-g9-pyth-010',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Two ships leave a port. One sails 8 km north, the other sails 15 km east. How far apart are they?',
      latex: 'd = ?'
    },
    answer: {
      type: 'numeric',
      correct: '17',
      acceptable: ['17 km', '17'],
      unit: 'km'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 280,
        description: 'Two ships departing from a port, forming a right triangle',
        elements: [
          { type: 'circle', props: { cx: 60, cy: 220, r: 8, fill: '#374151' } },
          { type: 'text', props: { x: 60, y: 245, text: 'Port', fontSize: 12, fill: '#374151', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'line', props: { x1: 60, y1: 220, x2: 60, y2: 60, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 60, y1: 220, x2: 240, y2: 220, stroke: '#16a34a', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 60, y1: 60, x2: 240, y2: 220, stroke: '#dc2626', strokeWidth: 2.5, strokeDasharray: '8,4' } },
          { type: 'text', props: { x: 40, y: 140, text: '8 km', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 40, y: 120, text: 'North', fontSize: 10, fill: '#1e40af' } },
          { type: 'text', props: { x: 150, y: 240, text: '15 km East', fontSize: 12, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 170, y: 130, text: 'd = ?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 60, y: 55, text: '⛵', fontSize: 20 } },
          { type: 'text', props: { x: 245, y: 220, text: '⛵', fontSize: 20 } },
          { type: 'rectangle', props: { x: 60, y: 200, width: 20, height: 20, stroke: '#374151', strokeWidth: 1.5, fill: 'none' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The paths form a right angle (N and E are perpendicular)', latex: '\\text{Right triangle formed}' },
        { number: 2, description: 'Apply Pythagorean theorem', latex: 'd^2 = 8^2 + 15^2' },
        { number: 3, description: 'Calculate', latex: 'd^2 = 64 + 225 = 289' },
        { number: 4, description: 'Take square root', latex: 'd = \\sqrt{289} = 17 \\text{ km}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'North and East are perpendicular, forming a right triangle.' },
      { level: 'moderate', text: 'd² = 8² + 15² = 64 + 225 = 289' },
      { level: 'explicit', text: '√289 = 17 km' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Real-World Navigation',
      skills: ['pythagorean-application', 'problem-modeling'],
      prerequisites: ['pythagorean-theorem', 'directions'],
      concepts: ['distance-problems', 'navigation'],
      commonMistakes: ['Adding instead of using Pythagorean', 'Not recognizing right angle'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['pythagorean', 'real-world', 'navigation', 'distance']
    }
  }
]
