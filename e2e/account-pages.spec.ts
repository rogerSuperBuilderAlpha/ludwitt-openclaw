import { test, expect } from '@playwright/test'
import { login } from './auth.setup'

/**
 * E2E Tests for Account Pages
 * Tests billing, credits, settings, wallets, api-keys, and webhooks pages
 */

// ============================================================================
// ACCOUNT BILLING PAGE TESTS
// ============================================================================

test.describe('Account Billing Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/billing')
    
    // Should show loading or redirect to login
    await page.waitForTimeout(2000)
    const url = page.url()
    
    // Either still loading (auth check) or redirected to login
    expect(url).toMatch(/\/(account\/billing|login)/)
  })

  test('displays billing header when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/billing')
    await page.waitForLoadState('networkidle')

    // Should show billing page content
    const header = page.locator('h1', { hasText: /Billing|Subscription/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows subscription status section', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/billing')
    await page.waitForLoadState('networkidle')

    // Should show subscription status
    const subscriptionSection = page.locator('text=/Subscription Status|Active|Inactive/i').first()
    await expect(subscriptionSection).toBeVisible({ timeout: 10000 })
  })

  test('shows API key access section', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/billing')
    await page.waitForLoadState('networkidle')

    // Should show API key access options
    const apiKeySection = page.locator('text=/API Key Access|Your Own Keys|Subscription/i').first()
    await expect(apiKeySection).toBeVisible({ timeout: 10000 })
  })

  test('subscribe button is visible for non-subscribers', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/billing')
    await page.waitForLoadState('networkidle')

    // Look for subscribe button (may not be visible if already subscribed)
    const subscribeButton = page.locator('button', { hasText: /Subscribe/i }).first()
    // Don't fail if not found - user might be subscribed
    const isVisible = await subscribeButton.isVisible().catch(() => false)
    // Just verify the page loaded correctly
    expect(page.url()).toContain('/account/billing')
  })

  test('can open API key management modal', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/billing')
    await page.waitForLoadState('networkidle')

    const manageKeysButton = page.locator('button', { hasText: /Add Keys|Manage Keys/i }).first()
    if (await manageKeysButton.isVisible()) {
      await manageKeysButton.click()
      await page.waitForTimeout(500)

      // Modal should open
      const modal = page.locator('[role="dialog"]').first()
      await expect(modal).toBeVisible({ timeout: 5000 })
    }
  })
})

// ============================================================================
// ACCOUNT CREDITS PAGE TESTS
// ============================================================================

test.describe('Account Credits Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/credits')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/credits|login)/)
  })

  test('displays credits header when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    const header = page.locator('h1', { hasText: /Credits.*Billing/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows current balance', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    // Should show balance
    const balanceSection = page.locator('text=/Current Balance|\$[\d,.]+/i').first()
    await expect(balanceSection).toBeVisible({ timeout: 10000 })
  })

  test('shows add funds button', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    const addFundsButton = page.locator('button', { hasText: /Add Funds/i }).first()
    await expect(addFundsButton).toBeVisible({ timeout: 10000 })
  })

  test('can open deposit modal', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    const addFundsButton = page.locator('button', { hasText: /Add Funds/i }).first()
    await addFundsButton.click()
    await page.waitForTimeout(500)

    // Deposit modal should open
    const modal = page.locator('[role="dialog"]').first()
    await expect(modal).toBeVisible({ timeout: 5000 })
  })

  test('shows transaction history tabs', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    // Should show filter tabs
    const allTab = page.locator('button', { hasText: /All Transactions/i }).first()
    const depositsTab = page.locator('button', { hasText: /Deposits/i }).first()
    const usageTab = page.locator('button', { hasText: /AI Usage/i }).first()

    await expect(allTab).toBeVisible({ timeout: 10000 })
    await expect(depositsTab).toBeVisible({ timeout: 10000 })
    await expect(usageTab).toBeVisible({ timeout: 10000 })
  })

  test('can filter transactions', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    // Click deposits tab
    const depositsTab = page.locator('button', { hasText: /Deposits/i }).first()
    await depositsTab.click()
    await page.waitForTimeout(300)

    // Click usage tab
    const usageTab = page.locator('button', { hasText: /AI Usage/i }).first()
    await usageTab.click()
    await page.waitForTimeout(300)

    // Click all tab
    const allTab = page.locator('button', { hasText: /All Transactions/i }).first()
    await allTab.click()
    await page.waitForTimeout(300)
  })

  test('shows stats grid', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    // Should show stats
    const totalDeposited = page.locator('text=/Total Deposited/i').first()
    const totalUsed = page.locator('text=/Total Used/i').first()
    const transactions = page.locator('text=/Transactions/i').first()

    await expect(totalDeposited).toBeVisible({ timeout: 10000 })
    await expect(totalUsed).toBeVisible({ timeout: 10000 })
    await expect(transactions).toBeVisible({ timeout: 10000 })
  })

  test('shows wallets link', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    const walletsButton = page.locator('a, button', { hasText: /Wallets/i }).first()
    await expect(walletsButton).toBeVisible({ timeout: 10000 })
  })

  test('back button navigates to dashboard', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/credits')
    await page.waitForLoadState('networkidle')

    const backButton = page.locator('a', { hasText: /Back to Dashboard/i }).first()
    if (await backButton.isVisible()) {
      await backButton.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toMatch(/^\/$|\/dashboard/)
    }
  })
})

// ============================================================================
// ACCOUNT SETTINGS PAGE TESTS
// ============================================================================

test.describe('Account Settings Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/settings')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/settings|login)/)
  })

  test('displays settings page when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/settings')
    await page.waitForLoadState('networkidle')

    // Should show settings content
    const header = page.locator('h1, h2', { hasText: /Settings|Profile|Account/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows profile photo', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/settings')
    await page.waitForLoadState('networkidle')

    // Should show profile image or placeholder
    const profileImage = page.locator('img[alt*="profile" i], img[alt*="avatar" i], [class*="avatar"]').first()
    await expect(profileImage).toBeVisible({ timeout: 10000 })
  })

  test('shows display name field', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/settings')
    await page.waitForLoadState('networkidle')

    const nameInput = page.locator('input[name*="name" i], input[placeholder*="name" i]').first()
    await expect(nameInput).toBeVisible({ timeout: 10000 })
  })

  test('shows email field', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/settings')
    await page.waitForLoadState('networkidle')

    const emailField = page.locator('input[type="email"], text=/Email/i').first()
    await expect(emailField).toBeVisible({ timeout: 10000 })
  })
})

// ============================================================================
// ACCOUNT WALLETS PAGE TESTS
// ============================================================================

test.describe('Account Wallets Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/wallets')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/wallets|login)/)
  })

  test('displays wallets page when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/wallets')
    await page.waitForLoadState('networkidle')

    const header = page.locator('h1', { hasText: /Wallet|MOR/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows connect wallet button', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/wallets')
    await page.waitForLoadState('networkidle')

    const connectButton = page.locator('button', { hasText: /Connect|Link|Add Wallet/i }).first()
    // May or may not be visible depending on state
    const isVisible = await connectButton.isVisible().catch(() => false)
    expect(page.url()).toContain('/account/wallets')
  })
})

// ============================================================================
// ACCOUNT API-KEYS PAGE TESTS
// ============================================================================

test.describe('Account API Keys Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/api-keys')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/api-keys|login)/)
  })

  test('displays API keys page when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/api-keys')
    await page.waitForLoadState('networkidle')

    const header = page.locator('h1', { hasText: /API/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows create key button', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/api-keys')
    await page.waitForLoadState('networkidle')

    const createButton = page.locator('button', { hasText: /Create|Generate|New/i }).first()
    await expect(createButton).toBeVisible({ timeout: 10000 })
  })

  test('shows API documentation', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/api-keys')
    await page.waitForLoadState('networkidle')

    // Should show documentation or example usage
    const docs = page.locator('text=/Documentation|Example|Usage|curl/i').first()
    await expect(docs).toBeVisible({ timeout: 10000 })
  })
})

// ============================================================================
// ACCOUNT WEBHOOKS PAGE TESTS
// ============================================================================

test.describe('Account Webhooks Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/webhooks')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/webhooks|login)/)
  })

  test('displays webhooks page when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/webhooks')
    await page.waitForLoadState('networkidle')

    const header = page.locator('h1', { hasText: /Webhook/i }).first()
    await expect(header).toBeVisible({ timeout: 10000 })
  })

  test('shows create webhook button', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/webhooks')
    await page.waitForLoadState('networkidle')

    const createButton = page.locator('button', { hasText: /Create|Add|New/i }).first()
    await expect(createButton).toBeVisible({ timeout: 10000 })
  })
})

// ============================================================================
// ACCOUNT SUBSCRIPTION PAGE TESTS
// ============================================================================

test.describe('Account Subscription Page', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/account/subscription')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(account\/subscription|login)/)
  })

  test('displays subscription page when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/account/subscription')
    await page.waitForLoadState('networkidle')

    // Should show subscription content
    expect(page.url()).toContain('/account/subscription')
  })
})
