'use client'

import type { CourseAnnouncement } from '@/lib/types/university'

interface AnnouncementCardProps {
  announcement: CourseAnnouncement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const date = new Date(announcement.createdAt)
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-1">
        <h4 className="text-sm font-semibold text-gray-900">{announcement.title}</h4>
        <span className="text-[10px] text-gray-400 shrink-0 ml-3">{formatted}</span>
      </div>
      <p className="text-[11px] text-gray-400 mb-2">by {announcement.professorName}</p>
      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{announcement.body}</p>
    </div>
  )
}
