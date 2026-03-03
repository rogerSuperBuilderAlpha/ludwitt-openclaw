'use client'

import { useState } from 'react'
import { CaretDown, CaretUp, Check, X, UserCircle, UsersThree, File, Trash, Plus, ArrowSquareOut } from '@phosphor-icons/react'
import type {
  ProfessorPathSummary,
  ProfessorStudentRow,
  ProfessorPathCourse,
  ProfessorAssignment,
  ProfessorDocument,
  AssignmentScope,
} from '@/lib/types/university'

function StudentRow({ student, label }: { student: ProfessorStudentRow; label?: string }) {
  return (
    <div className="flex items-center gap-4 py-2.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900 truncate">
            {student.displayName}
          </span>
          {label && (
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide bg-gray-100 px-1.5 py-0.5 rounded">
              {label}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{student.email}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-600">
          {student.completedCourses}/{student.totalCourses} courses
        </p>
        <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
          <div
            className="h-full bg-gray-900 rounded-full transition-all"
            style={{ width: `${student.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

interface AssignPanelProps {
  students: ProfessorStudentRow[]
  creator: ProfessorStudentRow
  onConfirm: (scope: AssignmentScope, studentIds?: string[]) => void
  onCancel: () => void
  loading: boolean
}

function AssignPanel({ students, creator, onConfirm, onCancel, loading }: AssignPanelProps) {
  const [scope, setScope] = useState<AssignmentScope>('global')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const allStudents = [creator, ...students]

  function toggleStudent(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="scope"
            checked={scope === 'global'}
            onChange={() => setScope('global')}
            className="text-gray-900"
          />
          <span className="text-xs text-gray-700">All Students</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="scope"
            checked={scope === 'specific'}
            onChange={() => setScope('specific')}
            className="text-gray-900"
          />
          <span className="text-xs text-gray-700">Specific Students</span>
        </label>
      </div>

      {scope === 'specific' && (
        <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto">
          {allStudents.map(s => (
            <label key={s.userId} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input
                type="checkbox"
                checked={selectedIds.has(s.userId)}
                onChange={() => toggleStudent(s.userId)}
                className="rounded text-gray-900"
              />
              <span className="text-xs text-gray-700 truncate">{s.displayName}</span>
              <span className="text-[10px] text-gray-400 truncate">{s.email}</span>
            </label>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (scope === 'specific' && selectedIds.size === 0) return
            onConfirm(scope, scope === 'specific' ? Array.from(selectedIds) : undefined)
          }}
          disabled={loading || (scope === 'specific' && selectedIds.size === 0)}
          className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? 'Assigning...' : 'Confirm'}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

interface CourseRowProps {
  course: ProfessorPathCourse
  assignment?: ProfessorAssignment
  students: ProfessorStudentRow[]
  creator: ProfessorStudentRow
  onAssign: (courseOrder: number, scope: AssignmentScope, studentIds?: string[]) => void
  onUnassign: (assignmentId: string) => void
  assignLoading: boolean
}

function CourseRow({ course, assignment, students, creator, onAssign, onUnassign, assignLoading }: CourseRowProps) {
  const [showPanel, setShowPanel] = useState(false)

  return (
    <div className="py-2 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-mono w-5 shrink-0 text-right">
          {course.order + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 truncate">{course.title}</p>
          <p className="text-[11px] text-gray-400">
            {course.subject} &middot; Level {course.level}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {assignment ? (
            <>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full">
                {assignment.scope === 'global' ? (
                  <><UsersThree size={10} weight="bold" /> Global</>
                ) : (
                  <><UserCircle size={10} weight="bold" /> {assignment.studentIds.length} student{assignment.studentIds.length !== 1 ? 's' : ''}</>
                )}
              </span>
              <button
                onClick={() => onUnassign(assignment.id)}
                disabled={assignLoading}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
              >
                Remove
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowPanel(!showPanel)}
              className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              {showPanel ? 'Cancel' : 'Assign Me'}
            </button>
          )}
        </div>
      </div>
      {showPanel && !assignment && (
        <AssignPanel
          students={students}
          creator={creator}
          loading={assignLoading}
          onConfirm={(scope, studentIds) => {
            onAssign(course.order, scope, studentIds)
            setShowPanel(false)
          }}
          onCancel={() => setShowPanel(false)}
        />
      )}
    </div>
  )
}

function DocumentRow({
  doc,
  onDelete,
  loading,
}: {
  doc: ProfessorDocument
  onDelete: (documentId: string) => void
  loading: boolean
}) {
  const date = new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return (
    <div className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
      <div className="flex-1 min-w-0">
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          {doc.title} <ArrowSquareOut size={10} />
        </a>
        {doc.description && (
          <p className="text-[11px] text-gray-400 mt-0.5">{doc.description}</p>
        )}
        <p className="text-[10px] text-gray-300 mt-0.5">
          {doc.scope === 'global' ? 'All students' : `${doc.studentIds.length} student${doc.studentIds.length !== 1 ? 's' : ''}`}
          {' · '}{date}
        </p>
      </div>
      <button
        onClick={() => onDelete(doc.id)}
        disabled={loading}
        className="shrink-0 p-1 text-gray-400 hover:text-red-500 disabled:opacity-50 transition-colors"
        title="Delete document"
      >
        <Trash size={12} />
      </button>
    </div>
  )
}

interface DocumentUploadFormProps {
  students: ProfessorStudentRow[]
  creator: ProfessorStudentRow
  onSubmit: (data: { title: string; url: string; description?: string; scope: AssignmentScope; studentIds?: string[] }) => void
  onCancel: () => void
  loading: boolean
}

function DocumentUploadForm({ students, creator, onSubmit, onCancel, loading }: DocumentUploadFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [scope, setScope] = useState<AssignmentScope>('global')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const allStudents = [creator, ...students]

  function toggleStudent(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleSubmit() {
    if (!title.trim() || !url.trim()) return
    if (scope === 'specific' && selectedIds.size === 0) return
    onSubmit({
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || undefined,
      scope,
      studentIds: scope === 'specific' ? Array.from(selectedIds) : undefined,
    })
  }

  return (
    <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-2.5">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Document title"
        className="w-full text-xs border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:border-gray-400 transition-colors"
      />
      <input
        type="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://..."
        className="w-full text-xs border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:border-gray-400 transition-colors"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full text-xs border border-gray-200 rounded-md px-3 py-1.5 outline-none focus:border-gray-400 transition-colors"
      />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="doc-scope" checked={scope === 'global'} onChange={() => setScope('global')} className="text-gray-900" />
          <span className="text-xs text-gray-700">All Students</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="radio" name="doc-scope" checked={scope === 'specific'} onChange={() => setScope('specific')} className="text-gray-900" />
          <span className="text-xs text-gray-700">Specific Students</span>
        </label>
      </div>

      {scope === 'specific' && (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {allStudents.map(s => (
            <label key={s.userId} className="flex items-center gap-2 cursor-pointer py-0.5">
              <input type="checkbox" checked={selectedIds.has(s.userId)} onChange={() => toggleStudent(s.userId)} className="rounded text-gray-900" />
              <span className="text-xs text-gray-700 truncate">{s.displayName}</span>
            </label>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !url.trim() || (scope === 'specific' && selectedIds.size === 0)}
          className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? 'Uploading...' : 'Add Document'}
        </button>
        <button onClick={onCancel} disabled={loading} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

interface PathCardProps {
  path: ProfessorPathSummary
  myAssignments: ProfessorAssignment[]
  documents: ProfessorDocument[]
  onAssign: (sourcePathId: string, courseOrder: number, scope: AssignmentScope, studentIds?: string[]) => void
  onUnassign: (assignmentId: string) => void
  assignLoading: boolean
  onUploadDocument: (sourcePathId: string, data: { title: string; url: string; description?: string; scope: AssignmentScope; studentIds?: string[] }) => void
  onDeleteDocument: (documentId: string) => void
  documentLoading: boolean
}

export function PathCard({ path, myAssignments, documents, onAssign, onUnassign, assignLoading, onUploadDocument, onDeleteDocument, documentLoading }: PathCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showDocForm, setShowDocForm] = useState(false)

  const createdDate = new Date(path.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Filter assignments relevant to this path
  const pathAssignments = myAssignments.filter(a => a.sourcePathId === path.id)

  // Filter documents relevant to this path
  const pathDocuments = documents.filter(d => d.sourcePathId === path.id)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {path.targetTopic}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {createdDate} &middot; {path.totalCourses} courses
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {pathAssignments.length > 0 && (
            <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {pathAssignments.length} assigned
            </span>
          )}
          <span
            className={`text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full ${
              path.isPublished
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {path.isPublished ? 'Published' : 'Active'}
          </span>
          <span className="text-xs text-gray-500">
            {path.totalEnrolled} enrolled
          </span>
          {expanded ? (
            <CaretUp size={14} className="text-gray-400" />
          ) : (
            <CaretDown size={14} className="text-gray-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-3">
          {/* Courses section */}
          {path.courses.length > 0 && (
            <div className="pt-3 pb-2">
              <h4 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                Courses
              </h4>
              {path.courses.map(course => (
                <CourseRow
                  key={course.order}
                  course={course}
                  assignment={pathAssignments.find(a => a.courseOrder === course.order)}
                  students={path.students}
                  creator={path.creator}
                  onAssign={(courseOrder, scope, studentIds) => onAssign(path.id, courseOrder, scope, studentIds)}
                  onUnassign={onUnassign}
                  assignLoading={assignLoading}
                />
              ))}
            </div>
          )}

          {/* Documents section */}
          <div className="pt-3 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <File size={12} className="text-gray-400" />
                <h4 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Documents {pathDocuments.length > 0 && `(${pathDocuments.length})`}
                </h4>
              </div>
              {!showDocForm && (
                <button
                  onClick={() => setShowDocForm(true)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors"
                >
                  <Plus size={12} weight="bold" /> Add
                </button>
              )}
            </div>
            {pathDocuments.map(doc => (
              <DocumentRow key={doc.id} doc={doc} onDelete={onDeleteDocument} loading={documentLoading} />
            ))}
            {pathDocuments.length === 0 && !showDocForm && (
              <p className="text-xs text-gray-400">No documents uploaded yet.</p>
            )}
            {showDocForm && (
              <DocumentUploadForm
                students={path.students}
                creator={path.creator}
                loading={documentLoading}
                onSubmit={(data) => {
                  onUploadDocument(path.id, data)
                  setShowDocForm(false)
                }}
                onCancel={() => setShowDocForm(false)}
              />
            )}
          </div>

          {/* Students section */}
          <div className="pt-2">
            <h4 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
              Students
            </h4>
            <StudentRow student={path.creator} label="Creator" />
            {path.students.map(student => (
              <StudentRow key={student.userId} student={student} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
