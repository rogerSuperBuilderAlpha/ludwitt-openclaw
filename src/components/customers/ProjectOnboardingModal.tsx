'use client'

import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

interface Milestone {
  title: string
  description: string
  dueDate: string
}

interface ProjectOnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (projectData: {
    title: string
    description: string
    type: 'website' | 'app' | 'design' | 'consulting' | 'custom'
    totalCost: number
    estimatedCompletionDate?: string
    milestones?: Milestone[]
  }) => Promise<void>
}

export function ProjectOnboardingModal({
  isOpen,
  onClose,
  onSubmit,
}: ProjectOnboardingModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<
    'website' | 'app' | 'design' | 'consulting' | 'custom'
  >('website')
  const [totalCost, setTotalCost] = useState('')
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('')
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', dueDate: '' }])
  }

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const handleMilestoneChange = (
    index: number,
    field: keyof Milestone,
    value: string
  ) => {
    const updated = [...milestones]
    updated[index][field] = value
    setMilestones(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !description || !totalCost) {
      setError('Please fill in all required fields')
      return
    }

    const cost = parseFloat(totalCost)
    if (isNaN(cost) || cost <= 0) {
      setError('Please enter a valid cost')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        title,
        description,
        type,
        totalCost: cost,
        estimatedCompletionDate: estimatedCompletionDate || undefined,
        milestones: milestones.length > 0 ? milestones : undefined,
      })

      // Reset form
      setTitle('')
      setDescription('')
      setType('website')
      setTotalCost('')
      setEstimatedCompletionDate('')
      setMilestones([])
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Project onboarding"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Start a New Project
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-900 p-4">
              {error}
            </div>
          )}

          {/* Project Title */}
          <div>
            <label
              htmlFor="project-title"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Project Title *
            </label>
            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              placeholder="e.g., Company Website Redesign"
              required
            />
          </div>

          {/* Project Type */}
          <div>
            <label
              htmlFor="project-type"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Project Type *
            </label>
            <select
              id="project-type"
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as
                    | 'website'
                    | 'app'
                    | 'design'
                    | 'consulting'
                    | 'custom'
                )
              }
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="website">Website Development</option>
              <option value="app">Application Development</option>
              <option value="design">Design Work</option>
              <option value="consulting">Technical Consulting</option>
              <option value="custom">Custom Project</option>
            </select>
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Project Description *
            </label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 min-h-32"
              placeholder="Describe your project goals, requirements, and any specific features you need..."
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="project-budget"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Budget (USD) *
            </label>
            <input
              id="project-budget"
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              placeholder="10000"
              min="0"
              step="100"
              required
            />
          </div>

          {/* Estimated Completion Date */}
          <div>
            <label
              htmlFor="project-completion-date"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Estimated Completion Date (Optional)
            </label>
            <input
              id="project-completion-date"
              type="date"
              value={estimatedCompletionDate}
              onChange={(e) => setEstimatedCompletionDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          {/* Milestones */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Milestones (Optional)
              </span>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <Plus className="w-4 h-4" />
                Add Milestone
              </button>
            </div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 mb-3 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(e) =>
                      handleMilestoneChange(index, 'title', e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 text-sm"
                    placeholder="Milestone title"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  value={milestone.description}
                  onChange={(e) =>
                    handleMilestoneChange(index, 'description', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm"
                  placeholder="Milestone description"
                  rows={2}
                />
                <input
                  type="date"
                  value={milestone.dueDate}
                  onChange={(e) =>
                    handleMilestoneChange(index, 'dueDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:text-gray-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
