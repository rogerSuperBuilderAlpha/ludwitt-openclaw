/**
 * Quick Actions Bar
 * Provides quick access to common actions with keyboard shortcuts
 */

'use client'

import { useState } from 'react'

export interface QuickAction {
  id: string
  label: string
  icon: string
  shortcut: string
  onClick: () => void
  disabled?: boolean
  tooltip?: string
}

interface QuickActionsBarProps {
  actions: QuickAction[]
}

export function QuickActionsBar({ actions }: QuickActionsBarProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  return (
    <div className="flex items-center gap-2">
      <span className="b-text-sm b-font-medium b-text-secondary mr-2">
        Quick Actions:
      </span>

      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <div key={action.id} className="relative">
            <button
              onClick={action.onClick}
              disabled={action.disabled}
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
              className={`
                flex items-center gap-2 b-px-md b-py-sm b-rounded-lg b-text-sm b-font-medium transition-all
                ${
                  action.disabled
                    ? 'b-bg-muted b-text-disabled cursor-not-allowed'
                    : 'b-bg-elevated b-border b-text-secondary hover:b-border-medium hover:b-shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none'
                }
              `}
              style={{
                borderColor: action.disabled ? 'transparent' : undefined,
              }}
            >
              <span className="b-text-base">{action.icon}</span>
              <span className="hidden sm:inline">{action.label}</span>
              <kbd
                className="hidden md:inline-block b-px-sm b-py-xs b-text-xs b-bg-muted b-border b-rounded-sm"
                style={{ fontFamily: 'var(--b-font-mono)' }}
              >
                {action.shortcut}
              </kbd>
            </button>

            {/* Tooltip */}
            {hoveredAction === action.id && action.tooltip && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 b-px-sm b-py-xs b-text-inverse b-text-xs b-rounded whitespace-nowrap z-50"
                style={{ background: 'var(--b-navy)' }}
              >
                {action.tooltip}
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent"
                  style={{ borderTopColor: 'var(--b-navy)' }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper function to create common actions
export function createQuickActions({
  onSubmit,
  onSkip,
  onHint,
  onFocus,
  onHelp,
  canSubmit = true,
  canSkip = true,
  canHint = true,
}: {
  onSubmit?: () => void
  onSkip?: () => void
  onHint?: () => void
  onFocus?: () => void
  onHelp?: () => void
  canSubmit?: boolean
  canSkip?: boolean
  canHint?: boolean
}): QuickAction[] {
  const actions: QuickAction[] = []

  if (onSubmit) {
    actions.push({
      id: 'submit',
      label: 'Submit',
      icon: '✓',
      shortcut: '↵',
      onClick: onSubmit,
      disabled: !canSubmit,
      tooltip: 'Submit your answer (Enter)',
    })
  }

  if (onSkip) {
    actions.push({
      id: 'skip',
      label: 'Skip',
      icon: '⏭',
      shortcut: 'S',
      onClick: onSkip,
      disabled: !canSkip,
      tooltip: 'Skip this problem (S)',
    })
  }

  if (onHint) {
    actions.push({
      id: 'hint',
      label: 'Hint',
      icon: '💡',
      shortcut: 'H',
      onClick: onHint,
      disabled: !canHint,
      tooltip: 'Show hint (H)',
    })
  }

  if (onFocus) {
    actions.push({
      id: 'focus',
      label: 'Focus',
      icon: '🎯',
      shortcut: 'F',
      onClick: onFocus,
      tooltip: 'Toggle focus mode (F)',
    })
  }

  if (onHelp) {
    actions.push({
      id: 'help',
      label: 'Help',
      icon: '⌨',
      shortcut: '?',
      onClick: onHelp,
      tooltip: 'Show keyboard shortcuts (?)',
    })
  }

  return actions
}
