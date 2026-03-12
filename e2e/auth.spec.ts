import { expect, test } from '@playwright/test'

test.describe('Authentication flow', () => {
  test('login page renders email sign-in controls', async ({ page }) => {
    const response = await page.goto('/login')

    expect(response?.status()).toBeLessThan(400)
    await expect(
      page.getByRole('heading', { name: /welcome back/i }),
    ).toBeVisible()
    await expect(page.getByPlaceholder('Email address')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })

  test('login form requires both email and password', async ({ page }) => {
    await page.goto('/login')

    const emailInput = page.getByPlaceholder('Email address')
    const passwordInput = page.getByPlaceholder('Password')
    await page.getByRole('button', { name: 'Sign In' }).click()

    const emailState = await emailInput.evaluate((element) => {
      const input = element as HTMLInputElement
      return {
        message: input.validationMessage,
        valid: input.checkValidity(),
      }
    })
    const passwordState = await passwordInput.evaluate((element) => {
      const input = element as HTMLInputElement
      return {
        message: input.validationMessage,
        valid: input.checkValidity(),
      }
    })

    expect(emailState.valid).toBe(false)
    expect(emailState.message.length).toBeGreaterThan(0)
    expect(passwordState.valid).toBe(false)
    expect(passwordState.message.length).toBeGreaterThan(0)
  })

  test('login form rejects invalid email format', async ({ page }) => {
    await page.goto('/login')

    const emailInput = page.getByPlaceholder('Email address')
    const passwordInput = page.getByPlaceholder('Password')

    await emailInput.fill('not-an-email')
    await passwordInput.fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    const emailState = await emailInput.evaluate((element) => {
      const input = element as HTMLInputElement
      return {
        message: input.validationMessage,
        valid: input.checkValidity(),
      }
    })

    expect(emailState.valid).toBe(false)
    expect(emailState.message.length).toBeGreaterThan(0)
  })
})
