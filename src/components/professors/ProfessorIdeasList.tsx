'use client'

import { useState } from 'react'
import { CaretDown, CaretUp, ArrowSquareOut, ChatCircle, CircleNotch } from '@phosphor-icons/react'
import { useProfessorIdeas, type ProfessorIdeaRow } from '@/lib/hooks/useProfessorIdeas'
import { IdeaCommentSection } from './IdeaCommentSection'

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-500' },
  submitted: { label: 'Submitted', className: 'bg-green-50 text-green-700' },
}

function IdeaCard({ idea }: { idea: ProfessorIdeaRow }) {
  const [expanded, setExpanded] = useState(false)
  const badge = STATUS_BADGE[idea.status] || STATUS_BADGE.draft
  const filledDocs = idea.documents.filter(d => d.url).length

  const date = new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-gray-900 truncate">
              {idea.title}
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0 ${badge.className}`}>
              {badge.label}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {idea.userName} &middot; {idea.userEmail}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {date} &middot; {filledDocs}/{idea.documents.length} docs
            {idea.commentCount > 0 && (
              <span className="ml-1.5 inline-flex items-center gap-0.5">
                <ChatCircle size={10} weight="bold" />
                {idea.commentCount}
              </span>
            )}
          </p>
        </div>
        <div className="shrink-0">
          {expanded ? (
            <CaretUp size={14} className="text-gray-400" />
          ) : (
            <CaretDown size={14} className="text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          {idea.description && (
            <p className="text-xs text-gray-600 mb-3">{idea.description}</p>
          )}

          {/* Documents */}
          <h5 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
            Documents
          </h5>
          <div className="space-y-1.5 mb-3">
            {idea.documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={`flex-1 truncate ${doc.url ? 'text-gray-700' : 'text-gray-400'}`}>
                  {doc.title}
                </span>
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 flex items-center gap-0.5 shrink-0 transition-colors"
                  >
                    View <ArrowSquareOut size={10} />
                  </a>
                ) : (
                  <span className="text-[10px] text-gray-300 shrink-0">Not submitted</span>
                )}
              </div>
            ))}
          </div>

          {/* Comments */}
          <IdeaCommentSection ideaId={idea.id} ideaCollection={idea.collection} />
        </div>
      )}
    </div>
  )
}

interface ProfessorIdeasListProps {
  type: 'business' | 'thesis'
}

export function ProfessorIdeasList({ type }: ProfessorIdeasListProps) {
  const { businessIdeas, thesisIdeas, loading, error } = useProfessorIdeas()
  const ideas = type === 'business' ? businessIdeas : thesisIdeas

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <CircleNotch size={24} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (ideas.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">
          No {type === 'business' ? 'business plan proposals' : 'thesis proposals'} yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {ideas.map(idea => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  )
}
