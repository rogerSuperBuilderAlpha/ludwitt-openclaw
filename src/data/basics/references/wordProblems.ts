import { ReferenceUnit } from '@/lib/types/basics'

export const WORD_PROBLEMS_REFERENCE_UNITS: ReferenceUnit[] = [
  {
    id: 'word-unit-1',
    sectionId: 'word-problems',
    title: 'Problem-Solving Strategy',
    description: 'Learn a systematic approach to tackle any word problem.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Word Problems', 'Problem Solving', 'Strategy', 'Understanding Problems'],
    sections: [
      {
        id: 'word-1-1',
        title: 'The 4-Step Process',
        content: `Use this systematic approach for any word problem:

1. UNDERSTAND: Read carefully. What is given? What is asked?
2. PLAN: Choose a strategy. Identify the math needed.
3. SOLVE: Execute the plan. Show your work.
4. CHECK: Verify the answer makes sense.`,
        tips: [
          'Read the problem at least twice',
          'Underline or circle key information',
          'Identify what you\'re solving for',
          'Check units in your final answer'
        ]
      },
      {
        id: 'word-1-2',
        title: 'Identifying Key Information',
        content: `Look for these elements in every problem:

Given Information:
- Numbers and quantities
- Relationships between quantities
- Conditions or constraints

What to Find:
- Usually in the question at the end
- "How many...", "What is...", "Find..."`,
        examples: [
          {
            problem: '"A train travels 240 miles in 4 hours. What is its average speed?"',
            steps: [
              'Given: distance = 240 miles, time = 4 hours',
              'Find: average speed',
              'Formula: speed = distance / time',
              'Speed = 240 / 4 = 60 mph'
            ],
            solution: '60 mph',
            explanation: 'Identifying given/find helps focus on what matters'
          }
        ]
      },
      {
        id: 'word-1-3',
        title: 'Choosing a Strategy',
        content: `Common problem-solving strategies:

- Draw a diagram or picture
- Make a table or list
- Look for patterns
- Write an equation
- Work backwards
- Guess and check
- Break into smaller problems
- Use logical reasoning`,
        tips: [
          'Drawing often reveals relationships not obvious in text',
          'Tables help organize information for rate problems',
          'Working backwards is great for "what was the original" problems'
        ]
      }
    ]
  },
  {
    id: 'word-unit-2',
    sectionId: 'word-problems',
    title: 'Age Problems',
    description: 'Solve problems involving ages at different times.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Age Problems', 'Linear Equations', 'Variables'],
    sections: [
      {
        id: 'word-2-1',
        title: 'Setting Up Age Problems',
        content: `Age problems typically compare ages at different times.

Key insight: Everyone ages at the same rate!
If person A is 10 years older than B now, A will always be 10 years older.

Common setup:
- Let x = someone's current age
- Express other ages in terms of x
- "In n years" → add n to current age
- "n years ago" → subtract n from current age`,
        formulas: [
          {
            name: 'Age in Future',
            latex: '\\text{future age} = \\text{current age} + n',
            description: 'Age after n years'
          },
          {
            name: 'Age in Past',
            latex: '\\text{past age} = \\text{current age} - n',
            description: 'Age n years ago'
          }
        ]
      },
      {
        id: 'word-2-2',
        title: 'Example Age Problems',
        content: `Work through examples step by step:`,
        examples: [
          {
            problem: '"Tom is twice as old as Jerry. In 5 years, Tom will be 1.5 times as old as Jerry. How old are they now?"',
            steps: [
              'Let Jerry\'s current age = x',
              'Tom\'s current age = 2x',
              'In 5 years: Jerry = x + 5, Tom = 2x + 5',
              'Tom will be 1.5 times Jerry: 2x + 5 = 1.5(x + 5)',
              '2x + 5 = 1.5x + 7.5',
              '0.5x = 2.5',
              'x = 5'
            ],
            solution: 'Jerry is 5, Tom is 10',
            explanation: 'Check: In 5 years, Jerry=10, Tom=15. 15/10 = 1.5 ✓'
          },
          {
            problem: '"A father is 30 years older than his son. 5 years ago, the father was 4 times as old as his son. Find their current ages."',
            steps: [
              'Let son\'s current age = x',
              'Father\'s current age = x + 30',
              '5 years ago: son = x - 5, father = x + 25',
              'Father was 4 times son: x + 25 = 4(x - 5)',
              'x + 25 = 4x - 20',
              '45 = 3x',
              'x = 15'
            ],
            solution: 'Son is 15, Father is 45',
            explanation: 'Check: 5 years ago, son=10, father=40. 40/10 = 4 ✓'
          }
        ]
      }
    ]
  },
  {
    id: 'word-unit-3',
    sectionId: 'word-problems',
    title: 'Distance, Rate, Time',
    description: 'Master problems involving motion and travel.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Distance Problems', 'Rate Problems', 'Motion', 'Speed'],
    sections: [
      {
        id: 'word-3-1',
        title: 'The DRT Formula',
        content: `The fundamental relationship for motion problems:

Distance = Rate × Time

This can be rearranged:
- Rate = Distance / Time
- Time = Distance / Rate`,
        formulas: [
          {
            name: 'Distance Formula',
            latex: 'd = r \\times t',
            description: 'Distance equals rate times time'
          },
          {
            name: 'Rate Formula',
            latex: 'r = \\frac{d}{t}',
            description: 'Rate equals distance over time'
          },
          {
            name: 'Time Formula',
            latex: 't = \\frac{d}{r}',
            description: 'Time equals distance over rate'
          }
        ],
        tips: [
          'Units must be consistent (mph with hours, not minutes)',
          'Draw a diagram showing positions',
          'Make a table: Object | Rate | Time | Distance'
        ]
      },
      {
        id: 'word-3-2',
        title: 'Meeting Problems',
        content: `When two objects travel toward each other, they meet when the sum of distances equals the total distance.`,
        examples: [
          {
            problem: '"Two cars start 300 miles apart and drive toward each other. One goes 50 mph, the other 70 mph. When do they meet?"',
            steps: [
              'Let t = time until they meet',
              'Car 1 distance: 50t miles',
              'Car 2 distance: 70t miles',
              'Together: 50t + 70t = 300',
              '120t = 300',
              't = 2.5 hours'
            ],
            solution: 'They meet in 2.5 hours',
            explanation: 'Their combined rate is 120 mph closing the 300-mile gap'
          }
        ]
      },
      {
        id: 'word-3-3',
        title: 'Overtake/Catch-Up Problems',
        content: `When one object chases another, they meet when they've traveled the same total distance (from a common reference point).`,
        examples: [
          {
            problem: '"A bus leaves at 8am going 40 mph. A car leaves at 10am going 60 mph on the same route. When does the car catch the bus?"',
            steps: [
              'Bus head start: 2 hours × 40 mph = 80 miles',
              'Let t = car\'s travel time',
              'Car distance: 60t',
              'Bus distance: 80 + 40t',
              'When car catches bus: 60t = 80 + 40t',
              '20t = 80',
              't = 4 hours'
            ],
            solution: 'Car catches bus at 2pm (4 hours after leaving)',
            explanation: 'The car gains 20 mph on the bus, so it takes 80÷20 = 4 hours to close the gap'
          }
        ]
      },
      {
        id: 'word-3-4',
        title: 'Round Trip Problems',
        content: `For round trips, the total distance is twice one way, but times and rates may differ.

Average speed is NOT the average of the two speeds!`,
        formulas: [
          {
            name: 'Average Speed',
            latex: '\\text{Avg Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}}',
            description: 'Not the average of speeds!'
          }
        ],
        examples: [
          {
            problem: '"You drive 60 miles at 30 mph and return at 60 mph. What is your average speed?"',
            steps: [
              'Going: 60 miles ÷ 30 mph = 2 hours',
              'Return: 60 miles ÷ 60 mph = 1 hour',
              'Total: 120 miles in 3 hours',
              'Average: 120 ÷ 3 = 40 mph'
            ],
            solution: '40 mph (not 45!)',
            explanation: 'You spend more time at the slower speed, pulling down the average'
          }
        ]
      }
    ]
  },
  {
    id: 'word-unit-4',
    sectionId: 'word-problems',
    title: 'Work Rate Problems',
    description: 'Solve problems about people or machines working together.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Work Problems', 'Rate Problems', 'Combined Work'],
    sections: [
      {
        id: 'word-4-1',
        title: 'Work Rate Concept',
        content: `Work rate = (job completed) / time

If someone can finish a job in T hours, their rate is 1/T of the job per hour.

Key formula: Rate × Time = Work Done`,
        formulas: [
          {
            name: 'Work Rate',
            latex: '\\text{Rate} = \\frac{1}{\\text{Time to complete}}',
            description: 'Work rate as fraction of job per unit time'
          },
          {
            name: 'Combined Work',
            latex: '\\frac{1}{T_1} + \\frac{1}{T_2} = \\frac{1}{T_{\\text{together}}}',
            description: 'Add rates when working together'
          }
        ]
      },
      {
        id: 'word-4-2',
        title: 'Working Together',
        content: `When people work together, add their rates:`,
        examples: [
          {
            problem: '"Alex can paint a room in 5 hours. Ben can paint it in 3 hours. How long together?"',
            steps: [
              'Alex\'s rate: 1/5 room per hour',
              'Ben\'s rate: 1/3 room per hour',
              'Combined: 1/5 + 1/3 = 3/15 + 5/15 = 8/15 per hour',
              'Time = 1 ÷ (8/15) = 15/8 hours',
              '= 1.875 hours = 1 hour 52.5 minutes'
            ],
            solution: '1 hour 52.5 minutes (or 15/8 hours)',
            explanation: 'Together they\'re faster than either alone'
          }
        ]
      },
      {
        id: 'word-4-3',
        title: 'Pipes and Tanks',
        content: `Similar to work problems, but with filling/draining:
- Filling pipe: positive rate
- Draining pipe: negative rate`,
        examples: [
          {
            problem: '"Pipe A fills a tank in 6 hours. Pipe B drains it in 8 hours. If both are open, how long to fill?"',
            steps: [
              'Fill rate: 1/6 tank per hour',
              'Drain rate: 1/8 tank per hour',
              'Net rate: 1/6 - 1/8 = 4/24 - 3/24 = 1/24 per hour',
              'Time = 1 ÷ (1/24) = 24 hours'
            ],
            solution: '24 hours',
            explanation: 'Filling wins but is slowed by draining'
          }
        ],
        tips: [
          'If drain rate > fill rate, the tank will never fill!',
          'Check: Net rate should be positive for filling'
        ]
      }
    ]
  },
  {
    id: 'word-unit-5',
    sectionId: 'word-problems',
    title: 'Mixture Problems',
    description: 'Combine solutions, alloys, or products of different concentrations.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Mixture Problems', 'Percentages', 'Concentration'],
    sections: [
      {
        id: 'word-5-1',
        title: 'Mixture Basics',
        content: `In mixture problems, we combine items with different properties (concentrations, prices, etc.).

Key principle: 
Amount of pure substance before = Amount after

For liquids: Volume × Concentration = Amount of pure substance`,
        formulas: [
          {
            name: 'Mixture Equation',
            latex: 'V_1 \\cdot C_1 + V_2 \\cdot C_2 = V_{\\text{final}} \\cdot C_{\\text{final}}',
            description: 'Volume × Concentration sums'
          }
        ]
      },
      {
        id: 'word-5-2',
        title: 'Combining Solutions',
        content: `Mixing two solutions of different concentrations:`,
        examples: [
          {
            problem: '"How many liters of 20% acid should be mixed with 10 liters of 50% acid to get 30% acid?"',
            steps: [
              'Let x = liters of 20% acid',
              'Acid from 20%: 0.20x liters',
              'Acid from 50%: 0.50(10) = 5 liters',
              'Final: 0.30(x + 10) liters of acid',
              '0.20x + 5 = 0.30(x + 10)',
              '0.20x + 5 = 0.30x + 3',
              '2 = 0.10x',
              'x = 20'
            ],
            solution: '20 liters of 20% acid',
            explanation: 'Check: 0.20(20) + 5 = 9 liters acid. 9/(20+10) = 30% ✓'
          }
        ]
      },
      {
        id: 'word-5-3',
        title: 'Price Mixtures',
        content: `Same principle applies to mixing products at different prices:`,
        examples: [
          {
            problem: '"Mix $8/lb coffee with $5/lb coffee to get 30 lbs of $6/lb blend. How much of each?"',
            steps: [
              'Let x = lbs of $8 coffee',
              'Then 30 - x = lbs of $5 coffee',
              'Value equation: 8x + 5(30-x) = 6(30)',
              '8x + 150 - 5x = 180',
              '3x = 30',
              'x = 10'
            ],
            solution: '10 lbs of $8 coffee, 20 lbs of $5 coffee',
            explanation: 'Value in = Value out'
          }
        ],
        tips: [
          'The final concentration is always between the two initial ones',
          'Closer to the concentration with more volume',
          'Use a table: Source | Amount | Concentration | Pure Amount'
        ]
      }
    ]
  },
  {
    id: 'word-unit-6',
    sectionId: 'word-problems',
    title: 'Money & Investment Problems',
    description: 'Calculate interest, investments, and financial scenarios.',
    xpCost: 5,
    estimatedReadTime: 12,
    relatedTopics: ['Interest', 'Investment', 'Simple Interest', 'Compound Interest'],
    sections: [
      {
        id: 'word-6-1',
        title: 'Simple Interest',
        content: `Simple interest is calculated only on the principal (original amount).`,
        formulas: [
          {
            name: 'Simple Interest',
            latex: 'I = P \\cdot r \\cdot t',
            description: 'Interest = Principal × Rate × Time'
          },
          {
            name: 'Amount',
            latex: 'A = P + I = P(1 + rt)',
            description: 'Total after interest'
          }
        ],
        examples: [
          {
            problem: '"$5000 invested at 4% simple interest for 3 years earns how much interest?"',
            steps: [
              'P = $5000, r = 0.04, t = 3',
              'I = 5000 × 0.04 × 3',
              'I = $600'
            ],
            solution: '$600 interest',
            explanation: 'Total after 3 years: $5600'
          }
        ]
      },
      {
        id: 'word-6-2',
        title: 'Compound Interest',
        content: `Compound interest is calculated on principal PLUS accumulated interest.`,
        formulas: [
          {
            name: 'Compound Interest',
            latex: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
            description: 'A=amount, P=principal, r=rate, n=compounds/year, t=years'
          },
          {
            name: 'Continuous Compounding',
            latex: 'A = Pe^{rt}',
            description: 'When compounding is continuous'
          }
        ],
        examples: [
          {
            problem: '"$1000 at 5% compounded monthly for 2 years. Final amount?"',
            steps: [
              'P = 1000, r = 0.05, n = 12, t = 2',
              'A = 1000(1 + 0.05/12)^(12×2)',
              'A = 1000(1.00417)^24',
              'A ≈ $1104.94'
            ],
            solution: '$1104.94',
            explanation: 'More than simple interest ($1100) due to compounding'
          }
        ]
      },
      {
        id: 'word-6-3',
        title: 'Split Investment Problems',
        content: `When money is split between investments at different rates:`,
        examples: [
          {
            problem: '"$10,000 is split between 5% and 8% accounts. Total interest is $680. How much in each?"',
            steps: [
              'Let x = amount at 5%',
              'Then 10000 - x = amount at 8%',
              '0.05x + 0.08(10000 - x) = 680',
              '0.05x + 800 - 0.08x = 680',
              '-0.03x = -120',
              'x = 4000'
            ],
            solution: '$4000 at 5%, $6000 at 8%',
            explanation: 'Check: 0.05(4000) + 0.08(6000) = 200 + 480 = $680 ✓'
          }
        ]
      }
    ]
  },
  {
    id: 'word-unit-7',
    sectionId: 'word-problems',
    title: 'Number Problems',
    description: 'Solve problems about properties of numbers.',
    xpCost: 5,
    estimatedReadTime: 8,
    relatedTopics: ['Number Problems', 'Consecutive Numbers', 'Digit Problems'],
    sections: [
      {
        id: 'word-7-1',
        title: 'Consecutive Number Problems',
        content: `Consecutive numbers follow in sequence:
- Consecutive integers: n, n+1, n+2, ...
- Consecutive evens: n, n+2, n+4, ...
- Consecutive odds: n, n+2, n+4, ...`,
        examples: [
          {
            problem: '"The sum of three consecutive integers is 72. Find them."',
            steps: [
              'Let the integers be n, n+1, n+2',
              'n + (n+1) + (n+2) = 72',
              '3n + 3 = 72',
              '3n = 69',
              'n = 23'
            ],
            solution: '23, 24, 25',
            explanation: 'Check: 23 + 24 + 25 = 72 ✓'
          }
        ]
      },
      {
        id: 'word-7-2',
        title: 'Digit Problems',
        content: `For a two-digit number with tens digit T and units digit U:
Number value = 10T + U

When digits are reversed: 10U + T`,
        examples: [
          {
            problem: '"A two-digit number has digits that sum to 9. Reversed, it\'s 27 less. Find it."',
            steps: [
              'T + U = 9',
              'Original: 10T + U',
              'Reversed: 10U + T',
              'Reversed is 27 less: 10U + T = (10T + U) - 27',
              '9U - 9T = -27',
              'U - T = -3, so T = U + 3',
              'Substitute: (U + 3) + U = 9, so U = 3, T = 6'
            ],
            solution: '63',
            explanation: 'Check: 6+3=9 ✓, 63-36=27 ✓'
          }
        ]
      }
    ]
  },
  {
    id: 'word-unit-8',
    sectionId: 'word-problems',
    title: 'Geometry Word Problems',
    description: 'Apply geometry concepts to real-world scenarios.',
    xpCost: 5,
    estimatedReadTime: 10,
    relatedTopics: ['Geometry Problems', 'Area', 'Perimeter', 'Dimensions'],
    sections: [
      {
        id: 'word-8-1',
        title: 'Perimeter and Area Problems',
        content: `Common geometry word problems involve finding dimensions given relationships:`,
        formulas: [
          {
            name: 'Rectangle Perimeter',
            latex: 'P = 2l + 2w',
            description: 'Sum of all sides'
          },
          {
            name: 'Rectangle Area',
            latex: 'A = l \\times w',
            description: 'Length times width'
          }
        ],
        examples: [
          {
            problem: '"A rectangle is 3 feet longer than it is wide. Its perimeter is 46 feet. Find dimensions."',
            steps: [
              'Let width = w',
              'Then length = w + 3',
              'P = 2w + 2(w + 3) = 46',
              '2w + 2w + 6 = 46',
              '4w = 40',
              'w = 10'
            ],
            solution: 'Width: 10 ft, Length: 13 ft',
            explanation: 'Check: 2(10) + 2(13) = 20 + 26 = 46 ✓'
          }
        ]
      },
      {
        id: 'word-8-2',
        title: 'Triangle Problems',
        content: `Triangle relationships in word problems:`,
        formulas: [
          {
            name: 'Triangle Angle Sum',
            latex: 'A + B + C = 180°',
            description: 'Angles of a triangle sum to 180°'
          },
          {
            name: 'Pythagorean Theorem',
            latex: 'a^2 + b^2 = c^2',
            description: 'For right triangles'
          }
        ],
        examples: [
          {
            problem: '"In a triangle, the second angle is twice the first, and the third is 20° more than the second. Find all angles."',
            steps: [
              'Let first angle = x',
              'Second angle = 2x',
              'Third angle = 2x + 20',
              'x + 2x + (2x + 20) = 180',
              '5x + 20 = 180',
              '5x = 160',
              'x = 32°'
            ],
            solution: '32°, 64°, 84°',
            explanation: 'Check: 32 + 64 + 84 = 180° ✓'
          }
        ]
      }
    ]
  }
]

export default WORD_PROBLEMS_REFERENCE_UNITS

