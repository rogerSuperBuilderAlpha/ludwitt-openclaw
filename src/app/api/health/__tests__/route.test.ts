import { GET } from '../route'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
    })),
  },
}))

jest.mock('@/config/agent-api', () => ({
  LUDWITT_API_VERSION: '1.0.0-test123',
  UPDATE_INSTRUCTIONS:
    'Run: curl -sSL https://opensource.ludwitt.com/install | sh',
}))

describe('GET /api/health', () => {
  it('returns status 200', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
  })

  it('returns status "ok"', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body.status).toBe('ok')
  })

  it('returns a valid ISO timestamp', async () => {
    const response = await GET()
    const body = await response.json()
    const parsed = new Date(body.timestamp)
    expect(parsed.toISOString()).toBe(body.timestamp)
  })

  it('returns the mocked apiVersion', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body.apiVersion).toBe('1.0.0-test123')
  })

  it('returns updateInstructions', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body.updateInstructions).toBe(
      'Run: curl -sSL https://opensource.ludwitt.com/install | sh'
    )
  })

  it('returns the correct response shape', async () => {
    const response = await GET()
    const body = await response.json()
    expect(body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        timestamp: expect.any(String),
        apiVersion: expect.any(String),
        updateInstructions: expect.any(String),
      })
    )
    expect(Object.keys(body)).toHaveLength(4)
  })
})
