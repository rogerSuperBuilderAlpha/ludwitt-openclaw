import { test, expect } from '@playwright/test'

/**
 * E2E Tests for API Endpoints
 * Tests all API routes return correct status codes
 */

test.describe('API v1 Endpoints', () => {
  test('GET /api/v1/user returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/v1/user')
    expect(response.status()).toBe(401)
  })

  test('PATCH /api/v1/user returns 401 without auth', async ({ request }) => {
    const response = await request.patch('/api/v1/user', {
      data: { displayName: 'Test User' }
    })
    expect(response.status()).toBe(401)
  })

  test('GET /api/v1/projects returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/v1/projects')
    expect(response.status()).toBe(401)
  })

  test('POST /api/v1/projects returns 401 without auth', async ({ request }) => {
    const response = await request.post('/api/v1/projects', {
      data: {
        title: 'Test Project',
        description: 'Test Description'
      }
    })
    expect(response.status()).toBe(401)
  })
})

test.describe('Zapier API Endpoints', () => {
  test('GET /api/zapier/triggers/projects/completed returns 401 without auth', async ({ request }) => {
    const response = await request.get('/api/zapier/triggers/projects/completed')
    expect(response.status()).toBe(401)
  })

  test('POST /api/zapier/actions/projects returns 401 without auth', async ({ request }) => {
    const response = await request.post('/api/zapier/actions/projects', {
      data: {
        title: 'Test Project',
        description: 'Test Description'
      }
    })
    expect(response.status()).toBe(401)
  })
})

test.describe('API Error Handling', () => {
  test('invalid endpoint returns 404', async ({ request }) => {
    const response = await request.get('/api/v1/nonexistent')
    expect(response.status()).toBe(404)
  })

  test('API returns JSON error format', async ({ request }) => {
    const response = await request.get('/api/v1/user')
    const body = await response.json()

    expect(body).toHaveProperty('success', false)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code')
    expect(body.error).toHaveProperty('message')
  })
})

test.describe('API with Valid Auth', () => {
  // These tests require a valid API key
  const testApiKey = process.env.TEST_API_KEY

  test('GET /api/v1/user with auth returns user data', async ({ request }) => {
    test.skip(!testApiKey, 'Skipping: TEST_API_KEY not set')

    const response = await request.get('/api/v1/user', {
      headers: {
        'Authorization': `Bearer ${testApiKey}`
      }
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('success', true)
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveProperty('id')
  })

  test('GET /api/v1/projects with auth returns projects', async ({ request }) => {
    test.skip(!testApiKey, 'Skipping: TEST_API_KEY not set')

    const response = await request.get('/api/v1/projects', {
      headers: {
        'Authorization': `Bearer ${testApiKey}`
      }
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('success', true)
    expect(body).toHaveProperty('data')
    expect(Array.isArray(body.data)).toBeTruthy()
  })

  test('POST /api/v1/projects with auth creates project', async ({ request }) => {
    test.skip(!testApiKey, 'Skipping: TEST_API_KEY not set')

    const response = await request.post('/api/v1/projects', {
      headers: {
        'Authorization': `Bearer ${testApiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: 'E2E Test Project',
        description: 'Created by E2E test',
        status: 'planning'
      }
    })

    expect(response.status()).toBe(201)
    const body = await response.json()
    expect(body).toHaveProperty('success', true)
    expect(body).toHaveProperty('data')
    expect(body.data).toHaveProperty('id')
    expect(body.data.title).toBe('E2E Test Project')
  })
})

test.describe('API Rate Limiting', () => {
  test('excessive requests are rate limited', async ({ request }) => {
    // Make many requests quickly
    const requests = Array(100).fill(null).map(() =>
      request.get('/api/v1/user')
    )

    const responses = await Promise.all(requests)
    const rateLimited = responses.some(r => r.status() === 429)

    // Should get some 429 responses
    expect(rateLimited).toBeTruthy()
  })
})
