import { ReferenceUnit } from '@/lib/types/basics'

export const GEOMETRY_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'geometry-unit-1',
    sectionId: 'geometry',
    title: 'Basic Shapes & Angles',
    description: 'Learn fundamental geometric concepts: points, lines, angles, and their measurements.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Angles', 'Lines', 'Acute Angle', 'Right Angle', 'Obtuse Angle', 'Complementary', 'Supplementary'],
    sections: [
      {
        id: 'geometry-1-1',
        title: 'Points, Lines, and Planes',
        content: `The building blocks of geometry:

Point: A location with no size, named with capital letters (Point A)
Line: Extends infinitely in both directions, named by two points (Line AB or AB)
Line Segment: Part of a line with two endpoints (Segment AB or AB̅)
Ray: Starts at a point and extends infinitely in one direction (Ray AB or AB→)
Plane: A flat surface extending infinitely in all directions`,
        tips: [
          'Points are shown as dots but have no actual size',
          'Lines are always straight - curved lines are called "curves"',
          'Parallel lines never intersect, perpendicular lines form 90° angles'
        ]
      },
      {
        id: 'geometry-1-2',
        title: 'Types of Angles',
        content: `An angle is formed by two rays sharing a common endpoint (vertex). Angles are measured in degrees (°).

Types by measure:
- Acute angle: Less than 90°
- Right angle: Exactly 90° (marked with a small square)
- Obtuse angle: Between 90° and 180°
- Straight angle: Exactly 180° (a straight line)
- Reflex angle: Between 180° and 360°`,
        formulas: [
          {
            name: 'Full rotation',
            latex: '360°',
            description: 'A complete circle equals 360 degrees'
          }
        ],
        tips: [
          'Think of a right angle as the corner of a piece of paper',
          'Acute angles are "cute" because they\'re small',
          'Obtuse angles are "obese" because they\'re bigger than 90°'
        ]
      },
      {
        id: 'geometry-1-3',
        title: 'Angle Relationships',
        content: `Special pairs of angles have predictable relationships:

Complementary angles: Two angles that add up to 90°
Supplementary angles: Two angles that add up to 180°
Vertical angles: Opposite angles formed by intersecting lines (always equal)
Adjacent angles: Angles that share a vertex and one side`,
        formulas: [
          {
            name: 'Complementary Angles',
            latex: '\\angle A + \\angle B = 90°',
            description: 'Two angles whose sum is 90 degrees'
          },
          {
            name: 'Supplementary Angles',
            latex: '\\angle A + \\angle B = 180°',
            description: 'Two angles whose sum is 180 degrees'
          },
          {
            name: 'Vertical Angles',
            latex: '\\angle 1 = \\angle 3 \\text{ and } \\angle 2 = \\angle 4',
            description: 'Opposite angles are equal when two lines intersect'
          }
        ],
        examples: [
          {
            problem: 'If one angle is 35°, find its complement and supplement.',
            steps: [
              'Complement: 90° - 35° = 55°',
              'Supplement: 180° - 35° = 145°'
            ],
            solution: 'Complement = 55°, Supplement = 145°',
            explanation: 'Complements sum to 90°, supplements sum to 180°'
          }
        ]
      }
    ]
  },
  {
    id: 'geometry-unit-2',
    sectionId: 'geometry',
    title: 'Triangles',
    description: 'Master triangle classifications, the angle sum theorem, and the Pythagorean theorem.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Triangle', 'Pythagorean Theorem', 'Right Triangle', 'Isosceles', 'Equilateral', 'Triangle Angles'],
    sections: [
      {
        id: 'geometry-2-1',
        title: 'Types of Triangles',
        content: `Triangles can be classified by their sides or by their angles.

By sides:
- Equilateral: All 3 sides equal (all angles are 60°)
- Isosceles: 2 sides equal (2 angles equal)
- Scalene: No sides equal (no angles equal)

By angles:
- Acute: All angles less than 90°
- Right: One angle is exactly 90°
- Obtuse: One angle greater than 90°`,
        tips: [
          'An equilateral triangle is also isosceles (it has at least 2 equal sides)',
          'Tick marks on diagrams show equal sides',
          'The longest side is opposite the largest angle'
        ]
      },
      {
        id: 'geometry-2-2',
        title: 'Triangle Angle Sum',
        content: `The interior angles of any triangle always add up to 180°. This is one of the most important facts in geometry!`,
        formulas: [
          {
            name: 'Triangle Angle Sum',
            latex: '\\angle A + \\angle B + \\angle C = 180°',
            description: 'The sum of interior angles in any triangle'
          },
          {
            name: 'Exterior Angle Theorem',
            latex: '\\angle_{ext} = \\angle_1 + \\angle_2',
            description: 'An exterior angle equals the sum of the two non-adjacent interior angles'
          }
        ],
        examples: [
          {
            problem: 'Find the missing angle if two angles are 65° and 45°',
            steps: [
              'Sum of all angles = 180°',
              '65° + 45° + x = 180°',
              '110° + x = 180°',
              'x = 70°'
            ],
            solution: '70°',
            explanation: 'Subtract the known angles from 180°'
          }
        ]
      },
      {
        id: 'geometry-2-3',
        title: 'Pythagorean Theorem',
        content: `For RIGHT triangles only, the Pythagorean Theorem relates the sides:

The square of the hypotenuse (longest side, opposite the right angle) equals the sum of the squares of the two legs.`,
        formulas: [
          {
            name: 'Pythagorean Theorem',
            latex: 'a^2 + b^2 = c^2',
            description: 'Where c is the hypotenuse (longest side)',
            variables: { a: 'one leg', b: 'other leg', c: 'hypotenuse' }
          },
          {
            name: 'Finding a leg',
            latex: 'a = \\sqrt{c^2 - b^2}',
            description: 'Rearranged to find a missing leg'
          }
        ],
        examples: [
          {
            problem: 'Find the hypotenuse if the legs are 3 and 4.',
            steps: [
              'Use a² + b² = c²',
              '3² + 4² = c²',
              '9 + 16 = c²',
              '25 = c²',
              'c = √25 = 5'
            ],
            solution: 'c = 5',
            explanation: 'This is the famous 3-4-5 right triangle!'
          }
        ],
        tips: [
          'Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25',
          'Multiples also work: 6-8-10, 9-12-15 (all multiples of 3-4-5)',
          'The hypotenuse is ALWAYS the longest side'
        ],
        commonMistakes: [
          'Using Pythagorean theorem on non-right triangles',
          'Forgetting to take the square root at the end',
          'Adding instead of subtracting when finding a leg'
        ]
      },
      {
        id: 'geometry-2-4',
        title: 'Special Right Triangles',
        content: `Two special right triangles have fixed angle-side ratios that you should memorize:

45-45-90 Triangle (Isosceles right triangle):
- Legs are equal
- Hypotenuse = leg × √2

30-60-90 Triangle:
- Short leg is opposite 30°
- Long leg = short leg × √3
- Hypotenuse = short leg × 2`,
        formulas: [
          {
            name: '45-45-90 Ratios',
            latex: '1 : 1 : \\sqrt{2}',
            description: 'Ratio of short leg : short leg : hypotenuse'
          },
          {
            name: '30-60-90 Ratios',
            latex: '1 : \\sqrt{3} : 2',
            description: 'Ratio of short leg : long leg : hypotenuse'
          }
        ],
        examples: [
          {
            problem: 'In a 45-45-90 triangle, if one leg is 5, find the hypotenuse.',
            steps: [
              'In 45-45-90, hypotenuse = leg × √2',
              'Hypotenuse = 5 × √2 = 5√2 ≈ 7.07'
            ],
            solution: '5√2',
            explanation: 'Multiply the leg by √2'
          }
        ]
      }
    ]
  },
  {
    id: 'geometry-unit-3',
    sectionId: 'geometry',
    title: 'Quadrilaterals & Polygons',
    description: 'Learn the properties of quadrilaterals and the angle formulas for any polygon.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Quadrilateral', 'Rectangle', 'Square', 'Parallelogram', 'Trapezoid', 'Polygon'],
    sections: [
      {
        id: 'geometry-3-1',
        title: 'Types of Quadrilaterals',
        content: `A quadrilateral has 4 sides. Special quadrilaterals have unique properties:

Parallelogram: Opposite sides parallel and equal
Rectangle: Parallelogram with 4 right angles
Square: Rectangle with 4 equal sides
Rhombus: Parallelogram with 4 equal sides
Trapezoid: Exactly one pair of parallel sides
Kite: Two pairs of adjacent equal sides`,
        tips: [
          'A square is also a rectangle, rhombus, and parallelogram!',
          'All quadrilaterals have interior angles summing to 360°',
          'The diagonals of a rectangle are equal; diagonals of a rhombus are perpendicular'
        ]
      },
      {
        id: 'geometry-3-2',
        title: 'Polygon Angle Sums',
        content: `The sum of interior angles of any polygon depends on the number of sides.`,
        formulas: [
          {
            name: 'Interior Angle Sum',
            latex: '(n - 2) \\times 180°',
            description: 'Sum of interior angles for n-sided polygon',
            variables: { n: 'number of sides' }
          },
          {
            name: 'Each Interior Angle (Regular)',
            latex: '\\frac{(n - 2) \\times 180°}{n}',
            description: 'Each angle in a regular n-gon'
          },
          {
            name: 'Exterior Angle Sum',
            latex: '360°',
            description: 'Sum of exterior angles for any convex polygon'
          }
        ],
        examples: [
          {
            problem: 'Find the sum of interior angles of a hexagon.',
            steps: [
              'A hexagon has 6 sides, so n = 6',
              'Sum = (6 - 2) × 180°',
              'Sum = 4 × 180° = 720°'
            ],
            solution: '720°',
            explanation: 'Use the formula (n-2) × 180°'
          }
        ]
      }
    ]
  },
  {
    id: 'geometry-unit-4',
    sectionId: 'geometry',
    title: 'Perimeter & Area',
    description: 'Calculate perimeter and area for all common 2D shapes.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Perimeter', 'Area', 'Circle Area', 'Triangle Area', 'Rectangle Area'],
    sections: [
      {
        id: 'geometry-4-1',
        title: 'Perimeter',
        content: `Perimeter is the distance around a shape - the sum of all side lengths.`,
        formulas: [
          {
            name: 'Rectangle Perimeter',
            latex: 'P = 2l + 2w = 2(l + w)',
            description: 'l = length, w = width'
          },
          {
            name: 'Square Perimeter',
            latex: 'P = 4s',
            description: 's = side length'
          },
          {
            name: 'Circle Circumference',
            latex: 'C = 2\\pi r = \\pi d',
            description: 'r = radius, d = diameter'
          }
        ]
      },
      {
        id: 'geometry-4-2',
        title: 'Area of Basic Shapes',
        content: `Area is the amount of space inside a 2D shape, measured in square units.`,
        formulas: [
          {
            name: 'Rectangle Area',
            latex: 'A = l \\times w',
            description: 'length times width'
          },
          {
            name: 'Square Area',
            latex: 'A = s^2',
            description: 'side squared'
          },
          {
            name: 'Triangle Area',
            latex: 'A = \\frac{1}{2}bh',
            description: 'Half of base times height',
            variables: { b: 'base', h: 'perpendicular height' }
          },
          {
            name: 'Parallelogram Area',
            latex: 'A = bh',
            description: 'base times perpendicular height'
          },
          {
            name: 'Trapezoid Area',
            latex: 'A = \\frac{1}{2}(b_1 + b_2)h',
            description: 'Average of parallel bases times height'
          },
          {
            name: 'Circle Area',
            latex: 'A = \\pi r^2',
            description: 'Pi times radius squared'
          }
        ],
        examples: [
          {
            problem: 'Find the area of a triangle with base 8 cm and height 5 cm.',
            steps: [
              'A = ½ × base × height',
              'A = ½ × 8 × 5',
              'A = ½ × 40 = 20 cm²'
            ],
            solution: '20 cm²',
            explanation: 'Don\'t forget the ½ in the triangle formula!'
          }
        ],
        commonMistakes: [
          'Forgetting the ½ in triangle area',
          'Using the slant height instead of perpendicular height',
          'Mixing up diameter and radius for circles'
        ]
      }
    ]
  },
  {
    id: 'geometry-unit-5',
    sectionId: 'geometry',
    title: 'Surface Area & Volume',
    description: 'Calculate surface area and volume of 3D shapes including prisms, cylinders, and spheres.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Volume', 'Surface Area', 'Prism', 'Cylinder', 'Sphere', 'Cone'],
    sections: [
      {
        id: 'geometry-5-1',
        title: 'Prisms and Cylinders',
        content: `Prisms have two identical parallel bases connected by rectangles. Cylinders have circular bases.`,
        formulas: [
          {
            name: 'Rectangular Prism Volume',
            latex: 'V = lwh',
            description: 'length × width × height'
          },
          {
            name: 'Rectangular Prism Surface Area',
            latex: 'SA = 2(lw + lh + wh)',
            description: 'Sum of all 6 faces'
          },
          {
            name: 'Cylinder Volume',
            latex: 'V = \\pi r^2 h',
            description: 'Base area times height'
          },
          {
            name: 'Cylinder Surface Area',
            latex: 'SA = 2\\pi r^2 + 2\\pi rh',
            description: 'Two circles plus the curved surface'
          }
        ],
        examples: [
          {
            problem: 'Find the volume of a cylinder with radius 3 cm and height 7 cm.',
            steps: [
              'V = πr²h',
              'V = π × 3² × 7',
              'V = π × 9 × 7',
              'V = 63π ≈ 197.92 cm³'
            ],
            solution: '63π cm³ ≈ 197.92 cm³',
            explanation: 'Leave answer in terms of π or calculate decimal'
          }
        ]
      },
      {
        id: 'geometry-5-2',
        title: 'Pyramids, Cones, and Spheres',
        content: `These shapes have special volume formulas involving ⅓ (for pointed shapes) or 4/3 (for spheres).`,
        formulas: [
          {
            name: 'Pyramid Volume',
            latex: 'V = \\frac{1}{3}Bh',
            description: 'One-third of base area times height'
          },
          {
            name: 'Cone Volume',
            latex: 'V = \\frac{1}{3}\\pi r^2 h',
            description: 'One-third of cylinder with same base and height'
          },
          {
            name: 'Sphere Volume',
            latex: 'V = \\frac{4}{3}\\pi r^3',
            description: 'Four-thirds pi r cubed'
          },
          {
            name: 'Sphere Surface Area',
            latex: 'SA = 4\\pi r^2',
            description: 'Four times the area of a great circle'
          }
        ],
        tips: [
          'Pyramids and cones are ⅓ of the prism/cylinder with same base and height',
          'Remember: sphere volume has r³, surface area has r²',
          'For spheres: SA = 4πr², V = (4/3)πr³'
        ]
      }
    ]
  },
  {
    id: 'geometry-unit-6',
    sectionId: 'geometry',
    title: 'Coordinate Geometry',
    description: 'Apply algebra to geometry: distance, midpoint, and slope formulas.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Coordinate Plane', 'Distance Formula', 'Midpoint', 'Slope'],
    sections: [
      {
        id: 'geometry-6-1',
        title: 'Distance and Midpoint',
        content: `The distance formula finds the length between two points. The midpoint formula finds the point exactly halfway between two points.`,
        formulas: [
          {
            name: 'Distance Formula',
            latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
            description: 'Based on the Pythagorean theorem'
          },
          {
            name: 'Midpoint Formula',
            latex: 'M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)',
            description: 'Average of x-coordinates and y-coordinates'
          }
        ],
        examples: [
          {
            problem: 'Find the distance between (1, 2) and (4, 6).',
            steps: [
              'd = √[(4-1)² + (6-2)²]',
              'd = √[3² + 4²]',
              'd = √[9 + 16] = √25 = 5'
            ],
            solution: '5 units',
            explanation: 'This is a 3-4-5 right triangle!'
          }
        ]
      },
      {
        id: 'geometry-6-2',
        title: 'Slope',
        content: `Slope measures the steepness of a line - how much it rises or falls per unit of horizontal distance.`,
        formulas: [
          {
            name: 'Slope Formula',
            latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}',
            description: 'Change in y divided by change in x'
          }
        ],
        tips: [
          'Positive slope: line goes up from left to right',
          'Negative slope: line goes down from left to right',
          'Zero slope: horizontal line',
          'Undefined slope: vertical line'
        ]
      }
    ]
  }
]

export default GEOMETRY_REFERENCE_UNITS

