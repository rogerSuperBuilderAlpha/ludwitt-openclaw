import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import type { CourseAnnouncement } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult

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
