'use client'

import { useState } from 'react'
import { Lock, CheckCircle, Circle, Clock, ArrowClockwise, XCircle, GlobeSimple, GithubLogo, VideoCamera, ClockCountdown, Robot, CaretDown, CaretUp } from '@phosphor-icons/react'
import type { CourseDeliverable, DeliverableStats } from '@/lib/types/university'
import { DeliverableSubmissionForm } from './DeliverableSubmissionForm'
import { PeerReviewsForDeliverable } from './peer-reviews/PeerReviewsForDeliverable'
import { SubmissionHistoryTimeline } from './SubmissionHistoryTimeline'

const TYPE_LABELS: Record<string, string> = {
  'application': 'App',
  'simulation': 'Simulation',
  'data-visualization': 'Data Viz',
  'research-tool': 'Research Tool',
  'interactive-content': 'Interactive',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Circle }> = {
  'locked': { label: 'Locked', color: 'text-gray-400', icon: Lock },
  'available': { label: 'Available', color: 'text-gray-600', icon: Circle },
  'in-progress': { label: 'In Progress', color: 'text-blue-600', icon: Clock },
  'submitted': { label: 'Submitted', color: 'text-amber-600', icon: Clock },
  'in-review': { label: 'In Review', color: 'text-amber-600', icon: Clock },
  'revision-needed': { label: 'Revision Needed', color: 'text-orange-600', icon: ArrowClockwise },
  'approved': { label: 'Approved', color: 'text-green-600', icon: CheckCircle },
  'failed': { label: 'Failed', color: 'text-red-600', icon: XCircle },
}

const SUBMITTED_STATUSES = new Set(['submitted', 'in-review', 'revision-needed', 'approved', 'failed'])

interface DeliverableCardProps {
  deliverable: CourseDeliverable
  courseId: string
  stats?: DeliverableStats
  onStart?: () => Promise<void>
  isStarting?: boolean
  onSubmit?: (data: {
    deployedUrl: string
    githubUrl: string
    loomUrl: string
    submissionNotes?: string
  }) => Promise<void>
  isSubmitting?: boolean
  onSetDeadline?: (data: { deliverableId: string; deadline: string }) => Promise<void>
  isSettingDeadline?: boolean
}

const DEADLINE_ELIGIBLE = new Set(['available', 'in-progress', 'revision-needed'])
const HISTORY_VISIBLE = new Set(['in-progress', 'submitted', 'in-review', 'revision-needed', 'approved', 'failed'])

export function DeliverableCard({ deliverable, courseId, stats, onStart, isStarting, onSubmit, isSubmitting, onSetDeadline, isSettingDeadline }: DeliverableCardProps) {
  const [showForm, setShowForm] = useState(false)
  const [showDeadlineInput, setShowDeadlineInput] = useState(false)
  const [deadlineValue, setDeadlineValue] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [showAIReview, setShowAIReview] = useState(false)
  const status = STATUS_CONFIG[deliverable.status] || STATUS_CONFIG['locked']
  const StatusIcon = status.icon
  const isLocked = deliverable.status === 'locked'
  const hasSubmission = SUBMITTED_STATUSES.has(deliverable.status)
  const hasReview = deliverable.status === 'revision-needed' || deliverable.status === 'approved' || deliverable.status === 'failed'
  const canResubmit = deliverable.status === 'revision-needed'

  const isOverdue = !!(
    deliverable.selfDeadline &&
    new Date(deliverable.selfDeadline) < new Date() &&
    !SUBMITTED_STATUSES.has(deliverable.status) &&
    deliverable.status !== 'locked'
  )

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${isLocked ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">#{deliverable.order}</span>
          <h4 className={`text-sm font-semibold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
            {deliverable.title}
          </h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {TYPE_LABELS[deliverable.type] || deliverable.type}
          </span>
          {stats && (stats.activeCount > 0 || stats.completedCount > 0) && (
            <span className="text-[10px] text-gray-400">
              {stats.activeCount} working &middot; {stats.completedCount} done
            </span>
          )}
          <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
            <StatusIcon size={14} weight="bold" />
            {status.label}
          </span>
          {isOverdue && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-red-500 px-2 py-0.5 rounded-full">
              Overdue
            </span>
          )}
        </div>
      </div>

      <p className={`text-xs leading-relaxed mb-3 ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
        {deliverable.description}
      </p>

      {deliverable.requirements.length > 0 && (
        <ul className="space-y-1">
          {deliverable.requirements.map((req, i) => (
            <li key={i} className={`text-xs flex items-start gap-2 ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="mt-0.5 shrink-0">
                <Circle size={8} weight="fill" className="text-gray-300" />
              </span>
              {req}
            </li>
          ))}
        </ul>
      )}

      {/* Deadline display + set deadline */}
      {!isLocked && deliverable.selfDeadline && (
        <div className="mt-2 flex items-center gap-1.5">
          <ClockCountdown size={12} className={isOverdue ? 'text-red-500' : 'text-gray-400'} />
          <span className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
            Deadline: {new Date(deliverable.selfDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </span>
        </div>
      )}
      {DEADLINE_ELIGIBLE.has(deliverable.status) && !deliverable.selfDeadline && onSetDeadline && (
        <div className="mt-2">
          {!showDeadlineInput ? (
            <button
              onClick={() => setShowDeadlineInput(true)}
              className="text-xs text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Set Deadline
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                value={deadlineValue}
                onChange={e => setDeadlineValue(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1"
                min={new Date().toISOString().slice(0, 16)}
              />
              <button
                onClick={async () => {
                  if (!deadlineValue) return
                  await onSetDeadline({ deliverableId: deliverable.id, deadline: new Date(deadlineValue).toISOString() })
                  setShowDeadlineInput(false)
                  setDeadlineValue('')
                }}
                disabled={!deadlineValue || isSettingDeadline}
                className="text-xs font-medium bg-gray-900 text-white rounded px-3 py-1 hover:bg-gray-800 disabled:opacity-50"
              >
                {isSettingDeadline ? 'Setting...' : 'Set'}
              </button>
              <button
                onClick={() => { setShowDeadlineInput(false); setDeadlineValue('') }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action: Start Working */}
      {deliverable.status === 'available' && onStart && (
        <button
          onClick={onStart}
          disabled={isStarting}
          className="mt-3 text-sm font-medium bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStarting ? 'Starting...' : 'Start Working'}
        </button>
      )}

      {/* Action: Submit Work (new or resubmit after revision) */}
      {(deliverable.status === 'in-progress' || canResubmit) && onSubmit && (
        <>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm font-medium bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              {canResubmit ? 'Resubmit Work' : 'Submit Work'}
            </button>
          )}
          {showForm && (
            <DeliverableSubmissionForm
              onSubmit={onSubmit}
              isSubmitting={isSubmitting || false}
              initialValues={canResubmit ? {
                deployedUrl: deliverable.deployedUrl,
                githubUrl: deliverable.githubUrl,
                loomUrl: deliverable.loomUrl,
                submissionNotes: deliverable.submissionNotes,
              } : undefined}
            />
          )}
        </>
      )}

      {/* Submitted links */}
      {hasSubmission && (deliverable.deployedUrl || deliverable.githubUrl || deliverable.loomUrl) && (
        <div className="mt-3 border-t border-gray-100 pt-3 space-y-1.5">
          {deliverable.deployedUrl && (
            <a
              href={deliverable.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              <GlobeSimple size={14} />
              {deliverable.deployedUrl}
            </a>
          )}
          {deliverable.githubUrl && (
            <a
              href={deliverable.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              <GithubLogo size={14} />
              {deliverable.githubUrl}
            </a>
          )}
          {deliverable.loomUrl && (
            <a
              href={deliverable.loomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors"
            >
              <VideoCamera size={14} />
              {deliverable.loomUrl}
            </a>
          )}
          {!deliverable.deployedUrl || !deliverable.githubUrl || !deliverable.loomUrl ? (
            <p className="text-[10px] text-amber-600 mt-1">
              Partial submission — {[deliverable.deployedUrl, deliverable.githubUrl, deliverable.loomUrl].filter(Boolean).length}/3 links
            </p>
          ) : null}
          {deliverable.submissionNotes && (
            <p className="text-xs text-gray-500 mt-1">{deliverable.submissionNotes}</p>
          )}
        </div>
      )}

      {/* Peer reviews */}
      {hasSubmission && (
        <PeerReviewsForDeliverable deliverableId={deliverable.id} />
      )}

      {/* AI Pre-Review */}
      {deliverable.aiReview && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <button
            onClick={() => setShowAIReview(prev => !prev)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Robot size={14} />
            AI Pre-Review
            {deliverable.aiReview.meetsRequirements ? (
              <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full">Looks Good</span>
            ) : (
              <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full">Needs Work</span>
            )}
            {showAIReview ? <CaretUp size={12} /> : <CaretDown size={12} />}
          </button>
          {showAIReview && (
            <div className="mt-2 bg-gray-50 rounded-lg p-3 space-y-2">
              <p className="text-xs text-gray-600">{deliverable.aiReview.summary}</p>
              {deliverable.aiReview.strengths.length > 0 && (
                <div>
                  <p className="text-[10px] font-medium text-green-700 mb-1">Strengths</p>
                  <ul className="space-y-0.5">
                    {deliverable.aiReview.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <CheckCircle size={12} weight="fill" className="text-green-500 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {deliverable.aiReview.improvements.length > 0 && (
                <div>
                  <p className="text-[10px] font-medium text-amber-700 mb-1">Improvements</p>
                  <ul className="space-y-0.5">
                    {deliverable.aiReview.improvements.map((s, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <ArrowClockwise size={12} className="text-amber-500 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-gray-400">
                  Clarity: {deliverable.aiReview.rubricEstimate.clarity}/5
                </span>
                <span className="text-[10px] text-gray-400">
                  Completeness: {deliverable.aiReview.rubricEstimate.completeness}/5
                </span>
                <span className="text-[10px] text-gray-400">
                  Quality: {deliverable.aiReview.rubricEstimate.technicalQuality}/5
                </span>
              </div>
              <p className="text-[10px] text-gray-400 italic">AI analysis — the professor will give the final verdict.</p>
            </div>
          )}
        </div>
      )}

      {/* Review feedback */}
      {hasReview && deliverable.reviewFeedback && (
        <div className={`mt-3 border-t pt-3 ${
          deliverable.status === 'approved'
            ? 'border-green-100'
            : deliverable.status === 'failed'
              ? 'border-red-100'
              : 'border-orange-100'
        }`}>
          <p className={`text-xs font-medium mb-1 ${
            deliverable.status === 'approved'
              ? 'text-green-700'
              : deliverable.status === 'failed'
                ? 'text-red-700'
                : 'text-orange-700'
          }`}>
            {deliverable.status === 'approved' ? 'Approved' : deliverable.status === 'failed' ? 'Failed' : 'Revision Needed'}
            {deliverable.reviewedBy && ` by ${deliverable.reviewedBy}`}
          </p>
          <p className="text-xs text-gray-600">{deliverable.reviewFeedback}</p>
        </div>
      )}

      {/* History toggle */}
      {HISTORY_VISIBLE.has(deliverable.status) && (
        <div className="mt-3 border-t border-gray-100 pt-2">
          <button
            onClick={() => setShowHistory(prev => !prev)}
            className="text-xs text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            {showHistory ? 'Hide History' : 'History'}
          </button>
          {showHistory && (
            <SubmissionHistoryTimeline courseId={courseId} deliverableId={deliverable.id} />
          )}
        </div>
      )}
    </div>
  )
}
