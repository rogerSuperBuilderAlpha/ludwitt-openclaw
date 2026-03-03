import { ReadingExercise } from '@/lib/types/basics'

import { ELEMENTARY_VOCAB } from './elementary'
import { MIDDLE_1_VOCAB } from './middle-1'
import { MIDDLE_2_VOCAB } from './middle-2'
import { HIGH_1_VOCAB } from './high-1'
import { HIGH_2_VOCAB } from './high-2'
import { ACADEMIC_VOCAB } from './academic'
import { ROOT_WORDS_VOCAB } from './roots'

export const VOCABULARY_EXERCISES: ReadingExercise[] = [
  ...ELEMENTARY_VOCAB,
  ...MIDDLE_1_VOCAB,
  ...MIDDLE_2_VOCAB,
  ...HIGH_1_VOCAB,
  ...HIGH_2_VOCAB,
  ...ACADEMIC_VOCAB,
  ...ROOT_WORDS_VOCAB,
]

// Re-export individual arrays
export { ELEMENTARY_VOCAB } from './elementary'
export { MIDDLE_1_VOCAB } from './middle-1'
export { MIDDLE_2_VOCAB } from './middle-2'
export { HIGH_1_VOCAB } from './high-1'
export { HIGH_2_VOCAB } from './high-2'
export { ACADEMIC_VOCAB } from './academic'
export { ROOT_WORDS_VOCAB } from './roots'