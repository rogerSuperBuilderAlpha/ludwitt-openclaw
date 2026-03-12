import { normalizeText, splitWords } from '../text-processing'

describe('normalizeText', () => {
  it('lowercases text', () => {
    expect(normalizeText('Hello World')).toBe('hello world')
  })

  it('removes punctuation', () => {
    expect(normalizeText('hello, world!')).toBe('hello world')
    expect(normalizeText("it's a test.")).toBe('its a test')
  })

  it('normalizes whitespace', () => {
    expect(normalizeText('hello   world')).toBe('hello world')
    expect(normalizeText('  hello  ')).toBe('hello')
  })

  it('handles empty string', () => {
    expect(normalizeText('')).toBe('')
  })

  it('handles mixed case and punctuation', () => {
    expect(normalizeText('Hello, World! How are you?')).toBe(
      'hello world how are you'
    )
  })
})

describe('splitWords', () => {
  it('splits text into words', () => {
    expect(splitWords('hello world')).toEqual(['hello', 'world'])
  })

  it('filters out empty strings from multiple spaces', () => {
    expect(splitWords('hello  world')).toEqual(['hello', 'world'])
  })

  it('handles single word', () => {
    expect(splitWords('hello')).toEqual(['hello'])
  })

  it('handles empty string', () => {
    expect(splitWords('')).toEqual([])
  })
})
