'use client'

/**
 * MisconceptionHint Component
 * 
 * Displays targeted feedback when a misconception is detected.
 * Shows the misconception description and remediation suggestion.
 * 
 * Part of the Technical Moat integration.
 */

import { useState } from 'react'
import { 
  WarningCircle, 
  Lightbulb, 
  X, 
  CaretDown, 
  CaretUp,
  BookOpen,
  ArrowRight
} from '@phosphor-icons/react'

interface Misconception {
  id: string
  name: string
  description: string
  severity: 'minor' | 'moderate' | 'critical'
  confidence: number
}

interface Remediation {
  type: 'hint' | 'example' | 'review' | 'practice'
  content: string
}

interface MisconceptionHintProps {
  /** The detected misconception */
  misconception: Misconception
  /** Optional remediation suggestion */
  remediation?: Remediation | null
  /** Called when the hint is dismissed */
  onDismiss: () => void
  /** Called when remediation is viewed */
  onRemediationViewed?: () => void
  /** Subject for theming */
  subject?: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
}

export function MisconceptionHint({
  misconception,
  remediation,
  onDismiss,
  onRemediationViewed,
  subject = 'math'
}: MisconceptionHintProps) {
  const [expanded, setExpanded] = useState(false)
  const [showRemediation, setShowRemediation] = useState(false)
  
  // Get severity color
  const getSeverityColor = () => {
    switch (misconception.severity) {
      case 'minor': return '#f59e0b' // amber
      case 'moderate': return '#f97316' // orange
      case 'critical': return '#ef4444' // red
      default: return '#f59e0b'
    }
  }
  
  const getSeverityBg = () => {
    switch (misconception.severity) {
      case 'minor': return '#fef3c7' // amber-100
      case 'moderate': return '#ffedd5' // orange-100
      case 'critical': return '#fee2e2' // red-100
      default: return '#fef3c7'
    }
  }
  
  const getSeverityLabel = () => {
    switch (misconception.severity) {
      case 'minor': return 'Common confusion'
      case 'moderate': return 'Important to address'
      case 'critical': return 'Key concept to review'
      default: return 'Misconception detected'
    }
  }
  
  // Get remediation icon
  const getRemediationIcon = () => {
    switch (remediation?.type) {
      case 'hint': return <Lightbulb size={16} weight="fill" />
      case 'example': return <BookOpen size={16} weight="fill" />
      case 'review': return <BookOpen size={16} weight="fill" />
      case 'practice': return <ArrowRight size={16} weight="fill" />
      default: return <Lightbulb size={16} weight="fill" />
    }
  }
  
  const handleRemediationClick = () => {
    setShowRemediation(true)
    onRemediationViewed?.()
  }
  
  return (
    <div 
      className="rounded-lg border p-4"
      style={{ 
        backgroundColor: getSeverityBg(),
        borderColor: getSeverityColor()
      }}
    >
      <div className="flex items-start gap-3">
        {/* Warning icon */}
        <div className="flex-shrink-0 mt-0.5">
          <WarningCircle 
            size={20} 
            weight="fill" 
            style={{ color: getSeverityColor() }} 
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ 
                backgroundColor: getSeverityColor(),
                color: 'white'
              }}
            >
              {getSeverityLabel()}
            </span>
            <span className="text-xs" style={{ color: 'var(--b-text-muted)' }}>
              {Math.round(misconception.confidence * 100)}% match
            </span>
          </div>
          
          {/* Misconception name */}
          <h4 
            className="font-medium text-sm mb-1"
            style={{ color: 'var(--b-text-primary)' }}
          >
            {misconception.name}
          </h4>
          
          {/* Description (collapsible) */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs transition-colors mb-2"
            style={{ color: getSeverityColor() }}
          >
            {expanded ? 'Hide details' : 'Learn more'}
            {expanded ? <CaretUp size={12} /> : <CaretDown size={12} />}
          </button>
          
          {expanded && (
            <p 
              className="text-sm mb-3 p-3 rounded-lg"
              style={{ 
                color: 'var(--b-text-secondary)',
                backgroundColor: 'rgba(255,255,255,0.5)'
              }}
            >
              {misconception.description}
            </p>
          )}
          
          {/* Remediation */}
          {remediation && !showRemediation && (
            <button
              onClick={handleRemediationClick}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{ 
                backgroundColor: 'var(--b-bg-card)',
                color: 'var(--b-text-primary)',
                border: '1px solid var(--b-border-default)'
              }}
            >
              {getRemediationIcon()}
              {remediation.type === 'hint' && 'Get a hint'}
              {remediation.type === 'example' && 'See an example'}
              {remediation.type === 'review' && 'Review concept'}
              {remediation.type === 'practice' && 'Try a simpler problem'}
            </button>
          )}
          
          {showRemediation && remediation && (
            <div 
              className="p-3 rounded-lg border text-sm"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderColor: 'var(--b-border-default)',
                color: 'var(--b-text-primary)'
              }}
            >
              <div className="flex items-start gap-2">
                <div style={{ color: getSeverityColor() }}>
                  {getRemediationIcon()}
                </div>
                <p>{remediation.content}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
          title="Dismiss"
        >
          <X size={16} style={{ color: 'var(--b-text-muted)' }} />
        </button>
      </div>
    </div>
  )
}
