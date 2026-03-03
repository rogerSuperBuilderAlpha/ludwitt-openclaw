'use client'

import { useState } from 'react'
import {
  Plus,
  X,
  GoogleDriveLogo,
  Link as LinkIcon,
} from '@phosphor-icons/react'
import { Project } from '@/lib/types/project'
import { GoogleDocsHelper } from './GoogleDocsHelper'
import { GoogleDrivePicker } from './GoogleDrivePicker'
import { CostEstimate, type EstimateResult } from './CostEstimate'

interface DriveFile {
  id: string
  name: string
  mimeType: string
  url: string
  iconUrl: string
  modifiedAt: string
  owner: string
  type: string
}

type AddDocumentFormProps = {
  shareUrl: string
  docTitle: string
  docNotes: string
  selectedProjectId: string
  isAdding: boolean
  addError: string | null
  projects: Project[]
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  setShareUrl: (v: string) => void
  setDocTitle: (v: string) => void
  setDocNotes: (v: string) => void
  setSelectedProjectId: (v: string) => void
  setAddError: (v: string | null) => void
  setEstimatedCostCents?: (v: number) => void
  setEstimateMarkup?: (v: number) => void
  onCreateFirstProject: () => void
}

export function AddDocumentForm(props: AddDocumentFormProps) {
  const {
    shareUrl,
    docTitle,
    docNotes,
    selectedProjectId,
    isAdding,
    addError,
    projects,
    onClose,
    onSubmit,
    setShareUrl,
    setDocTitle,
    setDocNotes,
    setSelectedProjectId,
    setAddError,
    setEstimatedCostCents,
    setEstimateMarkup,
    onCreateFirstProject,
  } = props

  const [showDrivePicker, setShowDrivePicker] = useState(false)
  const [selectedDriveFile, setSelectedDriveFile] = useState<DriveFile | null>(
    null
  )
  const [inputMethod, setInputMethod] = useState<'url' | 'drive'>('url')
  const [costEstimate, setCostEstimate] = useState<EstimateResult | null>(null)

  // Update parent with estimated cost and markup when it changes
  const handleEstimateLoaded = (estimate: EstimateResult | null) => {
    setCostEstimate(estimate)
    if (setEstimatedCostCents) {
      setEstimatedCostCents(estimate?.displayCostCents || 0)
    }
    if (setEstimateMarkup) {
      setEstimateMarkup(estimate?.markup || 3)
    }
  }

  const handleDriveFileSelect = (file: DriveFile) => {
    setSelectedDriveFile(file)
    setShareUrl(file.url)
    if (!docTitle) {
      setDocTitle(file.name)
    }
    setShowDrivePicker(false)
    setInputMethod('drive')
  }

  const handleClearDriveSelection = () => {
    setSelectedDriveFile(null)
    setShareUrl('')
    setInputMethod('url')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Add Requirements
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Share your requirements for the next iteration
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Iterative development cycle</span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose()
              setAddError(null)
            }}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X size={20} weight="regular" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Document Source Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-medium text-gray-900">
                How would you like to share your requirements?
              </h4>
            </div>

            {/* Method Toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setInputMethod('drive')
                  if (!showDrivePicker && !selectedDriveFile) {
                    setShowDrivePicker(true)
                  }
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                  inputMethod === 'drive'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <GoogleDriveLogo
                  size={18}
                  weight="fill"
                  className="text-[#4285F4]"
                />
                Select from Drive
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-normal">
                  New
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMethod('url')
                  setShowDrivePicker(false)
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                  inputMethod === 'url'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LinkIcon size={18} />
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
                <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
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
                        <p className="text-xs text-gray-600 mt-0.5">
                          {selectedDriveFile.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowDrivePicker(true)}
                        className="text-xs text-blue-600 hover:text-blue-700 underline"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleClearDriveSelection}
                        className="p-1 hover:bg-green-200 rounded-full transition-colors"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-green-700 flex items-center gap-1">
                    ✓ Document selected from your Google Drive
                  </p>
                </div>
              )}

            {/* URL Input Option */}
            {inputMethod === 'url' && (
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <LinkIcon size={12} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="shareUrl"
                      className="block text-sm font-semibold text-blue-900 mb-1"
                    >
                      Google Docs Link
                    </label>
                    <p className="text-xs text-blue-700 mb-3">
                      Paste a link to your Google Doc, Sheet, or Slides
                      presentation
                    </p>
                    <input
                      type="url"
                      id="shareUrl"
                      value={shareUrl}
                      onChange={(e) => setShareUrl(e.target.value)}
                      placeholder="https://docs.google.com/document/d/..."
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                    <GoogleDocsHelper url={shareUrl} />
                  </div>
                </div>
              </div>
            )}

            {/* Cost Estimate */}
            <CostEstimate
              documentUrl={shareUrl}
              onEstimateLoaded={handleEstimateLoaded}
              className="mt-4"
            />
          </div>

          <div>
            <label
              htmlFor="docTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Document Title (optional)
            </label>
            <input
              type="text"
              id="docTitle"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g., Project Requirements - Oct 14"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="projectId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Which project is this for?
            </label>
            <select
              id="projectId"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a project...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {projects.length === 0 ? (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>🎯 Project-based development:</strong> Each document
                  should belong to a project for better organization and
                  iteration tracking.
                </p>
                <button
                  type="button"
                  onClick={onCreateFirstProject}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 underline"
                >
                  <Plus size={12} weight="regular" />
                  Create your first project
                </button>
              </div>
            ) : (
              selectedProjectId && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                  ✓ This document will be added to your selected project&apos;s
                  iteration cycle
                </div>
              )
            )}
          </div>

          <div>
            <label
              htmlFor="docNotes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (optional)
            </label>
            <textarea
              id="docNotes"
              value={docNotes}
              onChange={(e) => setDocNotes(e.target.value)}
              placeholder="Add any notes about this document..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {addError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{addError}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Ready to add to iteration cycle</span>
                </div>
                <p className="text-xs text-gray-500 pl-4">
                  Your developer will review, ask questions, and deliver updates
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={
                  isAdding ||
                  !shareUrl ||
                  (costEstimate !== null && !costEstimate.balance.sufficient)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                  costEstimate && !costEstimate.balance.sufficient
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding to project...
                  </>
                ) : costEstimate && !costEstimate.balance.sufficient ? (
                  <>
                    <Plus size={16} weight="regular" />
                    Add Credits First
                  </>
                ) : (
                  <>
                    <Plus size={16} weight="regular" />
                    {costEstimate
                      ? `Add to Project • ${costEstimate.displayCostFormatted}`
                      : 'Add to Project'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
