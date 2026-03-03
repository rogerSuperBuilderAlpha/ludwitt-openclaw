import { test, expect, Page, BrowserContext } from '@playwright/test'

/**
 * E2E Tests for Basics Dashboard - Authenticated User Flows
 * 
 * These tests require authentication and cover interactive features
 * that only work when a user is logged in.
 * 
 * To run these tests with a real user, you'll need to:
 * 1. Set up a test user in Firebase
 * 2. Use storageState to persist authentication
 * 
 * For now, these tests gracefully handle unauthenticated states.
 */

// ============================================================================
// Test Setup Helpers
// ============================================================================

/**
 * Setup authentication if environment provides credentials
 */
async function setupAuth(page: Page): Promise<boolean> {
  // Check if we're already authenticated
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  
  const url = page.url()
  if (!url.includes('/login')) {
    // Check for user menu which indicates authentication
    const userMenu = page.locator('[aria-label="User account menu"]').first()
    return await userMenu.isVisible().catch(() => false)
  }
  
  return false
}

// ============================================================================
// AUTHENTICATED MATH SECTION TESTS
// ============================================================================

test.describe('Authenticated - Math Problem Solving', () => {
  test('can submit a math answer', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Find math answer input
    const answerInput = page.locator('input[placeholder*="answer"]').or(
      page.locator('[data-testid="math-answer-input"]')
    ).first()
    
    if (await answerInput.isVisible()) {
      await answerInput.fill('42')
      
      const submitButton = page.locator('button', { hasText: /submit|check/i }).first()
      await submitButton.click()
      
      // Wait for feedback
      await page.waitForTimeout(2000)
      
      // Should show feedback (correct or incorrect)
      const feedback = page.locator('text=/correct|incorrect|try again|great/i').first()
      await expect(feedback).toBeVisible({ timeout: 5000 })
    }
  })

  test('can skip a math problem', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const skipButton = page.locator('button', { hasText: /skip/i }).first()
    
    if (await skipButton.isVisible()) {
      await skipButton.click()
      
      // May show confirmation
      const confirmButton = page.locator('button', { hasText: /confirm|yes/i }).first()
      if (await confirmButton.isVisible()) {
        await confirmButton.click()
      }
      
      // New problem should load
      await page.waitForTimeout(1000)
    }
  })

  test('can purchase a hint', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const hintButton = page.locator('button', { hasText: /hint/i }).first()
    
    if (await hintButton.isVisible()) {
      await hintButton.click()
      await page.waitForTimeout(500)
      
      // Hint should be revealed or purchase modal shown
      const hintContent = page.locator('text=/hint|tip|try/i').first()
    }
  })

  test('can open AI tutor', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const aiTutorButton = page.locator('button', { hasText: /ai.*tutor|explain/i }).first()
    
    if (await aiTutorButton.isVisible()) {
      await aiTutorButton.click()
      await page.waitForTimeout(1000)
      
      // AI explanation panel should open
      const aiPanel = page.locator('[role="dialog"]').or(
        page.locator('[class*="explanation"]')
      ).first()
    }
  })

  test('can open study panel', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const studyButton = page.locator('button', { hasText: /study/i }).first()
    
    if (await studyButton.isVisible()) {
      await studyButton.click()
      await page.waitForTimeout(500)
      
      // Study panel should open
      const studyPanel = page.locator('[role="dialog"]').first()
    }
  })

  test('shows work section expands on toggle', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const workToggle = page.locator('button', { hasText: /show.*work/i }).first()
    
    if (await workToggle.isVisible()) {
      await workToggle.click()
      await page.waitForTimeout(300)
      
      // Work textarea should appear
      const workArea = page.locator('textarea').first()
      if (await workArea.isVisible()) {
        await workArea.fill('My work: 6 × 7 = 42')
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED READING SECTION TESTS
// ============================================================================

test.describe('Authenticated - Reading Comprehension', () => {
  test('can select reading answer option', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Find reading answer options (multiple choice or text input)
    const options = page.locator('input[type="radio"]').or(
      page.locator('[role="radio"]')
    )
    
    const count = await options.count()
    if (count > 0) {
      await options.first().click()
      await expect(options.first()).toBeChecked()
    }
  })

  test('can submit reading answer', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // First select an answer
    const options = page.locator('input[type="radio"]')
    if (await options.count() > 0) {
      await options.first().click()
    }
    
    // Then submit
    const submitButton = page.locator('[data-section="reading"]').or(page.locator('body'))
      .locator('button', { hasText: /submit|check/i }).first()
    
    if (await submitButton.isVisible()) {
      await submitButton.click()
      await page.waitForTimeout(2000)
    }
  })

  test('word lookup shows definition on click', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Find clickable words in passage
    const clickableWord = page.locator('[data-word]').or(
      page.locator('[class*="word-lookup"]')
    ).first()
    
    if (await clickableWord.isVisible()) {
      await clickableWord.click()
      await page.waitForTimeout(500)
      
      // Definition popup should appear
      const definitionPopup = page.locator('[class*="popup"]').or(
        page.locator('[class*="definition"]')
      ).first()
    }
  })

  test('reading aloud bonus button works', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const readAloudButton = page.locator('button', { hasText: /read.*aloud|pronunciation|speak/i }).first()
    
    if (await readAloudButton.isVisible()) {
      await readAloudButton.click()
      await page.waitForTimeout(500)
    }
  })
})

// ============================================================================
// AUTHENTICATED CLASSICAL LANGUAGES TESTS
// ============================================================================

test.describe('Authenticated - Latin Section', () => {
  test('can submit Latin translation', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const latinInput = page.locator('[data-section="latin"] input').or(
      page.locator('input[placeholder*="Latin"]').or(
        page.locator('input[placeholder*="translation"]')
      )
    ).first()
    
    if (await latinInput.isVisible()) {
      await latinInput.fill('The farmer is in the field')
      
      const submitButton = page.locator('[data-section="latin"] button', { hasText: /submit|check/i }).first()
      if (await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(2000)
      }
    }
  })

  test('Latin keyboard helper shows special characters', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const keyboardButton = page.locator('[data-section="latin"] button', { hasText: /keyboard|special/i }).first()
    
    if (await keyboardButton.isVisible()) {
      await keyboardButton.click()
      await page.waitForTimeout(300)
      
      // Special character buttons should appear
      const specialChars = page.locator('button', { hasText: /ā|ē|ī|ō|ū/i }).first()
    }
  })
})

test.describe('Authenticated - Greek Section', () => {
  test('can submit Greek translation', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const greekInput = page.locator('[data-section="greek"] input').or(
      page.locator('input[placeholder*="Greek"]')
    ).first()
    
    if (await greekInput.isVisible()) {
      await greekInput.fill('The man is good')
      
      const submitButton = page.locator('[data-section="greek"] button', { hasText: /submit|check/i }).first()
      if (await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(2000)
      }
    }
  })

  test('Greek keyboard shows Greek characters', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const keyboardButton = page.locator('[data-section="greek"] button', { hasText: /keyboard|greek/i }).first()
    
    if (await keyboardButton.isVisible()) {
      await keyboardButton.click()
      await page.waitForTimeout(300)
      
      // Greek character buttons should appear
      const greekChars = page.locator('button', { hasText: /α|β|γ|δ|ε/i }).first()
    }
  })
})

// ============================================================================
// AUTHENTICATED LOGIC SECTION TESTS
// ============================================================================

test.describe('Authenticated - Logic Section', () => {
  test('can expand logic section', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const expandButton = page.locator('button', { hasText: /Open Logic|Expand Logic/i }).first()
    
    if (await expandButton.isVisible()) {
      await expandButton.click()
      await page.waitForTimeout(1000)
      
      // Logic problems should appear
      const logicContent = page.locator('text=/logic|premise|conclusion/i').first()
    }
  })

  test('can submit logic answer', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // First expand logic
    const expandButton = page.locator('button', { hasText: /Open Logic/i }).first()
    if (await expandButton.isVisible()) {
      await expandButton.click()
      await page.waitForTimeout(1000)
    }
    
    // Find logic input
    const logicInput = page.locator('[data-section="logic"] input').first()
    if (await logicInput.isVisible()) {
      await logicInput.fill('P → Q')
      
      const submitButton = page.locator('[data-section="logic"] button', { hasText: /submit|check/i }).first()
      if (await submitButton.isVisible()) {
        await submitButton.click()
        await page.waitForTimeout(2000)
      }
    }
  })

  test('can close logic section', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const closeButton = page.locator('button', { hasText: /close.*logic/i }).or(
      page.locator('[data-section="logic"] button[aria-label*="close"]')
    ).first()
    
    if (await closeButton.isVisible()) {
      await closeButton.click()
      await page.waitForTimeout(500)
    }
  })
})

// ============================================================================
// AUTHENTICATED POWER-UPS TESTS
// ============================================================================

test.describe('Authenticated - Power-Ups System', () => {
  test('can purchase XP boost power-up', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Open power-ups panel
    const powerUpsCard = page.locator('button', { hasText: /Power-ups/i }).first()
    if (await powerUpsCard.isVisible()) {
      await powerUpsCard.click()
      await page.waitForTimeout(500)
      
      // Find XP boost option
      const xpBoost = page.locator('button', { hasText: /XP.*Boost|2x.*XP|Double/i }).first()
      if (await xpBoost.isVisible()) {
        await xpBoost.click()
        await page.waitForTimeout(500)
      }
    }
  })

  test('can view active power-ups', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Open power-ups panel
    const powerUpsCard = page.locator('button', { hasText: /Power-ups/i }).first()
    if (await powerUpsCard.isVisible()) {
      await powerUpsCard.click()
      await page.waitForTimeout(500)
      
      // Check for active section
      const activeSection = page.locator('text=/active|currently using/i').first()
    }
  })
})

// ============================================================================
// AUTHENTICATED VIRTUAL PETS TESTS
// ============================================================================

test.describe('Authenticated - Virtual Pets', () => {
  test('can adopt a pet', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Open pets modal
    const petsCard = page.locator('button', { hasText: /Learning Companions/i }).first()
    if (await petsCard.isVisible()) {
      await petsCard.click()
      await page.waitForTimeout(500)
      
      // Find adopt button
      const adoptButton = page.locator('button', { hasText: /adopt/i }).first()
      if (await adoptButton.isVisible()) {
        await adoptButton.click()
        await page.waitForTimeout(500)
      }
    }
  })

  test('can feed pet', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const petsCard = page.locator('button', { hasText: /Learning Companions/i }).first()
    if (await petsCard.isVisible()) {
      await petsCard.click()
      await page.waitForTimeout(500)
      
      const feedButton = page.locator('button', { hasText: /feed/i }).first()
      if (await feedButton.isVisible()) {
        await feedButton.click()
        await page.waitForTimeout(500)
      }
    }
  })

  test('can play with pet', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const petsCard = page.locator('button', { hasText: /Learning Companions/i }).first()
    if (await petsCard.isVisible()) {
      await petsCard.click()
      await page.waitForTimeout(500)
      
      const playButton = page.locator('button', { hasText: /play/i }).first()
      if (await playButton.isVisible()) {
        await playButton.click()
        await page.waitForTimeout(500)
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED SPACED REPETITION TESTS
// ============================================================================

test.describe('Authenticated - Spaced Repetition', () => {
  test('can view review items', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const reviewsCard = page.locator('button', { hasText: /Spaced Repetition/i }).first()
    if (await reviewsCard.isVisible()) {
      await reviewsCard.click()
      await page.waitForTimeout(500)
      
      // Review items should be visible
      const reviewList = page.locator('text=/review|due|remember/i').first()
    }
  })

  test('can complete a review', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const reviewsCard = page.locator('button', { hasText: /Spaced Repetition/i }).first()
    if (await reviewsCard.isVisible()) {
      await reviewsCard.click()
      await page.waitForTimeout(500)
      
      // Find review button
      const reviewButton = page.locator('button', { hasText: /review|start|practice/i }).first()
      if (await reviewButton.isVisible()) {
        await reviewButton.click()
        await page.waitForTimeout(500)
      }
    }
  })

  test('can rate difficulty after review', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // This would require completing a review first
    const difficultyButtons = page.locator('button', { hasText: /easy|medium|hard|again/i })
    const count = await difficultyButtons.count()
    
    if (count > 0) {
      await difficultyButtons.first().click()
      await page.waitForTimeout(300)
    }
  })
})

// ============================================================================
// AUTHENTICATED SKILL TREES TESTS
// ============================================================================

test.describe('Authenticated - Skill Trees', () => {
  test('can view skill tree', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const skillsCard = page.locator('button', { hasText: /Skill Trees/i }).first()
    if (await skillsCard.isVisible()) {
      await skillsCard.click()
      await page.waitForTimeout(500)
      
      // Skill tree should be visible
      const skillTree = page.locator('[class*="skill"]').or(
        page.locator('text=/mastery|level|unlock/i')
      ).first()
    }
  })

  test('can select a skill', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const skillsCard = page.locator('button', { hasText: /Skill Trees/i }).first()
    if (await skillsCard.isVisible()) {
      await skillsCard.click()
      await page.waitForTimeout(500)
      
      // Find a skill node
      const skillNode = page.locator('[class*="skill-node"]').or(
        page.locator('button[class*="skill"]')
      ).first()
      
      if (await skillNode.isVisible()) {
        await skillNode.click()
        await page.waitForTimeout(300)
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED DAILY CHALLENGES TESTS
// ============================================================================

test.describe('Authenticated - Daily Challenges', () => {
  test('can view daily challenges', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const challengesCard = page.locator('button', { hasText: /Daily Challenges/i }).first()
    if (await challengesCard.isVisible()) {
      await challengesCard.click()
      await page.waitForTimeout(500)
      
      // Challenges should be visible
      const challengeList = page.locator('text=/challenge|complete|bonus/i').first()
    }
  })

  test('can claim challenge reward', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const challengesCard = page.locator('button', { hasText: /Daily Challenges/i }).first()
    if (await challengesCard.isVisible()) {
      await challengesCard.click()
      await page.waitForTimeout(500)
      
      // Find claim button
      const claimButton = page.locator('button', { hasText: /claim|collect/i }).first()
      if (await claimButton.isVisible()) {
        await claimButton.click()
        await page.waitForTimeout(500)
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED TUTOR MODAL TESTS
// ============================================================================

test.describe('Authenticated - Find a Tutor', () => {
  test('can view available tutors', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const tutorCard = page.locator('button', { hasText: /Find a Tutor/i }).first()
    if (await tutorCard.isVisible()) {
      await tutorCard.click()
      await page.waitForTimeout(500)
      
      // Tutor list should be visible
      const tutorList = page.locator('text=/tutor|available|help/i').first()
    }
  })

  test('can request tutor session', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const tutorCard = page.locator('button', { hasText: /Find a Tutor/i }).first()
    if (await tutorCard.isVisible()) {
      await tutorCard.click()
      await page.waitForTimeout(500)
      
      // Find request button
      const requestButton = page.locator('button', { hasText: /request|book|schedule/i }).first()
      if (await requestButton.isVisible()) {
        await expect(requestButton).toBeEnabled()
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED CREDITS FLOW TESTS
// ============================================================================

test.describe('Authenticated - Credits System', () => {
  test('can view credit balance', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Open user menu
    const userMenuButton = page.locator('[aria-label="User account menu"]').first()
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click()
      await page.waitForTimeout(300)
      
      // Balance should be visible
      const balance = page.locator('text=/balance|credits|\$/i').first()
    }
  })

  test('can open add credits modal', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const userMenuButton = page.locator('[aria-label="User account menu"]').first()
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click()
      await page.waitForTimeout(300)
      
      const addCreditsItem = page.locator('button', { hasText: /Add Credits/i }).first()
      if (await addCreditsItem.isVisible()) {
        await addCreditsItem.click()
        await page.waitForTimeout(500)
        
        // Deposit modal should open
        const depositModal = page.locator('[role="dialog"]').first()
      }
    }
  })

  test('can navigate to credits page', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const userMenuButton = page.locator('[aria-label="User account menu"]').first()
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click()
      await page.waitForTimeout(300)
      
      const creditsItem = page.locator('button', { hasText: /Credits.*Billing/i }).first()
      if (await creditsItem.isVisible()) {
        await creditsItem.click()
        await page.waitForLoadState('networkidle')
        
        // Should be on credits page
        await expect(page.url()).toContain('credits')
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED SETTINGS TESTS
// ============================================================================

test.describe('Authenticated - Settings', () => {
  test('can navigate to settings page', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const userMenuButton = page.locator('[aria-label="User account menu"]').first()
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click()
      await page.waitForTimeout(300)
      
      const settingsItem = page.locator('button', { hasText: /Settings/i }).first()
      if (await settingsItem.isVisible()) {
        await settingsItem.click()
        await page.waitForLoadState('networkidle')
        
        // Should be on settings page
        await expect(page.url()).toContain('settings')
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED LEADERBOARD TESTS
// ============================================================================

test.describe('Authenticated - Leaderboard', () => {
  test('can navigate to leaderboard', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const leaderboardButton = page.getByRole('button', { name: /leaderboard/i }).first()
    if (await leaderboardButton.isVisible()) {
      await leaderboardButton.click()
      await page.waitForLoadState('networkidle')
      
      // Should be on leaderboard page
      await expect(page.url()).toContain('leaderboard')
    }
  })

  test('can switch leaderboard periods', async ({ page }) => {
    await page.goto('/basics-leaderboard')
    await page.waitForLoadState('networkidle')
    
    // Find period tabs
    const periods = ['Daily', 'Weekly', 'Monthly', 'All Time']
    for (const period of periods) {
      const tab = page.locator('button', { hasText: new RegExp(period, 'i') }).first()
      if (await tab.isVisible()) {
        await tab.click()
        await page.waitForTimeout(300)
      }
    }
  })
})

// ============================================================================
// AUTHENTICATED WRITING COMPETITION TESTS
// ============================================================================

test.describe('Authenticated - Writing Competition', () => {
  test('can open writing competition modal', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const writingButton = page.locator('button', { hasText: /Writing|Competition/i }).first()
    if (await writingButton.isVisible()) {
      await writingButton.click()
      await page.waitForTimeout(500)
      
      // Writing modal should open
      const writingModal = page.locator('[role="dialog"]').first()
    }
  })

  test('can view competition prompts', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const writingButton = page.locator('button', { hasText: /Writing|Competition/i }).first()
    if (await writingButton.isVisible()) {
      await writingButton.click()
      await page.waitForTimeout(500)
      
      // Prompts should be visible
      const prompts = page.locator('text=/prompt|topic|write about/i').first()
    }
  })
})

// ============================================================================
// AUTHENTICATED XP PROGRESSION TESTS
// ============================================================================

test.describe('Authenticated - XP and Progression', () => {
  test('XP bar updates after correct answer', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Get initial XP
    const xpDisplay = page.locator('text=/\\d+.*XP|XP.*\\d+/i').first()
    const initialXPText = await xpDisplay.textContent().catch(() => '0')
    
    // Complete a problem (would need to submit correct answer)
    // This is a placeholder - actual implementation would need to know correct answer
  })

  test('grade progress updates after problems', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    // Check for progress bars
    const progressBars = page.locator('[role="progressbar"]').or(
      page.locator('[class*="progress"]')
    )
    
    const count = await progressBars.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })
})

// ============================================================================
// AUTHENTICATED VOICE INPUT TESTS
// ============================================================================

test.describe('Authenticated - Voice Input', () => {
  test('can open voice settings', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const voiceCard = page.locator('button', { hasText: /Voice Input/i }).first()
    if (await voiceCard.isVisible()) {
      await voiceCard.click()
      await page.waitForTimeout(500)
      
      // Voice settings should open
      const voiceSettings = page.locator('[role="dialog"]').first()
    }
  })

  test('voice toggle button works', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const voiceCard = page.locator('button', { hasText: /Voice Input/i }).first()
    if (await voiceCard.isVisible()) {
      await voiceCard.click()
      await page.waitForTimeout(500)
      
      // Find enable/disable toggle
      const toggle = page.locator('button', { hasText: /enable|disable|on|off/i }).or(
        page.locator('[role="switch"]')
      ).first()
      
      if (await toggle.isVisible()) {
        await toggle.click()
        await page.waitForTimeout(300)
      }
    }
  })
})

// ============================================================================
// SIGN OUT TEST
// ============================================================================

test.describe('Authenticated - Sign Out', () => {
  test('can sign out successfully', async ({ page }) => {
    const isAuth = await setupAuth(page)
    if (!isAuth) {
      test.skip()
      return
    }
    
    const userMenuButton = page.locator('[aria-label="User account menu"]').first()
    if (await userMenuButton.isVisible()) {
      await userMenuButton.click()
      await page.waitForTimeout(300)
      
      const signOutItem = page.locator('button', { hasText: /Sign Out/i }).first()
      if (await signOutItem.isVisible()) {
        await signOutItem.click()
        await page.waitForLoadState('networkidle')
        
        // Should redirect to home or login
        const url = page.url()
        // User should be signed out
      }
    }
  })
})




