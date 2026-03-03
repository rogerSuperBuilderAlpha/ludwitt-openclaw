'use client'

/**
 * ProjectTracker Component
 *
 * Tracks project milestones during the building phase.
 * Shows progress, allows URL entry, and milestone completion.
 */

import { useState } from 'react'
import {
  Code,
  CheckCircle,
  Circle,
  Link,
  GithubLogo,
  Globe,
  Rocket,
  PencilSimple,
  X,
  CaretDown,
  CaretRight,
  Star,
  Trophy,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  ProjectDefinition,
  IndependentStudyDisplay,
  CoursePrompt,
} from '@/lib/types/independent-study'
import { logger } from '@/lib/logger'

interface ProjectTrackerProps {
  study: IndependentStudyDisplay
  project: ProjectDefinition
  onUpdate: (project: ProjectDefinition) => void
  onSubmitForReview: () => void
  isSubmitting?: boolean
}

export function ProjectTracker({
  study,
  project,
  onUpdate,
  onSubmitForReview,
  isSubmitting = false,
}: ProjectTrackerProps) {
  const { user } = useAuth()
  const [editingUrl, setEditingUrl] = useState<'repo' | 'live' | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const [showMilestones, setShowMilestones] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  const coursePrompt = study.coursePrompt as CoursePrompt | undefined
  const projectReq = coursePrompt?.curriculum?.projectRequirement

  const completedCount = project.milestones.filter((m) => m.completedAt).length
  const totalCount = project.milestones.length
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const requiredComplete = project.milestones
    .filter((m) => m.isRequired)
    .every((m) => m.completedAt)
  const canSubmit = requiredComplete && !!project.liveUrl

  const handleToggleMilestone = async (
    milestoneId: string,
    complete: boolean
  ) => {
    if (!user) return
    setIsUpdating(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/basics/independent-study/project', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyId: study.id,
          updates: complete
            ? { completeMilestone: milestoneId }
            : { uncompleteMilestone: milestoneId },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        onUpdate(data.project)
      }
    } catch (err) {
      logger.error('ProjectTracker', 'Failed to update milestone', {
        error: err,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSaveUrl = async (type: 'repo' | 'live') => {
    if (!user || !urlInput.trim()) return
    setIsUpdating(true)

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/basics/independent-study/project', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyId: study.id,
          updates:
            type === 'repo'
              ? { repositoryUrl: urlInput.trim() }
              : { liveUrl: urlInput.trim() },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        onUpdate(data.project)
        setEditingUrl(null)
        setUrlInput('')
      }
    } catch (err) {
      logger.error('ProjectTracker', 'Failed to save URL', { error: err })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Code size={24} className="text-violet-600" weight="bold" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{project.title}</h2>
              <p className="text-sm text-gray-500">Build your project</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-violet-600">
                {progress}%
              </div>
              <div className="text-xs text-gray-500">
                {completedCount}/{totalCount} milestones
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Project Description */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-600">{project.description}</p>
      </div>

      {/* URLs Section */}
      <div className="px-6 py-4 border-b border-gray-200 space-y-3">
        {/* Repository URL */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GithubLogo size={20} className="text-gray-500" weight="fill" />
            <span className="text-sm font-medium text-gray-700">
              Repository
            </span>
          </div>
          {editingUrl === 'repo' ? (
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://github.com/..."
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 w-64"
              />
              <button
                onClick={() => handleSaveUrl('repo')}
                disabled={isUpdating}
                className="p-1.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 cursor-pointer"
                aria-label="Save repository URL"
              >
                <CheckCircle size={16} weight="bold" />
              </button>
              <button
                onClick={() => {
                  setEditingUrl(null)
                  setUrlInput('')
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Cancel editing repository URL"
              >
                <X size={16} />
              </button>
            </div>
          ) : project.repositoryUrl ? (
            <div className="flex items-center gap-2">
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-violet-600 hover:underline flex items-center gap-1"
              >
                <Link size={14} />
                {project.repositoryUrl.replace(/^https?:\/\//, '').slice(0, 30)}
                ...
              </a>
              <button
                onClick={() => {
                  setEditingUrl('repo')
                  setUrlInput(project.repositoryUrl || '')
                }}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Edit repository URL"
              >
                <PencilSimple size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingUrl('repo')}
              className="text-sm text-violet-600 hover:underline cursor-pointer"
            >
              + Add repository
            </button>
          )}
        </div>

        {/* Live URL */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-gray-500" weight="fill" />
            <span className="text-sm font-medium text-gray-700">Live URL</span>
            <span className="text-xs text-red-500">*Required</span>
          </div>
          {editingUrl === 'live' ? (
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://your-project.com"
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 w-64"
              />
              <button
                onClick={() => handleSaveUrl('live')}
                disabled={isUpdating}
                className="p-1.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 cursor-pointer"
                aria-label="Save live URL"
              >
                <CheckCircle size={16} weight="bold" />
              </button>
              <button
                onClick={() => {
                  setEditingUrl(null)
                  setUrlInput('')
                }}
                className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Cancel editing live URL"
              >
                <X size={16} />
              </button>
            </div>
          ) : project.liveUrl ? (
            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-violet-600 hover:underline flex items-center gap-1"
              >
                <Link size={14} />
                {project.liveUrl.replace(/^https?:\/\//, '').slice(0, 30)}...
              </a>
              <button
                onClick={() => {
                  setEditingUrl('live')
                  setUrlInput(project.liveUrl || '')
                }}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Edit live URL"
              >
                <PencilSimple size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingUrl('live')}
              className="text-sm text-violet-600 hover:underline cursor-pointer"
            >
              + Add live URL
            </button>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="px-6 py-4">
        <button
          onClick={() => setShowMilestones(!showMilestones)}
          className="w-full flex items-center justify-between py-2 cursor-pointer"
        >
          <span className="font-medium text-gray-700">Milestones</span>
          {showMilestones ? (
            <CaretDown size={18} className="text-gray-400" />
          ) : (
            <CaretRight size={18} className="text-gray-400" />
          )}
        </button>

        {showMilestones && (
          <div className="mt-3 space-y-2">
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  milestone.completedAt ? 'bg-emerald-50' : 'bg-gray-50'
                }`}
              >
                <button
                  onClick={() =>
                    handleToggleMilestone(milestone.id, !milestone.completedAt)
                  }
                  disabled={isUpdating}
                  className="flex-shrink-0 mt-0.5 cursor-pointer"
                >
                  {milestone.completedAt ? (
                    <CheckCircle
                      size={22}
                      weight="fill"
                      className="text-emerald-500"
                    />
                  ) : (
                    <Circle
                      size={22}
                      className="text-gray-300 hover:text-violet-400"
                    />
                  )}
                </button>
                <div className="flex-1">
                  <div
                    className={`font-medium text-sm ${
                      milestone.completedAt
                        ? 'text-emerald-700 line-through'
                        : 'text-gray-700'
                    }`}
                  >
                    {milestone.title}
                    {milestone.isRequired && (
                      <span className="ml-2 text-xs text-red-500">*</span>
                    )}
                  </div>
                  {milestone.description && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {milestone.description}
                    </div>
                  )}
                  {milestone.completedAt && (
                    <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                      <Star size={12} weight="fill" />
                      +50 XP
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assessment Criteria */}
      {projectReq?.assessmentCriteria &&
        projectReq.assessmentCriteria.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Assessment Criteria
            </h4>
            <ul className="space-y-1">
              {projectReq.assessmentCriteria.map((criterion, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="text-violet-500 mt-1">•</span>
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Submit Button */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        {canSubmit ? (
          <button
            onClick={onSubmitForReview}
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-violet-700 hover:to-purple-700 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            style={{ boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)' }}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Rocket size={20} weight="fill" />
                Submit for AI Review
              </>
            )}
          </button>
        ) : (
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2">
              Complete all required milestones and add a live URL to submit
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Trophy size={14} />
              {completedCount}/
              {project.milestones.filter((m) => m.isRequired).length} required
              milestones
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
