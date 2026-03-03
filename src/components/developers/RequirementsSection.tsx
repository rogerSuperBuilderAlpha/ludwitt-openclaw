'use client'

import { Plus, AlertCircle } from 'lucide-react'
import { Markdown } from '@/components/ui/Markdown'
import type { DateFormatter } from '@/lib/types/common'

interface Requirement {
  id: string
  requirement: string
  status: string
  addedBy: string
  addedAt: any
  notes?: string
}

interface RequirementsSectionProps {
  requirements: Requirement[]
  submissionId: string
  activeSubmission: string | null
  showRequirementForm: boolean
  requirementText: string
  requirementNotes: string
  addingRequirement: boolean
  setActiveSubmission: (id: string) => void
  setShowRequirementForm: (show: boolean) => void
  setShowSessionForm: (show: boolean) => void
  setRequirementText: (text: string) => void
  setRequirementNotes: (notes: string) => void
  handleAddRequirement: () => void
  handleOpenModal: (type: 'requirements') => void
  formatDate: DateFormatter
}

export function RequirementsSection({
  requirements,
  submissionId,
  activeSubmission,
  showRequirementForm,
  requirementText,
  requirementNotes,
  addingRequirement,
  setActiveSubmission,
  setShowRequirementForm,
  setShowSessionForm,
  setRequirementText,
  setRequirementNotes,
  handleAddRequirement,
  handleOpenModal,
  formatDate,
}: RequirementsSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          Client Requirements
        </h4>
        {activeSubmission !== submissionId || !showRequirementForm ? (
          <button
            onClick={() => {
              // Clear form state if switching to a different submission
              if (activeSubmission !== submissionId) {
                setRequirementText('')
                setRequirementNotes('')
              }
              setActiveSubmission(submissionId)
              setShowRequirementForm(true)
              setShowSessionForm(false)
            }}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        ) : null}
      </div>

      {/* Add Requirement Form */}
      {activeSubmission === submissionId && showRequirementForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={requirementText}
            onChange={(e) => setRequirementText(e.target.value)}
            placeholder="What does the client need to do?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <input
            type="text"
            value={requirementNotes}
            onChange={(e) => setRequirementNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddRequirement}
              disabled={addingRequirement || !requirementText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {addingRequirement ? 'Adding...' : 'Add Requirement'}
            </button>
            <button
              onClick={() => {
                setShowRequirementForm(false)
                setRequirementText('')
                setRequirementNotes('')
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Requirements List */}
      <div className="space-y-3">
        {requirements.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No requirements yet</p>
        ) : (
          <>
            {requirements.slice(0, 4).map((req) => (
              <button
                key={req.id}
                onClick={() => handleOpenModal('requirements')}
                className="w-full text-left p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 transition-colors cursor-pointer"
              >
                <div className="mb-1">
                  <Markdown
                    content={req.requirement}
                    className="text-sm line-clamp-2"
                  />
                </div>
                {req.notes && (
                  <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                    Note: {req.notes}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span
                    className={
                      req.status === 'completed'
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }
                  >
                    {req.status === 'completed' ? '✓ Completed' : '⋯ Pending'}
                  </span>
                  <span>•</span>
                  <span>{formatDate(req.addedAt)}</span>
                </div>
              </button>
            ))}
            {requirements.length > 4 && (
              <button
                onClick={() => handleOpenModal('requirements')}
                className="w-full px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
              >
                View All {requirements.length} Requirements →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
