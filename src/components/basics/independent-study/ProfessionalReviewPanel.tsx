/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

/**
 * ProfessionalReviewPanel Component
 *
 * Form for submitting professional review information and proof.
 * Shows status and instructions for getting professional sign-off.
 */

import { useState } from 'react'
import {
  UserCircle,
  Briefcase,
  EnvelopeSimple,
  LinkedinLogo,
  Upload,
  CheckCircle,
  Clock,
  Trophy,
  Star,
  Certificate,
  FileText,
  ChatCircle,
  VideoCamera,
  Question,
} from '@phosphor-icons/react'
import { useAuth } from '@/components/auth/ClientProvider'
import type {
  ProfessionalReview,
  IndependentStudyDisplay,
  CoursePrompt,
} from '@/lib/types/independent-study'
import { logger } from '@/lib/logger'

interface ProfessionalReviewPanelProps {
  study: IndependentStudyDisplay
  review: ProfessionalReview | null
  onUpdate: (review: ProfessionalReview) => void
  onComplete: () => void
}

const PROOF_TYPES = [
  {
    id: 'email',
    label: 'Email Exchange',
    icon: EnvelopeSimple,
    description: 'Screenshot of email approval',
  },
  {
    id: 'signed_document',
    label: 'Signed Document',
    icon: FileText,
    description: 'Signed letter or form',
  },
  {
    id: 'linkedin_message',
    label: 'LinkedIn Message',
    icon: LinkedinLogo,
    description: 'Screenshot of LinkedIn conversation',
  },
  {
    id: 'video',
    label: 'Video Call',
    icon: VideoCamera,
    description: 'Recording or screenshot of video call',
  },
  {
    id: 'other',
    label: 'Other',
    icon: Question,
    description: 'Other form of verification',
  },
]

export function ProfessionalReviewPanel({
  study,
  review,
  onUpdate,
  onComplete,
}: ProfessionalReviewPanelProps) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  // Form state
  const [professionalName, setProfessionalName] = useState(
    review?.professionalName || ''
  )
  const [professionalTitle, setProfessionalTitle] = useState(
    review?.professionalTitle || ''
  )
  const [professionalOrganization, setProfessionalOrganization] = useState(
    review?.professionalOrganization || ''
  )
  const [professionalEmail, setProfessionalEmail] = useState(
    review?.professionalEmail || ''
  )
  const [professionalLinkedIn, setProfessionalLinkedIn] = useState(
    review?.professionalLinkedIn || ''
  )
  const [howConnected, setHowConnected] = useState(review?.howConnected || '')
  const [feedback, setFeedback] = useState(review?.feedback || '')
  const [proofType, setProofType] = useState<string>(review?.proofType || '')
  const [proofUrl, setProofUrl] = useState(review?.proofUrl || '')

  const coursePrompt = study.coursePrompt as CoursePrompt | undefined

  const isReviewSubmitted = !!review?.submittedAt
  const isApproved = review?.status === 'approved'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !professionalName || !professionalTitle) return

    setIsSubmitting(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch(
        '/api/basics/independent-study/professional-review',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyId: study.id,
            professionalName,
            professionalTitle,
            professionalOrganization,
            professionalEmail,
            professionalLinkedIn,
            howConnected,
            feedback,
            proofType,
            proofUrl,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        onUpdate(data.review)
      }
    } catch (err) {
      logger.error('ProfessionalReviewPanel', 'Failed to submit', {
        error: err,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApprove = async () => {
    if (!user || !review) return

    setIsApproving(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch(
        '/api/basics/independent-study/professional-review',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyId: study.id,
            status: 'approved',
            proofUrl,
            proofType,
            feedback,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        onUpdate(data.review)
        if (data.studyCompleted) {
          onComplete()
        }
      }
    } catch (err) {
      logger.error('ProfessionalReviewPanel', 'Failed to approve', {
        error: err,
      })
    } finally {
      setIsApproving(false)
    }
  }

  // Show completion state
  if (isApproved) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div
          className="px-6 py-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          }}
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Trophy size={40} weight="fill" color="white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Congratulations!
          </h2>
          <p className="text-white/90">
            You&apos;ve completed your Independent Study on{' '}
            {coursePrompt?.curriculum.title}!
          </p>
        </div>

        <div className="px-6 py-6">
          <div className="bg-emerald-50 rounded-xl p-5 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <Certificate size={24} className="text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">
                Professional Sign-off
              </h3>
            </div>
            <p className="text-emerald-700 text-sm">
              <strong>{review.professionalName}</strong>,{' '}
              {review.professionalTitle}
              {review.professionalOrganization &&
                ` at ${review.professionalOrganization}`}
            </p>
            {review.feedback && (
              <p className="text-emerald-600 text-sm mt-2 italic">
                &quot;{review.feedback}&quot;
              </p>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 text-emerald-600">
            <Star size={20} weight="fill" />
            <span className="font-semibold">+500 XP earned!</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-gray-200"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <UserCircle size={24} color="white" weight="fill" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Professional Review
            </h2>
            <p className="text-white/80 text-sm">
              Get sign-off from an expert in the field
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <h3 className="font-medium text-indigo-800 mb-2">
          How to Complete This Step
        </h3>
        <ol className="text-sm text-indigo-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </span>
            Find a professional in the field related to your study topic
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </span>
            Share your project with them and explain what you built
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </span>
            Get their feedback and approval (email, LinkedIn, or other)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              4
            </span>
            Submit their information and proof of approval below
          </li>
        </ol>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
        {/* Professional Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">
            Professional Information
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={professionalName}
                onChange={(e) => setProfessionalName(e.target.value)}
                placeholder="Dr. Jane Smith"
                required
                disabled={isReviewSubmitted}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title / Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                placeholder="Senior Biologist"
                required
                disabled={isReviewSubmitted}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Organization
            </label>
            <input
              type="text"
              value={professionalOrganization}
              onChange={(e) => setProfessionalOrganization(e.target.value)}
              placeholder="University of Example"
              disabled={isReviewSubmitted}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                value={professionalEmail}
                onChange={(e) => setProfessionalEmail(e.target.value)}
                placeholder="jane.smith@example.com"
                disabled={isReviewSubmitted}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={professionalLinkedIn}
                onChange={(e) => setProfessionalLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/janesmith"
                disabled={isReviewSubmitted}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              How did you connect with them?
            </label>
            <input
              type="text"
              value={howConnected}
              onChange={(e) => setHowConnected(e.target.value)}
              placeholder="LinkedIn cold outreach, university professor, etc."
              disabled={isReviewSubmitted}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Proof of Approval */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Proof of Approval</h3>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Type of Proof
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {PROOF_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setProofType(type.id)}
                  disabled={isReviewSubmitted}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    proofType === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 disabled:hover:border-gray-200'
                  }`}
                >
                  <type.icon
                    size={20}
                    className={
                      proofType === type.id
                        ? 'text-indigo-600'
                        : 'text-gray-400'
                    }
                  />
                  <div
                    className={`text-sm font-medium mt-1 ${proofType === type.id ? 'text-indigo-700' : 'text-gray-700'}`}
                  >
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Proof URL (upload to cloud storage and paste link)
            </label>
            <input
              type="url"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              placeholder="https://drive.google.com/file/..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload screenshot/document to Google Drive, Dropbox, or Imgur and
              paste the sharing link
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Their Feedback (optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What did they say about your project?"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm resize-none"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-4">
          {!isReviewSubmitted ? (
            <button
              type="submit"
              disabled={isSubmitting || !professionalName || !professionalTitle}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Save Professional Info'}
            </button>
          ) : (
            <div className="space-y-3">
              {review?.status === 'pending' && (
                <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-3 rounded-xl">
                  <Clock size={18} />
                  <span className="font-medium">
                    Professional info saved - add proof when ready
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleApprove}
                disabled={isApproving || !proofUrl || !proofType}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                style={{ boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)' }}
              >
                {isApproving ? (
                  'Completing...'
                ) : (
                  <>
                    <CheckCircle size={20} weight="fill" />
                    Complete Independent Study
                  </>
                )}
              </button>
              {!proofUrl && (
                <p className="text-xs text-center text-gray-500">
                  Add proof of approval to complete your study
                </p>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
