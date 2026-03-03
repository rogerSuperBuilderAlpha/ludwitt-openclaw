'use client'

/**
 * useMisconceptionDetection Hook
 * 
 * Detects common misconceptions when a student answers incorrectly.
 * Shows targeted hints and remediation suggestions.
 * 
 * Part of the Technical Moat integration.
 */

import { useState, useCallback } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'

// ============================================================================
// Types
// ============================================================================

interface DetectedMisconception {
  id: string
  name: string
  description: string
  severity: 'minor' | 'moderate' | 'critical'
  confidence: number
  matchedPatterns: string[]
}

interface SuggestedRemediation {
  type: 'hint' | 'example' | 'review' | 'practice'
  content: string
  priority: number
}

interface MisconceptionDetectionResult {
  detected: boolean
  misconceptions: DetectedMisconception[]
  suggestedRemediation?: SuggestedRemediation[]
}

interface UseMisconceptionDetectionOptions {
  /** Subject being studied */
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
}

interface UseMisconceptionDetectionReturn {
  /** Last detection result */
  result: MisconceptionDetectionResult | null
  /** Primary detected misconception (if any) */
  primaryMisconception: DetectedMisconception | null
  /** Suggested remediation (if any) */
  remediation: SuggestedRemediation | null
  /** Loading state */
  isDetecting: boolean
  /** Error state */
  error: string | null
  /** Detect misconceptions for a wrong answer */
  detect: (params: {
    problemId: string
    studentAnswer: string
    correctAnswer: string
    problemType: string
    difficulty: number
    skills: string[]
    problemText?: string
  }) => Promise<MisconceptionDetectionResult | null>
  /** Clear the detection result */
  clear: () => void
  /** Mark remediation as viewed */
  markRemediationViewed: () => void
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useMisconceptionDetection({
  subject
}: UseMisconceptionDetectionOptions): UseMisconceptionDetectionReturn {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  
  // State
  const [result, setResult] = useState<MisconceptionDetectionResult | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remediationViewed, setRemediationViewed] = useState(false)
  
  // ============================================================================
  // Detect Misconceptions
  // ============================================================================
  
  const detect = useCallback(async (params: {
    problemId: string
    studentAnswer: string
    correctAnswer: string
    problemType: string
    difficulty: number
    skills: string[]
    problemText?: string
  }): Promise<MisconceptionDetectionResult | null> => {
    if (!user) return null
    
    setIsDetecting(true)
    setError(null)
    setRemediationViewed(false)
    
    try {
      const response = await fetchApi('/api/misconceptions/detect', {
        method: 'POST',
        body: JSON.stringify({
          ...params,
          subject
        })
      })
      
      if (response) {
        const detectionResult: MisconceptionDetectionResult = {
          detected: response.detected || false,
          misconceptions: response.misconceptions || [],
          suggestedRemediation: response.suggestedRemediation || []
        }
        setResult(detectionResult)
        return detectionResult
      }
      
      return null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to detect misconceptions'
      setError(errorMessage)
      return null
    } finally {
      setIsDetecting(false)
    }
  }, [user, subject, fetchApi])
  
  // ============================================================================
  // Derived State
  // ============================================================================
  
  const primaryMisconception = result?.detected && result.misconceptions.length > 0
    ? result.misconceptions.reduce((highest, current) => 
        current.confidence > highest.confidence ? current : highest
      )
    : null
  
  const remediation = !remediationViewed && result?.suggestedRemediation && result.suggestedRemediation.length > 0
    ? result.suggestedRemediation.reduce((highest, current) => 
        current.priority > highest.priority ? current : highest
      )
    : null
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const clear = useCallback(() => {
    setResult(null)
    setError(null)
    setRemediationViewed(false)
  }, [])
  
  const markRemediationViewed = useCallback(() => {
    setRemediationViewed(true)
  }, [])
  
  // ============================================================================
  // Return
  // ============================================================================
  
  return {
    result,
    primaryMisconception,
    remediation,
    isDetecting,
    error,
    detect,
    clear,
    markRemediationViewed
  }
}
