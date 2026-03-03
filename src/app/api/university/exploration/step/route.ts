import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { badRequestError, forbiddenError, notFoundError, serverError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { db } from '@/lib/firebase/admin'
import { generateDeepDive, generateSynthesis } from '@/lib/university/generate-exploration'
import type { ExplorationStep, ExplorationResearchQuestion } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) return authResult
    const { userId } = authResult

    const body = await request.json()
    const { sessionId, step, questionIndex } = body as { sessionId: string; step: ExplorationStep; questionIndex?: number }

    if (!sessionId || !step) {
      return badRequestError('sessionId and step are required')
    }

    const sessionRef = db.collection('explorationSessions').doc(sessionId)
    const sessionDoc = await sessionRef.get()

    if (!sessionDoc.exists) {
      return notFoundError('Exploration session not found')
    }

    const session = sessionDoc.data()!

    if (session.userId !== userId) {
      return forbiddenError('Not your exploration session')
    }

    if (session.status === 'completed') {
      return badRequestError('Session is already completed')
    }

    const questions: ExplorationResearchQuestion[] = session.researchQuestions || []
    let costCharged = 0
    let newBalance = 0

    if (step === 'deep-dive') {
      // Deep dive into a specific question
      if (typeof questionIndex !== 'number' || questionIndex < 0 || questionIndex >= questions.length) {
        return badRequestError('Valid questionIndex is required for deep-dive step')
      }

      const q = questions[questionIndex]
      if (q.deepDive) {
        return badRequestError('This question has already been explored')
      }

      // Build context from prior deep dives
      const priorContext = questions
        .filter(qq => qq.deepDive)
        .map(qq => `Q: ${qq.question}\nFindings: ${qq.keyFindings?.join('; ') || 'None'}`)
        .join('\n\n')

      const result = await generateDeepDive(userId, session.topic, q.question, priorContext)
      costCharged = result.costCharged
      newBalance = result.newBalance

      questions[questionIndex] = {
        ...q,
        deepDive: result.deepDive,
        keyFindings: result.keyFindings,
      }

      // Check if all questions have been explored
      const allExplored = questions.every(qq => qq.deepDive)

      await sessionRef.update({
        researchQuestions: questions,
        currentStep: allExplored ? 'synthesize' : 'deep-dive',
        totalCreditsUsed: (session.totalCreditsUsed || 0) + costCharged,
        updatedAt: new Date().toISOString(),
      })
    } else if (step === 'synthesize') {
      // Generate synthesis from all findings
      const questionsWithFindings = questions
        .filter(q => q.keyFindings && q.keyFindings.length > 0)
        .map(q => ({ question: q.question, keyFindings: q.keyFindings || [] }))

      if (questionsWithFindings.length === 0) {
        return badRequestError('At least one question must be explored before synthesizing')
      }

      const result = await generateSynthesis(userId, session.topic, questionsWithFindings)
      costCharged = result.costCharged
      newBalance = result.newBalance

      await sessionRef.update({
        synthesis: result.synthesis,
        recommendedNextSteps: result.recommendedNextSteps,
        references: result.references,
        currentStep: 'export',
        totalCreditsUsed: (session.totalCreditsUsed || 0) + costCharged,
        updatedAt: new Date().toISOString(),
      })
    } else if (step === 'export') {
      // Mark as completed
      await sessionRef.update({
        status: 'completed',
        currentStep: 'export',
        updatedAt: new Date().toISOString(),
      })
    } else {
      return badRequestError('Invalid step')
    }

    // Return updated session
    const updatedDoc = await sessionRef.get()
    const updatedSession = { id: updatedDoc.id, ...updatedDoc.data() }

    return successResponse({ session: updatedSession, costCharged, newBalance })
  } catch (error) {
    return serverError(error, 'Failed to advance exploration step')
  }
}
