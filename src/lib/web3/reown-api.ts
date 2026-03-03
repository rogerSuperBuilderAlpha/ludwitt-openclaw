/**
 * Reown/WalletConnect Cloud API Client
 * 
 * Server-side client for interacting with WalletConnect Cloud API
 * for analytics, push notifications, and session management.
 */

import { REOWN_CONFIG } from './config'
import { logger } from '@/lib/logger'

const API_BASE = 'https://rpc.walletconnect.com/v1'
const EXPLORER_API = 'https://explorer-api.walletconnect.com/v3'

interface WalletConnectAnalytics {
  totalConnections: number
  activeConnections: number
  connectionsByWallet: Record<string, number>
  connectionsByChain: Record<string, number>
  dailyConnections: Array<{ date: string; count: number }>
}

interface WalletInfo {
  id: string
  name: string
  homepage: string
  image_url: {
    sm: string
    md: string
    lg: string
  }
  app: {
    browser?: string
    ios?: string
    android?: string
  }
  chains: string[]
}

/**
 * Fetch project analytics from WalletConnect Cloud
 */
export async function getProjectAnalytics(): Promise<WalletConnectAnalytics | null> {
  try {
    // Note: WalletConnect Cloud analytics API may require specific endpoints
    // This is a placeholder structure - actual API may differ
    const response = await fetch(
      `${API_BASE}/analytics?projectId=${REOWN_CONFIG.PROJECT_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${REOWN_CONFIG.API_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      logger.error('ReownApi', 'Analytics fetch failed', { data: { status: response.status } })
      return null
    }

    return await response.json()
  } catch (error) {
    logger.error('ReownApi', 'Analytics error', { error })
    return null
  }
}

/**
 * Get list of supported wallets from WalletConnect Explorer
 */
export async function getSupportedWallets(): Promise<WalletInfo[]> {
  try {
    const response = await fetch(
      `${EXPLORER_API}/wallets?projectId=${REOWN_CONFIG.PROJECT_ID}&chains=eip155:8453`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data.listings ? Object.values(data.listings) : []
  } catch (error) {
    logger.error('ReownApi', 'Wallets fetch error', { error })
    return []
  }
}

/**
 * Send push notification to a connected wallet
 */
export async function sendPushNotification(
  topic: string,
  title: string,
  body: string,
  url?: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE}/notify?projectId=${REOWN_CONFIG.PROJECT_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${REOWN_CONFIG.API_SECRET}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          notification: {
            title,
            body,
            url,
          },
        }),
      }
    )

    return response.ok
  } catch (error) {
    logger.error('ReownApi', 'Push notification error', { error })
    return false
  }
}

/**
 * Get wallet display info (name, icon) for common wallets
 */
export function getWalletDisplayInfo(connectorName: string): { name: string; icon: string } {
  const wallets: Record<string, { name: string; icon: string }> = {
    'MetaMask': {
      name: 'MetaMask',
      icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/5195e9db-94d8-4579-6f11-ef553be95100',
    },
    'Coinbase Wallet': {
      name: 'Coinbase Wallet',
      icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/a5ebc364-8f91-4200-fcc6-be81f4b00700',
    },
    'Rainbow': {
      name: 'Rainbow',
      icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/7a33d7f1-3d12-4b5c-f3ee-5cd83cb1b500',
    },
    'Trust Wallet': {
      name: 'Trust Wallet',
      icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/0528ee7e-16d1-4089-21e3-bbfb41933100',
    },
    'WalletConnect': {
      name: 'WalletConnect',
      icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/09dca5e3-6e89-4e23-c0df-21c4f3b47c00',
    },
  }

  return wallets[connectorName] || {
    name: connectorName,
    icon: 'https://explorer-api.walletconnect.com/v3/logo/sm/09dca5e3-6e89-4e23-c0df-21c4f3b47c00',
  }
}

