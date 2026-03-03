/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */
'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Lock, Check, Lightning, Pi } from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  ProgressionGatesStatus,
  GateStatus,
} from '@/lib/progression/types'

type TargetSection = 'alc' | 'developers' | 'university'

interface ProgressionGatePageProps {
  targetSection: TargetSection
  progression: ProgressionGatesStatus
}

const SECTION_META: Record<
  TargetSection,
  { label: string; description: string }
> = {
  alc: {
    label: 'ALC',
    description:
      'The Accelerated Learning Center unlocks project-based learning, AI tools, and advanced challenges.',
  },
  developers: {
    label: 'Developer Portal',
    description:
      'The Developer Portal gives you access to real client projects, deployment tools, and professional workflows.',
  },
  university: {
    label: 'University',
    description:
      'University-level coursework with research projects and advanced specializations.',
  },
}

const TIMELINE_STAGES = ['Basics', 'ALC', 'Developers', 'University'] as const

function getStageIndex(section: TargetSection): number {
  switch (section) {
    case 'alc':
      return 1
    case 'developers':
      return 2
    case 'university':
      return 3
  }
}

function getCompletedIndex(progression: ProgressionGatesStatus): number {
  // Use structural gate completion (not current access) so the timeline
  // stays accurate during maintenance locks (weekly XP missed).
  const alcStructural =
    progression.mathGate.isMet && progression.readingGate.isMet
  const devStructural =
    alcStructural &&
    progression.projectsGate.isMet &&
    progression.deploymentGate.isMet
  if (devStructural) return 2
  if (alcStructural) return 1
  return 0
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Timeline({
  targetIndex,
  completedIndex,
}: {
  targetIndex: number
  completedIndex: number
}) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto">
      {TIMELINE_STAGES.map((stage, i) => {
        const isCompleted = i < targetIndex && i <= completedIndex
        const isTarget = i === targetIndex
        const isFuture = i > targetIndex

        return (
          <div key={stage} className="flex items-center">
            {/* Connecting line before (skip first) */}
            {i > 0 && (
              <div
                className={`h-0.5 w-6 sm:w-10 ${
                  i <= completedIndex && i <= targetIndex
                    ? 'bg-gray-900'
                    : 'bg-gray-200'
                }`}
              />
            )}

            {/* Stage circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted
                    ? 'bg-gray-900 text-white'
                    : isTarget
                      ? 'bg-white border-2 border-gray-900 text-gray-900'
                      : isFuture
                        ? 'bg-white border-2 border-gray-200 text-gray-300'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check size={14} weight="bold" />
                ) : isTarget ? (
                  <Lock size={14} weight="bold" />
                ) : (
                  <span className="text-[10px]">{i + 1}</span>
                )}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                  isCompleted
                    ? 'text-gray-900'
                    : isTarget
                      ? 'text-gray-900'
                      : 'text-gray-400'
                }`}
              >
                {stage}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GateCard({ gate, compact }: { gate: GateStatus; compact?: boolean }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">{gate.label}</span>
        {gate.isMet ? (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Check size={14} weight="bold" />
            Complete
          </span>
        ) : (
          <span className="text-xs text-gray-500">
            {gate.current} / {gate.required}
          </span>
        )}
      </div>
      <div
        className="h-2 bg-gray-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={gate.current}
        aria-valuemin={0}
        aria-valuemax={gate.required}
        aria-label={`${gate.label} progress`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            gate.isMet ? 'bg-emerald-500' : 'bg-gray-900'
          }`}
          style={{ width: `${gate.progressPercent}%` }}
        />
      </div>
    </div>
  )
}

function WeeklyXPWarning({
  weeklyXP,
}: {
  weeklyXP: ProgressionGatesStatus['weeklyXP']
}) {
  const percent = Math.min(
    100,
    (weeklyXP.effectiveXP / weeklyXP.required) * 100
  )

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Lightning
          size={20}
          weight="fill"
          className="text-amber-500 mt-0.5 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-900">
            Access Paused — Weekly XP Required
          </p>
          <p className="text-xs text-amber-700 mt-1">
            Earn {weeklyXP.required.toLocaleString()} effective XP this week to
            restore access. Logic &amp; Writing earn <strong>3x</strong> toward
            your goal.
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
              <span>
                {weeklyXP.effectiveXP.toLocaleString()} /{' '}
                {weeklyXP.required.toLocaleString()} XP
              </span>
              <span>{Math.round(percent)}%</span>
            </div>
            <div
              className="h-2 bg-amber-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={weeklyXP.effectiveXP}
              aria-valuemin={0}
              aria-valuemax={weeklyXP.required}
              aria-label="Weekly XP progress"
            >
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Password bypass modal
// ---------------------------------------------------------------------------

function PasswordBypassModal({
  targetSection,
  onClose,
}: {
  targetSection: 'alc' | 'developer'
  onClose: () => void
}) {
  const { user } = useAuth()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    if (!loading) onClose()
  }, [loading, onClose])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !password.trim()) return

    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/progression/bypass-grant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetSection, password: password.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to grant bypass')
        return
      }

      window.location.reload()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full h-10 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function BypassPurchaseSection({
  targetSection,
}: {
  targetSection: TargetSection
}) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Map UI section to bypass target: developers and university both use 'developer'
  const bypassTarget = targetSection === 'alc' ? 'alc' : 'developer'

  async function handlePurchase() {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/progression/bypass-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetSection: bypassTarget }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create checkout session')
        return
      }

      // Redirect to Stripe Checkout
      if (data.data?.url) {
        window.location.href = data.data.url
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          or
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Bypass card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <Lightning size={18} weight="fill" className="text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Skip the requirements — $10,000
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Permanently unlock this section. A $200/week maintenance fee
              applies if you don&apos;t earn 5,000 XP that week.
            </p>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="mt-3 inline-flex items-center justify-center h-9 px-5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting...' : 'Purchase Bypass'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProgressionGatePage({
  targetSection,
  progression,
}: ProgressionGatePageProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const meta = SECTION_META[targetSection]
  const targetIndex = getStageIndex(targetSection)
  const completedIndex = getCompletedIndex(progression)
  const bypassTarget =
    targetSection === 'alc' ? ('alc' as const) : ('developer' as const)

  // Determine if this is a maintenance lock (structural gates met, weekly XP not)
  const structuralGatesMet =
    targetSection === 'alc'
      ? progression.mathGate.isMet && progression.readingGate.isMet
      : progression.mathGate.isMet &&
        progression.readingGate.isMet &&
        progression.projectsGate.isMet &&
        progression.deploymentGate.isMet

  const isMaintenanceLock = structuralGatesMet && !progression.weeklyXP.isMet

  // Build the list of requirement cards to show
  const gates: GateStatus[] = []
  if (targetSection === 'alc') {
    gates.push(progression.mathGate, progression.readingGate)
  } else {
    // For developers/university, show ALC prereqs if not met, plus developer gates
    if (!progression.mathGate.isMet) gates.push(progression.mathGate)
    if (!progression.readingGate.isMet) gates.push(progression.readingGate)
    gates.push(progression.projectsGate, progression.deploymentGate)
  }

  // CTA destination: go to the stage the user should be working on
  const ctaHref = progression.canAccessALC ? '/alc' : '/'
  const ctaLabel = progression.canAccessALC ? 'Go to ALC' : 'Go to Basics'

  return (
    <div className="min-h-[calc(100vh-48px)] bg-gray-50 flex items-start justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
            <Lock size={24} weight="bold" className="text-gray-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isMaintenanceLock ? 'Access Paused' : `Unlock ${meta.label}`}
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {meta.description}
          </p>
        </div>

        {/* Timeline */}
        <Timeline targetIndex={targetIndex} completedIndex={completedIndex} />

        {/* Weekly XP Warning (if maintenance lock) */}
        {isMaintenanceLock && (
          <WeeklyXPWarning weeklyXP={progression.weeklyXP} />
        )}

        {/* Requirement Cards */}
        {!isMaintenanceLock && gates.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-700">Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gates.map((gate) => (
                <GateCard key={gate.label} gate={gate} />
              ))}
            </div>
          </div>
        )}

        {/* Bypass Purchase Option */}
        {!isMaintenanceLock && (
          <BypassPurchaseSection targetSection={targetSection} />
        )}

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* Hidden admin bypass button */}
      <button
        onClick={() => setShowPasswordModal(true)}
        className="fixed bottom-6 right-6 z-50 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200/60 transition-colors"
        aria-label="Admin bypass"
      >
        <Pi size={18} weight="bold" />
      </button>

      {/* Password bypass modal */}
      {showPasswordModal && (
        <PasswordBypassModal
          targetSection={bypassTarget}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  )
}
