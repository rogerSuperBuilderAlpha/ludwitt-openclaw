'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { logout } from '@/lib/firebase/auth'
import { logger } from '@/lib/logger'
import { SignOut, CircleNotch } from '@phosphor-icons/react'
import { useProfessorPaths } from '@/lib/hooks/useProfessorPaths'
import { useProfessorAssign } from '@/lib/hooks/useProfessorAssign'
import { useProfessorDocuments } from '@/lib/hooks/useProfessorDocuments'
import { PathCard } from '@/components/professors/PathCard'
import { MyStudentsList } from '@/components/professors/MyStudentsList'
import { SubmissionsList } from '@/components/professors/SubmissionsList'
import { ProfessorIdeasList } from '@/components/professors/ProfessorIdeasList'
import { ProfessorProfileEditor } from '@/components/professors/ProfessorProfileEditor'
import { ProfessorScheduleTab } from '@/components/university/schedule/ProfessorScheduleTab'
import type { AssignmentScope } from '@/lib/types/university'

type Tab = 'paths' | 'students' | 'submissions' | 'bookings' | 'business' | 'theses' | 'profile'

const TABS: { key: Tab; label: string }[] = [
  { key: 'paths', label: 'Paths' },
  { key: 'students', label: 'My Students' },
  { key: 'submissions', label: 'Submissions' },
  { key: 'bookings', label: 'Schedule' },
  { key: 'business', label: 'Business Plans' },
  { key: 'theses', label: 'Theses' },
  { key: 'profile', label: 'My Profile' },
]

export function ProfessorWelcome() {
  const { user } = useAuth()
  const { paths, myAssignments, loading, error, refetch } = useProfessorPaths()
  const { assign, unassign, loading: assignLoading } = useProfessorAssign()
  const { documents, actionLoading: documentLoading, uploadDocument, deleteDocument } = useProfessorDocuments()
  const [activeTab, setActiveTab] = useState<Tab>('paths')

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Professor'

  async function handleAssign(sourcePathId: string, courseOrder: number, scope: AssignmentScope, studentIds?: string[]) {
    const result = await assign({ sourcePathId, courseOrder, scope, studentIds })
    if (!result.error) {
      refetch()
    }
  }

  async function handleUnassign(assignmentId: string) {
    const result = await unassign(assignmentId)
    if (!result.error) {
      refetch()
    }
  }

  async function handleUploadDocument(sourcePathId: string, data: { title: string; url: string; description?: string; scope: AssignmentScope; studentIds?: string[] }) {
    await uploadDocument({ sourcePathId, ...data })
  }

  async function handleDeleteDocument(documentId: string) {
    await deleteDocument(documentId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, Professor {displayName}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('professorAuthenticated')
              logout().then(() => { window.location.href = '/' }).catch((err) => logger.error('ProfessorWelcome', 'Logout failed', { error: err }))
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SignOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tab toggle */}
        <div className="flex items-center gap-1 mb-6 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab.key
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.key === 'paths' && !loading && ` (${paths.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'paths' && (
          <>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <CircleNotch size={24} className="text-gray-400 animate-spin" />
              </div>
            )}

            {error && (
              <div className="bg-white border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {!loading && !error && paths.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-sm text-gray-500">No learning paths yet.</p>
              </div>
            )}

            {!loading && !error && paths.length > 0 && (
              <div className="space-y-3">
                {paths.map(path => (
                  <PathCard
                    key={path.id}
                    path={path}
                    myAssignments={myAssignments}
                    documents={documents}
                    onAssign={handleAssign}
                    onUnassign={handleUnassign}
                    assignLoading={assignLoading}
                    onUploadDocument={handleUploadDocument}
                    onDeleteDocument={handleDeleteDocument}
                    documentLoading={documentLoading}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'students' && <MyStudentsList />}

        {activeTab === 'bookings' && <ProfessorScheduleTab />}

        {activeTab === 'submissions' && <SubmissionsList />}

        {activeTab === 'business' && <ProfessorIdeasList type="business" />}

        {activeTab === 'theses' && <ProfessorIdeasList type="thesis" />}

        {activeTab === 'profile' && <ProfessorProfileEditor />}
      </div>
    </div>
  )
}
