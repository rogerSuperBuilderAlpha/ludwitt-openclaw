'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAvatarById } from '@/data/avatars'
import { CaretLeft, PencilSimpleLine } from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface WritingEntry {
  userId: string
  displayName: string
  photoURL?: string
  characterId?: string
  writingXP: number
  rank: number
  isCurrentUser: boolean
  region?: string
}

export default function WritingLeaderboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [entries, setEntries] = useState<WritingEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = useState<WritingEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      setLoading(true)
      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/basics/leaderboard/writing?limit=50', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const json = await res.json()
        if (json.success) {
          setEntries(json.data.entries)
          setCurrentUserEntry(json.data.currentUserEntry || null)
        }
      } catch (err) {
        logger.error('WritingLeaderboardPage', 'Failed to load writing leaderboard', { error: err })
        setEntries([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  const getRankDisplay = (rank: number): string => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--b-writing, #8b5cf6)' }} />
          <p className="b-text-secondary">Loading writing leaderboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen b-bg-page">
      {/* Header */}
      <div className="b-bg-card b-border-b" style={{ backgroundColor: 'var(--b-bg-card)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/basics/leaderboard"
              className="flex items-center gap-2 b-text-secondary hover:b-text-primary transition-colors"
            >
              <CaretLeft size={20} weight="bold" />
              <span className="b-font-medium">All Leaderboards</span>
            </Link>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <PencilSimpleLine size={32} weight="fill" style={{ color: 'var(--b-writing, #8b5cf6)' }} />
              <h1 className="text-3xl font-bold b-text-primary">Writing Leaderboard</h1>
            </div>
            <p className="b-text-secondary">Top students ranked by Writing XP earned</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Leaderboard Table */}
        <div className="b-card overflow-hidden">
          <div className="p-4" style={{ backgroundColor: 'var(--b-writing, #8b5cf6)' }}>
            <h2 className="text-lg font-bold text-white">Top 50 - Writing</h2>
            <p className="text-sm text-white opacity-80">Ranked by total Writing XP</p>
          </div>

          <div className="divide-y" style={{ borderColor: 'var(--b-border-light)' }}>
            {entries.length === 0 ? (
              <div className="p-12 text-center">
                <PencilSimpleLine size={48} className="mx-auto mb-4 opacity-30" />
                <p className="b-text-secondary">No writing XP earned yet. Submit an essay to get started!</p>
              </div>
            ) : (
              entries.map((entry) => {
                const avatar = entry.characterId ? getAvatarById(entry.characterId) : null
                return (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-4 p-4 transition-colors ${
                      entry.isCurrentUser ? 'bg-purple-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 text-center font-bold text-lg b-text-secondary">
                      {getRankDisplay(entry.rank)}
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                      {avatar ? (
                        <span className="text-2xl" style={{ color: avatar.colorScheme }}>{avatar.emoji}</span>
                      ) : entry.photoURL ? (
                        <Image src={entry.photoURL} alt={entry.displayName} width={40} height={40} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-gray-500">{entry.displayName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold b-text-primary truncate">{entry.displayName}</span>
                        {entry.isCurrentUser && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--b-writing, #8b5cf6)', color: 'white' }}>You</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold" style={{ color: 'var(--b-writing, #8b5cf6)' }}>{entry.writingXP.toLocaleString()}</p>
                      <p className="text-xs b-text-secondary">Writing XP</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
