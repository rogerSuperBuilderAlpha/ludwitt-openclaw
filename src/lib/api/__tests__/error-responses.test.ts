/**
 * @jest-environment node
 */

/**
 * Unit tests for standardized error response utilities
 */

import {
  serverError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  serviceUnavailableError,
} from '../error-responses'

describe('Error Response Utilities', () => {
  describe('serverError', () => {
    it('returns 500 with correct format', async () => {
      const error = new Error('Something broke')
      const response = serverError(error, 'Internal failure')

      expect(response.status).toBe(500)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Internal failure' })
    })

    it('uses default message when none provided', async () => {
      const response = serverError(new Error('test'))

      expect(response.status).toBe(500)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Internal server error' })
    })

    it('never exposes raw error message to client', async () => {
      const sensitiveError = new Error('Database connection to 10.0.0.1:5432 failed with password xyz')
      const response = serverError(sensitiveError, 'Something went wrong')

      const body = await response.json()
      expect(body.error).toBe('Something went wrong')
      expect(body.error).not.toContain('10.0.0.1')
      expect(body.error).not.toContain('password')
    })

    it('logs the full error server-side', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Detailed internal error')

      serverError(error, 'Generic message')

      // Logger formats as "[timestamp] [ServerError] Generic message"
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ServerError] Generic message')
      )
      consoleSpy.mockRestore()
    })
  })

  describe('badRequestError', () => {
    it('returns 400 with correct format', async () => {
      const response = badRequestError('Missing required field: name')

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Missing required field: name' })
    })
  })

  describe('unauthorizedError', () => {
    it('returns 401 with correct format', async () => {
      const response = unauthorizedError('Invalid token')

      expect(response.status).toBe(401)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Invalid token' })
    })

    it('uses default message when none provided', async () => {
      const response = unauthorizedError()

      expect(response.status).toBe(401)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Unauthorized' })
    })
  })

  describe('forbiddenError', () => {
    it('returns 403 with correct format', async () => {
      const response = forbiddenError('Not allowed')

      expect(response.status).toBe(403)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Not allowed' })
    })

    it('uses default message when none provided', async () => {
      const response = forbiddenError()

      expect(response.status).toBe(403)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Forbidden' })
    })
  })

  describe('notFoundError', () => {
    it('returns 404 with correct format', async () => {
      const response = notFoundError('User not found')

      expect(response.status).toBe(404)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'User not found' })
    })
  })

  describe('serviceUnavailableError', () => {
    it('returns 503 with correct format', async () => {
      const response = serviceUnavailableError('AI service down')

      expect(response.status).toBe(503)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'AI service down' })
    })

    it('uses default message when none provided', async () => {
      const response = serviceUnavailableError()

      expect(response.status).toBe(503)
      const body = await response.json()
      expect(body).toEqual({ success: false, error: 'Service temporarily unavailable' })
    })
  })

  describe('all error functions return { success: false, error: message }', () => {
    it('every error response has consistent shape', async () => {
      const errorFns = [
        () => badRequestError('bad'),
        () => unauthorizedError('unauth'),
        () => forbiddenError('forbidden'),
        () => notFoundError('not found'),
        () => serverError(new Error('err'), 'server err'),
        () => serviceUnavailableError('unavailable'),
      ]

      for (const fn of errorFns) {
        const response = fn()
        const body = await response.json()
        expect(body).toHaveProperty('success', false)
        expect(body).toHaveProperty('error')
        expect(typeof body.error).toBe('string')
      }
    })
  })
})
