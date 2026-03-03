/**
 * AI Token Pricing Calculator
 * 
 * Calculates the cost of AI API calls based on token usage.
 * Applies a 10x markup to actual API costs.
 * 
 * Pricing is sourced from the AI model registry for consistency.
 * @see src/lib/ai/providers/registry.ts for model definitions
 */

import { CREDIT_CONSTANTS } from './types'
import { getModelById, MODELS } from '@/lib/ai/providers/registry'
import type { ModelPricing } from '@/lib/ai/providers/types'
import { logger } from '@/lib/logger'

/**
 * Build pricing map from model registry
 * This ensures pricing is always in sync with the model definitions
 */
function buildPricingMap(): Record<string, ModelPricing> {
  const pricingMap: Record<string, ModelPricing> = {}
  
  for (const model of MODELS) {
    pricingMap[model.id] = model.pricing
  }
  
  return pricingMap
}

/**
 * Cached pricing map (built once from registry)
 */
export const MODEL_PRICING: Record<string, ModelPricing> = buildPricingMap()

/**
 * Default pricing for unknown models (use Sonnet pricing as safe default)
 */
const DEFAULT_PRICING: ModelPricing = {
  inputPerMillion: 3.00,
  outputPerMillion: 15.00,
}

/**
 * Get pricing for a model, with fallback to default
 * First checks the model registry, then falls back to cached map
 */
export function getModelPricing(modelId: string): ModelPricing {
  // Try to get from registry first (most accurate)
  const model = getModelById(modelId)
  if (model) {
    return model.pricing
  }
  
  // Fall back to cached map (for backward compatibility)
  if (MODEL_PRICING[modelId]) {
    return MODEL_PRICING[modelId]
  }
  
  // Fall back to default pricing
  logger.warn('Pricing', `Unknown model: ${modelId}, using default pricing`)
  return DEFAULT_PRICING
}

/**
 * Calculate the raw API cost in USD (before markup)
 * Returns the cost in USD as a floating point number for precision
 */
export function calculateRawCostUsd(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = getModelPricing(model)
  
  // Calculate cost in USD
  const inputCostUsd = (inputTokens / 1_000_000) * pricing.inputPerMillion
  const outputCostUsd = (outputTokens / 1_000_000) * pricing.outputPerMillion
  
  return inputCostUsd + outputCostUsd
}

/**
 * Calculate the raw API cost in cents (before markup)
 * Note: This rounds up which can inflate small costs. Use calculateRawCostUsd for precision.
 */
export function calculateRawCostCents(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const totalCostUsd = calculateRawCostUsd(model, inputTokens, outputTokens)
  
  // Convert to cents and round up to nearest cent
  return Math.ceil(totalCostUsd * 100)
}

/**
 * Calculate the cost to charge the user in cents (with 10x markup)
 * 
 * IMPORTANT: We apply the markup to the USD amount FIRST, then convert to cents.
 * This prevents tiny costs from being inflated (e.g., 0.2 cents → 1 cent → 10 cents).
 */
export function calculateChargedCostCents(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const rawCostUsd = calculateRawCostUsd(model, inputTokens, outputTokens)
  
  // Apply markup to USD amount first, then convert to cents and round up
  const chargedCostUsd = rawCostUsd * CREDIT_CONSTANTS.COST_MULTIPLIER
  const chargedCents = Math.ceil(chargedCostUsd * 100)
  
  // Minimum charge of 1 cent to avoid free API calls
  return Math.max(1, chargedCents)
}

/**
 * Calculate both raw and charged costs
 * 
 * Raw cost is rounded to cents (for display/logging).
 * Charged cost applies markup to USD first, then rounds (for accurate billing).
 */
export function calculateCosts(
  model: string,
  inputTokens: number,
  outputTokens: number
): { rawCostCents: number; chargedCostCents: number } {
  const rawCostUsd = calculateRawCostUsd(model, inputTokens, outputTokens)
  
  // Raw cost in cents (rounded up for display)
  const rawCostCents = Math.ceil(rawCostUsd * 100)
  
  // Charged cost: apply markup to USD first, then convert to cents
  const chargedCostUsd = rawCostUsd * CREDIT_CONSTANTS.COST_MULTIPLIER
  const chargedCostCents = Math.max(1, Math.ceil(chargedCostUsd * 100))
  
  return { rawCostCents, chargedCostCents }
}

/**
 * Format cents as a dollar string for display
 */
export function formatCentsAsDollars(cents: number): string {
  const dollars = cents / 100
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Estimate cost for a given prompt length (rough estimate)
 * Assumes average of 4 characters per token
 */
export function estimateCostFromPromptLength(
  model: string,
  promptCharacters: number,
  estimatedOutputTokens: number = 500
): { estimatedCents: number; estimatedDollars: string } {
  const estimatedInputTokens = Math.ceil(promptCharacters / 4)
  const chargedCents = calculateChargedCostCents(model, estimatedInputTokens, estimatedOutputTokens)
  
  return {
    estimatedCents: chargedCents,
    estimatedDollars: formatCentsAsDollars(chargedCents),
  }
}

/**
 * Compare costs across all available models for a typical request
 * Useful for helping users understand cost differences
 */
export function getAllModelCosts(
  inputTokens: number = 500,
  outputTokens: number = 500
): Array<{
  modelId: string
  modelName: string
  tier: string
  rawCostCents: number
  chargedCostCents: number
}> {
  return MODELS
    .filter(m => m.available)
    .map(model => {
      const { rawCostCents, chargedCostCents } = calculateCosts(
        model.id,
        inputTokens,
        outputTokens
      )
      return {
        modelId: model.id,
        modelName: model.name,
        tier: model.tier,
        rawCostCents,
        chargedCostCents,
      }
    })
    .sort((a, b) => a.chargedCostCents - b.chargedCostCents)
}
