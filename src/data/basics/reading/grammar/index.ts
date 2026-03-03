import { ReadingExercise } from '@/lib/types/basics'

import { PARTS_OF_SPEECH_EXERCISES } from './parts-of-speech'
import { MISC_EXERCISES } from './misc'
import { SENTENCE_STRUCTURE_EXERCISES } from './sentence-structure'
import { SPELLING_PUNCTUATION_EXERCISES } from './spelling-punctuation'
import { WRITING_STYLE_EXERCISES } from './writing-style'

export const GRAMMAR_EXERCISES: ReadingExercise[] = [
  ...PARTS_OF_SPEECH_EXERCISES,
  ...MISC_EXERCISES,
  ...SENTENCE_STRUCTURE_EXERCISES,
  ...SPELLING_PUNCTUATION_EXERCISES,
  ...WRITING_STYLE_EXERCISES,
]

// Re-export individual arrays
export { PARTS_OF_SPEECH_EXERCISES } from './parts-of-speech'
export { MISC_EXERCISES } from './misc'
export { SENTENCE_STRUCTURE_EXERCISES } from './sentence-structure'
export { SPELLING_PUNCTUATION_EXERCISES } from './spelling-punctuation'
export { WRITING_STYLE_EXERCISES } from './writing-style'
