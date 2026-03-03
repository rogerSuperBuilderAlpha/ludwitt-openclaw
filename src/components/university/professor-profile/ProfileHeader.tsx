'use client'

import Image from 'next/image'
import { User } from '@phosphor-icons/react'
import { SocialLinksBar } from './SocialLinksBar'
import type {
  ProfessorPublicProfile,
  ProfessorAvailability,
} from '@/lib/types/university'

interface ProfileHeaderProps {
  profile: ProfessorPublicProfile
}

const AVAILABILITY_LABEL: Record<
  ProfessorAvailability,
  { text: string; dot: string }
> = {
  accepting: { text: 'Accepting students', dot: 'bg-green-500' },
  limited: { text: 'Limited availability', dot: 'bg-yellow-500' },
  unavailable: { text: 'Unavailable', dot: 'bg-gray-400' },
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const fullName = [profile.title, profile.displayName]
    .filter(Boolean)
    .join(' ')
  const initials = profile.displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const affiliation = [
    profile.position,
    profile.department,
    profile.institution,
  ]
    .filter(Boolean)
    .join(', ')
  const avail = profile.availability
    ? AVAILABILITY_LABEL[profile.availability]
    : null

  return (
    <div className="flex items-start gap-5">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 shrink-0">
        {profile.photoURL ? (
          <Image
            src={profile.photoURL}
            alt={profile.displayName}
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
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-bold text-gray-900">{fullName}</h1>
        {profile.headline && (
          <p className="text-sm text-gray-600 mt-0.5">{profile.headline}</p>
        )}
        {affiliation && (
          <p className="text-xs text-gray-400 mt-1">{affiliation}</p>
        )}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {avail && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
              <span className={`w-2 h-2 rounded-full ${avail.dot}`} />
              {avail.text}
            </span>
          )}
          {profile.location && (
            <span className="text-xs text-gray-400">{profile.location}</span>
          )}
        </div>
        {profile.socialLinks && (
          <div className="mt-3">
            <SocialLinksBar links={profile.socialLinks} />
          </div>
        )}
      </div>
    </div>
  )
}
