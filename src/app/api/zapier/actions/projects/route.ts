import { NextRequest } from 'next/server'
import { db } from '@/lib/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import {
  authenticateRequest,
  createSuccessResponse,
  createErrorResponse,
  logRequest,
} from '@/app/api/v1/middleware'
import { API_ERRORS } from '@/lib/api/types'
import { apiLogger } from '@/lib/logger'

/**
 * POST /api/zapier/actions/projects
 * Zapier action to create a new project
 */
export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request, ['write:projects'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth

  try {
    const body = await request.json()

    // Validate required fields
    const { title, description } = body
    if (!title || !description) {
      await logRequest(request, apiKey.id, 400)
      return createErrorResponse(
        API_ERRORS.INVALID_REQUEST,
        'Missing required fields: title, description',
        400
      )
    }

    // Create project
    const projectData = {
      userId: apiKey.userId,
      title,
      description,
      status: body.status || 'planning',
      githubRepo: body.githubRepo || '',
      liveUrl: body.liveUrl || '',
      techStack: Array.isArray(body.techStack)
        ? body.techStack
        : body.techStack
        ? body.techStack.split(',').map((s: string) => s.trim())
        : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'projects'), projectData)

    const result = {
      id: docRef.id,
      title: projectData.title,
      description: projectData.description,
      status: projectData.status,
      createdAt: projectData.createdAt,
    }

    await logRequest(request, apiKey.id, 201)
    return createSuccessResponse(result, 201)
  } catch (error) {
    apiLogger.apiError('zapier/actions/projects', 'Failed to create project via Zapier', error)
    await logRequest(request, apiKey.id, 500)
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 'Internal server error', 500)
  }
}
