/**
 * Telemetry Submit API
 * 
 * Receives telemetry data from the client after a problem session completes.
 * Stores the session and updates the user's telemetry profile.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { 
  SessionTelemetry, 
  SessionSignals, 
  SessionOutcome 
} from '@/lib/telemetry/types'
import { processTelemetrySession } from '@/lib/telemetry/storage'

export const dynamic = 'force-dynamic'

interface TelemetrySubmitBody {
  sessionId: string
  userId: string
  problemId: string
  subject: 'math' | 'reading' | 'latin' | 'greek' | 'logic' | 'writing'
  difficulty: number
  skills: string[]
  startTime: string
  endTime: string
  signals: SessionSignals
  outcome: SessionOutcome
  eventCount?: number
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    // Parse body
    const body = await request.json() as TelemetrySubmitBody
    
    // Validate required fields
    if (!body.sessionId || !body.problemId || !body.subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Verify user is submitting their own telemetry
    if (body.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'User ID mismatch' },
        { status: 403 }
      )
    }
    
    // Construct session object
    const session: SessionTelemetry = {
      sessionId: body.sessionId,
      userId: body.userId,
      problemId: body.problemId,
      subject: body.subject,
      difficulty: body.difficulty,
      skills: body.skills || [],
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      events: [], // Raw events not transmitted
      signals: body.signals,
      outcome: body.outcome
    }
    
    // Process and store the session
    const updatedProfile = await processTelemetrySession(session)
    
    return successResponse({
      message: 'Telemetry submitted successfully',
      profileStats: {
        totalSessions: updatedProfile.totalSessions,
        avgTimePerProblem: Math.round(updatedProfile.rollingStats.avgTimePerProblem / 1000),
        avgKeystrokeRate: Math.round(updatedProfile.rollingStats.avgKeystrokeRate)
      }
    })
    
  } catch (error) {
    return serverError(error, 'Failed to submit telemetry')
  }
}
