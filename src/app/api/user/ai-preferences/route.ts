/**
 * User AI Preferences API
 * 
 * GET /api/user/ai-preferences - Get current AI preferences
 * PUT /api/user/ai-preferences - Update AI preferences
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { 
  getUserAIPreferences, 
  saveUserAIPreferences, 
  clearPreferencesCache,
  DEFAULT_AI_PREFERENCES,
  compareTierCosts,
  getModelsForSelection,
  isValidModel
} from '@/lib/ai/providers'
import type { ModelTier, UserAIPreferences } from '@/lib/ai/providers'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/user/ai-preferences
 * Returns the user's current AI preferences along with available options
 */
export async function GET(request: NextRequest) {
  try {
    apiLogger.routeCall('GET ai-preferences')
    
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Get user's current preferences
    const preferences = await getUserAIPreferences(userId)
    
    // Get available models for selection
    const availableModels = getModelsForSelection()
    
    // Get cost comparison
    const costComparison = compareTierCosts()
    
    apiLogger.success('GET ai-preferences', 'Retrieved preferences', { userId })
    
    return successResponse({
      preferences,
      availableModels,
      costComparison,
      defaults: DEFAULT_AI_PREFERENCES,
    })
  } catch (error) {
    apiLogger.apiError('GET ai-preferences', 'Failed to get preferences', error)
    return serverError(error, 'Failed to get AI preferences')
  }
}

/**
 * PUT /api/user/ai-preferences
 * Update the user's AI preferences
 */
export async function PUT(request: NextRequest) {
  try {
    apiLogger.routeCall('PUT ai-preferences')
    
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    const body = await request.json()
    
    // Validate the request body
    const updates: Partial<UserAIPreferences> = {}
    
    // Validate preferredTier
    if (body.preferredTier !== undefined) {
      const validTiers: ModelTier[] = ['economy', 'standard', 'premium']
      if (!validTiers.includes(body.preferredTier)) {
        return badRequestError(`Invalid tier: ${body.preferredTier}. Must be one of: ${validTiers.join(', ')}`)
      }
      updates.preferredTier = body.preferredTier
    }
    
    // Validate preferredModelId (optional)
    if (body.preferredModelId !== undefined) {
      if (body.preferredModelId !== null && !isValidModel(body.preferredModelId)) {
        return badRequestError(`Invalid model ID: ${body.preferredModelId}`)
      }
      updates.preferredModelId = body.preferredModelId || null
    }
    
    // Validate taskPreferences (optional)
    if (body.taskPreferences !== undefined) {
      const validTaskTypes = [
        'grading', 'explanation', 'generation', 'translation', 
        'chat', 'video-script', 'voice-processing', 'project-generation'
      ]
      const validTiers: ModelTier[] = ['economy', 'standard', 'premium']
      
      const taskPrefs: UserAIPreferences['taskPreferences'] = {}
      
      for (const [taskType, preference] of Object.entries(body.taskPreferences)) {
        if (!validTaskTypes.includes(taskType)) {
          return badRequestError(`Invalid task type: ${taskType}`)
        }
        
        // Preference can be a tier name or a specific model ID
        if (typeof preference === 'string') {
          if (validTiers.includes(preference as ModelTier)) {
            taskPrefs[taskType as keyof typeof taskPrefs] = preference as ModelTier
          } else if (isValidModel(preference)) {
            taskPrefs[taskType as keyof typeof taskPrefs] = preference
          } else {
            return badRequestError(`Invalid preference for ${taskType}: ${preference}`)
          }
        }
      }
      
      updates.taskPreferences = taskPrefs
    }
    
    // Save the updated preferences
    const updatedPreferences = await saveUserAIPreferences(userId, updates)
    
    apiLogger.success('PUT ai-preferences', 'Updated preferences', { 
      userId, 
      updates: Object.keys(updates) 
    })
    
    return successResponse({
      preferences: updatedPreferences,
      message: 'AI preferences updated successfully',
    })
  } catch (error) {
    apiLogger.apiError('PUT ai-preferences', 'Failed to update preferences', error)
    return serverError(error, 'Failed to update AI preferences')
  }
}

/**
 * DELETE /api/user/ai-preferences
 * Reset AI preferences to defaults
 */
export async function DELETE(request: NextRequest) {
  try {
    apiLogger.routeCall('DELETE ai-preferences')
    
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Reset to defaults
    const defaultPrefs = await saveUserAIPreferences(userId, {
      preferredTier: 'standard',
      preferredModelId: undefined,
      taskPreferences: undefined,
    })
    
    // Clear cache
    clearPreferencesCache(userId)
    
    apiLogger.success('DELETE ai-preferences', 'Reset preferences to defaults', { userId })
    
    return successResponse({
      preferences: defaultPrefs,
      message: 'AI preferences reset to defaults',
    })
  } catch (error) {
    apiLogger.apiError('DELETE ai-preferences', 'Failed to reset preferences', error)
    return serverError(error, 'Failed to reset AI preferences')
  }
}

