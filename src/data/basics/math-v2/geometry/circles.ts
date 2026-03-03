/**
 * Geometry V2 - Circle Problems
 * 
 * Covers: Circle properties, parts, arcs, sectors, central angles
 * Grade levels: 6-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const CIRCLES_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // CIRCLE PARTS AND VOCABULARY (G6)
  // ============================================================================
  {
    id: 'geom-v2-g6-circle-001',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'What is the distance from the center of a circle to any point on the circle called?'
    },
    answer: {
      type: 'exact',
      correct: 'radius',
      acceptable: ['radius', 'Radius', 'the radius']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with the radius drawn from center to edge',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 5, fill: '#dc2626' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 240, y2: 140, stroke: '#dc2626', strokeWidth: 3 } },
          { type: 'text', props: { x: 145, y: 155, text: 'center', fontSize: 11, fill: '#1e40af' } },
          { type: 'text', props: { x: 190, y: 130, text: 'radius', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'circle', props: { cx: 240, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 265, text: 'r = radius = distance from center to edge', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the center of the circle', latex: '\\text{Center = fixed point in the middle}' },
        { number: 2, description: 'The distance from center to edge is the radius', latex: 'r = \\text{radius}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It\'s half the diameter.' },
      { level: 'moderate', text: 'The line segment from center to any point on the circle.' },
      { level: 'explicit', text: 'It\'s called the radius.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Vocabulary',
      skills: ['vocabulary', 'circle-properties'],
      prerequisites: ['basic-shapes'],
      concepts: ['radius', 'circle-parts'],
      commonMistakes: ['Confusing with diameter'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 40
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'vocabulary', 'radius']
    }
  },
  {
    id: 'geom-v2-g6-circle-002',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'What is the longest chord of a circle called? (Hint: It passes through the center.)'
    },
    answer: {
      type: 'exact',
      correct: 'diameter',
      acceptable: ['diameter', 'Diameter', 'the diameter']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with the diameter drawn through the center',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 5, fill: '#16a34a' } },
          { type: 'line', props: { x1: 40, y1: 140, x2: 240, y2: 140, stroke: '#16a34a', strokeWidth: 3 } },
          { type: 'circle', props: { cx: 40, cy: 140, r: 4, fill: '#16a34a' } },
          { type: 'circle', props: { cx: 240, cy: 140, r: 4, fill: '#16a34a' } },
          { type: 'text', props: { x: 140, y: 130, text: 'diameter', fontSize: 14, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 265, text: 'd = diameter = 2 × radius', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'A chord is a line segment with both endpoints on the circle', latex: '\\text{Chord connects two points on the circle}' },
        { number: 2, description: 'The longest chord passes through the center', latex: '\\text{Longest chord = diameter}' },
        { number: 3, description: 'Diameter = 2 × radius', latex: 'd = 2r' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'It\'s twice the radius.' },
      { level: 'moderate', text: 'It goes from one edge of the circle through the center to the other edge.' },
      { level: 'explicit', text: 'It\'s called the diameter.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Vocabulary',
      skills: ['vocabulary', 'circle-properties'],
      prerequisites: ['radius'],
      concepts: ['diameter', 'chord'],
      commonMistakes: ['Confusing with radius'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'remember',
      timeEstimate: 45
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'vocabulary', 'diameter']
    }
  },
  {
    id: 'geom-v2-g6-circle-003',
    version: 2,
    type: 'geometry',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A circle has a radius of 7 cm. What is its diameter?',
      latex: 'd = ?'
    },
    answer: {
      type: 'numeric',
      correct: '14',
      acceptable: ['14 cm', '14cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with radius 7 cm marked, asking for diameter',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 240, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 40, y1: 140, x2: 140, y2: 140, stroke: '#16a34a', strokeWidth: 2.5, strokeDasharray: '8,4' } },
          { type: 'text', props: { x: 190, y: 130, text: 'r = 7', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 90, y: 130, text: 'r = 7', fontSize: 14, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'd = 2r = ?', fontSize: 14, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the relationship', latex: 'd = 2r' },
        { number: 2, description: 'Substitute the radius', latex: 'd = 2 \\times 7' },
        { number: 3, description: 'Calculate', latex: 'd = 14 \\text{ cm}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Diameter = 2 × radius' },
      { level: 'moderate', text: 'd = 2 × 7' },
      { level: 'explicit', text: '2 × 7 = 14 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Radius and Diameter Relationship',
      skills: ['multiplication', 'formula-application'],
      prerequisites: ['radius', 'diameter'],
      concepts: ['diameter-radius-relationship'],
      commonMistakes: ['Dividing instead of multiplying'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 50
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'radius', 'diameter']
    }
  },
  // ============================================================================
  // CIRCUMFERENCE AND AREA (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-circle-004',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the circumference of a circle with diameter 14 cm. Use π ≈ 3.14.',
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
        description: 'A circle with diameter 14 cm, showing circumference around the edge',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 3, fill: 'none' } },
          { type: 'line', props: { x1: 50, y1: 140, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 130, text: 'd = 14 cm', fontSize: 14, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 55, text: 'C = πd', fontSize: 14, fill: '#2563eb', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 265, text: 'C = π × 14 ≈ 43.96 cm', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use circumference formula with diameter', latex: 'C = \\pi d' },
        { number: 2, description: 'Substitute the diameter', latex: 'C = \\pi \\times 14 = 14\\pi' },
        { number: 3, description: 'Calculate with π ≈ 3.14', latex: 'C = 3.14 \\times 14 = 43.96 \\text{ cm}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Circumference = π × diameter' },
      { level: 'moderate', text: 'C = 3.14 × 14' },
      { level: 'explicit', text: '3.14 × 14 = 43.96 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circumference',
      skills: ['circumference-calculation', 'using-pi'],
      prerequisites: ['diameter', 'multiplication'],
      concepts: ['circumference', 'pi'],
      commonMistakes: ['Using radius instead of diameter'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'circumference', 'pi']
    }
  },
  {
    id: 'geom-v2-g7-circle-005',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the area of a circle with diameter 12 cm. Use π ≈ 3.14.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '113.04',
      acceptable: ['113.04 cm²', '113 cm²', '36π cm²', '36π'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with diameter 12 cm (radius 6 cm)',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#16a34a', strokeWidth: 2.5, fill: '#dcfce7' } },
          { type: 'line', props: { x1: 50, y1: 140, x2: 230, y2: 140, stroke: '#6b7280', strokeWidth: 1.5, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 155, text: 'd = 12', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 185, y: 130, text: 'r = 6', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'A = πr² = π × 36 ≈ 113.04 cm²', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find radius from diameter', latex: 'r = \\frac{d}{2} = \\frac{12}{2} = 6 \\text{ cm}' },
        { number: 2, description: 'Use area formula', latex: 'A = \\pi r^2' },
        { number: 3, description: 'Substitute and calculate', latex: 'A = \\pi \\times 6^2 = 36\\pi' },
        { number: 4, description: 'Compute with π ≈ 3.14', latex: 'A = 3.14 \\times 36 = 113.04 \\text{ cm}^2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'First find radius: r = diameter ÷ 2. Then use A = πr²' },
      { level: 'moderate', text: 'r = 6, so A = π × 6² = π × 36' },
      { level: 'explicit', text: '3.14 × 36 = 113.04 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Area',
      skills: ['area-calculation', 'using-pi'],
      prerequisites: ['radius-diameter', 'exponents'],
      concepts: ['circle-area', 'pi'],
      commonMistakes: ['Using diameter instead of radius', 'Forgetting to square'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'area', 'pi']
    }
  },
  // ============================================================================
  // ARCS AND CENTRAL ANGLES (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-circle-006',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A central angle of a circle is 60°. What fraction of the circle does this represent?',
      latex: '\\text{fraction} = ?'
    },
    answer: {
      type: 'fraction',
      correct: '1/6',
      acceptable: ['1/6', '⅙', 'one-sixth', '60/360']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with a 60° central angle (sector) shaded',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 185, y2: 62, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'arc', props: { d: 'M 170,140 A 30,30 0 0,0 157,110', stroke: '#dc2626', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 180, y: 130, text: '60°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 265, text: '60° out of 360° = 60/360 = 1/6', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'A full circle is 360°', latex: '\\text{Full circle} = 360°' },
        { number: 2, description: 'Set up the fraction', latex: '\\frac{60°}{360°}' },
        { number: 3, description: 'Simplify', latex: '\\frac{60}{360} = \\frac{1}{6}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'What fraction of 360° is 60°?' },
      { level: 'moderate', text: '60/360 = ?' },
      { level: 'explicit', text: '60/360 = 1/6' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Central Angles',
      skills: ['fraction-simplification', 'proportions'],
      prerequisites: ['fractions', 'circle-degrees'],
      concepts: ['central-angles', 'sectors'],
      commonMistakes: ['Dividing by wrong number', 'Not simplifying'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'central-angles', 'fractions']
    }
  },
  {
    id: 'geom-v2-g8-circle-007',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the arc length of a 90° arc in a circle with radius 8 cm. Use π ≈ 3.14.',
      latex: 'L = ?'
    },
    answer: {
      type: 'numeric',
      correct: '12.56',
      acceptable: ['12.56 cm', '4π cm', '4π', '12.6 cm'],
      unit: 'cm',
      tolerance: 0.1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with a 90° arc highlighted, radius 8 cm',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 2, fill: 'none' } },
          { type: 'arc', props: { d: 'M 230,140 A 90,90 0 0,0 140,50', stroke: '#dc2626', strokeWidth: 4, fill: 'none' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#1e40af', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 140, y2: 50, stroke: '#1e40af', strokeWidth: 2 } },
          { type: 'rectangle', props: { x: 140, y: 120, width: 20, height: 20, stroke: '#16a34a', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 160, y: 110, text: '90°', fontSize: 12, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 155, text: 'r = 8', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 200, y: 85, text: 'arc', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'Arc = (θ/360) × 2πr', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use arc length formula', latex: 'L = \\frac{\\theta}{360°} \\times 2\\pi r' },
        { number: 2, description: 'Substitute values', latex: 'L = \\frac{90}{360} \\times 2 \\times \\pi \\times 8' },
        { number: 3, description: 'Simplify the fraction', latex: 'L = \\frac{1}{4} \\times 16\\pi = 4\\pi' },
        { number: 4, description: 'Calculate with π ≈ 3.14', latex: 'L = 4 \\times 3.14 = 12.56 \\text{ cm}' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Arc length = (angle/360) × circumference' },
      { level: 'moderate', text: 'L = (90/360) × 2πr = (1/4) × 2π × 8 = 4π' },
      { level: 'explicit', text: '4 × 3.14 = 12.56 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Arc Length',
      skills: ['arc-calculation', 'fractions', 'using-pi'],
      prerequisites: ['circumference', 'central-angles'],
      concepts: ['arc-length', 'proportional-parts'],
      commonMistakes: ['Forgetting to multiply by 2π', 'Using area formula'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'arcs', 'arc-length', 'pi']
    }
  },
  // ============================================================================
  // SECTORS (G8-9)
  // ============================================================================
  {
    id: 'geom-v2-g8-circle-008',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the area of a sector with a 120° central angle in a circle with radius 6 cm. Use π ≈ 3.14.',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '37.68',
      acceptable: ['37.68 cm²', '12π cm²', '12π', '37.7 cm²'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with a 120° sector shaded, radius 6 cm',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 2, fill: 'none' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 95, y2: 62, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'arc', props: { d: 'M 170,140 A 30,30 0 0,0 118,105', stroke: '#d97706', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 165, y: 110, text: '120°', fontSize: 12, fill: '#d97706', fontWeight: 'bold' } },
          { type: 'text', props: { x: 185, y: 155, text: 'r = 6', fontSize: 12, fill: '#d97706', fontWeight: 'bold' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#d97706' } },
          { type: 'text', props: { x: 200, y: 80, text: 'Sector', fontSize: 11, fill: '#92400e', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'A = (θ/360) × πr²', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use sector area formula', latex: 'A = \\frac{\\theta}{360°} \\times \\pi r^2' },
        { number: 2, description: 'Substitute values', latex: 'A = \\frac{120}{360} \\times \\pi \\times 6^2' },
        { number: 3, description: 'Simplify', latex: 'A = \\frac{1}{3} \\times 36\\pi = 12\\pi' },
        { number: 4, description: 'Calculate with π ≈ 3.14', latex: 'A = 12 \\times 3.14 = 37.68 \\text{ cm}^2' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'Sector area = (angle/360) × circle area' },
      { level: 'moderate', text: 'A = (120/360) × π × 6² = (1/3) × 36π = 12π' },
      { level: 'explicit', text: '12 × 3.14 = 37.68 cm²' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Sector Area',
      skills: ['area-calculation', 'fractions', 'using-pi'],
      prerequisites: ['circle-area', 'central-angles'],
      concepts: ['sector-area', 'proportional-parts'],
      commonMistakes: ['Forgetting to square the radius', 'Wrong fraction'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'sectors', 'area', 'pi']
    }
  },
  // ============================================================================
  // CHORDS AND INSCRIBED ANGLES (G9)
  // ============================================================================
  {
    id: 'geom-v2-g9-circle-009',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'An inscribed angle intercepts an arc of 100°. What is the measure of the inscribed angle?',
      latex: '\\theta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '50',
      acceptable: ['50°', '50 degrees'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A circle with an inscribed angle and its intercepted arc of 100°',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 90, y1: 220, x2: 230, y2: 140, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 90, y1: 220, x2: 100, y2: 60, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 90, cy: 220, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 230, cy: 140, r: 4, fill: '#16a34a' } },
          { type: 'circle', props: { cx: 100, cy: 60, r: 4, fill: '#16a34a' } },
          { type: 'arc', props: { d: 'M 100,60 A 90,90 0 0,1 230,140', stroke: '#16a34a', strokeWidth: 4, fill: 'none' } },
          { type: 'text', props: { x: 75, y: 200, text: '?°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 190, y: 85, text: '100°', fontSize: 12, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'text', props: { x: 200, y: 100, text: 'arc', fontSize: 10, fill: '#16a34a' } },
          { type: 'text', props: { x: 140, y: 270, text: 'Inscribed angle = ½ × intercepted arc', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the inscribed angle theorem', latex: '\\text{Inscribed angle} = \\frac{1}{2} \\times \\text{intercepted arc}' },
        { number: 2, description: 'Apply the formula', latex: '\\theta = \\frac{1}{2} \\times 100°' },
        { number: 3, description: 'Calculate', latex: '\\theta = 50°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'An inscribed angle is half of its intercepted arc.' },
      { level: 'moderate', text: 'Inscribed angle = ½ × 100°' },
      { level: 'explicit', text: '½ × 100 = 50°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Inscribed Angle Theorem',
      skills: ['theorem-application', 'halving'],
      prerequisites: ['central-angles', 'arcs'],
      concepts: ['inscribed-angles', 'arc-angle-relationship'],
      commonMistakes: ['Using the arc measure directly', 'Doubling instead of halving'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'inscribed-angles', 'theorems']
    }
  },
  {
    id: 'geom-v2-g9-circle-010',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A semicircle has an inscribed angle that subtends the diameter. What is the measure of this angle?',
      latex: '\\theta = ?'
    },
    answer: {
      type: 'numeric',
      correct: '90',
      acceptable: ['90°', '90 degrees', 'right angle'],
      unit: '°'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 200,
        description: 'A semicircle with an inscribed angle at the arc subtending the diameter',
        elements: [
          { type: 'line', props: { x1: 50, y1: 150, x2: 230, y2: 150, stroke: '#2563eb', strokeWidth: 2.5 } },
          { type: 'arc', props: { d: 'M 50,150 A 90,90 0 0,1 230,150', stroke: '#2563eb', strokeWidth: 2.5, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 50, y1: 150, x2: 140, y2: 60, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 230, y1: 150, x2: 140, y2: 60, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 50, cy: 150, r: 4, fill: '#2563eb' } },
          { type: 'circle', props: { cx: 230, cy: 150, r: 4, fill: '#2563eb' } },
          { type: 'circle', props: { cx: 140, cy: 60, r: 4, fill: '#dc2626' } },
          { type: 'rectangle', props: { x: 130, y: 70, width: 15, height: 15, stroke: '#dc2626', strokeWidth: 1.5, fill: 'none' } },
          { type: 'text', props: { x: 140, y: 170, text: 'diameter (180°)', fontSize: 11, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 160, y: 85, text: '90°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 195, text: 'Inscribed in semicircle = 90°', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The diameter creates a 180° arc', latex: '\\text{Semicircle arc} = 180°' },
        { number: 2, description: 'Inscribed angle = half the arc', latex: '\\theta = \\frac{1}{2} \\times 180°' },
        { number: 3, description: 'Calculate', latex: '\\theta = 90°' }
      ]
    },
    hints: [
      { level: 'gentle', text: 'The arc of a semicircle is 180°. What\'s half of that?' },
      { level: 'moderate', text: 'Inscribed angle = ½ × 180°' },
      { level: 'explicit', text: '180 ÷ 2 = 90° (always a right angle!)' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Thales\' Theorem',
      skills: ['theorem-application', 'reasoning'],
      prerequisites: ['inscribed-angles', 'semicircles'],
      concepts: ['thales-theorem', 'right-angles-in-semicircle'],
      commonMistakes: ['Thinking it depends on where the point is on the arc'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['circles', 'inscribed-angles', 'thales-theorem', 'semicircles']
    }
  }
]
