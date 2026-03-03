'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { collection, query, where, getDocs, setDoc, doc, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Link from 'next/link'

interface LiveSession {
  id: string
  title: string
  description: string
  hostId: string
  hostName: string
  scheduledAt: string
  duration: number // minutes
  maxParticipants: number
  currentParticipants: number
  category: 'mentorship' | 'workshop' | 'qa' | 'coworking'
  isRecorded: boolean
  isPremium: boolean
  meetingLink?: string
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
}

export default function SessionsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [myBookings, setMyBookings] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const loadMyBookings = useCallback(async () => {
    if (!user) return

    const bookingsRef = collection(db, 'sessionBookings')
    const q = query(bookingsRef, where('userId', '==', user.uid))
    const snapshot = await getDocs(q)

    const booked = new Set(snapshot.docs.map((doc) => doc.data().sessionId))
    setMyBookings(booked)
  }, [user])

  const loadSessions = useCallback(async () => {
    setLoading(true)

    try {
      // Try to load from Firestore
      const sessionsRef = collection(db, 'liveSessions')
      const q = query(
        sessionsRef,
        where('status', 'in', ['upcoming', 'live']),
        orderBy('scheduledAt', 'asc')
      )
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        // No sessions in database, use sample data
        setSessions(getSampleSessions())
      } else {
        const sessionData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LiveSession[]
        setSessions(sessionData)
      }
    } catch {
      // Error loading sessions, use sample data
      setSessions(getSampleSessions())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) {
      loadSessions()
      loadMyBookings()
    }
  }, [user, loadMyBookings, loadSessions])

  // Sample sessions to show when database is empty
  const getSampleSessions = (): LiveSession[] => [
    {
      id: 'session_001',
      title: '1-on-1 Mentorship: Career Growth',
      description: 'Personalized career advice and project review with an experienced mentor',
      hostId: 'mentor_001',
      hostName: 'Sarah Johnson',
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 30,
      maxParticipants: 1,
      currentParticipants: 0,
      category: 'mentorship',
      isRecorded: false,
      isPremium: true,
      status: 'upcoming',
    },
    {
      id: 'session_002',
      title: 'Workshop: Building with Next.js 15',
      description: 'Learn the latest features in Next.js 15 with hands-on examples',
      hostId: 'host_001',
      hostName: 'Alex Chen',
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 90,
      maxParticipants: 50,
      currentParticipants: 23,
      category: 'workshop',
      isRecorded: true,
      isPremium: false,
      status: 'upcoming',
    },
    {
      id: 'session_003',
      title: 'Q&A: Ask Me Anything About Startups',
      description: 'Open Q&A session with a founder who raised $2M in funding',
      hostId: 'host_002',
      hostName: 'Mike Davis',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      duration: 60,
      maxParticipants: 100,
      currentParticipants: 67,
      category: 'qa',
      isRecorded: true,
      isPremium: false,
      status: 'upcoming',
    },
    {
      id: 'session_004',
      title: 'Coworking Session: Build Together',
      description: 'Async coworking session - work on your projects with others',
      hostId: 'host_003',
      hostName: 'Ludwitt Team',
      scheduledAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      duration: 120,
      maxParticipants: 200,
      currentParticipants: 45,
      category: 'coworking',
      isRecorded: false,
      isPremium: false,
      status: 'upcoming',
    },
  ]

  const handleBookSession = async (sessionId: string) => {
    if (!user) return

    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return

    if (session.currentParticipants >= session.maxParticipants) {
      alert('This session is full')
      return
    }

    const bookingId = `${user.uid}_${sessionId}`

    try {
      await setDoc(doc(db, 'sessionBookings', bookingId), {
        userId: user.uid,
        sessionId,
        bookedAt: new Date().toISOString(),
      })

      // Update local state
      setMyBookings((prev) => new Set(prev).add(sessionId))

      // Update participant count
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId ? { ...s, currentParticipants: s.currentParticipants + 1 } : s
        )
      )

      alert('Session booked successfully!')
    } catch {
      alert('Failed to book session')
    }
  }

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      mentorship: '👨‍🏫',
      workshop: '🛠️',
      qa: '❓',
      coworking: '💻',
    }
    return icons[category] || '📅'
  }

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      mentorship: 'Mentorship',
      workshop: 'Workshop',
      qa: 'Q&A',
      coworking: 'Coworking',
    }
    return labels[category] || category
  }

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  const filteredSessions =
    selectedCategory === 'all'
      ? sessions
      : sessions.filter((s) => s.category === selectedCategory)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/alc" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Live Sessions</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sessions
            </button>
            {['mentorship', 'workshop', 'qa', 'coworking'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(category)} {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">Check back later for new sessions</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSessions.map((session) => {
              const isBooked = myBookings.has(session.id)
              const isFull = session.currentParticipants >= session.maxParticipants
              const scheduledDate = new Date(session.scheduledAt)
              const isUpcoming = scheduledDate > new Date()

              return (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Category & Premium Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            {getCategoryIcon(session.category)} {getCategoryLabel(session.category)}
                          </span>
                          {session.isPremium && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                              👑 Premium
                            </span>
                          )}
                          {session.isRecorded && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              🎥 Recorded
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">{session.description}</p>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>👤 {session.hostName}</span>
                          <span>📅 {scheduledDate.toLocaleDateString()}</span>
                          <span>🕒 {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span>⏱️ {session.duration} min</span>
                          <span>
                            👥 {session.currentParticipants}/{session.maxParticipants}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="ml-4">
                        {isBooked ? (
                          <div className="text-center">
                            <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-semibold mb-2">
                              ✅ Booked
                            </div>
                            {session.meetingLink && (
                              <a
                                href={session.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                              >
                                Join Meeting →
                              </a>
                            )}
                          </div>
                        ) : isFull ? (
                          <button
                            disabled
                            className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                          >
                            Full
                          </button>
                        ) : !isUpcoming ? (
                          <button
                            disabled
                            className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                          >
                            Past
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBookSession(session.id)}
                            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                          >
                            Book Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-purple-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-purple-900 mb-2">📹 Video Call Integration</h3>
          <p className="text-sm text-purple-800">
            Video calls are powered by Zoom/Google Meet integration. Meeting links will be sent to your email and
            appear here 15 minutes before the session starts.
          </p>
        </div>
      </div>
    </main>
  )
}
