/**
 * API Route: POST /api/university/update-idea
 *
 * Update document URLs on a business or thesis idea.
 * Optionally submit the idea (validates all URLs are filled and valid).
 */

import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/api/auth-middleware'
import { serverError, badRequestError, notFoundError, forbiddenError } from '@/lib/api/error-responses'
import { successResponse } from '@/lib/api/response-helpers'
import { apiLogger } from '@/lib/logger'
import { db } from '@/lib/firebase/admin'
import { toIdeaDisplay } from '@/lib/types/university'
import type { IdeaDocument, UniversityBusinessIdea, UniversityThesisIdea } from '@/lib/types/university'

export const dynamic = 'force-dynamic'

function isValidGoogleDriveUrl(url: string): boolean {
  return url.includes('docs.google.com') || url.includes('drive.google.com')
}

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
    const { ideaId, collection, documents, submit } = body as {
      ideaId: string
      collection: 'business' | 'thesis'
      documents: IdeaDocument[]
      submit?: boolean
    }

    if (!ideaId || typeof ideaId !== 'string') {
      return badRequestError('ideaId is required')
    }
    if (collection !== 'business' && collection !== 'thesis') {
      return badRequestError('collection must be "business" or "thesis"')
    }
    if (!Array.isArray(documents)) {
      return badRequestError('documents must be an array')
    }

    // 3. Fetch the idea and verify ownership
    const collectionName = collection === 'business' ? 'universityBusinessIdeas' : 'universityThesisIdeas'
    const ideaRef = db.collection(collectionName).doc(ideaId)
    const ideaSnap = await ideaRef.get()

    if (!ideaSnap.exists) {
      return notFoundError('Idea not found')
    }

    const ideaData = ideaSnap.data() as UniversityBusinessIdea | UniversityThesisIdea
    if (ideaData.userId !== userId) {
      return forbiddenError('You do not own this idea')
    }

    if (ideaData.status === 'submitted') {
      return badRequestError('This idea has already been submitted and cannot be modified')
    }

    // 4. Validate document URLs
    for (const doc of documents) {
      if (doc.url !== null && typeof doc.url !== 'string') {
        return badRequestError(`Invalid URL for "${doc.title}"`)
      }
      if (doc.url && !isValidGoogleDriveUrl(doc.url)) {
        return badRequestError(`"${doc.title}" must be a Google Drive link (docs.google.com or drive.google.com)`)
      }
    }

    // 5. If submitting, validate all documents have valid URLs
    if (submit) {
      const missing = documents.filter(d => !d.url)
      if (missing.length > 0) {
        return badRequestError(`All documents must have a Google Drive link to submit. Missing: ${missing.map(d => d.title).join(', ')}`)
      }
    }

    // 6. Update
    const now = new Date().toISOString()
    const updateData: Record<string, unknown> = {
      documents,
      updatedAt: now,
    }
    if (submit) {
      updateData.status = 'submitted'
    }

    await ideaRef.update(updateData)

    const updatedIdea = {
      ...ideaData,
      id: ideaId,
      documents,
      updatedAt: now,
      ...(submit ? { status: 'submitted' as const } : {}),
    }

    return successResponse({
      idea: toIdeaDisplay(updatedIdea),
    })
  } catch (error) {
    apiLogger.apiError('university/update-idea', 'Failed to update idea', error)
    return serverError(error, 'Failed to update idea')
  }
}
