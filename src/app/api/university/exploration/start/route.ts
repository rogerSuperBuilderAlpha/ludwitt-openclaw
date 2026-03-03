import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { generateResearchQuestions } from '@/lib/university/generate-exploration'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { topic, scope, courseId, deliverableId, learningPathId } = body

    if (!topic || typeof topic !== 'string' || topic.trim().length < 3) {
      return badRequestError('topic is required (minimum 3 characters)')
    }

    // Generate research questions
    const { questions, costCharged, newBalance } = await generateResearchQuestions(
      userId,
      topic.trim(),
      scope?.trim(),
    )

    // Create exploration session
    const sessionRef = db.collection('explorationSessions').doc()
    const session = {
      userId,
      topic: topic.trim(),
      scope: scope?.trim() || null,
      currentStep: 'research-questions',
      researchQuestions: questions.map(q => ({ question: q, deepDive: null, keyFindings: [] })),
      synthesis: null,
      recommendedNextSteps: null,
      references: null,
      status: 'in-progress',
      totalCreditsUsed: costCharged,
      ...(courseId && { courseId }),
      ...(deliverableId && { deliverableId }),
      ...(learningPathId && { learningPathId }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await sessionRef.set(session)

    return successResponse({
      session: { id: sessionRef.id, ...session },
      costCharged,
      newBalance,
    })
  } catch (error) {
    return serverError(error, 'Failed to start exploration')
  }
}
