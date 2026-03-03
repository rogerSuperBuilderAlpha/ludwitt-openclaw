'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  GoogleDriveLogo,
  MagnifyingGlass,
  X,
  Check,
  ArrowsClockwise,
  SignOut,
  CaretRight,
} from '@phosphor-icons/react'
import { useGoogleDrive } from '@/lib/hooks/customers/useGoogleDrive'

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

interface GoogleDrivePickerProps {
  onSelect: (file: DriveFile) => void
  onCancel: () => void
}

export function GoogleDrivePicker({
  onSelect,
  onCancel,
}: GoogleDrivePickerProps) {
  const {
    isConnected,
    isConnecting,
    driveEmail,
    needsReconnect,
    files,
    isLoadingFiles,
    hasMoreFiles,
    searchQuery,
    setSearchQuery,
    connect,
    disconnect,
    loadFiles,
    loadMoreFiles,
    error,
    clearError,
  } = useGoogleDrive()

  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null)
  const [searchInput, setSearchInput] = useState('')

  // Load files when connected
  useEffect(() => {
    if (isConnected && !files.length && !isLoadingFiles) {
      loadFiles()
    }
  }, [isConnected, files.length, isLoadingFiles, loadFiles])

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput)
        loadFiles(searchInput)
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchInput, searchQuery, setSearchQuery, loadFiles])

  const handleConfirmSelection = useCallback(() => {
    if (selectedFile) {
      onSelect(selectedFile)
    }
  }, [selectedFile, onSelect])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('document')) {
      return (
        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 text-sm font-bold">D</span>
        </div>
      )
    }
    if (mimeType.includes('spreadsheet')) {
      return (
        <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-sm font-bold">S</span>
        </div>
      )
    }
    if (mimeType.includes('presentation')) {
      return (
        <div className="w-8 h-8 rounded bg-yellow-100 flex items-center justify-center">
          <span className="text-yellow-600 text-sm font-bold">P</span>
        </div>
      )
    }
    return (
      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
        <span className="text-gray-600 text-sm font-bold">F</span>
      </div>
    )
  }

  // Not connected state
  if (!isConnected) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <GoogleDriveLogo
              size={20}
              weight="fill"
              className="text-[#4285F4]"
            />
            <span className="font-medium text-gray-900">Google Drive</span>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Connect prompt */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <GoogleDriveLogo size={32} weight="fill" className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {needsReconnect ? 'Reconnect Google Drive' : 'Connect Google Drive'}
          </h3>
          <p className="text-sm text-gray-600 mb-6 max-w-xs mx-auto">
            {needsReconnect
              ? 'Your session has expired. Please reconnect to continue selecting files.'
              : 'Select documents directly from your Google Drive instead of copying links.'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
              <button onClick={clearError} className="ml-2 underline">
                Dismiss
              </button>
            </div>
          )}

          <button
            onClick={connect}
            disabled={isConnecting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isConnecting ? (
              <>
                <ArrowsClockwise size={18} className="animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <GoogleDriveLogo size={18} weight="fill" />
                Connect Google Drive
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-gray-500">
            We only request read-only access to list your files
          </p>
        </div>
      </div>
    )
  }

  // Connected state - file picker
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <GoogleDriveLogo size={20} weight="fill" className="text-[#4285F4]" />
          <span className="font-medium text-gray-900">Select from Drive</span>
          {driveEmail && (
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {driveEmail}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={disconnect}
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
            title="Disconnect"
          >
            <SignOut size={16} />
          </button>
          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="relative">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search your documents..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-100 text-sm text-red-700 flex-shrink-0">
          {error}
          <button onClick={clearError} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* File list */}
      <div className="flex-1 overflow-y-auto">
        {isLoadingFiles && files.length === 0 ? (
          <div className="p-8 text-center">
            <ArrowsClockwise
              size={24}
              className="animate-spin text-gray-400 mx-auto mb-2"
            />
            <p className="text-sm text-gray-500">Loading your documents...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">
              {searchInput
                ? 'No documents match your search'
                : 'No documents found in your Drive'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                  selectedFile?.id === file.id
                    ? 'bg-blue-50 hover:bg-blue-50'
                    : ''
                }`}
              >
                {getFileIcon(file.mimeType)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 truncate">
                      {file.name}
                    </span>
                    {selectedFile?.id === file.id && (
                      <Check
                        size={16}
                        className="text-blue-600 flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>{file.type}</span>
                    <span>•</span>
                    <span>{formatDate(file.modifiedAt)}</span>
                  </div>
                </div>
                <CaretRight size={16} className="text-gray-400 flex-shrink-0" />
              </button>
            ))}

            {hasMoreFiles && (
              <button
                onClick={loadMoreFiles}
                disabled={isLoadingFiles}
                className="w-full px-4 py-3 text-sm text-blue-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isLoadingFiles ? 'Loading...' : 'Load more'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between flex-shrink-0">
        <span className="text-xs text-gray-500">
          {selectedFile
            ? `Selected: ${selectedFile.name}`
            : 'Select a document'}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedFile}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Select Document
          </button>
        </div>
      </div>
    </div>
  )
}
