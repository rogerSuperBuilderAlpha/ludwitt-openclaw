'use client'

import { useState, useRef, useEffect } from 'react'
import { PaperPlaneTilt, X, Trash } from '@phosphor-icons/react'
import { useAssistantChat } from '@/lib/hooks/useAssistantChat'

interface AssistantChatProps {
  courseId?: string
  deliverableId?: string
  learningPathId?: string
  onClose: () => void
}

export function AssistantChat({
  courseId,
  deliverableId,
  learningPathId,
  onClose,
}: AssistantChatProps) {
  const { messages, isLoading, error, sendMessage, clearChat } = useAssistantChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    sendMessage({
      message: trimmed,
      courseId,
      deliverableId,
      learningPathId,
    })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Build a context label for the header
  const contextParts: string[] = []
  if (courseId) contextParts.push('Course')
  if (deliverableId) contextParts.push('Deliverable')
  if (learningPathId) contextParts.push('Path')
  const contextLabel = contextParts.length > 0 ? contextParts.join(' + ') : null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col w-96 h-[520px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            Teaching Assistant
          </h3>
          {contextLabel && (
            <p className="text-xs text-gray-500 truncate">
              Context: {contextLabel}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
              title="Clear chat"
            >
              <Trash size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-400 text-center px-6">
              Ask me anything about your course or deliverable. I will guide you
              without giving away the answers.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 text-sm rounded-lg whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-3 py-2 text-sm rounded-lg bg-white border border-gray-200 text-gray-400">
              Thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="px-3 py-2 text-sm rounded-lg bg-red-50 border border-red-200 text-red-600">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Send"
          >
            <PaperPlaneTilt size={16} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  )
}
