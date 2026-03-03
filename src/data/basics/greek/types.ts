/**
 * Greek-specific type definitions
 */

import { VocabularyEntry as BaseVocabularyEntry } from '../latin/types'

// Greek-specific vocabulary entry extends the base
export interface GreekVocabularyEntry extends BaseVocabularyEntry {
  transliteration: string          // Romanized form
  accentuation?: string            // Accent pattern notes
  dialectForms?: {
    dialect: 'attic' | 'ionic' | 'doric' | 'homeric'
    form: string
  }[]
}

// Re-export base types
export type { ProficiencyLevel } from '../latin/types'
export { PROFICIENCY_LEVEL_GRADES, GRADE_TO_PROFICIENCY } from '../latin/types'

// Greek-specific constants
export const GREEK_ALPHABET = [
  { letter: 'Α', lowercase: 'α', name: 'alpha', romanization: 'a' },
  { letter: 'Β', lowercase: 'β', name: 'beta', romanization: 'b' },
  { letter: 'Γ', lowercase: 'γ', name: 'gamma', romanization: 'g' },
  { letter: 'Δ', lowercase: 'δ', name: 'delta', romanization: 'd' },
  { letter: 'Ε', lowercase: 'ε', name: 'epsilon', romanization: 'e' },
  { letter: 'Ζ', lowercase: 'ζ', name: 'zeta', romanization: 'z' },
  { letter: 'Η', lowercase: 'η', name: 'eta', romanization: 'ē' },
  { letter: 'Θ', lowercase: 'θ', name: 'theta', romanization: 'th' },
  { letter: 'Ι', lowercase: 'ι', name: 'iota', romanization: 'i' },
  { letter: 'Κ', lowercase: 'κ', name: 'kappa', romanization: 'k' },
  { letter: 'Λ', lowercase: 'λ', name: 'lambda', romanization: 'l' },
  { letter: 'Μ', lowercase: 'μ', name: 'mu', romanization: 'm' },
  { letter: 'Ν', lowercase: 'ν', name: 'nu', romanization: 'n' },
  { letter: 'Ξ', lowercase: 'ξ', name: 'xi', romanization: 'x' },
  { letter: 'Ο', lowercase: 'ο', name: 'omicron', romanization: 'o' },
  { letter: 'Π', lowercase: 'π', name: 'pi', romanization: 'p' },
  { letter: 'Ρ', lowercase: 'ρ', name: 'rho', romanization: 'r' },
  { letter: 'Σ', lowercase: 'σ/ς', name: 'sigma', romanization: 's' },
  { letter: 'Τ', lowercase: 'τ', name: 'tau', romanization: 't' },
  { letter: 'Υ', lowercase: 'υ', name: 'upsilon', romanization: 'u/y' },
  { letter: 'Φ', lowercase: 'φ', name: 'phi', romanization: 'ph' },
  { letter: 'Χ', lowercase: 'χ', name: 'chi', romanization: 'ch' },
  { letter: 'Ψ', lowercase: 'ψ', name: 'psi', romanization: 'ps' },
  { letter: 'Ω', lowercase: 'ω', name: 'omega', romanization: 'ō' },
]

export const BREATHING_MARKS = {
  smooth: { symbol: '᾿', name: 'smooth breathing (psili)', effect: 'no initial h sound' },
  rough: { symbol: '῾', name: 'rough breathing (dasia)', effect: 'initial h sound' }
}

export const ACCENT_MARKS = {
  acute: { symbol: '´', name: 'acute (oxia)', position: 'on last 3 syllables' },
  grave: { symbol: '`', name: 'grave (varia)', position: 'replaces acute on final syllable' },
  circumflex: { symbol: '῀', name: 'circumflex (perispomeni)', position: 'on long vowels' }
}

