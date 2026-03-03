/**
 * Playwright Authentication Helper
 * 
 * Firebase Auth stores tokens in IndexedDB, not cookies.
 * This means we need to login fresh for each test session.
 * 
 * This file provides a helper function to login during tests.
 */

import { Page, expect } from '@playwright/test'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

export const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || ''
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || ''

/**
 * Login to the application
 * Call this at the start of tests that require authentication
 */
export async function login(page: Page): Promise<boolean> {
  if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
    console.log('⚠️  TEST_USER_EMAIL and TEST_USER_PASSWORD not set.')
    return false
  }

  console.log('🔐 Logging in...')

  // Navigate to login page
  await page.goto('/login')
  await page.waitForLoadState('networkidle')

  // Handle cookie consent banner if present
  const cookieAcceptButton = page.locator('button:has-text("Accept All Cookies")')
  try {
    await expect(cookieAcceptButton).toBeVisible({ timeout: 3000 })
    await cookieAcceptButton.click()
    await expect(cookieAcceptButton).not.toBeVisible({ timeout: 3000 })
  } catch {
    // Cookie banner not present or already dismissed
  }

  // Wait for login form
  const emailInput = page.locator('input[type="email"]')
  await expect(emailInput).toBeVisible({ timeout: 10000 })

  // Fill credentials
  await emailInput.clear()
  await emailInput.fill(TEST_USER_EMAIL)

  const passwordInput = page.locator('input[type="password"]')
  await passwordInput.clear()
  await passwordInput.fill(TEST_USER_PASSWORD)

  // Click Sign In
  const signInButton = page.locator('button[type="submit"]:has-text("Sign In")')
  await signInButton.click()

  // Wait for successful login
  try {
    await Promise.race([
      page.locator('text="Loading your dashboard"').waitFor({ timeout: 10000 }),
      page.waitForURL((url) => url.pathname === '/' || url.pathname.includes('dashboard'), { timeout: 10000 }),
    ])

    // Wait for dashboard to fully load
    await page.waitForURL((url) => {
      const path = url.pathname
      return path === '/' || path.includes('dashboard') || path.includes('basics')
    }, { timeout: 30000 })

    console.log('✅ Login successful!')
    return true
  } catch (e) {
    console.log('❌ Login failed')
    return false
  }
}

/**
 * Check if user is currently logged in
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  const url = page.url()
  if (url.includes('/login')) {
    return false
  }
  
  // Check for user-specific elements
  const userIndicator = page.locator('[data-testid="user-menu"], .user-avatar, button:has-text("Account")').first()
  return await userIndicator.isVisible({ timeout: 2000 }).catch(() => false)
}
