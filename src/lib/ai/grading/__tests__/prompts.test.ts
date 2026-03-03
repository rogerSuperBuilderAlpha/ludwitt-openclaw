/**
 * Grading Prompts Test Suite
 * 
 * Validates that all grading prompts:
 * 1. Exist and are non-empty
 * 2. Contain required elements for accurate grading
 * 3. Include proper scoring guidelines
 * 4. Have consistent structure
 */

import {
  GRADING_PROMPTS,
  MATH_GRADING_PROMPT,
  READING_GRADING_PROMPT,
  LATIN_GRADING_PROMPT,
  GREEK_GRADING_PROMPT,
  LOGIC_GRADING_PROMPT,
  buildTranslationGradingPrompt,
  GRADING_JSON_FORMAT,
  TRANSLATION_JSON_FORMAT
} from '../prompts'

describe('Grading Prompts', () => {
  // ============================================================================
  // BASIC STRUCTURE TESTS
  // ============================================================================
  describe('Basic Structure', () => {
    it('should export all required prompts', () => {
      expect(GRADING_PROMPTS).toBeDefined()
      expect(GRADING_PROMPTS.math).toBeDefined()
      expect(GRADING_PROMPTS.reading).toBeDefined()
      expect(GRADING_PROMPTS.latin).toBeDefined()
      expect(GRADING_PROMPTS.greek).toBeDefined()
      expect(GRADING_PROMPTS.logic).toBeDefined()
    })

    it('should have non-empty prompts', () => {
      expect(MATH_GRADING_PROMPT.length).toBeGreaterThan(500)
      expect(READING_GRADING_PROMPT.length).toBeGreaterThan(500)
      expect(LATIN_GRADING_PROMPT.length).toBeGreaterThan(500)
      expect(GREEK_GRADING_PROMPT.length).toBeGreaterThan(500)
      expect(LOGIC_GRADING_PROMPT.length).toBeGreaterThan(300)
    })

    it('should have consistent prompts between individual exports and GRADING_PROMPTS object', () => {
      expect(GRADING_PROMPTS.math).toBe(MATH_GRADING_PROMPT)
      expect(GRADING_PROMPTS.reading).toBe(READING_GRADING_PROMPT)
      expect(GRADING_PROMPTS.latin).toBe(LATIN_GRADING_PROMPT)
      expect(GRADING_PROMPTS.greek).toBe(GREEK_GRADING_PROMPT)
      expect(GRADING_PROMPTS.logic).toBe(LOGIC_GRADING_PROMPT)
    })
  })

  // ============================================================================
  // MATH PROMPT VALIDATION
  // ============================================================================
  describe('Math Prompt', () => {
    it('should contain answer comparison rules', () => {
      expect(MATH_GRADING_PROMPT).toContain('isCorrect')
      expect(MATH_GRADING_PROMPT).toContain('Expected/Correct Answer')
      expect(MATH_GRADING_PROMPT).toContain('DO NOT recalculate')
    })

    it('should contain equivalent forms guidance', () => {
      expect(MATH_GRADING_PROMPT).toContain('EQUIVALENT FORMS')
      expect(MATH_GRADING_PROMPT).toContain('Decimals and fractions')
      expect(MATH_GRADING_PROMPT).toContain('Units')
    })

    it('should contain scoring rules', () => {
      expect(MATH_GRADING_PROMPT).toContain('SCORING RULES')
      expect(MATH_GRADING_PROMPT).toContain('85-100')
      expect(MATH_GRADING_PROMPT).toContain('WORK SHOWN')
      expect(MATH_GRADING_PROMPT).toContain('NO WORK')
    })

    it('should contain edge case handling', () => {
      expect(MATH_GRADING_PROMPT).toContain('EDGE CASES')
      expect(MATH_GRADING_PROMPT).toContain("don't know")
      expect(MATH_GRADING_PROMPT).toContain('arithmetic error')
    })
  })

  // ============================================================================
  // READING PROMPT VALIDATION
  // ============================================================================
  describe('Reading Prompt', () => {
    it('should require independent question grading', () => {
      expect(READING_GRADING_PROMPT).toContain('INDEPENDENTLY')
      expect(READING_GRADING_PROMPT).toContain('1 out of 2')
    })

    it('should contain question types', () => {
      expect(READING_GRADING_PROMPT).toContain('LITERAL')
      expect(READING_GRADING_PROMPT).toContain('INFERENCE')
      expect(READING_GRADING_PROMPT).toContain('VOCABULARY')
      expect(READING_GRADING_PROMPT).toContain('MAIN IDEA')
    })

    it('should contain per-question scoring', () => {
      expect(READING_GRADING_PROMPT).toContain('SCORING PER QUESTION')
      expect(READING_GRADING_PROMPT).toContain('100')
      expect(READING_GRADING_PROMPT).toContain('0-19')
    })

    it('should require questionResults array', () => {
      expect(READING_GRADING_PROMPT).toContain('questionResults')
      expect(READING_GRADING_PROMPT).toContain('questionId')
      expect(READING_GRADING_PROMPT).toContain('isCorrect')
    })

    it('should handle spelling/grammar leniency', () => {
      expect(READING_GRADING_PROMPT).toContain('Spelling/grammar')
      expect(READING_GRADING_PROMPT).toContain('NOT penalize')
    })
  })

  // ============================================================================
  // LATIN PROMPT VALIDATION
  // ============================================================================
  describe('Latin Prompt', () => {
    it('should contain four scoring categories', () => {
      expect(LATIN_GRADING_PROMPT).toContain('MEANING (0-25)')
      expect(LATIN_GRADING_PROMPT).toContain('GRAMMAR (0-25)')
      expect(LATIN_GRADING_PROMPT).toContain('VOCABULARY (0-25)')
      expect(LATIN_GRADING_PROMPT).toContain('ENGLISH (0-25)')
    })

    it('should contain quality tiers', () => {
      expect(LATIN_GRADING_PROMPT).toContain('QUALITY TIERS')
      expect(LATIN_GRADING_PROMPT).toContain('perfect')
      expect(LATIN_GRADING_PROMPT).toContain('excellent')
      expect(LATIN_GRADING_PROMPT).toContain('good')
      expect(LATIN_GRADING_PROMPT).toContain('partial')
      expect(LATIN_GRADING_PROMPT).toContain('attempted')
    })

    it('should contain Latin grammar specifics', () => {
      expect(LATIN_GRADING_PROMPT).toContain('nominative')
      expect(LATIN_GRADING_PROMPT).toContain('accusative')
      expect(LATIN_GRADING_PROMPT).toContain('dative')
      expect(LATIN_GRADING_PROMPT).toContain('genitive')
      expect(LATIN_GRADING_PROMPT).toContain('ablative')
    })

    it('should contain critical scoring rule for unrelated translations', () => {
      expect(LATIN_GRADING_PROMPT).toContain('CRITICAL SCORING RULE')
      expect(LATIN_GRADING_PROMPT).toContain('NO connection')
      expect(LATIN_GRADING_PROMPT).toContain('0-10')
    })

    it('should contain specific feedback requirements', () => {
      expect(LATIN_GRADING_PROMPT).toContain('FEEDBACK REQUIREMENTS')
      expect(LATIN_GRADING_PROMPT).toContain('SPECIFIC')
    })
  })

  // ============================================================================
  // GREEK PROMPT VALIDATION
  // ============================================================================
  describe('Greek Prompt', () => {
    it('should contain four scoring categories', () => {
      expect(GREEK_GRADING_PROMPT).toContain('MEANING (0-25)')
      expect(GREEK_GRADING_PROMPT).toContain('GRAMMAR (0-25)')
      expect(GREEK_GRADING_PROMPT).toContain('VOCABULARY (0-25)')
      expect(GREEK_GRADING_PROMPT).toContain('ENGLISH (0-25)')
    })

    it('should contain Greek-specific grammar', () => {
      expect(GREEK_GRADING_PROMPT).toContain('aorist')
      expect(GREEK_GRADING_PROMPT).toContain('optative')
      expect(GREEK_GRADING_PROMPT).toContain('participle')
      expect(GREEK_GRADING_PROMPT).toContain('μέν/δέ')
    })

    it('should contain quality tiers', () => {
      expect(GREEK_GRADING_PROMPT).toContain('QUALITY TIERS')
      expect(GREEK_GRADING_PROMPT).toContain('95-100')
      expect(GREEK_GRADING_PROMPT).toContain('85-94')
    })

    it('should contain critical scoring rule for unrelated translations', () => {
      expect(GREEK_GRADING_PROMPT).toContain('CRITICAL SCORING RULE')
      expect(GREEK_GRADING_PROMPT).toContain('0-10')
    })
  })

  // ============================================================================
  // LOGIC PROMPT VALIDATION
  // ============================================================================
  describe('Logic Prompt', () => {
    it('should contain logic-specific evaluation criteria', () => {
      expect(LOGIC_GRADING_PROMPT).toContain('logically correct')
      expect(LOGIC_GRADING_PROMPT).toContain('inference rules')
    })

    it('should contain proof rules', () => {
      expect(LOGIC_GRADING_PROMPT).toContain('Modus Ponens')
      expect(LOGIC_GRADING_PROMPT).toContain('Modus Tollens')
      expect(LOGIC_GRADING_PROMPT).toContain('Hypothetical Syllogism')
      expect(LOGIC_GRADING_PROMPT).toContain('Disjunctive Syllogism')
    })

    it('should contain truth table guidance', () => {
      expect(LOGIC_GRADING_PROMPT).toContain('TRUTH TABLES')
      expect(LOGIC_GRADING_PROMPT).toContain('rows')
    })

    it('should contain scoring guidelines', () => {
      expect(LOGIC_GRADING_PROMPT).toContain('90-100')
      expect(LOGIC_GRADING_PROMPT).toContain('0-19')
    })
  })

  // ============================================================================
  // TRANSLATION PROMPT BUILDER TESTS
  // ============================================================================
  describe('buildTranslationGradingPrompt', () => {
    it('should build Latin prompt correctly', () => {
      const prompt = buildTranslationGradingPrompt(
        'latin',
        'Rex urbem regit',
        'The king rules the city',
        ['The king rules the city.', 'A king governs the city.']
      )

      expect(prompt).toContain('Latin')
      expect(prompt).toContain('Rex urbem regit')
      expect(prompt).toContain('The king rules the city')
      expect(prompt).toContain('1. The king rules the city.')
      expect(prompt).toContain('2. A king governs the city.')
      expect(prompt).toContain('JSON only')
      expect(prompt).toContain('overallScore')
      expect(prompt).toContain('qualityTier')
    })

    it('should build Greek prompt correctly', () => {
      const prompt = buildTranslationGradingPrompt(
        'greek',
        'ὁ ἄνθρωπος λέγει',
        'The man speaks',
        ['The man speaks.', 'The person says.']
      )

      expect(prompt).toContain('Ancient Greek')
      expect(prompt).toContain('ὁ ἄνθρωπος λέγει')
      expect(prompt).toContain('The man speaks')
      expect(prompt).toContain('aorist') // Greek-specific grammar
      expect(prompt).toContain('optative') // Greek-specific grammar
    })

    it('should include example improvements', () => {
      const prompt = buildTranslationGradingPrompt(
        'latin',
        'Test',
        'Test translation',
        ['Expected']
      )

      expect(prompt).toContain('Example improvements')
      expect(prompt).toContain('patrem')
      expect(prompt).toContain('accusative')
      expect(prompt).toContain('vocat')
    })
  })

  // ============================================================================
  // JSON FORMAT TESTS
  // ============================================================================
  describe('JSON Formats', () => {
    it('should have valid grading JSON format', () => {
      expect(GRADING_JSON_FORMAT).toContain('isCorrect')
      expect(GRADING_JSON_FORMAT).toContain('score')
      expect(GRADING_JSON_FORMAT).toContain('grade')
      expect(GRADING_JSON_FORMAT).toContain('feedback')
      expect(GRADING_JSON_FORMAT).toContain('summary')
      expect(GRADING_JSON_FORMAT).toContain('strengths')
      expect(GRADING_JSON_FORMAT).toContain('improvements')
      expect(GRADING_JSON_FORMAT).toContain('questionResults')
    })

    it('should have valid translation JSON format', () => {
      expect(TRANSLATION_JSON_FORMAT).toContain('overallScore')
      expect(TRANSLATION_JSON_FORMAT).toContain('qualityTier')
      expect(TRANSLATION_JSON_FORMAT).toContain('categoryScores')
      expect(TRANSLATION_JSON_FORMAT).toContain('meaning')
      expect(TRANSLATION_JSON_FORMAT).toContain('grammar')
      expect(TRANSLATION_JSON_FORMAT).toContain('vocabulary')
      expect(TRANSLATION_JSON_FORMAT).toContain('english')
    })
  })

  // ============================================================================
  // CONSISTENCY TESTS
  // ============================================================================
  describe('Prompt Consistency', () => {
    it('should have consistent scoring ranges across subjects', () => {
      // All prompts should use 0-100 scoring
      expect(MATH_GRADING_PROMPT).toContain('0-10')
      expect(MATH_GRADING_PROMPT).toContain('85-100')
      
      expect(READING_GRADING_PROMPT).toContain('0-100')
      
      expect(LATIN_GRADING_PROMPT).toContain('0-25')
      expect(LATIN_GRADING_PROMPT).toContain('95-100')
      
      expect(GREEK_GRADING_PROMPT).toContain('0-25')
      expect(GREEK_GRADING_PROMPT).toContain('95-100')
      
      expect(LOGIC_GRADING_PROMPT).toContain('0-19')
      expect(LOGIC_GRADING_PROMPT).toContain('90-100')
    })

    it('should all contain feedback guidance', () => {
      const prompts = [
        MATH_GRADING_PROMPT,
        READING_GRADING_PROMPT,
        LATIN_GRADING_PROMPT,
        GREEK_GRADING_PROMPT,
        LOGIC_GRADING_PROMPT
      ]

      prompts.forEach(prompt => {
        expect(prompt.toLowerCase()).toContain('feedback')
      })
    })

    it('Latin and Greek should have parallel structure', () => {
      // Both should have same categories
      const latinCategories = ['MEANING', 'GRAMMAR', 'VOCABULARY', 'ENGLISH']
      const greekCategories = ['MEANING', 'GRAMMAR', 'VOCABULARY', 'ENGLISH']

      latinCategories.forEach(cat => {
        expect(LATIN_GRADING_PROMPT).toContain(cat)
      })

      greekCategories.forEach(cat => {
        expect(GREEK_GRADING_PROMPT).toContain(cat)
      })

      // Both should have same quality tiers
      const tiers = ['perfect', 'excellent', 'good', 'partial', 'attempted']
      tiers.forEach(tier => {
        expect(LATIN_GRADING_PROMPT).toContain(tier)
        expect(GREEK_GRADING_PROMPT).toContain(tier)
      })
    })
  })
})
