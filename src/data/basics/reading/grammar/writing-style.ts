import { ReadingExercise } from '@/lib/types/basics'

// Topics included: consistency, parallel, rhetorical, transition, formal, concise

export const WRITING_STYLE_EXERCISES: ReadingExercise[] = [
  {
    id: 'grammar-g6-consistency-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'She walked to the store and buys some milk. Then she goes home.',
    lexileScore: 550,
    questions: [
      {
        id: 'q1',
        question: 'What is wrong with this passage?',
        type: 'short-answer',
        correctAnswer: 'Inconsistent verb tenses',
        explanation: 'Tenses shift from past (walked) to present (buys, goes). Keep tenses consistent.',
        skill: 'grammar-tense-consistency'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-consistency-002',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'He runs to the bus stop. He missed the bus. He walks back home.',
    lexileScore: 540,
    questions: [
      {
        id: 'q1',
        question: 'How should this be corrected for tense consistency?',
        type: 'short-answer',
        correctAnswer: 'Change all to same tense: He ran/runs... He missed/misses... He walked/walks...',
        explanation: 'Pick one tense (past or present) and use it throughout.',
        skill: 'grammar-tense-consistency'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g9-parallel-001',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'The coach told the team to run quickly, jump high, and that they should throw accurately. This sentence contains a parallelism error.',
    lexileScore: 850,
    questions: [
      {
        id: 'q1',
        question: 'How should the sentence be corrected for parallel structure?',
        type: 'short-answer',
        correctAnswer: 'The coach told the team to run quickly, jump high, and throw accurately.',
        explanation: 'Parallel structure requires the same grammatical form: "to run," "jump," and "throw" (not "that they should throw").',
        skill: 'grammar-parallel-structure'
      },
      {
        id: 'q2',
        question: 'What makes a sentence have parallel structure?',
        type: 'short-answer',
        correctAnswer: 'Using similar grammatical forms in a series',
        explanation: 'Parallel structure means items in a series use the same grammatical pattern.',
        skill: 'grammar-parallel-structure'
      }
    ],
    timeEstimate: 160
  },
  {
    id: 'grammar-g9-parallel-002',
    type: 'grammar',
    difficulty: 9.0,
    passage: 'She likes swimming, biking, and to run.',
    lexileScore: 820,
    questions: [
      {
        id: 'q1',
        question: 'How should this be corrected for parallel structure?',
        type: 'short-answer',
        correctAnswer: 'She likes swimming, biking, and running.',
        explanation: 'All items in a series should use the same form (all -ing verbs).',
        skill: 'grammar-parallel-structure'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g12-rhetorical-001',
    type: 'grammar',
    difficulty: 12.0,
    passage: 'It was the best of times, it was the worst of times. (anaphora) Ask not what your country can do for you. (chiasmus-like)',
    lexileScore: 1000,
    questions: [
      {
        id: 'q1',
        question: 'What is "anaphora"?',
        type: 'short-answer',
        correctAnswer: 'Repetition at the beginning of successive clauses',
        explanation: 'Anaphora repeats words at the start of successive clauses for emphasis.',
        skill: 'grammar-rhetoric'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'grammar-g7-rhetorical-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Who doesn\'t love a sunny day?',
    lexileScore: 600,
    questions: [
      {
        id: 'q1',
        question: 'What type of question is this?',
        type: 'short-answer',
        correctAnswer: 'A rhetorical question',
        explanation: 'Rhetorical questions are asked for effect, not expecting an answer.',
        skill: 'grammar-rhetoric'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g6-transition-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'First, preheat the oven. Next, mix the ingredients. Then, pour the batter into a pan. Finally, bake for 30 minutes.',
    lexileScore: 540,
    questions: [
      {
        id: 'q1',
        question: 'What words help show the sequence of steps?',
        type: 'short-answer',
        correctAnswer: 'First, Next, Then, Finally',
        explanation: 'These are transitional words that show sequence or order.',
        skill: 'grammar-transitions'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g7-transition-002',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'The movie had great actors. However, the plot was confusing. Moreover, it was too long. Therefore, I would not recommend it.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'What transition word shows contrast?',
        type: 'short-answer',
        correctAnswer: 'However',
        explanation: 'However shows contrast between positive actors and negative plot.',
        skill: 'grammar-transitions'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g7-transition-003',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'The team practiced every day. As a result, they won the championship.',
    lexileScore: 660,
    questions: [
      {
        id: 'q1',
        question: 'What does "As a result" show?',
        type: 'short-answer',
        correctAnswer: 'Cause and effect',
        explanation: '"As a result" shows that the second event was caused by the first.',
        skill: 'grammar-transitions'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g8-formal-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'The experiment was like, totally cool. We found some awesome stuff.',
    lexileScore: 700,
    questions: [
      {
        id: 'q1',
        question: 'How should this be revised for formal academic writing?',
        type: 'short-answer',
        correctAnswer: 'The experiment yielded interesting results. We made significant discoveries.',
        explanation: 'Academic writing avoids slang ("like, totally cool," "awesome stuff").',
        skill: 'grammar-formal-writing'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g8-formal-002',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'I think that global warming is bad because it\'s gonna hurt animals.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'Revise for formal academic writing.',
        type: 'short-answer',
        correctAnswer: 'Climate change poses significant threats to wildlife populations.',
        explanation: 'Avoid "I think," contractions (gonna), and vague words (bad) in academic writing.',
        skill: 'grammar-formal-writing'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g8-concise-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'In my opinion, I believe that the reason why students fail is due to the fact that they do not study.',
    lexileScore: 760,
    questions: [
      {
        id: 'q1',
        question: 'How can this wordy sentence be made more concise?',
        type: 'short-answer',
        correctAnswer: 'Students fail because they do not study.',
        explanation: 'Remove redundancies: "In my opinion, I believe" and "due to the fact that."',
        skill: 'grammar-conciseness'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g8-concise-002',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'At this point in time, we are currently in the process of reviewing the situation at hand.',
    lexileScore: 780,
    questions: [
      {
        id: 'q1',
        question: 'Rewrite this sentence more concisely.',
        type: 'short-answer',
        correctAnswer: 'We are reviewing the situation.',
        explanation: '"At this point in time" = now; "currently in the process of" = just the verb.',
        skill: 'grammar-conciseness'
      }
    ],
    timeEstimate: 110
  }
]
