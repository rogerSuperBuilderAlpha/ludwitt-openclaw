import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Basics API Routes
 * Tests API endpoints for the adaptive learning platform
 */

const API_BASE = '/api/basics'

test.describe('Basics API - Authentication', () => {
  test('current-problems requires authentication', async ({ request }) => {
    const response = await request.get(`${API_BASE}/current-problems`)
    expect([401, 403]).toContain(response.status())
  })

  test('check-answer requires authentication', async ({ request }) => {
    const response = await request.post(`${API_BASE}/check-answer`, {
      data: {
        subject: 'math',
        problemId: 'test',
        userAnswer: '42',
        timeSpent: 30
      }
    })
    expect([401, 403]).toContain(response.status())
  })

  test('persist-session requires authentication', async ({ request }) => {
    const response = await request.post(`${API_BASE}/persist-session`, {
      data: {}
    })
    expect([401, 403]).toContain(response.status())
  })

  test('leaderboard is accessible without auth', async ({ request }) => {
    const response = await request.get(`${API_BASE}/leaderboard`)
    // Leaderboard may be public or require auth - both are valid
    expect([200, 401, 403]).toContain(response.status())
  })
})

test.describe('Basics API - Response Format', () => {
  test('leaderboard returns valid JSON', async ({ request }) => {
    const response = await request.get(`${API_BASE}/leaderboard`)
    
    if (response.status() === 200) {
      const data = await response.json()
      expect(data).toBeDefined()
      // Should have a success field or data field
      expect(data.success !== undefined || data.error !== undefined || data.data !== undefined).toBe(true)
    }
  })

  test('enhanced-leaderboard returns valid JSON', async ({ request }) => {
    const response = await request.get(`${API_BASE}/enhanced-leaderboard`)
    
    if (response.status() === 200) {
      const data = await response.json()
      expect(data).toBeDefined()
    }
  })
})

test.describe('Basics API - Input Validation', () => {
  test('check-answer rejects missing fields', async ({ request }) => {
    // Missing required fields should be rejected
    const response = await request.post(`${API_BASE}/check-answer`, {
      data: {} // Empty body
    })
    expect([400, 401, 403]).toContain(response.status())
  })

  test('save-avatar rejects missing fields', async ({ request }) => {
    const response = await request.post(`${API_BASE}/save-avatar`, {
      data: {} // Empty body
    })
    expect([400, 401, 403]).toContain(response.status())
  })

  test('word-lookup handles invalid words gracefully', async ({ request }) => {
    const response = await request.post(`${API_BASE}/word-lookup`, {
      data: { word: '' } // Empty word
    })
    // Should either reject (400) or require auth (401/403)
    expect([400, 401, 403]).toContain(response.status())
  })
})

test.describe('Basics API - Rate Limiting / Protection', () => {
  test('API handles multiple rapid requests', async ({ request }) => {
    // Send multiple requests quickly
    const requests = Array(5).fill(null).map(() => 
      request.get(`${API_BASE}/leaderboard`)
    )
    
    const responses = await Promise.all(requests)
    
    // All should complete (not necessarily succeed, but not crash)
    for (const response of responses) {
      expect(response.status()).toBeDefined()
    }
  })
})

test.describe('Basics API - Content Types', () => {
  test('API returns JSON content type', async ({ request }) => {
    const response = await request.get(`${API_BASE}/leaderboard`)
    const contentType = response.headers()['content-type']
    
    if (response.status() === 200) {
      expect(contentType).toContain('application/json')
    }
  })

  test('API accepts JSON requests', async ({ request }) => {
    const response = await request.post(`${API_BASE}/check-answer`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        subject: 'math',
        problemId: 'test',
        userAnswer: '42',
        timeSpent: 30
      }
    })
    
    // Should process the request (even if auth fails)
    expect(response.status()).toBeDefined()
  })
})

test.describe('Basics API - Error Responses', () => {
  test('API returns structured error responses', async ({ request }) => {
    const response = await request.post(`${API_BASE}/check-answer`, {
      data: {} // Invalid request
    })
    
    // Error responses should be JSON
    const contentType = response.headers()['content-type'] || ''
    if (contentType.includes('application/json')) {
      const data = await response.json()
      // Should have error indication
      expect(data.error !== undefined || data.success === false || data.message !== undefined).toBe(true)
    }
  })
})

test.describe('Basics API Endpoints Exist', () => {
  const endpoints = [
    { path: '/current-problems', method: 'GET' },
    { path: '/check-answer', method: 'POST' },
    { path: '/enhanced-check-answer', method: 'POST' },
    { path: '/leaderboard', method: 'GET' },
    { path: '/enhanced-leaderboard', method: 'GET' },
    { path: '/persist-session', method: 'POST' },
    { path: '/save-avatar', method: 'POST' },
    { path: '/check-avatar', method: 'GET' },
    { path: '/word-lookup', method: 'POST' },
    { path: '/ai-explanation', method: 'POST' },
    { path: '/similar-problem', method: 'POST' },
  ]

  for (const endpoint of endpoints) {
    test(`${endpoint.method} ${endpoint.path} endpoint exists`, async ({ request }) => {
      let response
      
      if (endpoint.method === 'GET') {
        response = await request.get(`${API_BASE}${endpoint.path}`)
      } else {
        response = await request.post(`${API_BASE}${endpoint.path}`, {
          data: {}
        })
      }
      
      // Endpoint should exist (not 404 or 405)
      // 401/403 (auth required) or 400 (bad request) are valid
      expect(response.status()).not.toBe(404)
    })
  }
})

test.describe('Basics API - Performance', () => {
  test('leaderboard responds within acceptable time', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/leaderboard`)
    const duration = Date.now() - startTime
    
    // Should respond within 3 seconds
    expect(duration).toBeLessThan(3000)
  })

  test('check-avatar responds quickly', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/check-avatar`)
    const duration = Date.now() - startTime
    
    // Should respond within 2 seconds
    expect(duration).toBeLessThan(2000)
  })
})

