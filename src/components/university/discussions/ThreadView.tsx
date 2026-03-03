'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowFatUp,
  PushPin,
  CheckCircle,
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useDiscussionReplies, useCreateReply, useUpvote } from '@/lib/hooks/useDiscussions'
import type { DiscussionThread, DiscussionReply } from '@/lib/types/university'

interface ThreadViewProps {
  thread: DiscussionThread
  isProfessor?: boolean
  onBack: () => void
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

export function ThreadView({ thread, isProfessor, onBack }: ThreadViewProps) {
  const { user } = useAuth()
  const { replies, loading: repliesLoading } = useDiscussionReplies(thread.id)
  const { createReply, replying } = useCreateReply()
  const { toggleUpvote } = useUpvote()

  const [replyBody, setReplyBody] = useState('')
  const [error, setError] = useState<string | null>(null)

  const userId = user?.uid

  async function handleReply() {
    if (!replyBody.trim()) return
    setError(null)

    const result = await createReply({ threadId: thread.id, body: replyBody })
    if (result.error) {
      setError(result.error)
    } else {
      setReplyBody('')
    }
  }

  async function handleUpvote(targetId: string, targetType: 'thread' | 'reply') {
    await toggleUpvote(targetId, targetType)
  }

  async function handlePin() {
    if (!user) return
    try {
      const token = await user.getIdToken()
      await fetch('/api/university/discussions/pin', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threadId: thread.id, isPinned: !thread.isPinned }),
      })
    } catch {
      // Silently fail — real-time listener will reconcile
    }
  }

  async function handleAccept(replyId: string, currentlyAccepted: boolean) {
    if (!user) return
    try {
      const token = await user.getIdToken()
      await fetch('/api/university/discussions/accept', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ replyId, isAccepted: !currentlyAccepted }),
      })
    } catch {
      // Silently fail
    }
  }

  const threadUpvoted = userId ? thread.upvotes.includes(userId) : false

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to threads
      </button>

      {/* Thread header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-start gap-3">
          {/* Upvote */}
          <button
            type="button"
            onClick={() => handleUpvote(thread.id, 'thread')}
            className={`flex flex-col items-center gap-0.5 pt-0.5 ${
              threadUpvoted ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
            } transition-colors`}
          >
            <ArrowFatUp size={18} weight={threadUpvoted ? 'fill' : 'regular'} />
            <span className="text-[10px] font-medium">{thread.upvotes.length}</span>
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {thread.isPinned && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  <PushPin size={10} weight="fill" />
                  Pinned
                </span>
              )}
              <h3 className="text-sm font-semibold text-gray-900">{thread.title}</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap mb-3">
              {thread.body}
            </p>

            <div className="flex items-center gap-3 text-[10px] text-gray-400">
              <span className="font-medium text-gray-500">{thread.authorName}</span>
              <span>{timeAgo(thread.createdAt)}</span>
            </div>
          </div>

          {/* Professor actions */}
          {isProfessor && (
            <button
              type="button"
              onClick={handlePin}
              className={`p-1.5 rounded transition-colors ${
                thread.isPinned
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-gray-300 hover:text-gray-500 hover:bg-gray-50'
              }`}
              title={thread.isPinned ? 'Unpin thread' : 'Pin thread'}
            >
              <PushPin size={16} weight={thread.isPinned ? 'fill' : 'regular'} />
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-gray-500">
          {repliesLoading ? 'Loading replies...' : `${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`}
        </h4>

        {replies.map((reply) => (
          <ReplyCard
            key={reply.id}
            reply={reply}
            userId={userId}
            isProfessor={isProfessor}
            onUpvote={() => handleUpvote(reply.id, 'reply')}
            onAccept={() => handleAccept(reply.id, reply.isAccepted)}
          />
        ))}

        {!repliesLoading && replies.length === 0 && (
          <div className="text-xs text-gray-400 text-center py-4">No replies yet. Be the first to respond!</div>
        )}
      </div>

      {/* Reply input */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <textarea
          value={replyBody}
          onChange={(e) => setReplyBody(e.target.value)}
          placeholder="Write your reply..."
          className="w-full text-xs text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
          rows={3}
        />
        {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleReply}
            disabled={replying || !replyBody.trim()}
            className="flex items-center gap-1 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 px-3 py-1.5 rounded-md transition-colors"
          >
            <PaperPlaneTilt size={14} weight="bold" />
            {replying ? 'Posting...' : 'Reply'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ReplyCard
// ---------------------------------------------------------------------------

interface ReplyCardProps {
  reply: DiscussionReply
  userId?: string
  isProfessor?: boolean
  onUpvote: () => void
  onAccept: () => void
}

function ReplyCard({ reply, userId, isProfessor, onUpvote, onAccept }: ReplyCardProps) {
  const upvoted = userId ? reply.upvotes.includes(userId) : false

  return (
    <div
      className={`bg-white border rounded-lg p-3 shadow-sm ${
        reply.isAccepted ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Upvote */}
        <button
          type="button"
          onClick={onUpvote}
          className={`flex flex-col items-center gap-0.5 pt-0.5 ${
            upvoted ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
          } transition-colors`}
        >
          <ArrowFatUp size={16} weight={upvoted ? 'fill' : 'regular'} />
          <span className="text-[10px] font-medium">{reply.upvotes.length}</span>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap mb-2">
            {reply.body}
          </p>

          <div className="flex items-center gap-3 text-[10px] text-gray-400">
            <span className="font-medium text-gray-500">{reply.authorName}</span>
            <span>{timeAgo(reply.createdAt)}</span>
            {reply.isAccepted && (
              <span className="inline-flex items-center gap-0.5 text-green-700 font-medium">
                <CheckCircle size={12} weight="fill" />
                Accepted
              </span>
            )}
          </div>
        </div>

        {/* Professor accept action */}
        {isProfessor && (
          <button
            type="button"
            onClick={onAccept}
            className={`p-1.5 rounded transition-colors ${
              reply.isAccepted
                ? 'text-green-600 bg-green-50 hover:bg-green-100'
                : 'text-gray-300 hover:text-green-500 hover:bg-green-50'
            }`}
            title={reply.isAccepted ? 'Remove accepted mark' : 'Mark as accepted answer'}
          >
            <CheckCircle size={16} weight={reply.isAccepted ? 'fill' : 'regular'} />
          </button>
        )}
      </div>
    </div>
  )
}
