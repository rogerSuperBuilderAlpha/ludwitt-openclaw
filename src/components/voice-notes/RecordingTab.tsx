'use client'

/**
 * Recording Tab Component
 * Handles template selection, recording controls, and real-time transcription display
 */

import { Mic, Square, Pause, Play } from 'lucide-react'
import {
  getAllTemplates,
  RecordingTemplateType,
  getTemplateColor,
} from '@/lib/voice-notes/templates'

interface RecordingTabProps {
  isRecording: boolean
  isPaused: boolean
  processing: boolean
  recordingTime: number
  realtimeTranscript: string
  selectedTemplate: RecordingTemplateType
  onTemplateChange: (template: RecordingTemplateType) => void
  onStartRecording: () => void
  onStopRecording: () => void
  onTogglePause: () => void
  formatTime: (seconds: number) => string
}

export function RecordingTab({
  isRecording,
  isPaused,
  processing,
  recordingTime,
  realtimeTranscript,
  selectedTemplate,
  onTemplateChange,
  onStartRecording,
  onStopRecording,
  onTogglePause,
  formatTime,
}: RecordingTabProps) {
  const templates = getAllTemplates()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      {/* Template Selection - Only show when not recording */}
      {!isRecording && !processing && (
        <div className="mb-8 w-full max-w-2xl">
          <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
            Select Recording Type:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onTemplateChange(template.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedTemplate === template.id
                    ? 'border-red-500 bg-red-50 shadow-md'
                    : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="text-2xl mb-1">{template.icon}</div>
                <div className="text-sm font-medium">{template.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recording Interface */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        {/* Timer */}
        <div className="text-center mb-8">
          <div className="text-5xl font-mono font-bold text-gray-900 mb-2">
            {formatTime(recordingTime)}
          </div>
          <div className="text-gray-500">
            {isRecording
              ? isPaused
                ? 'Paused'
                : 'Recording...'
              : processing
                ? 'Processing...'
                : 'Ready to record'}
          </div>
        </div>

        {/* Recording Visualization */}
        {isRecording && !isPaused && (
          <div className="flex justify-center gap-1 mb-8 h-16">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-red-500 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              disabled={processing}
              className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
            >
              <Mic className="w-8 h-8 text-white" />
            </button>
          ) : (
            <>
              <button
                onClick={onTogglePause}
                className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-all shadow-md"
              >
                {isPaused ? (
                  <Play className="w-6 h-6 text-white ml-0.5" />
                ) : (
                  <Pause className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={onStopRecording}
                className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
              >
                <Square className="w-8 h-8 text-white" fill="white" />
              </button>
            </>
          )}
        </div>

        {/* Real-time Transcript */}
        {isRecording && realtimeTranscript && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
            <p className="text-sm text-gray-600 italic">{realtimeTranscript}</p>
          </div>
        )}

        {/* Processing Indicator */}
        {processing && (
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600" />
            <span>AI is analyzing your recording...</span>
          </div>
        )}

        {/* Keyboard Shortcuts Hint */}
        {!isRecording && !processing && (
          <div className="text-center text-xs text-gray-400 mt-4">
            Press{' '}
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
              Space
            </kbd>{' '}
            to start recording
          </div>
        )}
      </div>
    </div>
  )
}
