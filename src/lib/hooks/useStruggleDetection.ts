'use client'

/**
 * useStruggleDetection Hook
 * 
 * Monitors learning session for signs of struggle and triggers interventions.
 * Polls the struggle detection API every 10 seconds with current telemetry signals.
 * 
 * Part of the Technical Moat integration.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '@/components/auth/ClientProvider'
import { useApiFetch } from '@/lib/hooks/useApiFetch'
import { SessionSignals } from '@/lib/telemetry/types'
import { Intervention } from '@/lib/struggle-detection/types'

// ============================================================================
// Types
// ============================================================================

interface StrugglePrediction {
  level: 'none' | 'mild' | 'moderate' | 'severe'
  probability: number
  confidence: number
  urgency: 'none' | 'low' | 'medium' | 'high' | 'critical'
}

interface StruggleSignal {
  type: string
  strength: number
  description: string
}

interface InterventionResponse {
  id: string
  type: string
  severity: 'subtle' | 'moderate' | 'significant'
  message: string
  hintContent?: string
  steps?: string[]
}

interface UseStruggleDetectionOptions {
  /** Problem ID being worked on */
  problemId: string
  /** Subject being studied */
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  /** Problem difficulty (1-10) */
  difficulty: number
  /** Optional problem type for context */
  problemType?: string
  /** Optional problem text for context */
  problemText?: string
  /** Function to get current telemetry signals */
  getCurrentSignals: () => Partial<SessionSignals>
  /** Polling interval in ms (default: 10000) */
  pollIntervalMs?: number
  /** Enable/disable polling */
  enabled?: boolean
  /** Recent performance for context */
  recentPerformance?: {
    lastFiveAccuracy: number
    skillMastery: number
    subjectComfort: number
    timeSinceLastCorrect: number
  }
}

interface UseStruggleDetectionReturn {
  /** Current struggle prediction */
  prediction: StrugglePrediction | null
  /** Struggle signals detected */
  signals: StruggleSignal[]
  /** Whether we should show an intervention */
  shouldIntervene: boolean
  /** Current intervention (if any) */
  intervention: InterventionResponse | null
  /** List of interventions shown this session */
  previousInterventions: Intervention[]
  /** Loading state */
  isChecking: boolean
  /** Error state */
  error: string | null
  /** Manually trigger a check */
  checkNow: () => Promise<void>
  /** Mark intervention as shown/dismissed */
  dismissIntervention: (accepted: boolean) => void
  /** Reset the detection (e.g., for new problem) */
  reset: () => void
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useStruggleDetection({
  problemId,
  subject,
  difficulty,
  problemType,
  problemText,
  getCurrentSignals,
  pollIntervalMs = 10000,
  enabled = true,
  recentPerformance
}: UseStruggleDetectionOptions): UseStruggleDetectionReturn {
  const { user } = useAuth()
  const fetchApi = useApiFetch()
  
  // State
  const [prediction, setPrediction] = useState<StrugglePrediction | null>(null)
  const [signals, setSignals] = useState<StruggleSignal[]>([])
  const [shouldIntervene, setShouldIntervene] = useState(false)
  const [intervention, setIntervention] = useState<InterventionResponse | null>(null)
  const [previousInterventions, setPreviousInterventions] = useState<Intervention[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Refs
  const lastCheckRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // ============================================================================
  // Check for Struggle
  // ============================================================================
  
  const checkStruggle = useCallback(async () => {
    if (!user || !enabled) return
    
    // Debounce - don't check too frequently
    const now = Date.now()
    if (now - lastCheckRef.current < 5000) return
    lastCheckRef.current = now
    
    setIsChecking(true)
    setError(null)
    
    try {
      const currentSignals = getCurrentSignals()
      
      const result = await fetchApi('/api/struggle/check', {
        method: 'POST',
        body: JSON.stringify({
          problemId,
          subject,
          difficulty,
          problemType,
          problemText,
          currentSignals,
          previousInterventions,
          recentPerformance
        })
      })
      
      if (result?.prediction) {
        setPrediction(result.prediction)
        setSignals(result.signals || [])
        setShouldIntervene(result.shouldIntervene || false)
        setIntervention(result.intervention || null)
      }
    } catch (err) {
      // Don't log errors for network issues (Safari ITP, connection drops)
      // These are expected during page transitions and don't affect functionality
      const message = err instanceof Error ? err.message : 'Failed to check struggle level'
      if (!message.includes('access control') && !message.includes('Failed to fetch')) {
        setError(message)
      }
      // Silently ignore - struggle detection is non-critical
    } finally {
      setIsChecking(false)
    }
  }, [
    user,
    enabled,
    problemId,
    subject,
    difficulty,
    problemType,
    problemText,
    getCurrentSignals,
    previousInterventions,
    recentPerformance,
    fetchApi
  ])
  
  // ============================================================================
  // Polling
  // ============================================================================
  
  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    
    // Initial check after a short delay
    const initialTimeout = setTimeout(() => {
      checkStruggle()
    }, 5000)
    
    // Set up polling
    intervalRef.current = setInterval(checkStruggle, pollIntervalMs)
    
    return () => {
      clearTimeout(initialTimeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [enabled, pollIntervalMs, checkStruggle])
  
  // ============================================================================
  // Reset on problem change
  // ============================================================================
  
  useEffect(() => {
    // Reset state when problem changes
    setPrediction(null)
    setSignals([])
    setShouldIntervene(false)
    setIntervention(null)
    setError(null)
    lastCheckRef.current = 0
    // Note: previousInterventions are kept across problems for session context
  }, [problemId])
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const checkNow = useCallback(async () => {
    lastCheckRef.current = 0 // Reset debounce
    await checkStruggle()
  }, [checkStruggle])
  
  const dismissIntervention = useCallback((accepted: boolean) => {
    if (intervention) {
      // Track the intervention as shown
      const interventionRecord: Intervention = {
        interventionId: intervention.id,
        type: intervention.type as Intervention['type'],
        severity: intervention.severity,
        message: intervention.message,
        hintContent: intervention.hintContent,
        steps: intervention.steps,
        triggeredBy: [], // Not tracked client-side
        timestamp: new Date()
      }
      setPreviousInterventions(prev => [...prev, interventionRecord])
    }
    
    // Clear current intervention
    setIntervention(null)
    setShouldIntervene(false)
  }, [intervention])
  
  const reset = useCallback(() => {
    setPrediction(null)
    setSignals([])
    setShouldIntervene(false)
    setIntervention(null)
    setPreviousInterventions([])
    setError(null)
    lastCheckRef.current = 0
  }, [])
  
  // ============================================================================
  // Return
  // ============================================================================
  
  return {
    prediction,
    signals,
    shouldIntervene,
    intervention,
    previousInterventions,
    isChecking,
    error,
    checkNow,
    dismissIntervention,
    reset
  }
}
