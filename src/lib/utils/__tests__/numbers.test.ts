import {
  toNumber,
  toInteger,
  isValidNumber,
  toPercentage,
  formatPercentage,
  clamp,
  formatNumber,
  calculateAverage,
  round,
} from '../numbers'

describe('toNumber', () => {
  it('returns the number when given a valid number', () => {
    expect(toNumber(42)).toBe(42)
    expect(toNumber(3.14)).toBe(3.14)
    expect(toNumber(-7)).toBe(-7)
    expect(toNumber(0)).toBe(0)
  })

  it('returns fallback for NaN number', () => {
    expect(toNumber(NaN)).toBe(0)
    expect(toNumber(NaN, 5)).toBe(5)
  })

  it('parses valid numeric strings', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('3.14')).toBe(3.14)
    expect(toNumber('-7')).toBe(-7)
    expect(toNumber('0')).toBe(0)
    expect(toNumber('100.5')).toBe(100.5)
  })

  it('returns fallback for non-numeric strings', () => {
    expect(toNumber('abc')).toBe(0)
    expect(toNumber('')).toBe(0)
    expect(toNumber('abc', 10)).toBe(10)
  })

  it('returns fallback for non-number/non-string types', () => {
    expect(toNumber(null)).toBe(0)
    expect(toNumber(undefined)).toBe(0)
    expect(toNumber(true)).toBe(0)
    expect(toNumber(false)).toBe(0)
    expect(toNumber({})).toBe(0)
    expect(toNumber([])).toBe(0)
  })

  it('uses custom fallback', () => {
    expect(toNumber(null, 99)).toBe(99)
    expect(toNumber(undefined, -1)).toBe(-1)
  })
})

describe('toInteger', () => {
  it('returns floored integer for valid numbers', () => {
    expect(toInteger(42)).toBe(42)
    expect(toInteger(3.9)).toBe(3)
    expect(toInteger(3.1)).toBe(3)
    expect(toInteger(-2.5)).toBe(-3)
    expect(toInteger(0)).toBe(0)
  })

  it('returns fallback for NaN number', () => {
    expect(toInteger(NaN)).toBe(0)
    expect(toInteger(NaN, 5)).toBe(5)
  })

  it('parses valid integer strings', () => {
    expect(toInteger('42')).toBe(42)
    expect(toInteger('3.9')).toBe(3)
    expect(toInteger('-7')).toBe(-7)
    expect(toInteger('0')).toBe(0)
  })

  it('returns fallback for non-numeric strings', () => {
    expect(toInteger('abc')).toBe(0)
    expect(toInteger('', 10)).toBe(10)
  })

  it('returns fallback for non-number/non-string types', () => {
    expect(toInteger(null)).toBe(0)
    expect(toInteger(undefined)).toBe(0)
    expect(toInteger(true)).toBe(0)
    expect(toInteger({})).toBe(0)
  })

  it('uses custom fallback', () => {
    expect(toInteger(null, 7)).toBe(7)
  })
})

describe('isValidNumber', () => {
  it('returns true for valid finite numbers', () => {
    expect(isValidNumber(0)).toBe(true)
    expect(isValidNumber(42)).toBe(true)
    expect(isValidNumber(-3.14)).toBe(true)
    expect(isValidNumber(Number.MAX_SAFE_INTEGER)).toBe(true)
  })

  it('returns false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false)
  })

  it('returns false for Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false)
    expect(isValidNumber(-Infinity)).toBe(false)
  })

  it('returns false for non-number types', () => {
    expect(isValidNumber('42')).toBe(false)
    expect(isValidNumber(null)).toBe(false)
    expect(isValidNumber(undefined)).toBe(false)
    expect(isValidNumber(true)).toBe(false)
    expect(isValidNumber({})).toBe(false)
  })
})

describe('toPercentage', () => {
  it('converts decimal to percentage with 0 decimals by default', () => {
    expect(toPercentage(0.75)).toBe(75)
    expect(toPercentage(1)).toBe(100)
    expect(toPercentage(0)).toBe(0)
    expect(toPercentage(0.5)).toBe(50)
  })

  it('rounds to nearest integer with 0 decimals', () => {
    expect(toPercentage(0.756)).toBe(76)
    expect(toPercentage(0.754)).toBe(75)
  })

  it('supports custom decimal places', () => {
    expect(toPercentage(0.756, 1)).toBe(75.6)
    expect(toPercentage(0.7567, 2)).toBe(75.67)
  })

  it('handles edge values', () => {
    expect(toPercentage(0.001)).toBe(0)
    expect(toPercentage(0.001, 1)).toBe(0.1)
    expect(toPercentage(0.999)).toBe(100)
    expect(toPercentage(0.999, 1)).toBe(99.9)
  })
})

describe('formatPercentage', () => {
  it('formats as percentage string', () => {
    expect(formatPercentage(0.75)).toBe('75%')
    expect(formatPercentage(1)).toBe('100%')
    expect(formatPercentage(0)).toBe('0%')
  })

  it('supports custom decimals', () => {
    expect(formatPercentage(0.756, 1)).toBe('75.6%')
  })
})

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })

  it('clamps to min when value is below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(-100, -50, 50)).toBe(-50)
  })

  it('clamps to max when value is above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(100, -50, 50)).toBe(50)
  })
})

describe('formatNumber', () => {
  it('formats numbers with locale separators', () => {
    // toLocaleString output depends on environment locale
    expect(formatNumber(0)).toBe('0')
    expect(typeof formatNumber(1000)).toBe('string')
    expect(formatNumber(1000).length).toBeGreaterThan(3) // has separator
  })

  it('handles negative numbers', () => {
    const result = formatNumber(-1000)
    expect(result).toContain('1')
    expect(result).toContain('000')
  })
})

describe('calculateAverage', () => {
  it('calculates average of numbers', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2)
    expect(calculateAverage([10, 20])).toBe(15)
    expect(calculateAverage([100])).toBe(100)
  })

  it('returns 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0)
  })

  it('handles decimal values', () => {
    expect(calculateAverage([1.5, 2.5])).toBe(2)
  })

  it('handles negative values', () => {
    expect(calculateAverage([-10, 10])).toBe(0)
  })
})

describe('round', () => {
  it('rounds to nearest integer', () => {
    expect(round(3.5)).toBe(4)
    expect(round(3.4)).toBe(3)
    expect(round(3.0)).toBe(3)
    expect(round(-2.5)).toBe(-2)
    expect(round(-2.6)).toBe(-3)
  })

  it('returns integer unchanged', () => {
    expect(round(5)).toBe(5)
    expect(round(0)).toBe(0)
  })
})
