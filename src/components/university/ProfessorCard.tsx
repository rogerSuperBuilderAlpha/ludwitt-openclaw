'use client'

import Image from 'next/image'
import {
  ChalkboardTeacher,
  BookOpen,
  ArrowRight,
  User,
} from '@phosphor-icons/react'
import type {
  ProfessorListItem,
  ProfessorAvailability,
} from '@/lib/types/university'

interface ProfessorCardProps {
  professor: ProfessorListItem
  onViewPaths: (professorId: string) => void
  onViewProfile?: (professorId: string) => void
}

const AVAILABILITY_DOT: Record<ProfessorAvailability, string> = {
  accepting: 'bg-green-500',
  limited: 'bg-yellow-500',
  unavailable: 'bg-gray-400',
}

const AVAILABILITY_TEXT: Record<ProfessorAvailability, string> = {
  accepting: 'Accepting',
  limited: 'Limited',
  unavailable: 'Unavailable',
}

export function ProfessorCard({
  professor,
  onViewPaths,
  onViewProfile,
}: ProfessorCardProps) {
  const fullName = [professor.title, professor.displayName]
    .filter(Boolean)
    .join(' ')
  const initials = (professor.displayName || '')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const affiliation = [professor.position, professor.institution]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <button
          onClick={() => onViewProfile?.(professor.professorId)}
          className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0 hover:border-gray-400 transition-colors"
        >
          {professor.photoURL ? (
            <Image
              src={professor.photoURL}
              alt={professor.displayName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : initials ? (
            <span className="flex items-center justify-center w-full h-full text-xs font-semibold text-gray-500">
              {initials}
            </span>
          ) : (
            <User size={16} className="text-gray-400 mx-auto mt-2.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <ChalkboardTeacher
              size={14}
              weight="bold"
              className="text-gray-500 shrink-0"
            />
            <button
              onClick={() => onViewProfile?.(professor.professorId)}
              className="text-sm font-semibold text-gray-900 truncate hover:underline"
            >
              {fullName}
            </button>
            {professor.availability && (
              <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${AVAILABILITY_DOT[professor.availability]}`}
                />
                {AVAILABILITY_TEXT[professor.availability]}
              </span>
            )}
          </div>

          {professor.headline && (
            <p className="text-xs text-gray-500 mb-1 truncate">
              {professor.headline}
            </p>
          )}

          {affiliation && (
            <p className="text-[11px] text-gray-400 mb-1.5">{affiliation}</p>
          )}

          {!professor.headline && professor.bio && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {professor.bio}
            </p>
          )}

          {professor.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {professor.specialties.map((s) => (
                <span
                  key={s}
                  className="text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {professor.pathTopics.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <BookOpen size={12} weight="bold" />
              <span className="truncate">
                {professor.pathTopics.join(', ')}
              </span>
            </div>
          )}
        </div>

        {professor.pathTopics.length > 0 && (
          <button
            onClick={() => onViewPaths(professor.professorId)}
            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Paths
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  )
}
