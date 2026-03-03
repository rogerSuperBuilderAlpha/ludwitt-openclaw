/* eslint-disable jsx-a11y/no-autofocus */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileDoc,
  PaperPlaneTilt,
  ArrowRight,
  Plus,
  CheckCircle,
  Link as LinkIcon,
  GoogleDriveLogo,
} from '@phosphor-icons/react'
import { Project } from '@/lib/types/project'
import { useCredits } from '@/lib/hooks/useCredits'
import { CostEstimate, type EstimateResult } from './CostEstimate'
import { GoogleDrivePicker } from './GoogleDrivePicker'

interface DriveFile {
  id: string
  name: string
  url: string
  type: string
}

interface QuickSubmitFormProps {
  projects: Project[]
  shareUrl: string
  setShareUrl: (url: string) => void
  docTitle: string
  setDocTitle: (title: string) => void
  docNotes: string
  setDocNotes: (notes: string) => void
  selectedProjectId: string
  setSelectedProjectId: (id: string) => void
  setEstimatedCostCents?: (cents: number) => void
  setEstimateMarkup?: (markup: number) => void
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => Promise<void>
  onContinueToDashboard: () => void
  onCreateProject: () => void
  error: string | null
}

export function QuickSubmitForm({
  projects,
  shareUrl,
  setShareUrl,
  docTitle,
  setDocTitle,
  docNotes,
  setDocNotes,
  selectedProjectId,
  setSelectedProjectId,
  setEstimatedCostCents,
  setEstimateMarkup,
  isSubmitting,
  onSubmit,
  onContinueToDashboard,
  onCreateProject,
  error,
}: QuickSubmitFormProps) {
  const [showNotes, setShowNotes] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [costEstimate, setCostEstimate] = useState<EstimateResult | null>(null)
  const [inputMethod, setInputMethod] = useState<'url' | 'drive'>('url')
  const [showDrivePicker, setShowDrivePicker] = useState(false)
  const [selectedDriveFile, setSelectedDriveFile] = useState<DriveFile | null>(
    null
  )
  const { balance, loading: creditsLoading } = useCredits()

  // Handle Drive file selection
  const handleDriveFileSelect = (file: DriveFile) => {
    setSelectedDriveFile(file)
    setShareUrl(file.url)
    if (!docTitle) {
      setDocTitle(file.name.replace(/\.[^/.]+$/, ''))
    }
    setShowDrivePicker(false)
  }

  const handleClearDriveSelection = () => {
    setSelectedDriveFile(null)
    setShareUrl('')
    setDocTitle('')
    setShowDrivePicker(true)
  }

  // Handle estimate loaded - update local state and parent
  const handleEstimateLoaded = (estimate: EstimateResult | null) => {
    setCostEstimate(estimate)
    if (setEstimatedCostCents) {
      setEstimatedCostCents(estimate?.displayCostCents || 0)
    }
    if (setEstimateMarkup) {
      setEstimateMarkup(estimate?.markup || 3)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(e)
    if (!error) {
      setSubmitted(true)
      // Reset form
      setShareUrl('')
      setDocTitle('')
      setDocNotes('')
      // Auto-dismiss success after 2 seconds
      setTimeout(() => setSubmitted(false), 2000)
    }
  }

  const isValidUrl =
    shareUrl.includes('docs.google.com') ||
    shareUrl.includes('drive.google.com')
  const hasSufficientCredits =
    costEstimate === null || costEstimate.balance.sufficient
  const canSubmit =
    shareUrl.trim().length > 0 && !isSubmitting && hasSufficientCredits

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Top Bar with Credits */}
      <div className="px-4 pt-4 flex justify-end">
        {!creditsLoading && balance && (
          <Link
            href="/account/credits"
            className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
              ${
                balance.isAtDebtLimit
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : balance.isLowBalance
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }
              hover:opacity-80 transition-opacity
            `}
          >
            <span>💳</span>
            <span>{balance.balanceFormatted}</span>
            {(balance.isLowBalance || balance.isAtDebtLimit) && (
              <span className="text-xs">⚠️</span>
            )}
          </Link>
        )}
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-4 md:pt-8 md:pb-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl mb-4">
          <FileDoc
            className="w-7 h-7 md:w-8 md:h-8 text-blue-600"
            weight="duotone"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Submit Requirements
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto">
          Paste your Google Doc link and we&apos;ll take it from here
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 md:px-6 pb-6">
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success Message */}
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle
                  className="w-6 h-6 text-green-600 flex-shrink-0"
                  weight="fill"
                />
                <div>
                  <p className="font-medium text-green-900">Submitted!</p>
                  <p className="text-sm text-green-700">
                    Your developer will be notified.
                  </p>
                </div>
              </div>
            )}

            {/* Input Method Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setInputMethod('drive')
                  setShowDrivePicker(true)
                  setSelectedDriveFile(null)
                  setShareUrl('')
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  inputMethod === 'drive'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <GoogleDriveLogo
                  size={20}
                  weight="fill"
                  className="text-[#4285F4]"
                />
                Select from Drive
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMethod('url')
                  setSelectedDriveFile(null)
                  setShareUrl('')
                  setShowDrivePicker(false)
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  inputMethod === 'url'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LinkIcon size={20} />
                Paste Link
              </button>
            </div>

            {/* Google Drive Picker */}
            {inputMethod === 'drive' && showDrivePicker && (
              <GoogleDrivePicker
                onSelect={handleDriveFileSelect}
                onCancel={() => {
                  setShowDrivePicker(false)
                  if (!selectedDriveFile) {
                    setInputMethod('url')
                  }
                }}
              />
            )}

            {/* Selected Drive File Display */}
            {inputMethod === 'drive' &&
              selectedDriveFile &&
              !showDrivePicker && (
                <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
                        <GoogleDriveLogo
                          size={20}
                          weight="fill"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedDriveFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedDriveFile.type}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearDriveSelection}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Change
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" weight="fill" />
                    Document selected from Drive
                  </div>
                </div>
              )}

            {/* Google Doc Link - URL Input */}
            {inputMethod === 'url' && (
              <div>
                <label
                  htmlFor="docUrl"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Google Doc Link
                </label>
                <input
                  type="url"
                  id="docUrl"
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  autoComplete="off"
                  autoFocus
                />
                {shareUrl && !isValidUrl && (
                  <p className="mt-2 text-sm text-amber-600">
                    💡 Tip: Use a Google Docs or Drive link for best results
                  </p>
                )}
                {isValidUrl && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" weight="fill" />
                    Valid Google Docs link
                  </p>
                )}
              </div>
            )}

            {/* Cost Estimate */}
            <CostEstimate
              documentUrl={shareUrl}
              onEstimateLoaded={handleEstimateLoaded}
            />

            {/* Project Selector */}
            <div>
              <label
                htmlFor="project"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Project
              </label>
              {projects.length > 0 ? (
                <select
                  id="project"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.25rem',
                  }}
                >
                  <option value="">Default Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              ) : (
                <button
                  type="button"
                  onClick={onCreateProject}
                  className="w-full px-4 py-4 text-base border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" weight="bold" />
                  Create your first project
                </button>
              )}
            </div>

            {/* Title - Optional but visible */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Title{' '}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="title"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g., Homepage Redesign v2"
                className="w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Notes - Collapsible */}
            <div>
              {!showNotes ? (
                <button
                  type="button"
                  onClick={() => setShowNotes(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add notes
                </button>
              ) : (
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Notes{' '}
                    <span className="font-normal text-gray-500">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    value={docNotes}
                    onChange={(e) => setDocNotes(e.target.value)}
                    placeholder="Any additional context for your developer..."
                    rows={3}
                    className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full py-4 px-6 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2 disabled:shadow-none ${
                !hasSufficientCredits
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : !hasSufficientCredits ? (
                <>
                  <PaperPlaneTilt className="w-5 h-5" weight="fill" />
                  Add Credits First
                </>
              ) : (
                <>
                  <PaperPlaneTilt className="w-5 h-5" weight="fill" />
                  {costEstimate
                    ? `Submit • ${costEstimate.displayCostFormatted}`
                    : 'Submit Requirements'}
                </>
              )}
            </button>
          </form>

          {/* Continue to Dashboard */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onContinueToDashboard}
              className="w-full py-4 px-6 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-medium text-base rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Continue to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-sm text-gray-500 mt-3">
              View all submissions, track progress, and message your developer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
