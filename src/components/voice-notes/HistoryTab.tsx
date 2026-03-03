'use client'

/**
 * History Tab Component
 * Displays search, filter, and recording list
 */

import { useState } from 'react'
import { Search, Filter, Star, Tag } from 'lucide-react'
import { Recording } from '@/lib/types/voice-notes'
import { LoadingSkeletons } from '@/components/voice-notes/LoadingSkeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { RecordingCard } from './RecordingCard'

interface HistoryTabProps {
  recordings: Recording[]
  loading: boolean
  searchQuery: string
  filterTag: string
  editingTitleId: string | null
  editingTitle: string
  onSearchChange: (query: string) => void
  onFilterChange: (tag: string) => void
  onSelectRecording: (recording: Recording) => void
  onToggleStar: (id: string) => void
  onStartEditTitle: (recording: Recording) => void
  onEditTitleChange: (value: string) => void
  onSaveTitle: (id: string) => void
  onDelete: (id: string) => void
  onDownload: (recording: Recording) => void
  onShare: (recording: Recording) => void
  formatTime: (seconds: number) => string
}

export function HistoryTab({
  recordings,
  loading,
  searchQuery,
  filterTag,
  editingTitleId,
  editingTitle,
  onSearchChange,
  onFilterChange,
  onSelectRecording,
  onToggleStar,
  onStartEditTitle,
  onEditTitleChange,
  onSaveTitle,
  onDelete,
  onDownload,
  onShare,
  formatTime,
}: HistoryTabProps) {
  const [showFilters, setShowFilters] = useState(false)

  // Filter recordings
  const filteredRecordings = recordings.filter((recording) => {
    const matchesSearch =
      recording.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.transcript?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recording.summary?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterTag === 'all' ||
      (filterTag === 'starred' && recording.starred) ||
      recording.tags?.includes(filterTag)

    return matchesSearch && matchesFilter
  })

  // Get all unique tags from recordings
  const allTags = Array.from(
    new Set(
      recordings.flatMap((r) => r.tags || []).filter((t) => t !== 'processing')
    )
  )

  if (loading) {
    return <LoadingSkeletons />
  }

  if (recordings.length === 0) {
    return (
      <EmptyState
        icon="🎙️"
        title="No recordings yet"
        description="Start recording your first voice note to see it here"
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search recordings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2.5 border rounded-lg transition-colors flex items-center gap-2 ${
            showFilters || filterTag !== 'all'
              ? 'border-red-500 text-red-600 bg-red-50'
              : 'border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filterTag === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('starred')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filterTag === 'starred'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="w-3 h-3" />
              Starred
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onFilterChange(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  filterTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        {filteredRecordings.length} recording
        {filteredRecordings.length !== 1 ? 's' : ''}
        {searchQuery && ` matching "${searchQuery}"`}
        {filterTag !== 'all' && ` • Filtered by: ${filterTag}`}
      </div>

      {/* Recordings List */}
      <div className="space-y-3">
        {filteredRecordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            recording={recording}
            isEditingTitle={editingTitleId === recording.id}
            editingTitle={editingTitle}
            onSelect={() => onSelectRecording(recording)}
            onToggleStar={() => onToggleStar(recording.id)}
            onStartEditTitle={() => onStartEditTitle(recording)}
            onEditTitleChange={onEditTitleChange}
            onSaveTitle={() => onSaveTitle(recording.id)}
            onDelete={() => onDelete(recording.id)}
            onDownload={() => onDownload(recording)}
            onShare={() => onShare(recording)}
            formatTime={formatTime}
          />
        ))}
      </div>

      {filteredRecordings.length === 0 && recordings.length > 0 && (
        <EmptyState
          icon="🔍"
          title="No matches found"
          description="Try adjusting your search or filter criteria"
        />
      )}
    </div>
  )
}
