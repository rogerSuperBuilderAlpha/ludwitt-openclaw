'use client'

import { useRef, useCallback } from 'react'
import type { SandboxFile, CodeReviewComment } from '@/lib/types/university'

interface CodeEditorProps {
  files: SandboxFile[]
  activeFileIndex: number
  onFileChange: (index: number, content: string) => void
  onActiveFileChange: (index: number) => void
  readOnly?: boolean
  reviewComments?: CodeReviewComment[]
}

function getLineCount(content: string): number {
  return content.split('\n').length
}

export function CodeEditor({
  files,
  activeFileIndex,
  onFileChange,
  onActiveFileChange,
  readOnly = false,
  reviewComments = [],
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const textarea = e.currentTarget
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const value = textarea.value
        const newValue = value.substring(0, start) + '  ' + value.substring(end)
        onFileChange(activeFileIndex, newValue)
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        })
      }
    },
    [activeFileIndex, onFileChange]
  )

  const activeFile = files[activeFileIndex]
  if (!activeFile) return null

  const lines = activeFile.content.split('\n')
  const lineCount = lines.length

  // Filter comments for the active file
  const fileComments = reviewComments.filter(
    (c) => c.fileName === activeFile.name
  )
  const commentsByLine: Record<number, CodeReviewComment[]> = {}
  for (const comment of fileComments) {
    if (!commentsByLine[comment.lineNumber]) {
      commentsByLine[comment.lineNumber] = []
    }
    commentsByLine[comment.lineNumber].push(comment)
  }

  // Build line numbers with inline review comments
  const lineElements: React.ReactNode[] = []
  for (let i = 1; i <= lineCount; i++) {
    lineElements.push(
      <div key={`line-${i}`} className="leading-5 text-right pr-2 select-none">
        {i}
      </div>
    )
    if (commentsByLine[i]) {
      for (const comment of commentsByLine[i]) {
        lineElements.push(
          <div
            key={`comment-${comment.id}`}
            className="bg-amber-50 border-l-2 border-amber-400 text-xs px-2 py-1 my-0.5 rounded-r"
          >
            <span className="font-medium text-amber-700">{comment.authorName}</span>
            <span className="text-gray-500 ml-1 text-[10px]">L{comment.lineNumber}</span>
            <p className="text-gray-700 mt-0.5">{comment.body}</p>
          </div>
        )
      }
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Tab bar */}
      <div className="flex items-center bg-white border-b border-gray-200 overflow-x-auto">
        {files.map((file, i) => (
          <button
            key={file.name}
            onClick={() => onActiveFileChange(i)}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              i === activeFileIndex
                ? 'border-b-2 border-gray-900 text-gray-900 bg-gray-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div className="flex relative" style={{ minHeight: 200 }}>
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="bg-gray-100 text-gray-400 text-xs font-mono py-2 overflow-hidden shrink-0 select-none"
          style={{ minWidth: 40 }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="leading-5 text-right pr-2">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code area */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={activeFile.content}
            onChange={(e) => onFileChange(activeFileIndex, e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            spellCheck={false}
            className="w-full h-full bg-gray-50 font-mono text-sm text-gray-900 p-2 resize-none focus:outline-none leading-5"
            style={{ minHeight: Math.max(200, lineCount * 20 + 16) }}
          />
        </div>
      </div>

      {/* Inline review comments below editor */}
      {fileComments.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">
            Review Comments ({fileComments.length})
          </p>
          <div className="space-y-1.5">
            {fileComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-amber-50 border-l-2 border-amber-400 text-xs px-2 py-1.5 rounded-r"
              >
                <div className="flex items-center gap-1">
                  <span className="font-medium text-amber-700">{comment.authorName}</span>
                  <span className="text-gray-400">on line {comment.lineNumber}</span>
                </div>
                <p className="text-gray-700 mt-0.5">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
