import { ReadingExercise } from '@/lib/types/basics'

export const ELEMENTARY_VOCAB: ReadingExercise[] = [
  {
    id: 'vocab-g3-context-001',
    type: 'vocabulary',
    difficulty: 3.0,
    passage: 'The enormous elephant walked slowly through the jungle. Its massive feet made deep prints in the soft mud. The other animals watched in awe as the giant creature passed by.',
    lexileScore: 450,
    questions: [
      {
        id: 'q1',
        question: 'What does "enormous" mean in this passage?',
        type: 'short-answer',
        correctAnswer: 'Very large',
        explanation: 'Context clues like "massive" and "giant" help us understand enormous means very large.',
        skill: 'vocabulary-context'
      },
      {
        id: 'q2',
        question: 'Which word is a synonym for "enormous" in the passage?',
        type: 'short-answer',
        correctAnswer: 'massive',
        explanation: 'Massive is used to describe the same elephant and means very large.',
        skill: 'vocabulary-synonyms'
      }
    ],
    timeEstimate: 120
  },
  {
    id: 'vocab-g3-context-002',
    type: 'vocabulary',
    difficulty: 3.0,
    passage: 'The puppy was very timid. It hid behind the couch when visitors came and trembled during thunderstorms. Unlike its bold sister who greeted everyone, this shy little dog preferred to stay hidden.',
    lexileScore: 420,
    questions: [
      {
        id: 'q1',
        question: 'What does "timid" mean?',
        type: 'short-answer',
        correctAnswer: 'Shy and fearful',
        explanation: 'Context clues like "hid," "trembled," and "shy" tell us timid means fearful.',
        skill: 'vocabulary-context'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g3-context-003',
    type: 'vocabulary',
    difficulty: 3.5,
    passage: 'The parched ground cracked in the summer heat. No rain had fallen for weeks, and the flowers drooped from thirst. The farmer worried about his dry, dusty fields.',
    lexileScore: 480,
    questions: [
      {
        id: 'q1',
        question: 'What does "parched" mean?',
        type: 'short-answer',
        correctAnswer: 'Very dry',
        explanation: 'Words like "no rain," "thirst," and "dry, dusty" show parched means very dry.',
        skill: 'vocabulary-context'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g4-context-004',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'Maya was elated when she won first place in the spelling bee. She jumped up and down, hugged her parents, and could not stop smiling. It was the happiest day of her life.',
    lexileScore: 510,
    questions: [
      {
        id: 'q1',
        question: 'What does "elated" mean?',
        type: 'short-answer',
        correctAnswer: 'Extremely happy',
        explanation: 'Jumping, hugging, smiling, and "happiest day" show elated means extremely happy.',
        skill: 'vocabulary-context'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g4-context-005',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'The ancient castle was dilapidated. Its walls were crumbling, the roof had holes, and weeds grew through the broken floor. Once grand, it was now in ruins.',
    lexileScore: 530,
    questions: [
      {
        id: 'q1',
        question: 'What does "dilapidated" mean?',
        type: 'short-answer',
        correctAnswer: 'Falling apart',
        explanation: 'Crumbling walls, holes, and "ruins" show dilapidated means in poor condition.',
        skill: 'vocabulary-context'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g4-context-006',
    type: 'vocabulary',
    difficulty: 4.5,
    passage: 'The chef was frugal with ingredients, using every scrap. She saved vegetable peels for broth and turned stale bread into croutons. Nothing was wasted in her kitchen.',
    lexileScore: 550,
    questions: [
      {
        id: 'q1',
        question: 'What does "frugal" mean?',
        type: 'short-answer',
        correctAnswer: 'Careful not to waste',
        explanation: 'Using every scrap and wasting nothing shows frugal means careful with resources.',
        skill: 'vocabulary-context'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g4-prefix-001',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'Sarah was unhappy with her test score, so she decided to retake the exam. She spent the afternoon rereading her notes and reviewing the material. Her teacher agreed to let her rewrite the test next week.',
    lexileScore: 520,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "re-" mean in words like "retake" and "reread"?',
        type: 'short-answer',
        correctAnswer: 'Again',
        explanation: 'The prefix "re-" means again, as in doing something over.',
        skill: 'vocabulary-prefixes'
      },
      {
        id: 'q2',
        question: 'What does "unhappy" mean?',
        type: 'true-false',
        correctAnswer: 'not happy',
        explanation: 'The prefix "un-" means not, so unhappy means not happy.',
        skill: 'vocabulary-prefixes'
      }
    ],
    timeEstimate: 130
  },
  {
    id: 'vocab-g4-prefix-002',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'The magician made the rabbit disappear from the hat. It was impossible to see where it went. The audience was displeased when he would not reveal the trick.',
    lexileScore: 500,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "dis-" mean in "disappear" and "displeased"?',
        type: 'short-answer',
        correctAnswer: 'Not or opposite',
        explanation: 'Dis- means not or the opposite: disappear = not appear, displeased = not pleased.',
        skill: 'vocabulary-prefixes'
      }
    ],
    timeEstimate: 100
  },
  {
    id: 'vocab-g4-prefix-003',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'Before the game, the players did pregame warmups. The coach gave a preview of their strategy during the prematch meeting. Being prepared was essential.',
    lexileScore: 520,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "pre-" mean?',
        type: 'short-answer',
        correctAnswer: 'Before',
        explanation: 'Pre- means before: pregame = before the game, preview = see before, prematch = before the match.',
        skill: 'vocabulary-prefixes'
      }
    ],
    timeEstimate: 90
  },
  {
    id: 'vocab-g4-prefix-004',
    type: 'vocabulary',
    difficulty: 4.0,
    passage: 'The submarine went underwater for the mission. The subway train traveled underground through the city. Both vehicles operated below the surface.',
    lexileScore: 510,
    questions: [
      {
        id: 'q1',
        question: 'What does the prefix "sub-" mean?',
        type: 'short-answer',
        correctAnswer: 'Under or below',
        explanation: 'Sub- means under: submarine = under the sea, subway = under the way/road.',
        skill: 'vocabulary-prefixes'
      }
    ],
    timeEstimate: 90
  }
]
