/**
 * Geometry V2 - Area Problems
 * 
 * Covers: Area formulas for various 2D shapes
 * Grade levels: 5-8
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const AREA_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // BASIC AREA - Squares and Rectangles (G5)
  // ============================================================================
  {
    id: 'geom-v2-g5-area-001',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Find the area of a square with side length 5 cm.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '25',
      acceptable: ['25 cm²', '25 sq cm', '25 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A square with side length 5 cm and grid lines showing the 25 unit squares',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 40, width: 150, height: 150, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 70, y1: 40, x2: 70, y2: 190, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 100, y1: 40, x2: 100, y2: 190, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 130, y1: 40, x2: 130, y2: 190, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 160, y1: 40, x2: 160, y2: 190, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 70, x2: 190, y2: 70, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 100, x2: 190, y2: 100, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 130, x2: 190, y2: 130, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 160, x2: 190, y2: 160, stroke: '#93c5fd', strokeWidth: 1 } },
          { type: 'text', props: { x: 115, y: 215, text: '5 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 210, y: 115, text: '5 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 115, y: 120, text: 'A = 25 cm²', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 115, y: 250, text: '5 × 5 = 25 unit squares', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the area formula for a square', latex: 'A = s^2' },
        { number: 2, description: 'Substitute the side length', latex: 'A = 5^2' },
        { number: 3, description: 'Calculate the result', latex: 'A = 25 \\text{ cm}^2' }
      ],
      method: 'Area formula for square'
    },
    hints: [
      { level: 'gentle', text: 'Area of a square = side × side' },
      { level: 'moderate', text: 'A = s² = 5² means 5 × 5' },
      { level: 'explicit', text: '5 × 5 = 25 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Squares',
      skills: ['area-calculation', 'multiplication'],
      prerequisites: ['multiplication', 'squares'],
      concepts: ['area', 'square-units'],
      commonMistakes: ['Confusing area with perimeter', 'Forgetting to square'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'squares']
    }
  },
  {
    id: 'geom-v2-g5-area-002',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Find the area of a rectangle with length 8 cm and width 3 cm.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '24',
      acceptable: ['24 cm²', '24 sq cm', '24 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 200,
        description: 'A rectangle with length 8 cm and width 3 cm, showing the area in unit squares',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 50, width: 240, height: 90, stroke: '#0369a1', strokeWidth: 2.5, fill: '#e0f2fe' } },
          { type: 'line', props: { x1: 70, y1: 50, x2: 70, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 100, y1: 50, x2: 100, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 130, y1: 50, x2: 130, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 160, y1: 50, x2: 160, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 190, y1: 50, x2: 190, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 220, y1: 50, x2: 220, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 250, y1: 50, x2: 250, y2: 140, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 80, x2: 280, y2: 80, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'line', props: { x1: 40, y1: 110, x2: 280, y2: 110, stroke: '#7dd3fc', strokeWidth: 1 } },
          { type: 'text', props: { x: 160, y: 170, text: '8 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 295, y: 100, text: '3 cm', fontSize: 14, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 100, text: 'A = 24 cm²', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the area formula for a rectangle', latex: 'A = l \\times w' },
        { number: 2, description: 'Substitute the length and width', latex: 'A = 8 \\times 3' },
        { number: 3, description: 'Calculate the result', latex: 'A = 24 \\text{ cm}^2' }
      ],
      method: 'Area formula for rectangle'
    },
    hints: [
      { level: 'gentle', text: 'Area of a rectangle = length × width' },
      { level: 'moderate', text: 'A = l × w = 8 × 3' },
      { level: 'explicit', text: '8 × 3 = 24 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Rectangles',
      skills: ['area-calculation', 'multiplication'],
      prerequisites: ['multiplication', 'rectangles'],
      concepts: ['area', 'square-units'],
      commonMistakes: ['Confusing with perimeter (adding instead of multiplying)'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'rectangles']
    }
  },
  // ============================================================================
  // TRIANGLES (G6)
  // ============================================================================
  {
    id: 'geom-v2-g6-area-003',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the area of a triangle with base 10 cm and height 6 cm.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '30',
      acceptable: ['30 cm²', '30 sq cm', '30 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 220,
        description: 'A triangle with base 10 cm and height 6 cm, with height shown as dashed perpendicular line',
        elements: [
          { type: 'polygon', props: { points: '40,180 260,180 160,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 160, y1: 50, x2: 160, y2: 180, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '6,4' } },
          { type: 'rectangle', props: { x: 160, y: 162, width: 18, height: 18, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 175, text: '10 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 200, text: '(base)', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 115, text: '6 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 200, y: 130, text: '(height)', fontSize: 11, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 140, text: 'A = ½ × 10 × 6', fontSize: 12, fill: '#1e40af', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the area formula for a triangle', latex: 'A = \\frac{1}{2} \\times b \\times h' },
        { number: 2, description: 'Substitute base and height', latex: 'A = \\frac{1}{2} \\times 10 \\times 6' },
        { number: 3, description: 'Calculate step by step', latex: 'A = \\frac{1}{2} \\times 60 = 30' },
        { number: 4, description: 'Write final answer with units', latex: 'A = 30 \\text{ cm}^2' }
      ],
      method: 'Triangle area formula'
    },
    hints: [
      { level: 'gentle', text: 'Area of a triangle = ½ × base × height' },
      { level: 'moderate', text: 'A = ½ × 10 × 6. First multiply 10 × 6.' },
      { level: 'explicit', text: '½ × 60 = 30 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Triangles',
      skills: ['area-calculation', 'fraction-multiplication'],
      prerequisites: ['multiplication', 'fractions', 'triangles'],
      concepts: ['triangle-area', 'half-base-times-height'],
      commonMistakes: ['Forgetting to divide by 2', 'Using wrong height'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'triangles']
    }
  },
  {
    id: 'geom-v2-g6-area-004',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'The area of a rectangle is 48 cm². If the length is 8 cm, what is the width?',
      latex: 'w = ?'
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
        width: 320,
        height: 200,
        description: 'A rectangle with area 48 cm², length 8 cm, and unknown width marked with "?"',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 50, width: 200, height: 100, stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'text', props: { x: 140, y: 105, text: 'A = 48 cm²', fontSize: 16, fill: '#92400e', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 170, text: '8 cm', fontSize: 14, fill: '#92400e', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 260, y: 100, text: '? cm', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 190, text: 'Find the width', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the area formula', latex: 'A = l \\times w' },
        { number: 2, description: 'Substitute known values', latex: '48 = 8 \\times w' },
        { number: 3, description: 'Solve for width by dividing', latex: 'w = \\frac{48}{8}' },
        { number: 4, description: 'Calculate the result', latex: 'w = 6 \\text{ cm}' }
      ],
      method: 'Reverse area formula'
    },
    hints: [
      { level: 'gentle', text: 'If Area = length × width, then width = Area ÷ length' },
      { level: 'moderate', text: 'w = 48 ÷ 8' },
      { level: 'explicit', text: '48 ÷ 8 = 6 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards with Area',
      skills: ['area-calculation', 'division', 'algebraic-thinking'],
      prerequisites: ['area-formulas', 'division'],
      concepts: ['inverse-operations', 'problem-solving'],
      commonMistakes: ['Multiplying instead of dividing', 'Using wrong operation'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'rectangles', 'working-backwards']
    }
  },
  {
    id: 'geom-v2-g6-area-005',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Find the area of a parallelogram with base 12 cm and height 5 cm.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60 cm²', '60 sq cm', '60 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 200,
        description: 'A parallelogram with base 12 cm and perpendicular height 5 cm shown with dashed line',
        elements: [
          { type: 'polygon', props: { points: '50,150 250,150 290,50 90,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 90, y1: 50, x2: 90, y2: 150, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '6,4' } },
          { type: 'rectangle', props: { x: 90, y: 132, width: 18, height: 18, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 175, text: '12 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 65, y: 100, text: '5 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 180, y: 110, text: 'A = b × h', fontSize: 13, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 130, text: '= 12 × 5 = 60 cm²', fontSize: 12, fill: '#1e40af', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the area formula for a parallelogram', latex: 'A = b \\times h' },
        { number: 2, description: 'Note: height must be perpendicular to base', latex: 'h \\perp b' },
        { number: 3, description: 'Substitute values', latex: 'A = 12 \\times 5' },
        { number: 4, description: 'Calculate the result', latex: 'A = 60 \\text{ cm}^2' }
      ],
      method: 'Parallelogram area formula'
    },
    hints: [
      { level: 'gentle', text: 'Area of a parallelogram = base × height (same as rectangle!)' },
      { level: 'moderate', text: 'The height must be perpendicular to the base, not the slanted side.' },
      { level: 'explicit', text: 'A = 12 × 5 = 60 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Parallelograms',
      skills: ['area-calculation', 'multiplication'],
      prerequisites: ['rectangle-area', 'parallelograms'],
      concepts: ['parallelogram-area', 'perpendicular-height'],
      commonMistakes: ['Using the slanted side instead of height'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'parallelograms']
    }
  },
  // ============================================================================
  // CIRCLES AND ADVANCED SHAPES (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-area-006',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the area of a circle with radius 5 cm. Use π ≈ 3.14.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '78.5',
      acceptable: ['78.5 cm²', '25π cm²', '25π', '78.5 sq cm'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with radius 5 cm clearly marked from center to edge',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 240, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 190, y: 130, text: '5 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 150, text: 'r', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 185, text: 'A = πr²', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 265, text: 'A = π × 5² = 25π ≈ 78.5 cm²', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the area formula for a circle', latex: 'A = \\pi r^2' },
        { number: 2, description: 'Substitute the radius', latex: 'A = \\pi \\times 5^2' },
        { number: 3, description: 'Square the radius', latex: 'A = \\pi \\times 25 = 25\\pi' },
        { number: 4, description: 'Calculate with π ≈ 3.14', latex: 'A = 3.14 \\times 25 = 78.5 \\text{ cm}^2' }
      ],
      method: 'Circle area formula'
    },
    hints: [
      { level: 'gentle', text: 'Area of a circle = π × r²' },
      { level: 'moderate', text: 'First square the radius: 5² = 25. Then multiply by π.' },
      { level: 'explicit', text: 'A = 3.14 × 25 = 78.5 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Circles',
      skills: ['area-calculation', 'using-pi', 'squaring'],
      prerequisites: ['circles', 'radius', 'exponents'],
      concepts: ['circle-area', 'pi'],
      commonMistakes: ['Using diameter instead of radius', 'Forgetting to square r'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'circles', 'pi']
    }
  },
  {
    id: 'geom-v2-g7-area-007',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the area of a trapezoid with parallel sides 8 cm and 12 cm, and height 5 cm.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '50',
      acceptable: ['50 cm²', '50 sq cm', '50 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 220,
        description: 'A trapezoid with parallel sides 8 cm (top) and 12 cm (bottom), height 5 cm',
        elements: [
          { type: 'polygon', props: { points: '90,50 210,50 260,160 40,160', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 120, y1: 50, x2: 120, y2: 160, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '6,4' } },
          { type: 'rectangle', props: { x: 120, y: 142, width: 18, height: 18, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 40, text: '8 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 185, text: '12 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 95, y: 105, text: '5 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 105, text: 'A = ½(b₁ + b₂)h', fontSize: 12, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 160, y: 210, text: 'A = ½(8 + 12) × 5 = 50 cm²', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the trapezoid area formula', latex: 'A = \\frac{1}{2}(b_1 + b_2) \\times h' },
        { number: 2, description: 'Substitute the values', latex: 'A = \\frac{1}{2}(8 + 12) \\times 5' },
        { number: 3, description: 'Add the parallel sides', latex: 'A = \\frac{1}{2}(20) \\times 5' },
        { number: 4, description: 'Calculate step by step', latex: 'A = 10 \\times 5 = 50 \\text{ cm}^2' }
      ],
      method: 'Trapezoid area formula'
    },
    hints: [
      { level: 'gentle', text: 'Area of trapezoid = ½ × (sum of parallel sides) × height' },
      { level: 'moderate', text: 'A = ½ × (8 + 12) × 5 = ½ × 20 × 5' },
      { level: 'explicit', text: '½ × 20 = 10, then 10 × 5 = 50 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Trapezoids',
      skills: ['area-calculation', 'multi-step-calculation'],
      prerequisites: ['parallelograms', 'fractions'],
      concepts: ['trapezoid-area', 'parallel-sides'],
      commonMistakes: ['Forgetting to add both bases', 'Forgetting to divide by 2'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'trapezoids']
    }
  },
  {
    id: 'geom-v2-g7-area-008',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'The area of a circle is 64π cm². What is the radius?',
      latex: 'r = ?'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8 cm', '8cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with area 64π cm² and unknown radius marked with "?"',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#92400e' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 240, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 190, y: 130, text: '? cm', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 155, text: 'A = 64π cm²', fontSize: 14, fill: '#92400e', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 265, text: 'If A = πr², find r', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the area formula', latex: 'A = \\pi r^2' },
        { number: 2, description: 'Substitute the area', latex: '64\\pi = \\pi r^2' },
        { number: 3, description: 'Divide both sides by π', latex: '64 = r^2' },
        { number: 4, description: 'Take the square root', latex: 'r = \\sqrt{64} = 8 \\text{ cm}' }
      ],
      method: 'Reverse circle area formula'
    },
    hints: [
      { level: 'gentle', text: 'If A = πr², then r² = A ÷ π' },
      { level: 'moderate', text: 'r² = 64π ÷ π = 64. What\'s √64?' },
      { level: 'explicit', text: '√64 = 8 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards with Circles',
      skills: ['area-calculation', 'square-roots', 'algebraic-thinking'],
      prerequisites: ['circle-area', 'square-roots'],
      concepts: ['inverse-operations', 'solving-for-radius'],
      commonMistakes: ['Forgetting to take square root', 'Dividing by 2 instead of taking root'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'circles', 'working-backwards']
    }
  },
  // ============================================================================
  // COMPOSITE SHAPES AND ADVANCED (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-area-009',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A room is 12 feet by 15 feet. How many square feet of carpet is needed to cover the floor?',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '180',
      acceptable: ['180 sq ft', '180 square feet', '180 ft²'],
      unit: 'sq ft'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 340,
        height: 240,
        description: 'A rectangular room floor plan with dimensions 12 ft × 15 ft',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 40, width: 250, height: 160, stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'text', props: { x: 165, y: 220, text: '15 feet', fontSize: 14, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 310, y: 120, text: '12 feet', fontSize: 14, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 165, y: 120, text: 'ROOM', fontSize: 18, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 165, y: 145, text: 'Area = ?', fontSize: 14, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the shape as a rectangle', latex: '\\text{Room is rectangular}' },
        { number: 2, description: 'Apply the area formula', latex: 'A = l \\times w' },
        { number: 3, description: 'Substitute dimensions', latex: 'A = 12 \\times 15' },
        { number: 4, description: 'Calculate the result', latex: 'A = 180 \\text{ ft}^2' }
      ],
      method: 'Real-world rectangle area'
    },
    hints: [
      { level: 'gentle', text: 'The room is a rectangle. What\'s the formula for rectangle area?' },
      { level: 'moderate', text: 'Area = length × width = 12 × 15' },
      { level: 'explicit', text: '12 × 15 = 180 square feet' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Real-World Area Applications',
      skills: ['area-calculation', 'problem-solving'],
      prerequisites: ['rectangle-area'],
      concepts: ['practical-applications', 'measurement'],
      commonMistakes: ['Adding instead of multiplying', 'Wrong units'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'real-world', 'rectangles']
    }
  },
  {
    id: 'geom-v2-g8-area-010',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the shaded area: A rectangle 10 cm × 8 cm has a circle with radius 3 cm cut out from the center. Use π ≈ 3.14.',
      latex: 'A_{\\text{shaded}} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '51.74',
      acceptable: ['51.74 cm²', '51.7 cm²', '80 - 9π'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 260,
        description: 'A rectangle with a circular hole in the center, showing the shaded area around the hole',
        elements: [
          { type: 'rectangle', props: { x: 60, y: 60, width: 200, height: 160, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 160, cy: 140, r: 50, stroke: '#dc2626', strokeWidth: 2, fill: '#ffffff' } },
          { type: 'line', props: { x1: 160, y1: 140, x2: 210, y2: 140, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '4,3' } },
          { type: 'text', props: { x: 185, y: 132, text: '3 cm', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 240, text: '10 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 280, y: 140, text: '8 cm', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 145, text: 'CUT OUT', fontSize: 10, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 100, y: 95, text: 'SHADED', fontSize: 10, fill: '#1e40af', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find rectangle area', latex: 'A_{\\text{rect}} = 10 \\times 8 = 80 \\text{ cm}^2' },
        { number: 2, description: 'Find circle area', latex: 'A_{\\text{circle}} = \\pi r^2 = \\pi \\times 9 = 9\\pi' },
        { number: 3, description: 'Calculate circle area numerically', latex: 'A_{\\text{circle}} \\approx 3.14 \\times 9 = 28.26 \\text{ cm}^2' },
        { number: 4, description: 'Subtract to find shaded area', latex: 'A_{\\text{shaded}} = 80 - 28.26 = 51.74 \\text{ cm}^2' }
      ],
      method: 'Composite area (subtraction)'
    },
    hints: [
      { level: 'gentle', text: 'Shaded area = Rectangle area - Circle area' },
      { level: 'moderate', text: 'Rectangle: 10×8 = 80. Circle: π×3² = 9π ≈ 28.26' },
      { level: 'explicit', text: '80 - 28.26 = 51.74 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Composite Shapes',
      skills: ['area-calculation', 'subtraction', 'multi-shape'],
      prerequisites: ['rectangle-area', 'circle-area'],
      concepts: ['composite-area', 'area-subtraction'],
      commonMistakes: ['Adding instead of subtracting', 'Using diameter for radius'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 110
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'composite', 'circles', 'rectangles']
    }
  },
  {
    id: 'geom-v2-g8-area-011',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A square has a diagonal of 10 cm. Find its area.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '50',
      acceptable: ['50 cm²', '50 sq cm', '50 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A square with diagonal drawn and labeled as 10 cm',
        elements: [
          { type: 'rectangle', props: { x: 60, y: 60, width: 160, height: 160, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 60, y1: 60, x2: 220, y2: 220, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 160, y: 130, text: '10 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 110, y: 155, text: '(diagonal)', fontSize: 11, fill: '#dc2626', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 260, text: 'A = d²/2 = 100/2 = 50 cm²', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall formula for square area from diagonal', latex: 'A = \\frac{d^2}{2}' },
        { number: 2, description: 'Substitute the diagonal', latex: 'A = \\frac{10^2}{2}' },
        { number: 3, description: 'Square the diagonal', latex: 'A = \\frac{100}{2}' },
        { number: 4, description: 'Divide by 2', latex: 'A = 50 \\text{ cm}^2' }
      ],
      method: 'Square area from diagonal',
      alternativeMethods: ['Using Pythagorean theorem to find side first']
    },
    hints: [
      { level: 'gentle', text: 'There\'s a special formula: Area = diagonal²/2' },
      { level: 'moderate', text: 'A = d²/2 = 10²/2 = 100/2' },
      { level: 'explicit', text: '100/2 = 50 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Square Area from Diagonal',
      skills: ['area-calculation', 'formula-application'],
      prerequisites: ['square-area', 'pythagorean-theorem'],
      concepts: ['diagonal-relationships', 'derived-formulas'],
      commonMistakes: ['Using d² instead of d²/2', 'Confusing with side-based formula'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'squares', 'diagonals']
    }
  },
  {
    id: 'geom-v2-g8-area-012',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the area between two concentric circles with radii 5 cm and 3 cm (annulus). Use π ≈ 3.14.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '50.24',
      acceptable: ['50.24 cm²', '50.2 cm²', '16π cm²', '16π'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 300,
        description: 'Two concentric circles with the ring (annulus) between them shaded',
        elements: [
          { type: 'circle', props: { cx: 150, cy: 150, r: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 150, cy: 150, r: 60, stroke: '#dc2626', strokeWidth: 2, fill: '#ffffff' } },
          { type: 'line', props: { x1: 150, y1: 150, x2: 250, y2: 150, stroke: '#2563eb', strokeWidth: 1.5, strokeDasharray: '5,4' } },
          { type: 'line', props: { x1: 150, y1: 150, x2: 150, y2: 90, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '5,4' } },
          { type: 'text', props: { x: 200, y: 145, text: 'R = 5', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 155, y: 120, text: 'r = 3', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 110, y: 200, text: 'SHADED', fontSize: 10, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 285, text: 'A = π(R² - r²) = π(25 - 9) = 16π', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the annulus area formula', latex: 'A = \\pi(R^2 - r^2)' },
        { number: 2, description: 'Substitute the radii', latex: 'A = \\pi(5^2 - 3^2)' },
        { number: 3, description: 'Calculate the squares', latex: 'A = \\pi(25 - 9) = 16\\pi' },
        { number: 4, description: 'Calculate numerically', latex: 'A = 3.14 \\times 16 = 50.24 \\text{ cm}^2' }
      ],
      method: 'Annulus area formula'
    },
    hints: [
      { level: 'gentle', text: 'Annulus area = π(R² - r²) or (Big circle) - (Small circle)' },
      { level: 'moderate', text: 'A = π(25 - 9) = π × 16 = 16π' },
      { level: 'explicit', text: '3.14 × 16 = 50.24 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Area of Annulus',
      skills: ['area-calculation', 'subtraction', 'circle-formulas'],
      prerequisites: ['circle-area'],
      concepts: ['concentric-circles', 'area-subtraction'],
      commonMistakes: ['Subtracting radii instead of areas', 'Forgetting to square'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['area', '2d', 'circles', 'annulus', 'composite']
    }
  }
]
