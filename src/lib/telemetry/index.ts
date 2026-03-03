/**
 * Telemetry System
 * 
 * Collects and analyzes student interaction data for:
 * - Struggle detection
 * - Cognitive load estimation
 * - Personalized modeling
 * - Misconception detection
 */

export * from './types'

// Client-side collector
export { useTelemetryCollector, useTelemetryInput } from './collector'

// Server-side aggregation
export { 
  updateTelemetryProfile, 
  analyzeSignalDeviations, 
  detectBehavioralAnomalies 
} from './aggregator'

// Server-side storage
export {
  storeTelemetrySession,
  getRecentSessions,
  getTelemetryProfile,
  storeTelemetryProfile,
  processTelemetrySession,
  getSubjectStats,
  getProblemDifficultyData
} from './storage'
