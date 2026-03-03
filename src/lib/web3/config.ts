/**
 * Web3 Configuration
 * 
 * Wagmi and WalletConnect configuration for BASE network
 */

import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { base } from 'wagmi/chains'

// WalletConnect/Reown Configuration
export const REOWN_CONFIG = {
  /** WalletConnect Project ID */
  PROJECT_ID: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '',
  /** Dashboard API Secret (server-side only) */
  API_SECRET: process.env.REOWN_API_SECRET || '',
  /** Webhook Secret */
  WEBHOOK_SECRET: process.env.REOWN_WEBHOOK_SECRET || '',
  /** Cloud API Base URL */
  API_BASE_URL: 'https://rpc.walletconnect.com',
} as const

// WalletConnect Project ID (for client-side)
export const WALLET_CONNECT_PROJECT_ID = REOWN_CONFIG.PROJECT_ID

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// WalletConnect Metadata
export const walletConnectMetadata = {
  name: 'PitchRise',
  description: 'PitchRise Learning Platform',
  url: APP_URL,
  icons: [`${APP_URL}/logos/logo.png`],
}

/**
 * Get metadata for WalletConnect
 */
export function getWalletConnectMetadata() {
  return walletConnectMetadata
}

/**
 * Wagmi configuration for BASE network
 * Note: Connectors are added by createWeb3Modal
 */
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

/**
 * Message to sign for wallet verification
 * Includes timestamp to prevent replay attacks
 */
export function createSignMessage(action: string, timestamp: number): string {
  return `PitchRise Wallet Verification

Action: ${action}
Timestamp: ${timestamp}

By signing this message, you are verifying that you own this wallet address and authorizing PitchRise to check your MOR staking status.

This signature does not grant permission to transfer any tokens.`
}

/**
 * Verify signature timestamp is recent (within 5 minutes)
 */
export function isSignatureTimestampValid(timestamp: number): boolean {
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  return Math.abs(now - timestamp) < fiveMinutes
}
