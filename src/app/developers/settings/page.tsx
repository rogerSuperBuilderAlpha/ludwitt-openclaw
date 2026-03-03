'use client'

import { useState } from 'react'
import { 
  Gear, 
  Moon,
  Sun,
  Eye,
  Keyboard,
  Bell,
  Palette,
  Layout,
  Check,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevBadge } from '@/components/developers/v2/ui'
import Link from 'next/link'

interface SettingSection {
  id: string
  title: string
  icon: React.ReactNode
  settings: Setting[]
}

interface Setting {
  id: string
  label: string
  description: string
  type: 'toggle' | 'select' | 'link'
  value?: boolean | string
  options?: { value: string; label: string }[]
  link?: string
}

/**
 * Settings Page - Configure developer portal preferences
 */
export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean | string>>({
    'dark-mode': true,
    'compact-mode': false,
    'show-archived': false,
    'keyboard-shortcuts': true,
    'sound-effects': false,
    'auto-refresh': true,
    'sidebar-collapsed': false,
    'card-style': 'default',
  })

  const toggleSetting = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const setSelectValue = (id: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: value,
    }))
  }

  const sections: SettingSection[] = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <Palette size={20} />,
      settings: [
        {
          id: 'dark-mode',
          label: 'Dark Mode',
          description: 'Use dark theme for the developer portal',
          type: 'toggle',
          value: settings['dark-mode'] as boolean,
        },
        {
          id: 'compact-mode',
          label: 'Compact Mode',
          description: 'Reduce spacing and padding for denser UI',
          type: 'toggle',
          value: settings['compact-mode'] as boolean,
        },
        {
          id: 'card-style',
          label: 'Card Style',
          description: 'Choose how document cards are displayed',
          type: 'select',
          value: settings['card-style'] as string,
          options: [
            { value: 'default', label: 'Default' },
            { value: 'compact', label: 'Compact' },
            { value: 'detailed', label: 'Detailed' },
          ],
        },
      ],
    },
    {
      id: 'display',
      title: 'Display',
      icon: <Layout size={20} />,
      settings: [
        {
          id: 'show-archived',
          label: 'Show Archived Documents',
          description: 'Include archived documents in lists',
          type: 'toggle',
          value: settings['show-archived'] as boolean,
        },
        {
          id: 'sidebar-collapsed',
          label: 'Collapse Sidebar by Default',
          description: 'Start with the sidebar collapsed',
          type: 'toggle',
          value: settings['sidebar-collapsed'] as boolean,
        },
        {
          id: 'auto-refresh',
          label: 'Auto-Refresh',
          description: 'Automatically refresh data every few minutes',
          type: 'toggle',
          value: settings['auto-refresh'] as boolean,
        },
      ],
    },
    {
      id: 'interaction',
      title: 'Interaction',
      icon: <Keyboard size={20} />,
      settings: [
        {
          id: 'keyboard-shortcuts',
          label: 'Keyboard Shortcuts',
          description: 'Enable keyboard shortcuts for quick actions',
          type: 'toggle',
          value: settings['keyboard-shortcuts'] as boolean,
        },
        {
          id: 'sound-effects',
          label: 'Sound Effects',
          description: 'Play sounds for notifications and actions',
          type: 'toggle',
          value: settings['sound-effects'] as boolean,
        },
        {
          id: 'shortcuts-reference',
          label: 'View All Shortcuts',
          description: 'See the complete keyboard shortcuts reference',
          type: 'link',
          link: '/developers/shortcuts',
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} />,
      settings: [
        {
          id: 'notification-settings',
          label: 'Notification Preferences',
          description: 'Configure email, push, and in-app notifications',
          type: 'link',
          link: '/developers/notifications',
        },
      ],
    },
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
      }}>
        <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
          Settings
        </h1>
        <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
          Configure your developer portal preferences
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        <div style={{ maxWidth: 700 }}>
          {sections.map(section => (
            <div key={section.id} style={{ marginBottom: 'var(--dev-space-6)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--dev-space-2)',
                marginBottom: 'var(--dev-space-3)',
                color: 'var(--dev-text-secondary)',
              }}>
                {section.icon}
                <span style={{ fontWeight: 'var(--dev-font-semibold)' }}>{section.title}</span>
              </div>

              <DevCard padding="none">
                {section.settings.map((setting, index) => (
                  <div 
                    key={setting.id}
                    style={{
                      padding: 'var(--dev-space-4)',
                      borderBottom: index < section.settings.length - 1 ? '1px solid var(--dev-border-subtle)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--dev-space-4)',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'var(--dev-font-medium)', marginBottom: 2 }}>
                        {setting.label}
                      </div>
                      <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>
                        {setting.description}
                      </div>
                    </div>

                    {setting.type === 'toggle' && (
                      <Toggle 
                        active={setting.value as boolean} 
                        onClick={() => toggleSetting(setting.id)}
                      />
                    )}

                    {setting.type === 'select' && setting.options && (
                      <select
                        value={setting.value as string}
                        onChange={(e) => setSelectValue(setting.id, e.target.value)}
                        className="dev-input"
                        style={{ width: 140 }}
                      >
                        {setting.options.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {setting.type === 'link' && setting.link && (
                      <Link href={setting.link}>
                        <DevButton variant="secondary" size="sm">
                          View
                        </DevButton>
                      </Link>
                    )}
                  </div>
                ))}
              </DevCard>
            </div>
          ))}
        </div>

        {/* Save Note */}
        <div style={{ 
          maxWidth: 700,
          padding: 'var(--dev-space-3)',
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: 'var(--dev-radius-lg)',
          color: 'var(--dev-accent-success)',
          fontSize: 'var(--dev-text-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-2)',
        }}>
          <Check size={16} />
          Settings are saved automatically
        </div>
      </div>
    </div>
  )
}

interface ToggleProps {
  active: boolean
  onClick: () => void
}

function Toggle({ active, onClick }: ToggleProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        border: 'none',
        background: active ? 'var(--dev-accent-primary)' : 'var(--dev-bg-muted)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: 3,
        left: active ? 23 : 3,
        transition: 'left 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
}
