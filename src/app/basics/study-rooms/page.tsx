'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Link from 'next/link'
import { ArrowLeft, Users, Clock, Plus, VideoCamera } from '@phosphor-icons/react'
import { logger } from '@/lib/logger'

interface StudyRoom {
  id: string
  name: string
  topic: string
  creatorId: string
  creatorName: string
  currentParticipants: number
  maxParticipants: number
  isActive: boolean
  createdAt: string
}

export default function StudyRoomsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState<StudyRoom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Load active study rooms
  useEffect(() => {
    if (!user) return

    const roomsRef = collection(db, 'studyRooms')
    const q = query(
      roomsRef,
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StudyRoom[]

      setRooms(roomsData)
      setLoading(false)
    }, (error) => {
      logger.error('StudyRoomsPage', 'Error loading study rooms', { error })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  if (authLoading || loading) {
    return (
      <main className="min-h-screen b-bg-page flex items-center justify-center">
        <div className="b-animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--b-math)]"></div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen b-bg-page">
      {/* Header */}
      <header className="b-bg-elevated b-border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="b-text-secondary hover:b-text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="flex items-center gap-2">
                <VideoCamera size={24} className="b-text-logic" weight="fill" />
                <h1 className="b-text-xl b-font-bold b-text-primary">Study Rooms</h1>
              </div>
            </div>
            <button
              onClick={() => logger.warn('StudyRoomsPage', 'Create room modal not yet implemented')}
              className="b-btn b-btn-logic"
              aria-label="Create new study room"
            >
              <Plus size={18} weight="bold" />
              <span className="hidden sm:inline">Create Room</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {rooms.length === 0 ? (
          <div className="b-card b-p-xl text-center">
            <div className="w-20 h-20 b-bg-logic-light b-rounded-full flex items-center justify-center mx-auto b-mb-lg">
              <VideoCamera size={40} className="b-text-logic" weight="fill" />
            </div>
            <h2 className="b-text-xl b-font-bold b-text-primary b-mb-md">No Active Study Rooms</h2>
            <p className="b-text-secondary b-mb-lg max-w-md mx-auto">
              Study rooms are video spaces where you can learn together with other students.
              Create one to get started!
            </p>
            <button
              onClick={() => logger.warn('StudyRoomsPage', 'Create room modal not yet implemented')}
              className="b-btn b-btn-logic b-btn-lg"
            >
              <Plus size={20} weight="bold" />
              Create Study Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link
                key={room.id}
                href={`/basics/study-rooms/${room.id}`}
                className="b-card b-p-lg hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between b-mb-md">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 b-bg-logic-light b-rounded-full flex items-center justify-center">
                      <VideoCamera size={20} className="b-text-logic" weight="fill" />
                    </div>
                    <div>
                      <h3 className="b-font-semibold b-text-primary group-hover:b-text-logic transition-colors">
                        {room.name}
                      </h3>
                      <p className="b-text-sm b-text-muted">{room.creatorName}</p>
                    </div>
                  </div>
                  <span className="b-badge b-badge-success">
                    Live
                  </span>
                </div>
                
                <p className="b-text-secondary b-text-sm b-mb-md line-clamp-2">
                  {room.topic || 'General study session'}
                </p>

                <div className="flex items-center justify-between b-text-sm">
                  <div className="flex items-center gap-1 b-text-muted">
                    <Users size={16} />
                    <span>{room.currentParticipants}/{room.maxParticipants}</span>
                  </div>
                  <div className="flex items-center gap-1 b-text-muted">
                    <Clock size={16} />
                    <span>{new Date(room.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
