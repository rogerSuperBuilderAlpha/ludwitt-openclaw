/**
 * Struggle Detection API
 * 
 * Check current struggle level based on session telemetry.
 * Returns prediction and suggested intervention.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { SessionSignals } from '@/lib/telemetry/types'
import { getTelemetryProfile } from '@/lib/telemetry/storage'
import { extractStruggleFeatures } from '@/lib/struggle-detection/feature-extractor'
import { predictStruggle, shouldIntervene } from '@/lib/struggle-detection/predictor'
import { 
  selectIntervention, 
  shouldDeliverIntervention,
  InterventionContext 
} from '@/lib/struggle-detection/intervention-selector'
import { Intervention } from '@/lib/struggle-detection/types'

export const dynamic = 'force-dynamic'

interface StruggleCheckBody {
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  difficulty: number
  problemType?: string
  problemText?: string
  currentSignals: Partial<SessionSignals>
  previousInterventions?: Intervention[]
  recentPerformance?: {
    lastFiveAccuracy: number
    skillMastery: number
    subjectComfort: number
    timeSinceLastCorrect: number
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Parse body
    const body = await request.json() as StruggleCheckBody
    
    // Validate required fields
    if (!body.problemId || !body.subject || !body.currentSignals) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get user's telemetry profile for context
    const telemetryProfile = await getTelemetryProfile(userId)
    
    // Extract struggle features
    const features = extractStruggleFeatures({
      currentSignals: body.currentSignals,
      problemDifficulty: body.difficulty || 5,
      problemType: body.problemType || 'unknown',
      userProfile: telemetryProfile || undefined,
      recentPerformance: body.recentPerformance
    })
    
    // Predict struggle
    const prediction = predictStruggle(features)
    
    // Check if we should intervene
    const previousInterventions = body.previousInterventions || []
    const shouldDeliver = shouldDeliverIntervention(prediction, previousInterventions)
    
    // Select intervention if needed
    let intervention: Intervention | null = null
    if (shouldDeliver && shouldIntervene(prediction)) {
      const context: InterventionContext = {
        problemId: body.problemId,
        problemText: body.problemText,
        subject: body.subject,
        difficulty: body.difficulty || 5,
        previousInterventions
      }
      
      intervention = selectIntervention(prediction, context)
    }
    
    return successResponse({
      prediction: {
        level: prediction.level,
        probability: prediction.probability,
        confidence: prediction.confidence,
        urgency: prediction.interventionUrgency
      },
      signals: prediction.signals.map(s => ({
        type: s.type,
        strength: s.strength,
        description: s.description
      })),
      shouldIntervene: shouldDeliver && intervention !== null,
      intervention: intervention ? {
        id: intervention.interventionId,
        type: intervention.type,
        severity: intervention.severity,
        message: intervention.message,
        hintContent: intervention.hintContent,
        steps: intervention.steps
      } : null
    })
    
  } catch (error) {
    return serverError(error, 'Failed to check struggle level')
  }
}
