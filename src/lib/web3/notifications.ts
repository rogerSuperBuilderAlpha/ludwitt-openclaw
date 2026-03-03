/**
 * Wallet Notifications
 * 
 * Send notifications when wallet-related events occur:
 * - New wallet linked
 * - Wallet unlinked
 * - Large credit claim
 */

import { db } from '@/lib/firebase/admin'
import { createISOTimestamp } from '@/lib/utils/firestore-helpers'

interface WalletNotification {
  userId: string
  type: 'wallet_linked' | 'wallet_unlinked' | 'mor_claim' | 'wallet_not_staking'
  title: string
  message: string
  walletAddress?: string
  metadata?: Record<string, unknown>
  read: boolean
  createdAt: string
}

/**
 * Create a notification for the user
 */
async function createNotification(notification: Omit<WalletNotification, 'read' | 'createdAt'>) {
  const timestamp = createISOTimestamp()
  
  const notificationDoc: WalletNotification = {
    ...notification,
    read: false,
    createdAt: timestamp,
  }
  
  await db.collection('notifications').add(notificationDoc)
  
  return notificationDoc
}

/**
 * Notify user when a new wallet is linked
 */
export async function notifyWalletLinked(
  userId: string,
  walletAddress: string
): Promise<void> {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  
  await createNotification({
    userId,
    type: 'wallet_linked',
    title: 'Wallet Connected',
    message: `Wallet ${shortAddress} has been linked to your account. You can now claim MOR staking credits from this wallet.`,
    walletAddress,
    metadata: {
      action: 'linked',
    },
  })
}

/**
 * Notify user when a wallet is unlinked
 */
export async function notifyWalletUnlinked(
  userId: string,
  walletAddress: string
): Promise<void> {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  
  await createNotification({
    userId,
    type: 'wallet_unlinked',
    title: 'Wallet Disconnected',
    message: `Wallet ${shortAddress} has been unlinked from your account. You can no longer claim credits from this wallet.`,
    walletAddress,
    metadata: {
      action: 'unlinked',
    },
  })
}

/**
 * Notify user of a MOR credit claim
 */
export async function notifyMorClaim(
  userId: string,
  walletAddress: string,
  claimedCents: number,
  stakedMor: number
): Promise<void> {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  const claimedDollars = (claimedCents / 100).toFixed(2)
  
  await createNotification({
    userId,
    type: 'mor_claim',
    title: 'Credits Claimed',
    message: `You claimed $${claimedDollars} in credits from wallet ${shortAddress} (${stakedMor.toLocaleString()} MOR staked).`,
    walletAddress,
    metadata: {
      claimedCents,
      stakedMor,
    },
  })
}

/**
 * Notify user when a linked wallet is not staking
 */
export async function notifyWalletNotStaking(
  userId: string,
  walletAddress: string
): Promise<void> {
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
  
  await createNotification({
    userId,
    type: 'wallet_not_staking',
    title: 'Wallet Not Staking',
    message: `Your wallet ${shortAddress} is not staking MOR to our subnet. Stake MOR to earn credits.`,
    walletAddress,
    metadata: {
      action: 'not_staking_warning',
    },
  })
}

