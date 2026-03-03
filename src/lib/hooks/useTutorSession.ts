'use client'

/**
 * useTutorSession Hook
 *
 * Manages all state and logic for the Near Peer Tutor feature,
 * including request creation, tutor offers, chat sessions,
 * message polling, and ratings.
 */

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { useCredits } from '@/lib/hooks/useCredits'
import { TutorRequest, TutorSession, TutorMessage } from '@/lib/types/tutor'
import { logger } from '@/lib/logger'

export type ViewMode = 'student' | 'tutor'
export type ViewState = 'list' | 'chat' | 'rating'

export interface UseTutorSessionResult {
  // Auth
  userId: string | undefined

  // Mode & view
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  viewState: ViewState
  setViewState: (state: ViewState) => void

  // Loading & error
  loading: boolean
  error: string | null
  setError: (error: string | null) => void

  // Student mode
  myRequest: TutorRequest | null
  description: string
  setDescription: (desc: string) => void
  creditsOffer: number
  setCreditsOffer: (amount: number) => void
  balance: ReturnType<typeof useCredits>['balance']

  // Tutor mode
  availableRequests: TutorRequest[]
  offerMessage: string
  setOfferMessage: (msg: string) => void

  // Chat
  activeSession: TutorSession | null
  messages: TutorMessage[]
  newMessage: string
  setNewMessage: (msg: string) => void
  remainingSeconds: number

  // Rating
  rating: number
  setRating: (rating: number) => void
  ratingSubmitted: boolean

  // Actions
  handleCreateRequest: () => Promise<void>
  handleOfferHelp: (requestId: string) => Promise<void>
  handleAcceptTutor: (tutorId: string) => Promise<void>
  handleSendMessage: () => Promise<void>
  handleSubmitRating: () => Promise<void>

  // Utilities
  formatTime: (seconds: number) => string
}

export function useTutorSession(isOpen: boolean): UseTutorSessionResult {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  const { balance, refresh: refreshBalance } = useCredits()

  const [mode, setMode] = useState<ViewMode>('student')
  const [viewState, setViewState] = useState<ViewState>('list')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Student mode state
  const [myRequest, setMyRequest] = useState<TutorRequest | null>(null)
  const [description, setDescription] = useState('')
  const [creditsOffer, setCreditsOffer] = useState(50)

  // Tutor mode state
  const [availableRequests, setAvailableRequests] = useState<TutorRequest[]>([])
  const [offerMessage, setOfferMessage] = useState('')

  // Chat state
  const [activeSession, setActiveSession] = useState<TutorSession | null>(null)
  const [messages, setMessages] = useState<TutorMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  // Rating state
  const [rating, setRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  const updateRemainingTime = useCallback(() => {
    if (!activeSession) return

    const endsAt = new Date(activeSession.endsAt).getTime()
    const now = Date.now()
    const remaining = Math.max(0, Math.floor((endsAt - now) / 1000))
    setRemainingSeconds(remaining)

    if (remaining === 0 && viewState === 'chat') {
      setViewState('rating')
    }
  }, [activeSession, viewState])

  const loadMessages = useCallback(async () => {
    if (!activeSession) return

    try {
      const result = await fetchApi<{ messages: TutorMessage[] }>(
        `/api/tutor/sessions/${activeSession.id}/messages`
      )
      setMessages(result.messages)
    } catch (err) {
      logger.error('useTutorSession', 'Failed to load messages', {
        error: err,
      })
    }
  }, [activeSession, fetchApi])

  const loadSession = useCallback(
    async (sessionId: string) => {
      try {
        const result = await fetchApi<{
          session: TutorSession
          remainingSeconds: number
          hasEnded: boolean
        }>(`/api/tutor/sessions/${sessionId}`)

        setActiveSession(result.session)
        setRemainingSeconds(result.remainingSeconds)

        if (result.hasEnded) {
          setViewState('rating')
        } else {
          setViewState('chat')
        }
      } catch (err) {
        logger.error('useTutorSession', 'Failed to load session', {
          error: err,
        })
      }
    },
    [fetchApi]
  )

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (mode === 'student') {
        const result = await fetchApi<{ requests: TutorRequest[] }>(
          '/api/tutor/requests?mode=student'
        )
        const activeRequest = result.requests.find((r) =>
          ['open', 'pending', 'active'].includes(r.status)
        )
        setMyRequest(activeRequest || null)

        if (activeRequest?.sessionId) {
          await loadSession(activeRequest.sessionId)
        }
      } else {
        const result = await fetchApi<{ requests: TutorRequest[] }>(
          '/api/tutor/requests?mode=tutor'
        )
        setAvailableRequests(result.requests)
      }
    } catch (err) {
      logger.error('useTutorSession', 'Failed to load data', { error: err })
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [mode, fetchApi, loadSession])

  // Load data based on mode
  useEffect(() => {
    if (isOpen && user) {
      loadData()
    }
  }, [isOpen, user, loadData])

  // Poll for messages during active chat
  useEffect(() => {
    if (viewState === 'chat' && activeSession) {
      const interval = setInterval(() => {
        loadMessages()
        updateRemainingTime()
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [viewState, activeSession, loadMessages, updateRemainingTime])

  const handleCreateRequest = async () => {
    if (!description.trim() || description.length < 10) {
      setError('Please describe your problem in at least 10 characters')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchApi<{ request: TutorRequest }>(
        '/api/tutor/requests',
        {
          method: 'POST',
          body: JSON.stringify({
            description,
            creditsOffered: creditsOffer,
            subject: 'math',
          }),
        }
      )
      setMyRequest(result.request)
      setDescription('')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to create request')
    } finally {
      setLoading(false)
    }
  }

  const handleOfferHelp = async (requestId: string) => {
    setLoading(true)
    setError(null)

    try {
      await fetchApi(`/api/tutor/requests/${requestId}/offer`, {
        method: 'POST',
        body: JSON.stringify({ message: offerMessage }),
      })
      setOfferMessage('')
      await loadData()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to submit offer')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptTutor = async (tutorId: string) => {
    if (!myRequest) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetchApi<{ session: TutorSession }>(
        `/api/tutor/requests/${myRequest.id}/accept`,
        {
          method: 'POST',
          body: JSON.stringify({ tutorId }),
        }
      )
      setActiveSession(result.session)
      setViewState('chat')
      await loadMessages()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to start session')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeSession) return

    try {
      await fetchApi(`/api/tutor/sessions/${activeSession.id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content: newMessage }),
      })
      setNewMessage('')
      await loadMessages()
    } catch (err) {
      logger.error('useTutorSession', 'Failed to send message', {
        error: err,
      })
    }
  }

  const handleSubmitRating = async () => {
    if (!activeSession || rating === 0) return

    setLoading(true)

    try {
      await fetchApi('/api/tutor/rating', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: activeSession.id,
          rating,
        }),
      })
      setRatingSubmitted(true)
      refreshBalance()

      // Reset after a delay
      setTimeout(() => {
        setViewState('list')
        setActiveSession(null)
        setMyRequest(null)
        setRatingSubmitted(false)
        setRating(0)
        loadData()
      }, 2000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to submit rating')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    userId: user?.uid,
    mode,
    setMode,
    viewState,
    setViewState,
    loading,
    error,
    setError,
    myRequest,
    description,
    setDescription,
    creditsOffer,
    setCreditsOffer,
    balance,
    availableRequests,
    offerMessage,
    setOfferMessage,
    activeSession,
    messages,
    newMessage,
    setNewMessage,
    remainingSeconds,
    rating,
    setRating,
    ratingSubmitted,
    handleCreateRequest,
    handleOfferHelp,
    handleAcceptTutor,
    handleSendMessage,
    handleSubmitRating,
    formatTime,
  }
}
