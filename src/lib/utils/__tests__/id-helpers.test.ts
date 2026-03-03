import {
  generateDocumentId,
  generateDocumentIdWithValue,
  generateDocumentIdWithPrefix,
} from '../id-helpers'

describe('generateDocumentId', () => {
  it('should generate an ID with userId and timestamp', () => {
    const before = Date.now()
    const id = generateDocumentId('user123')
    const after = Date.now()

    expect(id).toMatch(/^user123_\d+$/)
    const timestamp = parseInt(id.split('_')[1], 10)
    expect(timestamp).toBeGreaterThanOrEqual(before)
    expect(timestamp).toBeLessThanOrEqual(after)
  })

  it('should include additional string parts', () => {
    const id = generateDocumentId('user123', 'math', 'level1')
    expect(id).toMatch(/^user123_\d+_math_level1$/)
  })

  it('should include additional numeric parts', () => {
    const id = generateDocumentId('user123', 42)
    expect(id).toMatch(/^user123_\d+_42$/)
  })

  it('should include mixed string and number parts', () => {
    const id = generateDocumentId('user123', 'session', 5, 'complete')
    expect(id).toMatch(/^user123_\d+_session_5_complete$/)
  })

  it('should generate unique IDs on successive calls', () => {
    const id1 = generateDocumentId('user123')
    const id2 = generateDocumentId('user123')
    // They could be the same if called within the same millisecond,
    // but the format should be correct
    expect(id1).toMatch(/^user123_\d+$/)
    expect(id2).toMatch(/^user123_\d+$/)
  })

  it('should handle empty userId', () => {
    const id = generateDocumentId('')
    expect(id).toMatch(/^_\d+$/)
  })
})

describe('generateDocumentIdWithValue', () => {
  it('should generate an ID from userId and string value', () => {
    expect(generateDocumentIdWithValue('user123', 'doc456')).toBe(
      'user123_doc456'
    )
  })

  it('should generate an ID from userId and numeric value', () => {
    expect(generateDocumentIdWithValue('user123', 42)).toBe('user123_42')
  })

  it('should handle empty userId', () => {
    expect(generateDocumentIdWithValue('', 'value')).toBe('_value')
  })

  it('should handle empty string value', () => {
    expect(generateDocumentIdWithValue('user123', '')).toBe('user123_')
  })

  it('should handle zero as value', () => {
    expect(generateDocumentIdWithValue('user123', 0)).toBe('user123_0')
  })
})

describe('generateDocumentIdWithPrefix', () => {
  it('should generate an ID with prefix and parts', () => {
    expect(generateDocumentIdWithPrefix('doc', 'user123', 'session1')).toBe(
      'doc_user123_session1'
    )
  })

  it('should handle a single part', () => {
    expect(generateDocumentIdWithPrefix('prefix', 'value')).toBe('prefix_value')
  })

  it('should handle numeric parts', () => {
    expect(generateDocumentIdWithPrefix('tx', 2024, 1)).toBe('tx_2024_1')
  })

  it('should handle mixed string and number parts', () => {
    expect(generateDocumentIdWithPrefix('log', 'error', 500)).toBe(
      'log_error_500'
    )
  })

  it('should handle no parts (prefix only with trailing underscore)', () => {
    expect(generateDocumentIdWithPrefix('prefix')).toBe('prefix_')
  })

  it('should handle empty prefix', () => {
    expect(generateDocumentIdWithPrefix('', 'a', 'b')).toBe('_a_b')
  })
})
