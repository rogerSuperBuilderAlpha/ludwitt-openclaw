'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, User, Gear, CreditCard, SignOut } from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { NotificationBell } from '@/components/shared/NotificationBell'
import { useProgressionGates } from '@/lib/progression'
import { logout } from '@/lib/firebase/auth'
import { logger } from '@/lib/logger'

type Section = 'basics' | 'alc' | 'developers' | 'university'

const SECTIONS: { id: Section; label: string; href: string }[] = [
  { id: 'basics', label: 'Basics', href: '/' },
  { id: 'alc', label: 'ALC', href: '/alc' },
  { id: 'developers', label: 'Developers', href: '/developers' },
  { id: 'university', label: 'University', href: '/university' },
]

function getActiveSection(pathname: string): Section | null {
  if (pathname.startsWith('/university')) return 'university'
  if (pathname.startsWith('/developers')) return 'developers'
  if (pathname.startsWith('/alc')) return 'alc'
  if (
    pathname === '/' ||
    pathname.startsWith('/basics') ||
    pathname.startsWith('/dashboard')
  )
    return 'basics'
  return null
}

export function SectionSwitcherStrip() {
  const { user } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const progression = useProgressionGates()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close profile menu on outside click
  useEffect(() => {
    if (!showProfileMenu) return
    const handleMouseDown = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [showProfileMenu])

  const isDark = pathname.startsWith('/developers')
  const activeSection = getActiveSection(pathname)

  // Set CSS variable for strip height so other layouts can adjust
  useEffect(() => {
    if (user) {
      document.documentElement.style.setProperty('--strip-height', '40px')
    } else {
      document.documentElement.style.removeProperty('--strip-height')
    }
    return () => {
      document.documentElement.style.removeProperty('--strip-height')
    }
  }, [user])

  // Don't render for unauthenticated users or on /professors
  if (!user) return null
  if (pathname.startsWith('/professors')) return null

  const isLocked = (section: Section): boolean => {
    if (section === 'basics') return false
    if (section === 'alc')
      return !progression.canAccessALC && !progression.isLoading
    if (section === 'developers')
      return !progression.canAccessDeveloper && !progression.isLoading
    if (section === 'university')
      return !progression.canAccessDeveloper && !progression.isLoading
    return false
  }

  const handleTabClick = (_section: Section, href: string) => {
    router.push(href)
  }

  // Weekly XP display - only for ALC/Developer access
  const showWeeklyXP = progression.canAccessALC && !progression.isLoading
  const weeklyXPPercent =
    progression.weeklyXP.required > 0
      ? Math.min(
          (progression.weeklyXP.effectiveXP / progression.weeklyXP.required) *
            100,
          100
        )
      : 0
  const weeklyXPFormatted =
    progression.weeklyXP.effectiveXP >= 1000
      ? `${(progression.weeklyXP.effectiveXP / 1000).toFixed(1)}k`
      : `${Math.round(progression.weeklyXP.effectiveXP)}`

  return (
    <>
      <div
        className={`sticky top-0 z-[200] h-10 flex items-center px-3 border-b text-sm select-none ${
          isDark
            ? 'bg-[var(--dev-bg-elevated,#1a1a1b)] border-[var(--dev-border-default,#333)] text-[var(--dev-text-default,#e0e0e0)]'
            : 'bg-white border-gray-200 text-gray-700 shadow-sm'
        }`}
      >
        {/* Left - Logo */}
        <button
          onClick={() => router.push('/')}
          className={`flex items-center gap-1.5 p-1 rounded-lg transition-colors flex-shrink-0 ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          }`}
          aria-label="Go to home"
        >
          <Image
            src="/logos/logo.png"
            alt="PitchRise"
            width={22}
            height={22}
            className="w-[22px] h-[22px] object-contain"
          />
        </button>

        {/* Divider */}
        <div
          className={`w-px h-5 mx-2 flex-shrink-0 ${isDark ? 'bg-[var(--dev-border-subtle,#444)]' : 'bg-gray-200'}`}
        />

        {/* Center - Section Tabs */}
        <nav
          className="flex items-center gap-1"
          aria-label="Section navigation"
        >
          {SECTIONS.map((section) => {
            const locked = isLocked(section.id)
            const active = activeSection === section.id

            return (
              <div key={section.id} className="relative">
                <button
                  onClick={() => handleTabClick(section.id, section.href)}
                  className={`relative flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? isDark
                        ? 'text-white bg-white/10'
                        : 'text-gray-900 bg-gray-100'
                      : locked
                        ? isDark
                          ? 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
                          : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50'
                        : isDark
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {section.label}
                  {locked && (
                    <Lock size={11} weight="bold" className="opacity-60" />
                  )}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] rounded-full ${
                        isDark ? 'bg-white/60' : 'bg-gray-900'
                      }`}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right - Weekly XP + Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Weekly XP Indicator */}
          {showWeeklyXP && (
            <div className="hidden sm:flex items-center gap-1.5">
              <span
                className={`text-[10px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Weekly
              </span>
              <div
                className={`w-16 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}
              >
                <div
                  className={`h-full rounded-full transition-all ${
                    progression.weeklyXP.isMet
                      ? 'bg-emerald-500'
                      : progression.weeklyXP.gracePeriodActive
                        ? 'bg-amber-500'
                        : isDark
                          ? 'bg-blue-400'
                          : 'bg-blue-500'
                  }`}
                  style={{ width: `${weeklyXPPercent}%` }}
                />
              </div>
              <span
                className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {weeklyXPFormatted}/5k
              </span>
            </div>
          )}

          {/* Notification Bell */}
          <NotificationBell isDark={isDark} />

          {/* Account Avatar + Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors flex-shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              aria-label="Account menu"
              aria-haspopup="menu"
              aria-expanded={showProfileMenu}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Account"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User size={14} weight="bold" />
              )}
            </button>

            {showProfileMenu && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border py-1 z-50 ${
                  isDark
                    ? 'bg-[#1a1a1b] border-[#333] text-gray-200'
                    : 'bg-white border-gray-200 text-gray-700'
                }`}
                role="menu"
              >
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    router.push('/account/settings')
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  <Gear size={15} />
                  Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    router.push('/account/credits')
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  <CreditCard size={15} />
                  Credits
                </button>
                <div
                  className={`my-1 h-px ${isDark ? 'bg-[#333]' : 'bg-gray-200'}`}
                />
                <button
                  onClick={() => {
                    setShowProfileMenu(false)
                    logout()
                      .then(() => {
                        router.push('/')
                      })
                      .catch((err) =>
                        logger.error('SectionSwitcherStrip', 'Logout failed', {
                          error: err,
                        })
                      )
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
                    isDark
                      ? 'text-red-400 hover:bg-white/10'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                  role="menuitem"
                >
                  <SignOut size={15} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
