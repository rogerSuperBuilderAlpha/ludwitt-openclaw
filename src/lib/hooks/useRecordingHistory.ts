'use client'

/**
 * useRecordingHistory Hook
 * Manages recording CRUD operations, filtering, and state
 */

import { useState, useCallback, useEffect } from 'react'
import { auth } from '@/lib/firebase/config'
import { Recording } from '@/lib/types/voice-notes'
import { RecordingTemplateType } from '@/lib/voice-notes/templates'

interface UseRecordingHistoryOptions {
  onToast?: (message: string, type: 'success' | 'error') => void
}

interface UseRecordingHistoryReturn {
  recordings: Recording[]
  loading: boolean
  searchQuery: string
  filterTag: string
  editingTitleId: string | null
  editingTitle: string
  setSearchQuery: (query: string) => void
  setFilterTag: (tag: string) => void
  loadRecordings: () => Promise<void>
  addTempRecording: (recording: Recording) => void
  updateRecording: (id: string, updates: Partial<Recording>) => void
  removeRecording: (id: string) => void
  startEditingTitle: (recording: Recording) => void
  setEditingTitle: (title: string) => void
  saveTitle: (id: string) => Promise<void>
  cancelEditingTitle: () => void
  toggleStar: (id: string) => Promise<void>
  deleteRecording: (id: string) => Promise<void>
  processRecording: (
    audioBlob: Blob,
    audioUrl: string,
    duration: number,
    transcript: string,
    template: RecordingTemplateType
  ) => Promise<void>
}

export function useRecordingHistory({ 
  onToast 
}: UseRecordingHistoryOptions = {}): UseRecordingHistoryReturn {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTag, setFilterTag] = useState('all')
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  // Load recordings from API
  const loadRecordings = useCallback(async () => {
    const user = auth.currentUser
    if (!user) return

    setLoading(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/list', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) {
        throw new Error('Failed to load recordings')
      }

      const { recordings: loadedRecordings } = await response.json()

      const formattedRecordings = loadedRecordings.map((rec: any) => ({
        ...rec,
        date: new Date(rec.date),
        createdAt: rec.createdAt ? new Date(rec.createdAt) : undefined,
        updatedAt: rec.updatedAt ? new Date(rec.updatedAt) : undefined
      }))

      setRecordings(formattedRecordings)
    } catch {
      onToast?.('Failed to load recordings', 'error')
    } finally {
      setLoading(false)
    }
  }, [onToast])

  // Add temporary recording (optimistic)
  const addTempRecording = useCallback((recording: Recording) => {
    setRecordings(prev => [recording, ...prev])
  }, [])

  // Update recording in state
  const updateRecording = useCallback((id: string, updates: Partial<Recording>) => {
    setRecordings(prev => prev.map(rec => 
      rec.id === id ? { ...rec, ...updates } : rec
    ))
  }, [])

  // Remove recording from state
  const removeRecording = useCallback((id: string) => {
    setRecordings(prev => prev.filter(rec => rec.id !== id))
  }, [])

  // Title editing
  const startEditingTitle = useCallback((recording: Recording) => {
    setEditingTitleId(recording.id)
    setEditingTitle(recording.title)
  }, [])

  const cancelEditingTitle = useCallback(() => {
    setEditingTitleId(null)
    setEditingTitle('')
  }, [])

  // Save title
  const saveTitle = useCallback(async (id: string) => {
    if (!editingTitle.trim()) {
      onToast?.('Title cannot be empty', 'error')
      return
    }

    const oldTitle = recordings.find(r => r.id === id)?.title || ''

    // Optimistic update
    setRecordings(prev => prev.map(rec =>
      rec.id === id ? { ...rec, title: editingTitle } : rec
    ))
    setEditingTitleId(null)

    try {
      const user = auth.currentUser
      if (!user) return

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recordingId: id,
          updates: { title: editingTitle }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update')
      }

      onToast?.('Title updated', 'success')
    } catch {
      // Revert on error
      setRecordings(prev => prev.map(rec =>
        rec.id === id ? { ...rec, title: oldTitle } : rec
      ))
      onToast?.('Failed to update title', 'error')
    }
  }, [editingTitle, recordings, onToast])

  // Toggle star
  const toggleStar = useCallback(async (id: string) => {
    const recording = recordings.find(r => r.id === id)
    if (!recording) return

    const newStarred = !recording.starred

    // Optimistic update
    setRecordings(prev => prev.map(rec =>
      rec.id === id ? { ...rec, starred: newStarred } : rec
    ))

    try {
      const user = auth.currentUser
      if (!user) return

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recordingId: id,
          updates: { starred: newStarred }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update')
      }

      onToast?.(newStarred ? 'Added to favorites' : 'Removed from favorites', 'success')
    } catch {
      // Revert on error
      setRecordings(prev => prev.map(rec =>
        rec.id === id ? { ...rec, starred: !newStarred } : rec
      ))
      onToast?.('Failed to update', 'error')
    }
  }, [recordings, onToast])

  // Delete recording
  const deleteRecording = useCallback(async (id: string) => {
    if (!confirm('Delete this recording? This cannot be undone.')) {
      return
    }

    // Optimistic removal
    const originalRecordings = [...recordings]
    setRecordings(prev => prev.filter(rec => rec.id !== id))

    try {
      const user = auth.currentUser
      if (!user) {
        setRecordings(originalRecordings)
        return
      }

      const token = await user.getIdToken()
      const response = await fetch('/api/voice-notes/delete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recordingId: id })
      })

      if (!response.ok) {
        throw new Error('Failed to delete')
      }

      onToast?.('Recording deleted', 'success')
    } catch {
      onToast?.('Failed to delete recording', 'error')
      setRecordings(originalRecordings)
    }
  }, [recordings, onToast])

  // Process new recording
  const processRecording = useCallback(async (
    audioBlob: Blob,
    audioUrl: string,
    duration: number,
    transcript: string,
    template: RecordingTemplateType
  ) => {
    const title = `Recording ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    const tempId = Date.now().toString()

    // Create temporary recording
    const tempRecording: Recording = {
      id: tempId,
      title,
      date: new Date(),
      duration,
      audioBlob,
      audioUrl,
      transcript: transcript || 'Processing transcript...',
      summary: 'AI is analyzing your conversation...',
      actionItems: ['Processing...'],
      keyMoments: [],
      speakers: [],
      sentiment: 'neutral',
      tags: ['processing'],
      starred: false
    }

    addTempRecording(tempRecording)

    try {
      const user = auth.currentUser
      if (!user) {
        onToast?.('Please sign in to save recordings', 'error')
        removeRecording(tempId)
        return
      }

      const token = await user.getIdToken()

      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.webm')
      formData.append('duration', duration.toString())
      formData.append('transcript', transcript)
      formData.append('title', title)
      formData.append('template', template)

      const response = await fetch('/api/voice-notes/process', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Processing failed')
      }

      const { data } = await response.json()

      // Update recording with AI results
      updateRecording(tempId, {
        id: data.recordingId,
        audioUrl: data.audioUrl,
        transcript: data.transcript,
        summary: data.summary,
        actionItems: data.actionItems,
        nextSteps: data.nextSteps,
        keyMoments: data.keyMoments,
        speakers: data.speakers,
        sentiment: data.sentiment,
        tags: data.tags,
        audioBlob: undefined // Remove blob since we have Firebase URL
      })

      onToast?.('Recording processed successfully!', 'success')
    } catch (error) {
      onToast?.(`Failed to process recording: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      removeRecording(tempId)
    }
  }, [addTempRecording, updateRecording, removeRecording, onToast])

  return {
    recordings,
    loading,
    searchQuery,
    filterTag,
    editingTitleId,
    editingTitle,
    setSearchQuery,
    setFilterTag,
    loadRecordings,
    addTempRecording,
    updateRecording,
    removeRecording,
    startEditingTitle,
    setEditingTitle,
    cancelEditingTitle,
    saveTitle,
    toggleStar,
    deleteRecording,
    processRecording
  }
}




