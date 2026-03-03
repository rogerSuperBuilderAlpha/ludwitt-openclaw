/**
 * @jest-environment node
 */

/**
 * Unit tests for pure validation functions (no AI/Firebase dependencies)
 *
 * Only tests normalizeMathAnswer, areNumbersEqual, and parseMathValue.
 * Does NOT test validateMathAnswer, validateReadingAnswer, validateMathAnswerWithAI,
 * or validateShortAnswer as those depend on Anthropic and Firebase.
 */

jest.mock('@anthropic-ai/sdk', () => jest.fn())
jest.mock('@/lib/basics/config', () => ({
  isAIValidationAvailable: jest.fn(() => false),
  debugLog: jest.fn(),
}))
jest.mock('@/lib/ai/providers', () => ({
  getDefaultModelForTier: jest.fn(),
  getTaskConfig: jest.fn(),
}))
jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}))

import {
  normalizeMathAnswer,
  areNumbersEqual,
  parseMathValue,
} from '../validation'

// ---------------------------------------------------------------------------
// normalizeMathAnswer
// ---------------------------------------------------------------------------

describe('normalizeMathAnswer', () => {
  it('converts to lowercase', () => {
    expect(normalizeMathAnswer('ABC')).toBe('abc')
  })

  it('removes all whitespace', () => {
    expect(normalizeMathAnswer('  1 2  3  ')).toBe('123')
  })

  it('removes commas', () => {
    expect(normalizeMathAnswer('1,000,000')).toBe('1000000')
  })

  it('removes leading plus sign', () => {
    expect(normalizeMathAnswer('+42')).toBe('42')
  })

  it('does not remove minus sign', () => {
    expect(normalizeMathAnswer('-5')).toBe('-5')
  })

  it('handles combination of transformations', () => {
    expect(normalizeMathAnswer(' + 1, 234 ')).toBe('1234')
  })

  it('handles empty string', () => {
    expect(normalizeMathAnswer('')).toBe('')
  })

  it('handles string with only whitespace', () => {
    expect(normalizeMathAnswer('   ')).toBe('')
  })

  it('handles text answers', () => {
    expect(normalizeMathAnswer('Perpendicular Lines')).toBe(
      'perpendicularlines'
    )
  })
})

// ---------------------------------------------------------------------------
// areNumbersEqual
// ---------------------------------------------------------------------------

describe('areNumbersEqual', () => {
  it('returns true for identical integers', () => {
    expect(areNumbersEqual(5, 5)).toBe(true)
  })

  it('returns true for identical decimals', () => {
    expect(areNumbersEqual(3.14, 3.14)).toBe(true)
  })

  it('returns true for values within default tolerance', () => {
    expect(areNumbersEqual(1.00001, 1.00005)).toBe(true)
  })

  it('returns false for values outside default tolerance', () => {
    expect(areNumbersEqual(1.0, 1.001)).toBe(false)
  })

  it('handles floating point representation issues', () => {
    // 0.1 + 0.2 is not exactly 0.3 in floating point
    expect(areNumbersEqual(0.1 + 0.2, 0.3)).toBe(true)
  })

  it('returns true for negatives equal within tolerance', () => {
    expect(areNumbersEqual(-3.0, -3.00005)).toBe(true)
  })

  it('returns false for different signs', () => {
    expect(areNumbersEqual(1, -1)).toBe(false)
  })

  it('accepts custom tolerance', () => {
    expect(areNumbersEqual(1.0, 1.5, 1.0)).toBe(true)
    expect(areNumbersEqual(1.0, 1.5, 0.1)).toBe(false)
  })

  it('returns true when both are 0', () => {
    expect(areNumbersEqual(0, 0)).toBe(true)
  })

  it('returns true for 0 and a very small number within tolerance', () => {
    expect(areNumbersEqual(0, 0.00001)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// parseMathValue
// ---------------------------------------------------------------------------

describe('parseMathValue', () => {
  describe('basic numbers', () => {
    it('parses a positive integer', () => {
      expect(parseMathValue('42')).toBe(42)
    })

    it('parses a negative integer', () => {
      expect(parseMathValue('-7')).toBe(-7)
    })

    it('parses a decimal', () => {
      expect(parseMathValue('3.14')).toBe(3.14)
    })

    it('parses a negative decimal', () => {
      expect(parseMathValue('-2.5')).toBe(-2.5)
    })

    it('parses zero', () => {
      expect(parseMathValue('0')).toBe(0)
    })
  })

  describe('percentages', () => {
    it('parses a percentage as a decimal', () => {
      expect(parseMathValue('50%')).toBe(0.5)
    })

    it('parses 100%', () => {
      expect(parseMathValue('100%')).toBe(1.0)
    })

    it('parses a decimal percentage', () => {
      expect(parseMathValue('12.5%')).toBe(0.125)
    })

    it('parses 0%', () => {
      expect(parseMathValue('0%')).toBe(0)
    })

    it('parses negative percentage', () => {
      expect(parseMathValue('-25%')).toBe(-0.25)
    })
  })

  describe('fractions', () => {
    it('parses a simple fraction', () => {
      expect(parseMathValue('1/2')).toBe(0.5)
    })

    it('parses a fraction resulting in repeating decimal', () => {
      expect(parseMathValue('1/3')).toBeCloseTo(1 / 3)
    })

    it('parses a negative fraction', () => {
      expect(parseMathValue('-3/4')).toBe(-0.75)
    })

    it('parses a positive-signed fraction', () => {
      expect(parseMathValue('+3/4')).toBe(0.75)
    })

    it('returns null for division by zero', () => {
      expect(parseMathValue('5/0')).toBeNull()
    })
  })

  describe('mixed numbers', () => {
    it('parses a mixed number', () => {
      expect(parseMathValue('2 1/4')).toBe(2.25)
    })

    it('parses a negative mixed number', () => {
      expect(parseMathValue('-3 1/2')).toBe(-3.5)
    })

    it('parses a mixed number with large whole part', () => {
      expect(parseMathValue('10 3/8')).toBe(10.375)
    })

    it('returns null for mixed number with zero denominator', () => {
      expect(parseMathValue('2 1/0')).toBeNull()
    })
  })

  describe('edge cases', () => {
    it('returns null for empty string', () => {
      expect(parseMathValue('')).toBeNull()
    })

    it('returns null for whitespace only', () => {
      expect(parseMathValue('   ')).toBeNull()
    })

    it('returns null for non-numeric text', () => {
      expect(parseMathValue('abc')).toBeNull()
    })

    it('returns null for Infinity', () => {
      expect(parseMathValue('Infinity')).toBeNull()
    })

    it('returns null for NaN string', () => {
      expect(parseMathValue('NaN')).toBeNull()
    })

    it('trims leading/trailing whitespace before parsing', () => {
      expect(parseMathValue('  42  ')).toBe(42)
    })

    it('handles string with just a decimal point', () => {
      // parseFloat('.') returns NaN
      expect(parseMathValue('.')).toBeNull()
    })
  })
})
