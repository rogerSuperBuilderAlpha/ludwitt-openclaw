'use client'

import { GitMerge, GitPullRequest, XCircle, ArrowSquareOut } from '@phosphor-icons/react'
import type { ContributionPR } from '@/lib/types/university'

interface PRCardProps {
  pr: ContributionPR
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PRCard({ pr }: PRCardProps) {
  const stateConfig = pr.merged
    ? { label: 'Merged', color: 'bg-green-100 text-green-700', icon: GitMerge }
    : pr.state === 'open'
      ? { label: 'Open', color: 'bg-purple-100 text-purple-700', icon: GitPullRequest }
      : { label: 'Closed', color: 'bg-gray-100 text-gray-500', icon: XCircle }

  const StateIcon = stateConfig.icon

  return (
    <a
      href={pr.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {pr.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            #{pr.prNumber} opened {formatDate(pr.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${stateConfig.color}`}>
            <StateIcon size={12} weight="bold" />
            {stateConfig.label}
          </span>
          <ArrowSquareOut size={14} className="text-gray-400" />
        </div>
      </div>
    </a>
  )
}
