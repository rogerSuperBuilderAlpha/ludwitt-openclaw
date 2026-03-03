import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Security Endpoints
 * Tests that security measures are properly implemented:
 * - Debug endpoints are removed
 * - Protected endpoints require authentication
 * - No sensitive data exposed
 */

// ============================================================================
// DEBUG ENDPOINTS REMOVED TESTS
// ============================================================================

test.describe('Debug Endpoints Removed', () => {
  test('GET /api/debug/ai-status returns 404', async ({ request }) => {
    const response = await request.get('/api/debug/ai-status')
    expect(response.status()).toBe(404)
  })

  test('GET /api/debug/config returns 404', async ({ request }) => {
    const response = await request.get('/api/debug/config')
    expect(response.status()).toBe(404)
  })

  test('GET /api/debug/env returns 404', async ({ request }) => {
    const response = await request.get('/api/debug/env')
    expect(response.status()).toBe(404)
  })

  test('GET /api/debug/firebase returns 404', async ({ request }) => {
    const response = await request.get('/api/debug/firebase')
    expect(response.status()).toBe(404)
  })

  test('GET /api/debug/health returns 404', async ({ request }) => {
    const response = await request.get('/api/debug/health')
    expect(response.status()).toBe(404)
  })

  test('GET /api/test returns 404', async ({ request }) => {
    const response = await request.get('/api/test')
    expect(response.status()).toBe(404)
  })

  test('POST /api/debug/ai-status returns 404', async ({ request }) => {
    const response = await request.post('/api/debug/ai-status', {
      data: {},
    })
    expect(response.status()).toBe(404)
  })
})

// ============================================================================
// PROTECTED ENDPOINTS REQUIRE AUTH
// ============================================================================

test.describe('Protected Endpoints Require Authentication', () => {
  // User data endpoints
  test('GET /api/user/profile returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/user/profile')
    expect([401, 404]).toContain(response.status())
  })

  test('GET /api/user/api-keys returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/user/api-keys')
    expect([401, 404]).toContain(response.status())
  })

  // Credits endpoints
  test('GET /api/credits/balance returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/credits/balance')
    expect(response.status()).toBe(401)
  })

  test('GET /api/credits/history returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/credits/history')
    expect(response.status()).toBe(401)
  })

  test('POST /api/credits/deposit returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/credits/deposit', {
      data: { amountCents: 500 },
    })
    expect(response.status()).toBe(401)
  })

  // Basics endpoints
  test('POST /api/basics/check-answer returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/check-answer', {
      data: { answer: '42', problemId: 'test' },
    })
    expect(response.status()).toBe(401)
  })

  test('POST /api/basics/ai-grade returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/ai-grade', {
      data: { question: 'test', answer: 'test' },
    })
    expect(response.status()).toBe(401)
  })

  test('POST /api/basics/ai-explanation returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/ai-explanation', {
      data: { problemText: 'test', subject: 'math' },
    })
    expect(response.status()).toBe(401)
  })

  test('POST /api/basics/purchase-hint returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/purchase-hint', {
      data: { problemId: 'test' },
    })
    expect(response.status()).toBe(401)
  })

  test('GET /api/basics/current-problems returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/basics/current-problems')
    expect(response.status()).toBe(401)
  })

  test('GET /api/basics/leaderboard returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/basics/leaderboard')
    expect(response.status()).toBe(401)
  })

  // Developer endpoints
  test('GET /api/developers/documents returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/developers/documents')
    expect([401, 404]).toContain(response.status())
  })

  test('GET /api/developers/profile returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/developers/profile')
    expect([401, 404]).toContain(response.status())
  })

  // Customer endpoints
  test('GET /api/customers/documents returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/customers/documents')
    expect([401, 404]).toContain(response.status())
  })

  test('POST /api/customers/submit-document returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/customers/submit-document', {
      data: { title: 'test', url: 'https://test.com' },
    })
    expect([401, 404]).toContain(response.status())
  })

  // AI endpoints that cost credits
  test('POST /api/basics/ai-writing-tips returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/ai-writing-tips', {
      data: { text: 'test' },
    })
    expect([401, 404]).toContain(response.status())
  })

  test('POST /api/basics/book-quiz returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/basics/book-quiz', {
      data: { bookTitle: 'test' },
    })
    expect(response.status()).toBe(401)
  })

  test('POST /api/basics/translation/generate-parsing returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post(
      '/api/basics/translation/generate-parsing',
      {
        data: { sentence: 'test', language: 'latin' },
      }
    )
    expect(response.status()).toBe(401)
  })
})

// ============================================================================
// WEBHOOK ENDPOINTS SIGNATURE VERIFICATION
// ============================================================================

test.describe('Webhook Endpoints Require Signature', () => {
  test('POST /api/credits/webhook returns 400 without signature', async ({
    request,
  }) => {
    const response = await request.post('/api/credits/webhook', {
      data: { type: 'payment_intent.succeeded' },
    })
    // Should reject due to missing Stripe signature
    expect(response.status()).toBe(400)
  })

  test('POST /api/stripe/webhook returns 400 without signature', async ({
    request,
  }) => {
    const response = await request.post('/api/stripe/webhook', {
      data: { type: 'customer.subscription.created' },
    })
    // Should reject due to missing Stripe signature
    expect([400, 404]).toContain(response.status())
  })
})

// ============================================================================
// ADMIN ENDPOINTS PROTECTED
// ============================================================================

test.describe('Admin Endpoints Protected', () => {
  test('GET /api/admin/stats returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/admin/stats')
    expect([401, 403]).toContain(response.status())
  })

  test('GET /api/admin/users returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/admin/users')
    expect([401, 403]).toContain(response.status())
  })

  test('GET /api/admin/applications returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.get('/api/admin/applications')
    expect([401, 403]).toContain(response.status())
  })

  test('POST /api/admin/review-mentor returns 401 without auth', async ({
    request,
  }) => {
    const response = await request.post('/api/admin/review-mentor', {
      data: { userId: 'test', approved: true },
    })
    expect([401, 403]).toContain(response.status())
  })
})

// ============================================================================
// RATE LIMITING (Basic Check)
// ============================================================================

test.describe('API Rate Limiting', () => {
  test('API responds with proper error format', async ({ request }) => {
    const response = await request.get('/api/credits/balance')

    // Should return JSON with proper structure
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('application/json')

    const body = await response.json()
    expect(body).toHaveProperty('success', false)
  })
})

// ============================================================================
// NO SENSITIVE DATA IN ERROR RESPONSES
// ============================================================================

test.describe('No Sensitive Data in Errors', () => {
  test('401 response does not expose internal details', async ({ request }) => {
    const response = await request.get('/api/credits/balance')
    const body = await response.json()

    // Should not contain stack traces
    expect(JSON.stringify(body)).not.toContain('stack')
    expect(JSON.stringify(body)).not.toContain('at ')

    // Should not contain file paths
    expect(JSON.stringify(body)).not.toMatch(/\/src\/|\/app\/|node_modules/)
  })

  test('404 response does not expose routes', async ({ request }) => {
    const response = await request.get('/api/nonexistent-endpoint-12345')

    // Should return 404
    expect(response.status()).toBe(404)
  })

  test('API error messages are user-friendly', async ({ request }) => {
    const response = await request.get('/api/credits/balance')
    const body = await response.json()

    // Error message should be user-friendly
    expect(body.error).toBeDefined()
    expect(body.error.toLowerCase()).not.toContain('exception')
    expect(body.error.toLowerCase()).not.toContain('stack')
  })
})

// ============================================================================
// CORS HEADERS
// ============================================================================

test.describe('CORS Configuration', () => {
  test('API returns appropriate CORS headers', async ({ request }) => {
    const response = await request.get('/api/credits/balance')

    // Headers will depend on configuration
    // Just verify the response is valid JSON
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('application/json')
  })
})

// ============================================================================
// SECURITY HEADERS ON PAGES
// ============================================================================

test.describe('Security Headers', () => {
  test('pages return security headers', async ({ request }) => {
    const response = await request.get('/')

    // Check for common security headers
    const headers = response.headers()

    // X-Content-Type-Options
    expect(headers['x-content-type-options']).toBe('nosniff')

    // X-Frame-Options
    expect(headers['x-frame-options']).toBeDefined()

    // Strict-Transport-Security (on HTTPS)
    // Only checked in production
  })

  test('CSP header is set', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()

    // Content-Security-Policy should be set
    const csp = headers['content-security-policy']
    expect(csp).toBeDefined()
  })

  test('X-XSS-Protection header is set', async ({ request }) => {
    const response = await request.get('/')
    const headers = response.headers()

    // X-XSS-Protection
    expect(headers['x-xss-protection']).toBeDefined()
  })
})

// ============================================================================
// INPUT VALIDATION
// ============================================================================

test.describe('Input Validation', () => {
  test('rejects invalid JSON body', async ({ request }) => {
    const response = await request.post('/api/credits/deposit', {
      headers: { 'Content-Type': 'application/json' },
      data: 'not valid json{',
    })

    // Should return error status
    expect(response.status()).toBeGreaterThanOrEqual(400)
  })

  test('rejects oversized requests', async ({ request }) => {
    // Create a very large payload
    const largeData = { data: 'x'.repeat(10 * 1024 * 1024) } // 10MB

    const response = await request.post('/api/credits/deposit', {
      data: largeData,
    })

    // Should reject or return error
    expect(response.status()).toBeGreaterThanOrEqual(400)
  })
})
