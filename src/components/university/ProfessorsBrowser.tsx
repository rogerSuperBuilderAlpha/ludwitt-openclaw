'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MagnifyingGlass, CircleNotch } from '@phosphor-icons/react'
import { ProfessorCard } from './ProfessorCard'
import type { ProfessorListItem } from '@/lib/types/university'

interface ProfessorsBrowserProps {
  professors: ProfessorListItem[]
  loading: boolean
  error: string | null
  onBack: () => void
  onFilterByProfessor: (professorId: string) => void
}

export function ProfessorsBrowser({
  professors,
  loading,
  error,
  onBack,
  onFilterByProfessor,
}: ProfessorsBrowserProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return professors
    return professors.filter(p => {
      const haystack = [
        p.displayName,
        p.title || '',
        p.headline || '',
        p.institution || '',
        ...p.specialties,
        ...p.pathTopics,
      ].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [professors, search])

  function handleViewProfile(professorId: string) {
    router.push(`/university/professors/${professorId}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Faculty</h2>
        <p className="text-xs text-gray-500">
          Browse professors and view the learning paths they teach.
        </p>
      </div>

      {!loading && !error && professors.length > 0 && (
        <div className="mb-4">
          <div className="relative">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or topic..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <CircleNotch size={24} className="text-gray-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : professors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-gray-500">No professors have set up their profiles yet.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <MagnifyingGlass size={28} weight="duotone" className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No professors match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(professor => (
            <ProfessorCard
              key={professor.professorId}
              professor={professor}
              onViewPaths={onFilterByProfessor}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      )}
    </div>
  )
}
