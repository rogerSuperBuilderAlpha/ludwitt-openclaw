/**
 * Basics Platform Credit Enforcement
 * 
 * Enforces the $1 debt limit for the Basics learning platform.
 * This is separate from the Customer portal which uses a $50 limit.
 */

import { NextResponse } from 'next/server'
import { getUserCredits, deductCredits } from './balance'
import { calculateCosts, formatCentsAsDollars } from './pricing'
import { AnthropicUsage, CreditCheckResult, CreditTrackedResult, CREDIT_CONSTANTS } from './types'
import { apiLogger } from '@/lib/logger'

/**
 * Check if user has sufficient balance for a Basics AI operation
 * Uses the stricter $1 debt limit instead of the $50 Customer limit
 */
export async function checkBasicsBalance(userId: string): Promise<CreditCheckResult> {
  const credits = await getUserCredits(userId)
  const minimumBalance = CREDIT_CONSTANTS.BASICS_MINIMUM_BALANCE_CENTS
  
  const allowed = credits.balance >= minimumBalance
  
  return {
    allowed,
    currentBalance: credits.balance,
    minimumBalance,
    shortfall: allowed ? undefined : minimumBalance - credits.balance,
  }
}

/**
 * Check if user is at the Basics debt limit
 */
export function isAtBasicsDebtLimit(balanceCents: number): boolean {
  return balanceCents <= CREDIT_CONSTANTS.BASICS_MINIMUM_BALANCE_CENTS
}

/**
 * Error response for insufficient credits on Basics platform
 */
export function insufficientBasicsCreditsError(currentBalance: number, minimumBalance: number): NextResponse {
  const currentDollars = formatCentsAsDollars(currentBalance)
  const limitDollars = formatCentsAsDollars(Math.abs(minimumBalance))
  
  return NextResponse.json({
    success: false,
    error: 'Insufficient credits',
    code: 'INSUFFICIENT_CREDITS',
    details: {
      currentBalance: currentBalance,
      currentBalanceFormatted: currentDollars,
      debtLimit: minimumBalance,
      debtLimitFormatted: `-$${limitDollars}`,
      platform: 'basics',
      message: `You've used your $1 trial credit. Your balance is ${currentDollars}. Please add funds to continue using AI features.`,
      upgradeUrl: '/account/credits',
    },
  }, { status: 402 }) // 402 Payment Required
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
 * Execute a Basics AI call with credit tracking using the $1 limit
 * 
 * @param userId - The user making the request
 * @param endpoint - Name of the endpoint (for logging)
 * @param aiCall - Function that executes the AI call and returns response + usage
 * @returns The AI response with cost information, or an error response
 */
export async function withBasicsCreditTracking<T>(
  userId: string,
  endpoint: string,
  aiCall: () => Promise<AICallResult<T>>
): Promise<CreditTrackedResult<T> | NextResponse> {
  // Step 1: Check if user has sufficient balance with Basics limit
  const balanceCheck = await checkBasicsBalance(userId)
  
  if (!balanceCheck.allowed) {
    apiLogger.apiError(endpoint, 'Insufficient credits (Basics $1 limit)', {
      userId,
      currentBalance: balanceCheck.currentBalance,
      minimumBalance: balanceCheck.minimumBalance,
    })
    return insufficientBasicsCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
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
  const { newBalance } = await deductCredits(userId, chargedCostCents, {
    endpoint,
    model,
    inputTokens: usage.input_tokens,
    outputTokens: usage.output_tokens,
    rawCostCents,
    chargedCostCents,
  })
  
  apiLogger.success(endpoint, 'Basics AI call completed with credit deduction', {
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
 * Check Basics credits before an AI call (for streaming responses)
 * Returns null if allowed, or an error response if not
 */
export async function checkBasicsCreditsBeforeCall(
  userId: string,
  endpoint: string
): Promise<NextResponse | null> {
  const balanceCheck = await checkBasicsBalance(userId)
  
  if (!balanceCheck.allowed) {
    apiLogger.apiError(endpoint, 'Insufficient credits (Basics pre-check)', {
      userId,
      currentBalance: balanceCheck.currentBalance,
      minimumBalance: balanceCheck.minimumBalance,
    })
    return insufficientBasicsCreditsError(balanceCheck.currentBalance, balanceCheck.minimumBalance)
  }
  
  return null
}

/**
 * Get Basics balance status for client-side display
 */
export async function getBasicsBalanceStatus(userId: string): Promise<{
  balance: number
  balanceFormatted: string
  canUseAI: boolean
  isLowBalance: boolean
  isAtLimit: boolean
  debtLimit: number
}> {
  const balanceCheck = await checkBasicsBalance(userId)
  
  return {
    balance: balanceCheck.currentBalance,
    balanceFormatted: formatCentsAsDollars(balanceCheck.currentBalance),
    canUseAI: balanceCheck.allowed,
    isLowBalance: balanceCheck.currentBalance < 100, // Less than $1
    isAtLimit: !balanceCheck.allowed,
    debtLimit: CREDIT_CONSTANTS.BASICS_MINIMUM_BALANCE_CENTS,
  }
}
