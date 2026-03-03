import { generateVerificationCode, calculateProgressInfo } from '../dashboardUtils'
import { SURVEY_IDS } from '@/lib/types/survey'

describe('dashboardUtils', () => {
  describe('generateVerificationCode', () => {
    it('generates a verification code from user ID', () => {
      const userId = 'test-user-123'
      const code = generateVerificationCode(userId)

      expect(code).toMatch(/^PITCH-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/)
    })

    it('returns empty string for undefined user ID', () => {
      const code = generateVerificationCode(undefined)
      expect(code).toBe('')
    })

    it('generates consistent codes for the same user ID', () => {
      const userId = 'test-user-123'
      const code1 = generateVerificationCode(userId)
      const code2 = generateVerificationCode(userId)

      expect(code1).toBe(code2)
    })

    it('generates different codes for different user IDs', () => {
      const code1 = generateVerificationCode('completely-different-user-id-123')
      const code2 = generateVerificationCode('another-totally-unique-id-456')

      expect(code1).not.toBe(code2)
    })
  })

  describe('calculateProgressInfo', () => {
    const mockIsSurveyCompleted = (surveyId: string) => false

    it('returns step 1 when post-GitHub survey is not completed', () => {
      const result = calculateProgressInfo(
        false, false, false, false, false, false, null, false,
        (id) => id !== SURVEY_IDS.POST_GITHUB
      )

      expect(result.currentStep).toBe(1)
      expect(result.stepTitle).toBe('Complete Post-GitHub Survey')
      expect(result.isPreVercel).toBe(true)
    })

    it('returns step 2 when cursor setup is not complete', () => {
      const result = calculateProgressInfo(
        false, false, false, false, false, false, null, false,
        (id) => id === SURVEY_IDS.POST_GITHUB
      )

      expect(result.currentStep).toBe(2)
      expect(result.stepTitle).toBe('Install & Set Up Cursor')
      expect(result.isPreVercel).toBe(true)
    })

    it('returns step 6 for Vercel deployment', () => {
      const result = calculateProgressInfo(
        true, true, false, false, false, false, null, false,
        (id) => [SURVEY_IDS.POST_GITHUB, SURVEY_IDS.POST_CURSOR, SURVEY_IDS.POST_WEBSITE].includes(id as any)
      )

      expect(result.currentStep).toBe(6)
      expect(result.stepTitle).toBe('Deploy to Vercel - UNLOCK THE PLATFORM')
      expect(result.isPreVercel).toBe(true)
    })

    it('returns step 7 post-Vercel when Vercel is complete', () => {
      const result = calculateProgressInfo(
        true, true, true, false, false, false, null, false,
        (id) => [SURVEY_IDS.POST_GITHUB, SURVEY_IDS.POST_CURSOR, SURVEY_IDS.POST_WEBSITE].includes(id as any)
      )

      expect(result.currentStep).toBe(7)
      expect(result.stepTitle).toBe('Complete Post-Vercel Survey')
      expect(result.isPreVercel).toBe(false)
    })

    it('returns step 12 when working on a project', () => {
      const mockProject = { projectNumber: 3 }
      const result = calculateProgressInfo(
        true, true, true, true, true, true, mockProject, false,
        () => true
      )

      expect(result.currentStep).toBe(12)
      expect(result.stepTitle).toBe('Working on Project #3')
      expect(result.isPreVercel).toBe(false)
    })

    it('includes next milestone in progress info', () => {
      const result = calculateProgressInfo(
        false, false, false, false, false, false, null, false,
        (id) => id === SURVEY_IDS.POST_GITHUB
      )

      expect(result.nextMilestone).toBe('Build your first project')
    })
  })
})
