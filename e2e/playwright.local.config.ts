import { defineConfig, devices } from '@playwright/test'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

/**
 * Playwright configuration for running tests against a local dev server
 * that is ALREADY RUNNING.
 * 
 * Usage:
 *   # First start the dev server in another terminal:
 *   npm run dev
 * 
 *   # Then run tests:
 *   npx playwright test --config=e2e/playwright.local.config.ts
 * 
 *   # Run specific test:
 *   npx playwright test ai-grading.spec.ts --config=e2e/playwright.local.config.ts
 */
export default defineConfig({
  testDir: './',
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  
  reporter: [['list']],
  
  timeout: 60 * 1000,
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30 * 1000,
    actionTimeout: 15 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // NO webServer - expects server to already be running
})
