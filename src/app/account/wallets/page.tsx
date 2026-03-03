'use client'

/**
 * Wallet Management Page
 * 
 * Allows users to:
 * - View all linked wallets
 * - Connect new wallets
 * - Unlink wallets
 * - See staking status and credit allowances
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
import { WalletProvider } from '@/components/web3/WalletProvider'
import { createSignMessage } from '@/lib/web3/config'
import { MORPHEUS_CONFIG } from '@/lib/morpheus/types'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Wallet,
  Plus,
  Trash,
  CheckCircle,
  Warning,
  CircleNotch,
  CaretLeft,
  ArrowsClockwise,
  CurrencyCircleDollar,
  Link as LinkIcon,
  Copy,
  Check,
  ArrowSquareOut,
} from '@phosphor-icons/react'

// Dynamically import Web3Modal button to avoid SSR issues
const Web3ModalButton = dynamic(
  () => import('@/components/web3/Web3ModalButton').then(mod => mod.Web3ModalButton),
  { 
    ssr: false,
    loading: () => (
      <button className="b-btn b-btn-sm b-btn-logic" disabled>
        <CircleNotch size={16} className="b-animate-spin" />
        Loading...
      </button>
    )
  }
)

interface LinkedWallet {
  address: string
  linkedAt: string
  lastVerifiedAt: string
  isStaking: boolean
  stakedMor: number
  monthlyAllowanceCents: number
  claimedThisMonth: number
  availableToClaim: number
}

interface WalletsData {
  wallets: LinkedWallet[]
  totalStakedMor: number
  totalMonthlyAllowanceCents: number
  totalAvailableToClaim: number
  totalClaimedThisMonth: number
}

function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function WalletManagementContent() {
  const { user } = useAuth()
  const router = useRouter()
  const fetchApi = useApiFetch()
  
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync, isPending: isSigning } = useSignMessage()

  const [walletsData, setWalletsData] = useState<WalletsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLinking, setIsLinking] = useState(false)
  const [unlinkingAddress, setUnlinkingAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const loadWallets = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchApi<WalletsData>('/api/wallets')
      setWalletsData(data)
    } catch (err) {
      setError('Failed to load wallets')
    } finally {
      setIsLoading(false)
    }
  }, [fetchApi])

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    loadWallets()
  }, [user, router, loadWallets])

  // Check if connected wallet is already linked
  const isWalletAlreadyLinked = useCallback(() => {
    if (!address || !walletsData) return false
    return walletsData.wallets.some(
      w => w.address.toLowerCase() === address.toLowerCase()
    )
  }, [address, walletsData])

  const handleLinkWallet = useCallback(async () => {
    if (!address) return

    // Check if already linked before proceeding
    if (isWalletAlreadyLinked()) {
      setError(`This wallet is already linked to your account`)
      disconnect()
      return
    }

    setError(null)
    setSuccess(null)
    setIsLinking(true)

    try {
      const timestamp = Date.now()
      const message = createSignMessage('link_wallet', timestamp)
      const signature = await signMessageAsync({ message })

      await fetchApi('/api/wallets', {
        method: 'POST',
        body: JSON.stringify({
          walletAddress: address,
          signature,
          timestamp,
        }),
      })

      setSuccess(`Wallet ${shortenAddress(address)} linked successfully!`)
      disconnect()
      await loadWallets()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to link wallet')
    } finally {
      setIsLinking(false)
    }
  }, [address, signMessageAsync, fetchApi, disconnect, isWalletAlreadyLinked, loadWallets])

  const handleUnlinkWallet = async (walletAddress: string) => {
    if (!confirm(`Are you sure you want to unlink ${shortenAddress(walletAddress)}? You will no longer be able to claim credits from this wallet.`)) {
      return
    }

    setUnlinkingAddress(walletAddress)
    setError(null)
    setSuccess(null)

    try {
      await fetchApi(`/api/wallets?address=${encodeURIComponent(walletAddress)}`, {
        method: 'DELETE',
      })

      setSuccess(`Wallet ${shortenAddress(walletAddress)} unlinked`)
      await loadWallets()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlink wallet')
    } finally {
      setUnlinkingAddress(null)
    }
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  if (!user) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <CircleNotch size={32} className="b-animate-spin b-text-logic" />
      </div>
    )
  }

  return (
    <div className="min-h-screen b-bg-page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/account/credits"
          className="inline-flex items-center gap-2 b-text-secondary hover:b-text-primary b-mb-lg transition-colors"
        >
          <CaretLeft size={16} weight="bold" />
          Back to Credits
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between b-mb-xl">
          <div>
            <h1 className="b-text-3xl b-font-bold b-text-primary b-mb-sm">Linked Wallets</h1>
            <p className="b-text-secondary">Manage your connected wallets for MOR staking credits</p>
          </div>
          <button
            onClick={loadWallets}
            className="b-btn b-btn-ghost b-btn-icon"
            title="Refresh"
          >
            <ArrowsClockwise size={20} weight="bold" />
          </button>
        </div>

        {/* Summary Card */}
        {walletsData && walletsData.wallets.length > 0 && (
          <div className="b-card b-card-elevated b-p-xl b-mb-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="b-text-xs b-text-muted b-mb-xs">Total Staked</p>
                <p className="b-text-2xl b-font-bold b-text-primary">
                  {walletsData.totalStakedMor.toLocaleString()} MOR
                </p>
              </div>
              <div>
                <p className="b-text-xs b-text-muted b-mb-xs">Monthly Allowance</p>
                <p className="b-text-2xl b-font-bold b-text-logic">
                  {formatCents(walletsData.totalMonthlyAllowanceCents)}
                </p>
              </div>
              <div>
                <p className="b-text-xs b-text-muted b-mb-xs">Claimed This Month</p>
                <p className="b-text-2xl b-font-bold b-text-secondary">
                  {formatCents(walletsData.totalClaimedThisMonth)}
                </p>
              </div>
              <div>
                <p className="b-text-xs b-text-muted b-mb-xs">Available to Claim</p>
                <p className="b-text-2xl b-font-bold b-text-reading">
                  {formatCents(walletsData.totalAvailableToClaim)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="b-bg-danger-light b-border b-border-danger b-rounded-xl b-p-lg b-mb-lg">
            <div className="flex items-center gap-3">
              <Warning size={20} className="b-text-danger" weight="fill" />
              <p className="b-text-danger-dark">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="b-bg-reading-light b-border b-border-reading b-rounded-xl b-p-lg b-mb-lg">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="b-text-reading" weight="fill" />
              <p className="b-text-reading-dark">{success}</p>
            </div>
          </div>
        )}

        {/* Wallets List */}
        <div className="b-card overflow-hidden b-mb-lg">
          <div className="b-p-lg b-border-b flex items-center justify-between">
            <h2 className="b-text-lg b-font-semibold b-text-primary">Your Wallets</h2>
            <Web3ModalButton size="sm">
              <Plus size={16} weight="bold" />
              Add Wallet
            </Web3ModalButton>
          </div>

          {/* Connect New Wallet - Shows when wallet is connected but not linked */}
          {isConnected && (
            <div className="b-p-lg b-bg-logic-light b-border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 b-bg-logic b-rounded-full flex items-center justify-center">
                    <Wallet size={20} className="text-white" weight="fill" />
                  </div>
                  <div>
                    <p className="b-font-mono b-font-medium b-text-primary">
                      {shortenAddress(address!)}
                    </p>
                    <p className="b-text-xs b-text-muted">Ready to link</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => disconnect()}
                    className="b-btn b-btn-ghost b-btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLinkWallet}
                    disabled={isLinking || isSigning}
                    className="b-btn b-btn-sm b-btn-logic"
                  >
                    {isLinking || isSigning ? (
                      <>
                        <CircleNotch size={16} className="b-animate-spin" />
                        {isSigning ? 'Sign message...' : 'Linking...'}
                      </>
                    ) : (
                      <>
                        <LinkIcon size={16} weight="bold" />
                        Link Wallet
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wallet List */}
          {isLoading ? (
            <div className="b-p-xl text-center">
              <CircleNotch size={32} className="b-animate-spin b-text-logic mx-auto b-mb-md" />
              <p className="b-text-muted">Loading wallets...</p>
            </div>
          ) : walletsData?.wallets.length === 0 ? (
            <div className="b-p-xl text-center">
              <div className="w-16 h-16 b-bg-muted b-rounded-full flex items-center justify-center mx-auto b-mb-md">
                <Wallet size={32} className="b-text-muted" />
              </div>
              <p className="b-text-secondary b-mb-sm">No wallets linked</p>
              <p className="b-text-sm b-text-muted">
                Connect a wallet to start claiming MOR staking credits
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--b-border-light)' }}>
              {walletsData?.wallets.map((wallet) => (
                <div key={wallet.address} className="b-p-lg hover:b-bg-muted transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Wallet Icon */}
                      <div className={`w-12 h-12 b-rounded-full flex items-center justify-center flex-shrink-0 ${
                        wallet.isStaking ? 'b-bg-logic-light' : 'b-bg-muted'
                      }`}>
                        <Wallet 
                          size={24} 
                          weight="fill" 
                          className={wallet.isStaking ? 'b-text-logic' : 'b-text-muted'} 
                        />
                      </div>

                      {/* Wallet Info */}
                      <div>
                        <div className="flex items-center gap-2 b-mb-xs">
                          <p className="b-font-mono b-font-medium b-text-primary">
                            {shortenAddress(wallet.address)}
                          </p>
                          <button
                            onClick={() => copyAddress(wallet.address)}
                            className="b-text-muted hover:b-text-primary transition-colors"
                            title="Copy address"
                          >
                            {copiedAddress === wallet.address ? (
                              <Check size={14} weight="bold" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                          <a
                            href={`https://basescan.org/address/${wallet.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="b-text-muted hover:b-text-primary transition-colors"
                            title="View on BaseScan"
                          >
                            <ArrowSquareOut size={14} />
                          </a>
                        </div>

                        {wallet.isStaking ? (
                          <div className="flex flex-wrap items-center gap-3 b-text-sm">
                            <span className="b-badge b-badge-logic">
                              {wallet.stakedMor.toLocaleString()} MOR
                            </span>
                            <span className="b-text-muted">
                              {formatCents(wallet.monthlyAllowanceCents)}/mo
                            </span>
                            <span className="b-text-reading">
                              {formatCents(wallet.availableToClaim)} available
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="b-badge b-badge-default">Not staking</span>
                            <a
                              href={`https://dashboard.mor.org/builders/${MORPHEUS_CONFIG.SUBNET_NAME}?subnet_id=${MORPHEUS_CONFIG.SUBNET_ID}&network=Base`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="b-text-sm b-text-logic hover:underline"
                            >
                              Stake MOR →
                            </a>
                          </div>
                        )}

                        <p className="b-text-xs b-text-muted b-mt-sm">
                          Linked {formatDate(wallet.linkedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      onClick={() => handleUnlinkWallet(wallet.address)}
                      disabled={unlinkingAddress === wallet.address}
                      className="b-btn b-btn-ghost b-btn-sm b-text-danger hover:b-bg-danger-light"
                      title="Unlink wallet"
                    >
                      {unlinkingAddress === wallet.address ? (
                        <CircleNotch size={16} className="b-animate-spin" />
                      ) : (
                        <Trash size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Stake Card */}
        <div className="b-bg-logic-light b-border b-border-logic b-rounded-xl b-p-lg b-mb-lg">
          <div className="flex items-start gap-3">
            <CurrencyCircleDollar size={24} className="b-text-logic flex-shrink-0" weight="fill" />
            <div>
              <h3 className="b-font-semibold b-text-logic-dark b-mb-sm">Why Stake MOR Instead of Paying Cash?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 b-mb-md">
                <div className="b-bg-surface b-rounded-lg b-p-md">
                  <p className="b-font-semibold b-text-primary b-mb-xs">💰 Keep Your Capital</p>
                  <p className="b-text-sm b-text-secondary">
                    You&apos;re not spending MOR — you&apos;re staking it. Unstake anytime and get 100% back.
                  </p>
                </div>
                <div className="b-bg-surface b-rounded-lg b-p-md">
                  <p className="b-font-semibold b-text-primary b-mb-xs">🔄 Earn Monthly Forever</p>
                  <p className="b-text-sm b-text-secondary">
                    $1 in credits per MOR per month. 1,000 MOR = $12,000/year in credits.
                  </p>
                </div>
                <div className="b-bg-surface b-rounded-lg b-p-md">
                  <p className="b-font-semibold b-text-primary b-mb-xs">📈 Double Upside</p>
                  <p className="b-text-sm b-text-secondary">
                    Your MOR may appreciate while staked. Earn credits AND potential price gains.
                  </p>
                </div>
                <div className="b-bg-surface b-rounded-lg b-p-md">
                  <p className="b-font-semibold b-text-primary b-mb-xs">🌐 Support Morpheus</p>
                  <p className="b-text-sm b-text-secondary">
                    Your stake helps secure and grow the Morpheus AI network.
                  </p>
                </div>
              </div>
              <div className="b-bg-surface b-rounded-lg b-p-md">
                <p className="b-text-sm b-text-secondary">
                  <strong className="b-text-primary">Example:</strong> Instead of paying $100/month for credits, stake 100 MOR once. 
                  You&apos;ll earn $100/month in credits indefinitely, and you can unstake your MOR anytime. 
                  After just one month, you&apos;ve already broken even compared to cash payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Card */}
        <div className="b-card b-p-lg">
          <h3 className="b-font-semibold b-text-primary b-mb-md">How It Works</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-start gap-3">
              <div className="w-8 h-8 b-bg-logic b-rounded-full flex items-center justify-center text-white b-font-bold flex-shrink-0">1</div>
              <div>
                <p className="b-font-medium b-text-primary">Stake MOR</p>
                <p className="b-text-sm b-text-secondary">
                  <a
                    href={`https://dashboard.mor.org/builders/${MORPHEUS_CONFIG.SUBNET_NAME}?subnet_id=${MORPHEUS_CONFIG.SUBNET_ID}&network=Base`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="b-text-logic hover:underline"
                  >
                    Stake on Morpheus →
                  </a>
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-start gap-3">
              <div className="w-8 h-8 b-bg-logic b-rounded-full flex items-center justify-center text-white b-font-bold flex-shrink-0">2</div>
              <div>
                <p className="b-font-medium b-text-primary">Link Wallet</p>
                <p className="b-text-sm b-text-secondary">Connect your wallet above</p>
              </div>
            </div>
            <div className="flex-1 flex items-start gap-3">
              <div className="w-8 h-8 b-bg-logic b-rounded-full flex items-center justify-center text-white b-font-bold flex-shrink-0">3</div>
              <div>
                <p className="b-font-medium b-text-primary">Claim Credits</p>
                <p className="b-text-sm b-text-secondary">Claim monthly from Credits page</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WalletsPage() {
  return (
    <WalletProvider>
      <WalletManagementContent />
    </WalletProvider>
  )
}
