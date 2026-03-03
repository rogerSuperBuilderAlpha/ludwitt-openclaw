/**
 * AI Provider & Model Types
 * 
 * Extensible architecture for supporting multiple AI providers and models.
 * To add a new provider or model, update the registry in ./registry.ts
 */

/**
 * Supported AI providers
 * Add new providers here as they're integrated
 */
export type AIProvider = 'anthropic' | 'openai' | 'google' | 'mistral' | 'cohere'

/**
 * Model capability tiers for user selection
 */
export type ModelTier = 'economy' | 'standard' | 'premium'

/**
 * Model capability categories
 */
export type ModelCapability = 
  | 'fast-response'      // Quick responses, good for grading
  | 'reasoning'          // Complex reasoning tasks
  | 'coding'             // Code generation/analysis
  | 'creative'           // Creative writing
  | 'multilingual'       // Strong multilingual support
  | 'long-context'       // Large context window
  | 'vision'             // Image understanding
  | 'structured-output'  // JSON/structured responses

/**
 * Pricing per million tokens in USD
 */
export interface ModelPricing {
  /** Cost per 1M input tokens in USD */
  inputPerMillion: number
  /** Cost per 1M output tokens in USD */
  outputPerMillion: number
  /** Optional: cost per image (for vision models) */
  perImage?: number
}

/**
 * Model definition - all the info needed to use and display a model
 */
export interface AIModel {
  /** Unique identifier (used in API calls) */
  id: string
  /** Display name for UI */
  name: string
  /** Provider this model belongs to */
  provider: AIProvider
  /** User-facing tier classification */
  tier: ModelTier
  /** Brief description of the model */
  description: string
  /** Model capabilities */
  capabilities: ModelCapability[]
  /** Pricing information */
  pricing: ModelPricing
  /** Maximum context window in tokens */
  maxContextTokens: number
  /** Maximum output tokens */
  maxOutputTokens: number
  /** Default temperature for this model */
  defaultTemperature: number
  /** Whether this model is currently available */
  available: boolean
  /** Release date (for sorting/display) */
  releaseDate: string
  /** Deprecation date if applicable */
  deprecatedAt?: string
  /** Recommended replacement model if deprecated */
  replacementModelId?: string
}

/**
 * Provider configuration
 */
export interface AIProviderConfig {
  /** Provider identifier */
  id: AIProvider
  /** Display name */
  name: string
  /** Provider description */
  description: string
  /** API base URL */
  apiBaseUrl: string
  /** Environment variable name for API key */
  apiKeyEnvVar: string
  /** Whether provider is enabled */
  enabled: boolean
  /** Documentation URL */
  docsUrl: string
}

/**
 * User's AI preferences stored in Firestore
 */
export interface UserAIPreferences {
  /** Preferred model tier for general use */
  preferredTier: ModelTier
  /** Specific model override (optional - if user wants a specific model) */
  preferredModelId?: string
  /** Per-task model preferences (optional) */
  taskPreferences?: {
    grading?: ModelTier | string
    explanation?: ModelTier | string
    generation?: ModelTier | string
    chat?: ModelTier | string
  }
  /** Last updated timestamp */
  updatedAt: string
}

/**
 * Task types that can have model preferences
 */
export type AITaskType = 
  | 'grading'           // Grading student work
  | 'explanation'       // Explaining concepts
  | 'generation'        // Generating problems/content
  | 'translation'       // Translation checking
  | 'chat'              // Chat/assistant
  | 'video-script'      // Video script generation
  | 'voice-processing'  // Voice note processing
  | 'project-generation'// Project idea generation

/**
 * Configuration for an AI task
 */
export interface AITaskConfig {
  /** Task identifier */
  taskType: AITaskType
  /** Display name */
  name: string
  /** Description of what this task does */
  description: string
  /** Recommended tier for this task */
  recommendedTier: ModelTier
  /** Minimum required capabilities */
  requiredCapabilities: ModelCapability[]
  /** Default max tokens for this task */
  defaultMaxTokens: number
  /** Default temperature for this task */
  defaultTemperature: number
}

/**
 * Result of resolving which model to use for a request
 */
export interface ResolvedModel {
  model: AIModel
  reason: 'user-preference' | 'task-default' | 'fallback'
}

/**
 * API usage tracking info
 */
export interface AIUsage {
  inputTokens: number
  outputTokens: number
  model: string
  provider: AIProvider
}

