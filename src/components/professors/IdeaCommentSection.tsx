'use client'

import { useState } from 'react'
import { PaperPlaneRight, CircleNotch } from '@phosphor-icons/react'
import { useIdeaComments } from '@/lib/hooks/useIdeaComments'

interface IdeaCommentSectionProps {
  ideaId: string
  ideaCollection: 'business' | 'thesis'
}

export function IdeaCommentSection({ ideaId, ideaCollection }: IdeaCommentSectionProps) {
  const { comments, loading, posting, postComment } = useIdeaComments(ideaId, ideaCollection)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!text.trim()) return
    setError(null)
    const result = await postComment(text.trim())
    if (result.error) {
      setError(result.error)
    } else {
      setText('')
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <h5 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h5>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <CircleNotch size={16} className="text-gray-300 animate-spin" />
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-2 mb-3 max-h-60 overflow-y-auto">
          {comments.map(comment => {
            const date = new Date(comment.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
            return (
              <div key={comment.id} className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-700">{comment.authorName}</span>
                  <span className="text-[10px] text-gray-400">{date}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
              </div>
            )
          })}
        </div>
      )}

      {!loading && comments.length === 0 && (
        <p className="text-xs text-gray-400 mb-3">No comments yet.</p>
      )}

      {error && (
        <p className="text-xs text-red-500 mb-2">{error}</p>
      )}

      <div className="flex items-start gap-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          maxLength={2000}
          rows={2}
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          disabled={posting || !text.trim()}
          className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors shrink-0"
        >
          {posting ? (
            <CircleNotch size={14} className="animate-spin" />
          ) : (
            <PaperPlaneRight size={14} />
          )}
        </button>
      </div>
    </div>
  )
}
