import { ReadingExercise } from '@/lib/types/basics'

// Topics included: comma, caps, spell

export const SPELLING_PUNCTUATION_EXERCISES: ReadingExercise[] = [
  {
    id: 'grammar-g5-comma-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'I bought apples oranges bananas and grapes at the store.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'Where should commas be added?',
        type: 'short-answer',
        correctAnswer: 'After apples, oranges, and bananas (I bought apples, oranges, bananas, and grapes)',
        explanation: 'Use commas to separate items in a list or series.',
        skill: 'grammar-commas'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g5-comma-002',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Yes I would like some cake. No thank you I am full.',
    lexileScore: 420,
    questions: [
      {
        id: 'q1',
        question: 'Where should commas go in these sentences?',
        type: 'short-answer',
        correctAnswer: 'After Yes and after No and thank you (Yes, I would like... No, thank you, I am...)',
        explanation: 'Use commas after introductory words like Yes, No, Well.',
        skill: 'grammar-commas'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-comma-003',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'My sister who lives in Texas called me yesterday.',
    lexileScore: 560,
    questions: [
      {
        id: 'q1',
        question: 'Should there be commas around "who lives in Texas"?',
        type: 'short-answer',
        correctAnswer: 'Only if I have more than one sister',
        explanation: 'Use commas if the clause is nonessential. If you have one sister, no commas needed.',
        skill: 'grammar-commas'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g3-caps-001',
    type: 'grammar',
    difficulty: 3.0,
    passage: 'my friend sarah lives in new york city. she moved there in january.',
    lexileScore: 350,
    questions: [
      {
        id: 'q1',
        question: 'Which words should be capitalized?',
        type: 'short-answer',
        correctAnswer: 'My, Sarah, New York City, She, January',
        explanation: 'Capitalize: sentence beginnings, proper nouns (names, places), months.',
        skill: 'grammar-capitalization'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g3-caps-002',
    type: 'grammar',
    difficulty: 3.0,
    passage: 'We celebrate thanksgiving in november. My family eats turkey.',
    lexileScore: 360,
    questions: [
      {
        id: 'q1',
        question: 'Which words need to be capitalized?',
        type: 'short-answer',
        correctAnswer: 'Thanksgiving, November',
        explanation: 'Holidays and months are proper nouns and need capitalization.',
        skill: 'grammar-capitalization'
      }
    ],
    timeEstimate: 80
  },
  {
    id: 'grammar-g4-caps-003',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'dear mr. johnson, thank you for your letter. sincerely, mary',
    lexileScore: 420,
    questions: [
      {
        id: 'q1',
        question: 'What should be capitalized in a letter?',
        type: 'short-answer',
        correctAnswer: 'Dear, Mr., Johnson, Thank, Sincerely, Mary',
        explanation: 'Capitalize greetings, titles, names, first words of sentences, and closings.',
        skill: 'grammar-capitalization'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g4-caps-004',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'I read "the cat in the hat" by dr. seuss. It is a great book.',
    lexileScore: 440,
    questions: [
      {
        id: 'q1',
        question: 'How should the book title be written?',
        type: 'short-answer',
        correctAnswer: 'The Cat in the Hat',
        explanation: 'In titles, capitalize major words but not small words like "in" and "the" (unless first).',
        skill: 'grammar-capitalization'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-spell-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Their going to there house over their.',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'How should this sentence be corrected?',
        type: 'short-answer',
        correctAnswer: 'They\'re going to their house over there.',
        explanation: 'They\'re = they are, their = possessive, there = location.',
        skill: 'grammar-homophones'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-spell-002',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'I want to go to, but its to far too walk.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'How should this sentence be corrected?',
        type: 'short-answer',
        correctAnswer: 'I want to go too, but it\'s too far to walk.',
        explanation: 'Too = also/excessive, to = direction, it\'s = it is.',
        skill: 'grammar-homophones'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g5-spell-003',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'The affect of the medicine had a positive effect.',
    lexileScore: 540,
    questions: [
      {
        id: 'q1',
        question: 'Are "affect" and "effect" used correctly?',
        type: 'short-answer',
        correctAnswer: 'No, switch them',
        explanation: 'Effect (noun) is the result; affect (verb) means to influence. Switch them.',
        skill: 'grammar-commonly-confused'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-spell-004',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'Accept for the weather, everything was perfect. I can not except this gift.',
    lexileScore: 600,
    questions: [
      {
        id: 'q1',
        question: 'How should these sentences be corrected?',
        type: 'short-answer',
        correctAnswer: 'Except for the weather... I cannot accept this gift.',
        explanation: 'Except = excluding, accept = receive. Cannot is one word.',
        skill: 'grammar-commonly-confused'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g6-spell-005',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'The principle of the school announced a new principal for studying.',
    lexileScore: 620,
    questions: [
      {
        id: 'q1',
        question: 'Are "principle" and "principal" used correctly?',
        type: 'short-answer',
        correctAnswer: 'No, switch them',
        explanation: 'Principal = school leader or main; principle = rule or belief.',
        skill: 'grammar-commonly-confused'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-spell-006',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'I would of gone, but I was to tired. I should of called you.',
    lexileScore: 580,
    questions: [
      {
        id: 'q1',
        question: 'What common error appears in these sentences?',
        type: 'short-answer',
        correctAnswer: '"Would of" and "should of" should be "would have" and "should have"',
        explanation: '"Would\'ve" sounds like "would of" but is actually "would have."',
        skill: 'grammar-commonly-confused'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-spell-007',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'Your the best friend I have. Your always their for me.',
    lexileScore: 560,
    questions: [
      {
        id: 'q1',
        question: 'Correct the errors in these sentences.',
        type: 'short-answer',
        correctAnswer: 'You\'re the best friend I have. You\'re always there for me.',
        explanation: 'You\'re = you are, your = possessive, there = location.',
        skill: 'grammar-homophones'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-spell-008',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'She past the test with a passing grade. The past is passed.',
    lexileScore: 590,
    questions: [
      {
        id: 'q1',
        question: 'Are "past" and "passed" used correctly?',
        type: 'short-answer',
        correctAnswer: 'No. "She passed the test" (verb), "The past is past" (noun/adj).',
        explanation: 'Passed is the verb (past tense of pass); past is a noun or adjective.',
        skill: 'grammar-commonly-confused'
      }
    ],
    timeEstimate: 110
  }
]
