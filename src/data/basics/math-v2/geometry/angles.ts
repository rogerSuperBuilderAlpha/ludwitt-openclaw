/**
 * Geometry V2 - Angles Problems
 * 
 * Covers: Angle types, angle relationships, complementary/supplementary, parallel lines
 * Grade levels: 4-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const ANGLES_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // ANGLE TYPES (G4)
  // ============================================================================
  {
    id: 'geom-v2-g4-angle-001',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'What type of angle is 90 degrees?'
    },
    answer: {
      type: 'exact',
      correct: 'right angle',
      acceptable: ['right angle', 'right', 'Right angle', 'Right']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A right angle (90°) with a small square in the corner',
        elements: [
          { type: 'line', props: { x1: 50, y1: 200, x2: 210, y2: 200, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 50, y1: 200, x2: 50, y2: 50, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'rectangle', props: { x: 50, y: 175, width: 25, height: 25, stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 100, y: 170, text: '90°', fontSize: 18, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 240, text: 'RIGHT ANGLE', fontSize: 16, fill: '#1e3a5f', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall angle classifications', latex: '\\text{Angles are classified by their measure}' },
        { number: 2, description: 'A 90° angle is called a right angle', latex: '90° = \\text{right angle}' },
        { number: 3, description: 'It forms a perfect "L" or corner', latex: '\\text{Like the corner of a book}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This angle forms a perfect corner, like the corner of a book.' },
      { level: 'moderate', text: 'It\'s marked with a small square in the corner.' },
      { level: 'explicit', text: 'A 90° angle is called a right angle.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Angle Classification',
      skills: ['angle-recognition', 'vocabulary'],
      prerequisites: ['basic-angles'],
      concepts: ['right-angles', 'angle-types'],
      commonMistakes: ['Confusing with acute or obtuse'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'right-angle', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g4-angle-002',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'What type of angle is less than 90 degrees?'
    },
    answer: {
      type: 'exact',
      correct: 'acute',
      acceptable: ['acute', 'acute angle', 'Acute']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 240,
        description: 'An acute angle (about 45°) showing an angle less than 90°',
        elements: [
          { type: 'line', props: { x1: 40, y1: 180, x2: 220, y2: 180, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 160, y2: 60, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 80,180 A 40,40 0 0,0 70,150', stroke: '#16a34a', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 100, y: 160, text: '45°', fontSize: 16, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 225, text: 'ACUTE ANGLE', fontSize: 16, fill: '#16a34a', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 35, text: 'Less than 90°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare to 90° (right angle)', latex: '\\theta < 90°' },
        { number: 2, description: 'Angles less than 90° are called acute', latex: '0° < \\theta < 90° \\Rightarrow \\text{acute}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of "a cute little angle" - it\'s small!' },
      { level: 'moderate', text: 'This angle is smaller than a right angle (90°).' },
      { level: 'explicit', text: 'An angle less than 90° is called acute.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Angle Classification',
      skills: ['angle-recognition', 'vocabulary'],
      prerequisites: ['right-angles'],
      concepts: ['acute-angles', 'angle-comparison'],
      commonMistakes: ['Confusing with obtuse'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'acute', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g4-angle-003',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'What type of angle is greater than 90 degrees but less than 180 degrees?'
    },
    answer: {
      type: 'exact',
      correct: 'obtuse',
      acceptable: ['obtuse', 'obtuse angle', 'Obtuse']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'An obtuse angle (about 120°) showing an angle greater than 90°',
        elements: [
          { type: 'line', props: { x1: 40, y1: 180, x2: 240, y2: 180, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 10, y2: 70, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 80,180 A 40,40 0 0,0 50,150', stroke: '#dc2626', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 95, y: 150, text: '120°', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 225, text: 'OBTUSE ANGLE', fontSize: 16, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 35, text: 'Greater than 90°, less than 180°', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare to 90° and 180°', latex: '90° < \\theta < 180°' },
        { number: 2, description: 'Angles between 90° and 180° are obtuse', latex: '\\text{obtuse angle}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This angle is wider than a right angle.' },
      { level: 'moderate', text: 'It\'s bigger than 90° but not a straight line (180°).' },
      { level: 'explicit', text: 'An angle between 90° and 180° is called obtuse.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Angle Classification',
      skills: ['angle-recognition', 'vocabulary'],
      prerequisites: ['right-angles', 'acute-angles'],
      concepts: ['obtuse-angles', 'angle-comparison'],
      commonMistakes: ['Confusing with acute'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'obtuse', 'vocabulary']
    }
  },
  // ============================================================================
  // COMPLEMENTARY AND SUPPLEMENTARY (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-angle-004',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Two complementary angles add up to how many degrees?',
      latex: '\\alpha + \\beta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '90',
      acceptable: ['90°', '90 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'Two complementary angles that together form a right angle',
        elements: [
          { type: 'line', props: { x1: 40, y1: 180, x2: 220, y2: 180, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 40, y2: 40, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 170, y2: 90, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'rectangle', props: { x: 40, y: 155, width: 25, height: 25, stroke: '#16a34a', strokeWidth: 2, fill: 'none' } },
          { type: 'arc', props: { d: 'M 90,180 A 50,50 0 0,0 85,155', stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'arc', props: { d: 'M 40,130 A 50,50 0 0,0 85,155', stroke: '#dc2626', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 105, y: 165, text: 'α', fontSize: 16, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 60, y: 130, text: 'β', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 220, text: 'α + β = 90°', fontSize: 14, fill: '#1e3a5f', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 30, text: 'COMPLEMENTARY', fontSize: 14, fill: '#16a34a', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the definition of complementary', latex: '\\text{Complementary angles sum to a right angle}' },
        { number: 2, description: 'A right angle is 90°', latex: '\\alpha + \\beta = 90°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Complementary angles together form a right angle.' },
      { level: 'moderate', text: 'A right angle measures exactly 90°.' },
      { level: 'explicit', text: 'Complementary angles sum to 90°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Angle Relationships',
      skills: ['angle-relationships', 'vocabulary'],
      prerequisites: ['right-angles'],
      concepts: ['complementary-angles'],
      commonMistakes: ['Confusing with supplementary (180°)'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'complementary', 'relationships']
    }
  },
  {
    id: 'geom-v2-g7-angle-005',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Two angles are complementary. One is 32°. Find the other.',
      latex: '\\beta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '58',
      acceptable: ['58°', '58 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'Two complementary angles with one labeled 32° and the other unknown',
        elements: [
          { type: 'line', props: { x1: 40, y1: 180, x2: 220, y2: 180, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 40, y2: 40, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 180, x2: 140, y2: 125, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'rectangle', props: { x: 40, y: 155, width: 25, height: 25, stroke: '#16a34a', strokeWidth: 2, fill: 'none' } },
          { type: 'arc', props: { d: 'M 85,180 A 45,45 0 0,0 80,160', stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'arc', props: { d: 'M 40,135 A 45,45 0 0,0 80,160', stroke: '#dc2626', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 100, y: 170, text: '32°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 55, y: 140, text: '?', fontSize: 18, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 220, text: '32° + ? = 90°', fontSize: 13, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the complementary relationship', latex: '\\alpha + \\beta = 90°' },
        { number: 2, description: 'Substitute the known angle', latex: '32° + \\beta = 90°' },
        { number: 3, description: 'Solve for the unknown', latex: '\\beta = 90° - 32° = 58°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Complementary angles add to 90°.' },
      { level: 'moderate', text: 'Unknown = 90° - 32°' },
      { level: 'explicit', text: '90 - 32 = 58°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Finding Complementary Angles',
      skills: ['angle-calculation', 'subtraction'],
      prerequisites: ['complementary-definition'],
      concepts: ['complementary-angles', 'solving-for-unknowns'],
      commonMistakes: ['Subtracting from 180 instead of 90'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'complementary', 'calculation']
    }
  },
  {
    id: 'geom-v2-g7-angle-006',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'If one angle in a linear pair is 65°, what is the other angle?',
      latex: '\\beta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '115',
      acceptable: ['115°', '115 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 200,
        description: 'A linear pair of angles on a straight line, one labeled 65°',
        elements: [
          { type: 'line', props: { x1: 30, y1: 120, x2: 270, y2: 120, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 150, y1: 120, x2: 200, y2: 40, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 180,120 A 30,30 0 0,0 170,95', stroke: '#2563eb', strokeWidth: 2.5, fill: 'none' } },
          { type: 'arc', props: { d: 'M 120,120 A 30,30 0 0,0 170,95', stroke: '#dc2626', strokeWidth: 2.5, fill: 'none' } },
          { type: 'text', props: { x: 190, y: 105, text: '65°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 100, y: 105, text: '?°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 170, text: 'Linear Pair: α + β = 180°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall linear pairs are supplementary', latex: '\\alpha + \\beta = 180°' },
        { number: 2, description: 'Substitute the known angle', latex: '65° + \\beta = 180°' },
        { number: 3, description: 'Solve for the unknown', latex: '\\beta = 180° - 65° = 115°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'A linear pair forms a straight line (180°).' },
      { level: 'moderate', text: 'Unknown = 180° - 65°' },
      { level: 'explicit', text: '180 - 65 = 115°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Linear Pairs',
      skills: ['angle-calculation', 'subtraction'],
      prerequisites: ['supplementary-angles'],
      concepts: ['linear-pairs', 'supplementary-angles'],
      commonMistakes: ['Using 90° instead of 180°'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'supplementary', 'linear-pairs']
    }
  },
  // ============================================================================
  // VERTICAL ANGLES (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-angle-007',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'When two lines intersect, they form two pairs of vertical angles. If one angle is 40°, what are all four angles?'
    },
    answer: {
      type: 'exact',
      correct: '40, 140, 40, 140',
      acceptable: ['40° and 140°', '40 and 140', '40, 140, 40, 140']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Two intersecting lines forming four angles, with opposite angles equal',
        elements: [
          { type: 'line', props: { x1: 40, y1: 140, x2: 240, y2: 140, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 80, y1: 50, x2: 200, y2: 230, stroke: '#1e3a5f', strokeWidth: 2.5 } },
          { type: 'text', props: { x: 165, y: 125, text: '40°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 95, y: 160, text: '40°', fontSize: 14, fill: '#2563eb', fontWeight: 'bold' } },
          { type: 'text', props: { x: 165, y: 165, text: '140°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 85, y: 120, text: '140°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 260, text: 'Vertical angles are equal', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 30, text: 'Adjacent angles are supplementary', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Vertical angles are equal', latex: '\\theta_1 = \\theta_3 = 40°' },
        { number: 2, description: 'Adjacent angles are supplementary', latex: '\\theta_2 = 180° - 40° = 140°' },
        { number: 3, description: 'Vertical to that is also 140°', latex: '\\theta_4 = 140°' },
        { number: 4, description: 'All four angles', latex: '40°, 140°, 40°, 140°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Vertical angles (opposite each other) are always equal.' },
      { level: 'moderate', text: 'One pair is 40°, 40°. Adjacent angles add to 180°, so other pair is 140°, 140°.' },
      { level: 'explicit', text: 'The four angles are 40°, 140°, 40°, 140°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Vertical Angles',
      skills: ['angle-relationships', 'logical-reasoning'],
      prerequisites: ['supplementary-angles'],
      concepts: ['vertical-angles', 'angle-relationships'],
      commonMistakes: ['Thinking adjacent angles are equal', 'Forgetting vertical angles are equal'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'vertical-angles', 'intersecting-lines']
    }
  },
  // ============================================================================
  // PARALLEL LINES AND TRANSVERSALS (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-angle-008',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Two parallel lines are cut by a transversal. One angle is 65°. What is the measure of its corresponding angle?',
      latex: '\\text{corresponding angle} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '65',
      acceptable: ['65°', '65 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 260,
        description: 'Two parallel lines cut by a transversal, showing corresponding angles',
        elements: [
          { type: 'line', props: { x1: 30, y1: 80, x2: 270, y2: 80, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 30, y1: 180, x2: 270, y2: 180, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 80, y1: 30, x2: 200, y2: 230, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'text', props: { x: 145, y: 70, text: '65°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 170, text: '65°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 280, y: 80, text: 'l₁', fontSize: 12, fill: '#2563eb' } },
          { type: 'text', props: { x: 280, y: 180, text: 'l₂', fontSize: 12, fill: '#2563eb' } },
          { type: 'text', props: { x: 150, y: 250, text: 'l₁ ∥ l₂ → Corresponding angles are equal', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify corresponding angles', latex: '\\text{Same position at each intersection}' },
        { number: 2, description: 'When lines are parallel, corresponding angles are equal', latex: '\\theta_1 = \\theta_2' },
        { number: 3, description: 'Therefore the corresponding angle is', latex: '\\theta = 65°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Corresponding angles are in the same position at each intersection.' },
      { level: 'moderate', text: 'When lines are parallel, corresponding angles are congruent (equal).' },
      { level: 'explicit', text: 'The corresponding angle is also 65°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Parallel Lines and Transversals',
      skills: ['angle-relationships', 'parallel-lines'],
      prerequisites: ['parallel-lines', 'transversals'],
      concepts: ['corresponding-angles', 'parallel-line-properties'],
      commonMistakes: ['Confusing with alternate angles', 'Thinking they are supplementary'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'parallel-lines', 'corresponding']
    }
  },
  {
    id: 'geom-v2-g8-angle-009',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Two parallel lines are cut by a transversal. If an interior angle on the same side is 70°, find the other interior angle on the same side.',
      latex: '\\beta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '110',
      acceptable: ['110°', '110 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 260,
        description: 'Two parallel lines cut by a transversal, showing same-side interior angles',
        elements: [
          { type: 'line', props: { x1: 30, y1: 80, x2: 270, y2: 80, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 30, y1: 180, x2: 270, y2: 180, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 80, y1: 30, x2: 200, y2: 230, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'text', props: { x: 145, y: 95, text: '70°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 145, y: 170, text: '?°', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'rectangle', props: { x: 130, y: 80, width: 50, height: 100, stroke: '#fbbf24', strokeWidth: 2, fill: 'none', strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 150, y: 250, text: 'Same-side interior angles are supplementary', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify same-side interior angles', latex: '\\text{Both between the parallel lines, same side of transversal}' },
        { number: 2, description: 'Same-side interior angles are supplementary', latex: '\\alpha + \\beta = 180°' },
        { number: 3, description: 'Solve for the unknown', latex: '\\beta = 180° - 70° = 110°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Same-side interior angles add up to 180° (supplementary).' },
      { level: 'moderate', text: 'Unknown = 180° - 70°' },
      { level: 'explicit', text: '180 - 70 = 110°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Same-Side Interior Angles',
      skills: ['angle-relationships', 'subtraction'],
      prerequisites: ['parallel-lines', 'supplementary-angles'],
      concepts: ['same-side-interior', 'supplementary-angles'],
      commonMistakes: ['Thinking they are equal instead of supplementary'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'parallel-lines', 'same-side-interior']
    }
  },
  // ============================================================================
  // POLYGON ANGLES (G9)
  // ============================================================================
  {
    id: 'geom-v2-g9-angle-010',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the sum of interior angles in a hexagon.',
      latex: 'S = ?'
    },
    answer: {
      type: 'numeric',
      correct: '720',
      acceptable: ['720°', '720 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A hexagon with interior angles marked and divided into triangles',
        elements: [
          { type: 'polygon', props: { points: '140,40 220,70 220,160 140,190 60,160 60,70', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 140, y1: 40, x2: 220, y2: 160, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 40, x2: 140, y2: 190, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 40, x2: 60, y2: 160, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 140, y: 115, text: '4 triangles', fontSize: 12, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 250, text: 'S = (n-2) × 180° = (6-2) × 180° = 720°', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the interior angle sum formula', latex: 'S = (n-2) \\times 180°' },
        { number: 2, description: 'Substitute n = 6 for hexagon', latex: 'S = (6-2) \\times 180°' },
        { number: 3, description: 'Calculate', latex: 'S = 4 \\times 180° = 720°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Sum of interior angles = (n-2) × 180°, where n is the number of sides.' },
      { level: 'moderate', text: 'S = (6-2) × 180° = 4 × 180°' },
      { level: 'explicit', text: '4 × 180 = 720°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Polygon Angle Sums',
      skills: ['formula-application', 'multiplication'],
      prerequisites: ['polygons', 'triangles'],
      concepts: ['interior-angle-sum', 'polygon-properties'],
      commonMistakes: ['Forgetting to subtract 2', 'Using n × 180 instead of (n-2) × 180'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'polygons', 'interior-angles', 'hexagon']
    }
  },
  {
    id: 'geom-v2-g9-angle-011',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Each interior angle of a regular polygon is 144°. How many sides does it have?',
      latex: 'n = ?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', 'ten', 'decagon']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A regular decagon with one interior angle marked as 144°',
        elements: [
          { type: 'polygon', props: { points: '140,30 200,50 230,105 220,170 170,210 110,210 60,170 50,105 80,50 140,30', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'arc', props: { d: 'M 150,50 A 20,20 0 0,1 175,55', stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 180, y: 60, text: '144°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 125, text: 'n = ?', fontSize: 16, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 260, text: 'Regular polygon: all angles = 144°', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use the interior angle formula for regular polygons', latex: '\\text{Each angle} = \\frac{(n-2) \\times 180°}{n}' },
        { number: 2, description: 'Set up the equation', latex: '144 = \\frac{(n-2) \\times 180}{n}' },
        { number: 3, description: 'Multiply both sides by n', latex: '144n = 180n - 360' },
        { number: 4, description: 'Solve for n', latex: '36n = 360 \\Rightarrow n = 10' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'For a regular polygon, each interior angle = (n-2) × 180° ÷ n' },
      { level: 'moderate', text: 'Set up: 144 = (n-2) × 180 ÷ n and solve for n' },
      { level: 'explicit', text: 'Solving gives n = 10 (a decagon)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Finding Number of Sides',
      skills: ['algebraic-thinking', 'equation-solving'],
      prerequisites: ['polygon-angles', 'algebra'],
      concepts: ['regular-polygons', 'inverse-problems'],
      commonMistakes: ['Setting up equation incorrectly', 'Arithmetic errors'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 110
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['angles', 'polygons', 'regular-polygons', 'algebra']
    }
  }
]
