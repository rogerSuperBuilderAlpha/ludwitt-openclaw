'use client'

/**
 * StruggleIntervention Component
 * 
 * Displays proactive help when struggle is detected.
 * Part of the Technical Moat integration.
 * 
 * Shows different intervention types:
 * - Encouragement (gentle)
 * - Hints (moderate)
 * - Guided walkthrough (strong)
 */

import { useState } from 'react'
import { 
  Lightbulb, 
  Heart, 
  Steps, 
  X, 
  CheckCircle,
  ArrowRight,
  Sparkle
} from '@phosphor-icons/react'

interface Intervention {
  id: string
  type: string
  severity: 'subtle' | 'moderate' | 'significant'
  message: string
  hintContent?: string
  steps?: string[]
}

interface StruggleInterventionProps {
  /** The intervention to display */
  intervention: Intervention
  /** Called when intervention is dismissed */
  onDismiss: (accepted: boolean) => void
  /** Subject for theming */
  subject?: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
}

export function StruggleIntervention({
  intervention,
  onDismiss,
  subject = 'math'
}: StruggleInterventionProps) {
  const [expanded, setExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  // Get subject color
  const getSubjectColor = () => {
    switch (subject) {
      case 'math': return 'var(--b-math, #3b82f6)'
      case 'reading': return 'var(--b-reading, #10b981)'
      case 'latin': return 'var(--b-latin, #d97706)'
      case 'greek': return 'var(--b-greek, #0ea5e9)'
      case 'logic': return 'var(--b-logic, #8b5cf6)'
      default: return 'var(--b-math, #3b82f6)'
    }
  }
  
  const getSubjectBg = () => {
    switch (subject) {
      case 'math': return 'var(--b-math-light, #dbeafe)'
      case 'reading': return 'var(--b-reading-light, #d1fae5)'
      case 'latin': return 'var(--b-latin-light, #fef3c7)'
      case 'greek': return 'var(--b-greek-light, #e0f2fe)'
      case 'logic': return 'var(--b-logic-light, #ede9fe)'
      default: return 'var(--b-math-light, #dbeafe)'
    }
  }
  
  // Get icon based on intervention type
  const getIcon = () => {
    switch (intervention.type) {
      case 'encouragement':
        return <Heart size={24} weight="fill" style={{ color: getSubjectColor() }} />
      case 'hint':
        return <Lightbulb size={24} weight="fill" style={{ color: getSubjectColor() }} />
      case 'guided_walkthrough':
        return <Steps size={24} weight="fill" style={{ color: getSubjectColor() }} />
      case 'break_suggestion':
        return <Sparkle size={24} weight="fill" style={{ color: getSubjectColor() }} />
      default:
        return <Lightbulb size={24} weight="fill" style={{ color: getSubjectColor() }} />
    }
  }
  
  // Render content based on intervention type
  const renderContent = () => {
    switch (intervention.type) {
      case 'encouragement':
        return (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: 'var(--b-text-secondary)' }}>
              {intervention.message}
            </p>
            <button
              onClick={() => onDismiss(true)}
              className="text-sm font-medium flex items-center gap-1 transition-colors"
              style={{ color: getSubjectColor() }}
            >
              Keep going! <ArrowRight size={14} />
            </button>
          </div>
        )
        
      case 'hint':
        return (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: 'var(--b-text-secondary)' }}>
              {intervention.message}
            </p>
            {!expanded && intervention.hintContent && (
              <button
                onClick={() => setExpanded(true)}
                className="text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ color: getSubjectColor() }}
              >
                Show hint <Lightbulb size={14} />
              </button>
            )}
            {expanded && intervention.hintContent && (
              <div 
                className="p-3 rounded-lg text-sm"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderLeft: `3px solid ${getSubjectColor()}`
                }}
              >
                {intervention.hintContent}
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => onDismiss(true)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ backgroundColor: getSubjectColor(), color: 'white' }}
              >
                Got it!
              </button>
              <button
                onClick={() => onDismiss(false)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ backgroundColor: 'var(--b-bg-muted)', color: 'var(--b-text-secondary)' }}
              >
                Not now
              </button>
            </div>
          </div>
        )
        
      case 'guided_walkthrough':
        return (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: 'var(--b-text-secondary)' }}>
              {intervention.message}
            </p>
            {intervention.steps && intervention.steps.length > 0 && (
              <div className="space-y-2">
                {intervention.steps.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-start gap-2 p-2 rounded-lg transition-all ${
                      idx <= currentStep ? 'opacity-100' : 'opacity-50'
                    }`}
                    style={{ 
                      backgroundColor: idx === currentStep ? 'rgba(255,255,255,0.7)' : 'transparent'
                    }}
                  >
                    <span 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ 
                        backgroundColor: idx < currentStep ? getSubjectColor() : 'var(--b-bg-muted)',
                        color: idx < currentStep ? 'white' : 'var(--b-text-secondary)'
                      }}
                    >
                      {idx < currentStep ? <CheckCircle size={14} weight="fill" /> : idx + 1}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--b-text-primary)' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              {currentStep < (intervention.steps?.length || 1) - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1"
                  style={{ backgroundColor: getSubjectColor(), color: 'white' }}
                >
                  Next step <ArrowRight size={12} />
                </button>
              ) : (
                <button
                  onClick={() => onDismiss(true)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1"
                  style={{ backgroundColor: getSubjectColor(), color: 'white' }}
                >
                  I understand <CheckCircle size={12} />
                </button>
              )}
              <button
                onClick={() => onDismiss(false)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ backgroundColor: 'var(--b-bg-muted)', color: 'var(--b-text-secondary)' }}
              >
                Skip
              </button>
            </div>
          </div>
        )
        
      case 'break_suggestion':
        return (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: 'var(--b-text-secondary)' }}>
              {intervention.message}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onDismiss(true)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ backgroundColor: getSubjectColor(), color: 'white' }}
              >
                Take a break
              </button>
              <button
                onClick={() => onDismiss(false)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                style={{ backgroundColor: 'var(--b-bg-muted)', color: 'var(--b-text-secondary)' }}
              >
                Keep working
              </button>
            </div>
          </div>
        )
        
      default:
        return (
          <div className="space-y-3">
            <p className="text-sm" style={{ color: 'var(--b-text-secondary)' }}>
              {intervention.message}
            </p>
            <button
              onClick={() => onDismiss(true)}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
              style={{ backgroundColor: getSubjectColor(), color: 'white' }}
            >
              Okay
            </button>
          </div>
        )
    }
  }
  
  return (
    <div 
      className="rounded-lg border p-4 animate-fadeIn"
      style={{ 
        backgroundColor: getSubjectBg(),
        borderColor: getSubjectColor(),
        borderWidth: '1px'
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
        
        {/* Dismiss button */}
        <button
          onClick={() => onDismiss(false)}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
          title="Dismiss"
        >
          <X size={16} style={{ color: 'var(--b-text-muted)' }} />
        </button>
      </div>
    </div>
  )
}
