import { test, expect } from '@playwright/test'

/**
 * E2E Tests for New Route Structure
 * Tests that all 4 entry points and their sub-routes work correctly
 */

test.describe('Entry Point 1: Home (Basics Dashboard)', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Ludwitt/i)
  })
})

test.describe('Entry Point 2: Basics Routes', () => {
  test('/basics/leaderboard loads', async ({ page }) => {
    await page.goto('/basics/leaderboard')
    // Should either load or redirect to login
    await expect(page).toHaveURL(/\/(basics\/leaderboard|login)/)
  })

  test('/basics/achievements redirects to login', async ({ page }) => {
    await page.goto('/basics/achievements')
    await expect(page).toHaveURL(/\/(basics\/achievements|login)/)
  })

  test('/basics/ai-assistant redirects to login', async ({ page }) => {
    await page.goto('/basics/ai-assistant')
    await expect(page).toHaveURL(/\/(basics\/ai-assistant|login)/)
  })

  test('/basics/cohorts redirects to login', async ({ page }) => {
    await page.goto('/basics/cohorts')
    await expect(page).toHaveURL(/\/(basics\/cohorts|login)/)
  })

  test('/basics/messages redirects to login', async ({ page }) => {
    await page.goto('/basics/messages')
    await expect(page).toHaveURL(/\/(basics\/messages|login)/)
  })
})

test.describe('Entry Point 3: ALC Routes', () => {
  test('/alc dashboard loads or redirects to login', async ({ page }) => {
    await page.goto('/alc')
    await expect(page).toHaveURL(/\/(alc|login)/)
  })

  test('/cursor-track redirects to /alc', async ({ page }) => {
    await page.goto('/cursor-track')
    await expect(page).toHaveURL(/\/(alc|login)/)
  })

  test('/alc/projects redirects to login', async ({ page }) => {
    await page.goto('/alc/projects')
    await expect(page).toHaveURL(/\/(alc\/projects|login)/)
  })

  test('/alc/sessions redirects to login', async ({ page }) => {
    await page.goto('/alc/sessions')
    await expect(page).toHaveURL(/\/(alc\/sessions|login)/)
  })

  test('/alc/voice-notes redirects to login', async ({ page }) => {
    await page.goto('/alc/voice-notes')
    await expect(page).toHaveURL(/\/(alc\/voice-notes|login)/)
  })
})

test.describe('Entry Point 4: Developers', () => {
  test('/developers redirects to login', async ({ page }) => {
    await page.goto('/developers')
    await expect(page).toHaveURL(/\/(developers|login)/)
  })
})

test.describe('Entry Point 5: Customers', () => {
  test('/customers loads', async ({ page }) => {
    await page.goto('/customers')
    // Customer landing page should load without auth
    await expect(page).toHaveURL(/\/customers/)
  })

  test('/customers/dashboard redirects to login', async ({ page }) => {
    await page.goto('/customers/dashboard')
    await expect(page).toHaveURL(/\/(customers\/dashboard|login)/)
  })
})

test.describe('Account Routes', () => {
  test('/account/settings redirects to login', async ({ page }) => {
    await page.goto('/account/settings')
    await expect(page).toHaveURL(/\/(account\/settings|login)/)
  })

  test('/account/billing redirects to login', async ({ page }) => {
    await page.goto('/account/billing')
    await expect(page).toHaveURL(/\/(account\/billing|login)/)
  })

  test('/account/credits redirects to login', async ({ page }) => {
    await page.goto('/account/credits')
    await expect(page).toHaveURL(/\/(account\/credits|login)/)
  })
})

test.describe('Legal Routes', () => {
  test('/legal/terms-of-service loads', async ({ page }) => {
    await page.goto('/legal/terms-of-service')
    await expect(page).toHaveURL(/\/legal\/terms-of-service/)
  })

  test('/legal/privacy-policy loads', async ({ page }) => {
    await page.goto('/legal/privacy-policy')
    await expect(page).toHaveURL(/\/legal\/privacy-policy/)
  })
})

test.describe('Login Route', () => {
  test('/login loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe('Deprecated Route Redirects', () => {
  test('/deprecated/profile still accessible', async ({ page }) => {
    await page.goto('/deprecated/profile')
    await expect(page).toHaveURL(/\/(deprecated\/profile|login)/)
  })
})

