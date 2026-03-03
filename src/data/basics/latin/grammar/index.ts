/**
 * Latin Grammar Exercises - Index
 * 
 * Exports all grammar practice exercises for Latin.
 */

export { LATIN_DECLENSION_PRACTICE, type LatinGrammarExercise } from './declensions-practice'
export {
  LATIN_CONJUGATION_PRACTICE,
  type LatinConjugationExercise,
  getConjugationExercisesByDifficulty,
  getConjugationExercisesByType,
  getRandomConjugationExercise
} from './conjugations-practice'
export {
  ADVANCED_GRAMMAR_LATIN,
  type LatinAdvancedGrammarExercise,
  getAdvancedGrammarByDifficulty,
  getAdvancedGrammarByConcept,
  getRandomAdvancedGrammarExercise
} from './advanced-grammar'