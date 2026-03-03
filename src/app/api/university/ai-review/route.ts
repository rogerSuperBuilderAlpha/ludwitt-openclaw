import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { generateAIReview } from '@/lib/university/ai-review'

export const dynamic = 'force-dynamic'

/** POST — manually trigger an AI pre-review for a deliverable */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { courseId, deliverableId } = body

    if (!courseId || !deliverableId) {
      return badRequestError('courseId and deliverableId are required')
    }

    const courseDoc = await db.collection('universityCourses').doc(courseId).get()
    if (!courseDoc.exists || courseDoc.data()!.userId !== userId) {
      return notFoundError('Course not found')
    }

    const course = courseDoc.data()!
    const deliverables = course.deliverables as Array<Record<string, unknown>>
    const deliverable = deliverables.find(d => d.id === deliverableId)

    if (!deliverable) {
      return notFoundError('Deliverable not found')
    }

    const review = await generateAIReview({
      userId,
      courseId,
      deliverableId,
      courseTitle: course.title as string,
      deliverableTitle: deliverable.title as string,
      deliverableDescription: deliverable.description as string,
      deliverableType: deliverable.type as string,
      requirements: (deliverable.requirements as string[]) || [],
      deployedUrl: deliverable.deployedUrl as string | undefined,
      githubUrl: deliverable.githubUrl as string | undefined,
      loomUrl: deliverable.loomUrl as string | undefined,
      submissionNotes: deliverable.submissionNotes as string | undefined,
    })

    if (!review) {
      return serverError(new Error('AI review generation failed'), 'Failed to generate AI review')
    }

    return successResponse({ review })
  } catch (error) {
    return serverError(error, 'Failed to generate AI review')
  }
}
