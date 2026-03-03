'use client'

import { useState } from 'react'
import { PushPin, ChatCircle, ArrowFatUp, Plus } from '@phosphor-icons/react'
import type { DiscussionThread } from '@/lib/types/university'
import { useDiscussionThreads } from '@/lib/hooks/useDiscussions'
import { CreateThreadForm } from './CreateThreadForm'
import { ThreadView } from './ThreadView'

interface ThreadListProps {
  courseId: string
  deliverableId?: string
  learningPathId: string
  isProfessor?: boolean
}

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function ThreadList({ courseId, deliverableId, learningPathId, isProfessor }: ThreadListProps) {
  const { threads, loading, error } = useDiscussionThreads(courseId, deliverableId)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedThread, setSelectedThread] = useState<DiscussionThread | null>(null)

  if (selectedThread) {
    return (
      <ThreadView
        thread={selectedThread}
        isProfessor={isProfessor}
        onBack={() => setSelectedThread(null)}
      />
    )
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          Discussion Threads
        </h3>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-1 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus size={14} weight="bold" />
          New Thread
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <CreateThreadForm
          courseId={courseId}
          deliverableId={deliverableId}
          learningPathId={learningPathId}
          onCreated={() => setShowCreate(false)}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-xs text-gray-400 text-center py-6">Loading threads...</div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-xs text-red-500 text-center py-4">{error}</div>
      )}

      {/* Empty state */}
      {!loading && !error && threads.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-xs text-gray-400">No discussion threads yet. Start a conversation!</p>
        </div>
      )}

      {/* Thread list */}
      {threads.map((thread) => (
        <ThreadRow
          key={thread.id}
          thread={thread}
          onClick={() => setSelectedThread(thread)}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ThreadRow — single thread in the list
// ---------------------------------------------------------------------------

interface ThreadRowProps {
  thread: DiscussionThread
  onClick: () => void
}

function ThreadRow({ thread, onClick }: ThreadRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {thread.isPinned && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                <PushPin size={10} weight="fill" />
                Pinned
              </span>
            )}
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {thread.title}
            </h4>
          </div>

          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
            {thread.body}
          </p>

          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span>{thread.authorName}</span>
            <span>{timeAgo(thread.createdAt)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ChatCircle size={14} />
            <span>{thread.replyCount}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <ArrowFatUp size={14} />
            <span>{thread.upvotes.length}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
