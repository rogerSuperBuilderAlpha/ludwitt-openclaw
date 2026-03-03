'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { useAchievements, getUserStats } from '@/lib/hooks/useAchievements'
import { ACHIEVEMENTS, getAchievementsByCategory, Achievement } from '@/lib/achievements/definitions'
import Link from 'next/link'

export default function AchievementsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { unlockedAchievements, totalPoints, loading: achievementsLoading, hasAchievement } = useAchievements(user?.uid)

  const [userStats, setUserStats] = useState<any>({})
  const [selectedCategory, setSelectedCategory] = useState<Achievement['category'] | 'all'>('all')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      getUserStats(user.uid).then(setUserStats)
    }
  }, [user])

  if (authLoading || achievementsLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const categories: Array<{ id: Achievement['category'] | 'all'; label: string; emoji: string }> = [
    { id: 'all', label: 'All', emoji: '🏆' },
    { id: 'builder', label: 'Builder', emoji: '🎯' },
    { id: 'social', label: 'Social', emoji: '👥' },
    { id: 'mentor', label: 'Mentor', emoji: '💼' },
    { id: 'milestone', label: 'Milestone', emoji: '🎖️' },
  ]

  const filteredAchievements = selectedCategory === 'all'
    ? ACHIEVEMENTS
    : getAchievementsByCategory(selectedCategory)

  const unlockedCount = unlockedAchievements.length
  const totalCount = ACHIEVEMENTS.length

  const getProgress = (achievement: Achievement): number => {
    const { metric, target } = achievement.requirement
    const current = userStats[metric] || 0

    if (typeof current === 'boolean') {
      return current ? 100 : 0
    }

    return Math.min((current / target) * 100, 100)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold bg-gray-900 bg-clip-text text-transparent">
                {totalPoints.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-3xl font-bold text-gray-900">{unlockedCount}</p>
              <p className="text-sm text-gray-600">Achievements Unlocked</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-3xl font-bold text-gray-900">
                {totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-3xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => {
            const unlocked = hasAchievement(achievement.id)
            const progress = getProgress(achievement)

            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden transition-colors ${
                  unlocked
                    ? 'border-purple-500 shadow-purple-200'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-6 ${unlocked ? 'bg-gray-50' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-5xl ${unlocked ? '' : 'grayscale opacity-40'}`}>
                      {achievement.emoji}
                    </div>
                    {unlocked && (
                      <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                        UNLOCKED
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-600">
                      +{achievement.points} points
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {achievement.category}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {!unlocked && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs font-semibold text-gray-700">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full transition-colors"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.requirement.type === 'count' && (
                          <>
                            {userStats[achievement.requirement.metric] || 0} / {achievement.requirement.target}
                          </>
                        )}
                        {achievement.requirement.type === 'streak' && (
                          <>
                            {userStats[achievement.requirement.metric] || 0} / {achievement.requirement.target} days
                          </>
                        )}
                        {achievement.requirement.type === 'milestone' && (
                          <>Keep building to unlock!</>
                        )}
                      </p>
                    </div>
                  )}

                  {unlocked && (
                    <div className="mt-4 text-center">
                      <p className="text-xs text-purple-600 font-semibold">
                        Unlocked {new Date(
                          unlockedAchievements.find((a) => a.achievementId === achievement.id)?.unlockedAt || ''
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No achievements in this category</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </main>
  )
}
