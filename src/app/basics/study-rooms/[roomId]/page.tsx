/**
 * Study Room Detail Page
 * Video conference room for collaborative studying
 */

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/ClientProvider'
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import {
  StudyRoom,
  RoomParticipant,
  ROOM_TYPE_INFO,
} from '@/lib/features/studyRooms/types'
import { leaveStudyRoom } from '@/lib/features/studyRooms/service'
import {
  Users,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react'
import Image from 'next/image'
import { DailyVideoCall } from '@/components/basics/DailyVideoCall'
import { logger } from '@/lib/logger'

export default function StudyRoomPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const roomId = params.roomId as string

  const [room, setRoom] = useState<StudyRoom | null>(null)
  const [participants, setParticipants] = useState<RoomParticipant[]>([])
  const [loading, setLoading] = useState(true)
  const [dailyRoomUrl, setDailyRoomUrl] = useState<string | null>(null)
  const [creatingRoom, setCreatingRoom] = useState(false)

  // Load room data
  useEffect(() => {
    if (!roomId) return

    const roomRef = doc(db, 'studyRooms', roomId)

    const unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        setRoom({ id: snapshot.id, ...snapshot.data() } as StudyRoom)
        setLoading(false)
      } else {
        setLoading(false)
        alert('Room not found')
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [roomId, router])

  // Load participants
  useEffect(() => {
    if (!roomId) return

    const participantsQuery = query(
      collection(db, 'roomParticipants'),
      where('__name__', '>=', `${roomId}_`),
      where('__name__', '<', `${roomId}_\uf8ff`)
    )

    const unsubscribe = onSnapshot(participantsQuery, (snapshot) => {
      const parts = snapshot.docs.map((doc) => doc.data() as RoomParticipant)
      setParticipants(parts)
    })

    return () => unsubscribe()
  }, [roomId])

  // Create/get Daily.co room
  useEffect(() => {
    if (!room || !user) return

    const createDailyRoom = async () => {
      setCreatingRoom(true)
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/study-rooms/create-daily-room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            roomId: room.id,
            roomName: room.name,
          }),
        })

        const data = await response.json()
        if (data.roomUrl) {
          setDailyRoomUrl(data.roomUrl)
        }
      } catch (error) {
        logger.error('StudyRoomPage', 'Error creating Daily room', { error })
      } finally {
        setCreatingRoom(false)
      }
    }

    createDailyRoom()
  }, [room, user])

  const handleLeaveRoom = async () => {
    if (!user || !room) return

    try {
      await leaveStudyRoom(roomId, user.uid, user.displayName || 'Anonymous')
      router.push('/')
    } catch (error) {
      logger.error('StudyRoomPage', 'Error leaving room', { error })
      router.push('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study room...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Room not found</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const typeInfo = ROOM_TYPE_INFO[room.type]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{typeInfo.icon}</span>
                  <h1 className="text-xl font-bold text-gray-900">
                    {room.name}
                  </h1>
                </div>
                <p className="text-sm text-gray-600">{typeInfo.label}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>
                  {participants.length} participant
                  {participants.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                onClick={handleLeaveRoom}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">Leave Room</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Area */}
          <div className="lg:col-span-3">
            {/* Main Video Container */}
            <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video">
              {creatingRoom ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Setting up video call...</p>
                  </div>
                </div>
              ) : dailyRoomUrl && user ? (
                <DailyVideoCall
                  roomUrl={dailyRoomUrl}
                  userName={user.displayName || user.email || 'Anonymous'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      Video Conference
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {!dailyRoomUrl
                        ? 'Video not available (API key needed)'
                        : 'Loading video...'}
                    </p>
                    <div className="text-sm text-gray-500 bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                      <p className="mb-2">This room will support:</p>
                      <ul className="text-left space-y-1">
                        <li>• Screen sharing</li>
                        <li>• Voice chat</li>
                        <li>• Video chat</li>
                        <li>• Text messaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Participants List */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Participants ({participants.length})
                </h3>
              </div>

              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {participants.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No participants yet
                  </div>
                ) : (
                  participants.map((participant, index) => (
                    <div
                      key={`${participant.userId}-${index}`}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {participant.userPhotoURL ? (
                          <Image
                            src={participant.userPhotoURL}
                            alt={participant.userName}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full"
                            unoptimized
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                            {participant.userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {participant.userName}
                            {participant.userId === user?.uid && (
                              <span className="ml-1 text-xs text-purple-600">
                                (You)
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {participant.status === 'active'
                              ? '🟢 Active'
                              : '⚪ Idle'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Study Tips */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">
                  💡 Study Tips
                </h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Share your screen to show your work</li>
                  <li>• Use the chat for quick questions</li>
                  <li>• Take breaks every 25 minutes</li>
                  <li>• Help each other understand</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
