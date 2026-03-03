/**
 * Misconception Detection & Fingerprinting System
 * 
 * Identifies student misconceptions from error patterns and provides
 * targeted remediation recommendations.
 */

export * from './types'

// Taxonomy
export { 
  ALL_MATH_MISCONCEPTIONS,
  MATH_MISCONCEPTIONS_BY_ID,
  MATH_MISCONCEPTIONS_BY_CATEGORY,
  ARITHMETIC_MISCONCEPTIONS,
  FRACTION_MISCONCEPTIONS,
  ALGEBRA_MISCONCEPTIONS,
  DECIMAL_PERCENT_MISCONCEPTIONS,
  ORDER_OF_OPERATIONS_MISCONCEPTIONS
} from './taxonomy/math'

// Error analysis
export { analyzeError } from './error-analyzer'
export type { ErrorAnalysisInput, ErrorAnalysisResult } from './error-analyzer'

// Detection
export { 
  detectMisconceptions,
  detectMisconceptionsFromHistory
} from './detector'
export type { DetectionInput, DetectionContext, ErrorRecord } from './detector'

// Fingerprinting
export {
  updateMisconceptionProfile,
  checkRemediationProgress,
  startRemediation,
  getPrioritizedMisconceptions,
  getBlockingMisconceptions,
  getMisconceptionSummary,
  hasMisconception,
  getMisconceptionsByCategory
} from './fingerprinter'
export type { FingerprintUpdate } from './fingerprinter'

// Storage
export {
  getMisconceptionProfile,
  storeMisconceptionProfile,
  storeErrorRecord,
  getRecentErrorRecords,
  getErrorRecordsForMisconception,
  getErrorRecordsBySubject,
  getMisconceptionPrevalence,
  getCommonMisconceptions
} from './storage'
