import { ReferenceUnit } from '@/lib/types/basics'

export const ALGEBRA_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'algebra-unit-1',
    sectionId: 'algebra',
    title: 'Expressions & Equations',
    description: 'Learn to translate words into algebra and solve one-step, two-step, and multi-step equations.',
    xpCost: 0, // First unit is free!
    estimatedReadTime: 8,
    relatedTopics: ['Linear Equations', 'One-Step Equations', 'Two-Step Equations', 'Multi-Step Equations', 'Algebraic Expressions'],
    sections: [
      {
        id: 'algebra-1-1',
        title: 'Translating Words to Algebra',
        content: `Algebra uses letters (variables) to represent unknown values. Learning to translate English sentences into algebraic expressions and equations is a fundamental skill.

Common phrases and their mathematical equivalents:
- "Sum of" → Addition (+)
- "Difference of" → Subtraction (−)
- "Product of" → Multiplication (×)
- "Quotient of" → Division (÷)
- "Is equal to" → Equals (=)
- "More than" → Add to the first number
- "Less than" → Subtract from the first number
- "Twice" or "Double" → Multiply by 2
- "Half of" → Divide by 2`,
        formulas: [
          {
            name: 'Sum of two numbers',
            latex: 'a + b',
            description: 'The sum of a and b',
            variables: { a: 'first number', b: 'second number' }
          },
          {
            name: 'Product of two numbers',
            latex: 'a \\times b \\text{ or } ab',
            description: 'The product of a and b',
            variables: { a: 'first number', b: 'second number' }
          }
        ],
        examples: [
          {
            problem: 'Translate: "Five more than twice a number x"',
            steps: [
              'Identify the variable: x (the unknown number)',
              '"Twice a number" means 2 times x = 2x',
              '"Five more than" means add 5'
            ],
            solution: '2x + 5',
            explanation: 'Start with the variable, apply the multiplication, then add.'
          },
          {
            problem: 'Translate: "The quotient of y and 3, decreased by 7"',
            steps: [
              '"Quotient of y and 3" means y ÷ 3 = y/3',
              '"Decreased by 7" means subtract 7'
            ],
            solution: 'y/3 - 7',
            explanation: 'Division comes first, then subtraction.'
          }
        ],
        tips: [
          'Read the phrase carefully - word order matters!',
          '"Less than" reverses the order: "3 less than x" is x - 3, not 3 - x',
          'Look for keywords that signal operations'
        ],
        commonMistakes: [
          'Confusing "less than" with "is less than" - "5 less than x" is x - 5, but "x is less than 5" is x < 5',
          'Forgetting that "of" usually means multiplication, especially with fractions'
        ]
      },
      {
        id: 'algebra-1-2',
        title: 'Properties of Equality',
        content: `The key to solving equations is understanding that you must keep the equation balanced. Whatever you do to one side, you must do to the other.

The Properties of Equality:
1. Addition Property: If a = b, then a + c = b + c
2. Subtraction Property: If a = b, then a - c = b - c
3. Multiplication Property: If a = b, then ac = bc
4. Division Property: If a = b and c ≠ 0, then a/c = b/c

These properties let us isolate the variable by performing inverse operations.`,
        formulas: [
          {
            name: 'Addition Property',
            latex: 'a = b \\Rightarrow a + c = b + c',
            description: 'Adding the same value to both sides preserves equality'
          },
          {
            name: 'Division Property',
            latex: 'a = b \\Rightarrow \\frac{a}{c} = \\frac{b}{c} \\text{ (where } c \\neq 0)',
            description: 'Dividing both sides by the same non-zero value preserves equality'
          }
        ],
        tips: [
          'Think of an equation as a balanced scale - keep it balanced!',
          'Inverse operations undo each other: + and −, × and ÷',
          'Always check your solution by substituting it back into the original equation'
        ]
      },
      {
        id: 'algebra-1-3',
        title: 'Solving One-Step Equations',
        content: `A one-step equation requires only one operation to solve. Use the inverse operation to isolate the variable.

Types of one-step equations:
- Addition equations (x + a = b): Solve by subtracting
- Subtraction equations (x - a = b): Solve by adding
- Multiplication equations (ax = b): Solve by dividing
- Division equations (x/a = b): Solve by multiplying`,
        formulas: [
          {
            name: 'Addition Equation Solution',
            latex: 'x + a = b \\Rightarrow x = b - a',
            description: 'Subtract the constant from both sides'
          },
          {
            name: 'Multiplication Equation Solution',
            latex: 'ax = b \\Rightarrow x = \\frac{b}{a}',
            description: 'Divide both sides by the coefficient'
          }
        ],
        examples: [
          {
            problem: 'Solve: x + 7 = 12',
            steps: [
              'Identify the operation: addition (+7)',
              'Use the inverse: subtract 7 from both sides',
              'x + 7 - 7 = 12 - 7',
              'x = 5'
            ],
            solution: 'x = 5',
            explanation: 'Check: 5 + 7 = 12 ✓'
          },
          {
            problem: 'Solve: 3x = 18',
            steps: [
              'Identify the operation: multiplication (×3)',
              'Use the inverse: divide both sides by 3',
              '3x ÷ 3 = 18 ÷ 3',
              'x = 6'
            ],
            solution: 'x = 6',
            explanation: 'Check: 3(6) = 18 ✓'
          }
        ],
        commonMistakes: [
          'Performing the operation on only one side of the equation',
          'Using the same operation instead of the inverse operation'
        ]
      },
      {
        id: 'algebra-1-4',
        title: 'Solving Two-Step Equations',
        content: `Two-step equations require two operations to solve. The general strategy is:
1. First, undo addition or subtraction (to get the variable term alone)
2. Then, undo multiplication or division (to get the variable alone)

Think of it as "unwrapping" - you undo operations in reverse order of PEMDAS.`,
        formulas: [
          {
            name: 'Two-Step Equation Form',
            latex: 'ax + b = c',
            description: 'Standard form of a two-step equation',
            variables: { a: 'coefficient', b: 'constant', c: 'result' }
          },
          {
            name: 'Solution Steps',
            latex: 'ax + b = c \\Rightarrow ax = c - b \\Rightarrow x = \\frac{c-b}{a}',
            description: 'Subtract b, then divide by a'
          }
        ],
        examples: [
          {
            problem: 'Solve: 2x + 5 = 13',
            steps: [
              'First, subtract 5 from both sides: 2x + 5 - 5 = 13 - 5',
              'Simplify: 2x = 8',
              'Then, divide both sides by 2: 2x ÷ 2 = 8 ÷ 2',
              'Simplify: x = 4'
            ],
            solution: 'x = 4',
            explanation: 'Check: 2(4) + 5 = 8 + 5 = 13 ✓'
          },
          {
            problem: 'Solve: x/3 - 2 = 7',
            steps: [
              'First, add 2 to both sides: x/3 - 2 + 2 = 7 + 2',
              'Simplify: x/3 = 9',
              'Then, multiply both sides by 3: (x/3) × 3 = 9 × 3',
              'Simplify: x = 27'
            ],
            solution: 'x = 27',
            explanation: 'Check: 27/3 - 2 = 9 - 2 = 7 ✓'
          }
        ],
        tips: [
          'Always undo addition/subtraction before multiplication/division',
          'Work step by step and simplify after each step',
          'Check your answer by substituting back into the original equation'
        ]
      },
      {
        id: 'algebra-1-5',
        title: 'Multi-Step Equations',
        content: `Multi-step equations may include variables on both sides, parentheses, or like terms that need combining. The strategy is:

1. Simplify each side separately (distribute, combine like terms)
2. Move all variable terms to one side
3. Move all constant terms to the other side
4. Solve for the variable`,
        formulas: [
          {
            name: 'Distributive Property',
            latex: 'a(b + c) = ab + ac',
            description: 'Distribute multiplication over addition'
          },
          {
            name: 'Combining Like Terms',
            latex: '3x + 2x = 5x',
            description: 'Add coefficients of like terms'
          }
        ],
        examples: [
          {
            problem: 'Solve: 3(x + 2) = 15',
            steps: [
              'Distribute the 3: 3x + 6 = 15',
              'Subtract 6 from both sides: 3x = 9',
              'Divide both sides by 3: x = 3'
            ],
            solution: 'x = 3',
            explanation: 'Check: 3(3 + 2) = 3(5) = 15 ✓'
          },
          {
            problem: 'Solve: 4x + 3 = 2x + 11',
            steps: [
              'Subtract 2x from both sides: 4x - 2x + 3 = 11',
              'Combine like terms: 2x + 3 = 11',
              'Subtract 3 from both sides: 2x = 8',
              'Divide by 2: x = 4'
            ],
            solution: 'x = 4',
            explanation: 'Check: 4(4) + 3 = 19 and 2(4) + 11 = 19 ✓'
          }
        ],
        commonMistakes: [
          'Forgetting to distribute to ALL terms inside parentheses',
          'Combining unlike terms (e.g., 3x + 2 ≠ 5x)',
          'Losing negative signs when moving terms across the equation'
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-2',
    sectionId: 'algebra',
    title: 'Linear Equations & Graphing',
    description: 'Master the different forms of linear equations and learn to graph lines on the coordinate plane.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Slope', 'Y-Intercept', 'Graphing', 'Linear Functions', 'Point-Slope Form', 'Slope-Intercept Form'],
    sections: [
      {
        id: 'algebra-2-1',
        title: 'Slope-Intercept Form',
        content: `The slope-intercept form is the most common way to write a linear equation. It immediately tells you the slope and y-intercept of the line.

In this form:
- m is the slope (steepness) of the line
- b is the y-intercept (where the line crosses the y-axis)

A positive slope means the line goes up from left to right.
A negative slope means the line goes down from left to right.`,
        formulas: [
          {
            name: 'Slope-Intercept Form',
            latex: 'y = mx + b',
            description: 'The standard slope-intercept form of a linear equation',
            variables: { m: 'slope', b: 'y-intercept' }
          },
          {
            name: 'Slope Formula',
            latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}',
            description: 'Calculate slope from two points'
          }
        ],
        examples: [
          {
            problem: 'Identify the slope and y-intercept of y = 3x - 5',
            steps: [
              'Compare to y = mx + b',
              'The coefficient of x is the slope: m = 3',
              'The constant term is the y-intercept: b = -5'
            ],
            solution: 'Slope = 3, Y-intercept = -5',
            explanation: 'The line rises 3 units for every 1 unit to the right, and crosses the y-axis at (0, -5)'
          },
          {
            problem: 'Find the slope between points (2, 3) and (6, 11)',
            steps: [
              'Label the points: (x₁, y₁) = (2, 3), (x₂, y₂) = (6, 11)',
              'Apply the formula: m = (11 - 3)/(6 - 2)',
              'm = 8/4 = 2'
            ],
            solution: 'm = 2',
            explanation: 'The slope is 2, meaning the line rises 2 units for every 1 unit to the right.'
          }
        ],
        tips: [
          'Remember: "Rise over run" - vertical change divided by horizontal change',
          'A slope of 0 means a horizontal line',
          'An undefined slope means a vertical line'
        ]
      },
      {
        id: 'algebra-2-2',
        title: 'Point-Slope Form',
        content: `Point-slope form is useful when you know a point on the line and the slope. It's especially handy for writing equations from a graph or from given information.

This form directly shows:
- The slope m
- A point (x₁, y₁) that the line passes through`,
        formulas: [
          {
            name: 'Point-Slope Form',
            latex: 'y - y_1 = m(x - x_1)',
            description: 'Equation of a line through point (x₁, y₁) with slope m',
            variables: { m: 'slope', 'x_1': 'x-coordinate of known point', 'y_1': 'y-coordinate of known point' }
          }
        ],
        examples: [
          {
            problem: 'Write the equation of a line with slope 4 through point (2, 5)',
            steps: [
              'Use point-slope form: y - y₁ = m(x - x₁)',
              'Substitute m = 4, x₁ = 2, y₁ = 5',
              'y - 5 = 4(x - 2)'
            ],
            solution: 'y - 5 = 4(x - 2) or y = 4x - 3',
            explanation: 'You can leave it in point-slope form or distribute to get slope-intercept form.'
          }
        ],
        tips: [
          'Convert to slope-intercept form by distributing and solving for y',
          'This form is great for writing equations quickly during tests'
        ]
      },
      {
        id: 'algebra-2-3',
        title: 'Standard Form',
        content: `Standard form writes the equation with both variables on the same side and integers as coefficients. It's useful for finding intercepts quickly.

Rules for standard form:
- A should be positive
- A, B, and C should be integers with no common factors
- Variables are on the left, constant on the right`,
        formulas: [
          {
            name: 'Standard Form',
            latex: 'Ax + By = C',
            description: 'Standard form of a linear equation',
            variables: { A: 'coefficient of x (positive)', B: 'coefficient of y', C: 'constant' }
          },
          {
            name: 'X-Intercept from Standard Form',
            latex: 'x\\text{-intercept} = \\frac{C}{A}',
            description: 'Set y = 0 and solve for x'
          },
          {
            name: 'Y-Intercept from Standard Form',
            latex: 'y\\text{-intercept} = \\frac{C}{B}',
            description: 'Set x = 0 and solve for y'
          }
        ],
        examples: [
          {
            problem: 'Convert y = 2x - 6 to standard form',
            steps: [
              'Start with: y = 2x - 6',
              'Subtract 2x from both sides: -2x + y = -6',
              'Multiply by -1 to make A positive: 2x - y = 6'
            ],
            solution: '2x - y = 6',
            explanation: 'Now in standard form with A = 2, B = -1, C = 6'
          }
        ]
      },
      {
        id: 'algebra-2-4',
        title: 'Parallel and Perpendicular Lines',
        content: `The relationship between lines can be determined by their slopes:

Parallel lines: Same slope, different y-intercept (they never intersect)
Perpendicular lines: Slopes are negative reciprocals (they intersect at 90°)`,
        formulas: [
          {
            name: 'Parallel Lines',
            latex: 'm_1 = m_2',
            description: 'Parallel lines have equal slopes'
          },
          {
            name: 'Perpendicular Lines',
            latex: 'm_1 \\cdot m_2 = -1 \\text{ or } m_2 = -\\frac{1}{m_1}',
            description: 'Perpendicular lines have slopes that are negative reciprocals'
          }
        ],
        examples: [
          {
            problem: 'Find the slope of a line perpendicular to y = 3x + 1',
            steps: [
              'Identify the slope: m₁ = 3',
              'For perpendicular lines: m₂ = -1/m₁',
              'm₂ = -1/3'
            ],
            solution: 'm = -1/3',
            explanation: 'The negative reciprocal of 3 is -1/3. Check: 3 × (-1/3) = -1 ✓'
          }
        ],
        tips: [
          'To find the negative reciprocal: flip the fraction and change the sign',
          'The negative reciprocal of 2 (or 2/1) is -1/2',
          'The negative reciprocal of -3/4 is 4/3'
        ],
        commonMistakes: [
          'Forgetting to flip the fraction when finding perpendicular slopes',
          'Forgetting to change the sign'
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-3',
    sectionId: 'algebra',
    title: 'Systems of Equations',
    description: 'Learn three methods to solve systems of two equations: graphing, substitution, and elimination.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Systems', 'Substitution', 'Elimination', 'Graphing Systems'],
    sections: [
      {
        id: 'algebra-3-1',
        title: 'Solving by Graphing',
        content: `A system of equations is a set of two or more equations with the same variables. The solution is the point(s) where all equations are true simultaneously.

When graphing:
- Each equation is a line
- The solution is where the lines intersect
- If lines are parallel: no solution (inconsistent system)
- If lines are the same: infinite solutions (dependent system)`,
        examples: [
          {
            problem: 'Solve by graphing: y = 2x + 1 and y = -x + 4',
            steps: [
              'Graph y = 2x + 1: starts at (0, 1), rises 2 for every 1 right',
              'Graph y = -x + 4: starts at (0, 4), falls 1 for every 1 right',
              'Find intersection point: (1, 3)'
            ],
            solution: 'x = 1, y = 3 or (1, 3)',
            explanation: 'Check: 3 = 2(1) + 1 ✓ and 3 = -(1) + 4 ✓'
          }
        ],
        tips: [
          'Graphing is good for estimating solutions but may not give exact values',
          'Use other methods when you need exact answers'
        ]
      },
      {
        id: 'algebra-3-2',
        title: 'Solving by Substitution',
        content: `Substitution works best when one equation is already solved for a variable (like y = ... or x = ...).

Steps:
1. Solve one equation for one variable (if not already done)
2. Substitute that expression into the other equation
3. Solve the resulting one-variable equation
4. Substitute back to find the other variable`,
        examples: [
          {
            problem: 'Solve: y = 3x - 2 and 2x + y = 8',
            steps: [
              'The first equation is already solved for y',
              'Substitute (3x - 2) for y in the second equation: 2x + (3x - 2) = 8',
              'Combine like terms: 5x - 2 = 8',
              'Solve: 5x = 10, so x = 2',
              'Substitute x = 2 into y = 3x - 2: y = 3(2) - 2 = 4'
            ],
            solution: 'x = 2, y = 4 or (2, 4)',
            explanation: 'Check in both equations: 4 = 3(2) - 2 ✓ and 2(2) + 4 = 8 ✓'
          }
        ],
        tips: [
          'Choose the equation that\'s easiest to solve for a variable',
          'Watch your signs carefully when substituting'
        ]
      },
      {
        id: 'algebra-3-3',
        title: 'Solving by Elimination',
        content: `Elimination (also called the addition method) works by adding or subtracting equations to eliminate one variable.

Steps:
1. Arrange equations with like terms aligned vertically
2. Multiply one or both equations so one variable has opposite coefficients
3. Add the equations to eliminate that variable
4. Solve for the remaining variable
5. Substitute back to find the other variable`,
        formulas: [
          {
            name: 'Elimination Setup',
            latex: '\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}',
            description: 'Align equations with like terms in columns'
          }
        ],
        examples: [
          {
            problem: 'Solve: 3x + 2y = 12 and 3x - 2y = 0',
            steps: [
              'Notice the y terms are already opposites (+2y and -2y)',
              'Add the equations: (3x + 2y) + (3x - 2y) = 12 + 0',
              'Simplify: 6x = 12, so x = 2',
              'Substitute x = 2 into first equation: 3(2) + 2y = 12',
              'Solve: 6 + 2y = 12, 2y = 6, y = 3'
            ],
            solution: 'x = 2, y = 3 or (2, 3)',
            explanation: 'Check: 3(2) + 2(3) = 12 ✓ and 3(2) - 2(3) = 0 ✓'
          }
        ],
        tips: [
          'Look for coefficients that are already opposites or equal',
          'If no coefficients match, multiply one or both equations first',
          'Choose to eliminate the variable with smaller coefficients'
        ],
        commonMistakes: [
          'Forgetting to multiply ALL terms in an equation when creating opposites',
          'Adding when you should subtract (or vice versa)'
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-4',
    sectionId: 'algebra',
    title: 'Inequalities',
    description: 'Solve and graph one-variable inequalities, compound inequalities, and absolute value inequalities.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Inequalities', 'Number Line', 'Compound Inequalities', 'Absolute Value'],
    sections: [
      {
        id: 'algebra-4-1',
        title: 'Solving One-Variable Inequalities',
        content: `Solving inequalities is similar to solving equations, with one crucial difference:

IMPORTANT RULE: When you multiply or divide both sides by a negative number, you must FLIP the inequality sign.

Inequality symbols:
- < means "less than"
- > means "greater than"
- ≤ means "less than or equal to"
- ≥ means "greater than or equal to"`,
        formulas: [
          {
            name: 'Flip Rule',
            latex: 'a < b \\xrightarrow{\\text{multiply by } -1} -a > -b',
            description: 'Multiplying or dividing by a negative flips the inequality'
          }
        ],
        examples: [
          {
            problem: 'Solve: -3x + 5 > 14',
            steps: [
              'Subtract 5 from both sides: -3x > 9',
              'Divide by -3 (FLIP the sign!): x < -3',
              'Graph: open circle at -3, shade left'
            ],
            solution: 'x < -3',
            explanation: 'We divided by -3, so we flipped > to <'
          }
        ],
        tips: [
          'Use an open circle (○) for < or > (not including the endpoint)',
          'Use a closed circle (●) for ≤ or ≥ (including the endpoint)',
          'Shade toward the values that make the inequality true'
        ],
        commonMistakes: [
          'Forgetting to flip the inequality when dividing by a negative',
          'Using the wrong type of circle on the number line'
        ]
      },
      {
        id: 'algebra-4-2',
        title: 'Compound Inequalities',
        content: `Compound inequalities combine two inequalities using AND or OR.

AND inequalities: Both conditions must be true (intersection)
- Written as: a < x AND x < b, or more compactly: a < x < b
- Solution is the overlap of both conditions

OR inequalities: At least one condition must be true (union)
- Written as: x < a OR x > b
- Solution includes values from either condition`,
        examples: [
          {
            problem: 'Solve: -2 ≤ 3x + 1 < 10',
            steps: [
              'This is an AND inequality: -2 ≤ 3x + 1 AND 3x + 1 < 10',
              'Solve left part: -2 ≤ 3x + 1 → -3 ≤ 3x → -1 ≤ x',
              'Solve right part: 3x + 1 < 10 → 3x < 9 → x < 3',
              'Combine: -1 ≤ x < 3'
            ],
            solution: '-1 ≤ x < 3',
            explanation: 'All values from -1 (included) up to but not including 3'
          }
        ]
      },
      {
        id: 'algebra-4-3',
        title: 'Absolute Value Inequalities',
        content: `Absolute value |x| represents distance from zero. Absolute value inequalities have two cases because both positive and negative values can be solutions.

For |x| < a (less than): The values are between -a and a
For |x| > a (greater than): The values are less than -a OR greater than a`,
        formulas: [
          {
            name: 'Less Than Form',
            latex: '|x| < a \\Rightarrow -a < x < a',
            description: 'Distance from 0 is less than a'
          },
          {
            name: 'Greater Than Form',
            latex: '|x| > a \\Rightarrow x < -a \\text{ OR } x > a',
            description: 'Distance from 0 is greater than a'
          }
        ],
        examples: [
          {
            problem: 'Solve: |2x - 3| ≤ 7',
            steps: [
              'This is a "less than or equal" case: create a compound inequality',
              '-7 ≤ 2x - 3 ≤ 7',
              'Add 3 to all parts: -4 ≤ 2x ≤ 10',
              'Divide all parts by 2: -2 ≤ x ≤ 5'
            ],
            solution: '-2 ≤ x ≤ 5',
            explanation: 'Values between -2 and 5, inclusive'
          }
        ],
        tips: [
          'Remember: < or ≤ means AND (between), > or ≥ means OR (outside)',
          'Isolate the absolute value first before splitting into cases'
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-5',
    sectionId: 'algebra',
    title: 'Exponents & Polynomials',
    description: 'Master exponent rules and learn to add, subtract, and multiply polynomials.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Exponents', 'Polynomials', 'FOIL', 'Exponent Rules'],
    sections: [
      {
        id: 'algebra-5-1',
        title: 'Exponent Rules',
        content: `Exponents represent repeated multiplication. The base is the number being multiplied, and the exponent tells how many times.

These rules help simplify expressions with exponents and are essential for algebra.`,
        formulas: [
          {
            name: 'Product Rule',
            latex: 'a^m \\cdot a^n = a^{m+n}',
            description: 'When multiplying same bases, add exponents'
          },
          {
            name: 'Quotient Rule',
            latex: '\\frac{a^m}{a^n} = a^{m-n}',
            description: 'When dividing same bases, subtract exponents'
          },
          {
            name: 'Power Rule',
            latex: '(a^m)^n = a^{mn}',
            description: 'When raising a power to a power, multiply exponents'
          },
          {
            name: 'Zero Exponent',
            latex: 'a^0 = 1 \\text{ (where } a \\neq 0)',
            description: 'Any non-zero number to the zero power equals 1'
          },
          {
            name: 'Negative Exponent',
            latex: 'a^{-n} = \\frac{1}{a^n}',
            description: 'A negative exponent means take the reciprocal'
          },
          {
            name: 'Power of a Product',
            latex: '(ab)^n = a^n b^n',
            description: 'Distribute the exponent to each factor'
          }
        ],
        examples: [
          {
            problem: 'Simplify: x³ · x⁵',
            steps: [
              'Same base (x), so add exponents',
              'x³ · x⁵ = x³⁺⁵ = x⁸'
            ],
            solution: 'x⁸',
            explanation: 'Product rule: add the exponents'
          },
          {
            problem: 'Simplify: (2x²)³',
            steps: [
              'Apply power to each factor: 2³ · (x²)³',
              '2³ = 8',
              '(x²)³ = x⁶ (multiply exponents)',
              'Result: 8x⁶'
            ],
            solution: '8x⁶',
            explanation: 'Distribute the exponent, then apply the power rule'
          }
        ],
        commonMistakes: [
          'Adding exponents when you should multiply (power rule)',
          'Forgetting that x = x¹',
          'Not applying the exponent to the coefficient: (2x)² = 4x², not 2x²'
        ]
      },
      {
        id: 'algebra-5-2',
        title: 'Polynomial Operations',
        content: `A polynomial is an expression with variables and coefficients using only addition, subtraction, multiplication, and positive integer exponents.

Terms: Parts of a polynomial separated by + or -
Like terms: Terms with the same variable(s) raised to the same power(s)
Degree: The highest exponent in the polynomial`,
        examples: [
          {
            problem: 'Add: (3x² + 2x - 5) + (x² - 4x + 3)',
            steps: [
              'Remove parentheses: 3x² + 2x - 5 + x² - 4x + 3',
              'Combine like terms:',
              'x² terms: 3x² + x² = 4x²',
              'x terms: 2x + (-4x) = -2x',
              'Constants: -5 + 3 = -2'
            ],
            solution: '4x² - 2x - 2',
            explanation: 'Add the coefficients of like terms'
          },
          {
            problem: 'Subtract: (5x² - 3x + 7) - (2x² + x - 4)',
            steps: [
              'Distribute the negative sign: 5x² - 3x + 7 - 2x² - x + 4',
              'Combine like terms:',
              'x² terms: 5x² - 2x² = 3x²',
              'x terms: -3x - x = -4x',
              'Constants: 7 + 4 = 11'
            ],
            solution: '3x² - 4x + 11',
            explanation: 'Distribute the negative, then combine like terms'
          }
        ],
        tips: [
          'When subtracting, change the signs of ALL terms in the second polynomial',
          'Organize terms by degree to make combining easier'
        ]
      },
      {
        id: 'algebra-5-3',
        title: 'Multiplying Polynomials (FOIL)',
        content: `To multiply polynomials, distribute each term in the first polynomial to every term in the second.

FOIL is a mnemonic for multiplying two binomials:
- First: Multiply the first terms
- Outer: Multiply the outer terms
- Inner: Multiply the inner terms
- Last: Multiply the last terms`,
        formulas: [
          {
            name: 'FOIL Method',
            latex: '(a + b)(c + d) = ac + ad + bc + bd',
            description: 'First + Outer + Inner + Last'
          },
          {
            name: 'Square of a Binomial',
            latex: '(a + b)^2 = a^2 + 2ab + b^2',
            description: 'Perfect square trinomial (plus)'
          },
          {
            name: 'Square of a Binomial',
            latex: '(a - b)^2 = a^2 - 2ab + b^2',
            description: 'Perfect square trinomial (minus)'
          },
          {
            name: 'Difference of Squares',
            latex: '(a + b)(a - b) = a^2 - b^2',
            description: 'Sum times difference equals difference of squares'
          }
        ],
        examples: [
          {
            problem: 'Multiply: (x + 3)(x + 5)',
            steps: [
              'First: x · x = x²',
              'Outer: x · 5 = 5x',
              'Inner: 3 · x = 3x',
              'Last: 3 · 5 = 15',
              'Combine: x² + 5x + 3x + 15 = x² + 8x + 15'
            ],
            solution: 'x² + 8x + 15',
            explanation: 'Add the outer and inner terms (5x + 3x = 8x)'
          },
          {
            problem: 'Expand: (2x - 3)²',
            steps: [
              'Use the formula: (a - b)² = a² - 2ab + b²',
              'Here a = 2x, b = 3',
              'a² = (2x)² = 4x²',
              '2ab = 2(2x)(3) = 12x',
              'b² = 3² = 9',
              'Result: 4x² - 12x + 9'
            ],
            solution: '4x² - 12x + 9',
            explanation: 'Use the perfect square formula to avoid errors'
          }
        ],
        commonMistakes: [
          '(x + 3)² ≠ x² + 9 (forgot the middle term!)',
          'Forgetting to square coefficients: (2x)² = 4x², not 2x²'
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-6',
    sectionId: 'algebra',
    title: 'Factoring',
    description: 'Learn all major factoring techniques: GCF, difference of squares, trinomials, and grouping.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Factoring', 'GCF', 'Difference of Squares', 'Trinomials'],
    sections: [
      {
        id: 'algebra-6-1',
        title: 'GCF Factoring',
        content: `The first step in factoring any polynomial is to look for a Greatest Common Factor (GCF).

Steps:
1. Find the GCF of all terms (numbers AND variables)
2. Divide each term by the GCF
3. Write as: GCF × (quotients)`,
        examples: [
          {
            problem: 'Factor: 6x³ + 9x² - 12x',
            steps: [
              'Find GCF of coefficients: GCF(6, 9, 12) = 3',
              'Find GCF of variables: x (lowest power)',
              'GCF = 3x',
              'Divide each term: 6x³ ÷ 3x = 2x², 9x² ÷ 3x = 3x, 12x ÷ 3x = 4',
              'Write result: 3x(2x² + 3x - 4)'
            ],
            solution: '3x(2x² + 3x - 4)',
            explanation: 'Always factor out the GCF first!'
          }
        ],
        tips: [
          'ALWAYS check for a GCF first, before trying other methods',
          'Include the lowest power of each common variable',
          'Check by distributing the GCF back in'
        ]
      },
      {
        id: 'algebra-6-2',
        title: 'Difference of Squares',
        content: `A difference of squares has the form a² - b² and factors into conjugates (same terms, opposite signs).

This pattern only works for:
- DIFFERENCE (subtraction), not sum
- Both terms must be perfect squares`,
        formulas: [
          {
            name: 'Difference of Squares',
            latex: 'a^2 - b^2 = (a + b)(a - b)',
            description: 'Sum times difference of the square roots'
          }
        ],
        examples: [
          {
            problem: 'Factor: x² - 49',
            steps: [
              'Check: Is it a difference? Yes (subtraction)',
              'Are both terms perfect squares? x² = (x)², 49 = (7)²',
              'Apply the formula: a = x, b = 7',
              '(x + 7)(x - 7)'
            ],
            solution: '(x + 7)(x - 7)',
            explanation: 'Each factor has the same terms but opposite signs'
          },
          {
            problem: 'Factor: 4x² - 25',
            steps: [
              '4x² = (2x)², 25 = (5)²',
              'a = 2x, b = 5',
              '(2x + 5)(2x - 5)'
            ],
            solution: '(2x + 5)(2x - 5)',
            explanation: 'The square root of 4x² is 2x'
          }
        ],
        commonMistakes: [
          'Trying to use this pattern on a SUM of squares (x² + 49 does not factor over the reals)',
          'Forgetting the coefficient: 4x² is (2x)², not 4·x²'
        ]
      },
      {
        id: 'algebra-6-3',
        title: 'Factoring Trinomials',
        content: `For trinomials of the form x² + bx + c (leading coefficient is 1):

Find two numbers that:
- MULTIPLY to give c (the constant)
- ADD to give b (the coefficient of x)

These numbers go in the binomial factors.`,
        formulas: [
          {
            name: 'Simple Trinomial',
            latex: 'x^2 + bx + c = (x + m)(x + n)',
            description: 'Where m × n = c and m + n = b',
            variables: { m: 'first factor of c', n: 'second factor of c' }
          }
        ],
        examples: [
          {
            problem: 'Factor: x² + 7x + 12',
            steps: [
              'Need two numbers that multiply to 12 and add to 7',
              'Factors of 12: 1×12, 2×6, 3×4',
              '3 + 4 = 7 ✓',
              'x² + 7x + 12 = (x + 3)(x + 4)'
            ],
            solution: '(x + 3)(x + 4)',
            explanation: 'Check by FOIL: x² + 4x + 3x + 12 = x² + 7x + 12 ✓'
          },
          {
            problem: 'Factor: x² - 5x + 6',
            steps: [
              'Need numbers that multiply to +6 and add to -5',
              'Since product is positive and sum is negative, both numbers are negative',
              '-2 × -3 = 6 ✓, -2 + (-3) = -5 ✓',
              '(x - 2)(x - 3)'
            ],
            solution: '(x - 2)(x - 3)',
            explanation: 'Signs matter! Both negative when c > 0 and b < 0'
          }
        ],
        tips: [
          'If c is positive, both numbers have the same sign (both + or both -)',
          'If c is negative, the numbers have different signs',
          'The sign of b tells you which number is "larger" or which sign dominates'
        ]
      },
      {
        id: 'algebra-6-4',
        title: 'Factoring ax² + bx + c (a ≠ 1)',
        content: `When the leading coefficient is not 1, use the AC method:

1. Multiply a × c
2. Find factors of ac that add to b
3. Rewrite the middle term using these factors
4. Factor by grouping`,
        examples: [
          {
            problem: 'Factor: 2x² + 5x + 3',
            steps: [
              'a = 2, c = 3, so ac = 6',
              'Find factors of 6 that add to 5: 2 and 3',
              'Rewrite: 2x² + 2x + 3x + 3',
              'Group: (2x² + 2x) + (3x + 3)',
              'Factor each group: 2x(x + 1) + 3(x + 1)',
              'Factor out (x + 1): (x + 1)(2x + 3)'
            ],
            solution: '(2x + 3)(x + 1)',
            explanation: 'The AC method works for any trinomial'
          }
        ]
      }
    ]
  },
  {
    id: 'algebra-unit-7',
    sectionId: 'algebra',
    title: 'Quadratic Equations',
    description: 'Solve quadratic equations by factoring, completing the square, and using the quadratic formula.',
    xpCost: 5,
    estimatedReadTime: 15,
    relatedTopics: ['Quadratics', 'Quadratic Formula', 'Completing the Square', 'Factoring'],
    sections: [
      {
        id: 'algebra-7-1',
        title: 'Solving by Factoring',
        content: `A quadratic equation has the form ax² + bx + c = 0. To solve by factoring:

1. Get one side equal to zero
2. Factor the quadratic expression
3. Set each factor equal to zero (Zero Product Property)
4. Solve each equation`,
        formulas: [
          {
            name: 'Zero Product Property',
            latex: 'ab = 0 \\Rightarrow a = 0 \\text{ or } b = 0',
            description: 'If a product equals zero, at least one factor must be zero'
          }
        ],
        examples: [
          {
            problem: 'Solve: x² - 5x + 6 = 0',
            steps: [
              'Factor: (x - 2)(x - 3) = 0',
              'Set each factor to zero:',
              'x - 2 = 0 → x = 2',
              'x - 3 = 0 → x = 3'
            ],
            solution: 'x = 2 or x = 3',
            explanation: 'Quadratic equations often have two solutions'
          }
        ]
      },
      {
        id: 'algebra-7-2',
        title: 'The Quadratic Formula',
        content: `The quadratic formula works for ANY quadratic equation ax² + bx + c = 0. It gives you the exact solutions.

The discriminant (b² - 4ac) tells you about the solutions:
- If b² - 4ac > 0: Two real solutions
- If b² - 4ac = 0: One real solution (double root)
- If b² - 4ac < 0: No real solutions (complex numbers)`,
        formulas: [
          {
            name: 'Quadratic Formula',
            latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
            description: 'Solutions to ax² + bx + c = 0',
            variables: { a: 'coefficient of x²', b: 'coefficient of x', c: 'constant term' }
          },
          {
            name: 'Discriminant',
            latex: '\\Delta = b^2 - 4ac',
            description: 'Determines the nature and number of solutions'
          }
        ],
        examples: [
          {
            problem: 'Solve: 2x² - 7x + 3 = 0',
            steps: [
              'Identify a = 2, b = -7, c = 3',
              'Calculate discriminant: (-7)² - 4(2)(3) = 49 - 24 = 25',
              'Apply formula: x = (7 ± √25) / (2·2) = (7 ± 5) / 4',
              'x = (7 + 5)/4 = 3 or x = (7 - 5)/4 = 1/2'
            ],
            solution: 'x = 3 or x = 1/2',
            explanation: 'The ± gives us two solutions'
          }
        ],
        tips: [
          'Memorize the formula by singing or by remembering "negative b plus or minus the square root of b squared minus 4ac, all over 2a"',
          'Watch the signs carefully, especially when b is negative',
          'Simplify the discriminant first, then take the square root'
        ],
        commonMistakes: [
          'Forgetting the 2a in the denominator applies to BOTH terms',
          'Sign errors with -b when b is already negative',
          'Not simplifying radicals in the final answer'
        ]
      },
      {
        id: 'algebra-7-3',
        title: 'Completing the Square',
        content: `Completing the square converts ax² + bx + c to vertex form a(x - h)² + k.

Steps (when a = 1):
1. Move the constant to the other side
2. Take half of b, then square it: (b/2)²
3. Add this value to both sides
4. Factor the left side as a perfect square
5. Solve by taking square roots`,
        formulas: [
          {
            name: 'Vertex Form',
            latex: 'y = a(x - h)^2 + k',
            description: 'Vertex of the parabola is at (h, k)',
            variables: { h: 'x-coordinate of vertex', k: 'y-coordinate of vertex' }
          },
          {
            name: 'Complete the Square',
            latex: 'x^2 + bx + \\left(\\frac{b}{2}\\right)^2 = \\left(x + \\frac{b}{2}\\right)^2',
            description: 'Add (b/2)² to create a perfect square'
          }
        ],
        examples: [
          {
            problem: 'Solve: x² + 6x + 5 = 0 by completing the square',
            steps: [
              'Move constant: x² + 6x = -5',
              'Half of 6 is 3, squared is 9',
              'Add 9 to both sides: x² + 6x + 9 = -5 + 9 = 4',
              'Factor: (x + 3)² = 4',
              'Take square root: x + 3 = ±2',
              'Solve: x = -3 + 2 = -1 or x = -3 - 2 = -5'
            ],
            solution: 'x = -1 or x = -5',
            explanation: 'Check: (-1)² + 6(-1) + 5 = 1 - 6 + 5 = 0 ✓'
          }
        ]
      }
    ]
  }
]

export default ALGEBRA_REFERENCE_UNITS


