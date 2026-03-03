import { getErrorMessage, isError } from '../error-helpers'

describe('getErrorMessage', () => {
  it('should return message from an Error instance', () => {
    const error = new Error('Something went wrong')
    expect(getErrorMessage(error)).toBe('Something went wrong')
  })

  it('should return a string error directly', () => {
    expect(getErrorMessage('string error')).toBe('string error')
  })

  it('should return the default fallback for non-Error, non-string values', () => {
    expect(getErrorMessage(42)).toBe('An error occurred')
  })

  it('should return the default fallback for null', () => {
    expect(getErrorMessage(null)).toBe('An error occurred')
  })

  it('should return the default fallback for undefined', () => {
    expect(getErrorMessage(undefined)).toBe('An error occurred')
  })

  it('should return the default fallback for an object', () => {
    expect(getErrorMessage({ message: 'not extracted' })).toBe(
      'An error occurred'
    )
  })

  it('should return a custom fallback when provided', () => {
    expect(getErrorMessage(42, 'Custom fallback')).toBe('Custom fallback')
  })

  it('should return a custom fallback for null', () => {
    expect(getErrorMessage(null, 'Null error')).toBe('Null error')
  })

  it('should return Error message even when custom fallback is provided', () => {
    const error = new Error('Real error')
    expect(getErrorMessage(error, 'Fallback')).toBe('Real error')
  })

  it('should return string error even when custom fallback is provided', () => {
    expect(getErrorMessage('string error', 'Fallback')).toBe('string error')
  })

  it('should handle empty string error', () => {
    expect(getErrorMessage('')).toBe('')
  })

  it('should handle Error with empty message', () => {
    expect(getErrorMessage(new Error(''))).toBe('')
  })

  it('should return fallback for boolean values', () => {
    expect(getErrorMessage(false)).toBe('An error occurred')
    expect(getErrorMessage(true)).toBe('An error occurred')
  })

  it('should return fallback for array values', () => {
    expect(getErrorMessage(['error'])).toBe('An error occurred')
  })

  it('should handle TypeError instances', () => {
    const error = new TypeError('Type mismatch')
    expect(getErrorMessage(error)).toBe('Type mismatch')
  })
})

describe('isError', () => {
  it('should return true when error message includes the search string', () => {
    const error = new Error('Connection timeout occurred')
    expect(isError(error, 'timeout')).toBe(true)
  })

  it('should return false when error message does not include the search string', () => {
    const error = new Error('Connection failed')
    expect(isError(error, 'timeout')).toBe(false)
  })

  it('should return false for non-Error values', () => {
    expect(isError('string error', 'string')).toBe(false)
  })

  it('should return false for null', () => {
    expect(isError(null, 'null')).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isError(undefined, 'undefined')).toBe(false)
  })

  it('should return false for a plain object', () => {
    expect(isError({ message: 'test' }, 'test')).toBe(false)
  })

  it('should return false for a number', () => {
    expect(isError(42, '42')).toBe(false)
  })

  it('should be case-sensitive', () => {
    const error = new Error('Not Found')
    expect(isError(error, 'not found')).toBe(false)
    expect(isError(error, 'Not Found')).toBe(true)
  })

  it('should match partial strings', () => {
    const error = new Error('ECONNREFUSED: connection refused')
    expect(isError(error, 'ECONNREFUSED')).toBe(true)
    expect(isError(error, 'connection refused')).toBe(true)
  })

  it('should handle empty message string search', () => {
    const error = new Error('Some error')
    expect(isError(error, '')).toBe(true) // ''.includes('') is true
  })

  it('should handle Error with empty message', () => {
    const error = new Error('')
    expect(isError(error, 'anything')).toBe(false)
    expect(isError(error, '')).toBe(true)
  })

  it('should work with TypeError', () => {
    const error = new TypeError('Cannot read properties')
    expect(isError(error, 'Cannot read')).toBe(true)
  })

  it('should work with RangeError', () => {
    const error = new RangeError('Maximum call stack')
    expect(isError(error, 'Maximum call stack')).toBe(true)
  })
})
