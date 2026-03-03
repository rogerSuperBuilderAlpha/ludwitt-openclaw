import { ReferenceUnit } from '@/lib/types/basics'

export const TRIGONOMETRY_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'trig-unit-1',
    sectionId: 'trigonometry',
    title: 'Right Triangle Trigonometry',
    description: 'Learn SOH-CAH-TOA and solve right triangles using sine, cosine, and tangent.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['SOH-CAH-TOA', 'Right Triangle', 'Sine', 'Cosine', 'Tangent', 'Trig Ratios'],
    sections: [
      {
        id: 'trig-1-1',
        title: 'The Six Trigonometric Ratios',
        content: `In a right triangle, the trig ratios relate the angles to the sides.

For an angle θ in a right triangle:
- The hypotenuse is the longest side (opposite the right angle)
- The opposite side is across from θ
- The adjacent side is next to θ (not the hypotenuse)

SOH-CAH-TOA is the memory device for the three main ratios.`,
        formulas: [
          {
            name: 'Sine',
            latex: '\\sin \\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}',
            description: 'SOH: Sine = Opposite / Hypotenuse'
          },
          {
            name: 'Cosine',
            latex: '\\cos \\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}',
            description: 'CAH: Cosine = Adjacent / Hypotenuse'
          },
          {
            name: 'Tangent',
            latex: '\\tan \\theta = \\frac{\\text{opposite}}{\\text{adjacent}}',
            description: 'TOA: Tangent = Opposite / Adjacent'
          },
          {
            name: 'Reciprocal Ratios',
            latex: '\\csc \\theta = \\frac{1}{\\sin \\theta}, \\quad \\sec \\theta = \\frac{1}{\\cos \\theta}, \\quad \\cot \\theta = \\frac{1}{\\tan \\theta}',
            description: 'Cosecant, Secant, and Cotangent are reciprocals'
          }
        ],
        tips: [
          'SOH-CAH-TOA: Some Old Hippie Caught Another Hippie Tripping On Acid',
          'The hypotenuse is always the longest side and never "opposite" or "adjacent"',
          'Opposite and adjacent depend on which angle you\'re looking at'
        ]
      },
      {
        id: 'trig-1-2',
        title: 'Finding Sides',
        content: `Use trig ratios to find unknown sides when you know an angle and one side.

Strategy:
1. Label the sides (hypotenuse, opposite, adjacent) relative to the known angle
2. Identify which ratio uses the known side and the unknown side
3. Set up the equation and solve`,
        examples: [
          {
            problem: 'Find side x in a right triangle where the angle is 35° and the hypotenuse is 10.',
            steps: [
              'x is opposite to the 35° angle',
              'We have hypotenuse and want opposite → use sine',
              'sin(35°) = x/10',
              'x = 10 × sin(35°)',
              'x ≈ 10 × 0.5736 ≈ 5.74'
            ],
            solution: 'x ≈ 5.74',
            explanation: 'Choose the trig ratio that contains your known and unknown sides'
          }
        ]
      },
      {
        id: 'trig-1-3',
        title: 'Finding Angles',
        content: `Use inverse trig functions (arcsin, arccos, arctan) to find unknown angles when you know two sides.

Notation: sin⁻¹, cos⁻¹, tan⁻¹ or arcsin, arccos, arctan`,
        formulas: [
          {
            name: 'Inverse Sine',
            latex: '\\theta = \\sin^{-1}\\left(\\frac{\\text{opp}}{\\text{hyp}}\\right)',
            description: 'Find angle when you know opposite and hypotenuse'
          },
          {
            name: 'Inverse Cosine',
            latex: '\\theta = \\cos^{-1}\\left(\\frac{\\text{adj}}{\\text{hyp}}\\right)',
            description: 'Find angle when you know adjacent and hypotenuse'
          },
          {
            name: 'Inverse Tangent',
            latex: '\\theta = \\tan^{-1}\\left(\\frac{\\text{opp}}{\\text{adj}}\\right)',
            description: 'Find angle when you know opposite and adjacent'
          }
        ],
        examples: [
          {
            problem: 'Find angle θ if the opposite side is 4 and adjacent side is 7.',
            steps: [
              'We have opposite and adjacent → use tangent',
              'tan(θ) = 4/7',
              'θ = tan⁻¹(4/7)',
              'θ ≈ 29.7°'
            ],
            solution: 'θ ≈ 29.7°',
            explanation: 'Use the inverse function to "undo" the trig ratio'
          }
        ]
      }
    ]
  },
  {
    id: 'trig-unit-2',
    sectionId: 'trigonometry',
    title: 'Special Angles',
    description: 'Memorize exact values for common angles: 0°, 30°, 45°, 60°, 90°.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Special Angles', '30-60-90', '45-45-90', 'Exact Values'],
    sections: [
      {
        id: 'trig-2-1',
        title: 'Special Right Triangles',
        content: `Two special triangles provide exact trig values without a calculator:

45-45-90 Triangle:
- Sides in ratio 1 : 1 : √2
- Both acute angles are 45°

30-60-90 Triangle:
- Sides in ratio 1 : √3 : 2
- Angles are 30°, 60°, 90°
- Shortest side (1) is opposite 30°`,
        formulas: [
          {
            name: '45-45-90 Sides',
            latex: '1 : 1 : \\sqrt{2}',
            description: 'Leg : Leg : Hypotenuse'
          },
          {
            name: '30-60-90 Sides',
            latex: '1 : \\sqrt{3} : 2',
            description: 'Short leg : Long leg : Hypotenuse'
          }
        ]
      },
      {
        id: 'trig-2-2',
        title: 'Exact Trig Values Table',
        content: `Memorize these exact values:

| θ     | sin θ  | cos θ  | tan θ    |
|-------|--------|--------|----------|
| 0°    | 0      | 1      | 0        |
| 30°   | 1/2    | √3/2   | √3/3     |
| 45°   | √2/2   | √2/2   | 1        |
| 60°   | √3/2   | 1/2    | √3       |
| 90°   | 1      | 0      | undefined|

Pattern: For sine, the values go 0, 1/2, √2/2, √3/2, 1
For cosine, it's the reverse!`,
        formulas: [
          {
            name: 'sin(30°)',
            latex: '\\sin(30°) = \\frac{1}{2}',
            description: 'Half'
          },
          {
            name: 'cos(30°)',
            latex: '\\cos(30°) = \\frac{\\sqrt{3}}{2}',
            description: 'Square root of 3 over 2'
          },
          {
            name: 'sin(45°)',
            latex: '\\sin(45°) = \\cos(45°) = \\frac{\\sqrt{2}}{2}',
            description: 'Equal for 45° (isoceles triangle)'
          },
          {
            name: 'tan(45°)',
            latex: '\\tan(45°) = 1',
            description: 'Opposite equals adjacent'
          }
        ],
        tips: [
          'Memory trick: √0/2, √1/2, √2/2, √3/2, √4/2 = 0, 1/2, √2/2, √3/2, 1',
          'Cosine values are sine values in reverse order',
          'tan = sin/cos, so tan(45°) = (√2/2)/(√2/2) = 1'
        ]
      }
    ]
  },
  {
    id: 'trig-unit-3',
    sectionId: 'trigonometry',
    title: 'Unit Circle',
    description: 'Master the unit circle for finding trig values of any angle.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Unit Circle', 'Radians', 'Reference Angles', 'Quadrants'],
    sections: [
      {
        id: 'trig-3-1',
        title: 'The Unit Circle',
        content: `The unit circle is a circle with radius 1 centered at the origin. Any point (x, y) on the unit circle satisfies:
- x = cos θ
- y = sin θ

where θ is the angle from the positive x-axis.

The unit circle extends trig beyond right triangles to any angle!`,
        formulas: [
          {
            name: 'Point on Unit Circle',
            latex: '(\\cos \\theta, \\sin \\theta)',
            description: 'Coordinates of point at angle θ'
          },
          {
            name: 'Fundamental Identity',
            latex: '\\sin^2 \\theta + \\cos^2 \\theta = 1',
            description: 'From x² + y² = 1 on the unit circle'
          }
        ]
      },
      {
        id: 'trig-3-2',
        title: 'Degrees and Radians',
        content: `Radians are an alternative to degrees for measuring angles. One radian is the angle where the arc length equals the radius.

Conversion: π radians = 180°`,
        formulas: [
          {
            name: 'Degrees to Radians',
            latex: '\\text{radians} = \\text{degrees} \\times \\frac{\\pi}{180}',
            description: 'Multiply degrees by π/180'
          },
          {
            name: 'Radians to Degrees',
            latex: '\\text{degrees} = \\text{radians} \\times \\frac{180}{\\pi}',
            description: 'Multiply radians by 180/π'
          },
          {
            name: 'Common Conversions',
            latex: '90° = \\frac{\\pi}{2}, \\quad 60° = \\frac{\\pi}{3}, \\quad 45° = \\frac{\\pi}{4}, \\quad 30° = \\frac{\\pi}{6}',
            description: 'Key angles in radians'
          }
        ],
        tips: [
          '180° = π is the key relationship',
          'Common denominators in radians: 2, 3, 4, 6',
          'A full circle is 2π radians = 360°'
        ]
      },
      {
        id: 'trig-3-3',
        title: 'Reference Angles and Quadrants',
        content: `A reference angle is the acute angle to the x-axis. Use it to find trig values in any quadrant.

Signs by quadrant (ASTC - "All Students Take Calculus"):
- Quadrant I: All positive
- Quadrant II: Sine positive
- Quadrant III: Tangent positive  
- Quadrant IV: Cosine positive`,
        formulas: [
          {
            name: 'Reference Angle in Q2',
            latex: '\\theta_{ref} = 180° - \\theta',
            description: 'For angles in quadrant II'
          },
          {
            name: 'Reference Angle in Q3',
            latex: '\\theta_{ref} = \\theta - 180°',
            description: 'For angles in quadrant III'
          },
          {
            name: 'Reference Angle in Q4',
            latex: '\\theta_{ref} = 360° - \\theta',
            description: 'For angles in quadrant IV'
          }
        ],
        examples: [
          {
            problem: 'Find sin(150°)',
            steps: [
              '150° is in Quadrant II',
              'Reference angle = 180° - 150° = 30°',
              'sin(30°) = 1/2',
              'In Q2, sine is positive',
              'sin(150°) = +1/2'
            ],
            solution: 'sin(150°) = 1/2',
            explanation: 'Find reference angle, get the value, apply correct sign'
          }
        ]
      }
    ]
  },
  {
    id: 'trig-unit-4',
    sectionId: 'trigonometry',
    title: 'Trigonometric Identities',
    description: 'Learn the essential trig identities: Pythagorean, reciprocal, and quotient.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Trig Identities', 'Pythagorean Identity', 'Double Angle', 'Sum and Difference'],
    sections: [
      {
        id: 'trig-4-1',
        title: 'Fundamental Identities',
        content: `These identities are always true and are used to simplify expressions and prove other identities.`,
        formulas: [
          {
            name: 'Pythagorean Identities',
            latex: '\\sin^2 \\theta + \\cos^2 \\theta = 1',
            description: 'The most important identity'
          },
          {
            name: 'Pythagorean (tan/sec)',
            latex: '1 + \\tan^2 \\theta = \\sec^2 \\theta',
            description: 'Divide the first by cos²θ'
          },
          {
            name: 'Pythagorean (cot/csc)',
            latex: '1 + \\cot^2 \\theta = \\csc^2 \\theta',
            description: 'Divide the first by sin²θ'
          },
          {
            name: 'Quotient Identity',
            latex: '\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}',
            description: 'Tangent is sine over cosine'
          }
        ],
        tips: [
          'sin²θ + cos²θ = 1 is derived from the unit circle equation x² + y² = 1',
          'To derive the other Pythagorean identities, divide by sin²θ or cos²θ'
        ]
      },
      {
        id: 'trig-4-2',
        title: 'Sum and Difference Formulas',
        content: `These formulas find trig values of sums or differences of angles.`,
        formulas: [
          {
            name: 'Sine Sum',
            latex: '\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B',
            description: 'Sine of a sum'
          },
          {
            name: 'Sine Difference',
            latex: '\\sin(A - B) = \\sin A \\cos B - \\cos A \\sin B',
            description: 'Sine of a difference'
          },
          {
            name: 'Cosine Sum',
            latex: '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B',
            description: 'Cosine of a sum (note the minus!)'
          },
          {
            name: 'Cosine Difference',
            latex: '\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B',
            description: 'Cosine of a difference'
          }
        ],
        tips: [
          'For sine: sin-cos-cos-sin (alternating)',
          'For cosine: cos-cos, sin-sin (matching)',
          'Sine sum uses +, cosine sum uses − (counterintuitive!)'
        ]
      },
      {
        id: 'trig-4-3',
        title: 'Double Angle Formulas',
        content: `These are special cases of the sum formulas where A = B.`,
        formulas: [
          {
            name: 'Sin Double Angle',
            latex: '\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta',
            description: 'Sine of double angle'
          },
          {
            name: 'Cos Double Angle (version 1)',
            latex: '\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta',
            description: 'Cosine of double angle'
          },
          {
            name: 'Cos Double Angle (version 2)',
            latex: '\\cos(2\\theta) = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta',
            description: 'Alternate forms using Pythagorean identity'
          },
          {
            name: 'Tan Double Angle',
            latex: '\\tan(2\\theta) = \\frac{2\\tan\\theta}{1 - \\tan^2\\theta}',
            description: 'Tangent of double angle'
          }
        ]
      }
    ]
  },
  {
    id: 'trig-unit-5',
    sectionId: 'trigonometry',
    title: 'Laws of Sines and Cosines',
    description: 'Solve non-right triangles using the Law of Sines and Law of Cosines.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Law of Sines', 'Law of Cosines', 'Oblique Triangles', 'SSA', 'SAS', 'AAS'],
    sections: [
      {
        id: 'trig-5-1',
        title: 'Law of Sines',
        content: `The Law of Sines relates sides and angles in ANY triangle:

For a triangle with sides a, b, c and opposite angles A, B, C:

a/sin(A) = b/sin(B) = c/sin(C)

Use Law of Sines when you have:
- AAS (two angles and any side)
- ASA (two angles and the included side)
- SSA (two sides and angle opposite one of them) - ambiguous case!`,
        formulas: [
          {
            name: 'Law of Sines',
            latex: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
            description: 'Ratio of side to sine of opposite angle is constant'
          },
          {
            name: 'Triangle Area',
            latex: 'Area = \\frac{1}{2}ab\\sin C',
            description: 'Area using two sides and included angle'
          }
        ],
        examples: [
          {
            problem: 'In triangle ABC, A = 40°, B = 60°, and a = 8. Find b.',
            steps: [
              'Use Law of Sines: a/sin(A) = b/sin(B)',
              '8/sin(40°) = b/sin(60°)',
              'b = 8 × sin(60°)/sin(40°)',
              'b = 8 × 0.866/0.643',
              'b ≈ 10.8'
            ],
            solution: 'b ≈ 10.8',
            explanation: 'Cross-multiply and solve for the unknown'
          }
        ],
        commonMistakes: [
          'SSA case can have 0, 1, or 2 solutions (the ambiguous case)',
          'Forgetting to check if a second solution exists in SSA'
        ]
      },
      {
        id: 'trig-5-2',
        title: 'Law of Cosines',
        content: `The Law of Cosines is a generalization of the Pythagorean theorem for any triangle.

Use Law of Cosines when you have:
- SAS (two sides and the included angle)
- SSS (three sides, to find an angle)`,
        formulas: [
          {
            name: 'Law of Cosines (find side)',
            latex: 'c^2 = a^2 + b^2 - 2ab\\cos C',
            description: 'Find c when you know a, b, and angle C'
          },
          {
            name: 'Law of Cosines (find angle)',
            latex: '\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}',
            description: 'Find angle C when you know all three sides'
          }
        ],
        examples: [
          {
            problem: 'In triangle ABC, a = 5, b = 7, and C = 60°. Find c.',
            steps: [
              'Use c² = a² + b² - 2ab cos(C)',
              'c² = 5² + 7² - 2(5)(7)cos(60°)',
              'c² = 25 + 49 - 70(0.5)',
              'c² = 74 - 35 = 39',
              'c = √39 ≈ 6.24'
            ],
            solution: 'c ≈ 6.24',
            explanation: 'The Law of Cosines works like a modified Pythagorean theorem'
          }
        ],
        tips: [
          'If C = 90°, cos(C) = 0, and Law of Cosines becomes Pythagorean theorem!',
          'Use Law of Cosines first for SAS, then Law of Sines for remaining parts',
          'Always solve for the largest angle first when using SSS (to avoid ambiguity)'
        ]
      }
    ]
  }
]

export default TRIGONOMETRY_REFERENCE_UNITS


