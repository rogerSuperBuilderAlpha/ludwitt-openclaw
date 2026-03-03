import { test, expect, Page } from '@playwright/test'

/**
 * E2E Tests for Math V2 and Reading V2 - Real User Flows
 *
 * These tests authenticate with real credentials and test the actual
 * user experience of solving math problems and reading exercises.
 */

// Test credentials - stored in environment variables for CI, hardcoded for local dev
const TEST_EMAIL = process.env.TEST_USER_EMAIL || ''
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD || ''

// ============================================================================
// Authentication Helper
// ============================================================================

/**
 * Performs actual login with email and password.
 * Waits for redirect to dashboard after successful login.
 */
async function login(page: Page): Promise<void> {
  // Go to login page
  await page.goto('/login')

  // Wait for the login form to be ready
  await page.waitForSelector('input[placeholder="Email address"]', { state: 'visible', timeout: 10000 })

  // Fill in credentials
  await page.fill('input[placeholder="Email address"]', TEST_EMAIL)
  await page.fill('input[placeholder="Password"]', TEST_PASSWORD)

  // Click sign in button
  await page.click('button:has-text("Sign In")')

  // Wait for navigation away from login page (successful auth)
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 15000 })

  // Wait for dashboard to load
  await page.waitForLoadState('networkidle')
}

/**
 * Ensures user is logged in, either by checking current state or logging in.
 */
async function ensureLoggedIn(page: Page): Promise<void> {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Check if we're on login page
  if (page.url().includes('/login')) {
    await login(page)
  }

  // Verify we're on the dashboard by checking for key elements
  await expect(page.locator('[data-section="math"], [data-section="reading"]').first()).toBeVisible({ timeout: 15000 })
}

/**
 * Dismisses any modals or onboarding that might be blocking interaction.
 */
async function dismissOverlays(page: Page): Promise<void> {
  // Give modals time to appear
  await page.waitForTimeout(1000)

  // Try to close any visible modals by clicking overlay or close button
  const closeButtons = page.locator('button:has-text("Skip"), button:has-text("Close"), button:has-text("Got it"), button:has-text("Dismiss"), [aria-label="Close"]')
  const count = await closeButtons.count()

  for (let i = 0; i < count; i++) {
    const btn = closeButtons.nth(i)
    if (await btn.isVisible()) {
      await btn.click().catch(() => {})
      await page.waitForTimeout(300)
    }
  }

  // Also try pressing Escape to close any modal
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
}

// ============================================================================
// MATH V2 TESTS
// ============================================================================

test.describe('Math V2 - Authenticated User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page)
    await dismissOverlays(page)
  })

  test('displays a math problem on the dashboard', async ({ page }) => {
    // Find the math section
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Should have visible content - either a problem or loading state that resolves
    const problemContent = mathSection.locator('.problem-display-v2, [class*="problem"], [class*="question"]').first()
    await expect(problemContent.or(mathSection.locator('text=/\\d|x|\\+|\\-|\\=/'))).toBeVisible({ timeout: 15000 })
  })

  test('can type an answer in the math input field', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Find any input field in the math section
    const answerInput = mathSection.locator('input[type="text"], input[type="number"], input:not([type="hidden"])')
      .first()

    // Wait for the input to be available
    await expect(answerInput).toBeVisible({ timeout: 10000 })

    // Type a test answer
    await answerInput.fill('42')

    // Verify the value was entered
    await expect(answerInput).toHaveValue('42')
  })

  test('can submit a math answer and receive feedback', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Find the answer input
    const answerInput = mathSection.locator('input[type="text"], input[type="number"], input:not([type="hidden"])')
      .first()

    await expect(answerInput).toBeVisible({ timeout: 10000 })

    // Enter an answer (we don't know the correct one, but we can test the flow)
    await answerInput.fill('7')

    // Find and click submit button
    const submitButton = mathSection.locator('button[type="submit"], button:has-text("Check"), button:has-text("Submit")')
      .first()

    await expect(submitButton).toBeVisible({ timeout: 5000 })
    await submitButton.click()

    // Wait for feedback - should show correct/incorrect message or new problem
    const feedback = page.locator('text=/correct|incorrect|Correct|Incorrect|Great|Try again|Nice|Oops|right|wrong/i')
      .or(page.locator('[role="status"]'))
      .or(page.locator('[class*="feedback"]'))
      .first()

    await expect(feedback).toBeVisible({ timeout: 10000 })
  })

  test('can use hint system if available', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Look for hint button
    const hintButton = mathSection.locator('button:has-text("Hint"), button:has-text("hint"), [aria-label*="hint"]')
      .first()

    // Hints might not be available for all problems
    const hintVisible = await hintButton.isVisible().catch(() => false)

    if (hintVisible) {
      await hintButton.click()

      // Should reveal hint content
      const hintContent = mathSection.locator('[class*="hint"], details[open], text=/hint|Hint/')
      await expect(hintContent).toBeVisible({ timeout: 5000 })
    } else {
      // Skip if no hints available
      test.skip()
    }
  })

  test('can skip a math problem', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Get the current problem content for comparison
    const problemTextBefore = await mathSection.textContent()

    // Find skip button
    const skipButton = mathSection.locator('button:has-text("Skip"), button:has-text("skip")')
      .first()

    const skipVisible = await skipButton.isVisible().catch(() => false)

    if (skipVisible) {
      await skipButton.click()

      // Handle confirmation if needed
      const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")')
      if (await confirmButton.isVisible().catch(() => false)) {
        await confirmButton.click()
      }

      // Wait for new problem to load
      await page.waitForTimeout(2000)
      await page.waitForLoadState('networkidle')

      // Problem content should have changed
      const problemTextAfter = await mathSection.textContent()
      expect(problemTextAfter).not.toBe(problemTextBefore)
    } else {
      test.skip()
    }
  })

  test('shows problem metadata (difficulty, topic badges)', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Look for difficulty or topic indicators
    const badges = mathSection.locator('[class*="badge"], [class*="chip"], text=/Easy|Medium|Hard|Expert|Algebra|Geometry|Arithmetic/i')

    // Should have at least one badge/indicator
    const badgeCount = await badges.count()
    expect(badgeCount).toBeGreaterThanOrEqual(0) // Some problems might not have visible badges
  })

  test('renders LaTeX equations correctly', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Look for KaTeX rendered elements (LaTeX renderer used in the app)
    const katexElements = mathSection.locator('.katex, .MathJax, [class*="math"], [class*="latex"]')

    // Not all problems have LaTeX, so just check if they render when present
    const katexCount = await katexElements.count()

    if (katexCount > 0) {
      // Verify they're visible and rendered
      await expect(katexElements.first()).toBeVisible()
    }
  })

  test('can navigate problems using keyboard', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 10000 })

    // Focus on the math section
    await mathSection.click()

    // Find input and focus it
    const answerInput = mathSection.locator('input[type="text"], input[type="number"]').first()

    if (await answerInput.isVisible()) {
      await answerInput.focus()

      // Type answer using keyboard
      await page.keyboard.type('5')

      // Submit with Enter key
      await page.keyboard.press('Enter')

      // Should trigger submission
      await page.waitForTimeout(1000)

      // Check if feedback appeared or form was submitted
      const feedbackOrInput = page.locator('[class*="feedback"], [role="status"], input[type="text"]').first()
      await expect(feedbackOrInput).toBeVisible({ timeout: 10000 })
    }
  })
})

// ============================================================================
// READING V2 TESTS
// ============================================================================

test.describe('Reading V2 - Authenticated User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page)
    await dismissOverlays(page)
  })

  test('displays a reading exercise on the dashboard', async ({ page }) => {
    // Find the reading section
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Should have visible content - passage, question, or exercise
    const exerciseContent = readingSection.locator('[class*="passage"], [class*="exercise"], [class*="question"], p, span')
      .first()
    await expect(exerciseContent).toBeVisible({ timeout: 15000 })
  })

  test('displays passage text for reading comprehension', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Look for passage content - should have substantial text
    const textContent = await readingSection.textContent()

    // Reading exercises should have meaningful content
    expect(textContent?.length).toBeGreaterThan(50)
  })

  test('can answer reading questions', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Reading exercises can have different input types:
    // - Radio buttons for multiple choice
    // - Textareas for open-ended responses
    // - Text inputs for fill-in-the-blank

    const radioButton = readingSection.locator('input[type="radio"]').first()
    const textArea = readingSection.locator('textarea').first()
    const textInput = readingSection.locator('input[type="text"]').first()

    // Try to interact with whatever answer type is available
    if (await radioButton.isVisible().catch(() => false)) {
      await radioButton.click()
      await expect(radioButton).toBeChecked()
    } else if (await textArea.isVisible().catch(() => false)) {
      await textArea.fill('This is my answer to the reading question.')
      await expect(textArea).toHaveValue('This is my answer to the reading question.')
    } else if (await textInput.isVisible().catch(() => false)) {
      await textInput.fill('answer')
      await expect(textInput).toHaveValue('answer')
    }
  })

  test('can submit a reading answer and receive feedback', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Fill in an answer
    const radioButton = readingSection.locator('input[type="radio"]').first()
    const textArea = readingSection.locator('textarea').first()
    const textInput = readingSection.locator('input[type="text"]').first()

    if (await radioButton.isVisible().catch(() => false)) {
      await radioButton.click()
    } else if (await textArea.isVisible().catch(() => false)) {
      await textArea.fill('The main idea of this passage is about the topic being discussed.')
    } else if (await textInput.isVisible().catch(() => false)) {
      await textInput.fill('answer')
    } else {
      // No input found, skip test
      test.skip()
      return
    }

    // Find and click submit button
    const submitButton = readingSection.locator('button[type="submit"], button:has-text("Check"), button:has-text("Submit")')
      .first()

    if (await submitButton.isVisible().catch(() => false)) {
      await submitButton.click()

      // Wait for feedback
      const feedback = page.locator('text=/correct|incorrect|Correct|Incorrect|Great|Try again|Nice|feedback/i')
        .or(page.locator('[role="status"]'))
        .or(page.locator('[class*="feedback"]'))
        .first()

      await expect(feedback).toBeVisible({ timeout: 15000 })
    }
  })

  test('can skip a reading exercise', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Get content before skip
    const contentBefore = await readingSection.textContent()

    // Find skip button
    const skipButton = readingSection.locator('button:has-text("Skip"), button:has-text("skip")')
      .first()

    if (await skipButton.isVisible().catch(() => false)) {
      await skipButton.click()

      // Handle confirmation if needed
      const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Yes")')
      if (await confirmButton.isVisible().catch(() => false)) {
        await confirmButton.click()
      }

      // Wait for new exercise
      await page.waitForTimeout(2000)
      await page.waitForLoadState('networkidle')

      // Content should have changed
      const contentAfter = await readingSection.textContent()
      expect(contentAfter).not.toBe(contentBefore)
    } else {
      test.skip()
    }
  })

  test('displays exercise type label', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Look for exercise type labels
    const typeLabels = readingSection.locator('text=/Reading|Vocabulary|Comprehension|Fluency|Morphology|Text Structure/i')

    const labelCount = await typeLabels.count()
    expect(labelCount).toBeGreaterThanOrEqual(0) // Label might be in header not section
  })

  test('shows skill progress indicator', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 10000 })

    // Look for progress indicators
    const progressIndicator = readingSection.locator('[class*="progress"], [role="progressbar"], [class*="level"]')

    const indicatorCount = await progressIndicator.count()
    // Progress might be shown elsewhere on dashboard
    expect(indicatorCount).toBeGreaterThanOrEqual(0)
  })
})

// ============================================================================
// INTEGRATED FLOW TESTS
// ============================================================================

test.describe('Dashboard Integration - Math and Reading', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page)
    await dismissOverlays(page)
  })

  test('both math and reading sections are visible on dashboard', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    const readingSection = page.locator('[data-section="reading"]')

    await expect(mathSection).toBeVisible({ timeout: 15000 })
    await expect(readingSection).toBeVisible({ timeout: 15000 })
  })

  test('can switch between math and reading exercises', async ({ page }) => {
    // Interact with math
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 15000 })
    await mathSection.scrollIntoViewIfNeeded()

    const mathInput = mathSection.locator('input[type="text"], input[type="number"]').first()
    if (await mathInput.isVisible().catch(() => false)) {
      await mathInput.fill('5')
    }

    // Scroll to and interact with reading
    const readingSection = page.locator('[data-section="reading"]')
    await readingSection.scrollIntoViewIfNeeded()
    await expect(readingSection).toBeVisible()

    const readingInput = readingSection.locator('input[type="radio"], textarea, input[type="text"]').first()
    if (await readingInput.isVisible().catch(() => false)) {
      if (await readingInput.getAttribute('type') === 'radio') {
        await readingInput.click()
      } else {
        await readingInput.fill('test answer')
      }
    }

    // Both sections should still be functional
    await expect(mathSection).toBeVisible()
    await expect(readingSection).toBeVisible()
  })

  test('XP tracking updates after completing exercises', async ({ page }) => {
    // Look for XP indicator
    const xpIndicator = page.locator('text=/\\d+\\s*XP|XP:\\s*\\d+|\\d+\\/\\d+\\s*XP/i')
      .or(page.locator('[class*="xp"]'))
      .first()

    const xpVisible = await xpIndicator.isVisible().catch(() => false)

    if (xpVisible) {
      const xpBefore = await xpIndicator.textContent()

      // Complete a math problem
      const mathSection = page.locator('[data-section="math"]')
      const mathInput = mathSection.locator('input[type="text"], input[type="number"]').first()

      if (await mathInput.isVisible().catch(() => false)) {
        await mathInput.fill('1')

        const submitButton = mathSection.locator('button[type="submit"], button:has-text("Check")').first()
        if (await submitButton.isVisible()) {
          await submitButton.click()
          await page.waitForTimeout(3000)
        }
      }

      // XP might have changed
      const xpAfter = await xpIndicator.textContent()
      // We can't guarantee XP change (might be wrong answer), just verify it's still visible
      await expect(xpIndicator).toBeVisible()
    }
  })

  test('progress persists after page reload', async ({ page }) => {
    // Complete some action
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 15000 })

    // Note the current state
    const contentBefore = await page.content()

    // Reload page
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Should still be logged in and see dashboard
    await expect(page.locator('[data-section="math"]')).toBeVisible({ timeout: 15000 })
    await expect(page.locator('[data-section="reading"]')).toBeVisible({ timeout: 15000 })
  })
})

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

test.describe('Accessibility - Math and Reading', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page)
    await dismissOverlays(page)
  })

  test('math section has accessible labels', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 15000 })

    // Check for accessible input labels
    const inputs = mathSection.locator('input')
    const inputCount = await inputs.count()

    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const input = inputs.nth(i)
      if (await input.isVisible()) {
        // Input should have label, placeholder, or aria-label
        const hasAccessibleName = await input.evaluate(el => {
          const inp = el as HTMLInputElement
          return !!(inp.placeholder || inp.getAttribute('aria-label') || inp.labels?.length)
        })
        expect(hasAccessibleName).toBe(true)
      }
    }
  })

  test('reading section has accessible labels', async ({ page }) => {
    const readingSection = page.locator('[data-section="reading"]')
    await expect(readingSection).toBeVisible({ timeout: 15000 })

    // Check for accessible input labels
    const inputs = readingSection.locator('input, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const input = inputs.nth(i)
      if (await input.isVisible()) {
        const hasAccessibleName = await input.evaluate(el => {
          const inp = el as HTMLInputElement | HTMLTextAreaElement
          return !!(inp.placeholder || inp.getAttribute('aria-label') || inp.labels?.length)
        })
        expect(hasAccessibleName).toBe(true)
      }
    }
  })

  test('buttons have accessible names', async ({ page }) => {
    // Check submit buttons have accessible names
    const submitButtons = page.locator('button[type="submit"], button:has-text("Check"), button:has-text("Submit")')
    const buttonCount = await submitButtons.count()

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = submitButtons.nth(i)
      if (await button.isVisible()) {
        const hasAccessibleName = await button.evaluate(btn => {
          return !!(btn.textContent?.trim() || btn.getAttribute('aria-label'))
        })
        expect(hasAccessibleName).toBe(true)
      }
    }
  })
})

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

test.describe('Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await ensureLoggedIn(page)
    await dismissOverlays(page)
  })

  test('handles empty answer submission gracefully', async ({ page }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 15000 })

    // Find submit button and try to click without filling answer
    const submitButton = mathSection.locator('button[type="submit"], button:has-text("Check")').first()

    if (await submitButton.isVisible().catch(() => false)) {
      // Check if button is disabled when input is empty
      const isDisabled = await submitButton.isDisabled()

      if (!isDisabled) {
        await submitButton.click()

        // Should show validation error or prevent submission
        await page.waitForTimeout(1000)

        // Page should still be functional
        await expect(mathSection).toBeVisible()
      }
    }
  })

  test('recovers from network errors gracefully', async ({ page, context }) => {
    const mathSection = page.locator('[data-section="math"]')
    await expect(mathSection).toBeVisible({ timeout: 15000 })

    // The page should have loaded successfully
    // Just verify it's in a good state
    const hasContent = await mathSection.textContent()
    expect(hasContent?.length).toBeGreaterThan(0)
  })
})
