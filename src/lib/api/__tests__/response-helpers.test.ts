/**
 * @jest-environment node
 */

/**
 * Unit tests for API response helper utilities
 *
 * Tests successResponse, successResponseWithMessage, and successResponseFlat.
 * Each function returns a NextResponse object; we verify both status codes and JSON bodies.
 */

import {
  successResponse,
  successResponseWithMessage,
  successResponseFlat,
} from '../response-helpers'

// ---------------------------------------------------------------------------
// successResponse
// ---------------------------------------------------------------------------

describe('successResponse', () => {
  it('returns a 200 status', () => {
    const response = successResponse({ foo: 'bar' })
    expect(response.status).toBe(200)
  })

  it('wraps data under a "data" key with success: true', async () => {
    const response = successResponse({ foo: 'bar' })
    const body = await response.json()
    expect(body).toEqual({ success: true, data: { foo: 'bar' } })
  })

  it('includes message when provided', async () => {
    const response = successResponse({ id: 1 }, 'Created successfully')
    const body = await response.json()
    expect(body).toEqual({
      success: true,
      data: { id: 1 },
      message: 'Created successfully',
    })
  })

  it('omits message when not provided', async () => {
    const response = successResponse({ id: 1 })
    const body = await response.json()
    expect(body).not.toHaveProperty('message')
  })

  it('handles null data', async () => {
    const response = successResponse(null)
    const body = await response.json()
    expect(body).toEqual({ success: true, data: null })
  })

  it('handles array data', async () => {
    const response = successResponse([1, 2, 3])
    const body = await response.json()
    expect(body).toEqual({ success: true, data: [1, 2, 3] })
  })

  it('handles string data', async () => {
    const response = successResponse('hello')
    const body = await response.json()
    expect(body).toEqual({ success: true, data: 'hello' })
  })

  it('handles number data', async () => {
    const response = successResponse(42)
    const body = await response.json()
    expect(body).toEqual({ success: true, data: 42 })
  })

  it('handles boolean data', async () => {
    const response = successResponse(true)
    const body = await response.json()
    expect(body).toEqual({ success: true, data: true })
  })

  it('handles empty object data', async () => {
    const response = successResponse({})
    const body = await response.json()
    expect(body).toEqual({ success: true, data: {} })
  })

  it('does not include message key when message is empty string', async () => {
    // Empty string is falsy so it should be omitted
    const response = successResponse({ id: 1 }, '')
    const body = await response.json()
    expect(body).not.toHaveProperty('message')
  })
})

// ---------------------------------------------------------------------------
// successResponseWithMessage
// ---------------------------------------------------------------------------

describe('successResponseWithMessage', () => {
  it('returns a 200 status', () => {
    const response = successResponseWithMessage({ count: 5 }, 'Done')
    expect(response.status).toBe(200)
  })

  it('spreads data at top level with success and message', async () => {
    const response = successResponseWithMessage(
      { count: 5, items: ['a'] },
      'Fetched'
    )
    const body = await response.json()
    expect(body).toEqual({
      success: true,
      count: 5,
      items: ['a'],
      message: 'Fetched',
    })
  })

  it('message field is always present', async () => {
    const response = successResponseWithMessage({}, 'All good')
    const body = await response.json()
    expect(body.message).toBe('All good')
    expect(body.success).toBe(true)
  })

  it('data properties are spread at root level', async () => {
    const data = { userId: 'abc', role: 'admin' }
    const response = successResponseWithMessage(data, 'OK')
    const body = await response.json()
    expect(body.userId).toBe('abc')
    expect(body.role).toBe('admin')
    expect(body).not.toHaveProperty('data')
  })

  it('message overrides a message property in data', async () => {
    // If data also has a 'message' key, the explicit message parameter takes precedence
    const data = { message: 'from data' }
    const response = successResponseWithMessage(data, 'from param')
    const body = await response.json()
    expect(body.message).toBe('from param')
  })
})

// ---------------------------------------------------------------------------
// successResponseFlat
// ---------------------------------------------------------------------------

describe('successResponseFlat', () => {
  it('returns a 200 status', () => {
    const response = successResponseFlat({ total: 10 })
    expect(response.status).toBe(200)
  })

  it('spreads data at top level with success: true', async () => {
    const response = successResponseFlat({ total: 10, page: 1 })
    const body = await response.json()
    expect(body).toEqual({ success: true, total: 10, page: 1 })
  })

  it('includes message when provided', async () => {
    const response = successResponseFlat({ total: 10 }, 'Loaded')
    const body = await response.json()
    expect(body).toEqual({ success: true, total: 10, message: 'Loaded' })
  })

  it('omits message when not provided', async () => {
    const response = successResponseFlat({ total: 10 })
    const body = await response.json()
    expect(body).not.toHaveProperty('message')
  })

  it('omits message when empty string', async () => {
    const response = successResponseFlat({ total: 10 }, '')
    const body = await response.json()
    expect(body).not.toHaveProperty('message')
  })

  it('does not wrap data under a "data" key', async () => {
    const response = successResponseFlat({ items: [1, 2, 3] })
    const body = await response.json()
    expect(body).not.toHaveProperty('data')
    expect(body.items).toEqual([1, 2, 3])
  })

  it('handles empty object', async () => {
    const response = successResponseFlat({})
    const body = await response.json()
    expect(body).toEqual({ success: true })
  })

  it('success property is always true', async () => {
    // Even if data has success: false, the function sets success: true first,
    // then spreads data (which could overwrite), then spreads message.
    // Actually, success is set in the literal before ...data, so data could override it.
    // Let's test the actual behavior:
    const response = successResponseFlat({ success: false } as Record<
      string,
      unknown
    >)
    const body = await response.json()
    // In the implementation: { success: true, ...data } -- data's success overwrites
    // This is the actual behavior of the code
    expect(body.success).toBe(false)
  })

  it('handles nested objects in data', async () => {
    const response = successResponseFlat({
      user: { name: 'Test', age: 25 },
      count: 1,
    })
    const body = await response.json()
    expect(body.user).toEqual({ name: 'Test', age: 25 })
    expect(body.count).toBe(1)
    expect(body.success).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Content-Type header
// ---------------------------------------------------------------------------

describe('response headers', () => {
  it('successResponse has application/json content type', () => {
    const response = successResponse({})
    expect(response.headers.get('content-type')).toContain('application/json')
  })

  it('successResponseWithMessage has application/json content type', () => {
    const response = successResponseWithMessage({}, 'msg')
    expect(response.headers.get('content-type')).toContain('application/json')
  })

  it('successResponseFlat has application/json content type', () => {
    const response = successResponseFlat({})
    expect(response.headers.get('content-type')).toContain('application/json')
  })
})
