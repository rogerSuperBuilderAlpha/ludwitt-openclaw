'use client'

import { CaretRight, Briefcase } from '@phosphor-icons/react'
import type { UniversityBusinessIdeaDisplay } from '@/lib/types/university'

interface BusinessIdeaCardProps {
  idea: UniversityBusinessIdeaDisplay
  onClick: () => void
}

export function BusinessIdeaCard({ idea, onClick }: BusinessIdeaCardProps) {
  const isDraft = idea.status === 'draft'
  const filledCount = idea.documents.filter(d => d.url).length
  const totalCount = idea.documents.length

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-lg p-3 sm:p-5 shadow-sm transition-colors hover:border-gray-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-2.5">
          <Briefcase size={18} weight="duotone" className="text-gray-500 shrink-0" />
          <h3 className="text-sm font-semibold text-gray-900">
            {idea.concept}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isDraft ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
          }`}>
            {isDraft ? 'Draft' : 'Submitted'}
          </span>
          <CaretRight size={14} className="text-gray-400" />
        </div>
      </div>

      {idea.description && (
        <p className="text-xs text-gray-500 ml-6 sm:ml-[30px]">{idea.description}</p>
      )}

      <p className="text-xs text-gray-400 mt-2 ml-6 sm:ml-[30px]">
        {filledCount}/{totalCount} documents
      </p>
    </button>
  )
}
