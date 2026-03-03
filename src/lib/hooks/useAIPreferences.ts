/**
 * Hook for managing user AI preferences
 * 
 * Provides client-side access to AI preference management
 */

import { useState, useEffect, useCallback } from 'react'
import { useApiFetch } from './useApiFetch'

// Types (matching server-side types)
export type ModelTier = 'economy' | 'standard' | 'premium'

export interface UserAIPreferences {
  preferredTier: ModelTier
  preferredModelId?: string
  taskPreferences?: {
    grading?: ModelTier | string
    explanation?: ModelTier | string
    generation?: ModelTier | string
    translation?: ModelTier | string
    chat?: ModelTier | string
    'video-script'?: ModelTier | string
    'voice-processing'?: ModelTier | string
    'project-generation'?: ModelTier | string
  }
  updatedAt: string
}

export interface ModelOption {
  id: string
  name: string
  description: string
  pricing: string
  isRecommended: boolean
}

export interface TierGroup {
  tier: ModelTier
  tierInfo: {
    name: string
    description: string
    icon: string
  }
  models: ModelOption[]
}

export interface CostComparison {
  tier: ModelTier
  model: string
  estimatedCostCents: number
  description: string
}

export interface AIPreferencesData {
  preferences: UserAIPreferences
  availableModels: TierGroup[]
  costComparison: CostComparison[]
  defaults: UserAIPreferences
}

export function useAIPreferences() {
  const fetchApi = useApiFetch()
  
  const [data, setData] = useState<AIPreferencesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Fetch preferences
  const fetchPreferences = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // fetchApi returns unwrapped data (already extracted from response.data)
      const data = await fetchApi<AIPreferencesData>('/api/user/ai-preferences')
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch preferences')
    } finally {
      setLoading(false)
    }
  }, [fetchApi])

  // Update preferences
  const updatePreferences = useCallback(async (
    updates: Partial<UserAIPreferences>
  ): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      // fetchApi returns unwrapped data
      const result = await fetchApi<{ preferences: UserAIPreferences; message: string }>('/api/user/ai-preferences', {
        method: 'PUT',
        body: JSON.stringify(updates),
      })
      
      if (result.preferences) {
        setData(prev => prev ? { ...prev, preferences: result.preferences } : null)
        return true
      }
      return false
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences')
      return false
    } finally {
      setSaving(false)
    }
  }, [fetchApi])

  // Reset to defaults
  const resetToDefaults = useCallback(async (): Promise<boolean> => {
    try {
      setSaving(true)
      setError(null)
      
      // fetchApi returns unwrapped data
      const result = await fetchApi<{ preferences: UserAIPreferences; message: string }>('/api/user/ai-preferences', {
        method: 'DELETE',
      })
      
      if (result.preferences) {
        setData(prev => prev ? { ...prev, preferences: result.preferences } : null)
        return true
      }
      return false
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset preferences')
      return false
    } finally {
      setSaving(false)
    }
  }, [fetchApi])

  // Set tier preference
  const setPreferredTier = useCallback(async (tier: ModelTier): Promise<boolean> => {
    return updatePreferences({ preferredTier: tier })
  }, [updatePreferences])

  // Set specific model preference
  const setPreferredModel = useCallback(async (modelId: string | undefined): Promise<boolean> => {
    return updatePreferences({ preferredModelId: modelId })
  }, [updatePreferences])

  // Load preferences on mount
  useEffect(() => {
    fetchPreferences()
  }, [fetchPreferences])

  return {
    // Data
    preferences: data?.preferences || null,
    availableModels: data?.availableModels || [],
    costComparison: data?.costComparison || [],
    defaults: data?.defaults || null,
    
    // State
    loading,
    error,
    saving,
    
    // Actions
    fetchPreferences,
    updatePreferences,
    resetToDefaults,
    setPreferredTier,
    setPreferredModel,
  }
}

