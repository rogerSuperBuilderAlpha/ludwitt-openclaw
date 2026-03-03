// AI Chat Assistant - client-side module
// All AI calls are proxied through /api/ai/chat to keep API keys server-side

import { getDefaultModelForTier, getTaskConfig } from './providers/registry'
import { logger } from '@/lib/logger'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

export interface ChatContext {
  userId: string
  userLevel?: string
  currentProject?: string
  recentActivity?: string[]
}

/**
 * Send message to AI assistant via server-side API route.
 * Requires an authenticated user (passes Firebase ID token).
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  context?: ChatContext,
  getIdToken?: () => Promise<string>
): Promise<{ response: string; error?: string }> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (getIdToken) {
      const token = await getIdToken()
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        messages: messages
          .filter((m) => m.role !== 'system')
          .map((m) => ({ role: m.role, content: m.content })),
        context: context
          ? {
              userLevel: context.userLevel,
              currentProject: context.currentProject,
              recentActivity: context.recentActivity,
            }
          : undefined,
      }),
    })

    if (!res.ok) {
      throw new Error(`Chat API returned ${res.status}`)
    }

    const data = await res.json()
    return { response: data.data.response }
  } catch (error) {
    logger.error('Chatassistant', 'AI chat error', { error: error })
    return {
      response:
        "I'm having trouble connecting right now. Please try again in a moment.",
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get the chat model identifier (for display purposes)
 */
export function getChatModel(): string {
  const taskConfig = getTaskConfig('chat')
  const defaultModel = getDefaultModelForTier(taskConfig.recommendedTier)
  return defaultModel.id
}

/**
 * Get suggested prompts based on user context
 */
export function getSuggestedPrompts(context?: ChatContext): string[] {
  const defaultPrompts = [
    'What project should I build next?',
    'How do I improve my portfolio?',
    'Tips for learning new technologies?',
    'How to get my first users?',
  ]

  if (!context) return defaultPrompts

  const prompts: string[] = []

  if (context.currentProject) {
    prompts.push(`Help me with my ${context.currentProject} project`)
  }

  if (context.userLevel === 'beginner') {
    prompts.push('What should beginners focus on?')
    prompts.push('How to choose my first project?')
  } else if (context.userLevel === 'advanced') {
    prompts.push('How to scale my project?')
    prompts.push('Advanced techniques to learn?')
  }

  prompts.push('Show me similar success stories')
  prompts.push('What skills are in demand?')

  return prompts.slice(0, 4)
}

/**
 * Generate conversation title from messages
 */
export function generateConversationTitle(messages: ChatMessage[]): string {
  const firstUserMessage = messages.find((m) => m.role === 'user')

  if (!firstUserMessage) return 'New Conversation'

  const title = firstUserMessage.content.slice(0, 50).trim()

  return title.length < firstUserMessage.content.length ? `${title}...` : title
}

/**
 * Save conversation to Firestore
 */
export async function saveConversation(
  userId: string,
  messages: ChatMessage[],
  title?: string
): Promise<string> {
  const { doc, setDoc } = await import('firebase/firestore')
  const { db } = await import('@/lib/firebase/config')

  const conversationId = `${userId}_${Date.now()}`
  const conversationTitle = title || generateConversationTitle(messages)

  await setDoc(doc(db, 'aiConversations', conversationId), {
    userId,
    title: conversationTitle,
    messages,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  return conversationId
}

/**
 * Load conversation from Firestore
 */
export async function loadConversation(conversationId: string): Promise<{
  title: string
  messages: ChatMessage[]
} | null> {
  const { doc, getDoc } = await import('firebase/firestore')
  const { db } = await import('@/lib/firebase/config')

  const conversationDoc = await getDoc(
    doc(db, 'aiConversations', conversationId)
  )

  if (!conversationDoc.exists()) return null

  const data = conversationDoc.data()

  return {
    title: data.title,
    messages: data.messages,
  }
}

/**
 * Get user's conversation history
 */
export async function getUserConversations(
  userId: string
): Promise<
  Array<{
    id: string
    title: string
    updatedAt: string
  }>
> {
  const { collection, query, where, orderBy, getDocs } = await import(
    'firebase/firestore'
  )
  const { db } = await import('@/lib/firebase/config')

  const conversationsRef = collection(db, 'aiConversations')
  const q = query(
    conversationsRef,
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((d) => ({
    id: d.id,
    title: d.data().title,
    updatedAt: d.data().updatedAt,
  }))
}
