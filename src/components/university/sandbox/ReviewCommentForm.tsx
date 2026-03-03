'use client'

import { useState } from 'react'

interface ReviewCommentFormProps {
  fileName: string
  lineNumber: number
  onSubmit: (params: { fileName: string; lineNumber: number; body: string }) => Promise<void>
  onCancel: () => void
}

export function ReviewCommentForm({ fileName, lineNumber, onSubmit, onCancel }: ReviewCommentFormProps) {
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return

    setSubmitting(true)
    try {
      await onSubmit({ fileName, lineNumber, body: body.trim() })
      setBody('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-medium text-gray-500">
          {fileName} : line {lineNumber}
        </span>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your review comment..."
        rows={3}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <div className="flex items-center gap-2 mt-2">
        <button
          type="submit"
          disabled={!body.trim() || submitting}
          className="text-xs font-medium bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
