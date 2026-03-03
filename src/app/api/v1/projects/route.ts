import { NextRequest } from 'next/server'
import { db } from '@/lib/firebase/config'
import { collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore'
import {
  authenticateRequest,
  createSuccessResponse,
  createErrorResponse,
  logRequest,
  getPaginationParams,
} from '../middleware'
import { API_ERRORS } from '@/lib/api/types'
import { apiLogger } from '@/lib/logger'

/**
 * GET /api/v1/projects - Get user's projects
 */
export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request, ['read:projects'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth
  const { page, limit: pageLimit } = getPaginationParams(request)

  try {
    // Query projects
    const projectsRef = collection(db, 'projects')
    const q = query(
      projectsRef,
      where('userId', '==', apiKey.userId),
      orderBy('createdAt', 'desc'),
      limit(pageLimit)
    )

    const snapshot = await getDocs(q)
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    await logRequest(request, apiKey.id, 200)
    return createSuccessResponse(projects, 200, {
      page,
      limit: pageLimit,
      total: projects.length,
    })
  } catch (error) {
    apiLogger.apiError('v1/projects', 'Failed to get projects', error)
    await logRequest(request, apiKey.id, 500)
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 'Internal server error', 500)
  }
}

/**
 * POST /api/v1/projects - Create a new project
 */
export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request, ['write:projects'])
  if (auth instanceof Response) return auth

  const { apiKey } = auth

  try {
    const body = await request.json()

    // Validate required fields
    const { title, description, status } = body
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
      status: status || 'in_progress',
      githubRepo: body.githubRepo || '',
      liveUrl: body.liveUrl || '',
      techStack: body.techStack || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'projects'), projectData)

    const newProject = {
      id: docRef.id,
      ...projectData,
    }

    await logRequest(request, apiKey.id, 201)
    return createSuccessResponse(newProject, 201)
  } catch (error) {
    apiLogger.apiError('v1/projects', 'Failed to create project', error)
    await logRequest(request, apiKey.id, 500)
    return createErrorResponse(API_ERRORS.INTERNAL_ERROR, 'Internal server error', 500)
  }
}
