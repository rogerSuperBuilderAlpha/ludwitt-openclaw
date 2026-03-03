/**
 * Greek Grammar Exercises - Index
 * 
 * Exports all Greek grammar exercise collections
 */

// Basic grammar exercises
export { GREEK_GRAMMAR_BASICS, type GreekGrammarExercise } from './basics-expanded'

// Advanced verb system exercises
export { VERB_SYSTEM_GREEK } from './verb-system'

// Combined collection of all grammar exercises
import { GREEK_GRAMMAR_BASICS } from './basics-expanded'
import { VERB_SYSTEM_GREEK } from './verb-system'

export const ALL_GREEK_GRAMMAR: (typeof GREEK_GRAMMAR_BASICS[number] | typeof VERB_SYSTEM_GREEK[number])[] = [
  ...GREEK_GRAMMAR_BASICS,
  ...VERB_SYSTEM_GREEK,
]
