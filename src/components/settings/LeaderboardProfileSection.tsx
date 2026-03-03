/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { AVATAR_CHARACTERS, AVATAR_CATEGORIES } from '@/data/avatars'
import { COUNTRY_REGIONS, COUNTRIES } from '@/data/country-regions'
import { logger } from '@/lib/logger'

interface UserAvatarData {
  avatar?: {
    type: 'photo' | 'character'
    characterId?: string
    nickname?: string
    photoURL?: string
    displayName?: string
    isCompleted?: boolean
  }
  region?: string
  country?: string
  ageVerification?: {
    birthDate: string
    isOver18: boolean
    verifiedAt: string
  }
}

interface LeaderboardProfileSectionProps {
  user: User
  fetchApi: <T = any>(
    endpoint: string,
    options?: RequestInit & { requireAuth?: boolean }
  ) => Promise<T>
}

export function LeaderboardProfileSection({
  user,
  fetchApi,
}: LeaderboardProfileSectionProps) {
  const [avatarData, setAvatarData] = useState<UserAvatarData | null>(null)
  const [selectedAvatarType, setSelectedAvatarType] = useState<
    'photo' | 'character'
  >('character')
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('')
  const [nickname, setNickname] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAvatarData = async () => {
      try {
        const data = await fetchApi<{
          hasCompletedSetup: boolean
          avatarData: UserAvatarData
        }>('/api/basics/check-avatar')

        if (data && data.hasCompletedSetup && data.avatarData) {
          setAvatarData(data.avatarData)

          if (data.avatarData.avatar) {
            setSelectedAvatarType(data.avatarData.avatar.type || 'character')
            setSelectedCharacterId(data.avatarData.avatar.characterId || '')
            setNickname(data.avatarData.avatar.nickname || '')
          }
          setCountry(data.avatarData.country || '')
          setRegion(data.avatarData.region || '')
        }
      } catch (err) {
        logger.error('LeaderboardProfileSection', 'Error loading avatar data', {
          error: err,
        })
      } finally {
        setLoading(false)
      }
    }

    loadAvatarData()
  }, [fetchApi])

  const handleSaveProfile = async (retryCount: number = 0): Promise<void> => {
    setError(null)
    setSaving(true)
    setSaveSuccess(false)

    const maxRetries = 2

    try {
      if (selectedAvatarType === 'character' && !selectedCharacterId) {
        throw new Error('Please select an avatar character')
      }
      if (
        selectedAvatarType === 'character' &&
        (!nickname || nickname.trim().length < 1)
      ) {
        throw new Error('Please enter a nickname')
      }
      if (!country) {
        throw new Error('Please select your country')
      }
      if (!region) {
        throw new Error('Please select your state/region')
      }

      const isOver18 = avatarData?.ageVerification?.isOver18 ?? true
      const birthDate =
        avatarData?.ageVerification?.birthDate ||
        new Date().toISOString().split('T')[0]

      await fetchApi('/api/basics/save-avatar', {
        method: 'POST',
        body: JSON.stringify({
          birthDate,
          isOver18,
          country,
          region,
          avatarType: selectedAvatarType,
          characterId:
            selectedAvatarType === 'character'
              ? selectedCharacterId
              : undefined,
          nickname: nickname.trim() || undefined,
        }),
      })

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      if (retryCount < maxRetries) {
        const errorMsg = err instanceof Error ? err.message.toLowerCase() : ''
        const isTransientError =
          errorMsg.includes('timeout') ||
          errorMsg.includes('network') ||
          errorMsg.includes('failed to fetch') ||
          errorMsg.includes('verification failed')

        if (isTransientError) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 * (retryCount + 1))
          )
          setSaving(false)
          return handleSaveProfile(retryCount + 1)
        }
      }

      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save profile'
      setError(
        retryCount > 0 ? `${errorMessage}. Please try again.` : errorMessage
      )
    } finally {
      setSaving(false)
    }
  }

  const selectedAvatar = AVATAR_CHARACTERS.find(
    (a) => a.id === selectedCharacterId
  )
  const filteredAvatars =
    selectedCategory === 'all'
      ? AVATAR_CHARACTERS
      : AVATAR_CHARACTERS.filter((a) => a.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex items-center justify-center b-p-xl">
        <Loader2 className="w-5 h-5 b-animate-spin b-text-secondary" />
      </div>
    )
  }

  return (
    <>
      {/* Avatar Type Selection (only for over 18) */}
      {avatarData?.ageVerification?.isOver18 !== false && (
        <div className="b-mb-lg">
          <label className="block b-text-sm b-font-medium b-text-primary b-mb-md">
            Display Style
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedAvatarType('photo')}
              className={`flex items-center gap-3 b-p-lg b-rounded-lg border-2 transition-all ${
                selectedAvatarType === 'photo'
                  ? 'border-[var(--b-logic)] b-bg-logic-light'
                  : 'b-border hover:border-[var(--b-border-medium)]'
              }`}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || user.email || 'User avatar'}
                  width={32}
                  height={32}
                  className="w-8 h-8 b-rounded-full"
                />
              ) : (
                <div className="w-8 h-8 b-rounded-full b-bg-muted" />
              )}
              <span className="b-font-medium b-text-sm">Use my photo</span>
            </button>
            <button
              onClick={() => setSelectedAvatarType('character')}
              className={`flex items-center gap-3 b-p-lg b-rounded-lg border-2 transition-all ${
                selectedAvatarType === 'character'
                  ? 'border-[var(--b-logic)] b-bg-logic-light'
                  : 'b-border hover:border-[var(--b-border-medium)]'
              }`}
            >
              <span className="b-text-2xl">
                {selectedAvatar?.emoji || '🦁'}
              </span>
              <span className="b-font-medium b-text-sm">Use avatar</span>
            </button>
          </div>
        </div>
      )}

      {/* Avatar Selection */}
      {(selectedAvatarType === 'character' ||
        avatarData?.ageVerification?.isOver18 === false) && (
        <>
          {/* Category Tabs */}
          <div className="b-mb-md">
            <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
              Choose Avatar
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`b-btn b-btn-sm ${
                  selectedCategory === 'all'
                    ? 'b-btn-logic-soft'
                    : 'b-btn-secondary'
                }`}
              >
                All
              </button>
              {AVATAR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`b-btn b-btn-sm ${
                    selectedCategory === cat.id
                      ? 'b-btn-logic-soft'
                      : 'b-btn-secondary'
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Avatar Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 b-mb-lg max-h-48 overflow-y-auto b-p-sm b-bg-muted b-rounded-lg">
            {filteredAvatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedCharacterId(avatar.id)}
                className={`b-p-sm b-rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedCharacterId === avatar.id
                    ? 'border-[var(--b-logic)] b-bg-logic-light b-shadow-md'
                    : 'b-border hover:border-[var(--b-logic-border)] b-bg-elevated'
                }`}
                title={avatar.name}
              >
                <div className="b-text-2xl text-center">{avatar.emoji}</div>
              </button>
            ))}
          </div>

          {/* Nickname */}
          <div className="b-mb-lg">
            <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
              Leaderboard Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, 20))}
              placeholder="Enter a nickname (max 20 characters)"
              className="b-input"
              maxLength={20}
            />
            <p className="b-text-xs b-text-muted b-mt-sm">
              {nickname.length}/20 characters
            </p>
          </div>
        </>
      )}

      {/* Country & Region */}
      <div className="grid grid-cols-2 gap-4 b-mb-lg">
        <div>
          <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setRegion('')
            }}
            className="b-input"
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block b-text-sm b-font-medium b-text-primary b-mb-sm">
            State/Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="b-input"
            disabled={!country}
          >
            <option value="">
              {country ? 'Select state/region' : 'Select country first'}
            </option>
            {country &&
              COUNTRY_REGIONS[country]?.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="b-mb-lg b-p-lg b-bg-muted b-rounded-lg">
        <label className="block b-text-sm b-font-medium b-text-primary b-mb-md">
          Preview
        </label>
        <div className="flex items-center gap-3">
          {selectedAvatarType === 'photo' ? (
            user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || user.email || 'User avatar'}
                width={48}
                height={48}
                className="w-12 h-12 b-rounded-full"
              />
            ) : (
              <div className="w-12 h-12 b-rounded-full b-bg-logic b-text-inverse flex items-center justify-center b-text-lg b-font-semibold">
                {(user.displayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )
          ) : (
            <div
              className="w-12 h-12 b-rounded-full flex items-center justify-center b-text-2xl"
              style={{
                backgroundColor:
                  selectedAvatar?.colorScheme + '20' || 'var(--b-bg-muted)',
              }}
            >
              {selectedAvatar?.emoji || '👤'}
            </div>
          )}
          <div>
            <p className="b-font-semibold b-text-primary">
              {selectedAvatarType === 'photo'
                ? user.displayName || 'Your Name'
                : nickname || selectedAvatar?.name || 'Your Name'}
            </p>
            <p className="b-text-sm b-text-muted">
              {region && country ? `${region}, ${country}` : 'Your Location'}
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="b-feedback b-feedback-error b-mb-md">{error}</div>
      )}

      {/* Success */}
      {saveSuccess && (
        <div className="b-feedback b-feedback-success b-mb-md">
          <Check className="w-4 h-4" />
          Profile saved successfully!
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={() => handleSaveProfile(0)}
        disabled={saving}
        className="b-btn b-btn-logic b-btn-lg b-btn-full"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 b-animate-spin" />
            Saving...
          </>
        ) : (
          'Save Leaderboard Profile'
        )}
      </button>
    </>
  )
}
