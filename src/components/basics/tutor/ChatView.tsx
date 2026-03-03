'use client'

/**
 * ChatView
 *
 * Real-time chat interface for an active tutor session.
 * Displays a countdown timer, message history, and a message
 * input field. Messages are aligned based on the current user.
 */

import { Clock, PaperPlaneRight } from '@phosphor-icons/react'
import { TutorSession, TutorMessage } from '@/lib/types/tutor'

interface ChatViewProps {
  activeSession: TutorSession
  messages: TutorMessage[]
  newMessage: string
  onNewMessageChange: (msg: string) => void
  onSendMessage: () => void
  remainingSeconds: number
  formatTime: (seconds: number) => string
  userId: string | undefined
}

export function ChatView({
  activeSession,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  remainingSeconds,
  formatTime,
  userId,
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-[400px]">
      {/* Timer */}
      <div className="b-bg-writing-light border b-border-writing rounded-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={18} className="b-text-writing" />
          <span className="font-medium b-text-writing">Time Remaining</span>
        </div>
        <span
          className={`font-mono font-bold ${remainingSeconds < 60 ? 'text-red-600' : 'b-text-writing'}`}
        >
          {formatTime(remainingSeconds)}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.senderId === userId
                  ? 'b-bg-math text-white'
                  : 'b-bg-muted b-text-primary'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center b-text-muted py-4">
            Start the conversation!
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border b-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="px-4 py-3 b-bg-math text-white rounded-lg hover:b-bg-math disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <PaperPlaneRight size={20} />
        </button>
      </div>
    </div>
  )
}
