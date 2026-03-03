/**
 * Signature Verification Utilities
 * 
 * Server-side utilities for verifying wallet signatures
 */

import { verifyMessage } from 'viem'
import { createSignMessage, isSignatureTimestampValid } from './config'
import { logger } from '@/lib/logger'

export interface SignatureVerificationResult {
  valid: boolean
  error?: string
  walletAddress?: string
}

/**
 * Verify a wallet signature on the server
 * 
 * @param walletAddress - The claimed wallet address
 * @param signature - The signature from the wallet
 * @param action - The action being verified (e.g., "claim_mor_credits")
 * @param timestamp - The timestamp that was included in the signed message
 * @returns Verification result
 */
export async function verifyWalletSignature(
  walletAddress: string,
  signature: `0x${string}`,
  action: string,
  timestamp: number
): Promise<SignatureVerificationResult> {
  try {
    // Check timestamp is recent
    if (!isSignatureTimestampValid(timestamp)) {
      return {
        valid: false,
        error: 'Signature has expired. Please sign again.',
      }
    }
    
    // Recreate the message that should have been signed
    const message = createSignMessage(action, timestamp)
    
    // Verify the signature
    const isValid = await verifyMessage({
      address: walletAddress as `0x${string}`,
      message,
      signature,
    })
    
    if (!isValid) {
      return {
        valid: false,
        error: 'Invalid signature. Please try again.',
      }
    }
    
    return {
      valid: true,
      walletAddress: walletAddress.toLowerCase(),
    }
  } catch (error) {
    logger.error('SignatureVerification', 'Signature verification error', { error })
    return {
      valid: false,
      error: 'Failed to verify signature.',
    }
  }
}

