/**
 * Basics System Configuration
 * 
 * Centralized configuration for feature flags and environment settings
 */

import { logger } from '@/lib/logger'
export const BasicsConfig = {
  // AI Features
  enableAI: process.env.ANTHROPIC_API_KEY && process.env.BASICS_ENABLE_AI !== 'false',
  
  // Local Store
  useLocalStore: process.env.BASICS_USE_LOCAL_STORE === 'true',
  
  // Math Verification
  verifyMath: process.env.BASICS_VERIFY_MATH !== 'false',
  
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  
  // Debug logging
  enableDebugLogs: process.env.NODE_ENV !== 'production' && process.env.BASICS_DEBUG_LOGS !== 'false'
} as const

/**
 * Check if AI generation is available
 */
export function isAIGenerationAvailable(): boolean {
  return Boolean(BasicsConfig.enableAI && process.env.ANTHROPIC_API_KEY)
}

/**
 * Check if AI validation is available
 */
export function isAIValidationAvailable(): boolean {
  return Boolean(BasicsConfig.enableAI && process.env.ANTHROPIC_API_KEY)
}

/**
 * Check if D-ID video service is available
 */
export function isVideoServiceAvailable(): boolean {
  return Boolean(process.env.DID_API_KEY)
}

/**
 * Log debug message if debug logging is enabled
 */
export function debugLog(message: string, ...args: unknown[]): void {
  if (BasicsConfig.enableDebugLogs) {
    logger.info('BasicsDebug', message, { data: args.length === 1 ? args[0] : args })
  }
}
