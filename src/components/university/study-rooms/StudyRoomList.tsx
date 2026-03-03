/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState } from 'react'
import {
  VideoCamera,
  Plus,
  ArrowLeft,
  CalendarBlank,
  Clock,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useStudyRooms, useStudySessions } from '@/lib/hooks/useStudyRooms'
import { StudyRoomCard } from './StudyRoomCard'
import { ScheduleSessionForm } from './ScheduleSessionForm'

interface StudyRoomListProps {
  learningPathId: string
  onBack: () => void
}

export function StudyRoomList({ learningPathId, onBack }: StudyRoomListProps) {
  const { user } = useAuth()
  const {
    rooms,
    loading: roomsLoading,
    createRoom,
    joinRoom,
    leaveRoom,
  } = useStudyRooms(learningPathId)
  const {
    sessions,
    loading: sessionsLoading,
    createSession,
  } = useStudySessions(learningPathId)

  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [creating, setCreating] = useState(false)
  const [schedulingRoomId, setSchedulingRoomId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const currentUserId = user?.uid || ''

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomName.trim()) return

    setCreating(true)
    setActionError(null)

    try {
      await createRoom(roomName.trim())
      setRoomName('')
      setShowCreateRoom(false)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to create room'
      )
    } finally {
      setCreating(false)
    }
  }

  const handleJoin = async (roomId: string) => {
    setActionError(null)
    try {
      await joinRoom(roomId)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to join room')
    }
  }

  const handleLeave = async (roomId: string) => {
    setActionError(null)
    try {
      await leaveRoom(roomId)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to leave room'
      )
    }
  }

  const handleScheduleSession = async (data: {
    studyRoomId: string
    title: string
    description?: string
    scheduledAt: string
    durationMinutes: number
  }) => {
    await createSession(data)
    setSchedulingRoomId(null)
  }

  const formatSessionDate = (isoString: string) => {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ArrowLeft size={18} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-2">
            <VideoCamera size={20} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Study Rooms</h2>
          </div>
        </div>

        <button
          onClick={() => setShowCreateRoom(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus size={14} />
          Create Room
        </button>
      </div>

      {/* Error */}
      {actionError && (
        <div className="mb-4 p-3 text-xs text-red-700 bg-red-50 rounded-md border border-red-100">
          {actionError}
        </div>
      )}

      {/* Create Room Form */}
      {showCreateRoom && (
        <form
          onSubmit={handleCreateRoom}
          className="mb-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <label
            htmlFor="room-name"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Room Name
          </label>
          <div className="flex gap-2">
            <input
              id="room-name"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Deliverable 3 Study Group"
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              autoFocus
            />
            <button
              type="submit"
              disabled={creating || !roomName.trim()}
              className="px-4 py-2 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCreateRoom(false)
                setRoomName('')
              }}
              className="px-3 py-2 text-xs font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Rooms List */}
      {roomsLoading ? (
        <div className="text-center py-12 text-sm text-gray-400">
          Loading rooms...
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
          <VideoCamera size={32} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm text-gray-500 mb-1">No study rooms yet</p>
          <p className="text-xs text-gray-400">
            Create a room to start collaborating with peers.
          </p>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {rooms.map((room) => (
            <div key={room.id}>
              <StudyRoomCard
                room={room}
                onJoin={() => handleJoin(room.id)}
                onLeave={() => handleLeave(room.id)}
                isJoined={room.participants.some(
                  (p) => p.userId === currentUserId
                )}
                currentUserId={currentUserId}
              />

              {/* Schedule session button per room */}
              {schedulingRoomId !== room.id && (
                <button
                  onClick={() => setSchedulingRoomId(room.id)}
                  className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <CalendarBlank size={12} />
                  Schedule a session
                </button>
              )}

              {/* Schedule session form */}
              {schedulingRoomId === room.id && (
                <div className="mt-3">
                  <ScheduleSessionForm
                    studyRoomId={room.id}
                    onSubmit={handleScheduleSession}
                    onCancel={() => setSchedulingRoomId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Sessions */}
      {!sessionsLoading && sessions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarBlank size={16} className="text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">
              Upcoming Sessions
            </h3>
          </div>

          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {session.title}
                    </h4>
                    {session.description && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {session.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {session.attendees.length} attending
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarBlank size={12} />
                    {formatSessionDate(session.scheduledAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {session.durationMinutes} min
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-400">
                  Hosted by {session.hostName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
