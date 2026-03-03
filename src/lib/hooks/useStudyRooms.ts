'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { db } from '@/lib/firebase/config'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import type { StudyRoom, StudySession } from '@/lib/types/university'
import { logger } from '@/lib/logger'

export function useStudyRooms(learningPathId?: string) {
  const { user } = useAuth()
  const [rooms, setRooms] = useState<StudyRoom[]>([])
  const [loading, setLoading] = useState(true)

  // Real-time listener for study rooms
  useEffect(() => {
    if (!learningPathId) {
      setRooms([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'studyRooms'),
      where('learningPathId', '==', learningPathId),
      orderBy('lastActiveAt', 'desc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as StudyRoom[]
        setRooms(results)
        setLoading(false)
      },
      (err) => {
        logger.error('UseStudyRooms', 'Error fetching study rooms', { error: err })
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [learningPathId])

  const createRoom = useCallback(async (name: string) => {
    if (!user || !learningPathId) return

    const token = await user.getIdToken()
    const response = await fetch('/api/university/study-rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ learningPathId, name }),
    })

    const json = await response.json()
    if (!response.ok || !json.success) {
      throw new Error(json.error || 'Failed to create room')
    }
  }, [user, learningPathId])

  const joinRoom = useCallback(async (roomId: string) => {
    if (!user) return

    const token = await user.getIdToken()
    const response = await fetch('/api/university/study-rooms/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roomId }),
    })

    const json = await response.json()
    if (!response.ok || !json.success) {
      throw new Error(json.error || 'Failed to join room')
    }
  }, [user])

  const leaveRoom = useCallback(async (roomId: string) => {
    if (!user) return

    const token = await user.getIdToken()
    const response = await fetch('/api/university/study-rooms/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roomId }),
    })

    const json = await response.json()
    if (!response.ok || !json.success) {
      throw new Error(json.error || 'Failed to leave room')
    }
  }, [user])

  return { rooms, loading, createRoom, joinRoom, leaveRoom }
}

export function useStudySessions(learningPathId?: string) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [loading, setLoading] = useState(true)

  // Real-time listener for study sessions
  useEffect(() => {
    if (!learningPathId) {
      setSessions([])
      setLoading(false)
      return
    }

    const now = new Date().toISOString()

    const q = query(
      collection(db, 'studySessions'),
      where('learningPathId', '==', learningPathId),
      where('scheduledAt', '>=', now),
      orderBy('scheduledAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as StudySession[]
        setSessions(results)
        setLoading(false)
      },
      (err) => {
        logger.error('UseStudyRooms', 'Error fetching study sessions', { error: err })
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [learningPathId])

  const createSession = useCallback(async (data: {
    studyRoomId: string
    title: string
    description?: string
    scheduledAt: string
    durationMinutes: number
  }) => {
    if (!user || !learningPathId) return

    const token = await user.getIdToken()
    const response = await fetch('/api/university/study-rooms/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, learningPathId }),
    })

    const json = await response.json()
    if (!response.ok || !json.success) {
      throw new Error(json.error || 'Failed to create session')
    }
  }, [user, learningPathId])

  return { sessions, loading, createSession }
}
