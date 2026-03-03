/**
 * Memory Update API
 * 
 * Update memory model after a recall attempt.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { MemoryObservation } from '@/lib/personalized-memory/types'
import { 
  getMemoryModel, 
  updateConceptModel,
  storeObservation 
} from '@/lib/personalized-memory/storage'
import { 
  createHalfLifeModel, 
  updateHalfLife,
  predictRetention,
  getOptimalReviewTime 
} from '@/lib/personalized-memory/half-life-regression'

export const dynamic = 'force-dynamic'

interface MemoryUpdateBody {
  conceptId: string
  conceptName: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic'
  recalled: boolean
  responseTimeMs: number
  confidence: number
  reviewType?: 'initial' | 'spaced' | 'remediation' | 'test'
}

/**
 * POST - Update memory after a recall attempt
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Parse body
    const body = await request.json() as MemoryUpdateBody
    
    // Validate required fields
    if (!body.conceptId || !body.conceptName || !body.subject || body.recalled === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Get existing model
    const model = await getMemoryModel(userId)
    
    // Get or create half-life for this concept
    let halfLife = model?.conceptModels.get(body.conceptId)
    
    if (!halfLife) {
      halfLife = createHalfLifeModel(body.conceptId, body.conceptName, body.subject)
    }
    
    // Calculate time since last review
    const now = new Date()
    const timeSinceLastReviewMs = halfLife.lastReview.getTime() === 0
      ? 0 // First review
      : now.getTime() - halfLife.lastReview.getTime()
    
    // Create observation
    const observation: MemoryObservation = {
      conceptId: body.conceptId,
      timestamp: now,
      recalled: body.recalled,
      responseTimeMs: body.responseTimeMs,
      confidence: body.confidence,
      timeSinceLastReviewMs,
      reviewNumber: halfLife.totalReviews + 1,
      reviewType: body.reviewType || 'spaced'
    }
    
    // Update half-life model
    const updatedHalfLife = updateHalfLife(halfLife, observation)
    
    // Store observation
    await storeObservation(userId, observation)
    
    // Update concept model
    await updateConceptModel(userId, updatedHalfLife)
    
    // Calculate next review time
    const nextReviewSeconds = getOptimalReviewTime(updatedHalfLife)
    const nextReviewDate = new Date(now.getTime() + nextReviewSeconds * 1000)
    
    return successResponse({
      message: 'Memory updated',
      conceptId: body.conceptId,
      updated: {
        halfLifeSeconds: Math.round(updatedHalfLife.halfLifeSeconds),
        halfLifeDays: Math.round(updatedHalfLife.halfLifeSeconds / 86400 * 10) / 10,
        calibrationScore: Math.round(updatedHalfLife.calibrationScore * 100),
        totalReviews: updatedHalfLife.totalReviews,
        totalRecalls: updatedHalfLife.totalRecalls,
        successRate: updatedHalfLife.totalReviews > 0
          ? Math.round(updatedHalfLife.totalRecalls / updatedHalfLife.totalReviews * 100)
          : 0
      },
      nextReview: {
        date: nextReviewDate.toISOString(),
        inHours: Math.round(nextReviewSeconds / 3600),
        inDays: Math.round(nextReviewSeconds / 86400 * 10) / 10
      }
    })
    
  } catch (error) {
    return serverError(error, 'Failed to update memory')
  }
}
