import {
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Sparkles,
} from 'lucide-react'

type Analytics = {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalValue: number
  approvedCount: number
  pendingCount: number
}

type SidebarAnalyticsProps = {
  analytics: Analytics
  onCreateCohort?: () => void
}

export function SidebarAnalytics({ analytics }: SidebarAnalyticsProps) {
  const totalIterations = analytics.approvedCount + analytics.pendingCount
  const inProgressCount = analytics.approvedCount

  // Calculate momentum score (0-100)
  // Based on ratio of in-progress work and recent activity
  const momentumScore = Math.min(
    Math.round(
      (inProgressCount / Math.max(totalIterations, 1)) * 100 +
        (analytics.pendingCount > 0 ? 20 : 0)
    ),
    100
  )

  const getMomentumLabel = () => {
    if (momentumScore >= 80)
      return { label: 'Excellent!', color: 'text-green-600', bg: 'bg-green-50' }
    if (momentumScore >= 50)
      return { label: 'Good pace', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (momentumScore >= 20)
      return {
        label: 'Getting started',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      }
    return { label: 'Ready to begin', color: 'text-gray-600', bg: 'bg-gray-50' }
  }

  const momentum = getMomentumLabel()

  return (
    <div className="p-4 space-y-4">
      {/* Momentum Card */}
      <div className={`p-4 rounded-xl ${momentum.bg} border border-opacity-50`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${momentum.color}`} />
            <span className="text-sm font-semibold text-gray-800">
              Momentum
            </span>
          </div>
          <span className={`text-xs font-bold ${momentum.color}`}>
            {momentum.label}
          </span>
        </div>

        {/* Momentum Bar */}
        <div className="relative">
          <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${
                momentumScore >= 80
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                  : momentumScore >= 50
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-500'
                    : momentumScore >= 20
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-gray-300'
              }`}
              style={{ width: `${Math.max(momentumScore, 5)}%` }}
            />
          </div>
          {momentumScore > 0 && (
            <div
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
              style={{ left: `${Math.max(momentumScore - 5, 0)}%` }}
            >
              <Sparkles className={`w-4 h-4 ${momentum.color} animate-pulse`} />
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2">
        {/* Active */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-[10px] uppercase tracking-wide font-semibold text-purple-700">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {inProgressCount}
          </p>
        </div>

        {/* Pending */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] uppercase tracking-wide font-semibold text-amber-700">
              Pending
            </span>
          </div>
          <p className="text-2xl font-bold text-amber-900">
            {analytics.pendingCount}
          </p>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-700">
            Your Journey
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Projects</span>
            <span className="text-sm font-bold text-gray-900">
              {analytics.totalProjects}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Total Iterations</span>
            <span className="text-sm font-bold text-gray-900">
              {totalIterations}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Completed
            </span>
            <span className="text-sm font-bold text-green-600">
              {analytics.completedProjects}
            </span>
          </div>
        </div>
      </div>

      {/* Encouragement */}
      {totalIterations > 0 && (
        <div className="text-center p-3 bg-blue-50/50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700">
            {analytics.pendingCount > 0
              ? `🎯 Approve pending docs to keep momentum!`
              : inProgressCount > 0
                ? `⚡ Work in progress - check back soon!`
                : `✨ Great progress! Start your next iteration.`}
          </p>
        </div>
      )}
    </div>
  )
}
