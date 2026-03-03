import { ReferenceUnit } from '@/lib/types/basics'

export const PRECALCULUS_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'precalc-unit-1',
    sectionId: 'precalculus',
    title: 'Functions',
    description: 'Understand function notation, domain, range, and operations on functions.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Functions', 'Domain', 'Range', 'Function Notation', 'Inverse Functions', 'Composition'],
    sections: [
      {
        id: 'precalc-1-1',
        title: 'Function Basics',
        content: `A function is a relation where each input has exactly one output.

Function notation: f(x) means "f of x" - the output when input is x.

The vertical line test: A graph represents a function if every vertical line crosses it at most once.`,
        formulas: [
          {
            name: 'Function Notation',
            latex: 'y = f(x)',
            description: 'x is the input, f(x) is the output'
          }
        ],
        examples: [
          {
            problem: 'If f(x) = 2x² - 3, find f(4)',
            steps: [
              'Replace x with 4: f(4) = 2(4)² - 3',
              '= 2(16) - 3',
              '= 32 - 3 = 29'
            ],
            solution: 'f(4) = 29',
            explanation: 'Substitute the input value and evaluate'
          }
        ]
      },
      {
        id: 'precalc-1-2',
        title: 'Domain and Range',
        content: `Domain: All possible input (x) values
Range: All possible output (y) values

Common restrictions on domain:
- No division by zero
- No even roots of negative numbers
- Logarithms only of positive numbers`,
        formulas: [
          {
            name: 'Domain Restrictions',
            latex: '\\begin{aligned} \\frac{1}{x-a} &: x \\neq a \\\\ \\sqrt{x} &: x \\geq 0 \\\\ \\ln(x) &: x > 0 \\end{aligned}',
            description: 'Common restrictions'
          }
        ],
        tips: [
          'To find range, consider what y-values the function can produce',
          'Graph the function to visualize domain and range',
          'Use interval notation: [a,b] includes endpoints, (a,b) excludes them'
        ]
      },
      {
        id: 'precalc-1-3',
        title: 'Operations on Functions',
        content: `Functions can be combined using arithmetic operations:

Sum: (f + g)(x) = f(x) + g(x)
Difference: (f - g)(x) = f(x) - g(x)  
Product: (fg)(x) = f(x) · g(x)
Quotient: (f/g)(x) = f(x)/g(x), where g(x) ≠ 0`,
        formulas: [
          {
            name: 'Composition',
            latex: '(f \\circ g)(x) = f(g(x))',
            description: 'Apply g first, then f to the result'
          }
        ],
        examples: [
          {
            problem: 'If f(x) = x² and g(x) = x + 3, find (f ∘ g)(2)',
            steps: [
              'First find g(2): g(2) = 2 + 3 = 5',
              'Then find f(g(2)) = f(5) = 5² = 25'
            ],
            solution: '(f ∘ g)(2) = 25',
            explanation: 'Work from inside out: evaluate g first, then f'
          }
        ]
      },
      {
        id: 'precalc-1-4',
        title: 'Inverse Functions',
        content: `The inverse function f⁻¹ "undoes" what f does.

If f(a) = b, then f⁻¹(b) = a

To find the inverse:
1. Replace f(x) with y
2. Swap x and y
3. Solve for y
4. Replace y with f⁻¹(x)`,
        formulas: [
          {
            name: 'Inverse Property',
            latex: 'f(f^{-1}(x)) = x \\text{ and } f^{-1}(f(x)) = x',
            description: 'Composing a function with its inverse gives x'
          }
        ],
        examples: [
          {
            problem: 'Find the inverse of f(x) = 2x + 5',
            steps: [
              'y = 2x + 5',
              'Swap: x = 2y + 5',
              'Solve for y: x - 5 = 2y',
              'y = (x - 5)/2',
              'f⁻¹(x) = (x - 5)/2'
            ],
            solution: 'f⁻¹(x) = (x - 5)/2',
            explanation: 'The inverse reverses the operations in reverse order'
          }
        ],
        tips: [
          'Not all functions have inverses (must be one-to-one)',
          'The graph of f⁻¹ is the reflection of f over the line y = x',
          'Domain of f⁻¹ = Range of f, and vice versa'
        ]
      }
    ]
  },
  {
    id: 'precalc-unit-2',
    sectionId: 'precalculus',
    title: 'Polynomial Functions',
    description: 'Analyze polynomial behavior, zeros, and end behavior.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Polynomials', 'Zeros', 'End Behavior', 'Synthetic Division', 'Rational Root Theorem'],
    sections: [
      {
        id: 'precalc-2-1',
        title: 'Polynomial Basics',
        content: `A polynomial is a sum of terms with non-negative integer exponents.

Degree: Highest exponent
Leading coefficient: Coefficient of the highest degree term
Standard form: Terms in descending order of degree`,
        tips: [
          'A polynomial of degree n has at most n zeros',
          'The degree determines end behavior',
          'Polynomials are continuous (no breaks or holes)'
        ]
      },
      {
        id: 'precalc-2-2',
        title: 'End Behavior',
        content: `End behavior describes what happens to f(x) as x → ±∞.

For polynomial f(x) = aₙxⁿ + ... :
- If n is even and aₙ > 0: Both ends up (↑ ↑)
- If n is even and aₙ < 0: Both ends down (↓ ↓)
- If n is odd and aₙ > 0: Left down, right up (↓ ↑)
- If n is odd and aₙ < 0: Left up, right down (↑ ↓)`,
        tips: [
          'Only the leading term matters for end behavior',
          'Think of it as: even degree = same direction on both sides'
        ]
      },
      {
        id: 'precalc-2-3',
        title: 'Finding Zeros',
        content: `Zeros (roots) of a polynomial are x-values where f(x) = 0.

Methods to find zeros:
- Factoring
- Rational Root Theorem (possible rational zeros = ±p/q)
- Synthetic division to test possible roots
- Quadratic formula for degree 2`,
        formulas: [
          {
            name: 'Rational Root Theorem',
            latex: '\\text{Possible roots} = \\pm\\frac{p}{q}',
            description: 'p = factors of constant, q = factors of leading coefficient'
          }
        ],
        examples: [
          {
            problem: 'Find possible rational roots of f(x) = 2x³ - 5x² + x + 2',
            steps: [
              'p (factors of 2): ±1, ±2',
              'q (factors of 2): ±1, ±2',
              'Possible roots: ±1, ±2, ±1/2'
            ],
            solution: '±1, ±2, ±1/2',
            explanation: 'Test these using synthetic division to find actual roots'
          }
        ]
      },
      {
        id: 'precalc-2-4',
        title: 'Synthetic Division',
        content: `Synthetic division is a shortcut for dividing a polynomial by (x - c).

Steps:
1. Write coefficients in a row
2. Bring down the first coefficient
3. Multiply by c, add to next coefficient
4. Repeat until done`,
        tips: [
          'If the remainder is 0, then c is a root',
          'The quotient has degree one less than the dividend',
          'Only works for divisors of the form (x - c)'
        ]
      }
    ]
  },
  {
    id: 'precalc-unit-3',
    sectionId: 'precalculus',
    title: 'Rational Functions',
    description: 'Analyze asymptotes, holes, and behavior of rational functions.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Rational Functions', 'Asymptotes', 'Vertical Asymptote', 'Horizontal Asymptote', 'Holes'],
    sections: [
      {
        id: 'precalc-3-1',
        title: 'Vertical and Horizontal Asymptotes',
        content: `A rational function is a ratio of polynomials: f(x) = p(x)/q(x)

Vertical asymptotes: Where denominator = 0 (and numerator ≠ 0)

Horizontal asymptotes (comparing degrees of p and q):
- If deg(p) < deg(q): y = 0
- If deg(p) = deg(q): y = (leading coeff of p)/(leading coeff of q)
- If deg(p) > deg(q): No horizontal asymptote (possibly oblique)`,
        formulas: [
          {
            name: 'Vertical Asymptote',
            latex: 'q(x) = 0 \\text{ (and } p(x) \\neq 0\\text{)}',
            description: 'Set denominator equal to zero'
          }
        ],
        examples: [
          {
            problem: 'Find all asymptotes of f(x) = (2x + 1)/(x - 3)',
            steps: [
              'Vertical: x - 3 = 0 → x = 3',
              'Horizontal: deg(top) = deg(bottom) = 1',
              'HA: y = 2/1 = 2'
            ],
            solution: 'VA: x = 3, HA: y = 2',
            explanation: 'Equal degrees → horizontal asymptote at ratio of leading coefficients'
          }
        ]
      },
      {
        id: 'precalc-3-2',
        title: 'Holes',
        content: `A hole occurs when a factor cancels from both numerator and denominator.

The function is undefined at that x-value, but there's no asymptote - just a single missing point.

To find the y-coordinate of a hole, simplify the function and plug in the x-value.`,
        examples: [
          {
            problem: 'Find the hole in f(x) = (x² - 4)/(x - 2)',
            steps: [
              'Factor: (x+2)(x-2)/(x-2)',
              '(x-2) cancels, leaving hole at x = 2',
              'Simplified: f(x) = x + 2',
              'y-coordinate: f(2) = 2 + 2 = 4',
              'Hole at (2, 4)'
            ],
            solution: 'Hole at (2, 4)',
            explanation: 'Canceled factors create holes, not asymptotes'
          }
        ]
      }
    ]
  },
  {
    id: 'precalc-unit-4',
    sectionId: 'precalculus',
    title: 'Exponential & Logarithmic Functions',
    description: 'Master exponential growth/decay and logarithmic properties.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Exponential Functions', 'Logarithms', 'Natural Log', 'Exponential Growth', 'Compound Interest'],
    sections: [
      {
        id: 'precalc-4-1',
        title: 'Exponential Functions',
        content: `An exponential function has the form f(x) = bˣ where b > 0, b ≠ 1.

Key features:
- Domain: all real numbers
- Range: (0, ∞)
- Horizontal asymptote: y = 0
- If b > 1: growth (increasing)
- If 0 < b < 1: decay (decreasing)

The natural base e ≈ 2.718 is especially important.`,
        formulas: [
          {
            name: 'Exponential Growth/Decay',
            latex: 'A(t) = A_0 \\cdot b^t',
            description: 'A₀ = initial amount, b = growth factor'
          },
          {
            name: 'Continuous Growth',
            latex: 'A(t) = A_0 e^{rt}',
            description: 'r = continuous rate, t = time'
          }
        ]
      },
      {
        id: 'precalc-4-2',
        title: 'Logarithms',
        content: `A logarithm is the inverse of an exponential.

log_b(x) = y means b^y = x

"Log base b of x equals y"

Common logarithms: log (base 10), ln (natural log, base e)`,
        formulas: [
          {
            name: 'Definition',
            latex: '\\log_b(x) = y \\iff b^y = x',
            description: 'Logarithm and exponential are inverses'
          },
          {
            name: 'Common Log',
            latex: '\\log(x) = \\log_{10}(x)',
            description: 'Base 10 logarithm'
          },
          {
            name: 'Natural Log',
            latex: '\\ln(x) = \\log_e(x)',
            description: 'Base e logarithm'
          }
        ],
        examples: [
          {
            problem: 'Evaluate log₂(8)',
            steps: [
              'Ask: 2 to what power equals 8?',
              '2³ = 8',
              'So log₂(8) = 3'
            ],
            solution: '3',
            explanation: 'Rewrite as an exponential to solve'
          }
        ]
      },
      {
        id: 'precalc-4-3',
        title: 'Logarithm Properties',
        content: `Use these properties to simplify and solve logarithmic equations:`,
        formulas: [
          {
            name: 'Product Rule',
            latex: '\\log_b(xy) = \\log_b(x) + \\log_b(y)',
            description: 'Log of a product is sum of logs'
          },
          {
            name: 'Quotient Rule',
            latex: '\\log_b\\left(\\frac{x}{y}\\right) = \\log_b(x) - \\log_b(y)',
            description: 'Log of a quotient is difference of logs'
          },
          {
            name: 'Power Rule',
            latex: '\\log_b(x^n) = n \\log_b(x)',
            description: 'Exponent comes out as a multiplier'
          },
          {
            name: 'Change of Base',
            latex: '\\log_b(x) = \\frac{\\log(x)}{\\log(b)} = \\frac{\\ln(x)}{\\ln(b)}',
            description: 'Convert to any base'
          }
        ],
        tips: [
          'log_b(1) = 0 for any base (b⁰ = 1)',
          'log_b(b) = 1 for any base (b¹ = b)',
          'ln(e) = 1, log(10) = 1'
        ]
      },
      {
        id: 'precalc-4-4',
        title: 'Solving Exponential and Log Equations',
        content: `For exponential equations: Take log of both sides
For log equations: Convert to exponential form or combine logs`,
        examples: [
          {
            problem: 'Solve: 5ˣ = 20',
            steps: [
              'Take log of both sides: log(5ˣ) = log(20)',
              'Power rule: x log(5) = log(20)',
              'Divide: x = log(20)/log(5)',
              'x ≈ 1.301/0.699 ≈ 1.861'
            ],
            solution: 'x ≈ 1.861',
            explanation: 'Use logarithms to bring down the exponent'
          },
          {
            problem: 'Solve: log₃(x + 2) = 4',
            steps: [
              'Convert to exponential: 3⁴ = x + 2',
              '81 = x + 2',
              'x = 79'
            ],
            solution: 'x = 79',
            explanation: 'Rewrite in exponential form and solve'
          }
        ]
      }
    ]
  },
  {
    id: 'precalc-unit-5',
    sectionId: 'precalculus',
    title: 'Sequences & Series',
    description: 'Work with arithmetic and geometric sequences and their sums.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Sequences', 'Series', 'Arithmetic Sequence', 'Geometric Sequence', 'Sigma Notation'],
    sections: [
      {
        id: 'precalc-5-1',
        title: 'Arithmetic Sequences',
        content: `An arithmetic sequence has a constant difference between consecutive terms.

Examples: 2, 5, 8, 11, 14, ... (common difference d = 3)`,
        formulas: [
          {
            name: 'nth Term',
            latex: 'a_n = a_1 + (n-1)d',
            description: 'a₁ = first term, d = common difference'
          },
          {
            name: 'Sum of n Terms',
            latex: 'S_n = \\frac{n(a_1 + a_n)}{2} = \\frac{n(2a_1 + (n-1)d)}{2}',
            description: 'Sum of first n terms'
          }
        ],
        examples: [
          {
            problem: 'Find the 20th term of 3, 7, 11, 15, ...',
            steps: [
              'a₁ = 3, d = 4',
              'a₂₀ = 3 + (20-1)(4)',
              '= 3 + 19(4) = 3 + 76 = 79'
            ],
            solution: 'a₂₀ = 79',
            explanation: 'Use the nth term formula with n = 20'
          }
        ]
      },
      {
        id: 'precalc-5-2',
        title: 'Geometric Sequences',
        content: `A geometric sequence has a constant ratio between consecutive terms.

Examples: 2, 6, 18, 54, ... (common ratio r = 3)`,
        formulas: [
          {
            name: 'nth Term',
            latex: 'a_n = a_1 \\cdot r^{n-1}',
            description: 'a₁ = first term, r = common ratio'
          },
          {
            name: 'Sum of n Terms',
            latex: 'S_n = a_1 \\cdot \\frac{1 - r^n}{1 - r} \\quad (r \\neq 1)',
            description: 'Sum of first n terms'
          },
          {
            name: 'Infinite Sum',
            latex: 'S = \\frac{a_1}{1 - r} \\quad (|r| < 1)',
            description: 'Only converges when |r| < 1'
          }
        ],
        examples: [
          {
            problem: 'Find the sum of infinite geometric series: 8 + 4 + 2 + 1 + ...',
            steps: [
              'a₁ = 8, r = 4/8 = 1/2',
              'Since |r| = 1/2 < 1, it converges',
              'S = 8/(1 - 1/2) = 8/(1/2) = 16'
            ],
            solution: 'S = 16',
            explanation: 'The infinite series converges because |r| < 1'
          }
        ]
      },
      {
        id: 'precalc-5-3',
        title: 'Sigma Notation',
        content: `Sigma notation (Σ) provides a compact way to write sums.

Σ (from i=1 to n) of aᵢ means: add up a₁ + a₂ + a₃ + ... + aₙ`,
        formulas: [
          {
            name: 'Sigma Notation',
            latex: '\\sum_{i=1}^{n} a_i = a_1 + a_2 + \\cdots + a_n',
            description: 'Sum from i=1 to n'
          },
          {
            name: 'Sum of First n Integers',
            latex: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
            description: '1 + 2 + 3 + ... + n'
          }
        ]
      }
    ]
  },
  {
    id: 'precalc-unit-6',
    sectionId: 'precalculus',
    title: 'Conic Sections',
    description: 'Study circles, parabolas, ellipses, and hyperbolas.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Conic Sections', 'Circle', 'Parabola', 'Ellipse', 'Hyperbola', 'Focus'],
    sections: [
      {
        id: 'precalc-6-1',
        title: 'Circles',
        content: `A circle is the set of all points equidistant from a center point.`,
        formulas: [
          {
            name: 'Standard Form',
            latex: '(x - h)^2 + (y - k)^2 = r^2',
            description: 'Center (h, k), radius r'
          },
          {
            name: 'General Form',
            latex: 'x^2 + y^2 + Dx + Ey + F = 0',
            description: 'Complete the square to find center and radius'
          }
        ]
      },
      {
        id: 'precalc-6-2',
        title: 'Parabolas',
        content: `A parabola is the set of all points equidistant from a focus and a directrix.

Vertical parabola: Opens up or down
Horizontal parabola: Opens left or right`,
        formulas: [
          {
            name: 'Vertical (Standard)',
            latex: '(x - h)^2 = 4p(y - k)',
            description: 'Vertex (h, k), focus p units from vertex'
          },
          {
            name: 'Horizontal (Standard)',
            latex: '(y - k)^2 = 4p(x - h)',
            description: 'Opens right if p > 0, left if p < 0'
          }
        ],
        tips: [
          'p = distance from vertex to focus (also to directrix)',
          'If 4p > 0, parabola opens up/right; if < 0, down/left',
          'Focus is inside the parabola; directrix is outside'
        ]
      },
      {
        id: 'precalc-6-3',
        title: 'Ellipses',
        content: `An ellipse is the set of all points where the sum of distances to two foci is constant.`,
        formulas: [
          {
            name: 'Standard Form (horizontal)',
            latex: '\\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1',
            description: 'Center (h,k), a > b means horizontal major axis'
          },
          {
            name: 'Relationship',
            latex: 'c^2 = a^2 - b^2',
            description: 'c = distance from center to focus'
          }
        ],
        tips: [
          'a is always the larger denominator (major axis)',
          'Foci are along the major axis',
          'Vertices are at distance a from center'
        ]
      },
      {
        id: 'precalc-6-4',
        title: 'Hyperbolas',
        content: `A hyperbola is the set of all points where the difference of distances to two foci is constant.`,
        formulas: [
          {
            name: 'Horizontal Transverse',
            latex: '\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1',
            description: 'Opens left and right'
          },
          {
            name: 'Vertical Transverse',
            latex: '\\frac{(y-k)^2}{a^2} - \\frac{(x-h)^2}{b^2} = 1',
            description: 'Opens up and down'
          },
          {
            name: 'Relationship',
            latex: 'c^2 = a^2 + b^2',
            description: 'c = distance from center to focus'
          },
          {
            name: 'Asymptotes',
            latex: 'y - k = \\pm\\frac{b}{a}(x - h)',
            description: 'For horizontal transverse axis'
          }
        ],
        tips: [
          'The positive term determines direction of opening',
          'Asymptotes pass through center and corners of the central rectangle',
          'For hyperbolas: c² = a² + b² (ADD, not subtract like ellipse)'
        ]
      }
    ]
  }
]

export default PRECALCULUS_REFERENCE_UNITS

