'use client'

interface PlatformStatsSectionProps {
  stats: {
    pathsCreated: number
    totalStudents: number
    deliverablesReviewed: number
    memberSince: string
    lastActive: string
  }
  pathTopics: string[]
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

export function PlatformStatsSection({ stats, pathTopics }: PlatformStatsSectionProps) {
  const statCards = [
    { label: 'Paths Created', value: stats.pathsCreated },
    { label: 'Students', value: stats.totalStudents },
    { label: 'Reviews', value: stats.deliverablesReviewed },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Platform Activity</h3>

      <div className="grid grid-cols-3 gap-3">
        {statCards.map(s => (
          <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-center">
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>Member since {formatDate(stats.memberSince)}</span>
        <span>Active {formatDate(stats.lastActive)}</span>
      </div>

      {pathTopics.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Teaching Topics</p>
          <div className="flex flex-wrap gap-1.5">
            {pathTopics.map(t => (
              <span key={t} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
