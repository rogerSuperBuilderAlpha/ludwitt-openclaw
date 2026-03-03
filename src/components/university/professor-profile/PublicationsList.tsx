'use client'

import { ArrowSquareOut } from '@phosphor-icons/react'
import type { ProfessorPublication } from '@/lib/types/university'

interface PublicationsListProps {
  publications: ProfessorPublication[]
}

export function PublicationsList({ publications }: PublicationsListProps) {
  if (publications.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Publications</h3>
      <div className="space-y-2">
        {publications.map((pub, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 font-medium">
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                    {pub.title}
                    <ArrowSquareOut size={12} className="shrink-0 text-gray-400" />
                  </a>
                ) : (
                  pub.title
                )}
              </p>
              {(pub.journal || pub.year) && (
                <p className="text-xs text-gray-400">
                  {[pub.journal, pub.year].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
