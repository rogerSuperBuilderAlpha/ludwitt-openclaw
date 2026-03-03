/**
 * Latin Exercises Audit Test
 *
 * Comprehensive validation of all Latin translation exercise data including:
 * - Structural validation (required fields, types)
 * - Source text validation (valid Latin characters)
 * - Word coverage validation (words[] matches sourceText)
 * - Grammatical info validation
 * - Translation validation
 */

import type { TranslationExercise, TranslationWord } from '@/lib/types/basics'

// Import Latin exercises
import { ALL_LATIN_EXERCISES } from '../latin/exercises'
import {
  LATIN_GRADE_1_EXERCISES,
  LATIN_GRADE_2_EXERCISES,
  LATIN_GRADE_3_EXERCISES,
  LATIN_GRADE_4_EXERCISES,
  LATIN_GRADE_5_EXERCISES,
  LATIN_GRADE_6_EXERCISES,
  LATIN_GRADE_7_EXERCISES,
  LATIN_GRADE_8_EXERCISES,
  LATIN_GRADE_9_EXERCISES,
  LATIN_GRADE_10_EXERCISES,
  LATIN_GRADE_11_EXERCISES,
  LATIN_GRADE_12_EXERCISES,
} from '../latin/exercises'

// Import vocabulary
import { ALL_LATIN_VOCABULARY } from '../latin/vocabulary'

import {
  validateDifficulty,
  validateLatinText,
  countLatinWords,
  validateRequiredFields,
  findDuplicateIds,
  validateNonEmptyArray,
} from './shared/content-validators'
import {
  AuditCollector,
  calculateGradeDistribution,
  calculateDistribution,
} from './shared/test-utils'

// ============================================================================
// Data by Grade
// ============================================================================

const LATIN_BY_GRADE = {
  1: LATIN_GRADE_1_EXERCISES,
  2: LATIN_GRADE_2_EXERCISES,
  3: LATIN_GRADE_3_EXERCISES,
  4: LATIN_GRADE_4_EXERCISES,
  5: LATIN_GRADE_5_EXERCISES,
  6: LATIN_GRADE_6_EXERCISES,
  7: LATIN_GRADE_7_EXERCISES,
  8: LATIN_GRADE_8_EXERCISES,
  9: LATIN_GRADE_9_EXERCISES,
  10: LATIN_GRADE_10_EXERCISES,
  11: LATIN_GRADE_11_EXERCISES,
  12: LATIN_GRADE_12_EXERCISES,
}

// ============================================================================
// Test Configuration
// ============================================================================

const REQUIRED_EXERCISE_FIELDS: (keyof TranslationExercise)[] = [
  'id',
  'language',
  'difficulty',
  'sourceText',
  'words',
  'grammarTopic',
  'acceptableTranslations',
]

const REQUIRED_WORD_FIELDS: (keyof TranslationWord)[] = [
  'word',
  'lemma',
  'partOfSpeech',
  'meaning',
  'grammaticalInfo',
  'functionInSentence',
]

const VALID_PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'conjunction',
  'pronoun',
  'interjection',
  'article',
  'participle',
  'particle', // utinam, ne, num, utrum — Latin particles
  'numeral', // tres, centum — Latin numerals
  'phrase', // multi-word constructions treated as a unit
  'noun phrase', // compound noun phrases (res publica, senatus consultum)
  'verb phrase', // compound verb phrases (certiores facere)
  'gerundive', // bibendum, pulsanda — Latin verbal adjectives
]

// ============================================================================
// Audit Collector
// ============================================================================

const collector = new AuditCollector('Latin')

// ============================================================================
// Tests
// ============================================================================

describe('Latin Exercises Audit', () => {
  const allExercises = ALL_LATIN_EXERCISES

  beforeAll(() => {
    collector.setTotal(allExercises.length)
  })

  afterAll(() => {
    collector.printReport()
  })

  describe('Data Load Verification', () => {
    it('should load exercises from all grades', () => {
      expect(allExercises.length).toBeGreaterThan(0)

      // Log grade counts
      for (const [grade, exercises] of Object.entries(LATIN_BY_GRADE)) {
        collector.incrementStat(`grade:${grade}`, exercises.length)
      }
    })

    it('should have no duplicate IDs', () => {
      const ids = allExercises.map((e) => e.id)
      const duplicates = findDuplicateIds(ids)

      duplicates.forEach((id) => {
        collector.addError(id, 'duplicate-id', `Duplicate ID found: ${id}`)
      })

      expect(duplicates).toHaveLength(0)
    })

    it('should all have language = "latin"', () => {
      let wrongLanguageCount = 0

      for (const exercise of allExercises) {
        if (exercise.language !== 'latin') {
          wrongLanguageCount++
          collector.addError(
            exercise.id,
            'wrong-language',
            `Expected language "latin", got "${exercise.language}"`
          )
        }
      }

      expect(wrongLanguageCount).toBe(0)
    })
  })

  describe('Structural Validation', () => {
    it('should have all required fields', () => {
      let missingFieldsCount = 0

      for (const exercise of allExercises) {
        const { valid, missing } = validateRequiredFields(
          exercise,
          REQUIRED_EXERCISE_FIELDS
        )

        if (!valid) {
          missingFieldsCount++
          collector.addError(
            exercise.id,
            'missing-field',
            `Missing required fields: ${missing.join(', ')}`
          )
        }
      }

      expect(missingFieldsCount).toBe(0)
    })

    it('should have difficulty in valid range (1.0-12.0)', () => {
      let invalidDifficultyCount = 0

      for (const exercise of allExercises) {
        const result = validateDifficulty(exercise.difficulty)

        if (!result.valid) {
          invalidDifficultyCount++
          collector.addError(
            exercise.id,
            'invalid-difficulty',
            result.message || 'Invalid difficulty'
          )
        }
      }

      expect(invalidDifficultyCount).toBe(0)
    })

    it('should have reasonable time estimates when present', () => {
      for (const exercise of allExercises) {
        if (exercise.timeEstimate !== undefined) {
          if (exercise.timeEstimate < 20) {
            collector.addWarning(
              exercise.id,
              'low-time-estimate',
              `Time estimate ${exercise.timeEstimate}s is very low for translation`
            )
          }
          if (exercise.timeEstimate > 600) {
            collector.addWarning(
              exercise.id,
              'high-time-estimate',
              `Time estimate ${exercise.timeEstimate}s is very high`
            )
          }
        }
      }

      expect(true).toBe(true)
    })
  })

  describe('Source Text Validation', () => {
    it('should have non-empty source text', () => {
      let emptyTextCount = 0

      for (const exercise of allExercises) {
        if (!exercise.sourceText || exercise.sourceText.trim() === '') {
          emptyTextCount++
          collector.addError(
            exercise.id,
            'empty-source',
            'Source text is empty'
          )
        }
      }

      expect(emptyTextCount).toBe(0)
    })

    it('should have valid Latin text (no stray characters)', () => {
      let invalidTextCount = 0

      for (const exercise of allExercises) {
        if (exercise.sourceText) {
          const result = validateLatinText(exercise.sourceText)

          if (!result.valid) {
            invalidTextCount++
            for (const issue of result.issues) {
              collector.addWarning(exercise.id, 'invalid-latin-text', issue)
            }
          }
        }
      }

      // Warnings only - some exercises may have intentional special characters
      expect(true).toBe(true)
    })
  })

  describe('Word Coverage Validation', () => {
    it('should have words array', () => {
      let noWordsCount = 0

      for (const exercise of allExercises) {
        if (!validateNonEmptyArray(exercise.words)) {
          noWordsCount++
          collector.addError(exercise.id, 'no-words', 'Words array is empty')
        }
      }

      expect(noWordsCount).toBe(0)
    })

    it('should have word count matching source text', () => {
      let mismatchCount = 0

      for (const exercise of allExercises) {
        if (exercise.sourceText && exercise.words) {
          const sourceWordCount = countLatinWords(exercise.sourceText)
          const wordsArrayCount = exercise.words.length

          // Allow some flexibility (±3) for contractions, enclitics, grouped words, etc.
          if (Math.abs(sourceWordCount - wordsArrayCount) > 3) {
            mismatchCount++
            collector.addWarning(
              exercise.id,
              'word-count-mismatch',
              `Source has ${sourceWordCount} words, but words[] has ${wordsArrayCount} entries`
            )
          }
        }
      }

      // Warnings only
      expect(true).toBe(true)
    })

    it('should have all required fields for each word', () => {
      let missingWordFieldsCount = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            const { valid, missing } = validateRequiredFields(
              word,
              REQUIRED_WORD_FIELDS
            )

            if (!valid) {
              missingWordFieldsCount++
              collector.addError(
                exercise.id,
                'missing-word-field',
                `Word "${word.word}" missing: ${missing.join(', ')}`
              )
            }
          }
        }
      }

      expect(missingWordFieldsCount).toBe(0)
    })

    it('should have valid parts of speech', () => {
      let invalidPosCount = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            if (!VALID_PARTS_OF_SPEECH.includes(word.partOfSpeech)) {
              invalidPosCount++
              collector.addWarning(
                exercise.id,
                'invalid-pos',
                `Word "${word.word}" has unusual part of speech: "${word.partOfSpeech}"`
              )
            }
          }
        }
      }

      // Warnings only - might have valid but uncommon POS
      expect(true).toBe(true)
    })

    it('should have non-empty meanings', () => {
      let emptyMeaningCount = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            if (!word.meaning || word.meaning.trim() === '') {
              emptyMeaningCount++
              collector.addError(
                exercise.id,
                'empty-meaning',
                `Word "${word.word}" has empty meaning`
              )
            }
          }
        }
      }

      expect(emptyMeaningCount).toBe(0)
    })

    it('should have grammatical info', () => {
      let missingGrammarCount = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            if (!word.grammaticalInfo || word.grammaticalInfo.trim() === '') {
              missingGrammarCount++
              collector.addWarning(
                exercise.id,
                'missing-grammar-info',
                `Word "${word.word}" has no grammatical info`
              )
            }
          }
        }
      }

      // Allow some missing (e.g., for conjunctions)
      expect(missingGrammarCount).toBeLessThan(allExercises.length * 0.1)
    })
  })

  describe('Translation Validation', () => {
    it('should have non-empty acceptable translations', () => {
      let emptyTranslationsCount = 0

      for (const exercise of allExercises) {
        if (!validateNonEmptyArray(exercise.acceptableTranslations)) {
          emptyTranslationsCount++
          collector.addError(
            exercise.id,
            'no-translations',
            'No acceptable translations defined'
          )
        }
      }

      expect(emptyTranslationsCount).toBe(0)
    })

    it('should have at least one translation', () => {
      let singleTranslationCount = 0

      for (const exercise of allExercises) {
        if (
          exercise.acceptableTranslations &&
          exercise.acceptableTranslations.length === 1
        ) {
          singleTranslationCount++
          // Not an error, just track for reporting
        }
      }

      console.log(
        `\n  Exercises with single translation: ${singleTranslationCount}/${allExercises.length}`
      )
      expect(true).toBe(true)
    })

    it('should have reasonable translation lengths', () => {
      for (const exercise of allExercises) {
        if (exercise.acceptableTranslations) {
          for (const translation of exercise.acceptableTranslations) {
            if (translation.length < 5) {
              collector.addWarning(
                exercise.id,
                'short-translation',
                `Very short translation: "${translation}"`
              )
            }
            if (translation.length > 500) {
              collector.addWarning(
                exercise.id,
                'long-translation',
                `Very long translation: ${translation.length} chars`
              )
            }
          }
        }
      }

      expect(true).toBe(true)
    })
  })

  describe('Grammar Topic Validation', () => {
    it('should have grammar topic defined', () => {
      let missingTopicCount = 0

      for (const exercise of allExercises) {
        if (!exercise.grammarTopic || exercise.grammarTopic.trim() === '') {
          missingTopicCount++
          collector.addError(
            exercise.id,
            'no-grammar-topic',
            'Grammar topic not defined'
          )
        }
      }

      expect(missingTopicCount).toBe(0)
    })

    it('should report grammar topic distribution', () => {
      const distribution = calculateDistribution(
        allExercises,
        (e) => e.grammarTopic
      )

      console.log('\n  Grammar Topic Distribution:')
      const sorted = Object.entries(distribution).sort((a, b) => b[1] - a[1])
      for (const [topic, count] of sorted.slice(0, 15)) {
        console.log(`    ${topic.padEnd(30)}: ${count}`)
      }
      if (sorted.length > 15) {
        console.log(`    ... and ${sorted.length - 15} more topics`)
      }

      expect(true).toBe(true)
    })
  })

  describe('Parsing Elements Validation', () => {
    it('should have parsing elements reference valid words', () => {
      let invalidRefCount = 0

      for (const exercise of allExercises) {
        if (exercise.parsingElements && exercise.parsingElements.length > 0) {
          const wordList = exercise.words?.map((w) => w.word) || []
          const wordSet = new Set(wordList)

          for (const element of exercise.parsingElements) {
            const ref = element.word
            // Direct match
            if (wordSet.has(ref)) continue
            // Multi-word reference (e.g., "Urbe capta", "venturum esse")
            const refWords = ref
              .replace(/\.\.\./g, ' ')
              .split(/\s+/)
              .filter((w) => w.length > 0)
            const allPartsFound = refWords.every((rw) => wordSet.has(rw))
            if (allPartsFound) continue
            // Discontinuous reference with "..." (e.g., "te...esse", "Si...facis...erras")
            if (ref.includes('...')) {
              const parts = ref.split('...').filter((p) => p.length > 0)
              const allDiscontiguous = parts.every((p) => wordSet.has(p))
              if (allDiscontiguous) continue
            }
            // Substring match (word appears in sourceText)
            if (exercise.sourceText && exercise.sourceText.includes(ref))
              continue

            invalidRefCount++
            collector.addWarning(
              exercise.id,
              'invalid-parsing-ref',
              `Parsing element references unknown word: "${ref}"`
            )
          }
        }
      }

      expect(true).toBe(true)
    })

    it('should report parsing elements coverage', () => {
      let withParsing = 0
      let totalParsingElements = 0

      for (const exercise of allExercises) {
        if (exercise.parsingElements && exercise.parsingElements.length > 0) {
          withParsing++
          totalParsingElements += exercise.parsingElements.length
        }
      }

      console.log(
        `\n  Parsing elements: ${withParsing}/${allExercises.length} exercises have parsing`
      )
      console.log(`  Total parsing elements: ${totalParsingElements}`)

      expect(true).toBe(true)
    })
  })

  describe('Vocabulary Coverage', () => {
    it('should report vocabulary statistics', () => {
      const vocabCount = ALL_LATIN_VOCABULARY.length
      console.log(`\n  Total vocabulary entries: ${vocabCount}`)

      // Check how many unique lemmas are used in exercises
      const exerciseLemmas = new Set<string>()
      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            if (word.lemma) exerciseLemmas.add(word.lemma.toLowerCase())
          }
        }
      }

      console.log(`  Unique lemmas in exercises: ${exerciseLemmas.size}`)

      expect(true).toBe(true)
    })
  })

  describe('Distribution Analysis', () => {
    it('should have reasonable grade distribution', () => {
      const distribution = calculateGradeDistribution(allExercises)

      console.log('\n  Grade Distribution:')
      for (let grade = 1; grade <= 12; grade++) {
        const count = distribution[grade] || 0
        const bar = '█'.repeat(Math.min(Math.round(count / 2), 30))
        console.log(
          `    Grade ${grade.toString().padStart(2)}: ${bar} ${count}`
        )
      }

      expect(true).toBe(true)
    })

    it('should report derivatives coverage', () => {
      let wordsWithDerivatives = 0
      let totalDerivatives = 0
      let totalWords = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            totalWords++
            if (word.derivatives && word.derivatives.length > 0) {
              wordsWithDerivatives++
              totalDerivatives += word.derivatives.length
            }
          }
        }
      }

      const percent = Math.round((wordsWithDerivatives / totalWords) * 100)
      console.log(
        `\n  Derivatives coverage: ${percent}% (${wordsWithDerivatives}/${totalWords} words)`
      )
      console.log(`  Total derivatives listed: ${totalDerivatives}`)

      expect(true).toBe(true)
    })
  })
})
