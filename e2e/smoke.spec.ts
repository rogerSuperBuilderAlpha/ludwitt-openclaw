import { test, expect } from '@playwright/test'

test.describe('Smoke Tests — Public Pages', () => {
  test('homepage loads and shows Ludwitt branding', async ({ page }) => {
    await page.goto('/')
    // Should have a title or heading
    await expect(page).toHaveTitle(/ludwitt/i)
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    // Should show some auth UI (email input, sign-in text, etc.)
    await expect(page.locator('body')).not.toBeEmpty()
    // Page should respond with 200
    const response = await page.goto('/login')
    expect(response?.status()).toBeLessThan(400)
  })

  test('signup page loads', async ({ page }) => {
    const response = await page.goto('/signup')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('health API returns ok', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.status).toBe('ok')
    expect(body.apiVersion).toBeDefined()
    expect(body.timestamp).toBeDefined()
  })

  test('robots.txt is accessible', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.ok()).toBeTruthy()
    const text = await response.text()
    expect(text).toContain('User-agent')
  })

  test('404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    // Next.js returns 404 for unknown pages
    expect(response?.status()).toBe(404)
  })

  test('public pages do not expose sensitive data', async ({ page }) => {
    await page.goto('/')
    const content = await page.content()
    // Should not leak API keys or Firebase credentials in rendered HTML
    expect(content).not.toContain('AIza') // Firebase API key prefix
    expect(content).not.toContain('sk-ant-') // Anthropic API key prefix
    expect(content).not.toContain('sk_live_') // Stripe live key prefix
  })
})
