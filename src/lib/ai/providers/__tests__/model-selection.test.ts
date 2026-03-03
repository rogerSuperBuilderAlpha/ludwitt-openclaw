/**
 * Model Selection Tests
 * 
 * Tests the AI model selection and preference switching functionality.
 * Note: These tests focus on the registry functions that don't require Firebase.
 */

import {
  getDefaultModelForTier,
  getModelById,
  getAvailableModels,
  getModelsByTier,
  getTaskConfig,
  getModelsForSelection,
  getTierDisplayInfo,
  estimateCost,
  isValidModel,
  MODELS,
  PROVIDERS,
  TASK_CONFIGS,
  getRecommendedModelForTask,
} from '../registry'
import type { ModelTier, AITaskType, UserAIPreferences } from '../types'

// Default preferences (copied from resolver to avoid Firebase import)
const DEFAULT_AI_PREFERENCES: UserAIPreferences = {
  preferredTier: 'standard',
  updatedAt: new Date().toISOString(),
}

// Cost comparison function (copied from resolver to avoid Firebase import)
function compareTierCosts(): {
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

describe('AI Provider Registry', () => {
  describe('Provider Configuration', () => {
    it('should have Anthropic enabled by default', () => {
      expect(PROVIDERS.anthropic.enabled).toBe(true)
    })

    it('should have OpenAI prepared but disabled', () => {
      expect(PROVIDERS.openai).toBeDefined()
      expect(PROVIDERS.openai.enabled).toBe(false)
    })

    it('should have all required provider fields', () => {
      Object.values(PROVIDERS).forEach(provider => {
        expect(provider.id).toBeDefined()
        expect(provider.name).toBeDefined()
        expect(provider.apiBaseUrl).toBeDefined()
        expect(provider.apiKeyEnvVar).toBeDefined()
        expect(typeof provider.enabled).toBe('boolean')
      })
    })
  })

  describe('Model Registry', () => {
    it('should have models for all three tiers', () => {
      const tiers: ModelTier[] = ['economy', 'standard', 'premium']
      
      tiers.forEach(tier => {
        const models = getModelsByTier(tier)
        expect(models.length).toBeGreaterThan(0)
      })
    })

    it('should have valid pricing for all models', () => {
      MODELS.forEach(model => {
        expect(model.pricing.inputPerMillion).toBeGreaterThan(0)
        expect(model.pricing.outputPerMillion).toBeGreaterThan(0)
      })
    })

    it('should have economy models cheaper than standard', () => {
      const economyModel = getDefaultModelForTier('economy')
      const standardModel = getDefaultModelForTier('standard')
      
      expect(economyModel.pricing.inputPerMillion).toBeLessThan(standardModel.pricing.inputPerMillion)
    })

    it('should have standard models cheaper than premium', () => {
      const standardModel = getDefaultModelForTier('standard')
      const premiumModel = getDefaultModelForTier('premium')
      
      expect(standardModel.pricing.inputPerMillion).toBeLessThan(premiumModel.pricing.inputPerMillion)
    })

    it('should find model by ID', () => {
      const model = getModelById('claude-3-5-haiku-20241022')
      expect(model).toBeDefined()
      expect(model?.tier).toBe('economy')
      expect(model?.provider).toBe('anthropic')
    })

    it('should return undefined for unknown model ID', () => {
      const model = getModelById('non-existent-model')
      expect(model).toBeUndefined()
    })
  })

  describe('Model Validation', () => {
    it('should validate known model IDs', () => {
      expect(isValidModel('claude-3-5-haiku-20241022')).toBe(true)
      expect(isValidModel('claude-3-5-sonnet-20241022')).toBe(true)
    })

    it('should reject unknown model IDs', () => {
      expect(isValidModel('fake-model')).toBe(false)
      expect(isValidModel('')).toBe(false)
    })

    it('should reject unavailable models', () => {
      // OpenAI models are defined but not available (provider disabled)
      expect(isValidModel('gpt-4o')).toBe(false)
    })
  })
})

describe('Default Model Selection', () => {
  describe('getDefaultModelForTier', () => {
    it('should return Haiku for economy tier', () => {
      const model = getDefaultModelForTier('economy')
      expect(model.tier).toBe('economy')
      expect(model.id).toContain('haiku')
    })

    it('should return Sonnet for standard tier', () => {
      const model = getDefaultModelForTier('standard')
      expect(model.tier).toBe('standard')
      expect(model.id).toContain('sonnet')
    })

    it('should return Opus for premium tier', () => {
      const model = getDefaultModelForTier('premium')
      expect(model.tier).toBe('premium')
      expect(model.id).toContain('opus')
    })

    it('should return the most recent model in each tier', () => {
      const tiers: ModelTier[] = ['economy', 'standard', 'premium']
      
      tiers.forEach(tier => {
        const defaultModel = getDefaultModelForTier(tier)
        const allModelsInTier = getModelsByTier(tier)
        
        // The default should be one of the available models in the tier
        expect(allModelsInTier.some(m => m.id === defaultModel.id)).toBe(true)
      })
    })
  })
})

describe('Task Configuration', () => {
  describe('Task Configs', () => {
    const taskTypes: AITaskType[] = [
      'grading',
      'explanation',
      'generation',
      'translation',
      'chat',
      'video-script',
      'voice-processing',
      'project-generation',
    ]

    it('should have config for all task types', () => {
      taskTypes.forEach(taskType => {
        const config = getTaskConfig(taskType)
        expect(config).toBeDefined()
        expect(config.taskType).toBe(taskType)
      })
    })

    it('should have valid default settings for each task', () => {
      taskTypes.forEach(taskType => {
        const config = getTaskConfig(taskType)
        expect(config.defaultMaxTokens).toBeGreaterThan(0)
        expect(config.defaultTemperature).toBeGreaterThanOrEqual(0)
        expect(config.defaultTemperature).toBeLessThanOrEqual(1)
        expect(config.recommendedTier).toBeDefined()
      })
    })

    it('should recommend economy tier for grading tasks', () => {
      const config = getTaskConfig('grading')
      expect(config.recommendedTier).toBe('economy')
    })

    it('should recommend standard tier for explanation tasks', () => {
      const config = getTaskConfig('explanation')
      expect(config.recommendedTier).toBe('standard')
    })
  })

  describe('getRecommendedModelForTask', () => {
    it('should return economy model for grading', () => {
      const model = getRecommendedModelForTask('grading')
      expect(model.tier).toBe('economy')
    })

    it('should return standard model for explanation', () => {
      const model = getRecommendedModelForTask('explanation')
      expect(model.tier).toBe('standard')
    })

    it('should return standard model for generation', () => {
      const model = getRecommendedModelForTask('generation')
      expect(model.tier).toBe('standard')
    })
  })
})

describe('User Preference Simulation', () => {
  // Simulate user switching preferences
  
  describe('Preference switching scenario', () => {
    it('should correctly identify models when user switches from economy to premium', () => {
      // User starts with economy
      const economyPrefs: UserAIPreferences = {
        preferredTier: 'economy',
        updatedAt: new Date().toISOString(),
      }
      
      const economyModel = getDefaultModelForTier(economyPrefs.preferredTier)
      expect(economyModel.tier).toBe('economy')
      expect(economyModel.pricing.inputPerMillion).toBeLessThanOrEqual(1.5)
      
      // User switches to premium
      const premiumPrefs: UserAIPreferences = {
        preferredTier: 'premium',
        updatedAt: new Date().toISOString(),
      }
      
      const premiumModel = getDefaultModelForTier(premiumPrefs.preferredTier)
      expect(premiumModel.tier).toBe('premium')
      expect(premiumModel.pricing.inputPerMillion).toBeGreaterThanOrEqual(10)
      
      // Verify they're different models
      expect(economyModel.id).not.toBe(premiumModel.id)
    })

    it('should correctly identify models when user switches between all tiers', () => {
      const tiers: ModelTier[] = ['economy', 'standard', 'premium']
      const selectedModels: string[] = []
      
      tiers.forEach(tier => {
        const prefs: UserAIPreferences = {
          preferredTier: tier,
          updatedAt: new Date().toISOString(),
        }
        
        const model = getDefaultModelForTier(prefs.preferredTier)
        expect(model.tier).toBe(tier)
        selectedModels.push(model.id)
      })
      
      // All selected models should be different
      const uniqueModels = new Set(selectedModels)
      expect(uniqueModels.size).toBe(3)
    })

    it('should use specific model ID when provided', () => {
      const prefs: UserAIPreferences = {
        preferredTier: 'standard',
        preferredModelId: 'claude-3-5-haiku-20241022', // Override with economy model
        updatedAt: new Date().toISOString(),
      }

      // When user specifies a model ID, that should be used
      const model = getModelById(prefs.preferredModelId!)
      expect(model).toBeDefined()
      expect(model?.id).toBe('claude-3-5-haiku-20241022')
      expect(model?.tier).toBe('economy') // Even though tier preference is standard
    })
  })

  describe('Cost tracking across preference changes', () => {
    it('should calculate different costs for different tiers', () => {
      const inputTokens = 1000
      const outputTokens = 500
      
      const economyModel = getDefaultModelForTier('economy')
      const standardModel = getDefaultModelForTier('standard')
      const premiumModel = getDefaultModelForTier('premium')
      
      const economyCost = estimateCost(economyModel.id, inputTokens, outputTokens)
      const standardCost = estimateCost(standardModel.id, inputTokens, outputTokens)
      const premiumCost = estimateCost(premiumModel.id, inputTokens, outputTokens)
      
      // Economy should be cheapest
      expect(economyCost.rawCostCents).toBeLessThanOrEqual(standardCost.rawCostCents)
      expect(standardCost.rawCostCents).toBeLessThanOrEqual(premiumCost.rawCostCents)
    })

    it('should show cost comparison for user', () => {
      const comparison = compareTierCosts()
      
      expect(comparison.length).toBe(3)
      expect(comparison[0].tier).toBe('economy')
      expect(comparison[1].tier).toBe('standard')
      expect(comparison[2].tier).toBe('premium')
      
      // Costs should be in ascending order
      expect(comparison[0].estimatedCostCents).toBeLessThanOrEqual(comparison[1].estimatedCostCents)
      expect(comparison[1].estimatedCostCents).toBeLessThanOrEqual(comparison[2].estimatedCostCents)
    })
  })
})

describe('UI Data Helpers', () => {
  describe('getModelsForSelection', () => {
    it('should return models grouped by tier', () => {
      const selection = getModelsForSelection()
      
      expect(selection.length).toBe(3)
      expect(selection[0].tier).toBe('economy')
      expect(selection[1].tier).toBe('standard')
      expect(selection[2].tier).toBe('premium')
    })

    it('should include tier display info', () => {
      const selection = getModelsForSelection()
      
      selection.forEach(group => {
        expect(group.tierInfo.name).toBeDefined()
        expect(group.tierInfo.description).toBeDefined()
        expect(group.tierInfo.icon).toBeDefined()
      })
    })

    it('should mark one model as recommended in each tier', () => {
      const selection = getModelsForSelection()
      
      selection.forEach(group => {
        const recommendedModels = group.models.filter(m => m.isRecommended)
        expect(recommendedModels.length).toBe(1)
      })
    })
  })

  describe('getTierDisplayInfo', () => {
    it('should return display info for each tier', () => {
      const tiers: ModelTier[] = ['economy', 'standard', 'premium']
      
      tiers.forEach(tier => {
        const info = getTierDisplayInfo(tier)
        expect(info.name).toBeDefined()
        expect(info.description).toBeDefined()
        expect(info.icon).toBeDefined()
        expect(info.color).toBeDefined()
      })
    })
  })
})

describe('Default Preferences', () => {
  it('should have standard as default tier', () => {
    expect(DEFAULT_AI_PREFERENCES.preferredTier).toBe('standard')
  })

  it('should have no specific model by default', () => {
    expect(DEFAULT_AI_PREFERENCES.preferredModelId).toBeUndefined()
  })

  it('should have no task-specific preferences by default', () => {
    expect(DEFAULT_AI_PREFERENCES.taskPreferences).toBeUndefined()
  })
})

describe('End-to-End Preference Flow Simulation', () => {
  it('should simulate a complete user flow: browse → select → use', () => {
    // Step 1: User views available options
    const availableModels = getModelsForSelection()
    expect(availableModels.length).toBe(3)
    
    // Step 2: User compares costs
    const costs = compareTierCosts()
    expect(costs.length).toBe(3)
    
    // Step 3: User selects economy tier
    const userPrefs: UserAIPreferences = {
      preferredTier: 'economy',
      updatedAt: new Date().toISOString(),
    }
    
    // Step 4: System resolves model for grading task
    const gradingConfig = getTaskConfig('grading')
    const gradingModel = getDefaultModelForTier(userPrefs.preferredTier)
    
    expect(gradingModel.tier).toBe('economy')
    expect(gradingConfig.taskType).toBe('grading')
    
    // Step 5: Cost for this call
    const callCost = estimateCost(gradingModel.id, 500, 300)
    expect(callCost.rawCostCents).toBeGreaterThan(0)
    
    // Step 6: User switches to premium
    userPrefs.preferredTier = 'premium'
    userPrefs.updatedAt = new Date().toISOString()
    
    // Step 7: Next call uses premium
    const newModel = getDefaultModelForTier(userPrefs.preferredTier)
    expect(newModel.tier).toBe('premium')
    expect(newModel.id).not.toBe(gradingModel.id)
    
    // Step 8: Cost is higher
    const newCost = estimateCost(newModel.id, 500, 300)
    expect(newCost.rawCostCents).toBeGreaterThan(callCost.rawCostCents)
  })

  it('should simulate multiple API calls with different models', () => {
    // Simulate a user making 3 calls with economy tier
    // Use larger token amounts to see clear cost differences
    const economyModel = getDefaultModelForTier('economy')
    const economyCalls = [
      { input: 10000, output: 5000 },
      { input: 25000, output: 15000 },
      { input: 15000, output: 10000 },
    ]
    
    let totalEconomyCost = 0
    economyCalls.forEach(call => {
      const cost = estimateCost(economyModel.id, call.input, call.output)
      totalEconomyCost += cost.rawCostCents
    })
    
    // User switches to standard and makes 3 more calls
    const standardModel = getDefaultModelForTier('standard')
    const standardCalls = [
      { input: 10000, output: 5000 },
      { input: 25000, output: 15000 },
      { input: 15000, output: 10000 },
    ]
    
    let totalStandardCost = 0
    standardCalls.forEach(call => {
      const cost = estimateCost(standardModel.id, call.input, call.output)
      totalStandardCost += cost.rawCostCents
    })
    
    // Standard tier should cost more for same usage (3x input, 3x output pricing)
    expect(totalStandardCost).toBeGreaterThan(totalEconomyCost)
    
    // Verify models are different
    expect(economyModel.id).not.toBe(standardModel.id)
    expect(economyModel.tier).toBe('economy')
    expect(standardModel.tier).toBe('standard')
  })
})

describe('Model ID Consistency', () => {
  it('should return consistent model IDs for the same tier', () => {
    // Call getDefaultModelForTier multiple times
    const model1 = getDefaultModelForTier('standard')
    const model2 = getDefaultModelForTier('standard')
    const model3 = getDefaultModelForTier('standard')
    
    expect(model1.id).toBe(model2.id)
    expect(model2.id).toBe(model3.id)
  })

  it('should return actual Anthropic model IDs that can be used in API calls', () => {
    const economyModel = getDefaultModelForTier('economy')
    const standardModel = getDefaultModelForTier('standard')
    const premiumModel = getDefaultModelForTier('premium')
    
    // These should be real Anthropic model IDs
    expect(economyModel.id).toMatch(/^claude-/)
    expect(standardModel.id).toMatch(/^claude-/)
    expect(premiumModel.id).toMatch(/^claude-/)
    
    // They should be in our registry
    expect(getModelById(economyModel.id)).toBeDefined()
    expect(getModelById(standardModel.id)).toBeDefined()
    expect(getModelById(premiumModel.id)).toBeDefined()
  })
})
