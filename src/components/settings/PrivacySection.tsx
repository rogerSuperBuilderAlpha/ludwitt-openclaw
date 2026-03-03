'use client'

import { useState, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  Users,
  Trophy,
  BarChart3,
  Check,
  Loader2,
} from 'lucide-react'
import { logger } from '@/lib/logger'

interface PrivacySettings {
  profileVisibility: 'public' | 'private'
  showOnLeaderboard: boolean
  showActivityStatus: boolean
  allowDataForImprovement: boolean
}

interface PrivacySectionProps {
  userId: string
  onSave?: (settings: PrivacySettings) => Promise<void>
}

const defaultSettings: PrivacySettings = {
  profileVisibility: 'public',
  showOnLeaderboard: true,
  showActivityStatus: true,
  allowDataForImprovement: true,
}

export function PrivacySection({ userId, onSave }: PrivacySectionProps) {
  const [settings, setSettings] = useState<PrivacySettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [originalSettings, setOriginalSettings] =
    useState<PrivacySettings>(defaultSettings)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = localStorage.getItem(`privacy_${userId}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          setSettings(parsed)
          setOriginalSettings(parsed)
        }
      } catch (err) {
        logger.error('PrivacySection', 'Failed to load privacy settings', {
          error: err,
        })
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [userId])

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings))
  }, [settings, originalSettings])

  const handleToggle = (key: keyof PrivacySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleVisibilityChange = (
    visibility: PrivacySettings['profileVisibility']
  ) => {
    setSettings((prev) => ({
      ...prev,
      profileVisibility: visibility,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      localStorage.setItem(`privacy_${userId}`, JSON.stringify(settings))

      if (onSave) {
        await onSave(settings)
      }

      setOriginalSettings(settings)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      logger.error('PrivacySection', 'Failed to save privacy settings', {
        error: err,
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin b-text-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          Privacy settings saved!
        </div>
      )}

      {/* Profile Visibility */}
      <div>
        <div className="flex items-center gap-2 b-mb-sm">
          <Users className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Profile Visibility</h3>
        </div>
        <p className="b-text-sm b-text-muted b-mb-md">
          Control who can see your profile and learning progress.
        </p>

        <div className="space-y-2">
          <VisibilityOption
            value="public"
            selected={settings.profileVisibility === 'public'}
            onChange={() => handleVisibilityChange('public')}
            icon={<Eye className="w-4 h-4" />}
            label="Public"
            description="Anyone can view your profile"
          />
          <VisibilityOption
            value="private"
            selected={settings.profileVisibility === 'private'}
            onChange={() => handleVisibilityChange('private')}
            icon={<EyeOff className="w-4 h-4" />}
            label="Private"
            description="Only you can see your profile"
          />
        </div>
      </div>

      {/* Leaderboard */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-sm">
          <Trophy className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Leaderboard</h3>
        </div>

        <ToggleItem
          label="Show on Leaderboard"
          description="Display your ranking on public leaderboards"
          checked={settings.showOnLeaderboard}
          onChange={() => handleToggle('showOnLeaderboard')}
        />
      </div>

      {/* Activity Status */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-sm">
          <BarChart3 className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Activity</h3>
        </div>

        <div className="space-y-3">
          <ToggleItem
            label="Show Activity Status"
            description="Let others see when you were last active"
            checked={settings.showActivityStatus}
            onChange={() => handleToggle('showActivityStatus')}
          />
          <ToggleItem
            label="Contribute to Product Improvement"
            description="Allow anonymous usage data to help improve the platform"
            checked={settings.allowDataForImprovement}
            onChange={() => handleToggle('allowDataForImprovement')}
          />
        </div>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="pt-4 b-border-t">
          <button
            onClick={handleSave}
            disabled={saving}
            className="b-btn b-btn-logic b-btn-full b-btn-md flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Privacy Settings'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

interface VisibilityOptionProps {
  value: string
  selected: boolean
  onChange: () => void
  icon: React.ReactNode
  label: string
  description: string
}

function VisibilityOption({
  selected,
  onChange,
  icon,
  label,
  description,
}: VisibilityOptionProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full flex items-start gap-3 b-p-sm b-rounded-lg border-2 transition-all text-left ${
        selected
          ? 'border-[var(--b-logic)] b-bg-muted'
          : 'b-border hover:b-border-medium'
      }`}
    >
      <div className={`mt-0.5 ${selected ? 'b-text-logic' : 'b-text-muted'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p
          className={`b-font-medium ${selected ? 'b-text-primary' : 'b-text-primary'}`}
        >
          {label}
        </p>
        <p className="b-text-xs b-text-muted">{description}</p>
      </div>
      <div
        className={`w-4 h-4 b-rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-[var(--b-logic)] bg-[var(--b-logic)]' : 'b-border'
        }`}
      >
        {selected && <div className="w-2 h-2 b-rounded-full bg-white" />}
      </div>
    </button>
  )
}

interface ToggleItemProps {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
}: ToggleItemProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="b-text-sm b-font-medium b-text-primary">{label}</p>
        <p className="b-text-xs b-text-muted">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer b-rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--b-logic)] focus:ring-offset-2 ${
          checked ? 'bg-[var(--b-logic)]' : 'b-bg-muted'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform b-rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
