import {
  validateBase64,
  validateAnthropicKey,
  validateDidKey,
  validateEncryptedKey,
} from '../validation-helpers'

describe('validateBase64', () => {
  it('returns true for valid base64 strings', () => {
    expect(validateBase64('SGVsbG8gV29ybGQ=')).toBe(true)
    expect(validateBase64('YWJjZGVm')).toBe(true)
    expect(validateBase64('AAAA')).toBe(true)
    expect(validateBase64('abc123+/==')).toBe(true)
  })

  it('returns false for strings with invalid characters', () => {
    expect(validateBase64('hello world')).toBe(false) // space
    expect(validateBase64('abc!def')).toBe(false) // exclamation
    expect(validateBase64('abc@def')).toBe(false) // at sign
    expect(validateBase64('abc#def')).toBe(false) // hash
    expect(validateBase64('data:image/png;base64,abc')).toBe(false) // colon, semicolon, comma
  })

  it('returns false for empty string', () => {
    expect(validateBase64('')).toBe(false)
  })

  it('handles strings with only padding characters', () => {
    expect(validateBase64('===')).toBe(true)
  })

  it('handles strings with plus and slash', () => {
    expect(validateBase64('a+b/c=')).toBe(true)
  })
})

describe('validateAnthropicKey', () => {
  it('returns valid for a properly formatted key', () => {
    const result = validateAnthropicKey('sk-ant-abcdefghijklmnopqrstuvwxyz')
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('returns invalid when key does not start with sk-ant-', () => {
    const result = validateAnthropicKey('sk-wrong-prefix-abcdefghij')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('sk-ant-')
  })

  it('returns invalid when key is too short', () => {
    const result = validateAnthropicKey('sk-ant-abc')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('too short')
  })

  it('trims whitespace before validation', () => {
    const result = validateAnthropicKey('  sk-ant-abcdefghijklmnopqrstuvwxyz  ')
    expect(result.isValid).toBe(true)
  })

  it('rejects empty string', () => {
    const result = validateAnthropicKey('')
    expect(result.isValid).toBe(false)
  })

  it('rejects completely wrong format', () => {
    const result = validateAnthropicKey('not-a-key')
    expect(result.isValid).toBe(false)
  })

  it('validates key that is exactly 20 characters after prefix check', () => {
    // 'sk-ant-' is 7 chars, so 20 total => 13 chars after prefix
    const key = 'sk-ant-1234567890123'
    expect(key.length).toBe(20)
    const result = validateAnthropicKey(key)
    expect(result.isValid).toBe(true)
  })

  it('rejects key that is 19 characters (just below minimum)', () => {
    const key = 'sk-ant-123456789012'
    expect(key.length).toBe(19)
    const result = validateAnthropicKey(key)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('too short')
  })
})

describe('validateDidKey', () => {
  it('returns valid for a key of sufficient length', () => {
    const result = validateDidKey('abcdefghij') // exactly 10 chars
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('returns valid for a long key', () => {
    const result = validateDidKey('a'.repeat(100))
    expect(result.isValid).toBe(true)
  })

  it('returns invalid for a key shorter than 10 characters', () => {
    const result = validateDidKey('short')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('too short')
  })

  it('trims whitespace before checking length', () => {
    const result = validateDidKey('  abcdefghij  ')
    // After trim: 'abcdefghij' = 10 chars
    expect(result.isValid).toBe(true)
  })

  it('rejects empty string', () => {
    const result = validateDidKey('')
    expect(result.isValid).toBe(false)
  })

  it('rejects string that is 9 chars (just below minimum)', () => {
    const result = validateDidKey('abcdefghi')
    expect(result.isValid).toBe(false)
  })
})

describe('validateEncryptedKey', () => {
  it('returns valid for a properly formatted encrypted key', () => {
    // Create a valid base64 string of sufficient length
    const validKey = 'A'.repeat(60)
    const result = validateEncryptedKey(validKey)
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('returns invalid for non-string input', () => {
    // TypeScript would catch this, but at runtime it could happen
    const result = validateEncryptedKey(123 as unknown as string)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid encrypted')
  })

  it('returns invalid for a key shorter than default minimum (50)', () => {
    const shortKey = 'ABCDEF' // valid base64 but too short
    const result = validateEncryptedKey(shortKey)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid encrypted')
  })

  it('returns invalid for non-base64 characters', () => {
    const badKey = 'a'.repeat(40) + '!@#$%^&*()' + 'a'.repeat(10) // 60 chars but invalid base64
    const result = validateEncryptedKey(badKey)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid encrypted')
  })

  it('supports custom minimum length', () => {
    const key = 'A'.repeat(20)
    expect(validateEncryptedKey(key, 20).isValid).toBe(true)
    expect(validateEncryptedKey(key, 21).isValid).toBe(false)
  })

  it('supports custom key name in error message', () => {
    const result = validateEncryptedKey('short', 50, 'Anthropic key')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Anthropic key')
  })

  it('uses default key name "API key" in error messages', () => {
    const result = validateEncryptedKey('short')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('API key')
  })

  it('validates a key that is exactly at minimum length', () => {
    const key = 'A'.repeat(50) // exactly 50 chars, valid base64
    const result = validateEncryptedKey(key)
    expect(result.isValid).toBe(true)
  })

  it('rejects key that is one char below minimum length', () => {
    const key = 'A'.repeat(49)
    const result = validateEncryptedKey(key)
    expect(result.isValid).toBe(false)
  })
})
