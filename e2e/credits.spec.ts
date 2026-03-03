import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Credits API Endpoints
 * Tests the credit system for deposits, balance, and usage
 */

test.describe('Credits API Endpoints', () => {
  test.describe('Balance Endpoint', () => {
    test('GET /api/credits/balance returns 401 without auth', async ({ request }) => {
      const response = await request.get('/api/credits/balance')
      expect(response.status()).toBe(401)
    })
  })

  test.describe('History Endpoint', () => {
    test('GET /api/credits/history returns 401 without auth', async ({ request }) => {
      const response = await request.get('/api/credits/history')
      expect(response.status()).toBe(401)
    })
  })

  test.describe('Deposit Endpoint', () => {
    test('POST /api/credits/deposit returns 401 without auth', async ({ request }) => {
      const response = await request.post('/api/credits/deposit', {
        data: { amountCents: 1000 }
      })
      expect(response.status()).toBe(401)
    })
  })

  test.describe('Grant Free Credits Endpoint', () => {
    test('POST /api/credits/grant-free returns 401 without auth', async ({ request }) => {
      const response = await request.post('/api/credits/grant-free')
      expect(response.status()).toBe(401)
    })
  })

  test.describe('Webhook Endpoint', () => {
    test('POST /api/credits/webhook returns 400 without signature', async ({ request }) => {
      const response = await request.post('/api/credits/webhook', {
        data: { type: 'payment_intent.succeeded' }
      })
      // Should return 400 because no Stripe signature header
      expect(response.status()).toBe(400)
    })
  })
})

test.describe('AI Endpoints Credit Checks', () => {
  test.describe('Alternate Explanation', () => {
    test('POST /api/basics/alternate-explanation returns 401 without auth', async ({ request }) => {
      const response = await request.post('/api/basics/alternate-explanation', {
        data: {
          subject: 'math',
          question: 'What is 2+2?',
          correctAnswer: '4',
          originalExplanation: 'Two plus two equals four.'
        }
      })
      expect(response.status()).toBe(401)
    })
  })

  test.describe('AI Explanation', () => {
    test('POST /api/basics/ai-explanation returns 401 without auth', async ({ request }) => {
      const response = await request.post('/api/basics/ai-explanation', {
        data: {
          problemText: 'What is 2+2?',
          subject: 'math',
          difficulty: 1
        }
      })
      expect(response.status()).toBe(401)
    })
  })

  test.describe('Generate Project', () => {
    test('POST /api/generate-project returns 401 without auth', async ({ request }) => {
      const response = await request.post('/api/generate-project', {
        data: {
          userId: 'test-user',
          vision: 'Build a web app',
          surveyResponses: {}
        }
      })
      expect(response.status()).toBe(401)
    })
  })
})





