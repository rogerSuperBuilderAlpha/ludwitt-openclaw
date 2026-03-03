'use client'

import { useState, useMemo } from 'react'
import { ArrowLeft, MagnifyingGlass, X } from '@phosphor-icons/react'
import { PublishedPathCard } from './PublishedPathCard'
import type { PublishedPathSummary } from '@/lib/types/university'

type StatusFilter = 'all' | 'mine' | 'joined' | 'showing-name'
type SortBy = 'newest' | 'a-z' | 'most-courses' | 'recommended'

interface PublishedPathsBrowserProps {
  paths: PublishedPathSummary[]
  loading: boolean
  error: string | null
  joinedSourceIds: Set<string>
  joiningPathId: string | null
  onJoin: (pathId: string) => void
  onBack: () => void
  onToggleAnonymous?: (pathId: string, creatorAnonymous: boolean) => void
  isTogglingAnonymous?: boolean
  userSubjects?: string[]
  initialProfessorId?: string | null
}

function matchesLevel(
  path: PublishedPathSummary,
  levelFilter: string
): boolean {
  if (levelFilter === 'all') return true
  if (!path.levelRange) return false
  const { min, max } = path.levelRange
  if (levelFilter === 'intro') return min <= 1
  if (levelFilter === 'intermediate') return min <= 3 && max >= 2
  if (levelFilter === 'advanced') return max >= 4
  return true
}

export function PublishedPathsBrowser({
  paths,
  loading,
  error,
  joinedSourceIds,
  joiningPathId,
  onJoin,
  onBack,
  onToggleAnonymous,
  isTogglingAnonymous,
  userSubjects,
  initialProfessorId,
}: PublishedPathsBrowserProps) {
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [professionFilter, setProfessionFilter] = useState('all')
  const [professorFilter, setProfessorFilter] = useState(
    initialProfessorId || 'all'
  )
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<SortBy>('newest')

  const uniqueSubjects = useMemo(() => {
    const set = new Set<string>()
    for (const p of paths) {
      for (const s of p.subjects || []) set.add(s)
    }
    return [...set].sort()
  }, [paths])

  const uniqueProfessions = useMemo(() => {
    const set = new Set<string>()
    for (const p of paths) {
      if (p.profession) set.add(p.profession)
    }
    return [...set].sort()
  }, [paths])

  const uniqueProfessors = useMemo(() => {
    const map = new Map<string, string>()
    for (const p of paths) {
      for (const prof of p.professors || []) {
        if (!map.has(prof.id)) map.set(prof.id, prof.name)
      }
    }
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]))
  }, [paths])

  const filteredPaths = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result = paths.filter((p) => {
      // Text search
      if (q) {
        const haystack = [
          p.targetTopic,
          p.targetDescription || '',
          ...(p.tags || []),
          ...(p.courseTitles || []),
          ...(p.professors || []).map((pr) => pr.name),
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      // Subject filter
      if (subjectFilter !== 'all') {
        if (!p.subjects?.includes(subjectFilter)) return false
      }
      // Level filter
      if (!matchesLevel(p, levelFilter)) return false
      // Profession filter
      if (professionFilter !== 'all') {
        if (p.profession !== professionFilter) return false
      }
      // Professor filter
      if (professorFilter !== 'all') {
        if (!(p.professors || []).some((pr) => pr.id === professorFilter))
          return false
      }
      // Status filter
      if (statusFilter === 'mine') {
        if (!p.isOwner) return false
      } else if (statusFilter === 'joined') {
        if (!joinedSourceIds.has(p.id) && !p.isOwner) return false
      } else if (statusFilter === 'showing-name') {
        if (!p.isOwner || p.creatorAnonymous) return false
      }
      return true
    })

    // Sort
    if (sortBy === 'a-z') {
      result.sort((a, b) =>
        (a.targetTopic || '').localeCompare(b.targetTopic || '')
      )
    } else if (sortBy === 'most-courses') {
      result.sort((a, b) => (b.courseCount || 0) - (a.courseCount || 0))
    } else if (sortBy === 'recommended' && userSubjects) {
      const subjectSet = new Set(userSubjects)
      result.sort((a, b) => {
        const scoreA = (a.subjects || []).filter(
          (s) => !subjectSet.has(s)
        ).length
        const scoreB = (b.subjects || []).filter(
          (s) => !subjectSet.has(s)
        ).length
        if (scoreB !== scoreA) return scoreB - scoreA
        // Tiebreak by newest
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
        return dateB - dateA
      })
    }
    // 'newest' is default order from the API, no sort needed

    return result
  }, [
    paths,
    search,
    subjectFilter,
    levelFilter,
    professionFilter,
    professorFilter,
    statusFilter,
    sortBy,
    joinedSourceIds,
    userSubjects,
  ])

  const hasActiveFilters =
    search ||
    subjectFilter !== 'all' ||
    levelFilter !== 'all' ||
    professionFilter !== 'all' ||
    professorFilter !== 'all' ||
    statusFilter !== 'all' ||
    sortBy !== 'newest'

  function clearFilters() {
    setSearch('')
    setSubjectFilter('all')
    setLevelFilter('all')
    setProfessionFilter('all')
    setProfessorFilter('all')
    setStatusFilter('all')
    setSortBy('newest')
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
        <h2 className="text-lg font-bold text-gray-900 mb-1">Join a Class</h2>
        <p className="text-xs text-gray-500">
          Browse learning paths published by other students and join to get your
          own copy.
        </p>
      </div>

      {/* Search & Filter Bar */}
      {!loading && !error && paths.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="relative">
            <MagnifyingGlass
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, tags, course titles, or professor..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Status pill toggles */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(
              [
                { value: 'all', label: 'All' },
                { value: 'mine', label: 'My Paths' },
                { value: 'joined', label: 'Joined' },
                { value: 'showing-name', label: 'Showing Name' },
              ] as const
            ).map((pill) => (
              <button
                key={pill.value}
                onClick={() => setStatusFilter(pill.value)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  statusFilter === pill.value
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Dropdowns row */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Subjects</option>
              {uniqueSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Levels</option>
              <option value="intro">Introductory (1)</option>
              <option value="intermediate">Intermediate (2-3)</option>
              <option value="advanced">Advanced (4-5)</option>
            </select>
            <select
              value={professionFilter}
              onChange={(e) => setProfessionFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Professions</option>
              {uniqueProfessions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {uniqueProfessors.length > 0 && (
              <select
                value={professorFilter}
                onChange={(e) => setProfessorFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Professors</option>
                {uniqueProfessors.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="newest">Newest</option>
              <option value="a-z">A–Z</option>
              <option value="most-courses">Most Courses</option>
              <option value="recommended">Recommended</option>
            </select>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : paths.length === 0 ? (
        <div className="text-center py-16">
          <MagnifyingGlass
            size={32}
            weight="duotone"
            className="text-gray-300 mx-auto mb-3"
          />
          <p className="text-sm text-gray-500">
            No published learning paths available yet.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Check back later or create your own!
          </p>
        </div>
      ) : filteredPaths.length === 0 ? (
        <div className="text-center py-12">
          <MagnifyingGlass
            size={28}
            weight="duotone"
            className="text-gray-300 mx-auto mb-3"
          />
          <p className="text-sm text-gray-500">No paths match your filters.</p>
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 mt-1 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPaths.map((path) => (
            <PublishedPathCard
              key={path.id}
              path={path}
              alreadyJoined={joinedSourceIds.has(path.id)}
              isJoining={joiningPathId === path.id}
              onJoin={() => onJoin(path.id)}
              onToggleAnonymous={
                path.isOwner && onToggleAnonymous
                  ? (val) => onToggleAnonymous(path.id, val)
                  : undefined
              }
              isTogglingAnonymous={isTogglingAnonymous}
            />
          ))}
        </div>
      )}
    </div>
  )
}
