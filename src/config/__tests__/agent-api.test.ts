describe('agent-api config', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('exports semantic version', () => {
    const { LUDWITT_SEMANTIC_VERSION } = require('../agent-api')
    expect(LUDWITT_SEMANTIC_VERSION).toBe('1.0.0')
  })

  it('returns semantic version only when no commit hash', () => {
    delete process.env.VERCEL_GIT_COMMIT_SHA
    const { LUDWITT_API_VERSION } = require('../agent-api')
    expect(LUDWITT_API_VERSION).toBe('1.0.0')
  })

  it('appends short commit hash when available', () => {
    process.env.VERCEL_GIT_COMMIT_SHA = 'a1b2c3d4e5f6789'
    const { LUDWITT_API_VERSION } = require('../agent-api')
    expect(LUDWITT_API_VERSION).toBe('1.0.0-a1b2c3d')
  })

  it('exports update instructions', () => {
    const { UPDATE_INSTRUCTIONS } = require('../agent-api')
    expect(UPDATE_INSTRUCTIONS).toContain('curl')
    expect(UPDATE_INSTRUCTIONS).toContain('install')
  })
})
