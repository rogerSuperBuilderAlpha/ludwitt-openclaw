/**
 * @jest-environment node
 */

/**
 * Unit tests for MOR credit balance tracking
 *
 * Tests getMonthlyClaimedCredits, getAvailableCredits, claimMorCredits,
 * linkWallet, unlinkWallet, and getUserWallets with mocked Firestore.
 */

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockTransactionGet = jest.fn()
const mockTransactionSet = jest.fn()
const mockRunTransaction = jest.fn()
const mockCollectionGet = jest.fn()
const mockCollectionWhere = jest.fn()
const mockDocGet = jest.fn()
const mockDocRef = { get: mockDocGet, id: 'mock-doc-id' }

jest.mock('@/lib/firebase/admin', () => {
  const chainable = () => {
    const chain: Record<string, jest.Mock> = {}
    chain.where = jest.fn(() => chain)
    chain.get = jest.fn()
    chain.doc = jest.fn(() => ({
      get: jest.fn(),
      id: 'mock-doc-id',
    }))
    return chain
  }

  return {
    db: {
      collection: jest.fn(() => chainable()),
      runTransaction: jest.fn(),
    },
  }
})

jest.mock('@/lib/utils/firestore-helpers', () => ({
  createISOTimestamp: jest.fn(() => '2026-03-01T00:00:00.000Z'),
}))

jest.mock('@/lib/morpheus/client', () => ({
  getCurrentMonthKey: jest.fn(() => '2026-03'),
}))

jest.mock('../balance', () => ({
  addCredits: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}))

import {
  getMonthlyClaimedCredits,
  getAvailableCredits,
  claimMorCredits,
  getUserWallets,
  linkWallet,
  unlinkWallet,
} from '../mor-balance'
import { db } from '@/lib/firebase/admin'
import { addCredits } from '../balance'

const mockDb = db as unknown as {
  collection: jest.Mock
  runTransaction: jest.Mock
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Set up the chainable mock for collection queries (where/get)
 */
function setupCollectionQuery(
  docs: Array<{ data: () => Record<string, unknown> }>
) {
  const chain: Record<string, jest.Mock | jest.Mock> = {}
  chain.where = jest.fn(() => chain)
  chain.get = jest.fn().mockResolvedValue({
    forEach: (cb: (doc: { data: () => Record<string, unknown> }) => void) => {
      docs.forEach(cb)
    },
  })
  chain.doc = jest.fn(() => ({
    get: jest.fn(),
    id: 'mock-claim-id',
  }))
  return chain
}

/**
 * Set up the doc mock for single document reads
 */
function setupDocGet(exists: boolean, data?: Record<string, unknown>) {
  const docMock = {
    get: jest.fn().mockResolvedValue({
      exists,
      data: () => data,
    }),
    id: 'mock-doc-id',
  }
  const collectionMock: Record<string, jest.Mock> = {}
  collectionMock.doc = jest.fn(() => docMock)
  collectionMock.where = jest.fn(() => collectionMock)
  collectionMock.get = jest.fn()
  return collectionMock
}

// ---------------------------------------------------------------------------
// getMonthlyClaimedCredits
// ---------------------------------------------------------------------------

describe('getMonthlyClaimedCredits', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 0 when there are no claims', async () => {
    const chain = setupCollectionQuery([])
    mockDb.collection.mockReturnValue(chain)

    const result = await getMonthlyClaimedCredits('user-1')

    expect(result).toBe(0)
    expect(chain.where).toHaveBeenCalledWith('userId', '==', 'user-1')
    expect(chain.where).toHaveBeenCalledWith('monthKey', '==', '2026-03')
  })

  it('sums multiple claims correctly', async () => {
    const chain = setupCollectionQuery([
      { data: () => ({ claimedCents: 200 }) },
      { data: () => ({ claimedCents: 300 }) },
      { data: () => ({ claimedCents: 100 }) },
    ])
    mockDb.collection.mockReturnValue(chain)

    const result = await getMonthlyClaimedCredits('user-1')

    expect(result).toBe(600)
  })

  it('returns the correct sum for a single claim', async () => {
    const chain = setupCollectionQuery([
      { data: () => ({ claimedCents: 500 }) },
    ])
    mockDb.collection.mockReturnValue(chain)

    const result = await getMonthlyClaimedCredits('user-1')

    expect(result).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// getAvailableCredits
// ---------------------------------------------------------------------------

describe('getAvailableCredits', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns full allowance when nothing has been claimed', async () => {
    // Mock for getWalletMonthlyClaimedCredits (used internally by getAvailableCredits)
    const chain = setupCollectionQuery([])
    mockDb.collection.mockReturnValue(chain)

    const result = await getAvailableCredits('user-1', '0xwallet', 1000)

    expect(result.monthlyAllowanceCents).toBe(1000)
    expect(result.claimedThisMonth).toBe(0)
    expect(result.availableToClaim).toBe(1000)
  })

  it('returns partial availability when some credits have been claimed', async () => {
    const chain = setupCollectionQuery([
      { data: () => ({ claimedCents: 400 }) },
    ])
    mockDb.collection.mockReturnValue(chain)

    const result = await getAvailableCredits('user-1', '0xwallet', 1000)

    expect(result.claimedThisMonth).toBe(400)
    expect(result.availableToClaim).toBe(600)
  })

  it('returns zero available when fully claimed', async () => {
    const chain = setupCollectionQuery([
      { data: () => ({ claimedCents: 1000 }) },
    ])
    mockDb.collection.mockReturnValue(chain)

    const result = await getAvailableCredits('user-1', '0xwallet', 1000)

    expect(result.availableToClaim).toBe(0)
  })

  it('never returns negative available credits', async () => {
    // Claimed more than allowance (should not happen but test the guard)
    const chain = setupCollectionQuery([
      { data: () => ({ claimedCents: 1500 }) },
    ])
    mockDb.collection.mockReturnValue(chain)

    const result = await getAvailableCredits('user-1', '0xwallet', 1000)

    expect(result.availableToClaim).toBe(0)
  })

  it('normalizes wallet address to lowercase in query', async () => {
    const chain = setupCollectionQuery([])
    mockDb.collection.mockReturnValue(chain)

    await getAvailableCredits('user-1', '0xABCDEF', 500)

    expect(chain.where).toHaveBeenCalledWith('walletAddress', '==', '0xabcdef')
  })
})

// ---------------------------------------------------------------------------
// claimMorCredits
// ---------------------------------------------------------------------------

describe('claimMorCredits', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws when amount is zero', async () => {
    await expect(
      claimMorCredits('user-1', '0xwallet', 10, 1000, 0, '0xsig')
    ).rejects.toThrow('Claim amount must be greater than 0')
  })

  it('throws when amount is negative', async () => {
    await expect(
      claimMorCredits('user-1', '0xwallet', 10, 1000, -100, '0xsig')
    ).rejects.toThrow('Claim amount must be greater than 0')
  })

  it('creates a claim and adds credits on successful transaction', async () => {
    const claimDocRef = { id: 'claim-123' }

    // Set up collection mock to return doc ref for claims collection
    const claimsCollection: Record<string, jest.Mock> = {}
    claimsCollection.doc = jest.fn(() => claimDocRef)
    claimsCollection.where = jest.fn(() => claimsCollection)

    mockDb.collection.mockReturnValue(claimsCollection)

    // Mock runTransaction to execute the callback
    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          forEach: jest.fn(), // No existing claims
        }),
        set: jest.fn(),
      }
      return callback(transaction)
    })
    ;(addCredits as jest.Mock).mockResolvedValue({
      newBalance: 500,
      transaction: { id: 'tx-1' },
    })

    const result = await claimMorCredits(
      'user-1',
      '0xWALLET',
      10,
      1000,
      500,
      '0xsignature'
    )

    expect(result.claim.userId).toBe('user-1')
    expect(result.claim.walletAddress).toBe('0xwallet')
    expect(result.claim.claimedCents).toBe(500)
    expect(result.claim.monthKey).toBe('2026-03')
    expect(result.newBalance).toBe(500)
    expect(addCredits).toHaveBeenCalledWith(
      'user-1',
      500,
      expect.objectContaining({
        source: 'mor_staking',
        walletAddress: '0xwallet',
      })
    )
  })

  it('throws LIMIT_EXCEEDED when claiming more than available', async () => {
    const claimDocRef = { id: 'claim-456' }
    const claimsCollection: Record<string, jest.Mock> = {}
    claimsCollection.doc = jest.fn(() => claimDocRef)
    claimsCollection.where = jest.fn(() => claimsCollection)
    mockDb.collection.mockReturnValue(claimsCollection)

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          forEach: (cb: Function) => {
            // Existing claim of 800 cents
            cb({ data: () => ({ claimedCents: 800 }) })
          },
        }),
        set: jest.fn(),
      }
      return callback(transaction)
    })

    await expect(
      claimMorCredits('user-1', '0xwallet', 10, 1000, 500, '0xsig')
    ).rejects.toThrow('LIMIT_EXCEEDED')
  })
})

// ---------------------------------------------------------------------------
// getUserWallets
// ---------------------------------------------------------------------------

describe('getUserWallets', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns empty array when user doc does not exist', async () => {
    const collection = setupDocGet(false)
    mockDb.collection.mockReturnValue(collection)

    const wallets = await getUserWallets('user-1')

    expect(wallets).toEqual([])
  })

  it('returns empty array when user has no linked wallets', async () => {
    const collection = setupDocGet(true, {})
    mockDb.collection.mockReturnValue(collection)

    const wallets = await getUserWallets('user-1')

    expect(wallets).toEqual([])
  })

  it('returns wallet addresses from linked wallets', async () => {
    const collection = setupDocGet(true, {
      linkedWallets: [{ address: '0xwallet1' }, { address: '0xwallet2' }],
    })
    mockDb.collection.mockReturnValue(collection)

    const wallets = await getUserWallets('user-1')

    expect(wallets).toEqual(['0xwallet1', '0xwallet2'])
  })

  it('returns single wallet when only one is linked', async () => {
    const collection = setupDocGet(true, {
      linkedWallets: [{ address: '0xonly' }],
    })
    mockDb.collection.mockReturnValue(collection)

    const wallets = await getUserWallets('user-1')

    expect(wallets).toEqual(['0xonly'])
  })
})

// ---------------------------------------------------------------------------
// linkWallet
// ---------------------------------------------------------------------------

describe('linkWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('adds a new wallet to an empty linked wallets array', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    collection.where = jest.fn(() => collection)
    mockDb.collection.mockReturnValue(collection)

    let capturedWallets: unknown[] = []

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({ linkedWallets: [] }),
        }),
        set: jest.fn((_ref: unknown, data: Record<string, unknown>) => {
          capturedWallets = data.linkedWallets as unknown[]
        }),
      }
      return callback(transaction)
    })

    await linkWallet('user-1', '0xNEWWALLET')

    expect(capturedWallets).toHaveLength(1)
    expect((capturedWallets[0] as Record<string, string>).address).toBe(
      '0xnewwallet'
    )
  })

  it('updates lastVerifiedAt when wallet already exists', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    mockDb.collection.mockReturnValue(collection)

    let capturedWallets: unknown[] = []

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            linkedWallets: [
              {
                address: '0xexisting',
                linkedAt: '2026-01-01T00:00:00.000Z',
                lastVerifiedAt: '2026-01-01T00:00:00.000Z',
              },
            ],
          }),
        }),
        set: jest.fn((_ref: unknown, data: Record<string, unknown>) => {
          capturedWallets = data.linkedWallets as unknown[]
        }),
      }
      return callback(transaction)
    })

    await linkWallet('user-1', '0xEXISTING')

    expect(capturedWallets).toHaveLength(1)
    const wallet = capturedWallets[0] as Record<string, string>
    expect(wallet.address).toBe('0xexisting')
    // lastVerifiedAt should be updated to the new timestamp
    expect(wallet.lastVerifiedAt).toBe('2026-03-01T00:00:00.000Z')
    // linkedAt should remain unchanged
    expect(wallet.linkedAt).toBe('2026-01-01T00:00:00.000Z')
  })

  it('handles linking when user doc does not exist yet', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    mockDb.collection.mockReturnValue(collection)

    let capturedWallets: unknown[] = []

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: false,
          data: () => undefined,
        }),
        set: jest.fn((_ref: unknown, data: Record<string, unknown>) => {
          capturedWallets = data.linkedWallets as unknown[]
        }),
      }
      return callback(transaction)
    })

    await linkWallet('user-1', '0xFIRSTWALLET')

    expect(capturedWallets).toHaveLength(1)
    expect((capturedWallets[0] as Record<string, string>).address).toBe(
      '0xfirstwallet'
    )
  })
})

// ---------------------------------------------------------------------------
// unlinkWallet
// ---------------------------------------------------------------------------

describe('unlinkWallet', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('removes the specified wallet from the linked wallets', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    mockDb.collection.mockReturnValue(collection)

    let capturedWallets: unknown[] = []

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            linkedWallets: [{ address: '0xkeep' }, { address: '0xremove' }],
          }),
        }),
        set: jest.fn((_ref: unknown, data: Record<string, unknown>) => {
          capturedWallets = data.linkedWallets as unknown[]
        }),
      }
      return callback(transaction)
    })

    await unlinkWallet('user-1', '0xREMOVE')

    expect(capturedWallets).toHaveLength(1)
    expect((capturedWallets[0] as Record<string, string>).address).toBe(
      '0xkeep'
    )
  })

  it('does nothing when user doc does not exist', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    mockDb.collection.mockReturnValue(collection)

    let transactionSetCalled = false

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: false,
          data: () => undefined,
        }),
        set: jest.fn(() => {
          transactionSetCalled = true
        }),
      }
      return callback(transaction)
    })

    await unlinkWallet('user-1', '0xWALLET')

    expect(transactionSetCalled).toBe(false)
  })

  it('leaves other wallets intact when unlinking one', async () => {
    const userDocRef = { id: 'user-1' }
    const collection: Record<string, jest.Mock> = {}
    collection.doc = jest.fn(() => userDocRef)
    mockDb.collection.mockReturnValue(collection)

    let capturedWallets: unknown[] = []

    mockDb.runTransaction.mockImplementation(async (callback: Function) => {
      const transaction = {
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            linkedWallets: [
              { address: '0xwallet1' },
              { address: '0xwallet2' },
              { address: '0xwallet3' },
            ],
          }),
        }),
        set: jest.fn((_ref: unknown, data: Record<string, unknown>) => {
          capturedWallets = data.linkedWallets as unknown[]
        }),
      }
      return callback(transaction)
    })

    await unlinkWallet('user-1', '0xWALLET2')

    expect(capturedWallets).toHaveLength(2)
    const addresses = capturedWallets.map(
      (w) => (w as Record<string, string>).address
    )
    expect(addresses).toContain('0xwallet1')
    expect(addresses).toContain('0xwallet3')
    expect(addresses).not.toContain('0xwallet2')
  })
})
