/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Mocks – all mock fns must live inside jest.mock factories (SWC hoisting)
// ---------------------------------------------------------------------------

// Set env var inside a beforeAll? No — jest.mock factories are hoisted before
// imports, so we set it in the first factory to ensure the route module
// sees it when it captures webhookSecret at module scope.
jest.mock('@/lib/utils/error-helpers', () => {
  // Side-effect: set env before the route module loads
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
  return { getErrorMessage: (_e: unknown, fallback: string) => fallback }
})

// Shared container that factories and tests can both reference.
// Using `var` avoids the TDZ issue with `const` under SWC transforms.
// eslint-disable-next-line no-var
var __stripeMocks: {
  constructEvent: jest.Mock
  subscriptionsRetrieve: jest.Mock
  paymentIntentsRetrieve: jest.Mock
}

jest.mock('stripe', () => {
  __stripeMocks = {
    constructEvent: jest.fn(),
    subscriptionsRetrieve: jest.fn(),
    paymentIntentsRetrieve: jest.fn(),
  }
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      webhooks: { constructEvent: __stripeMocks.constructEvent },
      subscriptions: { retrieve: __stripeMocks.subscriptionsRetrieve },
      paymentIntents: { retrieve: __stripeMocks.paymentIntentsRetrieve },
    })),
  }
})

jest.mock('@/lib/firebase/admin', () => {
  const _mockDoc: Record<string, jest.Mock> = {
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  }
  const _mockCollection = {
    doc: jest.fn().mockReturnValue(_mockDoc),
  }
  return {
    db: { collection: jest.fn().mockReturnValue(_mockCollection) },
    __mockDoc: _mockDoc,
    __mockCollection: _mockCollection,
  }
})

// eslint-disable-next-line no-var
var __creditMocks: { addCredits: jest.Mock; refundCredits: jest.Mock }

jest.mock('@/lib/credits/balance', () => {
  __creditMocks = {
    addCredits: jest.fn(),
    refundCredits: jest.fn(),
  }
  return {
    addCredits: __creditMocks.addCredits,
    refundCredits: __creditMocks.refundCredits,
  }
})

jest.mock('@/lib/logger', () => ({
  apiLogger: {
    apiError: jest.fn(),
    success: jest.fn(),
    debug: jest.fn(),
  },
}))

// Import handler after mocks
import { POST } from '../route'
import { db } from '@/lib/firebase/admin'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
  __mockDoc: mockDoc,
  __mockCollection: mockCollection,
} = require('@/lib/firebase/admin')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createWebhookRequest(
  body = '{}',
  signature = 'sig_test'
): NextRequest {
  return new NextRequest('http://localhost:3000/api/stripe/webhook', {
    method: 'POST',
    body,
    headers: { 'stripe-signature': signature },
  })
}

function buildEvent(
  type: string,
  data: Record<string, unknown>,
  id = 'evt_test'
) {
  return { id, type, data: { object: data } }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/stripe/webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default: event not yet processed
    mockDoc.get.mockResolvedValue({ exists: false })
    mockDoc.set.mockResolvedValue(undefined)
    mockDoc.update.mockResolvedValue(undefined)
    // Re-wire collection mock so chained .doc() works
    ;(db.collection as jest.Mock).mockReturnValue(mockCollection)
    mockCollection.doc.mockReturnValue(mockDoc)
  })

  it('returns 400 when stripe-signature header is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      body: '{}',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/signature/i)
  })

  it('returns 400 when signature verification fails', async () => {
    __stripeMocks.constructEvent.mockImplementation(() => {
      throw new Error('Invalid signature')
    })

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/invalid signature/i)
  })

  it('skips already-processed events (idempotency)', async () => {
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('checkout.session.completed', {})
    )
    mockDoc.get.mockResolvedValueOnce({ exists: true }) // already processed

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.skipped).toBe('already_processed')
  })

  it('handles credit_deposit checkout session', async () => {
    const session = {
      id: 'cs_test',
      metadata: { type: 'credit_deposit', userId: 'u1', amountCents: '500' },
      payment_status: 'paid',
      payment_intent: 'pi_test',
      customer: 'cus_test',
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('checkout.session.completed', session)
    )
    __creditMocks.addCredits.mockResolvedValue({
      newBalance: 500,
      transaction: { id: 'tx_1' },
    })

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(__creditMocks.addCredits).toHaveBeenCalledWith(
      'u1',
      500,
      expect.objectContaining({
        stripePaymentIntentId: 'pi_test',
      })
    )
  })

  it('handles gate_bypass checkout session', async () => {
    const session = {
      id: 'cs_gate',
      metadata: { type: 'gate_bypass', userId: 'u2', targetSection: 'alc' },
      payment_status: 'paid',
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('checkout.session.completed', session)
    )

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(mockDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({ gateBypassesPurchased: { alc: true } }),
      { merge: true }
    )
  })

  it('handles subscription checkout session', async () => {
    const session = {
      id: 'cs_sub',
      mode: 'subscription',
      metadata: { firebaseUID: 'u3', tierId: 'pro' },
      subscription: 'sub_test',
      customer: 'cus_3',
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('checkout.session.completed', session)
    )
    __stripeMocks.subscriptionsRetrieve.mockResolvedValue({
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + 86400,
      cancel_at_period_end: false,
    })

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(__stripeMocks.subscriptionsRetrieve).toHaveBeenCalledWith('sub_test')
    expect(mockDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({ tier: 'pro', status: 'active' })
    )
  })

  it('handles customer.subscription.updated', async () => {
    const sub = {
      id: 'sub_upd',
      metadata: { firebaseUID: 'u4', tierId: 'pro' },
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + 86400,
      cancel_at_period_end: false,
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('customer.subscription.updated', sub)
    )

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(mockDoc.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'active' })
    )
  })

  it('handles customer.subscription.deleted', async () => {
    const sub = {
      id: 'sub_del',
      metadata: { firebaseUID: 'u5' },
      customer: 'cus_5',
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('customer.subscription.deleted', sub)
    )

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(mockDoc.set).toHaveBeenCalledWith(
      expect.objectContaining({ tier: 'free', status: 'active' })
    )
  })

  it('handles charge.refunded with credit_deposit payment intent', async () => {
    const charge = {
      id: 'ch_ref',
      payment_intent: 'pi_ref',
      refunds: {
        data: [{ id: 're_1', amount: 200, reason: 'requested_by_customer' }],
      },
    }
    __stripeMocks.constructEvent.mockReturnValue(
      buildEvent('charge.refunded', charge)
    )
    __stripeMocks.paymentIntentsRetrieve.mockResolvedValue({
      metadata: { type: 'credit_deposit', userId: 'u6' },
    })
    // First get = idempotency event check (not processed), second = refund check (not processed)
    mockDoc.get
      .mockResolvedValueOnce({ exists: false }) // event idempotency
      .mockResolvedValueOnce({ exists: false }) // refund idempotency
    __creditMocks.refundCredits.mockResolvedValue({
      newBalance: 300,
      transaction: { id: 'tx_ref' },
    })

    const res = await POST(createWebhookRequest())
    expect(res.status).toBe(200)
    expect(__creditMocks.refundCredits).toHaveBeenCalledWith(
      'u6',
      200,
      expect.objectContaining({ stripeRefundId: 're_1' })
    )
  })
})
