/**
 * @jest-environment node
 */

/**
 * Unit tests for credit reservation system
 */

// --- Firestore mock setup ---
const mockAdd = jest.fn()
const mockUpdate = jest.fn()
const mockGet = jest.fn()
const mockWhere = jest.fn()
const mockDoc = jest.fn()
const mockCollection = jest.fn()

// Build a chainable query mock
function createQueryMock() {
  const query: Record<string, jest.Mock> = {}
  query.where = jest.fn().mockReturnValue(query)
  query.get = mockGet
  return query
}

const queryMock = createQueryMock()

mockCollection.mockReturnValue({
  where: queryMock.where,
  get: queryMock.get,
  add: mockAdd,
  doc: mockDoc,
})

mockDoc.mockReturnValue({
  update: mockUpdate,
  get: mockGet,
})

jest.mock('@/lib/firebase/admin', () => ({
  db: {
    collection: (...args: unknown[]) => mockCollection(...args),
  },
}))

jest.mock('@/lib/utils/firestore-helpers', () => ({
  createISOTimestamp: jest.fn(() => '2026-03-03T12:00:00.000Z'),
}))

jest.mock('../balance', () => ({
  getUserCredits: jest.fn(),
}))

jest.mock('../types', () => ({
  CREDIT_CONSTANTS: {
    MINIMUM_BALANCE_CENTS: -5000,
    BASICS_MINIMUM_BALANCE_CENTS: -100,
    COST_MULTIPLIER: 10,
    CUSTOMER_MARKUP_MULTIPLIER: 3,
    CUSTOMER_DEBT_MARKUP_MULTIPLIER: 5,
    MINIMUM_DEPOSIT_CENTS: 500,
    MAXIMUM_DEPOSIT_CENTS: 50000,
    MINIMUM_DOCUMENT_COST_CENTS: 10,
  },
  CREDIT_COLLECTIONS: {
    TRANSACTIONS: 'credit_transactions',
  },
}))

// Import after mocks
import {
  createReservation,
  releaseReservation,
  releaseReservationByDocument,
  convertReservation,
  convertReservationByDocument,
  getActiveReservations,
  getTotalReserved,
} from '../reservation'
import { getUserCredits } from '../balance'

const mockGetUserCredits = getUserCredits as jest.Mock

describe('createReservation', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Default: user has positive balance
    mockGetUserCredits.mockResolvedValue({
      balance: 5000,
      totalDeposited: 10000,
      totalUsed: 5000,
    })

    // Default: no existing reservations
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [],
      empty: true,
    })

    // Default: add returns a document reference
    mockAdd.mockResolvedValue({ id: 'reservation-123' })
  })

  it('creates a reservation with correct fields', async () => {
    const result = await createReservation('user-1', 'doc-abc', 300, 100)

    expect(result.success).toBe(true)
    expect(result.reservationId).toBe('reservation-123')

    // Verify the document was created with the right data
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-1',
        documentId: 'doc-abc',
        amount: 300,
        rawAmount: 100,
        markup: 3, // CUSTOMER_MARKUP_MULTIPLIER
        status: 'reserved',
        createdAt: '2026-03-03T12:00:00.000Z',
        resolvedAt: null,
        transactionId: null,
      })
    )
  })

  it('calls collection with correct collection name', async () => {
    await createReservation('user-1', 'doc-abc', 300, 100)

    // Should call collection('credit_reservations')
    expect(mockCollection).toHaveBeenCalledWith('credit_reservations')
  })

  it('checks existing reservations for the user', async () => {
    await createReservation('user-1', 'doc-abc', 300, 100)

    // Should query for existing reserved reservations
    expect(queryMock.where).toHaveBeenCalledWith('userId', '==', 'user-1')
    expect(queryMock.where).toHaveBeenCalledWith('status', '==', 'reserved')
  })

  it('fetches user credits', async () => {
    await createReservation('user-1', 'doc-abc', 300, 100)

    expect(mockGetUserCredits).toHaveBeenCalledWith('user-1')
  })

  it('allows reservation even with existing reservations (no balance check)', async () => {
    // User has some existing reservations summing to 4000
    queryMock.get.mockResolvedValue({
      docs: [
        { id: 'res-1', data: () => ({ amount: 2000 }) },
        { id: 'res-2', data: () => ({ amount: 2000 }) },
      ],
      empty: false,
    })

    const result = await createReservation('user-1', 'doc-new', 500, 170)

    expect(result.success).toBe(true)
    expect(result.reservationId).toBe('reservation-123')
  })

  it('allows reservation even with negative balance (infinite debt)', async () => {
    mockGetUserCredits.mockResolvedValue({
      balance: -10000,
      totalDeposited: 0,
      totalUsed: 10000,
    })

    const result = await createReservation('user-1', 'doc-abc', 300, 100)

    expect(result.success).toBe(true)
    expect(result.reservationId).toBe('reservation-123')
  })

  it('returns error when Firestore add fails', async () => {
    mockAdd.mockRejectedValue(new Error('Firestore write failed'))

    const result = await createReservation('user-1', 'doc-abc', 300, 100)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Firestore write failed')
  })

  it('returns error when getUserCredits fails', async () => {
    mockGetUserCredits.mockRejectedValue(new Error('User not found'))

    const result = await createReservation('user-1', 'doc-abc', 300, 100)

    expect(result.success).toBe(false)
    expect(result.error).toBe('User not found')
  })

  it('returns generic error for non-Error throws', async () => {
    mockGetUserCredits.mockRejectedValue('some string error')

    const result = await createReservation('user-1', 'doc-abc', 300, 100)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to create reservation')
  })
})

describe('releaseReservation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDoc.mockReturnValue({ update: mockUpdate })
    mockUpdate.mockResolvedValue(undefined)
  })

  it('updates the reservation status to released', async () => {
    const result = await releaseReservation('reservation-456')

    expect(result.success).toBe(true)
    expect(mockDoc).toHaveBeenCalledWith('reservation-456')
    expect(mockUpdate).toHaveBeenCalledWith({
      status: 'released',
      resolvedAt: '2026-03-03T12:00:00.000Z',
    })
  })

  it('returns error when update fails', async () => {
    mockUpdate.mockRejectedValue(new Error('Document not found'))

    const result = await releaseReservation('reservation-456')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Document not found')
  })

  it('returns generic error for non-Error throws', async () => {
    mockUpdate.mockRejectedValue(42)

    const result = await releaseReservation('reservation-456')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to release reservation')
  })
})

describe('releaseReservationByDocument', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDoc.mockReturnValue({ update: mockUpdate })
    mockUpdate.mockResolvedValue(undefined)
  })

  it('finds and releases the reservation for a document', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [{ id: 'res-found', data: () => ({ amount: 500 }) }],
      empty: false,
    })

    const result = await releaseReservationByDocument('doc-xyz')

    expect(result.success).toBe(true)
    expect(result.reservationId).toBe('res-found')
    expect(queryMock.where).toHaveBeenCalledWith('documentId', '==', 'doc-xyz')
    expect(queryMock.where).toHaveBeenCalledWith('status', '==', 'reserved')
    expect(mockDoc).toHaveBeenCalledWith('res-found')
    expect(mockUpdate).toHaveBeenCalledWith({
      status: 'released',
      resolvedAt: '2026-03-03T12:00:00.000Z',
    })
  })

  it('returns success when no reservation exists for document', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [],
      empty: true,
    })

    const result = await releaseReservationByDocument('doc-nonexistent')

    expect(result.success).toBe(true)
    expect(result.reservationId).toBeUndefined()
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  it('returns error when query fails', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockRejectedValue(new Error('Firestore query failed'))

    const result = await releaseReservationByDocument('doc-xyz')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Firestore query failed')
  })

  it('returns error when update fails', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [{ id: 'res-found', data: () => ({ amount: 500 }) }],
      empty: false,
    })
    mockUpdate.mockRejectedValue(new Error('Update failed'))

    const result = await releaseReservationByDocument('doc-xyz')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Update failed')
  })
})

describe('convertReservation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDoc.mockReturnValue({ update: mockUpdate })
    mockUpdate.mockResolvedValue(undefined)
  })

  it('updates the reservation status to converted with transactionId', async () => {
    const result = await convertReservation('reservation-789', 'tx-abc')

    expect(result.success).toBe(true)
    expect(mockDoc).toHaveBeenCalledWith('reservation-789')
    expect(mockUpdate).toHaveBeenCalledWith({
      status: 'converted',
      resolvedAt: '2026-03-03T12:00:00.000Z',
      transactionId: 'tx-abc',
    })
  })

  it('returns error when update fails', async () => {
    mockUpdate.mockRejectedValue(new Error('Permission denied'))

    const result = await convertReservation('reservation-789', 'tx-abc')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Permission denied')
  })

  it('returns generic error for non-Error throws', async () => {
    mockUpdate.mockRejectedValue(undefined)

    const result = await convertReservation('reservation-789', 'tx-abc')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to convert reservation')
  })
})

describe('convertReservationByDocument', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDoc.mockReturnValue({ update: mockUpdate })
    mockUpdate.mockResolvedValue(undefined)
  })

  it('finds and converts the reservation for a document', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [{ id: 'res-convert', data: () => ({ amount: 750 }) }],
      empty: false,
    })

    const result = await convertReservationByDocument('doc-convert', 'tx-final')

    expect(result.success).toBe(true)
    expect(result.reservationId).toBe('res-convert')
    expect(result.reservedAmount).toBe(750)
    expect(queryMock.where).toHaveBeenCalledWith(
      'documentId',
      '==',
      'doc-convert'
    )
    expect(queryMock.where).toHaveBeenCalledWith('status', '==', 'reserved')
    expect(mockDoc).toHaveBeenCalledWith('res-convert')
    expect(mockUpdate).toHaveBeenCalledWith({
      status: 'converted',
      resolvedAt: '2026-03-03T12:00:00.000Z',
      transactionId: 'tx-final',
    })
  })

  it('returns success when no reservation exists for document', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [],
      empty: true,
    })

    const result = await convertReservationByDocument('doc-none', 'tx-final')

    expect(result.success).toBe(true)
    expect(result.reservationId).toBeUndefined()
    expect(result.reservedAmount).toBeUndefined()
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  it('returns error when query fails', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockRejectedValue(new Error('Network error'))

    const result = await convertReservationByDocument('doc-xyz', 'tx-final')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Network error')
  })

  it('returns error when update fails', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [{ id: 'res-convert', data: () => ({ amount: 750 }) }],
      empty: false,
    })
    mockUpdate.mockRejectedValue(new Error('Write error'))

    const result = await convertReservationByDocument('doc-xyz', 'tx-final')

    expect(result.success).toBe(false)
    expect(result.error).toBe('Write error')
  })
})

describe('getActiveReservations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns active reservations for a user', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [
        {
          id: 'res-1',
          data: () => ({
            userId: 'user-1',
            documentId: 'doc-1',
            amount: 300,
            rawAmount: 100,
            markup: 3,
            status: 'reserved',
            createdAt: '2026-03-01T00:00:00.000Z',
            resolvedAt: null,
            transactionId: null,
          }),
        },
        {
          id: 'res-2',
          data: () => ({
            userId: 'user-1',
            documentId: 'doc-2',
            amount: 600,
            rawAmount: 200,
            markup: 3,
            status: 'reserved',
            createdAt: '2026-03-02T00:00:00.000Z',
            resolvedAt: null,
            transactionId: null,
          }),
        },
      ],
      empty: false,
    })

    const reservations = await getActiveReservations('user-1')

    expect(reservations).toHaveLength(2)
    expect(reservations[0]).toEqual(
      expect.objectContaining({
        id: 'res-1',
        userId: 'user-1',
        documentId: 'doc-1',
        amount: 300,
        status: 'reserved',
      })
    )
    expect(reservations[1]).toEqual(
      expect.objectContaining({
        id: 'res-2',
        userId: 'user-1',
        documentId: 'doc-2',
        amount: 600,
        status: 'reserved',
      })
    )
    expect(queryMock.where).toHaveBeenCalledWith('userId', '==', 'user-1')
    expect(queryMock.where).toHaveBeenCalledWith('status', '==', 'reserved')
  })

  it('returns empty array when user has no active reservations', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [],
      empty: true,
    })

    const reservations = await getActiveReservations('user-no-reservations')

    expect(reservations).toEqual([])
  })
})

describe('getTotalReserved', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sums amounts from all active reservations', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [
        {
          id: 'res-1',
          data: () => ({
            userId: 'user-1',
            documentId: 'doc-1',
            amount: 300,
            rawAmount: 100,
            markup: 3,
            status: 'reserved',
            createdAt: '2026-03-01T00:00:00.000Z',
            resolvedAt: null,
            transactionId: null,
          }),
        },
        {
          id: 'res-2',
          data: () => ({
            userId: 'user-1',
            documentId: 'doc-2',
            amount: 700,
            rawAmount: 233,
            markup: 3,
            status: 'reserved',
            createdAt: '2026-03-02T00:00:00.000Z',
            resolvedAt: null,
            transactionId: null,
          }),
        },
      ],
      empty: false,
    })

    const total = await getTotalReserved('user-1')

    expect(total).toBe(1000) // 300 + 700
  })

  it('returns 0 when user has no active reservations', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [],
      empty: true,
    })

    const total = await getTotalReserved('user-no-reservations')

    expect(total).toBe(0)
  })

  it('handles single reservation correctly', async () => {
    queryMock.where.mockReturnValue({
      where: queryMock.where,
      get: queryMock.get,
    })
    queryMock.get.mockResolvedValue({
      docs: [
        {
          id: 'res-single',
          data: () => ({
            userId: 'user-1',
            documentId: 'doc-1',
            amount: 450,
            rawAmount: 150,
            markup: 3,
            status: 'reserved',
            createdAt: '2026-03-01T00:00:00.000Z',
            resolvedAt: null,
            transactionId: null,
          }),
        },
      ],
      empty: false,
    })

    const total = await getTotalReserved('user-1')

    expect(total).toBe(450)
  })
})
