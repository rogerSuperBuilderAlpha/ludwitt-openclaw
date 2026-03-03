import { NextRequest, NextResponse } from 'next/server'
import { FieldValue } from 'firebase-admin/firestore'
import { db } from '@/lib/firebase/admin'
import { isDeveloper } from '@/config/developers'
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit/in-memory'
import { sanitizeMarkdown } from '@/lib/sanitize'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { apiLogger } from '@/lib/logger'
import { successResponse } from '@/lib/api/response-helpers'
import { serverError } from '@/lib/api/error-responses'

/**
 * GET /api/developers/sessions
 * Fetch development sessions for the authenticated developer
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult
    const userEmail = authResult.decodedToken.email

    if (!userEmail || !isDeveloper(userEmail)) {
      return NextResponse.json(
        { error: 'Access denied. Developer access required.' },
        { status: 403 }
      )
    }

    // Get limit from query params (default 50)
    const url = new URL(request.url)
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100)

    // Fetch sessions for this developer
    const sessionsSnapshot = await db
      .collection('developmentSessions')
      .where('addedBy', '==', userEmail)
      .orderBy('addedAt', 'desc')
      .limit(limit)
      .get()

    const sessions = sessionsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        documentId: data.documentId,
        documentTitle: data.documentTitle || 'Untitled Document',
        accomplishments: data.accomplishments,
        nextSteps: data.nextSteps,
        timeSpentMinutes: data.timeSpentMinutes || 0,
        sessionDate:
          data.sessionDate?.toDate?.()?.toISOString() ||
          data.addedAt?.toDate?.()?.toISOString(),
        addedAt: data.addedAt?.toDate?.()?.toISOString(),
      }
    })

    // Also fetch document titles for sessions that don't have them
    const docIds = [
      ...new Set(
        sessions
          .filter(
            (s) => !s.documentTitle || s.documentTitle === 'Untitled Document'
          )
          .map((s) => s.documentId)
      ),
    ]
    if (docIds.length > 0) {
      const docTitleMap: Record<string, string> = {}
      // Batch fetch in chunks of 10
      for (let i = 0; i < docIds.length; i += 10) {
        const chunk = docIds.slice(i, i + 10)
        const docsSnapshot = await db
          .collection('customerDocuments')
          .where('__name__', 'in', chunk)
          .get()
        docsSnapshot.docs.forEach((doc) => {
          const data = doc.data()
          docTitleMap[doc.id] = data.googleDocTitle || data.title || 'Untitled'
        })
      }
      // Update session titles
      sessions.forEach((s) => {
        if (docTitleMap[s.documentId]) {
          s.documentTitle = docTitleMap[s.documentId]
        }
      })
    }

    return successResponse({ sessions, total: sessions.length })
  } catch (error) {
    return serverError(error, 'Failed to fetch sessions')
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const userEmail = authResult.decodedToken.email

    // Check if user is a developer
    if (!userEmail || !isDeveloper(userEmail)) {
      return NextResponse.json(
        { error: 'Access denied. Developer access required.' },
        { status: 403 }
      )
    }

    // Apply rate limiting (30 requests per minute)
    const rateLimitResult = applyRateLimit(userEmail, RateLimitPresets.STANDARD)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const {
      documentId,
      customerId,
      accomplishments,
      nextSteps,
      timeSpentMinutes,
      requirementIds,
    } = await request.json()

    if (!documentId || !customerId || !accomplishments) {
      return NextResponse.json(
        { error: 'Document ID, customer ID, and accomplishments are required' },
        { status: 400 }
      )
    }

    // Sanitize user input to prevent XSS
    const sanitizedAccomplishments = sanitizeMarkdown(accomplishments)
    const sanitizedNextSteps = nextSteps ? sanitizeMarkdown(nextSteps) : ''

    if (!sanitizedAccomplishments.trim()) {
      return NextResponse.json(
        { error: 'Accomplishments cannot be empty after sanitization' },
        { status: 400 }
      )
    }

    // Create session record
    const newSession: any = {
      documentId,
      customerId,
      accomplishments: sanitizedAccomplishments,
      sessionDate: FieldValue.serverTimestamp(),
      addedBy: userEmail,
      addedAt: FieldValue.serverTimestamp(),
      nextSteps: sanitizedNextSteps,
    }

    // Add time tracking if provided
    if (
      timeSpentMinutes &&
      typeof timeSpentMinutes === 'number' &&
      timeSpentMinutes > 0
    ) {
      newSession.timeSpentMinutes = timeSpentMinutes
    }

    // Add requirement IDs if provided
    if (
      requirementIds &&
      Array.isArray(requirementIds) &&
      requirementIds.length > 0
    ) {
      newSession.requirementIds = requirementIds
    }

    const sessionRef = await db
      .collection('developmentSessions')
      .add(newSession)

    return NextResponse.json({
      success: true,
      session: {
        id: sessionRef.id,
        ...newSession,
        sessionDate: new Date(),
        addedAt: new Date(),
      },
    })
  } catch (error) {
    apiLogger.apiError('developers/sessions', 'Failed to add session', error)
    return NextResponse.json(
      { error: 'Failed to add session' },
      { status: 500 }
    )
  }
}
