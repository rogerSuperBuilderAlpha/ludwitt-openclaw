/**
 * Break Intervention Component
 *
 * Displays research-based break suggestions to prevent:
 * - Eye strain (20-20-20 rule)
 * - Cognitive overload (Pomodoro technique)
 * - Physical fatigue (movement breaks)
 */

'use client'

import { BreakIntervention as BreakInterventionType } from '@/lib/hooks/useWorkTimer'
import { X, CheckCircle } from '@phosphor-icons/react'
import FocusTrap from 'focus-trap-react'
import { Portal } from './Portal'

interface BreakInterventionProps {
  intervention: BreakInterventionType
  onComplete: () => void
  onSkip: () => void
}

export function BreakIntervention({
  intervention,
  onComplete,
  onSkip,
}: BreakInterventionProps) {
  const getColorClasses = () => {
    switch (intervention.type) {
      case 'eye':
        return {
          bg: 'from-b-math to-b-info',
          border: 'b-border-math',
          button: 'b-bg-math hover:bg-b-text-math',
          iconBg: 'b-bg-math-light',
        }
      case 'cognitive':
        return {
          bg: 'from-b-logic to-b-latin',
          border: 'b-border-logic',
          button: 'b-bg-logic hover:bg-b-text-logic',
          iconBg: 'b-bg-logic-light',
        }
      case 'physical':
        return {
          bg: 'from-b-reading to-b-success',
          border: 'b-border-reading',
          button: 'b-bg-reading hover:bg-b-text-reading',
          iconBg: 'b-bg-reading-light',
        }
      case 'long':
        return {
          bg: 'from-b-writing to-b-latin',
          border: 'b-border-writing',
          button: 'b-btn-writing',
          iconBg: 'b-bg-writing-light',
        }
      default:
        return {
          bg: 'from-b-text-secondary to-b-text-muted',
          border: 'b-border',
          button: 'b-btn-secondary',
          iconBg: 'b-bg-muted',
        }
    }
  }

  const colors = getColorClasses()

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="break-intervention-title"
            className={`relative b-bg-card rounded-2xl shadow-b-modal max-w-md w-full mx-4 border-2 ${colors.border} animate-slideUp`}
          >
            {/* Close button */}
            <button
              onClick={onSkip}
              className="absolute top-4 right-4 b-text-muted hover:b-text-secondary transition-colors"
              aria-label="Skip break"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.bg} p-6 rounded-t-2xl`}>
              <div className="flex items-center gap-4">
                <div className={`${colors.iconBg} rounded-full p-3`}>
                  <span className="text-3xl">{intervention.icon}</span>
                </div>
                <div className="flex-1">
                  <h2
                    id="break-intervention-title"
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {intervention.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="b-text-secondary text-lg mb-6 leading-relaxed">
                {intervention.message}
              </p>

              {/* Action suggestion */}
              <div className={`${colors.iconBg} rounded-lg p-4 mb-6`}>
                <p className="text-sm font-medium b-text-secondary">
                  <span className="font-bold">💡 Action:</span>{' '}
                  {intervention.action}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onComplete}
                  className={`flex-1 ${colors.button} text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
                >
                  <CheckCircle size={20} weight="bold" />
                  I&apos;m Ready to Continue
                </button>
                <button
                  onClick={onSkip}
                  className="px-4 py-3 b-text-secondary hover:b-text-primary font-medium transition-colors"
                >
                  Skip
                </button>
              </div>

              {/* Research note */}
              <p className="text-xs b-text-muted mt-4 text-center">
                💡 Regular breaks improve focus and reduce eye strain
              </p>
            </div>
          </div>
        </FocusTrap>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-slideUp {
            animation: slideUp 0.4s ease-out;
          }
        `}</style>
      </div>
    </Portal>
  )
}
