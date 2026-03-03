import { ReferenceUnit } from '@/lib/types/basics'

export const ARITHMETIC_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'arithmetic-unit-1',
    sectionId: 'arithmetic',
    title: 'Addition Fundamentals',
    description: 'Master addition from single digits to multi-digit numbers with carrying.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Addition', 'Single Digit Addition', 'Multi-Digit Addition', 'Carrying', 'Regrouping'],
    sections: [
      {
        id: 'arithmetic-1-1',
        title: 'Place Value System',
        content: `Understanding place value is essential for all arithmetic operations. Each digit in a number has a value based on its position.

In the number 3,457:
- 3 is in the thousands place (3,000)
- 4 is in the hundreds place (400)
- 5 is in the tens place (50)
- 7 is in the ones place (7)

The value of each place is 10 times the place to its right.`,
        tips: [
          'Remember: As you move left, each place is worth 10× more',
          'When reading large numbers, commas separate groups of three digits',
          'Zero is a placeholder that keeps digits in their correct positions'
        ]
      },
      {
        id: 'arithmetic-1-2',
        title: 'Adding Single Digits',
        content: `Single digit addition is the foundation of all addition. Knowing your addition facts up to 9 + 9 = 18 is essential.

Mental math strategies:
- Counting on: Start at the larger number and count up
- Making 10: Find pairs that add to 10 (3 + 7, 4 + 6, etc.)
- Doubles: Know your doubles (4 + 4 = 8, 5 + 5 = 10)
- Doubles plus one: 4 + 5 = 4 + 4 + 1 = 9`,
        examples: [
          {
            problem: 'Calculate 7 + 8',
            steps: [
              'Strategy: Make 10',
              '7 + 8 = 7 + 3 + 5 = 10 + 5 = 15',
              'Or: 7 + 8 = 7 + 7 + 1 = 14 + 1 = 15 (doubles plus one)'
            ],
            solution: '15',
            explanation: 'Multiple strategies lead to the same answer!'
          }
        ],
        tips: [
          'Practice until basic facts are automatic (within 3 seconds)',
          'Use fingers or number lines while learning, but move to mental math'
        ]
      },
      {
        id: 'arithmetic-1-3',
        title: 'Adding with Carrying (Regrouping)',
        content: `When the sum of digits in any column is 10 or more, we "carry" to the next column. This is also called regrouping.

Steps for multi-digit addition:
1. Line up numbers by place value (ones under ones, tens under tens)
2. Add each column starting from the right (ones place)
3. If the sum is 10 or more, write the ones digit and carry the tens digit
4. Include carried digits in the next column's sum`,
        formulas: [
          {
            name: 'Carrying Rule',
            latex: '\\text{If sum} \\geq 10: \\text{Write } (\\text{sum} - 10), \\text{ carry } 1',
            description: 'When a column sums to 10 or more, carry to the next place'
          }
        ],
        examples: [
          {
            problem: 'Add: 256 + 478',
            steps: [
              'Ones: 6 + 8 = 14 → Write 4, carry 1',
              'Tens: 1 + 5 + 7 = 13 → Write 3, carry 1',
              'Hundreds: 1 + 2 + 4 = 7 → Write 7'
            ],
            solution: '734',
            explanation: 'Work column by column, right to left, carrying when needed'
          }
        ],
        commonMistakes: [
          'Forgetting to add the carried digit',
          'Carrying the wrong digit (should carry the tens, write the ones)',
          'Not lining up place values correctly'
        ]
      },
      {
        id: 'arithmetic-1-4',
        title: 'Properties of Addition',
        content: `These properties make mental math easier and are used throughout mathematics.

Commutative Property: Order doesn't matter
Associative Property: Grouping doesn't matter
Identity Property: Adding 0 doesn't change a number`,
        formulas: [
          {
            name: 'Commutative Property',
            latex: 'a + b = b + a',
            description: 'The order of addends does not change the sum'
          },
          {
            name: 'Associative Property',
            latex: '(a + b) + c = a + (b + c)',
            description: 'The grouping of addends does not change the sum'
          },
          {
            name: 'Identity Property',
            latex: 'a + 0 = a',
            description: 'Zero is the additive identity'
          }
        ],
        tips: [
          'Use commutative property to add the larger number first',
          'Use associative property to group numbers that make 10 or other easy sums'
        ]
      }
    ]
  },
  {
    id: 'arithmetic-unit-2',
    sectionId: 'arithmetic',
    title: 'Subtraction Fundamentals',
    description: 'Learn subtraction as the inverse of addition, including borrowing across place values.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Subtraction', 'Borrowing', 'Regrouping', 'Inverse Operations'],
    sections: [
      {
        id: 'arithmetic-2-1',
        title: 'Subtraction Basics',
        content: `Subtraction finds the difference between two numbers. It answers "how many more" or "how many left."

Key vocabulary:
- Minuend: The number being subtracted from (comes first)
- Subtrahend: The number being subtracted
- Difference: The result of subtraction

Subtraction is the inverse of addition: If 7 + 5 = 12, then 12 - 5 = 7`,
        examples: [
          {
            problem: 'Find: 15 - 8',
            steps: [
              'Think: What plus 8 equals 15?',
              '8 + 7 = 15',
              'So 15 - 8 = 7'
            ],
            solution: '7',
            explanation: 'Using the addition-subtraction relationship'
          }
        ]
      },
      {
        id: 'arithmetic-2-2',
        title: 'Borrowing (Regrouping)',
        content: `When the top digit is smaller than the bottom digit in any column, you need to borrow from the next place.

Steps:
1. If you can't subtract, borrow from the next higher place
2. Add 10 to the current column
3. Reduce the borrowed-from column by 1
4. Now subtract`,
        examples: [
          {
            problem: 'Subtract: 534 - 268',
            steps: [
              'Ones: 4 - 8? Can\'t do it. Borrow from tens.',
              'Tens becomes 2 (was 3), ones becomes 14',
              '14 - 8 = 6',
              'Tens: 2 - 6? Can\'t do it. Borrow from hundreds.',
              'Hundreds becomes 4 (was 5), tens becomes 12',
              '12 - 6 = 6',
              'Hundreds: 4 - 2 = 2'
            ],
            solution: '266',
            explanation: 'Work right to left, borrowing when needed'
          }
        ],
        tips: [
          'Always check: your answer + subtrahend should equal minuend',
          'When borrowing across zeros (like 1000 - 347), borrow through each zero'
        ],
        commonMistakes: [
          'Forgetting to reduce the borrowed-from column',
          'Subtracting the smaller from larger in each column regardless of position'
        ]
      }
    ]
  },
  {
    id: 'arithmetic-unit-3',
    sectionId: 'arithmetic',
    title: 'Multiplication Mastery',
    description: 'Master multiplication tables, multi-digit multiplication, and useful multiplication strategies.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Multiplication', 'Times Tables', 'Multi-Digit Multiplication', 'Partial Products'],
    sections: [
      {
        id: 'arithmetic-3-1',
        title: 'Multiplication Tables',
        content: `Knowing your multiplication tables (1-12) by heart is essential for math success. Here are the key tables:

×2: Double the number
×3: Add the number three times
×4: Double twice
×5: Half of ×10
×9: Digits sum to 9 (e.g., 9×7=63, 6+3=9)
×10: Add a zero
×11: Repeat the digit (for 1-9)`,
        tips: [
          'The hardest facts to memorize are usually: 6×7=42, 6×8=48, 7×8=56, 8×8=64',
          'Practice skip counting: 3, 6, 9, 12, 15...',
          'Use the 9s finger trick: Hold up 10 fingers, put down the nth finger for 9×n'
        ]
      },
      {
        id: 'arithmetic-3-2',
        title: 'Multi-Digit Multiplication',
        content: `For multiplying larger numbers, use the standard algorithm:

1. Multiply by the ones digit
2. Multiply by the tens digit (shift left one place)
3. Multiply by the hundreds digit (shift left two places)
4. Add all partial products`,
        examples: [
          {
            problem: 'Calculate: 34 × 56',
            steps: [
              'Multiply 34 × 6:',
              '  34 × 6 = 204',
              'Multiply 34 × 50:',
              '  34 × 50 = 1,700',
              'Add partial products:',
              '  204 + 1,700 = 1,904'
            ],
            solution: '1,904',
            explanation: 'Each partial product accounts for the place value'
          }
        ],
        tips: [
          'When multiplying by 10, 100, 1000, just add zeros',
          'Break apart numbers: 34 × 5 = 30×5 + 4×5 = 150 + 20 = 170'
        ]
      },
      {
        id: 'arithmetic-3-3',
        title: 'Properties of Multiplication',
        content: `These properties make calculations easier and are fundamental to algebra.`,
        formulas: [
          {
            name: 'Commutative Property',
            latex: 'a \\times b = b \\times a',
            description: 'Order doesn\'t matter in multiplication'
          },
          {
            name: 'Associative Property',
            latex: '(a \\times b) \\times c = a \\times (b \\times c)',
            description: 'Grouping doesn\'t matter in multiplication'
          },
          {
            name: 'Distributive Property',
            latex: 'a \\times (b + c) = a \\times b + a \\times c',
            description: 'Multiplication distributes over addition'
          },
          {
            name: 'Identity Property',
            latex: 'a \\times 1 = a',
            description: 'One is the multiplicative identity'
          },
          {
            name: 'Zero Property',
            latex: 'a \\times 0 = 0',
            description: 'Any number times zero is zero'
          }
        ]
      }
    ]
  },
  {
    id: 'arithmetic-unit-4',
    sectionId: 'arithmetic',
    title: 'Division Essentials',
    description: 'Learn division as the inverse of multiplication, including long division and remainder handling.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Division', 'Long Division', 'Remainders', 'Divisibility'],
    sections: [
      {
        id: 'arithmetic-4-1',
        title: 'Division Basics',
        content: `Division splits a number into equal parts. It's the inverse of multiplication.

Key vocabulary:
- Dividend: The number being divided
- Divisor: The number you divide by
- Quotient: The result
- Remainder: What's left over (if any)

If 6 × 7 = 42, then 42 ÷ 7 = 6 and 42 ÷ 6 = 7`,
        formulas: [
          {
            name: 'Division Check',
            latex: '\\text{Quotient} \\times \\text{Divisor} + \\text{Remainder} = \\text{Dividend}',
            description: 'Use this to verify your answer'
          }
        ]
      },
      {
        id: 'arithmetic-4-2',
        title: 'Long Division',
        content: `Long division breaks a complex division into smaller steps. Remember: Divide, Multiply, Subtract, Bring down (DMSB).

Steps:
1. Divide: How many times does divisor go into current digits?
2. Multiply: Multiply divisor by quotient digit
3. Subtract: Subtract from dividend
4. Bring down: Bring down the next digit
5. Repeat until no more digits`,
        examples: [
          {
            problem: 'Divide: 847 ÷ 3',
            steps: [
              '8 ÷ 3 = 2 remainder 2 → Write 2 above 8',
              '2 × 3 = 6, subtract: 8 - 6 = 2',
              'Bring down 4: have 24',
              '24 ÷ 3 = 8 → Write 8 above 4',
              '8 × 3 = 24, subtract: 24 - 24 = 0',
              'Bring down 7: have 7',
              '7 ÷ 3 = 2 remainder 1 → Write 2 above 7',
              '2 × 3 = 6, subtract: 7 - 6 = 1'
            ],
            solution: '282 R1 or 282⅓',
            explanation: 'Check: 282 × 3 + 1 = 846 + 1 = 847 ✓'
          }
        ],
        commonMistakes: [
          'Forgetting to write 0 in the quotient when divisor doesn\'t fit',
          'Bringing down digits incorrectly',
          'Not checking the answer by multiplying back'
        ]
      },
      {
        id: 'arithmetic-4-3',
        title: 'Divisibility Rules',
        content: `These rules help you quickly determine if a number is divisible by another without doing full division.`,
        formulas: [
          {
            name: 'Divisible by 2',
            latex: '\\text{Last digit is even (0, 2, 4, 6, 8)}',
            description: 'Example: 1,234 is divisible by 2'
          },
          {
            name: 'Divisible by 3',
            latex: '\\text{Sum of digits is divisible by 3}',
            description: 'Example: 123 → 1+2+3=6, and 6÷3=2 ✓'
          },
          {
            name: 'Divisible by 5',
            latex: '\\text{Last digit is 0 or 5}',
            description: 'Example: 375 ends in 5 ✓'
          },
          {
            name: 'Divisible by 9',
            latex: '\\text{Sum of digits is divisible by 9}',
            description: 'Example: 729 → 7+2+9=18, and 18÷9=2 ✓'
          },
          {
            name: 'Divisible by 10',
            latex: '\\text{Last digit is 0}',
            description: 'Example: 1,230 ✓'
          }
        ],
        tips: [
          'Divisibility by 4: Check if last two digits form a number divisible by 4',
          'Divisibility by 6: Must be divisible by both 2 and 3'
        ]
      }
    ]
  },
  {
    id: 'arithmetic-unit-5',
    sectionId: 'arithmetic',
    title: 'Order of Operations',
    description: 'Learn PEMDAS/BODMAS to evaluate expressions in the correct order.',
    xpCost: 5,
    estimatedReadTime: 6,
    relatedTopics: ['PEMDAS', 'BODMAS', 'Order of Operations', 'Parentheses'],
    sections: [
      {
        id: 'arithmetic-5-1',
        title: 'PEMDAS/BODMAS',
        content: `When an expression has multiple operations, you must follow a specific order:

PEMDAS (US) or BODMAS (UK):
P/B - Parentheses/Brackets: Do these first
E/O - Exponents/Orders: Powers and roots second
MD - Multiplication and Division: Left to right (same priority)
AS - Addition and Subtraction: Left to right (same priority)

Important: Multiplication doesn't always come before division! They have equal priority and are done left to right. Same for addition and subtraction.`,
        formulas: [
          {
            name: 'PEMDAS',
            latex: 'P \\rightarrow E \\rightarrow MD \\rightarrow AS',
            description: 'Parentheses, Exponents, Multiplication/Division, Addition/Subtraction'
          }
        ],
        examples: [
          {
            problem: 'Evaluate: 3 + 4 × 2',
            steps: [
              'No parentheses or exponents',
              'Multiplication first: 4 × 2 = 8',
              'Then addition: 3 + 8 = 11'
            ],
            solution: '11',
            explanation: 'Multiplication before addition (not left to right!)'
          },
          {
            problem: 'Evaluate: 20 - 8 ÷ 4 + 3 × 2',
            steps: [
              'Division: 8 ÷ 4 = 2 → expression becomes 20 - 2 + 3 × 2',
              'Multiplication: 3 × 2 = 6 → expression becomes 20 - 2 + 6',
              'Left to right: 20 - 2 = 18, then 18 + 6 = 24'
            ],
            solution: '24',
            explanation: 'Do × and ÷ first (left to right), then + and - (left to right)'
          },
          {
            problem: 'Evaluate: 2 + 3 × (4 + 5)²',
            steps: [
              'Parentheses: 4 + 5 = 9',
              'Exponent: 9² = 81',
              'Multiplication: 3 × 81 = 243',
              'Addition: 2 + 243 = 245'
            ],
            solution: '245',
            explanation: 'Work from innermost parentheses outward'
          }
        ],
        commonMistakes: [
          'Doing addition before multiplication: 3 + 4 × 2 = 14 ✗ (correct is 11)',
          'Always going left to right instead of following PEMDAS',
          'Forgetting that × and ÷ have equal priority (not × first then ÷)'
        ],
        tips: [
          'Use the phrase "Please Excuse My Dear Aunt Sally" to remember PEMDAS',
          'When in doubt, use extra parentheses to clarify your intended order',
          'Scientific calculators follow PEMDAS automatically'
        ]
      }
    ]
  }
]

export default ARITHMETIC_REFERENCE_UNITS

