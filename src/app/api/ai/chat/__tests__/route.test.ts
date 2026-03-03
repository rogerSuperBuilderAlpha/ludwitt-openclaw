/**
 * @jest-environment node
 */

/**
 * Unit tests for POST /api/ai/chat
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock dependencies - use jest.fn() inside factories to avoid hoisting issues
jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@anthropic-ai/sdk', () => {
  const mockCreate = jest.fn()
  return jest.fn().mockImplementation(() => ({
    messages: { create: mockCreate },
  }))
})

jest.mock('@/lib/ai/providers/registry', () => ({
  getDefaultModelForTier: jest
    .fn()
    .mockReturnValue({ id: 'claude-sonnet-4-5-20250929' }),
  getTaskConfig: jest.fn().mockReturnValue({
    recommendedTier: 'economy',
    defaultMaxTokens: 1024,
    defaultTemperature: 0.7,
  }),
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest
    .fn()
    .mockImplementation((_error: unknown, message: string) =>
      NextResponse.json({ success: false, error: message }, { status: 500 })
    ),
}))

jest.mock('@/lib/api/response-helpers', () => ({
  successResponse: jest
    .fn()
    .mockImplementation((data: unknown) =>
      NextResponse.json({ success: true, data })
    ),
}))

// Import after mocks
import { POST } from '../route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import Anthropic from '@anthropic-ai/sdk'

// Get mock references
const mockAuthenticateRequest = authenticateRequest as jest.Mock
// Anthropic is a class mock - instantiate to get the messages.create mock
const mockAnthropicInstance = new (Anthropic as unknown as jest.Mock)()
const mockMessagesCreate = mockAnthropicInstance.messages.create as jest.Mock

function createMockRequest(
  body?: unknown,
  headers?: Record<string, string>
): NextRequest {
  return new NextRequest('http://localhost:3000/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

describe('POST /api/ai/chat', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv, ANTHROPIC_API_KEY: 'test-api-key' }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('returns 401 when not authenticated', async () => {
    mockAuthenticateRequest.mockResolvedValue(
      NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    )

    const request = createMockRequest({
      messages: [{ role: 'user', content: 'hi' }],
    })
    const response = await POST(request)

    expect(response.status).toBe(401)
    const body = await response.json()
    expect(body.success).toBe(false)
  })

  it('returns 400 when messages array is missing', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })

    const request = createMockRequest({ context: {} })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toContain('Validation failed')
  })

  it('returns 400 when messages array is empty', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })

    const request = createMockRequest({ messages: [] })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Validation failed')
  })

  it('returns 400 when messages is not an array', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })

    const request = createMockRequest({ messages: 'hello' })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Validation failed')
  })

  it('returns 503 when ANTHROPIC_API_KEY is not set', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })
    delete process.env.ANTHROPIC_API_KEY

    const request = createMockRequest({
      messages: [{ role: 'user', content: 'hi' }],
    })
    const response = await POST(request)

    expect(response.status).toBe(503)
    const body = await response.json()
    expect(body.error).toBe('AI service not configured')
  })

  it('returns successful response with valid input', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })
    mockMessagesCreate.mockResolvedValue({
      content: [{ type: 'text', text: 'Hello! How can I help?' }],
      usage: { input_tokens: 100, output_tokens: 50 },
    })

    const request = createMockRequest({
      messages: [{ role: 'user', content: 'How do I start a project?' }],
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data.response).toBe('Hello! How can I help?')
  })

  it('handles Anthropic API errors gracefully', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })
    mockMessagesCreate.mockRejectedValue(new Error('API rate limit exceeded'))

    const request = createMockRequest({
      messages: [{ role: 'user', content: 'test' }],
    })
    const response = await POST(request)

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.success).toBe(false)
    expect(body.error).toBe('Failed to process chat message')
  })

  it('passes context to system prompt when provided', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })
    mockMessagesCreate.mockResolvedValue({
      content: [
        { type: 'text', text: 'Sure, I see you are intermediate level.' },
      ],
      usage: { input_tokens: 200, output_tokens: 80 },
    })

    const request = createMockRequest({
      messages: [{ role: 'user', content: 'What should I learn next?' }],
      context: {
        userLevel: 'intermediate',
        currentProject: 'E-commerce app',
        recentActivity: ['Completed React module', 'Built login page'],
      },
    })
    const response = await POST(request)

    expect(response.status).toBe(200)

    // Verify the system prompt was passed to the API call
    const callArgs = mockMessagesCreate.mock.calls[0][0]
    expect(callArgs.system).toContain('User Context')
    expect(callArgs.system).toContain('intermediate')
    expect(callArgs.system).toContain('E-commerce app')
    expect(callArgs.system).toContain('Completed React module')
  })

  it('filters out system messages before sending to API', async () => {
    mockAuthenticateRequest.mockResolvedValue({
      userId: 'user-1',
      decodedToken: {},
    })
    mockMessagesCreate.mockResolvedValue({
      content: [{ type: 'text', text: 'Filtered response' }],
      usage: { input_tokens: 50, output_tokens: 30 },
    })

    const request = createMockRequest({
      messages: [
        { role: 'system', content: 'You are a coding tutor' },
        { role: 'user', content: 'Help me with React' },
        { role: 'assistant', content: 'Sure!' },
        { role: 'user', content: 'Thanks, what about hooks?' },
      ],
    })
    const response = await POST(request)

    expect(response.status).toBe(200)

    // Verify system messages are removed
    const callArgs = mockMessagesCreate.mock.calls[0][0]
    expect(callArgs.messages).toHaveLength(3)
    expect(
      callArgs.messages.every((m: { role: string }) => m.role !== 'system')
    ).toBe(true)
    expect(callArgs.messages[0].role).toBe('user')
    expect(callArgs.messages[0].content).toBe('Help me with React')
  })
})
