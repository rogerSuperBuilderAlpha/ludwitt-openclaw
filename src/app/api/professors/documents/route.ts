import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { ProfessorDocument, AssignmentScope } from '@/lib/types/university'
import { notifyProfessorDocument } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    // Optionally filter by sourcePathId
    const sourcePathId = request.nextUrl.searchParams.get('sourcePathId')

    let query: FirebaseFirestore.Query = db.collection('professorDocuments')
    if (sourcePathId) {
      query = query.where('sourcePathId', '==', sourcePathId)
    }
    query = query.orderBy('createdAt', 'desc')

    const snap = await query.get()
    const documents: ProfessorDocument[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<ProfessorDocument, 'id'>),
    }))

    return successResponse({ documents })
  } catch (error) {
    return serverError(error, 'Failed to fetch documents')
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { sourcePathId, title, url, description, scope, studentIds } = body as {
      sourcePathId: string
      title: string
      url: string
      description?: string
      scope: AssignmentScope
      studentIds?: string[]
    }

    if (!sourcePathId || !title?.trim() || !url?.trim()) {
      return badRequestError('Missing required fields: sourcePathId, title, url')
    }

    if (scope !== 'global' && scope !== 'specific') {
      return badRequestError('scope must be "global" or "specific"')
    }

    if (scope === 'specific' && (!studentIds || studentIds.length === 0)) {
      return badRequestError('studentIds required when scope is "specific"')
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return badRequestError('url must be a valid URL')
    }

    // Validate path exists
    const pathDoc = await db.collection('universityLearningPaths').doc(sourcePathId).get()
    if (!pathDoc.exists) {
      return notFoundError('Learning path not found')
    }

    const userRecord = await auth.getUser(userId)
    const professorName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'
    const professorEmail = userRecord.email || ''

    const docRef = db.collection('professorDocuments').doc()
    const document: Omit<ProfessorDocument, 'id'> = {
      professorId: userId,
      professorName,
      professorEmail,
      sourcePathId,
      title: title.trim(),
      url: url.trim(),
      description: description?.trim(),
      scope,
      studentIds: scope === 'specific' ? studentIds! : [],
      createdAt: new Date().toISOString(),
    }

    await docRef.set(document)

    // Notify students (fire-and-forget)
    const pathData = pathDoc.data()!
    const pathTitle = (pathData.targetTopic as string) || 'Course'
    if (scope === 'specific' && studentIds && studentIds.length > 0) {
      notifyProfessorDocument(studentIds, professorName, title.trim(), pathTitle)
    } else if (scope === 'global') {
      // Find all students enrolled in paths derived from this source path
      db.collection('universityLearningPaths')
        .where('sourcePathId', '==', sourcePathId)
        .get()
        .then(snap => {
          const ids = snap.docs
            .map(d => d.data().userId as string)
            .filter(id => id !== userId)
          if (ids.length > 0) {
            notifyProfessorDocument(ids, professorName, title.trim(), pathTitle)
          }
        })
        .catch((err) => apiLogger.apiError('professors/documents', 'Notify students failed', err))
    }

    return successResponse({
      document: { id: docRef.id, ...document },
    })
  } catch (error) {
    return serverError(error, 'Failed to upload document')
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId, decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const body = await request.json()
    const { documentId } = body as { documentId: string }

    if (!documentId) {
      return badRequestError('Missing documentId')
    }

    const docRef = db.collection('professorDocuments').doc(documentId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return notFoundError('Document not found')
    }

    if (docSnap.data()!.professorId !== userId) {
      return forbiddenError('You can only delete your own documents')
    }

    await docRef.delete()

    return successResponse({ deleted: true })
  } catch (error) {
    return serverError(error, 'Failed to delete document')
  }
}
