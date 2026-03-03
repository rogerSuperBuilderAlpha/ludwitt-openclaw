/**
 * Model Resolver
 * 
 * Resolves which AI model to use based on user preferences and task requirements.
 * This is the main entry point for API routes to determine which model to use.
 */

import { db } from '@/lib/firebase/admin'
import { Collections } from '@/lib/basics/collections'
import { 
  AIModel, 
  AITaskType, 
  ModelTier, 
  ResolvedModel, 
  UserAIPreferences 
} from './types'
import { 
  getDefaultModelForTier, 
  getModelById, 
  getTaskConfig, 
  getAvailableModels,
  TASK_CONFIGS 
} from './registry'
import { logger } from '@/lib/logger'

// Cache for user preferences (TTL: 5 minutes)
const preferencesCache = new Map<string, { prefs: UserAIPreferences; expiry: number }>()
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Default AI preferences for new users
 * Uses 'economy' tier (Claude 3.5 Haiku) as default for cost-effectiveness
 */
export const DEFAULT_AI_PREFERENCES: UserAIPreferences = {
  preferredTier: 'economy',
  updatedAt: new Date().toISOString(),
}

/**
 * Get user's AI preferences from Firestore (with caching)
 */
export async function getUserAIPreferences(userId: string): Promise<UserAIPreferences> {
  // Check cache first
  const cached = preferencesCache.get(userId)
  if (cached && cached.expiry > Date.now()) {
    return cached.prefs
  }
  
  try {
    if (!db) {
      logger.warn('Modelresolver', 'Firestore not available, using defaults')
      return DEFAULT_AI_PREFERENCES
    }
    
    const userDoc = await db.collection(Collections.USERS).doc(userId).get()
    
    if (!userDoc.exists) {
      return DEFAULT_AI_PREFERENCES
    }
    
    const userData = userDoc.data()
    const prefs: UserAIPreferences = userData?.aiPreferences || DEFAULT_AI_PREFERENCES
    
    // Cache the result
    preferencesCache.set(userId, {
      prefs,
      expiry: Date.now() + CACHE_TTL_MS,
    })
    
    return prefs
  } catch (error) {
    logger.error('Modelresolver', 'Failed to fetch user preferences', { error: error })
    return DEFAULT_AI_PREFERENCES
  }
}

/**
 * Save user's AI preferences to Firestore
 */
export async function saveUserAIPreferences(
  userId: string, 
  preferences: Partial<UserAIPreferences>
): Promise<UserAIPreferences> {
  const currentPrefs = await getUserAIPreferences(userId)
  
  const updatedPrefs: UserAIPreferences = {
    ...currentPrefs,
    ...preferences,
    updatedAt: new Date().toISOString(),
  }
  
  if (!db) {
    throw new Error('Firestore not available')
  }
  
  await db.collection(Collections.USERS).doc(userId).set(
    { aiPreferences: updatedPrefs },
    { merge: true }
  )
  
  // Update cache
  preferencesCache.set(userId, {
    prefs: updatedPrefs,
    expiry: Date.now() + CACHE_TTL_MS,
  })
  
  return updatedPrefs
}

/**
 * Clear cached preferences for a user
 */
export function clearPreferencesCache(userId: string): void {
  preferencesCache.delete(userId)
}

/**
 * Resolve which model to use for a specific user and task
 * 
 * Resolution order:
 * 1. User's task-specific preference (if set)
 * 2. User's specific model preference (if set)
 * 3. User's tier preference
 * 4. Task's recommended tier (fallback)
 */
export async function resolveModelForUser(
  userId: string | undefined,
  taskType: AITaskType
): Promise<ResolvedModel> {
  const taskConfig = getTaskConfig(taskType)
  
  // If no user ID, use task's recommended tier
  if (!userId) {
    return {
      model: getDefaultModelForTier(taskConfig.recommendedTier),
      reason: 'task-default',
    }
  }
  
  try {
    const prefs = await getUserAIPreferences(userId)
    
    // Check for task-specific preference
    if (prefs.taskPreferences?.[taskType as keyof typeof prefs.taskPreferences]) {
      const taskPref = prefs.taskPreferences[taskType as keyof typeof prefs.taskPreferences]
      
      // If it's a model ID, use that specific model
      if (typeof taskPref === 'string' && taskPref.includes('-')) {
        const specificModel = getModelById(taskPref)
        if (specificModel && specificModel.available) {
          return {
            model: specificModel,
            reason: 'user-preference',
          }
        }
      }
      
      // If it's a tier, use that tier
      if (['economy', 'standard', 'premium'].includes(taskPref as string)) {
        return {
          model: getDefaultModelForTier(taskPref as ModelTier),
          reason: 'user-preference',
        }
      }
    }
    
    // Check for specific model preference
    if (prefs.preferredModelId) {
      const specificModel = getModelById(prefs.preferredModelId)
      if (specificModel && specificModel.available) {
        return {
          model: specificModel,
          reason: 'user-preference',
        }
      }
    }
    
    // Use user's tier preference
    if (prefs.preferredTier) {
      return {
        model: getDefaultModelForTier(prefs.preferredTier),
        reason: 'user-preference',
      }
    }
    
    // Fallback to task's recommended tier
    return {
      model: getDefaultModelForTier(taskConfig.recommendedTier),
      reason: 'fallback',
    }
  } catch (error) {
    logger.error('Modelresolver', 'Error resolving model', { error: error })
    // Fallback to task's recommended tier
    return {
      model: getDefaultModelForTier(taskConfig.recommendedTier),
      reason: 'fallback',
    }
  }
}

/**
 * Get the model ID to use for a task (convenience function)
 * This is the simplest way to get a model ID for API calls
 */
export async function getModelForTask(
  userId: string | undefined,
  taskType: AITaskType
): Promise<string> {
  const { model } = await resolveModelForUser(userId, taskType)
  return model.id
}

/**
 * Get model info with pricing for display
 */
export function getModelDisplayInfo(modelId: string): {
  name: string
  tier: ModelTier
  description: string
  costPerRequest: string
  provider: string
} | null {
  const model = getModelById(modelId)
  if (!model) return null
  
  // Estimate cost for a typical request (500 input, 500 output tokens)
  const estimatedCost = (
    (500 / 1_000_000) * model.pricing.inputPerMillion +
    (500 / 1_000_000) * model.pricing.outputPerMillion
  ) * 100 // Convert to cents
  
  return {
    name: model.name,
    tier: model.tier,
    description: model.description,
    costPerRequest: `~${estimatedCost.toFixed(2)}¢`,
    provider: model.provider,
  }
}

/**
 * Compare costs between tiers for a typical request
 */
export function compareTierCosts(): {
  tier: ModelTier
  model: string
  estimatedCostCents: number
  description: string
}[] {
  const tiers: ModelTier[] = ['economy', 'standard', 'premium']
  
  return tiers.map(tier => {
    const model = getDefaultModelForTier(tier)
    // Typical request: 500 input, 500 output tokens
    const cost = (
      (500 / 1_000_000) * model.pricing.inputPerMillion +
      (500 / 1_000_000) * model.pricing.outputPerMillion
    ) * 100 // cents
    
    return {
      tier,
      model: model.name,
      estimatedCostCents: Math.ceil(cost * 100) / 100, // Round to 2 decimals
      description: model.description,
    }
  })
}

