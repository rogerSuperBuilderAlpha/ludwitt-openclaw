'use client'

import { useState } from 'react'
import { ArrowLeft, Compass, ChatCircle, Code } from '@phosphor-icons/react'
import { DeliverableCard } from './DeliverableCard'
import { ThreadList } from './discussions/ThreadList'
import { useStartDeliverable } from '@/lib/hooks/useStartDeliverable'
import { useSubmitDeliverable } from '@/lib/hooks/useSubmitDeliverable'
import { useSetDeadline } from '@/lib/hooks/useSetDeadline'
import type { UniversityCourseDisplay, CourseStats } from '@/lib/types/university'

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  'locked': { label: 'Locked', className: 'bg-gray-100 text-gray-500' },
  'available': { label: 'Available', className: 'bg-blue-50 text-blue-700' },
  'in-progress': { label: 'In Progress', className: 'bg-amber-50 text-amber-700' },
  'completed': { label: 'Completed', className: 'bg-green-50 text-green-700' },
}

interface CourseDetailViewProps {
  course: UniversityCourseDisplay
  stats?: CourseStats
  onBack: () => void
  resolvedProfessors?: { name: string; email: string }[]
  onExplore?: () => void
  onOpenSandbox?: (deliverableId: string) => void
}

export function CourseDetailView({ course, stats, onBack, resolvedProfessors, onExplore, onOpenSandbox }: CourseDetailViewProps) {
  const badge = STATUS_BADGE[course.status] || STATUS_BADGE['locked']
  const { startDeliverable, isStarting } = useStartDeliverable()
  const { submitDeliverable, isSubmitting } = useSubmitDeliverable()
  const { setDeadline, isSettingDeadline } = useSetDeadline()
  const [activeSection, setActiveSection] = useState<'deliverables' | 'discussions'>('deliverables')

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Learning Path
      </button>

      {/* Course header */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">
              {course.subject} &middot; Level {course.level}
            </p>
            <h2 className="text-lg font-bold text-gray-900">{course.title}</h2>
          </div>
          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${badge.className}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{course.description}</p>

        {/* Professor */}
        <p className="text-xs text-gray-500 mb-3">
          Professor:{' '}
          <span className="font-medium text-gray-700">
            {resolvedProfessors && resolvedProfessors.length > 0
              ? resolvedProfessors.map(p => p.name).join(', ')
              : course.professors && course.professors.length > 0
                ? course.professors.join(', ')
                : 'Unassigned'}
          </span>
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-900 rounded-full transition-all"
              style={{ width: `${course.progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium shrink-0">
            {course.approvedCount}/{course.totalDeliverables} approved
          </span>
        </div>

        {stats && (stats.activeCount > 0 || stats.completedCount > 0) && (
          <p className="text-xs text-gray-400 mt-2">
            {stats.activeCount} active &middot; {stats.completedCount} completed
          </p>
        )}

        {onExplore && (
          <button
            onClick={onExplore}
            className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Compass size={14} />
            Explore Topic
          </button>
        )}
      </div>

      {/* Section tabs: Deliverables | Discussions */}
      <div className="flex items-center gap-0 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveSection('deliverables')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
            activeSection === 'deliverables'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Code size={14} />
          Deliverables ({course.deliverables.length})
        </button>
        <button
          onClick={() => setActiveSection('discussions')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
            activeSection === 'discussions'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <ChatCircle size={14} />
          Discussions
        </button>
      </div>

      {/* Deliverables section */}
      {activeSection === 'deliverables' && (
        <div className="space-y-3">
          {course.deliverables
            .sort((a, b) => a.order - b.order)
            .map(deliverable => (
              <DeliverableCard
                key={deliverable.id}
                deliverable={deliverable}
                courseId={course.id}
                stats={stats?.deliverables.find(d => d.order === deliverable.order)}
                onStart={async () => {
                  await startDeliverable(course.id, deliverable.id)
                }}
                isStarting={isStarting}
                onSubmit={async (data) => {
                  await submitDeliverable({
                    courseId: course.id,
                    deliverableId: deliverable.id,
                    ...data,
                  })
                }}
                isSubmitting={isSubmitting}
                onSetDeadline={async ({ deliverableId, deadline }) => {
                  await setDeadline({ courseId: course.id, deliverableId, deadline })
                }}
                isSettingDeadline={isSettingDeadline}
              />
            ))}
        </div>
      )}

      {/* Discussions section */}
      {activeSection === 'discussions' && (
        <ThreadList courseId={course.id} learningPathId={course.learningPathId} />
      )}
    </div>
  )
}
