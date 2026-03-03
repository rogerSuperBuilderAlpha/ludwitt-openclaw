'use client'

/**
 * ChatMessage Component
 * Displays a single message in the Independent Study chat
 */

import { Brain, User, Sparkle } from '@phosphor-icons/react'
import type { StudyMessageDisplay } from '@/lib/types/independent-study'
import { ProblemCard } from './ProblemCard'

interface ChatMessageProps {
  message: StudyMessageDisplay
  onAnswerProblem?: (problemId: string, answer: string) => void
}

export function ChatMessage({ message, onAnswerProblem }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  // Parse out problem tags from content for display
  const contentWithoutProblem = message.content
    .replace(/<problem>[\s\S]*?<\/problem>/g, '')
    .trim()

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
            : isSystem
              ? 'bg-gray-400'
              : 'bg-gradient-to-br from-amber-500 to-amber-600'
        }`}
      >
        {isUser ? (
          <User size={20} weight="bold" color="white" />
        ) : isSystem ? (
          <Sparkle size={20} weight="bold" color="white" />
        ) : (
          <Brain size={20} weight="bold" color="white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block p-4 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
          }`}
          style={{ maxWidth: '100%' }}
        >
          {/* Render content with line breaks */}
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {contentWithoutProblem}
          </div>
        </div>

        {/* Embedded Problem */}
        {message.embeddedProblem && (
          <div className="mt-3">
            <ProblemCard
              problem={message.embeddedProblem}
              onSubmitAnswer={onAnswerProblem}
            />
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : ''}`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}
