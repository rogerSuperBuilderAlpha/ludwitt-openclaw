import { ReferenceUnit } from '@/lib/types/basics'

export const CALCULUS_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'calculus-unit-1',
    sectionId: 'calculus',
    title: 'Limits',
    description: 'Understand limits as the foundation of calculus and learn techniques to evaluate them.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Limits', 'Continuity', 'Limit Laws', 'One-Sided Limits', 'Limits at Infinity'],
    sections: [
      {
        id: 'calculus-1-1',
        title: 'Definition of a Limit',
        content: `A limit describes the value that a function approaches as the input approaches a certain value. We write:

lim(x→a) f(x) = L

This means: "As x gets closer and closer to a, f(x) gets closer and closer to L."

Important: The limit can exist even if f(a) is undefined or different from L!`,
        formulas: [
          {
            name: 'Limit Notation',
            latex: '\\lim_{x \\to a} f(x) = L',
            description: 'The limit of f(x) as x approaches a equals L'
          }
        ],
        tips: [
          'A limit asks "where is f(x) heading?" not "where is f(x) at?"',
          'Direct substitution works for most basic functions',
          'If you get 0/0, you need algebraic manipulation'
        ]
      },
      {
        id: 'calculus-1-2',
        title: 'Evaluating Limits Algebraically',
        content: `Techniques for finding limits:

1. Direct Substitution: Just plug in the value (works for continuous functions)
2. Factoring: Factor and cancel common factors (for 0/0 forms)
3. Rationalizing: Multiply by conjugate (for expressions with radicals)
4. L'Hôpital's Rule: For 0/0 or ∞/∞ forms, take derivative of top and bottom`,
        formulas: [
          {
            name: "L'Hôpital's Rule",
            latex: '\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}',
            description: 'For indeterminate forms 0/0 or ∞/∞'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: lim(x→2) (x² - 4)/(x - 2)',
            steps: [
              'Direct substitution gives 0/0 (indeterminate)',
              'Factor numerator: (x+2)(x-2)/(x-2)',
              'Cancel (x-2): x + 2',
              'Now substitute: 2 + 2 = 4'
            ],
            solution: '4',
            explanation: 'Factor to remove the common factor causing 0/0'
          }
        ],
        commonMistakes: [
          'Stopping at 0/0 instead of trying algebraic techniques',
          'Canceling incorrectly (the factor must be the same)',
          'Forgetting that L\'Hôpital only works for 0/0 or ∞/∞'
        ]
      },
      {
        id: 'calculus-1-3',
        title: 'One-Sided and Infinite Limits',
        content: `One-sided limits approach from one direction:
- lim(x→a⁺) approaches from the right
- lim(x→a⁻) approaches from the left

For a limit to exist, both one-sided limits must be equal.

Infinite limits occur when f(x) grows without bound:
- lim f(x) = ∞ means f(x) increases without limit
- lim f(x) = -∞ means f(x) decreases without limit`,
        formulas: [
          {
            name: 'Limit Exists Condition',
            latex: '\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L',
            description: 'Both one-sided limits must equal L'
          }
        ]
      },
      {
        id: 'calculus-1-4',
        title: 'Limits at Infinity',
        content: `Limits at infinity describe end behavior of functions as x → ∞ or x → -∞.

For rational functions p(x)/q(x):
- If degree of p < degree of q: limit = 0
- If degree of p = degree of q: limit = (leading coefficient of p)/(leading coefficient of q)
- If degree of p > degree of q: limit = ±∞`,
        examples: [
          {
            problem: 'Evaluate: lim(x→∞) (3x² + 2x)/(5x² - 1)',
            steps: [
              'Degrees are equal (both degree 2)',
              'Limit = 3/5 (ratio of leading coefficients)'
            ],
            solution: '3/5',
            explanation: 'For equal degrees, divide leading coefficients'
          }
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-2',
    sectionId: 'calculus',
    title: 'Derivatives - Basic Rules',
    description: 'Learn the fundamental derivative rules: power, product, quotient, and chain rules.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Derivatives', 'Power Rule', 'Product Rule', 'Quotient Rule', 'Chain Rule'],
    sections: [
      {
        id: 'calculus-2-1',
        title: 'Definition of the Derivative',
        content: `The derivative measures the instantaneous rate of change of a function. It's the slope of the tangent line at any point.

The derivative of f at x is defined as:
f'(x) = lim(h→0) [f(x+h) - f(x)] / h

This is also written as dy/dx, df/dx, or Df.`,
        formulas: [
          {
            name: 'Derivative Definition',
            latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
            description: 'The limit definition of the derivative'
          }
        ]
      },
      {
        id: 'calculus-2-2',
        title: 'Basic Derivative Rules',
        content: `These rules let you find derivatives without using the limit definition:`,
        formulas: [
          {
            name: 'Constant Rule',
            latex: '\\frac{d}{dx}[c] = 0',
            description: 'The derivative of any constant is 0'
          },
          {
            name: 'Power Rule',
            latex: '\\frac{d}{dx}[x^n] = nx^{n-1}',
            description: 'Bring down the exponent, reduce by 1'
          },
          {
            name: 'Constant Multiple Rule',
            latex: '\\frac{d}{dx}[cf(x)] = c \\cdot f\'(x)',
            description: 'Constants factor out of derivatives'
          },
          {
            name: 'Sum/Difference Rule',
            latex: '\\frac{d}{dx}[f(x) \\pm g(x)] = f\'(x) \\pm g\'(x)',
            description: 'Derivative of a sum is sum of derivatives'
          }
        ],
        examples: [
          {
            problem: 'Find d/dx[3x⁴ - 2x² + 5x - 7]',
            steps: [
              'd/dx[3x⁴] = 3 · 4x³ = 12x³',
              'd/dx[-2x²] = -2 · 2x = -4x',
              'd/dx[5x] = 5',
              'd/dx[-7] = 0',
              'Combine: 12x³ - 4x + 5'
            ],
            solution: '12x³ - 4x + 5',
            explanation: 'Apply power rule to each term, then combine'
          }
        ],
        tips: [
          'Remember: x = x¹, so d/dx[x] = 1',
          'The power rule works for any real exponent n',
          'Rewrite roots as fractional powers: √x = x^(1/2)'
        ]
      },
      {
        id: 'calculus-2-3',
        title: 'Product and Quotient Rules',
        content: `For products and quotients of functions, use these rules:`,
        formulas: [
          {
            name: 'Product Rule',
            latex: '\\frac{d}{dx}[f(x) \\cdot g(x)] = f\'(x)g(x) + f(x)g\'(x)',
            description: 'Derivative of first × second + first × derivative of second'
          },
          {
            name: 'Quotient Rule',
            latex: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x)g(x) - f(x)g\'(x)}{[g(x)]^2}',
            description: 'Lo dee-Hi minus Hi dee-Lo over Lo squared'
          }
        ],
        examples: [
          {
            problem: 'Find d/dx[x² · sin(x)]',
            steps: [
              'Use product rule: f = x², g = sin(x)',
              "f' = 2x, g' = cos(x)",
              "f'g + fg' = 2x·sin(x) + x²·cos(x)"
            ],
            solution: '2x sin(x) + x² cos(x)',
            explanation: 'Product rule: derivative of first times second plus first times derivative of second'
          }
        ],
        tips: [
          'Memory trick for quotient rule: "Lo dee-Hi minus Hi dee-Lo, over Lo-Lo"',
          'Sometimes it\'s easier to rewrite as a product than use quotient rule'
        ],
        commonMistakes: [
          'Forgetting to square the denominator in quotient rule',
          'Getting the order wrong in quotient rule (it\'s top derivative first)'
        ]
      },
      {
        id: 'calculus-2-4',
        title: 'Chain Rule',
        content: `The chain rule is for differentiating composite functions f(g(x)).

Think of it as: "derivative of the outside × derivative of the inside"`,
        formulas: [
          {
            name: 'Chain Rule',
            latex: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
            description: 'Derivative of outer evaluated at inner times derivative of inner'
          },
          {
            name: 'Chain Rule (Leibniz)',
            latex: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
            description: 'If y = f(u) and u = g(x)'
          }
        ],
        examples: [
          {
            problem: 'Find d/dx[(2x + 1)⁵]',
            steps: [
              'Outer function: u⁵, Inner function: u = 2x + 1',
              'Derivative of outer: 5u⁴ = 5(2x+1)⁴',
              'Derivative of inner: 2',
              'Multiply: 5(2x+1)⁴ · 2 = 10(2x+1)⁴'
            ],
            solution: '10(2x + 1)⁴',
            explanation: 'Power rule on outside, then multiply by derivative of inside'
          }
        ],
        tips: [
          'Always identify the "inside" function first',
          'The chain rule is used more than any other rule in calculus',
          'Multiple layers require multiple applications of chain rule'
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-3',
    sectionId: 'calculus',
    title: 'Derivatives of Special Functions',
    description: 'Learn derivatives of trigonometric, exponential, and logarithmic functions.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Trig Derivatives', 'Exponential Derivatives', 'Logarithmic Derivatives'],
    sections: [
      {
        id: 'calculus-3-1',
        title: 'Trigonometric Derivatives',
        content: `Memorize these six trig derivatives:`,
        formulas: [
          {
            name: 'Sine',
            latex: '\\frac{d}{dx}[\\sin x] = \\cos x',
            description: 'Derivative of sine is cosine'
          },
          {
            name: 'Cosine',
            latex: '\\frac{d}{dx}[\\cos x] = -\\sin x',
            description: 'Derivative of cosine is negative sine'
          },
          {
            name: 'Tangent',
            latex: '\\frac{d}{dx}[\\tan x] = \\sec^2 x',
            description: 'Derivative of tangent is secant squared'
          },
          {
            name: 'Cotangent',
            latex: '\\frac{d}{dx}[\\cot x] = -\\csc^2 x',
            description: 'Derivative of cotangent is negative cosecant squared'
          },
          {
            name: 'Secant',
            latex: '\\frac{d}{dx}[\\sec x] = \\sec x \\tan x',
            description: 'Derivative of secant'
          },
          {
            name: 'Cosecant',
            latex: '\\frac{d}{dx}[\\csc x] = -\\csc x \\cot x',
            description: 'Derivative of cosecant'
          }
        ],
        tips: [
          'Notice the "co" functions (cos, cot, csc) all have negatives',
          'sin → cos → -sin → -cos → sin (the pattern cycles)',
          'Use chain rule when the argument is not just x'
        ]
      },
      {
        id: 'calculus-3-2',
        title: 'Exponential and Logarithmic Derivatives',
        content: `The natural exponential function eˣ has a remarkable property: it is its own derivative!`,
        formulas: [
          {
            name: 'Natural Exponential',
            latex: '\\frac{d}{dx}[e^x] = e^x',
            description: 'The derivative of eˣ is itself'
          },
          {
            name: 'General Exponential',
            latex: '\\frac{d}{dx}[a^x] = a^x \\ln a',
            description: 'For any base a > 0'
          },
          {
            name: 'Natural Logarithm',
            latex: '\\frac{d}{dx}[\\ln x] = \\frac{1}{x}',
            description: 'Derivative of natural log'
          },
          {
            name: 'General Logarithm',
            latex: '\\frac{d}{dx}[\\log_a x] = \\frac{1}{x \\ln a}',
            description: 'For any base a > 0'
          }
        ],
        examples: [
          {
            problem: 'Find d/dx[e^(3x)]',
            steps: [
              'Use chain rule with u = 3x',
              'd/dx[eᵘ] = eᵘ · du/dx',
              '= e^(3x) · 3 = 3e^(3x)'
            ],
            solution: '3e^(3x)',
            explanation: 'Chain rule: derivative of eˣ times derivative of the exponent'
          }
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-4',
    sectionId: 'calculus',
    title: 'Applications of Derivatives',
    description: 'Apply derivatives to find tangent lines, optimize functions, and solve related rates.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Optimization', 'Related Rates', 'Tangent Lines', 'Critical Points', 'Curve Sketching'],
    sections: [
      {
        id: 'calculus-4-1',
        title: 'Tangent Lines',
        content: `The derivative f'(a) gives the slope of the tangent line at x = a.

Equation of tangent line at point (a, f(a)):
y - f(a) = f'(a)(x - a)

This is point-slope form with slope = f'(a).`,
        formulas: [
          {
            name: 'Tangent Line Equation',
            latex: 'y - f(a) = f\'(a)(x - a)',
            description: 'Point-slope form of tangent line at x = a'
          }
        ],
        examples: [
          {
            problem: 'Find the tangent line to y = x² at x = 3',
            steps: [
              'Find the point: y = 3² = 9, so (3, 9)',
              'Find the slope: y\' = 2x, so f\'(3) = 6',
              'Use point-slope: y - 9 = 6(x - 3)',
              'Simplify: y = 6x - 9'
            ],
            solution: 'y = 6x - 9',
            explanation: 'The tangent line has slope 6 and passes through (3, 9)'
          }
        ]
      },
      {
        id: 'calculus-4-2',
        title: 'Critical Points and Extrema',
        content: `Critical points occur where f'(x) = 0 or f'(x) is undefined. These are candidates for local maxima and minima.

First Derivative Test:
- If f' changes from + to −: local maximum
- If f' changes from − to +: local minimum

Second Derivative Test:
- If f'(c) = 0 and f''(c) > 0: local minimum (concave up)
- If f'(c) = 0 and f''(c) < 0: local maximum (concave down)`,
        formulas: [
          {
            name: 'Critical Points',
            latex: "f'(x) = 0 \\text{ or } f'(x) \\text{ undefined}",
            description: 'Where to look for extrema'
          },
          {
            name: 'Second Derivative Test',
            latex: 'f\'\'(c) > 0 \\Rightarrow \\text{local min}, \\quad f\'\'(c) < 0 \\Rightarrow \\text{local max}',
            description: 'Concavity determines min or max'
          }
        ]
      },
      {
        id: 'calculus-4-3',
        title: 'Optimization',
        content: `Optimization problems find maximum or minimum values. Strategy:

1. Draw a picture and identify variables
2. Write the quantity to optimize as a function of one variable
3. Find the domain (realistic constraints)
4. Find critical points by setting derivative = 0
5. Test critical points and endpoints
6. Answer the question asked`,
        examples: [
          {
            problem: 'A farmer has 200m of fencing. What dimensions maximize the rectangular area?',
            steps: [
              'Let x = width, then 2x + 2y = 200, so y = 100 - x',
              'Area A = xy = x(100-x) = 100x - x²',
              'A\' = 100 - 2x = 0 → x = 50',
              'y = 100 - 50 = 50',
              'Dimensions: 50m × 50m (a square!)'
            ],
            solution: '50m × 50m = 2500 m²',
            explanation: 'A square maximizes area for fixed perimeter'
          }
        ]
      },
      {
        id: 'calculus-4-4',
        title: 'Related Rates',
        content: `Related rates problems involve quantities that change with respect to time. Strategy:

1. Draw a picture and label variables
2. Write an equation relating the variables
3. Differentiate both sides with respect to time (implicit differentiation)
4. Substitute known values and solve`,
        formulas: [
          {
            name: 'Implicit Differentiation',
            latex: '\\frac{d}{dt}[\\text{equation}]',
            description: 'Differentiate both sides with respect to time'
          }
        ],
        examples: [
          {
            problem: 'A ladder 10ft long leans against a wall. The bottom slides away at 2 ft/s. How fast is the top sliding down when the bottom is 6ft from the wall?',
            steps: [
              'Let x = distance from wall, y = height on wall',
              'Equation: x² + y² = 100 (Pythagorean theorem)',
              'Differentiate: 2x(dx/dt) + 2y(dy/dt) = 0',
              'When x = 6: y = 8 (from 6² + y² = 100)',
              '2(6)(2) + 2(8)(dy/dt) = 0',
              '24 + 16(dy/dt) = 0',
              'dy/dt = -3/2 ft/s'
            ],
            solution: 'The top slides down at 1.5 ft/s',
            explanation: 'Negative means decreasing (sliding down)'
          }
        ],
        tips: [
          'Label rates with d/dt notation from the start',
          'Draw the situation at a specific instant, not over time',
          'Check units to verify your answer makes sense'
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-5',
    sectionId: 'calculus',
    title: 'Integration - Basic Rules',
    description: 'Learn antiderivatives and the basic rules of integration.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Integration', 'Antiderivatives', 'Indefinite Integrals', 'Power Rule for Integration'],
    sections: [
      {
        id: 'calculus-5-1',
        title: 'Antiderivatives',
        content: `An antiderivative of f(x) is a function F(x) whose derivative is f(x). That is, F'(x) = f(x).

Since the derivative of a constant is 0, antiderivatives always include "+ C" (the constant of integration).

Notation: ∫f(x)dx = F(x) + C`,
        formulas: [
          {
            name: 'Indefinite Integral',
            latex: '\\int f(x)\\,dx = F(x) + C \\text{ where } F\'(x) = f(x)',
            description: 'The antiderivative plus an arbitrary constant'
          }
        ]
      },
      {
        id: 'calculus-5-2',
        title: 'Basic Integration Rules',
        content: `These are the reverse of differentiation rules:`,
        formulas: [
          {
            name: 'Power Rule',
            latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
            description: 'Add 1 to exponent, divide by new exponent'
          },
          {
            name: 'Special Case (n = -1)',
            latex: '\\int \\frac{1}{x}\\,dx = \\ln|x| + C',
            description: 'The integral of 1/x is natural log'
          },
          {
            name: 'Exponential',
            latex: '\\int e^x\\,dx = e^x + C',
            description: 'eˣ is its own antiderivative'
          },
          {
            name: 'Sine',
            latex: '\\int \\sin x\\,dx = -\\cos x + C',
            description: 'Note the negative sign'
          },
          {
            name: 'Cosine',
            latex: '\\int \\cos x\\,dx = \\sin x + C',
            description: 'Integral of cosine is sine'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: ∫(3x² + 2x - 5)dx',
            steps: [
              '∫3x² dx = 3 · x³/3 = x³',
              '∫2x dx = 2 · x²/2 = x²',
              '∫-5 dx = -5x',
              'Combine: x³ + x² - 5x + C'
            ],
            solution: 'x³ + x² - 5x + C',
            explanation: 'Apply power rule to each term, add + C at the end'
          }
        ],
        commonMistakes: [
          'Forgetting the + C constant of integration',
          'Using the power rule when n = -1 (use ln instead)',
          'Forgetting to divide by the new exponent'
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-6',
    sectionId: 'calculus',
    title: 'Integration Techniques',
    description: 'Master u-substitution and integration by parts.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['U-Substitution', 'Integration by Parts', 'Substitution'],
    sections: [
      {
        id: 'calculus-6-1',
        title: 'U-Substitution',
        content: `U-substitution is the reverse of the chain rule. It simplifies integrals by substituting a new variable.

Steps:
1. Choose u (usually the "inside" function)
2. Find du = u'dx
3. Rewrite the integral in terms of u and du
4. Integrate
5. Substitute back for x`,
        formulas: [
          {
            name: 'U-Substitution',
            latex: '\\int f(g(x))g\'(x)\\,dx = \\int f(u)\\,du',
            description: 'Let u = g(x), then du = g\'(x)dx'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: ∫2x(x² + 1)³ dx',
            steps: [
              'Let u = x² + 1',
              'du = 2x dx',
              'The integral becomes ∫u³ du',
              '= u⁴/4 + C',
              '= (x² + 1)⁴/4 + C'
            ],
            solution: '(x² + 1)⁴/4 + C',
            explanation: 'The 2x dx is exactly du, making this a perfect substitution'
          }
        ],
        tips: [
          'Look for an inside function whose derivative appears in the integral',
          'If du is missing a constant, you can adjust (∫3x dx with u = x² needs du = 2x dx)',
          'Always substitute back to the original variable'
        ]
      },
      {
        id: 'calculus-6-2',
        title: 'Integration by Parts',
        content: `Integration by parts is the reverse of the product rule. Use it when the integrand is a product of two functions.

The formula: ∫u dv = uv - ∫v du

LIATE Rule for choosing u (in order):
L - Logarithmic (ln x)
I - Inverse trig (arctan x)
A - Algebraic (x², x)
T - Trigonometric (sin x, cos x)
E - Exponential (eˣ)

Choose u from higher on the list.`,
        formulas: [
          {
            name: 'Integration by Parts',
            latex: '\\int u\\,dv = uv - \\int v\\,du',
            description: 'The integration by parts formula'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: ∫x eˣ dx',
            steps: [
              'Choose u = x (algebraic), dv = eˣ dx',
              'Then du = dx, v = eˣ',
              'Apply formula: ∫x eˣ dx = xeˣ - ∫eˣ dx',
              '= xeˣ - eˣ + C',
              '= eˣ(x - 1) + C'
            ],
            solution: 'eˣ(x - 1) + C or xeˣ - eˣ + C',
            explanation: 'LIATE: x (algebraic) comes before eˣ (exponential), so u = x'
          }
        ]
      }
    ]
  },
  {
    id: 'calculus-unit-7',
    sectionId: 'calculus',
    title: 'Definite Integrals',
    description: 'Learn the Fundamental Theorem of Calculus and evaluate definite integrals.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Definite Integrals', 'Fundamental Theorem', 'Area Under Curve', 'Riemann Sums'],
    sections: [
      {
        id: 'calculus-7-1',
        title: 'The Definite Integral',
        content: `A definite integral has limits of integration and produces a number (not a function + C).

Notation: ∫ₐᵇ f(x)dx

Geometric interpretation: The signed area between f(x) and the x-axis from x = a to x = b.
- Area above x-axis is positive
- Area below x-axis is negative`,
        formulas: [
          {
            name: 'Definite Integral Notation',
            latex: '\\int_a^b f(x)\\,dx',
            description: 'Integral from a to b of f(x)'
          }
        ]
      },
      {
        id: 'calculus-7-2',
        title: 'Fundamental Theorem of Calculus',
        content: `The FTC connects derivatives and integrals - they are inverse operations!

Part 1: If F(x) = ∫ₐˣ f(t)dt, then F'(x) = f(x)
(The derivative of an integral is the original function)

Part 2: ∫ₐᵇ f(x)dx = F(b) - F(a)
(To evaluate a definite integral, find the antiderivative and subtract)`,
        formulas: [
          {
            name: 'FTC Part 1',
            latex: '\\frac{d}{dx}\\left[\\int_a^x f(t)\\,dt\\right] = f(x)',
            description: 'Derivative of integral is the integrand'
          },
          {
            name: 'FTC Part 2',
            latex: '\\int_a^b f(x)\\,dx = F(b) - F(a) = [F(x)]_a^b',
            description: 'Evaluate antiderivative at limits and subtract'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: ∫₀² (3x² + 1) dx',
            steps: [
              'Find antiderivative: F(x) = x³ + x',
              'Apply FTC Part 2: F(2) - F(0)',
              'F(2) = 2³ + 2 = 10',
              'F(0) = 0³ + 0 = 0',
              'Answer: 10 - 0 = 10'
            ],
            solution: '10',
            explanation: 'No + C needed for definite integrals (it cancels out)'
          }
        ],
        tips: [
          'For definite integrals, the + C always cancels, so you don\'t write it',
          'Notation [F(x)]ₐᵇ means F(b) - F(a)',
          'Verify: the answer should match the area interpretation'
        ]
      },
      {
        id: 'calculus-7-3',
        title: 'Properties of Definite Integrals',
        content: `These properties help simplify and evaluate integrals:`,
        formulas: [
          {
            name: 'Reversing Limits',
            latex: '\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx',
            description: 'Swapping limits changes the sign'
          },
          {
            name: 'Same Limits',
            latex: '\\int_a^a f(x)\\,dx = 0',
            description: 'Integral from a to a is zero'
          },
          {
            name: 'Additivity',
            latex: '\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx = \\int_a^c f(x)\\,dx',
            description: 'Split an integral at any point'
          },
          {
            name: 'Average Value',
            latex: 'f_{avg} = \\frac{1}{b-a}\\int_a^b f(x)\\,dx',
            description: 'Average value of f on [a,b]'
          }
        ]
      }
    ]
  }
]

export default CALCULUS_REFERENCE_UNITS


