/**
 * API Route: POST /api/credits/grant-free
 *
 * DISABLED: This endpoint previously granted free credits during the transition period.
 * The promotion has ended. Users should purchase credits via /account/credits.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }
  const { userId } = authResult

  const rl = await checkRateLimit('strict', userId)
  if (!rl.success) return rateLimitedResponse(rl)

  return NextResponse.json(
    { 
      success: false, 
      error: 'The free credits promotion has ended. Please purchase credits to continue using AI features.',
      redirectTo: '/account/credits'
    },
    { status: 410 } // 410 Gone - indicates the resource is no longer available
  )
}
