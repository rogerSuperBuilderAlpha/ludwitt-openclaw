'use client'

import { useState, useRef } from 'react'
import { User } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import {
  User as UserIcon,
  Camera,
  Check,
  Loader2,
  AlertTriangle,
} from 'lucide-react'
import Image from 'next/image'
import { uploadFile } from '@/lib/firebase/storage'

interface AccountEditSectionProps {
  user: User
  onUserUpdate?: () => void
}

export function AccountEditSection({
  user,
  onUserUpdate,
}: AccountEditSectionProps) {
  const [displayName, setDisplayName] = useState(user.displayName || '')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveDisplayName = async () => {
    if (!displayName.trim()) {
      setError('Display name cannot be empty')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await updateProfile(user, { displayName: displayName.trim() })
      setSuccess('Display name updated successfully!')
      setIsEditing(false)
      onUserUpdate?.()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to update display name')
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setUploadingPhoto(true)
    setError(null)
    setSuccess(null)

    try {
      const extension = file.name.split('.').pop() || 'jpg'
      const storagePath = `profile-photos/${user.uid}/avatar.${extension}`
      const photoURL = await uploadFile(storagePath, file)
      await updateProfile(user, { photoURL })
      setSuccess('Profile photo updated!')
      onUserUpdate?.()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Failed to upload photo')
    } finally {
      setUploadingPhoto(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="b-feedback b-feedback-error b-text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Profile Photo */}
      <div className="flex items-start gap-6">
        <div className="relative group">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || 'User'}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 b-rounded-full b-bg-logic b-text-inverse flex items-center justify-center b-text-2xl b-font-semibold">
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </div>
          )}

          {/* Upload overlay */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
          >
            {uploadingPhoto ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Camera className="w-6 h-6 text-white" />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="flex-1">
          <p className="b-text-sm b-text-secondary b-mb-sm">Profile Photo</p>
          <p className="b-text-xs b-text-muted b-mb-sm">
            Click on your photo to upload a new one. Max size: 5MB.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="b-text-sm b-text-logic b-font-medium disabled:opacity-50"
          >
            {uploadingPhoto ? 'Uploading...' : 'Change photo'}
          </button>
        </div>
      </div>

      {/* Display Name */}
      <div>
        <label
          htmlFor="display-name"
          className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
        >
          Display Name
        </label>
        {isEditing ? (
          <div className="flex gap-2">
            <input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="flex-1 b-input"
              placeholder="Enter your name"
              maxLength={50}
            />
            <button
              onClick={handleSaveDisplayName}
              disabled={loading}
              className="b-btn b-btn-logic b-btn-md flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setDisplayName(user.displayName || '')
                setError(null)
              }}
              className="b-btn b-btn-secondary b-btn-md"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between b-p-sm b-bg-muted b-rounded-lg">
            <span className="b-text-primary">
              {user.displayName || 'Not set'}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="b-text-sm b-text-logic b-font-medium"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Email (read-only for now) */}
      <div>
        <span className="block b-text-sm b-font-medium b-text-secondary b-mb-sm">
          Email Address
        </span>
        <div className="flex items-center justify-between b-p-sm b-bg-muted b-rounded-lg">
          <span className="b-text-primary">{user.email}</span>
          <span className="b-text-xs b-text-muted italic">
            Cannot be changed
          </span>
        </div>
        <p className="b-text-xs b-text-muted mt-1">
          Email changes require verification and are not currently supported.
        </p>
      </div>

      {/* Account Created */}
      <div>
        <span className="block b-text-sm b-font-medium b-text-secondary b-mb-sm">
          Account Created
        </span>
        <div className="b-p-sm b-bg-muted b-rounded-lg">
          <span className="b-text-primary">
            {user.metadata.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )
              : 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  )
}
