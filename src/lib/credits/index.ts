/**
 * Credit System Module
 * 
 * Usage-based billing for AI features
 */

// Types
export * from './types'

// Pricing calculations
export {
  calculateRawCostCents,
  calculateChargedCostCents,
  calculateCosts,
  formatCentsAsDollars,
  estimateCostFromPromptLength,
  getModelPricing,
  MODEL_PRICING,
} from './pricing'

// Balance operations
export {
  getUserCredits,
  checkBalance,
  deductCredits,
  addCredits,
  refundCredits,
  getTransactionHistory,
  isLowBalance,
  isAtDebtLimit,
} from './balance'

// Middleware for AI endpoints
export {
  withCreditTracking,
  checkCreditsBeforeCall,
  trackCreditsAfterCall,
  getBalanceStatus,
  insufficientCreditsError,
} from './middleware'

// Basics platform enforcement ($1 limit)
export {
  checkBasicsBalance,
  isAtBasicsDebtLimit,
  withBasicsCreditTracking,
  checkBasicsCreditsBeforeCall,
  getBasicsBalanceStatus,
  insufficientBasicsCreditsError,
} from './basics-enforcement'
