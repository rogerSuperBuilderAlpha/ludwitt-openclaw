/**
 * Grading Compatibility Audit
 * 
 * Verifies that all problem sets have the required structure
 * to work properly with the AI grading prompts.
 * 
 * This ensures problems can be fed into the grading system and
 * receive accurate, meaningful feedback.
 */

import { ALL_MATH_PROBLEMS_V2 } from '../math-v2'
import { ALL_LOGIC_PROBLEMS } from '../logic'
import { AuditCollector } from './shared'

// Import reading exercises
import { COMPREHENSION_G1_3 } from '../reading/comprehension_g1_3'
import { COMPREHENSION_G4_6 } from '../reading/comprehension_g4_6'
import { COMPREHENSION_G7_9 } from '../reading/comprehension_g7_9'
import { COMPREHENSION_G10_12 } from '../reading/comprehension_g10_12'

// Import Latin exercises
import { LATIN_GRADE_1_EXERCISES } from '../latin/exercises/novice/grade1'
import { LATIN_GRADE_2_EXERCISES } from '../latin/exercises/novice/grade2'
import { LATIN_GRADE_3_EXERCISES } from '../latin/exercises/beginner/grade3'
import { LATIN_GRADE_4_EXERCISES } from '../latin/exercises/beginner/grade4'

// Import Greek exercises
import { GREEK_GRADE_1_EXERCISES } from '../greek/exercises/novice/grade1'
import { GREEK_GRADE_2_EXERCISES } from '../greek/exercises/novice/grade2'
import { GREEK_GRADE_3_EXERCISES } from '../greek/exercises/beginner/grade3'
import { GREEK_GRADE_4_EXERCISES } from '../greek/exercises/beginner/grade4'

describe('Grading Compatibility Audit', () => {
  const audit = new AuditCollector('Grading Compatibility')

  afterAll(() => {
    audit.printReport()
  })

  // ============================================================================
  // MATH V2 - GRADING COMPATIBILITY
  // ============================================================================
  describe('Math V2 Problems - Grading Compatibility', () => {
    const problems = ALL_MATH_PROBLEMS_V2

    it('should have question content for AI grading', () => {
      let missingQuestion = 0
      let missingQuestionContent = 0

      problems.forEach(problem => {
        if (!problem.question) {
          missingQuestion++
          audit.addError('missing-question', problem.id, 'No question field')
        } else if (!problem.question.text && !problem.question.latex) {
          missingQuestionContent++
          audit.addError('empty-question', problem.id, 'Question has no text or latex')
        }
      })

      console.log(`\n  Problems without question field: ${missingQuestion}`)
      console.log(`  Problems without question content: ${missingQuestionContent}`)
      
      expect(missingQuestion).toBe(0)
      expect(missingQuestionContent).toBe(0)
    })

    it('should have correct answer for comparison', () => {
      let missingAnswer = 0

      problems.forEach(problem => {
        if (!problem.answer?.correct) {
          missingAnswer++
          audit.addError('missing-answer', problem.id, 'No answer.correct field')
        }
      })

      console.log(`\n  Problems without correct answer: ${missingAnswer}`)
      expect(missingAnswer).toBe(0)
    })

    it('should have solution steps for explanation', () => {
      let missingSolution = 0
      let emptySteps = 0

      problems.forEach(problem => {
        if (!problem.solution) {
          missingSolution++
          audit.addWarning('missing-solution', problem.id, 'No solution field')
        } else if (!problem.solution.steps || problem.solution.steps.length === 0) {
          emptySteps++
          audit.addWarning('empty-steps', problem.id, 'Solution has no steps')
        }
      })

      console.log(`\n  Problems without solution: ${missingSolution}`)
      console.log(`  Problems with empty steps: ${emptySteps}`)
      
      // Solutions are important but not strictly required
      expect(missingSolution + emptySteps).toBeLessThan(problems.length * 0.1) // < 10%
    })

    it('should have hints for progressive help', () => {
      let missingHints = 0
      let insufficientHints = 0

      problems.forEach(problem => {
        if (!problem.hints || problem.hints.length === 0) {
          missingHints++
          audit.addWarning('missing-hints', problem.id, 'No hints array')
        } else if (problem.hints.length < 2) {
          insufficientHints++
          audit.addWarning('few-hints', problem.id, `Only ${problem.hints.length} hint(s)`)
        }
      })

      console.log(`\n  Problems without hints: ${missingHints}`)
      console.log(`  Problems with < 2 hints: ${insufficientHints}`)
    })

    it('should have valid difficulty for XP calculation', () => {
      let invalidDifficulty = 0

      problems.forEach(problem => {
        if (typeof problem.difficulty !== 'number' || 
            problem.difficulty < 1 || 
            problem.difficulty > 12) {
          invalidDifficulty++
          audit.addError('invalid-difficulty', problem.id, 
            `Difficulty ${problem.difficulty} out of range [1, 12]`)
        }
      })

      expect(invalidDifficulty).toBe(0)
    })

    it('should have gradeLevel matching difficulty', () => {
      let mismatchedGrade = 0

      problems.forEach(problem => {
        const expectedGrade = Math.floor(problem.difficulty)
        if (problem.gradeLevel !== expectedGrade && 
            problem.gradeLevel !== Math.ceil(problem.difficulty)) {
          mismatchedGrade++
          audit.addWarning('grade-mismatch', problem.id, 
            `Grade ${problem.gradeLevel} vs difficulty ${problem.difficulty}`)
        }
      })

      console.log(`\n  Problems with grade/difficulty mismatch: ${mismatchedGrade}`)
    })
  })

  // ============================================================================
  // READING - GRADING COMPATIBILITY
  // ============================================================================
  describe('Reading Exercises - Grading Compatibility', () => {
    const allExercises = [
      ...COMPREHENSION_G1_3,
      ...COMPREHENSION_G4_6,
      ...COMPREHENSION_G7_9,
      ...COMPREHENSION_G10_12
    ]

    it('should have passage for context', () => {
      let missingPassage = 0

      allExercises.forEach(exercise => {
        if (!exercise.passage || exercise.passage.trim().length < 20) {
          missingPassage++
          audit.addError('missing-passage', exercise.id, 'No or empty passage')
        }
      })

      console.log(`\n  Exercises without passage: ${missingPassage}/${allExercises.length}`)
      expect(missingPassage).toBe(0)
    })

    it('should have questions array', () => {
      let missingQuestions = 0

      allExercises.forEach(exercise => {
        if (!exercise.questions || exercise.questions.length === 0) {
          missingQuestions++
          audit.addError('missing-questions', exercise.id, 'No questions array')
        }
      })

      expect(missingQuestions).toBe(0)
    })

    it('should have question IDs for questionResults', () => {
      let missingIds = 0

      allExercises.forEach(exercise => {
        exercise.questions?.forEach((q, idx) => {
          if (!q.id) {
            missingIds++
            audit.addError('missing-question-id', exercise.id, 
              `Question ${idx} has no id`)
          }
        })
      })

      console.log(`\n  Questions without IDs: ${missingIds}`)
      expect(missingIds).toBe(0)
    })

    it('should have correctAnswer for each question', () => {
      let missingAnswers = 0

      allExercises.forEach(exercise => {
        exercise.questions?.forEach((q, idx) => {
          if (!q.correctAnswer) {
            missingAnswers++
            audit.addError('missing-correct-answer', exercise.id, 
              `Question ${q.id || idx} has no correctAnswer`)
          }
        })
      })

      console.log(`\n  Questions without correctAnswer: ${missingAnswers}`)
      expect(missingAnswers).toBe(0)
    })

    it('should have skill type for each question', () => {
      let missingSkill = 0

      allExercises.forEach(exercise => {
        exercise.questions?.forEach((q, idx) => {
          if (!q.skill) {
            missingSkill++
            audit.addWarning('missing-skill', exercise.id, 
              `Question ${q.id || idx} has no skill type`)
          }
        })
      })

      console.log(`\n  Questions without skill type: ${missingSkill}`)
    })
  })

  // ============================================================================
  // LATIN - GRADING COMPATIBILITY
  // ============================================================================
  describe('Latin Exercises - Grading Compatibility', () => {
    const allExercises = [
      ...LATIN_GRADE_1_EXERCISES,
      ...LATIN_GRADE_2_EXERCISES,
      ...LATIN_GRADE_3_EXERCISES,
      ...LATIN_GRADE_4_EXERCISES
    ]

    it('should have sourceText for AI grading', () => {
      let missingSource = 0

      allExercises.forEach(exercise => {
        if (!exercise.sourceText || exercise.sourceText.trim().length < 3) {
          missingSource++
          audit.addError('missing-source', exercise.id, 'No sourceText')
        }
      })

      console.log(`\n  Exercises without sourceText: ${missingSource}/${allExercises.length}`)
      expect(missingSource).toBe(0)
    })

    it('should have acceptableTranslations array', () => {
      let missingTranslations = 0
      let emptyTranslations = 0

      allExercises.forEach(exercise => {
        if (!exercise.acceptableTranslations) {
          missingTranslations++
          audit.addError('missing-translations', exercise.id, 
            'No acceptableTranslations array')
        } else if (exercise.acceptableTranslations.length === 0) {
          emptyTranslations++
          audit.addError('empty-translations', exercise.id, 
            'Empty acceptableTranslations array')
        }
      })

      console.log(`\n  Exercises without acceptableTranslations: ${missingTranslations}`)
      console.log(`  Exercises with empty translations: ${emptyTranslations}`)
      
      expect(missingTranslations + emptyTranslations).toBe(0)
    })

    it('should have words array for vocabulary lookup', () => {
      let missingWords = 0

      allExercises.forEach(exercise => {
        if (!exercise.words || exercise.words.length === 0) {
          missingWords++
          audit.addError('missing-words', exercise.id, 'No words array')
        }
      })

      console.log(`\n  Exercises without words: ${missingWords}`)
      expect(missingWords).toBe(0)
    })

    it('should have required fields for each word', () => {
      let incompleteWords = 0
      const requiredFields = ['word', 'lemma', 'partOfSpeech', 'meaning', 'grammaticalInfo']

      allExercises.forEach(exercise => {
        exercise.words?.forEach((word, idx) => {
          const missing = requiredFields.filter(f => !word[f as keyof typeof word])
          if (missing.length > 0) {
            incompleteWords++
            audit.addWarning('incomplete-word', exercise.id, 
              `Word ${idx} (${word.word}) missing: ${missing.join(', ')}`)
          }
        })
      })

      console.log(`\n  Words with missing required fields: ${incompleteWords}`)
    })

    it('should have grammarTopic for categorization', () => {
      let missingTopic = 0

      allExercises.forEach(exercise => {
        if (!exercise.grammarTopic) {
          missingTopic++
          audit.addWarning('missing-grammar-topic', exercise.id, 'No grammarTopic')
        }
      })

      console.log(`\n  Exercises without grammarTopic: ${missingTopic}`)
    })

    it('should have valid difficulty for XP calculation', () => {
      let invalidDifficulty = 0

      allExercises.forEach(exercise => {
        if (typeof exercise.difficulty !== 'number' || 
            exercise.difficulty < 1 || 
            exercise.difficulty > 12) {
          invalidDifficulty++
          audit.addError('invalid-difficulty', exercise.id, 
            `Difficulty ${exercise.difficulty} out of range [1, 12]`)
        }
      })

      expect(invalidDifficulty).toBe(0)
    })
  })

  // ============================================================================
  // GREEK - GRADING COMPATIBILITY
  // ============================================================================
  describe('Greek Exercises - Grading Compatibility', () => {
    const allExercises = [
      ...GREEK_GRADE_1_EXERCISES,
      ...GREEK_GRADE_2_EXERCISES,
      ...GREEK_GRADE_3_EXERCISES,
      ...GREEK_GRADE_4_EXERCISES
    ]

    it('should have sourceText with Greek characters', () => {
      let missingSource = 0
      let noGreekChars = 0
      const greekPattern = /[\u0370-\u03FF\u1F00-\u1FFF]/

      allExercises.forEach(exercise => {
        if (!exercise.sourceText) {
          missingSource++
          audit.addError('missing-source', exercise.id, 'No sourceText')
        } else if (!greekPattern.test(exercise.sourceText)) {
          noGreekChars++
          audit.addError('no-greek-chars', exercise.id, 
            'sourceText has no Greek characters')
        }
      })

      console.log(`\n  Exercises without sourceText: ${missingSource}/${allExercises.length}`)
      console.log(`  Exercises without Greek chars: ${noGreekChars}`)
      
      expect(missingSource).toBe(0)
      expect(noGreekChars).toBe(0)
    })

    it('should have acceptableTranslations', () => {
      let missingTranslations = 0

      allExercises.forEach(exercise => {
        if (!exercise.acceptableTranslations || 
            exercise.acceptableTranslations.length === 0) {
          missingTranslations++
          audit.addError('missing-translations', exercise.id, 
            'No acceptableTranslations')
        }
      })

      expect(missingTranslations).toBe(0)
    })

    it('should have words array with Greek text', () => {
      let missingWords = 0
      let noGreekInWords = 0
      const greekPattern = /[\u0370-\u03FF\u1F00-\u1FFF]/

      allExercises.forEach(exercise => {
        if (!exercise.words || exercise.words.length === 0) {
          missingWords++
        } else {
          const hasGreek = exercise.words.some(w => greekPattern.test(w.word))
          if (!hasGreek) {
            noGreekInWords++
            audit.addWarning('no-greek-words', exercise.id, 
              'Words array has no Greek characters')
          }
        }
      })

      console.log(`\n  Exercises without words: ${missingWords}`)
      console.log(`  Exercises with no Greek in words: ${noGreekInWords}`)
    })

    it('should have romanization for accessibility', () => {
      let missingRomanization = 0

      allExercises.forEach(exercise => {
        if (!exercise.romanization) {
          missingRomanization++
          // This is a warning, not an error - romanization is helpful but not required
        }
      })

      console.log(`\n  Exercises without romanization: ${missingRomanization}/${allExercises.length}`)
    })
  })

  // ============================================================================
  // LOGIC - GRADING COMPATIBILITY
  // ============================================================================
  describe('Logic Problems - Grading Compatibility', () => {
    const problems = ALL_LOGIC_PROBLEMS

    it('should have question text', () => {
      let missingQuestion = 0

      problems.forEach(problem => {
        if (!problem.question || problem.question.trim().length < 5) {
          missingQuestion++
          audit.addError('missing-question', problem.id, 'No question text')
        }
      })

      console.log(`\n  Problems without question: ${missingQuestion}/${problems.length}`)
      expect(missingQuestion).toBe(0)
    })

    it('should have correctAnswer', () => {
      let missingAnswer = 0

      problems.forEach(problem => {
        if (!problem.correctAnswer) {
          missingAnswer++
          audit.addError('missing-answer', problem.id, 'No correctAnswer')
        }
      })

      expect(missingAnswer).toBe(0)
    })

    it('should have explanation', () => {
      let missingExplanation = 0

      problems.forEach(problem => {
        if (!problem.explanation || problem.explanation.length < 20) {
          missingExplanation++
          audit.addWarning('short-explanation', problem.id, 
            'No or short explanation')
        }
      })

      console.log(`\n  Problems without explanation: ${missingExplanation}`)
    })

    it('multiple-choice should have options', () => {
      const mcProblems = problems.filter(p => p.problemType === 'multiple-choice')
      let missingOptions = 0

      mcProblems.forEach(problem => {
        if (!problem.options || problem.options.length < 2) {
          missingOptions++
          audit.addError('missing-options', problem.id, 
            'Multiple-choice without options')
        }
      })

      console.log(`\n  MC problems without options: ${missingOptions}/${mcProblems.length}`)
      expect(missingOptions).toBe(0)
    })

    it('proof problems should have proofSteps or detailed explanation', () => {
      const proofProblems = problems.filter(p => p.problemType === 'proof')
      let incomplete = 0

      proofProblems.forEach(problem => {
        const hasSteps = problem.proofSteps && problem.proofSteps.length > 0
        const hasDetailedExplanation = problem.explanation && problem.explanation.length > 100

        if (!hasSteps && !hasDetailedExplanation) {
          incomplete++
          audit.addWarning('incomplete-proof', problem.id, 
            'Proof without steps or detailed explanation')
        }
      })

      console.log(`\n  Proof problems incomplete: ${incomplete}/${proofProblems.length}`)
    })
  })

  // ============================================================================
  // CROSS-SUBJECT SUMMARY
  // ============================================================================
  describe('Cross-Subject Summary', () => {
    it('should report overall grading compatibility', () => {
      const mathCount = ALL_MATH_PROBLEMS_V2.length
      const readingCount = COMPREHENSION_G1_3.length + COMPREHENSION_G4_6.length + 
                          COMPREHENSION_G7_9.length + COMPREHENSION_G10_12.length
      const latinCount = LATIN_GRADE_1_EXERCISES.length + LATIN_GRADE_2_EXERCISES.length +
                        LATIN_GRADE_3_EXERCISES.length + LATIN_GRADE_4_EXERCISES.length
      const greekCount = GREEK_GRADE_1_EXERCISES.length + GREEK_GRADE_2_EXERCISES.length +
                        GREEK_GRADE_3_EXERCISES.length + GREEK_GRADE_4_EXERCISES.length
      const logicCount = ALL_LOGIC_PROBLEMS.length

      const total = mathCount + readingCount + latinCount + greekCount + logicCount

      console.log('\n  ============================================')
      console.log('  GRADING COMPATIBILITY SUMMARY')
      console.log('  ============================================')
      console.log(`  Math V2 Problems:     ${mathCount}`)
      console.log(`  Reading Exercises:    ${readingCount}`)
      console.log(`  Latin Exercises:      ${latinCount}`)
      console.log(`  Greek Exercises:      ${greekCount}`)
      console.log(`  Logic Problems:       ${logicCount}`)
      console.log('  --------------------------------------------')
      console.log(`  TOTAL:                ${total}`)
      console.log('  ============================================')

      expect(total).toBeGreaterThan(0)
    })
  })
})
