/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  Mail,
  Smartphone,
  Calendar,
  Trophy,
  Megaphone,
  GraduationCap,
  Check,
  Loader2,
} from 'lucide-react'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { logger } from '@/lib/logger'

interface NotificationPreferences {
  emailLearningReminders: boolean
  emailWeeklyProgress: boolean
  emailAnnouncements: boolean
  emailMarketing: boolean
  emailDeliverableReviewed: boolean
  emailCourseUpdate: boolean
  emailOfficeHours: boolean
  emailPeerReview: boolean
  emailPeerReviewEndorsed: boolean
  emailProfessorComments: boolean
  emailProfessorDocuments: boolean
  pushEnabled: boolean
  pushLearningReminders: boolean
  pushAchievements: boolean
  reminderFrequency: 'daily' | 'weekdays' | 'weekly' | 'none'
  reminderTime: string
}

interface NotificationsSectionProps {
  userId: string
  onSave?: (prefs: NotificationPreferences) => Promise<void>
}

const defaultPreferences: NotificationPreferences = {
  emailLearningReminders: true,
  emailWeeklyProgress: true,
  emailAnnouncements: true,
  emailMarketing: false,
  emailDeliverableReviewed: true,
  emailCourseUpdate: true,
  emailOfficeHours: true,
  emailPeerReview: true,
  emailPeerReviewEndorsed: true,
  emailProfessorComments: true,
  emailProfessorDocuments: true,
  pushEnabled: false,
  pushLearningReminders: true,
  pushAchievements: true,
  reminderFrequency: 'daily',
  reminderTime: '09:00',
}

export function NotificationsSection({
  userId,
  onSave,
}: NotificationsSectionProps) {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [originalPrefs, setOriginalPrefs] =
    useState<NotificationPreferences>(defaultPreferences)
  const fetchApi = useApiFetch()

  useEffect(() => {
    // Load preferences from API first, then fall back to localStorage
    const loadPreferences = async () => {
      try {
        const apiPrefs = await fetchApi<Record<string, unknown>>(
          '/api/notification-preferences'
        )
        if (apiPrefs) {
          const merged = {
            ...defaultPreferences,
            ...apiPrefs,
          } as NotificationPreferences
          setPreferences(merged)
          setOriginalPrefs(merged)
          setLoading(false)
          return
        }
      } catch {
        // API failed, fall back to localStorage
      }
      try {
        const stored = localStorage.getItem(`notifications_${userId}`)
        if (stored) {
          const parsed = JSON.parse(stored)
          const merged = { ...defaultPreferences, ...parsed }
          setPreferences(merged)
          setOriginalPrefs(merged)
        }
      } catch (err) {
        logger.error(
          'NotificationsSection',
          'Failed to load notification preferences',
          { error: err }
        )
      } finally {
        setLoading(false)
      }
    }
    loadPreferences()
  }, [userId, fetchApi])

  useEffect(() => {
    // Check if preferences have changed
    setHasChanges(JSON.stringify(preferences) !== JSON.stringify(originalPrefs))
  }, [preferences, originalPrefs])

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleChange = (key: keyof NotificationPreferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save to localStorage
      localStorage.setItem(
        `notifications_${userId}`,
        JSON.stringify(preferences)
      )

      // Persist university notification prefs to Firestore via API
      await fetchApi('/api/notification-preferences', {
        method: 'POST',
        body: JSON.stringify({
          emailDeliverableReviewed: preferences.emailDeliverableReviewed,
          emailCourseUpdate: preferences.emailCourseUpdate,
          emailOfficeHours: preferences.emailOfficeHours,
          emailPeerReview: preferences.emailPeerReview,
          emailPeerReviewEndorsed: preferences.emailPeerReviewEndorsed,
          emailProfessorComments: preferences.emailProfessorComments,
          emailProfessorDocuments: preferences.emailProfessorDocuments,
        }),
      }).catch(() => {}) // don't block save if API fails

      // Call optional save callback (for API persistence)
      if (onSave) {
        await onSave(preferences)
      }

      setOriginalPrefs(preferences)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      logger.error('NotificationsSection', 'Failed to save preferences', {
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
          Notification preferences saved!
        </div>
      )}

      {/* Email Notifications */}
      <div>
        <div className="flex items-center gap-2 b-mb-md">
          <Mail className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Email Notifications</h3>
        </div>

        <div className="space-y-3">
          <ToggleItem
            label="Learning Reminders"
            description="Get reminded to practice when you haven't been active"
            checked={preferences.emailLearningReminders}
            onChange={() => handleToggle('emailLearningReminders')}
          />
          <ToggleItem
            label="Weekly Progress Report"
            description="Receive a summary of your learning progress each week"
            checked={preferences.emailWeeklyProgress}
            onChange={() => handleToggle('emailWeeklyProgress')}
          />
          <ToggleItem
            label="Product Announcements"
            description="Be notified about new features and updates"
            checked={preferences.emailAnnouncements}
            onChange={() => handleToggle('emailAnnouncements')}
          />
          <ToggleItem
            label="Marketing & Promotions"
            description="Receive special offers and promotional content"
            checked={preferences.emailMarketing}
            onChange={() => handleToggle('emailMarketing')}
          />
        </div>
      </div>

      {/* University Notifications */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-md">
          <GraduationCap className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">
            University Notifications
          </h3>
        </div>

        <div className="space-y-3">
          <ToggleItem
            label="Deliverable Reviewed"
            description="Get notified when a professor reviews your work"
            checked={preferences.emailDeliverableReviewed}
            onChange={() => handleToggle('emailDeliverableReviewed')}
          />
          <ToggleItem
            label="Course Updates"
            description="Changes to courses or assignments you're enrolled in"
            checked={preferences.emailCourseUpdate}
            onChange={() => handleToggle('emailCourseUpdate')}
          />
          <ToggleItem
            label="Office Hours"
            description="Office hours booking updates and reminders"
            checked={preferences.emailOfficeHours}
            onChange={() => handleToggle('emailOfficeHours')}
          />
          <ToggleItem
            label="Peer Reviews"
            description="Peer review assignments and submissions"
            checked={preferences.emailPeerReview}
            onChange={() => handleToggle('emailPeerReview')}
          />
          <ToggleItem
            label="Endorsements & Badges"
            description="Peer review endorsements and badge awards"
            checked={preferences.emailPeerReviewEndorsed}
            onChange={() => handleToggle('emailPeerReviewEndorsed')}
          />
          <ToggleItem
            label="Professor Comments"
            description="Professor comments on your deliverables and ideas"
            checked={preferences.emailProfessorComments}
            onChange={() => handleToggle('emailProfessorComments')}
          />
          <ToggleItem
            label="Professor Documents"
            description="New documents uploaded by professors"
            checked={preferences.emailProfessorDocuments}
            onChange={() => handleToggle('emailProfessorDocuments')}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-md">
          <Smartphone className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Push Notifications</h3>
        </div>

        <div className="space-y-3">
          <ToggleItem
            label="Enable Push Notifications"
            description="Allow notifications in your browser"
            checked={preferences.pushEnabled}
            onChange={() => handleToggle('pushEnabled')}
          />

          {preferences.pushEnabled && (
            <>
              <ToggleItem
                label="Learning Reminders"
                description="Get push reminders to continue learning"
                checked={preferences.pushLearningReminders}
                onChange={() => handleToggle('pushLearningReminders')}
                indent
              />
              <ToggleItem
                label="Achievements"
                description="Be notified when you earn badges or reach milestones"
                checked={preferences.pushAchievements}
                onChange={() => handleToggle('pushAchievements')}
                indent
              />
            </>
          )}
        </div>
      </div>

      {/* Reminder Schedule */}
      <div className="pt-4 b-border-t">
        <div className="flex items-center gap-2 b-mb-md">
          <Calendar className="w-4 h-4 b-text-secondary" />
          <h3 className="b-font-medium b-text-primary">Reminder Schedule</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block b-text-sm b-text-secondary b-mb-sm">
              Frequency
            </label>
            <select
              value={preferences.reminderFrequency}
              onChange={(e) =>
                handleChange('reminderFrequency', e.target.value)
              }
              className="b-input"
            >
              <option value="daily">Every day</option>
              <option value="weekdays">Weekdays only</option>
              <option value="weekly">Once a week</option>
              <option value="none">No reminders</option>
            </select>
          </div>

          {preferences.reminderFrequency !== 'none' && (
            <div>
              <label className="block b-text-sm b-text-secondary b-mb-sm">
                Preferred Time
              </label>
              <input
                type="time"
                value={preferences.reminderTime}
                onChange={(e) => handleChange('reminderTime', e.target.value)}
                className="b-input"
              />
            </div>
          )}
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
              'Save Preferences'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

interface ToggleItemProps {
  label: string
  description: string
  checked: boolean
  onChange: () => void
  indent?: boolean
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
  indent,
}: ToggleItemProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 ${indent ? 'ml-6' : ''}`}
    >
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
