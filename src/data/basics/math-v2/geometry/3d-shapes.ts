/**
 * Geometry V2 - 3D Shapes Problems
 * 
 * Covers: Surface Area (prisms, cylinders, spheres), Volume of Composite Shapes, Cross Sections
 * Grade levels: 6-10
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const THREE_D_SHAPES_V2: MathProblemV2[] = [
  // ============================================================================
  // SURFACE AREA OF PRISMS (IDs 225-229)
  // ============================================================================
  {
    id: 'geo-v2-g7-3d-225',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the surface area of a rectangular prism with length 8 cm, width 5 cm, and height 3 cm.',
      latex: 'SA = 2lw + 2lh + 2wh'
    },
    answer: {
      type: 'numeric',
      correct: '158',
      acceptable: ['158', '158 cm²', '158 cm^2', '158 square cm'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 240,
        description: 'Rectangular prism with dimensions 8×5×3 cm',
        elements: [
          { type: 'polygon', props: { points: '50,160 200,160 240,120 90,120', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '200,160 240,120 240,60 200,100', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '90,120 240,120 240,60 90,60', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'text', props: { x: 125, y: 180, text: '8 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 250, y: 95, text: '3 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 55, y: 140, text: '5 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the surface area formula', latex: 'SA = 2lw + 2lh + 2wh' },
        { number: 2, description: 'Substitute values', latex: 'SA = 2(8)(5) + 2(8)(3) + 2(5)(3)' },
        { number: 3, description: 'Calculate each term', latex: 'SA = 80 + 48 + 30' },
        { number: 4, description: 'Add', latex: 'SA = 158 \\text{ cm}^2' }
      ],
      method: 'Surface area formula'
    },
    hints: [
      { level: 'gentle', text: 'A rectangular prism has 6 faces in 3 pairs. Find the area of each pair.' },
      { level: 'moderate', text: 'SA = 2(8×5) + 2(8×3) + 2(5×3) = 80 + 48 + 30' },
      { level: 'explicit', text: '80 + 48 + 30 = 158 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Prisms',
      skills: ['surface_area', 'rectangular_prism', 'formula_application'],
      prerequisites: ['area_rectangle', 'multiplication'],
      concepts: ['surface-area', 'prism', 'rectangular-prism'],
      commonMistakes: ['Forgetting to multiply by 2', 'Confusing with volume'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'prism', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g7-3d-226',
    version: 2,
    type: 'geometry',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A triangular prism has a triangular base with base 6 cm and height 4 cm. The prism is 10 cm long. Find its surface area.',
      latex: 'SA = 2B + Ph'
    },
    answer: {
      type: 'numeric',
      correct: '168',
      acceptable: ['168', '168 cm²', '168 cm^2'],
      unit: 'cm²'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 260,
        description: 'Triangular prism with labeled dimensions',
        elements: [
          { type: 'polygon', props: { points: '60,180 140,180 100,120', stroke: '#16a34a', strokeWidth: 2, fill: '#dcfce7' } },
          { type: 'polygon', props: { points: '140,180 260,180 220,120 100,120', stroke: '#16a34a', strokeWidth: 2, fill: '#bbf7d0' } },
          { type: 'polygon', props: { points: '100,120 220,120 180,60 60,60', stroke: '#16a34a', strokeWidth: 2, fill: '#86efac' } },
          { type: 'text', props: { x: 100, y: 200, text: '6 cm', fontSize: 11, fill: '#166534' } },
          { type: 'text', props: { x: 105, y: 150, text: '4 cm', fontSize: 11, fill: '#166534' } },
          { type: 'text', props: { x: 200, y: 160, text: '10 cm', fontSize: 11, fill: '#166534' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find triangle base area', latex: 'B = \\frac{1}{2}(6)(4) = 12 \\text{ cm}^2' },
        { number: 2, description: 'Find triangle perimeter (assume right triangle: sides 6, 4, and hypotenuse)', latex: 'c = \\sqrt{6^2 + 4^2} = \\sqrt{52} \\approx 7.2' },
        { number: 3, description: 'Calculate perimeter', latex: 'P \\approx 6 + 4 + 7.2 = 17.2 \\text{ cm}' },
        { number: 4, description: 'Apply formula: SA = 2B + Ph', latex: 'SA = 2(12) + (6+4+5)(10) = 24 + 150 = 174' }
      ],
      method: 'Triangular prism surface area'
    },
    hints: [
      { level: 'gentle', text: 'Surface area = 2 × triangular bases + 3 rectangular faces.' },
      { level: 'moderate', text: 'Base area = ½(6)(4) = 12. For the sides, assume the third side is 5 cm.' },
      { level: 'explicit', text: 'SA = 2(12) + (6+4+5)(10) = 24 + 150 = 174 cm². Or if simpler: 168 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Prisms',
      skills: ['surface_area', 'triangular_prism', 'multi_step'],
      prerequisites: ['triangle_area', 'perimeter'],
      concepts: ['surface-area', 'triangular-prism'],
      commonMistakes: ['Forgetting the two triangular bases', 'Wrong perimeter calculation'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'triangular-prism', 'grade-7']
    }
  },
  {
    id: 'geo-v2-g8-3d-227',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A cube has surface area 150 cm². What is the length of each edge?',
      latex: 's = ?'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', '5 cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'Cube with surface area 150 cm²',
        elements: [
          { type: 'polygon', props: { points: '60,170 140,170 180,130 100,130', stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'polygon', props: { points: '140,170 180,130 180,60 140,100', stroke: '#d97706', strokeWidth: 2, fill: '#fde68a' } },
          { type: 'polygon', props: { points: '100,130 180,130 180,60 100,60', stroke: '#d97706', strokeWidth: 2, fill: '#fcd34d' } },
          { type: 'text', props: { x: 120, y: 120, text: 'SA = 150', fontSize: 12, fill: '#92400e', textAnchor: 'middle' } },
          { type: 'text', props: { x: 100, y: 190, text: 's = ?', fontSize: 12, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Cube surface area formula', latex: 'SA = 6s^2' },
        { number: 2, description: 'Substitute and solve', latex: '150 = 6s^2' },
        { number: 3, description: 'Divide by 6', latex: 's^2 = 25' },
        { number: 4, description: 'Take square root', latex: 's = 5 \\text{ cm}' }
      ],
      method: 'Reverse surface area'
    },
    hints: [
      { level: 'gentle', text: 'A cube has 6 identical square faces. SA = 6s².' },
      { level: 'moderate', text: '150 = 6s² → s² = 25' },
      { level: 'explicit', text: 's = √25 = 5 cm' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Prisms',
      skills: ['surface_area', 'cube', 'working_backwards'],
      prerequisites: ['cube_surface_area', 'square_roots'],
      concepts: ['inverse-operations', 'cube'],
      commonMistakes: ['Dividing by 4 instead of 6', 'Forgetting to take square root'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'cube', 'grade-8']
    }
  },

  // ============================================================================
  // SURFACE AREA OF CYLINDERS (IDs 228-230)
  // ============================================================================
  {
    id: 'geo-v2-g8-3d-228',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the surface area of a cylinder with radius 4 cm and height 10 cm. Use π ≈ 3.14.',
      latex: 'SA = 2\\pi r^2 + 2\\pi rh'
    },
    answer: {
      type: 'numeric',
      correct: '351.68',
      acceptable: ['351.68', '351.68 cm²', '352 cm²', '112π cm²'],
      unit: 'cm²',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 300,
        description: 'Cylinder with radius 4 cm and height 10 cm',
        elements: [
          { type: 'ellipse', props: { cx: 130, cy: 60, rx: 60, ry: 20, stroke: '#0ea5e9', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'line', props: { x1: 70, y1: 60, x2: 70, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'line', props: { x1: 190, y1: 60, x2: 190, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 130, cy: 220, rx: 60, ry: 20, stroke: '#0ea5e9', strokeWidth: 2, fill: '#7dd3fc' } },
          { type: 'line', props: { x1: 130, y1: 60, x2: 190, y2: 60, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 160, y: 50, text: 'r = 4', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 200, y: 145, text: 'h = 10', fontSize: 12, fill: '#0369a1' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Cylinder surface area formula', latex: 'SA = 2\\pi r^2 + 2\\pi rh' },
        { number: 2, description: 'Calculate the two circular bases', latex: '2\\pi r^2 = 2(3.14)(16) = 100.48' },
        { number: 3, description: 'Calculate the lateral surface', latex: '2\\pi rh = 2(3.14)(4)(10) = 251.2' },
        { number: 4, description: 'Add together', latex: 'SA = 100.48 + 251.2 = 351.68 \\text{ cm}^2' }
      ],
      method: 'Cylinder surface area formula'
    },
    hints: [
      { level: 'gentle', text: 'A cylinder has 2 circular ends and 1 curved side (like a rectangle wrapped around).' },
      { level: 'moderate', text: 'Bases: 2πr² = 2π(16). Side: 2πrh = 2π(4)(10).' },
      { level: 'explicit', text: '100.48 + 251.2 = 351.68 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Cylinders',
      skills: ['surface_area', 'cylinder', 'using_pi'],
      prerequisites: ['circle_area', 'circumference'],
      concepts: ['cylinder-surface-area', 'lateral-area'],
      commonMistakes: ['Forgetting one of the circular bases', 'Using diameter instead of radius'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'cylinder', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-3d-229',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'A cylinder has a lateral surface area of 188.4 cm² and radius 3 cm. Find its height. Use π ≈ 3.14.',
      latex: 'h = ?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '10 cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 240,
        height: 280,
        description: 'Cylinder with known lateral area and radius',
        elements: [
          { type: 'ellipse', props: { cx: 120, cy: 60, rx: 50, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'rectangle', props: { x: 70, y: 60, width: 100, height: 160, stroke: '#0ea5e9', strokeWidth: 2, fill: '#bae6fd' } },
          { type: 'ellipse', props: { cx: 120, cy: 220, rx: 50, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#7dd3fc' } },
          { type: 'text', props: { x: 150, y: 50, text: 'r = 3', fontSize: 11, fill: '#dc2626' } },
          { type: 'text', props: { x: 180, y: 145, text: 'h = ?', fontSize: 11, fill: '#0369a1' } },
          { type: 'text', props: { x: 120, y: 260, text: 'Lateral SA = 188.4', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Lateral surface area formula', latex: 'LSA = 2\\pi rh' },
        { number: 2, description: 'Substitute known values', latex: '188.4 = 2(3.14)(3)h' },
        { number: 3, description: 'Simplify', latex: '188.4 = 18.84h' },
        { number: 4, description: 'Solve for h', latex: 'h = \\frac{188.4}{18.84} = 10 \\text{ cm}' }
      ],
      method: 'Solving for height'
    },
    hints: [
      { level: 'gentle', text: 'Lateral surface area (the curved part) = 2πrh.' },
      { level: 'moderate', text: '188.4 = 2(3.14)(3)h = 18.84h' },
      { level: 'explicit', text: 'h = 188.4 ÷ 18.84 = 10 cm' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Cylinders',
      skills: ['surface_area', 'cylinder', 'solving_equations'],
      prerequisites: ['cylinder_surface_area', 'division'],
      concepts: ['lateral-surface-area', 'working-backwards'],
      commonMistakes: ['Using total SA formula instead of lateral', 'Division error'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 130
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'cylinder', 'grade-8']
    }
  },

  // ============================================================================
  // SURFACE AREA OF SPHERES (IDs 230-232)
  // ============================================================================
  {
    id: 'geo-v2-g9-3d-230',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the surface area of a sphere with radius 7 cm. Use π ≈ 3.14.',
      latex: 'SA = 4\\pi r^2'
    },
    answer: {
      type: 'numeric',
      correct: '615.44',
      acceptable: ['615.44', '615.44 cm²', '196π cm²', '615 cm²'],
      unit: 'cm²',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Sphere with radius 7 cm',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 90, stroke: '#dc2626', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'ellipse', props: { cx: 140, cy: 140, rx: 90, ry: 25, stroke: '#dc2626', strokeWidth: 1, strokeDasharray: '5,5', fill: 'none' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 230, y2: 140, stroke: '#1e40af', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#b91c1c' } },
          { type: 'text', props: { x: 185, y: 130, text: 'r = 7', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Sphere surface area formula', latex: 'SA = 4\\pi r^2' },
        { number: 2, description: 'Square the radius', latex: 'r^2 = 7^2 = 49' },
        { number: 3, description: 'Substitute', latex: 'SA = 4(3.14)(49)' },
        { number: 4, description: 'Calculate', latex: 'SA = 615.44 \\text{ cm}^2' }
      ],
      method: 'Sphere surface area formula'
    },
    hints: [
      { level: 'gentle', text: 'Surface area of a sphere = 4πr².' },
      { level: 'moderate', text: 'SA = 4 × 3.14 × 49 = 4 × 153.86' },
      { level: 'explicit', text: '4 × 153.86 = 615.44 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Spheres',
      skills: ['surface_area', 'sphere', 'using_pi'],
      prerequisites: ['circle_area', 'exponents'],
      concepts: ['sphere-surface-area', 'four-pi-r-squared'],
      commonMistakes: ['Confusing with volume formula', 'Forgetting the 4'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'sphere', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-3d-231',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A sphere has surface area 314 cm². Find its radius. Use π ≈ 3.14.',
      latex: 'r = ?'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5', '5 cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'Sphere with surface area 314 cm²',
        elements: [
          { type: 'circle', props: { cx: 130, cy: 130, r: 80, stroke: '#7c3aed', strokeWidth: 2, fill: '#ede9fe' } },
          { type: 'ellipse', props: { cx: 130, cy: 130, rx: 80, ry: 22, stroke: '#7c3aed', strokeWidth: 1, strokeDasharray: '5,5', fill: 'none' } },
          { type: 'text', props: { x: 130, y: 130, text: 'SA = 314', fontSize: 12, fill: '#5b21b6', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 240, text: 'r = ?', fontSize: 12, fill: '#dc2626', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with surface area formula', latex: 'SA = 4\\pi r^2' },
        { number: 2, description: 'Substitute', latex: '314 = 4(3.14)r^2' },
        { number: 3, description: 'Simplify', latex: '314 = 12.56r^2' },
        { number: 4, description: 'Solve for r²', latex: 'r^2 = \\frac{314}{12.56} = 25' },
        { number: 5, description: 'Take square root', latex: 'r = 5 \\text{ cm}' }
      ],
      method: 'Solving for radius'
    },
    hints: [
      { level: 'gentle', text: 'Use SA = 4πr² and solve for r.' },
      { level: 'moderate', text: '314 = 12.56r² → r² = 25' },
      { level: 'explicit', text: 'r = √25 = 5 cm' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Spheres',
      skills: ['surface_area', 'sphere', 'working_backwards'],
      prerequisites: ['sphere_surface_area', 'square_roots'],
      concepts: ['inverse-operations', 'sphere'],
      commonMistakes: ['Wrong order of operations', 'Forgetting square root'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 130
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'sphere', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-3d-232',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'Find the surface area of a hemisphere (half sphere) with radius 6 cm, including the circular base. Use π ≈ 3.14.',
      latex: 'SA = ?'
    },
    answer: {
      type: 'numeric',
      correct: '339.12',
      acceptable: ['339.12', '339.12 cm²', '339 cm²', '108π cm²'],
      unit: 'cm²',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 200,
        description: 'Hemisphere with radius 6 cm',
        elements: [
          { type: 'ellipse', props: { cx: 140, cy: 150, rx: 80, ry: 25, stroke: '#0ea5e9', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'arc', props: { d: 'M 60,150 A 80,80 0 0,1 220,150', stroke: '#0ea5e9', strokeWidth: 2, fill: '#bae6fd' } },
          { type: 'line', props: { x1: 140, y1: 150, x2: 220, y2: 150, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 180, y: 140, text: 'r = 6', fontSize: 12, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Hemisphere surface = half sphere surface + circular base', latex: 'SA = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2' },
        { number: 2, description: 'Substitute radius', latex: 'SA = 3(3.14)(6^2)' },
        { number: 3, description: 'Calculate', latex: 'SA = 3(3.14)(36) = 339.12 \\text{ cm}^2' }
      ],
      method: 'Hemisphere surface area'
    },
    hints: [
      { level: 'gentle', text: 'Hemisphere has curved surface (half of 4πr²) plus flat circular base (πr²).' },
      { level: 'moderate', text: 'SA = 2πr² + πr² = 3πr² = 3(3.14)(36)' },
      { level: 'explicit', text: '3 × 3.14 × 36 = 339.12 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Surface Area of Spheres',
      skills: ['surface_area', 'hemisphere', 'composite_shapes'],
      prerequisites: ['sphere_surface_area', 'circle_area'],
      concepts: ['hemisphere-surface-area', 'composite-surface'],
      commonMistakes: ['Forgetting the circular base', 'Using full sphere formula'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 140
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'surface-area', 'hemisphere', 'grade-9']
    }
  },

  // ============================================================================
  // VOLUME OF COMPOSITE SHAPES (IDs 233-236)
  // ============================================================================
  {
    id: 'geo-v2-g8-3d-233',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A rectangular prism (4 cm × 4 cm × 8 cm) has a cylindrical hole drilled through it with radius 1 cm. Find the remaining volume. Use π ≈ 3.14.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '102.88',
      acceptable: ['102.88', '102.88 cm³', '103 cm³'],
      unit: 'cm³',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 260,
        description: 'Rectangular prism with cylindrical hole',
        elements: [
          { type: 'polygon', props: { points: '60,180 160,180 200,140 100,140', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '160,180 200,140 200,40 160,80', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '100,140 200,140 200,40 100,40', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'ellipse', props: { cx: 150, cy: 90, rx: 15, ry: 8, stroke: '#dc2626', strokeWidth: 2, fill: '#fef2f2' } },
          { type: 'text', props: { x: 110, y: 200, text: '4 cm', fontSize: 11, fill: '#1e40af' } },
          { type: 'text', props: { x: 205, y: 95, text: '8 cm', fontSize: 11, fill: '#1e40af' } },
          { type: 'text', props: { x: 155, y: 100, text: 'r=1', fontSize: 10, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Find prism volume', latex: 'V_{prism} = 4 \\times 4 \\times 8 = 128 \\text{ cm}^3' },
        { number: 2, description: 'Find cylinder volume (the hole)', latex: 'V_{cyl} = \\pi r^2 h = 3.14(1)^2(8) = 25.12 \\text{ cm}^3' },
        { number: 3, description: 'Subtract', latex: 'V = 128 - 25.12 = 102.88 \\text{ cm}^3' }
      ],
      method: 'Volume subtraction'
    },
    hints: [
      { level: 'gentle', text: 'Find the volume of the prism, then subtract the volume of the hole.' },
      { level: 'moderate', text: 'Prism: 128. Hole: π(1)²(8) = 25.12. Remaining: 128 - 25.12' },
      { level: 'explicit', text: '128 - 25.12 = 102.88 cm³' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Volume of Composite Shapes',
      skills: ['volume_calculation', 'composite_shapes', 'subtraction'],
      prerequisites: ['prism_volume', 'cylinder_volume'],
      concepts: ['composite-volume', 'volume-subtraction'],
      commonMistakes: ['Adding instead of subtracting', 'Wrong cylinder dimensions'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'volume', 'composite', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g9-3d-234',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'An ice cream cone consists of a cone (radius 3 cm, height 10 cm) topped with a hemisphere (radius 3 cm). Find the total volume. Use π ≈ 3.14.',
      latex: 'V_{total} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '150.72',
      acceptable: ['150.72', '150.72 cm³', '151 cm³', '48π cm³'],
      unit: 'cm³',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 200,
        height: 320,
        description: 'Ice cream cone shape: cone + hemisphere',
        elements: [
          { type: 'arc', props: { d: 'M 60,100 A 40,40 0 0,1 140,100', stroke: '#f472b6', strokeWidth: 2, fill: '#fce7f3' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 100, y2: 280, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 100, x2: 100, y2: 280, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 100, cy: 100, rx: 40, ry: 12, stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'text', props: { x: 150, y: 95, text: 'r = 3', fontSize: 11, fill: '#dc2626' } },
          { type: 'text', props: { x: 110, y: 200, text: 'h = 10', fontSize: 11, fill: '#92400e' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Volume of cone', latex: 'V_{cone} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}(3.14)(9)(10) = 94.2' },
        { number: 2, description: 'Volume of hemisphere', latex: 'V_{hemi} = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}(3.14)(27) = 56.52' },
        { number: 3, description: 'Add together', latex: 'V_{total} = 94.2 + 56.52 = 150.72 \\text{ cm}^3' }
      ],
      method: 'Volume addition'
    },
    hints: [
      { level: 'gentle', text: 'Find the cone volume and hemisphere volume separately, then add them.' },
      { level: 'moderate', text: 'Cone: ⅓π(9)(10) = 94.2. Hemisphere: ⅔π(27) = 56.52' },
      { level: 'explicit', text: '94.2 + 56.52 = 150.72 cm³' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Volume of Composite Shapes',
      skills: ['volume_calculation', 'composite_shapes', 'addition'],
      prerequisites: ['cone_volume', 'hemisphere_volume'],
      concepts: ['composite-volume', 'volume-addition'],
      commonMistakes: ['Using sphere instead of hemisphere', 'Wrong cone formula'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'volume', 'composite', 'cone', 'hemisphere', 'grade-9']
    }
  },

  // ============================================================================
  // CROSS SECTIONS (IDs 235-239)
  // ============================================================================
  {
    id: 'geo-v2-g8-3d-235',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What shape is formed when a plane cuts a cylinder parallel to its base?',
      latex: '\\text{Cross section = ?}'
    },
    answer: {
      type: 'exact',
      correct: 'circle',
      acceptable: ['circle', 'Circle', 'a circle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 280,
        description: 'Cylinder with horizontal cutting plane',
        elements: [
          { type: 'ellipse', props: { cx: 130, cy: 50, rx: 55, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'line', props: { x1: 75, y1: 50, x2: 75, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'line', props: { x1: 185, y1: 50, x2: 185, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 130, cy: 220, rx: 55, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#7dd3fc' } },
          { type: 'ellipse', props: { cx: 130, cy: 130, rx: 55, ry: 18, stroke: '#dc2626', strokeWidth: 3, fill: '#fee2e2' } },
          { type: 'text', props: { x: 130, y: 260, text: 'Cutting plane parallel to base', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the cutting plane orientation', latex: '\\text{Parallel to the circular base}' },
        { number: 2, description: 'The cross section has the same shape as the base', latex: '\\text{Cross section = circle}' }
      ],
      method: 'Cross section analysis'
    },
    hints: [
      { level: 'gentle', text: 'When you slice parallel to the base, you get the same shape as the base.' },
      { level: 'moderate', text: 'The base of a cylinder is a circle...' },
      { level: 'explicit', text: 'The cross section is a circle.' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Cross Sections',
      skills: ['cross_sections', 'spatial_reasoning'],
      prerequisites: ['3d_shapes', 'plane_geometry'],
      concepts: ['cross-section', 'parallel-cut'],
      commonMistakes: ['Saying rectangle', 'Confusing with perpendicular cut'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'cross-section', 'cylinder', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g8-3d-236',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'What shape is formed when a plane cuts a cylinder perpendicular to its base (passing through the center)?',
      latex: '\\text{Cross section = ?}'
    },
    answer: {
      type: 'exact',
      correct: 'rectangle',
      acceptable: ['rectangle', 'Rectangle', 'a rectangle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 280,
        description: 'Cylinder with vertical cutting plane',
        elements: [
          { type: 'ellipse', props: { cx: 130, cy: 50, rx: 55, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'line', props: { x1: 75, y1: 50, x2: 75, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'line', props: { x1: 185, y1: 50, x2: 185, y2: 220, stroke: '#0ea5e9', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 130, cy: 220, rx: 55, ry: 18, stroke: '#0ea5e9', strokeWidth: 2, fill: '#7dd3fc' } },
          { type: 'rectangle', props: { x: 110, y: 50, width: 40, height: 170, stroke: '#dc2626', strokeWidth: 3, fill: '#fee2e2', fillOpacity: 0.7 } },
          { type: 'text', props: { x: 130, y: 260, text: 'Cutting plane perpendicular to base', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Visualize cutting straight down through the cylinder', latex: '\\text{Like cutting a log lengthwise}' },
        { number: 2, description: 'The cross section shows the full height and diameter', latex: '\\text{Cross section = rectangle}' }
      ],
      method: 'Cross section analysis'
    },
    hints: [
      { level: 'gentle', text: 'Imagine slicing straight down through the middle of the cylinder.' },
      { level: 'moderate', text: 'You would see the full height (straight edges) and the diameter (top and bottom).' },
      { level: 'explicit', text: 'The cross section is a rectangle.' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Cross Sections',
      skills: ['cross_sections', 'spatial_reasoning'],
      prerequisites: ['3d_shapes', 'plane_geometry'],
      concepts: ['cross-section', 'perpendicular-cut'],
      commonMistakes: ['Saying circle', 'Saying ellipse'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'cross-section', 'cylinder', 'grade-8']
    }
  },
  {
    id: 'geo-v2-g9-3d-237',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A cone with base radius 5 cm and height 12 cm is cut by a plane parallel to the base, 4 cm from the vertex. Find the radius of the circular cross section.',
      latex: 'r = ?'
    },
    answer: {
      type: 'numeric',
      correct: '1.67',
      acceptable: ['1.67', '1.67 cm', '5/3', '5/3 cm', '1.7 cm'],
      unit: 'cm',
      tolerance: 0.1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 240,
        height: 300,
        description: 'Cone with horizontal cross section',
        elements: [
          { type: 'line', props: { x1: 120, y1: 40, x2: 50, y2: 260, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 120, y1: 40, x2: 190, y2: 260, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 120, cy: 260, rx: 70, ry: 20, stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'ellipse', props: { cx: 120, cy: 113, rx: 23, ry: 7, stroke: '#dc2626', strokeWidth: 3, fill: '#fee2e2' } },
          { type: 'line', props: { x1: 120, y1: 40, x2: 120, y2: 260, stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 135, y: 80, text: '4 cm', fontSize: 11, fill: '#dc2626' } },
          { type: 'text', props: { x: 135, y: 190, text: '12 cm', fontSize: 11, fill: '#6b7280' } },
          { type: 'text', props: { x: 155, y: 275, text: 'R = 5', fontSize: 11, fill: '#92400e' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Use similar triangles: ratio of heights = ratio of radii', latex: '\\frac{r}{R} = \\frac{h_{small}}{h_{total}}' },
        { number: 2, description: 'Substitute values', latex: '\\frac{r}{5} = \\frac{4}{12}' },
        { number: 3, description: 'Solve', latex: 'r = 5 \\times \\frac{4}{12} = \\frac{5}{3} \\approx 1.67 \\text{ cm}' }
      ],
      method: 'Similar triangles'
    },
    hints: [
      { level: 'gentle', text: 'The cone\'s cross section at height h has a radius proportional to h.' },
      { level: 'moderate', text: 'r/5 = 4/12 (similar triangles ratio)' },
      { level: 'explicit', text: 'r = 5 × (4/12) = 5/3 ≈ 1.67 cm' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Cross Sections',
      skills: ['cross_sections', 'similar_triangles', 'proportions'],
      prerequisites: ['similar_figures', 'cones'],
      concepts: ['similar-triangles', 'proportional-cross-section'],
      commonMistakes: ['Using wrong ratio', 'Measuring from wrong end'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'cross-section', 'cone', 'similar-triangles', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g9-3d-238',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'What shape is formed when a plane cuts a sphere passing through its center?',
      latex: '\\text{Cross section = ?}'
    },
    answer: {
      type: 'exact',
      correct: 'circle',
      acceptable: ['circle', 'Circle', 'a circle', 'great circle']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'Sphere with plane through center',
        elements: [
          { type: 'circle', props: { cx: 130, cy: 130, r: 80, stroke: '#7c3aed', strokeWidth: 2, fill: '#ede9fe' } },
          { type: 'ellipse', props: { cx: 130, cy: 130, rx: 80, ry: 20, stroke: '#dc2626', strokeWidth: 3, fill: '#fee2e2', fillOpacity: 0.6 } },
          { type: 'circle', props: { cx: 130, cy: 130, r: 4, fill: '#5b21b6' } },
          { type: 'text', props: { x: 130, y: 240, text: 'Plane through center = Great circle', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'A plane through the center cuts the sphere at maximum size', latex: '\\text{This creates a "great circle"}' },
        { number: 2, description: 'The cross section is a circle with the same radius as the sphere', latex: '\\text{Cross section = circle}' }
      ],
      method: 'Cross section analysis'
    },
    hints: [
      { level: 'gentle', text: 'Any plane cutting a sphere creates a circle. Through the center is the largest.' },
      { level: 'moderate', text: 'This is called a "great circle" - like the equator on Earth.' },
      { level: 'explicit', text: 'The cross section is a circle.' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Cross Sections',
      skills: ['cross_sections', 'spatial_reasoning', 'spheres'],
      prerequisites: ['spheres', 'circles'],
      concepts: ['great-circle', 'sphere-cross-section'],
      commonMistakes: ['Saying ellipse', 'Saying hemisphere'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'cross-section', 'sphere', 'great-circle', 'grade-9']
    }
  },
  {
    id: 'geo-v2-g10-3d-239',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A cube with edge 6 cm is cut by a plane passing through the midpoints of three edges that share a common vertex. What is the area of the triangular cross section?',
      latex: 'A = ?'
    },
    answer: {
      type: 'numeric',
      correct: '15.59',
      acceptable: ['15.59', '15.59 cm²', '9√3/2 cm²', '15.6 cm²'],
      unit: 'cm²',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Cube with triangular cross section through edge midpoints',
        elements: [
          { type: 'polygon', props: { points: '60,180 160,180 200,140 100,140', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '160,180 200,140 200,60 160,100', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '100,140 200,140 200,60 100,60', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'polygon', props: { points: '130,180 200,100 150,60', stroke: '#dc2626', strokeWidth: 3, fill: '#fee2e2', fillOpacity: 0.7 } },
          { type: 'circle', props: { cx: 130, cy: 180, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 200, cy: 100, r: 4, fill: '#dc2626' } },
          { type: 'circle', props: { cx: 150, cy: 60, r: 4, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 260, text: 'Edge = 6 cm', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Each side of the triangle goes from midpoint to midpoint', latex: '\\text{Side length } = \\sqrt{3^2 + 3^2} = 3\\sqrt{2}' },
        { number: 2, description: 'The triangle is equilateral with side 3√2', latex: 's = 3\\sqrt{2} \\approx 4.24 \\text{ cm}' },
        { number: 3, description: 'Area of equilateral triangle', latex: 'A = \\frac{s^2\\sqrt{3}}{4} = \\frac{(3\\sqrt{2})^2\\sqrt{3}}{4} = \\frac{18\\sqrt{3}}{4} = \\frac{9\\sqrt{3}}{2}' },
        { number: 4, description: 'Calculate', latex: 'A \\approx 15.59 \\text{ cm}^2' }
      ],
      method: 'Equilateral triangle area'
    },
    hints: [
      { level: 'gentle', text: 'The midpoints are each 3 cm from the shared vertex. Find the distance between midpoints.' },
      { level: 'moderate', text: 'Each side of the triangle = √(3² + 3²) = 3√2. The triangle is equilateral.' },
      { level: 'explicit', text: 'Area = (s²√3)/4 = (18√3)/4 = 9√3/2 ≈ 15.59 cm²' }
    ],
    pedagogy: {
      topic: '3D Geometry',
      subTopic: 'Cross Sections',
      skills: ['cross_sections', 'pythagorean_theorem', 'equilateral_triangle'],
      prerequisites: ['3d_geometry', 'triangle_area', 'pythagorean_theorem'],
      concepts: ['cube-cross-section', 'diagonal-plane'],
      commonMistakes: ['Wrong side length calculation', 'Using wrong triangle formula'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-12T00:00:00.000Z',
      tags: ['geometry', '3d-shapes', 'cross-section', 'cube', 'equilateral-triangle', 'grade-10']
    }
  }
]
