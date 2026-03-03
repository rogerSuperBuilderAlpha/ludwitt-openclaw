import { ReadingExercise } from '@/lib/types/basics'

import { BIOLOGY_READING } from './biology'
import { PHYSICS_READING } from './physics'
import { ENGINEERING_READING } from './engineering'
import { ENGINEERING_READING_EXPANDED } from './engineering-expanded'
import { CHEMISTRY_READING } from './chemistry'
import { MATH_READING } from './math'
import { EARTH_SCIENCE_READING } from './earth-science'
import { TECHNOLOGY_READING } from './technology'
import { ASTRONOMY_READING } from './astronomy'
import { MISC_READING } from './misc'
import { MEDICINE_READING } from './medicine'

export const STEM_READING: ReadingExercise[] = [
  ...BIOLOGY_READING,
  ...PHYSICS_READING,
  ...ENGINEERING_READING,
  ...ENGINEERING_READING_EXPANDED,
  ...CHEMISTRY_READING,
  ...MATH_READING,
  ...EARTH_SCIENCE_READING,
  ...TECHNOLOGY_READING,
  ...ASTRONOMY_READING,
  ...MISC_READING,
  ...MEDICINE_READING,
]

// Re-export individual arrays
export { BIOLOGY_READING } from './biology'
export { PHYSICS_READING } from './physics'
export { ENGINEERING_READING } from './engineering'
export { ENGINEERING_READING_EXPANDED } from './engineering-expanded'
export { CHEMISTRY_READING } from './chemistry'
export { MATH_READING } from './math'
export { EARTH_SCIENCE_READING } from './earth-science'
export { TECHNOLOGY_READING } from './technology'
export { ASTRONOMY_READING } from './astronomy'
export { MISC_READING } from './misc'
export { MEDICINE_READING } from './medicine'