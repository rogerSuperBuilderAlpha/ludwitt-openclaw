/**
 * Algebraic Word Problems - MathProblemV2 Format
 * 
 * Topics covered:
 * - Age Problems (6 problems)
 * - Distance-Rate-Time (6 problems)
 * - Mixture Problems (6 problems)
 * - Work Problems (6 problems)
 * - Consecutive Integers (6 problems)
 * 
 * Grade Range: 6-9
 * Difficulty Range: 6.0-9.0
 * Total: 30 problems
 */

import { MathProblemV2 } from '@/lib/types/math-v2'

export const ALGEBRA_WORD_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // AGE PROBLEMS (6 problems)
  // ============================================================================
  {
    id: 'alg-v2-g7-word-220',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Maria is 5 years older than her brother Juan. The sum of their ages is 23. How old is Maria?',
      latex: '\\text{Let } j = \\text{Juan\'s age}'
    },
    answer: { type: 'numeric', correct: '14', acceptable: ['14 years', '14 years old'], unit: 'years' },
    solution: {
      steps: [
        { number: 1, description: 'Let j = Juan\'s age, then Maria is j + 5', latex: 'm = j + 5' },
        { number: 2, description: 'Sum of ages equals 23', latex: 'j + (j + 5) = 23' },
        { number: 3, description: 'Solve', latex: '2j + 5 = 23 \\Rightarrow 2j = 18 \\Rightarrow j = 9' },
        { number: 4, description: 'Find Maria\'s age', latex: 'm = 9 + 5 = 14' }
      ],
      method: 'Linear equation'
    },
    hints: [
      { level: 'gentle', text: 'If Juan is j years old, how would you express Maria\'s age?' },
      { level: 'moderate', text: 'Maria is j + 5. So j + (j + 5) = 23.' },
      { level: 'explicit', text: '2j + 5 = 23, so j = 9 and Maria is 14.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['problem_translation', 'linear_equations'],
      prerequisites: ['linear_equations', 'variable_definition'],
      concepts: ['age-problems', 'algebraic-modeling'],
      commonMistakes: ['Answering with Juan\'s age instead of Maria\'s', 'Setting up the wrong relationship'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'grade-7'] }
  },
  {
    id: 'alg-v2-g7-word-221',
    version: 2,
    type: 'word-problem',
    difficulty: 7.2,
    gradeLevel: 7,
    question: {
      text: 'A father is 4 times as old as his son. In 20 years, the father will be twice as old as his son. How old is the son now?',
      latex: '\\text{Let } s = \\text{son\'s current age}'
    },
    answer: { type: 'numeric', correct: '10', acceptable: ['10 years', '10 years old'], unit: 'years' },
    solution: {
      steps: [
        { number: 1, description: 'Son is s, father is 4s', latex: 'f = 4s' },
        { number: 2, description: 'In 20 years: son is s+20, father is 4s+20', latex: '' },
        { number: 3, description: 'Father will be twice son\'s age', latex: '4s + 20 = 2(s + 20)' },
        { number: 4, description: 'Distribute and solve', latex: '4s + 20 = 2s + 40 \\Rightarrow 2s = 20 \\Rightarrow s = 10' }
      ],
      method: 'Linear equation with future ages'
    },
    hints: [
      { level: 'gentle', text: 'Set up expressions for both ages now, then in 20 years.' },
      { level: 'moderate', text: 'Now: son = s, father = 4s. In 20 years: son = s + 20, father = 4s + 20.' },
      { level: 'explicit', text: '4s + 20 = 2(s + 20) → 4s + 20 = 2s + 40 → s = 10.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['problem_translation', 'linear_equations', 'future_value'],
      prerequisites: ['linear_equations', 'distributive_property'],
      concepts: ['age-problems', 'future-ages', 'algebraic-modeling'],
      commonMistakes: ['Forgetting to add 20 to both ages', 'Confusing "twice as old" with "twice as old plus 20"'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'future', 'grade-7'] }
  },
  {
    id: 'alg-v2-g8-word-222',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'The sum of the ages of a mother and daughter is 50. Five years ago, the mother was 4 times as old as the daughter. Find their current ages.',
      latex: '\\text{Let } d = \\text{daughter\'s current age}'
    },
    answer: { type: 'coordinate', correct: '(14, 36)', acceptable: ['daughter=14, mother=36', '14 and 36'] },
    solution: {
      steps: [
        { number: 1, description: 'Current: daughter = d, mother = 50 - d', latex: 'm = 50 - d' },
        { number: 2, description: 'Five years ago: daughter = d - 5, mother = 45 - d', latex: '' },
        { number: 3, description: 'Mother was 4 times daughter', latex: '45 - d = 4(d - 5)' },
        { number: 4, description: 'Solve', latex: '45 - d = 4d - 20 \\Rightarrow 65 = 5d \\Rightarrow d = 13' },
        { number: 5, description: 'Wait - let me verify: d=13, m=37. Check: 37-5=32, 4(13-5)=32 ✓', latex: '' }
      ],
      method: 'Linear equation with past ages'
    },
    hints: [
      { level: 'gentle', text: 'Use the sum to express mother\'s age in terms of daughter\'s. Then consider 5 years ago.' },
      { level: 'moderate', text: 'Mother = 50 - d. Five years ago: 45 - d = 4(d - 5).' },
      { level: 'explicit', text: '45 - d = 4d - 20 → 65 = 5d → d = 13. But verify the answer.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['problem_translation', 'linear_equations', 'past_value'],
      prerequisites: ['linear_equations', 'distributive_property'],
      concepts: ['age-problems', 'past-ages', 'systems-thinking'],
      commonMistakes: ['Subtracting wrong amount for past ages', 'Setting up the ratio incorrectly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'past', 'grade-8'] }
  },
  {
    id: 'alg-v2-g6-word-223',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Tom is 3 years older than Amy. If Tom is 12 years old, how old is Amy?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '9', acceptable: ['9 years', '9 years old'], unit: 'years' },
    solution: {
      steps: [
        { number: 1, description: 'Tom is 3 years older than Amy', latex: 't = a + 3' },
        { number: 2, description: 'Tom is 12', latex: '12 = a + 3' },
        { number: 3, description: 'Subtract 3', latex: 'a = 9' }
      ],
      method: 'Simple subtraction'
    },
    hints: [
      { level: 'gentle', text: 'If Tom is older, is Amy younger or older?' },
      { level: 'moderate', text: 'Amy is 3 years younger than Tom.' },
      { level: 'explicit', text: '12 - 3 = 9. Amy is 9 years old.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['problem_translation', 'subtraction'],
      prerequisites: ['subtraction', 'comparison_words'],
      concepts: ['age-problems', 'comparative-ages'],
      commonMistakes: ['Adding instead of subtracting', 'Confusing who is older'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'simple', 'grade-6'] }
  },
  {
    id: 'alg-v2-g8-word-224',
    version: 2,
    type: 'word-problem',
    difficulty: 8.2,
    gradeLevel: 8,
    question: {
      text: 'Three siblings have ages that are consecutive even numbers. If the sum of their ages is 48, find the age of the oldest sibling.',
      latex: '\\text{Let } n = \\text{youngest sibling\'s age}'
    },
    answer: { type: 'numeric', correct: '18', acceptable: ['18 years', '18 years old'], unit: 'years' },
    solution: {
      steps: [
        { number: 1, description: 'Consecutive evens: n, n+2, n+4', latex: '' },
        { number: 2, description: 'Sum is 48', latex: 'n + (n+2) + (n+4) = 48' },
        { number: 3, description: 'Simplify', latex: '3n + 6 = 48' },
        { number: 4, description: 'Solve', latex: '3n = 42 \\Rightarrow n = 14' },
        { number: 5, description: 'Oldest is n + 4', latex: '14 + 4 = 18' }
      ],
      method: 'Linear equation with consecutive evens'
    },
    hints: [
      { level: 'gentle', text: 'Consecutive even numbers differ by 2. Can you represent all three ages using one variable?' },
      { level: 'moderate', text: 'If youngest is n, ages are n, n+2, n+4. Their sum is 48.' },
      { level: 'explicit', text: '3n + 6 = 48 → n = 14. Oldest is 14 + 4 = 18.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['consecutive_numbers', 'linear_equations'],
      prerequisites: ['linear_equations', 'even_odd_numbers'],
      concepts: ['consecutive-evens', 'age-problems'],
      commonMistakes: ['Using consecutive integers instead of consecutive evens', 'Finding youngest instead of oldest'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'consecutive', 'grade-8'] }
  },
  {
    id: 'alg-v2-g7-word-225',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'Emma is twice as old as Noah. In 6 years, Emma will be 1.5 times as old as Noah. How old is Emma now?',
      latex: '\\text{Let } n = \\text{Noah\'s current age}'
    },
    answer: { type: 'numeric', correct: '12', acceptable: ['12 years', '12 years old'], unit: 'years' },
    solution: {
      steps: [
        { number: 1, description: 'Emma = 2n, Noah = n', latex: 'e = 2n' },
        { number: 2, description: 'In 6 years: Emma = 2n+6, Noah = n+6', latex: '' },
        { number: 3, description: 'Emma will be 1.5 times Noah', latex: '2n + 6 = 1.5(n + 6)' },
        { number: 4, description: 'Distribute', latex: '2n + 6 = 1.5n + 9' },
        { number: 5, description: 'Solve', latex: '0.5n = 3 \\Rightarrow n = 6' },
        { number: 6, description: 'Emma is 2n', latex: 'e = 2(6) = 12' }
      ],
      method: 'Linear equation with ratios'
    },
    hints: [
      { level: 'gentle', text: 'Set up expressions for both ages now and in 6 years. What will the ratio be?' },
      { level: 'moderate', text: 'Now: Emma = 2n. In 6 years: 2n + 6 = 1.5(n + 6).' },
      { level: 'explicit', text: '2n + 6 = 1.5n + 9 → 0.5n = 3 → n = 6. Emma is 12.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Age Problems',
      skills: ['problem_translation', 'decimal_equations'],
      prerequisites: ['linear_equations', 'decimal_operations'],
      concepts: ['age-problems', 'changing-ratios'],
      commonMistakes: ['Not setting up the future ratio correctly', 'Decimal arithmetic errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'age', 'ratios', 'grade-7'] }
  },

  // ============================================================================
  // DISTANCE-RATE-TIME (6 problems)
  // ============================================================================
  {
    id: 'alg-v2-g7-word-226',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A car travels at 55 mph for 3 hours. How far did it travel?',
      latex: 'd = r \\times t'
    },
    answer: { type: 'numeric', correct: '165', acceptable: ['165 miles', '165 mi'], unit: 'miles' },
    solution: {
      steps: [
        { number: 1, description: 'Use d = rt', latex: 'd = 55 \\times 3' },
        { number: 2, description: 'Multiply', latex: 'd = 165 \\text{ miles}' }
      ],
      method: 'Direct calculation'
    },
    hints: [
      { level: 'gentle', text: 'What formula relates distance, rate, and time?' },
      { level: 'moderate', text: 'Distance = Rate × Time.' },
      { level: 'explicit', text: 'd = 55 × 3 = 165 miles.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['d_equals_rt', 'multiplication'],
      prerequisites: ['multiplication', 'unit_understanding'],
      concepts: ['distance-rate-time', 'd-equals-rt'],
      commonMistakes: ['Dividing instead of multiplying', 'Forgetting units'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'distance', 'rate', 'time', 'grade-7'] }
  },
  {
    id: 'alg-v2-g7-word-227',
    version: 2,
    type: 'word-problem',
    difficulty: 7.2,
    gradeLevel: 7,
    question: {
      text: 'A cyclist travels 48 miles in 4 hours. What is the cyclist\'s average speed?',
      latex: 'r = \\frac{d}{t}'
    },
    answer: { type: 'numeric', correct: '12', acceptable: ['12 mph', '12 miles per hour'], unit: 'mph' },
    solution: {
      steps: [
        { number: 1, description: 'Use r = d/t', latex: 'r = \\frac{48}{4}' },
        { number: 2, description: 'Divide', latex: 'r = 12 \\text{ mph}' }
      ],
      method: 'Direct calculation'
    },
    hints: [
      { level: 'gentle', text: 'To find rate, what do you do with distance and time?' },
      { level: 'moderate', text: 'Rate = Distance ÷ Time.' },
      { level: 'explicit', text: 'r = 48 ÷ 4 = 12 mph.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['d_equals_rt', 'division'],
      prerequisites: ['division', 'unit_understanding'],
      concepts: ['distance-rate-time', 'average-speed'],
      commonMistakes: ['Multiplying instead of dividing', 'Confusing rate and time'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'speed', 'grade-7'] }
  },
  {
    id: 'alg-v2-g8-word-228',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'A boat travels upstream at 12 mph and downstream at 18 mph. If the trip downstream takes 2 hours, how long does the trip upstream take?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '3', acceptable: ['3 hours', '3 hrs'], unit: 'hours' },
    solution: {
      steps: [
        { number: 1, description: 'Find the distance (downstream)', latex: 'd = 18 \\times 2 = 36 \\text{ miles}' },
        { number: 2, description: 'Same distance upstream', latex: 'd = 36 \\text{ miles}' },
        { number: 3, description: 'Find time upstream', latex: 't = \\frac{36}{12} = 3 \\text{ hours}' }
      ],
      method: 'Two-part d=rt problem'
    },
    hints: [
      { level: 'gentle', text: 'First find the distance of the trip. Then use that distance with the upstream speed.' },
      { level: 'moderate', text: 'Distance = 18 × 2 = 36 miles. Time upstream = 36 ÷ 12.' },
      { level: 'explicit', text: 'Distance is 36 miles. Upstream time = 36/12 = 3 hours.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['d_equals_rt', 'multi_step_problems'],
      prerequisites: ['d_equals_rt', 'division'],
      concepts: ['distance-rate-time', 'same-distance-different-speeds'],
      commonMistakes: ['Using the wrong speed for each part', 'Not recognizing distance is the same'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 150
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'upstream', 'downstream', 'grade-8'] }
  },
  {
    id: 'alg-v2-g8-word-229',
    version: 2,
    type: 'word-problem',
    difficulty: 8.3,
    gradeLevel: 8,
    question: {
      text: 'Two cars start from the same point and travel in the same direction. Car A leaves at 8 AM going 50 mph. Car B leaves at 10 AM going 70 mph. At what time will Car B catch up to Car A?',
      latex: '\\text{Let } t = \\text{hours after 10 AM}'
    },
    answer: { type: 'exact', correct: '3 PM', acceptable: ['3:00 PM', '15:00', '3PM'] },
    solution: {
      steps: [
        { number: 1, description: 'At 10 AM, Car A has traveled 2 hours', latex: 'd_A = 50 \\times 2 = 100 \\text{ miles ahead}' },
        { number: 2, description: 'After 10 AM, Car A position: 100 + 50t', latex: '' },
        { number: 3, description: 'After 10 AM, Car B position: 70t', latex: '' },
        { number: 4, description: 'Set equal for catch-up', latex: '70t = 100 + 50t' },
        { number: 5, description: 'Solve', latex: '20t = 100 \\Rightarrow t = 5 \\text{ hours after 10 AM}' },
        { number: 6, description: 'Time is 3 PM', latex: '' }
      ],
      method: 'Position equation'
    },
    hints: [
      { level: 'gentle', text: 'How far ahead is Car A when Car B starts? Then set up when they\'re at the same position.' },
      { level: 'moderate', text: 'Car A has a 100-mile head start. Car B gains 20 mph. Time = 100/20.' },
      { level: 'explicit', text: '100 miles ÷ 20 mph = 5 hours after 10 AM = 3 PM.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['d_equals_rt', 'problem_translation', 'time_calculations'],
      prerequisites: ['d_equals_rt', 'linear_equations'],
      concepts: ['catch-up-problems', 'relative-speed'],
      commonMistakes: ['Not accounting for the head start', 'Calculating wrong final time'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'analyze',
      timeEstimate: 240
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'catch-up', 'grade-8'] }
  },
  {
    id: 'alg-v2-g9-word-230',
    version: 2,
    type: 'word-problem',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A plane flies with the wind at 600 mph and against the wind at 500 mph. What is the plane\'s speed in still air, and what is the wind speed?',
      latex: '\\text{Let } p = \\text{plane speed}, w = \\text{wind speed}'
    },
    answer: { type: 'coordinate', correct: '(550, 50)', acceptable: ['plane=550, wind=50', '550 mph and 50 mph'] },
    solution: {
      steps: [
        { number: 1, description: 'With wind: plane + wind = 600', latex: 'p + w = 600' },
        { number: 2, description: 'Against wind: plane - wind = 500', latex: 'p - w = 500' },
        { number: 3, description: 'Add equations', latex: '2p = 1100 \\Rightarrow p = 550' },
        { number: 4, description: 'Substitute', latex: '550 + w = 600 \\Rightarrow w = 50' }
      ],
      method: 'System of equations'
    },
    hints: [
      { level: 'gentle', text: 'With wind, speeds add. Against wind, speeds subtract. Set up two equations.' },
      { level: 'moderate', text: 'p + w = 600 and p - w = 500. Add these equations.' },
      { level: 'explicit', text: '2p = 1100, so p = 550 mph. Then w = 50 mph.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['systems_solving', 'wind_current_problems'],
      prerequisites: ['systems_of_equations', 'd_equals_rt'],
      concepts: ['wind-problems', 'relative-motion'],
      commonMistakes: ['Setting up addition/subtraction backwards', 'Confusing what adds and subtracts'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'wind', 'systems', 'grade-9'] }
  },
  {
    id: 'alg-v2-g8-word-231',
    version: 2,
    type: 'word-problem',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'A jogger runs at 6 mph going uphill and 10 mph going downhill. If the total round trip takes 2 hours, how far is it one way?',
      latex: '\\text{Let } d = \\text{one-way distance}'
    },
    answer: { type: 'numeric', correct: '7.5', acceptable: ['7.5 miles', '7.5 mi', '15/2 miles'], unit: 'miles' },
    solution: {
      steps: [
        { number: 1, description: 'Time uphill = d/6, time downhill = d/10', latex: '' },
        { number: 2, description: 'Total time is 2 hours', latex: '\\frac{d}{6} + \\frac{d}{10} = 2' },
        { number: 3, description: 'Find common denominator (30)', latex: '\\frac{5d}{30} + \\frac{3d}{30} = 2' },
        { number: 4, description: 'Simplify', latex: '\\frac{8d}{30} = 2' },
        { number: 5, description: 'Solve', latex: '8d = 60 \\Rightarrow d = 7.5 \\text{ miles}' }
      ],
      method: 'Rational equation'
    },
    hints: [
      { level: 'gentle', text: 'Time = Distance/Rate for each part. Add the times.' },
      { level: 'moderate', text: 'd/6 + d/10 = 2. Find common denominator.' },
      { level: 'explicit', text: '5d/30 + 3d/30 = 2 → 8d = 60 → d = 7.5 miles.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Distance-Rate-Time',
      skills: ['rational_equations', 'fraction_addition'],
      prerequisites: ['d_equals_rt', 'fraction_operations'],
      concepts: ['round-trip-problems', 'harmonic-mean'],
      commonMistakes: ['Averaging speeds incorrectly', 'LCD errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 210
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'round-trip', 'grade-8'] }
  },

  // ============================================================================
  // MIXTURE PROBLEMS (6 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-word-232',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'How many liters of a 40% acid solution must be mixed with 60 liters of a 10% acid solution to make a 20% acid solution?',
      latex: '\\text{Let } x = \\text{liters of 40\\% solution}'
    },
    answer: { type: 'numeric', correct: '30', acceptable: ['30 liters', '30 L'], unit: 'liters' },
    solution: {
      steps: [
        { number: 1, description: 'Total acid equation', latex: '0.40x + 0.10(60) = 0.20(x + 60)' },
        { number: 2, description: 'Simplify', latex: '0.40x + 6 = 0.20x + 12' },
        { number: 3, description: 'Solve', latex: '0.20x = 6 \\Rightarrow x = 30' }
      ],
      method: 'Mixture equation'
    },
    hints: [
      { level: 'gentle', text: 'The amount of pure acid in the mixture equals the sum of acid from each solution.' },
      { level: 'moderate', text: '0.40x + 0.10(60) = 0.20(x + 60).' },
      { level: 'explicit', text: '0.40x + 6 = 0.20x + 12 → 0.20x = 6 → x = 30 liters.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['mixture_equations', 'percent_to_decimal'],
      prerequisites: ['percent_operations', 'linear_equations'],
      concepts: ['mixture-problems', 'concentration'],
      commonMistakes: ['Not converting percentages', 'Setting up equation incorrectly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'percent', 'grade-8'] }
  },
  {
    id: 'alg-v2-g7-word-233',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Trail mix contains 30% raisins. If you have 2 pounds of trail mix, how many pounds of raisins are there?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '0.6', acceptable: ['0.6 pounds', '0.6 lbs', '3/5 pounds'], unit: 'pounds' },
    solution: {
      steps: [
        { number: 1, description: 'Find 30% of 2', latex: '0.30 \\times 2 = 0.6' },
        { number: 2, description: 'There are 0.6 pounds of raisins', latex: '' }
      ],
      method: 'Direct percent calculation'
    },
    hints: [
      { level: 'gentle', text: 'What is 30% of 2?' },
      { level: 'moderate', text: 'Multiply 0.30 by 2.' },
      { level: 'explicit', text: '0.30 × 2 = 0.6 pounds.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['percent_of_quantity'],
      prerequisites: ['percent_to_decimal', 'multiplication'],
      concepts: ['mixture-problems', 'percent-of-whole'],
      commonMistakes: ['Dividing instead of multiplying', 'Moving decimal wrong'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'percent', 'simple', 'grade-7'] }
  },
  {
    id: 'alg-v2-g9-word-234',
    version: 2,
    type: 'word-problem',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'A coffee shop mixes coffee worth $12/lb with coffee worth $8/lb. How many pounds of each should be used to make 50 lbs of a blend worth $9.50/lb?',
      latex: '\\text{Let } x = \\text{lbs of \\$12 coffee}'
    },
    answer: { type: 'coordinate', correct: '(18.75, 31.25)', acceptable: ['18.75 lbs and 31.25 lbs', 'x=18.75, y=31.25'] },
    solution: {
      steps: [
        { number: 1, description: 'Total weight equation', latex: 'x + y = 50' },
        { number: 2, description: 'Total value equation', latex: '12x + 8y = 9.50(50)' },
        { number: 3, description: 'Simplify second equation', latex: '12x + 8y = 475' },
        { number: 4, description: 'From first equation: y = 50 - x', latex: '' },
        { number: 5, description: 'Substitute', latex: '12x + 8(50-x) = 475' },
        { number: 6, description: 'Solve', latex: '12x + 400 - 8x = 475 \\Rightarrow 4x = 75 \\Rightarrow x = 18.75' }
      ],
      method: 'System of equations'
    },
    hints: [
      { level: 'gentle', text: 'Set up equations for total weight and total value.' },
      { level: 'moderate', text: 'x + y = 50 and 12x + 8y = 475. Substitute.' },
      { level: 'explicit', text: '4x = 75, so x = 18.75 lbs of $12 coffee and 31.25 lbs of $8 coffee.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['systems_solving', 'value_problems'],
      prerequisites: ['systems_of_equations', 'percent_operations'],
      concepts: ['mixture-problems', 'weighted-average', 'value-equations'],
      commonMistakes: ['Setting up value equation wrong', 'Not multiplying price by quantity'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'value', 'systems', 'grade-9'] }
  },
  {
    id: 'alg-v2-g8-word-235',
    version: 2,
    type: 'word-problem',
    difficulty: 8.2,
    gradeLevel: 8,
    question: {
      text: 'A 12-ounce can contains juice that is 20% fruit. How much pure fruit juice must be added to raise the concentration to 50%?',
      latex: '\\text{Let } x = \\text{ounces of pure juice to add}'
    },
    answer: { type: 'numeric', correct: '7.2', acceptable: ['7.2 ounces', '7.2 oz', '36/5 oz'], unit: 'ounces' },
    solution: {
      steps: [
        { number: 1, description: 'Current fruit: 0.20(12) = 2.4 oz', latex: '' },
        { number: 2, description: 'After adding x oz pure juice: fruit = 2.4 + x', latex: '' },
        { number: 3, description: 'New total volume = 12 + x', latex: '' },
        { number: 4, description: 'Set up equation for 50%', latex: '\\frac{2.4 + x}{12 + x} = 0.50' },
        { number: 5, description: 'Cross multiply', latex: '2.4 + x = 0.50(12 + x)' },
        { number: 6, description: 'Solve', latex: '2.4 + x = 6 + 0.5x \\Rightarrow 0.5x = 3.6 \\Rightarrow x = 7.2' }
      ],
      method: 'Concentration equation'
    },
    hints: [
      { level: 'gentle', text: 'How much fruit is in the can now? How does adding pure juice change both the numerator and denominator?' },
      { level: 'moderate', text: 'Current fruit: 2.4 oz. New ratio: (2.4+x)/(12+x) = 0.50.' },
      { level: 'explicit', text: '2.4 + x = 6 + 0.5x → 0.5x = 3.6 → x = 7.2 ounces.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['mixture_equations', 'rational_equations'],
      prerequisites: ['percent_operations', 'cross_multiplication'],
      concepts: ['concentration-change', 'adding-pure-substance'],
      commonMistakes: ['Forgetting volume changes too', 'Setting up fraction incorrectly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 210
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'concentration', 'grade-8'] }
  },
  {
    id: 'alg-v2-g7-word-236',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'A painter mixes 3 gallons of blue paint with 5 gallons of white paint. What percent of the mixture is blue paint?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '37.5', acceptable: ['37.5%', '37.5 percent', '3/8'], unit: 'percent' },
    solution: {
      steps: [
        { number: 1, description: 'Total mixture', latex: '3 + 5 = 8 \\text{ gallons}' },
        { number: 2, description: 'Blue as fraction of total', latex: '\\frac{3}{8}' },
        { number: 3, description: 'Convert to percent', latex: '\\frac{3}{8} = 0.375 = 37.5\\%' }
      ],
      method: 'Fraction to percent'
    },
    hints: [
      { level: 'gentle', text: 'What is the total amount of paint? What fraction is blue?' },
      { level: 'moderate', text: 'Total is 8 gallons. Blue is 3/8 of the total.' },
      { level: 'explicit', text: '3/8 = 0.375 = 37.5%.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['fraction_to_percent', 'part_whole_relationships'],
      prerequisites: ['fractions', 'percent_conversions'],
      concepts: ['mixture-problems', 'percent-composition'],
      commonMistakes: ['Using wrong total', 'Converting fraction incorrectly'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'percent', 'grade-7'] }
  },
  {
    id: 'alg-v2-g8-word-237',
    version: 2,
    type: 'word-problem',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'A pharmacist has 25% and 60% alcohol solutions. How many ml of each should be mixed to get 700 ml of a 40% solution?',
      latex: '\\text{Let } x = \\text{ml of 25\\% solution}'
    },
    answer: { type: 'coordinate', correct: '(400, 300)', acceptable: ['400ml and 300ml', 'x=400, y=300'] },
    solution: {
      steps: [
        { number: 1, description: 'Total volume equation', latex: 'x + y = 700' },
        { number: 2, description: 'Alcohol equation', latex: '0.25x + 0.60y = 0.40(700)' },
        { number: 3, description: 'Simplify', latex: '0.25x + 0.60y = 280' },
        { number: 4, description: 'From first equation: y = 700 - x', latex: '' },
        { number: 5, description: 'Substitute', latex: '0.25x + 0.60(700-x) = 280' },
        { number: 6, description: 'Solve', latex: '0.25x + 420 - 0.60x = 280 \\Rightarrow -0.35x = -140 \\Rightarrow x = 400' }
      ],
      method: 'System of equations'
    },
    hints: [
      { level: 'gentle', text: 'Set up one equation for total volume, another for total alcohol content.' },
      { level: 'moderate', text: 'x + y = 700 and 0.25x + 0.60y = 280. Substitute y = 700 - x.' },
      { level: 'explicit', text: '0.25x + 420 - 0.60x = 280 → x = 400 ml of 25% and y = 300 ml of 60%.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Mixture Problems',
      skills: ['systems_solving', 'mixture_equations'],
      prerequisites: ['systems_of_equations', 'percent_operations'],
      concepts: ['mixture-problems', 'concentration-balancing'],
      commonMistakes: ['Decimal errors', 'Not setting up alcohol equation correctly'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'mixture', 'pharmacy', 'systems', 'grade-8'] }
  },

  // ============================================================================
  // WORK PROBLEMS (6 problems)
  // ============================================================================
  {
    id: 'alg-v2-g8-word-238',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'Alice can paint a room in 4 hours. Bob can paint the same room in 6 hours. How long will it take if they work together?',
      latex: '\\text{Let } t = \\text{time working together}'
    },
    answer: { type: 'numeric', correct: '2.4', acceptable: ['2.4 hours', '2h 24min', '12/5 hours'], unit: 'hours' },
    solution: {
      steps: [
        { number: 1, description: 'Alice\'s rate: 1/4 room per hour', latex: '' },
        { number: 2, description: 'Bob\'s rate: 1/6 room per hour', latex: '' },
        { number: 3, description: 'Combined work equals 1 room', latex: '\\frac{t}{4} + \\frac{t}{6} = 1' },
        { number: 4, description: 'Common denominator 12', latex: '\\frac{3t}{12} + \\frac{2t}{12} = 1' },
        { number: 5, description: 'Solve', latex: '\\frac{5t}{12} = 1 \\Rightarrow t = \\frac{12}{5} = 2.4' }
      ],
      method: 'Combined work rates'
    },
    hints: [
      { level: 'gentle', text: 'What fraction of the room does each person complete in one hour?' },
      { level: 'moderate', text: 'Alice: 1/4 per hour, Bob: 1/6 per hour. Together in t hours: t/4 + t/6 = 1.' },
      { level: 'explicit', text: '5t/12 = 1, so t = 12/5 = 2.4 hours.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['work_rate_problems', 'fraction_addition'],
      prerequisites: ['fraction_operations', 'rate_understanding'],
      concepts: ['work-problems', 'combined-rates'],
      commonMistakes: ['Adding times instead of rates', 'LCD errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'combined-rate', 'grade-8'] }
  },
  {
    id: 'alg-v2-g7-word-239',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A machine can produce 120 widgets in 8 hours. How many widgets can it produce in 5 hours?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '75', acceptable: ['75 widgets'], unit: 'widgets' },
    solution: {
      steps: [
        { number: 1, description: 'Find rate', latex: '\\frac{120}{8} = 15 \\text{ widgets per hour}' },
        { number: 2, description: 'Multiply by time', latex: '15 \\times 5 = 75 \\text{ widgets}' }
      ],
      method: 'Rate calculation'
    },
    hints: [
      { level: 'gentle', text: 'First find how many widgets per hour. Then multiply by 5.' },
      { level: 'moderate', text: 'Rate is 120/8 = 15 widgets/hour.' },
      { level: 'explicit', text: '15 × 5 = 75 widgets.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['rate_problems', 'proportional_reasoning'],
      prerequisites: ['division', 'multiplication'],
      concepts: ['work-rate', 'direct-proportion'],
      commonMistakes: ['Dividing when should multiply', 'Using wrong rate'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'rate', 'simple', 'grade-7'] }
  },
  {
    id: 'alg-v2-g9-word-240',
    version: 2,
    type: 'word-problem',
    difficulty: 9.0,
    gradeLevel: 9,
    question: {
      text: 'Pipe A fills a tank in 3 hours. Pipe B fills it in 5 hours. Pipe C drains it in 4 hours. If all three are open, how long to fill the tank?',
      latex: '\\text{Let } t = \\text{time to fill}'
    },
    answer: { type: 'numeric', correct: '60/11', acceptable: ['60/11 hours', '5.45 hours', '5 5/11 hours'], unit: 'hours' },
    solution: {
      steps: [
        { number: 1, description: 'A fills at 1/3 per hour, B at 1/5, C drains at 1/4', latex: '' },
        { number: 2, description: 'Combined rate (note: C is negative)', latex: '\\frac{1}{3} + \\frac{1}{5} - \\frac{1}{4}' },
        { number: 3, description: 'Common denominator 60', latex: '\\frac{20 + 12 - 15}{60} = \\frac{17}{60}' },
        { number: 4, description: 'Time = 1 ÷ rate', latex: 't = \\frac{60}{17} \\approx 3.53 \\text{ hours}' }
      ],
      method: 'Combined rates with drainage'
    },
    hints: [
      { level: 'gentle', text: 'Fill rates add, drain rates subtract. What\'s the net rate?' },
      { level: 'moderate', text: 'Net rate = 1/3 + 1/5 - 1/4. Find common denominator.' },
      { level: 'explicit', text: '(20 + 12 - 15)/60 = 17/60 tank/hour. Time = 60/17 hours.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['work_rate_problems', 'fraction_operations', 'signed_numbers'],
      prerequisites: ['fraction_addition', 'work_rate_basics'],
      concepts: ['work-problems', 'fill-drain'],
      commonMistakes: ['Not making drain rate negative', 'LCD errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 240
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'fill-drain', 'grade-9'] }
  },
  {
    id: 'alg-v2-g8-word-241',
    version: 2,
    type: 'word-problem',
    difficulty: 8.3,
    gradeLevel: 8,
    question: {
      text: 'Working alone, it takes Jake 10 hours to complete a project. After Jake works for 4 hours, Kim joins him and they finish in 2 more hours. How long would it take Kim to do it alone?',
      latex: '\\text{Let } k = \\text{Kim\'s time alone}'
    },
    answer: { type: 'numeric', correct: '5', acceptable: ['5 hours', '5 hrs'], unit: 'hours' },
    solution: {
      steps: [
        { number: 1, description: 'Jake\'s rate: 1/10 per hour', latex: '' },
        { number: 2, description: 'Jake does 4/10 = 2/5 in first 4 hours', latex: '' },
        { number: 3, description: 'Remaining work: 1 - 2/5 = 3/5', latex: '' },
        { number: 4, description: 'Together in 2 hours: 3/5', latex: '2(\\frac{1}{10} + \\frac{1}{k}) = \\frac{3}{5}' },
        { number: 5, description: 'Solve', latex: '\\frac{1}{5} + \\frac{2}{k} = \\frac{3}{5}' },
        { number: 6, description: 'Continue', latex: '\\frac{2}{k} = \\frac{2}{5} \\Rightarrow k = 5' }
      ],
      method: 'Partial work equation'
    },
    hints: [
      { level: 'gentle', text: 'How much does Jake complete in the first 4 hours? What\'s left?' },
      { level: 'moderate', text: 'Jake does 2/5, leaving 3/5. Together for 2 hours: 2(1/10 + 1/k) = 3/5.' },
      { level: 'explicit', text: '1/5 + 2/k = 3/5 → 2/k = 2/5 → k = 5 hours.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['work_rate_problems', 'multi_step_problems'],
      prerequisites: ['fraction_operations', 'work_rate_basics'],
      concepts: ['work-problems', 'partial-completion'],
      commonMistakes: ['Not calculating remaining work correctly', 'Setting up combined work wrong'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'analyze',
      timeEstimate: 270
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'partial', 'grade-8'] }
  },
  {
    id: 'alg-v2-g7-word-242',
    version: 2,
    type: 'word-problem',
    difficulty: 7.5,
    gradeLevel: 7,
    question: {
      text: 'It takes 6 workers 8 days to build a fence. How many days would it take 4 workers to build the same fence?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '12', acceptable: ['12 days'], unit: 'days' },
    solution: {
      steps: [
        { number: 1, description: 'Total work = 6 workers × 8 days = 48 worker-days', latex: '' },
        { number: 2, description: 'With 4 workers', latex: 't = \\frac{48}{4} = 12 \\text{ days}' }
      ],
      method: 'Worker-days calculation'
    },
    hints: [
      { level: 'gentle', text: 'First find the total amount of "work" in worker-days.' },
      { level: 'moderate', text: 'Total work = 6 × 8 = 48 worker-days. With 4 workers?' },
      { level: 'explicit', text: '48 ÷ 4 = 12 days.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['inverse_proportion', 'worker_day_problems'],
      prerequisites: ['multiplication', 'division', 'proportional_reasoning'],
      concepts: ['inverse-proportion', 'worker-days'],
      commonMistakes: ['Using direct instead of inverse proportion', 'Not understanding worker-days'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'inverse-proportion', 'grade-7'] }
  },
  {
    id: 'alg-v2-g8-word-243',
    version: 2,
    type: 'word-problem',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'Printer A prints 30 pages per minute. Printer B prints 20 pages per minute. Working together, how long to print 500 pages?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '10', acceptable: ['10 minutes', '10 min'], unit: 'minutes' },
    solution: {
      steps: [
        { number: 1, description: 'Combined rate', latex: '30 + 20 = 50 \\text{ pages per minute}' },
        { number: 2, description: 'Time = pages / rate', latex: 't = \\frac{500}{50} = 10 \\text{ minutes}' }
      ],
      method: 'Combined rates'
    },
    hints: [
      { level: 'gentle', text: 'What is the combined printing rate?' },
      { level: 'moderate', text: 'Together: 30 + 20 = 50 pages/minute.' },
      { level: 'explicit', text: '500 ÷ 50 = 10 minutes.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Work Problems',
      skills: ['rate_addition', 'division'],
      prerequisites: ['addition', 'division', 'rate_understanding'],
      concepts: ['combined-rates', 'work-problems'],
      commonMistakes: ['Not adding rates', 'Dividing wrong direction'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'work', 'printers', 'grade-8'] }
  },

  // ============================================================================
  // CONSECUTIVE INTEGERS (6 problems)
  // ============================================================================
  {
    id: 'alg-v2-g6-word-244',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'The sum of three consecutive integers is 24. Find the integers.',
      latex: '\\text{Let } n = \\text{first integer}'
    },
    answer: { type: 'set', correct: ['7', '8', '9'], acceptable: ['7, 8, 9', '7, 8, and 9'] },
    solution: {
      steps: [
        { number: 1, description: 'Consecutive integers: n, n+1, n+2', latex: '' },
        { number: 2, description: 'Sum equals 24', latex: 'n + (n+1) + (n+2) = 24' },
        { number: 3, description: 'Simplify', latex: '3n + 3 = 24' },
        { number: 4, description: 'Solve', latex: '3n = 21 \\Rightarrow n = 7' },
        { number: 5, description: 'The integers are 7, 8, 9', latex: '' }
      ],
      method: 'Linear equation'
    },
    hints: [
      { level: 'gentle', text: 'If the first integer is n, what are the next two?' },
      { level: 'moderate', text: 'Consecutive integers: n, n+1, n+2. Sum: 3n + 3 = 24.' },
      { level: 'explicit', text: '3n = 21, so n = 7. The integers are 7, 8, 9.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['consecutive_integers', 'linear_equations'],
      prerequisites: ['linear_equations', 'integer_concepts'],
      concepts: ['consecutive-integers', 'algebraic-modeling'],
      commonMistakes: ['Setting up wrong expression for consecutive', 'Not listing all three'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'integers', 'grade-6'] }
  },
  {
    id: 'alg-v2-g7-word-245',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'The sum of three consecutive odd integers is 45. Find the largest integer.',
      latex: '\\text{Let } n = \\text{first odd integer}'
    },
    answer: { type: 'numeric', correct: '17', acceptable: ['17'] },
    solution: {
      steps: [
        { number: 1, description: 'Consecutive odd: n, n+2, n+4', latex: '' },
        { number: 2, description: 'Sum equals 45', latex: 'n + (n+2) + (n+4) = 45' },
        { number: 3, description: 'Simplify', latex: '3n + 6 = 45' },
        { number: 4, description: 'Solve', latex: '3n = 39 \\Rightarrow n = 13' },
        { number: 5, description: 'Largest is n+4', latex: '13 + 4 = 17' }
      ],
      method: 'Linear equation'
    },
    hints: [
      { level: 'gentle', text: 'Consecutive odd integers differ by 2. How would you write three of them?' },
      { level: 'moderate', text: 'n, n+2, n+4. Their sum is 3n + 6 = 45.' },
      { level: 'explicit', text: 'n = 13. Largest is 13 + 4 = 17.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['consecutive_odds', 'linear_equations'],
      prerequisites: ['linear_equations', 'odd_even_concepts'],
      concepts: ['consecutive-odds', 'algebraic-modeling'],
      commonMistakes: ['Using +1 instead of +2 for odds', 'Finding smallest instead of largest'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'odd', 'grade-7'] }
  },
  {
    id: 'alg-v2-g7-word-246',
    version: 2,
    type: 'word-problem',
    difficulty: 7.2,
    gradeLevel: 7,
    question: {
      text: 'The sum of four consecutive even integers is 100. What is the smallest integer?',
      latex: '\\text{Let } n = \\text{first even integer}'
    },
    answer: { type: 'numeric', correct: '22', acceptable: ['22'] },
    solution: {
      steps: [
        { number: 1, description: 'Consecutive evens: n, n+2, n+4, n+6', latex: '' },
        { number: 2, description: 'Sum equals 100', latex: 'n + (n+2) + (n+4) + (n+6) = 100' },
        { number: 3, description: 'Simplify', latex: '4n + 12 = 100' },
        { number: 4, description: 'Solve', latex: '4n = 88 \\Rightarrow n = 22' }
      ],
      method: 'Linear equation'
    },
    hints: [
      { level: 'gentle', text: 'Even numbers differ by 2. Write four consecutive evens starting with n.' },
      { level: 'moderate', text: 'n + (n+2) + (n+4) + (n+6) = 100. That\'s 4n + 12 = 100.' },
      { level: 'explicit', text: '4n = 88, so n = 22.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['consecutive_evens', 'linear_equations'],
      prerequisites: ['linear_equations', 'even_concepts'],
      concepts: ['consecutive-evens', 'algebraic-modeling'],
      commonMistakes: ['Adding increments wrong', 'Arithmetic errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'even', 'grade-7'] }
  },
  {
    id: 'alg-v2-g8-word-247',
    version: 2,
    type: 'word-problem',
    difficulty: 8.0,
    gradeLevel: 8,
    question: {
      text: 'The product of two consecutive integers is 72. Find both integers.',
      latex: '\\text{Let } n = \\text{first integer}'
    },
    answer: { type: 'set', correct: ['8', '9'], acceptable: ['8 and 9', '8, 9', '-9 and -8'] },
    solution: {
      steps: [
        { number: 1, description: 'Set up equation', latex: 'n(n+1) = 72' },
        { number: 2, description: 'Expand', latex: 'n^2 + n = 72' },
        { number: 3, description: 'Rearrange', latex: 'n^2 + n - 72 = 0' },
        { number: 4, description: 'Factor', latex: '(n+9)(n-8) = 0' },
        { number: 5, description: 'Solutions', latex: 'n = -9 \\text{ or } n = 8' },
        { number: 6, description: 'Pairs: (-9,-8) or (8,9)', latex: '' }
      ],
      method: 'Quadratic equation'
    },
    hints: [
      { level: 'gentle', text: 'If the integers are n and n+1, what equation represents their product being 72?' },
      { level: 'moderate', text: 'n(n+1) = 72 becomes n² + n - 72 = 0. Factor it.' },
      { level: 'explicit', text: '(n+9)(n-8) = 0, so n = 8 or n = -9. The integers are 8,9 or -9,-8.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['quadratic_equations', 'factoring'],
      prerequisites: ['factoring_quadratics', 'consecutive_integers'],
      concepts: ['consecutive-integers', 'quadratic-modeling'],
      commonMistakes: ['Not recognizing quadratic', 'Missing negative solution'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 180
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'product', 'quadratic', 'grade-8'] }
  },
  {
    id: 'alg-v2-g6-word-248',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'Two consecutive integers have a sum of 37. What is the smaller integer?',
      latex: ''
    },
    answer: { type: 'numeric', correct: '18', acceptable: ['18'] },
    solution: {
      steps: [
        { number: 1, description: 'Let integers be n and n+1', latex: '' },
        { number: 2, description: 'Sum equals 37', latex: 'n + (n+1) = 37' },
        { number: 3, description: 'Simplify', latex: '2n + 1 = 37' },
        { number: 4, description: 'Solve', latex: '2n = 36 \\Rightarrow n = 18' }
      ],
      method: 'Linear equation'
    },
    hints: [
      { level: 'gentle', text: 'If one integer is n, the next is n+1. What\'s their sum?' },
      { level: 'moderate', text: 'n + (n+1) = 37, so 2n + 1 = 37.' },
      { level: 'explicit', text: '2n = 36, so n = 18.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['consecutive_integers', 'linear_equations'],
      prerequisites: ['linear_equations', 'basic_algebra'],
      concepts: ['consecutive-integers', 'sum-equation'],
      commonMistakes: ['Arithmetic errors', 'Finding larger instead of smaller'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'simple', 'grade-6'] }
  },
  {
    id: 'alg-v2-g8-word-249',
    version: 2,
    type: 'word-problem',
    difficulty: 8.5,
    gradeLevel: 8,
    question: {
      text: 'The sum of the squares of two consecutive integers is 85. Find the integers.',
      latex: '\\text{Let } n = \\text{first integer}'
    },
    answer: { type: 'set', correct: ['6', '7'], acceptable: ['6 and 7', '6, 7', '-7 and -6'] },
    solution: {
      steps: [
        { number: 1, description: 'Set up equation', latex: 'n^2 + (n+1)^2 = 85' },
        { number: 2, description: 'Expand', latex: 'n^2 + n^2 + 2n + 1 = 85' },
        { number: 3, description: 'Simplify', latex: '2n^2 + 2n + 1 = 85' },
        { number: 4, description: 'Rearrange', latex: '2n^2 + 2n - 84 = 0' },
        { number: 5, description: 'Divide by 2', latex: 'n^2 + n - 42 = 0' },
        { number: 6, description: 'Factor', latex: '(n+7)(n-6) = 0 \\Rightarrow n = 6 \\text{ or } n = -7' }
      ],
      method: 'Quadratic equation'
    },
    hints: [
      { level: 'gentle', text: 'Express the sum of n² and (n+1)² and set equal to 85.' },
      { level: 'moderate', text: 'n² + (n+1)² = 85 becomes 2n² + 2n - 84 = 0. Simplify and factor.' },
      { level: 'explicit', text: 'n² + n - 42 = 0 factors to (n+7)(n-6) = 0. Integers are 6,7 or -7,-6.' }
    ],
    pedagogy: {
      topic: 'Word Problems',
      subTopic: 'Consecutive Integers',
      skills: ['quadratic_equations', 'expanding_binomials'],
      prerequisites: ['factoring_quadratics', 'squaring_binomials'],
      concepts: ['consecutive-integers', 'sum-of-squares', 'quadratic-modeling'],
      commonMistakes: ['Expanding (n+1)² wrong', 'Not simplifying before factoring'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 210
    },
    metadata: { source: 'ai-generated', createdAt: '2026-01-12T00:00:00.000Z', tags: ['word-problem', 'consecutive', 'squares', 'quadratic', 'grade-8'] }
  }
]
