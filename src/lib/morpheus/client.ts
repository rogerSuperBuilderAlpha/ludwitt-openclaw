/**
 * Morpheus Builders API Client
 * 
 * Client for interacting with the Morpheus subnet staking API
 * to verify user stakes and calculate credit allowances.
 */

import {
  MORPHEUS_CONFIG,
  type MorpheusStaker,
  type StakersResponse,
  type UserStakingInfo,
} from './types'
import { logger } from '@/lib/logger'

/**
 * Get staking information for a specific wallet address on our subnet
 * 
 * @param walletAddress - The wallet address to look up (case-insensitive)
 * @returns Staking info including amount staked and monthly allowance
 */
export async function getWalletStakingInfo(walletAddress: string): Promise<UserStakingInfo> {
  const normalizedAddress = walletAddress.toLowerCase()
  
  try {
    // Fetch stakers for our subnet with pagination
    // We need to find the specific wallet, so we may need to paginate
    let offset = 0
    const limit = 100
    let staker: MorpheusStaker | null = null
    
    while (true) {
      const url = new URL(`${MORPHEUS_CONFIG.API_BASE_URL}/stakers`)
      url.searchParams.set('subnet_id', MORPHEUS_CONFIG.SUBNET_ID)
      url.searchParams.set('limit', limit.toString())
      url.searchParams.set('offset', offset.toString())
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Don't cache - always get fresh data for credit claims
        cache: 'no-store',
      })
      
      if (!response.ok) {
        throw new Error(`Morpheus API error: ${response.status} ${response.statusText}`)
      }
      
      const data: StakersResponse = await response.json()
      
      if (!data.success) {
        throw new Error('Morpheus API returned unsuccessful response')
      }
      
      // Search for the wallet in this page of results
      staker = data.data.stakers.find(
        s => s.address.toLowerCase() === normalizedAddress
      ) || null
      
      if (staker) {
        break // Found the wallet
      }
      
      // Check if there are more pages
      if (!data.pagination.hasMore) {
        break // No more pages, wallet not found
      }
      
      offset += limit
    }
    
    if (!staker) {
      // Wallet is not staking to our subnet
      return {
        isStaking: false,
        walletAddress: normalizedAddress,
        stakedMor: 0,
        monthlyAllowanceCents: 0,
        lastStakeDate: null,
      }
    }
    
    // Calculate monthly allowance: 1 MOR = $1/month = 100 cents
    const monthlyAllowanceCents = Math.floor(staker.stakedFormatted * MORPHEUS_CONFIG.CENTS_PER_MOR_PER_MONTH)
    
    return {
      isStaking: true,
      walletAddress: normalizedAddress,
      stakedMor: staker.stakedFormatted,
      monthlyAllowanceCents,
      lastStakeDate: staker.lastStakeDate,
    }
  } catch (error) {
    logger.error('Client', 'Error fetching wallet staking info', { error: error })
    throw error
  }
}

/**
 * Get aggregated staking info for multiple wallet addresses
 * 
 * @param walletAddresses - Array of wallet addresses to look up
 * @returns Combined staking info with totals from all wallets
 */
export async function getMultiWalletStakingInfo(
  walletAddresses: string[]
): Promise<{
  wallets: UserStakingInfo[]
  totalStakedMor: number
  totalMonthlyAllowanceCents: number
}> {
  // Fetch staking info for all wallets in parallel
  const stakingInfoPromises = walletAddresses.map(addr => getWalletStakingInfo(addr))
  const wallets = await Promise.all(stakingInfoPromises)
  
  // Calculate totals
  const totalStakedMor = wallets.reduce((sum, w) => sum + w.stakedMor, 0)
  const totalMonthlyAllowanceCents = wallets.reduce((sum, w) => sum + w.monthlyAllowanceCents, 0)
  
  return {
    wallets,
    totalStakedMor,
    totalMonthlyAllowanceCents,
  }
}

/**
 * Get the current month key for tracking monthly claims
 * Format: "2026-01"
 */
export function getCurrentMonthKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

/**
 * Convert wei string to MOR number
 */
export function weiToMor(wei: string): number {
  return Number(BigInt(wei)) / 1e18
}

