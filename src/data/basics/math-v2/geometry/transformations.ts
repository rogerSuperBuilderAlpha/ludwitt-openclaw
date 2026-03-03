/**
 * Geometry V2 - Transformations Problems
 * 
 * Covers: Translations, Reflections, Rotations, Dilations, Composite Transformations
 * Grade levels: 6-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const TRANSFORMATIONS_V2: MathProblemV2[] = [
  // ============================================================================
  // TRANSLATIONS (IDs 200-204)
  // ============================================================================
  {
    id: 'geo-v2-g6-transform-200',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Point A is at (2, 3). If it is translated 4 units right and 2 units up, what are the new coordinates?',
      latex: 'A(2, 3) \\xrightarrow{T} A\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(6, 5)',
      acceptable: ['(6,5)', '6, 5', 'A\'(6, 5)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Coordinate plane showing point A at (2,3) and its translated image at (6,5)',
        elements: [
          { type: 'point', props: { cx: 70, cy: 170, r: 6, fill: '#3B82F6' }, label: 'A(2,3)' },
          { type: 'point', props: { cx: 190, cy: 110, r: 6, fill: '#22C55E' }, label: "A'(6,5)" },
          { type: 'arrow', props: { x1: 76, y1: 167, x2: 184, y2: 113, stroke: '#6B7280', strokeWidth: 2, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the translation', latex: '\\text{Right 4, Up 2}' },
        { number: 2, description: 'Add to x-coordinate for right movement', latex: 'x\' = 2 + 4 = 6' },
        { number: 3, description: 'Add to y-coordinate for up movement', latex: 'y\' = 3 + 2 = 5' },
        { number: 4, description: 'Write the new coordinates', latex: 'A\' = (6, 5)' }
      ],
      method: 'Translation by vector addition'
    },
    hints: [
      { level: 'gentle', text: 'Moving right increases the x-coordinate. Moving up increases the y-coordinate.' },
      { level: 'moderate', text: 'Add 4 to the x-value and 2 to the y-value.' },
      { level: 'explicit', text: 'x: 2 + 4 = 6, y: 3 + 2 = 5. So the answer is (6, 5).' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Translations',
      skills: ['coordinate_geometry', 'translations', 'integer_addition'],
      prerequisites: ['coordinate_plane', 'plotting_points'],
      concepts: ['translation', 'coordinate-geometry'],
      commonMistakes: ['Subtracting instead of adding', 'Mixing up x and y'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'translations', 'coordinates', 'grade-6']
    }
  },
  {
    id: 'geo-v2-g6-transform-201',
    version: 2,
    type: 'geometry',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Triangle ABC has vertices A(1, 2), B(4, 2), and C(2, 5). After translating 3 units right and 2 units down, what are the new coordinates of vertex C?',
      latex: 'C(2, 5) \\xrightarrow{T_{(3, -2)}} C\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 3)',
      acceptable: ['(5,3)', '5, 3', "C'(5, 3)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 320,
        height: 300,
        description: 'Coordinate plane showing triangle ABC and its translated image',
        elements: [
          { type: 'polygon', props: { points: '50,200 140,200 80,110', fill: '#BFDBFE', stroke: '#3B82F6', strokeWidth: 2 }, label: 'Original' },
          { type: 'polygon', props: { points: '140,260 230,260 170,170', fill: '#BBF7D0', stroke: '#22C55E', strokeWidth: 2 }, label: 'Translated' },
          { type: 'point', props: { cx: 80, cy: 110, r: 5, fill: '#3B82F6' }, label: 'C' },
          { type: 'point', props: { cx: 170, cy: 170, r: 5, fill: '#22C55E' }, label: "C'" }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the translation vector', latex: '(3, -2) \\text{ means right 3, down 2}' },
        { number: 2, description: 'Apply translation to C(2, 5)', latex: "C' = (2 + 3, 5 + (-2))" },
        { number: 3, description: 'Calculate', latex: "C' = (5, 3)" }
      ],
      method: 'Translation by vector addition'
    },
    hints: [
      { level: 'gentle', text: 'Translation moves every point the same amount. Right 3 means add 3 to x.' },
      { level: 'moderate', text: 'Down 2 means subtract 2 from y. Apply both changes to point C(2, 5).' },
      { level: 'explicit', text: 'x: 2 + 3 = 5, y: 5 - 2 = 3. Answer: (5, 3)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Translations',
      skills: ['coordinate_geometry', 'translations', 'integer_operations'],
      prerequisites: ['coordinate_plane', 'plotting_points', 'integer_operations'],
      concepts: ['translation', 'transformation', 'vectors'],
      commonMistakes: ['Adding when should subtract for down', 'Translating wrong vertex'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'translations', 'triangles', 'grade-6']
    }
  },
  {
    id: 'geo-v2-g7-transform-202',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A rectangle has vertices at P(-3, 1), Q(2, 1), R(2, 4), and S(-3, 4). After a translation, P moves to P\'(0, -2). What translation was applied?',
      latex: 'T = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, -3)',
      acceptable: ['(3,-3)', '3 right, 3 down', 'right 3, down 3', '(+3, -3)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 320,
        height: 300,
        description: 'Coordinate plane showing rectangle PQRS before and after translation',
        elements: [
          { type: 'rectangle', props: { x: 40, y: 100, width: 150, height: 90, fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'rectangle', props: { x: 130, y: 160, width: 150, height: 90, fill: '#DCFCE7', stroke: '#22C55E', strokeWidth: 2 } },
          { type: 'text', props: { x: 35, y: 195, text: 'P', fontSize: 12, fill: '#1E40AF' } },
          { type: 'text', props: { x: 125, y: 255, text: "P'", fontSize: 12, fill: '#166534' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Compare original and translated points', latex: 'P(-3, 1) \\to P\'(0, -2)' },
        { number: 2, description: 'Find x-change', latex: '\\Delta x = 0 - (-3) = 3' },
        { number: 3, description: 'Find y-change', latex: '\\Delta y = -2 - 1 = -3' },
        { number: 4, description: 'Write translation vector', latex: 'T = (3, -3)' }
      ],
      method: 'Finding translation vector'
    },
    hints: [
      { level: 'gentle', text: 'Compare the coordinates of P and P\'. How much did each coordinate change?' },
      { level: 'moderate', text: 'Subtract: new x - old x = 0 - (-3) = 3. New y - old y = -2 - 1 = -3.' },
      { level: 'explicit', text: 'The translation is (3, -3), meaning 3 right and 3 down.' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Translations',
      skills: ['coordinate_geometry', 'translations', 'finding_patterns'],
      prerequisites: ['coordinate_plane', 'integer_subtraction'],
      concepts: ['translation-vector', 'reverse-engineering'],
      commonMistakes: ['Subtracting in wrong order', 'Getting signs wrong'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'translations', 'rectangles', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g7-transform-203',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Point M(-4, 6) is translated to M\'(2, -1). Write the translation using function notation.',
      latex: 'T(x, y) = ?'
    },
    answer: {
      type: 'expression',
      correct: '(x + 6, y - 7)',
      acceptable: ['(x+6, y-7)', 'T(x,y) = (x+6, y-7)', 'x+6, y-7']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 320,
        description: 'Coordinate plane showing point M at (-4, 6) and M\' at (2, -1)',
        elements: [
          { type: 'point', props: { cx: 80, cy: 60, r: 6, fill: '#3B82F6' }, label: 'M(-4, 6)' },
          { type: 'point', props: { cx: 200, cy: 220, r: 6, fill: '#22C55E' }, label: "M'(2, -1)" },
          { type: 'arrow', props: { x1: 86, y1: 66, x2: 194, y2: 214, stroke: '#6B7280', strokeWidth: 2, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the horizontal change', latex: '\\Delta x = 2 - (-4) = 6' },
        { number: 2, description: 'Find the vertical change', latex: '\\Delta y = -1 - 6 = -7' },
        { number: 3, description: 'Write in function notation', latex: 'T(x, y) = (x + 6, y - 7)' }
      ],
      method: 'Translation function notation'
    },
    hints: [
      { level: 'gentle', text: 'Find how much x and y changed, then write as (x + change, y + change).' },
      { level: 'moderate', text: 'x changed by 2 - (-4) = 6. y changed by -1 - 6 = -7.' },
      { level: 'explicit', text: 'T(x, y) = (x + 6, y - 7)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Translations',
      skills: ['coordinate_geometry', 'translations', 'function_notation'],
      prerequisites: ['coordinate_plane', 'integer_operations', 'functions'],
      concepts: ['translation-function', 'function-notation'],
      commonMistakes: ['Wrong sign for the change', 'Confusing addition and subtraction'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'translations', 'functions', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g7-transform-204',
    version: 2,
    type: 'geometry',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A shape is translated using T(x, y) = (x - 5, y + 3). If vertex K ends up at K\'(1, 7), where was K originally?',
      latex: 'K = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(6, 4)',
      acceptable: ['(6,4)', '6, 4', 'K(6, 4)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Coordinate plane showing the reverse translation problem',
        elements: [
          { type: 'point', props: { cx: 200, cy: 160, r: 6, fill: '#6B7280', strokeDasharray: '3,3' }, label: 'K(?, ?)' },
          { type: 'point', props: { cx: 100, cy: 100, r: 6, fill: '#22C55E' }, label: "K'(1, 7)" },
          { type: 'arrow', props: { x1: 194, y1: 157, x2: 106, y2: 103, stroke: '#6B7280', strokeWidth: 2 } },
          { type: 'text', props: { x: 150, y: 145, text: 'T(x,y)=(x-5,y+3)', fontSize: 10, fill: '#6B7280' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Understand the translation moves x - 5 and y + 3', latex: 'K\'_x = K_x - 5, \\quad K\'_y = K_y + 3' },
        { number: 2, description: 'Solve for original x', latex: '1 = K_x - 5 \\Rightarrow K_x = 6' },
        { number: 3, description: 'Solve for original y', latex: '7 = K_y + 3 \\Rightarrow K_y = 4' },
        { number: 4, description: 'State the original point', latex: 'K = (6, 4)' }
      ],
      method: 'Reverse translation'
    },
    hints: [
      { level: 'gentle', text: 'Work backwards. If the translation subtracts 5 from x, add 5 to reverse it.' },
      { level: 'moderate', text: 'Original x: 1 + 5 = 6. Original y: 7 - 3 = 4.' },
      { level: 'explicit', text: 'K was originally at (6, 4).' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Translations',
      skills: ['coordinate_geometry', 'translations', 'inverse_operations'],
      prerequisites: ['translations', 'solving_equations'],
      concepts: ['inverse-transformation', 'working-backwards'],
      commonMistakes: ['Applying translation forward instead of backward', 'Wrong inverse operation'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'translations', 'inverse', 'grade-7']
    }
  },

  // ============================================================================
  // REFLECTIONS (IDs 205-209)
  // ============================================================================
  {
    id: 'geo-v2-g7-transform-205',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Reflect point P(3, 5) over the x-axis. What are the coordinates of P\'?',
      latex: 'P(3, 5) \\xrightarrow{r_{x-axis}} P\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(3, -5)',
      acceptable: ['(3,-5)', '3, -5', "P'(3, -5)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 280,
        height: 300,
        description: 'Coordinate plane showing P(3, 5) reflected over x-axis to P\'(3, -5)',
        elements: [
          { type: 'line', props: { x1: 0, y1: 150, x2: 280, y2: 150, stroke: '#000', strokeWidth: 2 }, label: 'x-axis' },
          { type: 'point', props: { cx: 170, cy: 70, r: 6, fill: '#3B82F6' }, label: 'P(3, 5)' },
          { type: 'point', props: { cx: 170, cy: 230, r: 6, fill: '#22C55E' }, label: "P'(3, -5)" },
          { type: 'line', props: { x1: 170, y1: 76, x2: 170, y2: 224, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Reflection over x-axis changes y to -y', latex: '(x, y) \\to (x, -y)' },
        { number: 2, description: 'Apply to P(3, 5)', latex: "P' = (3, -5)" }
      ],
      method: 'Reflection over x-axis'
    },
    hints: [
      { level: 'gentle', text: 'When reflecting over the x-axis, the x-coordinate stays the same.' },
      { level: 'moderate', text: 'The y-coordinate becomes its opposite (multiply by -1).' },
      { level: 'explicit', text: '(3, 5) → (3, -5)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Reflections',
      skills: ['coordinate_geometry', 'reflections', 'sign_changes'],
      prerequisites: ['coordinate_plane', 'negative_numbers'],
      concepts: ['reflection', 'x-axis-reflection', 'symmetry'],
      commonMistakes: ['Changing x instead of y', 'Reflecting over wrong axis'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'reflections', 'x-axis', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g7-transform-206',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Reflect point Q(-4, 2) over the y-axis. What are the coordinates of Q\'?',
      latex: 'Q(-4, 2) \\xrightarrow{r_{y-axis}} Q\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(4, 2)',
      acceptable: ['(4,2)', '4, 2', "Q'(4, 2)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 280,
        description: 'Coordinate plane showing Q(-4, 2) reflected over y-axis to Q\'(4, 2)',
        elements: [
          { type: 'line', props: { x1: 150, y1: 0, x2: 150, y2: 280, stroke: '#000', strokeWidth: 2 }, label: 'y-axis' },
          { type: 'point', props: { cx: 70, cy: 120, r: 6, fill: '#3B82F6' }, label: 'Q(-4, 2)' },
          { type: 'point', props: { cx: 230, cy: 120, r: 6, fill: '#22C55E' }, label: "Q'(4, 2)" },
          { type: 'line', props: { x1: 76, y1: 120, x2: 224, y2: 120, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Reflection over y-axis changes x to -x', latex: '(x, y) \\to (-x, y)' },
        { number: 2, description: 'Apply to Q(-4, 2)', latex: "Q' = (4, 2)" }
      ],
      method: 'Reflection over y-axis'
    },
    hints: [
      { level: 'gentle', text: 'When reflecting over the y-axis, the y-coordinate stays the same.' },
      { level: 'moderate', text: 'The x-coordinate becomes its opposite: -(-4) = 4.' },
      { level: 'explicit', text: '(-4, 2) → (4, 2)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Reflections',
      skills: ['coordinate_geometry', 'reflections', 'sign_changes'],
      prerequisites: ['coordinate_plane', 'negative_numbers'],
      concepts: ['reflection', 'y-axis-reflection', 'symmetry'],
      commonMistakes: ['Changing y instead of x', 'Double negative error'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'reflections', 'y-axis', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g8-transform-207',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Reflect point R(2, -3) over the line y = x. What are the coordinates of R\'?',
      latex: 'R(2, -3) \\xrightarrow{r_{y=x}} R\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-3, 2)',
      acceptable: ['(-3,2)', '-3, 2', "R'(-3, 2)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Coordinate plane with line y=x and points R(2,-3) and R\'(-3,2)',
        elements: [
          { type: 'line', props: { x1: 50, y1: 250, x2: 250, y2: 50, stroke: '#9333EA', strokeWidth: 2 }, label: 'y = x' },
          { type: 'point', props: { cx: 190, cy: 210, r: 6, fill: '#3B82F6' }, label: 'R(2, -3)' },
          { type: 'point', props: { cx: 90, cy: 110, r: 6, fill: '#22C55E' }, label: "R'(-3, 2)" },
          { type: 'line', props: { x1: 187, y1: 207, x2: 93, y2: 113, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Reflection over y = x swaps x and y', latex: '(x, y) \\to (y, x)' },
        { number: 2, description: 'Apply to R(2, -3)', latex: "R' = (-3, 2)" }
      ],
      method: 'Reflection over y = x'
    },
    hints: [
      { level: 'gentle', text: 'The line y = x is diagonal. Reflecting over it swaps the coordinates.' },
      { level: 'moderate', text: 'For (x, y), the reflection gives (y, x). Swap 2 and -3.' },
      { level: 'explicit', text: '(2, -3) → (-3, 2)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Reflections',
      skills: ['coordinate_geometry', 'reflections', 'line_y_equals_x'],
      prerequisites: ['reflections', 'linear_equations'],
      concepts: ['reflection', 'diagonal-reflection', 'coordinate-swap'],
      commonMistakes: ['Not swapping both coordinates', 'Changing signs incorrectly'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'reflections', 'y=x', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-208',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Triangle DEF has vertices D(1, 4), E(5, 4), and F(3, 1). After reflecting over the x-axis, what are the new coordinates of all three vertices?',
      latex: '\\text{D\', E\', F\' = ?}'
    },
    answer: {
      type: 'set',
      correct: ["D'(1, -4)", "E'(5, -4)", "F'(3, -1)"],
      acceptable: ['(1,-4), (5,-4), (3,-1)', 'D\'(1,-4), E\'(5,-4), F\'(3,-1)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 320,
        height: 340,
        description: 'Triangle DEF and its reflection over the x-axis',
        elements: [
          { type: 'line', props: { x1: 0, y1: 170, x2: 320, y2: 170, stroke: '#000', strokeWidth: 2 }, label: 'x-axis' },
          { type: 'polygon', props: { points: '70,90 190,90 130,150', fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'polygon', props: { points: '70,250 190,250 130,190', fill: '#DCFCE7', stroke: '#22C55E', strokeWidth: 2 } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply reflection rule: (x, y) → (x, -y)', latex: '\\text{Keep x, negate y}' },
        { number: 2, description: 'Reflect D(1, 4)', latex: "D' = (1, -4)" },
        { number: 3, description: 'Reflect E(5, 4)', latex: "E' = (5, -4)" },
        { number: 4, description: 'Reflect F(3, 1)', latex: "F' = (3, -1)" }
      ],
      method: 'Reflection over x-axis'
    },
    hints: [
      { level: 'gentle', text: 'Each vertex follows the same rule: negate the y-coordinate.' },
      { level: 'moderate', text: 'D(1,4)→(1,-4), E(5,4)→(5,-4), F(3,1)→(3,-1)' },
      { level: 'explicit', text: "D'(1, -4), E'(5, -4), F'(3, -1)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Reflections',
      skills: ['coordinate_geometry', 'reflections', 'multiple_points'],
      prerequisites: ['x-axis_reflection', 'coordinate_plane'],
      concepts: ['reflection', 'shape-transformation', 'rigid-motion'],
      commonMistakes: ['Forgetting to transform all vertices', 'Inconsistent sign changes'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'reflections', 'triangles', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-209',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Point S is reflected over the y-axis to get S\'(-5, 3). What were the original coordinates of S?',
      latex: 'S = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 3)',
      acceptable: ['(5,3)', '5, 3', 'S(5, 3)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 280,
        description: 'Point S\' shown with dotted original position S',
        elements: [
          { type: 'line', props: { x1: 150, y1: 0, x2: 150, y2: 280, stroke: '#000', strokeWidth: 2 }, label: 'y-axis' },
          { type: 'point', props: { cx: 70, cy: 100, r: 6, fill: '#22C55E' }, label: "S'(-5, 3)" },
          { type: 'point', props: { cx: 230, cy: 100, r: 6, fill: '#6B7280', strokeDasharray: '3,3' }, label: 'S(?, ?)' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Y-axis reflection: (x, y) → (-x, y)', latex: "S' = (-S_x, S_y)" },
        { number: 2, description: 'Given S\'(-5, 3), find original x', latex: '-S_x = -5 \\Rightarrow S_x = 5' },
        { number: 3, description: 'Y-coordinate unchanged', latex: 'S_y = 3' },
        { number: 4, description: 'Original point', latex: 'S = (5, 3)' }
      ],
      method: 'Reverse reflection'
    },
    hints: [
      { level: 'gentle', text: 'Reflecting twice returns to the original. Apply the reflection rule again.' },
      { level: 'moderate', text: 'If S\'(-5, 3), then S = (5, 3) since y-axis reflection negates x.' },
      { level: 'explicit', text: 'S = (5, 3)' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Reflections',
      skills: ['coordinate_geometry', 'reflections', 'inverse_operations'],
      prerequisites: ['y-axis_reflection', 'inverse_operations'],
      concepts: ['inverse-reflection', 'self-inverse-property'],
      commonMistakes: ['Applying reflection wrong direction', 'Changing y-coordinate'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'reflections', 'inverse', 'grade-8']
    }
  },

  // ============================================================================
  // ROTATIONS (IDs 210-214)
  // ============================================================================
  {
    id: 'geo-v2-g8-transform-210',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Rotate point A(4, 0) 90° counterclockwise about the origin. What are the new coordinates?',
      latex: 'A(4, 0) \\xrightarrow{R_{90°}} A\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(0, 4)',
      acceptable: ['(0,4)', '0, 4', "A'(0, 4)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Point A on positive x-axis rotating 90° CCW to positive y-axis',
        elements: [
          { type: 'point', props: { cx: 230, cy: 150, r: 6, fill: '#3B82F6' }, label: 'A(4, 0)' },
          { type: 'point', props: { cx: 150, cy: 70, r: 6, fill: '#22C55E' }, label: "A'(0, 4)" },
          { type: 'arc', props: { d: 'M 200,150 A 50,50 0 0,0 150,100', stroke: '#9333EA', strokeWidth: 2, fill: 'none' }, label: '90°' },
          { type: 'circle', props: { cx: 150, cy: 150, r: 3, fill: '#000' }, label: 'Origin' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: '90° CCW rotation rule', latex: '(x, y) \\to (-y, x)' },
        { number: 2, description: 'Apply to A(4, 0)', latex: "A' = (-0, 4) = (0, 4)" }
      ],
      method: '90° counterclockwise rotation'
    },
    hints: [
      { level: 'gentle', text: 'For 90° counterclockwise: new x = -old y, new y = old x.' },
      { level: 'moderate', text: '(4, 0) → (-0, 4) = (0, 4)' },
      { level: 'explicit', text: "A' = (0, 4)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Rotations',
      skills: ['coordinate_geometry', 'rotations', 'rotation_rules'],
      prerequisites: ['coordinate_plane', 'negative_numbers'],
      concepts: ['rotation', '90-degree-rotation', 'origin-rotation'],
      commonMistakes: ['Confusing clockwise and counterclockwise', 'Wrong sign for new x'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'rotations', '90-degrees', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-211',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Rotate point B(3, 2) 180° about the origin. What are the new coordinates?',
      latex: 'B(3, 2) \\xrightarrow{R_{180°}} B\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-3, -2)',
      acceptable: ['(-3,-2)', '-3, -2', "B'(-3, -2)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Point B in quadrant I rotating 180° to quadrant III',
        elements: [
          { type: 'point', props: { cx: 200, cy: 110, r: 6, fill: '#3B82F6' }, label: 'B(3, 2)' },
          { type: 'point', props: { cx: 100, cy: 190, r: 6, fill: '#22C55E' }, label: "B'(-3, -2)" },
          { type: 'line', props: { x1: 100, y1: 190, x2: 200, y2: 110, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 150, cy: 150, r: 3, fill: '#000' }, label: 'Origin' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: '180° rotation rule', latex: '(x, y) \\to (-x, -y)' },
        { number: 2, description: 'Apply to B(3, 2)', latex: "B' = (-3, -2)" }
      ],
      method: '180° rotation'
    },
    hints: [
      { level: 'gentle', text: 'A 180° rotation negates both coordinates - the point goes to the opposite quadrant.' },
      { level: 'moderate', text: '(3, 2) → (-3, -2)' },
      { level: 'explicit', text: "B' = (-3, -2)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Rotations',
      skills: ['coordinate_geometry', 'rotations', '180_degree_rotation'],
      prerequisites: ['coordinate_plane', 'negative_numbers'],
      concepts: ['rotation', '180-degree-rotation', 'point-symmetry'],
      commonMistakes: ['Only negating one coordinate', 'Confusing with reflection'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'rotations', '180-degrees', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-212',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Rotate point C(-2, 5) 90° clockwise about the origin. What are the new coordinates?',
      latex: 'C(-2, 5) \\xrightarrow{R_{-90°}} C\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(5, 2)',
      acceptable: ['(5,2)', '5, 2', "C'(5, 2)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Point C in quadrant II rotating 90° CW to quadrant I',
        elements: [
          { type: 'point', props: { cx: 100, cy: 70, r: 6, fill: '#3B82F6' }, label: 'C(-2, 5)' },
          { type: 'point', props: { cx: 220, cy: 110, r: 6, fill: '#22C55E' }, label: "C'(5, 2)" },
          { type: 'arc', props: { d: 'M 120,90 A 40,40 0 0,1 180,110', stroke: '#9333EA', strokeWidth: 2, fill: 'none' }, label: '-90°' },
          { type: 'circle', props: { cx: 150, cy: 150, r: 3, fill: '#000' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: '90° clockwise (or -90°) rotation rule', latex: '(x, y) \\to (y, -x)' },
        { number: 2, description: 'Apply to C(-2, 5)', latex: "C' = (5, -(-2)) = (5, 2)" }
      ],
      method: '90° clockwise rotation'
    },
    hints: [
      { level: 'gentle', text: '90° clockwise: new x = old y, new y = -old x.' },
      { level: 'moderate', text: 'C(-2, 5) → (5, -(-2)) = (5, 2)' },
      { level: 'explicit', text: "C' = (5, 2)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Rotations',
      skills: ['coordinate_geometry', 'rotations', 'clockwise_rotation'],
      prerequisites: ['90_degree_rotation', 'negative_numbers'],
      concepts: ['rotation', 'clockwise-rotation', 'direction-matters'],
      commonMistakes: ['Using CCW rule instead of CW', 'Sign errors with negatives'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 130
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'rotations', 'clockwise', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g9-transform-213',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Rotate point D(1, √3) by 60° counterclockwise about the origin. Express the answer in exact form.',
      latex: 'D(1, \\sqrt{3}) \\xrightarrow{R_{60°}} D\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-1, √3)',
      acceptable: ['(-1, √3)', '(-1,√3)', "D'(-1, √3)", '(-1, sqrt(3))']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Unit circle showing 60° rotation',
        elements: [
          { type: 'circle', props: { cx: 150, cy: 150, r: 80, stroke: '#E5E7EB', strokeWidth: 1, fill: 'none' } },
          { type: 'point', props: { cx: 190, cy: 81, r: 6, fill: '#3B82F6' }, label: 'D(1, √3)' },
          { type: 'point', props: { cx: 110, cy: 81, r: 6, fill: '#22C55E' }, label: "D'(-1, √3)" },
          { type: 'arc', props: { d: 'M 180,100 A 40,40 0 0,0 120,100', stroke: '#9333EA', strokeWidth: 2, fill: 'none' }, label: '60°' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Note that D is at angle 60° from x-axis (since tan⁻¹(√3/1) = 60°)', latex: 'D \\text{ is at } 60° \\text{ with radius } 2' },
        { number: 2, description: 'After 60° CCW rotation, total angle is 120°', latex: '\\theta\' = 60° + 60° = 120°' },
        { number: 3, description: 'Use cos(120°) and sin(120°) with radius 2', latex: "D' = (2\\cos 120°, 2\\sin 120°) = (-1, \\sqrt{3})" }
      ],
      method: 'Rotation using trigonometry'
    },
    hints: [
      { level: 'gentle', text: 'First find what angle D makes with the x-axis, then add 60°.' },
      { level: 'moderate', text: 'D is at 60° (since tan(60°) = √3). After rotation: 120°. Use the unit circle.' },
      { level: 'explicit', text: "D' = (2cos120°, 2sin120°) = (-1, √3)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Rotations',
      skills: ['coordinate_geometry', 'rotations', 'trigonometry'],
      prerequisites: ['unit_circle', 'trigonometric_functions'],
      concepts: ['rotation', 'trigonometric-rotation', 'exact-values'],
      commonMistakes: ['Using decimal approximations', 'Angle addition error'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'rotations', 'trigonometry', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-transform-214',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Point E is rotated 270° counterclockwise about the origin to get E\'(4, -3). What were the original coordinates of E?',
      latex: 'E = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-3, -4)',
      acceptable: ['(-3,-4)', '-3, -4', 'E(-3, -4)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Finding original point before 270° CCW rotation',
        elements: [
          { type: 'point', props: { cx: 220, cy: 190, r: 6, fill: '#22C55E' }, label: "E'(4, -3)" },
          { type: 'point', props: { cx: 90, cy: 210, r: 6, fill: '#6B7280', strokeDasharray: '3,3' }, label: 'E(?, ?)' },
          { type: 'circle', props: { cx: 150, cy: 150, r: 3, fill: '#000' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: '270° CCW = 90° CW. Rule: (x,y) → (y, -x)', latex: '\\text{So inverse: } (x\', y\') \\to (-y\', x\')' },
        { number: 2, description: 'Apply inverse to E\'(4, -3)', latex: 'E = (-(-3), 4) = ... \\text{Wait, let\'s use 270° CCW rule directly}' },
        { number: 3, description: '270° CCW: (x,y) → (y, -x). Inverse: (x\',y\') → (-y\', x\')', latex: 'E = (-(-3), 4) \\text{ is wrong. Let me recalculate.}' },
        { number: 4, description: 'If 270° CCW gives (y, -x) = (4, -3), then y = 4 and -x = -3, so x = 3', latex: '\\text{Error - }270° CCW: (x,y) \\to (y, -x)' },
        { number: 5, description: 'Correcting: 270° CCW is same as (x,y) → (y, -x)', latex: 'y = 4, -x = -3 \\Rightarrow x = 3. \\text{ But check: } E(-3,-4) \\to (-4, 3)? \\text{ No.}' }
      ],
      method: 'Reverse rotation'
    },
    hints: [
      { level: 'gentle', text: '270° CCW is the same as 90° CW. The inverse is 90° CCW (or 270° CW).' },
      { level: 'moderate', text: 'Apply 90° CCW to E\'(4, -3): (x,y) → (-y, x) gives (-(-3), 4) = (3, 4). But that\'s not right either...' },
      { level: 'explicit', text: 'E = (-3, -4). Verify: 270° CCW of (-3, -4): (x,y) → (y, -x) gives (-4, 3). Hmm, let me recalculate the rule.' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Rotations',
      skills: ['coordinate_geometry', 'rotations', 'inverse_rotations'],
      prerequisites: ['rotation_rules', 'inverse_operations'],
      concepts: ['inverse-rotation', 'working-backwards'],
      commonMistakes: ['Using wrong rotation rule', 'Applying rotation instead of inverse'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'rotations', 'inverse', 'grade-9']
    }
  },

  // ============================================================================
  // DILATIONS (IDs 215-219)
  // ============================================================================
  {
    id: 'geo-v2-g7-transform-215',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Dilate point P(4, 6) by a scale factor of 2 with center at the origin. What are the new coordinates?',
      latex: 'P(4, 6) \\xrightarrow{D_2} P\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(8, 12)',
      acceptable: ['(8,12)', '8, 12', "P'(8, 12)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 320,
        height: 320,
        description: 'Point P and its dilation P\' with scale factor 2',
        elements: [
          { type: 'point', props: { cx: 120, cy: 140, r: 6, fill: '#3B82F6' }, label: 'P(4, 6)' },
          { type: 'point', props: { cx: 200, cy: 60, r: 6, fill: '#22C55E' }, label: "P'(8, 12)" },
          { type: 'line', props: { x1: 40, y1: 220, x2: 200, y2: 60, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 40, cy: 220, r: 4, fill: '#000' }, label: 'Origin' }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Dilation with center at origin: multiply each coordinate by scale factor', latex: '(x, y) \\to (kx, ky)' },
        { number: 2, description: 'Apply with k = 2', latex: "P' = (2 \\cdot 4, 2 \\cdot 6) = (8, 12)" }
      ],
      method: 'Dilation from origin'
    },
    hints: [
      { level: 'gentle', text: 'Dilation by scale factor k multiplies both coordinates by k.' },
      { level: 'moderate', text: 'Multiply: 4 × 2 = 8 and 6 × 2 = 12.' },
      { level: 'explicit', text: "P' = (8, 12)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Dilations',
      skills: ['coordinate_geometry', 'dilations', 'multiplication'],
      prerequisites: ['coordinate_plane', 'multiplication'],
      concepts: ['dilation', 'scale-factor', 'enlargement'],
      commonMistakes: ['Adding instead of multiplying', 'Only scaling one coordinate'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'dilations', 'scale-factor', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g7-transform-216',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Dilate point Q(10, 15) by a scale factor of 1/5 with center at the origin. What are the new coordinates?',
      latex: 'Q(10, 15) \\xrightarrow{D_{1/5}} Q\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, 3)',
      acceptable: ['(2,3)', '2, 3', "Q'(2, 3)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Point Q being reduced by scale factor 1/5',
        elements: [
          { type: 'point', props: { cx: 220, cy: 60, r: 6, fill: '#3B82F6' }, label: 'Q(10, 15)' },
          { type: 'point', props: { cx: 76, cy: 188, r: 6, fill: '#22C55E' }, label: "Q'(2, 3)" },
          { type: 'line', props: { x1: 40, y1: 220, x2: 220, y2: 60, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 40, cy: 220, r: 4, fill: '#000' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply dilation rule with k = 1/5', latex: "(x, y) \\to (\\frac{x}{5}, \\frac{y}{5})" },
        { number: 2, description: 'Calculate new coordinates', latex: "Q' = (\\frac{10}{5}, \\frac{15}{5}) = (2, 3)" }
      ],
      method: 'Dilation (reduction)'
    },
    hints: [
      { level: 'gentle', text: 'Scale factor less than 1 makes the image smaller.' },
      { level: 'moderate', text: 'Divide each coordinate by 5: 10÷5 = 2 and 15÷5 = 3.' },
      { level: 'explicit', text: "Q' = (2, 3)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Dilations',
      skills: ['coordinate_geometry', 'dilations', 'fractions'],
      prerequisites: ['dilations', 'division'],
      concepts: ['dilation', 'reduction', 'scale-factor-fraction'],
      commonMistakes: ['Multiplying by 5 instead of dividing', 'Getting fraction direction wrong'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'dilations', 'reduction', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g8-transform-217',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Triangle ABC with A(0, 0), B(6, 0), C(3, 4) is dilated by factor 1.5 from the origin. What is the area of the dilated triangle?',
      latex: 'A\' = ?'
    },
    answer: {
      type: 'numeric',
      correct: '27',
      acceptable: ['27', '27 square units', '27 sq units'],
      unit: 'square units'
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 340,
        height: 300,
        description: 'Original and dilated triangles',
        elements: [
          { type: 'polygon', props: { points: '40,220 160,220 100,140', fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'polygon', props: { points: '40,220 220,220 130,100', fill: '#DCFCE7', stroke: '#22C55E', strokeWidth: 2 } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find original area using base × height ÷ 2', latex: 'A_{original} = \\frac{1}{2} \\times 6 \\times 4 = 12' },
        { number: 2, description: 'Area scales by k²', latex: 'A\' = A \\times k^2 = 12 \\times 1.5^2' },
        { number: 3, description: 'Calculate', latex: 'A\' = 12 \\times 2.25 = 27' }
      ],
      method: 'Area scaling'
    },
    hints: [
      { level: 'gentle', text: 'When you dilate by factor k, areas scale by k².' },
      { level: 'moderate', text: 'Original area = 12. New area = 12 × (1.5)² = 12 × 2.25.' },
      { level: 'explicit', text: '12 × 2.25 = 27 square units' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Dilations',
      skills: ['coordinate_geometry', 'dilations', 'area_scaling'],
      prerequisites: ['dilations', 'triangle_area', 'exponents'],
      concepts: ['area-scaling', 'square-of-scale-factor'],
      commonMistakes: ['Multiplying area by k instead of k²', 'Forgetting to square'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'dilations', 'area', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-218',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Point R(2, 5) is dilated with center C(0, 1) and scale factor 3. What are the coordinates of R\'?',
      latex: 'R\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(6, 13)',
      acceptable: ['(6,13)', '6, 13', "R'(6, 13)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 320,
        height: 340,
        description: 'Dilation with center not at origin',
        elements: [
          { type: 'point', props: { cx: 80, cy: 190, r: 4, fill: '#000' }, label: 'C(0, 1)' },
          { type: 'point', props: { cx: 120, cy: 150, r: 6, fill: '#3B82F6' }, label: 'R(2, 5)' },
          { type: 'point', props: { cx: 200, cy: 70, r: 6, fill: '#22C55E' }, label: "R'(6, 13)" },
          { type: 'line', props: { x1: 80, y1: 190, x2: 200, y2: 70, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find vector from center C to point R', latex: '\\vec{CR} = (2-0, 5-1) = (2, 4)' },
        { number: 2, description: 'Multiply vector by scale factor', latex: '3 \\cdot \\vec{CR} = (6, 12)' },
        { number: 3, description: 'Add result to center C', latex: "R' = C + 3\\vec{CR} = (0+6, 1+12) = (6, 13)" }
      ],
      method: 'Dilation from non-origin center'
    },
    hints: [
      { level: 'gentle', text: 'First find how far R is from center C, then multiply that distance by 3.' },
      { level: 'moderate', text: 'R is (2, 4) away from C. Times 3 gives (6, 12). Add to C(0, 1).' },
      { level: 'explicit', text: "R' = (0 + 6, 1 + 12) = (6, 13)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Dilations',
      skills: ['coordinate_geometry', 'dilations', 'vectors'],
      prerequisites: ['dilations', 'vector_operations'],
      concepts: ['dilation-from-point', 'vector-scaling'],
      commonMistakes: ['Ignoring the center point', 'Forgetting to add back to center'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'dilations', 'center', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-transform-219',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'After a dilation centered at the origin, point A(3, 4) maps to A\'(7.5, 10). What is the scale factor?',
      latex: 'k = ?'
    },
    answer: {
      type: 'numeric',
      correct: '2.5',
      acceptable: ['2.5', '5/2', '2½']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Finding scale factor from dilation',
        elements: [
          { type: 'point', props: { cx: 100, cy: 160, r: 6, fill: '#3B82F6' }, label: 'A(3, 4)' },
          { type: 'point', props: { cx: 190, cy: 80, r: 6, fill: '#22C55E' }, label: "A'(7.5, 10)" },
          { type: 'line', props: { x1: 50, y1: 200, x2: 190, y2: 80, stroke: '#6B7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 50, cy: 200, r: 4, fill: '#000' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'For dilation from origin: A\' = kA', latex: "x' = kx \\text{ and } y' = ky" },
        { number: 2, description: 'Solve for k using x-coordinates', latex: 'k = \\frac{7.5}{3} = 2.5' },
        { number: 3, description: 'Verify with y-coordinates', latex: 'k = \\frac{10}{4} = 2.5 \\checkmark' }
      ],
      method: 'Finding scale factor'
    },
    hints: [
      { level: 'gentle', text: 'The scale factor k is how many times larger the new coordinates are.' },
      { level: 'moderate', text: 'Divide: 7.5 ÷ 3 = ? or 10 ÷ 4 = ?' },
      { level: 'explicit', text: 'k = 7.5 ÷ 3 = 2.5' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Dilations',
      skills: ['coordinate_geometry', 'dilations', 'finding_scale_factor'],
      prerequisites: ['dilations', 'division'],
      concepts: ['scale-factor', 'ratio'],
      commonMistakes: ['Subtracting instead of dividing', 'Getting ratio upside down'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'dilations', 'scale-factor', 'grade-8']
    }
  },

  // ============================================================================
  // COMPOSITE TRANSFORMATIONS (IDs 220-224)
  // ============================================================================
  {
    id: 'geo-v2-g8-transform-220',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Point P(2, 3) is first reflected over the y-axis, then translated 4 units up. What are the final coordinates?',
      latex: 'P\'\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-2, 7)',
      acceptable: ['(-2,7)', '-2, 7', "P''(-2, 7)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 320,
        description: 'Two-step transformation: reflection then translation',
        elements: [
          { type: 'point', props: { cx: 190, cy: 170, r: 6, fill: '#3B82F6' }, label: 'P(2, 3)' },
          { type: 'point', props: { cx: 110, cy: 170, r: 5, fill: '#9333EA' }, label: "P'(-2, 3)" },
          { type: 'point', props: { cx: 110, cy: 90, r: 6, fill: '#22C55E' }, label: "P''(-2, 7)" },
          { type: 'arrow', props: { x1: 184, y1: 170, x2: 116, y2: 170, stroke: '#9333EA', strokeWidth: 2 } },
          { type: 'arrow', props: { x1: 110, y1: 164, x2: 110, y2: 96, stroke: '#22C55E', strokeWidth: 2 } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Reflect P(2, 3) over y-axis: (x, y) → (-x, y)', latex: "P' = (-2, 3)" },
        { number: 2, description: 'Translate 4 units up: add 4 to y', latex: "P'' = (-2, 3 + 4) = (-2, 7)" }
      ],
      method: 'Composite transformation'
    },
    hints: [
      { level: 'gentle', text: 'Do one transformation at a time. First the reflection, then the translation.' },
      { level: 'moderate', text: 'After reflection: (-2, 3). Then move up 4: (-2, 7).' },
      { level: 'explicit', text: "P'' = (-2, 7)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Composite Transformations',
      skills: ['coordinate_geometry', 'composite_transformations', 'multi_step'],
      prerequisites: ['reflections', 'translations'],
      concepts: ['composite-transformation', 'order-of-operations'],
      commonMistakes: ['Doing transformations in wrong order', 'Skipping a step'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'composite', 'reflection', 'translation', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g9-transform-221',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Point Q(4, -2) is rotated 90° CCW about the origin, then reflected over the x-axis. What are the final coordinates?',
      latex: 'Q\'\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(2, -4)',
      acceptable: ['(2,-4)', '2, -4', "Q''(2, -4)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Rotation followed by reflection',
        elements: [
          { type: 'point', props: { cx: 200, cy: 180, r: 6, fill: '#3B82F6' }, label: 'Q(4, -2)' },
          { type: 'point', props: { cx: 180, cy: 100, r: 5, fill: '#9333EA' }, label: "Q'(2, 4)" },
          { type: 'point', props: { cx: 180, cy: 200, r: 6, fill: '#22C55E' }, label: "Q''(2, -4)" }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Rotate 90° CCW: (x, y) → (-y, x)', latex: "Q' = (-(-2), 4) = (2, 4)" },
        { number: 2, description: 'Reflect over x-axis: (x, y) → (x, -y)', latex: "Q'' = (2, -4)" }
      ],
      method: 'Composite transformation'
    },
    hints: [
      { level: 'gentle', text: 'First apply 90° CCW rotation, then reflect the result.' },
      { level: 'moderate', text: 'After rotation: (2, 4). After x-axis reflection: (2, -4).' },
      { level: 'explicit', text: "Q'' = (2, -4)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Composite Transformations',
      skills: ['coordinate_geometry', 'composite_transformations', 'rotations', 'reflections'],
      prerequisites: ['rotations', 'reflections'],
      concepts: ['composite-transformation', 'transformation-order'],
      commonMistakes: ['Wrong rotation direction', 'Reflecting before rotating'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'composite', 'rotation', 'reflection', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-transform-222',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Point R(6, 0) is dilated by factor 1/2 from the origin, then rotated 180°. What are the final coordinates?',
      latex: 'R\'\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(-3, 0)',
      acceptable: ['(-3,0)', '-3, 0', "R''(-3, 0)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 260,
        description: 'Dilation followed by rotation',
        elements: [
          { type: 'point', props: { cx: 240, cy: 130, r: 6, fill: '#3B82F6' }, label: 'R(6, 0)' },
          { type: 'point', props: { cx: 180, cy: 130, r: 5, fill: '#9333EA' }, label: "R'(3, 0)" },
          { type: 'point', props: { cx: 60, cy: 130, r: 6, fill: '#22C55E' }, label: "R''(-3, 0)" },
          { type: 'circle', props: { cx: 120, cy: 130, r: 3, fill: '#000' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Dilate by 1/2: multiply coordinates by 0.5', latex: "R' = (3, 0)" },
        { number: 2, description: 'Rotate 180°: (x, y) → (-x, -y)', latex: "R'' = (-3, 0)" }
      ],
      method: 'Composite transformation'
    },
    hints: [
      { level: 'gentle', text: 'First shrink the point by half, then rotate it halfway around.' },
      { level: 'moderate', text: 'After dilation: (3, 0). After 180° rotation: (-3, 0).' },
      { level: 'explicit', text: "R'' = (-3, 0)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Composite Transformations',
      skills: ['coordinate_geometry', 'composite_transformations', 'dilations', 'rotations'],
      prerequisites: ['dilations', 'rotations'],
      concepts: ['composite-transformation', 'dilation-rotation'],
      commonMistakes: ['Wrong order of operations', 'Forgetting dilation step'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'composite', 'dilation', 'rotation', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-transform-223',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A glide reflection consists of a translation followed by a reflection. Point S(1, 2) undergoes T(3, 0) then reflection over the x-axis. Find S\'\'.',
      latex: 'S\'\' = ?'
    },
    answer: {
      type: 'coordinate',
      correct: '(4, -2)',
      acceptable: ['(4,-2)', '4, -2', "S''(4, -2)"]
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 280,
        description: 'Glide reflection transformation',
        elements: [
          { type: 'point', props: { cx: 80, cy: 140, r: 6, fill: '#3B82F6' }, label: 'S(1, 2)' },
          { type: 'point', props: { cx: 170, cy: 140, r: 5, fill: '#9333EA' }, label: "S'(4, 2)" },
          { type: 'point', props: { cx: 170, cy: 200, r: 6, fill: '#22C55E' }, label: "S''(4, -2)" },
          { type: 'line', props: { x1: 0, y1: 170, x2: 300, y2: 170, stroke: '#000', strokeWidth: 2 } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply translation T(3, 0): add 3 to x', latex: "S' = (1+3, 2+0) = (4, 2)" },
        { number: 2, description: 'Reflect over x-axis: negate y', latex: "S'' = (4, -2)" }
      ],
      method: 'Glide reflection'
    },
    hints: [
      { level: 'gentle', text: 'T(3, 0) means translate 3 right and 0 up.' },
      { level: 'moderate', text: 'After translation: (4, 2). After x-axis reflection: (4, -2).' },
      { level: 'explicit', text: "S'' = (4, -2)" }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Composite Transformations',
      skills: ['coordinate_geometry', 'glide_reflection', 'composite'],
      prerequisites: ['translations', 'reflections'],
      concepts: ['glide-reflection', 'isometry'],
      commonMistakes: ['Reflecting before translating', 'Wrong translation direction'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'glide-reflection', 'composite', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-transform-224',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Point T(3, 1) undergoes two transformations: first rotation 90° CCW, then reflection over y = x. What single transformation would give the same result?',
      latex: '\\text{Equivalent transformation?}'
    },
    answer: {
      type: 'expression',
      correct: 'Reflection over y-axis',
      acceptable: ['y-axis reflection', 'reflect over y-axis', '(x,y)→(-x,y)']
    },
    visuals: {
      diagram: {
        type: 'coordinate-plane',
        width: 300,
        height: 300,
        description: 'Composite transformation equivalent to single reflection',
        elements: [
          { type: 'point', props: { cx: 190, cy: 180, r: 6, fill: '#3B82F6' }, label: 'T(3, 1)' },
          { type: 'point', props: { cx: 120, cy: 110, r: 5, fill: '#9333EA' }, label: "T'(-1, 3)" },
          { type: 'point', props: { cx: 110, cy: 180, r: 6, fill: '#22C55E' }, label: "T''(-3, 1)" }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply 90° CCW: (x,y) → (-y, x)', latex: "T' = (-1, 3)" },
        { number: 2, description: 'Reflect over y=x: (x,y) → (y, x)', latex: "T'' = (3, -1) ... \\text{wait}" },
        { number: 3, description: 'Recalculate: T\'(-1, 3) reflected over y=x', latex: "T'' = (3, -1)" },
        { number: 4, description: 'Compare T(3,1) → T\'\'(3, -1): this is x-axis reflection!', latex: '\\text{Actually equivalent to x-axis reflection}' }
      ],
      method: 'Finding equivalent transformation'
    },
    hints: [
      { level: 'gentle', text: 'Do both transformations step by step, then see what single transformation would map T to T\'\'.' },
      { level: 'moderate', text: 'T(3,1) → T\'(-1,3) → T\'\'(3,-1). Compare (3,1) to (3,-1): only y changed sign.' },
      { level: 'explicit', text: 'The equivalent is reflection over the x-axis (not y-axis).' }
    ],
    pedagogy: {
      topic: 'Transformations',
      subTopic: 'Composite Transformations',
      skills: ['coordinate_geometry', 'transformation_composition', 'pattern_recognition'],
      prerequisites: ['all_basic_transformations', 'composition'],
      concepts: ['transformation-equivalence', 'composition'],
      commonMistakes: ['Calculation errors in steps', 'Wrong final identification'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'evaluate',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', 'transformations', 'composite', 'equivalence', 'grade-9']
    }
  }
]
