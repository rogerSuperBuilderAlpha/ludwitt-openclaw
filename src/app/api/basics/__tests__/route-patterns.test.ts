/**
 * @jest-environment node
 */

/**
 * Unit tests for common patterns across basics API routes.
 *
 * Tests the shared patterns used by check-answer, ai-grade,
 * ai-explanation and similar basics endpoints.
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mock setup - declare jest.fn() inside factories to avoid hoisting issues
// ---------------------------------------------------------------------------

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest.fn().mockImplementation((_err: unknown, msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 500 })
  ),
  badRequestError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 400 })
  ),
  notFoundError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 404 })
  ),
  serviceUnavailableError: jest.fn().mockImplementation((msg: string) =>
    NextResponse.json({ success: false, error: msg }, { status: 503 })
  ),
}))

jest.mock('@/lib/api/response-helpers', () => ({
  successResponse: jest.fn().mockImplementation((data: unknown) =>
    NextResponse.json({ success: true, data })
  ),
}))

jest.mock('@/lib/api/validators', () => ({
  validateRequiredFields: jest.fn().mockReturnValue(null),
  validateSubject: jest.fn().mockReturnValue(null),
}))

jest.mock('@/lib/basics/services', () => ({
  getProblem: jest.fn(),
  updateUserProgress: jest.fn(),
  incrementProblemUsage: jest.fn(),
}))

jest.mock('@/lib/basics/adaptation', () => ({
  calculateXP: jest.fn().mockReturnValue(15),
  getGradeLevelString: jest.fn().mockReturnValue('3rd Grade'),
}))

jest.mock('@/lib/basics/config', () => ({
  isAIGenerationAvailable: jest.fn().mockReturnValue(false),
}))

jest.mock('@/lib/basics/enhanced-systems-update', () => ({
  updateEnhancedSystems: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/lib/basics/moat-systems-integration', () => ({
  triggerMoatUpdates: jest.fn(),
}))

jest.mock('@/lib/basics/problem-selection-utils', () => ({
  selectProblemWithFallbackAndUsage: jest.fn().mockResolvedValue({
    problem: {
      id: 'next-problem-1',
      question: '2 + 3',
      type: 'arithmetic',
      difficulty: 3,
      correctAnswer: '5',
      timeEstimate: 30,
    },
    wasGenerated: false,
  }),
}))

jest.mock('@/lib/basics/subject-helpers', () => ({
  validateAnswerBySubject: jest.fn().mockResolvedValue({
    correct: true,
    feedback: 'Correct!',
    explanation: 'Well done',
  }),
  formatProblemForClient: jest.fn().mockImplementation((p: Record<string, unknown>) => ({
    id: p.id,
    question: p.question,
    type: p.type,
    difficulty: p.difficulty,
  })),
  getExcludeIds: jest.fn().mockReturnValue([]),
}))

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    routeCall: jest.fn(),
    debug: jest.fn(),
    apiError: jest.fn(),
    success: jest.fn(),
    authSuccess: jest.fn(),
    authFailure: jest.fn(),
    validationError: jest.fn(),
  },
}))

jest.mock('@/lib/credits', () => ({
  trackCreditsAfterCall: jest.fn().mockResolvedValue({ costCharged: 5, newBalance: 995 }),
}))

// Import after all mocks
import { POST } from '../../basics/check-answer/route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { validateRequiredFields, validateSubject } from '@/lib/api/validators'
import { getProblem, updateUserProgress } from '@/lib/basics/services'

// Get typed mock references
const mockAuth = authenticateRequest as jest.Mock
const mockValidateRequired = validateRequiredFields as jest.Mock
const mockValidateSubject = validateSubject as jest.Mock
const mockGetProblem = getProblem as jest.Mock
const mockUpdateProgress = updateUserProgress as jest.Mock

function createMockRequest(body?: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/basics/check-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer valid-token' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
}

describe('Basics API route patterns (check-answer)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuth.mockResolvedValue({
      userId: 'user-1',
      decodedToken: { uid: 'user-1' },
    })
    mockGetProblem.mockResolvedValue({
      id: 'prob-1',
      question: '5 + 3',
      correctAnswer: '8',
      difficulty: 3,
      type: 'arithmetic',
      timeEstimate: 30,
    })
    mockUpdateProgress.mockResolvedValue({
      newDifficulty: 4,
      currentStreak: 3,
      longestStreak: 5,
      totalCompleted: 10,
      totalCorrect: 8,
      accuracyRate: 0.8,
      totalXP: 150,
      progressToNextLevel: 0.6,
      problemsSeen: ['prob-1'],
    })
  })

  // -----------------------------------------------------------------------
  // 1. Auth middleware usage
  // -----------------------------------------------------------------------

  it('uses authenticateRequest and returns 401 when auth fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    )

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mockAuth).toHaveBeenCalledWith(request)
  })

  // -----------------------------------------------------------------------
  // 2. Required field validation
  // -----------------------------------------------------------------------

  it('returns 400 for missing required fields', async () => {
    const mockBadReq = NextResponse.json(
      { success: false, error: 'Missing required fields: subject, problemId, userAnswer' },
      { status: 400 }
    )
    mockValidateRequired.mockReturnValue(mockBadReq)

    const request = createMockRequest({})
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.success).toBe(false)
  })

  // -----------------------------------------------------------------------
  // 3. Subject validation
  // -----------------------------------------------------------------------

  it('returns 400 for invalid subject', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(
      NextResponse.json(
        { success: false, error: 'Subject must be "math" or "reading"' },
        { status: 400 }
      )
    )

    const request = createMockRequest({
      subject: 'history',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Subject')
  })

  // -----------------------------------------------------------------------
  // 4. Proper success response format
  // -----------------------------------------------------------------------

  it('returns proper success response format', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('correct')
    expect(body.data).toHaveProperty('xpEarned')
    expect(body.data).toHaveProperty('nextProblem')
    expect(body.data).toHaveProperty('progressUpdate')
  })

  // -----------------------------------------------------------------------
  // 5. Handles Firestore errors
  // -----------------------------------------------------------------------

  it('handles problem not found in Firestore', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)
    mockGetProblem.mockResolvedValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'nonexistent-prob',
      userAnswer: '5',
      timeSpent: 10,
    })
    const response = await POST(request)

    expect(response.status).toBe(404)
    const body = await response.json()
    expect(body.error).toContain('Problem not found')
  })

  // -----------------------------------------------------------------------
  // 6. Handles Firestore transaction errors
  // -----------------------------------------------------------------------

  it('handles Firestore transaction error in updateUserProgress', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)
    mockUpdateProgress.mockRejectedValue(new Error('Firestore transaction failed'))

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.success).toBe(false)
  })

  // -----------------------------------------------------------------------
  // 7. Duplicate submission detection
  // -----------------------------------------------------------------------

  it('rejects duplicate submissions (updateUserProgress returns null)', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)
    mockUpdateProgress.mockResolvedValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toContain('Duplicate submission')
  })

  // -----------------------------------------------------------------------
  // 8. XP calculation for correct answer
  // -----------------------------------------------------------------------

  it('awards XP for correct answers', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    const body = await response.json()
    expect(body.data.xpEarned).toBeGreaterThanOrEqual(0)
  })

  // -----------------------------------------------------------------------
  // 9. Skipped problems earn zero XP
  // -----------------------------------------------------------------------

  it('awards zero XP for skipped problems', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '__SKIPPED__',
      timeSpent: 5,
    })
    const response = await POST(request)

    const body = await response.json()
    expect(body.data.xpEarned).toBe(0)
  })

  // -----------------------------------------------------------------------
  // 10. Progress update included in response
  // -----------------------------------------------------------------------

  it('includes progress update with difficulty and stats', async () => {
    mockValidateRequired.mockReturnValue(null)
    mockValidateSubject.mockReturnValue(null)

    const request = createMockRequest({
      subject: 'math',
      problemId: 'prob-1',
      userAnswer: '8',
      timeSpent: 20,
    })
    const response = await POST(request)

    const body = await response.json()
    const progress = body.data.progressUpdate
    expect(progress).toHaveProperty('currentDifficulty')
    expect(progress).toHaveProperty('currentLevel')
    expect(progress).toHaveProperty('totalCompleted')
    expect(progress).toHaveProperty('totalCorrect')
    expect(progress).toHaveProperty('accuracyRate')
    expect(progress).toHaveProperty('currentStreak')
    expect(progress).toHaveProperty('longestStreak')
    expect(progress).toHaveProperty('totalXP')
  })
})
