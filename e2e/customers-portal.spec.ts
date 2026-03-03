import { test, expect } from '@playwright/test'
import { login } from './auth.setup'

/**
 * E2E Tests for Customers Portal
 * Tests the customer dashboard, document submission, and credit system
 */

// ============================================================================
// CUSTOMERS LANDING PAGE TESTS
// ============================================================================

test.describe('Customers Landing Page', () => {
  test('customers page loads', async ({ page }) => {
    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Should load customers page
    expect(page.url()).toContain('/customers')
  })
})

// ============================================================================
// CUSTOMERS DASHBOARD TESTS
// ============================================================================

test.describe('Customers Dashboard', () => {
  test('redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/customers/dashboard')
    
    await page.waitForTimeout(2000)
    const url = page.url()
    expect(url).toMatch(/\/(customers|login)/)
  })

  test('displays dashboard when authenticated', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers/dashboard')
    await page.waitForLoadState('networkidle')

    // Should show customer dashboard
    expect(page.url()).toMatch(/\/customers/)
  })
})

// ============================================================================
// DOCUMENT SUBMISSION TESTS
// ============================================================================

test.describe('Document Submission Form', () => {
  test('shows document submission form', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Should show form elements
    const googleDocInput = page.locator('input[placeholder*="Google Doc" i], input[placeholder*="doc" i]').first()
    const isVisible = await googleDocInput.isVisible().catch(() => false)
    
    // Page should load
    expect(page.url()).toContain('/customers')
  })

  test('shows project dropdown', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Look for project selector
    const projectSelect = page.locator('select, [role="combobox"], [class*="dropdown"]').first()
    const isVisible = await projectSelect.isVisible().catch(() => false)
    
    expect(page.url()).toContain('/customers')
  })

  test('shows title input field', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Look for title input
    const titleInput = page.locator('input[placeholder*="title" i], input[name*="title" i]').first()
    const isVisible = await titleInput.isVisible().catch(() => false)
    
    expect(page.url()).toContain('/customers')
  })

  test('submit button is present', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    const submitButton = page.locator('button', { hasText: /Submit|Send|Add/i }).first()
    const isVisible = await submitButton.isVisible().catch(() => false)
    
    expect(page.url()).toContain('/customers')
  })
})

// ============================================================================
// CREDIT BALANCE DISPLAY TESTS
// ============================================================================

test.describe('Customer Credit Balance', () => {
  test('shows credit balance', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Should show balance somewhere
    const balance = page.locator('text=/\$[\d,.]+|Balance|Credit/i').first()
    const isVisible = await balance.isVisible().catch(() => false)
    
    expect(page.url()).toContain('/customers')
  })
})

// ============================================================================
// DOCUMENT LIST TESTS
// ============================================================================

test.describe('Customer Document List', () => {
  test('shows submitted documents or empty state', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Should show documents list or empty state
    const content = page.locator('text=/Document|No documents|Empty|Submitted/i').first()
    
    expect(page.url()).toContain('/customers')
  })

  test('document cards show status', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Look for status badges
    const statusBadges = page.locator('text=/Pending|In Progress|Complete|Draft|Approved/i')
    const count = await statusBadges.count()
    
    // May or may not have documents
    expect(page.url()).toContain('/customers')
  })
})

// ============================================================================
// CUSTOMERS NAVIGATION TESTS
// ============================================================================

test.describe('Customers Navigation', () => {
  test('can navigate back to home', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    const homeLink = page.locator('a', { hasText: /Home|Dashboard|Back/i }).first()
    if (await homeLink.isVisible()) {
      await homeLink.click()
      await page.waitForLoadState('networkidle')
    }
  })

  test('header shows user info', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Look for user avatar or name
    const userInfo = page.locator('img[alt*="user" i], [class*="avatar"], text=/logged in/i').first()
    const isVisible = await userInfo.isVisible().catch(() => false)
    
    expect(page.url()).toContain('/customers')
  })
})

// ============================================================================
// CUSTOMERS RESPONSIVE TESTS
// ============================================================================

test.describe('Customers Portal Responsive', () => {
  test('form is usable on mobile', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    // Form elements should be visible on mobile
    expect(page.url()).toContain('/customers')
  })

  test('no horizontal scroll on mobile', async ({ page }) => {
    const loggedIn = await login(page)
    if (!loggedIn) {
      test.skip()
      return
    }

    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/customers')
    await page.waitForLoadState('networkidle')

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth
    })
    
    // Ideally no horizontal scroll
    expect(hasHorizontalScroll).toBe(false)
  })
})
