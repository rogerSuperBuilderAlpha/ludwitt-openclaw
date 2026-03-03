'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import {
  User,
  Bell,
  Shield,
  Trophy,
  Link2,
  Lock,
  Palette,
  Database,
  AlertTriangle,
  Accessibility,
  Volume2,
  Target,
  ExternalLink,
  Info,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { LoginConnectionsSection } from '@/components/auth/LoginConnectionsSection'
import {
  AccountEditSection,
  PasswordChangeSection,
  NotificationsSection,
  PrivacySection,
  PreferencesSection,
  DataExportSection,
  DangerZoneSection,
  TwoFactorSection,
  AIModelSection,
  LeaderboardProfileSection,
  AccessibilitySection,
  SoundSection,
  LearningGoalsSection,
  SettingsCard,
  QuickLinksSection,
  AboutSection,
  ProfessorProfileSection,
  SettingsHeader,
} from '@/components/settings'
import { isProfessor } from '@/config/developers'
import { logger } from '@/lib/logger'

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const fetchApi = useApiFetch()

  const [loading, setLoading] = useState(true)

  // Accessibility settings
  const [reduceMotion, setReduceMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largerText, setLargerText] = useState(false)

  // Sound settings
  const [soundEffects, setSoundEffects] = useState(true)
  const [celebrationSounds, setCelebrationSounds] = useState(true)

  // Learning Goals
  const [dailyXpGoal, setDailyXpGoal] = useState('1000')
  const [focusAreas, setFocusAreas] = useState<string[]>([])

  const saveSettingsSection = useCallback(
    async (section: string, data: Record<string, unknown>) => {
      try {
        await fetchApi('/api/user/settings', {
          method: 'PUT',
          body: JSON.stringify({ section, data }),
        })
      } catch (err) {
        logger.error('SettingsPage', `Failed to save ${section} settings`, {
          error: err,
        })
      }
    },
    [fetchApi]
  )

  // Load server-side settings
  useEffect(() => {
    if (!user) return
    const loadSettings = async () => {
      try {
        const result = await fetchApi<{ settings: Record<string, any> }>(
          '/api/user/settings'
        )
        const s = result.settings || {}
        if (s.accessibility) {
          setReduceMotion(!!s.accessibility.reduceMotion)
          setHighContrast(!!s.accessibility.highContrast)
          setLargerText(!!s.accessibility.largerText)
        }
        if (s.sound) {
          setSoundEffects(s.sound.soundEffects ?? true)
          setCelebrationSounds(s.sound.celebrationSounds ?? true)
        }
        if (s.learning) {
          setDailyXpGoal(s.learning.dailyXpGoal || '1000')
          setFocusAreas(s.learning.focusAreas || [])
        }
      } catch {
        // Settings may not exist yet -- use defaults
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [user, fetchApi])

  // Apply accessibility classes
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('reduce-motion', reduceMotion)
    root.classList.toggle('high-contrast', highContrast)
    root.classList.toggle('larger-text', largerText)
  }, [reduceMotion, highContrast, largerText])

  const handleAccessibilityToggle = useCallback(
    (key: 'reduceMotion' | 'highContrast' | 'largerText') => {
      const setters = {
        reduceMotion: setReduceMotion,
        highContrast: setHighContrast,
        largerText: setLargerText,
      }
      setters[key]((prev) => {
        const newVal = !prev
        const current = { reduceMotion, highContrast, largerText }
        saveSettingsSection('accessibility', { ...current, [key]: newVal })
        return newVal
      })
    },
    [reduceMotion, highContrast, largerText, saveSettingsSection]
  )

  const handleSoundToggle = useCallback(
    (key: 'soundEffects' | 'celebrationSounds') => {
      const setters = {
        soundEffects: setSoundEffects,
        celebrationSounds: setCelebrationSounds,
      }
      setters[key]((prev) => {
        const newVal = !prev
        const current = { soundEffects, celebrationSounds }
        saveSettingsSection('sound', { ...current, [key]: newVal })
        return newVal
      })
    },
    [soundEffects, celebrationSounds, saveSettingsSection]
  )

  const handleLearningUpdate = useCallback(
    (data: { dailyXpGoal: string; focusAreas: string[] }) => {
      setDailyXpGoal(data.dailyXpGoal)
      setFocusAreas(data.focusAreas)
      saveSettingsSection('learning', data)
    },
    [saveSettingsSection]
  )

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (!user || loading) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--b-logic)] mx-auto b-mb-lg"></div>
          <p className="b-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen b-bg-page">
      <SettingsHeader />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="b-mb-xl">
          <h1 className="b-text-3xl b-font-bold b-text-primary b-mb-sm">
            Settings
          </h1>
          <p className="b-text-secondary">
            Manage your account, security, and preferences
          </p>
        </div>

        <SettingsCard icon={User} title="Account">
          <AccountEditSection user={user} />
        </SettingsCard>

        {isProfessor(user.email) && (
          <SettingsCard icon={GraduationCap} title="Professor Profile">
            <ProfessorProfileSection />
          </SettingsCard>
        )}

        <SettingsCard
          icon={Link2}
          title="Login Connections"
          description="Manage how you sign in to your account. Add or remove sign-in methods."
        >
          <LoginConnectionsSection user={user} />
        </SettingsCard>

        <SettingsCard icon={Lock} title="Password">
          <PasswordChangeSection user={user} />
        </SettingsCard>

        <SettingsCard
          icon={Shield}
          title="Two-Factor Authentication"
          description="Add an extra layer of security by requiring a verification code from your phone when signing in."
        >
          <TwoFactorSection user={user} />
        </SettingsCard>

        <SettingsCard icon={Bell} title="Notifications">
          <NotificationsSection
            userId={user.uid}
            onSave={(prefs) =>
              saveSettingsSection(
                'notifications',
                prefs as unknown as Record<string, unknown>
              )
            }
          />
        </SettingsCard>

        <SettingsCard icon={Shield} title="Privacy">
          <PrivacySection
            userId={user.uid}
            onSave={(settings) =>
              saveSettingsSection(
                'privacy',
                settings as unknown as Record<string, unknown>
              )
            }
          />
        </SettingsCard>

        <SettingsCard icon={Palette} title="Preferences">
          <PreferencesSection
            userId={user.uid}
            onSave={(prefs) =>
              saveSettingsSection(
                'preferences',
                prefs as unknown as Record<string, unknown>
              )
            }
          />
        </SettingsCard>

        <SettingsCard
          icon={Sparkles}
          title="AI Model"
          iconClassName="b-text-logic"
        >
          <AIModelSection userId={user.uid} />
        </SettingsCard>

        <SettingsCard icon={Trophy} title="Leaderboard Profile">
          <LeaderboardProfileSection user={user} fetchApi={fetchApi} />
        </SettingsCard>

        <SettingsCard icon={Target} title="Learning Goals">
          <LearningGoalsSection
            dailyXpGoal={dailyXpGoal}
            focusAreas={focusAreas}
            onUpdate={handleLearningUpdate}
          />
        </SettingsCard>

        <SettingsCard icon={Accessibility} title="Accessibility">
          <AccessibilitySection
            reduceMotion={reduceMotion}
            highContrast={highContrast}
            largerText={largerText}
            onToggle={handleAccessibilityToggle}
          />
        </SettingsCard>

        <SettingsCard icon={Volume2} title="Sound & Haptics">
          <SoundSection
            soundEffects={soundEffects}
            celebrationSounds={celebrationSounds}
            onToggle={handleSoundToggle}
          />
        </SettingsCard>

        <SettingsCard icon={ExternalLink} title="Quick Links">
          <QuickLinksSection />
        </SettingsCard>

        <SettingsCard icon={Database} title="Data & Export">
          <DataExportSection userId={user.uid} userEmail={user.email || ''} />
        </SettingsCard>

        <SettingsCard icon={Info} title="About">
          <AboutSection />
        </SettingsCard>

        <SettingsCard
          icon={AlertTriangle}
          title="Danger Zone"
          iconClassName="b-text-danger"
          titleClassName="b-text-danger"
          cardClassName="b-card b-p-xl"
          cardStyle={{ borderColor: 'var(--b-danger-border)' }}
        >
          <DangerZoneSection user={user} />
        </SettingsCard>
      </div>
    </div>
  )
}
