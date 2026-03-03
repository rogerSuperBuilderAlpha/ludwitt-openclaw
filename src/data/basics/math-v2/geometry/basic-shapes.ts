/**
 * Geometry V2 - Basic Shapes Problems
 * 
 * Covers: Polygons, shape properties, naming conventions
 * Grade levels: 4-6
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const BASIC_SHAPES_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // POLYGONS - Shape Recognition and Properties (G4-5)
  // ============================================================================
  {
    id: 'geom-v2-g4-shapes-001',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'How many sides does a pentagon have?',
      latex: 'n = ?'
    },
    answer: {
      type: 'exact',
      correct: '5',
      acceptable: ['5', 'five', 'Five']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 250,
        height: 250,
        description: 'A regular pentagon with 5 equal sides, labeled at each vertex',
        elements: [
          { type: 'polygon', props: { points: '125,30 210,85 180,180 70,180 40,85', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'text', props: { x: 125, y: 110, text: 'Pentagon', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 125, y: 135, text: '5 sides', fontSize: 14, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'circle', props: { cx: 125, cy: 30, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 210, cy: 85, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 180, cy: 180, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 70, cy: 180, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 40, cy: 85, r: 4, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the shape as a pentagon', latex: '\\text{Pentagon = 5-sided polygon}' },
        { number: 2, description: 'The prefix "penta-" means five in Greek', latex: '\\text{penta} = 5' },
        { number: 3, description: 'Count the sides to verify', latex: 'n = 5 \\text{ sides}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The prefix "penta-" comes from Greek. Think of other words with "penta" like pentagon or pentathlon.' },
      { level: 'moderate', text: 'Penta- means five. A pentathlon has 5 events.' },
      { level: 'explicit', text: 'A pentagon has exactly 5 sides.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Polygon Classification',
      skills: ['shape-recognition', 'polygon-properties'],
      prerequisites: ['counting', 'basic-shapes'],
      concepts: ['polygons', 'sides', 'vertices'],
      commonMistakes: ['Confusing pentagon with hexagon', 'Miscounting vertices as sides'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'polygons', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g4-shapes-002',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'How many sides does a hexagon have?',
      latex: 'n = ?'
    },
    answer: {
      type: 'exact',
      correct: '6',
      acceptable: ['6', 'six', 'Six']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 250,
        height: 250,
        description: 'A regular hexagon with 6 equal sides',
        elements: [
          { type: 'polygon', props: { points: '125,30 200,60 200,160 125,190 50,160 50,60', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'text', props: { x: 125, y: 110, text: 'Hexagon', fontSize: 16, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 125, y: 135, text: '6 sides', fontSize: 14, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'circle', props: { cx: 125, cy: 30, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 200, cy: 60, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 200, cy: 160, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 125, cy: 190, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 50, cy: 160, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 50, cy: 60, r: 4, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the shape as a hexagon', latex: '\\text{Hexagon = 6-sided polygon}' },
        { number: 2, description: 'The prefix "hexa-" means six in Greek', latex: '\\text{hexa} = 6' },
        { number: 3, description: 'Count the sides to verify', latex: 'n = 6 \\text{ sides}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of a honeycomb - each cell is this shape!' },
      { level: 'moderate', text: 'Hexa- means six. Hexadecimal uses 16 (hex = 6 in Latin context).' },
      { level: 'explicit', text: 'A hexagon has exactly 6 sides.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Polygon Classification',
      skills: ['shape-recognition', 'polygon-properties'],
      prerequisites: ['counting', 'basic-shapes'],
      concepts: ['polygons', 'sides', 'vertices'],
      commonMistakes: ['Confusing hexagon with octagon', 'Mixing up Greek prefixes'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'polygons', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g4-shapes-003',
    version: 2,
    type: 'geometry',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'What is the name of a polygon with 8 sides?'
    },
    answer: {
      type: 'exact',
      correct: 'octagon',
      acceptable: ['octagon', 'Octagon', 'OCTAGON']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 250,
        height: 250,
        description: 'A regular octagon with 8 equal sides, similar to a stop sign',
        elements: [
          { type: 'polygon', props: { points: '90,30 160,30 195,65 195,135 160,170 90,170 55,135 55,65', stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'text', props: { x: 125, y: 95, text: 'STOP', fontSize: 20, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 125, y: 120, text: '8 sides', fontSize: 12, fill: '#92400e', textAnchor: 'middle' } },
          { type: 'text', props: { x: 125, y: 210, text: 'Octagon', fontSize: 16, fill: '#1e3a5f', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall polygon naming conventions', latex: '\\text{Prefix indicates number of sides}' },
        { number: 2, description: 'The prefix "octa-" means eight', latex: '\\text{octa} = 8' },
        { number: 3, description: 'An 8-sided polygon is called an octagon', latex: '\\text{Octagon} = 8 \\text{ sides}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of an octopus - how many legs does it have?' },
      { level: 'moderate', text: 'Octa- means eight. An octopus has 8 legs, and this shape has 8 sides.' },
      { level: 'explicit', text: 'The answer is octagon. Stop signs are octagons!' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Polygon Classification',
      skills: ['shape-recognition', 'polygon-properties', 'vocabulary'],
      prerequisites: ['counting', 'basic-shapes'],
      concepts: ['polygons', 'naming-conventions'],
      commonMistakes: ['Confusing with hexagon', 'Spelling errors'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'polygons', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g5-shapes-004',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'What is a four-sided polygon called?'
    },
    answer: {
      type: 'exact',
      correct: 'quadrilateral',
      acceptable: ['quadrilateral', 'Quadrilateral', 'QUADRILATERAL']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 250,
        description: 'Various quadrilaterals shown: square, rectangle, rhombus, and trapezoid',
        elements: [
          { type: 'rectangle', props: { x: 30, y: 40, width: 60, height: 60, stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'text', props: { x: 60, y: 120, text: 'Square', fontSize: 10, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'rectangle', props: { x: 110, y: 40, width: 80, height: 50, stroke: '#16a34a', strokeWidth: 2, fill: '#dcfce7' } },
          { type: 'text', props: { x: 150, y: 120, text: 'Rectangle', fontSize: 10, fill: '#15803d', textAnchor: 'middle' } },
          { type: 'polygon', props: { points: '240,70 280,40 280,90 240,120', stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'text', props: { x: 260, y: 140, text: 'Rhombus', fontSize: 10, fill: '#92400e', textAnchor: 'middle' } },
          { type: 'polygon', props: { points: '80,170 180,170 160,210 100,210', stroke: '#dc2626', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'text', props: { x: 130, y: 235, text: 'Trapezoid', fontSize: 10, fill: '#b91c1c', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 20, text: 'All are Quadrilaterals (4 sides)', fontSize: 12, fill: '#374151', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Break down the word: "quad" means four', latex: '\\text{quad} = 4' },
        { number: 2, description: '"Lateral" means sides', latex: '\\text{lateral} = \\text{sides}' },
        { number: 3, description: 'A quadrilateral is any 4-sided polygon', latex: '\\text{Quadrilateral} = 4 \\text{ sides}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The prefix "quad-" appears in words like "quadruple" (4×).' },
      { level: 'moderate', text: 'Quad means 4, lateral means sides. Put them together!' },
      { level: 'explicit', text: 'A four-sided polygon is called a quadrilateral.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Polygon Classification',
      skills: ['shape-recognition', 'polygon-properties', 'vocabulary'],
      prerequisites: ['basic-shapes'],
      concepts: ['polygons', 'quadrilaterals'],
      commonMistakes: ['Saying "rectangle" or "square" instead of the general term'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'quadrilaterals', 'vocabulary']
    }
  },
  {
    id: 'geom-v2-g5-shapes-005',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A quadrilateral has all four sides equal and all four angles equal (90°). What is it called?'
    },
    answer: {
      type: 'exact',
      correct: 'square',
      acceptable: ['square', 'Square', 'SQUARE']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A square with all sides labeled as equal and right angle markers at each corner',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 50, width: 160, height: 160, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'rectangle', props: { x: 50, y: 190, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 190, y: 190, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 50, y: 50, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 190, y: 50, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 130, y: 235, text: 's', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 225, y: 130, text: 's', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 45, text: 's', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 35, y: 130, text: 's', fontSize: 16, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 130, text: 'SQUARE', fontSize: 18, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 270, text: '4 equal sides, 4 right angles', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the properties: all sides equal', latex: 's_1 = s_2 = s_3 = s_4' },
        { number: 2, description: 'Identify the properties: all angles are 90°', latex: '\\angle_1 = \\angle_2 = \\angle_3 = \\angle_4 = 90°' },
        { number: 3, description: 'This defines a square', latex: '\\text{Square: 4 equal sides, 4 right angles}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'This is the most "regular" four-sided shape - everything is equal!' },
      { level: 'moderate', text: 'All sides are the same length, all corners are 90°.' },
      { level: 'explicit', text: 'A square has 4 equal sides and 4 right angles (90° each).' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Quadrilaterals',
      skills: ['shape-recognition', 'shape-properties'],
      prerequisites: ['angles', 'sides'],
      concepts: ['squares', 'right-angles', 'equal-sides'],
      commonMistakes: ['Confusing with rhombus (equal sides but not 90° angles)'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'quadrilaterals', 'squares']
    }
  },
  {
    id: 'geom-v2-g5-shapes-006',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A quadrilateral has all four sides equal but angles are not 90°. What is it called?'
    },
    answer: {
      type: 'exact',
      correct: 'rhombus',
      acceptable: ['rhombus', 'Rhombus', 'RHOMBUS', 'diamond']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A rhombus (tilted square) with all sides labeled as equal but no right angles',
        elements: [
          { type: 'polygon', props: { points: '140,30 230,110 140,190 50,110', stroke: '#db2777', strokeWidth: 2.5, fill: '#fce7f3' } },
          { type: 'text', props: { x: 190, y: 65, text: 's', fontSize: 14, fill: '#be185d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 155, text: 's', fontSize: 14, fill: '#be185d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 85, y: 155, text: 's', fontSize: 14, fill: '#be185d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 85, y: 65, text: 's', fontSize: 14, fill: '#be185d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 115, text: 'RHOMBUS', fontSize: 16, fill: '#be185d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'line', props: { x1: 50, y1: 110, x2: 230, y2: 110, stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 30, x2: 140, y2: 190, stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 140, y: 230, text: '4 equal sides, angles ≠ 90°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 250, text: '(Like a tilted square)', fontSize: 11, fill: '#9ca3af', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: all four sides are equal', latex: 's_1 = s_2 = s_3 = s_4' },
        { number: 2, description: 'Identify: angles are NOT right angles', latex: '\\text{angles} \\neq 90°' },
        { number: 3, description: 'This defines a rhombus (or diamond)', latex: '\\text{Rhombus: 4 equal sides, non-right angles}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It\'s like a square that got pushed to the side - a tilted square.' },
      { level: 'moderate', text: 'Sometimes called a diamond shape - think of the diamonds in a deck of cards.' },
      { level: 'explicit', text: 'A rhombus has 4 equal sides but the angles are not 90°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Quadrilaterals',
      skills: ['shape-recognition', 'shape-properties'],
      prerequisites: ['angles', 'sides', 'squares'],
      concepts: ['rhombus', 'parallelogram', 'equal-sides'],
      commonMistakes: ['Confusing with square', 'Thinking diagonals must be equal'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 55
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'quadrilaterals', 'rhombus']
    }
  },
  {
    id: 'geom-v2-g5-shapes-007',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A quadrilateral has opposite sides parallel and equal, with all angles 90°, but not all sides equal. What is it?'
    },
    answer: {
      type: 'exact',
      correct: 'rectangle',
      acceptable: ['rectangle', 'Rectangle', 'RECTANGLE']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 240,
        description: 'A rectangle with length and width labeled, showing parallel sides and right angles',
        elements: [
          { type: 'rectangle', props: { x: 50, y: 60, width: 220, height: 120, stroke: '#0369a1', strokeWidth: 2.5, fill: '#e0f2fe' } },
          { type: 'rectangle', props: { x: 50, y: 160, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 250, y: 160, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 50, y: 60, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'rectangle', props: { x: 250, y: 60, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 160, y: 200, text: 'length (l)', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 285, y: 120, text: 'width (w)', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 160, y: 125, text: 'RECTANGLE', fontSize: 18, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 160, y: 230, text: 'l ≠ w, all angles = 90°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: opposite sides are parallel and equal', latex: 'l_1 = l_2, \\quad w_1 = w_2' },
        { number: 2, description: 'Identify: all angles are 90°', latex: '\\text{All angles} = 90°' },
        { number: 3, description: 'Identify: length ≠ width', latex: 'l \\neq w' },
        { number: 4, description: 'This defines a rectangle', latex: '\\text{Rectangle}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It\'s like a stretched square - all corners are still 90°.' },
      { level: 'moderate', text: 'Think of a door or a book cover - longer than it is wide.' },
      { level: 'explicit', text: 'A rectangle has 4 right angles, with opposite sides equal but length ≠ width.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Quadrilaterals',
      skills: ['shape-recognition', 'shape-properties'],
      prerequisites: ['angles', 'parallel-lines'],
      concepts: ['rectangles', 'right-angles', 'parallel-sides'],
      commonMistakes: ['Forgetting that a square is also a rectangle'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 55
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'quadrilaterals', 'rectangles']
    }
  },
  // ============================================================================
  // TRIANGLES - Classification (G5)
  // ============================================================================
  {
    id: 'geom-v2-g5-shapes-008',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A triangle has all three sides equal in length. What type of triangle is it?'
    },
    answer: {
      type: 'exact',
      correct: 'equilateral',
      acceptable: ['equilateral', 'Equilateral', 'equilateral triangle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'An equilateral triangle with all three sides labeled as equal and 60° angles marked',
        elements: [
          { type: 'polygon', props: { points: '140,40 240,200 40,200', stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'text', props: { x: 80, y: 130, text: 'a', fontSize: 16, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 200, y: 130, text: 'a', fontSize: 16, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 220, text: 'a', fontSize: 16, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 100, text: '60°', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 70, y: 195, text: '60°', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 195, y: 195, text: '60°', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 140, text: 'EQUILATERAL', fontSize: 14, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 250, text: 'All sides equal, all angles = 60°', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: all three sides are equal', latex: 'a = b = c' },
        { number: 2, description: 'Break down the name: "equi" = equal, "lateral" = sides', latex: '\\text{equi} + \\text{lateral} = \\text{equal sides}' },
        { number: 3, description: 'All angles are also equal (60° each)', latex: '\\angle A = \\angle B = \\angle C = 60°' }
      ]
    },
    hints: [
      { level: 'gentle', text: '"Equi-" means equal, "lateral" means sides.' },
      { level: 'moderate', text: 'If all three sides are equal, all three angles must also be equal (60° each).' },
      { level: 'explicit', text: 'An equilateral triangle has 3 equal sides and 3 equal angles of 60°.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Triangle Classification',
      skills: ['shape-recognition', 'triangle-properties'],
      prerequisites: ['triangles', 'angles'],
      concepts: ['equilateral', 'congruent-sides'],
      commonMistakes: ['Confusing with isosceles', 'Thinking angles could be different'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 55
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'triangles', 'equilateral']
    }
  },
  {
    id: 'geom-v2-g5-shapes-009',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A triangle has exactly two sides equal in length. What type of triangle is it?'
    },
    answer: {
      type: 'exact',
      correct: 'isosceles',
      acceptable: ['isosceles', 'Isosceles', 'isosceles triangle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'An isosceles triangle with two equal sides labeled as "a" and the base labeled as "b"',
        elements: [
          { type: 'polygon', props: { points: '140,40 230,200 50,200', stroke: '#d97706', strokeWidth: 2.5, fill: '#fef3c7' } },
          { type: 'text', props: { x: 75, y: 125, text: 'a', fontSize: 16, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 195, y: 125, text: 'a', fontSize: 16, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 220, text: 'b', fontSize: 16, fill: '#6b7280', fontWeight: 'bold' } },
          { type: 'line', props: { x1: 85, y1: 95, x2: 90, y2: 105, stroke: '#b45309', strokeWidth: 2 } },
          { type: 'line', props: { x1: 190, y1: 105, x2: 195, y2: 95, stroke: '#b45309', strokeWidth: 2 } },
          { type: 'text', props: { x: 140, y: 140, text: 'ISOSCELES', fontSize: 14, fill: '#b45309', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 250, text: 'Two equal sides (a = a), base different (b)', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: exactly two sides are equal', latex: 'a = a, \\quad b \\neq a' },
        { number: 2, description: 'The word "iso" means equal, "sceles" relates to legs', latex: '\\text{Isosceles} = \\text{equal legs}' },
        { number: 3, description: 'The angles opposite the equal sides are also equal', latex: '\\angle A = \\angle B' }
      ]
    },
    hints: [
      { level: 'gentle', text: '"Iso-" means same or equal (like in "isotope").' },
      { level: 'moderate', text: 'If two sides are equal, the angles opposite those sides are also equal.' },
      { level: 'explicit', text: 'An isosceles triangle has exactly 2 equal sides.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Triangle Classification',
      skills: ['shape-recognition', 'triangle-properties'],
      prerequisites: ['triangles'],
      concepts: ['isosceles', 'congruent-sides'],
      commonMistakes: ['Confusing with equilateral', 'Thinking the base must be shortest'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 55
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'triangles', 'isosceles']
    }
  },
  {
    id: 'geom-v2-g5-shapes-010',
    version: 2,
    type: 'geometry',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A triangle has all three sides different lengths. What type of triangle is it?'
    },
    answer: {
      type: 'exact',
      correct: 'scalene',
      acceptable: ['scalene', 'Scalene', 'scalene triangle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 240,
        description: 'A scalene triangle with all three sides labeled with different values: a, b, and c',
        elements: [
          { type: 'polygon', props: { points: '40,180 260,180 180,40', stroke: '#0369a1', strokeWidth: 2.5, fill: '#e0f2fe' } },
          { type: 'text', props: { x: 60, y: 110, text: 'a', fontSize: 16, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 225, y: 95, text: 'b', fontSize: 16, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 200, text: 'c', fontSize: 16, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 130, text: 'SCALENE', fontSize: 14, fill: '#0369a1', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 230, text: 'a ≠ b ≠ c (all sides different)', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: no two sides are equal', latex: 'a \\neq b \\neq c' },
        { number: 2, description: 'This is the definition of a scalene triangle', latex: '\\text{Scalene: all sides different}' },
        { number: 3, description: 'All three angles are also different', latex: '\\angle A \\neq \\angle B \\neq \\angle C' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of "scale" - all the sides are "scaled" differently!' },
      { level: 'moderate', text: 'No two sides are the same length in this triangle type.' },
      { level: 'explicit', text: 'A scalene triangle has 3 different side lengths.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Triangle Classification',
      skills: ['shape-recognition', 'triangle-properties'],
      prerequisites: ['triangles'],
      concepts: ['scalene', 'triangle-types'],
      commonMistakes: ['Confusing with isosceles', 'Thinking it must be a right triangle'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['shapes', '2d', 'triangles', 'scalene']
    }
  },
  // ============================================================================
  // LINES AND RELATIONSHIPS (G6)
  // ============================================================================
  {
    id: 'geom-v2-g6-shapes-011',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'What do we call two lines that never intersect and are always the same distance apart?'
    },
    answer: {
      type: 'exact',
      correct: 'parallel',
      acceptable: ['parallel', 'parallel lines', 'Parallel']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 200,
        description: 'Two parallel horizontal lines with arrows showing they extend infinitely and markings showing equal distance',
        elements: [
          { type: 'line', props: { x1: 30, y1: 70, x2: 270, y2: 70, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 30, y1: 130, x2: 270, y2: 130, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'polygon', props: { points: '270,70 260,65 260,75', stroke: '#2563eb', fill: '#2563eb' } },
          { type: 'polygon', props: { points: '270,130 260,125 260,135', stroke: '#2563eb', fill: '#2563eb' } },
          { type: 'line', props: { x1: 150, y1: 70, x2: 150, y2: 130, stroke: '#dc2626', strokeWidth: 1.5, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 165, y: 105, text: 'd', fontSize: 14, fill: '#dc2626' } },
          { type: 'text', props: { x: 285, y: 70, text: 'l₁', fontSize: 14, fill: '#1e40af' } },
          { type: 'text', props: { x: 285, y: 130, text: 'l₂', fontSize: 14, fill: '#1e40af' } },
          { type: 'text', props: { x: 150, y: 175, text: 'l₁ ∥ l₂ (parallel)', fontSize: 14, fill: '#374151', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 195, text: 'Never intersect, always same distance', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: the lines never cross', latex: 'l_1 \\cap l_2 = \\emptyset' },
        { number: 2, description: 'Identify: they maintain constant distance', latex: 'd_1 = d_2 = d_3 = \\ldots' },
        { number: 3, description: 'These are parallel lines', latex: 'l_1 \\parallel l_2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of train tracks - they never meet!' },
      { level: 'moderate', text: 'Railroad tracks are a perfect example - always the same distance apart.' },
      { level: 'explicit', text: 'Parallel lines never intersect and stay equidistant.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Line Relationships',
      skills: ['spatial-reasoning', 'line-properties'],
      prerequisites: ['lines', 'distance'],
      concepts: ['parallel-lines', 'equidistant'],
      commonMistakes: ['Confusing with perpendicular', 'Thinking they can eventually meet'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['lines', 'parallel', 'relationships']
    }
  },
  {
    id: 'geom-v2-g6-shapes-012',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'What do we call two lines that intersect at a 90° angle?'
    },
    answer: {
      type: 'exact',
      correct: 'perpendicular',
      acceptable: ['perpendicular', 'perpendicular lines', 'Perpendicular']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'Two perpendicular lines forming a cross with a small square marking the 90° angle',
        elements: [
          { type: 'line', props: { x1: 130, y1: 30, x2: 130, y2: 230, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 30, y1: 130, x2: 230, y2: 130, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'rectangle', props: { x: 130, y: 130, width: 20, height: 20, stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 160, y: 115, text: '90°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 145, y: 25, text: 'l₁', fontSize: 14, fill: '#1e40af' } },
          { type: 'text', props: { x: 235, y: 145, text: 'l₂', fontSize: 14, fill: '#1e40af' } },
          { type: 'text', props: { x: 130, y: 250, text: 'l₁ ⊥ l₂ (perpendicular)', fontSize: 14, fill: '#374151', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify: the lines intersect (cross each other)', latex: 'l_1 \\cap l_2 \\neq \\emptyset' },
        { number: 2, description: 'Identify: they form a 90° angle', latex: '\\theta = 90°' },
        { number: 3, description: 'These are perpendicular lines', latex: 'l_1 \\perp l_2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Think of the corner of a book or a wall meeting the floor.' },
      { level: 'moderate', text: 'They form right angles - like a plus sign or a T.' },
      { level: 'explicit', text: 'Perpendicular lines intersect at 90° (right angles).' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Line Relationships',
      skills: ['spatial-reasoning', 'line-properties', 'angle-recognition'],
      prerequisites: ['lines', 'right-angles'],
      concepts: ['perpendicular-lines', 'right-angles'],
      commonMistakes: ['Confusing with parallel', 'Thinking any intersecting lines are perpendicular'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['lines', 'perpendicular', 'relationships', 'right-angles']
    }
  }
]
