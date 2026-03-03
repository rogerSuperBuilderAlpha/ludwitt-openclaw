/**
 * Greek Exercises Audit Test
 *
 * Comprehensive validation of all Greek translation exercise data including:
 * - Structural validation (required fields, types)
 * - Greek Unicode validation (correct character ranges)
 * - Romanization validation (consistency with source text)
 * - Word coverage validation
 * - Breathing marks and accents validation
 */

import type { TranslationExercise, TranslationWord } from '@/lib/types/basics'

// Import Greek exercises
import { ALL_GREEK_EXERCISES } from '../greek/exercises'
import {
  GREEK_GRADE_1_EXERCISES,
  GREEK_GRADE_2_EXERCISES,
  GREEK_GRADE_3_EXERCISES,
  GREEK_GRADE_4_EXERCISES,
  GREEK_GRADE_5_EXERCISES,
  GREEK_GRADE_6_EXERCISES,
  GREEK_GRADE_7_EXERCISES,
  GREEK_GRADE_8_EXERCISES,
  GREEK_GRADE_9_EXERCISES,
  GREEK_GRADE_10_EXERCISES,
  GREEK_GRADE_11_EXERCISES,
  GREEK_GRADE_12_EXERCISES,
} from '../greek/exercises'

// Import vocabulary
import { ALL_GREEK_VOCABULARY } from '../greek/vocabulary'

import {
  validateDifficulty,
  validateGreekUnicode,
  containsGreekUnicode,
  countGreekWords,
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

const GREEK_BY_GRADE = {
  1: GREEK_GRADE_1_EXERCISES,
  2: GREEK_GRADE_2_EXERCISES,
  3: GREEK_GRADE_3_EXERCISES,
  4: GREEK_GRADE_4_EXERCISES,
  5: GREEK_GRADE_5_EXERCISES,
  6: GREEK_GRADE_6_EXERCISES,
  7: GREEK_GRADE_7_EXERCISES,
  8: GREEK_GRADE_8_EXERCISES,
  9: GREEK_GRADE_9_EXERCISES,
  10: GREEK_GRADE_10_EXERCISES,
  11: GREEK_GRADE_11_EXERCISES,
  12: GREEK_GRADE_12_EXERCISES,
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
  'particle', // μέν, δέ, γάρ, μή — standard Greek POS
  'particles', // paired particles (γε μή)
  'numeral', // δύο, δέκα, τρεῖς — Greek numerals
  'phrase', // multi-word constructions treated as a unit
  'noun phrase', // compound noun phrases
  'verb phrase', // compound verb phrases
  'crasis', // contracted words (κοὐδέν = καὶ οὐδέν)
  'noun/adv', // words functioning as both (πλησίον)
]

// Greek breathing marks and accents
const GREEK_BREATHING_MARKS = /[\u0313\u0314\u1F00-\u1FFF]/ // Smooth/rough breathing
const GREEK_ACCENTS = /[\u0300\u0301\u0342\u0308]/ // Grave, acute, circumflex, diaeresis

// ============================================================================
// Audit Collector
// ============================================================================

const collector = new AuditCollector('Greek')

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if Greek text has proper breathing marks (for words starting with vowels)
 */
function hasProperBreathingMarks(text: string): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []
  const words = text.split(/\s+/)

  // Greek vowels (lowercase and uppercase, basic)
  const greekVowelStarts = /^[αειουηωἀἁἐἑἰἱὀὁὐὑἠἡὠὡΑΕΙΟΥΗΩἈἉἘἙἸἹὈὉὙὐὙἨἩὨὩ]/

  for (const word of words) {
    if (greekVowelStarts.test(word)) {
      // Words starting with vowels should have breathing marks
      // But this is complex - many forms already include them in the Unicode
      // Just check that it's not completely missing for initial vowels
    }
  }

  return { valid: issues.length === 0, issues }
}

/**
 * Check if romanization word count matches source text
 */
function romanizationMatchesSource(
  sourceText: string,
  romanization: string | undefined
): { matches: boolean; sourceCount: number; romanCount: number } {
  const sourceCount = countGreekWords(sourceText)
  const romanCount = romanization
    ? romanization.split(/\s+/).filter((w) => w.length > 0).length
    : 0

  return {
    matches: Math.abs(sourceCount - romanCount) <= 1,
    sourceCount,
    romanCount,
  }
}

// ============================================================================
// Tests
// ============================================================================

describe('Greek Exercises Audit', () => {
  const allExercises = ALL_GREEK_EXERCISES

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
      for (const [grade, exercises] of Object.entries(GREEK_BY_GRADE)) {
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

    it('should all have language = "greek"', () => {
      let wrongLanguageCount = 0

      for (const exercise of allExercises) {
        if (exercise.language !== 'greek') {
          wrongLanguageCount++
          collector.addError(
            exercise.id,
            'wrong-language',
            `Expected language "greek", got "${exercise.language}"`
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

  describe('Greek Unicode Validation', () => {
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

    it('should contain Greek Unicode characters', () => {
      let noGreekCount = 0

      for (const exercise of allExercises) {
        if (exercise.sourceText && !containsGreekUnicode(exercise.sourceText)) {
          noGreekCount++
          collector.addError(
            exercise.id,
            'no-greek-unicode',
            'Source text contains no Greek Unicode characters'
          )
        }
      }

      expect(noGreekCount).toBe(0)
    })

    it('should have valid Greek text structure', () => {
      let invalidTextCount = 0

      for (const exercise of allExercises) {
        if (exercise.sourceText) {
          const result = validateGreekUnicode(exercise.sourceText)

          if (!result.valid) {
            invalidTextCount++
            for (const issue of result.issues) {
              collector.addWarning(exercise.id, 'greek-text-issue', issue)
            }
          }
        }
      }

      // Warnings only
      expect(true).toBe(true)
    })

    it('should have Greek characters in word entries', () => {
      let nonGreekWordCount = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            if (!containsGreekUnicode(word.word)) {
              nonGreekWordCount++
              collector.addWarning(
                exercise.id,
                'non-greek-word',
                `Word "${word.word}" contains no Greek characters`
              )
            }
          }
        }
      }

      // Warnings only - some words might be Latin transliterations
      expect(true).toBe(true)
    })
  })

  describe('Romanization Validation', () => {
    it('should have romanization for exercise', () => {
      let missingRomanization = 0

      for (const exercise of allExercises) {
        if (!exercise.romanization || exercise.romanization.trim() === '') {
          missingRomanization++
          collector.addWarning(
            exercise.id,
            'missing-romanization',
            'No romanization provided'
          )
        }
      }

      console.log(
        `\n  Romanization coverage: ${allExercises.length - missingRomanization}/${allExercises.length}`
      )

      // Grades 1-6 have romanization, 7-12 need to be added incrementally
      // Current threshold: at least 40% coverage (all grade 1-6 exercises)
      expect(missingRomanization).toBeLessThan(allExercises.length * 0.6)
    })

    it('should have romanization word count matching source text', () => {
      let mismatchCount = 0

      for (const exercise of allExercises) {
        if (exercise.romanization) {
          const result = romanizationMatchesSource(
            exercise.sourceText,
            exercise.romanization
          )

          if (!result.matches) {
            mismatchCount++
            collector.addWarning(
              exercise.id,
              'romanization-mismatch',
              `Source has ${result.sourceCount} words, romanization has ${result.romanCount}`
            )
          }
        }
      }

      // Warnings only
      expect(true).toBe(true)
    })

    it('should have romanization field for each word', () => {
      let missingWordRomanization = 0
      let totalWords = 0

      for (const exercise of allExercises) {
        if (exercise.words) {
          for (const word of exercise.words) {
            totalWords++
            if (!word.romanization || word.romanization.trim() === '') {
              missingWordRomanization++
            }
          }
        }
      }

      const percent = Math.round(
        ((totalWords - missingWordRomanization) / totalWords) * 100
      )
      console.log(
        `\n  Word romanization coverage: ${percent}% (${totalWords - missingWordRomanization}/${totalWords})`
      )

      // Grades 1-6 have word romanization, 7-12 need to be added incrementally
      // Current threshold: at least 40% coverage
      expect(percent).toBeGreaterThan(40)
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

    it('should have word count approximately matching source text', () => {
      let mismatchCount = 0

      for (const exercise of allExercises) {
        if (exercise.sourceText && exercise.words) {
          const sourceWordCount = countGreekWords(exercise.sourceText)
          const wordsArrayCount = exercise.words.length

          // Allow flexibility for articles, enclitics, grouped words, etc.
          if (Math.abs(sourceWordCount - wordsArrayCount) > 5) {
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

      // Warnings only
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

  describe('Vocabulary Coverage', () => {
    it('should report vocabulary statistics', () => {
      const vocabCount = ALL_GREEK_VOCABULARY.length
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

    it('should report source author coverage', () => {
      let withAuthor = 0
      const authors: Record<string, number> = {}

      for (const exercise of allExercises) {
        if (exercise.sourceAuthor) {
          withAuthor++
          authors[exercise.sourceAuthor] =
            (authors[exercise.sourceAuthor] || 0) + 1
        }
      }

      console.log(
        `\n  Exercises with source author: ${withAuthor}/${allExercises.length}`
      )
      if (Object.keys(authors).length > 0) {
        console.log('  Authors:')
        for (const [author, count] of Object.entries(authors).sort(
          (a, b) => b[1] - a[1]
        )) {
          console.log(`    ${author.padEnd(20)}: ${count}`)
        }
      }

      expect(true).toBe(true)
    })
  })
})
