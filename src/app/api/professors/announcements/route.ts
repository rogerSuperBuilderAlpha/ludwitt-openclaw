import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db, auth } from '@/lib/firebase/admin'
import { isProfessor } from '@/config/developers'
import type { CourseAnnouncement } from '@/lib/types/university'
import { notifyCourseAnnouncement } from '@/lib/university/notifications'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { decodedToken } = authResult

    if (!isProfessor(decodedToken.email)) {
      return forbiddenError('Professor access required')
    }

    const sourcePathId = request.nextUrl.searchParams.get('sourcePathId')
    if (!sourcePathId) {
      return badRequestError('sourcePathId query parameter is required')
    }

    const snap = await db
      .collection('courseAnnouncements')
      .where('sourcePathId', '==', sourcePathId)
      .orderBy('createdAt', 'desc')
      .get()

    const announcements: CourseAnnouncement[] = snap.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<CourseAnnouncement, 'id'>),
    }))

    return successResponse({ announcements })
  } catch (error) {
    return serverError(error, 'Failed to fetch announcements')
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
    const { sourcePathId, title, body: announcementBody } = body as {
      sourcePathId: string
      title: string
      body: string
    }

    if (!sourcePathId || !title?.trim() || !announcementBody?.trim()) {
      return badRequestError('sourcePathId, title, and body are required')
    }

    if (title.trim().length > 200) {
      return badRequestError('Title must be 200 characters or less')
    }

    if (announcementBody.trim().length > 5000) {
      return badRequestError('Body must be 5000 characters or less')
    }

    const userRecord = await auth.getUser(userId)
    const professorName = userRecord.displayName || userRecord.email?.split('@')[0] || 'Professor'

    const announcementRef = db.collection('courseAnnouncements').doc()
    const announcement: Omit<CourseAnnouncement, 'id'> = {
      professorId: userId,
      professorName,
      sourcePathId,
      title: title.trim(),
      body: announcementBody.trim(),
      createdAt: new Date().toISOString(),
    }

    await announcementRef.set(announcement)

    // Find all enrolled students via learning paths with this sourcePathId
    const pathsSnap = await db
      .collection('universityLearningPaths')
      .where('sourcePathId', '==', sourcePathId)
      .get()

    const studentIds = pathsSnap.docs
      .map(doc => doc.data().userId as string)
      .filter(Boolean)

    // Get the path topic for notification context
    const pathTopic = pathsSnap.docs[0]?.data()?.targetTopic as string || 'your course'

    // Fire-and-forget notifications
    if (studentIds.length > 0) {
      notifyCourseAnnouncement(studentIds, professorName, title.trim(), pathTopic)
    }

    return successResponse({
      announcement: { id: announcementRef.id, ...announcement },
    })
  } catch (error) {
    return serverError(error, 'Failed to create announcement')
  }
}
