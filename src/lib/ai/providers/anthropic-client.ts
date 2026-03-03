/**
 * Anthropic Client with Resilient Model Selection
 * 
 * Features:
 * - Fetches available models from Anthropic API
 * - Automatically falls back to alternative models on failure
 * - Caches model list to avoid repeated API calls
 */

import Anthropic from '@anthropic-ai/sdk'
import { logger } from '@/lib/logger'

// Cache for available models
let cachedModels: string[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const TAG = 'ANTHROPIC'

// Model tier preferences for fallback
const MODEL_TIER_PREFERENCES = {
  economy: ['claude-haiku', 'haiku'],
  standard: ['claude-sonnet', 'sonnet'],
  premium: ['claude-opus', 'opus']
}

/**
 * Get the Anthropic client instance
 */
export function getAnthropicClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) {
    logger.error(TAG, 'No API key configured')
    return null
  }
  
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })
}

/**
 * Fetch available models from Anthropic API
 * Results are cached for 1 hour
 */
export async function fetchAvailableModels(forceRefresh = false): Promise<string[]> {
  const now = Date.now()
  
  // Return cached if valid
  if (!forceRefresh && cachedModels && (now - cacheTimestamp) < CACHE_TTL_MS) {
    logger.debug(TAG, `Using cached model list: ${cachedModels.length} models`)
    return cachedModels
  }

  const client = getAnthropicClient()
  if (!client) {
    logger.error(TAG, 'Cannot fetch models - no client')
    return []
  }

  try {
    logger.debug(TAG, 'Fetching available models from API...')
    const models: string[] = []
    
    // Use the beta models list API
    for await (const modelInfo of client.beta.models.list()) {
      models.push(modelInfo.id)
    }
    
    logger.debug(TAG, `Available models: ${models.join(', ')}`)
    
    // Update cache
    cachedModels = models
    cacheTimestamp = now
    
    return models
  } catch (error) {
    logger.error(TAG, 'Failed to fetch models', { error })
    
    // Return cached if available, even if stale
    if (cachedModels) {
      logger.debug(TAG, 'Using stale cache as fallback')
      return cachedModels
    }
    
    return []
  }
}

/**
 * Find the best available model matching the requested tier
 */
export async function findAvailableModel(
  requestedModel: string,
  tier: 'economy' | 'standard' | 'premium' = 'economy'
): Promise<string> {
  const availableModels = await fetchAvailableModels()
  
  // If requested model is available, use it
  if (availableModels.includes(requestedModel)) {
    logger.debug(TAG, `Requested model available: ${requestedModel}`)
    return requestedModel
  }
  
  logger.debug(TAG, `Requested model not available: ${requestedModel}, looking for alternative in tier: ${tier}`)
  
  // Get tier keywords to search for
  const tierKeywords = MODEL_TIER_PREFERENCES[tier] || MODEL_TIER_PREFERENCES.economy
  
  // Find models matching the tier, sorted by newest (assuming newer dates = newer models)
  const tierModels = availableModels
    .filter(model => tierKeywords.some(keyword => model.toLowerCase().includes(keyword)))
    .sort((a, b) => {
      // Extract dates from model names (e.g., claude-3-haiku-20240307)
      const dateA = a.match(/(\d{8})/)?.[1] || '0'
      const dateB = b.match(/(\d{8})/)?.[1] || '0'
      return dateB.localeCompare(dateA) // Descending (newest first)
    })
  
  if (tierModels.length > 0) {
    logger.debug(TAG, `Found alternative: ${tierModels[0]}`)
    return tierModels[0]
  }
  
  // Fallback: try other tiers
  const fallbackOrder = tier === 'premium' 
    ? ['standard', 'economy'] 
    : tier === 'standard'
    ? ['premium', 'economy']
    : ['standard', 'premium']
  
  for (const fallbackTier of fallbackOrder) {
    const keywords = MODEL_TIER_PREFERENCES[fallbackTier as keyof typeof MODEL_TIER_PREFERENCES]
    const fallbackModels = availableModels
      .filter(model => keywords.some(keyword => model.toLowerCase().includes(keyword)))
      .sort((a, b) => {
        const dateA = a.match(/(\d{8})/)?.[1] || '0'
        const dateB = b.match(/(\d{8})/)?.[1] || '0'
        return dateB.localeCompare(dateA)
      })
    
    if (fallbackModels.length > 0) {
      logger.debug(TAG, `Using fallback from tier ${fallbackTier}: ${fallbackModels[0]}`)
      return fallbackModels[0]
    }
  }
  
  // Last resort: return the first available model
  if (availableModels.length > 0) {
    logger.debug(TAG, `Using first available model: ${availableModels[0]}`)
    return availableModels[0]
  }
  
  // No models available - return the requested one and let it fail
  logger.error(TAG, `No models available, returning requested: ${requestedModel}`)
  return requestedModel
}

/**
 * Execute an Anthropic API call with automatic model fallback
 */
export async function executeWithFallback<T>(
  requestedModel: string,
  tier: 'economy' | 'standard' | 'premium',
  apiCall: (model: string, client: Anthropic) => Promise<T>,
  maxRetries = 2
): Promise<T> {
  const client = getAnthropicClient()
  if (!client) {
    throw new Error('Anthropic client not available - check API key')
  }

  let lastError: Error | null = null
  let currentModel = requestedModel
  const triedModels = new Set<string>()
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      logger.debug(TAG, `Attempt ${attempt + 1}: Using model ${currentModel}`)
      triedModels.add(currentModel)
      
      return await apiCall(currentModel, client)
    } catch (error: unknown) {
      lastError = error instanceof Error ? error : new Error(String(error))
      const status = (error as { status?: number })?.status
      const message = lastError.message
      
      logger.error(TAG, `Attempt ${attempt + 1} failed`, { 
        data: { model: currentModel, status, message } 
      })
      
      // Check if it's a model not found error (404)
      if (status === 404 || message?.includes('not_found')) {
        logger.debug(TAG, 'Model not found, refreshing model list...')
        
        // Force refresh the model list
        const availableModels = await fetchAvailableModels(true)
        
        // Find an alternative model we haven't tried yet
        const tierKeywords = MODEL_TIER_PREFERENCES[tier]
        const alternatives = availableModels
          .filter(m => !triedModels.has(m))
          .filter(m => tierKeywords.some(k => m.toLowerCase().includes(k)))
          .sort((a, b) => {
            const dateA = a.match(/(\d{8})/)?.[1] || '0'
            const dateB = b.match(/(\d{8})/)?.[1] || '0'
            return dateB.localeCompare(dateA)
          })
        
        if (alternatives.length > 0) {
          currentModel = alternatives[0]
          logger.debug(TAG, `Retrying with alternative: ${currentModel}`)
          continue
        }
        
        // Try any model we haven't tried
        const anyAlternative = availableModels.find(m => !triedModels.has(m))
        if (anyAlternative) {
          currentModel = anyAlternative
          logger.debug(TAG, `Retrying with any available: ${currentModel}`)
          continue
        }
      }
      
      // For other errors (rate limit, etc.), don't retry with different model
      if (status === 429) {
        logger.warn(TAG, 'Rate limited, not retrying')
        throw error
      }
    }
  }
  
  // All retries exhausted
  throw lastError || new Error('All model attempts failed')
}

/**
 * Clear the model cache (useful for testing or manual refresh)
 */
export function clearModelCache(): void {
  cachedModels = null
  cacheTimestamp = 0
  logger.debug(TAG, 'Model cache cleared')
}
