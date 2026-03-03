import { SURVEY_IDS } from '@/lib/types/survey'
import { generateVerificationCode as generateCode } from '@/lib/firebase/userUtils'

/**
 * Generate verification code, handling undefined userId
 */
export function generateVerificationCode(userId: string | undefined): string {
  if (!userId) return ''
  return generateCode(userId)
}

export interface ProgressInfo {
  currentStep: number
  stepTitle: string
  isPreVercel: boolean
  nextMilestone: string
  subStepCurrent?: number  // Current sub-step within the milestone
  subStepTotal?: number    // Total sub-steps in the milestone
  milestoneTitle?: string  // Name of the current milestone
}

export interface SubStepProgress {
  current: number
  total: number
}

export function calculateProgressInfo(
  cursorSetupComplete: boolean,
  personalWebsiteComplete: boolean,
  vercelDeploymentComplete: boolean,
  loomVideoComplete: boolean,
  mentorApplicationViewed: boolean,
  hasVision: boolean,
  currentProject: any | null,
  isGeneratingProject: boolean,
  isSurveyCompleted: (surveyId: string) => boolean,
  subStepProgress?: SubStepProgress,  // Optional sub-step tracking
  lastCompletedProject?: any | null,  // Project that needs a Loom video
  projectLoomComplete?: boolean       // Whether project Loom is done
): ProgressInfo {
  if (!isSurveyCompleted(SURVEY_IDS.POST_GITHUB)) {
    return {
      currentStep: 1,
      stepTitle: 'Complete Post-GitHub Survey',
      isPreVercel: true,
      nextMilestone: 'Set up Cursor AI editor'
    }
  }

  if (!cursorSetupComplete) {
    return {
      currentStep: 2,
      stepTitle: 'Install & Set Up Cursor',
      isPreVercel: true,
      nextMilestone: 'Build your first project',
      subStepCurrent: subStepProgress?.current,
      subStepTotal: subStepProgress?.total,
      milestoneTitle: 'Cursor Setup'
    }
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_CURSOR)) {
    return {
      currentStep: 3,
      stepTitle: 'Complete Post-Cursor Survey',
      isPreVercel: true,
      nextMilestone: 'Build your personal website'
    }
  }

  if (!personalWebsiteComplete) {
    return {
      currentStep: 4,
      stepTitle: 'Build Your Personal Website',
      isPreVercel: true,
      nextMilestone: 'Deploy to Vercel and unlock the platform',
      subStepCurrent: subStepProgress?.current,
      subStepTotal: subStepProgress?.total,
      milestoneTitle: 'Personal Website'
    }
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_WEBSITE)) {
    return {
      currentStep: 5,
      stepTitle: 'Complete Post-Website Survey',
      isPreVercel: true,
      nextMilestone: 'Deploy to Vercel and RISE!'
    }
  }

  if (!vercelDeploymentComplete) {
    return {
      currentStep: 6,
      stepTitle: 'Deploy to Vercel - UNLOCK THE PLATFORM',
      isPreVercel: true,
      nextMilestone: 'RISE above the PITCH and unlock full platform',
      subStepCurrent: subStepProgress?.current,
      subStepTotal: subStepProgress?.total,
      milestoneTitle: 'Vercel Deployment'
    }
  }

  if (!isSurveyCompleted(SURVEY_IDS.POST_VERCEL)) {
    return {
      currentStep: 7,
      stepTitle: 'Complete Post-Vercel Survey',
      isPreVercel: false,
      nextMilestone: 'Create your Loom showcase video'
    }
  }

  if (!loomVideoComplete) {
    return {
      currentStep: 8,
      stepTitle: 'Create Your Loom Showcase Video',
      isPreVercel: false,
      nextMilestone: 'Define your 5-year vision',
      subStepCurrent: subStepProgress?.current,
      subStepTotal: subStepProgress?.total,
      milestoneTitle: 'Loom Showcase Video'
    }
  }

  // Mentor application is now optional (in sidebar) - skip this step

  if (!hasVision) {
    return {
      currentStep: 9,
      stepTitle: 'Define Your 5-Year Vision',
      isPreVercel: false,
      nextMilestone: 'Generate your first custom AI project'
    }
  }

  if (!isSurveyCompleted(SURVEY_IDS.PRE_CUSTOM_PROJECT)) {
    return {
      currentStep: 10,
      stepTitle: 'Complete Pre-Project Survey',
      isPreVercel: false,
      nextMilestone: 'Generate your personalized project'
    }
  }

  if (!currentProject && !isGeneratingProject) {
    return {
      currentStep: 11,
      stepTitle: 'Generate Your Custom Project',
      isPreVercel: false,
      nextMilestone: 'Start building your custom project'
    }
  }

  if (currentProject) {
    return {
      currentStep: 12,
      stepTitle: `Working on Project #${currentProject.projectNumber}`,
      isPreVercel: false,
      nextMilestone: 'Complete current project and create showcase video'
    }
  }

  // Check if user has a completed project that needs a Loom video
  if (lastCompletedProject && !projectLoomComplete) {
    return {
      currentStep: 13,
      stepTitle: `Create Loom Video for Project #${lastCompletedProject.projectNumber}`,
      isPreVercel: false,
      nextMilestone: 'Generate your next custom project',
      subStepCurrent: subStepProgress?.current,
      subStepTotal: subStepProgress?.total,
      milestoneTitle: 'Project Loom Video'
    }
  }

  return {
    currentStep: 14,
    stepTitle: 'Continue Your Learning Journey',
    isPreVercel: false,
    nextMilestone: 'Keep building and learning!'
  }
}
