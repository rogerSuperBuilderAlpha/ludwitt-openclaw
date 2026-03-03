/**
 * Math Problem Templates
 * 
 * Verified templates for generating math problems.
 */

import { ProblemTemplate, TemplateCategory } from '../types'

// ============================================================================
// Arithmetic Templates
// ============================================================================

export const ARITHMETIC_TEMPLATES: ProblemTemplate[] = [
  {
    id: 'arith_add_2digit',
    name: 'Two-Digit Addition',
    subject: 'math',
    category: 'arithmetic',
    structure: {
      type: 'arithmetic',
      template: 'What is {a} + {b}?',
      variables: [
        { name: 'a', type: 'integer', min: 10, max: 99, difficultyWeight: 0.3 },
        { name: 'b', type: 'integer', min: 10, max: 99, difficultyWeight: 0.3 }
      ],
      answerFormula: 'a + b',
      explanationTemplate: 'Add the ones place: {a_ones} + {b_ones} = {ones_sum}. Add the tens place: {a_tens} + {b_tens} = {tens_sum}. Combine: {answer}.'
    },
    difficultyRange: [1, 3],
    difficultyFactors: [
      { name: 'operand_size', type: 'numeric_range', weight: 0.5, description: 'Size of numbers affects difficulty' },
      { name: 'carrying', type: 'operation_count', weight: 0.5, description: 'Carrying increases difficulty' }
    ],
    requiredSkills: ['math_addition'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Result must be an integer' },
      { type: 'positive_result', errorMessage: 'Result must be positive' },
      { type: 'numeric_bounds', expression: 'answer <= 200', errorMessage: 'Answer too large for difficulty' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.75
  },
  {
    id: 'arith_sub_regrouping',
    name: 'Subtraction with Regrouping',
    subject: 'math',
    category: 'arithmetic',
    structure: {
      type: 'arithmetic',
      template: 'What is {a} - {b}?',
      variables: [
        { name: 'a', type: 'integer', min: 30, max: 99, difficultyWeight: 0.3 },
        { name: 'b', type: 'integer', min: 10, max: 49, difficultyWeight: 0.3 }
      ],
      answerFormula: 'a - b',
      explanationTemplate: 'Since we cannot subtract {b_ones} from {a_ones}, we borrow from the tens place. Then {a_ones_after_borrow} - {b_ones} = {ones_diff}. The tens: {a_tens_after_borrow} - {b_tens} = {tens_diff}. Answer: {answer}.'
    },
    difficultyRange: [2, 4],
    difficultyFactors: [
      { name: 'regrouping_count', type: 'operation_count', weight: 0.6, description: 'Number of regrouping steps' },
      { name: 'operand_size', type: 'numeric_range', weight: 0.4, description: 'Size of numbers' }
    ],
    requiredSkills: ['math_subtraction'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Result must be an integer' },
      { type: 'positive_result', errorMessage: 'a must be larger than b' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.65
  },
  {
    id: 'arith_mult_single',
    name: 'Single-Digit Multiplication',
    subject: 'math',
    category: 'arithmetic',
    structure: {
      type: 'arithmetic',
      template: 'What is {a} × {b}?',
      variables: [
        { name: 'a', type: 'integer', min: 2, max: 12, difficultyWeight: 0.5 },
        { name: 'b', type: 'integer', min: 2, max: 12, difficultyWeight: 0.5 }
      ],
      answerFormula: 'a * b',
      explanationTemplate: '{a} × {b} = {answer}. Think of it as {a} groups of {b}.'
    },
    difficultyRange: [1, 3],
    difficultyFactors: [
      { name: 'factor_size', type: 'numeric_range', weight: 1.0, description: 'Size of factors' }
    ],
    requiredSkills: ['math_multiplication'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Result must be an integer' },
      { type: 'positive_result', errorMessage: 'Result must be positive' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.8
  },
  {
    id: 'arith_div_no_remainder',
    name: 'Division (No Remainder)',
    subject: 'math',
    category: 'arithmetic',
    structure: {
      type: 'arithmetic',
      template: 'What is {dividend} ÷ {divisor}?',
      variables: [
        { name: 'divisor', type: 'integer', min: 2, max: 12, difficultyWeight: 0.4 },
        { name: 'quotient', type: 'integer', min: 2, max: 12, difficultyWeight: 0.4 },
        { name: 'dividend', type: 'integer', dependsOn: 'divisor,quotient', formula: 'divisor * quotient' }
      ],
      answerFormula: 'dividend / divisor',
      explanationTemplate: '{dividend} ÷ {divisor} = {quotient}. Check: {divisor} × {quotient} = {dividend}.'
    },
    difficultyRange: [2, 4],
    difficultyFactors: [
      { name: 'divisor_size', type: 'numeric_range', weight: 0.5, description: 'Size of divisor' },
      { name: 'dividend_size', type: 'numeric_range', weight: 0.5, description: 'Size of dividend' }
    ],
    requiredSkills: ['math_division'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Must divide evenly' },
      { type: 'no_division_by_zero', errorMessage: 'Cannot divide by zero' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.7
  }
]

// ============================================================================
// Algebra Templates
// ============================================================================

export const ALGEBRA_TEMPLATES: ProblemTemplate[] = [
  {
    id: 'alg_solve_linear_1step',
    name: 'One-Step Linear Equation',
    subject: 'math',
    category: 'algebra',
    structure: {
      type: 'algebraic',
      template: 'Solve for x: x {op} {a} = {b}',
      variables: [
        { name: 'op', type: 'string', choices: ['+', '-'] },
        { name: 'a', type: 'integer', min: 1, max: 20, difficultyWeight: 0.3 },
        { name: 'b', type: 'integer', min: 5, max: 30, difficultyWeight: 0.3 }
      ],
      answerFormula: "op === '+' ? b - a : b + a",
      explanationTemplate: 'To isolate x, {inverse_op} {a} from both sides: x = {b} {inverse_op} {a} = {answer}.'
    },
    difficultyRange: [3, 5],
    difficultyFactors: [
      { name: 'number_size', type: 'numeric_range', weight: 0.5, description: 'Size of coefficients' },
      { name: 'operation_type', type: 'operation_count', weight: 0.5, description: 'Type of operation' }
    ],
    requiredSkills: ['math_variables', 'math_equations'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Solution should be an integer' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.65
  },
  {
    id: 'alg_solve_linear_2step',
    name: 'Two-Step Linear Equation',
    subject: 'math',
    category: 'algebra',
    structure: {
      type: 'algebraic',
      template: 'Solve for x: {a}x + {b} = {c}',
      variables: [
        { name: 'a', type: 'integer', min: 2, max: 10, exclude: [0], difficultyWeight: 0.3 },
        { name: 'x_value', type: 'integer', min: 1, max: 10, difficultyWeight: 0.3 },
        { name: 'b', type: 'integer', min: -10, max: 10, difficultyWeight: 0.2 },
        { name: 'c', type: 'integer', dependsOn: 'a,x_value,b', formula: 'a * x_value + b' }
      ],
      answerFormula: 'x_value',
      explanationTemplate: 'Step 1: Subtract {b} from both sides: {a}x = {c_minus_b}. Step 2: Divide by {a}: x = {answer}.'
    },
    difficultyRange: [4, 6],
    difficultyFactors: [
      { name: 'coefficient_size', type: 'numeric_range', weight: 0.4, description: 'Size of coefficients' },
      { name: 'negative_numbers', type: 'negative_numbers', weight: 0.4, description: 'Presence of negatives' },
      { name: 'step_count', type: 'operation_count', weight: 0.2, description: 'Number of steps' }
    ],
    requiredSkills: ['math_variables', 'math_equations'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Solution should be an integer' },
      { type: 'no_division_by_zero', errorMessage: 'Coefficient cannot be zero' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.55
  }
]

// ============================================================================
// Word Problem Templates
// ============================================================================

export const WORD_PROBLEM_TEMPLATES: ProblemTemplate[] = [
  {
    id: 'word_simple_addition',
    name: 'Simple Addition Word Problem',
    subject: 'math',
    category: 'word_problem',
    structure: {
      type: 'word_problem',
      template: '{name} has {a} {item}. {friend} gives {pronoun} {b} more {item}. How many {item} does {name} have now?',
      variables: [
        { name: 'name', type: 'string', choices: ['Emma', 'Liam', 'Sophia', 'Noah', 'Olivia'] },
        { name: 'friend', type: 'string', choices: ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey'] },
        { name: 'pronoun', type: 'string', choices: ['them', 'her', 'him'] },
        { name: 'item', type: 'string', choices: ['apples', 'books', 'marbles', 'stickers', 'coins'] },
        { name: 'a', type: 'integer', min: 3, max: 20, difficultyWeight: 0.4 },
        { name: 'b', type: 'integer', min: 2, max: 15, difficultyWeight: 0.4 }
      ],
      answerFormula: 'a + b',
      explanationTemplate: '{name} started with {a} {item}, then received {b} more. Total: {a} + {b} = {answer} {item}.'
    },
    difficultyRange: [1, 3],
    difficultyFactors: [
      { name: 'number_size', type: 'numeric_range', weight: 0.6, description: 'Size of numbers' },
      { name: 'word_count', type: 'word_count', weight: 0.4, description: 'Length of problem' }
    ],
    requiredSkills: ['math_addition'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Result must be an integer' },
      { type: 'numeric_bounds', expression: 'answer < 50', errorMessage: 'Answer should be reasonable' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.8
  },
  {
    id: 'word_comparison',
    name: 'Comparison Word Problem',
    subject: 'math',
    category: 'word_problem',
    structure: {
      type: 'word_problem',
      template: '{name1} has {a} {item}. {name2} has {b} {comparison} {item} than {name1}. How many {item} does {name2} have?',
      variables: [
        { name: 'name1', type: 'string', choices: ['Emma', 'Liam', 'Sophia', 'Noah'] },
        { name: 'name2', type: 'string', choices: ['Alex', 'Sam', 'Jordan', 'Taylor'] },
        { name: 'item', type: 'string', choices: ['apples', 'books', 'marbles', 'stickers'] },
        { name: 'comparison', type: 'string', choices: ['more', 'fewer'] },
        { name: 'a', type: 'integer', min: 10, max: 30, difficultyWeight: 0.3 },
        { name: 'b', type: 'integer', min: 3, max: 12, difficultyWeight: 0.3 }
      ],
      answerFormula: "comparison === 'more' ? a + b : a - b",
      explanationTemplate: '{name2} has {b} {comparison} {item} than {name1}\'s {a}. So: {a} {op} {b} = {answer}.'
    },
    difficultyRange: [2, 4],
    difficultyFactors: [
      { name: 'comparison_type', type: 'operation_count', weight: 0.4, description: 'More vs fewer adds complexity' },
      { name: 'number_size', type: 'numeric_range', weight: 0.4, description: 'Size of numbers' },
      { name: 'word_count', type: 'word_count', weight: 0.2, description: 'Reading complexity' }
    ],
    requiredSkills: ['math_addition', 'math_subtraction'],
    validationRules: [
      { type: 'integer_result', errorMessage: 'Result must be an integer' },
      { type: 'positive_result', errorMessage: 'Result must be positive' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.7
  }
]

// ============================================================================
// Fraction Templates
// ============================================================================

export const FRACTION_TEMPLATES: ProblemTemplate[] = [
  {
    id: 'frac_simplify',
    name: 'Simplify Fraction',
    subject: 'math',
    category: 'fractions',
    structure: {
      type: 'arithmetic',
      template: 'Simplify: {numerator}/{denominator}',
      variables: [
        { name: 'gcd', type: 'integer', min: 2, max: 6, difficultyWeight: 0.3 },
        { name: 'simplified_num', type: 'integer', min: 1, max: 5, difficultyWeight: 0.2 },
        { name: 'simplified_den', type: 'integer', min: 2, max: 8, difficultyWeight: 0.2 },
        { name: 'numerator', type: 'integer', dependsOn: 'gcd,simplified_num', formula: 'gcd * simplified_num' },
        { name: 'denominator', type: 'integer', dependsOn: 'gcd,simplified_den', formula: 'gcd * simplified_den' }
      ],
      answerFormula: 'simplified_num + "/" + simplified_den',
      explanationTemplate: 'Find GCD of {numerator} and {denominator}: it\'s {gcd}. Divide both by {gcd}: {numerator}/{gcd} = {simplified_num}, {denominator}/{gcd} = {simplified_den}. Answer: {answer}.'
    },
    difficultyRange: [3, 5],
    difficultyFactors: [
      { name: 'gcd_size', type: 'numeric_range', weight: 0.5, description: 'Size of common factor' },
      { name: 'fraction_size', type: 'numeric_range', weight: 0.5, description: 'Size of original fraction' }
    ],
    requiredSkills: ['math_fractions'],
    validationRules: [
      { type: 'custom', expression: 'simplified_num < simplified_den', errorMessage: 'Must be proper fraction' }
    ],
    createdAt: new Date('2024-01-01'),
    usageCount: 0,
    successRate: 0.6
  }
]

// ============================================================================
// Export All Math Templates
// ============================================================================

export const ALL_MATH_TEMPLATES: ProblemTemplate[] = [
  ...ARITHMETIC_TEMPLATES,
  ...ALGEBRA_TEMPLATES,
  ...WORD_PROBLEM_TEMPLATES,
  ...FRACTION_TEMPLATES
]

export const MATH_TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: 'arithmetic',
    name: 'Arithmetic',
    subject: 'math',
    templates: ARITHMETIC_TEMPLATES,
    description: 'Basic operations: addition, subtraction, multiplication, division'
  },
  {
    id: 'algebra',
    name: 'Algebra',
    subject: 'math',
    templates: ALGEBRA_TEMPLATES,
    description: 'Equations and expressions with variables'
  },
  {
    id: 'word_problems',
    name: 'Word Problems',
    subject: 'math',
    templates: WORD_PROBLEM_TEMPLATES,
    description: 'Real-world applications of math concepts'
  },
  {
    id: 'fractions',
    name: 'Fractions',
    subject: 'math',
    templates: FRACTION_TEMPLATES,
    description: 'Fraction operations and simplification'
  }
]
