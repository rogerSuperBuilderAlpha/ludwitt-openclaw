/**
 * MOR Credit Balance Tracking
 * 
 * Functions for tracking MOR staking-based credit claims
 * and calculating available monthly allowances.
 */

import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'
import { getCurrentMonthKey } from '@/lib/morpheus/client'
import { MOR_COLLECTIONS, type MorCreditClaim } from '@/lib/morpheus/types'
import { addCredits } from './balance'

/**
 * Get total credits claimed this month for a user from all their wallets
 */
export async function getMonthlyClaimedCredits(userId: string): Promise<number> {
  const monthKey = getCurrentMonthKey()
  
  const claimsSnapshot = await db
    .collection(MOR_COLLECTIONS.CLAIMS)
    .where('userId', '==', userId)
    .where('monthKey', '==', monthKey)
    .get()
  
  let totalClaimed = 0
  claimsSnapshot.forEach((doc) => {
    const claim = doc.data() as MorCreditClaim
    totalClaimed += claim.claimedCents
  })
  
  return totalClaimed
}

/**
 * Get credits claimed this month for a specific wallet
 */
export async function getWalletMonthlyClaimedCredits(
  userId: string,
  walletAddress: string
): Promise<number> {
  const monthKey = getCurrentMonthKey()
  const normalizedAddress = walletAddress.toLowerCase()
  
  const claimsSnapshot = await db
    .collection(MOR_COLLECTIONS.CLAIMS)
    .where('userId', '==', userId)
    .where('walletAddress', '==', normalizedAddress)
    .where('monthKey', '==', monthKey)
    .get()
  
  let totalClaimed = 0
  claimsSnapshot.forEach((doc) => {
    const claim = doc.data() as MorCreditClaim
    totalClaimed += claim.claimedCents
  })
  
  return totalClaimed
}

/**
 * Calculate available credits to claim for a wallet this month
 */
export async function getAvailableCredits(
  userId: string,
  walletAddress: string,
  monthlyAllowanceCents: number
): Promise<{
  monthlyAllowanceCents: number
  claimedThisMonth: number
  availableToClaim: number
}> {
  const claimedThisMonth = await getWalletMonthlyClaimedCredits(userId, walletAddress)
  const availableToClaim = Math.max(0, monthlyAllowanceCents - claimedThisMonth)
  
  return {
    monthlyAllowanceCents,
    claimedThisMonth,
    availableToClaim,
  }
}

/**
 * Claim MOR staking credits
 *
 * Uses atomic transaction to prevent race conditions where two simultaneous
 * requests could both pass the monthly limit check and claim more than allowed.
 *
 * @param userId - Firebase user ID
 * @param walletAddress - Verified wallet address
 * @param stakedMor - Current staked MOR amount
 * @param monthlyAllowanceCents - Monthly allowance based on stake
 * @param amountCents - Amount to claim (up to available)
 * @param signature - Signature used for verification
 * @returns The claim record and new balance
 */
export async function claimMorCredits(
  userId: string,
  walletAddress: string,
  stakedMor: number,
  monthlyAllowanceCents: number,
  amountCents: number,
  signature: string
): Promise<{
  claim: MorCreditClaim
  newBalance: number
}> {
  const normalizedAddress = walletAddress.toLowerCase()
  const monthKey = getCurrentMonthKey()
  const timestamp = createISOTimestamp()

  // Validate claim amount
  if (amountCents <= 0) {
    throw new Error('Claim amount must be greater than 0')
  }

  // Use atomic transaction to check availability AND create claim
  // This prevents race conditions where two requests both pass the limit check
  const claimRef = db.collection(MOR_COLLECTIONS.CLAIMS).doc()

  const claim = await db.runTransaction(async (transaction) => {
    // Get all claims for this user/wallet/month within the transaction
    const claimsSnapshot = await transaction.get(
      db.collection(MOR_COLLECTIONS.CLAIMS)
        .where('userId', '==', userId)
        .where('walletAddress', '==', normalizedAddress)
        .where('monthKey', '==', monthKey)
    )

    // Calculate total claimed this month
    let claimedThisMonth = 0
    claimsSnapshot.forEach((doc) => {
      const existingClaim = doc.data() as MorCreditClaim
      claimedThisMonth += existingClaim.claimedCents
    })

    // Calculate available to claim
    const availableToClaim = Math.max(0, monthlyAllowanceCents - claimedThisMonth)

    // Validate claim amount against available (inside transaction for atomicity)
    if (amountCents > availableToClaim) {
      throw new Error(`LIMIT_EXCEEDED:${availableToClaim}:${amountCents}`)
    }

    // Create the claim record
    const newClaim: MorCreditClaim = {
      userId,
      walletAddress: normalizedAddress,
      stakedMor,
      monthlyAllowanceCents,
      claimedCents: amountCents,
      monthKey,
      signature,
      createdAt: timestamp,
    }

    transaction.set(claimRef, newClaim)

    return { ...newClaim, id: claimRef.id }
  })

  // Add credits to user's balance (this has its own atomic transaction)
  const { newBalance } = await addCredits(userId, amountCents, {
    stripePaymentIntentId: `mor_claim_${claimRef.id}`,
    stripeCustomerId: undefined,
    // Add MOR-specific metadata
    source: 'mor_staking',
    walletAddress: normalizedAddress,
    stakedMor,
    monthKey,
  } as any)

  return {
    claim,
    newBalance,
  }
}

/**
 * Get all linked wallets for a user
 */
export async function getUserWallets(userId: string): Promise<string[]> {
  const userDoc = await db.collection('users').doc(userId).get()
  
  if (!userDoc.exists) {
    return []
  }
  
  const data = userDoc.data()
  const wallets = data?.linkedWallets || []
  
  return wallets.map((w: { address: string }) => w.address)
}

/**
 * Link a wallet to a user account
 */
export async function linkWallet(
  userId: string,
  walletAddress: string
): Promise<void> {
  const normalizedAddress = walletAddress.toLowerCase()
  const timestamp = createISOTimestamp()
  
  const userRef = db.collection('users').doc(userId)
  
  await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef)
    
    let linkedWallets: Array<{ address: string; linkedAt: string; lastVerifiedAt: string }> = []
    
    if (userDoc.exists) {
      linkedWallets = userDoc.data()?.linkedWallets || []
    }
    
    // Check if wallet is already linked
    const existingIndex = linkedWallets.findIndex(
      w => w.address === normalizedAddress
    )
    
    if (existingIndex >= 0) {
      // Update last verified timestamp
      linkedWallets[existingIndex].lastVerifiedAt = timestamp
    } else {
      // Add new wallet
      linkedWallets.push({
        address: normalizedAddress,
        linkedAt: timestamp,
        lastVerifiedAt: timestamp,
      })
    }
    
    transaction.set(userRef, {
      linkedWallets,
      updatedAt: timestamp,
    }, { merge: true })
  })
}

/**
 * Unlink a wallet from a user account
 */
export async function unlinkWallet(
  userId: string,
  walletAddress: string
): Promise<void> {
  const normalizedAddress = walletAddress.toLowerCase()
  const timestamp = createISOTimestamp()
  
  const userRef = db.collection('users').doc(userId)
  
  await db.runTransaction(async (transaction) => {
    const userDoc = await transaction.get(userRef)
    
    if (!userDoc.exists) {
      return
    }
    
    const linkedWallets = (userDoc.data()?.linkedWallets || []).filter(
      (w: { address: string }) => w.address !== normalizedAddress
    )
    
    transaction.set(userRef, {
      linkedWallets,
      updatedAt: timestamp,
    }, { merge: true })
  })
}

