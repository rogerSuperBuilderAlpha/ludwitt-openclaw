/**
 * Onboarding Components
 *
 * Components for the first-time user onboarding experience
 */

export { PlatformIntroWizard } from './PlatformIntroWizard'
export { ProfileReminderBanner } from './ProfileReminderBanner'
export { CreditRequiredModal } from './CreditRequiredModal'
export { FirstProblemCelebration } from './FirstProblemCelebration'

// Avatar onboarding sub-components and hook
export {
  useAvatarOnboarding,
  BirthdateStep,
  RegionStep,
  AvatarTypeStep,
  AvatarPickStep,
  NicknameStep,
  ReviewStep,
  StepIndicator,
} from './avatar'
