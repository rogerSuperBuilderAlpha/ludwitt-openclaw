'use client'

/**
 * SocraticTutor Component - Redesigned
 *
 * Inline Socratic dialogue tutor with:
 * - Taller, scrollable message area
 * - Auto-submitting quick responses
 * - Dynamic AI-suggested follow-ups
 * - Proper scroll behavior (doesn't hijack page)
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { MathProblemV2 } from '@/lib/types/math-v2'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { getErrorMessage } from '@/lib/utils/error-helpers'
import {
  X,
  CircleNotch,
  Brain,
  PaperPlaneTilt,
  Coins,
  ArrowClockwise,
} from '@phosphor-icons/react'

interface Message {
  id: string
  role: 'tutor' | 'student'
  content: string
}

interface SocraticTutorProps {
  problem: MathProblemV2
  currentAnswer?: string
  onClose: () => void
  onCreditsUsed?: () => void
}

// Problem type context
const PROBLEM_CONTEXT: Record<string, string> = {
  algebra: 'This involves finding unknown values using equations.',
  geometry: 'This involves shapes, measurements, and spatial relationships.',
  arithmetic: 'This involves operations with numbers.',
  calculus: 'This involves rates of change and areas.',
  statistics: 'This involves analyzing data.',
  'word-problem': 'This requires translating a scenario into math.',
}

function getInitialMessage(problem: MathProblemV2): string {
  const context = PROBLEM_CONTEXT[problem.type] || "Let's work through this."
  return `**${problem.pedagogy.topic}** ${problem.pedagogy.subTopic ? `→ ${problem.pedagogy.subTopic}` : ''}

${context}

What do you see in this problem? What information is given?`
}

const INITIAL_SUGGESTIONS = [
  "I see the equation but don't know where to start",
  'What should I do first?',
  "I'm confused about the variables",
]

export function SocraticTutor({
  problem,
  currentAnswer = '',
  onClose,
  onCreditsUsed,
}: SocraticTutorProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [creditsUsed, setCreditsUsed] = useState(0)
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS)
  const [isNegativeBalance, setIsNegativeBalance] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fetchApi = useApiFetch()

  // Initialize with tutor's first message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'initial',
          role: 'tutor',
          content: getInitialMessage(problem),
        },
      ])
    }
  }, [problem, messages.length])

  // Scroll messages to bottom (not the page)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages])

  // Scroll container into view on mount (not to bottom of page)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
    inputRef.current?.focus()
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const messageText = text.trim()
      if (!messageText || isLoading) return

      const studentMessage: Message = {
        id: `student-${Date.now()}`,
        role: 'student',
        content: messageText,
      }

      setMessages((prev) => [...prev, studentMessage])
      setInput('')
      setSuggestions([]) // Clear while loading
      setIsLoading(true)
      setError(null)

      try {
        const conversationHistory = messages.map((m) => ({
          role: m.role === 'tutor' ? 'assistant' : 'user',
          content: m.content,
        }))

        // useApiFetch returns the data directly (unwrapped from {success, data, error})
        const data = await fetchApi<{
          response: string
          suggestions?: string[]
          creditsUsed?: number
          isNegativeBalance?: boolean
        }>('/api/ai/socratic-dialogue', {
          method: 'POST',
          body: JSON.stringify({
            problemId: problem.id,
            problemText: problem.question.text,
            problemLatex: problem.question.latex,
            problemType: problem.type,
            topic: problem.pedagogy.topic,
            subTopic: problem.pedagogy.subTopic,
            difficulty: problem.difficulty,
            correctAnswer:
              typeof problem.answer.correct === 'string'
                ? problem.answer.correct
                : String(problem.answer.correct),
            studentMessage: messageText,
            currentAnswer,
            conversationHistory,
            hints: problem.hints.map((h) => h.text),
            solutionSteps: problem.solution.steps.map((s) => s.description),
          }),
        })

        // Data is returned directly from useApiFetch
        const tutorMessage: Message = {
          id: `tutor-${Date.now()}`,
          role: 'tutor',
          content: data.response,
        }
        setMessages((prev) => [...prev, tutorMessage])

        // Update suggestions from AI or use defaults
        if (data.suggestions?.length) {
          setSuggestions(data.suggestions)
        } else {
          setSuggestions([
            'Can you explain more?',
            'I think I understand',
            'Show me an example',
          ])
        }

        if (data.creditsUsed) {
          const credits = data.creditsUsed
          setCreditsUsed((prev) => prev + credits)
          onCreditsUsed?.()
        }

        // Track if user is in negative balance (being charged 3x)
        if (data.isNegativeBalance) {
          setIsNegativeBalance(true)
        }
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to get response. Try again.'))
        setSuggestions(['Try again', 'Ask differently'])
      } finally {
        setIsLoading(false)
        inputRef.current?.focus()
      }
    },
    [isLoading, messages, problem, currentAnswer, fetchApi, onCreditsUsed]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  // Quick response - auto submits
  const handleQuickResponse = (text: string) => {
    if (!isLoading) {
      sendMessage(text)
    }
  }

  return (
    <div
      ref={containerRef}
      className="mt-4 rounded-xl overflow-hidden border shadow-lg animate-in fade-in slide-in-from-top-2 duration-300"
      style={{
        borderColor: 'var(--b-greek-border)',
        background: 'var(--b-bg-card)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: 'var(--b-greek)' }}
      >
        <div className="flex items-center gap-2">
          <Brain size={18} weight="fill" className="text-white" />
          <span className="font-semibold text-white">Socratic Tutor</span>
        </div>
        <div className="flex items-center gap-3">
          {isNegativeBalance && (
            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-medium">
              3x rate
            </span>
          )}
          {creditsUsed > 0 && (
            <span className="text-xs text-white/80 flex items-center gap-1">
              <Coins size={12} weight="fill" /> {creditsUsed} credits
            </span>
          )}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
            aria-label="Close tutor"
          >
            <X size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Messages - Taller area */}
      <div
        className="p-4 space-y-3 overflow-y-auto"
        style={{
          maxHeight: '320px',
          minHeight: '200px',
          background: 'var(--b-bg-muted)',
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed"
              style={
                message.role === 'student'
                  ? { backgroundColor: '#3b82f6', color: '#ffffff' } // Blue bg, white text
                  : {
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    } // White bg, dark text
              }
            >
              <div className="whitespace-pre-wrap">
                {message.content.split('\n').map((line, lineIdx) => (
                  <span key={lineIdx}>
                    {lineIdx > 0 && <br />}
                    {line
                      .split(/\*\*(.+?)\*\*/g)
                      .map((segment, segIdx) =>
                        segIdx % 2 === 1 ? (
                          <strong key={segIdx}>{segment}</strong>
                        ) : (
                          <span key={segIdx}>{segment}</span>
                        )
                      )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '10px 16px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ color: '#6b7280' }}
              >
                <CircleNotch size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '8px 16px',
              }}
              className="text-sm flex items-center gap-2"
            >
              <span style={{ color: '#dc2626' }}>{error}</span>
              <button
                onClick={() => {
                  setError(null)
                  // Also retry the last message
                  const lastStudentMsg = [...messages]
                    .reverse()
                    .find((m) => m.role === 'student')
                  if (lastStudentMsg) {
                    setMessages((prev) =>
                      prev.filter((m) => m.id !== lastStudentMsg.id)
                    )
                  }
                }}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
              >
                <ArrowClockwise size={12} />
                Retry
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions - Auto-submit on click */}
      {suggestions.length > 0 && !isLoading && (
        <div
          className="px-4 py-2 border-t flex flex-wrap gap-2"
          style={{
            borderColor: 'var(--b-border-default)',
            background: 'var(--b-bg-card)',
          }}
        >
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => handleQuickResponse(suggestion)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-b-greek-light hover:text-b-greek transition-colors disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div
        className="px-4 py-3 border-t flex gap-2"
        style={{ borderColor: 'var(--b-border-default)' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response..."
          className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-b-greek focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="px-4 rounded-lg bg-b-greek text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <CircleNotch size={18} className="animate-spin" />
          ) : (
            <>
              <PaperPlaneTilt size={18} weight="fill" />
              <span className="text-sm font-medium hidden sm:inline">Send</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
