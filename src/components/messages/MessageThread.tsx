/**
 * Message Thread Component
 * Display and send messages for a project
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useMessages } from '@/lib/hooks/useMessages'
import { Send } from 'lucide-react'
import { formatDistance } from 'date-fns'
import { logger } from '@/lib/logger'

interface MessageThreadProps {
  projectId: string
  projectTitle: string
}

export function MessageThread({ projectId, projectTitle }: MessageThreadProps) {
  const { user } = useAuth()
  const { messages, loading, sendMessage } = useMessages(projectId)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    setSending(true)

    try {
      await sendMessage(newMessage.trim())
      setNewMessage('')
    } catch (error) {
      logger.error('MessageThread', 'Failed to send message', { error })
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Loading messages...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[600px] flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {projectTitle}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Project Messages
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === user?.uid

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    {!isOwnMessage && (
                      <p className="mb-1 text-xs font-semibold opacity-75">
                        {message.senderName}
                        {message.senderType === 'admin' && ' (Admin)'}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        isOwnMessage
                          ? 'text-blue-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatDistance(new Date(message.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 p-4 dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
