/**
 * useWalletDetection Hook
 *
 * Detects if the user has a crypto wallet extension installed in their browser.
 * Supports MetaMask, Coinbase Wallet, Trust Wallet, and other EIP-1193 providers.
 *
 * This is used to show crypto-native users information about:
 * - Decentralized AI powered by Morpheus
 * - Staking MOR to our subnet for credits
 * - Better value through decentralized infrastructure
 */

'use client'

import { useState, useEffect } from 'react'
import { logger } from '@/lib/logger'
import type { WindowWithEthereum } from '@/lib/types/common'

export interface WalletDetectionResult {
  /** Whether detection has completed */
  isLoading: boolean
  /** Whether any wallet extension is detected */
  hasWallet: boolean
  /** Whether MetaMask specifically is detected */
  isMetaMask: boolean
  /** Whether Coinbase Wallet is detected */
  isCoinbaseWallet: boolean
  /** Whether any other wallet is detected */
  isOtherWallet: boolean
  /** The detected wallet provider name (if identifiable) */
  walletName: string | null
  /** Whether multiple wallets are installed */
  hasMultipleWallets: boolean
}

/**
 * Detect crypto wallet extensions in the browser
 *
 * @returns Detection result with wallet information
 */
export function useWalletDetection(): WalletDetectionResult {
  const [result, setResult] = useState<WalletDetectionResult>({
    isLoading: true,
    hasWallet: false,
    isMetaMask: false,
    isCoinbaseWallet: false,
    isOtherWallet: false,
    walletName: null,
    hasMultipleWallets: false,
  })

  useEffect(() => {
    // Run detection after a short delay to ensure wallet extensions have injected
    const detectWallet = () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
          setResult((prev) => ({ ...prev, isLoading: false }))
          return
        }

        // Check for ethereum provider (EIP-1193)
        const ethereum = (window as unknown as WindowWithEthereum).ethereum

        if (!ethereum) {
          setResult((prev) => ({ ...prev, isLoading: false, hasWallet: false }))
          return
        }

        // Wallet is detected
        let isMetaMask = false
        let isCoinbaseWallet = false
        let isOtherWallet = false
        let walletName: string | null = null
        let hasMultipleWallets = false

        // Check for specific wallets
        // MetaMask
        if (ethereum.isMetaMask) {
          isMetaMask = true
          walletName = 'MetaMask'
        }

        // Coinbase Wallet
        if (ethereum.isCoinbaseWallet || ethereum.isCoinbaseBrowser) {
          isCoinbaseWallet = true
          walletName = walletName
            ? `${walletName}, Coinbase Wallet`
            : 'Coinbase Wallet'
          if (isMetaMask) hasMultipleWallets = true
        }

        // Trust Wallet
        if (ethereum.isTrust || ethereum.isTrustWallet) {
          isOtherWallet = true
          walletName = walletName
            ? `${walletName}, Trust Wallet`
            : 'Trust Wallet'
          if (isMetaMask || isCoinbaseWallet) hasMultipleWallets = true
        }

        // Rabby
        if (ethereum.isRabby) {
          isOtherWallet = true
          walletName = walletName ? `${walletName}, Rabby` : 'Rabby'
          hasMultipleWallets = true
        }

        // Rainbow
        if (ethereum.isRainbow) {
          isOtherWallet = true
          walletName = walletName ? `${walletName}, Rainbow` : 'Rainbow'
          hasMultipleWallets = true
        }

        // Brave Wallet
        if (ethereum.isBraveWallet) {
          isOtherWallet = true
          walletName = walletName
            ? `${walletName}, Brave Wallet`
            : 'Brave Wallet'
          hasMultipleWallets = true
        }

        // Check for multiple providers (EIP-6963)
        if (ethereum.providers && Array.isArray(ethereum.providers)) {
          hasMultipleWallets = ethereum.providers.length > 1
        }

        // If ethereum exists but no specific wallet identified, it's still a wallet
        if (!isMetaMask && !isCoinbaseWallet && !isOtherWallet) {
          isOtherWallet = true
          walletName = 'Web3 Wallet'
        }

        setResult({
          isLoading: false,
          hasWallet: true,
          isMetaMask,
          isCoinbaseWallet,
          isOtherWallet,
          walletName,
          hasMultipleWallets,
        })
      } catch (error) {
        logger.error('Usewalletdetection', 'Error detecting wallet', {
          error: error,
        })
        setResult((prev) => ({ ...prev, isLoading: false, hasWallet: false }))
      }
    }

    // Small delay to ensure wallet extensions have initialized
    const timeoutId = setTimeout(detectWallet, 100)

    return () => clearTimeout(timeoutId)
  }, [])

  return result
}

/**
 * Simple check for any wallet (no React hook)
 * Use this for server-side rendering guards
 */
export function hasEthereumProvider(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window as unknown as WindowWithEthereum).ethereum
}
