/**
 * Generation Utilities
 * 
 * Helper functions for problem/exercise generation
 */

import { MathProblemType, ReadingExerciseType, ClassicalLanguage } from '@/lib/types/basics'
import { LogicProblemType } from '@/data/basics/logic/types'

/**
 * Generate a unique ID for problems/exercises
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Select appropriate math problem type based on difficulty
 */
export function selectMathType(difficulty: number): MathProblemType {
  if (difficulty < 4) return 'arithmetic'
  if (difficulty < 7) return 'pre-algebra'
  if (difficulty < 10) return 'algebra'
  if (difficulty < 11) return 'geometry'
  return 'algebra' // Advanced algebra for 11-12
}

/**
 * Select appropriate reading exercise type based on difficulty
 */
export function selectReadingType(difficulty: number): ReadingExerciseType {
  if (difficulty < 4) return 'vocabulary'
  if (difficulty < 7) return 'comprehension'
  if (difficulty < 10) return 'grammar'
  return 'critical-analysis'
}

/**
 * Get appropriate passage length for grade level
 */
export function getPassageLengthForGrade(grade: number): string {
  if (grade <= 3) return '100-150'
  if (grade <= 6) return '200-300'
  if (grade <= 9) return '300-500'
  return '500-700'
}

/**
 * Estimate time for math problem based on difficulty
 */
export function estimateTimeForDifficulty(difficulty: number): number {
  return Math.round(30 + (difficulty * 10)) // 40s for grade 1, 150s for grade 12
}

/**
 * Estimate reading time based on passage and questions
 */
export function estimateReadingTime(passage: string, questionCount: number): number {
  const words = passage.split(/\s+/).length
  const readingTime = (words / 200) * 60 // 200 words per minute
  const questionTime = questionCount * 30 // 30 seconds per question
  return Math.round(readingTime + questionTime)
}

/**
 * Parse JSON from API response, stripping markdown code blocks if present
 */
export function parseJsonResponse(text: string): unknown {
  let jsonText = text.trim()
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }
  return JSON.parse(jsonText)
}

// ============================================================================
// Classical Language Helpers
// ============================================================================

interface GrammarTopic {
  topic: string
  description: string
}

const LATIN_TOPICS: Record<number, GrammarTopic> = {
  1: { topic: 'Present Tense', description: 'Simple present tense verbs, nominative case, 1st conjugation' },
  2: { topic: 'Accusative Case', description: 'Direct objects, transitive verbs, 2nd conjugation' },
  3: { topic: 'Genitive and Dative', description: 'Possession, indirect objects, 3rd declension' },
  4: { topic: 'Adjective Agreement', description: 'Comparatives, superlatives, conjunctions, compound sentences' },
  5: { topic: 'All Tenses', description: 'Imperfect, future, perfect, pluperfect, passive voice' },
  6: { topic: 'Participles', description: 'Present, perfect, future participles, ablative absolute, relative clauses' },
  7: { topic: 'Subjunctive Mood', description: 'Purpose clauses, result clauses, indirect questions' },
  8: { topic: 'Indirect Discourse', description: 'Accusative + infinitive, conditional sentences' },
  9: { topic: 'Literary Prose', description: 'Caesar-style military narrative, extended sentences' },
  10: { topic: 'Ciceronian Style', description: 'Periodic sentences, philosophical vocabulary' },
  11: { topic: 'Elegiac Poetry', description: 'Ovid-style verse, poetic word order, meter' },
  12: { topic: 'Epic Poetry', description: 'Virgilian hexameter, epic conventions' }
}

const GREEK_TOPICS: Record<number, GrammarTopic> = {
  1: { topic: 'Present Tense', description: 'Definite articles, basic verbs, nominative case' },
  2: { topic: 'Accusative Case', description: 'Direct objects, 1st/2nd declension, contract verbs' },
  3: { topic: 'All Cases', description: 'Genitive, dative, prepositions, 3rd declension' },
  4: { topic: 'Adjective Agreement', description: 'Comparatives, contract verbs (-εω, -αω, -οω), particles' },
  5: { topic: 'All Tenses', description: 'Aorist, imperfect, perfect, middle/passive voice' },
  6: { topic: 'Participles', description: 'Present, aorist, perfect participles, genitive absolute' },
  7: { topic: 'Subjunctive/Optative', description: 'Purpose clauses, conditional sentences' },
  8: { topic: 'Indirect Discourse', description: 'Infinitive constructions, ὅτι/ὡς clauses' },
  9: { topic: 'Attic Prose', description: 'Xenophon-style historical narrative' },
  10: { topic: 'Platonic Prose', description: 'Philosophical dialogue, complex arguments' },
  11: { topic: 'Tragic Poetry', description: 'Iambic trimeter, choral meters, Doric forms' },
  12: { topic: 'Homeric Greek', description: 'Epic dialect, hexameter, Homeric formulas' }
}

/**
 * Get grammar topic appropriate for the grade level
 */
export function getGrammarTopicForGrade(language: ClassicalLanguage, grade: number): GrammarTopic {
  const topics = language === 'latin' ? LATIN_TOPICS : GREEK_TOPICS
  return topics[Math.min(Math.max(1, Math.floor(grade)), 12)]
}

// ============================================================================
// Logic Problem Helpers
// ============================================================================

/**
 * Get relevant symbols for a logic unit
 */
export function getLogicSymbolsForUnit(unitId: number): string[] {
  const unitSymbolMap: Record<number, string[]> = {
    1: ['⊢', '⊨'],
    2: ['¬', '∧', '∨', '→', '↔'],
    3: ['¬', '∧', '∨', '→', '↔', '≡', '⊥', '⊤'],
    4: ['¬', '∧', '∨', '→', '↔', '⊢'],
    5: ['∀', '∃', '∃!', '¬', '∧', '∨', '→'],
    6: ['∀', '∃', '∃!', '⊢', '¬', '∧', '∨', '→'],
    7: ['∈', '∉', '⊆', '∩', '∪', '∅'],
    8: ['□', '◇', '¬', '∧', '∨', '→'],
    9: ['G', 'F', 'X', 'U', '¬', '∧', '∨'],
    10: ['K', 'B', '¬', '∧', '∨', '→'],
    11: ['O', 'P', 'F', '¬', '∧', '∨', '→'],
    12: ['¬', '∧', '∨', '→'],
    13: ['¬', '∧', '∨', '→', '⊢'],
    14: ['¬', '∧', '∨', '→', '⊥'],
    15: ['∀', '∃', '∃!', '⊢', '⊨'],
    16: ['⊢', '⊨', '≡', '⊥', '⊤'],
    17: ['⊢', '⊨', '≡'],
    18: ['∀', '∃', '→', '∧', '∨', '□', '◇'],
  }
  return unitSymbolMap[unitId] || ['¬', '∧', '∨', '→']
}

/**
 * Get problem types appropriate for a logic unit
 */
export function getLogicProblemTypesForUnit(unitId: number): LogicProblemType[] {
  const unitTypesMap: Record<number, LogicProblemType[]> = {
    1: ['multiple-choice', 'free-response'],
    2: ['multiple-choice', 'translation', 'free-response'],
    3: ['truth-table', 'equivalence', 'multiple-choice'],
    4: ['proof', 'multiple-choice', 'free-response'],
    5: ['translation', 'multiple-choice', 'free-response'],
    6: ['proof', 'multiple-choice', 'free-response'],
    7: ['multiple-choice', 'free-response', 'proof'],
    8: ['model', 'validity', 'multiple-choice', 'translation'],
    9: ['model', 'validity', 'multiple-choice', 'translation'],
    10: ['model', 'validity', 'multiple-choice', 'translation'],
    11: ['translation', 'validity', 'multiple-choice'],
    12: ['truth-table', 'multiple-choice', 'free-response'],
    13: ['proof', 'multiple-choice', 'free-response'],
    14: ['validity', 'multiple-choice', 'free-response'],
    15: ['translation', 'multiple-choice', 'free-response'],
    16: ['proof', 'multiple-choice', 'free-response'],
    17: ['multiple-choice', 'free-response'],
    18: ['multiple-choice', 'translation', 'free-response'],
  }
  return unitTypesMap[unitId] || ['multiple-choice', 'free-response']
}




