/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  ArrowLeft,
  FloppyDisk,
  PaperPlaneTilt,
  ChatText,
  Info,
  CaretDown,
  CaretUp,
} from '@phosphor-icons/react'
import { CodeEditor } from './CodeEditor'
import { ReviewCommentForm } from './ReviewCommentForm'
import { useSandbox } from '@/lib/hooks/useSandbox'
import { useCodeReviews } from '@/lib/hooks/useCodeReviews'
import type { SandboxFile, SandboxTemplate } from '@/lib/types/university'

interface SandboxViewProps {
  courseId: string
  deliverableId: string
  onBack: () => void
}

export function SandboxView({
  courseId,
  deliverableId,
  onBack,
}: SandboxViewProps) {
  const { templates, submission, loading, error, saveWork, isSaving } =
    useSandbox(courseId, deliverableId)
  const { comments, addComment } = useCodeReviews(submission?.id)

  const [files, setFiles] = useState<SandboxFile[]>([])
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const [selectedTemplate, setSelectedTemplate] =
    useState<SandboxTemplate | null>(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const [showReviews, setShowReviews] = useState(true)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [commentLine, setCommentLine] = useState(1)
  const [saved, setSaved] = useState(false)

  // Initialize files from submission or template
  useEffect(() => {
    if (submission?.files && submission.files.length > 0) {
      setFiles(submission.files)
    } else if (templates.length > 0 && files.length === 0) {
      const tmpl = templates[0]
      setSelectedTemplate(tmpl)
      setFiles(tmpl.files.map((f) => ({ ...f })))
    }
  }, [submission, templates]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectTemplate = useCallback((tmpl: SandboxTemplate) => {
    setSelectedTemplate(tmpl)
    setFiles(tmpl.files.map((f) => ({ ...f })))
    setActiveFileIndex(0)
  }, [])

  function handleFileChange(index: number, content: string) {
    setFiles((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], content }
      return next
    })
    setSaved(false)
  }

  async function handleSave() {
    await saveWork(files)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleAddComment(params: {
    fileName: string
    lineNumber: number
    body: string
  }) {
    await addComment(params)
    setShowCommentForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">Code Sandbox</h1>
          <p className="text-xs text-gray-500">
            Write and submit code for this deliverable
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || files.length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-medium border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FloppyDisk size={14} />
            {isSaving ? 'Saving...' : saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Template selector */}
      {templates.length > 1 && (
        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">Template</label>
          <select
            value={selectedTemplate?.id || ''}
            onChange={(e) => {
              const tmpl = templates.find((t) => t.id === e.target.value)
              if (tmpl) handleSelectTemplate(tmpl)
            }}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            {templates.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.title} ({tmpl.language})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Instructions panel */}
      {selectedTemplate?.instructions && (
        <div className="mb-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors mb-1"
          >
            <Info size={14} />
            Instructions
            {showInstructions ? <CaretUp size={10} /> : <CaretDown size={10} />}
          </button>
          {showInstructions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <p className="text-xs text-blue-800 whitespace-pre-wrap leading-relaxed">
                {selectedTemplate.instructions}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Code editor */}
      {files.length > 0 ? (
        <CodeEditor
          files={files}
          activeFileIndex={activeFileIndex}
          onFileChange={handleFileChange}
          onActiveFileChange={setActiveFileIndex}
          reviewComments={comments}
        />
      ) : (
        <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-lg">
          <PaperPlaneTilt
            size={32}
            weight="duotone"
            className="text-gray-300 mx-auto mb-3"
          />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No template available
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            A professor has not yet created a sandbox template for this
            deliverable.
          </p>
        </div>
      )}

      {/* Review comments panel */}
      {comments.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors mb-2"
          >
            <ChatText size={14} />
            Review Comments ({comments.length})
            {showReviews ? <CaretUp size={10} /> : <CaretDown size={10} />}
          </button>
          {showReviews && (
            <div className="space-y-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-amber-50 border-l-2 border-amber-400 text-xs px-3 py-2 rounded-r"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-amber-700">
                      {comment.authorName}
                    </span>
                    <span className="text-gray-400">
                      {comment.fileName}:{comment.lineNumber}
                    </span>
                    <span className="text-gray-300 ml-auto">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add comment form */}
      {submission && (
        <div className="mt-4">
          {showCommentForm ? (
            <ReviewCommentForm
              fileName={files[activeFileIndex]?.name || ''}
              lineNumber={commentLine}
              onSubmit={handleAddComment}
              onCancel={() => setShowCommentForm(false)}
            />
          ) : (
            <button
              onClick={() => setShowCommentForm(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChatText size={14} />
              Add Review Comment
            </button>
          )}
        </div>
      )}
    </div>
  )
}
