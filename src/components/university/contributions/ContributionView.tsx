'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  CircleNotch,
  GitFork,
  ArrowsClockwise,
  GithubLogo,
  ArrowSquareOut,
} from '@phosphor-icons/react'
import { useContributions } from '@/lib/hooks/useContributions'
import { useContributionSync } from '@/lib/hooks/useContributionSync'
import { useAuth } from '@/components/auth/ClientProvider'
import { ContributionBadge } from './ContributionBadge'
import { PRCard } from './PRCard'
import type { ContributionBadgeType } from '@/lib/types/university'

interface ContributionViewProps {
  onBack: () => void
}

export function ContributionView({ onBack }: ContributionViewProps) {
  const { user } = useAuth()
  const {
    connected,
    username,
    avatarUrl,
    prs,
    badges,
    loading,
    error,
    refetch,
  } = useContributions()
  const { sync, isSyncing, error: syncError } = useContributionSync(refetch)
  const [connectLoading, setConnectLoading] = useState(false)

  async function handleConnect() {
    if (!user) return
    setConnectLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/university/contributions/connect', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await response.json()
      if (json.success && json.data.authUrl) {
        window.location.href = json.data.authUrl
      }
    } catch {
      // Connection failed - user can retry
    } finally {
      setConnectLoading(false)
    }
  }

  const displayError = error || syncError

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <h2 className="text-lg font-bold text-gray-900 mb-3">Contributions</h2>

      <div className="mb-5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          Contribute to the Pitch Rise open source project on GitHub. Fork the
          repository, submit pull requests, and earn badges as your merged
          contributions grow. This builds real-world collaboration skills and
          demonstrates your ability to work on production codebases.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <CircleNotch size={24} className="text-gray-400 animate-spin" />
        </div>
      ) : displayError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {displayError}
        </div>
      ) : !connected ? (
        /* Not connected state */
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <GithubLogo
            size={36}
            weight="duotone"
            className="text-gray-400 mx-auto mb-3"
          />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Connect your GitHub account
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed mb-4">
            Link your GitHub account to track your pull request contributions to
            the Pitch Rise repository. Your PRs will be synced and count towards
            contributor badges.
          </p>
          <button
            onClick={handleConnect}
            disabled={connectLoading}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {connectLoading ? (
              <CircleNotch size={16} className="animate-spin" />
            ) : (
              <GithubLogo size={16} weight="bold" />
            )}
            Connect GitHub
          </button>
        </div>
      ) : (
        /* Connected state */
        <>
          {/* User header + sync */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt={username || 'GitHub avatar'}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-gray-200"
                  unoptimized
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">GitHub connected</p>
              </div>
            </div>
            <button
              onClick={sync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ArrowsClockwise
                size={14}
                className={isSyncing ? 'animate-spin' : ''}
              />
              {isSyncing ? 'Syncing...' : 'Sync'}
            </button>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-5">
              {badges.map((badge) => (
                <ContributionBadge
                  key={badge.id}
                  badgeType={badge.badgeType as ContributionBadgeType}
                />
              ))}
            </div>
          )}

          {/* Fork CTA when no PRs */}
          {prs.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center mb-5">
              <GitFork
                size={28}
                weight="duotone"
                className="text-gray-300 mx-auto mb-2"
              />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                No pull requests yet
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed mb-3">
                Fork the repository, make improvements, and submit a pull
                request. Click Sync after your PR is created to see it here.
              </p>
              <a
                href="https://github.com/ludwitt/pitch-rise/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <GitFork size={14} weight="bold" />
                Fork Repository
                <ArrowSquareOut size={12} className="text-gray-400" />
              </a>
            </div>
          )}

          {/* PR list */}
          {prs.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">
                {prs.length} pull request{prs.length !== 1 ? 's' : ''} &middot;{' '}
                {prs.filter((p) => p.merged).length} merged
              </p>
              {prs.map((pr) => (
                <PRCard key={pr.id} pr={pr} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
