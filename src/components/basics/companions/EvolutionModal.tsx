'use client'

/**
 * Evolution Modal Component
 * Multi-step wizard for companion evolution with AI generation
 */

import {
  Star,
  ArrowRight,
  Sparkle,
  CircleNotch,
  Gift,
  Brain,
} from '@phosphor-icons/react'
import { UnifiedModal } from '../UnifiedModal'
import {
  Subject,
  SubjectCompanion,
  GeneratedCompanion,
  EvolutionAttributes,
  PERSONALITY_OPTIONS,
  ELEMENT_OPTIONS,
  STYLE_OPTIONS,
  SPECIALTY_OPTIONS,
  SUBJECT_INFO,
  EVOLUTION_COST_CENTS,
} from '@/data/companions/attributes'

export type EvolutionStep =
  | 'personality'
  | 'element'
  | 'style'
  | 'specialty'
  | 'generating'
  | 'result'

interface EvolutionModalProps {
  isOpen: boolean
  onClose: () => void
  subject: Subject | null
  companion: SubjectCompanion | null
  evolutionStep: EvolutionStep
  selectedAttributes: EvolutionAttributes
  generatedCompanion: GeneratedCompanion | null
  isGenerating: boolean
  userCredits: number
  onAttributeSelect: (key: keyof EvolutionAttributes, value: string) => void
  onNextStep: (step: EvolutionStep) => void
  onGenerate: () => void
  onConfirm: () => void
}

export function EvolutionModal({
  isOpen,
  onClose,
  subject,
  companion,
  evolutionStep,
  selectedAttributes,
  generatedCompanion,
  isGenerating,
  userCredits,
  onAttributeSelect,
  onNextStep,
  onGenerate,
  onConfirm,
}: EvolutionModalProps) {
  if (!subject || !companion) return null

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={() => !isGenerating && onClose()}
      title={
        evolutionStep === 'result'
          ? '✨ Your Companion Evolved!'
          : '✨ Evolution Time!'
      }
      subtitle={
        evolutionStep === 'result'
          ? 'Meet your unique companion'
          : "Choose your companion's traits"
      }
      size="lg"
    >
      <div className="space-y-4">
        {/* Progress indicator */}
        {evolutionStep !== 'result' && evolutionStep !== 'generating' && (
          <div className="flex justify-center gap-2 mb-4">
            {['personality', 'element', 'style', 'specialty'].map((step, i) => (
              <div
                key={step}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor:
                    ['personality', 'element', 'style', 'specialty'].indexOf(
                      evolutionStep
                    ) >= i
                      ? 'var(--b-logic)'
                      : 'var(--b-border)',
                }}
              />
            ))}
          </div>
        )}

        {/* Personality Selection */}
        {evolutionStep === 'personality' && (
          <>
            <div className="text-center mb-4">
              <span className="text-4xl">{companion.currentEmoji}</span>
              <h3 className="font-bold b-text-primary mt-2">
                What personality should {companion.name} have?
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PERSONALITY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onAttributeSelect('personality', opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                    selectedAttributes.personality === opt.id
                      ? 'border-b-logic b-bg-logic-light'
                      : 'b-border b-bg-card hover:border-b-border-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <div className="font-bold b-text-primary">
                        {opt.label}
                      </div>
                      <div className="text-xs b-text-muted">
                        {opt.description}
                      </div>
                    </div>
                  </div>
                  {selectedAttributes.personality === opt.id && (
                    <Star
                      size={16}
                      weight="fill"
                      className="absolute top-2 right-2 text-b-logic"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                selectedAttributes.personality && onNextStep('element')
              }
              disabled={!selectedAttributes.personality}
              className="w-full py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--b-logic)', color: '#ffffff' }}
            >
              Next: Choose Element <ArrowRight size={18} />
            </button>
          </>
        )}

        {/* Element Selection */}
        {evolutionStep === 'element' && (
          <>
            <div className="text-center mb-4">
              <h3 className="font-bold b-text-primary">
                Choose an elemental affinity
              </h3>
              <p className="text-sm b-text-muted">
                This shapes your companion&apos;s appearance
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {ELEMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onAttributeSelect('element', opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center relative bg-gradient-to-br ${opt.color} ${
                    selectedAttributes.element === opt.id
                      ? 'border-white ring-4 ring-b-logic-border scale-105'
                      : 'border-transparent hover:scale-102'
                  }`}
                >
                  <span className="text-3xl block mb-1">{opt.emoji}</span>
                  <div className="font-bold text-white">{opt.label}</div>
                  {selectedAttributes.element === opt.id && (
                    <Star
                      size={16}
                      weight="fill"
                      className="absolute top-2 right-2 text-white"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => selectedAttributes.element && onNextStep('style')}
              disabled={!selectedAttributes.element}
              className="w-full py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--b-logic)', color: '#ffffff' }}
            >
              Next: Choose Style <ArrowRight size={18} />
            </button>
          </>
        )}

        {/* Style Selection */}
        {evolutionStep === 'style' && (
          <>
            <div className="text-center mb-4">
              <h3 className="font-bold b-text-primary">Choose a style</h3>
              <p className="text-sm b-text-muted">
                What kind of creature should they become?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onAttributeSelect('style', opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                    selectedAttributes.style === opt.id
                      ? 'border-b-logic b-bg-logic-light'
                      : 'b-border b-bg-card hover:border-b-border-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <div className="font-bold b-text-primary">
                        {opt.label}
                      </div>
                      <div className="text-xs b-text-muted">
                        {opt.description}
                      </div>
                    </div>
                  </div>
                  {selectedAttributes.style === opt.id && (
                    <Star
                      size={16}
                      weight="fill"
                      className="absolute top-2 right-2 text-b-logic"
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                selectedAttributes.style && onNextStep('specialty')
              }
              disabled={!selectedAttributes.style}
              className="w-full py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--b-logic)', color: '#ffffff' }}
            >
              Next: Choose Specialty <ArrowRight size={18} />
            </button>
          </>
        )}

        {/* Specialty Selection */}
        {evolutionStep === 'specialty' && (
          <>
            <div className="text-center mb-4">
              <h3 className="font-bold b-text-primary">
                Choose a {SUBJECT_INFO[subject].name} specialty
              </h3>
              <p className="text-sm b-text-muted">What should they excel at?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SPECIALTY_OPTIONS[subject].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onAttributeSelect('specialty', opt.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                    selectedAttributes.specialty === opt.id
                      ? 'border-b-logic b-bg-logic-light'
                      : 'b-border b-bg-card hover:border-b-border-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div className="font-bold b-text-primary">{opt.label}</div>
                  </div>
                  {selectedAttributes.specialty === opt.id && (
                    <Star
                      size={16}
                      weight="fill"
                      className="absolute top-2 right-2 text-b-logic"
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <button
                onClick={() => selectedAttributes.specialty && onGenerate()}
                disabled={
                  !selectedAttributes.specialty ||
                  userCredits < EVOLUTION_COST_CENTS
                }
                className="w-full py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{
                  background:
                    'linear-gradient(to right, var(--b-logic), var(--b-latin))',
                  color: '#ffffff',
                }}
              >
                <Sparkle size={18} weight="fill" />
                Generate My Unique Companion!
              </button>
              {userCredits < EVOLUTION_COST_CENTS && (
                <p className="text-xs text-center text-b-danger">
                  Not enough credits
                </p>
              )}
            </div>
          </>
        )}

        {/* Generating */}
        {evolutionStep === 'generating' && (
          <div className="text-center py-12">
            <CircleNotch
              size={48}
              className="text-b-logic animate-spin mx-auto mb-4"
            />
            <h3 className="font-bold b-text-primary text-lg">
              Creating Your Unique Companion...
            </h3>
            <p className="b-text-muted mt-2">
              AI is crafting a one-of-a-kind{' '}
              {PERSONALITY_OPTIONS.find(
                (p) => p.id === selectedAttributes.personality
              )?.label.toLowerCase()}
              ,{' '}
              {ELEMENT_OPTIONS.find(
                (e) => e.id === selectedAttributes.element
              )?.label.toLowerCase()}
              -type companion...
            </p>
          </div>
        )}

        {/* Result */}
        {evolutionStep === 'result' && generatedCompanion && (
          <>
            <div
              className="text-center py-6 rounded-xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--b-logic-light), var(--b-latin-light), var(--b-writing-light))',
              }}
            >
              <div className="text-6xl mb-4 animate-bounce">
                {generatedCompanion.emoji}
              </div>
              <h3 className="font-bold text-2xl b-text-primary">
                {generatedCompanion.name}
              </h3>
              <p className="b-text-secondary mt-2">
                {generatedCompanion.description}
              </p>
              <div
                className="mt-4 inline-block px-4 py-2 rounded-full text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
              >
                <span
                  className="font-medium"
                  style={{ color: 'var(--b-logic)' }}
                >
                  {generatedCompanion.personality}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 b-bg-math-light rounded-lg">
                <div className="flex items-center gap-2 b-text-math">
                  <Brain size={18} />
                  <span className="font-medium">Special Ability:</span>
                </div>
                <p className="text-sm b-text-math mt-1">
                  {generatedCompanion.specialAbility}
                </p>
              </div>

              <div className="p-3 b-bg-writing-light rounded-lg">
                <div className="b-text-writing italic text-center">
                  &ldquo;{generatedCompanion.catchphrase}&rdquo;
                </div>
              </div>

              <div className="p-3 b-bg-reading-light rounded-lg border b-border-reading">
                <div className="flex items-center gap-2 b-text-reading">
                  <Gift size={18} weight="fill" />
                  <span className="font-medium">Evolution Reward:</span>
                </div>
                <p className="text-sm b-text-reading mt-1">
                  {companion.level === 0 && '+2 Free Hints per day'}
                  {companion.level === 1 && '+1 Free AI Explanation per day'}
                  {companion.level === 2 && 'Streak Shield activated!'}
                  {companion.level === 3 && '+3 Free Hints + Skip Protection'}
                  {companion.level === 4 && 'UNLIMITED Free Hints!'}
                </p>
              </div>
            </div>

            <button
              onClick={onConfirm}
              className="w-full py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-lg"
              style={{
                background:
                  'linear-gradient(to right, var(--b-logic), var(--b-latin))',
                color: '#ffffff',
              }}
            >
              <Sparkle size={20} weight="fill" />
              Welcome {generatedCompanion.name}!
            </button>
          </>
        )}
      </div>
    </UnifiedModal>
  )
}
