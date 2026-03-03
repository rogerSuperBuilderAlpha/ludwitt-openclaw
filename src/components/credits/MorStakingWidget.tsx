'use client'

/**
 * MOR Staking Widget
 *
 * A compact widget that shows MOR staking status and quick claim button.
 * Designed for embedding in dashboards.
 */

import { useState, useEffect, useCallback } from 'react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  Wallet,
  CurrencyCircleDollar,
  ArrowRight,
  CircleNotch,
  Lightning,
} from '@phosphor-icons/react'
import Link from 'next/link'

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

function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

interface MorStakingWidgetProps {
  /** Compact mode for smaller spaces */
  compact?: boolean
  /** Callback when credits are claimed */
  onClaimClick?: () => void
}

export function MorStakingWidget({
  compact = false,
  onClaimClick,
}: MorStakingWidgetProps) {
  const fetchApi = useApiFetch()
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStakingInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const info = await fetchApi<StakingInfo>('/api/credits/mor-deposit')
      setStakingInfo(info)
    } catch (err) {
      setError('Failed to load staking info')
    } finally {
      setIsLoading(false)
    }
  }, [fetchApi])

  useEffect(() => {
    loadStakingInfo()
  }, [loadStakingInfo])

  if (isLoading) {
    return (
      <div className={`b-card ${compact ? 'b-p-md' : 'b-p-lg'}`}>
        <div className="flex items-center justify-center gap-2 b-text-muted">
          <CircleNotch size={16} className="b-animate-spin" />
          <span className="b-text-sm">Loading staking info...</span>
        </div>
      </div>
    )
  }

  if (error || !stakingInfo) {
    return null // Hide widget on error
  }

  // No wallets linked - show CTA
  if (!stakingInfo.hasLinkedWallets) {
    return (
      <div
        className={`b-card b-bg-logic-light b-border-logic ${compact ? 'b-p-md' : 'b-p-lg'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 b-bg-logic b-rounded-full flex items-center justify-center flex-shrink-0">
              <Wallet size={20} className="text-white" weight="fill" />
            </div>
            <div>
              <p className="b-font-medium b-text-logic-dark">
                Stop Paying — Start Staking
              </p>
              <p className="b-text-sm b-text-logic-text">
                Stake MOR once, earn credits forever. Keep your tokens.
              </p>
            </div>
          </div>
          <Link
            href="/account/wallets"
            className="b-btn b-btn-sm b-btn-logic flex-shrink-0"
          >
            Learn More
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  // Has wallets but no staking
  if (stakingInfo.totalStakedMor === 0) {
    return (
      <div
        className={`b-card b-bg-warning-light b-border-warning ${compact ? 'b-p-md' : 'b-p-lg'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 b-bg-warning b-rounded-full flex items-center justify-center">
              <Wallet size={20} className="text-white" weight="fill" />
            </div>
            <div>
              <p className="b-font-medium b-text-warning-dark">No MOR Staked</p>
              <p className="b-text-sm b-text-warning-text">
                {stakingInfo.wallets.length} wallet
                {stakingInfo.wallets.length !== 1 ? 's' : ''} linked
              </p>
            </div>
          </div>
          <Link
            href="/account/wallets"
            className="b-btn b-btn-sm b-btn-warning"
          >
            Manage Wallets
          </Link>
        </div>
      </div>
    )
  }

  // Has staking - show status
  return (
    <div className={`b-card ${compact ? 'b-p-md' : 'b-p-lg'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 b-bg-logic-light b-rounded-full flex items-center justify-center">
            <CurrencyCircleDollar
              size={20}
              className="b-text-logic"
              weight="fill"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="b-font-bold b-text-primary">
                {stakingInfo.totalStakedMor.toLocaleString()} MOR
              </p>
              <span className="b-text-muted">staked</span>
            </div>
            <div className="flex items-center gap-2 b-text-sm">
              {stakingInfo.totalAvailableToClaim > 0 ? (
                <span className="b-text-reading b-font-medium">
                  {formatCents(stakingInfo.totalAvailableToClaim)} available
                </span>
              ) : (
                <span className="b-text-muted">
                  {formatCents(stakingInfo.totalClaimedThisMonth)} claimed this
                  month
                </span>
              )}
            </div>
          </div>
        </div>

        {stakingInfo.totalAvailableToClaim > 0 ? (
          <Link
            href="/account/credits"
            onClick={onClaimClick}
            className="b-btn b-btn-sm b-btn-logic"
          >
            <Lightning size={14} weight="fill" />
            Claim
          </Link>
        ) : (
          <Link href="/account/wallets" className="b-btn b-btn-sm b-btn-ghost">
            Manage
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  )
}
