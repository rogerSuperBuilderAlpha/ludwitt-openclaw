'use client'

import { useState } from 'react'
import { Plus, X, CaretDown, CaretRight } from '@phosphor-icons/react'
import type { ProfessorProfile, ProfessorPublication } from '@/lib/types/university'

interface PublicationsSectionProps {
  formData: Partial<ProfessorProfile>
  updateField: <K extends keyof ProfessorProfile>(key: K, value: ProfessorProfile[K]) => void
}

const emptyPub: ProfessorPublication = { title: '' }

export function PublicationsSection({ formData, updateField }: PublicationsSectionProps) {
  const [expanded, setExpanded] = useState(false)
  const pubs = formData.publications || []

  function addPub() {
    if (pubs.length >= 50) return
    updateField('publications', [...pubs, { ...emptyPub }])
    setExpanded(true)
  }

  function removePub(idx: number) {
    updateField('publications', pubs.filter((_, i) => i !== idx))
  }

  function updatePub(idx: number, field: keyof ProfessorPublication, value: string | number | undefined) {
    const updated = pubs.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    updateField('publications', updated)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-sm font-semibold text-gray-900"
      >
        {expanded ? <CaretDown size={14} weight="bold" /> : <CaretRight size={14} weight="bold" />}
        Publications {pubs.length > 0 && <span className="text-gray-400 font-normal">({pubs.length})</span>}
      </button>

      {expanded && (
        <div className="space-y-3">
          {pubs.map((pub, idx) => (
            <div key={idx} className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <input
                  value={pub.title}
                  onChange={e => updatePub(idx, 'title', e.target.value)}
                  placeholder="Publication title"
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button type="button" onClick={() => removePub(idx)} className="mt-1 text-gray-400 hover:text-red-500">
                  <X size={14} weight="bold" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  value={pub.journal || ''}
                  onChange={e => updatePub(idx, 'journal', e.target.value || undefined)}
                  placeholder="Journal"
                  className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="number"
                  value={pub.year ?? ''}
                  onChange={e => updatePub(idx, 'year', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="Year"
                  className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="url"
                  value={pub.url || ''}
                  onChange={e => updatePub(idx, 'url', e.target.value || undefined)}
                  placeholder="URL"
                  className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          {pubs.length < 50 && (
            <button
              type="button"
              onClick={addPub}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <Plus size={12} weight="bold" /> Add Publication
            </button>
          )}
        </div>
      )}

      {!expanded && pubs.length === 0 && (
        <button
          type="button"
          onClick={addPub}
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          <Plus size={12} weight="bold" /> Add Publication
        </button>
      )}
    </div>
  )
}
