/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState } from 'react'
import { GlobeSimple, GithubLogo, VideoCamera } from '@phosphor-icons/react'

interface DeliverableSubmissionFormProps {
  onSubmit: (data: {
    deployedUrl: string
    githubUrl: string
    loomUrl: string
    submissionNotes?: string
  }) => Promise<void>
  isSubmitting: boolean
  initialValues?: {
    deployedUrl?: string
    githubUrl?: string
    loomUrl?: string
    submissionNotes?: string
  }
}

interface FieldError {
  deployedUrl?: string
  githubUrl?: string
  loomUrl?: string
  general?: string
}

export function DeliverableSubmissionForm({
  onSubmit,
  isSubmitting,
  initialValues,
}: DeliverableSubmissionFormProps) {
  const [deployedUrl, setDeployedUrl] = useState(
    initialValues?.deployedUrl || ''
  )
  const [githubUrl, setGithubUrl] = useState(initialValues?.githubUrl || '')
  const [loomUrl, setLoomUrl] = useState(initialValues?.loomUrl || '')
  const [submissionNotes, setSubmissionNotes] = useState(
    initialValues?.submissionNotes || ''
  )
  const [errors, setErrors] = useState<FieldError>({})

  function validate(): FieldError {
    const errs: FieldError = {}

    // At least one URL is required
    if (!deployedUrl.trim() && !githubUrl.trim() && !loomUrl.trim()) {
      errs.general = 'At least one URL is required'
      return errs
    }

    // Validate each provided URL
    if (deployedUrl.trim()) {
      if (!deployedUrl.startsWith('https://')) {
        errs.deployedUrl = 'Must be an HTTPS URL'
      } else {
        try {
          new URL(deployedUrl)
        } catch {
          errs.deployedUrl = 'Invalid URL'
        }
      }
    }

    if (githubUrl.trim()) {
      if (!githubUrl.startsWith('https://github.com/')) {
        errs.githubUrl = 'Must start with https://github.com/'
      } else {
        try {
          new URL(githubUrl)
        } catch {
          errs.githubUrl = 'Invalid URL'
        }
      }
    }

    if (loomUrl.trim()) {
      if (!loomUrl.startsWith('https://www.loom.com/')) {
        errs.loomUrl = 'Must start with https://www.loom.com/'
      } else {
        try {
          new URL(loomUrl)
        } catch {
          errs.loomUrl = 'Invalid URL'
        }
      }
    }

    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    await onSubmit({
      deployedUrl: deployedUrl.trim(),
      githubUrl: githubUrl.trim(),
      loomUrl: loomUrl.trim(),
      submissionNotes: submissionNotes.trim() || undefined,
    })
  }

  const filledCount = [deployedUrl, githubUrl, loomUrl].filter((u) =>
    u.trim()
  ).length

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-3 border-t border-gray-100 pt-4"
    >
      {errors.general && (
        <p className="text-xs text-red-500">{errors.general}</p>
      )}

      <p className="text-[11px] text-gray-400">
        {filledCount}/3 links provided
        {filledCount < 3 && ' — you can add the rest later'}
      </p>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1">
          <GlobeSimple size={14} />
          Deployed Website URL
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          value={deployedUrl}
          onChange={(e) => setDeployedUrl(e.target.value)}
          placeholder="https://my-project.vercel.app"
          disabled={isSubmitting}
          className={`w-full text-sm border rounded-md px-3 py-2 outline-none transition-colors ${
            errors.deployedUrl
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-gray-400'
          } disabled:opacity-50 disabled:bg-gray-50`}
        />
        {errors.deployedUrl && (
          <p className="text-xs text-red-500 mt-1">{errors.deployedUrl}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1">
          <GithubLogo size={14} />
          GitHub Repository URL
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          disabled={isSubmitting}
          className={`w-full text-sm border rounded-md px-3 py-2 outline-none transition-colors ${
            errors.githubUrl
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-gray-400'
          } disabled:opacity-50 disabled:bg-gray-50`}
        />
        {errors.githubUrl && (
          <p className="text-xs text-red-500 mt-1">{errors.githubUrl}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 mb-1">
          <VideoCamera size={14} />
          Loom Walkthrough URL
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          value={loomUrl}
          onChange={(e) => setLoomUrl(e.target.value)}
          placeholder="https://www.loom.com/share/..."
          disabled={isSubmitting}
          className={`w-full text-sm border rounded-md px-3 py-2 outline-none transition-colors ${
            errors.loomUrl
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-gray-400'
          } disabled:opacity-50 disabled:bg-gray-50`}
        />
        {errors.loomUrl && (
          <p className="text-xs text-red-500 mt-1">{errors.loomUrl}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          Notes (optional)
        </label>
        <textarea
          value={submissionNotes}
          onChange={(e) => setSubmissionNotes(e.target.value)}
          placeholder="Anything you'd like reviewers to know..."
          disabled={isSubmitting}
          rows={2}
          className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-gray-400 transition-colors resize-none disabled:opacity-50 disabled:bg-gray-50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-sm font-medium bg-gray-900 text-white rounded-md py-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Deliverable'}
      </button>
    </form>
  )
}
