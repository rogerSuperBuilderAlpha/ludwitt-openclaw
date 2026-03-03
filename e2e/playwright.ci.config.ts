import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for CI.
 *
 * - Chromium only (speed)
 * - Retries failed tests twice
 * - Single worker to avoid resource contention
 * - Starts the built app via `npm run start`
 * - Auth tests run when TEST_USER_EMAIL/TEST_USER_PASSWORD secrets are set
 */
export default defineConfig({
  testDir: './',

  fullyParallel: false,
  forbidOnly: true,
  retries: 2,
  workers: 1,

  reporter: [['html', { open: 'never' }]],

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

  // Auth tests require TEST_USER_EMAIL and TEST_USER_PASSWORD secrets in CI

  webServer: {
    command: 'npm run start',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
})
