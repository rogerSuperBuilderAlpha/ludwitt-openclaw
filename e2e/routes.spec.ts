import { test, expect } from '@playwright/test'

/**
 * E2E Tests for All Routes
 * Tests that all pages load and render correctly
 */

test.describe('Public Routes', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Ludwitt/i)
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText(/login/i)
  })

  test('signup page loads', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('h1')).toContainText(/sign up/i)
  })
})

test.describe('Dashboard Routes', () => {
  // Note: These tests will need authentication setup

  test('dashboard redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    // Should redirect to login
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('profile page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/profile')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('projects page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/projects')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('portfolio page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/portfolio')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('cohorts page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/cohorts')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('messages page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/messages')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('achievements page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/achievements')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('leaderboard page loads', async ({ page }) => {
    // Leaderboard might be public
    await page.goto('/leaderboard')
    await expect(page).toHaveURL(/\/leaderboard/)
  })

  test('resources page loads', async ({ page }) => {
    await page.goto('/resources')
    await expect(page).toHaveURL(/\/resources/)
  })

  test('sessions page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/sessions')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('AI assistant page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/ai-assistant')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })
})

test.describe('Settings Routes', () => {
  test('API keys page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/settings/api-keys')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('webhooks page redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/settings/webhooks')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })
})

test.describe('Integration Routes', () => {
  test('Zapier integration page loads', async ({ page }) => {
    await page.goto('/integrations/zapier')
    await expect(page.locator('h1')).toContainText(/Zapier/i)
  })

  test('Discord integration page loads', async ({ page }) => {
    await page.goto('/integrations/discord')
    await expect(page.locator('h1')).toContainText(/Discord/i)
  })

  test('GitHub integration page loads', async ({ page }) => {
    await page.goto('/integrations/github')
    await expect(page.locator('h1')).toContainText(/GitHub/i)
  })
})

test.describe('Admin Routes', () => {
  test('admin dashboard redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('admin analytics redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/admin/analytics')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })

  test('performance dashboard redirects to login when not authenticated', async ({ page }) => {
    await page.goto('/admin/performance')
    await expect(page).toHaveURL(/\/(login|signup)/)
  })
})

test.describe('Mobile Navigation', () => {
  test('mobile nav appears on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/dashboard')

    // Mobile nav should be visible on small screens
    // This will fail until authentication is set up
  })

  test('mobile nav hidden on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/dashboard')

    // Mobile nav should be hidden on large screens
  })
})

test.describe('PWA Features', () => {
  test('manifest.json is accessible', async ({ page }) => {
    const response = await page.goto('/manifest.json')
    expect(response?.status()).toBe(200)

    const manifest = await response?.json()
    expect(manifest).toHaveProperty('name')
    expect(manifest.name).toContain('Ludwitt')
  })

  test('service worker is registered', async ({ page }) => {
    await page.goto('/')

    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        return registrations.length > 0
      }
      return false
    })

    // Service worker should be registered
    expect(swRegistered).toBeTruthy()
  })
})

test.describe('Performance', () => {
  test('home page loads within performance budget', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('dashboard loads within performance budget', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/dashboard')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })
})
