'use client'

import type { FirestoreTimestamp } from '@/lib/types/timestamp'

interface Requirement {
  id: string
  requirement: string
  status: string
  addedBy: string
  addedAt: FirestoreTimestamp
  notes?: string
}

interface RequirementsSectionProps {
  requirements: Requirement[]
  documentId: string
  assignedTo?: string
  userId?: string | null
  requirementText: string
  setRequirementText: (s: string) => void
  requirementNotes: string
  setRequirementNotes: (s: string) => void
  addingRequirementId: string | null
  onAddRequirement: () => void
  updatingRequirementId: string | null
  onUpdateRequirementStatus: (reqId: string, newStatus: string) => void
}

export function RequirementsSection({
  requirements,
  documentId,
  assignedTo,
  userId,
  requirementText,
  setRequirementText,
  requirementNotes,
  setRequirementNotes,
  addingRequirementId,
  onAddRequirement,
  updatingRequirementId,
  onUpdateRequirementStatus,
}: RequirementsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
      {assignedTo === userId && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <textarea
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            placeholder="Add a new requirement..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
          />
          <input
            value={requirementNotes}
            onChange={(e) => setRequirementNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mb-2"
          />
          <button
            onClick={onAddRequirement}
            disabled={
              !requirementText.trim() || addingRequirementId === documentId
            }
            className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {addingRequirementId === documentId
              ? 'Adding...'
              : 'Add Requirement'}
          </button>
        </div>
      )}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {requirements.map((req) => (
          <div
            key={req.id}
            className="p-3 bg-white rounded-lg border border-gray-200 text-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-gray-900 flex-1">{req.requirement}</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${req.status === 'completed' ? 'bg-green-100 text-green-800' : req.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {req.status === 'completed'
                  ? 'Done'
                  : req.status === 'in-progress'
                    ? 'In Progress'
                    : 'Pending'}
              </span>
            </div>
            {req.notes && (
              <p className="text-gray-600 text-xs mb-2">{req.notes}</p>
            )}
            {assignedTo === userId && (
              <select
                value={req.status}
                onChange={(e) =>
                  onUpdateRequirementStatus(req.id, e.target.value)
                }
                disabled={updatingRequirementId === req.id}
                className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Done</option>
              </select>
            )}
          </div>
        ))}
        {requirements.length === 0 && (
          <p className="text-sm text-gray-500 italic text-center py-4">
            No requirements yet
          </p>
        )}
      </div>
    </div>
  )
}
