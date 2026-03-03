'use client'

import { Users, SignIn, SignOut, ArrowSquareOut } from '@phosphor-icons/react'
import type { StudyRoom } from '@/lib/types/university'

interface StudyRoomCardProps {
  room: StudyRoom
  onJoin: () => void
  onLeave: () => void
  isJoined: boolean
  currentUserId: string
}

export function StudyRoomCard({ room, onJoin, onLeave, isJoined, currentUserId }: StudyRoomCardProps) {
  const participantCount = room.participants.length
  const hasParticipants = participantCount > 0

  return (
    <div
      className={`bg-white border rounded-lg p-4 shadow-sm ${
        hasParticipants ? 'border-green-200' : 'border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              hasParticipants ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          <h3 className="text-sm font-semibold text-gray-900">{room.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={14} />
          <span>{participantCount}</span>
        </div>
      </div>

      {/* Participants */}
      {hasParticipants && (
        <div className="flex flex-wrap gap-2 mb-3">
          {room.participants.map((p) => (
            <div
              key={p.userId}
              className="flex items-center gap-1.5"
            >
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-600">
                {p.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-gray-600">
                {p.userId === currentUserId ? 'You' : p.displayName}
              </span>
              {p.role === 'professor' && (
                <span className="text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Prof
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {!hasParticipants && (
        <p className="text-xs text-gray-400 mb-3">No one is currently in this room.</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isJoined ? (
          <button
            onClick={onLeave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <SignOut size={14} />
            Leave
          </button>
        ) : (
          <button
            onClick={onJoin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <SignIn size={14} />
            Join
          </button>
        )}

        <a
          href={room.roomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowSquareOut size={14} />
          Open Room
        </a>
      </div>
    </div>
  )
}
