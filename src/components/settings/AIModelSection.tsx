/* eslint-disable jsx-a11y/label-has-associated-control */
'use client'

import { useState, useEffect } from 'react'
import {
  Zap,
  Sparkles,
  Crown,
  Check,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
  DollarSign,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'
import {
  useAIPreferences,
  ModelTier,
  TierGroup,
  CostComparison,
} from '@/lib/hooks/useAIPreferences'

interface AIModelSectionProps {
  userId: string
}

const TIER_ICONS: Record<ModelTier, React.ReactNode> = {
  economy: <Zap className="w-5 h-5" />,
  standard: <Sparkles className="w-5 h-5" />,
  premium: <Crown className="w-5 h-5" />,
}

const TIER_COLORS: Record<ModelTier, string> = {
  economy: 'emerald',
  standard: 'blue',
  premium: 'purple',
}

export function AIModelSection({ userId }: AIModelSectionProps) {
  const {
    preferences,
    availableModels,
    costComparison,
    loading,
    error,
    saving,
    setPreferredTier,
    setPreferredModel,
    resetToDefaults,
  } = useAIPreferences()

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  // Show success message temporarily
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const handleTierChange = async (tier: ModelTier) => {
    setLocalError(null)
    const result = await setPreferredTier(tier)
    if (result) {
      setSuccess(true)
    } else {
      setLocalError('Failed to update preference')
    }
  }

  const handleModelChange = async (modelId: string | undefined) => {
    setLocalError(null)
    const result = await setPreferredModel(modelId)
    if (result) {
      setSuccess(true)
    } else {
      setLocalError('Failed to update preference')
    }
  }

  const handleReset = async () => {
    setLocalError(null)
    const result = await resetToDefaults()
    if (result) {
      setSuccess(true)
    } else {
      setLocalError('Failed to reset preferences')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin b-text-muted" />
      </div>
    )
  }

  if (error && !preferences) {
    return (
      <div className="b-feedback b-feedback-error flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )
  }

  const currentTier = preferences?.preferredTier || 'standard'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="b-text-lg b-font-semibold b-text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5 b-text-logic" />
          AI Model Preferences
        </h3>
        <p className="b-text-sm b-text-muted mt-1">
          Choose which AI model to use. Higher tiers cost more credits but
          provide better results.
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          Preferences saved!
        </div>
      )}
      {localError && (
        <div className="b-feedback b-feedback-error b-text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {localError}
        </div>
      )}

      {/* Tier Selection */}
      <div className="space-y-3">
        <label className="b-text-sm b-font-medium b-text-secondary">
          Model Tier
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {availableModels.map((tierGroup) => (
            <TierCard
              key={tierGroup.tier}
              tierGroup={tierGroup}
              costInfo={costComparison.find((c) => c.tier === tierGroup.tier)}
              isSelected={currentTier === tierGroup.tier}
              onSelect={() => handleTierChange(tierGroup.tier)}
              disabled={saving}
            />
          ))}
        </div>
      </div>

      {/* Cost Comparison */}
      <div className="b-bg-muted b-rounded-lg b-p-lg">
        <div className="flex items-center gap-2 b-mb-md">
          <DollarSign className="w-4 h-4 b-text-secondary" />
          <span className="b-text-sm b-font-medium b-text-primary">
            Cost Comparison
          </span>
        </div>
        <p className="b-text-xs b-text-muted mb-3">
          Estimated cost per typical request (500 tokens in/out):
        </p>
        <div className="grid grid-cols-3 gap-2">
          {costComparison.map((cost) => (
            <div
              key={cost.tier}
              className={`text-center b-p-md b-rounded-md ${
                currentTier === cost.tier
                  ? 'b-bg-card ring-1 ring-[var(--b-logic)]'
                  : 'b-bg-subtle'
              }`}
            >
              <div className="b-text-xs b-text-muted capitalize">
                {cost.tier}
              </div>
              <div className="b-text-lg b-font-semibold b-text-primary">
                {cost.estimatedCostCents.toFixed(2)}¢
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 b-text-sm b-text-secondary hover:b-text-primary transition-colors"
        >
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          Advanced Options
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-4 b-border-t b-pt-lg">
          {/* Specific Model Selection */}
          <div className="space-y-3">
            <label className="b-text-sm b-font-medium b-text-secondary">
              Specific Model (Optional)
            </label>
            <p className="b-text-xs b-text-muted">
              Override the tier selection with a specific model.
            </p>
            <select
              value={preferences?.preferredModelId || ''}
              onChange={(e) => handleModelChange(e.target.value || undefined)}
              disabled={saving}
              className="b-input"
            >
              <option value="">Use tier default</option>
              {availableModels.map((tierGroup) => (
                <optgroup
                  key={tierGroup.tier}
                  label={`${tierGroup.tierInfo.icon} ${tierGroup.tierInfo.name}`}
                >
                  {tierGroup.models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} {model.isRecommended && '(Recommended)'}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Info about per-task preferences */}
          <div className="b-bg-muted b-rounded-lg b-p-md flex items-start gap-3">
            <Info className="w-4 h-4 b-text-secondary flex-shrink-0 mt-0.5" />
            <div className="b-text-xs b-text-muted">
              <p className="b-font-medium b-text-secondary mb-1">
                Per-Task Preferences
              </p>
              <p>
                Different AI tasks (grading, explanations, content generation)
                can use different models. Currently, all tasks use your selected
                tier. Per-task customization will be available soon.
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <div className="b-pt-md">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="b-btn b-btn-ghost b-btn-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* Saving Indicator */}
      {saving && (
        <div className="flex items-center gap-2 b-text-sm b-text-muted">
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving...
        </div>
      )}
    </div>
  )
}

interface TierCardProps {
  tierGroup: TierGroup
  costInfo?: CostComparison
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
}

function TierCard({
  tierGroup,
  costInfo,
  isSelected,
  onSelect,
  disabled,
}: TierCardProps) {
  const { tier, tierInfo, models } = tierGroup
  const color = TIER_COLORS[tier]
  const icon = TIER_ICONS[tier]

  // Get the recommended model for display
  const recommendedModel = models.find((m) => m.isRecommended) || models[0]

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative flex flex-col items-start p-4 b-rounded-lg border-2 transition-all text-left
        ${
          isSelected
            ? `border-${color}-500 bg-${color}-50 dark:bg-${color}-950/20`
            : 'b-border hover:b-border-medium'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        borderColor: isSelected
          ? `var(--b-${tier === 'economy' ? 'success' : tier === 'standard' ? 'logic' : 'premium'})`
          : undefined,
        backgroundColor: isSelected
          ? `var(--b-${tier === 'economy' ? 'success' : tier === 'standard' ? 'logic' : 'premium'}-subtle)`
          : undefined,
      }}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `var(--b-${tier === 'economy' ? 'success' : tier === 'standard' ? 'logic' : 'premium'})`,
          }}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Icon and Name */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`${isSelected ? 'b-text-primary' : 'b-text-muted'}`}
          style={{
            color: isSelected
              ? `var(--b-${tier === 'economy' ? 'success' : tier === 'standard' ? 'logic' : 'premium'})`
              : undefined,
          }}
        >
          {icon}
        </div>
        <span
          className={`b-font-semibold ${isSelected ? 'b-text-primary' : 'b-text-secondary'}`}
        >
          {tierInfo.name}
        </span>
      </div>

      {/* Description */}
      <p className="b-text-xs b-text-muted mb-3">{tierInfo.description}</p>

      {/* Model Info */}
      {recommendedModel && (
        <div className="b-text-xs b-text-secondary">
          <span className="b-font-medium">{recommendedModel.name}</span>
        </div>
      )}

      {/* Cost */}
      {costInfo && (
        <div className="mt-2 b-text-sm b-font-semibold b-text-primary">
          ~{costInfo.estimatedCostCents.toFixed(2)}¢/request
        </div>
      )}
    </button>
  )
}
