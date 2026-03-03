/**
 * Credit System Types
 * 
 * Type definitions for the usage-based billing system
 */

/**
 * User credit balance stored in the users collection
 */
export interface UserCredits {
  /** Current balance in cents (can be negative down to -5000 / -$50) */
  balance: number
  /** Lifetime deposits in cents */
  totalDeposited: number
  /** Lifetime AI usage cost in cents */
  totalUsed: number
  /** ISO timestamp of last deposit */
  lastDepositAt?: string
  /** ISO timestamp of last AI usage */
  lastUsageAt?: string
}

/**
 * Transaction types for credit operations
 */
export type CreditTransactionType = 'deposit' | 'usage' | 'refund'

/**
 * Metadata for deposit transactions
 */
export interface DepositMetadata {
  /** Required for stripe payments, optional for internal rewards */
  stripePaymentIntentId?: string
  stripeCustomerId?: string
  /** Source of the deposit */
  source?: 'stripe' | 'mor_staking' | 'writing_competition' | 'reward' | 'admin' | 'trial'
  /** For MOR staking deposits: wallet address */
  walletAddress?: string
  /** For MOR staking deposits: staked MOR amount */
  stakedMor?: number
  /** For MOR staking deposits: month key (e.g., "2026-01") */
  monthKey?: string
  /** For competition prizes */
  competitionId?: string
  /** Reason for the credit grant */
  reason?: string
}

/**
 * Metadata for AI usage transactions
 */
export interface UsageMetadata {
  endpoint: string
  model: string
  inputTokens: number
  outputTokens: number
  /** Actual API cost in cents (before markup) */
  rawCostCents: number
  /** Cost charged to user in cents (10x markup) */
  chargedCostCents: number
  /** Source of the charge (optional) */
  source?: 'ai_call' | 'customer_document'
  /** Document ID if this is a document charge */
  documentId?: string
  /** Document title if this is a document charge */
  documentTitle?: string
}

/**
 * Metadata for refund transactions
 */
export interface RefundMetadata {
  reason?: string
  originalTransactionId?: string
  stripeRefundId?: string
  stripePaymentIntentId?: string
  stripeChargeId?: string
}

/**
 * Credit transaction record stored in credit_transactions collection
 */
export interface CreditTransaction {
  id?: string
  userId: string
  type: CreditTransactionType
  /** Amount in cents (positive for deposits, negative for usage) */
  amount: number
  /** Balance after this transaction in cents */
  balanceAfter: number
  description: string
  metadata: DepositMetadata | UsageMetadata | RefundMetadata | Record<string, unknown>
  createdAt: string
}

/**
 * Result of a credit check operation
 */
export interface CreditCheckResult {
  allowed: boolean
  currentBalance: number
  minimumBalance: number
  shortfall?: number
}

/**
 * Result of an AI call with credit tracking
 */
export interface CreditTrackedResult<T> {
  result: T
  costCharged: number
  newBalance: number
}

/**
 * Anthropic API usage information
 */
export interface AnthropicUsage {
  input_tokens: number
  output_tokens: number
}

/**
 * Constants for the credit system
 */
export const CREDIT_CONSTANTS = {
  /** Minimum allowed balance in cents (-$50 debt limit for Customer portal) */
  MINIMUM_BALANCE_CENTS: -5000,
  /** Minimum allowed balance for Basics platform (-$1 debt limit) */
  BASICS_MINIMUM_BALANCE_CENTS: -100,
  /** Markup multiplier for Basics AI costs (learning features) */
  COST_MULTIPLIER: 10,
  /** Markup multiplier for Customer document processing (positive balance) */
  CUSTOMER_MARKUP_MULTIPLIER: 3,
  /** Markup multiplier for Customer document processing (going into debt) */
  CUSTOMER_DEBT_MARKUP_MULTIPLIER: 5,
  /** Minimum deposit amount in cents ($5.00) */
  MINIMUM_DEPOSIT_CENTS: 500,
  /** Maximum deposit amount in cents ($500.00) */
  MAXIMUM_DEPOSIT_CENTS: 50000,
  /** Minimum cost for customer documents in cents ($0.10) */
  MINIMUM_DOCUMENT_COST_CENTS: 10,
} as const

/**
 * Firestore collection names for credit system
 */
export const CREDIT_COLLECTIONS = {
  TRANSACTIONS: 'credit_transactions',
} as const
