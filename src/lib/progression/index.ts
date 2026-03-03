/**
 * Progression Gates Module
 *
 * Centralized progression system for Basics -> ALC -> Developer stages.
 */

export { THRESHOLDS, evaluateProgression, evaluateMathGate, evaluateReadingGate, evaluateProjectsGate, evaluateDeploymentGate, calculateEffectiveWeeklyXP, evaluateWeeklyMaintenance } from './gates'
export { useProgressionGates } from './useProgressionGates'
export type { ProgressionStage, ProgressionData, GateStatus, WeeklyXPStatus, ProgressionGatesStatus } from './types'
