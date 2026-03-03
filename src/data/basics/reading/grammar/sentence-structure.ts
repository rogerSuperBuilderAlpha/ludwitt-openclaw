import { ReadingExercise } from '@/lib/types/basics'

// Topics included: fragment, runon, compound, complex, type, vary

export const SENTENCE_STRUCTURE_EXERCISES: ReadingExercise[] = [
  {
    id: 'grammar-g5-fragment-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Running through the park. The children laughed. Because it was sunny.',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'Which is a complete sentence?',
        type: 'short-answer',
        correctAnswer: 'The children laughed',
        explanation: 'A sentence needs a subject and predicate. Only "The children laughed" has both.',
        skill: 'grammar-fragments'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-fragment-002',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'After the game ended. We went home. To celebrate our victory.',
    lexileScore: 510,
    questions: [
      {
        id: 'q1',
        question: 'How can you fix "After the game ended"?',
        type: 'short-answer',
        correctAnswer: 'Attach it to the next sentence: After the game ended, we went home.',
        explanation: 'A dependent clause needs to be connected to an independent clause.',
        skill: 'grammar-fragments'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g5-runon-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'I love pizza it is my favorite food I could eat it every day.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'What is wrong with this sentence?',
        type: 'short-answer',
        correctAnswer: 'It is a run-on sentence',
        explanation: 'Three complete thoughts are joined without proper punctuation or conjunctions.',
        skill: 'grammar-run-ons'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-runon-002',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'She ran to the store she bought milk she came home.',
    lexileScore: 470,
    questions: [
      {
        id: 'q1',
        question: 'How can you fix this run-on?',
        type: 'short-answer',
        correctAnswer: 'She ran to the store. She bought milk. She came home. (or use commas and conjunctions)',
        explanation: 'Add periods between sentences or use commas with conjunctions.',
        skill: 'grammar-run-ons'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g5-compound-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'The sun was shining, and the birds were singing. I wanted to play, but I had homework.',
    lexileScore: 530,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentences are these?',
        type: 'short-answer',
        correctAnswer: 'Compound',
        explanation: 'Compound sentences join two independent clauses with a conjunction (and, but, or).',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g6-complex-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'When the bell rang, the students rushed to lunch. Because she studied hard, she passed the test.',
    lexileScore: 600,
    questions: [
      {
        id: 'q1',
        question: 'What makes these complex sentences?',
        type: 'short-answer',
        correctAnswer: 'They have dependent and independent clauses',
        explanation: 'Complex sentences combine a dependent clause with an independent clause.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g7-complex-sentences-001',
    type: 'grammar',
    difficulty: 7.0,
    passage: 'Although the weather was cold, the children played outside because they wanted fresh air. When their parents called them in, they reluctantly returned to the warm house.',
    lexileScore: 680,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentence is the first sentence?',
        type: 'short-answer',
        correctAnswer: 'Complex',
        explanation: 'It has one independent clause and dependent clauses starting with "Although" and "because".',
        skill: 'grammar-sentence-types'
      },
      {
        id: 'q2',
        question: 'What word signals a dependent clause in the second sentence?',
        type: 'short-answer',
        correctAnswer: 'When',
        explanation: 'When is a subordinating conjunction that introduces a dependent clause.',
        skill: 'grammar-dependent-clauses'
      }
    ],
    timeEstimate: 150
  },
  {
    id: 'grammar-g4-type-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'The sun is shining today.',
    lexileScore: 400,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentence is this?',
        type: 'short-answer',
        correctAnswer: 'Declarative',
        explanation: 'Declarative sentences make statements and end with periods.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 70
  },
  {
    id: 'grammar-g4-type-002',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'Are you coming to the party?',
    lexileScore: 380,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentence is this?',
        type: 'short-answer',
        correctAnswer: 'Interrogative',
        explanation: 'Interrogative sentences ask questions and end with question marks.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 70
  },
  {
    id: 'grammar-g4-type-003',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'Please close the door.',
    lexileScore: 360,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentence is this?',
        type: 'short-answer',
        correctAnswer: 'Imperative',
        explanation: 'Imperative sentences give commands or make requests.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 70
  },
  {
    id: 'grammar-g4-type-004',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'What an amazing sunset!',
    lexileScore: 370,
    questions: [
      {
        id: 'q1',
        question: 'What type of sentence is this?',
        type: 'short-answer',
        correctAnswer: 'Exclamatory',
        explanation: 'Exclamatory sentences express strong emotion and end with exclamation points.',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 70
  },
  {
    id: 'grammar-g5-type-005',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Sit down. Please listen carefully. Don\'t talk during the test.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'What is the understood subject in all these sentences?',
        type: 'short-answer',
        correctAnswer: 'You',
        explanation: 'Imperative sentences have an understood subject of "you."',
        skill: 'grammar-sentence-types'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g6-vary-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'The boy ran. The boy was fast. The boy won the race.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'How can these sentences be combined for better variety?',
        type: 'short-answer',
        correctAnswer: 'The fast boy ran and won the race.',
        explanation: 'Combining short, choppy sentences creates better flow and variety.',
        skill: 'grammar-sentence-variety'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g6-vary-002',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'She studied hard. She passed the test. She was happy.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'Combine these into one effective sentence.',
        type: 'short-answer',
        correctAnswer: 'Because she studied hard, she passed the test and was happy.',
        explanation: 'Use subordination and coordination to combine related ideas.',
        skill: 'grammar-sentence-variety'
      }
    ],
    timeEstimate: 110
  }
]
