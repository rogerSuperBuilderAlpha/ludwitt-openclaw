'use client'

/**
 * Subject Tabs Component
 *
 * Provides tab-based navigation for subjects on the dashboard.
 * Can be used as an alternative to showing all subjects simultaneously.
 *
 * UX Fix: Addresses feedback about dashboard feeling "cluttered" with
 * multiple subjects displayed at once.
 */

import { useState, useEffect, type KeyboardEvent } from 'react'
import {
  Calculator,
  BookOpen,
  Scroll,
  Buildings,
  Brain,
  GridFour,
} from '@phosphor-icons/react'

export type SubjectTab =
  | 'all'
  | 'math'
  | 'reading'
  | 'latin'
  | 'greek'
  | 'logic'

interface SubjectTabsProps {
  activeTab: SubjectTab
  onTabChange: (tab: SubjectTab) => void
  showLogic?: boolean // Only show if unlocked or preview available
  logicLocked?: boolean // Show as disabled with tooltip when locked
  className?: string
}

interface TabConfig {
  id: SubjectTab
  label: string
  icon: typeof Calculator
  color: string
  bgColor: string
}

const TABS: TabConfig[] = [
  {
    id: 'all',
    label: 'All',
    icon: GridFour,
    color: 'b-text-logic',
    bgColor: 'b-bg-logic-light',
  },
  {
    id: 'math',
    label: 'Math',
    icon: Calculator,
    color: 'b-text-math',
    bgColor: 'b-bg-math-light',
  },
  {
    id: 'reading',
    label: 'Reading',
    icon: BookOpen,
    color: 'b-text-reading',
    bgColor: 'b-bg-reading-light',
  },
  {
    id: 'latin',
    label: 'Latin',
    icon: Scroll,
    color: 'b-text-latin',
    bgColor: 'b-bg-latin-light',
  },
  {
    id: 'greek',
    label: 'Greek',
    icon: Buildings,
    color: 'b-text-greek',
    bgColor: 'b-bg-greek-light',
  },
  {
    id: 'logic',
    label: 'Logic',
    icon: Brain,
    color: 'b-text-logic',
    bgColor: 'b-bg-logic-light',
  },
]

export function SubjectTabs({
  activeTab,
  onTabChange,
  showLogic = false,
  logicLocked = false,
  className = '',
}: SubjectTabsProps) {
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved preference - only on mount, onTabChange is stable from parent
    const saved = localStorage.getItem('preferred_subject_tab')
    if (saved && TABS.some((t) => t.id === saved)) {
      onTabChange(saved as SubjectTab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist preference
  const handleTabChange = (tab: SubjectTab) => {
    onTabChange(tab)
    localStorage.setItem('preferred_subject_tab', tab)
  }

  // Filter tabs based on what's available
  const visibleTabs = TABS.filter((tab) => {
    if (tab.id === 'logic') return showLogic
    return true
  })

  const moveFocus = (nextIndex: number) => {
    const nextTab = visibleTabs[nextIndex]
    if (!nextTab) return
    const isNextLocked = nextTab.id === 'logic' && logicLocked
    if (!isNextLocked) {
      handleTabChange(nextTab.id)
    }
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabId: SubjectTab
  ) => {
    const currentIndex = visibleTabs.findIndex((tab) => tab.id === tabId)
    if (currentIndex === -1) return

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault()
        for (let i = 1; i <= visibleTabs.length; i += 1) {
          const nextIndex = (currentIndex + i) % visibleTabs.length
          const nextTab = visibleTabs[nextIndex]
          if (nextTab && !(nextTab.id === 'logic' && logicLocked)) {
            moveFocus(nextIndex)
            break
          }
        }
        break
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault()
        for (let i = 1; i <= visibleTabs.length; i += 1) {
          const nextIndex =
            (currentIndex - i + visibleTabs.length) % visibleTabs.length
          const nextTab = visibleTabs[nextIndex]
          if (nextTab && !(nextTab.id === 'logic' && logicLocked)) {
            moveFocus(nextIndex)
            break
          }
        }
        break
      }
      case 'Home':
        event.preventDefault()
        moveFocus(0)
        break
      case 'End':
        event.preventDefault()
        moveFocus(visibleTabs.length - 1)
        break
      default:
        break
    }
  }

  if (!mounted) return null

  return (
    <div
      role="radiogroup"
      aria-label="Subject filter"
      className={`flex gap-1 p-1 b-bg-muted b-rounded-xl overflow-x-auto ${className}`}
    >
      {visibleTabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        const isLogicLocked = tab.id === 'logic' && logicLocked

        return (
          <div key={tab.id} className="relative">
            <button
              onClick={() => !isLogicLocked && handleTabChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, tab.id)}
              onMouseEnter={() => isLogicLocked && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              disabled={isLogicLocked}
              role="radio"
              aria-checked={isActive}
              className={`
                flex items-center gap-1.5 px-3 py-2 b-rounded-lg b-font-medium b-text-sm whitespace-nowrap
                transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                ${
                  isLogicLocked
                    ? 'opacity-50 cursor-not-allowed b-text-muted'
                    : isActive
                      ? `b-bg-card b-shadow-sm ${tab.color}`
                      : 'b-text-muted hover:b-text-secondary hover:b-bg-card-hover'
                }
              `}
            >
              <Icon
                size={16}
                weight={isActive && !isLogicLocked ? 'fill' : 'regular'}
                className={isActive && !isLogicLocked ? tab.color : ''}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              {isLogicLocked && (
                <span className="text-xs px-1 py-0.5 bg-gray-200 text-gray-500 rounded ml-1">
                  Locked
                </span>
              )}
            </button>
            {/* Tooltip for locked Logic tab */}
            {isLogicLocked && showTooltip && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                Unlock at Grade 12 in Math & Reading
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Hook to manage subject tab state
 */
export function useSubjectTabs(defaultTab: SubjectTab = 'all') {
  const [activeTab, setActiveTab] = useState<SubjectTab>(defaultTab)

  // Check what should be visible based on active tab
  const shouldShow = (
    subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  ): boolean => {
    if (activeTab === 'all') return true
    return activeTab === subject
  }

  return {
    activeTab,
    setActiveTab,
    shouldShow,
    isShowingAll: activeTab === 'all',
  }
}
