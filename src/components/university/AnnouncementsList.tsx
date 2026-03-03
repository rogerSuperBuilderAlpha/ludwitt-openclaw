'use client'

import { CircleNotch, Megaphone } from '@phosphor-icons/react'
import { useCourseAnnouncements } from '@/lib/hooks/useCourseAnnouncements'
import { AnnouncementCard } from './AnnouncementCard'

interface AnnouncementsListProps {
  sourcePathId: string | undefined
}

export function AnnouncementsList({ sourcePathId }: AnnouncementsListProps) {
  const { announcements, loading, error } = useCourseAnnouncements(sourcePathId)

  if (!sourcePathId) return null

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4">
        <CircleNotch size={14} className="text-gray-400 animate-spin" />
        <span className="text-xs text-gray-400">Loading announcements...</span>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-xs text-red-500 py-2">{error}</p>
    )
  }

  if (announcements.length === 0) return null

  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center gap-1.5">
        <Megaphone size={14} weight="bold" className="text-gray-500" />
        <h3 className="text-sm font-medium text-gray-900">
          Announcements ({announcements.length})
        </h3>
      </div>
      {announcements.map(a => (
        <AnnouncementCard key={a.id} announcement={a} />
      ))}
    </div>
  )
}
