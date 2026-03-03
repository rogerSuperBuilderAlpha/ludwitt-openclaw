/**
 * API Route: POST /api/university/create-business-idea
 *
 * Create a draft business idea with empty document slots.
 * Rejects if user already has an existing draft.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { BUSINESS_IDEA_DOCUMENTS, toIdeaDisplay } from '@/lib/types/university'
import type { UniversityBusinessIdea, IdeaDocument } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const authResult = await authenticateRequest(request)
    if (authResult instanceof NextResponse) {
      return authResult
    }
    const { userId } = authResult

    // 2. Parse & validate
    const body = await request.json()
    const { concept, description } = body

    if (!concept || typeof concept !== 'string' || concept.trim().length < 2) {
      return badRequestError('A concept is required (at least 2 characters)')
    }

    if (concept.trim().length > 200) {
      return badRequestError('Concept must be 200 characters or less')
    }

    // 3. Check for existing draft
    const existingDrafts = await db
      .collection('universityBusinessIdeas')
      .where('userId', '==', userId)
      .where('status', '==', 'draft')
      .limit(1)
      .get()

    if (!existingDrafts.empty) {
      return badRequestError('You already have a draft business idea. Complete or delete it before creating a new one.')
    }

    // 4. Create draft with empty document slots
    const now = new Date().toISOString()
    const ideaRef = db.collection('universityBusinessIdeas').doc()
    const documents: IdeaDocument[] = BUSINESS_IDEA_DOCUMENTS.map(title => ({
      title,
      url: null,
    }))

    const ideaDoc: UniversityBusinessIdea = {
      id: ideaRef.id,
      userId,
      concept: concept.trim(),
      ...(description?.trim() && { description: description.trim() }),
      documents,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    }
    await ideaRef.set(ideaDoc)

    return successResponse({
      idea: toIdeaDisplay(ideaDoc),
    })
  } catch (error) {
    apiLogger.apiError('university/create-business-idea', 'Failed to create business idea', error)
    return serverError(error, 'Failed to create business idea')
  }
}
