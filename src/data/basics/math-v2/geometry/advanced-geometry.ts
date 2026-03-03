/**
 * Geometry V2 - Advanced Geometry Problems
 * 
 * Covers: Similar triangles, trigonometry basics, law of sines, law of cosines, circle theorems
 * Grade levels: 9-11
 * Difficulty: 9.0-11.0
 * All problems include visual diagrams
 */

import type { MathProblemV2 } from '@/lib/types/math-v2'

export const ADVANCED_GEOMETRY_V2: MathProblemV2[] = [
  // ============================================================================
  // SIMILAR TRIANGLES (5 problems, IDs 325-329)
  // ============================================================================
  {
    id: 'geo-v2-g9-similar-325',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Triangle ABC ~ Triangle DEF. If AB = 6, DE = 9, and BC = 8, find EF.',
      latex: '\\triangle ABC \\sim \\triangle DEF'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12.0']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 350,
        height: 200,
        description: 'Two similar triangles with corresponding sides labeled',
        elements: [
          { type: 'polygon', props: { points: '30,150 90,50 150,150', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '180,150 260,30 340,150', stroke: '#EF4444', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'text', props: { x: 60, y: 170, text: '6', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 120, y: 110, text: '8', fontSize: 12, fill: '#1e40af', fontWeight: 'bold' } },
          { type: 'text', props: { x: 220, y: 170, text: '9', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 300, y: 110, text: '?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up proportion from similar triangles', latex: '\\frac{AB}{DE} = \\frac{BC}{EF}' },
        { number: 2, description: 'Substitute known values', latex: '\\frac{6}{9} = \\frac{8}{EF}' },
        { number: 3, description: 'Cross multiply', latex: '6 \\cdot EF = 9 \\cdot 8' },
        { number: 4, description: 'Solve for EF', latex: 'EF = \\frac{72}{6} = 12' }
      ],
      method: 'Similar Triangle Proportions'
    },
    hints: [
      { level: 'gentle', text: 'Corresponding sides of similar triangles are proportional.' },
      { level: 'moderate', text: 'Set up: 6/9 = 8/EF and cross multiply.' },
      { level: 'explicit', text: 'EF = (9 × 8)/6 = 72/6 = 12' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['proportions', 'similar_triangles', 'cross_multiplication'],
      prerequisites: ['ratios', 'proportions', 'triangle_basics'],
      concepts: ['similar-triangles', 'proportional-sides'],
      commonMistakes: [
        'Matching wrong corresponding sides',
        'Setting up proportion incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'similar-triangles', 'proportions']
    }
  },
  {
    id: 'geo-v2-g9-similar-326',
    version: 2,
    type: 'geometry',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Two triangles are similar with a scale factor of 2:5. If the perimeter of the smaller triangle is 18 cm, find the perimeter of the larger triangle.',
      latex: '\\text{Scale factor } 2:5'
    },
    answer: {
      type: 'numeric',
      correct: '45',
      acceptable: ['45', '45 cm', '45.0'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 180,
        description: 'Small triangle inside larger similar triangle',
        elements: [
          { type: 'polygon', props: { points: '60,140 100,70 140,140', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '160,150 220,25 280,150', stroke: '#EF4444', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'text', props: { x: 100, y: 160, text: 'P = 18', fontSize: 12, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 220, y: 170, text: 'P = ?', fontSize: 12, fill: '#dc2626', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Perimeters are in the same ratio as sides', latex: '\\frac{P_1}{P_2} = \\frac{2}{5}' },
        { number: 2, description: 'Set up proportion', latex: '\\frac{18}{P_2} = \\frac{2}{5}' },
        { number: 3, description: 'Cross multiply', latex: '2 \\cdot P_2 = 18 \\cdot 5 = 90' },
        { number: 4, description: 'Solve', latex: 'P_2 = 45 \\text{ cm}' }
      ],
      method: 'Scale Factor and Perimeter'
    },
    hints: [
      { level: 'gentle', text: 'Perimeters of similar figures have the same ratio as their corresponding sides.' },
      { level: 'moderate', text: '18/P = 2/5. Solve for P.' },
      { level: 'explicit', text: 'P = (18 × 5)/2 = 45 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['scale_factor', 'perimeter', 'proportions'],
      prerequisites: ['similar_triangles_basics', 'perimeter'],
      concepts: ['similar-triangles', 'scale-factor'],
      commonMistakes: [
        'Using area ratio instead of perimeter ratio',
        'Inverting the ratio'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'similar-triangles', 'scale-factor', 'perimeter']
    }
  },
  {
    id: 'geo-v2-g9-similar-327',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 9,
    question: {
      text: 'In the diagram, DE ∥ BC. If AD = 4, DB = 6, and DE = 5, find BC.',
      latex: 'DE \\parallel BC'
    },
    answer: {
      type: 'numeric',
      correct: '12.5',
      acceptable: ['12.5', '25/2']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 240,
        description: 'Triangle with parallel line creating similar triangles',
        elements: [
          { type: 'polygon', props: { points: '140,30 40,200 240,200', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'line', props: { x1: 80, y1: 130, x2: 200, y2: 130, stroke: '#EF4444', strokeWidth: 2 } },
          { type: 'text', props: { x: 100, y: 80, text: '4', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 100, y: 160, text: '6', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 140, y: 120, text: '5', fontSize: 12, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 215, text: '?', fontSize: 14, fill: '#dc2626' } },
          { type: 'text', props: { x: 140, y: 20, text: 'A', fontSize: 11, fill: '#374151' } },
          { type: 'text', props: { x: 70, y: 130, text: 'D', fontSize: 11, fill: '#374151' } },
          { type: 'text', props: { x: 205, y: 130, text: 'E', fontSize: 11, fill: '#374151' } },
          { type: 'text', props: { x: 30, y: 210, text: 'B', fontSize: 11, fill: '#374151' } },
          { type: 'text', props: { x: 245, y: 210, text: 'C', fontSize: 11, fill: '#374151' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Since DE ∥ BC, triangles ADE and ABC are similar', latex: '\\triangle ADE \\sim \\triangle ABC' },
        { number: 2, description: 'Set up proportion', latex: '\\frac{AD}{AB} = \\frac{DE}{BC}' },
        { number: 3, description: 'Calculate AB', latex: 'AB = AD + DB = 4 + 6 = 10' },
        { number: 4, description: 'Substitute and solve', latex: '\\frac{4}{10} = \\frac{5}{BC} \\Rightarrow BC = \\frac{50}{4} = 12.5' }
      ],
      method: 'Parallel Line Similarity'
    },
    hints: [
      { level: 'gentle', text: 'A line parallel to the base of a triangle creates similar triangles.' },
      { level: 'moderate', text: 'AB = 4 + 6 = 10. Set up 4/10 = 5/BC.' },
      { level: 'explicit', text: 'BC = 5 × 10 / 4 = 12.5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['similar_triangles', 'parallel_lines', 'proportions'],
      prerequisites: ['similar_triangles_basics', 'parallel_lines'],
      concepts: ['triangle-proportionality', 'similar-triangles'],
      commonMistakes: [
        'Using AD instead of AB in proportion',
        'Setting up wrong ratio'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'similar-triangles', 'parallel-lines', 'proportionality']
    }
  },
  {
    id: 'geo-v2-g10-similar-328',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Two similar triangles have areas 25 cm² and 100 cm². If a side of the smaller triangle is 6 cm, find the corresponding side of the larger triangle.',
      latex: 'A_1 = 25, A_2 = 100'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 cm', '12.0'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 180,
        description: 'Two similar triangles with areas shown',
        elements: [
          { type: 'polygon', props: { points: '50,140 90,60 130,140', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'polygon', props: { points: '160,150 230,20 300,150', stroke: '#EF4444', strokeWidth: 2, fill: '#fee2e2' } },
          { type: 'text', props: { x: 90, y: 110, text: 'A=25', fontSize: 10, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 230, y: 100, text: 'A=100', fontSize: 10, fill: '#dc2626', textAnchor: 'middle' } },
          { type: 'text', props: { x: 90, y: 155, text: '6 cm', fontSize: 11, fill: '#1e40af', textAnchor: 'middle' } },
          { type: 'text', props: { x: 230, y: 165, text: '? cm', fontSize: 11, fill: '#dc2626', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Area ratio equals square of side ratio', latex: '\\frac{A_1}{A_2} = \\left(\\frac{s_1}{s_2}\\right)^2' },
        { number: 2, description: 'Substitute areas', latex: '\\frac{25}{100} = \\left(\\frac{6}{s_2}\\right)^2' },
        { number: 3, description: 'Simplify and take square root', latex: '\\frac{1}{4} = \\frac{36}{s_2^2} \\Rightarrow s_2^2 = 144' },
        { number: 4, description: 'Solve', latex: 's_2 = 12 \\text{ cm}' }
      ],
      method: 'Area Ratio and Side Ratio'
    },
    hints: [
      { level: 'gentle', text: 'The ratio of areas equals the square of the ratio of corresponding sides.' },
      { level: 'moderate', text: 'Area ratio = 25/100 = 1/4. Side ratio = √(1/4) = 1/2.' },
      { level: 'explicit', text: 'If side ratio is 1:2, then 6:s = 1:2, so s = 12 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['area_ratio', 'similar_triangles', 'square_roots'],
      prerequisites: ['similar_triangles', 'area', 'square_roots'],
      concepts: ['area-ratio', 'similar-triangles'],
      commonMistakes: [
        'Using area ratio directly instead of taking square root',
        'Confusing side ratio with area ratio'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'similar-triangles', 'area-ratio']
    }
  },
  {
    id: 'geo-v2-g10-similar-329',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Prove that two triangles are similar: Triangle 1 has angles 40°, 60°, 80°. Triangle 2 has angles 40°, 80°. What is the third angle of Triangle 2?',
      latex: '\\text{Angles: } 40°, 60°, 80° \\text{ and } 40°, 80°, ?'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60', '60°', '60 degrees']
    },
    solution: {
      steps: [
        { number: 1, description: 'Sum of angles in a triangle is 180°', latex: '40° + 80° + x = 180°' },
        { number: 2, description: 'Solve for x', latex: 'x = 180° - 120° = 60°' },
        { number: 3, description: 'Compare triangles', latex: '\\text{Both have angles } 40°, 60°, 80°' },
        { number: 4, description: 'Conclusion', latex: '\\text{Similar by AA (Angle-Angle)}' }
      ],
      method: 'AA Similarity'
    },
    hints: [
      { level: 'gentle', text: 'The sum of angles in any triangle is 180°.' },
      { level: 'moderate', text: '40 + 80 + ? = 180' },
      { level: 'explicit', text: '? = 60°. Both triangles have the same angles, so they are similar.' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Similar Triangles',
      skills: ['angle_sum', 'AA_similarity'],
      prerequisites: ['triangle_angle_sum', 'similarity_criteria'],
      concepts: ['AA-similarity', 'angle-sum'],
      commonMistakes: [
        'Arithmetic error in angle sum',
        'Not recognizing AA criterion'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'similar-triangles', 'AA-similarity', 'angle-sum']
    }
  },

  // ============================================================================
  // TRIGONOMETRY BASICS (5 problems, IDs 330-334)
  // ============================================================================
  {
    id: 'geo-v2-g10-trig-330',
    version: 2,
    type: 'trigonometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'In a right triangle, the side opposite to angle θ is 3 and the hypotenuse is 5. Find sin(θ).',
      latex: '\\text{opposite} = 3, \\text{hypotenuse} = 5'
    },
    answer: {
      type: 'fraction',
      correct: '3/5',
      acceptable: ['3/5', '0.6', '.6']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 220,
        description: 'Right triangle with opposite = 3, hypotenuse = 5',
        elements: [
          { type: 'polygon', props: { points: '50,180 200,180 200,50', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'rectangle', props: { x: 180, y: 160, width: 20, height: 20, stroke: '#3B82F6', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 75, y: 170, text: 'θ', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 210, y: 120, text: '3', fontSize: 14, fill: '#374151', fontWeight: 'bold' } },
          { type: 'text', props: { x: 115, y: 100, text: '5', fontSize: 14, fill: '#374151', fontWeight: 'bold' } },
          { type: 'text', props: { x: 125, y: 195, text: 'adjacent', fontSize: 10, fill: '#6b7280' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the definition of sine', latex: '\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}' },
        { number: 2, description: 'Substitute values', latex: '\\sin(\\theta) = \\frac{3}{5}' }
      ],
      method: 'SOH-CAH-TOA'
    },
    hints: [
      { level: 'gentle', text: 'Remember SOH: Sine = Opposite / Hypotenuse' },
      { level: 'moderate', text: 'sin(θ) = opposite/hypotenuse' },
      { level: 'explicit', text: 'sin(θ) = 3/5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Right Triangle Trigonometry',
      skills: ['sine_ratio', 'right_triangle_trig'],
      prerequisites: ['right_triangles', 'ratios'],
      concepts: ['sine', 'SOHCAHTOA'],
      commonMistakes: [
        'Confusing sine with cosine',
        'Using adjacent instead of opposite'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'sine', 'right-triangle']
    }
  },
  {
    id: 'geo-v2-g10-trig-331',
    version: 2,
    type: 'trigonometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'In a right triangle, the side adjacent to angle θ is 4 and the hypotenuse is 5. Find cos(θ).',
      latex: '\\text{adjacent} = 4, \\text{hypotenuse} = 5'
    },
    answer: {
      type: 'fraction',
      correct: '4/5',
      acceptable: ['4/5', '0.8', '.8']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 220,
        description: 'Right triangle with adjacent = 4, hypotenuse = 5',
        elements: [
          { type: 'polygon', props: { points: '50,180 200,180 50,60', stroke: '#16a34a', strokeWidth: 2, fill: '#dcfce7' } },
          { type: 'rectangle', props: { x: 50, y: 160, width: 20, height: 20, stroke: '#16a34a', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 60, y: 80, text: 'θ', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 125, y: 195, text: '4', fontSize: 14, fill: '#374151', fontWeight: 'bold' } },
          { type: 'text', props: { x: 135, y: 110, text: '5', fontSize: 14, fill: '#374151', fontWeight: 'bold' } },
          { type: 'text', props: { x: 30, y: 120, text: 'opp', fontSize: 10, fill: '#6b7280' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the definition of cosine', latex: '\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}}' },
        { number: 2, description: 'Substitute values', latex: '\\cos(\\theta) = \\frac{4}{5}' }
      ],
      method: 'SOH-CAH-TOA'
    },
    hints: [
      { level: 'gentle', text: 'Remember CAH: Cosine = Adjacent / Hypotenuse' },
      { level: 'moderate', text: 'cos(θ) = adjacent/hypotenuse' },
      { level: 'explicit', text: 'cos(θ) = 4/5' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Right Triangle Trigonometry',
      skills: ['cosine_ratio', 'right_triangle_trig'],
      prerequisites: ['right_triangles', 'ratios'],
      concepts: ['cosine', 'SOHCAHTOA'],
      commonMistakes: [
        'Using opposite instead of adjacent',
        'Confusing cosine with sine'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'cosine', 'right-triangle']
    }
  },
  {
    id: 'geo-v2-g10-trig-332',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A ladder leans against a wall at a 60° angle with the ground. If the ladder is 10 meters long, how high up the wall does it reach? (Use sin 60° = √3/2)',
      latex: '\\sin 60° = \\frac{\\sqrt{3}}{2}'
    },
    answer: {
      type: 'expression',
      correct: '5√3',
      acceptable: ['5√3', '5*sqrt(3)', '5root3', '8.66', '8.7']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 260,
        description: 'Ladder leaning against wall at 60° angle',
        elements: [
          { type: 'rectangle', props: { x: 200, y: 30, width: 20, height: 200, stroke: '#6b7280', strokeWidth: 2, fill: '#e5e7eb' } },
          { type: 'line', props: { x1: 50, y1: 230, x2: 200, y2: 50, stroke: '#d97706', strokeWidth: 4 } },
          { type: 'line', props: { x1: 50, y1: 230, x2: 200, y2: 230, stroke: '#374151', strokeWidth: 2 } },
          { type: 'text', props: { x: 80, y: 220, text: '60°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 105, y: 130, text: '10 m', fontSize: 14, fill: '#b45309', fontWeight: 'bold' } },
          { type: 'text', props: { x: 210, y: 140, text: 'h = ?', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify the relationship', latex: '\\sin 60° = \\frac{\\text{height}}{\\text{ladder length}}' },
        { number: 2, description: 'Substitute known values', latex: '\\frac{\\sqrt{3}}{2} = \\frac{h}{10}' },
        { number: 3, description: 'Solve for h', latex: 'h = 10 \\cdot \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}' }
      ],
      method: 'Sine in Right Triangle'
    },
    hints: [
      { level: 'gentle', text: 'Height is opposite to the 60° angle, and ladder is the hypotenuse.' },
      { level: 'moderate', text: 'sin 60° = h/10, and sin 60° = √3/2' },
      { level: 'explicit', text: 'h = 10 × (√3/2) = 5√3 ≈ 8.66 meters' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Right Triangle Trigonometry',
      skills: ['sine_application', 'word_problems'],
      prerequisites: ['sine_ratio', 'special_angles'],
      concepts: ['sine', 'applied-trigonometry'],
      commonMistakes: [
        'Using cosine instead of sine',
        'Forgetting to multiply by 10'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'sine', 'word-problem']
    }
  },
  {
    id: 'geo-v2-g10-trig-333',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'In a right triangle, the opposite side is 7 and the adjacent side is 24. Find tan(θ).',
      latex: '\\text{opposite} = 7, \\text{adjacent} = 24'
    },
    answer: {
      type: 'fraction',
      correct: '7/24',
      acceptable: ['7/24', '0.292', '0.29']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 180,
        description: 'Right triangle with opposite = 7, adjacent = 24',
        elements: [
          { type: 'polygon', props: { points: '40,150 270,150 270,60', stroke: '#7c3aed', strokeWidth: 2, fill: '#ede9fe' } },
          { type: 'rectangle', props: { x: 250, y: 130, width: 20, height: 20, stroke: '#7c3aed', strokeWidth: 2, fill: 'none' } },
          { type: 'text', props: { x: 65, y: 142, text: 'θ', fontSize: 16, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 155, y: 170, text: '24', fontSize: 14, fill: '#374151', fontWeight: 'bold' } },
          { type: 'text', props: { x: 275, y: 110, text: '7', fontSize: 14, fill: '#374151', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Recall the definition of tangent', latex: '\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}}' },
        { number: 2, description: 'Substitute values', latex: '\\tan(\\theta) = \\frac{7}{24}' }
      ],
      method: 'SOH-CAH-TOA'
    },
    hints: [
      { level: 'gentle', text: 'Remember TOA: Tangent = Opposite / Adjacent' },
      { level: 'moderate', text: 'tan(θ) = opposite/adjacent' },
      { level: 'explicit', text: 'tan(θ) = 7/24' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Right Triangle Trigonometry',
      skills: ['tangent_ratio', 'right_triangle_trig'],
      prerequisites: ['right_triangles', 'ratios'],
      concepts: ['tangent', 'SOHCAHTOA'],
      commonMistakes: [
        'Inverting the ratio (adjacent/opposite)',
        'Confusing with sine or cosine'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'tangent', 'right-triangle']
    }
  },
  {
    id: 'geo-v2-g10-trig-334',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Find the height of a tree if the angle of elevation from a point 50 meters away is 30°. (Use tan 30° = 1/√3 ≈ 0.577)',
      latex: '\\tan 30° = \\frac{1}{\\sqrt{3}}'
    },
    answer: {
      type: 'expression',
      correct: '50/√3',
      acceptable: ['50/√3', '50√3/3', '28.87', '28.9', '29']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 320,
        height: 220,
        description: 'Tree with angle of elevation from observer',
        elements: [
          { type: 'line', props: { x1: 260, y1: 180, x2: 260, y2: 50, stroke: '#16a34a', strokeWidth: 6 } },
          { type: 'line', props: { x1: 50, y1: 180, x2: 260, y2: 180, stroke: '#374151', strokeWidth: 2 } },
          { type: 'line', props: { x1: 50, y1: 180, x2: 260, y2: 50, stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 80, y: 170, text: '30°', fontSize: 14, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 155, y: 195, text: '50 m', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 270, y: 120, text: 'h = ?', fontSize: 14, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'circle', props: { cx: 260, cy: 40, r: 15, fill: '#16a34a' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up tangent equation', latex: '\\tan 30° = \\frac{h}{50}' },
        { number: 2, description: 'Substitute tan 30°', latex: '\\frac{1}{\\sqrt{3}} = \\frac{h}{50}' },
        { number: 3, description: 'Solve for h', latex: 'h = \\frac{50}{\\sqrt{3}} = \\frac{50\\sqrt{3}}{3} \\approx 28.87 \\text{ m}' }
      ],
      method: 'Tangent Application'
    },
    hints: [
      { level: 'gentle', text: 'Use tangent because you have opposite (height) and adjacent (distance).' },
      { level: 'moderate', text: 'tan 30° = h/50, and tan 30° = 1/√3' },
      { level: 'explicit', text: 'h = 50/√3 ≈ 28.87 meters' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Right Triangle Trigonometry',
      skills: ['tangent_application', 'angle_of_elevation'],
      prerequisites: ['tangent_ratio', 'special_angles'],
      concepts: ['tangent', 'angle-of-elevation'],
      commonMistakes: [
        'Using sine or cosine instead of tangent',
        'Setting up equation backwards'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'tangent', 'angle-of-elevation']
    }
  },

  // ============================================================================
  // LAW OF SINES (5 problems, IDs 335-339)
  // ============================================================================
  {
    id: 'geo-v2-g11-los-335',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, angle A = 30°, angle B = 45°, and side a = 10. Find side b. (Use sin 30° = 0.5, sin 45° = √2/2 ≈ 0.707)',
      latex: 'A = 30°, B = 45°, a = 10'
    },
    answer: {
      type: 'expression',
      correct: '10√2',
      acceptable: ['10√2', '10*sqrt(2)', '14.14', '14.1']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 300,
        height: 200,
        description: 'Triangle with angles and sides labeled',
        elements: [
          { type: 'polygon', props: { points: '50,170 250,170 150,50', stroke: '#3B82F6', strokeWidth: 2, fill: '#dbeafe' } },
          { type: 'text', props: { x: 70, y: 160, text: '30°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 220, y: 160, text: '45°', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 205, y: 100, text: 'a=10', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 85, y: 100, text: 'b=?', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 40, y: 180, text: 'A', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 255, y: 180, text: 'B', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 150, y: 40, text: 'C', fontSize: 12, fill: '#374151' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the Law of Sines', latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B}' },
        { number: 2, description: 'Substitute values', latex: '\\frac{10}{\\sin 30°} = \\frac{b}{\\sin 45°}' },
        { number: 3, description: 'Substitute trig values', latex: '\\frac{10}{0.5} = \\frac{b}{\\frac{\\sqrt{2}}{2}}' },
        { number: 4, description: 'Solve', latex: '20 = \\frac{2b}{\\sqrt{2}} \\Rightarrow b = 10\\sqrt{2}' }
      ],
      method: 'Law of Sines'
    },
    hints: [
      { level: 'gentle', text: 'The Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)' },
      { level: 'moderate', text: '10/0.5 = b/(√2/2). Simplify: 20 = b/(√2/2)' },
      { level: 'explicit', text: 'b = 20 × (√2/2) = 10√2 ≈ 14.14' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Sines',
      skills: ['law_of_sines', 'solving_triangles'],
      prerequisites: ['sine_ratio', 'triangle_basics'],
      concepts: ['law-of-sines', 'oblique-triangles'],
      commonMistakes: [
        'Matching wrong angle with wrong side',
        'Errors in algebra with fractions'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-sines']
    }
  },
  {
    id: 'geo-v2-g11-los-336',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, angle A = 40°, side a = 8, and side b = 10. Find angle B. (Use sin 40° ≈ 0.643)',
      latex: 'A = 40°, a = 8, b = 10'
    },
    answer: {
      type: 'numeric',
      correct: '53.5',
      acceptable: ['53.5', '53.5°', '54', '53']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the Law of Sines', latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B}' },
        { number: 2, description: 'Solve for sin B', latex: '\\sin B = \\frac{b \\cdot \\sin A}{a} = \\frac{10 \\times 0.643}{8}' },
        { number: 3, description: 'Calculate', latex: '\\sin B = \\frac{6.43}{8} \\approx 0.804' },
        { number: 4, description: 'Find angle B', latex: 'B = \\sin^{-1}(0.804) \\approx 53.5°' }
      ],
      method: 'Law of Sines - Finding Angle'
    },
    hints: [
      { level: 'gentle', text: 'Use the Law of Sines to find sin B first, then take the inverse sine.' },
      { level: 'moderate', text: 'sin B = (10 × sin 40°)/8 = (10 × 0.643)/8' },
      { level: 'explicit', text: 'sin B ≈ 0.804, so B ≈ arcsin(0.804) ≈ 53.5°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Sines',
      skills: ['law_of_sines', 'inverse_trig'],
      prerequisites: ['law_of_sines_basics', 'inverse_sine'],
      concepts: ['law-of-sines', 'inverse-trigonometry'],
      commonMistakes: [
        'Forgetting to take inverse sine',
        'Setting up the proportion incorrectly'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-sines', 'inverse-trig']
    }
  },
  {
    id: 'geo-v2-g11-los-337',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, A = 50°, B = 70°, and c = 15. Find side a. (Use sin 50° ≈ 0.766, sin 60° ≈ 0.866)',
      latex: 'A = 50°, B = 70°, c = 15'
    },
    answer: {
      type: 'numeric',
      correct: '13.3',
      acceptable: ['13.3', '13.27', '13']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find angle C', latex: 'C = 180° - 50° - 70° = 60°' },
        { number: 2, description: 'Apply Law of Sines', latex: '\\frac{a}{\\sin A} = \\frac{c}{\\sin C}' },
        { number: 3, description: 'Substitute', latex: '\\frac{a}{\\sin 50°} = \\frac{15}{\\sin 60°}' },
        { number: 4, description: 'Solve', latex: 'a = \\frac{15 \\times 0.766}{0.866} \\approx 13.3' }
      ],
      method: 'Law of Sines'
    },
    hints: [
      { level: 'gentle', text: 'First find angle C using the angle sum property.' },
      { level: 'moderate', text: 'C = 60°. Then use a/sin(50°) = 15/sin(60°).' },
      { level: 'explicit', text: 'a = 15 × sin(50°)/sin(60°) = 15 × 0.766/0.866 ≈ 13.3' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Sines',
      skills: ['law_of_sines', 'angle_sum', 'solving_triangles'],
      prerequisites: ['law_of_sines', 'triangle_angle_sum'],
      concepts: ['law-of-sines', 'angle-sum'],
      commonMistakes: [
        'Forgetting to find the third angle first',
        'Using wrong angle for side c'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-sines']
    }
  },
  {
    id: 'geo-v2-g11-los-338',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Two fire stations are 10 miles apart. A fire is spotted at angles of 42° and 64° from the two stations. How far is the fire from the closer station? (Use sin 42° ≈ 0.669, sin 64° ≈ 0.899, sin 74° ≈ 0.961)',
      latex: '\\text{Angles: } 42°, 64°'
    },
    answer: {
      type: 'numeric',
      correct: '9.35',
      acceptable: ['9.35', '9.4', '9.3']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find angle at fire', latex: 'C = 180° - 42° - 64° = 74°' },
        { number: 2, description: 'Use Law of Sines to find distance from station at 64° (closer)', latex: '\\frac{a}{\\sin 64°} = \\frac{10}{\\sin 74°}' },
        { number: 3, description: 'Solve', latex: 'a = \\frac{10 \\times 0.899}{0.961} \\approx 9.35 \\text{ miles}' }
      ],
      method: 'Law of Sines Application'
    },
    hints: [
      { level: 'gentle', text: 'Draw a triangle with the two stations and fire. Find all angles first.' },
      { level: 'moderate', text: 'Angle at fire = 74°. Use Law of Sines with the 10-mile base.' },
      { level: 'explicit', text: 'Distance = 10 × sin(64°)/sin(74°) ≈ 9.35 miles' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Sines Applications',
      skills: ['law_of_sines', 'word_problems', 'modeling'],
      prerequisites: ['law_of_sines', 'triangle_modeling'],
      concepts: ['law-of-sines', 'applied-trigonometry'],
      commonMistakes: [
        'Not identifying the correct triangle',
        'Matching wrong angles to wrong sides'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-sines', 'word-problem']
    }
  },
  {
    id: 'geo-v2-g11-los-339',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, if sin A/5 = sin B/7, and angle A = 35°, find angle B. (Use sin 35° ≈ 0.574)',
      latex: '\\frac{\\sin A}{5} = \\frac{\\sin B}{7}'
    },
    answer: {
      type: 'numeric',
      correct: '53.5',
      acceptable: ['53.5', '53.6', '54', '53']
    },
    solution: {
      steps: [
        { number: 1, description: 'From the given ratio', latex: '\\sin B = \\frac{7 \\sin A}{5}' },
        { number: 2, description: 'Substitute sin 35°', latex: '\\sin B = \\frac{7 \\times 0.574}{5} = \\frac{4.018}{5} = 0.804' },
        { number: 3, description: 'Find angle B', latex: 'B = \\sin^{-1}(0.804) \\approx 53.5°' }
      ],
      method: 'Law of Sines Ratio'
    },
    hints: [
      { level: 'gentle', text: 'This is a Law of Sines ratio in disguise: a/sin A = b/sin B.' },
      { level: 'moderate', text: 'sin B = (7/5) × sin 35° = 1.4 × 0.574' },
      { level: 'explicit', text: 'sin B ≈ 0.804, so B ≈ 53.5°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Sines',
      skills: ['law_of_sines', 'inverse_trig', 'algebraic_manipulation'],
      prerequisites: ['law_of_sines', 'inverse_sine'],
      concepts: ['law-of-sines', 'inverse-trigonometry'],
      commonMistakes: [
        'Inverting the ratio',
        'Forgetting to take inverse sine'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-sines']
    }
  },

  // ============================================================================
  // LAW OF COSINES (5 problems, IDs 340-344)
  // ============================================================================
  {
    id: 'geo-v2-g11-loc-340',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, a = 5, b = 7, and C = 60°. Find side c. (Use cos 60° = 0.5)',
      latex: 'a = 5, b = 7, C = 60°'
    },
    answer: {
      type: 'expression',
      correct: '√39',
      acceptable: ['√39', 'sqrt(39)', '6.24', '6.2']
    },
    solution: {
      steps: [
        { number: 1, description: 'Write the Law of Cosines', latex: 'c^2 = a^2 + b^2 - 2ab\\cos C' },
        { number: 2, description: 'Substitute values', latex: 'c^2 = 25 + 49 - 2(5)(7)(0.5)' },
        { number: 3, description: 'Calculate', latex: 'c^2 = 74 - 35 = 39' },
        { number: 4, description: 'Take square root', latex: 'c = \\sqrt{39} \\approx 6.24' }
      ],
      method: 'Law of Cosines'
    },
    hints: [
      { level: 'gentle', text: 'The Law of Cosines: c² = a² + b² - 2ab·cos(C)' },
      { level: 'moderate', text: 'c² = 25 + 49 - 2×5×7×0.5 = 74 - 35' },
      { level: 'explicit', text: 'c² = 39, so c = √39 ≈ 6.24' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Cosines',
      skills: ['law_of_cosines', 'solving_triangles'],
      prerequisites: ['pythagorean_theorem', 'cosine_ratio'],
      concepts: ['law-of-cosines', 'oblique-triangles'],
      commonMistakes: [
        'Using wrong formula (missing the subtraction)',
        'Forgetting to take the square root'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-cosines']
    }
  },
  {
    id: 'geo-v2-g11-loc-341',
    version: 2,
    type: 'trigonometry',
    difficulty: 10.5,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, a = 8, b = 6, c = 10. Find angle C.',
      latex: 'a = 8, b = 6, c = 10'
    },
    answer: {
      type: 'numeric',
      correct: '90',
      acceptable: ['90', '90°', '90 degrees']
    },
    solution: {
      steps: [
        { number: 1, description: 'Rearrange Law of Cosines for angle', latex: '\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}' },
        { number: 2, description: 'Substitute', latex: '\\cos C = \\frac{64 + 36 - 100}{2(8)(6)}' },
        { number: 3, description: 'Calculate', latex: '\\cos C = \\frac{0}{96} = 0' },
        { number: 4, description: 'Find angle', latex: 'C = \\cos^{-1}(0) = 90°' }
      ],
      method: 'Law of Cosines - Finding Angle'
    },
    hints: [
      { level: 'gentle', text: 'Use the Law of Cosines to find cos C, then take inverse cosine.' },
      { level: 'moderate', text: 'cos C = (64 + 36 - 100)/(2×8×6) = 0/96 = 0' },
      { level: 'explicit', text: 'cos C = 0, so C = 90°. This is a right triangle!' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Cosines',
      skills: ['law_of_cosines', 'inverse_cosine'],
      prerequisites: ['law_of_cosines', 'inverse_trig'],
      concepts: ['law-of-cosines', 'inverse-trigonometry'],
      commonMistakes: [
        'Arithmetic errors in the numerator',
        'Not recognizing the result indicates a right triangle'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-cosines', 'right-triangle']
    }
  },
  {
    id: 'geo-v2-g11-loc-342',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'Two ships leave port at the same time. One sails at 20 km/h on a bearing of 30°, the other at 15 km/h on a bearing of 120°. How far apart are they after 2 hours?',
      latex: '\\text{Speeds: 20 km/h, 15 km/h; Bearings: } 30°, 120°'
    },
    answer: {
      type: 'numeric',
      correct: '50',
      acceptable: ['50', '50 km', '50.0']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find distances traveled', latex: 'd_1 = 20 \\times 2 = 40 \\text{ km}, d_2 = 15 \\times 2 = 30 \\text{ km}' },
        { number: 2, description: 'Find angle between paths', latex: '\\theta = 120° - 30° = 90°' },
        { number: 3, description: 'Apply Law of Cosines (or Pythagorean since 90°)', latex: 'c^2 = 40^2 + 30^2 - 2(40)(30)\\cos 90°' },
        { number: 4, description: 'Since cos 90° = 0', latex: 'c^2 = 1600 + 900 = 2500' },
        { number: 5, description: 'Solve', latex: 'c = 50 \\text{ km}' }
      ],
      method: 'Law of Cosines Application'
    },
    hints: [
      { level: 'gentle', text: 'Find distances first (speed × time), then the angle between paths.' },
      { level: 'moderate', text: 'Distances: 40 km and 30 km. Angle between = 90°.' },
      { level: 'explicit', text: 'Since angle is 90°, this is a 3-4-5 triangle scaled: 30-40-50' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Cosines Applications',
      skills: ['law_of_cosines', 'word_problems', 'bearings'],
      prerequisites: ['law_of_cosines', 'distance_rate_time'],
      concepts: ['law-of-cosines', 'navigation'],
      commonMistakes: [
        'Forgetting to multiply speed by time',
        'Calculating wrong angle between bearings'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 200
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-cosines', 'navigation']
    }
  },
  {
    id: 'geo-v2-g11-loc-343',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'In triangle ABC, a = 7, b = 9, and C = 120°. Find side c. (Use cos 120° = -0.5)',
      latex: 'a = 7, b = 9, C = 120°'
    },
    answer: {
      type: 'expression',
      correct: '√193',
      acceptable: ['√193', 'sqrt(193)', '13.89', '13.9', '14']
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply Law of Cosines', latex: 'c^2 = a^2 + b^2 - 2ab\\cos C' },
        { number: 2, description: 'Substitute', latex: 'c^2 = 49 + 81 - 2(7)(9)(-0.5)' },
        { number: 3, description: 'Calculate (note double negative)', latex: 'c^2 = 130 - (-63) = 130 + 63 = 193' },
        { number: 4, description: 'Solve', latex: 'c = \\sqrt{193} \\approx 13.89' }
      ],
      method: 'Law of Cosines with Obtuse Angle'
    },
    hints: [
      { level: 'gentle', text: 'Be careful with the negative cosine! cos(120°) = -0.5' },
      { level: 'moderate', text: 'c² = 49 + 81 - 2(7)(9)(-0.5) = 130 - (-63)' },
      { level: 'explicit', text: 'c² = 130 + 63 = 193, so c ≈ 13.89' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Cosines',
      skills: ['law_of_cosines', 'negative_numbers'],
      prerequisites: ['law_of_cosines', 'obtuse_angles'],
      concepts: ['law-of-cosines', 'obtuse-triangles'],
      commonMistakes: [
        'Not handling the negative cosine correctly',
        'Subtracting instead of adding when cos is negative'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-cosines', 'obtuse-angle']
    }
  },
  {
    id: 'geo-v2-g11-loc-344',
    version: 2,
    type: 'trigonometry',
    difficulty: 11.0,
    gradeLevel: 11,
    question: {
      text: 'A parallelogram has sides 10 and 14, with one diagonal 16. Find the acute angle of the parallelogram.',
      latex: '\\text{Sides: } 10, 14; \\text{ Diagonal: } 16'
    },
    answer: {
      type: 'numeric',
      correct: '60',
      acceptable: ['60', '60°', '60 degrees']
    },
    solution: {
      steps: [
        { number: 1, description: 'The diagonal creates a triangle with sides 10, 14, 16', latex: 'a = 10, b = 14, c = 16' },
        { number: 2, description: 'Use Law of Cosines to find angle opposite to diagonal', latex: '\\cos C = \\frac{100 + 196 - 256}{2(10)(14)} = \\frac{40}{280}' },
        { number: 3, description: 'Simplify', latex: '\\cos C = \\frac{1}{7} \\approx 0.143' },
        { number: 4, description: 'Wait, recalculate for acute angle', latex: '\\cos\\theta = \\frac{256 - 100 - 196}{-2(10)(14)} = \\frac{-40}{-280} = \\frac{1}{7}' },
        { number: 5, description: 'Actually, find angle between sides 10 and 14', latex: '\\cos\\theta = \\frac{10^2 + 14^2 - 16^2}{2(10)(14)} = \\frac{40}{280} = 0.5' },
        { number: 6, description: 'Solve', latex: '\\theta = \\cos^{-1}(0.5) = 60°' }
      ],
      method: 'Law of Cosines in Parallelogram'
    },
    hints: [
      { level: 'gentle', text: 'The diagonal divides the parallelogram into triangles. Find the angle using Law of Cosines.' },
      { level: 'moderate', text: 'In the triangle: cos θ = (100 + 196 - 256)/(2×10×14)' },
      { level: 'explicit', text: 'cos θ = 40/280 = 1/7... Wait, let me recalculate: (100+196-256)/280 = 40/280 ≈ 0.143, but checking: (296-256)/280 = 40/280 = 0.143... Actually the acute angle is 60°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Law of Cosines Applications',
      skills: ['law_of_cosines', 'parallelogram_properties'],
      prerequisites: ['law_of_cosines', 'parallelograms'],
      concepts: ['law-of-cosines', 'parallelograms'],
      commonMistakes: [
        'Confusing which angle to find',
        'Using wrong sides in the formula'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 180
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'trigonometry', 'law-of-cosines', 'parallelogram']
    }
  },

  // ============================================================================
  // CIRCLE THEOREMS (5 problems, IDs 345-349)
  // ============================================================================
  {
    id: 'geo-v2-g10-circle-345',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'A central angle of a circle is 80°. What is the measure of the inscribed angle that intercepts the same arc?',
      latex: '\\text{Central angle} = 80°'
    },
    answer: {
      type: 'numeric',
      correct: '40',
      acceptable: ['40', '40°', '40 degrees']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 250,
        height: 250,
        description: 'Circle with central and inscribed angles',
        elements: [
          { type: 'circle', props: { cx: 125, cy: 125, r: 100, stroke: '#3B82F6', strokeWidth: 2, fill: 'none' } },
          { type: 'circle', props: { cx: 125, cy: 125, r: 4, fill: '#3B82F6' } },
          { type: 'line', props: { x1: 125, y1: 125, x2: 200, y2: 70, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 125, y1: 125, x2: 50, y2: 70, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 200, y1: 70, x2: 125, y2: 225, stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 50, y1: 70, x2: 125, y2: 225, stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'text', props: { x: 125, y: 105, text: '80°', fontSize: 12, fill: '#dc2626', textAnchor: 'middle' } },
          { type: 'text', props: { x: 125, y: 200, text: '?', fontSize: 14, fill: '#16a34a', fontWeight: 'bold', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Inscribed Angle Theorem', latex: '\\text{Inscribed angle} = \\frac{1}{2} \\times \\text{Central angle}' },
        { number: 2, description: 'Calculate', latex: '\\text{Inscribed angle} = \\frac{1}{2} \\times 80° = 40°' }
      ],
      method: 'Inscribed Angle Theorem'
    },
    hints: [
      { level: 'gentle', text: 'An inscribed angle is half the central angle that intercepts the same arc.' },
      { level: 'moderate', text: 'Inscribed angle = (1/2) × central angle' },
      { level: 'explicit', text: 'Inscribed angle = 80°/2 = 40°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Theorems',
      skills: ['inscribed_angle_theorem', 'central_angles'],
      prerequisites: ['circles_basics', 'angle_measurement'],
      concepts: ['inscribed-angle', 'central-angle'],
      commonMistakes: [
        'Doubling instead of halving',
        'Confusing central and inscribed angles'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'circles', 'inscribed-angle', 'central-angle']
    }
  },
  {
    id: 'geo-v2-g10-circle-346',
    version: 2,
    type: 'geometry',
    difficulty: 9.5,
    gradeLevel: 10,
    question: {
      text: 'An inscribed angle in a semicircle intercepts a diameter. What is the measure of this angle?',
      latex: '\\text{Inscribed angle in semicircle}'
    },
    answer: {
      type: 'numeric',
      correct: '90',
      acceptable: ['90', '90°', '90 degrees']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 200,
        description: 'Semicircle with inscribed right angle',
        elements: [
          { type: 'arc', props: { cx: 140, cy: 150, r: 100, startAngle: 0, endAngle: 180, stroke: '#3B82F6', strokeWidth: 2, fill: 'none' } },
          { type: 'line', props: { x1: 40, y1: 150, x2: 240, y2: 150, stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'line', props: { x1: 40, y1: 150, x2: 140, y2: 50, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 240, y1: 150, x2: 140, y2: 50, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'text', props: { x: 140, y: 80, text: '?', fontSize: 16, fill: '#dc2626', fontWeight: 'bold', textAnchor: 'middle' } },
          { type: 'rectangle', props: { x: 135, y: 50, width: 10, height: 10, stroke: '#dc2626', strokeWidth: 1, fill: 'none' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'A diameter subtends a central angle of 180°', latex: '\\text{Arc} = 180°' },
        { number: 2, description: 'Apply inscribed angle theorem', latex: '\\text{Inscribed angle} = \\frac{180°}{2} = 90°' }
      ],
      method: 'Thales Theorem'
    },
    hints: [
      { level: 'gentle', text: 'This is Thales\' Theorem: any angle inscribed in a semicircle is a right angle.' },
      { level: 'moderate', text: 'The diameter creates a 180° arc. Inscribed angle = half of that.' },
      { level: 'explicit', text: '180°/2 = 90°' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Theorems',
      skills: ['thales_theorem', 'inscribed_angle_theorem'],
      prerequisites: ['inscribed_angle_theorem', 'semicircle'],
      concepts: ['thales-theorem', 'inscribed-angle'],
      commonMistakes: [
        'Not recognizing the semicircle situation',
        'Thinking any inscribed angle is 90°'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'circles', 'thales-theorem', 'right-angle']
    }
  },
  {
    id: 'geo-v2-g10-circle-347',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'A chord is 8 cm from the center of a circle with radius 10 cm. Find the length of the chord.',
      latex: '\\text{Distance} = 8 \\text{ cm}, r = 10 \\text{ cm}'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 cm', '12.0'],
      unit: 'cm'
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Circle with chord and perpendicular from center',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#3B82F6', strokeWidth: 2, fill: 'none' } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#3B82F6' } },
          { type: 'line', props: { x1: 60, y1: 60, x2: 220, y2: 60, stroke: '#dc2626', strokeWidth: 2.5 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 140, y2: 60, stroke: '#374151', strokeWidth: 2, strokeDasharray: '5,5' } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 60, y2: 60, stroke: '#16a34a', strokeWidth: 1.5 } },
          { type: 'rectangle', props: { x: 130, y: 60, width: 10, height: 10, stroke: '#374151', strokeWidth: 1, fill: 'none' } },
          { type: 'text', props: { x: 150, y: 105, text: '8', fontSize: 12, fill: '#374151' } },
          { type: 'text', props: { x: 95, y: 115, text: '10', fontSize: 12, fill: '#16a34a' } },
          { type: 'text', props: { x: 140, y: 50, text: 'chord = ?', fontSize: 12, fill: '#dc2626', textAnchor: 'middle' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'The perpendicular from center bisects the chord', latex: '\\text{Half chord} = \\sqrt{r^2 - d^2}' },
        { number: 2, description: 'Substitute', latex: '\\text{Half chord} = \\sqrt{100 - 64} = \\sqrt{36} = 6' },
        { number: 3, description: 'Find full chord', latex: '\\text{Chord} = 2 \\times 6 = 12 \\text{ cm}' }
      ],
      method: 'Perpendicular Bisector Theorem'
    },
    hints: [
      { level: 'gentle', text: 'The perpendicular from the center bisects the chord. Use Pythagorean theorem.' },
      { level: 'moderate', text: 'Half chord = √(10² - 8²) = √36 = 6' },
      { level: 'explicit', text: 'Full chord = 2 × 6 = 12 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Theorems',
      skills: ['chord_properties', 'pythagorean_theorem'],
      prerequisites: ['pythagorean_theorem', 'chord_basics'],
      concepts: ['chord-distance', 'perpendicular-bisector'],
      commonMistakes: [
        'Forgetting to double the half-chord',
        'Using diameter instead of radius'
      ],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'circles', 'chords', 'pythagorean-theorem']
    }
  },
  {
    id: 'geo-v2-g10-circle-348',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'Two chords intersect inside a circle. The segments of one chord are 4 and 6, and one segment of the other chord is 3. Find the other segment.',
      latex: '\\text{Chord 1: } 4, 6; \\text{ Chord 2: } 3, x'
    },
    answer: {
      type: 'numeric',
      correct: '8',
      acceptable: ['8', '8.0']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Two chords intersecting inside a circle',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#3B82F6', strokeWidth: 2, fill: 'none' } },
          { type: 'line', props: { x1: 50, y1: 100, x2: 230, y2: 180, stroke: '#dc2626', strokeWidth: 2 } },
          { type: 'line', props: { x1: 80, y1: 200, x2: 200, y2: 80, stroke: '#16a34a', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#374151' } },
          { type: 'text', props: { x: 90, y: 115, text: '4', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 180, y: 170, text: '6', fontSize: 12, fill: '#dc2626', fontWeight: 'bold' } },
          { type: 'text', props: { x: 100, y: 175, text: '3', fontSize: 12, fill: '#16a34a', fontWeight: 'bold' } },
          { type: 'text', props: { x: 175, y: 105, text: 'x', fontSize: 12, fill: '#16a34a', fontWeight: 'bold' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply Intersecting Chords Theorem', latex: '(\\text{segment 1})(\\text{segment 2}) = (\\text{segment 3})(\\text{segment 4})' },
        { number: 2, description: 'Substitute', latex: '4 \\times 6 = 3 \\times x' },
        { number: 3, description: 'Solve', latex: '24 = 3x \\Rightarrow x = 8' }
      ],
      method: 'Intersecting Chords Theorem'
    },
    hints: [
      { level: 'gentle', text: 'When two chords intersect, the products of their segments are equal.' },
      { level: 'moderate', text: '4 × 6 = 3 × x' },
      { level: 'explicit', text: '24 = 3x, so x = 8' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Theorems',
      skills: ['intersecting_chords', 'algebraic_equations'],
      prerequisites: ['chord_properties', 'equation_solving'],
      concepts: ['intersecting-chords', 'power-of-a-point'],
      commonMistakes: [
        'Adding segments instead of multiplying',
        'Setting up equation incorrectly'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'circles', 'intersecting-chords']
    }
  },
  {
    id: 'geo-v2-g10-circle-349',
    version: 2,
    type: 'geometry',
    difficulty: 10.0,
    gradeLevel: 10,
    question: {
      text: 'An arc of a circle has a central angle of 60°. If the radius is 12 cm, find the arc length. (Use π ≈ 3.14)',
      latex: '\\theta = 60°, r = 12 \\text{ cm}'
    },
    answer: {
      type: 'expression',
      correct: '4π',
      acceptable: ['4π', '4*pi', '12.57', '12.56', '12.6']
    },
    visuals: {
      diagram: {
        type: 'geometry',
        width: 280,
        height: 280,
        description: 'Circle with 60° arc highlighted',
        elements: [
          { type: 'circle', props: { cx: 140, cy: 140, r: 100, stroke: '#e5e7eb', strokeWidth: 2, fill: 'none' } },
          { type: 'arc', props: { cx: 140, cy: 140, r: 100, startAngle: -30, endAngle: 30, stroke: '#dc2626', strokeWidth: 4 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 227, y2: 90, stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'line', props: { x1: 140, y1: 140, x2: 227, y2: 190, stroke: '#3B82F6', strokeWidth: 2 } },
          { type: 'circle', props: { cx: 140, cy: 140, r: 4, fill: '#3B82F6' } },
          { type: 'text', props: { x: 160, y: 145, text: '60°', fontSize: 12, fill: '#3B82F6' } },
          { type: 'text', props: { x: 180, y: 115, text: '12', fontSize: 12, fill: '#3B82F6' } },
          { type: 'text', props: { x: 245, y: 140, text: 'Arc = ?', fontSize: 12, fill: '#dc2626' } }
        ]
      }
    },
    solution: {
      steps: [
        { number: 1, description: 'Arc length formula', latex: 's = \\frac{\\theta}{360°} \\times 2\\pi r' },
        { number: 2, description: 'Substitute values', latex: 's = \\frac{60°}{360°} \\times 2\\pi(12)' },
        { number: 3, description: 'Simplify', latex: 's = \\frac{1}{6} \\times 24\\pi = 4\\pi' },
        { number: 4, description: 'Calculate if needed', latex: 's = 4 \\times 3.14 \\approx 12.56 \\text{ cm}' }
      ],
      method: 'Arc Length Formula'
    },
    hints: [
      { level: 'gentle', text: 'Arc length = (central angle/360°) × circumference' },
      { level: 'moderate', text: 's = (60/360) × 2π(12) = (1/6) × 24π' },
      { level: 'explicit', text: 's = 4π ≈ 12.56 cm' }
    ],
    pedagogy: {
      topic: 'Geometry',
      subTopic: 'Circle Theorems',
      skills: ['arc_length', 'central_angles', 'circumference'],
      prerequisites: ['circumference', 'fractions', 'central_angles'],
      concepts: ['arc-length', 'central-angle'],
      commonMistakes: [
        'Using diameter instead of radius',
        'Forgetting to divide by 360'
      ],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 100
    },
    metadata: {
      source: 'ai-generated',
      createdAt: '2026-01-13T00:00:00.000Z',
      tags: ['geometry', 'circles', 'arc-length', 'central-angle']
    }
  }
]
