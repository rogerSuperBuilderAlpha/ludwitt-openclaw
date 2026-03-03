'use client'

import { CircleNotch, MagnifyingGlass } from '@phosphor-icons/react'
import { useExplorationSessions } from '@/lib/hooks/useExplorationSessions'
import { ExplorationSessionCard } from './ExplorationSessionCard'

interface ExplorationSessionsListProps {
  courseId?: string
  onSelectSession: (sessionId: string) => void
}

export function ExplorationSessionsList({ courseId, onSelectSession }: ExplorationSessionsListProps) {
  const { sessions, loading, error } = useExplorationSessions(courseId)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <CircleNotch size={20} className="text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <p className="text-xs text-red-500">{error}</p>
  }

  if (sessions.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
        <MagnifyingGlass size={24} weight="duotone" className="text-gray-300 mx-auto mb-2" />
        <p className="text-xs text-gray-500">No explorations yet. Start one to research a topic in depth.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sessions.map(session => (
        <ExplorationSessionCard
          key={session.id}
          session={session}
          onClick={() => onSelectSession(session.id)}
        />
      ))}
    </div>
  )
}
