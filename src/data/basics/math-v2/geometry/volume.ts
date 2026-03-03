/**
 * Geometry V2 - Volume Problems
 * 
 * Covers: Volume of 3D shapes (cubes, prisms, cylinders, cones, spheres, pyramids)
 * Grade levels: 7-9
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const VOLUME_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // CUBES AND RECTANGULAR PRISMS (G7)
  // ============================================================================
  {
    id: 'geom-v2-g7-vol-001',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the volume of a cube with side length 4 cm.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '64',
      acceptable: ['64 cm³', '64 cubic cm'],
      unit: 'cm³'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A 3D cube with all edges labeled as 4 cm',
        elements: [
          { type: 'polygon', props: { points: '60,180 160,180 200,140 100,140', stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'polygon', props: { points: '160,180 200,140 200,60 160,100', stroke: '#d97706', strokeWidth: 2, fill: '#fde68a' } },
          { type: 'polygon', props: { points: '100,140 200,140 200,60 100,60', stroke: '#d97706', strokeWidth: 2, fill: '#fcd34d' } },
          { type: 'line', props: { x1: 60, y1: 180, x2: 60, y2: 100, stroke: '#d97706', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 100, y2: 60, stroke: '#d97706', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 160, y2: 100, stroke: '#d97706', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 110, y: 200, text: '4 cm', fontSize: 12, fill: '#92400e', fontWeight: 'bold' } },
          { type: 'text', props: { x: 210, y: 105, text: '4 cm', fontSize: 12, fill: '#92400e', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 50, text: '4 cm', fontSize: 12, fill: '#92400e', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 260, text: 'V = s³ = 4³ = 64 cm³', fontSize: 12, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the volume formula for a cube', latex: 'V = s^3' },
        { number: 2, description: 'Substitute the side length', latex: 'V = 4^3' },
        { number: 3, description: 'Calculate the cube', latex: 'V = 4 \\times 4 \\times 4 = 64' },
        { number: 4, description: 'Write with units', latex: 'V = 64 \\text{ cm}^3' }
      ],
      method: 'Cube volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Volume of a cube = side × side × side = s³' },
      { level: 'moderate', text: 'V = 4³ = 4 × 4 × 4' },
      { level: 'explicit', text: '4 × 4 × 4 = 64 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Cubes',
      skills: ['volume-calculation', 'exponents'],
      prerequisites: ['exponents', 'cubes'],
      concepts: ['volume', 'cubic-units', '3d-shapes'],
      commonMistakes: ['Using area formula instead', 'Squaring instead of cubing'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'cubes']
    }
  },
  {
    id: 'geom-v2-g7-vol-002',
    version: 2,
    type: 'geometry',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Find the volume of a rectangular prism with dimensions 5 cm × 3 cm × 2 cm.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '30',
      acceptable: ['30 cm³', '30 cubic cm'],
      unit: 'cm³'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 240,
        description: 'A 3D rectangular prism with dimensions labeled: length 5, width 3, height 2',
        elements: [
          { type: 'polygon', props: { points: '50,160 200,160 240,120 90,120', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '200,160 240,120 240,60 200,100', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '90,120 240,120 240,60 90,60', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'line', props: { x1: 50, y1: 160, x2: 50, y2: 100, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 50, y1: 100, x2: 90, y2: 60, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 50, y1: 100, x2: 200, y2: 100, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 125, y: 180, text: '5 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 250, y: 95, text: '2 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 55, y: 130, text: '3 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 150, y: 225, text: 'V = l × w × h = 5 × 3 × 2 = 30 cm³', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the volume formula for a rectangular prism', latex: 'V = l \\times w \\times h' },
        { number: 2, description: 'Substitute the dimensions', latex: 'V = 5 \\times 3 \\times 2' },
        { number: 3, description: 'Calculate step by step', latex: 'V = 15 \\times 2 = 30' },
        { number: 4, description: 'Write with units', latex: 'V = 30 \\text{ cm}^3' }
      ],
      method: 'Rectangular prism volume'
    },
    hints: [
      { level: 'gentle', text: 'Volume = length × width × height' },
      { level: 'moderate', text: 'V = 5 × 3 × 2' },
      { level: 'explicit', text: '5 × 3 × 2 = 30 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Rectangular Prisms',
      skills: ['volume-calculation', 'multi-step-multiplication'],
      prerequisites: ['multiplication', 'rectangles'],
      concepts: ['volume', 'cubic-units', '3d-shapes'],
      commonMistakes: ['Adding instead of multiplying', 'Confusing with surface area'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 70
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'prisms', 'rectangles']
    }
  },
  // ============================================================================
  // CYLINDERS (G7-8)
  // ============================================================================
  {
    id: 'geom-v2-g7-vol-003',
    version: 2,
    type: 'geometry',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Find the volume of a cylinder with radius 3 cm and height 5 cm. Use π ≈ 3.14.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '141.3',
      acceptable: ['141.3 cm³', '141.3', '45π cm³', '45π'],
      unit: 'cm³',
      tolerance: 0.5
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 300,
        description: 'A cylinder with radius 3 cm and height 5 cm',
        elements: [
          { type: 'ellipse', props: { cx: 130, cy: 80, rx: 70, ry: 25, stroke: '#16a34a', strokeWidth: 2, fill: '#dcfce7' } },
          { type: 'line', props: { x1: 60, y1: 80, x2: 60, y2: 220, stroke: '#16a34a', strokeWidth: 2 } },
          { type: 'line', props: { x1: 200, y1: 80, x2: 200, y2: 220, stroke: '#16a34a', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 130, cy: 220, rx: 70, ry: 25, stroke: '#16a34a', strokeWidth: 2, fill: '#bbf7d0' } },
          { type: 'line', props: { x1: 130, y1: 80, x2: 200, y2: 80, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 130, cy: 80, r: 3, fill: '#dc2626' } },
          { type: 'text', props: { x: 165, y: 70, text: 'r = 3', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 215, y: 150, text: 'h = 5', fontSize: 12, fill: '#15803d', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 275, text: 'V = πr²h = π × 9 × 5 = 45π', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 130, y: 293, text: '≈ 141.3 cm³', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the cylinder volume formula', latex: 'V = \\pi r^2 h' },
        { number: 2, description: 'Substitute radius and height', latex: 'V = \\pi \\times 3^2 \\times 5' },
        { number: 3, description: 'Calculate step by step', latex: 'V = \\pi \\times 9 \\times 5 = 45\\pi' },
        { number: 4, description: 'Compute with π ≈ 3.14', latex: 'V = 3.14 \\times 45 = 141.3 \\text{ cm}^3' }
      ],
      method: 'Cylinder volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Volume of cylinder = π × r² × h' },
      { level: 'moderate', text: 'V = π × 3² × 5 = π × 9 × 5 = 45π' },
      { level: 'explicit', text: '45 × 3.14 = 141.3 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Cylinders',
      skills: ['volume-calculation', 'using-pi', 'exponents'],
      prerequisites: ['circle-area', 'exponents'],
      concepts: ['cylinder-volume', 'base-times-height'],
      commonMistakes: ['Forgetting to square the radius', 'Using diameter instead of radius'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'cylinders', 'pi']
    }
  },
  // ============================================================================
  // CONES AND PYRAMIDS (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-vol-004',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the volume of a cone with radius 4 cm and height 9 cm. Use π ≈ 3.14.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '150.72',
      acceptable: ['150.72 cm³', '150.72', '48π cm³', '48π', '151'],
      unit: 'cm³',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 300,
        description: 'A cone with radius 4 cm at the base and height 9 cm',
        elements: [
          { type: 'ellipse', props: { cx: 130, cy: 240, rx: 70, ry: 25, stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'line', props: { x1: 60, y1: 240, x2: 130, y2: 50, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 200, y1: 240, x2: 130, y2: 50, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 130, y1: 50, x2: 130, y2: 240, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 130, y1: 240, x2: 200, y2: 240, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 130, cy: 50, r: 4, fill: '#92400e' } },
          { type: 'text', props: { x: 165, y: 255, text: 'r = 4', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 150, text: 'h = 9', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 285, text: 'V = ⅓πr²h = ⅓ × π × 16 × 9', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the cone volume formula', latex: 'V = \\frac{1}{3}\\pi r^2 h' },
        { number: 2, description: 'Substitute values', latex: 'V = \\frac{1}{3} \\times \\pi \\times 4^2 \\times 9' },
        { number: 3, description: 'Simplify step by step', latex: 'V = \\frac{1}{3} \\times \\pi \\times 16 \\times 9 = \\frac{144\\pi}{3} = 48\\pi' },
        { number: 4, description: 'Compute with π ≈ 3.14', latex: 'V = 48 \\times 3.14 = 150.72 \\text{ cm}^3' }
      ],
      method: 'Cone volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Cone volume = ⅓ × π × r² × h (one-third of cylinder!)' },
      { level: 'moderate', text: 'V = ⅓ × π × 16 × 9 = 48π' },
      { level: 'explicit', text: '48 × 3.14 = 150.72 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Cones',
      skills: ['volume-calculation', 'fractions', 'using-pi'],
      prerequisites: ['cylinder-volume', 'fractions'],
      concepts: ['cone-volume', 'one-third-relationship'],
      commonMistakes: ['Forgetting the ⅓ factor', 'Using cylinder formula'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'cones', 'pi']
    }
  },
  {
    id: 'geom-v2-g8-vol-005',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A pyramid has a square base with side 6 cm and height 10 cm. Find its volume.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '120',
      acceptable: ['120 cm³', '120 cubic cm'],
      unit: 'cm³'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 300,
        description: 'A square pyramid with base side 6 cm and height 10 cm',
        elements: [
          { type: 'polygon', props: { points: '140,50 70,200 210,200', stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '140,50 210,200 240,170', stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'polygon', props: { points: '70,200 210,200 240,170 100,170', stroke: '#2563eb', strokeWidth: 2, fill: '#60a5fa' } },
          { type: 'line', props: { x1: 140, y1: 50, x2: 100, y2: 170, stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 50, x2: 240, y2: 170, stroke: '#2563eb', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 50, x2: 140, y2: 185, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 140, cy: 50, r: 4, fill: '#1e40af' } },
          { type: 'text', props: { x: 140, y: 220, text: '6 cm', fontSize: 12, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 150, y: 130, text: 'h = 10', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 275, text: 'V = ⅓ × base area × h', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 293, text: '= ⅓ × 36 × 10 = 120 cm³', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the base area (square)', latex: 'B = 6^2 = 36 \\text{ cm}^2' },
        { number: 2, description: 'Apply the pyramid volume formula', latex: 'V = \\frac{1}{3}Bh' },
        { number: 3, description: 'Substitute values', latex: 'V = \\frac{1}{3} \\times 36 \\times 10' },
        { number: 4, description: 'Calculate', latex: 'V = \\frac{360}{3} = 120 \\text{ cm}^3' }
      ],
      method: 'Pyramid volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Pyramid volume = ⅓ × base area × height' },
      { level: 'moderate', text: 'Base area = 6² = 36. Then V = ⅓ × 36 × 10' },
      { level: 'explicit', text: '⅓ × 360 = 120 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Pyramids',
      skills: ['volume-calculation', 'area-calculation', 'fractions'],
      prerequisites: ['square-area', 'fractions'],
      concepts: ['pyramid-volume', 'base-times-height'],
      commonMistakes: ['Forgetting the ⅓ factor', 'Using wrong base area'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'pyramids']
    }
  },
  // ============================================================================
  // SPHERES (G8)
  // ============================================================================
  {
    id: 'geom-v2-g8-vol-006',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Find the volume of a sphere with radius 6 cm. Use π ≈ 3.14.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '904.32',
      acceptable: ['904.32 cm³', '904 cm³', '288π cm³', '288π'],
      unit: 'cm³',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'A sphere with radius 6 cm marked',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#dc2626', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'ellipse', props: { cx: 140, cy: 140, rx: 100, ry: 30, stroke: '#dc2626', strokeWidth: 1, strokeDasharray: '5,5', fill: 'none' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#b91c1c' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 240, y2: 140, stroke: '#b91c1c', strokeWidth: 2 } },
          { type: 'text', props: { x: 190, y: 130, text: 'r = 6', fontSize: 14, fill: '#b91c1c', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 265, text: 'V = ⁴⁄₃πr³ = ⁴⁄₃ × π × 216', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } },
          { type: 'text', props: { x: 140, y: 280, text: '= 288π ≈ 904.32 cm³', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the sphere volume formula', latex: 'V = \\frac{4}{3}\\pi r^3' },
        { number: 2, description: 'Cube the radius', latex: 'r^3 = 6^3 = 216' },
        { number: 3, description: 'Substitute and simplify', latex: 'V = \\frac{4}{3} \\times \\pi \\times 216 = \\frac{864\\pi}{3} = 288\\pi' },
        { number: 4, description: 'Compute with π ≈ 3.14', latex: 'V = 288 \\times 3.14 = 904.32 \\text{ cm}^3' }
      ],
      method: 'Sphere volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Sphere volume = ⁴⁄₃ × π × r³' },
      { level: 'moderate', text: 'r³ = 6³ = 216. Then V = ⁴⁄₃ × π × 216 = 288π' },
      { level: 'explicit', text: '288 × 3.14 = 904.32 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Spheres',
      skills: ['volume-calculation', 'exponents', 'using-pi', 'fractions'],
      prerequisites: ['exponents', 'circles'],
      concepts: ['sphere-volume', 'four-thirds-pi'],
      commonMistakes: ['Using 4/3 × πr² instead of 4/3 × πr³', 'Forgetting to cube'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'spheres', 'pi']
    }
  },
  // ============================================================================
  // REAL-WORLD AND ADVANCED (G8-9)
  // ============================================================================
  {
    id: 'geom-v2-g8-vol-007',
    version: 2,
    type: 'geometry',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A water tank is shaped like a rectangular prism with dimensions 2 m × 1.5 m × 1 m. How many liters of water can it hold? (1 m³ = 1000 L)',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '3000',
      acceptable: ['3000 L', '3000 liters', '3000'],
      unit: 'L'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 260,
        description: 'A water tank shaped like a rectangular prism with dimensions labeled',
        elements: [
          { type: 'polygon', props: { points: '50,180 220,180 260,140 90,140', stroke: '#0369a1', strokeWidth: 2, fill: '#e0f2fe' } },
          { type: 'polygon', props: { points: '220,180 260,140 260,70 220,110', stroke: '#0369a1', strokeWidth: 2, fill: '#7dd3fc' } },
          { type: 'polygon', props: { points: '90,140 260,140 260,70 90,70', stroke: '#0369a1', strokeWidth: 2, fill: '#38bdf8' } },
          { type: 'line', props: { x1: 50, y1: 180, x2: 50, y2: 110, stroke: '#0369a1', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 50, y1: 110, x2: 90, y2: 70, stroke: '#0369a1', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 50, y1: 110, x2: 220, y2: 110, stroke: '#0369a1', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 135, y: 200, text: '2 m', fontSize: 12, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 270, y: 110, text: '1 m', fontSize: 12, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 35, y: 145, text: '1.5 m', fontSize: 12, fill: '#0369a1', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 110, text: '💧', fontSize: 20, textAnchor: 'middle' } },
          { type: 'text', props: { x: 160, y: 240, text: 'V = 2 × 1.5 × 1 = 3 m³ = 3000 L', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate volume in cubic meters', latex: 'V = 2 \\times 1.5 \\times 1 = 3 \\text{ m}^3' },
        { number: 2, description: 'Convert to liters using 1 m³ = 1000 L', latex: 'V = 3 \\times 1000 = 3000 \\text{ L}' }
      ],
      method: 'Volume with unit conversion'
    },
    hints: [
      { level: 'gentle', text: 'First find volume in m³, then convert to liters.' },
      { level: 'moderate', text: 'V = 2 × 1.5 × 1 = 3 m³. Then multiply by 1000.' },
      { level: 'explicit', text: '3 × 1000 = 3000 liters' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Real-World Volume Applications',
      skills: ['volume-calculation', 'unit-conversion'],
      prerequisites: ['rectangular-prism-volume', 'unit-conversion'],
      concepts: ['practical-applications', 'metric-conversions'],
      commonMistakes: ['Forgetting to convert units', 'Wrong conversion factor'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'real-world', 'unit-conversion']
    }
  },
  {
    id: 'geom-v2-g8-vol-008',
    version: 2,
    type: 'geometry',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'The volume of a cube is 125 cm³. What is the length of one side?',
      latex: 's = ?'
    },
    answer: {
      type: 'numeric',
      correct: '5',
      acceptable: ['5 cm', '5cm'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 260,
        height: 260,
        description: 'A cube with volume 125 cm³ and sides marked with "?"',
        elements: [
          { type: 'polygon', props: { points: '60,170 140,170 180,130 100,130', stroke: '#16a34a', strokeWidth: 2, fill: '#dcfce7' } },
          { type: 'polygon', props: { points: '140,170 180,130 180,60 140,100', stroke: '#16a34a', strokeWidth: 2, fill: '#bbf7d0' } },
          { type: 'polygon', props: { points: '100,130 180,130 180,60 100,60', stroke: '#16a34a', strokeWidth: 2, fill: '#86efac' } },
          { type: 'line', props: { x1: 60, y1: 170, x2: 60, y2: 100, stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 100, y2: 60, stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 60, y1: 100, x2: 140, y2: 100, stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 120, y: 120, text: 'V = 125 cm³', fontSize: 12, fill: '#15803d', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 100, y: 190, text: '? cm', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 130, y: 240, text: 'If V = s³, then s = ∛V', fontSize: 11, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Start with the volume formula', latex: 'V = s^3' },
        { number: 2, description: 'Substitute the volume', latex: '125 = s^3' },
        { number: 3, description: 'Take the cube root', latex: 's = \\sqrt[3]{125}' },
        { number: 4, description: 'Calculate the result', latex: 's = 5 \\text{ cm}' }
      ],
      method: 'Reverse cube volume'
    },
    hints: [
      { level: 'gentle', text: 'If V = s³, then s = ∛V (cube root of volume)' },
      { level: 'moderate', text: 's = ∛125. What number times itself 3 times equals 125?' },
      { level: 'explicit', text: '5 × 5 × 5 = 125, so s = 5 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Working Backwards with Volume',
      skills: ['volume-calculation', 'cube-roots'],
      prerequisites: ['cube-volume', 'exponents'],
      concepts: ['inverse-operations', 'cube-roots'],
      commonMistakes: ['Taking square root instead of cube root', 'Dividing by 3'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'cubes', 'working-backwards']
    }
  },
  {
    id: 'geom-v2-g9-vol-009',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Find the volume of a hemisphere with radius 6 cm. Use π ≈ 3.14.',
      latex: 'V = ?'
    },
    answer: {
      type: 'numeric',
      correct: '452.16',
      acceptable: ['452.16 cm³', '452 cm³', '144π cm³', '144π'],
      unit: 'cm³',
      tolerance: 1
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 220,
        description: 'A hemisphere (half sphere) with radius 6 cm',
        elements: [
          { type: 'ellipse', props: { cx: 140, cy: 160, rx: 90, ry: 30, stroke: '#7c3aed', strokeWidth: 2, fill: '#ede9fe' } },
          { type: 'arc', props: { d: 'M 50,160 A 90,90 0 0,1 230,160', stroke: '#7c3aed', strokeWidth: 2, fill: '#ddd6fe' } },
          { type: 'line', props: { x1: 140, y1: 160, x2: 230, y2: 160, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'circle', props: { cx: 140, cy: 160, r: 3, fill: '#7c3aed' } },
          { type: 'text', props: { x: 185, y: 150, text: 'r = 6', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 140, y: 205, text: 'V = ²⁄₃πr³ = ²⁄₃ × π × 216 = 144π', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Hemisphere is half a sphere', latex: 'V_{\\text{hemisphere}} = \\frac{1}{2} \\times \\frac{4}{3}\\pi r^3 = \\frac{2}{3}\\pi r^3' },
        { number: 2, description: 'Cube the radius', latex: 'r^3 = 6^3 = 216' },
        { number: 3, description: 'Substitute and simplify', latex: 'V = \\frac{2}{3} \\times \\pi \\times 216 = 144\\pi' },
        { number: 4, description: 'Compute with π ≈ 3.14', latex: 'V = 144 \\times 3.14 = 452.16 \\text{ cm}^3' }
      ],
      method: 'Hemisphere volume formula'
    },
    hints: [
      { level: 'gentle', text: 'Hemisphere volume = ²⁄₃ × π × r³ (half of sphere)' },
      { level: 'moderate', text: 'V = ²⁄₃ × π × 6³ = ²⁄₃ × π × 216 = 144π' },
      { level: 'explicit', text: '144 × 3.14 = 452.16 cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume of Hemispheres',
      skills: ['volume-calculation', 'fractions', 'using-pi'],
      prerequisites: ['sphere-volume', 'fractions'],
      concepts: ['hemisphere-volume', 'two-thirds-pi'],
      commonMistakes: ['Using full sphere formula', 'Wrong fraction coefficient'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'hemispheres', 'pi']
    }
  },
  {
    id: 'geom-v2-g9-vol-010',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A cone and cylinder have the same radius and height. If the cylinder\'s volume is 90π cm³, what is the cone\'s volume?',
      latex: 'V_{\\text{cone}} = ?'
    },
    answer: {
      type: 'numeric',
      correct: '30π',
      acceptable: ['30π cm³', '30π', '94.2 cm³', '94.2'],
      unit: 'cm³'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 340,
        height: 240,
        description: 'A cylinder and cone side by side with same dimensions',
        elements: [
          { type: 'ellipse', props: { cx: 90, cy: 60, rx: 50, ry: 18, stroke: '#2563eb', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 40, y1: 60, x2: 40, y2: 180, stroke: '#2563eb', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 60, x2: 140, y2: 180, stroke: '#2563eb', strokeWidth: 2 } },
          { type: 'ellipse', props: { cx: 90, cy: 180, rx: 50, ry: 18, stroke: '#2563eb', strokeWidth: 2, fill: '#93c5fd' } },
          { type: 'text', props: { x: 90, y: 125, text: 'V = 90π', fontSize: 11, fill: '#1e40af', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'ellipse', props: { cx: 250, cy: 180, rx: 50, ry: 18, stroke: '#d97706', strokeWidth: 2, fill: '#fef3c7' } },
          { type: 'line', props: { x1: 200, y1: 180, x2: 250, y2: 60, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'line', props: { x1: 300, y1: 180, x2: 250, y2: 60, stroke: '#d97706', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 250, cy: 60, r: 3, fill: '#92400e' } },
          { type: 'text', props: { x: 250, y: 140, text: 'V = ?', fontSize: 11, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'text', props: { x: 90, y: 210, text: 'Cylinder', fontSize: 11, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 250, y: 210, text: 'Cone', fontSize: 11, fill: '#92400e', textAnchor: 'middle' } },
          { type: 'text', props: { x: 170, y: 235, text: 'Cone = ⅓ × Cylinder', fontSize: 10, fill: '#6b7280', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recognize the relationship', latex: 'V_{\\text{cone}} = \\frac{1}{3} V_{\\text{cylinder}}' },
        { number: 2, description: 'Substitute the cylinder volume', latex: 'V_{\\text{cone}} = \\frac{1}{3} \\times 90\\pi' },
        { number: 3, description: 'Calculate', latex: 'V_{\\text{cone}} = 30\\pi \\text{ cm}^3' }
      ],
      method: 'Cone-cylinder relationship'
    },
    hints: [
      { level: 'gentle', text: 'A cone with the same base and height is exactly ⅓ the volume of a cylinder.' },
      { level: 'moderate', text: 'Cone volume = ⅓ × Cylinder volume = ⅓ × 90π' },
      { level: 'explicit', text: '⅓ × 90π = 30π cm³' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Volume Relationships',
      skills: ['volume-calculation', 'proportional-reasoning'],
      prerequisites: ['cone-volume', 'cylinder-volume'],
      concepts: ['volume-relationships', 'one-third-factor'],
      commonMistakes: ['Multiplying by 3 instead of dividing', 'Subtracting instead'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 80
    },
    metadata: {
      source: 'manual',
      createdAt: new Date().toISOString(),
      tags: ['volume', '3d', 'cones', 'cylinders', 'relationships']
    }
  }
]
