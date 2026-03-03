/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

/**
 * MOR Staking Deposit Component
 *
 * Allows users to claim credits based on their MOR staking to our subnet.
 * Requires wallet connection and signature verification.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
import dynamic from 'next/dynamic'
import {
  Wallet,
  CircleNotch,
  CheckCircle,
  Warning,
  SignOut,
  Info,
  ArrowRight,
  Lightning,
} from '@phosphor-icons/react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'
import { createSignMessage } from '@/lib/web3/config'
import { MORPHEUS_CONFIG } from '@/lib/morpheus/types'

// Dynamically import Web3Modal button to avoid SSR issues
const Web3ModalButton = dynamic(
  () =>
    import('@/components/web3/Web3ModalButton').then(
      (mod) => mod.Web3ModalButton
    ),
  {
    ssr: false,
    loading: () => (
      <button
        className="b-btn b-btn-lg b-btn-logic w-full justify-center gap-3"
        disabled
      >
        <CircleNotch size={20} className="b-animate-spin" />
        Loading...
      </button>
    ),
  }
)

interface StakingInfo {
  hasLinkedWallets: boolean
  wallets: Array<{
    walletAddress: string
    isStaking: boolean
    stakedMor: number
    monthlyAllowanceCents: number
    claimedThisMonth: number
    availableToClaim: number
  }>
  totalStakedMor: number
  totalMonthlyAllowanceCents: number
  totalClaimedThisMonth: number
  totalAvailableToClaim: number
}

interface MorStakingDepositProps {
  onSuccess?: (claimedAmount: number) => void
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

export function MorStakingDeposit({ onSuccess }: MorStakingDepositProps) {
  const fetchApi = useApiFetch()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync, isPending: isSigning } = useSignMessage()

  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null)
  const [isLoadingStaking, setIsLoadingStaking] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimAmount, setClaimAmount] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{
    amount: number
    message: string
  } | null>(null)

  const loadStakingInfo = useCallback(async () => {
    try {
      setIsLoadingStaking(true)
      const info = await fetchApi<StakingInfo>('/api/credits/mor-deposit')
      setStakingInfo(info)
    } catch (err) {
      logger.error('MorStakingDeposit', 'Failed to load staking info', {
        error: err,
      })
    } finally {
      setIsLoadingStaking(false)
    }
  }, [fetchApi])

  // Load existing staking info on mount
  useEffect(() => {
    loadStakingInfo()
  }, [loadStakingInfo])

  // Check staking and claim for connected wallet
  const verifyAndCheckStaking = useCallback(async () => {
    if (!address) return

    setError(null)
    setIsVerifying(true)

    try {
      // Create timestamp for signature
      const timestamp = Date.now()
      const message = createSignMessage('claim_mor_credits', timestamp)

      // Request signature
      const signature = await signMessageAsync({ message })

      // Verify signature and get staking info from API
      await fetchApi<{
        success: boolean
        error?: string
        stakingInfo?: {
          isStaking: boolean
          stakedMor: number
          monthlyAllowanceCents: number
          availableToClaim: number
          claimedThisMonth: number
        }
      }>('/api/credits/mor-deposit', {
        method: 'POST',
        body: JSON.stringify({
          walletAddress: address,
          signature,
          timestamp,
          amountCents: 0, // Just checking, not claiming yet
        }),
      })

      // Reload staking info
      await loadStakingInfo()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify wallet')
    } finally {
      setIsVerifying(false)
    }
  }, [address, signMessageAsync, fetchApi, loadStakingInfo])

  // Claim credits
  const handleClaim = async () => {
    if (!address) return

    const amountCents = Math.round(parseFloat(claimAmount) * 100)
    if (isNaN(amountCents) || amountCents <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const availableForWallet =
      stakingInfo?.wallets.find(
        (w) => w.walletAddress.toLowerCase() === address.toLowerCase()
      )?.availableToClaim || 0

    if (amountCents > availableForWallet) {
      setError(`Maximum available: ${formatCents(availableForWallet)}`)
      return
    }

    setError(null)
    setSuccessData(null)
    setIsClaiming(true)

    try {
      // Create timestamp for signature
      const timestamp = Date.now()
      const message = createSignMessage('claim_mor_credits', timestamp)

      // Request signature
      const signature = await signMessageAsync({ message })

      // Submit claim
      const response = await fetchApi<{
        success: boolean
        error?: string
        newBalance?: number
        claim?: { claimedCents: number }
      }>('/api/credits/mor-deposit', {
        method: 'POST',
        body: JSON.stringify({
          walletAddress: address,
          signature,
          timestamp,
          amountCents,
        }),
      })

      if (response.success && response.claim) {
        const claimedCents = response.claim.claimedCents
        setSuccessData({
          amount: claimedCents,
          message: `Successfully claimed ${formatCents(claimedCents)}!`,
        })
        setClaimAmount('')
        await loadStakingInfo()

        // Auto-close after showing success for 2 seconds
        setTimeout(() => {
          onSuccess?.(claimedCents)
        }, 2000)
      } else {
        setError(response.error || 'Failed to claim credits')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim credits')
    } finally {
      setIsClaiming(false)
    }
  }

  // Find current wallet's staking info
  const currentWalletInfo = stakingInfo?.wallets.find(
    (w) => w.walletAddress.toLowerCase() === address?.toLowerCase()
  )

  // Show success screen if claim was successful
  if (successData) {
    return (
      <div className="space-y-6 py-8 text-center">
        <div className="w-20 h-20 b-bg-reading-light b-rounded-full flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle size={48} className="b-text-reading" weight="fill" />
        </div>
        <div>
          <h2 className="b-text-2xl b-font-bold b-text-primary b-mb-sm">
            Credits Added!
          </h2>
          <p className="b-text-3xl b-font-bold b-text-reading b-mb-md">
            +{formatCents(successData.amount)}
          </p>
          <p className="b-text-secondary">
            Your credits have been added to your account and are ready to use.
          </p>
        </div>
        <div className="b-bg-muted b-rounded-xl b-p-md">
          <p className="b-text-sm b-text-muted">
            <Lightning size={16} className="inline mr-1" weight="fill" />
            Closing automatically...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Info - Why Stake */}
      <div className="b-bg-logic-light b-rounded-xl b-p-lg">
        <div className="flex items-start gap-3">
          <Info
            size={20}
            className="b-text-logic flex-shrink-0 mt-0.5"
            weight="fill"
          />
          <div>
            <h3 className="b-font-semibold b-text-logic-dark b-mb-sm">
              Why Stake Instead of Pay?
            </h3>
            <ul className="b-text-sm b-text-logic-text space-y-2">
              <li className="flex items-start gap-2">
                <span className="b-text-logic font-bold">💰</span>
                <span>
                  <strong>Keep your capital</strong> — You&apos;re not spending
                  MOR, just staking it. Unstake anytime and get it all back.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="b-text-logic font-bold">🔄</span>
                <span>
                  <strong>Recurring value</strong> — Earn $1 in credits per MOR
                  every month, forever. 1,000 MOR = $12,000/year in credits.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="b-text-logic font-bold">📈</span>
                <span>
                  <strong>Potential upside</strong> — Your MOR may appreciate
                  while staked, so you benefit twice.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="b-text-logic font-bold">🌐</span>
                <span>
                  <strong>Support the ecosystem</strong> — Staking helps secure
                  and grow the Morpheus network.
                </span>
              </li>
            </ul>
            <a
              href={`https://dashboard.mor.org/builders/${MORPHEUS_CONFIG.SUBNET_NAME}?subnet_id=${MORPHEUS_CONFIG.SUBNET_ID}&network=Base`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 b-mt-md b-text-sm b-text-logic b-font-medium hover:underline"
            >
              Stake MOR on Morpheus Dashboard <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      {!isConnected ? (
        <div className="space-y-3">
          <p className="b-text-sm b-text-secondary text-center b-mb-md">
            Connect your wallet to check your staking status
          </p>

          <Web3ModalButton size="lg" className="w-full justify-center">
            Connect Wallet
          </Web3ModalButton>

          <p className="b-text-xs b-text-muted text-center">
            Supports MetaMask, WalletConnect, Coinbase Wallet, and more
          </p>
        </div>
      ) : (
        <>
          {/* Connected Wallet */}
          <div className="flex items-center justify-between b-bg-muted b-rounded-xl b-p-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 b-bg-logic-light b-rounded-full flex items-center justify-center">
                <Wallet size={20} className="b-text-logic" weight="fill" />
              </div>
              <div>
                <p className="b-text-sm b-text-muted">Connected Wallet</p>
                <p className="b-font-mono b-font-medium b-text-primary">
                  {shortenAddress(address!)}
                </p>
              </div>
            </div>
            <button
              onClick={() => disconnect()}
              className="b-btn b-btn-ghost b-btn-sm"
              title="Disconnect"
            >
              <SignOut size={18} />
            </button>
          </div>

          {/* Staking Status */}
          {isLoadingStaking || isVerifying ? (
            <div className="b-p-xl text-center">
              <CircleNotch
                size={32}
                className="b-animate-spin b-text-logic mx-auto b-mb-md"
              />
              <p className="b-text-muted">
                {isVerifying
                  ? 'Verifying wallet...'
                  : 'Loading staking info...'}
              </p>
            </div>
          ) : currentWalletInfo ? (
            <>
              {currentWalletInfo.isStaking ? (
                <>
                  {/* Staking Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="b-card b-p-md text-center">
                      <p className="b-text-xs b-text-muted b-mb-xs">
                        Staked MOR
                      </p>
                      <p className="b-text-xl b-font-bold b-text-primary">
                        {currentWalletInfo.stakedMor.toLocaleString()}
                      </p>
                    </div>
                    <div className="b-card b-p-md text-center">
                      <p className="b-text-xs b-text-muted b-mb-xs">
                        Monthly Allowance
                      </p>
                      <p className="b-text-xl b-font-bold b-text-logic">
                        {formatCents(currentWalletInfo.monthlyAllowanceCents)}
                      </p>
                    </div>
                    <div className="b-card b-p-md text-center">
                      <p className="b-text-xs b-text-muted b-mb-xs">
                        Claimed This Month
                      </p>
                      <p className="b-text-xl b-font-bold b-text-secondary">
                        {formatCents(currentWalletInfo.claimedThisMonth)}
                      </p>
                    </div>
                    <div className="b-card b-p-md text-center">
                      <p className="b-text-xs b-text-muted b-mb-xs">
                        Available to Claim
                      </p>
                      <p className="b-text-xl b-font-bold b-text-reading">
                        {formatCents(currentWalletInfo.availableToClaim)}
                      </p>
                    </div>
                  </div>

                  {/* Claim Form */}
                  {currentWalletInfo.availableToClaim > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block b-text-sm b-font-medium b-text-secondary b-mb-sm">
                          Amount to claim
                        </label>
                        <div className="flex items-center b-bg-muted b-border b-rounded-lg overflow-hidden">
                          <span className="pl-4 b-text-muted b-font-medium">
                            $
                          </span>
                          <input
                            type="number"
                            min="0.01"
                            max={currentWalletInfo.availableToClaim / 100}
                            step="0.01"
                            value={claimAmount}
                            onChange={(e) => setClaimAmount(e.target.value)}
                            placeholder={`Up to ${formatCents(currentWalletInfo.availableToClaim).replace('$', '')}`}
                            className="flex-1 py-3 px-2 bg-transparent outline-none b-text-primary"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setClaimAmount(
                                (
                                  currentWalletInfo.availableToClaim / 100
                                ).toString()
                              )
                            }
                            className="px-3 b-text-logic b-text-sm b-font-medium hover:underline"
                          >
                            Max
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleClaim}
                        disabled={isClaiming || isSigning || !claimAmount}
                        className="b-btn b-btn-lg b-btn-logic b-btn-full"
                      >
                        {isClaiming || isSigning ? (
                          <>
                            <CircleNotch size={18} className="b-animate-spin" />
                            {isSigning ? 'Sign to verify...' : 'Claiming...'}
                          </>
                        ) : (
                          <>
                            <Lightning size={18} weight="fill" />
                            Claim Credits
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="b-bg-muted b-rounded-xl b-p-lg text-center">
                      <CheckCircle
                        size={32}
                        className="b-text-reading mx-auto b-mb-sm"
                        weight="fill"
                      />
                      <p className="b-font-medium b-text-primary">
                        All credits claimed!
                      </p>
                      <p className="b-text-sm b-text-muted">
                        Your allowance resets on the 1st of next month.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Not Staking */
                <div className="b-bg-warning-light b-rounded-xl b-p-lg text-center">
                  <Warning
                    size={32}
                    className="b-text-warning mx-auto b-mb-sm"
                    weight="fill"
                  />
                  <p className="b-font-medium b-text-warning-dark b-mb-sm">
                    No stake found
                  </p>
                  <p className="b-text-sm b-text-warning-text b-mb-md">
                    This wallet is not staking MOR to our subnet.
                  </p>
                  <a
                    href={`https://dashboard.mor.org/builders/${MORPHEUS_CONFIG.SUBNET_NAME}?subnet_id=${MORPHEUS_CONFIG.SUBNET_ID}&network=Base`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="b-btn b-btn-warning"
                  >
                    Stake MOR Now
                  </a>
                </div>
              )}
            </>
          ) : (
            /* Need to verify wallet */
            <div className="text-center b-p-lg">
              <p className="b-text-secondary b-mb-md">
                Verify your wallet to check staking status
              </p>
              <button
                onClick={verifyAndCheckStaking}
                disabled={isVerifying || isSigning}
                className="b-btn b-btn-lg b-btn-logic"
              >
                {isVerifying || isSigning ? (
                  <>
                    <CircleNotch size={18} className="b-animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} weight="fill" />
                    Verify & Check Staking
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Error */}
      {error && (
        <div className="b-bg-danger-light b-border b-border-danger b-rounded-xl b-p-lg">
          <div className="flex items-start gap-3">
            <Warning
              size={20}
              className="b-text-danger flex-shrink-0 mt-0.5"
              weight="fill"
            />
            <div>
              <p className="b-font-medium b-text-danger-dark b-mb-xs">
                {error}
              </p>
              <p className="b-text-sm b-text-danger-text">
                If this issue persists, please contact us at{' '}
                <a
                  href={`mailto:support@ludwitt.com?subject=MOR Credit Claim Issue&body=Error: ${encodeURIComponent(error)}%0A%0AWallet: ${encodeURIComponent(address || 'Not connected')}%0A%0APlease describe what happened:`}
                  className="b-font-medium underline hover:no-underline"
                >
                  support@ludwitt.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Total from all wallets (if multiple) */}
      {stakingInfo && stakingInfo.wallets.length > 1 && (
        <div className="b-border-t b-pt-md">
          <p className="b-text-sm b-text-muted text-center">
            Total across {stakingInfo.wallets.length} wallets:{' '}
            <span className="b-font-semibold b-text-primary">
              {stakingInfo.totalStakedMor.toLocaleString()} MOR
            </span>
            {' • '}
            <span className="b-font-semibold b-text-logic">
              {formatCents(stakingInfo.totalAvailableToClaim)} available
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
