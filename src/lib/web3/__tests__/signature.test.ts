/**
 * @jest-environment node
 */

/**
 * Unit tests for wallet signature verification and config helpers
 */

// Mock viem before imports
jest.mock('viem', () => ({
  verifyMessage: jest.fn(),
}))

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}))

// Mock wagmi imports used by config.ts so it can be imported without errors
jest.mock('wagmi', () => ({
  http: jest.fn(),
  createConfig: jest.fn(() => ({})),
  createStorage: jest.fn(() => ({})),
  cookieStorage: {},
}))

jest.mock('wagmi/chains', () => ({
  base: { id: 8453 },
}))

import { verifyWalletSignature } from '../signature'
import { createSignMessage, isSignatureTimestampValid } from '../config'
import { verifyMessage } from 'viem'

const mockVerifyMessage = verifyMessage as jest.Mock

describe('createSignMessage', () => {
  it('returns a string containing the action', () => {
    const message = createSignMessage('claim_mor_credits', 1709500000000)
    expect(message).toContain('claim_mor_credits')
  })

  it('returns a string containing the timestamp', () => {
    const timestamp = 1709500000000
    const message = createSignMessage('claim_mor_credits', timestamp)
    expect(message).toContain(String(timestamp))
  })

  it('includes the PitchRise verification header', () => {
    const message = createSignMessage('link_wallet', 1709500000000)
    expect(message).toContain('PitchRise Wallet Verification')
  })

  it('includes the non-transfer disclaimer', () => {
    const message = createSignMessage('link_wallet', 1709500000000)
    expect(message).toContain(
      'does not grant permission to transfer any tokens'
    )
  })

  it('produces different messages for different actions', () => {
    const ts = Date.now()
    const msg1 = createSignMessage('claim_mor_credits', ts)
    const msg2 = createSignMessage('link_wallet', ts)
    expect(msg1).not.toBe(msg2)
  })

  it('produces different messages for different timestamps', () => {
    const msg1 = createSignMessage('claim_mor_credits', 1000)
    const msg2 = createSignMessage('claim_mor_credits', 2000)
    expect(msg1).not.toBe(msg2)
  })
})

describe('isSignatureTimestampValid', () => {
  it('returns true for a timestamp within 5 minutes', () => {
    const now = Date.now()
    expect(isSignatureTimestampValid(now)).toBe(true)
  })

  it('returns true for a timestamp 4 minutes ago', () => {
    const fourMinutesAgo = Date.now() - 4 * 60 * 1000
    expect(isSignatureTimestampValid(fourMinutesAgo)).toBe(true)
  })

  it('returns false for a timestamp more than 5 minutes ago', () => {
    const sixMinutesAgo = Date.now() - 6 * 60 * 1000
    expect(isSignatureTimestampValid(sixMinutesAgo)).toBe(false)
  })

  it('returns false for a timestamp 5 minutes in the future', () => {
    const fiveMinutesFuture = Date.now() + 6 * 60 * 1000
    expect(isSignatureTimestampValid(fiveMinutesFuture)).toBe(false)
  })

  it('returns true for a timestamp just under 5 minutes ago', () => {
    // 4 minutes 59 seconds ago
    const justUnder = Date.now() - (5 * 60 * 1000 - 1000)
    expect(isSignatureTimestampValid(justUnder)).toBe(true)
  })

  it('returns false for a very old timestamp', () => {
    expect(isSignatureTimestampValid(0)).toBe(false)
  })
})

describe('verifyWalletSignature', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns verified address for a valid signature', async () => {
    mockVerifyMessage.mockResolvedValue(true)

    const result = await verifyWalletSignature(
      '0xAbC1234567890DEF1234567890abcdef12345678',
      '0xdeadbeef' as `0x${string}`,
      'claim_mor_credits',
      Date.now()
    )

    expect(result.valid).toBe(true)
    expect(result.walletAddress).toBe(
      '0xAbC1234567890DEF1234567890abcdef12345678'.toLowerCase()
    )
    expect(result.error).toBeUndefined()
  })

  it('returns error for an invalid signature', async () => {
    mockVerifyMessage.mockResolvedValue(false)

    const result = await verifyWalletSignature(
      '0xAbC1234567890DEF1234567890abcdef12345678',
      '0xbadsig' as `0x${string}`,
      'claim_mor_credits',
      Date.now()
    )

    expect(result.valid).toBe(false)
    expect(result.error).toBe('Invalid signature. Please try again.')
    expect(result.walletAddress).toBeUndefined()
  })

  it('returns error for expired timestamp (>5 min)', async () => {
    const expiredTimestamp = Date.now() - 6 * 60 * 1000

    const result = await verifyWalletSignature(
      '0xAbC1234567890DEF1234567890abcdef12345678',
      '0xdeadbeef' as `0x${string}`,
      'claim_mor_credits',
      expiredTimestamp
    )

    expect(result.valid).toBe(false)
    expect(result.error).toBe('Signature has expired. Please sign again.')
    // verifyMessage should not have been called since timestamp check fails first
    expect(mockVerifyMessage).not.toHaveBeenCalled()
  })

  it('returns error when viem throws an exception', async () => {
    mockVerifyMessage.mockRejectedValue(new Error('Invalid address format'))

    const result = await verifyWalletSignature(
      '0xinvalid',
      '0xdeadbeef' as `0x${string}`,
      'claim_mor_credits',
      Date.now()
    )

    expect(result.valid).toBe(false)
    expect(result.error).toBe('Failed to verify signature.')
  })

  it('passes the correct message to verifyMessage', async () => {
    mockVerifyMessage.mockResolvedValue(true)
    const timestamp = Date.now()
    const action = 'link_wallet'

    await verifyWalletSignature(
      '0xAbC1234567890DEF1234567890abcdef12345678',
      '0xdeadbeef' as `0x${string}`,
      action,
      timestamp
    )

    const expectedMessage = createSignMessage(action, timestamp)
    expect(mockVerifyMessage).toHaveBeenCalledWith({
      address: '0xAbC1234567890DEF1234567890abcdef12345678',
      message: expectedMessage,
      signature: '0xdeadbeef',
    })
  })

  it('lowercases the returned wallet address', async () => {
    mockVerifyMessage.mockResolvedValue(true)

    const result = await verifyWalletSignature(
      '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
      '0xsig' as `0x${string}`,
      'claim_mor_credits',
      Date.now()
    )

    expect(result.valid).toBe(true)
    expect(result.walletAddress).toBe(
      '0xABCDEF1234567890ABCDEF1234567890ABCDEF12'.toLowerCase()
    )
  })
})
