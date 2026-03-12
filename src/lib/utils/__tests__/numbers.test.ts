import {
  toNumber,
  toInteger,
  isValidNumber,
  toPercentage,
  formatPercentage,
  clamp,
  calculateAverage,
  round,
} from '../numbers'

describe('toNumber', () => {
  it('returns number values directly', () => {
    expect(toNumber(42)).toBe(42)
    expect(toNumber(3.14)).toBe(3.14)
    expect(toNumber(-7)).toBe(-7)
    expect(toNumber(0)).toBe(0)
  })

  it('parses numeric strings', () => {
    expect(toNumber('42')).toBe(42)
    expect(toNumber('3.14')).toBe(3.14)
    expect(toNumber('-7')).toBe(-7)
  })

  it('returns fallback for NaN', () => {
    expect(toNumber(NaN)).toBe(0)
    expect(toNumber(NaN, 5)).toBe(5)
  })

  it('returns fallback for non-numeric strings', () => {
    expect(toNumber('abc')).toBe(0)
    expect(toNumber('abc', 10)).toBe(10)
    expect(toNumber('')).toBe(0)
  })

  it('returns fallback for non-number/string types', () => {
    expect(toNumber(null)).toBe(0)
    expect(toNumber(undefined)).toBe(0)
    expect(toNumber(true)).toBe(0)
    expect(toNumber({})).toBe(0)
    expect(toNumber([])).toBe(0)
  })

  it('accepts Infinity as a valid number', () => {
    expect(toNumber(Infinity)).toBe(Infinity)
    expect(toNumber(-Infinity)).toBe(-Infinity)
  })
})

describe('toInteger', () => {
  it('floors decimal numbers', () => {
    expect(toInteger(3.9)).toBe(3)
    expect(toInteger(3.1)).toBe(3)
    expect(toInteger(-1.5)).toBe(-2)
  })

  it('parses integer strings', () => {
    expect(toInteger('42')).toBe(42)
    expect(toInteger('3.9')).toBe(3)
  })

  it('returns fallback for invalid input', () => {
    expect(toInteger('abc')).toBe(0)
    expect(toInteger(NaN)).toBe(0)
    expect(toInteger(null, 5)).toBe(5)
  })
})

describe('isValidNumber', () => {
  it('returns true for valid numbers', () => {
    expect(isValidNumber(42)).toBe(true)
    expect(isValidNumber(0)).toBe(true)
    expect(isValidNumber(-3.14)).toBe(true)
  })

  it('returns false for NaN and Infinity', () => {
    expect(isValidNumber(NaN)).toBe(false)
    expect(isValidNumber(Infinity)).toBe(false)
    expect(isValidNumber(-Infinity)).toBe(false)
  })

  it('returns false for non-number types', () => {
    expect(isValidNumber('42')).toBe(false)
    expect(isValidNumber(null)).toBe(false)
    expect(isValidNumber(undefined)).toBe(false)
  })
})

describe('toPercentage', () => {
  it('converts decimals to percentage', () => {
    expect(toPercentage(0.75)).toBe(75)
    expect(toPercentage(1)).toBe(100)
    expect(toPercentage(0)).toBe(0)
  })

  it('rounds to specified decimal places', () => {
    expect(toPercentage(0.7536, 1)).toBe(75.4)
    expect(toPercentage(0.7536, 2)).toBe(75.36)
  })

  it('rounds correctly with no decimals', () => {
    expect(toPercentage(0.755)).toBe(76)
    expect(toPercentage(0.754)).toBe(75)
  })
})

describe('formatPercentage', () => {
  it('formats as percentage string', () => {
    expect(formatPercentage(0.75)).toBe('75%')
    expect(formatPercentage(1)).toBe('100%')
    expect(formatPercentage(0)).toBe('0%')
  })

  it('includes decimal places when specified', () => {
    expect(formatPercentage(0.7536, 1)).toBe('75.4%')
  })
})

describe('clamp', () => {
  it('clamps values within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns boundary values when equal', () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })
})

describe('calculateAverage', () => {
  it('calculates correct average', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2)
    expect(calculateAverage([10, 20])).toBe(15)
  })

  it('returns 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0)
  })

  it('handles single element', () => {
    expect(calculateAverage([42])).toBe(42)
  })
})

describe('round', () => {
  it('rounds to nearest integer', () => {
    expect(round(3.5)).toBe(4)
    expect(round(3.4)).toBe(3)
    expect(round(-1.5)).toBe(-1)
  })
})
