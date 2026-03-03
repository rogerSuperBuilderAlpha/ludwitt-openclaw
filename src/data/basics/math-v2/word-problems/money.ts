/**
 * Money Word Problems V2 - Grade 3-7
 * 
 * Topics covered:
 * - Making Change (grades 3-4)
 * - Budgeting (grades 4-5)
 * - Discounts and Sales Tax (grades 5-6)
 * - Simple Interest (grades 6-7)
 * - Compound Interest (grade 7)
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const MONEY_WORD_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // MAKING CHANGE (5 problems) - Grades 3-4
  // ============================================================================
  {
    id: 'word-v2-g3-money-001',
    version: 2,
    type: 'word-problem',
    difficulty: 3.0,
    gradeLevel: 3,
    question: {
      text: 'Mia buys a pencil for 35 cents. She pays with 2 quarters. How much change does she get back?'
    },
    answer: {
      type: 'numeric',
      correct: '15',
      acceptable: ['15', '15 cents', '$0.15', '0.15', '15¢'],
      unit: 'cents'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find how much Mia pays', latex: '2 \\times 25 = 50 \\text{ cents}' },
        { number: 2, description: 'Subtract the cost from payment', latex: '50 - 35 = 15 \\text{ cents}' }
      ],
      method: 'Subtraction for finding change'
    },
    hints: [
      { level: 'gentle', text: 'First figure out how much 2 quarters is worth.' },
      { level: 'moderate', text: '2 quarters = 50 cents. Now subtract the cost of the pencil.' },
      { level: 'explicit', text: '50 cents - 35 cents = 15 cents change.' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Making Change',
      skills: ['money_counting', 'subtraction'],
      prerequisites: ['coin_values', 'subtraction_within_100'],
      concepts: ['money', 'change', 'subtraction'],
      commonMistakes: ['Not knowing quarter value', 'Subtracting wrong direction'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'making-change', 'grade-3'] }
  },
  {
    id: 'word-v2-g3-money-002',
    version: 2,
    type: 'word-problem',
    difficulty: 3.0,
    gradeLevel: 3,
    question: {
      text: 'Leo buys a sticker for $0.75. He pays with $1.00. How much change should he get?'
    },
    answer: {
      type: 'numeric',
      correct: '0.25',
      acceptable: ['0.25', '$0.25', '25 cents', '25¢', '.25'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract cost from payment', latex: '\\$1.00 - \\$0.75 = \\$0.25' }
      ],
      method: 'Subtraction for change'
    },
    hints: [
      { level: 'gentle', text: 'How much is left when you take 75 cents away from 1 dollar?' },
      { level: 'moderate', text: '100 cents - 75 cents = ?' },
      { level: 'explicit', text: '$1.00 - $0.75 = $0.25 or 25 cents' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Making Change',
      skills: ['decimal_subtraction', 'money_calculation'],
      prerequisites: ['subtraction_within_100'],
      concepts: ['money', 'change', 'decimals'],
      commonMistakes: ['Decimal place errors', 'Subtracting wrong direction'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'making-change', 'grade-3'] }
  },
  {
    id: 'word-v2-g3-money-003',
    version: 2,
    type: 'word-problem',
    difficulty: 3.5,
    gradeLevel: 3,
    question: {
      text: 'Emma has 3 dimes and 2 nickels. She wants to buy a toy car that costs 45 cents. Does she have enough money?'
    },
    answer: {
      type: 'exact',
      correct: 'No',
      acceptable: ['No', 'no', 'NO', 'She does not', 'not enough']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate value of dimes', latex: '3 \\times 10 = 30 \\text{ cents}' },
        { number: 2, description: 'Calculate value of nickels', latex: '2 \\times 5 = 10 \\text{ cents}' },
        { number: 3, description: 'Find total money', latex: '30 + 10 = 40 \\text{ cents}' },
        { number: 4, description: 'Compare to price', latex: '40 < 45, \\text{ so no}' }
      ],
      method: 'Count coins and compare'
    },
    hints: [
      { level: 'gentle', text: 'First count how much money Emma has. Remember: dimes = 10 cents, nickels = 5 cents.' },
      { level: 'moderate', text: '3 dimes = 30 cents, 2 nickels = 10 cents. Total = 40 cents. Is 40 enough for 45?' },
      { level: 'explicit', text: 'Emma has 40 cents but needs 45 cents. She is 5 cents short, so no.' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Making Change',
      skills: ['coin_counting', 'comparison', 'addition'],
      prerequisites: ['coin_values', 'addition', 'comparison'],
      concepts: ['money', 'coin-values', 'comparison'],
      commonMistakes: ['Confusing dime and nickel values', 'Addition errors'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'coin-counting', 'grade-3'] }
  },
  {
    id: 'word-v2-g4-money-004',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'James buys a comic book for $4.25 and a bookmark for $1.50. He pays with a $10 bill. How much change does he receive?'
    },
    answer: {
      type: 'numeric',
      correct: '4.25',
      acceptable: ['4.25', '$4.25', '4 dollars and 25 cents'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the costs together', latex: '\\$4.25 + \\$1.50 = \\$5.75' },
        { number: 2, description: 'Subtract total from payment', latex: '\\$10.00 - \\$5.75 = \\$4.25' }
      ],
      method: 'Add costs, then subtract from payment'
    },
    hints: [
      { level: 'gentle', text: 'First find the total cost of both items, then subtract from $10.' },
      { level: 'moderate', text: 'Total cost: $4.25 + $1.50 = $5.75. Now subtract from $10.' },
      { level: 'explicit', text: '$10.00 - $5.75 = $4.25 change' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Making Change',
      skills: ['decimal_addition', 'decimal_subtraction', 'multi_step'],
      prerequisites: ['addition_decimals', 'subtraction_decimals'],
      concepts: ['money', 'change', 'multi-step'],
      commonMistakes: ['Decimal alignment errors', 'Forgetting to add both items'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'making-change', 'grade-4'] }
  },
  {
    id: 'word-v2-g4-money-005',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Sophie has $20. She buys a book for $7.50, a notebook for $3.25, and a pen for $1.75. How much money does she have left?'
    },
    answer: {
      type: 'numeric',
      correct: '7.50',
      acceptable: ['7.50', '$7.50', '7.5', '$7.5'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Add all the costs', latex: '\\$7.50 + \\$3.25 + \\$1.75 = \\$12.50' },
        { number: 2, description: 'Subtract from starting amount', latex: '\\$20.00 - \\$12.50 = \\$7.50' }
      ],
      method: 'Sum all purchases, then subtract'
    },
    hints: [
      { level: 'gentle', text: 'Add up everything Sophie bought, then subtract from $20.' },
      { level: 'moderate', text: '$7.50 + $3.25 + $1.75 = $12.50. How much is left from $20?' },
      { level: 'explicit', text: '$20.00 - $12.50 = $7.50 remaining' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Making Change',
      skills: ['decimal_addition', 'decimal_subtraction', 'multi_step'],
      prerequisites: ['addition_decimals', 'subtraction_decimals'],
      concepts: ['money', 'change', 'multi-step'],
      commonMistakes: ['Missing an item when adding', 'Decimal errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'making-change', 'grade-4'] }
  },

  // ============================================================================
  // BUDGETING (5 problems) - Grades 4-5
  // ============================================================================
  {
    id: 'word-v2-g4-money-006',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Tyler gets $15 allowance each week. He wants to save $45 for a video game. How many weeks will it take him to save enough?'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', '3 weeks', 'three', 'three weeks'],
      unit: 'weeks'
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide goal by weekly savings', latex: '\\$45 \\div \\$15 = 3 \\text{ weeks}' }
      ],
      method: 'Division to find number of weeks'
    },
    hints: [
      { level: 'gentle', text: 'How many times does $15 fit into $45?' },
      { level: 'moderate', text: 'Divide $45 by $15 to find how many weeks.' },
      { level: 'explicit', text: '$45 ÷ $15 = 3 weeks' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Budgeting',
      skills: ['division', 'money_calculation'],
      prerequisites: ['division'],
      concepts: ['budgeting', 'savings', 'division'],
      commonMistakes: ['Multiplying instead of dividing', 'Mixing up which number divides which'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'budgeting', 'grade-4'] }
  },
  {
    id: 'word-v2-g4-money-007',
    version: 2,
    type: 'word-problem',
    difficulty: 4.5,
    gradeLevel: 4,
    question: {
      text: 'Maya has a budget of $50 for her birthday party. She spends $18 on decorations and $22 on food. How much can she still spend on games?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '$10', '$10.00', '10 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Add what she has spent', latex: '\\$18 + \\$22 = \\$40' },
        { number: 2, description: 'Subtract from budget', latex: '\\$50 - \\$40 = \\$10' }
      ],
      method: 'Sum expenses, subtract from budget'
    },
    hints: [
      { level: 'gentle', text: 'First find out how much Maya has already spent.' },
      { level: 'moderate', text: '$18 + $22 = $40 spent. How much of her $50 budget is left?' },
      { level: 'explicit', text: '$50 - $40 = $10 left for games' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Budgeting',
      skills: ['addition', 'subtraction', 'budgeting'],
      prerequisites: ['addition', 'subtraction'],
      concepts: ['budgeting', 'expenses', 'remaining-balance'],
      commonMistakes: ['Forgetting to add expenses first', 'Subtracting wrong values'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'budgeting', 'grade-4'] }
  },
  {
    id: 'word-v2-g5-money-008',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'The Chen family saves $125 each month. Their vacation costs $1,500. How many months will they need to save to pay for the trip?'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 months', 'twelve', 'twelve months'],
      unit: 'months'
    },
    solution: {
      steps: [
        { number: 1, description: 'Divide vacation cost by monthly savings', latex: '\\$1{,}500 \\div \\$125 = 12 \\text{ months}' }
      ],
      method: 'Division for time to reach goal'
    },
    hints: [
      { level: 'gentle', text: 'How many times does $125 go into $1,500?' },
      { level: 'moderate', text: '$1,500 ÷ $125 = ?' },
      { level: 'explicit', text: '$1,500 ÷ $125 = 12 months' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Budgeting',
      skills: ['division', 'money_calculation'],
      prerequisites: ['division_multi_digit'],
      concepts: ['budgeting', 'savings-goals', 'division'],
      commonMistakes: ['Long division errors', 'Mixing up dividend and divisor'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'budgeting', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-money-009',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Ethan earns $8.50 per hour mowing lawns. He worked 6 hours on Saturday and 4 hours on Sunday. How much did he earn for the weekend?'
    },
    answer: {
      type: 'numeric',
      correct: '85',
      acceptable: ['85', '$85', '$85.00', '85 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find total hours worked', latex: '6 + 4 = 10 \\text{ hours}' },
        { number: 2, description: 'Multiply by hourly rate', latex: '10 \\times \\$8.50 = \\$85.00' }
      ],
      method: 'Total hours × hourly rate'
    },
    hints: [
      { level: 'gentle', text: 'First find the total hours Ethan worked, then multiply by his hourly pay.' },
      { level: 'moderate', text: '6 + 4 = 10 hours total. Now multiply 10 × $8.50.' },
      { level: 'explicit', text: '10 × $8.50 = $85' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Budgeting',
      skills: ['addition', 'decimal_multiplication', 'money_calculation'],
      prerequisites: ['multiplication_decimals'],
      concepts: ['earnings', 'hourly-wage', 'total-pay'],
      commonMistakes: ['Calculating each day separately and adding wrong', 'Decimal multiplication errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'budgeting', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-money-010',
    version: 2,
    type: 'word-problem',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Ava wants to buy a bicycle that costs $240. She has already saved $85. If she saves $15.50 per week from her chores, how many more weeks until she can buy the bicycle?'
    },
    answer: {
      type: 'numeric',
      correct: '10',
      acceptable: ['10', '10 weeks', 'ten', 'ten weeks'],
      unit: 'weeks'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find how much more Ava needs', latex: '\\$240 - \\$85 = \\$155' },
        { number: 2, description: 'Divide by weekly savings', latex: '\\$155 \\div \\$15.50 = 10 \\text{ weeks}' }
      ],
      method: 'Find remaining amount, divide by rate'
    },
    hints: [
      { level: 'gentle', text: 'First figure out how much more money Ava needs. Then divide by her weekly savings.' },
      { level: 'moderate', text: '$240 - $85 = $155 still needed. Now divide $155 by $15.50.' },
      { level: 'explicit', text: '$155 ÷ $15.50 = 10 weeks' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Budgeting',
      skills: ['subtraction', 'decimal_division', 'multi_step'],
      prerequisites: ['subtraction', 'division_decimals'],
      concepts: ['budgeting', 'savings-goals', 'multi-step'],
      commonMistakes: ['Forgetting to subtract initial savings', 'Division errors with decimals'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'budgeting', 'grade-5'] }
  },

  // ============================================================================
  // DISCOUNTS AND SALES TAX (5 problems) - Grades 5-6
  // ============================================================================
  {
    id: 'word-v2-g5-money-011',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A jacket is on sale for 25% off. The original price is $60. What is the sale price?'
    },
    answer: {
      type: 'numeric',
      correct: '45',
      acceptable: ['45', '$45', '$45.00', '45 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the discount amount', latex: '\\$60 \\times 0.25 = \\$15' },
        { number: 2, description: 'Subtract discount from original', latex: '\\$60 - \\$15 = \\$45' }
      ],
      method: 'Calculate discount, subtract from original'
    },
    hints: [
      { level: 'gentle', text: '25% off means you pay 75% of the original price, or subtract 25% from the price.' },
      { level: 'moderate', text: 'Discount = $60 × 0.25 = $15. Subtract from $60.' },
      { level: 'explicit', text: '$60 - $15 = $45 sale price' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Discounts and Sales Tax',
      skills: ['percent_of_number', 'subtraction', 'discount_calculation'],
      prerequisites: ['percentages', 'multiplication_decimals'],
      concepts: ['discount', 'percent-off', 'sale-price'],
      commonMistakes: ['Confusing percent with decimal (using 25 instead of 0.25)', 'Forgetting to subtract'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'discount', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-money-012',
    version: 2,
    type: 'word-problem',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'Carlos buys a skateboard for $80. The sales tax is 5%. What is the total cost including tax?'
    },
    answer: {
      type: 'numeric',
      correct: '84',
      acceptable: ['84', '$84', '$84.00', '84 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the tax amount', latex: '\\$80 \\times 0.05 = \\$4' },
        { number: 2, description: 'Add tax to price', latex: '\\$80 + \\$4 = \\$84' }
      ],
      method: 'Calculate tax, add to price'
    },
    hints: [
      { level: 'gentle', text: 'Sales tax is added to the price. Find 5% of $80, then add it.' },
      { level: 'moderate', text: 'Tax = $80 × 0.05 = $4. Add to the original price.' },
      { level: 'explicit', text: '$80 + $4 = $84 total' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Discounts and Sales Tax',
      skills: ['percent_of_number', 'addition', 'tax_calculation'],
      prerequisites: ['percentages', 'multiplication_decimals'],
      concepts: ['sales-tax', 'percent', 'total-cost'],
      commonMistakes: ['Subtracting tax instead of adding', 'Percent to decimal conversion errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'sales-tax', 'grade-5'] }
  },
  {
    id: 'word-v2-g6-money-013',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A laptop originally costs $800. It\'s on sale for 15% off. If the sales tax is 8%, what is the final price after the discount and tax?'
    },
    answer: {
      type: 'numeric',
      correct: '734.40',
      acceptable: ['734.40', '$734.40', '734.4'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate the discount', latex: '\\$800 \\times 0.15 = \\$120' },
        { number: 2, description: 'Find sale price', latex: '\\$800 - \\$120 = \\$680' },
        { number: 3, description: 'Calculate tax on sale price', latex: '\\$680 \\times 0.08 = \\$54.40' },
        { number: 4, description: 'Add tax to sale price', latex: '\\$680 + \\$54.40 = \\$734.40' }
      ],
      method: 'Apply discount first, then add tax'
    },
    hints: [
      { level: 'gentle', text: 'First apply the discount to find the sale price. Then calculate and add the sales tax.' },
      { level: 'moderate', text: 'Sale price = $800 - $120 = $680. Now find 8% of $680 and add it.' },
      { level: 'explicit', text: '$680 + $54.40 = $734.40' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Discounts and Sales Tax',
      skills: ['percent_of_number', 'multi_step', 'discount_calculation', 'tax_calculation'],
      prerequisites: ['percentages', 'decimal_operations'],
      concepts: ['discount', 'sales-tax', 'multi-step', 'order-of-operations'],
      commonMistakes: ['Calculating tax before discount', 'Adding percentages directly (15+8=23%)'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'discount', 'sales-tax', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-money-014',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Isabella bought a dress that was marked down from $75 to $60. What was the percent discount?'
    },
    answer: {
      type: 'numeric',
      correct: '20',
      acceptable: ['20', '20%', '20 percent'],
      unit: 'percent'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find the amount saved', latex: '\\$75 - \\$60 = \\$15' },
        { number: 2, description: 'Divide by original price', latex: '\\$15 \\div \\$75 = 0.20' },
        { number: 3, description: 'Convert to percent', latex: '0.20 \\times 100 = 20\\%' }
      ],
      method: 'Percent decrease formula'
    },
    hints: [
      { level: 'gentle', text: 'Find how much was saved, then divide by the original price to get the percent.' },
      { level: 'moderate', text: 'Saved: $75 - $60 = $15. Percent = $15/$75 = ?' },
      { level: 'explicit', text: '$15 ÷ $75 = 0.20 = 20%' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Discounts and Sales Tax',
      skills: ['percent_decrease', 'division', 'subtraction'],
      prerequisites: ['percentages', 'division'],
      concepts: ['percent-decrease', 'discount', 'finding-percent'],
      commonMistakes: ['Dividing by new price instead of original', 'Forgetting to convert decimal to percent'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'percent-discount', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-money-015',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A store has a "Buy 2, Get 1 Half Off" sale on jeans that cost $40 each. If Liam buys 3 pairs, what is his total before tax?'
    },
    answer: {
      type: 'numeric',
      correct: '100',
      acceptable: ['100', '$100', '$100.00', '100 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Cost for first two pairs', latex: '2 \\times \\$40 = \\$80' },
        { number: 2, description: 'Third pair at half price', latex: '\\$40 \\div 2 = \\$20' },
        { number: 3, description: 'Add total', latex: '\\$80 + \\$20 = \\$100' }
      ],
      method: 'Apply special pricing rule'
    },
    hints: [
      { level: 'gentle', text: 'Two jeans at full price, one jean at half price. Calculate each and add.' },
      { level: 'moderate', text: '2 × $40 = $80 for first two. Third one is $40 ÷ 2 = $20.' },
      { level: 'explicit', text: '$80 + $20 = $100 total' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Discounts and Sales Tax',
      skills: ['multiplication', 'division', 'addition', 'special_pricing'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['promotional-pricing', 'multi-step', 'discount'],
      commonMistakes: ['Applying half-off to all three', 'Calculating wrong item at half price'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'special-pricing', 'grade-6'] }
  },

  // ============================================================================
  // SIMPLE INTEREST (5 problems) - Grades 6-7
  // ============================================================================
  {
    id: 'word-v2-g6-money-016',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Sarah deposits $200 in a savings account that pays 3% simple interest per year. How much interest will she earn in 1 year?',
      latex: 'I = Prt'
    },
    answer: {
      type: 'numeric',
      correct: '6',
      acceptable: ['6', '$6', '$6.00', '6 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify values', latex: 'P = \\$200, r = 0.03, t = 1' },
        { number: 2, description: 'Apply simple interest formula', latex: 'I = 200 \\times 0.03 \\times 1 = \\$6' }
      ],
      method: 'Simple interest formula: I = Prt'
    },
    hints: [
      { level: 'gentle', text: 'Use the formula I = Prt where P is principal, r is rate, and t is time.' },
      { level: 'moderate', text: 'I = $200 × 0.03 × 1' },
      { level: 'explicit', text: 'I = $200 × 0.03 × 1 = $6' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Simple Interest',
      skills: ['simple_interest', 'percent_to_decimal', 'multiplication'],
      prerequisites: ['percentages', 'multiplication_decimals'],
      concepts: ['interest', 'principal', 'rate', 'financial-literacy'],
      commonMistakes: ['Not converting percent to decimal', 'Using wrong formula'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'simple-interest', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-money-017',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Marcus puts $500 in a certificate of deposit (CD) that earns 4% simple interest per year. How much interest will he earn after 2 years?',
      latex: 'I = Prt'
    },
    answer: {
      type: 'numeric',
      correct: '40',
      acceptable: ['40', '$40', '$40.00', '40 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Identify values', latex: 'P = \\$500, r = 0.04, t = 2' },
        { number: 2, description: 'Apply formula', latex: 'I = 500 \\times 0.04 \\times 2 = \\$40' }
      ],
      method: 'Simple interest formula'
    },
    hints: [
      { level: 'gentle', text: 'Use I = Prt with P = $500, r = 4% = 0.04, t = 2 years.' },
      { level: 'moderate', text: 'I = $500 × 0.04 × 2' },
      { level: 'explicit', text: 'I = $500 × 0.04 × 2 = $40' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Simple Interest',
      skills: ['simple_interest', 'percent_to_decimal', 'multiplication'],
      prerequisites: ['percentages', 'multiplication'],
      concepts: ['interest', 'principal', 'time', 'financial-literacy'],
      commonMistakes: ['Forgetting to multiply by time', 'Using 4 instead of 0.04'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'simple-interest', 'grade-6'] }
  },
  {
    id: 'word-v2-g7-money-018',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Aiden borrows $1,200 from his parents for a used car. They charge him 5% simple interest per year. How much total will Aiden pay back after 3 years?',
      latex: 'A = P + Prt'
    },
    answer: {
      type: 'numeric',
      correct: '1380',
      acceptable: ['1380', '$1380', '$1,380', '1,380', '1380 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate interest', latex: 'I = 1200 \\times 0.05 \\times 3 = \\$180' },
        { number: 2, description: 'Add to principal', latex: 'A = \\$1200 + \\$180 = \\$1380' }
      ],
      method: 'Interest + Principal = Total'
    },
    hints: [
      { level: 'gentle', text: 'First find the interest using I = Prt, then add it to the original loan amount.' },
      { level: 'moderate', text: 'Interest = $1200 × 0.05 × 3 = $180. Add to $1200.' },
      { level: 'explicit', text: '$1200 + $180 = $1380 total' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Simple Interest',
      skills: ['simple_interest', 'total_amount', 'multi_step'],
      prerequisites: ['percentages', 'multiplication', 'addition'],
      concepts: ['interest', 'loans', 'total-payment', 'financial-literacy'],
      commonMistakes: ['Only calculating interest without adding principal', 'Order of operations errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'simple-interest', 'loans', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-019',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'An investment earns $72 in simple interest over 4 years at a rate of 3% per year. What was the original principal?',
      latex: 'P = \\frac{I}{rt}'
    },
    answer: {
      type: 'numeric',
      correct: '600',
      acceptable: ['600', '$600', '$600.00', '600 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Rearrange formula for P', latex: 'P = \\frac{I}{rt}' },
        { number: 2, description: 'Substitute values', latex: 'P = \\frac{72}{0.03 \\times 4}' },
        { number: 3, description: 'Calculate', latex: 'P = \\frac{72}{0.12} = \\$600' }
      ],
      method: 'Solve simple interest formula for P'
    },
    hints: [
      { level: 'gentle', text: 'Rearrange I = Prt to solve for P: P = I ÷ (r × t)' },
      { level: 'moderate', text: 'P = $72 ÷ (0.03 × 4) = $72 ÷ 0.12' },
      { level: 'explicit', text: 'P = $72 ÷ 0.12 = $600' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Simple Interest',
      skills: ['simple_interest', 'algebraic_reasoning', 'division'],
      prerequisites: ['percentages', 'solving_equations', 'division_decimals'],
      concepts: ['interest', 'principal', 'working-backwards', 'financial-literacy'],
      commonMistakes: ['Dividing in wrong order', 'Not multiplying r and t first'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'simple-interest', 'algebra', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-020',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Olivia needs her $800 investment to grow to $920 using simple interest. If the annual rate is 5%, how many years will this take?',
      latex: 't = \\frac{I}{Pr}'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', '3 years', 'three', 'three years'],
      unit: 'years'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find interest needed', latex: 'I = \\$920 - \\$800 = \\$120' },
        { number: 2, description: 'Rearrange formula for t', latex: 't = \\frac{I}{Pr}' },
        { number: 3, description: 'Substitute and solve', latex: 't = \\frac{120}{800 \\times 0.05} = \\frac{120}{40} = 3' }
      ],
      method: 'Solve for time in simple interest'
    },
    hints: [
      { level: 'gentle', text: 'First find how much interest is needed. Then use t = I ÷ (P × r).' },
      { level: 'moderate', text: 'Interest needed = $920 - $800 = $120. Now solve for t.' },
      { level: 'explicit', text: 't = $120 ÷ ($800 × 0.05) = $120 ÷ $40 = 3 years' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Simple Interest',
      skills: ['simple_interest', 'algebraic_reasoning', 'multi_step'],
      prerequisites: ['percentages', 'solving_equations', 'subtraction'],
      concepts: ['interest', 'time', 'working-backwards', 'financial-literacy'],
      commonMistakes: ['Not finding interest first', 'Division errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'simple-interest', 'solving-for-time', 'grade-7'] }
  },

  // ============================================================================
  // COMPOUND INTEREST (5 problems) - Grade 7
  // ============================================================================
  {
    id: 'word-v2-g7-money-021',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Emma invests $1,000 in an account with 5% annual interest compounded yearly. What is the account balance after 1 year?',
      latex: 'A = P(1 + r)^t'
    },
    answer: {
      type: 'numeric',
      correct: '1050',
      acceptable: ['1050', '$1050', '$1,050', '1,050', '1050 dollars'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply compound interest formula', latex: 'A = P(1 + r)^t' },
        { number: 2, description: 'Substitute values', latex: 'A = 1000(1 + 0.05)^1' },
        { number: 3, description: 'Calculate', latex: 'A = 1000(1.05) = \\$1050' }
      ],
      method: 'Compound interest formula (annual)'
    },
    hints: [
      { level: 'gentle', text: 'For 1 year, compound interest is the same as simple interest: add the percent to the principal.' },
      { level: 'moderate', text: 'A = $1000 × 1.05' },
      { level: 'explicit', text: 'A = $1000 × 1.05 = $1050' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Compound Interest',
      skills: ['compound_interest', 'exponents', 'percent_to_decimal'],
      prerequisites: ['percentages', 'exponents'],
      concepts: ['compound-interest', 'exponential-growth', 'financial-literacy'],
      commonMistakes: ['Using simple interest formula', 'Forgetting to add 1 to rate'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'compound-interest', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-022',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Noah deposits $500 into a savings account that earns 4% interest compounded annually. What will the balance be after 2 years?',
      latex: 'A = P(1 + r)^t'
    },
    answer: {
      type: 'numeric',
      correct: '540.80',
      acceptable: ['540.80', '$540.80', '540.8', '$540.8'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply formula', latex: 'A = 500(1 + 0.04)^2' },
        { number: 2, description: 'Simplify inside parentheses', latex: 'A = 500(1.04)^2' },
        { number: 3, description: 'Calculate power', latex: 'A = 500(1.0816) = \\$540.80' }
      ],
      method: 'Compound interest formula'
    },
    hints: [
      { level: 'gentle', text: 'Use A = P(1 + r)^t with P = $500, r = 0.04, t = 2.' },
      { level: 'moderate', text: 'A = $500 × (1.04)². First find 1.04² = 1.0816' },
      { level: 'explicit', text: 'A = $500 × 1.0816 = $540.80' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Compound Interest',
      skills: ['compound_interest', 'exponents', 'decimal_multiplication'],
      prerequisites: ['percentages', 'exponents'],
      concepts: ['compound-interest', 'exponential-growth', 'financial-literacy'],
      commonMistakes: ['Not squaring correctly', 'Using simple interest (would give $540)'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'compound-interest', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-023',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A bank offers 6% interest compounded annually. If Sophia invests $2,000, how much will she have after 3 years? Round to the nearest cent.',
      latex: 'A = P(1 + r)^t'
    },
    answer: {
      type: 'numeric',
      correct: '2382.03',
      acceptable: ['2382.03', '$2382.03', '$2,382.03', '2,382.03'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Apply formula', latex: 'A = 2000(1 + 0.06)^3' },
        { number: 2, description: 'Calculate power', latex: '(1.06)^3 = 1.191016' },
        { number: 3, description: 'Multiply', latex: 'A = 2000 \\times 1.191016 = \\$2382.03' }
      ],
      method: 'Compound interest formula'
    },
    hints: [
      { level: 'gentle', text: 'Use A = P(1 + r)^t. You\'ll need to calculate (1.06)³.' },
      { level: 'moderate', text: '(1.06)³ = 1.06 × 1.06 × 1.06 = 1.191016' },
      { level: 'explicit', text: 'A = $2000 × 1.191016 = $2382.03' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Compound Interest',
      skills: ['compound_interest', 'exponents', 'rounding'],
      prerequisites: ['percentages', 'exponents', 'rounding_decimals'],
      concepts: ['compound-interest', 'exponential-growth', 'financial-literacy'],
      commonMistakes: ['Cubing incorrectly', 'Rounding errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'compound-interest', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-024',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Jacob has two investment options for his $1,000: Option A pays 6% simple interest for 2 years. Option B pays 5% compounded annually for 2 years. Which option earns more interest, and by how much?'
    },
    answer: {
      type: 'exact',
      correct: 'Option A earns $17.50 more',
      acceptable: ['Option A earns $17.50 more', 'A by $17.50', 'A, $17.50', 'Option A, 17.50 more']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate Option A (simple)', latex: 'I_A = 1000 \\times 0.06 \\times 2 = \\$120' },
        { number: 2, description: 'Calculate Option B (compound)', latex: 'A_B = 1000(1.05)^2 = 1000(1.1025) = \\$1102.50' },
        { number: 3, description: 'Interest for B', latex: 'I_B = \\$1102.50 - \\$1000 = \\$102.50' },
        { number: 4, description: 'Compare', latex: '\\$120 - \\$102.50 = \\$17.50' }
      ],
      method: 'Compare simple vs compound interest'
    },
    hints: [
      { level: 'gentle', text: 'Calculate the interest for each option separately, then compare.' },
      { level: 'moderate', text: 'Option A: I = $1000 × 0.06 × 2 = $120. Option B: A = $1000(1.05)² - $1000' },
      { level: 'explicit', text: 'A earns $120, B earns $102.50. A wins by $17.50.' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Compound Interest',
      skills: ['simple_interest', 'compound_interest', 'comparison', 'multi_step'],
      prerequisites: ['percentages', 'exponents', 'subtraction'],
      concepts: ['interest-comparison', 'simple-vs-compound', 'financial-literacy'],
      commonMistakes: ['Assuming compound always beats simple', 'Calculation errors in either method'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'compound-interest', 'comparison', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-money-025',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A college fund has $5,000 earning 4% interest compounded annually. How much more money will be in the account after 5 years compared to after 3 years? Round to the nearest cent.',
      latex: 'A = P(1 + r)^t'
    },
    answer: {
      type: 'numeric',
      correct: '474.32',
      acceptable: ['474.32', '$474.32', '474.3'],
      unit: 'dollars'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate amount after 5 years', latex: 'A_5 = 5000(1.04)^5 = 5000(1.21665) = \\$6083.26' },
        { number: 2, description: 'Calculate amount after 3 years', latex: 'A_3 = 5000(1.04)^3 = 5000(1.12486) = \\$5624.32' },
        { number: 3, description: 'Find the difference', latex: '\\$6083.26 - \\$5624.32 \\approx \\$458.94' }
      ],
      method: 'Calculate two compound amounts and subtract'
    },
    hints: [
      { level: 'gentle', text: 'Calculate the balance at year 5 and year 3 separately, then subtract.' },
      { level: 'moderate', text: 'A₅ = $5000(1.04)⁵, A₃ = $5000(1.04)³. Find the difference.' },
      { level: 'explicit', text: '$6083.26 - $5608.94 = $474.32 more after 5 years than after 3 years' }
    ],
    pedagogy: {
      topic: 'Money Word Problems',
      subTopic: 'Compound Interest',
      skills: ['compound_interest', 'exponents', 'subtraction', 'multi_step'],
      prerequisites: ['exponents', 'decimal_operations', 'subtraction'],
      concepts: ['compound-interest', 'growth-comparison', 'financial-literacy'],
      commonMistakes: ['Using wrong exponent', 'Rounding too early', 'Subtraction errors'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'money', 'compound-interest', 'comparison', 'grade-7'] }
  }
]
