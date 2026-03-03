/**
 * Admin Bypass Check API
 *
 * GET - Check if the authenticated user can bypass Independent Study prerequisites.
 * Uses server-only ADMIN_BYPASS_EMAILS env var so admin emails are never exposed to the client.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'

export const dynamic = 'force-dynamic'

const ADMIN_BYPASS_EMAILS = (process.env.ADMIN_BYPASS_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }

    const canBypass = ADMIN_BYPASS_EMAILS.includes(
      (authResult.decodedToken.email || '').toLowerCase()
    )

    return NextResponse.json({ success: true, canBypass })
  } catch {
    return NextResponse.json({ success: true, canBypass: false })
  }
}
