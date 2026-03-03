/**
 * Messages Hook
 * Real-time messaging for projects
 */

'use client'

import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { ProjectMessage } from '@/lib/types/project'
import { useAuth } from '@/components/auth/ClientProvider'
import { logger } from '@/lib/logger'

export function useMessages(projectId?: string) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ProjectMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId || !user) {
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'messages'),
      where('projectId', '==', projectId),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProjectMessage[]

        setMessages(messagesData)
        setLoading(false)
      },
      (err) => {
        logger.error('Usemessages', 'Error fetching messages', { error: err })
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [projectId, user])

  const sendMessage = async (content: string, replyToId?: string) => {
    if (!user || !projectId) {
      throw new Error('User or project ID not available')
    }

    try {
      const token = await user.getIdToken()

      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          content,
          replyToId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      const data = await response.json()
      return data.message
    } catch (err: unknown) {
      logger.error('Usemessages', 'Error sending message', { error: err })
      throw err
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
