'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Briefcase, Article, CheckCircle, Circle, FloppyDisk, PaperPlaneTilt, ArrowSquareOut } from '@phosphor-icons/react'
import type { UniversityBusinessIdeaDisplay, UniversityThesisIdeaDisplay, IdeaDocument } from '@/lib/types/university'

interface IdeaEditViewProps {
  type: 'business' | 'thesis'
  idea: UniversityBusinessIdeaDisplay | UniversityThesisIdeaDisplay
  onSave: (documents: IdeaDocument[]) => Promise<void>
  onSubmit: (documents: IdeaDocument[]) => Promise<void>
  isSaving: boolean
  onBack: () => void
}

function isValidGoogleDriveUrl(url: string): boolean {
  return url.includes('docs.google.com') || url.includes('drive.google.com')
}

export function IdeaEditView({ type, idea, onSave, onSubmit, isSaving, onBack }: IdeaEditViewProps) {
  const [documents, setDocuments] = useState<IdeaDocument[]>(idea.documents)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Sync when idea changes (e.g., real-time update)
  useEffect(() => {
    setDocuments(idea.documents)
  }, [idea.documents])

  const Icon = type === 'business' ? Briefcase : Article
  const ideaName = type === 'business'
    ? (idea as UniversityBusinessIdeaDisplay).concept
    : (idea as UniversityThesisIdeaDisplay).topic
  const isSubmitted = idea.status === 'submitted'

  const filledCount = documents.filter(d => d.url && isValidGoogleDriveUrl(d.url)).length
  const totalCount = documents.length
  const allValid = filledCount === totalCount

  function updateUrl(index: number, url: string) {
    setDocuments(prev => prev.map((d, i) => i === index ? { ...d, url: url || null } : d))
  }

  async function handleSave() {
    await onSave(documents)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  async function handleSubmit() {
    await onSubmit(documents)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Icon size={14} weight="duotone" />
          <span>{type === 'business' ? 'Business Idea' : 'Thesis Idea'}</span>
          <span className={`ml-auto text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isSubmitted ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {isSubmitted ? 'Submitted' : 'Draft'}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">{ideaName}</h1>
        {idea.description && (
          <p className="text-sm text-gray-500">{idea.description}</p>
        )}
      </div>

      {/* Progress */}
      {!isSubmitted && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>Documents</span>
            <span>{filledCount}/{totalCount} completed</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all"
              style={{ width: `${totalCount > 0 ? (filledCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Document list */}
      <div className="space-y-3 mb-6">
        {documents.map((doc, i) => {
          const hasUrl = !!doc.url
          const valid = hasUrl && isValidGoogleDriveUrl(doc.url!)
          const showError = hasUrl && !valid

          return (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                {valid ? (
                  <CheckCircle size={16} weight="fill" className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={16} className="text-gray-300 shrink-0" />
                )}
                <span className="text-sm font-medium text-gray-900">{doc.title}</span>
              </div>

              {isSubmitted ? (
                // Read-only: show link
                doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 ml-6"
                  >
                    <ArrowSquareOut size={12} />
                    Open in Google Drive
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 ml-6">No document submitted</p>
                )
              ) : (
                // Editable: URL input
                <div className="ml-6">
                  <input
                    type="url"
                    value={doc.url || ''}
                    onChange={e => updateUrl(i, e.target.value)}
                    placeholder="Paste Google Drive link..."
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      showError ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {showError && (
                    <p className="text-[11px] text-red-500 mt-1">
                      Must be a Google Drive link (docs.google.com or drive.google.com)
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Actions */}
      {!isSubmitted && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FloppyDisk size={14} weight="bold" />
            {saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!allValid || isSaving}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperPlaneTilt size={14} weight="bold" />
            Submit
          </button>
          {!allValid && (
            <p className="text-[11px] text-gray-400">
              Add all {totalCount} documents to submit
            </p>
          )}
        </div>
      )}
    </div>
  )
}
