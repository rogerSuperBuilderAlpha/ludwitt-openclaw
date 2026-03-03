'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, CircleNotch, User } from '@phosphor-icons/react'

interface ProfilePhotoUploadProps {
  photoURL?: string
  displayName: string
  onUpload: (file: File) => Promise<string | null>
  onPhotoURLChange: (url: string) => void
}

export function ProfilePhotoUpload({
  photoURL,
  displayName,
  onUpload,
  onPhotoURLChange,
}: ProfilePhotoUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await onUpload(file)
      if (url) onPhotoURLChange(url)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-gray-400 transition-colors group shrink-0"
      >
        {photoURL ? (
          <Image
            src={photoURL}
            alt={displayName}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : initials ? (
          <span className="flex items-center justify-center w-full h-full text-xl font-semibold text-gray-500">
            {initials}
          </span>
        ) : (
          <User size={32} className="text-gray-400 mx-auto mt-5" />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {uploading ? (
            <CircleNotch size={20} className="text-white animate-spin" />
          ) : (
            <Camera size={20} weight="bold" className="text-white" />
          )}
        </div>
      </button>
      <div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
        >
          {uploading
            ? 'Uploading...'
            : photoURL
              ? 'Change photo'
              : 'Upload photo'}
        </button>
        <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, max 5MB</p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
