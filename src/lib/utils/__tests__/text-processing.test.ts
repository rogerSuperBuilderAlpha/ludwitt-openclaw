import { normalizeText, splitWords } from '../text-processing'

describe('normalizeText', () => {
  it('should lowercase text', () => {
    expect(normalizeText('Hello World')).toBe('hello world')
  })

  it('should remove punctuation', () => {
    expect(normalizeText('Hello, World!')).toBe('hello world')
  })

  it('should normalize multiple spaces to single space', () => {
    expect(normalizeText('hello   world')).toBe('hello world')
  })

  it('should trim leading and trailing whitespace', () => {
    expect(normalizeText('  hello world  ')).toBe('hello world')
  })

  it('should handle combined normalization', () => {
    expect(normalizeText('  Hello,   World!  How are YOU?  ')).toBe(
      'hello world how are you'
    )
  })

  it('should handle empty string', () => {
    expect(normalizeText('')).toBe('')
  })

  it('should handle string with only punctuation', () => {
    expect(normalizeText('!@#$%^&*()')).toBe('')
  })

  it('should handle string with only whitespace', () => {
    expect(normalizeText('   ')).toBe('')
  })

  it('should preserve numbers', () => {
    expect(normalizeText('Test 123!')).toBe('test 123')
  })

  it('should preserve underscores (\\w includes underscores)', () => {
    expect(normalizeText('hello_world')).toBe('hello_world')
  })

  it('should handle tabs and newlines as whitespace', () => {
    expect(normalizeText('hello\t\nworld')).toBe('hello world')
  })

  it('should remove hyphens', () => {
    expect(normalizeText('well-known')).toBe('wellknown')
  })

  it('should remove apostrophes', () => {
    expect(normalizeText("don't")).toBe('dont')
  })
})

describe('splitWords', () => {
  it('should split text into words', () => {
    expect(splitWords('hello world')).toEqual(['hello', 'world'])
  })

  it('should filter out empty strings from multiple spaces', () => {
    expect(splitWords('hello  world')).toEqual(['hello', 'world'])
  })

  it('should handle a single word', () => {
    expect(splitWords('hello')).toEqual(['hello'])
  })

  it('should return an empty array for an empty string', () => {
    expect(splitWords('')).toEqual([])
  })

  it('should handle leading and trailing spaces', () => {
    // ' hello world ' splits to ['', 'hello', 'world', '']
    // filter removes empty strings
    expect(splitWords(' hello world ')).toEqual(['hello', 'world'])
  })

  it('should handle string with only spaces', () => {
    expect(splitWords('   ')).toEqual([])
  })

  it('should preserve punctuation within words', () => {
    expect(splitWords("don't stop")).toEqual(["don't", 'stop'])
  })

  it('should handle many words', () => {
    expect(splitWords('a b c d e')).toEqual(['a', 'b', 'c', 'd', 'e'])
  })
})
