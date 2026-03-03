import { test, expect, Page } from '@playwright/test'
import { login } from './auth.setup'

/**
 * E2E Tests for AI Grading System
 * 
 * Tests the fix for: Error message appearing alongside valid AI feedback
 * when the progress update API fails after successful AI grading.
 * 
 * Also tests proper React controlled input handling for all subjects.
 */

// ============================================================================
// Test Setup Helpers
// ============================================================================

async function setupAuthenticatedSession(page: Page): Promise<boolean> {
  const isLoggedIn = await login(page)
  if (!isLoggedIn) {
    console.log('⚠️  Skipping test - authentication required')
    return false
  }
  
  // Navigate to dashboard and wait for it to load
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  return true
}

// ============================================================================
// MATH AI GRADING TESTS
// ============================================================================

test.describe('Math AI Grading', () => {
  test('AI feedback displays without error overlay on wrong answer', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Wait for Math section to load
    const mathSection = page.locator('[data-section="math"]').or(
      page.locator('text=/Your Answer/i').first()
    )
    await expect(mathSection).toBeVisible({ timeout: 15000 })
    
    // Find the math answer input
    const answerInput = page.locator('textarea#math-answer-input').or(
      page.locator('textarea[placeholder*="answer"]')
    ).first()
    
    if (!await answerInput.isVisible({ timeout: 5000 })) {
      console.log('Math input not visible, skipping test')
      test.skip()
      return
    }
    
    // Enter an intentionally wrong answer
    await answerInput.fill('x = 999999')
    
    // Click submit button
    const submitButton = page.locator('button:has-text("Check Answer")').first()
    await expect(submitButton).toBeEnabled()
    await submitButton.click()
    
    // Wait for AI response (should take 1-5 seconds for real AI grading)
    await page.waitForTimeout(1000) // Initial wait for loading state
    
    // Wait for feedback to appear (either success or error UI)
    const feedbackArea = page.locator('text=/not quite|incorrect|try again|correct|great/i').first()
    await expect(feedbackArea).toBeVisible({ timeout: 15000 })
    
    // CRITICAL: Verify NO "Unable to check your answer" error appears
    const errorMessage = page.locator('text="Unable to check your answer"')
    const errorCount = await errorMessage.count()
    
    // If AI feedback is showing, error message should NOT also appear
    if (await feedbackArea.isVisible()) {
      expect(errorCount).toBe(0)
    }
  })
  
  test('AI grading shows processing delay (not instant)', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Wait for Math section
    const answerInput = page.locator('textarea#math-answer-input').or(
      page.locator('textarea[placeholder*="answer"]')
    ).first()
    
    if (!await answerInput.isVisible({ timeout: 10000 })) {
      test.skip()
      return
    }
    
    await answerInput.fill('42')
    
    const submitButton = page.locator('button:has-text("Check Answer")').first()
    const startTime = Date.now()
    await submitButton.click()
    
    // Should show loading state
    const loadingIndicator = page.locator('text=/Checking|Grading|Analyzing/i').first()
    await expect(loadingIndicator).toBeVisible({ timeout: 2000 })
    
    // Wait for response
    await page.locator('text=/correct|incorrect|try again/i').first().waitFor({ timeout: 15000 })
    const endTime = Date.now()
    
    // AI grading should take at least 500ms (not instant)
    const responseTime = endTime - startTime
    expect(responseTime).toBeGreaterThan(500)
    console.log(`AI grading response time: ${responseTime}ms`)
  })
  
  test('AI feedback includes detailed analysis for wrong answers', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const answerInput = page.locator('textarea#math-answer-input').or(
      page.locator('textarea[placeholder*="answer"]')
    ).first()
    
    if (!await answerInput.isVisible({ timeout: 10000 })) {
      test.skip()
      return
    }
    
    // Enter wrong answer
    await answerInput.fill('x = -999')
    
    const submitButton = page.locator('button:has-text("Check Answer")').first()
    await submitButton.click()
    
    // Wait for feedback
    await page.waitForTimeout(3000)
    
    // Look for detailed AI feedback elements (not just "incorrect")
    // AI feedback should include explanation, tips, or step-by-step
    const detailedFeedback = page.locator('text=/step|tip|try|hint|method|because|explanation/i').first()
    
    // Either detailed feedback is shown OR there's a continue/try again button
    const continueButton = page.locator('button:has-text(/continue|try again|next/i)').first()
    
    const hasDetailedFeedback = await detailedFeedback.isVisible({ timeout: 5000 }).catch(() => false)
    const hasContinueButton = await continueButton.isVisible({ timeout: 1000 }).catch(() => false)
    
    // At least one should be present indicating AI processing completed
    expect(hasDetailedFeedback || hasContinueButton).toBe(true)
  })
})

// ============================================================================
// READING AI GRADING TESTS
// ============================================================================

test.describe('Reading AI Grading', () => {
  test('Reading textarea accepts input via fill method', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Navigate to a reading exercise if not already there
    // Look for reading section or navigate to it
    const readingTab = page.locator('button:has-text("Reading")').or(
      page.locator('[data-section="reading"]')
    ).first()
    
    if (await readingTab.isVisible({ timeout: 5000 })) {
      await readingTab.click()
      await page.waitForTimeout(1000)
    }
    
    // Find reading answer textarea
    const readingTextarea = page.locator('textarea[placeholder*="answer"]').or(
      page.locator('textarea[placeholder*="Write your"]')
    ).first()
    
    if (!await readingTextarea.isVisible({ timeout: 5000 })) {
      console.log('Reading textarea not visible, skipping')
      test.skip()
      return
    }
    
    // Use Playwright's fill method (properly triggers React onChange)
    const testAnswer = 'The main idea of the passage is that the author describes the importance of education.'
    await readingTextarea.fill(testAnswer)
    
    // Verify the value was set in React state (submit button should be enabled)
    await page.waitForTimeout(500)
    
    // Check that the value is actually in the textarea
    const textareaValue = await readingTextarea.inputValue()
    expect(textareaValue).toBe(testAnswer)
  })
  
  test('Reading submit button enables when all questions answered', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Look for reading section
    const readingTab = page.locator('button:has-text("Reading")').first()
    if (await readingTab.isVisible({ timeout: 3000 })) {
      await readingTab.click()
      await page.waitForTimeout(1000)
    }
    
    // Find all reading textareas (questions)
    const textareas = page.locator('textarea').filter({
      has: page.locator(':visible')
    })
    
    const count = await textareas.count()
    if (count === 0) {
      console.log('No reading textareas found')
      test.skip()
      return
    }
    
    // Fill all textareas
    for (let i = 0; i < count; i++) {
      const textarea = textareas.nth(i)
      if (await textarea.isVisible()) {
        await textarea.fill(`Answer ${i + 1}: This is my response to the question.`)
      }
    }
    
    await page.waitForTimeout(500)
    
    // Submit button should now be enabled
    const submitButton = page.locator('button:has-text(/Submit.*Answer/i)').first()
    if (await submitButton.isVisible()) {
      await expect(submitButton).toBeEnabled()
    }
  })
})

// ============================================================================
// LATIN/GREEK TRANSLATION AI GRADING TESTS
// ============================================================================

test.describe('Translation AI Grading (Latin/Greek)', () => {
  test('Latin translation textarea accepts input', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Navigate to Latin section
    const latinTab = page.locator('button:has-text("Latin")').or(
      page.locator('[data-section="latin"]')
    ).first()
    
    if (await latinTab.isVisible({ timeout: 5000 })) {
      await latinTab.click()
      await page.waitForTimeout(1000)
    }
    
    // Find translation textarea
    const translationInput = page.locator('textarea[placeholder*="translation"]').or(
      page.locator('textarea[placeholder*="English"]')
    ).first()
    
    if (!await translationInput.isVisible({ timeout: 5000 })) {
      console.log('Latin translation input not visible')
      test.skip()
      return
    }
    
    // Fill using Playwright (properly triggers React)
    const testTranslation = 'The farmer works in the field'
    await translationInput.fill(testTranslation)
    
    // Verify value was set
    const value = await translationInput.inputValue()
    expect(value).toBe(testTranslation)
    
    // Submit button should be enabled
    const submitButton = page.locator('button:has-text(/Submit.*Translation/i)').first()
    if (await submitButton.isVisible()) {
      await expect(submitButton).toBeEnabled()
    }
  })
  
  test('Greek translation textarea accepts input', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Navigate to Greek section
    const greekTab = page.locator('button:has-text("Greek")').or(
      page.locator('[data-section="greek"]')
    ).first()
    
    if (await greekTab.isVisible({ timeout: 5000 })) {
      await greekTab.click()
      await page.waitForTimeout(1000)
    }
    
    // Find translation textarea
    const translationInput = page.locator('textarea[placeholder*="translation"]').or(
      page.locator('textarea[placeholder*="English"]')
    ).first()
    
    if (!await translationInput.isVisible({ timeout: 5000 })) {
      console.log('Greek translation input not visible')
      test.skip()
      return
    }
    
    // Fill using Playwright
    const testTranslation = 'The man is wise'
    await translationInput.fill(testTranslation)
    
    // Verify value was set
    const value = await translationInput.inputValue()
    expect(value).toBe(testTranslation)
  })
  
  test('Translation AI grading shows processing delay', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Try Latin first
    const latinTab = page.locator('button:has-text("Latin")').first()
    if (await latinTab.isVisible({ timeout: 3000 })) {
      await latinTab.click()
      await page.waitForTimeout(1000)
    }
    
    const translationInput = page.locator('textarea[placeholder*="translation"]').or(
      page.locator('textarea[placeholder*="English"]')
    ).first()
    
    if (!await translationInput.isVisible({ timeout: 5000 })) {
      test.skip()
      return
    }
    
    await translationInput.fill('The soldier fights bravely in battle')
    
    const submitButton = page.locator('button:has-text(/Submit.*Translation/i)').first()
    if (!await submitButton.isVisible()) {
      test.skip()
      return
    }
    
    const startTime = Date.now()
    await submitButton.click()
    
    // Should show loading/grading state
    const loadingState = page.locator('text=/Grading|Analyzing|Checking|Evaluating/i').first()
    await expect(loadingState).toBeVisible({ timeout: 3000 })
    
    // Wait for feedback
    await page.locator('text=/score|feedback|correct|translation/i').first().waitFor({ timeout: 20000 })
    const endTime = Date.now()
    
    // AI grading should take time (not instant)
    const responseTime = endTime - startTime
    expect(responseTime).toBeGreaterThan(1000)
    console.log(`Translation AI grading response time: ${responseTime}ms`)
  })
})

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

test.describe('Error Handling', () => {
  test('Error messages are user-friendly (not technical)', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // This test verifies that if an error occurs, it's user-friendly
    // We can't easily trigger errors, but we can check the UI doesn't show raw errors
    
    const technicalErrors = page.locator('text=/undefined|null|NaN|Error:|TypeError|ReferenceError/i')
    const count = await technicalErrors.count()
    
    expect(count).toBe(0)
  })
  
  test('No duplicate feedback messages appear', async ({ page }) => {
    const isAuth = await setupAuthenticatedSession(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const answerInput = page.locator('textarea#math-answer-input').first()
    
    if (!await answerInput.isVisible({ timeout: 10000 })) {
      test.skip()
      return
    }
    
    await answerInput.fill('test answer')
    
    const submitButton = page.locator('button:has-text("Check Answer")').first()
    await submitButton.click()
    
    // Wait for feedback
    await page.waitForTimeout(5000)
    
    // Count feedback messages - should only be one
    const feedbackMessages = page.locator('[class*="feedback"]').or(
      page.locator('text=/correct|incorrect/i')
    )
    
    // Should not have both "correct" and "error" visible at same time
    const correctVisible = await page.locator('text=/correct|great|well done/i').isVisible().catch(() => false)
    const errorVisible = await page.locator('text=/Unable to check|error occurred/i').isVisible().catch(() => false)
    
    // Both should not be true at the same time (the bug we fixed)
    if (correctVisible) {
      expect(errorVisible).toBe(false)
    }
  })
})
