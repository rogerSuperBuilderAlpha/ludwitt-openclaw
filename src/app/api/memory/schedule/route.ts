/**
 * Memory Schedule API
 * 
 * Generate and retrieve personalized review schedules.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { getMemoryModel, getMemoryStats } from '@/lib/personalized-memory/storage'
import { 
  generateReviewSchedule, 
  getScheduleSummary,
  getDueConcepts 
} from '@/lib/personalized-memory/scheduler'

export const dynamic = 'force-dynamic'

/**
 * GET - Get personalized review schedule
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult
    
    // Get query params
    const { searchParams } = new URL(request.url)
    const maxItems = parseInt(searchParams.get('maxItems') || '20', 10)
    const subject = searchParams.get('subject') as string | null
    
    // Get memory model with error handling
    let model = null
    try {
      model = await getMemoryModel(userId)
    } catch (modelError) {
      apiLogger.apiError('memory/schedule', 'Error fetching memory model', modelError)
      // Return gracefully instead of 500
      return successResponse({
        hasModel: false,
        schedule: null,
        stats: null,
        message: 'Unable to load memory model. Please try again later.'
      })
    }
    
    if (!model || !model.conceptModels || model.conceptModels.size === 0) {
      return successResponse({
        hasModel: false,
        schedule: null,
        stats: null,
        message: 'No memory model found. Start learning to build your personalized schedule!'
      })
    }
    
    // Generate schedule with error handling
    let schedule
    try {
      schedule = generateReviewSchedule(model, {
        maxItems,
        includeNotDue: true
      })
    } catch (scheduleError) {
      apiLogger.apiError('memory/schedule', 'Error generating schedule', scheduleError)
      return successResponse({
        hasModel: true,
        schedule: {
          items: [],
          totalDueNow: 0,
          totalDueSoon: 0,
          estimatedTimeMinutes: 0
        },
        summary: null,
        stats: null,
        message: 'Error generating review schedule'
      })
    }
    
    // Filter by subject if specified
    let items = schedule.items || []
    if (subject) {
      items = items.filter(item => item.subject === subject)
    }
    
    // Get summary safely
    let summary = null
    try {
      summary = getScheduleSummary({ ...schedule, items })
    } catch (summaryError) {
      apiLogger.apiError('memory/schedule', 'Error getting summary', summaryError)
    }
    
    // Get memory stats safely
    let stats = null
    try {
      stats = await getMemoryStats(userId)
    } catch (statsError) {
      apiLogger.apiError('memory/schedule', 'Error getting stats', statsError)
    }
    
    return successResponse({
      hasModel: true,
      schedule: {
        items: items.map(item => ({
          conceptId: item.conceptId,
          conceptName: item.conceptName,
          subject: item.subject,
          dueStatus: item.dueStatus,
          priority: item.priority,
          currentRetention: Math.round((item.currentRetention || 0) * 100),
          targetRetention: Math.round((item.targetRetention || 0.85) * 100),
          optimalReviewTime: item.optimalReviewTime?.toISOString?.() || new Date().toISOString()
        })),
        totalDueNow: schedule.totalDueNow || 0,
        totalDueSoon: schedule.totalDueSoon || 0,
        estimatedTimeMinutes: schedule.estimatedTimeMinutes || 0
      },
      summary,
      stats
    })
    
  } catch (error) {
    return serverError(error, 'Failed to get review schedule')
  }
}