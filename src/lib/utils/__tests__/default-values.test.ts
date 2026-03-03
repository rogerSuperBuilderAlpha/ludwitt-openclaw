import {
  defaultToArray,
  defaultToObject,
  defaultToZero,
  defaultToString,
  defaultToNull,
  defaultToUndefined,
} from '../default-values'

describe('defaultToArray', () => {
  it('should return the array when given a valid array', () => {
    expect(defaultToArray([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should return an empty array for null', () => {
    expect(defaultToArray(null)).toEqual([])
  })

  it('should return an empty array for undefined', () => {
    expect(defaultToArray(undefined)).toEqual([])
  })

  it('should return an empty array as-is', () => {
    expect(defaultToArray([])).toEqual([])
  })

  it('should preserve array with objects', () => {
    const arr = [{ a: 1 }, { b: 2 }]
    expect(defaultToArray(arr)).toBe(arr)
  })
})

describe('defaultToObject', () => {
  it('should return the object when given a valid object', () => {
    const obj = { key: 'value' }
    expect(defaultToObject(obj)).toBe(obj)
  })

  it('should return an empty object for null', () => {
    expect(defaultToObject(null)).toEqual({})
  })

  it('should return an empty object for undefined', () => {
    expect(defaultToObject(undefined)).toEqual({})
  })

  it('should return an empty object as-is', () => {
    const obj = {}
    expect(defaultToObject(obj)).toBe(obj)
  })
})

describe('defaultToZero', () => {
  it('should return the number when given a valid number', () => {
    expect(defaultToZero(42)).toBe(42)
  })

  it('should return 0 for null', () => {
    expect(defaultToZero(null)).toBe(0)
  })

  it('should return 0 for undefined', () => {
    expect(defaultToZero(undefined)).toBe(0)
  })

  it('should return 0 for zero (falsy but valid)', () => {
    // Note: the implementation uses || so 0 becomes 0 anyway
    expect(defaultToZero(0)).toBe(0)
  })

  it('should return negative numbers as-is', () => {
    expect(defaultToZero(-5)).toBe(-5)
  })

  it('should handle NaN (falsy) by returning 0', () => {
    // NaN is falsy, so || 0 returns 0
    expect(defaultToZero(NaN)).toBe(0)
  })
})

describe('defaultToString', () => {
  it('should return the string when given a valid string', () => {
    expect(defaultToString('hello')).toBe('hello')
  })

  it('should return empty string for null', () => {
    expect(defaultToString(null)).toBe('')
  })

  it('should return empty string for undefined', () => {
    expect(defaultToString(undefined)).toBe('')
  })

  it('should return empty string for empty string input', () => {
    expect(defaultToString('')).toBe('')
  })

  it('should handle strings with whitespace', () => {
    expect(defaultToString('  ')).toBe('  ')
  })
})

describe('defaultToNull', () => {
  it('should return the value when given a valid value', () => {
    expect(defaultToNull('hello')).toBe('hello')
  })

  it('should return null for null', () => {
    expect(defaultToNull(null)).toBeNull()
  })

  it('should return null for undefined (coalesces undefined to null)', () => {
    expect(defaultToNull(undefined)).toBeNull()
  })

  it('should return 0 as-is (not null)', () => {
    expect(defaultToNull(0)).toBe(0)
  })

  it('should return empty string as-is (not null)', () => {
    expect(defaultToNull('')).toBe('')
  })

  it('should return false as-is (not null)', () => {
    expect(defaultToNull(false)).toBe(false)
  })
})

describe('defaultToUndefined', () => {
  it('should return the value when given a valid value', () => {
    expect(defaultToUndefined('hello')).toBe('hello')
  })

  it('should return undefined for undefined', () => {
    expect(defaultToUndefined(undefined)).toBeUndefined()
  })

  it('should return undefined for null (coalesces null to undefined)', () => {
    // null ?? undefined => undefined (because null triggers ??)
    expect(defaultToUndefined(null)).toBeUndefined()
  })

  it('should return 0 as-is (not undefined)', () => {
    expect(defaultToUndefined(0)).toBe(0)
  })

  it('should return empty string as-is (not undefined)', () => {
    expect(defaultToUndefined('')).toBe('')
  })

  it('should return false as-is (not undefined)', () => {
    expect(defaultToUndefined(false)).toBe(false)
  })
})
