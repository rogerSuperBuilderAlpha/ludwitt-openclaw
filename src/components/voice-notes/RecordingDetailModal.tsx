'use client'

/**
 * Recording Detail Modal
 * Displays full recording details with playback, transcript, and analysis
 */

import { useRef, useState } from 'react'
import {
  Star,
  Download,
  Share2,
  Copy,
  Edit2,
  Check,
  Mic,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { Recording } from '@/lib/types/voice-notes'
import {
  downloadRecording,
  shareRecordingSummary,
} from '@/lib/voice-notes/storage'
import {
  exportAsMarkdown,
  exportAsHTML,
  exportAsJSON,
  printRecording,
} from '@/lib/voice-notes/export'

interface RecordingDetailModalProps {
  recording: Recording
  onClose: () => void
  onToggleStar: (id: string) => void
  onUpdateSpeaker: (
    recordingId: string,
    oldName: string,
    newName: string
  ) => void
  onToast?: (message: string, type: 'success' | 'error') => void
  formatTime: (seconds: number) => string
}

export function RecordingDetailModal({
  recording,
  onClose,
  onToggleStar,
  onUpdateSpeaker,
  onToast,
  formatTime,
}: RecordingDetailModalProps) {
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [editingSpeaker, setEditingSpeaker] = useState<{
    speakerName: string
  } | null>(null)
  const [newSpeakerName, setNewSpeakerName] = useState('')

  // Copy to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onToast?.(`${label} copied to clipboard!`, 'success')
    } catch {
      onToast?.('Failed to copy', 'error')
    }
  }

  // Jump to timestamp in audio
  const jumpToTimestamp = (seconds: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = seconds
      audioPlayerRef.current.play()
    }
  }

  // Edit speaker name
  const startEditingSpeaker = (speakerName: string) => {
    setEditingSpeaker({ speakerName })
    setNewSpeakerName(speakerName)
  }

  const saveSpeakerName = () => {
    if (!editingSpeaker || !newSpeakerName.trim()) {
      onToast?.('Speaker name cannot be empty', 'error')
      return
    }

    onUpdateSpeaker(recording.id, editingSpeaker.speakerName, newSpeakerName)
    setEditingSpeaker(null)
  }

  // Handle download
  const handleDownload = () => {
    downloadRecording(recording)
    onToast?.('Audio downloaded', 'success')
  }

  // Handle share
  const handleShare = async () => {
    await shareRecordingSummary(recording)
  }

  return (
    <div
      role="button"
      tabIndex={-1}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClose()
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recording details"
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {recording.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>
                  {recording.date instanceof Date
                    ? recording.date.toLocaleDateString()
                    : new Date(recording.date).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>{formatTime(recording.duration)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      handleDownload()
                      setShowExportMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Audio (.webm)
                  </button>
                  <button
                    onClick={() => {
                      exportAsMarkdown(recording)
                      setShowExportMenu(false)
                      onToast?.('Exported as Markdown', 'success')
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    📝 Markdown (.md)
                  </button>
                  <button
                    onClick={() => {
                      exportAsHTML(recording)
                      setShowExportMenu(false)
                      onToast?.('Exported as HTML', 'success')
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    📄 HTML (.html)
                  </button>
                  <button
                    onClick={() => {
                      exportAsJSON(recording)
                      setShowExportMenu(false)
                      onToast?.('Exported as JSON', 'success')
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    📋 JSON (.json)
                  </button>
                  <button
                    onClick={() => {
                      printRecording(recording)
                      setShowExportMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm border-t border-gray-100"
                  >
                    🖨️ Print
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => onToggleStar(recording.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                recording.starred
                  ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star
                className={`w-4 h-4 ${recording.starred ? 'fill-current' : ''}`}
              />
              {recording.starred ? 'Starred' : 'Star'}
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Audio Player */}
          {recording.audioUrl && (
            <div className="bg-gray-50 rounded-xl p-4">
              <audio ref={audioPlayerRef} controls className="w-full">
                <source src={recording.audioUrl} type="audio/webm" />
                <track kind="captions" />
              </audio>
            </div>
          )}

          {/* Summary */}
          {recording.summary && (
            <Section
              icon={<AlertCircle className="w-5 h-5 text-blue-600" />}
              title="AI Summary"
              onCopy={() => copyToClipboard(recording.summary || '', 'Summary')}
            >
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-700 leading-relaxed">
                  {recording.summary}
                </p>
              </div>
            </Section>
          )}

          {/* Questions */}
          {recording.questions && recording.questions.length > 0 && (
            <Section
              icon={<AlertCircle className="w-5 h-5 text-purple-600" />}
              title={`Questions Asked (${recording.questions.length})`}
              onCopy={() =>
                copyToClipboard(
                  recording.questions?.join('\n') || '',
                  'Questions'
                )
              }
            >
              <div className="space-y-2">
                {recording.questions.map((question, i) => (
                  <div
                    key={i}
                    className="bg-purple-50 rounded-lg p-3 flex items-start gap-2"
                  >
                    <span className="text-purple-600 font-bold flex-shrink-0">
                      Q{i + 1}:
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Decisions */}
          {recording.decisions && recording.decisions.length > 0 && (
            <Section
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              title={`Decisions Made (${recording.decisions.length})`}
              onCopy={() =>
                copyToClipboard(
                  recording.decisions?.join('\n') || '',
                  'Decisions'
                )
              }
            >
              <div className="space-y-2">
                {recording.decisions.map((decision, i) => (
                  <div
                    key={i}
                    className="bg-green-50 rounded-lg p-3 flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{decision}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Commitments */}
          {recording.commitments && recording.commitments.length > 0 && (
            <Section
              icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              title={`Commitments (${recording.commitments.length})`}
              onCopy={() =>
                copyToClipboard(
                  recording.commitments?.join('\n') || '',
                  'Commitments'
                )
              }
            >
              <div className="space-y-2">
                {recording.commitments.map((commitment, i) => (
                  <div
                    key={i}
                    className="bg-blue-50 rounded-lg p-3 flex items-start gap-2"
                  >
                    <span className="text-blue-600 font-bold flex-shrink-0">
                      →
                    </span>
                    <span className="text-gray-700">{commitment}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Action Items */}
          {recording.actionItems && recording.actionItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                Action Items
              </h3>
              <div className="space-y-2">
                {recording.actionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-orange-50 rounded-lg p-3"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Moments */}
          {recording.keyMoments && recording.keyMoments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Key Moments
              </h3>
              <div className="space-y-3">
                {recording.keyMoments.map((moment, i) => (
                  <div key={i} className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-purple-600 font-medium mb-1">
                      {formatTime(moment.time)}
                    </div>
                    <p className="text-gray-700">{moment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transcript */}
          {recording.transcript && (
            <Section
              icon={<Mic className="w-5 h-5 text-gray-600" />}
              title="Full Transcript"
              onCopy={() =>
                copyToClipboard(recording.transcript || '', 'Transcript')
              }
            >
              <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                {recording.transcriptWithTimestamps &&
                recording.transcriptWithTimestamps.length > 0 ? (
                  <div className="space-y-3">
                    {recording.transcriptWithTimestamps.map((segment, i) => (
                      <div key={i} className="group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            jumpToTimestamp(segment.timestamp)
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 font-mono mb-1 hover:underline"
                        >
                          [{Math.floor(segment.timestamp / 60)}:
                          {(segment.timestamp % 60).toString().padStart(2, '0')}
                          ]
                        </button>
                        <p className="text-gray-700 leading-relaxed">
                          {segment.speaker && (
                            <span className="font-semibold text-gray-900">
                              {segment.speaker}:{' '}
                            </span>
                          )}
                          {segment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {recording.transcript}
                  </p>
                )}
              </div>
            </Section>
          )}

          {/* Speakers */}
          {recording.speakers && recording.speakers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Speakers ({recording.speakers.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recording.speakers.map((speaker, i) => (
                  <div key={i} className="bg-green-50 rounded-lg p-3">
                    {editingSpeaker?.speakerName === speaker.name ? (
                      <div className="flex items-center gap-2">
                        {/* eslint-disable jsx-a11y/no-autofocus */}
                        <input
                          value={newSpeakerName}
                          onChange={(e) => setNewSpeakerName(e.target.value)}
                          onBlur={saveSpeakerName}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveSpeakerName()
                            if (e.key === 'Escape') setEditingSpeaker(null)
                          }}
                          className="text-sm font-medium text-gray-900 border-b-2 border-green-500 bg-transparent focus:outline-none flex-1"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        {/* eslint-enable jsx-a11y/no-autofocus */}
                        <Check
                          className="w-4 h-4 text-green-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            saveSpeakerName()
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <div className="font-medium text-gray-900 flex-1">
                          {speaker.customName || speaker.name}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            startEditingSpeaker(speaker.name)
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                        </button>
                      </div>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                      {speaker.segments} segments
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper component for sections with copy button
function Section({
  icon,
  title,
  onCopy,
  children,
}: {
  icon: React.ReactNode
  title: string
  onCopy?: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {onCopy && (
          <button
            onClick={onCopy}
            className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        )}
      </div>
      {children}
    </div>
  )
}
