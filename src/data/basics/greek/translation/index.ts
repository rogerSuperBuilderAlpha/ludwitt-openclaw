/**
 * Greek Translation Exercises - Index
 * 
 * Exports all Greek translation exercise collections
 */

import { TranslationExercise } from '@/lib/types/basics'

// Sentence translation exercises
export { GREEK_SENTENCE_TRANSLATION, type GreekTranslationExercise } from './sentences-expanded'

// Advanced Attic prose translation exercises
export { ATTIC_PROSE_GREEK } from './attic-prose'

// Combined collection of all translation exercises
import { GREEK_SENTENCE_TRANSLATION } from './sentences-expanded'
import { ATTIC_PROSE_GREEK } from './attic-prose'

// Convert GreekTranslationExercise to TranslationExercise format for compatibility
function convertToTranslationExercise(exercise: {
  id: string
  type: 'translation'
  language: 'greek'
  difficulty: number
  direction: 'to-english' | 'to-greek'
  sourceText: string
  transliteration: string
  targetText: string
  alternativeTranslations?: string[]
  vocabularyHelp: {
    word: string
    transliteration: string
    meaning: string
    partOfSpeech?: string
  }[]
  grammarNotes: string[]
  parsing?: {
    word: string
    transliteration: string
    form: string
    function: string
  }[]
  hints: {
    level: 'gentle' | 'moderate' | 'explicit'
    text: string
  }[]
  culturalNote?: string
  source?: string
  timeEstimate: number
}): TranslationExercise {
  return {
    id: exercise.id,
    language: exercise.language,
    difficulty: exercise.difficulty,
    sourceText: exercise.sourceText,
    romanization: exercise.transliteration,
    words: exercise.vocabularyHelp.map(v => ({
      word: v.word,
      lemma: v.word,
      partOfSpeech: v.partOfSpeech || 'word',
      meaning: v.meaning,
      grammaticalInfo: '',
      functionInSentence: '',
      romanization: v.transliteration,
    })),
    grammarTopic: exercise.grammarNotes[0] || 'Translation',
    acceptableTranslations: [exercise.targetText, ...(exercise.alternativeTranslations || [])],
    parsingElements: exercise.parsing?.map(p => ({
      word: p.word,
      expectedParsing: {
        partOfSpeech: p.form,
        grammaticalFunction: p.function,
        morphology: p.form,
      },
      options: [],
    })) || [],
    timeEstimate: exercise.timeEstimate,
    sourceAuthor: exercise.source,
    historicalContext: exercise.culturalNote,
  }
}

export const CONVERTED_SENTENCE_EXERCISES: TranslationExercise[] = 
  GREEK_SENTENCE_TRANSLATION.map(convertToTranslationExercise)

export const ALL_GREEK_TRANSLATION: TranslationExercise[] = [
  ...CONVERTED_SENTENCE_EXERCISES,
  ...ATTIC_PROSE_GREEK,
]
