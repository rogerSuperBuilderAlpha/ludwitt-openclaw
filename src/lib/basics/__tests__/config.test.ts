/**
 * Unit Tests for Basics Configuration
 */

import {
  BasicsConfig,
  isAIGenerationAvailable,
  isAIValidationAvailable,
  isVideoServiceAvailable,
  debugLog
} from '../config'

describe('BasicsConfig', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('enableAI', () => {
    test('is false when no API key', () => {
      delete process.env.ANTHROPIC_API_KEY
      const { BasicsConfig: config } = require('../config')
      expect(config.enableAI).toBeFalsy()
    })
  })

  describe('useLocalStore', () => {
    test('is false by default', () => {
      delete process.env.BASICS_USE_LOCAL_STORE
      const { BasicsConfig: config } = require('../config')
      expect(config.useLocalStore).toBe(false)
    })

    test('is true when env is set to true', () => {
      process.env.BASICS_USE_LOCAL_STORE = 'true'
      const { BasicsConfig: config } = require('../config')
      expect(config.useLocalStore).toBe(true)
    })
  })

  describe('verifyMath', () => {
    test('is true by default', () => {
      delete process.env.BASICS_VERIFY_MATH
      const { BasicsConfig: config } = require('../config')
      expect(config.verifyMath).toBe(true)
    })

    test('is false when explicitly disabled', () => {
      process.env.BASICS_VERIFY_MATH = 'false'
      const { BasicsConfig: config } = require('../config')
      expect(config.verifyMath).toBe(false)
    })
  })
})

describe('isAIGenerationAvailable', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('returns false when no API key', () => {
    delete process.env.ANTHROPIC_API_KEY
    const { isAIGenerationAvailable: fn } = require('../config')
    expect(fn()).toBe(false)
  })

  test('returns true when API key exists and AI not disabled', () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    delete process.env.BASICS_ENABLE_AI
    const { isAIGenerationAvailable: fn } = require('../config')
    expect(fn()).toBe(true)
  })
})

describe('isAIValidationAvailable', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('returns false when no API key', () => {
    delete process.env.ANTHROPIC_API_KEY
    const { isAIValidationAvailable: fn } = require('../config')
    expect(fn()).toBe(false)
  })

  test('returns true when API key exists', () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    const { isAIValidationAvailable: fn } = require('../config')
    expect(fn()).toBe(true)
  })
})

describe('isVideoServiceAvailable', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('returns false when no D-ID API key', () => {
    delete process.env.DID_API_KEY
    const { isVideoServiceAvailable: fn } = require('../config')
    expect(fn()).toBe(false)
  })

  test('returns true when D-ID API key exists', () => {
    process.env.DID_API_KEY = 'test-key'
    const { isVideoServiceAvailable: fn } = require('../config')
    expect(fn()).toBe(true)
  })
})

describe('debugLog', () => {
  const originalEnv = process.env
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    consoleSpy.mockClear()
  })

  afterAll(() => {
    process.env = originalEnv
    consoleSpy.mockRestore()
  })

  test('logs in development mode', () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'development'
    delete process.env.BASICS_DEBUG_LOGS
    const { debugLog: fn } = require('../config')
    fn('Test message', { data: 'test' })
    // Logger formats as "[timestamp] [BasicsDebug] Test message"
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[BasicsDebug] Test message')
    )
  })

  test('does not log in production', () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production'
    const { debugLog: fn } = require('../config')
    fn('Test message')
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  test('does not log when explicitly disabled', () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'development'
    process.env.BASICS_DEBUG_LOGS = 'false'
    const { debugLog: fn } = require('../config')
    fn('Test message')
    expect(consoleSpy).not.toHaveBeenCalled()
  })
})

