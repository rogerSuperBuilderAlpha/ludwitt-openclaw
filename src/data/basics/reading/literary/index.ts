export * from './poetry'
export * from './prose'

import { POETRY_ANALYSIS } from './poetry'
import { PROSE_ANALYSIS } from './prose'

export const LITERARY_ANALYSIS = [
  ...POETRY_ANALYSIS,
  ...PROSE_ANALYSIS,
]
