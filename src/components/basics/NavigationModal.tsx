'use client'

/**
 * NavigationModal Component
 *
 * Quick navigation modal triggered by clicking the PitchRise logo or menu button.
 * Provides access to all major platform sections with detailed descriptions.
 */

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  X,
  Code,
  Users,
  Briefcase,
  GraduationCap,
  Bank,
  Lock,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useProgressionGates } from '@/lib/progression'

interface NavigationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  id: string
  label: string
  tagline: string
  description: string
  features: string[]
  href: string
  icon: React.ReactNode
  color: string
  bgColor: string
  accentColor: string
  locked?: boolean
  lockMessage?: string
}

export function NavigationModal({ isOpen, onClose }: NavigationModalProps) {
  const { user } = useAuth()
  const router = useRouter()
  const progression = useProgressionGates()
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Close on Escape key + trap focus
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement
    const focusModal = () => modalRef.current?.focus()
    const timeoutId = window.setTimeout(focusModal, 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  // Build lock messages based on progression state
  const alcLocked = !progression.canAccessALC && !progression.isLoading
  const devLocked = !progression.canAccessDeveloper && !progression.isLoading

  const alcLockMessage = alcLocked
    ? `Reach Grade 12 in Math (${Math.floor(progression.mathGate.current)}/12) and Reading (${Math.floor(progression.readingGate.current)}/12)`
    : undefined

  const devLockMessage = devLocked
    ? `Complete ${progression.projectsGate.required} ALC projects (${progression.projectsGate.current}/${progression.projectsGate.required}) and verify deployment`
    : undefined

  const navItems: NavItem[] = [
    {
      id: 'basics',
      label: 'Basics',
      tagline: 'K-12 Adaptive Learning',
      description:
        'Master foundational subjects with AI-powered adaptive learning that adjusts to your pace.',
      features: [
        'Math (Arithmetic to Calculus)',
        'Reading Comprehension',
        'Latin & Greek',
        'Logic & Critical Thinking',
        'Writing Competitions',
      ],
      href: '/',
      icon: <GraduationCap size={32} weight="duotone" />,
      color: 'text-blue-600',
      bgColor:
        'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100',
      accentColor: 'border-blue-200 hover:border-blue-300',
    },
    {
      id: 'alc',
      label: 'ALC',
      tagline: 'AI Learning Companion',
      description:
        'Developer training track with hands-on projects and AI-assisted coding guidance.',
      features: [
        'Project-based learning',
        'AI coding assistant',
        'Voice notes & sessions',
        'Portfolio building',
        'Mentor matching',
      ],
      href: '/alc',
      icon: <Code size={32} weight="duotone" />,
      color: alcLocked ? 'text-gray-400' : 'text-purple-600',
      bgColor: alcLocked
        ? 'bg-gray-50'
        : 'bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100',
      accentColor: alcLocked
        ? 'border-gray-200 cursor-not-allowed opacity-60'
        : 'border-purple-200 hover:border-purple-300',
      locked: alcLocked,
      lockMessage: alcLockMessage,
    },
    {
      id: 'developers',
      label: 'Developers',
      tagline: 'ALC Graduate Portal',
      description:
        'Work on real client projects and earn money. Graduate from ALC to unlock access.',
      features: [
        'Claim client documents',
        'Get paid for completed work',
        'Track earnings & progress',
        'Build professional portfolio',
        'Real-world projects',
      ],
      href: '/developers',
      icon: <Briefcase size={32} weight="duotone" />,
      color: devLocked ? 'text-gray-400' : 'text-emerald-600',
      bgColor: devLocked
        ? 'bg-gray-50'
        : 'bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100',
      accentColor: devLocked
        ? 'border-gray-200 cursor-not-allowed opacity-60'
        : 'border-emerald-200 hover:border-emerald-300',
      locked: devLocked,
      lockMessage: devLockMessage,
    },
    {
      id: 'university',
      label: 'University',
      tagline: 'Ludwitt Academy',
      description:
        'Advanced education track for graduates. Deep-dive into specialized topics and research.',
      features: [
        'Advanced coursework',
        'Research projects',
        'Peer collaboration',
        'Specialization tracks',
      ],
      href: '/university',
      icon: <Bank size={32} weight="duotone" />,
      color: devLocked ? 'text-gray-400' : 'text-sky-600',
      bgColor: devLocked
        ? 'bg-gray-50'
        : 'bg-gradient-to-br from-sky-50 to-cyan-50 hover:from-sky-100 hover:to-cyan-100',
      accentColor: devLocked
        ? 'border-gray-200 cursor-not-allowed opacity-60'
        : 'border-sky-200 hover:border-sky-300',
      locked: devLocked,
      lockMessage: devLockMessage,
    },
    {
      id: 'customers',
      label: 'Customers',
      tagline: 'Client Portal',
      description:
        'External portal for clients to submit documents, track progress, and communicate.',
      features: [
        'Document submission',
        'Project dashboards',
        'Real-time status updates',
        'Direct messaging',
        'Payment & billing',
      ],
      href: '/customers',
      icon: <Users size={32} weight="duotone" />,
      color: 'text-amber-600',
      bgColor:
        'bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100',
      accentColor: 'border-amber-200 hover:border-amber-300',
    },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 animate-in zoom-in-95 duration-150 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nav-modal-title"
        tabIndex={-1}
        ref={modalRef}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: 'var(--b-bg-elevated, #ffffff)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex items-center justify-center">
                <Image
                  src="/logos/logo.png"
                  alt="PitchRise"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2
                  id="nav-modal-title"
                  className="font-bold text-gray-900 text-xl"
                >
                  Ludwitt
                </h2>
                <p className="text-sm text-gray-500">
                  Choose where you want to go
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Close navigation"
            >
              <X size={22} className="text-gray-500" />
            </button>
          </div>

          {/* Weekly XP warning if grace period active */}
          {progression.weeklyXP.gracePeriodActive && !progression.isAdmin && (
            <div className="mx-5 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 font-medium">
                Weekly XP Warning:{' '}
                {Math.round(progression.weeklyXP.effectiveXP)} /{' '}
                {progression.weeklyXP.required} XP this week. Logic & Writing
                earn 3x!
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <div className="p-5 space-y-4">
            {navItems.map((item) =>
              item.locked ? (
                <div
                  key={item.id}
                  className={`w-full flex items-start gap-4 p-5 rounded-xl border-2 transition-all text-left ${item.bgColor} ${item.accentColor}`}
                >
                  <div
                    className={`p-3 rounded-xl bg-white/80 shadow-sm ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-400 text-lg">
                        {item.label}
                      </span>
                      <Lock size={16} className="text-gray-400" />
                      <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        {item.tagline}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {item.lockMessage}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClose()
                    router.push(item.href)
                  }}
                  className={`w-full flex items-start gap-4 p-5 rounded-xl border-2 transition-all text-left group ${item.bgColor} ${item.accentColor}`}
                >
                  <div
                    className={`p-3 rounded-xl bg-white/80 shadow-sm group-hover:shadow-md transition-shadow ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-lg group-hover:text-gray-700">
                        {item.label}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.id === 'basics'
                            ? 'bg-blue-100 text-blue-700'
                            : item.id === 'alc'
                              ? 'bg-purple-100 text-purple-700'
                              : item.id === 'developers'
                                ? 'bg-emerald-100 text-emerald-700'
                                : item.id === 'university'
                                  ? 'bg-sky-100 text-sky-700'
                                  : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.tagline}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.slice(0, 4).map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-md"
                        >
                          <CheckCircle
                            size={12}
                            className="text-green-500"
                            weight="fill"
                          />
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 4 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{item.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2"
                  />
                </button>
              )
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                Press{' '}
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-mono">
                  Esc
                </kbd>{' '}
                to close
              </span>
              {user && (
                <span className="text-gray-400">Logged in as {user.email}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
