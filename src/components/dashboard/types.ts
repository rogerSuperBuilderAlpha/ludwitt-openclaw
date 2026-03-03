import { User } from 'firebase/auth'
import { ALCProgressState, ALCProject } from '@/lib/alc/types'
import { ProgressInfo } from '@/lib/utils/dashboardUtils'

export const MAX_PROJECTS = 5

export interface DashboardStepsProps {
  user?: User | null
  progress: ALCProgressState
  progressInfo: ProgressInfo
  verificationCode: string
  isGeneratingProject: boolean
  projectError: string
  showPortfolioPrompt: boolean
  justCompletedProject: ALCProject | null
  isSurveyCompleted: (surveyId: string) => boolean
  onSurveySubmit: (surveyId: string, responses: { [key: string]: string | number }) => Promise<void>
  onSurveySkip: (surveyId: string) => Promise<void>
  onVisionSubmit: (vision: string) => Promise<void>
  onGenerateProject: () => Promise<void>
  onProjectComplete: () => Promise<void>
  onPortfolioComplete: () => void
  onSubStepProgressChange?: (current: number, total: number) => void
  onVercelComplete: () => void
  onStartOptionalExtra: (extra: 'claude-code' | 'openclaw') => void
  onDismissExtras: () => void
  showOptionalExtrasPrompt: boolean
  showExtrasBanner: boolean
  activeExtra: 'claude-code' | 'openclaw' | null
}

/** Props shared by individual step sub-components that need user auth and sub-step progress. */
export interface StepBaseProps {
  userId: string
  onSubStepProgressChange?: (current: number, total: number) => void
}

/** Props for survey convenience wrapper. */
export interface SurveyStepProps {
  surveyId: string
  onSurveySubmit: (surveyId: string, responses: { [key: string]: string | number }) => Promise<void>
  onSurveySkip: (surveyId: string) => Promise<void>
}
