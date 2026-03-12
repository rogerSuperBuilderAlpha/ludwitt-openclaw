import {
  defaultToArray,
  defaultToObject,
  defaultToZero,
  defaultToString,
  defaultToNull,
  defaultToUndefined,
} from '../default-values'

describe('defaultToArray', () => {
  it('returns the array when provided', () => {
    expect(defaultToArray([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('returns empty array for null', () => {
    expect(defaultToArray(null)).toEqual([])
  })

  it('returns empty array for undefined', () => {
    expect(defaultToArray(undefined)).toEqual([])
  })
})

describe('defaultToObject', () => {
  it('returns the object when provided', () => {
    expect(defaultToObject({ a: 1 })).toEqual({ a: 1 })
  })

  it('returns empty object for null', () => {
    expect(defaultToObject(null)).toEqual({})
  })

  it('returns empty object for undefined', () => {
    expect(defaultToObject(undefined)).toEqual({})
  })
})

describe('defaultToZero', () => {
  it('returns the number when provided', () => {
    expect(defaultToZero(42)).toBe(42)
  })

  it('returns 0 for null', () => {
    expect(defaultToZero(null)).toBe(0)
  })

  it('returns 0 for undefined', () => {
    expect(defaultToZero(undefined)).toBe(0)
  })

  it('returns 0 for zero (uses || not ??)', () => {
    // Note: defaultToZero uses || so it treats 0 as falsy
    expect(defaultToZero(0)).toBe(0)
  })
})

describe('defaultToString', () => {
  it('returns the string when provided', () => {
    expect(defaultToString('hello')).toBe('hello')
  })

  it('returns empty string for null', () => {
    expect(defaultToString(null)).toBe('')
  })

  it('returns empty string for undefined', () => {
    expect(defaultToString(undefined)).toBe('')
  })
})

describe('defaultToNull', () => {
  it('returns the value when provided', () => {
    expect(defaultToNull(42)).toBe(42)
    expect(defaultToNull('hello')).toBe('hello')
  })

  it('returns null for null', () => {
    expect(defaultToNull(null)).toBeNull()
  })

  it('returns null for undefined (uses ??)', () => {
    expect(defaultToNull(undefined)).toBeNull()
  })

  it('preserves falsy non-nullish values (uses ?? not ||)', () => {
    expect(defaultToNull(0)).toBe(0)
    expect(defaultToNull('')).toBe('')
    expect(defaultToNull(false)).toBe(false)
  })
})

describe('defaultToUndefined', () => {
  it('returns the value when provided', () => {
    expect(defaultToUndefined(42)).toBe(42)
  })

  it('returns undefined for null (uses ??)', () => {
    expect(defaultToUndefined(null)).toBeUndefined()
  })

  it('returns undefined for undefined', () => {
    expect(defaultToUndefined(undefined)).toBeUndefined()
  })

  it('preserves falsy non-nullish values', () => {
    expect(defaultToUndefined(0)).toBe(0)
    expect(defaultToUndefined('')).toBe('')
  })
})
