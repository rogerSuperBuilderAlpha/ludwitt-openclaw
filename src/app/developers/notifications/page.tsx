'use client'

import { useState } from 'react'
import { 
  Bell, 
  BellSimpleSlash,
  Check,
  Envelope,
  DeviceMobile,
  Desktop,
} from '@phosphor-icons/react'
import { DevCard, DevButton, DevBadge } from '@/components/developers/v2/ui'

interface NotificationSetting {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
  inApp: boolean
}

/**
 * Notifications Page - Manage notification preferences
 */
export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'new-document',
      label: 'New Document Submitted',
      description: 'When a customer submits a new document for review',
      email: true,
      push: true,
      inApp: true,
    },
    {
      id: 'document-assigned',
      label: 'Document Assigned to You',
      description: 'When a document is assigned to you',
      email: true,
      push: true,
      inApp: true,
    },
    {
      id: 'customer-message',
      label: 'Customer Messages',
      description: 'When a customer sends a message or comment',
      email: true,
      push: false,
      inApp: true,
    },
    {
      id: 'document-approved',
      label: 'Customer Approves Document',
      description: 'When a customer approves their document for work',
      email: false,
      push: false,
      inApp: true,
    },
    {
      id: 'deadline-reminder',
      label: 'Deadline Reminders',
      description: 'Reminders for upcoming document deadlines',
      email: true,
      push: true,
      inApp: true,
    },
    {
      id: 'weekly-summary',
      label: 'Weekly Summary',
      description: 'Weekly summary of your activity and stats',
      email: true,
      push: false,
      inApp: false,
    },
  ])

  const toggleSetting = (id: string, channel: 'email' | 'push' | 'inApp') => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, [channel]: !s[channel] } : s
    ))
  }

  const enableAll = () => {
    setSettings(prev => prev.map(s => ({ ...s, email: true, push: true, inApp: true })))
  }

  const disableAll = () => {
    setSettings(prev => prev.map(s => ({ ...s, email: false, push: false, inApp: false })))
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: 'var(--dev-space-4) var(--dev-space-5)',
        borderBottom: '1px solid var(--dev-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{ fontSize: 'var(--dev-text-xl)', fontWeight: 'var(--dev-font-semibold)', marginBottom: 'var(--dev-space-1)' }}>
            Notifications
          </h1>
          <p style={{ color: 'var(--dev-text-muted)', fontSize: 'var(--dev-text-sm)' }}>
            Manage how you receive notifications
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
          <DevButton variant="ghost" size="sm" onClick={enableAll}>
            <Bell size={14} style={{ marginRight: 4 }} />
            Enable All
          </DevButton>
          <DevButton variant="ghost" size="sm" onClick={disableAll}>
            <BellSimpleSlash size={14} style={{ marginRight: 4 }} />
            Disable All
          </DevButton>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 'var(--dev-space-5)' }}>
        {/* Channel Legend */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--dev-space-4)',
          marginBottom: 'var(--dev-space-4)',
          padding: 'var(--dev-space-3)',
          background: 'var(--dev-bg-muted)',
          borderRadius: 'var(--dev-radius-lg)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', fontSize: 'var(--dev-text-sm)' }}>
            <Envelope size={16} />
            Email
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', fontSize: 'var(--dev-text-sm)' }}>
            <DeviceMobile size={16} />
            Push
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dev-space-2)', fontSize: 'var(--dev-text-sm)' }}>
            <Desktop size={16} />
            In-App
          </div>
        </div>

        {/* Settings List */}
        <DevCard padding="none">
          {settings.map((setting, index) => (
            <div 
              key={setting.id}
              style={{
                padding: 'var(--dev-space-4)',
                borderBottom: index < settings.length - 1 ? '1px solid var(--dev-border-subtle)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--dev-space-4)',
              }}
            >
              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'var(--dev-font-medium)', marginBottom: 2 }}>
                  {setting.label}
                </div>
                <div style={{ fontSize: 'var(--dev-text-sm)', color: 'var(--dev-text-muted)' }}>
                  {setting.description}
                </div>
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
                <ToggleButton
                  icon={<Envelope size={14} />}
                  active={setting.email}
                  onClick={() => toggleSetting(setting.id, 'email')}
                  label="Email"
                />
                <ToggleButton
                  icon={<DeviceMobile size={14} />}
                  active={setting.push}
                  onClick={() => toggleSetting(setting.id, 'push')}
                  label="Push"
                />
                <ToggleButton
                  icon={<Desktop size={14} />}
                  active={setting.inApp}
                  onClick={() => toggleSetting(setting.id, 'inApp')}
                  label="In-App"
                />
              </div>
            </div>
          ))}
        </DevCard>

        {/* Save Note */}
        <div style={{ 
          marginTop: 'var(--dev-space-4)',
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

interface ToggleButtonProps {
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  label: string
}

function ToggleButton({ icon, active, onClick, label }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: 36,
        height: 36,
        borderRadius: 'var(--dev-radius-md)',
        border: `2px solid ${active ? 'var(--dev-accent-primary)' : 'var(--dev-border-default)'}`,
        background: active ? 'var(--dev-accent-primary)' : 'transparent',
        color: active ? 'white' : 'var(--dev-text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
    </button>
  )
}
