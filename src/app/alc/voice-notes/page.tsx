/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Voice Notes Page
 * Main orchestrator for voice recording and playback
 *
 * Refactored: Jan 2, 2026
 * Original: 1,512 lines -> Target: ~200 lines
 */

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Mic, Clock, Calendar } from 'lucide-react'
import { useAuth } from '@/components/auth/ClientProvider'
import { auth } from '@/lib/firebase/config'
import { Recording } from '@/lib/types/voice-notes'
import {
  downloadRecording,
  shareRecordingSummary,
} from '@/lib/voice-notes/storage'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import { RecordingTemplateType } from '@/lib/voice-notes/templates'

// Extracted components
import { RecordingTab } from '@/components/voice-notes/RecordingTab'
import { HistoryTab } from '@/components/voice-notes/HistoryTab'
import { RecordingDetailModal } from '@/components/voice-notes/RecordingDetailModal'
import { CalendarIntegration } from '@/components/voice-notes/CalendarIntegration'

// Extracted hooks
import { useRecorder } from '@/lib/hooks/useRecorder'
import { useRecordingHistory } from '@/lib/hooks/useRecordingHistory'

function VoiceNotesContent() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { showToast } = useToast()

  // UI State
  const [activeTab, setActiveTab] = useState<'record' | 'history'>('record')
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null
  )
  const [selectedTemplate, setSelectedTemplate] =
    useState<RecordingTemplateType>('general')
  const [processing, setProcessing] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarConnected, setCalendarConnected] = useState(false)

  // Recording history hook
  const recordingHistory = useRecordingHistory({
    onToast: showToast,
  })

  // Recording completion handler
  const handleRecordingComplete = useCallback(
    async (
      audioBlob: Blob,
      audioUrl: string,
      duration: number,
      transcript: string
    ) => {
      setProcessing(true)
      setActiveTab('history')
      await recordingHistory.processRecording(
        audioBlob,
        audioUrl,
        duration,
        transcript,
        selectedTemplate
      )
      setProcessing(false)
    },
    [recordingHistory, selectedTemplate]
  )

  // Recorder hook
  const recorder = useRecorder({
    onRecordingComplete: handleRecordingComplete,
  })

  // Load recordings on mount
  useEffect(() => {
    if (user) {
      recordingHistory.loadRecordings()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/alc/voice-notes')
    }
  }, [user, authLoading, router])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return

      if (e.code === 'Space' && activeTab === 'record') {
        e.preventDefault()
        if (!recorder.isRecording) {
          recorder.startRecording()
        } else {
          recorder.stopRecording()
        }
      }

      if (e.code === 'KeyP' && recorder.isRecording) {
        e.preventDefault()
        recorder.togglePause()
      }

      if (e.code === 'Escape' && selectedRecording) {
        e.preventDefault()
        setSelectedRecording(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [recorder, activeTab, selectedRecording])

  // Check calendar connection
  useEffect(() => {
    if (!user) return

    const checkCalendar = async () => {
      try {
        const token = await user.getIdToken()
        const response = await fetch('/api/voice-notes/calendar/status', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const data = await response.json()
          setCalendarConnected(data.connected || false)
        }
      } catch {
        setCalendarConnected(false)
      }
    }

    setTimeout(() => checkCalendar(), 500)
  }, [user])

  // Calendar connection success handler
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('calendar') === 'connected') {
      showToast('Calendar connected successfully! 🎉', 'success')
      window.history.replaceState({}, '', window.location.pathname)
      setCalendarConnected(true)
      setTimeout(() => setShowCalendar(true), 500)
    }
  }, [showToast])

  // Update speaker handler
  const handleUpdateSpeaker = useCallback(
    async (recordingId: string, oldName: string, newName: string) => {
      const recording = recordingHistory.recordings.find(
        (r) => r.id === recordingId
      )
      if (!recording) return

      const updatedSpeakers = recording.speakers?.map((s) =>
        s.name === oldName ? { ...s, customName: newName } : s
      )

      recordingHistory.updateRecording(recordingId, {
        speakers: updatedSpeakers,
      })

      try {
        const currentUser = auth.currentUser
        if (!currentUser) return

        const token = await currentUser.getIdToken()
        await fetch('/api/voice-notes/update', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recordingId,
            updates: { speakers: updatedSpeakers },
          }),
        })
        showToast('Speaker name updated', 'success')
      } catch {
        showToast('Failed to update speaker', 'error')
      }
    },
    [recordingHistory, showToast]
  )

  // Update selected recording when recordings change
  useEffect(() => {
    if (selectedRecording) {
      const updated = recordingHistory.recordings.find(
        (r) => r.id === selectedRecording.id
      )
      if (updated) {
        setSelectedRecording(updated)
      }
    }
  }, [recordingHistory.recordings, selectedRecording?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <Head>
        <title>Voice Notes - AI-Powered Conversation Recording | Ludwitt</title>
        <meta
          name="description"
          content="Record conversations, get instant AI transcripts, summaries, and action items."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-gray-900">Voice Notes</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCalendar(true)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm relative ${
                    calendarConnected
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Calendar
                  {calendarConnected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </button>
                <div className="text-sm text-gray-500">
                  {recordingHistory.recordings.length} recording
                  {recordingHistory.recordings.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('record')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  activeTab === 'record'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mic className="w-5 h-5 inline mr-2" />
                Record
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-5 h-5 inline mr-2" />
                History
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'record' ? (
            <RecordingTab
              isRecording={recorder.isRecording}
              isPaused={recorder.isPaused}
              processing={processing}
              recordingTime={recorder.recordingTime}
              realtimeTranscript={recorder.realtimeTranscript}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
              onStartRecording={recorder.startRecording}
              onStopRecording={recorder.stopRecording}
              onTogglePause={recorder.togglePause}
              formatTime={recorder.formatTime}
            />
          ) : (
            <HistoryTab
              recordings={recordingHistory.recordings}
              loading={recordingHistory.loading}
              searchQuery={recordingHistory.searchQuery}
              filterTag={recordingHistory.filterTag}
              editingTitleId={recordingHistory.editingTitleId}
              editingTitle={recordingHistory.editingTitle}
              onSearchChange={recordingHistory.setSearchQuery}
              onFilterChange={recordingHistory.setFilterTag}
              onSelectRecording={setSelectedRecording}
              onToggleStar={recordingHistory.toggleStar}
              onStartEditTitle={recordingHistory.startEditingTitle}
              onEditTitleChange={recordingHistory.setEditingTitle}
              onSaveTitle={recordingHistory.saveTitle}
              onDelete={recordingHistory.deleteRecording}
              onDownload={downloadRecording}
              onShare={shareRecordingSummary}
              formatTime={recorder.formatTime}
            />
          )}
        </div>

        {/* Recording Detail Modal */}
        {selectedRecording && (
          <RecordingDetailModal
            recording={selectedRecording}
            onClose={() => setSelectedRecording(null)}
            onToggleStar={recordingHistory.toggleStar}
            onUpdateSpeaker={handleUpdateSpeaker}
            onToast={showToast}
            formatTime={recorder.formatTime}
          />
        )}

        {/* Calendar Modal */}
        {showCalendar && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalendar(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Calendar Integration
                  </h2>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <CalendarIntegration onClose={() => setShowCalendar(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function VoiceNotesPage() {
  return (
    <ToastProvider>
      <VoiceNotesContent />
    </ToastProvider>
  )
}
