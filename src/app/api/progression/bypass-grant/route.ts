/**
 * API Route: POST /api/progression/bypass-grant
 *
 * Grants a gate bypass via password. Same Firestore flag as the paid bypass.
 */

import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { z } from 'zod'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { validateBody } from '@/lib/api/validation'
import { db } from '@/lib/firebase/admin'
import { checkRateLimit, rateLimitedResponse } from '@/lib/rate-limit/upstash'

export const dynamic = 'force-dynamic'

const BYPASS_PASSWORD = process.env.BYPASS_GRANT_PASSWORD
const VALID_SECTIONS = ['alc', 'developer'] as const

const BypassGrantSchema = z.object({
  targetSection: z.enum(VALID_SECTIONS, {
    message: 'Must be "alc" or "developer"',
  }),
  password: z.string().min(1, 'Password is required'),
})

/** Constant-time string comparison to prevent timing attacks (including length oracle) */
function safeCompare(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length)
  const aBuf = Buffer.alloc(maxLen)
  const bBuf = Buffer.alloc(maxLen)
  Buffer.from(a).copy(aBuf)
  Buffer.from(b).copy(bBuf)
  return a.length === b.length && timingSafeEqual(aBuf, bBuf)
}

export async function POST(request: NextRequest) {
  try {
    if (!BYPASS_PASSWORD) {
      return serverError(
        new Error('BYPASS_GRANT_PASSWORD not configured'),
        'Bypass grant not configured'
      )
    }

    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // Rate limit: strict (5 requests/min) to prevent brute-force
    const rl = await checkRateLimit('strict', userId)
    if (!rl.success) {
      return rateLimitedResponse(rl)
    }

    const body = await request.json()
    const result = validateBody(BypassGrantSchema, body)
    if (!result.success) return result.error
    const { targetSection, password } = result.data

    if (!safeCompare(password, BYPASS_PASSWORD)) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 403 }
      )
    }

    // Check if bypass already granted
    const userDoc = await db.collection('users').doc(userId).get()
    const bypasses = userDoc.exists
      ? userDoc.data()?.gateBypassesPurchased || {}
      : {}

    if (bypasses[targetSection]) {
      return successResponse({ alreadyGranted: true })
    }

    // Grant the bypass (same field as paid version)
    await db
      .collection('users')
      .doc(userId)
      .set(
        {
          gateBypassesPurchased: { [targetSection]: true },
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      )

    return successResponse({ granted: true })
  } catch (error) {
    return serverError(error, 'Failed to grant bypass')
  }
}
