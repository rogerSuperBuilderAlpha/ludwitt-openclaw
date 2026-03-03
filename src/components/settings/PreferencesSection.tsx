'use client'

import { useState, useEffect } from 'react'
import {
  Palette,
  Globe,
  Clock,
  Sun,
  Moon,
  Monitor,
  Check,
  Loader2,
} from 'lucide-react'
import { logger } from '@/lib/logger'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
}

interface PreferencesSectionProps {
  userId: string
  onSave?: (prefs: UserPreferences) => Promise<void>
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
]

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
]

const defaultPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  timezone:
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
}

export function PreferencesSection({
  userId,
  onSave,
}: PreferencesSectionProps) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [originalPrefs, setOriginalPrefs] =
    useState<UserPreferences>(defaultPreferences)

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const stored = localStorage.getItem(`preferences_${userId}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          setPreferences(parsed)
          setOriginalPrefs(parsed)
        }
      } catch (err) {
        logger.error('PreferencesSection', 'Failed to load preferences', {
          error: err,
        })
      } finally {
        setLoading(false)
      }
    }
    loadPreferences()
  }, [userId])

  useEffect(() => {
    setHasChanges(JSON.stringify(preferences) !== JSON.stringify(originalPrefs))
  }, [preferences, originalPrefs])

  useEffect(() => {
    // Apply theme when it changes
    applyTheme(preferences.theme)
  }, [preferences.theme])

  const applyTheme = (theme: UserPreferences['theme']) => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  const handleThemeChange = (theme: UserPreferences['theme']) => {
    setPreferences((prev) => ({ ...prev, theme }))
  }

  const handleChange = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      localStorage.setItem(`preferences_${userId}`, JSON.stringify(preferences))

      if (onSave) {
        await onSave(preferences)
      }

      setOriginalPrefs(preferences)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      logger.error('PreferencesSection', 'Failed to save preferences', {
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
          Preferences saved!
        </div>
      )}

      {/* Theme */}
      <div>
        <div className="flex items-center gap-2 b-mb-sm">
          <Palette className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Theme</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ThemeOption
            value="light"
            selected={preferences.theme === 'light'}
            onChange={() => handleThemeChange('light')}
            icon={<Sun className="w-5 h-5" />}
            label="Light"
          />
          <ThemeOption
            value="dark"
            selected={preferences.theme === 'dark'}
            onChange={() => handleThemeChange('dark')}
            icon={<Moon className="w-5 h-5" />}
            label="Dark"
          />
          <ThemeOption
            value="system"
            selected={preferences.theme === 'system'}
            onChange={() => handleThemeChange('system')}
            icon={<Monitor className="w-5 h-5" />}
            label="System"
          />
        </div>
      </div>

      {/* Language */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-sm">
          <Globe className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Language</h3>
        </div>

        <select
          value={preferences.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="b-input"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <p className="b-text-xs b-text-muted mt-2">
          This will change the language of the interface. Some content may not
          be available in all languages.
        </p>
      </div>

      {/* Timezone */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-sm">
          <Clock className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Timezone</h3>
        </div>

        <select
          value={preferences.timezone}
          onChange={(e) => handleChange('timezone', e.target.value)}
          className="b-input"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <p className="b-text-xs b-text-muted mt-2">
          Your current time:{' '}
          {new Date().toLocaleTimeString('en-US', {
            timeZone: preferences.timezone,
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
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
              'Save Preferences'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

interface ThemeOptionProps {
  value: string
  selected: boolean
  onChange: () => void
  icon: React.ReactNode
  label: string
}

function ThemeOption({ selected, onChange, icon, label }: ThemeOptionProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex flex-col items-center gap-2 b-p-lg b-rounded-lg border-2 transition-all ${
        selected
          ? 'border-[var(--b-logic)] b-bg-muted'
          : 'b-border hover:b-border-medium'
      }`}
    >
      <div className={selected ? 'b-text-logic' : 'b-text-muted'}>{icon}</div>
      <span
        className={`b-text-sm b-font-medium ${selected ? 'b-text-primary' : 'b-text-secondary'}`}
      >
        {label}
      </span>
    </button>
  )
}
