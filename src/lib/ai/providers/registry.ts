/**
 * AI Provider & Model Registry
 * 
 * Central registry of all supported providers and models.
 * 
 * TO ADD A NEW PROVIDER:
 * 1. Add provider config to PROVIDERS
 * 2. Add models to MODELS
 * 3. Create client wrapper in ./clients/{provider}.ts
 * 
 * TO ADD A NEW MODEL:
 * 1. Add model definition to MODELS array
 * 2. Ensure pricing is accurate (check provider's pricing page)
 */

import { AIModel, AIProvider, AIProviderConfig, AITaskConfig, AITaskType, ModelTier } from './types'

// =============================================================================
// PROVIDER CONFIGURATIONS
// =============================================================================

export const PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Creator of Claude, known for safety and helpfulness',
    apiBaseUrl: 'https://api.anthropic.com/v1',
    apiKeyEnvVar: 'ANTHROPIC_API_KEY',
    enabled: true,
    docsUrl: 'https://docs.anthropic.com/',
  },
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'Creator of GPT models and ChatGPT',
    apiBaseUrl: 'https://api.openai.com/v1',
    apiKeyEnvVar: 'OPENAI_API_KEY',
    enabled: false, // Enable when ready
    docsUrl: 'https://platform.openai.com/docs/',
  },
  google: {
    id: 'google',
    name: 'Google AI',
    description: 'Creator of Gemini models',
    apiBaseUrl: 'https://generativelanguage.googleapis.com/v1',
    apiKeyEnvVar: 'GOOGLE_AI_API_KEY',
    enabled: false,
    docsUrl: 'https://ai.google.dev/docs',
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'European AI lab known for efficient open models',
    apiBaseUrl: 'https://api.mistral.ai/v1',
    apiKeyEnvVar: 'MISTRAL_API_KEY',
    enabled: false,
    docsUrl: 'https://docs.mistral.ai/',
  },
  cohere: {
    id: 'cohere',
    name: 'Cohere',
    description: 'Enterprise AI focused on text understanding',
    apiBaseUrl: 'https://api.cohere.ai/v1',
    apiKeyEnvVar: 'COHERE_API_KEY',
    enabled: false,
    docsUrl: 'https://docs.cohere.com/',
  },
}

// =============================================================================
// MODEL DEFINITIONS
// =============================================================================

export const MODELS: AIModel[] = [
  // ---------------------------------------------------------------------------
  // ANTHROPIC MODELS
  // ---------------------------------------------------------------------------
  
  // Economy tier - Haiku
  // Claude 3.5 Haiku - Current most capable economy model
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    tier: 'economy',
    description: 'Fast and affordable. Great for grading, simple tasks, and high-volume operations.',
    capabilities: ['fast-response', 'structured-output'],
    pricing: {
      inputPerMillion: 0.80,
      outputPerMillion: 4.00,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 8192,
    defaultTemperature: 0.7,
    available: true,
    releaseDate: '2024-10-22',
  },
  // Claude 3 Haiku - Fallback economy model
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    tier: 'economy',
    description: 'Original Haiku. Fast and cost-effective.',
    capabilities: ['fast-response', 'structured-output'],
    pricing: {
      inputPerMillion: 0.25,
      outputPerMillion: 1.25,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 4096,
    defaultTemperature: 0.7,
    available: true,
    releaseDate: '2024-03-07',
  },

  // Standard tier - Sonnet
  // Claude 3.5 Sonnet v2 - Current best Sonnet model
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet v2',
    provider: 'anthropic',
    tier: 'standard',
    description: 'Best balance of intelligence and speed. Recommended for most tasks.',
    capabilities: ['reasoning', 'coding', 'creative', 'multilingual', 'long-context', 'structured-output'],
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 8192,
    defaultTemperature: 0.7,
    available: true,
    releaseDate: '2024-10-22',
  },
  // Claude 3.5 Sonnet v1 - Previous Sonnet version
  {
    id: 'claude-3-5-sonnet-20240620',
    name: 'Claude 3.5 Sonnet v1',
    provider: 'anthropic',
    tier: 'standard',
    description: 'Original 3.5 Sonnet. Highly capable model.',
    capabilities: ['reasoning', 'coding', 'creative', 'multilingual', 'long-context', 'structured-output'],
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 8192,
    defaultTemperature: 0.7,
    available: true,
    releaseDate: '2024-06-20',
  },

  // Premium tier - Opus
  // Claude 3 Opus - Current most capable model
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    tier: 'premium',
    description: 'Most capable model. Best for complex reasoning, analysis, and creative tasks.',
    capabilities: ['reasoning', 'coding', 'creative', 'multilingual', 'long-context', 'structured-output'],
    pricing: {
      inputPerMillion: 15.00,
      outputPerMillion: 75.00,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 4096,
    defaultTemperature: 0.7,
    available: true,
    releaseDate: '2024-02-29',
  },

  // ---------------------------------------------------------------------------
  // OPENAI MODELS (Ready for when enabled)
  // ---------------------------------------------------------------------------
  
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    tier: 'economy',
    description: 'Fast and affordable GPT-4 variant.',
    capabilities: ['fast-response', 'structured-output', 'vision'],
    pricing: {
      inputPerMillion: 0.15,
      outputPerMillion: 0.60,
    },
    maxContextTokens: 128000,
    maxOutputTokens: 16384,
    defaultTemperature: 0.7,
    available: false, // Not enabled yet
    releaseDate: '2024-07-18',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    tier: 'standard',
    description: 'OpenAI\'s flagship multimodal model.',
    capabilities: ['reasoning', 'coding', 'creative', 'multilingual', 'vision', 'structured-output'],
    pricing: {
      inputPerMillion: 2.50,
      outputPerMillion: 10.00,
    },
    maxContextTokens: 128000,
    maxOutputTokens: 16384,
    defaultTemperature: 0.7,
    available: false,
    releaseDate: '2024-05-13',
  },
  {
    id: 'o1',
    name: 'o1',
    provider: 'openai',
    tier: 'premium',
    description: 'OpenAI\'s reasoning model. Exceptional at complex problem-solving.',
    capabilities: ['reasoning', 'coding', 'structured-output'],
    pricing: {
      inputPerMillion: 15.00,
      outputPerMillion: 60.00,
    },
    maxContextTokens: 200000,
    maxOutputTokens: 100000,
    defaultTemperature: 1.0, // o1 requires temperature=1
    available: false,
    releaseDate: '2024-12-05',
  },
]

// =============================================================================
// TASK CONFIGURATIONS
// =============================================================================

export const TASK_CONFIGS: Record<AITaskType, AITaskConfig> = {
  grading: {
    taskType: 'grading',
    name: 'Grading',
    description: 'Grading student work and providing feedback',
    recommendedTier: 'economy',
    requiredCapabilities: ['structured-output'],
    defaultMaxTokens: 1000,
    defaultTemperature: 0.3,
  },
  explanation: {
    taskType: 'explanation',
    name: 'Explanations',
    description: 'Explaining concepts and providing tutoring',
    recommendedTier: 'standard',
    requiredCapabilities: ['reasoning'],
    defaultMaxTokens: 500,
    defaultTemperature: 0.7,
  },
  generation: {
    taskType: 'generation',
    name: 'Content Generation',
    description: 'Generating problems, exercises, and content',
    recommendedTier: 'standard',
    requiredCapabilities: ['reasoning', 'creative'],
    defaultMaxTokens: 2000,
    defaultTemperature: 0.8,
  },
  translation: {
    taskType: 'translation',
    name: 'Translation',
    description: 'Checking and scoring translations',
    recommendedTier: 'economy',
    requiredCapabilities: ['multilingual', 'structured-output'],
    defaultMaxTokens: 1000,
    defaultTemperature: 0.3,
  },
  chat: {
    taskType: 'chat',
    name: 'Chat Assistant',
    description: 'Interactive chat and Q&A',
    recommendedTier: 'standard',
    requiredCapabilities: ['reasoning'],
    defaultMaxTokens: 1024,
    defaultTemperature: 0.7,
  },
  'video-script': {
    taskType: 'video-script',
    name: 'Video Scripts',
    description: 'Generating scripts for educational videos',
    recommendedTier: 'standard',
    requiredCapabilities: ['creative'],
    defaultMaxTokens: 1024,
    defaultTemperature: 0.7,
  },
  'voice-processing': {
    taskType: 'voice-processing',
    name: 'Voice Processing',
    description: 'Analyzing and processing voice recordings',
    recommendedTier: 'standard',
    requiredCapabilities: ['reasoning', 'structured-output'],
    defaultMaxTokens: 2000,
    defaultTemperature: 0.5,
  },
  'project-generation': {
    taskType: 'project-generation',
    name: 'Project Generation',
    description: 'Generating project ideas and plans',
    recommendedTier: 'standard',
    requiredCapabilities: ['reasoning', 'creative'],
    defaultMaxTokens: 2000,
    defaultTemperature: 0.8,
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all enabled providers
 */
export function getEnabledProviders(): AIProviderConfig[] {
  return Object.values(PROVIDERS).filter(p => p.enabled)
}

/**
 * Get all available models
 */
export function getAvailableModels(): AIModel[] {
  return MODELS.filter(m => m.available && PROVIDERS[m.provider].enabled)
}

/**
 * Get models by tier
 */
export function getModelsByTier(tier: ModelTier): AIModel[] {
  return getAvailableModels().filter(m => m.tier === tier)
}

/**
 * Get models by provider
 */
export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return getAvailableModels().filter(m => m.provider === provider)
}

/**
 * Get a specific model by ID
 */
export function getModelById(modelId: string): AIModel | undefined {
  return MODELS.find(m => m.id === modelId)
}

/**
 * Get the default model for a tier
 */
export function getDefaultModelForTier(tier: ModelTier): AIModel {
  const models = getModelsByTier(tier)
  if (models.length === 0) {
    // Fallback to first available model
    const available = getAvailableModels()
    if (available.length === 0) {
      throw new Error('No AI models available')
    }
    return available[0]
  }
  // Return the most recent model in the tier
  return models.sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  )[0]
}

/**
 * Get the recommended model for a task type
 */
export function getRecommendedModelForTask(taskType: AITaskType): AIModel {
  const taskConfig = TASK_CONFIGS[taskType]
  return getDefaultModelForTier(taskConfig.recommendedTier)
}

/**
 * Get task configuration
 */
export function getTaskConfig(taskType: AITaskType): AITaskConfig {
  return TASK_CONFIGS[taskType]
}

/**
 * Calculate estimated cost for tokens
 */
export function estimateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): { rawCostCents: number; formattedCost: string } {
  const model = getModelById(modelId)
  if (!model) {
    return { rawCostCents: 0, formattedCost: '$0.00' }
  }
  
  const inputCost = (inputTokens / 1_000_000) * model.pricing.inputPerMillion
  const outputCost = (outputTokens / 1_000_000) * model.pricing.outputPerMillion
  const totalCostUsd = inputCost + outputCost
  const rawCostCents = Math.ceil(totalCostUsd * 100)
  
  return {
    rawCostCents,
    formattedCost: totalCostUsd.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
    }),
  }
}

/**
 * Get tier display info
 */
export function getTierDisplayInfo(tier: ModelTier): {
  name: string
  description: string
  icon: string
  color: string
} {
  const info = {
    economy: {
      name: 'Economy',
      description: 'Fast & affordable for simple tasks',
      icon: '⚡',
      color: 'green',
    },
    standard: {
      name: 'Standard',
      description: 'Balanced quality and cost',
      icon: '✨',
      color: 'blue',
    },
    premium: {
      name: 'Premium',
      description: 'Best quality for complex tasks',
      icon: '👑',
      color: 'purple',
    },
  }
  return info[tier]
}

/**
 * Validate that a model ID is valid and available
 */
export function isValidModel(modelId: string): boolean {
  const model = getModelById(modelId)
  return model !== undefined && model.available && PROVIDERS[model.provider].enabled
}

/**
 * Get available models for user selection
 * Returns models grouped by tier with display info
 */
export function getModelsForSelection(): {
  tier: ModelTier
  tierInfo: { name: string; description: string; icon: string }
  models: Array<{
    id: string
    name: string
    description: string
    pricing: string
    isRecommended: boolean
  }>
}[] {
  const tiers: ModelTier[] = ['economy', 'standard', 'premium']
  const tierInfo = {
    economy: { name: 'Economy', description: 'Fast & affordable', icon: '⚡' },
    standard: { name: 'Standard', description: 'Balanced quality', icon: '✨' },
    premium: { name: 'Premium', description: 'Best quality', icon: '👑' },
  }
  
  return tiers.map(tier => {
    const models = getAvailableModels().filter(m => m.tier === tier)
    const defaultModel = getDefaultModelForTier(tier)
    
    return {
      tier,
      tierInfo: tierInfo[tier],
      models: models.map(m => ({
        id: m.id,
        name: m.name,
        description: m.description,
        pricing: `$${m.pricing.inputPerMillion}/$${m.pricing.outputPerMillion} per 1M tokens`,
        isRecommended: m.id === defaultModel.id,
      })),
    }
  })
}

