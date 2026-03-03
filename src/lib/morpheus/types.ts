/**
 * Morpheus Builders API Types
 * 
 * TypeScript types for the Morpheus subnet staking API
 * API Base URL: https://dashboard.mor.org/api/builders
 */

/**
 * Subnet information from /subnets endpoint
 */
export interface MorpheusSubnet {
  /** Unique subnet identifier (bytes32 hash) */
  id: string
  /** Human-readable subnet name */
  name: string
  /** Admin wallet address */
  admin: string
  /** Total MOR staked in wei (raw value) */
  totalStaked: string
  /** Total MOR staked (human-readable) */
  totalStakedFormatted: number
  /** Number of unique stakers */
  totalUsers: number
  /** Minimum deposit in wei (raw value) */
  minimalDeposit: string
  /** Minimum deposit in MOR (human-readable) */
  minimalDepositFormatted: number
  /** Unix timestamp when subnet started */
  startsAt: string
}

/**
 * Response from /subnets endpoint
 */
export interface SubnetsResponse {
  success: boolean
  network: 'base'
  timestamp: string
  data: {
    subnets: MorpheusSubnet[]
    totals: {
      totalSubnets: number
      totalStaked: string
      totalStakedFormatted: number
      totalStakers: number
    }
  }
}

/**
 * Staker information from /stakers endpoint
 */
export interface MorpheusStaker {
  /** Staker's wallet address */
  address: string
  /** Amount staked in wei (raw value) */
  staked: string
  /** Amount staked in MOR (human-readable) */
  stakedFormatted: number
  /** Unix timestamp of last stake action */
  lastStake: string
  /** ISO 8601 date of last stake action */
  lastStakeDate: string | null
}

/**
 * Response from /stakers endpoint
 */
export interface StakersResponse {
  success: boolean
  network: 'base'
  timestamp: string
  subnetId: string
  pagination: {
    limit: number
    offset: number
    total: number
    hasMore: boolean
  }
  data: {
    stakers: MorpheusStaker[]
    totals: {
      totalStakers: number
      totalStaked: string
      totalStakedFormatted: number
    }
  }
}

/**
 * Error response from Morpheus API
 */
export interface MorpheusErrorResponse {
  success: false
  network: 'base'
  timestamp: string
  error: string
  data: null
}

/**
 * User staking information for credit calculations
 */
export interface UserStakingInfo {
  /** Whether the user is staking to our subnet */
  isStaking: boolean
  /** Wallet address */
  walletAddress: string
  /** Amount staked in MOR (human-readable) */
  stakedMor: number
  /** Monthly credit allowance in cents (stakedMor * 100) */
  monthlyAllowanceCents: number
  /** Timestamp of last stake */
  lastStakeDate: string | null
}

/**
 * MOR credit claim record stored in Firestore
 */
export interface MorCreditClaim {
  id?: string
  userId: string
  walletAddress: string
  /** MOR amount at time of claim */
  stakedMor: number
  /** Monthly allowance at time of claim in cents */
  monthlyAllowanceCents: number
  /** Amount claimed in cents */
  claimedCents: number
  /** Month key for tracking: "2026-01" format */
  monthKey: string
  /** Signature used for verification */
  signature: string
  createdAt: string
}

/**
 * User's linked wallet stored in user document
 */
export interface UserWallet {
  /** Wallet address (lowercase) */
  address: string
  /** When the wallet was linked */
  linkedAt: string
  /** Last signature verification timestamp */
  lastVerifiedAt: string
}

/**
 * Firestore collection names for MOR credit system
 */
export const MOR_COLLECTIONS = {
  CLAIMS: 'mor_credit_claims',
} as const

/**
 * Our subnet configuration
 */
export const MORPHEUS_CONFIG = {
  SUBNET_ID: '0xe9fba89ca97425c3389c8086a17a75785b04152c035b68b8108980375a60ad21',
  SUBNET_NAME: 'ccovibecom',
  NETWORK: 'base',
  API_BASE_URL: 'https://dashboard.mor.org/api/builders',
  /** Credits per MOR per month in cents (1 MOR = $1 = 100 cents) */
  CENTS_PER_MOR_PER_MONTH: 100,
} as const

