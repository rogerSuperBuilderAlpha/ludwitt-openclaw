import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const { id } = await params

    const doc = await db.collection('explorationSessions').doc(id).get()

    if (!doc.exists) {
      return notFoundError('Exploration session not found')
    }

    const data = doc.data()!
    if (data.userId !== userId) {
      return forbiddenError('Not your exploration session')
    }

    return successResponse({ session: { id: doc.id, ...data } })
  } catch (error) {
    return serverError(error, 'Failed to load exploration session')
  }
}
