/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Certificate,
  Medal,
  Star,
  GraduationCap,
  ShareNetwork,
  Eye,
} from '@phosphor-icons/react'
import { useCredentials } from '@/lib/hooks/useCredentials'
import type { CredentialType, DigitalCredential } from '@/lib/types/university'

interface CredentialsListProps {
  onBack: () => void
  onViewCredential: (id: string) => void
}

const TYPE_CONFIG: Record<
  CredentialType,
  { label: string; color: string; icon: typeof Certificate }
> = {
  'path-completion': {
    label: 'Path Completion',
    color: 'bg-blue-100 text-blue-700',
    icon: Certificate,
  },
  'year-milestone': {
    label: 'Year Milestone',
    color: 'bg-purple-100 text-purple-700',
    icon: Medal,
  },
  'skill-certification': {
    label: 'Skill Certification',
    color: 'bg-green-100 text-green-700',
    icon: Star,
  },
  degree: {
    label: 'Degree',
    color: 'bg-amber-100 text-amber-700',
    icon: GraduationCap,
  },
}

function CredentialCard({
  credential,
  onView,
}: {
  credential: DigitalCredential
  onView: () => void
}) {
  const config = TYPE_CONFIG[credential.type]
  const Icon = config.icon

  function handleShare() {
    const url = `${window.location.origin}${credential.verificationUrl}`
    if (navigator.share) {
      navigator.share({ title: credential.title, url })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Icon size={18} weight="bold" className="text-gray-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {credential.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {credential.description}
            </p>
          </div>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${config.color}`}
        >
          {config.label}
        </span>
      </div>

      {/* Skills */}
      {credential.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {credential.skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
          {credential.skills.length > 6 && (
            <span className="text-[10px] text-gray-400">
              +{credential.skills.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* Signatures */}
      {credential.professorSignatures.length > 0 && (
        <p className="text-[10px] text-gray-400 mt-2">
          Signed by{' '}
          {credential.professorSignatures
            .map((s) => s.professorName)
            .join(', ')}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-[10px] text-gray-400">
          Issued {new Date(credential.issuedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ShareNetwork size={12} />
            Share
          </button>
          <button
            onClick={onView}
            className="flex items-center gap-1 text-[10px] text-gray-900 font-medium hover:text-gray-700 transition-colors"
          >
            <Eye size={12} />
            View
          </button>
        </div>
      </div>
    </div>
  )
}

export function CredentialsList({
  onBack,
  onViewCredential,
}: CredentialsListProps) {
  const { credentials, loading, error, issueCredential, isIssuing } =
    useCredentials()
  const [issueType, setIssueType] = useState<CredentialType | ''>('')
  const [issuePathId, setIssuePathId] = useState('')
  const [showIssueForm, setShowIssueForm] = useState(false)

  async function handleIssue() {
    if (!issueType) return
    await issueCredential({
      type: issueType as CredentialType,
      pathId:
        issueType === 'path-completion' ? issuePathId || undefined : undefined,
    })
    setShowIssueForm(false)
    setIssueType('')
    setIssuePathId('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">
            Digital Credentials
          </h1>
          <p className="text-xs text-gray-500">
            Verifiable certificates for your achievements
          </p>
        </div>
        <button
          onClick={() => setShowIssueForm(!showIssueForm)}
          className="text-xs font-medium bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Issue Credential
        </button>
      </div>

      {/* Issue Form */}
      {showIssueForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
          <h3 className="text-xs font-semibold text-gray-900 mb-3">
            Issue a New Credential
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Type</label>
              <select
                value={issueType}
                onChange={(e) =>
                  setIssueType(e.target.value as CredentialType | '')
                }
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="">Select type...</option>
                <option value="path-completion">Path Completion</option>
                <option value="year-milestone">Year Milestone</option>
                <option value="skill-certification">Skill Certification</option>
                <option value="degree">Degree</option>
              </select>
            </div>
            {issueType === 'path-completion' && (
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Learning Path ID
                </label>
                <input
                  type="text"
                  value={issuePathId}
                  onChange={(e) => setIssuePathId(e.target.value)}
                  placeholder="Enter the path ID"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={handleIssue}
                disabled={!issueType || isIssuing}
                className="text-xs font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isIssuing ? 'Issuing...' : 'Issue'}
              </button>
              <button
                onClick={() => setShowIssueForm(false)}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && !showIssueForm && (
        <div className="text-center py-12">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && credentials.length === 0 && (
        <div className="text-center py-16">
          <Certificate
            size={36}
            weight="duotone"
            className="text-gray-300 mx-auto mb-3"
          />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No credentials yet
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            Complete learning paths, reach milestones, or master skills to earn
            verifiable digital credentials.
          </p>
        </div>
      )}

      {/* Credentials list */}
      {!loading && credentials.length > 0 && (
        <div className="space-y-3">
          {credentials.map((credential) => (
            <CredentialCard
              key={credential.id}
              credential={credential}
              onView={() => onViewCredential(credential.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
