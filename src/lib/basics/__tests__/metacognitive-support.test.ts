/**
 * @jest-environment node
 */

/**
 * Unit tests for the Metacognitive Support System
 *
 * Tests generateMetacognitivePrompts for various subjects, difficulty levels,
 * and metacognitive levels to verify correct prompt generation across phases.
 */

import {
  generateMetacognitivePrompts,
  MetacognitivePrompt,
} from '../metacognitive-support'
import { METACOGNITIVE_THRESHOLDS } from '../constants'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function allPromptPhases(result: {
  preActivity: MetacognitivePrompt[]
  duringActivity: MetacognitivePrompt[]
  postActivity: MetacognitivePrompt[]
}) {
  return {
    pre: result.preActivity,
    during: result.duringActivity,
    post: result.postActivity,
  }
}

// ---------------------------------------------------------------------------
// Basic structure
// ---------------------------------------------------------------------------

describe('generateMetacognitivePrompts', () => {
  describe('basic structure and required prompts', () => {
    it('returns preActivity, duringActivity, and postActivity arrays', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      expect(result).toHaveProperty('preActivity')
      expect(result).toHaveProperty('duringActivity')
      expect(result).toHaveProperty('postActivity')
      expect(Array.isArray(result.preActivity)).toBe(true)
      expect(Array.isArray(result.duringActivity)).toBe(true)
      expect(Array.isArray(result.postActivity)).toBe(true)
    })

    it('always includes base pre-activity prompts', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 1, 0.1)
      expect(result.preActivity.length).toBeGreaterThanOrEqual(3)

      const ids = result.preActivity.map((p) => p.id)
      expect(ids).toContain('activate-prior-knowledge')
      expect(ids).toContain('predict-difficulty')
      expect(ids).toContain('plan-approach')
    })

    it('always includes base during-activity prompts', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 1, 0.1)
      const ids = result.duringActivity.map((p) => p.id)
      expect(ids).toContain('monitor-progress')
      expect(ids).toContain('strategy-check')
    })

    it('always includes base post-activity prompts', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 1, 0.1)
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).toContain('reflect-difficulty')
      expect(ids).toContain('identify-challenges')
      expect(ids).toContain('strategy-effectiveness')
    })
  })

  // ---------------------------------------------------------------------------
  // Prompt field validation
  // ---------------------------------------------------------------------------

  describe('prompt field validation', () => {
    it('every prompt has an id, phase, prompt, purpose, and expectedResponse', () => {
      const result = generateMetacognitivePrompts('math', 'algebra', 5, 0.8)
      const all = [
        ...result.preActivity,
        ...result.duringActivity,
        ...result.postActivity,
      ]

      for (const p of all) {
        expect(p.id).toBeTruthy()
        expect(p.phase).toBeTruthy()
        expect(p.prompt).toBeTruthy()
        expect(p.purpose).toBeTruthy()
        expect(p.expectedResponse).toBeTruthy()
      }
    })

    it('pre-activity prompts have phase set to pre-activity', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.2
      )
      for (const p of result.preActivity) {
        expect(p.phase).toBe('pre-activity')
      }
    })

    it('during-activity prompts have phase set to during-activity', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.2
      )
      for (const p of result.duringActivity) {
        expect(p.phase).toBe('during-activity')
      }
    })

    it('post-activity prompts have phase set to post-activity', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.2
      )
      for (const p of result.postActivity) {
        expect(p.phase).toBe('post-activity')
      }
    })

    it('all prompt ids are unique within a result set', () => {
      const result = generateMetacognitivePrompts('math', 'geometry', 8, 0.9)
      const all = [
        ...result.preActivity,
        ...result.duringActivity,
        ...result.postActivity,
      ]
      const ids = all.map((p) => p.id)
      expect(new Set(ids).size).toBe(ids.length)
    })
  })

  // ---------------------------------------------------------------------------
  // Math subject-specific prompts
  // ---------------------------------------------------------------------------

  describe('math subject-specific prompts', () => {
    it('includes math-sense-check in during-activity for math', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const ids = result.duringActivity.map((p) => p.id)
      expect(ids).toContain('math-sense-check')
    })

    it('includes math-check-work in post-activity for math', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).toContain('math-check-work')
    })

    it('does not include reading-specific prompts for math', () => {
      const result = generateMetacognitivePrompts('math', 'algebra', 5, 0.5)
      const allIds = [
        ...result.duringActivity.map((p) => p.id),
        ...result.postActivity.map((p) => p.id),
      ]
      expect(allIds).not.toContain('reading-comprehension-check')
      expect(allIds).not.toContain('reading-connection')
    })
  })

  // ---------------------------------------------------------------------------
  // Reading subject-specific prompts
  // ---------------------------------------------------------------------------

  describe('reading subject-specific prompts', () => {
    it('includes reading-comprehension-check in during-activity for reading', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.3
      )
      const ids = result.duringActivity.map((p) => p.id)
      expect(ids).toContain('reading-comprehension-check')
    })

    it('includes reading-connection in post-activity for reading', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'vocabulary',
        3,
        0.3
      )
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).toContain('reading-connection')
    })

    it('does not include math-specific prompts for reading', () => {
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        5,
        0.5
      )
      const allIds = [
        ...result.duringActivity.map((p) => p.id),
        ...result.postActivity.map((p) => p.id),
      ]
      expect(allIds).not.toContain('math-sense-check')
      expect(allIds).not.toContain('math-check-work')
    })
  })

  // ---------------------------------------------------------------------------
  // Advanced metacognitive level
  // ---------------------------------------------------------------------------

  describe('advanced metacognitive level prompts', () => {
    it('includes transfer-thinking for students above ADVANCED threshold', () => {
      const aboveThreshold = METACOGNITIVE_THRESHOLDS.ADVANCED + 0.1
      const result = generateMetacognitivePrompts(
        'math',
        'algebra',
        5,
        aboveThreshold
      )
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).toContain('transfer-thinking')
    })

    it('includes alternative-approaches for students above ADVANCED threshold', () => {
      const aboveThreshold = METACOGNITIVE_THRESHOLDS.ADVANCED + 0.1
      const result = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        aboveThreshold
      )
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).toContain('alternative-approaches')
    })

    it('does not include advanced prompts at exactly the ADVANCED threshold', () => {
      const atThreshold = METACOGNITIVE_THRESHOLDS.ADVANCED
      const result = generateMetacognitivePrompts(
        'math',
        'arithmetic',
        2,
        atThreshold
      )
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).not.toContain('transfer-thinking')
      expect(ids).not.toContain('alternative-approaches')
    })

    it('does not include advanced prompts below ADVANCED threshold', () => {
      const belowThreshold = METACOGNITIVE_THRESHOLDS.ADVANCED - 0.1
      const result = generateMetacognitivePrompts(
        'math',
        'geometry',
        4,
        belowThreshold
      )
      const ids = result.postActivity.map((p) => p.id)
      expect(ids).not.toContain('transfer-thinking')
      expect(ids).not.toContain('alternative-approaches')
    })
  })

  // ---------------------------------------------------------------------------
  // Prompt counts comparison
  // ---------------------------------------------------------------------------

  describe('prompt count comparisons', () => {
    it('advanced math students get more post-activity prompts than beginners', () => {
      const beginner = generateMetacognitivePrompts(
        'math',
        'arithmetic',
        3,
        0.1
      )
      const advanced = generateMetacognitivePrompts(
        'math',
        'arithmetic',
        3,
        0.9
      )
      expect(advanced.postActivity.length).toBeGreaterThan(
        beginner.postActivity.length
      )
    })

    it('math and reading have the same number of pre-activity prompts', () => {
      const math = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const reading = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.3
      )
      expect(math.preActivity.length).toBe(reading.preActivity.length)
    })

    it('during-activity prompts include subject-specific additions', () => {
      const math = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const reading = generateMetacognitivePrompts(
        'reading',
        'comprehension',
        3,
        0.3
      )
      // Both should have base (2) + 1 subject-specific = 3
      expect(math.duringActivity.length).toBe(3)
      expect(reading.duringActivity.length).toBe(3)
    })
  })

  // ---------------------------------------------------------------------------
  // Various difficulty levels
  // ---------------------------------------------------------------------------

  describe('difficulty levels', () => {
    it('generates prompts for low difficulty', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 1, 0.3)
      expect(result.preActivity.length).toBeGreaterThan(0)
      expect(result.duringActivity.length).toBeGreaterThan(0)
      expect(result.postActivity.length).toBeGreaterThan(0)
    })

    it('generates prompts for high difficulty', () => {
      const result = generateMetacognitivePrompts('math', 'algebra', 12, 0.3)
      expect(result.preActivity.length).toBeGreaterThan(0)
      expect(result.duringActivity.length).toBeGreaterThan(0)
      expect(result.postActivity.length).toBeGreaterThan(0)
    })

    it('prompt content does not change with difficulty alone', () => {
      // The current implementation does not vary prompts by difficulty level
      // (only by subject and metacognitive level)
      const low = generateMetacognitivePrompts('math', 'arithmetic', 1, 0.3)
      const high = generateMetacognitivePrompts('math', 'arithmetic', 12, 0.3)
      expect(low.preActivity.length).toBe(high.preActivity.length)
      expect(low.duringActivity.length).toBe(high.duringActivity.length)
      expect(low.postActivity.length).toBe(high.postActivity.length)
    })
  })

  // ---------------------------------------------------------------------------
  // Follow-up questions and adaptive conditions
  // ---------------------------------------------------------------------------

  describe('optional prompt fields', () => {
    it('activate-prior-knowledge has followUpQuestions', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const prompt = result.preActivity.find(
        (p) => p.id === 'activate-prior-knowledge'
      )
      expect(prompt).toBeDefined()
      expect(prompt!.followUpQuestions).toBeDefined()
      expect(prompt!.followUpQuestions!.length).toBeGreaterThan(0)
    })

    it('monitor-progress has adaptiveConditions', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const prompt = result.duringActivity.find(
        (p) => p.id === 'monitor-progress'
      )
      expect(prompt).toBeDefined()
      expect(prompt!.adaptiveConditions).toBeDefined()
      expect(prompt!.adaptiveConditions!.length).toBeGreaterThan(0)
    })

    it('strategy-check has adaptiveConditions', () => {
      const result = generateMetacognitivePrompts('math', 'arithmetic', 3, 0.3)
      const prompt = result.duringActivity.find(
        (p) => p.id === 'strategy-check'
      )
      expect(prompt).toBeDefined()
      expect(prompt!.adaptiveConditions).toBeDefined()
      expect(prompt!.adaptiveConditions!.length).toBeGreaterThan(0)
    })
  })
})
