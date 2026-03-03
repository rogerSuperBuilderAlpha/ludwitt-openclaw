/**
 * ALC (Developer Training Track) - Centralized Module
 *
 * This module provides a unified API for the ALC learning journey.
 * All step definitions, progress tracking, and transitions are centralized here.
 *
 * Usage:
 *
 * // Import everything
 * import { useALCProgress, completeStep, ALC_STEPS } from '@/lib/alc'
 *
 * // Use in a component
 * const { progress, currentStep } = useALCProgress(user)
 *
 * // Complete a step
 * await completeStep({ stepId: 'vision-input', userId, vision })
 */

// Types
export * from './types'

// Path Configuration
export {
  PATH_CONFIGS,
  getPathConfig,
  ALL_PATHS,
} from './paths'
export type { ALCPath, PathConfig } from './paths'

// Step Definitions
export {
  ALC_STEPS,
  getALCSteps,
  getTotalSteps,
  getStepConfig,
  getStepByNumber,
  getNextStep,
  getPreviousStep,
  isPreVercelStep,
  getStepsByPhase,
  TOTAL_STEPS,
} from './steps'

// Progress Hook
export { useALCProgress } from './useALCProgress'

// Transitions
export {
  completeStep,
  completeSurvey,
  skipSurvey,
  updateChecklistProgress,
  verifyVercelDeployment,
  markVercelComplete,
  saveVision,
  generateProject,
  completeProject,
  selectPath,
  markFirebaseDeployComplete,
  markOpenclawDeployComplete,
} from './transitions'
