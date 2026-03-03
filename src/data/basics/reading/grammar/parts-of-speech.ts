import { ReadingExercise } from '@/lib/types/basics'

// Topics included: noun, pronoun, subject, phrase, tense, dangling

export const PARTS_OF_SPEECH_EXERCISES: ReadingExercise[] = [
  {
    id: 'grammar-g2-noun-001',
    type: 'grammar',
    difficulty: 2.0,
    passage: 'The cat sat on the mat. The dog ran in the yard. The bird flew to the tree.',
    lexileScore: 300,
    questions: [
      {
        id: 'q1',
        question: 'Which words are nouns in the first sentence?',
        type: 'short-answer',
        correctAnswer: 'cat, mat',
        explanation: 'Nouns are people, places, or things. Cat and mat are both things.',
        skill: 'grammar-parts-of-speech'
      },
      {
        id: 'q2',
        question: 'What is the verb in "The dog ran in the yard"?',
        type: 'short-answer',
        correctAnswer: 'ran',
        explanation: 'The verb is the action word. "Ran" shows what the dog did.',
        skill: 'grammar-parts-of-speech'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g2-noun-002',
    type: 'grammar',
    difficulty: 2.0,
    passage: 'My mom made a cake. Dad ate three slices. The kids wanted more.',
    lexileScore: 280,
    questions: [
      {
        id: 'q1',
        question: 'Find the noun that is a person in the first sentence.',
        type: 'short-answer',
        correctAnswer: 'mom',
        explanation: 'Mom is a person. Cake is a thing, made is a verb.',
        skill: 'grammar-parts-of-speech'
      }
    ],
    timeEstimate: 80
  },
  {
    id: 'grammar-g3-pronoun-001',
    type: 'grammar',
    difficulty: 3.0,
    passage: 'Sarah loves her cat. She feeds it every morning. The cat follows her everywhere.',
    lexileScore: 350,
    questions: [
      {
        id: 'q1',
        question: 'In "She feeds it every morning," what does "it" refer to?',
        type: 'short-answer',
        correctAnswer: 'the cat',
        explanation: 'The pronoun "it" replaces "the cat" from the previous sentence.',
        skill: 'grammar-pronouns'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g3-pronoun-002',
    type: 'grammar',
    difficulty: 3.0,
    passage: 'Tom and Jake are friends. They play soccer together. Jake passes the ball to him.',
    lexileScore: 360,
    questions: [
      {
        id: 'q1',
        question: 'Who does "him" refer to in the last sentence?',
        type: 'short-answer',
        correctAnswer: 'Tom',
        explanation: 'Jake is the subject doing the passing, so "him" refers to Tom.',
        skill: 'grammar-pronouns'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g4-subject-verb-001',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'The students study hard for their tests. Each student wants to do well. The teacher helps them prepare.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'Why does "student" take "wants" instead of "want"?',
        type: 'short-answer',
        correctAnswer: 'Because student is singular',
        explanation: 'Singular subjects take singular verbs. "Each student" is singular, so it takes "wants".',
        skill: 'grammar-subject-verb-agreement'
      },
      {
        id: 'q2',
        question: 'What is the subject of "The teacher helps them prepare"?',
        type: 'short-answer',
        correctAnswer: 'The teacher',
        explanation: 'The subject is who or what the sentence is about - the teacher.',
        skill: 'grammar-sentence-structure'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'grammar-g4-subject-002',
    type: 'grammar',
    difficulty: 4.0,
    passage: 'My brother and I went to the store. We bought some milk.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'What is the complete subject in the first sentence?',
        type: 'short-answer',
        correctAnswer: 'My brother and I',
        explanation: 'The complete subject includes all words that tell who or what the sentence is about.',
        skill: 'grammar-sentence-structure'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'grammar-g6-phrase-001',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'Running through the park, she felt free. The boy with the red hat waved.',
    lexileScore: 610,
    questions: [
      {
        id: 'q1',
        question: 'What is "Running through the park"?',
        type: 'short-answer',
        correctAnswer: 'A participial phrase',
        explanation: 'A participial phrase starts with a verb form (-ing or -ed) and acts as an adjective.',
        skill: 'grammar-phrases'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g6-phrase-002',
    type: 'grammar',
    difficulty: 6.0,
    passage: 'To win the game was her goal. She practiced every day to improve.',
    lexileScore: 580,
    questions: [
      {
        id: 'q1',
        question: 'What is "To win the game"?',
        type: 'short-answer',
        correctAnswer: 'An infinitive phrase',
        explanation: 'An infinitive phrase begins with "to" + a verb and can act as a noun, adjective, or adverb.',
        skill: 'grammar-phrases'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-tense-001',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'Yesterday, I walked to school. Today, I walk to school. Tomorrow, I will walk to school.',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'Identify the verb tense in each sentence.',
        type: 'short-answer',
        correctAnswer: 'walked = past, walk = present, will walk = future',
        explanation: 'Walked is past tense, walk is present, will walk is future.',
        skill: 'grammar-verb-tenses'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'grammar-g5-tense-002',
    type: 'grammar',
    difficulty: 5.0,
    passage: 'She eats breakfast at 7am. She ate dinner at 6pm. She will eat lunch at noon.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'Which sentence is in past tense?',
        type: 'short-answer',
        correctAnswer: 'She ate dinner at 6pm',
        explanation: 'Ate is the past tense of eat.',
        skill: 'grammar-verb-tenses'
      }
    ],
    timeEstimate: 80
  },
  {
    id: 'grammar-g8-dangling-001',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'Walking through the park, the flowers were beautiful.',
    lexileScore: 760,
    questions: [
      {
        id: 'q1',
        question: 'What is wrong with this sentence?',
        type: 'short-answer',
        correctAnswer: 'Dangling modifier',
        explanation: 'The modifier "Walking through the park" should describe a person, not flowers.',
        skill: 'grammar-modifiers'
      }
    ],
    timeEstimate: 110
  },
  {
    id: 'grammar-g8-dangling-002',
    type: 'grammar',
    difficulty: 8.0,
    passage: 'Having finished dinner, the dishes were washed.',
    lexileScore: 780,
    questions: [
      {
        id: 'q1',
        question: 'How should this sentence be corrected?',
        type: 'short-answer',
        correctAnswer: 'Having finished dinner, we washed the dishes. (add a subject)',
        explanation: 'The opening phrase needs a logical subject to modify.',
        skill: 'grammar-modifiers'
      }
    ],
    timeEstimate: 120
  }
]
