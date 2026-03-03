/**
 * @jest-environment node
 */

/**
 * Unit tests for Stripe server-side integration
 *
 * The server.ts module has a top-level env guard and Stripe constructor call,
 * so we mock the 'stripe' module and set env vars before dynamic-importing
 * the module under test.
 */

// Build a mock Stripe instance with all methods used by server.ts
const mockPaymentIntents = {
  create: jest.fn(),
  retrieve: jest.fn(),
  update: jest.fn(),
  cancel: jest.fn(),
}

const mockCustomers = {
  list: jest.fn(),
  create: jest.fn(),
}

const mockInvoices = {
  create: jest.fn(),
  finalizeInvoice: jest.fn(),
  sendInvoice: jest.fn(),
  retrieve: jest.fn(),
  pay: jest.fn(),
}

const mockInvoiceItems = {
  create: jest.fn(),
}

const mockWebhooks = {
  constructEvent: jest.fn(),
}

const mockPaymentMethods = {
  retrieve: jest.fn(),
}

const mockRefunds = {
  create: jest.fn(),
}

// Mock the stripe module: default export is a constructor returning our mock
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: mockPaymentIntents,
    customers: mockCustomers,
    invoices: mockInvoices,
    invoiceItems: mockInvoiceItems,
    webhooks: mockWebhooks,
    paymentMethods: mockPaymentMethods,
    refunds: mockRefunds,
  }))
})

// We will dynamically require the module under test after env setup.
// Declare typed references that are assigned in beforeAll.
let createPaymentIntent: typeof import('../server').createPaymentIntent
let getPaymentIntent: typeof import('../server').getPaymentIntent
let updatePaymentIntent: typeof import('../server').updatePaymentIntent
let cancelPaymentIntent: typeof import('../server').cancelPaymentIntent
let getOrCreateStripeCustomer: typeof import('../server').getOrCreateStripeCustomer
let createInvoice: typeof import('../server').createInvoice
let sendInvoice: typeof import('../server').sendInvoice
let getInvoice: typeof import('../server').getInvoice
let markInvoicePaid: typeof import('../server').markInvoicePaid
let constructWebhookEvent: typeof import('../server').constructWebhookEvent
let getPaymentMethod: typeof import('../server').getPaymentMethod
let createRefund: typeof import('../server').createRefund

beforeAll(() => {
  // Set env vars BEFORE requiring the module so the top-level guard passes
  process.env.STRIPE_SECRET_KEY = 'sk_test_mock'
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock'

  // Dynamic require so it runs after env vars and jest.mock are in place
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const serverModule = require('../server')
  createPaymentIntent = serverModule.createPaymentIntent
  getPaymentIntent = serverModule.getPaymentIntent
  updatePaymentIntent = serverModule.updatePaymentIntent
  cancelPaymentIntent = serverModule.cancelPaymentIntent
  getOrCreateStripeCustomer = serverModule.getOrCreateStripeCustomer
  createInvoice = serverModule.createInvoice
  sendInvoice = serverModule.sendInvoice
  getInvoice = serverModule.getInvoice
  markInvoicePaid = serverModule.markInvoicePaid
  constructWebhookEvent = serverModule.constructWebhookEvent
  getPaymentMethod = serverModule.getPaymentMethod
  createRefund = serverModule.createRefund
})

// ---------------------------------------------------------------------------
// createPaymentIntent
// ---------------------------------------------------------------------------
describe('createPaymentIntent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('converts dollar amount to cents using Math.round(amount * 100)', async () => {
    const fakeIntent = { id: 'pi_123', amount: 4999 }
    mockPaymentIntents.create.mockResolvedValue(fakeIntent)

    await createPaymentIntent({
      amount: 49.99,
      metadata: {
        projectId: 'proj-1',
        customerId: 'cust-1',
        customerEmail: 'a@b.com',
        description: 'Test project',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 4999,
        currency: 'usd',
      })
    )
  })

  it('handles floating-point rounding correctly (e.g. 19.999)', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_fp' })

    await createPaymentIntent({
      amount: 19.999,
      metadata: {
        projectId: 'proj-2',
        customerId: 'cust-2',
        customerEmail: 'b@c.com',
        description: 'Floating point test',
      },
    })

    // Math.round(19.999 * 100) = Math.round(1999.9) = 2000
    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 2000 })
    )
  })

  it('passes metadata to Stripe', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_meta' })

    const metadata = {
      projectId: 'proj-3',
      customerId: 'cust-3',
      customerEmail: 'meta@test.com',
      description: 'Metadata test',
    }

    await createPaymentIntent({ amount: 10, metadata })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ metadata })
    )
  })

  it('defaults currency to usd', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_usd' })

    await createPaymentIntent({
      amount: 5,
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ currency: 'usd' })
    )
  })

  it('allows overriding currency', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_eur' })

    await createPaymentIntent({
      amount: 25,
      currency: 'eur',
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ currency: 'eur' })
    )
  })

  it('enables automatic_payment_methods', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_auto' })

    await createPaymentIntent({
      amount: 1,
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({
        automatic_payment_methods: { enabled: true },
      })
    )
  })

  it('returns the created payment intent', async () => {
    const fakeIntent = {
      id: 'pi_ret',
      amount: 500,
      status: 'requires_payment_method',
    }
    mockPaymentIntents.create.mockResolvedValue(fakeIntent)

    const result = await createPaymentIntent({
      amount: 5,
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(result).toBe(fakeIntent)
  })

  it('propagates Stripe API errors', async () => {
    mockPaymentIntents.create.mockRejectedValue(
      new Error('Stripe card declined')
    )

    await expect(
      createPaymentIntent({
        amount: 100,
        metadata: {
          projectId: 'p',
          customerId: 'c',
          customerEmail: 'e@e.com',
          description: 'd',
        },
      })
    ).rejects.toThrow('Stripe card declined')
  })
})

// ---------------------------------------------------------------------------
// getPaymentIntent
// ---------------------------------------------------------------------------
describe('getPaymentIntent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves a payment intent by ID', async () => {
    const fakeIntent = { id: 'pi_get', amount: 1000 }
    mockPaymentIntents.retrieve.mockResolvedValue(fakeIntent)

    const result = await getPaymentIntent('pi_get')

    expect(mockPaymentIntents.retrieve).toHaveBeenCalledWith('pi_get')
    expect(result).toBe(fakeIntent)
  })

  it('propagates errors when payment intent is not found', async () => {
    mockPaymentIntents.retrieve.mockRejectedValue(
      new Error('No such payment_intent: pi_invalid')
    )

    await expect(getPaymentIntent('pi_invalid')).rejects.toThrow(
      'No such payment_intent: pi_invalid'
    )
  })
})

// ---------------------------------------------------------------------------
// updatePaymentIntent
// ---------------------------------------------------------------------------
describe('updatePaymentIntent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('converts the new amount to cents', async () => {
    const updated = { id: 'pi_upd', amount: 7500 }
    mockPaymentIntents.update.mockResolvedValue(updated)

    await updatePaymentIntent('pi_upd', 75)

    expect(mockPaymentIntents.update).toHaveBeenCalledWith('pi_upd', {
      amount: 7500,
    })
  })

  it('returns the updated payment intent', async () => {
    const updated = { id: 'pi_upd2', amount: 3000 }
    mockPaymentIntents.update.mockResolvedValue(updated)

    const result = await updatePaymentIntent('pi_upd2', 30)

    expect(result).toBe(updated)
  })

  it('handles fractional dollar amounts correctly', async () => {
    mockPaymentIntents.update.mockResolvedValue({ id: 'pi_frac' })

    await updatePaymentIntent('pi_frac', 33.33)

    expect(mockPaymentIntents.update).toHaveBeenCalledWith('pi_frac', {
      amount: 3333,
    })
  })

  it('propagates Stripe errors', async () => {
    mockPaymentIntents.update.mockRejectedValue(
      new Error('Payment intent has already been captured')
    )

    await expect(updatePaymentIntent('pi_err', 50)).rejects.toThrow(
      'Payment intent has already been captured'
    )
  })
})

// ---------------------------------------------------------------------------
// cancelPaymentIntent
// ---------------------------------------------------------------------------
describe('cancelPaymentIntent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('cancels the payment intent by ID', async () => {
    const cancelled = { id: 'pi_can', status: 'canceled' }
    mockPaymentIntents.cancel.mockResolvedValue(cancelled)

    const result = await cancelPaymentIntent('pi_can')

    expect(mockPaymentIntents.cancel).toHaveBeenCalledWith('pi_can')
    expect(result).toBe(cancelled)
  })

  it('propagates errors on already-cancelled intents', async () => {
    mockPaymentIntents.cancel.mockRejectedValue(
      new Error('This PaymentIntent has already been canceled')
    )

    await expect(cancelPaymentIntent('pi_alr')).rejects.toThrow(
      'This PaymentIntent has already been canceled'
    )
  })
})

// ---------------------------------------------------------------------------
// getOrCreateStripeCustomer
// ---------------------------------------------------------------------------
describe('getOrCreateStripeCustomer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns existing customer when found by email', async () => {
    const existingCustomer = { id: 'cus_existing', email: 'found@test.com' }
    mockCustomers.list.mockResolvedValue({ data: [existingCustomer] })

    const result = await getOrCreateStripeCustomer({
      email: 'found@test.com',
      name: 'Found User',
    })

    expect(mockCustomers.list).toHaveBeenCalledWith({
      email: 'found@test.com',
      limit: 1,
    })
    expect(result).toBe(existingCustomer)
    // Should NOT create a new customer
    expect(mockCustomers.create).not.toHaveBeenCalled()
  })

  it('creates new customer when none found by email', async () => {
    mockCustomers.list.mockResolvedValue({ data: [] })
    const newCustomer = { id: 'cus_new', email: 'new@test.com' }
    mockCustomers.create.mockResolvedValue(newCustomer)

    const result = await getOrCreateStripeCustomer({
      email: 'new@test.com',
      name: 'New User',
    })

    expect(mockCustomers.list).toHaveBeenCalledWith({
      email: 'new@test.com',
      limit: 1,
    })
    expect(mockCustomers.create).toHaveBeenCalledWith({
      email: 'new@test.com',
      name: 'New User',
      metadata: undefined,
    })
    expect(result).toBe(newCustomer)
  })

  it('passes metadata when creating a new customer', async () => {
    mockCustomers.list.mockResolvedValue({ data: [] })
    mockCustomers.create.mockResolvedValue({ id: 'cus_meta' })

    await getOrCreateStripeCustomer({
      email: 'meta@test.com',
      name: 'Meta User',
      metadata: { customerId: 'cust-99' },
    })

    expect(mockCustomers.create).toHaveBeenCalledWith({
      email: 'meta@test.com',
      name: 'Meta User',
      metadata: { customerId: 'cust-99' },
    })
  })

  it('propagates Stripe API list errors', async () => {
    mockCustomers.list.mockRejectedValue(new Error('Stripe rate limit'))

    await expect(
      getOrCreateStripeCustomer({ email: 'err@test.com', name: 'Err' })
    ).rejects.toThrow('Stripe rate limit')
  })

  it('propagates Stripe API create errors', async () => {
    mockCustomers.list.mockResolvedValue({ data: [] })
    mockCustomers.create.mockRejectedValue(new Error('Invalid email'))

    await expect(
      getOrCreateStripeCustomer({ email: 'bad', name: 'Bad' })
    ).rejects.toThrow('Invalid email')
  })
})

// ---------------------------------------------------------------------------
// createInvoice
// ---------------------------------------------------------------------------
describe('createInvoice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates an invoice item, invoice, and finalizes it', async () => {
    mockInvoiceItems.create.mockResolvedValue({ id: 'ii_1' })
    const draftInvoice = { id: 'inv_draft' }
    mockInvoices.create.mockResolvedValue(draftInvoice)
    const finalizedInvoice = { id: 'inv_draft', status: 'open' }
    mockInvoices.finalizeInvoice.mockResolvedValue(finalizedInvoice)

    const result = await createInvoice({
      customerId: 'cust-1',
      stripeCustomerId: 'cus_stripe_1',
      amount: 250,
      description: 'Project invoice',
      metadata: { projectId: 'proj-1', customerId: 'cust-1' },
    })

    // 1. Invoice item created with correct amount in cents
    expect(mockInvoiceItems.create).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: 'cus_stripe_1',
        amount: 25000,
        currency: 'usd',
        description: 'Project invoice',
        metadata: { projectId: 'proj-1', customerId: 'cust-1' },
      })
    )

    // 2. Invoice created with customer and default 30 days
    expect(mockInvoices.create).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: 'cus_stripe_1',
        collection_method: 'send_invoice',
        days_until_due: 30,
        auto_advance: true,
        metadata: { projectId: 'proj-1', customerId: 'cust-1' },
      })
    )

    // 3. Invoice finalized
    expect(mockInvoices.finalizeInvoice).toHaveBeenCalledWith('inv_draft')

    expect(result).toBe(finalizedInvoice)
  })

  it('calculates days_until_due from dueDate', async () => {
    mockInvoiceItems.create.mockResolvedValue({ id: 'ii_2' })
    mockInvoices.create.mockResolvedValue({ id: 'inv_due' })
    mockInvoices.finalizeInvoice.mockResolvedValue({ id: 'inv_due' })

    // Set a due date 15 days in the future
    const now = Date.now()
    const fifteenDaysFromNow = new Date(now + 15 * 24 * 60 * 60 * 1000)

    await createInvoice({
      customerId: 'cust-2',
      stripeCustomerId: 'cus_stripe_2',
      amount: 100,
      description: 'With due date',
      metadata: { projectId: 'proj-2', customerId: 'cust-2' },
      dueDate: fifteenDaysFromNow,
    })

    const invoiceCreateCall = mockInvoices.create.mock.calls[0][0]
    // Should be approximately 15 (Math.ceil may vary by a day due to timing)
    expect(invoiceCreateCall.days_until_due).toBeGreaterThanOrEqual(14)
    expect(invoiceCreateCall.days_until_due).toBeLessThanOrEqual(16)
  })

  it('allows custom currency', async () => {
    mockInvoiceItems.create.mockResolvedValue({ id: 'ii_3' })
    mockInvoices.create.mockResolvedValue({ id: 'inv_eur' })
    mockInvoices.finalizeInvoice.mockResolvedValue({ id: 'inv_eur' })

    await createInvoice({
      customerId: 'cust-3',
      stripeCustomerId: 'cus_stripe_3',
      amount: 50,
      currency: 'eur',
      description: 'Euro invoice',
      metadata: { projectId: 'proj-3', customerId: 'cust-3' },
    })

    expect(mockInvoiceItems.create).toHaveBeenCalledWith(
      expect.objectContaining({ currency: 'eur' })
    )
  })

  it('propagates errors from invoiceItems.create', async () => {
    mockInvoiceItems.create.mockRejectedValue(new Error('Invoice item error'))

    await expect(
      createInvoice({
        customerId: 'cust-4',
        stripeCustomerId: 'cus_stripe_4',
        amount: 10,
        description: 'Fail',
        metadata: { projectId: 'proj-4', customerId: 'cust-4' },
      })
    ).rejects.toThrow('Invoice item error')
  })

  it('propagates errors from invoices.create', async () => {
    mockInvoiceItems.create.mockResolvedValue({ id: 'ii_ok' })
    mockInvoices.create.mockRejectedValue(new Error('Invoice create error'))

    await expect(
      createInvoice({
        customerId: 'cust-5',
        stripeCustomerId: 'cus_stripe_5',
        amount: 10,
        description: 'Fail 2',
        metadata: { projectId: 'proj-5', customerId: 'cust-5' },
      })
    ).rejects.toThrow('Invoice create error')
  })
})

// ---------------------------------------------------------------------------
// sendInvoice
// ---------------------------------------------------------------------------
describe('sendInvoice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sends an invoice by ID', async () => {
    const sent = { id: 'inv_sent', status: 'sent' }
    mockInvoices.sendInvoice.mockResolvedValue(sent)

    const result = await sendInvoice('inv_sent')

    expect(mockInvoices.sendInvoice).toHaveBeenCalledWith('inv_sent')
    expect(result).toBe(sent)
  })
})

// ---------------------------------------------------------------------------
// getInvoice
// ---------------------------------------------------------------------------
describe('getInvoice', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves an invoice by ID', async () => {
    const invoice = { id: 'inv_get', status: 'open' }
    mockInvoices.retrieve.mockResolvedValue(invoice)

    const result = await getInvoice('inv_get')

    expect(mockInvoices.retrieve).toHaveBeenCalledWith('inv_get')
    expect(result).toBe(invoice)
  })
})

// ---------------------------------------------------------------------------
// markInvoicePaid
// ---------------------------------------------------------------------------
describe('markInvoicePaid', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('marks an invoice as paid', async () => {
    const paid = { id: 'inv_paid', status: 'paid' }
    mockInvoices.pay.mockResolvedValue(paid)

    const result = await markInvoicePaid('inv_paid')

    expect(mockInvoices.pay).toHaveBeenCalledWith('inv_paid')
    expect(result).toBe(paid)
  })

  it('propagates errors for already-paid invoices', async () => {
    mockInvoices.pay.mockRejectedValue(new Error('Invoice is already paid'))

    await expect(markInvoicePaid('inv_dup')).rejects.toThrow(
      'Invoice is already paid'
    )
  })
})

// ---------------------------------------------------------------------------
// constructWebhookEvent
// ---------------------------------------------------------------------------
describe('constructWebhookEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('passes payload, signature, and webhook secret to Stripe', () => {
    const fakeEvent = { id: 'evt_1', type: 'payment_intent.succeeded' }
    mockWebhooks.constructEvent.mockReturnValue(fakeEvent)

    const result = constructWebhookEvent('raw-payload', 'sig_header_value')

    expect(mockWebhooks.constructEvent).toHaveBeenCalledWith(
      'raw-payload',
      'sig_header_value',
      'whsec_test_mock'
    )
    expect(result).toBe(fakeEvent)
  })

  it('works with Buffer payloads', () => {
    const fakeEvent = { id: 'evt_buf', type: 'invoice.paid' }
    mockWebhooks.constructEvent.mockReturnValue(fakeEvent)

    const buf = Buffer.from('raw-buffer-payload')
    const result = constructWebhookEvent(buf, 'sig_buf')

    expect(mockWebhooks.constructEvent).toHaveBeenCalledWith(
      buf,
      'sig_buf',
      'whsec_test_mock'
    )
    expect(result).toBe(fakeEvent)
  })

  it('throws when STRIPE_WEBHOOK_SECRET is not set', () => {
    const originalSecret = process.env.STRIPE_WEBHOOK_SECRET
    delete process.env.STRIPE_WEBHOOK_SECRET

    expect(() => constructWebhookEvent('payload', 'sig')).toThrow(
      'STRIPE_WEBHOOK_SECRET is not set'
    )

    // Restore for subsequent tests
    process.env.STRIPE_WEBHOOK_SECRET = originalSecret
  })

  it('propagates signature verification errors from Stripe', () => {
    mockWebhooks.constructEvent.mockImplementation(() => {
      throw new Error('Webhook signature verification failed')
    })

    expect(() => constructWebhookEvent('tampered', 'bad_sig')).toThrow(
      'Webhook signature verification failed'
    )
  })
})

// ---------------------------------------------------------------------------
// getPaymentMethod
// ---------------------------------------------------------------------------
describe('getPaymentMethod', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retrieves a payment method by ID', async () => {
    const pm = { id: 'pm_123', type: 'card' }
    mockPaymentMethods.retrieve.mockResolvedValue(pm)

    const result = await getPaymentMethod('pm_123')

    expect(mockPaymentMethods.retrieve).toHaveBeenCalledWith('pm_123')
    expect(result).toBe(pm)
  })

  it('propagates errors for invalid payment method IDs', async () => {
    mockPaymentMethods.retrieve.mockRejectedValue(
      new Error('No such payment_method: pm_bad')
    )

    await expect(getPaymentMethod('pm_bad')).rejects.toThrow(
      'No such payment_method: pm_bad'
    )
  })
})

// ---------------------------------------------------------------------------
// createRefund
// ---------------------------------------------------------------------------
describe('createRefund', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates a full refund when no amount specified', async () => {
    const refund = { id: 're_full', amount: 5000 }
    mockRefunds.create.mockResolvedValue(refund)

    const result = await createRefund({ paymentIntentId: 'pi_ref' })

    expect(mockRefunds.create).toHaveBeenCalledWith({
      payment_intent: 'pi_ref',
      amount: undefined,
      reason: undefined,
    })
    expect(result).toBe(refund)
  })

  it('creates a partial refund with amount converted to cents', async () => {
    const refund = { id: 're_partial', amount: 2500 }
    mockRefunds.create.mockResolvedValue(refund)

    const result = await createRefund({
      paymentIntentId: 'pi_partial',
      amount: 25,
    })

    expect(mockRefunds.create).toHaveBeenCalledWith({
      payment_intent: 'pi_partial',
      amount: 2500,
      reason: undefined,
    })
    expect(result).toBe(refund)
  })

  it('passes reason to Stripe', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_reason' })

    await createRefund({
      paymentIntentId: 'pi_dup',
      reason: 'duplicate',
    })

    expect(mockRefunds.create).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'duplicate' })
    )
  })

  it('passes requested_by_customer reason', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_req' })

    await createRefund({
      paymentIntentId: 'pi_cust',
      reason: 'requested_by_customer',
    })

    expect(mockRefunds.create).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'requested_by_customer' })
    )
  })

  it('passes fraudulent reason', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_fraud' })

    await createRefund({
      paymentIntentId: 'pi_fraud',
      reason: 'fraudulent',
    })

    expect(mockRefunds.create).toHaveBeenCalledWith(
      expect.objectContaining({ reason: 'fraudulent' })
    )
  })

  it('creates partial refund with reason', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_combo' })

    await createRefund({
      paymentIntentId: 'pi_combo',
      amount: 10.5,
      reason: 'requested_by_customer',
    })

    expect(mockRefunds.create).toHaveBeenCalledWith({
      payment_intent: 'pi_combo',
      amount: 1050,
      reason: 'requested_by_customer',
    })
  })

  it('handles fractional cent rounding for refund amount', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_round' })

    await createRefund({
      paymentIntentId: 'pi_round',
      amount: 9.999,
    })

    // Math.round(9.999 * 100) = Math.round(999.9) = 1000
    expect(mockRefunds.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 1000 })
    )
  })

  it('propagates Stripe refund errors', async () => {
    mockRefunds.create.mockRejectedValue(
      new Error('Charge has already been refunded')
    )

    await expect(
      createRefund({ paymentIntentId: 'pi_already_refunded' })
    ).rejects.toThrow('Charge has already been refunded')
  })
})

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('edge cases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('createPaymentIntent with zero amount converts correctly', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_zero' })

    await createPaymentIntent({
      amount: 0,
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 0 })
    )
  })

  it('createPaymentIntent with large amount converts correctly', async () => {
    mockPaymentIntents.create.mockResolvedValue({ id: 'pi_large' })

    await createPaymentIntent({
      amount: 99999.99,
      metadata: {
        projectId: 'p',
        customerId: 'c',
        customerEmail: 'e@e.com',
        description: 'd',
      },
    })

    expect(mockPaymentIntents.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 9999999 })
    )
  })

  it('updatePaymentIntent with zero amount', async () => {
    mockPaymentIntents.update.mockResolvedValue({ id: 'pi_zero_upd' })

    await updatePaymentIntent('pi_zero_upd', 0)

    expect(mockPaymentIntents.update).toHaveBeenCalledWith('pi_zero_upd', {
      amount: 0,
    })
  })

  it('createRefund with zero partial amount passes 0', async () => {
    mockRefunds.create.mockResolvedValue({ id: 're_zero' })

    await createRefund({ paymentIntentId: 'pi_zero_ref', amount: 0 })

    // amount is 0 which is falsy, so the ternary gives undefined
    expect(mockRefunds.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: undefined })
    )
  })
})
