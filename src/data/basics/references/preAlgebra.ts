import { ReferenceUnit } from '@/lib/types/basics'

export const PREALGEBRA_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'prealg-unit-1',
    sectionId: 'pre-algebra',
    title: 'Fractions',
    description: 'Master fraction operations: adding, subtracting, multiplying, dividing, and simplifying.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Fractions', 'Adding Fractions', 'Multiplying Fractions', 'LCD', 'Simplifying Fractions'],
    sections: [
      {
        id: 'prealg-1-1',
        title: 'Fraction Basics',
        content: `A fraction represents part of a whole. It has two parts:
- Numerator (top): number of parts you have
- Denominator (bottom): total number of equal parts

Equivalent fractions represent the same value: 1/2 = 2/4 = 3/6
To find equivalent fractions, multiply or divide both parts by the same number.`,
        formulas: [
          {
            name: 'Equivalent Fractions',
            latex: '\\frac{a}{b} = \\frac{a \\times n}{b \\times n}',
            description: 'Multiply top and bottom by the same number'
          },
          {
            name: 'Simplifying (Reducing)',
            latex: '\\frac{a}{b} = \\frac{a \\div \\text{GCF}}{b \\div \\text{GCF}}',
            description: 'Divide both by their Greatest Common Factor'
          }
        ],
        examples: [
          {
            problem: 'Simplify 12/18',
            steps: [
              'Find GCF of 12 and 18: GCF = 6',
              'Divide both: 12÷6 = 2, 18÷6 = 3',
              'Result: 2/3'
            ],
            solution: '2/3',
            explanation: 'A fraction is fully simplified when GCF of numerator and denominator is 1'
          }
        ]
      },
      {
        id: 'prealg-1-2',
        title: 'Adding and Subtracting Fractions',
        content: `To add or subtract fractions, they must have the same denominator (common denominator).

Steps:
1. Find the LCD (Least Common Denominator)
2. Convert each fraction to an equivalent fraction with the LCD
3. Add or subtract the numerators
4. Keep the denominator
5. Simplify if possible`,
        formulas: [
          {
            name: 'Same Denominator',
            latex: '\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}',
            description: 'Add numerators, keep denominator'
          },
          {
            name: 'Different Denominators',
            latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}',
            description: 'Cross multiply and add (works but may need simplifying)'
          }
        ],
        examples: [
          {
            problem: 'Add: 2/3 + 1/4',
            steps: [
              'LCD of 3 and 4 is 12',
              '2/3 = 8/12 (multiply by 4/4)',
              '1/4 = 3/12 (multiply by 3/3)',
              '8/12 + 3/12 = 11/12'
            ],
            solution: '11/12',
            explanation: 'Convert to equivalent fractions with LCD, then add numerators'
          }
        ],
        commonMistakes: [
          'Adding denominators (2/3 + 1/4 ≠ 3/7)',
          'Not finding a common denominator first',
          'Forgetting to simplify the answer'
        ]
      },
      {
        id: 'prealg-1-3',
        title: 'Multiplying and Dividing Fractions',
        content: `Multiplication is straightforward - multiply straight across.
Division uses the "flip and multiply" (multiply by reciprocal) rule.`,
        formulas: [
          {
            name: 'Multiplying Fractions',
            latex: '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}',
            description: 'Multiply numerators, multiply denominators'
          },
          {
            name: 'Dividing Fractions',
            latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}',
            description: 'Flip the second fraction and multiply'
          }
        ],
        examples: [
          {
            problem: 'Calculate: 2/3 ÷ 4/5',
            steps: [
              'Flip the second fraction: 4/5 becomes 5/4',
              'Multiply: 2/3 × 5/4',
              '= (2 × 5)/(3 × 4) = 10/12',
              'Simplify: 10/12 = 5/6'
            ],
            solution: '5/6',
            explanation: 'Keep-Change-Flip: Keep first, Change ÷ to ×, Flip second'
          }
        ],
        tips: [
          'You can cancel (cross-reduce) before multiplying to get smaller numbers',
          'Division by a fraction is the same as multiplication by its reciprocal',
          'The reciprocal of a/b is b/a'
        ]
      },
      {
        id: 'prealg-1-4',
        title: 'Mixed Numbers and Improper Fractions',
        content: `Mixed number: Whole number plus a fraction (e.g., 3½)
Improper fraction: Numerator ≥ denominator (e.g., 7/2)

These represent the same values in different forms.`,
        formulas: [
          {
            name: 'Mixed to Improper',
            latex: 'a\\frac{b}{c} = \\frac{ac + b}{c}',
            description: 'Multiply whole by denominator, add numerator'
          },
          {
            name: 'Improper to Mixed',
            latex: '\\frac{a}{b} = q\\frac{r}{b}',
            description: 'Divide: q = quotient, r = remainder'
          }
        ],
        examples: [
          {
            problem: 'Convert 3⅔ to an improper fraction',
            steps: [
              'Multiply whole by denominator: 3 × 3 = 9',
              'Add numerator: 9 + 2 = 11',
              'Keep denominator: 3',
              'Result: 11/3'
            ],
            solution: '11/3',
            explanation: 'The whole number 3 equals 9/3, plus 2/3 gives 11/3'
          }
        ]
      }
    ]
  },
  {
    id: 'prealg-unit-2',
    sectionId: 'pre-algebra',
    title: 'Decimals',
    description: 'Convert between decimals and fractions, and perform decimal operations.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Decimals', 'Decimal Operations', 'Converting Decimals', 'Place Value'],
    sections: [
      {
        id: 'prealg-2-1',
        title: 'Decimal Place Value',
        content: `Places to the right of the decimal point represent fractional parts:
- Tenths (0.1 = 1/10)
- Hundredths (0.01 = 1/100)
- Thousandths (0.001 = 1/1000)

Reading decimals: 0.35 = "thirty-five hundredths"`,
        tips: [
          'The decimal point separates whole numbers from fractional parts',
          'Adding zeros to the right doesn\'t change the value (0.5 = 0.50 = 0.500)',
          'Moving the decimal right multiplies by 10; left divides by 10'
        ]
      },
      {
        id: 'prealg-2-2',
        title: 'Converting Fractions and Decimals',
        content: `To convert a fraction to a decimal: Divide numerator by denominator

To convert a decimal to a fraction: Write as fraction over appropriate power of 10`,
        examples: [
          {
            problem: 'Convert 3/8 to a decimal',
            steps: [
              'Divide: 3 ÷ 8 = 0.375'
            ],
            solution: '0.375',
            explanation: 'All fractions convert to either terminating or repeating decimals'
          },
          {
            problem: 'Convert 0.125 to a fraction',
            steps: [
              '0.125 = 125/1000 (3 decimal places = 1000)',
              'Simplify: GCF of 125 and 1000 is 125',
              '125÷125 / 1000÷125 = 1/8'
            ],
            solution: '1/8',
            explanation: 'Count decimal places to determine the denominator'
          }
        ]
      },
      {
        id: 'prealg-2-3',
        title: 'Decimal Operations',
        content: `Adding/Subtracting: Line up decimal points, then add/subtract normally

Multiplying: Multiply as whole numbers, then count total decimal places

Dividing: Move decimal in divisor to make it whole, move same in dividend`,
        examples: [
          {
            problem: 'Multiply: 2.5 × 1.4',
            steps: [
              'Multiply as 25 × 14 = 350',
              'Count decimal places: 1 + 1 = 2',
              'Place decimal 2 places from right: 3.50 = 3.5'
            ],
            solution: '3.5',
            explanation: 'Total decimal places in factors = decimal places in product'
          }
        ]
      }
    ]
  },
  {
    id: 'prealg-unit-3',
    sectionId: 'pre-algebra',
    title: 'Percents',
    description: 'Understand percentages and convert between fractions, decimals, and percents.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Percent', 'Percent of a Number', 'Percent Change', 'Discount', 'Tax'],
    sections: [
      {
        id: 'prealg-3-1',
        title: 'Percent Basics',
        content: `Percent means "per hundred" or "out of 100."

50% = 50/100 = 0.50 = ½

Conversions:
- Percent to Decimal: Divide by 100 (move decimal 2 places left)
- Decimal to Percent: Multiply by 100 (move decimal 2 places right)
- Percent to Fraction: Put over 100 and simplify`,
        formulas: [
          {
            name: 'Percent to Decimal',
            latex: 'p\\% = \\frac{p}{100}',
            description: 'Divide the percent by 100'
          }
        ],
        examples: [
          {
            problem: 'Convert 75% to a decimal and fraction',
            steps: [
              'Decimal: 75 ÷ 100 = 0.75',
              'Fraction: 75/100 = 3/4'
            ],
            solution: '0.75 and 3/4',
            explanation: 'Divide by 100 for decimal, simplify for fraction'
          }
        ]
      },
      {
        id: 'prealg-3-2',
        title: 'Finding Percent of a Number',
        content: `To find p% of a number n: Multiply n by the decimal form of p%

"of" in math usually means multiply`,
        formulas: [
          {
            name: 'Percent of a Number',
            latex: 'p\\% \\text{ of } n = \\frac{p}{100} \\times n',
            description: 'Convert percent to decimal and multiply'
          }
        ],
        examples: [
          {
            problem: 'What is 20% of 80?',
            steps: [
              '20% = 0.20',
              '0.20 × 80 = 16'
            ],
            solution: '16',
            explanation: 'Convert percent to decimal, then multiply'
          }
        ]
      },
      {
        id: 'prealg-3-3',
        title: 'Percent Change',
        content: `Percent change measures how much something increased or decreased relative to its original value.`,
        formulas: [
          {
            name: 'Percent Change',
            latex: '\\text{Percent Change} = \\frac{\\text{New} - \\text{Original}}{\\text{Original}} \\times 100\\%',
            description: 'Positive = increase, Negative = decrease'
          },
          {
            name: 'After Increase',
            latex: '\\text{New} = \\text{Original} \\times (1 + r)',
            description: 'Where r is the rate as a decimal'
          },
          {
            name: 'After Decrease',
            latex: '\\text{New} = \\text{Original} \\times (1 - r)',
            description: 'For discounts, use (1 - discount rate)'
          }
        ],
        examples: [
          {
            problem: 'A shirt was $40 and is now $30. What is the percent decrease?',
            steps: [
              'Change = 30 - 40 = -10',
              'Percent change = (-10)/40 × 100%',
              '= -0.25 × 100% = -25%'
            ],
            solution: '25% decrease',
            explanation: 'Negative result indicates a decrease'
          }
        ]
      }
    ]
  },
  {
    id: 'prealg-unit-4',
    sectionId: 'pre-algebra',
    title: 'Ratios & Proportions',
    description: 'Understand ratios, unit rates, and solve proportions.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Ratios', 'Proportions', 'Unit Rate', 'Cross Multiplication', 'Scale Factor'],
    sections: [
      {
        id: 'prealg-4-1',
        title: 'Ratios',
        content: `A ratio compares two quantities. It can be written as:
- a to b
- a : b
- a/b

Ratios should usually be simplified to lowest terms.`,
        examples: [
          {
            problem: 'There are 6 boys and 9 girls. What is the ratio of boys to girls?',
            steps: [
              'Ratio: 6 to 9 or 6:9 or 6/9',
              'Simplify: GCF of 6 and 9 is 3',
              '6÷3 : 9÷3 = 2:3'
            ],
            solution: '2:3 or 2 to 3',
            explanation: 'Simplify by dividing both parts by the GCF'
          }
        ],
        tips: [
          'Order matters! The ratio of boys to girls is different from girls to boys',
          'Part-to-part ratios compare parts; part-to-whole compare a part to the total'
        ]
      },
      {
        id: 'prealg-4-2',
        title: 'Proportions',
        content: `A proportion is an equation showing two equivalent ratios:
a/b = c/d

Cross products are equal: ad = bc

Use this to solve for an unknown in a proportion.`,
        formulas: [
          {
            name: 'Cross Multiplication',
            latex: '\\frac{a}{b} = \\frac{c}{d} \\Rightarrow ad = bc',
            description: 'Cross products are equal in a proportion'
          }
        ],
        examples: [
          {
            problem: 'Solve: 3/4 = x/20',
            steps: [
              'Cross multiply: 3 × 20 = 4 × x',
              '60 = 4x',
              'x = 60 ÷ 4 = 15'
            ],
            solution: 'x = 15',
            explanation: 'Cross multiply to get rid of fractions, then solve'
          }
        ]
      },
      {
        id: 'prealg-4-3',
        title: 'Unit Rates',
        content: `A unit rate expresses a ratio as a quantity per one unit.

Examples: miles per hour, price per item, words per minute

To find a unit rate, divide to get a denominator of 1.`,
        examples: [
          {
            problem: 'You drive 150 miles in 3 hours. What is your speed in mph?',
            steps: [
              'Rate = 150 miles / 3 hours',
              '= 50 miles / 1 hour',
              '= 50 mph'
            ],
            solution: '50 mph',
            explanation: 'Divide to get "per one hour"'
          }
        ]
      }
    ]
  },
  {
    id: 'prealg-unit-5',
    sectionId: 'pre-algebra',
    title: 'Integers & Number Line',
    description: 'Work with positive and negative numbers and understand absolute value.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Integers', 'Negative Numbers', 'Absolute Value', 'Number Line', 'Integer Operations'],
    sections: [
      {
        id: 'prealg-5-1',
        title: 'Understanding Integers',
        content: `Integers include all whole numbers (positive, negative, and zero):
..., -3, -2, -1, 0, 1, 2, 3, ...

On a number line:
- Positive numbers are to the right of zero
- Negative numbers are to the left of zero
- Numbers increase as you move right`,
        formulas: [
          {
            name: 'Absolute Value',
            latex: '|x| = \\text{distance from } x \\text{ to } 0',
            description: 'Always positive (or zero)'
          }
        ],
        examples: [
          {
            problem: 'Find |-7| and |5|',
            steps: [
              '|-7| = 7 (7 units from zero)',
              '|5| = 5 (5 units from zero)'
            ],
            solution: '|-7| = 7, |5| = 5',
            explanation: 'Absolute value removes the negative sign'
          }
        ]
      },
      {
        id: 'prealg-5-2',
        title: 'Adding Integers',
        content: `Rules for adding integers:

Same signs: Add absolute values, keep the sign
- 5 + 3 = 8
- (-5) + (-3) = -8

Different signs: Subtract absolute values, use sign of larger absolute value
- 5 + (-3) = 2
- (-5) + 3 = -2`,
        tips: [
          'Think of a number line: adding positive moves right, adding negative moves left',
          'Adding a negative is like subtracting: 5 + (-3) = 5 - 3',
          'Adding opposites gives zero: 5 + (-5) = 0'
        ]
      },
      {
        id: 'prealg-5-3',
        title: 'Subtracting Integers',
        content: `To subtract integers, add the opposite:
a - b = a + (-b)

This changes every subtraction problem into an addition problem!`,
        formulas: [
          {
            name: 'Subtraction as Addition',
            latex: 'a - b = a + (-b)',
            description: 'Add the opposite'
          }
        ],
        examples: [
          {
            problem: 'Calculate: 3 - 7',
            steps: [
              'Rewrite: 3 + (-7)',
              'Different signs: |7| - |3| = 4',
              'Larger absolute value (7) is negative',
              'Answer: -4'
            ],
            solution: '-4',
            explanation: 'Add the opposite: subtracting 7 is adding -7'
          }
        ]
      },
      {
        id: 'prealg-5-4',
        title: 'Multiplying and Dividing Integers',
        content: `The rules are simple:

Same signs → Positive result
Different signs → Negative result`,
        formulas: [
          {
            name: 'Sign Rules',
            latex: '\\begin{aligned} (+)(+) &= + \\\\ (-)(-)  &= + \\\\ (+)(-) &= - \\\\ (-)(+) &= - \\end{aligned}',
            description: 'Same signs = positive, different signs = negative'
          }
        ],
        examples: [
          {
            problem: 'Calculate: (-6) × (-4)',
            steps: [
              'Signs: negative × negative = positive',
              '6 × 4 = 24',
              'Answer: +24'
            ],
            solution: '24',
            explanation: 'Two negatives make a positive in multiplication/division'
          }
        ]
      }
    ]
  },
  {
    id: 'prealg-unit-6',
    sectionId: 'pre-algebra',
    title: 'Introduction to Variables',
    description: 'Learn to work with algebraic expressions and solve simple equations.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Variables', 'Expressions', 'Like Terms', 'Distributive Property', 'One-Step Equations'],
    sections: [
      {
        id: 'prealg-6-1',
        title: 'Variables and Expressions',
        content: `A variable is a letter that represents an unknown value (commonly x, y, n).

An algebraic expression contains variables, numbers, and operations.

Term: A number, variable, or product of numbers and variables
Coefficient: The number multiplied by a variable (in 5x, the coefficient is 5)`,
        examples: [
          {
            problem: 'Evaluate 3x + 7 when x = 4',
            steps: [
              'Replace x with 4: 3(4) + 7',
              'Multiply: 12 + 7',
              'Add: 19'
            ],
            solution: '19',
            explanation: 'Substitute the value and simplify'
          }
        ]
      },
      {
        id: 'prealg-6-2',
        title: 'Combining Like Terms',
        content: `Like terms have the same variable(s) raised to the same power(s).

To combine: Add or subtract the coefficients, keep the variable part.

Unlike terms cannot be combined.`,
        examples: [
          {
            problem: 'Simplify: 5x + 3y + 2x - y',
            steps: [
              'Group like terms: (5x + 2x) + (3y - y)',
              'Combine x terms: 7x',
              'Combine y terms: 2y',
              'Result: 7x + 2y'
            ],
            solution: '7x + 2y',
            explanation: 'Only like terms (same variable) can be combined'
          }
        ],
        commonMistakes: [
          'Combining unlike terms: 3x + 2y ≠ 5xy',
          'Forgetting that x means 1x',
          'Combining x and x²: they are NOT like terms'
        ]
      },
      {
        id: 'prealg-6-3',
        title: 'Distributive Property',
        content: `The distributive property allows you to multiply a factor across a sum or difference inside parentheses.`,
        formulas: [
          {
            name: 'Distributive Property',
            latex: 'a(b + c) = ab + ac',
            description: 'Multiply outside by each term inside'
          }
        ],
        examples: [
          {
            problem: 'Simplify: 3(2x + 5)',
            steps: [
              'Distribute 3: 3 × 2x + 3 × 5',
              '= 6x + 15'
            ],
            solution: '6x + 15',
            explanation: 'Multiply the 3 by each term inside the parentheses'
          }
        ]
      },
      {
        id: 'prealg-6-4',
        title: 'Solving One-Step Equations',
        content: `To solve an equation, get the variable alone by using inverse operations:
- Addition ↔ Subtraction
- Multiplication ↔ Division

Whatever you do to one side, do to the other side.`,
        examples: [
          {
            problem: 'Solve: x + 5 = 12',
            steps: [
              'Inverse of +5 is -5',
              'Subtract 5 from both sides: x + 5 - 5 = 12 - 5',
              'x = 7'
            ],
            solution: 'x = 7',
            explanation: 'Check: 7 + 5 = 12 ✓'
          },
          {
            problem: 'Solve: 4x = 20',
            steps: [
              'Inverse of ×4 is ÷4',
              'Divide both sides by 4: 4x/4 = 20/4',
              'x = 5'
            ],
            solution: 'x = 5',
            explanation: 'Check: 4 × 5 = 20 ✓'
          }
        ]
      }
    ]
  }
]

export default PREALGEBRA_REFERENCE_UNITS


