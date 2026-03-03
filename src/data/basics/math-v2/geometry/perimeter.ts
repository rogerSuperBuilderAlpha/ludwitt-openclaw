/**
 * Geometry V2 - Perimeter Problems
 * 
 * Covers: Perimeter and circumference of various shapes
 * Grade levels: 5-7
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const PERIMETER_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // BASIC PERIMETER - Squares and Triangles (G5)
  // ============================================================================
  {
    id: 'geom-v2-g5-perim-001',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Find the perimeter of a square with side length 6 cm.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '24',
      acceptable: ['24 cm', '24cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A square with all four sides labeled as 6 cm',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 50, width: 140, height: 140, stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 120, y: 210, text: '6 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 205, y: 120, text: '6 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 40, text: '6 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 30, y: 120, text: '6 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 120, text: 'P = 4 × 6', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 120, y: 250, text: 'Perimeter = 24 cm', fontSize: 13, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall that a square has 4 equal sides', latex: '\\text{Square: 4 equal sides}' },
        { number: 2, description: 'Apply the perimeter formula', latex: 'P = 4s' },
        { number: 3, description: 'Substitute the side length', latex: 'P = 4 \\times 6' },
        { number: 4, description: 'Calculate the result', latex: 'P = 24 \\text{ cm}' }
      ],
      method: 'Square perimeter formula'
    },
    hints: [
      { level: 'gentle', text: 'A square has 4 equal sides. Add them all or multiply by 4.' },
      { level: 'moderate', text: 'P = 4 × side = 4 × 6' },
      { level: 'explicit', text: '4 × 6 = 24 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Squares',
      skills: ['perimeter-calculation', 'multiplication'],
      prerequisites: ['addition', 'multiplication'],
      concepts: ['perimeter', 'equal-sides'],
      commonMistakes: ['Confusing with area (squaring instead of multiplying by 4)'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'squares']
    }
  },
  {
    id: 'geom-v2-g5-perim-002',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Find the perimeter of an equilateral triangle with side length 7 cm.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '21',
      acceptable: ['21 cm', '21cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'An equilateral triangle with all three sides labeled as 7 cm',
        elements: [
          { type: 'polygon', props: { points: '130,40 230,200 30,200', stroke: '#d97706', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 70, y: 130, text: '7 cm', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 185, y: 130, text: '7 cm', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 220, text: '7 cm', fontSize: 14, fill: '#b45309', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 140, text: 'P = 3 × 7', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 250, text: 'Perimeter = 21 cm', fontSize: 13, fill: '#b45309', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize equilateral means all 3 sides equal', latex: '\\text{Equilateral: 3 equal sides}' },
        { number: 2, description: 'Apply the perimeter formula', latex: 'P = 3s' },
        { number: 3, description: 'Substitute the side length', latex: 'P = 3 \\times 7' },
        { number: 4, description: 'Calculate the result', latex: 'P = 21 \\text{ cm}' }
      ],
      method: 'Equilateral triangle perimeter'
    },
    hints: [
      { level: 'gentle', text: 'Equilateral means all 3 sides are equal.' },
      { level: 'moderate', text: 'P = 3 × side = 3 × 7' },
      { level: 'explicit', text: '3 × 7 = 21 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Triangles',
      skills: ['perimeter-calculation', 'multiplication'],
      prerequisites: ['multiplication', 'triangle-types'],
      concepts: ['perimeter', 'equilateral'],
      commonMistakes: ['Adding only 2 sides', 'Confusing with isosceles'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'triangles', 'equilateral']
    }
  },
  // ============================================================================
  // RECTANGLES AND POLYGONS (G6)
  // ============================================================================
  {
    id: 'geom-v2-g6-perim-003',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A rectangle has length 10 m and width 4 m. Find its perimeter.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '28',
      acceptable: ['28 m', '28m'],
      unit: 'm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 200,
        description: 'A rectangle with length 10 m and width 4 m labeled on opposite sides',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 50, width: 220, height: 90, stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 160, text: '10 m', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 275, y: 100, text: '4 m', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 40, text: '10 m', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 25, y: 100, text: '4 m', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 100, text: 'P = 2(l + w)', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 190, text: 'P = 2(10 + 4) = 28 m', fontSize: 12, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the rectangle perimeter formula', latex: 'P = 2(l + w)' },
        { number: 2, description: 'Substitute length and width', latex: 'P = 2(10 + 4)' },
        { number: 3, description: 'Add inside the parentheses', latex: 'P = 2(14)' },
        { number: 4, description: 'Multiply by 2', latex: 'P = 28 \\text{ m}' }
      ],
      method: 'Rectangle perimeter formula'
    },
    hints: [
      { level: 'gentle', text: 'Perimeter = 2 × (length + width)' },
      { level: 'moderate', text: 'P = 2 × (10 + 4) = 2 × 14' },
      { level: 'explicit', text: '2 × 14 = 28 m' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Rectangles',
      skills: ['perimeter-calculation', 'order-of-operations'],
      prerequisites: ['addition', 'multiplication'],
      concepts: ['perimeter', 'opposite-sides-equal'],
      commonMistakes: ['Adding all four numbers separately', 'Forgetting to multiply by 2'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'rectangles']
    }
  },
  {
    id: 'geom-v2-g6-perim-004',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A triangle has sides 5 cm, 7 cm, and 9 cm. Find its perimeter.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '21',
      acceptable: ['21 cm', '21cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 220,
        description: 'A scalene triangle with sides labeled 5 cm, 7 cm, and 9 cm',
        elements: [
          { type: 'polygon', props: { points: '40,180 240,180 160,50', stroke: '#0369a1', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 60, y: 120, text: '5 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 210, y: 110, text: '7 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 200, text: '9 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 130, text: 'P = 5 + 7 + 9', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify all three sides', latex: 'a = 5, b = 7, c = 9' },
        { number: 2, description: 'Add all sides together', latex: 'P = a + b + c' },
        { number: 3, description: 'Substitute and calculate', latex: 'P = 5 + 7 + 9 = 21 \\text{ cm}' }
      ],
      method: 'Triangle perimeter by addition'
    },
    hints: [
      { level: 'gentle', text: 'Just add all three sides together.' },
      { level: 'moderate', text: 'P = 5 + 7 + 9' },
      { level: 'explicit', text: '5 + 7 + 9 = 21 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Triangles',
      skills: ['perimeter-calculation', 'addition'],
      prerequisites: ['addition'],
      concepts: ['perimeter', 'scalene-triangles'],
      commonMistakes: ['Missing a side', 'Using wrong values'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'triangles', 'scalene']
    }
  },
  {
    id: 'geom-v2-g6-perim-005',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A regular hexagon has side length 5 cm. Find its perimeter.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '30',
      acceptable: ['30 cm', '30cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A regular hexagon with all six sides labeled as 5 cm',
        elements: [
          { type: 'polygon', props: { points: '130,30 210,65 210,155 130,190 50,155 50,65', stroke: '#16a34a', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 175, y: 45, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 225, y: 110, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 180, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 80, y: 180, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 30, y: 110, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 80, y: 45, text: '5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 115, text: 'P = 6 × 5', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 240, text: 'Perimeter = 30 cm', fontSize: 13, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall hexagon has 6 sides', latex: 'n = 6' },
        { number: 2, description: 'Regular means all sides equal', latex: '\\text{All sides} = 5 \\text{ cm}' },
        { number: 3, description: 'Apply the formula', latex: 'P = 6s = 6 \\times 5' },
        { number: 4, description: 'Calculate the result', latex: 'P = 30 \\text{ cm}' }
      ],
      method: 'Regular polygon perimeter'
    },
    hints: [
      { level: 'gentle', text: 'A hexagon has 6 sides. Regular means all sides are equal.' },
      { level: 'moderate', text: 'P = number of sides × side length = 6 × 5' },
      { level: 'explicit', text: '6 × 5 = 30 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Regular Polygons',
      skills: ['perimeter-calculation', 'multiplication'],
      prerequisites: ['multiplication', 'polygon-properties'],
      concepts: ['perimeter', 'regular-polygons'],
      commonMistakes: ['Using wrong number of sides', 'Confusing with area'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'hexagons', 'regular-polygons']
    }
  },
  // ============================================================================
  // WORKING BACKWARDS (G6)
  // ============================================================================
  {
    id: 'geom-v2-g6-perim-006',
    version: 2,
    type: 'geometry',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'The perimeter of a square is 36 cm. What is the length of one side?',
      latex: 's = ?'
    },
    answer: {
      type: 'numeric',
      correct: '9',
      acceptable: ['9 cm', '9cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A square with perimeter marked as 36 cm and each side marked with "?"',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 50, width: 140, height: 140, stroke: '#d97706', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 120, y: 210, text: '? cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 205, y: 120, text: '? cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 120, text: 'P = 36 cm', fontSize: 14, fill: '#92400e', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 120, y: 250, text: 'Find each side length', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the perimeter formula', latex: 'P = 4s' },
        { number: 2, description: 'Substitute the perimeter', latex: '36 = 4s' },
        { number: 3, description: 'Divide both sides by 4', latex: 's = \\frac{36}{4}' },
        { number: 4, description: 'Calculate the result', latex: 's = 9 \\text{ cm}' }
      ],
      method: 'Reverse perimeter formula'
    },
    hints: [
      { level: 'gentle', text: 'If P = 4s, then s = P ÷ 4' },
      { level: 'moderate', text: 's = 36 ÷ 4' },
      { level: 'explicit', text: '36 ÷ 4 = 9 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards',
      skills: ['perimeter-calculation', 'division', 'algebraic-thinking'],
      prerequisites: ['perimeter-formulas', 'division'],
      concepts: ['inverse-operations'],
      commonMistakes: ['Multiplying instead of dividing'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'squares', 'working-backwards']
    }
  },
  {
    id: 'geom-v2-g6-perim-007',
    version: 2,
    type: 'geometry',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'The perimeter of a rectangle is 30 m. If the length is 9 m, what is the width?',
      latex: 'w = ?'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6 m', '6m'],
      unit: 'm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 200,
        description: 'A rectangle with perimeter 30 m, length 9 m labeled, and width marked with "?"',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 50, width: 200, height: 80, stroke: '#0369a1', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 150, text: '9 m', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 265, y: 95, text: '? m', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 95, text: 'P = 30 m', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 185, text: 'Find the width', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the perimeter formula', latex: 'P = 2(l + w)' },
        { number: 2, description: 'Substitute known values', latex: '30 = 2(9 + w)' },
        { number: 3, description: 'Divide both sides by 2', latex: '15 = 9 + w' },
        { number: 4, description: 'Subtract 9 from both sides', latex: 'w = 15 - 9 = 6 \\text{ m}' }
      ],
      method: 'Reverse rectangle perimeter'
    },
    hints: [
      { level: 'gentle', text: 'P = 2(l + w). First divide P by 2 to get (l + w).' },
      { level: 'moderate', text: 'l + w = 30 ÷ 2 = 15. Then w = 15 - 9' },
      { level: 'explicit', text: 'w = 15 - 9 = 6 m' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards with Rectangles',
      skills: ['perimeter-calculation', 'algebraic-thinking'],
      prerequisites: ['perimeter-formulas', 'two-step-equations'],
      concepts: ['inverse-operations', 'problem-solving'],
      commonMistakes: ['Forgetting to divide by 2 first'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', '2d', 'rectangles', 'working-backwards']
    }
  },
  // ============================================================================
  // CIRCUMFERENCE (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-perim-008',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the circumference of a circle with diameter 10 cm. Use π ≈ 3.14.',
      latex: 'C = ?'
    },
    answer: {
      type: 'numeric',
      correct: '31.4',
      acceptable: ['31.4 cm', '10π cm', '10π'],
      unit: 'cm',
      tolerance: 0.1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with diameter 10 cm drawn as a horizontal line through the center',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'line', props: { x1: 50, y1: 140, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 130, text: '10 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 155, text: '(diameter)', fontSize: 11, fill: '#dc2626', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 265, text: 'C = πd = π × 10 = 31.4 cm', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall circumference formula with diameter', latex: 'C = \\pi d' },
        { number: 2, description: 'Substitute the diameter', latex: 'C = \\pi \\times 10' },
        { number: 3, description: 'Calculate with π ≈ 3.14', latex: 'C = 3.14 \\times 10' },
        { number: 4, description: 'Compute the result', latex: 'C = 31.4 \\text{ cm}' }
      ],
      method: 'Circumference formula (diameter)'
    },
    hints: [
      { level: 'gentle', text: 'Circumference = π × diameter' },
      { level: 'moderate', text: 'C = π × d = 3.14 × 10' },
      { level: 'explicit', text: '3.14 × 10 = 31.4 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circumference',
      skills: ['circumference-calculation', 'using-pi'],
      prerequisites: ['circles', 'multiplication'],
      concepts: ['circumference', 'pi', 'diameter'],
      commonMistakes: ['Confusing diameter with radius', 'Using area formula'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', 'circumference', 'circles', 'pi']
    }
  },
  {
    id: 'geom-v2-g7-perim-009',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the circumference of a circle with radius 7 cm. Use π ≈ 3.14.',
      latex: 'C = ?'
    },
    answer: {
      type: 'numeric',
      correct: '43.96',
      acceptable: ['43.96 cm', '44 cm', '14π cm', '14π'],
      unit: 'cm',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with radius 7 cm marked from center to edge',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#16a34a', strokeWidth: 2.5, fill: 'none' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#15803d' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 185, y: 130, text: '7 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 185, y: 155, text: '(radius)', fontSize: 11, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 265, text: 'C = 2πr = 2 × π × 7 ≈ 43.96 cm', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall circumference formula with radius', latex: 'C = 2\\pi r' },
        { number: 2, description: 'Substitute the radius', latex: 'C = 2 \\times \\pi \\times 7' },
        { number: 3, description: 'Simplify', latex: 'C = 14\\pi' },
        { number: 4, description: 'Calculate with π ≈ 3.14', latex: 'C = 14 \\times 3.14 = 43.96 \\text{ cm}' }
      ],
      method: 'Circumference formula (radius)'
    },
    hints: [
      { level: 'gentle', text: 'Circumference = 2 × π × radius' },
      { level: 'moderate', text: 'C = 2 × 3.14 × 7 = 14 × 3.14' },
      { level: 'explicit', text: '14 × 3.14 = 43.96 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circumference',
      skills: ['circumference-calculation', 'using-pi'],
      prerequisites: ['circles', 'multiplication'],
      concepts: ['circumference', 'pi', 'radius'],
      commonMistakes: ['Forgetting to multiply by 2', 'Confusing with area formula'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', 'circumference', 'circles', 'pi']
    }
  },
  {
    id: 'geom-v2-g7-perim-010',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the perimeter of a semicircle with diameter 14 cm. Use π ≈ 3.14.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '35.98',
      acceptable: ['35.98 cm', '36 cm', '14 + 7π'],
      unit: 'cm',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 220,
        description: 'A semicircle with diameter 14 cm along the flat edge',
        elements: [
          { type: 'line', props: { x1: 50, y1: 150, x2: 250, y2: 150, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 50,150 A 100,100 0 0,1 250,150', stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 175, text: '14 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 90, text: 'Curved + Straight', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 205, text: 'P = (πd/2) + d = 21.98 + 14 ≈ 36 cm', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the parts: curved edge + straight edge', latex: 'P = \\text{(half circumference)} + \\text{diameter}' },
        { number: 2, description: 'Calculate half circumference', latex: '\\frac{\\pi d}{2} = \\frac{3.14 \\times 14}{2} = 21.98' },
        { number: 3, description: 'Add the diameter', latex: 'P = 21.98 + 14' },
        { number: 4, description: 'Calculate the result', latex: 'P = 35.98 \\text{ cm}' }
      ],
      method: 'Semicircle perimeter'
    },
    hints: [
      { level: 'gentle', text: 'Semicircle perimeter = half the circumference + the diameter (straight edge)' },
      { level: 'moderate', text: 'Half circumference = (π × 14)/2 = 21.98. Then add 14.' },
      { level: 'explicit', text: '21.98 + 14 = 35.98 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Semicircle Perimeter',
      skills: ['perimeter-calculation', 'composite-shapes'],
      prerequisites: ['circumference', 'fractions'],
      concepts: ['semicircle', 'composite-perimeter'],
      commonMistakes: ['Forgetting to add the diameter', 'Using full circumference'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', 'semicircles', 'composite', 'pi']
    }
  },
  {
    id: 'geom-v2-g7-perim-011',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A regular octagon has a perimeter of 48 cm. What is the length of each side?',
      latex: 's = ?'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6 cm', '6cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A regular octagon with perimeter labeled as 48 cm and each side marked with "?"',
        elements: [
          { type: 'polygon', props: { points: '95,30 165,30 205,70 205,140 165,180 95,180 55,140 55,70', stroke: '#d97706', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 130, y: 110, text: 'P = 48 cm', fontSize: 14, fill: '#92400e', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 20, text: '?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 220, y: 105, text: '?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 230, text: '8 sides, P = 48 → each side = ?', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall octagon has 8 sides', latex: 'n = 8' },
        { number: 2, description: 'Set up the equation', latex: 'P = 8s' },
        { number: 3, description: 'Substitute and solve', latex: '48 = 8s' },
        { number: 4, description: 'Divide both sides by 8', latex: 's = \\frac{48}{8} = 6 \\text{ cm}' }
      ],
      method: 'Reverse regular polygon perimeter'
    },
    hints: [
      { level: 'gentle', text: 'An octagon has 8 sides. If P = 8s, then s = P ÷ 8' },
      { level: 'moderate', text: 's = 48 ÷ 8' },
      { level: 'explicit', text: '48 ÷ 8 = 6 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards with Polygons',
      skills: ['perimeter-calculation', 'division'],
      prerequisites: ['polygon-properties', 'division'],
      concepts: ['inverse-operations', 'regular-polygons'],
      commonMistakes: ['Using wrong number of sides', 'Multiplying instead of dividing'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', 'octagons', 'regular-polygons', 'working-backwards']
    }
  },
  {
    id: 'geom-v2-g7-perim-012',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'An isosceles triangle has two equal sides of 8 cm each and a base of 6 cm. Find the perimeter.',
      latex: 'P = ?'
    },
    answer: {
      type: 'numeric',
      correct: '22',
      acceptable: ['22 cm', '22cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 240,
        description: 'An isosceles triangle with two equal sides of 8 cm and base of 6 cm',
        elements: [
          { type: 'polygon', props: { points: '130,40 210,180 50,180', stroke: '#0369a1', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 75, y: 115, text: '8 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 115, text: '8 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 200, text: '6 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'line', props: { x1: 80, y1: 95, x2: 85, y2: 105, stroke: '#0369a1', strokeWidth: 2 } },
          { type: 'line', props: { x1: 175, y1: 105, x2: 180, y2: 95, stroke: '#0369a1', strokeWidth: 2 } },
          { type: 'text', props: { x: 130, y: 130, text: 'P = 8 + 8 + 6', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify all three sides', latex: '\\text{Two equal sides} = 8, \\text{base} = 6' },
        { number: 2, description: 'Add all three sides', latex: 'P = 8 + 8 + 6' },
        { number: 3, description: 'Calculate the result', latex: 'P = 22 \\text{ cm}' }
      ],
      method: 'Isosceles triangle perimeter'
    },
    hints: [
      { level: 'gentle', text: 'Add all three sides: the two equal ones and the base.' },
      { level: 'moderate', text: 'P = 8 + 8 + 6' },
      { level: 'explicit', text: '8 + 8 + 6 = 22 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Perimeter of Isosceles Triangles',
      skills: ['perimeter-calculation', 'addition'],
      prerequisites: ['triangle-types', 'addition'],
      concepts: ['perimeter', 'isosceles'],
      commonMistakes: ['Only adding two sides', 'Confusing equal and base sides'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['perimeter', 'triangles', 'isosceles']
    }
  }
]
