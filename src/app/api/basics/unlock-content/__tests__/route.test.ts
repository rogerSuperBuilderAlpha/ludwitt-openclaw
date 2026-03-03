/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('@/lib/api/auth-middleware', () => ({
  authenticateRequest: jest.fn(),
}))

jest.mock('@/lib/api/error-responses', () => ({
  serverError: jest.fn((_error: unknown, message: string) =>
    NextResponse.json({ success: false, error: message }, { status: 500 })
  ),
}))

jest.mock('@/data/basics/references', () => ({
  getReferenceUnit: jest.fn(),
}))

jest.mock('@/lib/firebase/admin', () => {
  const _mockDoc: Record<string, jest.Mock> = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  }
  // Support chained subcollections: doc().collection().doc()
  _mockDoc.collection = jest.fn().mockReturnValue({
    doc: jest.fn().mockReturnValue(_mockDoc),
  })
  const _mockCollection = {
    doc: jest.fn().mockReturnValue(_mockDoc),
  }
  return {
    db: { collection: jest.fn().mockReturnValue(_mockCollection) },
    __mockDoc: _mockDoc,
    __mockCollection: _mockCollection,
  }
})

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    apiError: jest.fn(),
    validationError: jest.fn(),
    success: jest.fn(),
  },
}))

jest.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    increment: jest.fn((n: number) => `increment(${n})`),
    arrayUnion: jest.fn((v: string) => `arrayUnion(${v})`),
  },
}))

import { GET, POST } from '../route'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { getReferenceUnit } from '@/data/basics/references'
import { db } from '@/lib/firebase/admin'

const mockAuth = authenticateRequest as jest.MockedFunction<
  typeof authenticateRequest
>
const mockGetReferenceUnit = getReferenceUnit as jest.MockedFunction<
  typeof getReferenceUnit
>

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  __mockDoc: mockDoc,
  __mockCollection: mockCollection,
} = require('@/lib/firebase/admin')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createPostRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost:3000/api/basics/unlock-content', {
    method: 'POST',
    headers: { Authorization: 'Bearer mock-token' },
    body: JSON.stringify(body),
  })
}

function createGetRequest(params: Record<string, string> = {}): NextRequest {
  const url = new URL('http://localhost:3000/api/basics/unlock-content')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return new NextRequest(url.toString(), {
    method: 'GET',
    headers: { Authorization: 'Bearer mock-token' },
  })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/basics/unlock-content', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockAuth.mockResolvedValue({
      userId: 'u1',
      decodedToken: { uid: 'u1' },
    } as any)
    ;(db.collection as jest.Mock).mockReturnValue(mockCollection)
    mockCollection.doc.mockReturnValue(mockDoc)
    mockDoc.set.mockResolvedValue(undefined)
    mockDoc.update.mockResolvedValue(undefined)
  })

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    )
    const res = await POST(createPostRequest({ sectionId: 's1', unitId: 'u1' }))
    expect(res.status).toBe(401)
  })

  it('returns 400 when sectionId or unitId is missing', async () => {
    const res = await POST(createPostRequest({ sectionId: 's1' }))
    expect(res.status).toBe(400)
  })

  it('returns 404 when unit is not found', async () => {
    mockGetReferenceUnit.mockReturnValue(undefined)

    const res = await POST(
      createPostRequest({ sectionId: 's1', unitId: 'bad' })
    )
    expect(res.status).toBe(404)
  })

  it('returns success with alreadyUnlocked when already unlocked', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockGetReferenceUnit.mockReturnValue({
      id: 'unit-1',
      title: 'Unit 1',
    } as any)
    mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({ unlockedUnits: ['unit-1'] }),
    })

    const res = await POST(
      createPostRequest({ sectionId: 's1', unitId: 'unit-1' })
    )
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.data.alreadyUnlocked).toBe(true)
    expect(json.data.xpCharged).toBe(0)
  })

  it('returns 400 when insufficient XP', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockGetReferenceUnit.mockReturnValue({
      id: 'unit-2',
      title: 'Unit 2',
    } as any)
    // unlockedContent doc
    mockDoc.get.mockResolvedValueOnce({ exists: false })
    // userBasicsProgress doc
    mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({ math: { totalXP: 1 }, reading: { totalXP: 1 } }),
    })

    const res = await POST(
      createPostRequest({ sectionId: 's1', unitId: 'unit-2', xpCost: 10 })
    )
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/insufficient/i)
  })
})

describe('GET /api/basics/unlock-content', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockAuth.mockResolvedValue({
      userId: 'u1',
      decodedToken: { uid: 'u1' },
    } as any)
    ;(db.collection as jest.Mock).mockReturnValue(mockCollection)
    mockCollection.doc.mockReturnValue(mockDoc)
  })

  it('returns 401 when authentication fails', async () => {
    mockAuth.mockResolvedValue(
      NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    )
    const res = await GET(createGetRequest())
    expect(res.status).toBe(401)
  })

  it('returns empty list when no content unlocked', async () => {
    mockDoc.get.mockResolvedValueOnce({ exists: false })

    const res = await GET(createGetRequest())
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.data.unlockedUnits).toEqual([])
  })

  it('returns unlocked units', async () => {
    mockDoc.get.mockResolvedValueOnce({
      exists: true,
      data: () => ({
        unlockedUnits: ['s1-unit1', 's1-unit2', 's2-unit1'],
        unlockedAt: {},
        totalXpSpent: 15,
      }),
    })

    const res = await GET(createGetRequest())
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.data.unlockedUnits).toHaveLength(3)
    expect(json.data.totalXpSpent).toBe(15)
  })
})
