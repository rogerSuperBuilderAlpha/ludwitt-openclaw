'use client'

/**
 * DiscoveryChat Component
 *
 * Conversational interface for the discovery phase of Independent Study.
 * AI asks adaptive questions to understand what the user wants to learn,
 * then signals when ready to generate a curriculum.
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Brain,
  X,
  PaperPlaneTilt,
  Spinner,
  Sparkle,
  ArrowRight,
  CheckCircle,
  Lightbulb,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  DiscoveryMessage,
  IndependentStudyDisplay,
} from '@/lib/types/independent-study'

interface DiscoveryChatProps {
  study: IndependentStudyDisplay
  onClose: () => void
  onReadyToGenerate: () => void
  onBack?: () => void
}

export function DiscoveryChat({
  study,
  onClose,
  onReadyToGenerate,
  onBack,
}: DiscoveryChatProps) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<DiscoveryMessage[]>(
    study.discovery?.messages || []
  )
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isReadyToGenerate, setIsReadyToGenerate] = useState(
    study.discovery?.readyToGenerate || false
  )
  const [topicSummary, setTopicSummary] = useState(
    study.discovery?.topicSummary || null
  )
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasInitialized = useRef(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Send initial message when starting discovery
  // Intentionally runs only on mount - sendMessage and study props are stable
  useEffect(() => {
    if (messages.length === 0 && user && !hasInitialized.current) {
      hasInitialized.current = true
      // Send the initial topic as the first message
      sendMessage(study.discovery?.initialTopic || study.title, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, messages.length])

  const sendMessage = useCallback(
    async (content: string, isInitial = false) => {
      if (!user || !content.trim()) return

      setError(null)
      setIsLoading(true)

      // Add user message immediately (unless it's the initial topic which we don't show)
      if (!isInitial) {
        const userMessage: DiscoveryMessage = {
          id: `disc_user_${Date.now()}`,
          role: 'user',
          content: content.trim(),
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, userMessage])
      }
      setInputValue('')

      try {
        const token = await user.getIdToken()
        const response = await fetch(
          '/api/basics/independent-study/discovery',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              studyId: study.id,
              message: content.trim(),
              isInitial,
            }),
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to send message')
        }

        setIsStreaming(true)

        // Read SSE stream
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        let assistantContent = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))

                  if (data.type === 'content') {
                    assistantContent += data.content
                    // Update streaming message
                    setMessages((prev) => {
                      const existing = prev.find((m) => m.id === 'streaming')
                      if (existing) {
                        return prev.map((m) =>
                          m.id === 'streaming'
                            ? { ...m, content: assistantContent }
                            : m
                        )
                      } else {
                        return [
                          ...prev,
                          {
                            id: 'streaming',
                            role: 'assistant' as const,
                            content: assistantContent,
                            timestamp: new Date().toISOString(),
                          },
                        ]
                      }
                    })
                  }

                  if (data.type === 'done') {
                    // Finalize the message
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === 'streaming'
                          ? {
                              ...m,
                              id: data.messageId || `disc_asst_${Date.now()}`,
                              metadata: data.isReadyToGenerate
                                ? { isReadyToGenerate: true }
                                : undefined,
                            }
                          : m
                      )
                    )

                    if (data.isReadyToGenerate) {
                      setIsReadyToGenerate(true)
                      if (data.topicSummary) {
                        setTopicSummary(data.topicSummary)
                      }
                    }
                  }

                  if (data.type === 'error') {
                    throw new Error(data.error)
                  }
                } catch {
                  // Ignore JSON parse errors for incomplete chunks
                }
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message')
      } finally {
        setIsLoading(false)
        setIsStreaming(false)
      }
    },
    [user, study.id]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
    >
      <div
        className="w-[95vw] max-w-3xl h-[85vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: '#fafaf9',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 px-6 py-4 flex justify-between items-center"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Lightbulb size={24} weight="fill" color="white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Discovery Phase</h1>
              <p className="text-white/80 text-sm">
                Let&apos;s design your learning path
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            aria-label="Close discovery chat"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Welcome message */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-3">
              <Sparkle size={16} weight="fill" />
              AI-Guided Discovery
            </div>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              I&apos;ll ask you some questions to understand exactly what you
              want to learn. Then I&apos;ll create a personalized curriculum
              just for you.
            </p>
          </div>

          {/* Chat Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gray-600'
                      : 'bg-gradient-to-br from-violet-500 to-purple-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <span className="text-white text-xs font-bold">You</span>
                  ) : (
                    <Brain size={18} weight="bold" color="white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-800 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>

                  {/* Ready indicator */}
                  {message.metadata?.isReadyToGenerate && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-violet-600">
                      <CheckCircle size={16} weight="fill" />
                      <span className="text-xs font-medium">
                        Ready to generate curriculum
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && !isStreaming && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Brain size={18} weight="bold" color="white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Spinner size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-500 underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Ready to Generate Banner */}
        {isReadyToGenerate && (
          <div className="flex-shrink-0 px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-t border-violet-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="text-violet-600"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {topicSummary || 'Ready to create your curriculum!'}
                  </div>
                  <p className="text-sm text-gray-500">
                    Click below to generate your personalized learning path
                  </p>
                </div>
              </div>
              <button
                onClick={onReadyToGenerate}
                className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-violet-700 transition-colors cursor-pointer shadow-lg"
                style={{ boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)' }}
              >
                <Sparkle size={18} weight="fill" />
                Generate Curriculum
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isReadyToGenerate
                  ? "Add more details or click 'Generate Curriculum' above..."
                  : 'Tell me more about what you want to learn...'
              }
              disabled={isLoading}
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-violet-400 text-sm"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                inputValue.trim() && !isLoading
                  ? 'bg-violet-600 text-white hover:bg-violet-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Spinner size={20} className="animate-spin" />
              ) : (
                <PaperPlaneTilt size={20} weight="bold" />
              )}
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
