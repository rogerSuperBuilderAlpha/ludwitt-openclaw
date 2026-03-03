/**
 * AI Providers Module
 * 
 * Centralized AI provider and model management.
 * 
 * ⚠️  SERVER-ONLY: This module exports functions that use Firebase Admin SDK.
 *    For client-side code, import directly from './providers/registry' instead.
 * 
 * Usage (server-side only):
 * ```typescript
 * import { resolveModelForUser, getAvailableModels, MODELS } from '@/lib/ai/providers'
 * 
 * // Get the model to use for a specific user and task
 * const { model, reason } = await resolveModelForUser(userId, 'grading')
 * 
 * // Use the model ID in API calls
 * const response = await anthropic.messages.create({
 *   model: model.id,
 *   // ...
 * })
 * ```
 * 
 * For client-side code:
 * ```typescript
 * import { getDefaultModelForTier, getTaskConfig } from '@/lib/ai/providers/registry'
 * ```
 */

// Export types
export * from './types'

// Export registry (safe for client-side)
export * from './registry'

// Export resolver (SERVER-ONLY - uses Firebase Admin)
export * from './resolver'

// Export anthropic client with resilient model selection (SERVER-ONLY)
export * from './anthropic-client'

