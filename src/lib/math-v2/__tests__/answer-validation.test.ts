/**
 * Tests for Math Answer Validation Engine
 */

import { validateAnswer, areEquivalent, validateAnswers } from '../answer-validation'
import { normalizeExpression, compareExpressions, parseLatex } from '../expression-parser'

describe('Answer Validation', () => {
  describe('validateAnswer', () => {
    describe('Equation to value matching', () => {
      it('should match "x = 4" with "4"', () => {
        const result = validateAnswer('x = 4', '4')
        expect(result.isCorrect).toBe(true)
        expect(result.matchType).toBe('format')
      })

      it('should match "4" with "x = 4"', () => {
        const result = validateAnswer('4', 'x = 4')
        expect(result.isCorrect).toBe(true)
        expect(result.matchType).toBe('format')
      })

      it('should match "x = 4" with "4.0"', () => {
        const result = validateAnswer('x = 4', '4.0')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "y = -3" with "-3"', () => {
        const result = validateAnswer('y = -3', '-3')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Fraction and decimal equivalence', () => {
      it('should match "1/2" with "0.5"', () => {
        const result = validateAnswer('1/2', '0.5')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "0.5" with "1/2"', () => {
        const result = validateAnswer('0.5', '1/2')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "1/2" with "2/4"', () => {
        const result = validateAnswer('1/2', '2/4')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "3/4" with "0.75"', () => {
        const result = validateAnswer('3/4', '0.75')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "1/3" approximately with "0.333333"', () => {
        const result = validateAnswer('1/3', '0.333333', { precision: 1e-5 })
        expect(result.isCorrect).toBe(true)
      })

      it('should match negative fractions "-1/2" with "-0.5"', () => {
        const result = validateAnswer('-1/2', '-0.5')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Power notation equivalence', () => {
      it('should match "x^2" with "x²"', () => {
        const result = validateAnswer('x^2', 'x²')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "x²" with "x^2"', () => {
        const result = validateAnswer('x²', 'x^2')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "x³" with "x^3"', () => {
        const result = validateAnswer('x³', 'x^3')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "2^3" with "8"', () => {
        const result = validateAnswer('2^3', '8')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "x**2" with "x^2"', () => {
        const result = validateAnswer('x**2', 'x^2')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Square root equivalence', () => {
      it('should match "√4" with "2"', () => {
        const result = validateAnswer('√4', '2')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "2" with "√4"', () => {
        const result = validateAnswer('2', '√4')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "sqrt(4)" with "2"', () => {
        const result = validateAnswer('sqrt(4)', '2')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "√9" with "3"', () => {
        const result = validateAnswer('√9', '3')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "√2" approximately with "1.41421"', () => {
        const result = validateAnswer('√2', '1.41421', { precision: 1e-4 })
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Inequality equivalence', () => {
      it('should match "x > 3" with "3 < x"', () => {
        const result = validateAnswer('x > 3', '3 < x')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "3 < x" with "x > 3"', () => {
        const result = validateAnswer('3 < x', 'x > 3')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "x >= 5" with "5 <= x"', () => {
        const result = validateAnswer('x >= 5', '5 <= x')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "y ≤ 10" with "y <= 10"', () => {
        const result = validateAnswer('y ≤ 10', 'y <= 10')
        expect(result.isCorrect).toBe(true)
      })

      it('should not match "x > 3" with "x < 3"', () => {
        const result = validateAnswer('x > 3', 'x < 3')
        expect(result.isCorrect).toBe(false)
      })
    })

    describe('Commutative property', () => {
      it('should match "x + 1" with "1 + x"', () => {
        const result = validateAnswer('x + 1', '1 + x')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "a + b + c" with "c + a + b"', () => {
        const result = validateAnswer('a + b + c', 'c + a + b')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "2 * x" with "x * 2"', () => {
        const result = validateAnswer('2 * x', 'x * 2')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "ab" with "ba" (implicit multiplication)', () => {
        const result = validateAnswer('ab', 'ba')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Unicode character normalization', () => {
      it('should handle minus sign variations', () => {
        // Regular hyphen-minus
        const result1 = validateAnswer('-5', '-5')
        expect(result1.isCorrect).toBe(true)

        // Unicode minus sign
        const result2 = validateAnswer('−5', '-5')
        expect(result2.isCorrect).toBe(true)
      })

      it('should handle multiplication sign variations', () => {
        const result1 = validateAnswer('2 × 3', '2 * 3')
        expect(result1.isCorrect).toBe(true)

        const result2 = validateAnswer('2 · 3', '2 * 3')
        expect(result2.isCorrect).toBe(true)
      })

      it('should handle pi symbol', () => {
        const result = validateAnswer('π', 'pi')
        expect(result.isCorrect).toBe(true)
      })

      it('should evaluate π correctly', () => {
        const result = validateAnswer('π', '3.14159', { precision: 1e-4 })
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('LaTeX parsing', () => {
      it('should handle \\frac{a}{b} notation', () => {
        const result = validateAnswer('\\frac{1}{2}', '0.5')
        expect(result.isCorrect).toBe(true)
      })

      it('should handle \\sqrt{x} notation', () => {
        const result = validateAnswer('\\sqrt{4}', '2')
        expect(result.isCorrect).toBe(true)
      })

      it('should handle \\pi', () => {
        const result = validateAnswer('\\pi', 'pi')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Numeric precision', () => {
      it('should match within default precision', () => {
        const result = validateAnswer('0.3333333333', '1/3', { precision: 1e-9 })
        expect(result.isCorrect).toBe(true)
      })

      it('should fail when outside precision', () => {
        const result = validateAnswer('0.33', '1/3', { precision: 1e-9 })
        expect(result.isCorrect).toBe(false)
      })

      it('should match with custom precision', () => {
        const result = validateAnswer('0.33', '1/3', { precision: 0.01 })
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Edge cases', () => {
      it('should handle empty strings', () => {
        const result = validateAnswer('', '5')
        expect(result.isCorrect).toBe(false)
        expect(result.feedback).toBe('Answer cannot be empty')
      })

      it('should handle whitespace', () => {
        const result = validateAnswer('  5  ', '5')
        expect(result.isCorrect).toBe(true)
      })
      
      it('should handle coordinate pairs with varying whitespace', () => {
        // User enters "(-1, 2)" (with space after comma)
        // Correct answer is "(-1,2)" (without space)
        const result = validateAnswer('(-1, 2)', '(-1,2)')
        expect(result.isCorrect).toBe(true)
      })
      
      it('should match coordinate pairs regardless of spacing', () => {
        const result = validateAnswer('( -1 , 2 )', '(-1,2)')
        expect(result.isCorrect).toBe(true)
      })

      it('should handle case insensitivity for variables', () => {
        const result = validateAnswer('X = 4', 'x = 4')
        expect(result.isCorrect).toBe(true)
      })

      it('should match "0" with "0.0"', () => {
        const result = validateAnswer('0', '0.0')
        expect(result.isCorrect).toBe(true)
      })

      it('should handle negative numbers', () => {
        const result = validateAnswer('-7', '-7')
        expect(result.isCorrect).toBe(true)
      })
    })

    describe('Feedback generation', () => {
      it('should provide feedback for incorrect answers', () => {
        const result = validateAnswer('5', '10')
        expect(result.isCorrect).toBe(false)
        expect(result.feedback).toBeDefined()
      })

      it('should provide equation format hint', () => {
        const result = validateAnswer('4', 'x = 5')
        expect(result.isCorrect).toBe(false)
      })
    })

    describe('Debug mode', () => {
      it('should include debug info when enabled', () => {
        const result = validateAnswer('5', '5', { includeDebug: true })
        expect(result.debug).toBeDefined()
        expect(result.debug?.checksPerformed).toContain('parsing')
      })

      it('should not include debug info by default', () => {
        const result = validateAnswer('5', '5')
        expect(result.debug).toBeUndefined()
      })
    })
  })

  describe('areEquivalent', () => {
    it('should return true for equivalent expressions', () => {
      expect(areEquivalent('1/2', '0.5')).toBe(true)
      expect(areEquivalent('x + 1', '1 + x')).toBe(true)
      expect(areEquivalent('√4', '2')).toBe(true)
    })

    it('should return false for non-equivalent expressions', () => {
      expect(areEquivalent('1/2', '0.6')).toBe(false)
      expect(areEquivalent('x + 1', 'x + 2')).toBe(false)
    })
  })

  describe('validateAnswers (batch)', () => {
    it('should validate multiple answers', () => {
      const results = validateAnswers([
        { userAnswer: '4', correctAnswer: 'x = 4' },
        { userAnswer: '0.5', correctAnswer: '1/2' },
        { userAnswer: '5', correctAnswer: '10' },
      ])

      expect(results).toHaveLength(3)
      expect(results[0].isCorrect).toBe(true)
      expect(results[1].isCorrect).toBe(true)
      expect(results[2].isCorrect).toBe(false)
    })
  })
})

describe('Expression Parser', () => {
  describe('normalizeExpression', () => {
    it('should normalize Unicode minus signs', () => {
      expect(normalizeExpression('−5')).toBe('-5')
    })

    it('should normalize superscript numbers', () => {
      expect(normalizeExpression('x²')).toBe('x^2')
      expect(normalizeExpression('x³')).toBe('x^3')
    })

    it('should normalize sqrt symbol', () => {
      expect(normalizeExpression('√4')).toBe('sqrt(4)')
    })

    it('should normalize pi symbol', () => {
      expect(normalizeExpression('π')).toBe('pi')
    })

    it('should normalize multiplication symbols', () => {
      expect(normalizeExpression('2×3')).toBe('2*3')
      expect(normalizeExpression('2·3')).toBe('2*3')
    })

    it('should handle implicit multiplication', () => {
      expect(normalizeExpression('2x')).toBe('2*x')
    })

    it('should normalize inequality symbols', () => {
      expect(normalizeExpression('x≤5')).toBe('x<=5')
      expect(normalizeExpression('x≥5')).toBe('x>=5')
    })

    it('should lowercase variables', () => {
      expect(normalizeExpression('X + Y')).toBe('x+y')
    })

    it('should handle empty input', () => {
      expect(normalizeExpression('')).toBe('')
    })
  })

  describe('compareExpressions', () => {
    it('should detect exact matches', () => {
      const result = compareExpressions('x + 1', 'x + 1')
      expect(result.equivalent).toBe(true)
      expect(result.matchType).toBe('exact')
    })

    it('should detect numeric equivalence', () => {
      const result = compareExpressions('0.5', '1/2')
      expect(result.equivalent).toBe(true)
      expect(result.matchType).toBe('numeric')
    })

    it('should detect algebraic equivalence', () => {
      const result = compareExpressions('x + y', 'y + x')
      expect(result.equivalent).toBe(true)
      expect(result.matchType).toBe('algebraic')
    })

    it('should detect inequality flip equivalence', () => {
      const result = compareExpressions('x > 3', '3 < x')
      expect(result.equivalent).toBe(true)
    })

    it('should return false for non-equivalent expressions', () => {
      const result = compareExpressions('x + 1', 'x + 2')
      expect(result.equivalent).toBe(false)
      expect(result.matchType).toBe('none')
    })
  })

  describe('parseLatex', () => {
    it('should parse numeric expressions', () => {
      const result = parseLatex('42')
      expect(result.type).toBe('numeric')
      expect(result.numericValue).toBe(42)
      expect(result.variables).toHaveLength(0)
    })

    it('should parse algebraic expressions', () => {
      const result = parseLatex('2x + 3')
      expect(result.type).toBe('algebraic')
      expect(result.variables).toContain('x')
    })

    it('should parse equations', () => {
      const result = parseLatex('x = 5')
      expect(result.type).toBe('equation')
    })

    it('should parse inequalities', () => {
      const result = parseLatex('x > 3')
      expect(result.type).toBe('inequality')
    })

    it('should evaluate sqrt', () => {
      const result = parseLatex('sqrt(9)')
      expect(result.numericValue).toBe(3)
    })

    it('should evaluate pi', () => {
      const result = parseLatex('pi')
      expect(result.numericValue).toBeCloseTo(Math.PI, 10)
    })

    it('should handle fractions', () => {
      const result = parseLatex('\\frac{1}{2}')
      expect(result.numericValue).toBe(0.5)
    })
  })
})
