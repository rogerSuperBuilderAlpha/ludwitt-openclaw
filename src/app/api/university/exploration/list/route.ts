import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    let query = db.collection('explorationSessions')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)

    if (courseId) {
      query = db.collection('explorationSessions')
        .where('userId', '==', userId)
        .where('courseId', '==', courseId)
        .orderBy('createdAt', 'desc')
        .limit(50)
    }

    const snapshot = await query.get()
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return successResponse({ sessions })
  } catch (error) {
    return serverError(error, 'Failed to list exploration sessions')
  }
}
