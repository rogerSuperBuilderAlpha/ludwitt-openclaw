'use client'

import { useState } from 'react'
import { CircleNotch, ArrowSquareOut, CaretDown, CaretUp, PaperPlaneRight, Check, ArrowClockwise, X } from '@phosphor-icons/react'
import { useProfessorSubmissions } from '@/lib/hooks/useProfessorSubmissions'
import { useDeliverableComments } from '@/lib/hooks/useDeliverableComments'
import { useReviewDeliverable } from '@/lib/hooks/useReviewDeliverable'
import { useEndorsePeerReview } from '@/lib/hooks/useEndorsePeerReview'
import { PeerReviewsForDeliverable } from '@/components/university/peer-reviews/PeerReviewsForDeliverable'
import type { ProfessorSubmissionRow, ReviewVerdict } from '@/lib/types/university'

function CommentSection({ courseId, deliverableId }: { courseId: string; deliverableId: string }) {
  const { comments, loading, posting, postComment } = useDeliverableComments(courseId, deliverableId)
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (!text.trim()) return
    setError(null)
    const result = await postComment(text.trim())
    if (result.error) {
      setError(result.error)
    } else {
      setText('')
    }
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <h5 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h5>

      {loading && (
        <div className="flex items-center justify-center py-3">
          <CircleNotch size={14} className="text-gray-300 animate-spin" />
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
          {comments.map(comment => {
            const date = new Date(comment.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
            return (
              <div key={comment.id} className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-700">{comment.authorName}</span>
                  <span className="text-[10px] text-gray-400">{date}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
              </div>
            )
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="flex items-start gap-2">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          maxLength={2000}
          rows={2}
          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          disabled={posting || !text.trim()}
          className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors shrink-0"
        >
          {posting ? <CircleNotch size={14} className="animate-spin" /> : <PaperPlaneRight size={14} />}
        </button>
      </div>
    </div>
  )
}

function SubmissionCard({ submission, onReviewed }: { submission: ProfessorSubmissionRow; onReviewed: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const { review, loading: reviewLoading } = useReviewDeliverable()
  const { endorse, isEndorsing } = useEndorsePeerReview()

  const allLinksPresent = !!submission.deployedUrl && !!submission.githubUrl && !!submission.loomUrl
  const linkCount = [submission.deployedUrl, submission.githubUrl, submission.loomUrl].filter(Boolean).length

  const date = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : ''

  async function handleReview(verdict: ReviewVerdict) {
    const result = await review({
      courseId: submission.courseId,
      deliverableId: submission.deliverableId,
      verdict,
      feedback: feedbackText.trim() || undefined,
    })
    if (!result.error) {
      setFeedbackText('')
      onReviewed()
    }
  }

  return (
    <div className="border-b border-gray-50 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 py-3 text-left hover:bg-gray-50 transition-colors px-1 -mx-1 rounded"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-gray-900 truncate">
              {submission.deliverableTitle}
            </span>
            {!allLinksPresent && (
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full shrink-0">
                {linkCount}/3 links
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {submission.studentName} &middot; {submission.courseTitle}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {submission.pathTopic} {date && `· ${date}`}
          </p>
        </div>
        <div className="shrink-0 mt-1">
          {expanded ? <CaretUp size={14} className="text-gray-400" /> : <CaretDown size={14} className="text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="pb-4 px-1">
          {/* Links */}
          <div className="space-y-1.5 mb-3">
            {submission.deployedUrl && (
              <a href={submission.deployedUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700">
                Live <ArrowSquareOut size={10} />
              </a>
            )}
            {submission.githubUrl && (
              <a href={submission.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700">
                GitHub <ArrowSquareOut size={10} />
              </a>
            )}
            {submission.loomUrl && (
              <a href={submission.loomUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700">
                Loom <ArrowSquareOut size={10} />
              </a>
            )}
          </div>

          {submission.submissionNotes && (
            <p className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1.5 italic mb-3">
              {submission.submissionNotes}
            </p>
          )}

          {/* Review verdict — only when all 3 links present */}
          {allLinksPresent && (
            <div className="border border-gray-200 rounded-lg p-3 mb-3">
              <h5 className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                Review
              </h5>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Feedback for the student (optional)..."
                rows={2}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 resize-none mb-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReview('approved')}
                  disabled={reviewLoading}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <Check size={12} weight="bold" /> Accept
                </button>
                <button
                  onClick={() => handleReview('revision-needed')}
                  disabled={reviewLoading}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <ArrowClockwise size={12} weight="bold" /> Review &amp; Resubmit
                </button>
                <button
                  onClick={() => handleReview('failed')}
                  disabled={reviewLoading}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <X size={12} weight="bold" /> Fail
                </button>
              </div>
            </div>
          )}

          {!allLinksPresent && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
              Scoring disabled — student has only submitted {linkCount}/3 required links. You can still comment below.
            </p>
          )}

          {/* Peer Reviews */}
          <PeerReviewsForDeliverable
            deliverableId={submission.deliverableId}
            showEndorse
            onEndorse={endorse}
            isEndorsing={isEndorsing}
          />

          {/* Comments */}
          <CommentSection courseId={submission.courseId} deliverableId={submission.deliverableId} />
        </div>
      )}
    </div>
  )
}

export function SubmissionsList() {
  const { submissions, loading, error, refetch } = useProfessorSubmissions()

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

  if (submissions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500">No submissions awaiting review.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">
          Pending Review ({submissions.length})
        </h3>
      </div>
      <div className="px-4">
        {submissions.map((s, i) => (
          <SubmissionCard
            key={`${s.courseId}-${s.deliverableId}-${i}`}
            submission={s}
            onReviewed={refetch}
          />
        ))}
      </div>
    </div>
  )
}
