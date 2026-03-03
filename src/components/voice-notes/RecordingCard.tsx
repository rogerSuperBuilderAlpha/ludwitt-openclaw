/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-autofocus, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
'use client'

/**
 * Recording Card Component
 * Displays a single recording in the history list
 */

import {
  Star,
  Clock,
  Tag,
  Edit2,
  Check,
  Trash2,
  Download,
  Share2,
  TrendingUp,
} from 'lucide-react'
import { Recording } from '@/lib/types/voice-notes'
import { getTemplateColor } from '@/lib/voice-notes/templates'

interface RecordingCardProps {
  recording: Recording
  isEditingTitle: boolean
  editingTitle: string
  onSelect: () => void
  onToggleStar: () => void
  onStartEditTitle: () => void
  onEditTitleChange: (value: string) => void
  onSaveTitle: () => void
  onDelete: () => void
  onDownload: () => void
  onShare: () => void
  formatTime: (seconds: number) => string
}

export function RecordingCard({
  recording,
  isEditingTitle,
  editingTitle,
  onSelect,
  onToggleStar,
  onStartEditTitle,
  onEditTitleChange,
  onSaveTitle,
  onDelete,
  onDownload,
  onShare,
  formatTime,
}: RecordingCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50'
      case 'negative':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1" onClick={onSelect}>
            {isEditingTitle ? (
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => onEditTitleChange(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSaveTitle()
                    if (e.key === 'Escape') onEditTitleChange('')
                  }}
                />
                <button
                  onClick={onSaveTitle}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {recording.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartEditTitle()
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(recording.duration)}
              </span>
              <span>
                {recording.date instanceof Date
                  ? recording.date.toLocaleDateString()
                  : new Date(recording.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleStar()
            }}
            className={`p-1.5 rounded-full transition-colors ${
              recording.starred
                ? 'text-yellow-500 bg-yellow-50'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Star
              className="w-5 h-5"
              fill={recording.starred ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Summary Preview */}
        <p
          className="text-sm text-gray-600 line-clamp-2 mb-3"
          onClick={onSelect}
        >
          {recording.summary || 'Processing...'}
        </p>

        {/* Tags & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {recording.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTemplateColor(tag as any)}`}
              >
                {tag}
              </span>
            ))}
            {recording.sentiment && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getSentimentColor(recording.sentiment)}`}
              >
                <TrendingUp className="w-3 h-3" />
                {recording.sentiment}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDownload()
              }}
              className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onShare()
              }}
              className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
