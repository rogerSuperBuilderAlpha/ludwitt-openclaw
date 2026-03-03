'use client'

/**
 * AvatarOnboarding - Thin orchestrator for the avatar onboarding flow.
 *
 * All state management lives in useAvatarOnboarding. Each step is rendered
 * by a dedicated sub-component under onboarding/avatar/.
 */

import { X, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Portal } from './Portal'
import {
  useAvatarOnboarding,
  BirthdateStep,
  RegionStep,
  AvatarTypeStep,
  AvatarPickStep,
  NicknameStep,
  ReviewStep,
  StepIndicator,
} from '@/components/basics/onboarding/avatar'

interface AvatarOnboardingProps {
  userId: string
  onComplete: () => void
  onSkip?: () => void
}

export function AvatarOnboarding({
  userId,
  onComplete,
  onSkip,
}: AvatarOnboardingProps) {
  const state = useAvatarOnboarding({ userId, onComplete, onSkip })

  const renderStep = () => {
    switch (state.currentStep) {
      case 'birthdate':
        return (
          <BirthdateStep
            birthDate={state.birthDate}
            onBirthDateChange={state.setBirthDate}
            isOver18={state.isOver18}
          />
        )
      case 'region':
        return (
          <RegionStep
            selectedRegion={state.selectedRegion}
            onSelectRegion={state.setSelectedRegion}
          />
        )
      case 'avatar-type':
        return (
          <AvatarTypeStep
            avatarType={state.avatarType}
            onSelectType={state.setAvatarType}
          />
        )
      case 'avatar-pick':
        return (
          <AvatarPickStep
            selectedAvatar={state.selectedAvatar}
            onSelectAvatar={state.setSelectedAvatar}
            selectedCategory={state.selectedCategory}
            onSelectCategory={state.setSelectedCategory}
            filteredAvatars={state.filteredAvatars}
          />
        )
      case 'nickname':
        return (
          <NicknameStep
            nickname={state.nickname}
            onNicknameChange={state.setNickname}
            isOver18={state.isOver18}
            selectedAvatar={state.selectedAvatar}
          />
        )
      case 'review':
        return (
          <ReviewStep
            avatarType={state.avatarType}
            selectedAvatar={state.selectedAvatar}
            nickname={state.nickname}
            selectedRegion={state.selectedRegion}
            isOver18={state.isOver18}
            displayName={state.user?.displayName}
            error={state.error}
            saveAttempts={state.saveAttempts}
            isSubmitting={state.isSubmitting}
            isRetrying={state.isRetrying}
            onRetry={state.handleSubmit}
            onSkip={onSkip ? state.handleSkipForNow : undefined}
          />
        )
      default:
        return null
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          style={{ maxHeight: 'min(90vh, 700px)' }}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                <span className="font-bold text-gray-900">
                  Join the Leaderboard
                </span>
              </div>
              {onSkip && (
                <button
                  onClick={state.handleSkipForNow}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Skip for now"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            <StepIndicator
              steps={state.steps}
              currentStepIndex={state.currentStepIndex}
            />
          </div>

          {/* Content */}
          <div
            className="px-6 pb-6 overflow-y-auto"
            style={{ maxHeight: 'calc(90vh - 200px)' }}
          >
            {renderStep()}
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between gap-3">
              {!state.isFirstStep ? (
                <button
                  onClick={state.goBack}
                  disabled={state.isSubmitting}
                  className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-all font-medium disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {state.isLastStep ? (
                <button
                  onClick={state.handleSubmit}
                  disabled={!state.canProceed() || state.isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:opacity-90 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                >
                  {state.isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="text-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Complete Setup
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={state.goNext}
                  disabled={!state.canProceed()}
                  className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Prominent Skip Button */}
            {onSkip && (
              <div className="mt-3 text-center">
                <button
                  onClick={state.handleSkipForNow}
                  disabled={state.isSubmitting}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skip for now — I&apos;ll do this later
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  )
}
