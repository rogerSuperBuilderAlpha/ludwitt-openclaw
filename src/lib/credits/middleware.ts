/**
 * Credit Tracking Middleware
 *
 * Wrapper for AI API calls that handles:
 * 1. Balance verification before the call
 * 2. Cost calculation after the call (token-based, never fixed cost)
 * 3. Credit deduction and transaction logging
 *
 * IMPORTANT: Credits are always charged based on actual token usage from
 * the LLM response. Never use fixed credit costs. Use withCreditTracking()
 * for non-streaming and checkCreditsBeforeCall()/trackCreditsAfterCall()
 * for streaming responses. See pricing.ts for cost calculation details.
 */

import { NextResponse } from 'next/server'
import { checkBalance, deductCredits } from './balance'
import { calculateCosts, formatCentsAsDollars } from './pricing'
import { AnthropicUsage, CreditTrackedResult, CREDIT_CONSTANTS } from './types'
import { apiLogger } from '@/lib/logger'

/**
 * Error response for insufficient credits
 */
export function insufficientCreditsError(
  currentBalance: number,
  minimumBalance: number
): NextResponse {
  const currentDollars = formatCentsAsDollars(currentBalance)
  const limitDollars = formatCentsAsDollars(Math.abs(minimumBalance))

  return NextResponse.json(
    {
      success: false,
      error: 'Insufficient credits',
      code: 'INSUFFICIENT_CREDITS',
      details: {
        currentBalance: currentBalance,
        currentBalanceFormatted: currentDollars,
        debtLimit: minimumBalance,
        debtLimitFormatted: limitDollars,
        message: `Your balance (${currentDollars}) has reached the $${limitDollars} debt limit. Please add funds to continue using AI features.`,
      },
    },
    { status: 402 }
  ) // 402 Payment Required
}

/**
 * Result type for AI calls that return usage info
 */
export interface AICallResult<T> {
  response: T
  usage: AnthropicUsage
  model: string
}

/**
 * Execute an AI call with credit tracking
 *
 * @param userId - The user making the request
 * @param endpoint - Name of the endpoint (for logging)
 * @param aiCall - Function that executes the AI call and returns response + usage
 * @returns The AI response with cost information, or an error response
 */
export async function withCreditTracking<T>(
  userId: string,
  endpoint: string,
  aiCall: () => Promise<AICallResult<T>>
): Promise<CreditTrackedResult<T> | NextResponse> {
  // Step 1: Check if user has sufficient balance
  const balanceCheck = await checkBalance(userId)

  if (!balanceCheck.allowed) {
    apiLogger.apiError(endpoint, 'Insufficient credits', {
      userId,
      currentBalance: balanceCheck.currentBalance,
      minimumBalance: balanceCheck.minimumBalance,
    })
    return insufficientCreditsError(
      balanceCheck.currentBalance,
      balanceCheck.minimumBalance
    )
  }

  // Step 2: Execute the AI call
  const { response, usage, model } = await aiCall()

  // Step 3: Calculate costs
  const { rawCostCents, chargedCostCents } = calculateCosts(
    model,
    usage.input_tokens,
    usage.output_tokens
  )

  // Step 4: Deduct credits and log transaction
  let newBalance: number
  try {
    const deductResult = await deductCredits(userId, chargedCostCents, {
      endpoint,
      model,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      rawCostCents,
      chargedCostCents,
    })
    newBalance = deductResult.newBalance
  } catch (error) {
    if (error instanceof Error && error.message === 'INSUFFICIENT_CREDITS') {
      const credits = await checkBalance(userId)
      return insufficientCreditsError(
        credits.currentBalance,
        credits.minimumBalance
      )
    }
    throw error
  }

  apiLogger.success(endpoint, 'AI call completed with credit deduction', {
    data: {
      userId,
      model,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      rawCostCents,
      chargedCostCents,
      newBalance,
    },
  })

  return {
    result: response,
    costCharged: chargedCostCents,
    newBalance,
  }
}

/**
 * Check credits before an AI call (for streaming responses where we can't use the wrapper)
 * Returns null if allowed, or an error response if not
 */
export async function checkCreditsBeforeCall(
  userId: string,
  endpoint: string
): Promise<NextResponse | null> {
  const balanceCheck = await checkBalance(userId)

  if (!balanceCheck.allowed) {
    apiLogger.apiError(endpoint, 'Insufficient credits (pre-check)', {
      userId,
      currentBalance: balanceCheck.currentBalance,
      minimumBalance: balanceCheck.minimumBalance,
    })
    return insufficientCreditsError(
      balanceCheck.currentBalance,
      balanceCheck.minimumBalance
    )
  }

  return null
}

/**
 * Track credits after a streaming AI call
 * Use this for streaming endpoints where the full response isn't available upfront
 */
export async function trackCreditsAfterCall(
  userId: string,
  endpoint: string,
  model: string,
  usage: AnthropicUsage
): Promise<{ costCharged: number; newBalance: number }> {
  const { rawCostCents, chargedCostCents } = calculateCosts(
    model,
    usage.input_tokens,
    usage.output_tokens
  )

  let newBalance: number
  try {
    const deductResult = await deductCredits(userId, chargedCostCents, {
      endpoint,
      model,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      rawCostCents,
      chargedCostCents,
    })
    newBalance = deductResult.newBalance
  } catch (error) {
    if (error instanceof Error && error.message === 'INSUFFICIENT_CREDITS') {
      apiLogger.apiError(
        endpoint,
        'Insufficient credits during streaming deduction',
        { userId }
      )
      throw error
    }
    throw error
  }

  apiLogger.success(endpoint, 'Streaming AI call credits tracked', {
    data: {
      userId,
      model,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      chargedCostCents,
      newBalance,
    },
  })

  return { costCharged: chargedCostCents, newBalance }
}

/**
 * Get balance check result for client-side display
 */
export async function getBalanceStatus(userId: string): Promise<{
  balance: number
  balanceFormatted: string
  canUseAI: boolean
  isLowBalance: boolean
  debtLimit: number
}> {
  const balanceCheck = await checkBalance(userId)

  return {
    balance: balanceCheck.currentBalance,
    balanceFormatted: formatCentsAsDollars(balanceCheck.currentBalance),
    canUseAI: balanceCheck.allowed,
    isLowBalance: balanceCheck.currentBalance < 100, // Less than $1
    debtLimit: CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS,
  }
}
