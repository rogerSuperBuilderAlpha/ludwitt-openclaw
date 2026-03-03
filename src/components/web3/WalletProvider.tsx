/* eslint-disable no-console */
'use client'

/**
 * Wallet Provider
 *
 * Wraps the application with wagmi, react-query, and Web3Modal providers
 * for Web3 wallet functionality.
 *
 * NOTE: This component must only be rendered on the client side to avoid
 * SSR issues with IndexedDB and Web3Modal initialization.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { useState, useEffect, type ReactNode } from 'react'
import {
  WALLET_CONNECT_PROJECT_ID,
  walletConnectMetadata,
} from '@/lib/web3/config'
import { injected, coinbaseWallet } from 'wagmi/connectors'

// Project configuration
const projectId = WALLET_CONNECT_PROJECT_ID
const chains = [base] as const

// Create a minimal wagmi config without WalletConnect at module level
// WalletConnect uses IndexedDB which is not available during SSR
// We'll add it dynamically on the client side via Web3Modal
const wagmiConfig = createConfig({
  chains,
  connectors: [
    injected(),
    coinbaseWallet({
      appName: walletConnectMetadata.name,
      appLogoUrl: walletConnectMetadata.icons[0],
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true, // Enable SSR mode to avoid hydration mismatches
})

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isClient, setIsClient] = useState(false)
  const [web3ModalInitialized, setWeb3ModalInitialized] = useState(false)

  // Create a stable QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  // Only render on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Lazy-initialize Web3Modal only on client side
  useEffect(() => {
    if (!isClient || web3ModalInitialized) return

    // Dynamic import to avoid SSR issues with IndexedDB
    import('@web3modal/wagmi/react')
      .then(({ createWeb3Modal }) => {
        createWeb3Modal({
          wagmiConfig,
          projectId,
          themeMode: 'light',
          themeVariables: {
            '--w3m-z-index': 999999,
          },
          enableAnalytics: false,
          enableOnramp: false,
          defaultChain: base,
          allowUnsupportedChain: true,
        })
        setWeb3ModalInitialized(true)
      })
      .catch(console.error)
  }, [isClient, web3ModalInitialized])

  // Don't render anything during SSR
  if (!isClient) {
    return null
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

// Re-export the wagmi config for use in other components
export { wagmiConfig }
