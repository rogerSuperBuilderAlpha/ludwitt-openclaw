'use client'

import type { ProfessorSubjectGrade } from '@/lib/types/university'

interface TeachingInfoSectionProps {
  specialties: string[]
  subjectsWithGrades?: ProfessorSubjectGrade[]
  languages?: string[]
  officeHours?: string
  timezone?: string
  yearsTeaching?: number
}

export function TeachingInfoSection({
  specialties,
  subjectsWithGrades,
  languages,
  officeHours,
  timezone,
  yearsTeaching,
}: TeachingInfoSectionProps) {
  const hasSubjects = subjectsWithGrades && subjectsWithGrades.length > 0
  const hasLanguages = languages && languages.length > 0
  const hasSpecialties = specialties.length > 0

  if (!hasSpecialties && !hasSubjects && !hasLanguages && !officeHours && yearsTeaching == null) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Teaching</h3>

      {yearsTeaching != null && (
        <p className="text-sm text-gray-600">{yearsTeaching} years of teaching experience</p>
      )}

      {hasSpecialties && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Specialties</p>
          <div className="flex flex-wrap gap-1.5">
            {specialties.map(s => (
              <span key={s} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasSubjects && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Subjects</p>
          <div className="space-y-1">
            {subjectsWithGrades.map((sg, i) => (
              <p key={i} className="text-sm text-gray-600">
                {sg.subject} — {sg.gradeLevels.join(', ')}
              </p>
            ))}
          </div>
        </div>
      )}

      {hasLanguages && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Languages</p>
          <p className="text-sm text-gray-600">{languages.join(', ')}</p>
        </div>
      )}

      {officeHours && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Office Hours</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{officeHours}</p>
          {timezone && <p className="text-xs text-gray-400 mt-0.5">{timezone}</p>}
        </div>
      )}
    </div>
  )
}
