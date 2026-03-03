/**
 * TimeBack Platform Configuration
 * Parses credentials from TB_CREDENTIALS environment variable
 */

import type { TimeBackCredentials, TimeBackConfig } from '@/lib/types/timeback'
import { logger } from '@/lib/logger'

/**
 * Parse TimeBack credentials from environment variable
 * Supports JSON object format stored in Vercel
 */
function getTimeBackCredentials(): TimeBackCredentials | null {
  const credentialsJson = process.env.TB_CREDENTIALS
  
  if (!credentialsJson) {
    logger.warn('Config', 'TB_CREDENTIALS environment variable not found')
    return null
  }
  
  try {
    const credentials = JSON.parse(credentialsJson)
    
    // Validate required fields
    if (!credentials.client_id || !credentials.client_secret) {
      logger.error('Config', 'TB_CREDENTIALS missing required fields (client_id, client_secret)')
      return null
    }
    
    return credentials as TimeBackCredentials
  } catch (error) {
    logger.error('Config', 'Failed to parse TB_CREDENTIALS', { error: error })
    return null
  }
}

/**
 * Get TimeBack configuration based on environment
 */
export function getTimeBackConfig(): TimeBackConfig | null {
  const credentials = getTimeBackCredentials()
  
  if (!credentials) {
    return null
  }
  
  const environment = (process.env.TIMEBACK_ENVIRONMENT || 'staging') as 'staging' | 'production'
  const isProduction = environment === 'production'
  
  return {
    credentials,
    environment,
    idpUrl: isProduction 
      ? 'https://platform.timeback.com'
      : 'https://platform.dev.timeback.com',
    issuer: isProduction
      ? 'https://timeback.com'
      : 'https://staging.timeback.com',
    jwksUrl: isProduction
      ? 'https://timeback.com/.well-known/jwks.json'
      : 'https://staging.timeback.com/.well-known/jwks.json',
    audience: 'pitchrise-basics',
  }
}

/**
 * Check if TimeBack is properly configured
 */
export function isTimeBackConfigured(): boolean {
  return getTimeBackConfig() !== null
}

