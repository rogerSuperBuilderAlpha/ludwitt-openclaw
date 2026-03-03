/**
 * Geometry V2 - Triangle Problems
 * 
 * Covers: Triangle angle sums, types, exterior angles, special triangles
 * Grade levels: 6-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const TRIANGLES_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // TRIANGLE ANGLE SUM (G6-7)
  // ============================================================================
  {
    id: 'geom-v2-g6-tri-001',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A triangle has angles of 45° and 65°. What is the third angle?',
      latex: '\\theta_3 = ?'
    },
    answer: {
      type: 'numeric',
      correct: '70',
      acceptable: ['70°', '70 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'A triangle with two angles labeled (45° and 65°) and the third unknown',
        elements: [
          { type: 'polygon', props: { points: '40,190 240,190 140,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'text', props: { x: 65, y: 180, text: '45°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 205, y: 180, text: '65°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 80, text: '?°', fontSize: 16, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 225, text: 'Sum of angles in a triangle = 180°', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the triangle angle sum', latex: '\\angle_1 + \\angle_2 + \\angle_3 = 180°' },
        { number: 2, description: 'Substitute known angles', latex: '45° + 65° + \\angle_3 = 180°' },
        { number: 3, description: 'Add known angles', latex: '110° + \\angle_3 = 180°' },
        { number: 4, description: 'Solve for the unknown', latex: '\\angle_3 = 180° - 110° = 70°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The sum of all angles in a triangle is 180°.' },
      { level: 'moderate', text: '45 + 65 = 110. Missing angle = 180 - 110' },
      { level: 'explicit', text: '180 - 110 = 70°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Triangle Angle Sum',
      skills: ['angle-calculation', 'addition', 'subtraction'],
      prerequisites: ['angle-measurement'],
      concepts: ['triangle-angle-sum', '180-degree-rule'],
      commonMistakes: ['Using 360° instead of 180°', 'Arithmetic errors'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'angles', 'angle-sum']
    }
  },
  {
    id: 'geom-v2-g7-tri-002',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'An equilateral triangle has all angles equal. What is the measure of each angle?',
      latex: '\\theta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60°', '60 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'An equilateral triangle with all three angles marked as equal',
        elements: [
          { type: 'polygon', props: { points: '140,40 240,200 40,200', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'text', props: { x: 140, y: 85, text: '?°', fontSize: 14, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 70, y: 190, text: '?°', fontSize: 14, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 205, y: 190, text: '?°', fontSize: 14, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 130, text: 'All angles equal', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 240, text: '3θ = 180° → θ = 60°', fontSize: 12, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'All three angles are equal', latex: '\\theta_1 = \\theta_2 = \\theta_3 = \\theta' },
        { number: 2, description: 'Sum of angles is 180°', latex: '3\\theta = 180°' },
        { number: 3, description: 'Divide by 3', latex: '\\theta = \\frac{180°}{3} = 60°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'If all three angles are equal and they sum to 180°...' },
      { level: 'moderate', text: '3θ = 180°, so θ = 180 ÷ 3' },
      { level: 'explicit', text: '180 ÷ 3 = 60°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Equilateral Triangle Angles',
      skills: ['angle-calculation', 'division'],
      prerequisites: ['triangle-angle-sum', 'equilateral-definition'],
      concepts: ['equilateral-triangles', 'equal-angles'],
      commonMistakes: ['Dividing 180 by 2 instead of 3'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'equilateral', 'angles']
    }
  },
  // ============================================================================
  // SPECIAL TRIANGLES (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-tri-003',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A triangle has angles of 45°, 45°, and 90°. What type of triangle is this?'
    },
    answer: {
      type: 'exact',
      correct: 'isosceles right triangle',
      acceptable: ['isosceles right triangle', 'right isosceles', '45-45-90 triangle', 'isosceles right']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'A 45-45-90 triangle with angles labeled',
        elements: [
          { type: 'polygon', props: { points: '40,200 200,200 200,40', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'rectangle', props: { x: 180, y: 180, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 65, y: 190, text: '45°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 75, text: '45°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 190, text: '90°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 110, y: 105, text: 'a', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 210, y: 125, text: 'a', fontSize: 14, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 220, text: 'a√2', fontSize: 14, fill: '#6b7280', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 250, text: '45-45-90 Triangle', fontSize: 13, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the 90° angle', latex: '90° \\Rightarrow \\text{right triangle}' },
        { number: 2, description: 'Notice two angles are equal (45°)', latex: '45° = 45° \\Rightarrow \\text{isosceles}' },
        { number: 3, description: 'Combine the properties', latex: '\\text{Isosceles right triangle (45-45-90)}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It has a 90° angle, making it a right triangle.' },
      { level: 'moderate', text: 'Two angles are equal (45° each), so it\'s isosceles.' },
      { level: 'explicit', text: 'It\'s an isosceles right triangle (or 45-45-90 triangle).' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Special Right Triangles',
      skills: ['triangle-classification', 'reasoning'],
      prerequisites: ['triangle-types', 'right-triangles'],
      concepts: ['45-45-90', 'special-triangles'],
      commonMistakes: ['Calling it just "right triangle" without isosceles'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'special-triangles', '45-45-90']
    }
  },
  {
    id: 'geom-v2-g8-tri-004',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'In a 30-60-90 triangle, the side opposite 30° is 5 units. What is the hypotenuse?',
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
        description: 'A 30-60-90 triangle with the short leg labeled as 5',
        elements: [
          { type: 'polygon', props: { points: '40,200 260,200 260,60', stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'rectangle', props: { x: 240, y: 180, width: 20, height: 20, stroke: '#d97706', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 65, y: 190, text: '30°', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 245, y: 95, text: '60°', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 270, y: 135, text: '5', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 115, text: '?', fontSize: 18, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 220, text: '5√3', fontSize: 14, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 250, text: '30-60-90: x, x√3, 2x', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall 30-60-90 ratios', latex: '\\text{Sides: } x : x\\sqrt{3} : 2x' },
        { number: 2, description: 'Side opposite 30° = x', latex: 'x = 5' },
        { number: 3, description: 'Hypotenuse = 2x', latex: 'c = 2 \\times 5 = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'In a 30-60-90 triangle, sides are in ratio x : x√3 : 2x' },
      { level: 'moderate', text: 'The side opposite 30° is the shortest (x = 5). Hypotenuse = 2x' },
      { level: 'explicit', text: '2 × 5 = 10' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Special Right Triangles',
      skills: ['ratio-application', 'multiplication'],
      prerequisites: ['triangle-ratios', '30-60-90'],
      concepts: ['30-60-90', 'side-ratios'],
      commonMistakes: ['Using wrong ratio', 'Confusing which side is x'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'special-triangles', '30-60-90']
    }
  },
  // ============================================================================
  // EXTERIOR ANGLES (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-tri-005',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'The exterior angle of a triangle is 120°. If one non-adjacent interior angle is 50°, find the other non-adjacent interior angle.',
      latex: '\\beta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '70',
      acceptable: ['70°', '70 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 220,
        description: 'A triangle with an exterior angle of 120° and interior angles labeled',
        elements: [
          { type: 'polygon', props: { points: '50,170 200,170 140,60', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 200, y1: 170, x2: 280, y2: 170, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 230,170 A 30,30 0 0,0 215,145', stroke: '#dc2626', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 250, y: 155, text: '120°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 80, y: 160, text: '50°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 95, text: '?°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 160, y: 205, text: 'Exterior angle = sum of non-adjacent interior angles', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply the exterior angle theorem', latex: '\\text{Exterior} = \\text{Sum of non-adjacent interior angles}' },
        { number: 2, description: 'Set up the equation', latex: '120° = 50° + \\beta' },
        { number: 3, description: 'Solve for the unknown', latex: '\\beta = 120° - 50° = 70°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The exterior angle equals the sum of the two non-adjacent interior angles.' },
      { level: 'moderate', text: '120° = 50° + unknown angle' },
      { level: 'explicit', text: '120 - 50 = 70°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Exterior Angle Theorem',
      skills: ['angle-calculation', 'theorem-application'],
      prerequisites: ['triangle-angles'],
      concepts: ['exterior-angles', 'angle-relationships'],
      commonMistakes: ['Subtracting from 180° instead of the exterior angle'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'exterior-angles', 'theorems']
    }
  },
  // ============================================================================
  // TRIANGLE INEQUALITY (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-tri-006',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Can a triangle have sides of length 3, 4, and 8?'
    },
    answer: {
      type: 'exact',
      correct: 'No',
      acceptable: ['no', 'No', 'NO', 'false', 'False']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 200,
        description: 'Three line segments showing 3, 4, and 8 - illustrating they cannot form a triangle',
        elements: [
          { type: 'line', props: { x1: 40, y1: 100, x2: 100, y2: 100, stroke: '#2563eb', strokeWidth: 3 } },
          { type: 'text', props: { x: 70, y: 85, text: '3', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'line', props: { x1: 110, y1: 100, x2: 190, y2: 100, stroke: '#16a34a', strokeWidth: 3 } },
          { type: 'text', props: { x: 150, y: 85, text: '4', fontSize: 14, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'line', props: { x1: 200, y1: 100, x2: 360, y2: 100, stroke: '#dc2626', strokeWidth: 3 } },
          { type: 'text', props: { x: 280, y: 85, text: '8', fontSize: 14, fill: '#b91c1c', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 140, text: '3 + 4 = 7 < 8', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 165, text: 'NOT a valid triangle!', fontSize: 13, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 190, text: 'Two shorter sides must exceed the longest', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply triangle inequality', latex: 'a + b > c \\text{ for all combinations}' },
        { number: 2, description: 'Check: 3 + 4 vs 8', latex: '3 + 4 = 7 \\not> 8' },
        { number: 3, description: 'The inequality fails', latex: '\\text{Cannot form a triangle}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Triangle inequality: the sum of any two sides must be greater than the third side.' },
      { level: 'moderate', text: 'Check if 3 + 4 > 8' },
      { level: 'explicit', text: '3 + 4 = 7, which is NOT greater than 8. No, they cannot form a triangle.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Triangle Inequality',
      skills: ['inequality-checking', 'logical-reasoning'],
      prerequisites: ['addition', 'inequalities'],
      concepts: ['triangle-inequality', 'valid-triangles'],
      commonMistakes: ['Only checking one combination', 'Using ≥ instead of >'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'triangle-inequality', 'validity']
    }
  },
  // ============================================================================
  // SIMILAR TRIANGLES (G8-9)
  // ============================================================================
  {
    id: 'geom-v2-g8-tri-007',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Two similar triangles have a scale factor of 3:1. If the smaller triangle has a side of 4 cm, what is the corresponding side of the larger triangle?',
      latex: 'x = ?'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12 cm', '12cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 220,
        description: 'Two similar triangles with scale factor 3:1',
        elements: [
          { type: 'polygon', props: { points: '40,170 100,170 70,120', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '140,180 260,180 200,60', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'text', props: { x: 70, y: 190, text: '4 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 200, y: 200, text: '? cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 70, y: 100, text: 'Small', fontSize: 10, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 200, y: 45, text: 'Large', fontSize: 10, fill: '#15803d', textAnchor: 'middle' } },
          { type: 'text', props: { x: 180, y: 135, text: 'Scale: 3:1', fontSize: 13, fill: '#6b7280', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Understand scale factor 3:1', latex: '\\frac{\\text{Large}}{\\text{Small}} = \\frac{3}{1}' },
        { number: 2, description: 'Set up the proportion', latex: '\\frac{x}{4} = \\frac{3}{1}' },
        { number: 3, description: 'Solve for x', latex: 'x = 4 \\times 3 = 12 \\text{ cm}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Scale factor 3:1 means the larger is 3 times the smaller.' },
      { level: 'moderate', text: 'Large side = Small side × 3' },
      { level: 'explicit', text: '4 × 3 = 12 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['proportional-reasoning', 'multiplication'],
      prerequisites: ['ratios', 'proportions'],
      concepts: ['similarity', 'scale-factors'],
      commonMistakes: ['Dividing instead of multiplying', 'Confusing scale direction'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'similarity', 'scale-factor']
    }
  },
  {
    id: 'geom-v2-g9-tri-008',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'In triangle ABC, angle A = 2x, angle B = 3x, and angle C = 4x. Find the measure of angle B.',
      latex: '\\angle B = ?'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60°', '60 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'A triangle with angles labeled as 2x, 3x, and 4x',
        elements: [
          { type: 'polygon', props: { points: '40,190 240,190 180,50', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'text', props: { x: 65, y: 180, text: '2x', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 205, y: 180, text: '3x', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 80, text: '4x', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 50, y: 205, text: 'A', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 235, y: 205, text: 'B', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 185, y: 45, text: 'C', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 230, text: '2x + 3x + 4x = 180°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Sum of angles = 180°', latex: '2x + 3x + 4x = 180°' },
        { number: 2, description: 'Combine like terms', latex: '9x = 180°' },
        { number: 3, description: 'Solve for x', latex: 'x = 20°' },
        { number: 4, description: 'Find angle B', latex: '\\angle B = 3x = 3 \\times 20° = 60°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'All three angles sum to 180°: 2x + 3x + 4x = 180°' },
      { level: 'moderate', text: '9x = 180°, so x = 20°. Then angle B = 3x' },
      { level: 'explicit', text: '3 × 20 = 60°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Algebraic Triangle Problems',
      skills: ['algebraic-thinking', 'equation-solving'],
      prerequisites: ['triangle-angle-sum', 'algebra'],
      concepts: ['algebraic-geometry', 'variable-angles'],
      commonMistakes: ['Forgetting to multiply x by the coefficient', 'Finding x but not angle B'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['triangles', 'algebra', 'angle-expressions']
    }
  }
]
