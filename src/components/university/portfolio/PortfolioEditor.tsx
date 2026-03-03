/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect } from 'react'
import { usePortfolio } from '@/lib/hooks/usePortfolio'
import { Eye, EyeSlash, Gear, Link as LinkIcon } from '@phosphor-icons/react'
import { PortfolioView } from './PortfolioView'

interface PortfolioEditorProps {
  onBack: () => void
}

export function PortfolioEditor({ onBack }: PortfolioEditorProps) {
  const { portfolio, loading, error, updateSettings, isUpdating } =
    usePortfolio()

  const [isPublic, setIsPublic] = useState(false)
  const [username, setUsername] = useState('')
  const [headline, setHeadline] = useState('')
  const [bio, setBio] = useState('')
  const [showPeerReviews, setShowPeerReviews] = useState(true)
  const [showSkills, setShowSkills] = useState(true)
  const [showDegreeProgress, setShowDegreeProgress] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  // Populate form from fetched portfolio
  useEffect(() => {
    if (!portfolio?.settings) return
    const s = portfolio.settings
    setIsPublic(s.isPublic)
    setUsername(s.username || '')
    setHeadline(s.headline || '')
    setBio(s.bio || '')
    setShowPeerReviews(s.showPeerReviews)
    setShowSkills(s.showSkills)
    setShowDegreeProgress(s.showDegreeProgress)
  }, [portfolio])

  const handleSave = async () => {
    setSaveError(null)
    setSaved(false)

    if (!username.trim()) {
      setSaveError('Username is required')
      return
    }
    if (!/^[a-zA-Z0-9_-]{3,40}$/.test(username.trim())) {
      setSaveError(
        'Username must be 3-40 characters (letters, numbers, hyphens, underscores)'
      )
      return
    }

    try {
      await updateSettings({
        isPublic,
        username: username.trim(),
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        showPeerReviews,
        showSkills,
        showDegreeProgress,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setSaveError('Failed to save settings')
    }
  }

  const portfolioUrl = username
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/api/university/portfolio/public/${username.trim().toLowerCase()}`
    : null

  const handleCopyLink = () => {
    if (!portfolioUrl) return
    navigator.clipboard.writeText(portfolioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    )
  }

  if (showPreview && portfolio) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowPreview(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Back to Editor
          </button>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
            Preview
          </span>
        </div>
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
          <PortfolioView portfolio={portfolio} isOwner />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gear size={18} weight="bold" className="text-gray-700" />
          <h2 className="text-sm font-semibold text-gray-900">
            Portfolio Settings
          </h2>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Back
        </button>
      </div>

      {(error || saveError) && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error || saveError}
        </p>
      )}

      {/* Visibility Toggle */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPublic ? (
              <Eye size={16} className="text-gray-700" />
            ) : (
              <EyeSlash size={16} className="text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-900">
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsPublic(!isPublic)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              isPublic ? 'bg-gray-900' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                isPublic ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-[11px] text-gray-500">
          {isPublic
            ? 'Anyone with your portfolio link can view your projects and progress.'
            : 'Your portfolio is hidden. Toggle this on to share with others.'}
        </p>
      </div>

      {/* Username */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
        <label className="text-xs font-medium text-gray-700">
          Username (URL slug)
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="jane-doe"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        {username.trim() && (
          <div className="flex items-center gap-2">
            <p className="text-[11px] text-gray-400 truncate flex-1">
              portfolio/public/{username.trim().toLowerCase()}
            </p>
            {isPublic && portfolioUrl && (
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700"
              >
                <LinkIcon size={12} />
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Headline & Bio */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. Full-Stack Developer & Data Science Student"
            maxLength={120}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell visitors a bit about yourself..."
            maxLength={500}
            rows={3}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          />
          <p className="text-[10px] text-gray-400 text-right">
            {bio.length}/500
          </p>
        </div>
      </div>

      {/* Section Toggles */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
        <h3 className="text-xs font-medium text-gray-700">Visible Sections</h3>

        <ToggleRow
          label="Peer Review Scores"
          description="Show average review scores on each project"
          checked={showPeerReviews}
          onChange={setShowPeerReviews}
        />
        <ToggleRow
          label="Skills"
          description="Show aggregated skills and proficiency levels"
          checked={showSkills}
          onChange={setShowSkills}
        />
        <ToggleRow
          label="Degree Progress"
          description="Show year level, completed paths, and total XP"
          checked={showDegreeProgress}
          onChange={setShowDegreeProgress}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUpdating ? 'Saving...' : 'Save Settings'}
        </button>

        {portfolio && (
          <button
            onClick={() => setShowPreview(true)}
            className="border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium px-5 py-2 rounded-md transition-colors"
          >
            Preview Portfolio
          </button>
        )}

        {saved && (
          <span className="text-xs text-green-600">Saved successfully</span>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Internal toggle row component
// ---------------------------------------------------------------------------

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-gray-900">{label}</p>
        <p className="text-[11px] text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          checked ? 'bg-gray-900' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
