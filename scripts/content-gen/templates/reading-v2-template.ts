/**
 * Reading V2 Exercise Template
 * 
 * Use this template when generating new reading comprehension,
 * vocabulary, grammar, and literary analysis content.
 */

import { ReadingExercise } from '@/lib/types/basics'

// =============================================================================
// COMPREHENSION EXERCISE TEMPLATE
// =============================================================================

export const COMPREHENSION_TEMPLATE: ReadingExercise = {
  // Unique identifier: read-g{grade}-{topic}-{number:3}
  id: 'read-g7-history-001',
  
  // Exercise type
  type: 'comprehension',
  
  // Difficulty matches grade level (1.0-12.0)
  difficulty: 7.0,
  
  // The reading passage (100-500 words depending on grade)
  passage: `The Industrial Revolution began in Britain in the late 18th century, 
transforming society from an agricultural economy to one dominated by industry 
and manufacturing. Factories sprang up across the landscape, drawing workers 
from rural areas to growing cities.

The textile industry led the way, with inventions like the spinning jenny and 
water frame dramatically increasing cloth production. Steam engines, perfected 
by James Watt, powered not only factories but also new forms of transportation. 
Railways connected cities, enabling faster movement of goods and people than 
ever before.

While the Industrial Revolution brought economic growth and technological 
advancement, it also created significant social problems. Workers, including 
children, faced long hours, dangerous conditions, and low pay. Cities grew 
rapidly without adequate housing, sanitation, or clean water. Over time, 
reformers pushed for laws to protect workers and improve living conditions, 
slowly addressing these challenges.`,
  
  // Lexile score for appropriate matching
  lexileScore: 950,
  
  // 2-4 questions per passage
  questions: [
    {
      id: 'q1',
      question: 'What industry was at the forefront of the Industrial Revolution?',
      type: 'short-answer',
      correctAnswer: 'The textile industry',
      explanation: 'The passage states that "The textile industry led the way."',
      skill: 'detail' // 'detail' | 'main-idea' | 'inference' | 'cause-effect' | 'vocabulary' | 'author-purpose'
    },
    {
      id: 'q2',
      question: 'What were TWO negative effects of rapid industrialization mentioned in the passage?',
      type: 'short-answer',
      correctAnswer: 'Long work hours and dangerous conditions (or similar: low pay, child labor, poor housing, lack of sanitation)',
      explanation: 'The passage mentions workers faced long hours, dangerous conditions, low pay, and cities lacked adequate housing and sanitation.',
      skill: 'detail'
    },
    {
      id: 'q3',
      question: 'Why did workers move from rural areas to cities?',
      type: 'short-answer',
      correctAnswer: 'To work in the factories',
      explanation: 'The passage explains that factories "drew workers from rural areas to growing cities."',
      skill: 'cause-effect'
    },
    {
      id: 'q4',
      question: 'Based on the passage, how did society eventually address the problems of industrialization?',
      type: 'short-answer',
      correctAnswer: 'Reformers pushed for laws to protect workers and improve living conditions.',
      explanation: 'The final sentence describes how reformers advocated for protective legislation.',
      skill: 'inference'
    }
  ],
  
  // Estimated time in seconds
  timeEstimate: 300
}

// =============================================================================
// VOCABULARY EXERCISE TEMPLATE
// =============================================================================

export interface VocabularyExercise extends ReadingExercise {
  vocabulary: {
    word: string
    definition: string
    partOfSpeech: string
    contextSentence: string
    etymology?: string
    synonyms?: string[]
    antonyms?: string[]
  }[]
}

export const VOCABULARY_TEMPLATE: VocabularyExercise = {
  id: 'vocab-g8-academic-001',
  type: 'vocabulary',
  difficulty: 8.0,
  
  // Context passage using the vocabulary words
  passage: `The scientist's hypothesis was met with considerable skepticism by her 
colleagues. However, after conducting rigorous experiments and analyzing the 
empirical data, she was able to substantiate her claims. The evidence was so 
compelling that even her harshest critics had to concede that her theory had merit.`,
  
  lexileScore: 1000,
  
  questions: [
    {
      id: 'q1',
      question: 'Based on context, what does "skepticism" most likely mean?',
      type: 'short-answer',
      correctAnswer: 'Doubt or disbelief',
      explanation: 'The passage implies her colleagues did not initially believe her hypothesis.',
      skill: 'vocabulary'
    },
    {
      id: 'q2',
      question: 'What does it mean to "substantiate" a claim?',
      type: 'short-answer',
      correctAnswer: 'To provide evidence or proof for it',
      explanation: 'The scientist substantiated her claims through experiments and data.',
      skill: 'vocabulary'
    },
    {
      id: 'q3',
      question: 'What does "concede" mean in this context?',
      type: 'short-answer',
      correctAnswer: 'To admit or acknowledge something reluctantly',
      explanation: 'The critics reluctantly acknowledged her theory had merit.',
      skill: 'vocabulary'
    }
  ],
  
  // Vocabulary definitions
  vocabulary: [
    {
      word: 'hypothesis',
      definition: 'A proposed explanation made on the basis of limited evidence as a starting point for further investigation',
      partOfSpeech: 'noun',
      contextSentence: "The scientist's hypothesis was met with considerable skepticism.",
      etymology: 'Greek: hypo (under) + thesis (placing)',
      synonyms: ['theory', 'assumption', 'premise'],
      antonyms: ['fact', 'certainty', 'proof']
    },
    {
      word: 'skepticism',
      definition: 'A doubtful attitude or questioning approach',
      partOfSpeech: 'noun',
      contextSentence: 'Her colleagues viewed the unusual claim with skepticism.',
      etymology: 'Greek: skeptikos (inquiring, reflective)',
      synonyms: ['doubt', 'disbelief', 'suspicion'],
      antonyms: ['belief', 'faith', 'trust']
    },
    {
      word: 'empirical',
      definition: 'Based on observation or experience rather than theory or pure logic',
      partOfSpeech: 'adjective',
      contextSentence: 'The empirical data supported her conclusions.',
      etymology: 'Greek: empeiria (experience)',
      synonyms: ['observational', 'experimental', 'factual'],
      antonyms: ['theoretical', 'hypothetical', 'speculative']
    },
    {
      word: 'substantiate',
      definition: 'To provide evidence to support or prove the truth of something',
      partOfSpeech: 'verb',
      contextSentence: 'She was able to substantiate her claims with solid evidence.',
      etymology: 'Latin: substantia (substance, essence)',
      synonyms: ['verify', 'confirm', 'validate'],
      antonyms: ['disprove', 'refute', 'contradict']
    },
    {
      word: 'concede',
      definition: 'To admit that something is true or valid after first denying or resisting it',
      partOfSpeech: 'verb',
      contextSentence: 'Even her critics had to concede that her theory had merit.',
      etymology: 'Latin: concedere (to give way, yield)',
      synonyms: ['admit', 'acknowledge', 'accept'],
      antonyms: ['deny', 'dispute', 'reject']
    }
  ],
  
  timeEstimate: 360
}

// =============================================================================
// LITERARY ANALYSIS TEMPLATE
// =============================================================================

export interface LiteraryExercise extends ReadingExercise {
  literaryElements: {
    element: string
    example: string
    explanation: string
  }[]
  genre: string
  author?: string
  title?: string
}

export const LITERARY_TEMPLATE: LiteraryExercise = {
  id: 'lit-g9-poetry-001',
  type: 'comprehension', // Literary analysis uses comprehension type
  difficulty: 9.0,
  
  passage: `The Road Not Taken
by Robert Frost

Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,

And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
  
  lexileScore: 1050,
  
  questions: [
    {
      id: 'q1',
      question: 'What literary device is used in "Two roads diverged in a yellow wood"?',
      type: 'short-answer',
      correctAnswer: 'Metaphor (or extended metaphor/allegory)',
      explanation: 'The roads represent life choices; the poem is an extended metaphor for decision-making.',
      skill: 'inference'
    },
    {
      id: 'q2',
      question: 'What is ironic about the speaker\'s claim that he took "the one less traveled by"?',
      type: 'short-answer',
      correctAnswer: 'Earlier in the poem, the speaker says both roads were worn "really about the same" and were equally untraveled that morning.',
      explanation: 'The speaker contradicts his own observation that the paths were equally worn.',
      skill: 'inference'
    },
    {
      id: 'q3',
      question: 'What is the tone of the phrase "I shall be telling this with a sigh"?',
      type: 'short-answer',
      correctAnswer: 'Wistful, nostalgic, or possibly regretful',
      explanation: 'The sigh suggests looking back with mixed emotions on past choices.',
      skill: 'author-purpose'
    },
    {
      id: 'q4',
      question: 'What theme does this poem explore?',
      type: 'short-answer',
      correctAnswer: 'The nature of choice and how we construct meaning from our decisions (or: individuality, regret, self-deception)',
      explanation: 'The poem examines how we make and later interpret life choices.',
      skill: 'main-idea'
    }
  ],
  
  literaryElements: [
    {
      element: 'Extended Metaphor',
      example: 'The two roads represent life choices',
      explanation: 'The entire poem uses the journey metaphor to discuss decision-making'
    },
    {
      element: 'Imagery',
      example: '"yellow wood," "grassy and wanted wear," "leaves no step had trodden black"',
      explanation: 'Visual imagery creates the scene and mood'
    },
    {
      element: 'Irony',
      example: 'Claiming the road was "less traveled" when both were equal',
      explanation: 'Suggests how we construct narratives about our choices after the fact'
    },
    {
      element: 'Rhyme Scheme',
      example: 'ABAAB in each stanza',
      explanation: 'Creates a musical quality and sense of order'
    }
  ],
  
  genre: 'Poetry',
  author: 'Robert Frost',
  title: 'The Road Not Taken',
  
  timeEstimate: 420
}

// =============================================================================
// LEXILE SCORE GUIDELINES
// =============================================================================

/**
 * Lexile Score Ranges by Grade:
 * 
 * Grade 1: 200-400
 * Grade 2: 300-500
 * Grade 3: 400-600
 * Grade 4: 500-700
 * Grade 5: 600-800
 * Grade 6: 700-900
 * Grade 7: 800-1000
 * Grade 8: 900-1050
 * Grade 9: 950-1100
 * Grade 10: 1000-1150
 * Grade 11: 1050-1200
 * Grade 12: 1100-1300+
 */

// =============================================================================
// SKILL CATEGORIES
// =============================================================================

/**
 * Reading Skills:
 * 
 * - detail: Locating specific information stated in the text
 * - main-idea: Identifying the central theme or argument
 * - inference: Drawing conclusions from implicit information
 * - cause-effect: Understanding relationships between events
 * - vocabulary: Understanding word meanings from context
 * - author-purpose: Understanding why the author wrote something or chose certain techniques
 * - sequence: Understanding the order of events
 * - compare-contrast: Identifying similarities and differences
 * - fact-opinion: Distinguishing between facts and opinions
 * - summarize: Condensing main points
 */

// =============================================================================
// ID NAMING CONVENTIONS
// =============================================================================

/**
 * ID Format: {type}-g{grade}-{topic}-{number:3}
 * 
 * Types:
 * - read = general comprehension
 * - vocab = vocabulary
 * - gram = grammar
 * - lit = literary analysis
 * - stem = STEM reading
 * 
 * Examples:
 * - read-g5-science-001 (Reading comprehension, Grade 5, Science topic)
 * - vocab-g8-academic-015 (Vocabulary, Grade 8, Academic words)
 * - lit-g10-poetry-042 (Literary analysis, Grade 10, Poetry)
 */
