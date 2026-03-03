/**
 * API Route: POST /api/credits/mor-deposit
 * 
 * Claims credits based on MOR staking to our Morpheus subnet.
 * Requires wallet signature verification.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { verifyWalletSignature } from '@/lib/web3/signature'
import { getWalletStakingInfo, getMultiWalletStakingInfo } from '@/lib/morpheus/client'
import {
  claimMorCredits,
  getAvailableCredits,
  linkWallet,
  getUserWallets,
} from '@/lib/credits/mor-balance'
import { notifyMorClaim } from '@/lib/web3/notifications'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export const dynamic = 'force-dynamic'

interface MorDepositRequest {
  walletAddress: string
  signature: `0x${string}`
  timestamp: number
  amountCents: number
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body: MorDepositRequest = await request.json()
    const { walletAddress, signature, timestamp, amountCents } = body

    // Validate required fields
    if (!walletAddress || !signature || !timestamp) {
      return badRequestError('Missing required fields: walletAddress, signature, timestamp')
    }

    // amountCents can be 0 for verification-only requests
    const isVerificationOnly = amountCents === 0
    if (!isVerificationOnly && (typeof amountCents !== 'number' || amountCents < 0)) {
      return badRequestError('amountCents must be a non-negative number')
    }

    // Step 1: Verify wallet signature
    const signatureResult = await verifyWalletSignature(
      walletAddress,
      signature,
      'claim_mor_credits',
      timestamp
    )

    if (!signatureResult.valid) {
      return badRequestError(signatureResult.error || 'Invalid signature')
    }

    const verifiedAddress = signatureResult.walletAddress!

    // Step 2: Get staking info from Morpheus API
    const stakingInfo = await getWalletStakingInfo(verifiedAddress)

    if (!stakingInfo.isStaking) {
      return successResponse({
        success: false,
        error: 'Wallet is not staking to our subnet',
        stakingInfo: {
          isStaking: false,
          stakedMor: 0,
          monthlyAllowanceCents: 0,
          availableToClaim: 0,
        },
      })
    }

    // Step 3: Calculate available credits
    const availableInfo = await getAvailableCredits(
      userId,
      verifiedAddress,
      stakingInfo.monthlyAllowanceCents
    )

    // Step 5: Link wallet to user (or update last verified)
    await linkWallet(userId, verifiedAddress)

    // If verification only (amountCents = 0), return staking info without claiming
    if (isVerificationOnly) {
      apiLogger.success('credits/mor-deposit', 'Wallet verified for MOR staking', {
        data: {
          userId,
          walletAddress: verifiedAddress,
          stakedMor: stakingInfo.stakedMor,
          monthlyAllowanceCents: stakingInfo.monthlyAllowanceCents,
        },
      })

      return successResponse({
        success: true,
        verified: true,
        stakingInfo: {
          isStaking: true,
          stakedMor: stakingInfo.stakedMor,
          monthlyAllowanceCents: stakingInfo.monthlyAllowanceCents,
          claimedThisMonth: availableInfo.claimedThisMonth,
          availableToClaim: availableInfo.availableToClaim,
        },
      })
    }

    // Step 4: Validate claim amount (only for actual claims)
    if (amountCents > availableInfo.availableToClaim) {
      return badRequestError(
        `Requested ${amountCents} cents but only ${availableInfo.availableToClaim} cents available to claim this month`
      )
    }

    // Step 6: Claim the credits
    const { claim, newBalance } = await claimMorCredits(
      userId,
      verifiedAddress,
      stakingInfo.stakedMor,
      stakingInfo.monthlyAllowanceCents,
      amountCents,
      signature
    )

    // Step 7: Send notification
    await notifyMorClaim(userId, verifiedAddress, amountCents, stakingInfo.stakedMor)

    apiLogger.success('credits/mor-deposit', 'MOR credits claimed', {
      data: {
        userId,
        walletAddress: verifiedAddress,
        stakedMor: stakingInfo.stakedMor,
        claimedCents: amountCents,
        newBalance,
        claimId: claim.id,
      },
    })

    return successResponse({
      success: true,
      claim: {
        id: claim.id,
        claimedCents: claim.claimedCents,
        monthKey: claim.monthKey,
      },
      newBalance,
      stakingInfo: {
        stakedMor: stakingInfo.stakedMor,
        monthlyAllowanceCents: stakingInfo.monthlyAllowanceCents,
        claimedThisMonth: availableInfo.claimedThisMonth + amountCents,
        remainingThisMonth: availableInfo.availableToClaim - amountCents,
      },
    })
  } catch (error) {
    // Handle the specific "limit exceeded" error from atomic transaction
    if (error instanceof Error && error.message.startsWith('LIMIT_EXCEEDED:')) {
      const [, available, requested] = error.message.split(':')
      return badRequestError(
        `Requested ${requested} cents but only ${available} cents available to claim this month`
      )
    }
    apiLogger.apiError('credits/mor-deposit', 'Failed to process MOR deposit', error)
    return serverError('Failed to process MOR credit claim')
  }
}

/**
 * GET /api/credits/mor-deposit
 * 
 * Get staking info and available credits for the user's linked wallets
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Get linked wallets
    const walletAddresses = await getUserWallets(userId)

    if (walletAddresses.length === 0) {
      return successResponse({
        hasLinkedWallets: false,
        wallets: [],
        totalStakedMor: 0,
        totalMonthlyAllowanceCents: 0,
        totalClaimedThisMonth: 0,
        totalAvailableToClaim: 0,
      })
    }

    // Get staking info for all wallets
    const stakingInfo = await getMultiWalletStakingInfo(walletAddresses)

    // Get available credits for each wallet
    const walletsWithAvailability = await Promise.all(
      stakingInfo.wallets.map(async (wallet) => {
        const available = await getAvailableCredits(
          userId,
          wallet.walletAddress,
          wallet.monthlyAllowanceCents
        )
        return {
          ...wallet,
          claimedThisMonth: available.claimedThisMonth,
          availableToClaim: available.availableToClaim,
        }
      })
    )

    // Calculate totals
    const totalClaimedThisMonth = walletsWithAvailability.reduce(
      (sum, w) => sum + w.claimedThisMonth,
      0
    )
    const totalAvailableToClaim = walletsWithAvailability.reduce(
      (sum, w) => sum + w.availableToClaim,
      0
    )

    return successResponse({
      hasLinkedWallets: true,
      wallets: walletsWithAvailability,
      totalStakedMor: stakingInfo.totalStakedMor,
      totalMonthlyAllowanceCents: stakingInfo.totalMonthlyAllowanceCents,
      totalClaimedThisMonth,
      totalAvailableToClaim,
    })
  } catch (error) {
    apiLogger.apiError('credits/mor-deposit', 'Failed to get MOR staking info', error)
    return serverError('Failed to get staking information')
  }
}

