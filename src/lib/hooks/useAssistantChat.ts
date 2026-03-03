'use client'

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import type { AssistantMessage } from '@/lib/types/university'

export function useAssistantChat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (params: {
      message: string
      courseId?: string
      deliverableId?: string
      learningPathId?: string
    }) => {
      if (!user) {
        setError('You must be signed in to use the assistant')
        return
      }

      const { message, courseId, deliverableId, learningPathId } = params

      // Add user message to state immediately
      const userMessage: AssistantMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])
      setIsLoading(true)
      setError(null)

      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/university/assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
            courseId,
            deliverableId,
            learningPathId,
            conversationHistory: messages,
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          const errorMsg = data.error || 'Failed to get a response'
          setError(errorMsg)
          return
        }

        const assistantMessage: AssistantMessage = {
          role: 'assistant',
          content: data.data.reply,
          timestamp: new Date().toISOString(),
        }
        setMessages(prev => [...prev, assistantMessage])
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Something went wrong'
        setError(errorMsg)
      } finally {
        setIsLoading(false)
      }
    },
    [user, messages]
  )

  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearChat }
}
