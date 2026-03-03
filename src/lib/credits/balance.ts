/**
 * Credit Balance Utilities
 *
 * Functions for checking, updating, and managing user credit balances.
 * Supports a $5 debt allowance for new users to test the platform.
 */

import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import {
  UserCredits,
  CreditTransaction,
  CreditCheckResult,
  UsageMetadata,
  DepositMetadata,
  RefundMetadata,
  CREDIT_CONSTANTS,
  CREDIT_COLLECTIONS,
} from './types'

/**
 * Get user's current credit balance and info
 */
export async function getUserCredits(userId: string): Promise<UserCredits> {
  const userDoc = await db.collection('users').doc(userId).get()

  if (!userDoc.exists) {
    // Return default credits for new users
    return {
      balance: 0,
      totalDeposited: 0,
      totalUsed: 0,
    }
  }

  const data = userDoc.data()
  const credits = data?.credits as UserCredits | undefined

  return {
    balance: credits?.balance ?? 0,
    totalDeposited: credits?.totalDeposited ?? 0,
    totalUsed: credits?.totalUsed ?? 0,
    lastDepositAt: credits?.lastDepositAt,
    lastUsageAt: credits?.lastUsageAt,
  }
}

/**
 * Check if user has sufficient balance for an AI operation
 * Users can go up to $5 into debt (balance >= -500 cents)
 */
export async function checkBalance(userId: string): Promise<CreditCheckResult> {
  const credits = await getUserCredits(userId)
  const minimumBalance = CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS

  const allowed = credits.balance >= minimumBalance

  return {
    allowed,
    currentBalance: credits.balance,
    minimumBalance,
    shortfall: allowed ? undefined : minimumBalance - credits.balance,
  }
}

/**
 * Deduct credits for AI usage and log the transaction
 * Returns the new balance after deduction
 */
export async function deductCredits(
  userId: string,
  costCents: number,
  metadata: UsageMetadata
): Promise<{ newBalance: number; transaction: CreditTransaction }> {
  const userRef = db.collection('users').doc(userId)
  const transactionRef = db.collection(CREDIT_COLLECTIONS.TRANSACTIONS).doc()

  const timestamp = createISOTimestamp()

  // Use a transaction to ensure atomic balance update
  const result = await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef)

    let credits: UserCredits
    if (!userDoc.exists) {
      credits = { balance: 0, totalDeposited: 0, totalUsed: 0 }
    } else {
      const data = userDoc.data()
      credits = {
        balance: data?.credits?.balance ?? 0,
        totalDeposited: data?.credits?.totalDeposited ?? 0,
        totalUsed: data?.credits?.totalUsed ?? 0,
      }
    }

    // Enforce minimum balance inside the transaction
    if (credits.balance < CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS) {
      throw new Error('INSUFFICIENT_CREDITS')
    }

    // Calculate new balance
    const newBalance = credits.balance - costCents
    const newTotalUsed = credits.totalUsed + costCents

    // Update user credits
    transaction.set(
      userRef,
      {
        credits: {
          balance: newBalance,
          totalDeposited: credits.totalDeposited,
          totalUsed: newTotalUsed,
          lastUsageAt: timestamp,
        },
        updatedAt: timestamp,
      },
      { merge: true }
    )

    // Create transaction record
    const creditTransaction: CreditTransaction = {
      userId,
      type: 'usage',
      amount: -costCents, // Negative for usage
      balanceAfter: newBalance,
      description: `AI usage: ${metadata.endpoint}`,
      metadata,
      createdAt: timestamp,
    }

    transaction.set(transactionRef, creditTransaction)

    return {
      newBalance,
      transaction: { ...creditTransaction, id: transactionRef.id },
    }
  })

  return result
}

/**
 * Add credits from a deposit
 */
export async function addCredits(
  userId: string,
  amountCents: number,
  metadata: DepositMetadata
): Promise<{ newBalance: number; transaction: CreditTransaction }> {
  const userRef = db.collection('users').doc(userId)
  const transactionRef = db.collection(CREDIT_COLLECTIONS.TRANSACTIONS).doc()

  const timestamp = createISOTimestamp()

  const result = await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef)

    let credits: UserCredits
    if (!userDoc.exists) {
      credits = { balance: 0, totalDeposited: 0, totalUsed: 0 }
    } else {
      const data = userDoc.data()
      credits = {
        balance: data?.credits?.balance ?? 0,
        totalDeposited: data?.credits?.totalDeposited ?? 0,
        totalUsed: data?.credits?.totalUsed ?? 0,
      }
    }

    // Calculate new balance
    const newBalance = credits.balance + amountCents
    const newTotalDeposited = credits.totalDeposited + amountCents

    // Update user credits
    transaction.set(
      userRef,
      {
        credits: {
          balance: newBalance,
          totalDeposited: newTotalDeposited,
          totalUsed: credits.totalUsed,
          lastDepositAt: timestamp,
        },
        updatedAt: timestamp,
      },
      { merge: true }
    )

    // Create transaction record
    const creditTransaction: CreditTransaction = {
      userId,
      type: 'deposit',
      amount: amountCents, // Positive for deposits
      balanceAfter: newBalance,
      description: `Credit deposit`,
      metadata,
      createdAt: timestamp,
    }

    transaction.set(transactionRef, creditTransaction)

    return {
      newBalance,
      transaction: { ...creditTransaction, id: transactionRef.id },
    }
  })

  return result
}

/**
 * Refund credits (subtract from balance due to refund)
 */
export async function refundCredits(
  userId: string,
  amountCents: number,
  metadata: RefundMetadata
): Promise<{ newBalance: number; transaction: CreditTransaction }> {
  const userRef = db.collection('users').doc(userId)
  const transactionRef = db.collection(CREDIT_COLLECTIONS.TRANSACTIONS).doc()

  const timestamp = createISOTimestamp()

  const result = await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef)

    let credits: UserCredits
    if (!userDoc.exists) {
      credits = { balance: 0, totalDeposited: 0, totalUsed: 0 }
    } else {
      const data = userDoc.data()
      credits = {
        balance: data?.credits?.balance ?? 0,
        totalDeposited: data?.credits?.totalDeposited ?? 0,
        totalUsed: data?.credits?.totalUsed ?? 0,
      }
    }

    // Calculate new balance (subtract refunded amount)
    const newBalance = credits.balance - amountCents
    const newTotalDeposited = Math.max(0, credits.totalDeposited - amountCents)

    // Update user credits
    transaction.set(
      userRef,
      {
        credits: {
          balance: newBalance,
          totalDeposited: newTotalDeposited,
          totalUsed: credits.totalUsed,
        },
        updatedAt: timestamp,
      },
      { merge: true }
    )

    // Create transaction record
    const creditTransaction: CreditTransaction = {
      userId,
      type: 'refund',
      amount: -amountCents, // Negative for refunds
      balanceAfter: newBalance,
      description: `Refund processed`,
      metadata,
      createdAt: timestamp,
    }

    transaction.set(transactionRef, creditTransaction)

    return {
      newBalance,
      transaction: { ...creditTransaction, id: transactionRef.id },
    }
  })

  return result
}

/**
 * Get user's transaction history
 */
export async function getTransactionHistory(
  userId: string,
  limit: number = 50
): Promise<CreditTransaction[]> {
  const snapshot = await db
    .collection(CREDIT_COLLECTIONS.TRANSACTIONS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get()

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as CreditTransaction
  )
}

/**
 * Get total count of user's transactions
 */
export async function getTransactionCount(userId: string): Promise<number> {
  const snapshot = await db
    .collection(CREDIT_COLLECTIONS.TRANSACTIONS)
    .where('userId', '==', userId)
    .count()
    .get()

  return snapshot.data().count
}

/**
 * Check if user is low on credits (warning threshold)
 * Returns true if balance is below $1 (100 cents)
 */
export function isLowBalance(balanceCents: number): boolean {
  return balanceCents < 100
}

/**
 * Check if user is at debt limit
 */
export function isAtDebtLimit(balanceCents: number): boolean {
  return balanceCents <= CREDIT_CONSTANTS.MINIMUM_BALANCE_CENTS
}
