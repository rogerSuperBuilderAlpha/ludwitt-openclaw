import { truncateString, truncate } from '../string-helpers'

describe('truncateString', () => {
  it('should return the original string if shorter than maxLength', () => {
    expect(truncateString('hello', 10)).toBe('hello')
  })

  it('should return the original string if exactly maxLength', () => {
    expect(truncateString('hello', 5)).toBe('hello')
  })

  it('should truncate and add ellipsis by default', () => {
    expect(truncateString('hello world', 5)).toBe('hello...')
  })

  it('should truncate without ellipsis when addEllipsis is false', () => {
    expect(truncateString('hello world', 5, false)).toBe('hello')
  })

  it('should truncate with ellipsis when addEllipsis is true', () => {
    expect(truncateString('hello world', 5, true)).toBe('hello...')
  })

  it('should handle maxLength of 0', () => {
    expect(truncateString('hello', 0)).toBe('...')
  })

  it('should handle maxLength of 0 without ellipsis', () => {
    expect(truncateString('hello', 0, false)).toBe('')
  })

  it('should handle empty string', () => {
    expect(truncateString('', 5)).toBe('')
  })

  it('should handle maxLength of 1', () => {
    expect(truncateString('hello', 1)).toBe('h...')
  })

  it('should handle very long strings', () => {
    const longStr = 'a'.repeat(1000)
    const result = truncateString(longStr, 10)
    expect(result).toBe('aaaaaaaaaa...')
    expect(result.length).toBe(13) // 10 chars + 3 for ellipsis
  })
})

describe('truncate', () => {
  it('should return the original string if shorter than maxLength', () => {
    expect(truncate('hi', 10)).toBe('hi')
  })

  it('should return the original string if exactly maxLength', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })

  it('should truncate without ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello')
  })

  it('should handle maxLength of 0', () => {
    expect(truncate('hello', 0)).toBe('')
  })

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('')
  })

  it('should behave like truncateString with addEllipsis=false', () => {
    const str = 'The quick brown fox jumps over the lazy dog'
    const maxLen = 15
    expect(truncate(str, maxLen)).toBe(truncateString(str, maxLen, false))
  })
})
