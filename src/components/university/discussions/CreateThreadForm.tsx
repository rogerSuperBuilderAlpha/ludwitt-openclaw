'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import { useCreateThread } from '@/lib/hooks/useDiscussions'

interface CreateThreadFormProps {
  courseId: string
  deliverableId?: string
  learningPathId: string
  onCreated: () => void
  onCancel: () => void
}

export function CreateThreadForm({
  courseId,
  deliverableId,
  learningPathId,
  onCreated,
  onCancel,
}: CreateThreadFormProps) {
  const { createThread, creating } = useCreateThread()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setError(null)

    const result = await createThread({
      courseId,
      deliverableId,
      learningPathId,
      title: title.trim(),
      body: body.trim(),
    })

    if (result.error) {
      setError(result.error)
    } else {
      setTitle('')
      setBody('')
      onCreated()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">New Discussion Thread</h4>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div>
        <label htmlFor="thread-title" className="block text-[10px] font-medium text-gray-500 mb-1">
          Title
        </label>
        <input
          id="thread-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is your question or topic?"
          className="w-full text-xs text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="thread-body" className="block text-[10px] font-medium text-gray-500 mb-1">
          Details
        </label>
        <textarea
          id="thread-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Provide context, code snippets, or describe the issue..."
          className="w-full text-xs text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
          rows={4}
        />
      </div>

      {error && <p className="text-[10px] text-red-500">{error}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={creating || !title.trim() || !body.trim()}
          className="text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 px-4 py-1.5 rounded-md transition-colors"
        >
          {creating ? 'Posting...' : 'Post Thread'}
        </button>
      </div>
    </form>
  )
}
