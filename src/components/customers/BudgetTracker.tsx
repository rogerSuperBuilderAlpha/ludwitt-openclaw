/**
 * Budget Tracker Component
 * Displays budget information, burn rate, and warnings
 */

'use client'

import { AlertTriangle, TrendingUp, Clock, DollarSign } from 'lucide-react'
import {
  BudgetMetrics,
  formatCurrency,
  formatHours,
  getBudgetStatusColor,
} from '@/lib/utils/budget'

interface BudgetTrackerProps {
  metrics: BudgetMetrics
  showDetails?: boolean
  compact?: boolean
}

export function BudgetTracker({
  metrics,
  showDetails = true,
  compact = false,
}: BudgetTrackerProps) {
  if (metrics.budgetType === 'none') {
    return null
  }

  const primaryPercentage =
    metrics.budgetType === 'hours'
      ? metrics.hoursUsedPercentage
      : metrics.amountUsedPercentage

  const statusColor = getBudgetStatusColor(
    primaryPercentage,
    metrics.warningThreshold
  )

  // Compact view - just progress bar with minimal info
  if (compact) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 font-medium">Budget</span>
          <span className={`font-semibold ${statusColor.text}`}>
            {Math.round(primaryPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              metrics.isOverBudget
                ? 'bg-red-600'
                : metrics.isNearingBudget
                  ? 'bg-yellow-600'
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(primaryPercentage, 100)}%` }}
          />
        </div>
        {metrics.isOverBudget && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Over budget
          </p>
        )}
      </div>
    )
  }

  // Full view
  return (
    <div
      className={`rounded-lg border-2 p-4 ${statusColor.bg} ${statusColor.border}`}
    >
      {/* Header with warning */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Budget Tracking</h4>
          <p className="text-xs text-gray-600">
            {metrics.budgetType === 'hours' ? 'Hourly Budget' : 'Fixed Price'}
          </p>
        </div>
        {(metrics.isOverBudget || metrics.isNearingBudget) && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
              metrics.isOverBudget
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            {metrics.isOverBudget ? 'Over Budget' : 'Near Limit'}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {metrics.budgetType === 'hours' ? 'Hours Used' : 'Amount Spent'}
          </span>
          <span className={`text-sm font-bold ${statusColor.text}`}>
            {Math.round(primaryPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              metrics.isOverBudget
                ? 'bg-red-600'
                : metrics.isNearingBudget
                  ? 'bg-yellow-600'
                  : 'bg-green-600'
            }`}
            style={{ width: `${Math.min(primaryPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-3">
          {/* Hours */}
          <div className="bg-white rounded p-2.5 border border-gray-200">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-medium text-gray-600">Time</span>
            </div>
            <div className="text-sm font-bold text-gray-900">
              {formatHours(metrics.actualHours)} /{' '}
              {formatHours(metrics.budgetHours)}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {formatHours(metrics.remainingHours)} remaining
            </div>
          </div>

          {/* Amount */}
          {metrics.hourlyRate > 0 && (
            <div className="bg-white rounded p-2.5 border border-gray-200">
              <div className="flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-medium text-gray-600">Cost</span>
              </div>
              <div className="text-sm font-bold text-gray-900">
                {formatCurrency(metrics.actualAmount)} /{' '}
                {formatCurrency(metrics.budgetAmount)}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {formatCurrency(metrics.remainingAmount)} remaining
              </div>
            </div>
          )}

          {/* Burn Rate */}
          {metrics.burnRateHoursPerDay > 0 && (
            <div className="bg-white rounded p-2.5 border border-gray-200 col-span-2">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-xs font-medium text-gray-600">
                  Burn Rate
                </span>
              </div>
              <div className="text-sm font-bold text-gray-900">
                {formatHours(metrics.burnRateHoursPerDay)} per day
              </div>
              {metrics.estimatedDaysRemaining !== Infinity && (
                <div className="text-xs text-gray-500 mt-0.5">
                  ~{Math.ceil(metrics.estimatedDaysRemaining)} days at current
                  rate
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hourly Rate Info */}
      {showDetails && metrics.hourlyRate > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-300">
          <p className="text-xs text-gray-600">
            Rate: {formatCurrency(metrics.hourlyRate)}/hour
          </p>
        </div>
      )}
    </div>
  )
}
