import { defineConfig, devices } from '@playwright/test'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Path to store authenticated session
const STORAGE_STATE = path.join(__dirname, '.auth/user.json')

/**
 * Playwright configuration for running tests against production
 * 
 * Usage:
 *   # Run all tests (unauthenticated)
 *   npx playwright test --config=e2e/playwright.prod.config.ts
 * 
 *   # Run with authentication
 *   TEST_USER_EMAIL=your@email.com TEST_USER_PASSWORD=yourpass npx playwright test --config=e2e/playwright.prod.config.ts
 * 
 *   # Run specific test file
 *   npx playwright test e2e/independent-study.spec.ts --config=e2e/playwright.prod.config.ts
 */
export default defineConfig({
  testDir: './',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  
  /* Reporter to use. Generate HTML report */
  reporter: [
    ['html', { outputFolder: '../playwright-report', open: 'never' }],
    ['json', { outputFile: '../playwright-report/results.json' }],
    ['list']
  ],
  
  /* Global timeout */
  timeout: 60 * 1000,
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL - Production */
    baseURL: 'https://your-domain.com',
    
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
    
    /* Default navigation timeout */
    navigationTimeout: 30 * 1000,
    
    /* Default action timeout */
    actionTimeout: 15 * 1000,
  },

  /* Configure projects */
  projects: [
    // Setup project - runs first to authenticate
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    
    // Unauthenticated tests
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /auth\.setup\.ts/,
    },
    
    // Authenticated tests - use stored session
    {
      name: 'chromium-authenticated',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
      testIgnore: /auth\.setup\.ts/,
    },
  ],

  /* No webServer - we're testing against production */
})
