'use client'

import { CheckCircle2, Clock, DollarSign, Mail, Users } from 'lucide-react'
import { Project } from '@/lib/types/project'
import { toDate } from '@/lib/utils/timestamp'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="button"
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClose()
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customer Contact
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {project.customerName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <a
                  href={`mailto:${project.customerEmail}`}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {project.customerEmail}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Budget</h3>
              <div className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-gray-900">
                  ${project.totalCost.toLocaleString()}{' '}
                  {project.currency || 'USD'}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Status
              </h3>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded ${project.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : project.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {project.paymentStatus
                  ? project.paymentStatus.charAt(0).toUpperCase() +
                    project.paymentStatus.slice(1)
                  : 'Pending'}
                {project.paidAmount > 0 &&
                  ` ($${project.paidAmount.toLocaleString()})`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Created</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {toDate(project.createdAt).toLocaleDateString()}
              </div>
            </div>
            {project.estimatedCompletionDate && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Estimated Completion
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {toDate(project.estimatedCompletionDate).toLocaleDateString()}
                </div>
              </div>
            )}
            {project.actualCompletionDate && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Completed</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  {toDate(project.actualCompletionDate).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>

          {project.assignedDeveloperName && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Assigned Developer
              </h3>
              <p className="text-gray-700">{project.assignedDeveloperName}</p>
            </div>
          )}

          {project.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {project.notes}
              </p>
            </div>
          )}

          {project.milestones && project.milestones.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Milestones</h3>
              <div className="space-y-2">
                {project.milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{m.title}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded ${m.status === 'completed' ? 'bg-green-100 text-green-800' : m.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {m.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {m.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      Due: {new Date(m.dueDate).toLocaleDateString()}
                      {m.completedAt &&
                        ` • Completed: ${new Date(m.completedAt).toLocaleDateString()}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <a
              href={`mailto:${project.customerEmail}?subject=Regarding your project: ${encodeURIComponent(project.title)}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              Contact Customer
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
