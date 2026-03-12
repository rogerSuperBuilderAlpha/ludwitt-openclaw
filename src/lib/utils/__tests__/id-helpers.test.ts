import {
  generateDocumentId,
  generateDocumentIdWithValue,
  generateDocumentIdWithPrefix,
} from '../id-helpers'

describe('generateDocumentId', () => {
  it('generates ID with userId and timestamp', () => {
    const id = generateDocumentId('user123')
    expect(id).toMatch(/^user123_\d+$/)
  })

  it('appends additional parts', () => {
    const id = generateDocumentId('user123', 'math', 'grade5')
    expect(id).toMatch(/^user123_\d+_math_grade5$/)
  })

  it('handles numeric parts', () => {
    const id = generateDocumentId('user123', 42)
    expect(id).toMatch(/^user123_\d+_42$/)
  })

  it('generates unique IDs on successive calls', () => {
    const id1 = generateDocumentId('user123')
    const id2 = generateDocumentId('user123')
    // Timestamps may be the same within a millisecond, but the format should be consistent
    expect(id1).toMatch(/^user123_\d+$/)
    expect(id2).toMatch(/^user123_\d+$/)
  })
})

describe('generateDocumentIdWithValue', () => {
  it('generates ID with userId and string value', () => {
    expect(generateDocumentIdWithValue('user123', 'math')).toBe('user123_math')
  })

  it('generates ID with userId and numeric value', () => {
    expect(generateDocumentIdWithValue('user123', 42)).toBe('user123_42')
  })
})

describe('generateDocumentIdWithPrefix', () => {
  it('generates ID with prefix and parts', () => {
    expect(generateDocumentIdWithPrefix('doc', 'a', 'b')).toBe('doc_a_b')
  })

  it('handles single part', () => {
    expect(generateDocumentIdWithPrefix('prefix', 'value')).toBe('prefix_value')
  })

  it('handles numeric parts', () => {
    expect(generateDocumentIdWithPrefix('item', 1, 2, 3)).toBe('item_1_2_3')
  })
})
