import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

const VALID_SECTIONS = ['notifications', 'privacy', 'preferences', 'accessibility', 'sound', 'learning'] as const

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const userDoc = await db.collection('users').doc(userId).get()
    const settings = userDoc.exists ? (userDoc.data()?.settings || {}) : {}

    return successResponse({ settings })
  } catch (error) {
    return serverError(error, 'Failed to fetch settings')
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const rl = await checkRateLimit('api', userId)
    if (!rl.success) return rateLimitedResponse(rl)

    const body = await request.json()
    const { section, data } = body as { section: string; data: Record<string, unknown> }

    if (!section || !data) {
      return badRequestError('Missing required fields: section, data')
    }

    if (!VALID_SECTIONS.includes(section as typeof VALID_SECTIONS[number])) {
      return badRequestError(`Invalid section. Must be one of: ${VALID_SECTIONS.join(', ')}`)
    }

    await db.collection('users').doc(userId).set(
      { settings: { [section]: data }, updatedAt: new Date() },
      { merge: true }
    )

    return successResponse({ section, saved: true })
  } catch (error) {
    return serverError(error, 'Failed to save settings')
  }
}
