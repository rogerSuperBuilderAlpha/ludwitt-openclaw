'use client'

import { CircleNotch } from '@phosphor-icons/react'
import { useProfessorMyStudents, type MyStudentRow } from '@/lib/hooks/useProfessorMyStudents'

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  'locked': { label: 'Locked', className: 'bg-gray-100 text-gray-500' },
  'available': { label: 'Available', className: 'bg-blue-50 text-blue-700' },
  'in-progress': { label: 'In Progress', className: 'bg-amber-50 text-amber-700' },
  'completed': { label: 'Completed', className: 'bg-green-50 text-green-700' },
}

function StudentRow({ student }: { student: MyStudentRow }) {
  const badge = STATUS_BADGE[student.courseStatus] || STATUS_BADGE['locked']
  const progressPercent = student.totalDeliverables > 0
    ? Math.round((student.completedDeliverables / student.totalDeliverables) * 100)
    : 0

  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            {student.displayName}
          </span>
          <span className={`text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 truncate">{student.email}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {student.courseTitle}
          {student.scope === 'specific' && (
            <span className="ml-1.5 text-gray-300">&middot; specific</span>
          )}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-600">
          {student.completedDeliverables}/{student.totalDeliverables} deliverables
        </p>
        <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
          <div
            className="h-full bg-gray-900 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function MyStudentsList() {
  const { students, loading, error } = useProfessorMyStudents()

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

  if (students.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">
          No students yet. Assign yourself to courses in the Paths tab to see students here.
        </p>
      </div>
    )
  }

  // Group students by path topic
  const grouped = new Map<string, MyStudentRow[]>()
  for (const s of students) {
    const list = grouped.get(s.pathTopic) || []
    list.push(s)
    grouped.set(s.pathTopic, list)
  }

  return (
    <div className="space-y-4">
      {Array.from(grouped.entries()).map(([topic, rows]) => (
        <div key={topic} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">{topic}</h3>
            <p className="text-xs text-gray-400">{rows.length} student-course{rows.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="px-4">
            {rows.map((student, i) => (
              <StudentRow key={`${student.userId}-${student.courseOrder}-${i}`} student={student} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
