import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { ProfessorDocument } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const pathId = request.nextUrl.searchParams.get('pathId')
    if (!pathId) {
      return badRequestError('Missing pathId query parameter')
    }

    // Fetch the student's learning path
    const pathDoc = await db.collection('universityLearningPaths').doc(pathId).get()
    if (!pathDoc.exists) {
      return notFoundError('Learning path not found')
    }

    const pathData = pathDoc.data()!

    // Determine effective source path
    const effectiveSource = (pathData.sourcePathId as string) || pathDoc.id

    // Fetch professor documents for this source path
    const snap = await db
      .collection('professorDocuments')
      .where('sourcePathId', '==', effectiveSource)
      .orderBy('createdAt', 'desc')
      .get()

    // Filter by scope: global passes, specific must include this student
    const documents: ProfessorDocument[] = snap.docs
      .filter(doc => {
        const data = doc.data()
        if (data.scope === 'global') return true
        return (data.studentIds as string[])?.includes(userId)
      })
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<ProfessorDocument, 'id'>),
      }))

    return successResponse({ documents })
  } catch (error) {
    return serverError(error, 'Failed to fetch path documents')
  }
}
